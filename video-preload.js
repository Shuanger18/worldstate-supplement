/* Download complete files with a two-request queue. Decoders stay lazy. */
window.WorldStatePreload = class {
  constructor(videos, changed) {
    this.changed = changed;
    this.direct = window.origin === 'null';
    this.items = new Map();
    this.running = 0;
    this.order = [];
    this.priority = new Set();
    this.retryTimer = null;
    this.memory = new Map();
    this.db = new Promise(resolve => {
      try {
        const request = indexedDB.open('worldstate-video-previews-v1', 1);
        request.onupgradeneeded = () => request.result.createObjectStore('videos');
        request.onsuccess = () => resolve(request.result);
        request.onerror = request.onblocked = () => resolve(null);
      } catch { resolve(null); }
    });
    videos.forEach(video => {
      const url = new URL(video.dataset.src, location.href).href;
      if (!this.items.has(url)) this.items.set(url, {url, state: this.direct ? 'ready' : 'queued', direct: this.direct});
      video.preloadItem = this.items.get(url);
    });
    this.order = [...this.items.values()];
    document.addEventListener('visibilitychange', () => this.pump());
    window.addEventListener('online', () => {
      this.items.forEach(item => { item.retryAt = 0; });
      this.changed();
      this.pump();
    });
    window.addEventListener('offline', () => {
      this.items.forEach(item => item.controller?.abort('offline'));
      this.changed();
    });
  }
  async read(item) {
    if (this.memory.has(item.url)) return this.memory.get(item.url);
    const db = await this.db;
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const tx = db.transaction('videos', 'readonly');
        const request = tx.objectStore('videos').get(item.url);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = tx.onabort = () => resolve(null);
      } catch { resolve(null); }
    });
  }
  async save(item, blob) {
    const db = await this.db;
    const stored = db && await new Promise(resolve => {
      try {
        const tx = db.transaction('videos', 'readwrite');
        tx.objectStore('videos').put(blob, item.url);
        tx.oncomplete = () => resolve(true);
        tx.onerror = tx.onabort = () => resolve(false);
      } catch { resolve(false); }
    });
    // Private browsing or exhausted disk quota: retain complete files for this
    // visit. Never report Ready for bytes that are no longer available.
    if (!stored) this.memory.set(item.url, blob);
  }
  prioritize(videos) {
    const first = videos.map(video => video.preloadItem);
    this.priority = new Set(first);
    this.order = [...new Set([...first, ...this.order])];
    // Free network slots immediately when the selected rows change.
    if (first.some(item => item.state === 'queued' || item.state === 'loading')) {
      this.items.forEach(item => {
        if (item.state === 'loading' && !this.priority.has(item)) {
          item.controller?.abort('selection-changed');
        }
      });
    }
    this.pump();
  }
  retry(videos) {
    videos.forEach(video => {
      const item = video.preloadItem;
      if (item.state === 'unavailable') {
        item.state = this.direct ? 'ready' : 'queued';
        item.mediaRecoveries = 0;
      }
      item.retryAt = 0;
    });
    // The row controller calls choose() next, prioritizing both selected rows.
  }
  pump() {
    clearTimeout(this.retryTimer);
    if (this.direct) return;
    if (document.hidden || navigator.onLine === false) return;
    while (this.running < 2) {
      const selectedPending = [...this.priority].some(item => item.state === 'queued' || item.state === 'loading');
      const item = this.order.find(candidate => candidate.state === 'queued' &&
        (!candidate.retryAt || candidate.retryAt <= Date.now()) &&
        (!selectedPending || this.priority.has(candidate)));
      if (!item) break;
      item.state = 'loading';
      this.running++;
      this.changed();
      this.download(item).finally(() => {
        this.running--;
        this.changed();
        this.pump();
      });
    }
    const selectedPending = [...this.priority].some(item => item.state === 'queued' || item.state === 'loading');
    const waiting = this.order.filter(item => item.state === 'queued' && item.retryAt > Date.now() &&
      (!selectedPending || this.priority.has(item)));
    if (waiting.length) {
      this.retryTimer = setTimeout(() => this.pump(), Math.max(1, Math.min(...waiting.map(item => item.retryAt)) - Date.now()));
    }
  }
  async download(item) {
    const controller = new AbortController();
    item.controller = controller;
    let timeout;
    const watch = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => controller.abort('stalled'), 60000);
    };
    try {
      let blob = item.skipCache ? null : await this.read(item);
      if (!blob) {
        controller.signal.throwIfAborted();
        watch();
        try {
          const partial = item.partial;
          const resume = partial?.bytes > 0 && partial.validator;
          const headers = resume ? {Range: `bytes=${partial.bytes}-`, 'If-Range': partial.validator} : {};
          const response = await fetch(item.url, {
            signal: controller.signal, headers,
            cache: item.attempts || item.skipCache || resume ? 'reload' : 'force-cache'
          });
          if (!response.ok) {
            await response.body?.cancel();
            const error = new Error(`HTTP ${response.status}`);
            error.permanent = [401, 403, 404, 410].includes(response.status);
            if (response.status === 416) item.partial = null;
            throw error;
          }
          const type = response.headers.get('content-type') || 'video/mp4';
          if (type.includes('text/html')) {
            await response.body?.cancel();
            const error = new Error('The server returned a page instead of a video');
            error.permanent = true;
            throw error;
          }
          const range = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get('content-range') || '');
          if (response.status === 206) {
            if (!resume || !range || Number(range[1]) !== partial.bytes ||
                (partial.total && Number(range[3]) !== partial.total)) {
              await response.body?.cancel();
              item.partial = null;
              throw new Error('Invalid partial video response');
            }
            partial.total = Number(range[3]);
          } else {
            const etag = response.headers.get('etag');
            item.partial = {chunks: [], bytes: 0, total: Number(response.headers.get('content-length')) || 0,
              type, validator: etag && !etag.startsWith('W/') ? etag : response.headers.get('last-modified')};
          }
          const body = item.partial;
          item.downloaded = body.bytes;
          item.total = body.total;
          watch();
          if (response.body?.getReader) {
            const reader = response.body.getReader();
            try {
              while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                body.chunks.push(value);
                body.bytes += value.byteLength;
                item.downloaded = body.bytes;
                watch();
                if (!item.notifiedAt || Date.now() - item.notifiedAt >= 150) {
                  item.notifiedAt = Date.now();
                  this.changed();
                }
              }
            } finally { reader.releaseLock(); }
            if (body.total && body.bytes !== body.total) {
              if (body.bytes > body.total) item.partial = null;
              throw new Error('Incomplete video response');
            }
            blob = new Blob(body.chunks, {type: body.type});
          } else {
            if (response.status === 206) {
              item.partial = null;
              throw new Error('Partial downloads are unsupported in this browser');
            }
            blob = await response.blob();
          }
          if (!blob.size) throw new Error('Empty video response');
        } finally { clearTimeout(timeout); }
        await this.save(item, blob);
      }
      item.partial = null;
      item.downloaded = item.total = blob.size;
      item.attempts = item.retryAt = 0;
      item.skipCache = false;
      item.error = '';
      item.state = 'ready';
    } catch (error) {
      item.state = error.permanent ? 'unavailable' : 'queued';
      if (controller.signal.reason === 'selection-changed') {
        item.retryAt = 0;
      } else {
        item.attempts = (item.attempts || 0) + 1;
        item.retryAt = Date.now() + Math.min(30000, 1000 * 2 ** Math.min(item.attempts - 1, 5));
        item.error = controller.signal.reason === 'stalled' ? 'No download progress for 60 seconds' : String(error.message || error);
      }
    } finally {
      clearTimeout(timeout);
      item.controller = null;
    }
  }
  recoverMedia(video) {
    const item = video.preloadItem;
    if (this.direct) {
      item.error = video.error?.message || 'Video unavailable';
      item.state = 'unavailable';
      this.release(video);
      this.changed();
      return;
    }
    const message = video.error?.message || 'The browser could not decode this video';
    this.release(video);
    item.error = message;
    item.mediaRecoveries = (item.mediaRecoveries || 0) + 1;
    item.skipCache = true;
    item.partial = null;
    item.downloaded = 0;
    item.retryAt = 0;
    item.state = item.mediaRecoveries > 1 ? 'unavailable' : 'queued';
    this.changed();
    this.pump();
  }
  async attach(video, allowed) {
    if (video.hasAttribute('src') || video.preloadAttaching || video.preloadItem.state !== 'ready') return;
    if (this.direct) {
      if (!allowed()) return;
      video.preload = 'auto';
      video.src = video.preloadItem.url;
      video.load();
      return;
    }
    video.preloadAttaching = true;
    try {
      const blob = await this.read(video.preloadItem);
      if (!blob) {
        // Storage can be evicted by the browser between download and playback.
        video.preloadItem.state = 'queued';
        this.changed();
        this.pump();
        return;
      }
      if (!allowed()) return;
      video.preload = 'auto';
      video.preloadObjectURL = URL.createObjectURL(blob);
      video.src = video.preloadObjectURL;
      video.load();
    } finally { video.preloadAttaching = false; }
  }
  release(video) {
    video.removeAttribute('src');
    video.preload = 'none';
    video.load();
    if (video.preloadObjectURL) URL.revokeObjectURL(video.preloadObjectURL);
    video.preloadObjectURL = null;
  }
};
