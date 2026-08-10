import { projects } from './data/projects.js?v=project-modal-1';

const groups = { Languages: ['Python','Java','C++','C#','JavaScript','PHP','SQL'], 'Web + APIs': ['HTML','CSS','REST APIs','FastAPI','WebSockets'], Systems: ['Linux','Ubuntu Server','nginx','Cloudflare','Networking','SSH','PostgreSQL'], 'Automation + Platforms': ['Power Automate','Canvas LMS APIs','Git','GitHub'], Security: ['Secure configuration','Privacy-aware processing','Access control','Threat-conscious design'] };
const categories = ['All', ...new Set(projects.map(p => p.category))]; let active = 'All';
const grid = document.querySelector('#project-grid'); const filters = document.querySelector('#filters'); const search = document.querySelector('#project-search');
const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
categories.forEach(name => { const b=document.createElement('button'); b.textContent=name; b.className=name==='All'?'active':''; b.addEventListener('click',()=>{active=name; filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render();}); filters.append(b); });
const mediaMarkup=(p,i,modal=false)=>{
  if(modal&&p.hoverMedia){return p.hoverMedia.includes('.mp4')?`<video src="${esc(p.hoverMedia)}" autoplay muted loop playsinline controls></video>`:`<img src="${esc(p.hoverMedia)}" alt="${esc(p.title)} animated project preview">`;}
  const base=p.image?`<img class="media-static" src="${esc(p.image)}" alt="${esc(p.title)} project preview" loading="lazy">`:`<div class="project-glyph" aria-hidden="true">${String(i+1).padStart(2,'0')}<span></span></div>`;
  if(!p.hoverMedia)return base;
  const hover=p.hoverMedia.includes('.mp4')?`<video class="media-hover" src="${esc(p.hoverMedia)}" muted loop playsinline preload="metadata"></video>`:`<img class="media-hover" src="${esc(p.hoverMedia)}" alt="" loading="lazy">`;
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
    const video=card.querySelector('video.media-hover');
    if(video){card.addEventListener('pointerenter',()=>video.play().catch(()=>{}));card.addEventListener('pointerleave',()=>{video.pause();video.currentTime=0;});}
  });
}

const modal=document.querySelector('#project-modal');
const modalContent=document.querySelector('#modal-content');
const modalClose=modal.querySelector('.modal-close');
let modalTrigger=null;
function openProject(slug,trigger){
  const p=projects.find(project=>project.slug===slug); if(!p)return;
  modalTrigger=trigger;
  modalContent.innerHTML=`<div class="modal-media">${mediaMarkup(p,projects.indexOf(p),true)}</div><div class="modal-copy"><p class="kicker">${esc(p.category)} · ${esc(p.year)}</p><div class="modal-heading"><h2 id="modal-title">${esc(p.title)}</h2><span>${esc(p.status)}</span></div><p class="modal-summary">${esc(p.description||p.summary)}</p><div class="tags">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="modal-highlights"><h3>At a glance</h3><ul>${p.features.slice(0,4).map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div><div class="modal-actions"><a class="button primary" href="/project.html?id=${encodeURIComponent(p.slug)}">View more <span>→</span></a>${p.github?`<a class="button" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>`:''}</div></div>`;
  modal.showModal(); document.body.classList.add('modal-open'); modalClose.focus();
}
function closeProject(){if(!modal.open)return;modal.close();document.body.classList.remove('modal-open');modalContent.querySelector('video')?.pause();modalTrigger?.focus();}
modalClose.addEventListener('click',closeProject);
modal.addEventListener('click',e=>{if(e.target===modal)closeProject();});
modal.addEventListener('cancel',e=>{e.preventDefault();closeProject();});
search.addEventListener('input',render); render();
document.querySelector('#skill-groups').innerHTML=Object.entries(groups).map(([k,v],i)=>`<article class="skill-group reveal"><span>0${i+1}</span><h3>${k}</h3><div>${v.map(x=>`<b>${x}</b>`).join('')}</div></article>`).join('');
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#nav'); menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);}); nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`);});}
const canvas=document.querySelector('#network'); const ctx=canvas.getContext('2d'); let nodes=[]; function size(){const d=Math.min(devicePixelRatio,1.5);canvas.width=canvas.clientWidth*d;canvas.height=canvas.clientHeight*d;ctx.setTransform(d,0,0,d,0,0);nodes=Array.from({length:matchMedia('(max-width:700px)').matches?18:34},()=>({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14}));} function draw(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);nodes.forEach((n,i)=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>canvas.clientWidth)n.vx*=-1;if(n.y<0||n.y>canvas.clientHeight)n.vy*=-1;for(let j=i+1;j<nodes.length;j++){const m=nodes[j],d=Math.hypot(n.x-m.x,n.y-m.y);if(d<150){ctx.strokeStyle=`rgba(75,180,255,${(1-d/150)*.16})`;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();}}ctx.fillStyle='rgba(111,215,255,.5)';ctx.beginPath();ctx.arc(n.x,n.y,1.2,0,7);ctx.fill();});requestAnimationFrame(draw);} size();addEventListener('resize',size);draw();
