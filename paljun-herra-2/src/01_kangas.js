/* Paljun Herra 2 – Kangas, skaalaus ja piirtoapurit (pohja: Paljun herra 1) */
/* Kaikki apukankaat piirretään prosessorilla (willReadFrequently). Pikselimaailma luetaan joka kehys (getImageData), ja jos
   apukankaat olisivat näytönohjaimella, Chromium siirtää ne kesken pelin prosessorille ja jokainen piirto kopioituisi
   näytönohjaimelta takaisin (peli hidastui, jos valikossa odotti pitkään). Vain näkyvä pääkangas (#c) jää näytönohjaimelle. */
{const gc=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,opt){if(type==='2d'&&this.id!=='c')opt=Object.assign({willReadFrequently:true},opt);return gc.call(this,type,opt)}}
const cv=document.getElementById('c'),main=cv.getContext('2d'),W=320,H=200,wl=114;
// Kankaan suurin skaalaus: pikselimaailma on 320×200, isompi kangas vain kuormittaa
const MAX_SC=4;
let g=main,SC=2;function fitCanvas(){const r=cv.getBoundingClientRect(),dpr=window.devicePixelRatio||1,k=Math.min(MAX_SC,Math.max(2,Math.round((r.width||640)*dpr/320)));if(k!==SC||cv.width!==320*k){SC=k;cv.width=320*k;cv.height=200*k}main.setTransform(SC,0,0,SC,0,0);placeFx()}
{const sd=document.createElement('div');sd.id='side';sd.appendChild(document.getElementById('m'));cv.after(sd)}
/* Vinjetti ja pikselirivien varjo CSS-kerroksena (#fxov) kankaan sisäalueen päällä: ei piirtoa joka kehys */
function placeFx(){let el=placeFx.el;if(!el){el=placeFx.el=document.createElement('div');el.id='fxov';el.setAttribute('aria-hidden','true');document.body.appendChild(el)}
 const r=cv.getBoundingClientRect(),bl=cv.clientLeft,bt=cv.clientTop,w=cv.clientWidth,h=cv.clientHeight;
 Object.assign(el.style,{left:(r.left+bl+scrollX)+'px',top:(r.top+bt+scrollY)+'px',width:w+'px',height:h+'px'});el.style.setProperty('--row',(h/H)+'px')}
fitCanvas();['resize','orientationchange'].forEach(ev=>addEventListener(ev,()=>{clearTimeout(fitCanvas.t);fitCanvas.t=setTimeout(fitCanvas,120)}));
const tc=document.createElement('canvas').getContext('2d'),pats={};
function pat(c){const r=!!window.__lo&&g===window.__lo,key=c+(r?'|r':'');if(!pats[key]){const p=document.createElement('canvas');p.width=p.height=2;const q=p.getContext('2d');q.fillStyle=c;q.fillRect(0,0,1,1);q.fillRect(1,1,1,1);pats[key]=tc.createPattern(p,'repeat');if(!r)try{pats[key].setTransform(new DOMMatrix([.5,0,0,.5,0,0]))}catch(e){}}return pats[key]}
const R=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(a,b,w,h)};
const D=(c,a,b,w,h)=>{g.fillStyle=pat(c);g.fillRect(a,b,w,h)};
const mk=()=>{const c=document.createElement('canvas');c.width=W*2;c.height=H*2;return c};
const skyC=mk(),frC=mk();
function can(a,b){const q=g.createLinearGradient(a,0,a+7,0);q.addColorStop(0,'#6e3410');q.addColorStop(.35,'#f0a860');q.addColorStop(.6,'#c8702a');q.addColorStop(1,'#6e3410');g.fillStyle=q;g.fillRect(a,b,7,12);R('#e8e8e8',a,b,7,.8);R('#9a9a9a',a,b+.8,7,.5);R('#e8e8e8',a,b+11.2,7,.8);R('#f3e9d2',a+1.5,b+4.5,4,3);R('#8a4515',a+2,b+5.5,3,.5);R('#ffffff66',a+1.2,b+1.5,.6,9)}
const AG=[[47,224,138],[53,208,200],[138,92,240]].map(c=>{const q=main.createLinearGradient(0,0,0,24);q.addColorStop(0,`rgba(${c},0)`);q.addColorStop(.2,`rgba(${c},.55)`);q.addColorStop(.7,`rgba(${c},.22)`);q.addColorStop(1,`rgba(${c},0)`);return q});
const AGI=AG.map(q=>{const c=document.createElement('canvas');c.width=1;c.height=48;const x=c.getContext('2d');x.scale(1,2);x.fillStyle=q;x.fillRect(0,0,1,24);return c});
/* välimuistikerros: piirtää hitaasti muuttuvan kerroksen enintään 20 krt/s */const AUR={};function aurora(id,T,fn,alpha){let a=AUR[id];if(!a){const c=document.createElement('canvas');c.width=W*2;c.height=H*2;a=AUR[id]={c,x:c.getContext('2d'),t:-9}}if(T-a.t>=.05||T<a.t){a.t=T;const x=a.x;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,W*2,H*2);x.setTransform(2,0,0,2,0,0);const gs=g;g=x;try{fn()}finally{g=gs}}if(alpha===undefined)alpha=1;if(alpha<=0)return;const ga=g.globalAlpha;g.globalAlpha=ga*alpha;g.drawImage(a.c,0,0,W,H);g.globalAlpha=ga}
