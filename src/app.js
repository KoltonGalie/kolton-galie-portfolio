import { projects } from './data/projects.js?v=reactive-ui-2';

const groups = { Languages: ['Python','Java','C++','C#','JavaScript','PHP','SQL'], 'Web + APIs': ['HTML','CSS','REST APIs','FastAPI','WebSockets'], Systems: ['Linux','Ubuntu Server','nginx','Cloudflare','Networking','SSH','PostgreSQL'], 'Automation + Platforms': ['Power Automate','Canvas LMS APIs','Git','GitHub'], Security: ['Secure configuration','Privacy-aware processing','Access control','Threat-conscious design'] };
const categories = ['All', ...new Set(projects.map(p => p.category))]; let active = 'All';
const grid = document.querySelector('#project-grid'); const filters = document.querySelector('#filters'); const search = document.querySelector('#project-search');
const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
categories.forEach(name => { const b=document.createElement('button'); b.textContent=name; b.className=name==='All'?'active':''; b.addEventListener('click',()=>{active=name; filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render();}); filters.append(b); });
const visualMarkup=(kind,i)=>{
  if(kind==='drone')return `<div class="project-visual drone-visual" aria-hidden="true"><div class="flight-hud"><span>CF-2.1</span><span>LINK <b>●</b></span></div><div class="flight-path"><i></i><i></i><i></i><i></i></div><div class="quadcopter"><div class="drone-arm arm-a"></div><div class="drone-arm arm-b"></div><div class="propeller prop-one"></div><div class="propeller prop-two"></div><div class="propeller prop-three"></div><div class="propeller prop-four"></div><div class="drone-body"><i></i></div></div><div class="telemetry"><span>ALT <b>1.42m</b></span><span>POLICY <b>ACTIVE</b></span></div><div class="ground-grid"></div></div>`;
  if(kind==='canvas')return `<div class="project-visual canvas-visual" aria-hidden="true"><div class="visual-window"><div class="window-bar"><i></i><i></i><i></i><b>COURSE OPERATIONS</b></div><div class="canvas-command"><span>FIND</span><strong>outdated content</strong><i>→</i><span>REPLACE</span></div><div class="course-rows"><span><i></i><b>COURSE_101</b><em>READY</em></span><span><i></i><b>COURSE_204</b><em>SCAN</em></span><span><i></i><b>COURSE_318</b><em>READY</em></span></div></div></div>`;
  if(kind==='redaction')return `<div class="project-visual redaction-visual" aria-hidden="true"><div class="document-scan"><div class="doc-label"><span>PII_SCAN</span><b>LOCAL</b></div><p><i></i><i class="redacted"></i><i></i></p><p><i class="short"></i><i></i><i class="redacted wide"></i></p><p><i></i><i class="redacted"></i><i class="short"></i></p><p><i class="redacted wide"></i><i></i></p><div class="scan-beam"></div><div class="scan-count">03 NAMES DETECTED</div></div></div>`;
  if(kind==='homelab')return `<div class="project-visual homelab-visual" aria-hidden="true"><div class="network-cloud">CF</div><div class="network-line line-one"></div><div class="network-line line-two"></div><div class="server-rack"><div><i></i><span>NGINX</span><b>●</b></div><div><i></i><span>APPS</span><b>●</b></div><div><i></i><span>DATA</span><b>●</b></div></div><div class="service-nodes"><i></i><i></i><i></i></div></div>`;
  return `<div class="project-glyph" aria-hidden="true">${String(i+1).padStart(2,'0')}<span></span></div>`;
};
const mediaMarkup=(p,i,modal=false)=>{
  if(modal&&p.hoverMedia){return p.hoverMedia.includes('.mp4')?`<video src="${esc(p.hoverMedia)}" ${p.image?`poster="${esc(p.image)}"`:''} autoplay muted loop playsinline controls></video>`:`<img src="${esc(p.hoverMedia)}" alt="${esc(p.title)} animated project preview">`;}
  const base=p.image?`<img class="media-static" src="${esc(p.image)}" alt="${esc(p.title)} project preview" loading="lazy">`:visualMarkup(p.visual,i);
  if(!p.hoverMedia)return base;
  const hover=p.hoverMedia.includes('.mp4')?`<video class="media-hover hover-video" data-src="${esc(p.hoverMedia)}" ${p.image?`poster="${esc(p.image)}"`:''} muted loop playsinline preload="none"></video>`:`<img class="media-hover hover-image" data-src="${esc(p.hoverMedia)}" alt="" decoding="async">`;
  return base+hover;
};
function render(){
  const q=search.value.trim().toLowerCase();
  const shown=projects.filter(p=>(active==='All'||p.category===active)&&(!q||[p.title,p.summary,p.category,...p.tech].join(' ').toLowerCase().includes(q)));
  grid.innerHTML=shown.map((p,i)=>`<article class="project-card reveal visible ${p.featured?'featured':''}" style="--i:${i}" data-project="${esc(p.slug)}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Preview ${esc(p.title)}"><div class="project-media ${p.image?'has-image':'generated'}">${mediaMarkup(p,i)}<span class="card-status">${esc(p.status)}</span><span class="hover-prompt" aria-hidden="true"><b>Explore project</b><i>↗</i></span></div><div class="project-info"><div><p>${esc(p.category)} · ${esc(p.year)}</p><h3>${esc(p.title)}</h3></div><span class="arrow">↗</span><p class="summary">${esc(p.summary)}</p><div class="tags">${p.tech.slice(0,4).map(t=>`<span>${esc(t)}</span>`).join('')}</div></div></article>`).join('');
  document.querySelector('#no-results').hidden=shown.length>0;
  grid.querySelectorAll('.project-card').forEach(card=>{
    const open=()=>openProject(card.dataset.project,card);
    card.addEventListener('click',open);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    const hover=card.querySelector('.media-hover');
    let unloadTimer;
    const loadHover=()=>{if(!hover||hover.dataset.loaded)return;clearTimeout(unloadTimer);hover.dataset.loaded='true';hover.src=hover.dataset.src;if(hover instanceof HTMLVideoElement)hover.load();};
    const unloadHover=()=>{if(!hover)return;clearTimeout(unloadTimer);unloadTimer=setTimeout(()=>{if(card.matches(':hover')||card.contains(document.activeElement))return;card.classList.remove('hover-ready','hover-active');if(hover instanceof HTMLVideoElement)hover.pause();hover.removeAttribute('src');hover.dataset.loaded='';if(hover instanceof HTMLVideoElement)hover.load();},2500);};
    card.addEventListener('pointerenter',loadHover,{passive:true});card.addEventListener('focusin',loadHover);
    card.addEventListener('pointerleave',unloadHover,{passive:true});card.addEventListener('focusout',unloadHover);
    if(hover instanceof HTMLImageElement){const ready=()=>card.classList.add('hover-ready');hover.addEventListener('load',ready);}
    if(hover instanceof HTMLVideoElement){
      const playHover=()=>{if(!card.classList.contains('hover-ready'))return;hover.play().then(()=>card.classList.add('hover-active')).catch(()=>card.classList.remove('hover-active'));};
      const ready=()=>{card.classList.add('hover-ready');if(card.matches(':hover')||card.contains(document.activeElement))playHover();}; hover.addEventListener('canplay',ready); if(hover.readyState>=3)ready();
      card.addEventListener('pointerenter',playHover);
      card.addEventListener('pointerleave',()=>{card.classList.remove('hover-active');hover.pause();hover.currentTime=0;});
      card.addEventListener('focusin',playHover);card.addEventListener('focusout',()=>{card.classList.remove('hover-active');hover.pause();hover.currentTime=0;});
    }
  });
}

