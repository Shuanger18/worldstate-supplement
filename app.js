(() => {
  const data = window.WORLDSTATE;
  window.WorldStateTheme.apply(window.WorldStateTheme.mode);
  const theme = document.body.dataset.theme;
  document.title = `${data.name}: ${data.subtitle}`;
  const icons = {
    paper:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/></svg>',
    code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></svg>'
  };
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = s => /^(javascript|data|vbscript):/i.test(s.trim()) ? '' : s;
  function resource(kind, label) {
    const url = safeUrl(data[kind+'Url'] || '');
    const cls = 'pill '+(kind==='paper'?'primary':'');
    return url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${icons[kind]}${label}<span aria-hidden="true">↗</span></a>` : `<button class="${cls}" type="button" data-pending="${label}" aria-label="${label}, coming soon">${icons[kind]}${label}<small>Coming soon</small></button>`;
  }
  const resources = `<div class="resource-links">${resource('paper','Paper')}${resource('code','Code')}</div>`;
  const background = window.TitleAtmosphere.markup();
  const orbit = `<svg class="orbit-art" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="72"/><ellipse cx="100" cy="100" rx="86" ry="32" transform="rotate(-32 100 100)"/><ellipse cx="100" cy="100" rx="86" ry="32" transform="rotate(32 100 100)"/><ellipse cx="100" cy="100" rx="30" ry="83"/><circle cx="100" cy="100" r="53" stroke-dasharray="1 5"/><circle class="orb-dot" cx="162" cy="62" r="4"/><circle class="orb-dot" cx="41" cy="139" r="3"/><circle class="orb-dot" cx="108" cy="20" r="3"/></svg>`;
  const authors = data.authors ? `<p class="hero-authors">${esc(data.authors)}${data.affiliation?'<br>'+esc(data.affiliation):''}</p>` : '';
  const heroTitle = `<h1 class="memory-title" data-title="${esc(data.name)}"><span class="title-core">${esc(data.name)}</span></h1><h2 class="subtitle">${esc(data.subtitle)}</h2>${authors}`;
  const subtitle = 'A world is more than what you see.<br>It is everything you remember.';
  const hero = `<section class="hero" aria-labelledby="page-title">${background}<div class="hero-layout"><div class="eyebrow hero-eyebrow">Beyond the frame. Beyond the moment.</div><div class="hero-title-row"><div>${heroTitle}</div>${orbit}</div><div class="hero-actions-row">${resources}<p class="hero-description">${subtitle}</p></div><div class="hero-bottom"><a class="scroll-cue" href="#abstract"><span>↓</span> DISCOVER WORLDSTATE</a></div></div></section>`;
  const themeToggle = `<button type="button" id="theme-toggle" class="theme-toggle" aria-label="Switch to light mode"><svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg><svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 14A8.8 8.8 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/></svg><span class="theme-label">Light mode</span></button>`;
  const placeholder = (label, featured=false) => `<div class="video-placeholder${featured?' featured-placeholder':''}" role="img" aria-label="${esc(label)} — video coming soon"><svg viewBox="0 0 40 32" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="3" width="34" height="26" rx="5"/><path d="m17 11 9 5-9 5z"/></svg>${featured?`<strong>${esc(label)}</strong>`:''}<span>Video coming soon</span></div>`;
  const media = (video, label, className='') => {
    const src=safeUrl(video?.src||'');
    return src ? `<video class="gif-video ${className}" data-src="${esc(src)}"${video.poster?` poster="${esc(safeUrl(video.poster))}"`:''} muted playsinline preload="none" controlslist="nodownload noremoteplayback noplaybackrate nofullscreen" disablepictureinpicture disableremoteplayback draggable="false" tabindex="-1" aria-label="${esc(label)}"></video>` : placeholder(label);
  };
  const feature=data.featuredVideo||{};
  const cover = `<figure class="featured-showcase featured-film" id="featured-video"><div class="featured-media">${feature.src?`<video src="${esc(safeUrl(feature.src))}" poster="${esc(safeUrl(feature.poster||''))}" controls playsinline preload="none" controlslist="nodownload nofullscreen" disablepictureinpicture disableremoteplayback aria-label="${esc(feature.title||'WorldState overview video')}"></video><button type="button" class="featured-play" aria-label="Play WorldState overview video"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 10 38 24 17 38Z" fill="currentColor"/></svg></button>`:placeholder(feature.title||'WorldState in motion',true)}</div></figure><p class="video-speed-note">Some videos are shown at accelerated playback speeds for more concise presentation.</p>`;

  const abstract = `<section id="abstract" class="section reveal"><div class="abstract-grid"><div><div class="eyebrow muted">01 — Abstract</div><h2>New horizons.<br>Shared memories.</h2><p class="abstract-kicker">Long-horizon generation with implicit memory.</p></div><div><p class="abstract-copy">${esc(data.abstract).replace(/WorldState/g,'<strong>WorldState</strong>')}</p><div class="principles"><div class="principle"><b>Editable</b><span>Independent erase & write</span></div><div class="principle"><b>Structured</b><span>Uniform temporal buckets</span></div><div class="principle"><b>Retrievable</b><span>Context-aware readout</span></div></div></div></div></section>`;
  const method = window.ImplicitMemory.markup(data);
  const comparisons = `<section id="comparisons" class="section reveal comparisons-section" aria-labelledby="comparisons-heading"><div class="section-heading"><div><div class="eyebrow">Model comparisons</div><h2 id="comparisons-heading">World Model Comparisons</h2></div><nav class="showcase-nav" aria-label="Video sections"><a href="#world-generation">World Exploration with Memory ↗</a><a href="#long-horizon-exploration">Long Horizon Exploration ↗</a></nav></div><div class="comparison-scroll" tabindex="0" role="region" aria-label="First visit and five-model video comparisons; scroll horizontally on smaller screens"><div class="comparison-table"><div class="comparison-models">${data.comparisonModels.map(model=>`<div class="comparison-model${model.id==='worldstate'?' ours':''}">${esc(model.name)}</div>`).join('')}</div>${data.comparisonRows.map((row,index)=>`${index===0 || row.group!==data.comparisonRows[index-1].group ? `<h3 class="comparison-group-heading">${esc(row.group)}</h3>` : ''}<article class="comparison-row" id="comparison-${esc(row.id)}" aria-label="${esc(row.title)}"><div class="comparison-cells" data-duration="${row.duration}">${data.comparisonModels.map(model=>`<div class="comparison-cell${model.id==='worldstate'?' ours':''}" data-model="${esc(model.id)}" aria-label="${esc(row.title)} — ${esc(model.name)}">${model.id==='firstvisit'?`<img class="comparison-video first-visit-frame" src="${esc(safeUrl(row.videos.firstvisit.image))}" alt="${esc(row.title)} — First Visit" loading="lazy" decoding="async">`:media(row.videos[model.id],row.title+' — '+model.name,'comparison-video')}</div>`).join('')}</div></article>`).join('')}</div></div></section>`;
  function videoSection(id,number,title,items,kind) {
    return `<section id="${id}" class="section reveal ${kind}-section" aria-labelledby="${id}-heading"><div class="section-heading"><div><div class="eyebrow">${number} — WorldState</div><h2 id="${id}-heading">${title}</h2></div></div><div class="showcase-grid ${kind}-grid">${items.map(video=>`<article class="showcase-card" id="${esc(video.id)}">${video.src?`<video class="showcase-video generation-video" src="${esc(safeUrl(video.src))}" poster="${esc(safeUrl(video.poster))}" controls controlslist="nodownload nofullscreen" disablepictureinpicture disableremoteplayback playsinline preload="none" aria-label="${esc(video.title)} video"></video>`:placeholder('World generation')}</article>`).join('')}</div></section>`;
  }
  const shortVideos=videoSection('world-generation','Memory','World Exploration with Memory',data.shortVideos,'short');
  const videos = `<section id="long-horizon-exploration" class="section reveal"><div class="section-heading"><div><h2>Long Horizon Exploration</h2></div><p>A collection of journeys, spatial revisits, and long-horizon explorations.</p></div><div class="video-grid">${data.videos.map((v,i)=>`<article class="video-card" id="video-${esc(v.id)}" data-category="${esc(v.category)}">${v.src?`<video controlslist="nodownload nofullscreen" disablepictureinpicture disableremoteplayback class="inline-gallery-video" src="${esc(safeUrl(v.src))}" poster="${esc(v.poster)}" controls playsinline preload="none" aria-label="${esc(v.title)} video"></video>`:`<button class="video-cover" data-video="${esc(v.id)}" aria-label="${v.src?'Play':'Preview cover for'} ${esc(v.title)}"><img src="${esc(v.poster)}" alt="${esc(v.tag)} scene cover" loading="lazy"><span class="cover-tag">${v.src?'Watch video':'Video coming soon'}</span><span class="play-icon" aria-hidden="true">${v.src?'▶':'↗'}</span></button>`}<div class="video-meta"><div><h3>${esc(v.title)}</h3></div><span class="video-number">0${i+1}</span></div>${v.prompt?`<div class="card-prompt"><span class="eyebrow">Prompt</span><p>${esc(v.prompt)}</p></div>`:''}</article>`).join('')}</div><p class="gallery-note">${data.videos.some(v=>!v.src)?'Scene covers are illustrative previews. Generated videos will be added here.':''}</p><div class="wide-callout"><h3>The view changes. The world remembers.</h3><p>WorldState · Scalable Implicit Memory for Interactive Video World Models</p></div></section>`;
  const refinerComparisons = (data.refinerComparisons || []).length ? `<section id="refiner-comparison" class="section reveal" aria-labelledby="refiner-heading"><div class="section-heading"><div><div class="eyebrow">04 — Refiner comparison</div><h2 id="refiner-heading">With and without refinement.</h2></div><p>Compare WorldState outputs with and without the refiner. Each video shows both versions side by side: without on the left, with on the right.</p></div><div class="refiner-list">${(data.refinerComparisons || []).map(v=>`<article class="refiner-card" id="refiner-${esc(v.id)}"><header class="refiner-card-heading"><h3>${esc(v.title)}</h3></header><div class="refiner-labels"><div><span>WorldState</span><strong>Without refiner</strong></div><div><span>WorldState</span><strong>With refiner</strong></div></div><video controlslist="nodownload nofullscreen" disablepictureinpicture disableremoteplayback class="refiner-video" src="${esc(safeUrl(v.src))}" poster="${esc(safeUrl(v.poster))}" controls playsinline preload="none" aria-label="${esc(v.title)} comparison: left without refiner, right with refiner" aria-describedby="refiner-caption-${esc(v.id)}"></video><p class="refiner-caption" id="refiner-caption-${esc(v.id)}">Left: without refiner <span aria-hidden="true">·</span> Right: with refiner</p></article>`).join('')}</div></section>` : '';
  document.getElementById('app').innerHTML = `<a class="skip" href="#abstract">Skip to content</a><header class="site-nav wrap"><a href="#" class="brand"><span class="brand-mark" aria-hidden="true"></span>${esc(data.name)}</a><nav class="nav-links" aria-label="Sections"><a href="#abstract">Abstract</a><a href="#method">Method</a><a href="#long-horizon-exploration">Explore ↗</a></nav><div class="nav-controls"><div class="nav-end"><span class="status-dot"></span> VIDEO WORLD MODELS</div>${themeToggle}</div></header><main class="wrap">${hero}${cover}${abstract}${method}${comparisons}${shortVideos}${videos}${refinerComparisons}</main><footer class="footer wrap"><a class="brand" href="#"><span class="brand-mark" aria-hidden="true"></span>${esc(data.name)}</a><span>Interactive worlds, lasting memories.</span><a href="#">Back to top ↑</a></footer><div class="toast" role="status" aria-live="polite"></div><dialog aria-labelledby="dialog-title"><div class="dialog-media"><button class="dialog-close" aria-label="Close preview">×</button><div id="dialog-visual"></div></div><div class="dialog-copy"><div class="eyebrow" id="dialog-status"></div><h3 id="dialog-title"></h3><p id="dialog-description"></p></div></dialog>`;
  const featuredPlayer = document.querySelector('#featured-video video');
  const featuredPlay = document.querySelector('#featured-video .featured-play');
  if (featuredPlayer && featuredPlay) {
    const updateFeaturedPlay = () => { featuredPlay.hidden = !featuredPlayer.paused && !featuredPlayer.ended; };
    featuredPlay.addEventListener('click', () => {
      featuredPlayer.play().catch(() => { featuredPlay.hidden = false; });
    });
    ['play', 'pause', 'ended', 'error'].forEach(event => featuredPlayer.addEventListener(event, updateFeaturedPlay));
    updateFeaturedPlay();
  }
  document.querySelector('h1').id='page-title';
  window.WorldStateTheme.apply(window.WorldStateTheme.mode);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    window.WorldStateTheme.toggle();
  });
  document.addEventListener('contextmenu',e=>{if(e.target.closest('video'))e.preventDefault();});
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('dblclick', event => event.preventDefault());
    video.addEventListener('webkitbeginfullscreen', () => {
      if (video.webkitExitFullscreen) video.webkitExitFullscreen();
    });
  });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement?.matches('video') && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  });
  window.WorldStateVideoLoops.mount();

  let toastTimer;
  document.querySelectorAll('[data-pending]').forEach(b=>b.addEventListener('click',()=>{
    const el=document.querySelector('.toast');el.textContent=`The ${b.dataset.pending.toLowerCase()} link will be available soon.`;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
  }));
  const tabs=[...document.querySelectorAll('.method-tab')];
  
  function setStep(i) {
    tabs.forEach((t,j)=>{t.setAttribute('aria-selected',i===j);t.tabIndex=i===j?0:-1;});
    document.getElementById('method-panel').setAttribute('aria-labelledby','step-'+i);
    const s=data.steps[i];
    for(const [id,value] of Object.entries({'method-title':s.title,'method-text':s.text,'method-formula':s.formula,'method-note':s.note}))document.getElementById(id).textContent=value;
    window.ImplicitMemory.setStep(i);
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>setStep(i));
    t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();setStep(n);tabs[n].focus();}});
  });setStep(0);
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');

  const dialog=document.querySelector('dialog');
  document.querySelectorAll('[data-video]').forEach(b=>b.addEventListener('click',()=>{
    const v=data.videos.find(v=>v.id===b.dataset.video);
    if (v.src) return;
    document.getElementById('dialog-visual').innerHTML=v.src?`<video controlslist="nodownload nofullscreen" disablepictureinpicture disableremoteplayback controls autoplay playsinline preload="metadata" poster="${esc(v.poster)}" src="${esc(safeUrl(v.src))}"></video>`:`<img src="${esc(v.poster)}" alt="${esc(v.tag)} scene cover">`;
    document.getElementById('dialog-title').textContent=v.title;
    document.getElementById('dialog-status').textContent=v.src?v.category:'Scene preview · Video coming soon';
    document.getElementById('dialog-description').textContent=v.description+(v.src?'':' This image is an illustrative cover, not a generated video result.');
    dialog.showModal();document.body.style.overflow='hidden';
  }));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';document.getElementById('dialog-visual').innerHTML='';});
  if(!motion.matches&&'IntersectionObserver' in window){
    document.body.classList.add('js-motion');
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.05});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }
})();
