/* Paljun Herra 2 – Tauko, häivytys ja ohjeet (pohja: Paljun herra 1) */
let PAUSED=false,FADE=0,lastKey='',RIP=[];const DESK=matchMedia('(hover:hover) and (pointer:fine)').matches;
function vib(p){try{if(p&&navigator.vibrate)navigator.vibrate(p)}catch(x){}}
function sceneKey(){return stage+(stage===1&&(state==='sauna'||(state==='over'&&(reason==='x'||reason==='y')))?'s':'')}
function setPause(v){PAUSED=v;document.body.classList.toggle('paused',!!v);const b=document.getElementById('pz');if(b)b.textContent=v?'▶ Jatka':'⏸ Tauko'+(typeof hk==='function'?hk('pause'):'');if(AC){v?AC.suspend():AC.resume()}}
function ptsSum(){let n=0;for(const k in PTS)n+=PTS[k]||0;return n}
function guideSeen(){try{return localStorage.getItem('ph_guide')==='1'}catch(x){return!!guideSeen.v}}
function markGuide(){guideSeen.v=1;try{localStorage.setItem('ph_guide','1')}catch(x){}}
function overlayFx(dt){
 RIP=RIP.filter(r=>(r.t+=dt)<.45);RIP.forEach(r=>{const u=r.t/.45;g.strokeStyle=`rgba(255,255,255,${.9*(1-u)})`;g.lineWidth=1.2;g.beginPath();g.arc(r.x,r.y,2+u*9,0,7);g.stroke();g.strokeStyle=`rgba(20,20,40,${.5*(1-u)})`;g.lineWidth=.6;g.beginPath();g.arc(r.x,r.y,3+u*9,0,7);g.stroke()});
 const k=sceneKey();if(k!==lastKey){if(lastKey)FADE=.45;lastKey=k}if(FADE>0){FADE=Math.max(0,FADE-dt);g.fillStyle=`rgba(0,0,0,${FADE/.45})`;g.fillRect(0,0,W,H)}
 if(PAUSED){g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,H);g.save();g.textAlign='center';g.font='bold 22px monospace';g.fillStyle='#fff';g.fillText('TAUKO',W/2,92);g.font='bold 8px monospace';g.fillStyle='#ddd';g.fillText('Napauta jatkaaksesi.',W/2,110);R('#20243a',99,119,122,13);R('#e8ecf4',100,120,120,11);g.font='bold 7px monospace';g.fillStyle='#20243a';g.fillText('⚙ ASETUKSET / OHJAIMET',W/2,128);if(stage!==1){R('#20243a',99,137,122,13);R('#e8ecf4',100,138,120,11);g.fillStyle='#20243a';g.fillText('⌂ PÄÄVALIKKOON',W/2,146)}g.restore()}}
cv.addEventListener('pointerdown',e=>{if(stage===5||PAUSED)return;const r=cv.getBoundingClientRect();RIP.push({x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height,t:0})});
addEventListener('keydown',e=>{if(e.key==='p'||e.key==='P'||e.key==='Escape'){setPause(!PAUSED)}});
{const pz=document.createElement('button');pz.id='pz';pz.addEventListener('click',()=>setPause(!PAUSED));const mm=document.createElement('button');mm.id='mm';mm.textContent='Musiikki: päällä';mm.addEventListener('click',()=>{muteM=!muteM;mm.textContent='Musiikki: '+(muteM?'pois':'päällä');if(musB)musB.gain.value=muteM?0:.8;audioInit()});
 const m=document.getElementById('m'),r2=document.createElement('div');r2.className='row r2';m.parentNode.insertBefore(r2,m);r2.append(m,mm,pz);setPause(false);
 const fsb=document.createElement('button');fsb.id='fs';r2.after(fsb);
 const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement,fsOK=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled);
 const fsLab=()=>{fsb.textContent=fsEl()?'⛶ Poistu koko näytöstä':'⛶ Koko näyttö'};fsLab();
 const toast=t=>{let el=document.getElementById('toast');if(!el){el=document.createElement('div');el.id='toast';el.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);max-width:min(92vw,420px);background:#141a3a;color:#fff;font:600 14px/1.4 system-ui,sans-serif;padding:10px 14px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.4);z-index:99;text-align:center';document.body.appendChild(el)}el.textContent=t;el.style.display='block';clearTimeout(el.t);el.t=setTimeout(()=>el.style.display='none',5500)};
 fsb.addEventListener('click',()=>{audioInit();const d=document,de=d.documentElement;
  if(fsEl()){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}
  if(!fsOK){toast(/iPhone|iPod/.test(navigator.userAgent)?'iPhone ei salli selainpelien koko näyttöä. Käännä puhelin vaakaan, tai avaa peli Safarissa ja valitse Jaa → Lisää Koti-valikkoon, niin peli aukeaa koko näytölle.':'Selain ei salli koko näyttöä tässä näkymässä. Avaa peli omaan välilehteen ja kokeile uudelleen.');return}
  try{const r=(de.requestFullscreen||de.webkitRequestFullscreen).call(de,{navigationUI:'hide'});if(r&&r.then)r.then(()=>{try{screen.orientation.lock('landscape').catch(()=>{})}catch(x){}}).catch(()=>toast('Koko näyttö ei onnistunut tässä selaimessa.'))}catch(x){toast('Koko näyttö ei onnistunut tässä selaimessa.')}});
 ['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{fsLab();setTimeout(fitCanvas,150)}));
 
 const ic=document.createElement('link');ic.rel='icon';ic.href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23141a3a'/><path d='M6 20 Q32 4 58 20' stroke='%233ad8a0' stroke-width='4' fill='none' opacity='.7'/><rect x='9' y='36' width='46' height='20' rx='3' fill='%238a5226'/><rect x='9' y='36' width='46' height='5' fill='%233ac8f0'/><circle cx='32' cy='30' r='8' fill='%23f0b890'/><path d='M23 27 Q31 8 42 15 L40 27 Z' fill='%23d8323c'/><rect x='23' y='25' width='18' height='4' rx='2' fill='%23fff'/><circle cx='43' cy='15' r='3.5' fill='%23fff'/><path d='M26 33 Q32 37 38 33' stroke='%23e0b030' stroke-width='2.5' fill='none'/></svg>";document.head.appendChild(ic);
 const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=180;c.getContext('2d').drawImage(im,0,0,180,180);const a=document.createElement('link');a.rel='apple-touch-icon';a.href=c.toDataURL('image/png');document.head.appendChild(a)}catch(x){}};im.src=ic.href}