const modal=document.querySelector('#project-modal');
const modalContent=document.querySelector('#modal-content');
const modalClose=modal.querySelector('.modal-close');
let modalTrigger=null;
function openProject(slug,trigger){
  const p=projects.find(project=>project.slug===slug); if(!p)return;
  modalTrigger=trigger;
  modalContent.innerHTML=`<div class="modal-media">${mediaMarkup(p,projects.indexOf(p),true)}</div><div class="modal-copy"><p class="kicker">${esc(p.category)} · ${esc(p.year)}</p><div class="modal-heading"><h2 id="modal-title">${esc(p.title)}</h2><span>${esc(p.status)}</span></div><p class="modal-summary">${esc(p.description||p.summary)}</p><div class="tags">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="modal-highlights"><h3>At a glance</h3><ul>${p.features.slice(0,4).map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div>${p.resources?.length?`<div class="modal-resources"><h3>Published tools</h3>${p.resources.map(r=>`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)} <span>↗</span></a>`).join('')}</div>`:''}<div class="modal-actions"><a class="button primary" href="/project.html?id=${encodeURIComponent(p.slug)}">View more <span>→</span></a>${p.github?`<a class="button" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>`:''}</div></div>`;
  activateMagnetics(modalContent);
  modal.showModal(); document.body.classList.add('modal-open'); modalClose.focus();
}
function closeProject(){if(!modal.open)return;modal.close();document.body.classList.remove('modal-open');modalContent.querySelector('video')?.pause();modalTrigger?.focus();}
modalClose.addEventListener('click',closeProject);
modal.addEventListener('click',e=>{if(e.target===modal)closeProject();});
modal.addEventListener('cancel',e=>{e.preventDefault();closeProject();});
search.addEventListener('input',render); render();
document.querySelector('#skill-groups').innerHTML=Object.entries(groups).map(([k,v],i)=>`<article class="skill-group reveal"><span>0${i+1}</span><h3>${k}</h3><div>${v.map(x=>`<b>${x}</b>`).join('')}</div></article>`).join('');
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function typeHeading(el){
  if(el.dataset.typed==='true')return; el.dataset.typed='true';
  const finalText=el.dataset.text||el.textContent; const typo=el.dataset.typo||finalText;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=finalText;return;}
  el.textContent=''; el.classList.add('is-typing');
  for(const char of typo){el.textContent+=char;await wait(42+Math.random()*34);}
  await wait(430);
  let shared=0; while(shared<typo.length&&typo[shared]===finalText[shared])shared++;
  while(el.textContent.length>shared){el.textContent=el.textContent.slice(0,-1);await wait(34);}
  for(const char of finalText.slice(shared)){el.textContent+=char;await wait(48+Math.random()*30);}
  await wait(900); el.classList.remove('is-typing'); el.classList.add('typed-complete');
}
const typingObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){typeHeading(entry.target);typingObserver.unobserve(entry.target);}}),{threshold:.55});
document.querySelectorAll('.scroll-type').forEach(el=>typingObserver.observe(el));
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#nav'); menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);}); nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`);});}
const canvas=document.querySelector('#network'); const ctx=canvas.getContext('2d'); let nodes=[],canvasActive=true,canvasFrame=0; function size(){const d=Math.min(devicePixelRatio,1.5);canvas.width=canvas.clientWidth*d;canvas.height=canvas.clientHeight*d;ctx.setTransform(d,0,0,d,0,0);nodes=Array.from({length:matchMedia('(max-width:700px)').matches?18:34},()=>({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14}));} function draw(){canvasFrame=0;if(matchMedia('(prefers-reduced-motion: reduce)').matches||!canvasActive||document.hidden)return;ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);nodes.forEach((n,i)=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>canvas.clientWidth)n.vx*=-1;if(n.y<0||n.y>canvas.clientHeight)n.vy*=-1;for(let j=i+1;j<nodes.length;j++){const m=nodes[j],d=Math.hypot(n.x-m.x,n.y-m.y);if(d<150){ctx.strokeStyle=`rgba(75,180,255,${(1-d/150)*.16})`;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();}}ctx.fillStyle='rgba(111,215,255,.5)';ctx.beginPath();ctx.arc(n.x,n.y,1.2,0,7);ctx.fill();});canvasFrame=requestAnimationFrame(draw);} function updateCanvas(active=canvasActive){canvasActive=active;if(canvasActive&&!document.hidden&&!canvasFrame)draw();else if((!canvasActive||document.hidden)&&canvasFrame){cancelAnimationFrame(canvasFrame);canvasFrame=0;}} size();addEventListener('resize',size);new IntersectionObserver(([entry])=>updateCanvas(entry.isIntersecting)).observe(canvas);document.addEventListener('visibilitychange',()=>updateCanvas());draw();

