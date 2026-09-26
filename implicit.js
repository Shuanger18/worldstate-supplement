/* Explanatory visualizations: synthetic state values, never model activations. */
window.ImplicitMemory = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const frac = n => n - Math.floor(n);
  const base = Array.from({length:64},(_,i)=>.12+.72*frac(Math.sin(i*13.13+1.7)*43758.54));
  const mask = i => (i%8>=2&&i%8<=4&&Math.floor(i/8)>=2&&Math.floor(i/8)<=5)?1:.06;
  const write = i => (i%8>=4&&Math.floor(i/8)>=3&&Math.floor(i/8)<=6)?.82:.035;
  const matrix = (id,label,mini=false) => `<div class="state-matrix${mini?' mini':''}" id="${id}" role="img" aria-label="${label}">${base.map(()=>'<i></i>').join('')}</div>`;
  function markup(data) {
    const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const figure = data.architecture;
    const architecture = `<figure class="architecture-overview" id="architecture"><div class="architecture-image"><img src="${esc(figure.src)}" width="${figure.width}" height="${figure.height}" alt="WorldState architecture showing temporal memory organization, context-aware routing, and decoupled memory editing" loading="lazy" decoding="async"></div><figcaption><div class="architecture-caption-heading"><strong>${esc(figure.title)}</strong></div>${figure.parts.map(part=>`<p><strong>${esc(part.lead)}</strong> ${esc(part.text)}</p>`).join('')}</figcaption></figure>`;
    return `<section id="method" class="section reveal"><div class="section-heading"><div><div class="eyebrow">02 — Inside the implicit memory</div><h2>What stays when<br>the view moves on?</h2></div><p>Visual experience becomes distributed associations in a recurrent state. Follow how those associations are edited, preserved, and read.</p></div>${architecture}<div class="method-shell implicit-method"><div class="method-tabs" role="tablist" aria-label="Method stages">${data.steps.map((s,i)=>`<button class="method-tab" id="step-${i}" role="tab" aria-selected="${i===0}" aria-controls="method-panel" tabindex="${i===0?0:-1}" data-step="${i}"><span>0${i+1}</span>${s.label}</button>`).join('')}</div><div id="method-panel" role="tabpanel" tabindex="0" aria-labelledby="step-0"><div class="method-intro"><div><h3 id="method-title"></h3><p id="method-text"></p></div><div><div class="method-formula" id="method-formula"></div><div class="method-note" id="method-note"></div></div></div><div id="method-stage"></div></div><div class="explainer-footer"><span class="legend-dot"></span><span>Synthetic associations illustrate the mechanism; colors and values are not measured activations.</span></div></div></section>`;
  }
  function paint(id, values, mode='normal') {
    const el=document.getElementById(id);if(!el)return;
    [...el.children].forEach((c,i)=>{c.style.setProperty('--cell',Math.max(.025,Math.min(.97,values[i])));c.classList.toggle('erased-cell',mode==='erase'&&mask(i)===1);c.classList.toggle('written-cell',mode==='write'&&write(i)>.1);});
    el.dataset.signature=values.reduce((a,v)=>a+v,0).toFixed(4);
  }
  let timer, stageObserver;
  function stopStage(){clearInterval(timer);stageObserver?.disconnect();}
  function playback(root,tick,ms,button) {
    let playing=!reduced.matches, visible=false;
    function refresh(){button.textContent=playing?'Ⅱ Pause':'▶ Play';button.setAttribute('aria-pressed',String(playing));}
    button.addEventListener('click',()=>{playing=!playing;refresh();});refresh();
    stageObserver=new IntersectionObserver(e=>{visible=e[0].isIntersecting;},{threshold:.2});stageObserver.observe(root);
    timer=setInterval(()=>{if(playing&&visible&&!document.hidden)tick();},ms);
    return ()=>{playing=false;refresh();};
  }
  function editStage(root) {
    root.innerHTML=`<div class="edit-controls"><div class="input-hint"><span class="mini-state-icon" aria-hidden="true">K,V</span><span>Current frame features<br><b>Independent control signals</b></span></div><label class="gate-control erase-gate">Erase gate <b>bₜ</b><input id="erase-gate" type="range" min="0" max="100" value="70"><output id="erase-value">0.70</output></label><label class="gate-control write-gate">Write gate <b>wₜ</b><input id="write-gate" type="range" min="0" max="100" value="80"><output id="write-value">0.80</output></label></div><div class="edit-flow"><div class="state-card"><div class="state-heading"><span>01</span> Retain</div>${matrix('state-before','Previous implicit state')}<div class="state-caption">Previous associations <b>Sₜ₋₁</b></div></div><div class="flow-arrow erase-arrow" aria-hidden="true">→<small>erase bₜ</small></div><div class="state-card"><div class="state-heading"><span>02</span> Erase selectively</div>${matrix('state-erased','State after selective erasure')}<div class="state-caption">Weaken selected associations</div></div><div class="flow-arrow write-arrow" aria-hidden="true">→<small>write wₜ</small></div><div class="state-card"><div class="state-heading"><span>03</span> Write independently</div>${matrix('state-written','State after independently controlled writing')}<div class="state-caption">Inject new associations <b>Sₜ</b></div></div></div><div class="demo-narration"><div><span class="narration-index">01 / 03</span><p id="edit-narration" aria-live="off"></p></div><button class="demo-play" type="button"></button></div><div class="demo-footnote"><span class="color-key erase-key"></span>Erase target <span class="color-key write-key"></span>New write <span>Drag either gate to see its independent effect. Single-state illustration of the editing operation.</span></div>`;
    let phase=2;
    function render(){
      const e=document.getElementById('erase-gate').value/100,w=document.getElementById('write-gate').value/100;
      document.getElementById('erase-value').textContent=e.toFixed(2);document.getElementById('write-value').textContent=w.toFixed(2);
      const erased=base.map((v,i)=>v*(1-e*mask(i)));
      paint('state-before',base);paint('state-erased',phase>=1?erased:base,phase>=1?'erase':'normal');paint('state-written',phase>=2?erased.map((v,i)=>v+w*write(i)):phase>=1?erased:base,phase>=2?'write':'normal');
      root.querySelectorAll('.state-card').forEach((c,i)=>c.classList.toggle('current-phase',phase===i));
      root.querySelector('.narration-index').textContent=`0${phase+1} / 03`;
      document.getElementById('edit-narration').textContent=['History lives as distributed key–value associations in the state.','The erase gate weakens selected associations; other channels remain.','The write gate adds new content without setting the erase strength.'][phase];
    }
    const pause=playback(root,()=>{phase=(phase+1)%3;render();},2800,root.querySelector('.demo-play'));
    for(const id of ['erase-gate','write-gate'])document.getElementById(id).addEventListener('input',()=>{pause();phase=2;render();});render();
  }
  function partitionStage(root) {
    root.innerHTML=`<div class="partition-header"><div><span class="eyebrow muted">A 16-frame latent sequence</span><p>4 equally sized intervals. 4 separate states.</p></div><span class="partition-equation">N = ⌈log₂16⌉ = 4</span></div><div class="latent-timeline" aria-label="16 latent frames grouped uniformly into four buckets">${Array.from({length:16},(_,i)=>`<span data-frame="${i+1}" style="--group:${Math.floor(i/4)}">${i+1}</span>`).join('')}</div><div class="partition-buckets">${Array.from({length:4},(_,i)=>`<div class="temporal-state" data-bucket="${i}"><div class="interval-label">FRAMES ${i*4+1}–${i*4+4}</div><div class="bucket-feed" aria-hidden="true">↓</div>${matrix('partition-'+i,'Implicit state for interval '+(i+1),true)}<div class="temporal-name">S${['₁','₂','₃','₄'][i]} <span class="bucket-status"></span></div><div class="bucket-fill"><i></i></div></div>`).join('')}</div><div class="timeline-control"><label for="latent-time">Latent frame <output id="time-value">10 / 16</output></label><input id="latent-time" type="range" min="1" max="16" value="10"><button class="demo-play" type="button"></button></div><div class="demo-narration"><div><span class="narration-index">WRITE → SEAL → ADVANCE</span><p id="partition-narration"></p></div></div><div class="demo-footnote">Each state contains distributed associations from its time interval. Sealed states receive no new writes and still undergo channel-wise decay.</div>`;
    const input=document.getElementById('latent-time');
    function render(){
      const t=+input.value,live=Math.floor((t-1)/4);document.getElementById('time-value').textContent=t+' / 16';
      root.querySelectorAll('[data-frame]').forEach(el=>{const n=+el.dataset.frame;el.classList.toggle('observed',n<=t);el.classList.toggle('now',n===t);});
      root.querySelectorAll('.temporal-state').forEach((el,i)=>{
        const count=Math.max(0,Math.min(4,t-i*4)),sealed=i<live,active=i===live;
        el.classList.toggle('sealed',sealed);el.classList.toggle('live',active);el.classList.toggle('empty',i>live);
        el.querySelector('.bucket-status').textContent=sealed?'Sealed · decay only':active?'Live · writing':'Awaiting frames';el.querySelector('.bucket-fill i').style.width=count*25+'%';
        paint('partition-'+i,base.map((v,j)=>count?(.1+.76*frac(Math.sin(j*9.7+i*3.2)*1942.4))*count/4*Math.pow(.98,Math.max(0,t-(i+1)*4)):.018));
      });
      document.getElementById('partition-narration').textContent=`Frame ${t} writes into S${['₁','₂','₃','₄'][live]}. ${live?`${live} earlier state${live>1?'s are':' is'} protected from later erasure and writing.`:'The first interval is accumulating its history.'}`;
    }
    const pause=playback(root,()=>{input.value=+input.value%16+1;render();},1100,root.querySelector('.demo-play'));input.addEventListener('input',()=>{pause();render();});render();
  }
  function routeStage(root) {
    root.innerHTML=`<div class="query-controls"><div><span class="eyebrow muted">Change the current context</span><p>Which history helps this view?</p></div><div class="query-options" role="group" aria-label="Choose query context">${['coast','lake','village'].map((v,i)=>`<button class="query-choice" data-query="${i}" aria-pressed="${i===0}"><img src="assets/${v}.webp" alt=""><span>${['Coast','Lake','Village'][i]}</span></button>`).join('')}</div></div><div class="route-diagram"><div class="query-source"><span class="query-symbol">Qₜ</span><span>Current query</span></div><div class="history-readout"><div class="readout-header"><span>SEALED IMPLICIT STATES</span><span>Positive weights · mean = 1</span></div><div class="routed-states">${Array.from({length:3},(_,i)=>`<div class="routed-state" data-route="${i}"><div class="route-weight">r${['₁','₂','₃'][i]} <output></output></div>${matrix('route-'+i,'Historical implicit state '+(i+1),true)}<div class="route-state-label">S${['₁','₂','₃'][i]}</div><div class="read-wire"><i></i></div></div>`).join('')}</div><div class="read-merge"><span>Weighted historical read</span><b>Σ rᵢ Sⁱ</b><span class="live-add">+ Sˡⁱᵛᵉ</span></div></div><div class="read-output">${matrix('route-output','Query-conditioned output features',true)}<b>Oₜ</b><span>Readout features</span></div></div><div class="unweighted-path"><span class="path-lock" aria-hidden="true">↳</span><span>UPDATE PATH</span><span class="unweighted-line"></span><b>Sˡⁱᵛᵉ: decay + erase + write</b><span>Completed states: decay only · independent of routing</span></div><div class="demo-narration"><div><span class="narration-index">CONTEXT → WEIGHTS → READOUT</span><p id="route-narration"></p></div><button class="demo-play" type="button"></button></div><div class="demo-footnote">Illustrative weights for one attention head. Query changes reweight stored associations; the memory states themselves are unchanged by this read.</div>`;
    let selected=0;
    const states=Array.from({length:3},(_,i)=>base.map((v,j)=>.1+.75*frac(Math.sin(j*8.7+i*13.1)*9247.31)));
    states.forEach((v,i)=>paint('route-'+i,v));
    function render(){
      const weights=Array.from({length:3},(_,i)=>i===selected?1.34:i===(selected+1)%3?.84:.82);
      root.querySelectorAll('.query-choice').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
      root.querySelectorAll('.routed-state').forEach((s,i)=>{s.style.setProperty('--route-weight',weights[i]);s.classList.toggle('preferred',i===selected);s.querySelector('output').textContent=weights[i].toFixed(2);});
      paint('route-output',base.map((v,j)=>(v*.25+states.reduce((sum,s,i)=>sum+s[j]*weights[i],0))/3.25));
      document.getElementById('route-narration').textContent=`The ${['coast','lake','village'][selected]} context gives S${['₁','₂','₃'][selected]} more weight. Other states still contribute. Memory editing stays independent of these read weights.`;
    }
    const pause=playback(root,()=>{selected=(selected+1)%3;render();},3300,root.querySelector('.demo-play'));
    root.querySelectorAll('.query-choice').forEach((b,i)=>b.addEventListener('click',()=>{pause();selected=i;render();}));render();
  }
  function setStep(i){stopStage();[editStage,partitionStage,routeStage][i](document.getElementById('method-stage'));}
  return {markup,setStep};
})();
