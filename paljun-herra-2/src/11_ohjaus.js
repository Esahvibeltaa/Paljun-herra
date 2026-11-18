/* Paljun Herra 2 – Ohjaus: näppäimet, peliohjain, kosketus, asetukset (pohja: Paljun herra 1) */
const KDEF={up:['ArrowUp','w'],down:['ArrowDown','s'],left:['ArrowLeft','a'],right:['ArrowRight','d'],punch:['j',''],kick:['k',''],jump:[' ',''],hauki:['l',''],drink:[' ',''],wc:['w',''],sauna:['s',''],phauki:['h','']};
const GDEF={punch:2,kick:1,jump:0,hauki:3,pause:9,sel:0};
const ACTN={drink:'Juo olut',wc:'Vessa',sauna:'Sauna',phauki:'Hauki-naukku',up:'Ylös',down:'Alas',left:'Vasen',right:'Oikea',punch:'Lyönti',kick:'Potku',jump:'Hyppy',hauki:'Hauki',pause:'Tauko',sel:'Valitse (osoitin)'};
const GPN=['A','B','X','Y','LB','RB','LT','RT','Select','Start','L3','R3','D↑','D↓','D←','D→','Home'];
let KB,GB;
function loadB(){try{KB=JSON.parse(localStorage.getItem('ph_kb'))}catch(x){}try{GB=JSON.parse(localStorage.getItem('ph_gb'))}catch(x){}
 if(!KB||typeof KB!=='object')KB=JSON.parse(JSON.stringify(KDEF));if(!GB||typeof GB!=='object')GB={...GDEF};
 for(const k in KDEF)if(!Array.isArray(KB[k]))KB[k]=KDEF[k].slice();for(const k in GDEF)if(typeof GB[k]!=='number')GB[k]=GDEF[k]}
