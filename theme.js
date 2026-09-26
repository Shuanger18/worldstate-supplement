(() => {
  const key = 'worldstate-color-mode';
  let mode = 'dark';
  try {
    if (localStorage.getItem(key) === 'light') mode = 'light';
  } catch {}
  function apply(next, persist = false) {
    mode = next === 'light' ? 'light' : 'dark';
    const theme = mode === 'dark' ? 'cinema' : 'editorial';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = mode;
    if (document.body) {
      document.body.classList.remove('cinema', 'editorial');
      document.body.classList.add(theme);
      document.body.dataset.theme = theme;
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#080d14' : '#f8f7f3');
    if (persist) {
      try { localStorage.setItem(key, mode); } catch {}
    }
    const button = document.getElementById('theme-toggle');
    if (button) {
      const label = mode === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', `Switch to ${label.toLowerCase()}`);
      button.title = `Switch to ${label.toLowerCase()}`;
      button.querySelector('.theme-label').textContent = label;
    }
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) eyebrow.textContent = mode === 'dark' ? 'Beyond the frame. Beyond the moment.' : 'Interactive worlds, lasting memories';
  }
  let switching = false;
  async function toggle() {
    if (switching) return;
    const next = mode === 'dark' ? 'light' : 'dark';
    const hero = document.querySelector('.hero');
    const layout = hero?.querySelector('.hero-layout');
    if (!layout || matchMedia('(prefers-reduced-motion: reduce)').matches || !layout.animate) {
      apply(next, true);
      return;
    }
    switching = true;
    const button = document.getElementById('theme-toggle');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    const animations = [];
    const beforeHeight = hero.getBoundingClientRect().height;
    hero.classList.add('theme-changing');
    try {
      const fadeOut = layout.animate([
        {opacity: 1, transform: 'translateY(0)', filter: 'blur(0)'},
        {opacity: 0, transform: 'translateY(-8px)', filter: 'blur(3px)'}
      ], {duration: 170, easing: 'ease-out', fill: 'forwards'});
      animations.push(fadeOut);
      await fadeOut.finished;
      apply(next, true);
      const afterHeight = hero.getBoundingClientRect().height;
      const resize = hero.animate([
        {height: `${beforeHeight}px`}, {height: `${afterHeight}px`}
      ], {duration: 580, easing: 'cubic-bezier(.22,1,.36,1)'});
      fadeOut.cancel();
      const fadeIn = layout.animate([
        {opacity: 0, transform: 'translateY(14px)', filter: 'blur(3px)'},
        {opacity: 1, transform: 'translateY(0)', filter: 'blur(0)'}
      ], {duration: 580, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both'});
      animations.push(resize, fadeIn);
      await Promise.all([resize.finished, fadeIn.finished]);
    } catch {
      apply(next, true);
    } finally {
      animations.forEach(animation => animation.cancel());
      hero.classList.remove('theme-changing');
      button.disabled = false;
      button.removeAttribute('aria-busy');
      switching = false;
    }
  }
  window.WorldStateTheme = { apply, toggle, get mode() { return mode; } };
  apply(mode);
})();