// Lightweight reactive layer: original, dependency-free, and disabled for touch/reduced motion.
const finePointer=matchMedia('(pointer:fine)').matches;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.querySelector('.scroll-progress');
let scrollQueued=false;
const reactiveLayers=[...document.querySelectorAll('.section-heading,.statement,.about-orbit')];
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;const ratio=max>0?scrollY/max:0;progress.style.transform=`scaleX(${ratio})`;if(!reducedMotion)reactiveLayers.forEach(el=>{const r=el.getBoundingClientRect();const shift=Math.max(-12,Math.min(12,(innerHeight/2-(r.top+r.height/2))*.022));el.style.setProperty('--scroll-shift',`${shift}px`);});scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
if(finePointer&&!reducedMotion){
  activateMagnetics();
  const heroContent=document.querySelector('.hero-content');
  document.querySelector('.hero')?.addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);heroContent.style.setProperty('--hero-x',`${x*11}px`);heroContent.style.setProperty('--hero-y',`${y*8}px`);});
}
function activateMagnetics(root=document){
  if(!finePointer||reducedMotion)return;
  root.querySelectorAll('.button:not([data-magnetic]),.filters button:not([data-magnetic]),.header-cta:not([data-magnetic])').forEach(el=>{
    el.dataset.magnetic='true';
    el.classList.add('magnetic');
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mag-x',`${(e.clientX-r.left-r.width/2)*.13}px`);el.style.setProperty('--mag-y',`${(e.clientY-r.top-r.height/2)*.18}px`);});
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px');});
  });
}
function activateCards(){
  document.querySelectorAll('.project-card:not([data-reactive])').forEach(card=>{
    card.dataset.reactive='true';
    if(!finePointer||reducedMotion)return;
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--card-x',`${x*100}%`);card.style.setProperty('--card-y',`${y*100}%`);card.style.setProperty('--tilt-y',`${(x-.5)*5}deg`);card.style.setProperty('--tilt-x',`${(.5-y)*4}deg`);});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
  });
}
activateCards();
const gridChanges=new MutationObserver(activateCards);gridChanges.observe(grid,{childList:true});
document.addEventListener('click',e=>{const target=e.target.closest('.button,.filters button');if(!target||reducedMotion)return;const r=target.getBoundingClientRect(),ripple=document.createElement('i');ripple.className='click-ripple';ripple.style.left=`${e.clientX-r.left}px`;ripple.style.top=`${e.clientY-r.top}px`;target.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove());});
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('#nav a').forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-40% 0px -50%'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