loadB();
function saveB(){try{localStorage.setItem('ph_kb',JSON.stringify(KB));localStorage.setItem('ph_gb',JSON.stringify(GB))}catch(x){}}
const nk=k=>k&&k.length===1?k.toLowerCase():k;
const kname=k=>!k?'–':({' ':'Välilyönti',ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',Escape:'Esc',Shift:'Shift',Control:'Ctrl',Alt:'Alt',Enter:'Enter',Tab:'Tab'}[k]||k.toUpperCase());
const GKEYS=new Set(Object.values(KDEF).flat().filter(Boolean));
let SYN=false;const CFG={open:false,listen:null};
function synth(type,key){const code=key===' '?'Space':key.startsWith('Arrow')?key:'Key'+key.toUpperCase();SYN=true;try{document.body.dispatchEvent(new KeyboardEvent(type,{key,code,bubbles:true,cancelable:true}))}finally{SYN=false}}
function canon(a){return a==='jump'?' ':{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',punch:'j',kick:'k',hauki:'l'}[a]}
['keydown','keyup'].forEach(tp=>addEventListener(tp,e=>{if(SYN)return;
 if(CFG.open){e.preventDefault();e.stopImmediatePropagation();if(tp!=='keydown')return;
  if(CFG.listen&&CFG.listen.t==='k'){if(e.key!=='Escape'){const k=(e.key==='Backspace'||e.key==='Delete')?'':nk(e.key);if(k){const GG=PG.includes(CFG.listen.a)?PG:FG;for(const a of GG)KB[a]=KB[a].map(x=>x===k?'':x)}KB[CFG.listen.a][CFG.listen.i]=k;saveB()}CFG.listen=null;renderCfg()}
  else if(e.key==='Escape')closeCfg();return}
 if(stage!==5&&stage!==7)return;const k=nk(e.key);let a=null;for(const x of FG)if(KB[x].includes(k)){a=x;break}
 if(a){e.preventDefault();e.stopImmediatePropagation();if(tp==='keydown'&&e.repeat&&!['up','down','left','right'].includes(a))return;synth(tp,canon(a))}
 else if(GKEYS.has(k)){e.preventDefault();e.stopImmediatePropagation()}},true));
const GPK={l:0,r:0,u:0,d:0},GPC={x:160,y:100,on:0};let gpPrev=[],gpName='',gpMsg=0;
addEventListener('gamepadconnected',e=>{gpName=e.gamepad.id;gpMsg=3.5;if(CFG.open)renderCfg()});
addEventListener('gamepaddisconnected',()=>{gpName='';for(const k in GPK)GPK[k]=0;if(CFG.open)renderCfg()});
function keysNow(){return{l:K.keys.l||GPK.l,r:K.keys.r||GPK.r,u:K.keys.u||GPK.u,d:K.keys.d||GPK.d}}
function fightMode(){return(stage===5&&K.ph==='fight')||(stage===7&&M.ph==='play')}
function goB(){if(state==='play'&&party>=100)startS2()}
function vis(id){const el=document.getElementById(id);return el&&el.offsetParent!==null&&!el.disabled?el:null}
function gpClick(){const r=cv.getBoundingClientRect();RIP.push({x:GPC.x,y:GPC.y,t:0});act({target:cv,clientX:r.left+GPC.x*r.width/W,clientY:r.top+GPC.y*r.height/H})}
function gpPoll(dt){let gp=null;try{const a=navigator.getGamepads?navigator.getGamepads():[];for(const p of a)if(p&&p.connected){gp=p;break}}catch(x){}
 if(!gp){gpPrev=[];return}if(!gpName){gpName=gp.id;gpMsg=3.5}
 const bt=gp.buttons.map(b=>!!(b.pressed||b.value>.5)),pr=i=>bt[i]&&!gpPrev[i],ax=gp.axes[0]||0,ay=gp.axes[1]||0;if(bt.some((b,i)=>b&&!gpPrev[i])||Math.abs(ax)>.5||Math.abs(ay)>.5)setInp('gp');
 const Lf=bt[14]||ax<-.45,Rt=bt[15]||ax>.45,Up=bt[12]||ay<-.45,Dn=bt[13]||ay>.45;
 if(CFG.open){if(CFG.listen&&CFG.listen.t==='g'){const i=bt.findIndex((b,j)=>b&&!gpPrev[j]);if(i>=0){GB[CFG.listen.a]=i;CFG.listen=null;saveB();renderCfg()}}else if(pr(1)||pr(8))closeCfg();gpPrev=bt;return}
 if(pr(8)){openCfg();gpPrev=bt;return}
 if(stage===1&&state==='title'&&!PAUSED){if(TI.on&&(pr(12)||pr(13)||(Up&&!TI.ax)||(Dn&&!TI.ax)))titleMove();TI.ax=Up||Dn;if(pr(GB.pause)||pr(GB.sel)||pr(0)){titlePress();gpPrev=bt;return}}
 if(pr(GB.pause))setPause(!PAUSED);
 if(fightMode()&&!PAUSED){GPC.on=0;GPK.l=Lf;GPK.r=Rt;GPK.d=Dn;GPK.u=Up;
  [['punch','P'],['kick','K'],['hauki','H']].forEach(([a,c])=>{if(pr(GB[a]))fPress(c)});if(pr(GB.jump))fPress('J')}
 else{for(const k in GPK)GPK[k]=0;
  const vx=Math.abs(ax)>.2?ax:(Rt?1:0)-(Lf?1:0),vy=Math.abs(ay)>.2?ay:(Dn?1:0)-(Up?1:0);
  if(vx||vy)GPC.on=1;GPC.x=Math.max(2,Math.min(W-2,GPC.x+vx*160*dt));GPC.y=Math.max(2,Math.min(H-2,GPC.y+vy*160*dt));
  if(pr(GB.sel)){GPC.on=1;if(PAUSED)setPause(false);else gpClick()}
  
  else if(!PAUSED&&pr(1)){if(stage===6)cutSkip();else{const b=vis('b');if(b)b.click()}}}
 gpPrev=bt}
function gpDraw(){if(gpMsg>0){gpMsg-=1/60;g.save();g.globalAlpha=Math.min(1,gpMsg);R('rgba(10,14,40,.85)',60,13,200,13);g.font='bold 7px monospace';g.textAlign='center';g.fillStyle='#bfffd0';g.fillText('Ohjain yhdistetty! Select = asetukset',160,22);g.restore()}
 if(!GPC.on||fightMode()||CFG.open)return;g.save();g.translate(GPC.x,GPC.y);g.fillStyle='#fff';g.strokeStyle='#111';g.lineWidth=.8;g.beginPath();g.moveTo(0,0);g.lineTo(0,10);g.lineTo(2.6,7.6);g.lineTo(4.6,11.6);g.lineTo(6.2,10.8);g.lineTo(4.3,7);g.lineTo(7.4,7);g.closePath();g.fill();g.stroke();g.restore()}
const cfgm=document.createElement('div');cfgm.id='cfgm';document.body.appendChild(cfgm);
cfgm.addEventListener('pointerdown',e=>{if(e.target===cfgm)closeCfg()});
function openCfg(){if(CFG.open)return;CFG.open=true;if(!(stage===1&&state==='ready'))setPause(true);cfgm.style.display='flex';renderCfg()}
function closeCfg(){CFG.open=false;CFG.listen=null;cfgm.style.display='none'}
function renderCfg(){const L=CFG.listen,isL=(t,a,i)=>L&&L.t===t&&L.a===a&&(t==='g'||L.i===i);
 const kb=(a,i)=>`<button class="kb${isL('k',a,i)?' lis':''}" data-t="k" data-a="${a}" data-i="${i}">${isL('k',a,i)?'Paina näppäintä…':kname(KB[a][i])}</button>`;
 const gb=a=>`<button class="kb${isL('g',a)?' lis':''}" data-t="g" data-a="${a}">${isL('g',a)?'Paina ohjaimen nappia…':gpG(GB[a])}</button>`;
 const nm=gpName.replace(/[<>&"]/g,'').slice(0,48);
 cfgm.innerHTML=`<div class="bx"><h2>⚙ Asetukset – ohjaimet</h2><p class="gpst">${nm?'🎮 Ohjain: '+nm+' ✓':'🎮 Ohjainta ei havaittu. Yhdistä ohjain ja paina jotain sen nappia.'}</p>
 <h3>Näppäimistö (taistelut)</h3><table>${['up','down','left','right','punch','kick','jump','hauki'].map(a=>`<tr><td>${ACTN[a]}</td><td>${kb(a,0)}</td><td>${kb(a,1)}</td></tr>`).join('')}</table>
 <p class="hint">Napauta kohtaa ja paina uutta näppäintä. Delete tyhjentää, Esc peruu. Tauko: P tai Esc.</p>
 <h3>Peliohjain${nm?(isPS()?' (PlayStation)':' (Xbox-asettelu)'):''}</h3><table>${['punch','kick','jump','hauki','pause','sel'].map(a=>`<tr><td>${ACTN[a]}</td><td colspan="2">${gb(a)}</td></tr>`).join('')}</table>
 <p class="hint">Liikkuminen: ristiohjain tai vasen tikku. Napautettavissa vaiheissa tikku liikuttaa osoitinta ja ${GPN[GB.sel]||'A'} napauttaa. Altaalla B = sauna, X = vessa, Y = Hauki, LB/RB = Lähdetään baariin. Muualla B = näytön nappi. Select avaa tämän valikon. PlayStation-ohjaimella näytetään ✕○□△-symbolit.</p>
 <h3>Kosketusnapit</h3><table><tr><td>Koko</td><td colspan="2"><div class="seg">${[[.85,"Pieni"],[1,"Normaali"],[1.2,"Iso"]].map(([v,n])=>`<button class="tsz${v===TS.size?" on":""}" data-v="${v}">${n}</button>`).join("")}</div></td></tr><tr><td>Kätisyys</td><td colspan="2"><button id="tsl" class="${TS.left?"on":""}">${TS.left?"Vasenkätinen: ristiohjain oikealla":"Oikeakätinen: ristiohjain vasemmalla"}</button></td></tr></table><p class="hint">Koskee taisteluiden ristiohjainta ja iskunappeja puhelimella.</p><div class="ca"><button id="cfgR">Palauta oletukset</button><button id="cfgC">Valmis</button></div></div>`;
 cfgm.querySelectorAll('.kb').forEach(b=>b.onclick=()=>{CFG.listen={t:b.dataset.t,a:b.dataset.a,i:+(b.dataset.i||0)};renderCfg()});
 cfgm.querySelectorAll('.tsz').forEach(b=>b.onclick=()=>{TS.size=+b.dataset.v;saveTS();renderCfg()});document.getElementById('tsl').onclick=()=>{TS.left=TS.left?0:1;saveTS();renderCfg()};document.getElementById('cfgR').onclick=()=>{KB=JSON.parse(JSON.stringify(KDEF));GB={...GDEF};saveB();CFG.listen=null;renderCfg()};document.getElementById('cfgC').onclick=closeCfg}
const FG=['up','down','left','right','punch','kick','jump','hauki'],PG=['drink','wc','sauna','phauki'],PCAN={drink:' ',wc:'w',sauna:'s',phauki:'h'};
var INP=DESK?'kb':'touch',HT=0,TS={size:1,left:0};try{Object.assign(TS,JSON.parse(localStorage.getItem('ph_ts')||'{}'))}catch(x){}
function applyTS(){pad.style.setProperty('--ts',TS.size);pad.style.flexDirection=TS.left?'row-reverse':''}applyTS();
function saveTS(){try{localStorage.setItem('ph_ts',JSON.stringify(TS))}catch(x){}applyTS()}
const PSN=['✕','○','□','△','L1','R1','L2','R2','Create','Options','L3','R3','↑','↓','←','→','PS'];
function isPS(){return/054c|playstation|dualsense|dualshock|wireless controller/i.test(gpName)}
function gpG(i){return(isPS()?PSN:GPN)[i]||('#'+i)}
const POOLGP={drink:()=>GB.sel,sauna:()=>1,wc:()=>2,phauki:()=>3};
function hk(a){if(INP==='gp'){const i=a in POOLGP?POOLGP[a]():GB[a];return i===undefined?'':' ('+gpG(i)+')'}if(INP==='kb'){if(a==='pause')return' (P)';const k=(KB[a]||[])[0];return k?' ('+kname(k)+')':''}return''}
function setT(id,t){const el=document.getElementById(id);if(el&&el.textContent!==t)el.textContent=t}
function updHints(){if(stage===1)setT('b','Juo olut'+hk('drink'));setT('w','Käy vessassa'+hk('wc'));setT('s','Mene saunaan'+hk('sauna'));setT('bp','LYÖNTI'+hk('punch'));setT('bk','POTKU'+hk('kick'));setT('bj','HYPPY'+hk('jump'));if(!PAUSED)setT('pz','⏸ Tauko'+hk('pause'));setT('go','Lähdetään baariin'+(INP==='gp'?' ('+gpG(4)+'/'+gpG(5)+')':''))}
function setInp(v){if(INP!==v){INP=v;updHints()}}
addEventListener('keydown',()=>{if(!SYN)setInp('kb')},true);addEventListener('pointerdown',e=>{if(e.pointerType==='touch')setInp('touch');else if(e.pointerType==='mouse'&&INP==='touch')setInp('kb')},true);
updHints();
/* ---- INTRORUUTU ---- */
