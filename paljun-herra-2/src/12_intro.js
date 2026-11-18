/* Paljun Herra 2 – Introruutu ja tunnusmusiikki (pohja: Paljun herra 1) */
const TI={t:0,on:false,sel:0,f:0,ax:false,logo:null,stars:Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*120,s:Math.random()<.25?2:1,p:Math.random()*6,v:Math.random()<.5?2:5}))};
function titleLogo(){const c=document.createElement('canvas');c.width=300;c.height=96;const x=c.getContext('2d');x.textAlign='center';x.textBaseline='alphabetic';
 const F=(sz)=>`900 ${sz}px Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif`;
 const line=(t,y,sz)=>{x.font=F(sz);x.lineJoin='round';x.strokeStyle='#2a0a3a';x.lineWidth=9;x.strokeText(t,154,y+4);x.fillStyle='#2a0a3a';x.fillText(t,154,y+4);x.strokeText(t,150,y);
  const q=x.createLinearGradient(0,y-sz*.78,0,y);q.addColorStop(0,'#fff6b0');q.addColorStop(.18,'#ffe23a');q.addColorStop(.19,'#ffc020');q.addColorStop(.5,'#ff9a20');q.addColorStop(.51,'#ff7418');q.addColorStop(.8,'#e0401c');q.addColorStop(.81,'#b82418');q.addColorStop(1,'#8a1410');
  x.lineWidth=3;x.strokeStyle='#ffffff';x.strokeText(t,150,y);x.fillStyle=q;x.fillText(t,150,y)};
 line('PALJUN',42,44);line('HERRA 2',90,44);
 const id=x.getImageData(0,0,c.width,c.height),d=id.data;for(let i=0;i<d.length;i+=4){if(d[i+3]<120)d[i+3]=0;else{d[i+3]=255;for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]/36)*36}}x.putImageData(id,0,0);return c}
function titleHit(x,y){if(x>=104&&x<=216){if(y>=134&&y<147)return 0;if(y>=150&&y<163)return 1}return-1}
function titleMove(){TI.sel^=1;if(AC)tn(880,880,.05,.06,'square')}
function titlePress(){audioInit();if(AC&&AC.state!=='running')try{AC.resume()}catch(x){}if(!TI.on){TI.on=true;TI.f=.35;TI.sel=0;if(AC){[523,659,784,1047].forEach((f,i)=>tn(f,f,.09,.07,'square',i*.06));musicStart('t')}return}
 if(TI.sel===1){openCfg();return}if(AC)tn(1047,1568,.18,.08,'square');startGame()}
addEventListener('keydown',e=>{if(stage!==1||state!=='title'||PAUSED||CFG.open)return;if(e.key===' '||e.key==='Enter')return;
 if(TI.on&&['ArrowUp','ArrowDown','w','W','s','S'].includes(e.key)){e.preventDefault();titleMove();return}if(!TI.on&&e.key.length<=12&&!['p','P','Escape'].includes(e.key))titlePress()});
/* Revontulet välimuistikerroksena: kolme värinauhaa (AGI) aaltoilevat vaakasuunnassa. Piirretään taivaan jälkeen ja ennen
   maastoa, jotta vuoret, metsä ja rakennukset peittävät ne. x0, w = alue; y0, dy = ylimmän nauhan korkeus ja nauhojen väli;
   a1, f1 = pääaallon korkeus ja pituus; a2, f2 = väreilyn korkeus ja pituus; sp = aaltoilun nopeus */
function auroraSky(id,T,x0,w,y0,dy,a1,f1,a2,f2,sp){aurora(id,T,()=>AG.forEach((q2,r)=>{for(let x=x0;x<x0+w;x+=1.5){const y=y0+r*dy+Math.sin(x/f1+T*sp+r*1.7)*a1+Math.sin(x/f2+T)*a2;g.drawImage(AGI[r],0,0,1,(24-r*3)*2,x,y,1.7,24-r*3)}}))}
/* Yhteiset maisema-apurit (intro ja alkunäytös): vierivä tunturiharjanne ja lumikuusirivi; off = vierityksen siirtymä */
function ridge(off,base,amp,col,f1,f2){g.fillStyle=col;g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=4){const u=x+off;g.lineTo(x,base-Math.abs(Math.sin(u/f1))*amp-Math.sin(u/f2)*amp*.35)}g.lineTo(W,H);g.fill()}
function spruceRow(off,yb,col){off%=14;for(let i=-1;i<25;i++){const x=i*14-off+((i*37)%5),h=14+((i*53)%9);g.fillStyle=col||'#0c2a2a';g.beginPath();g.moveTo(x,yb-2-h);g.lineTo(x+6,yb);g.lineTo(x-6,yb);g.fill();g.fillStyle='#dfe8ff';g.fillRect(x-1,yb-h,2,2)}}
function drawTitle(T){const t=TI.t;
 let q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,'#05061a');q.addColorStop(.5,'#141a4a');q.addColorStop(.8,'#2a2a6a');q.addColorStop(1,'#3a3a7a');g.fillStyle=q;g.fillRect(0,0,W,H);
 TI.stars.forEach(s=>{const x=((s.x-t*s.v)%W+W)%W,a=.5+.5*Math.sin(T*3+s.p);g.fillStyle=`rgba(255,250,230,${.35+a*.65})`;g.fillRect(x|0,s.y|0,s.s,s.s)});
 auroraSky('intro',T,0,W,26,12,9,37,3,13,.6);
 {const mx=268,my=34;q=g.createRadialGradient(mx,my,4,mx,my,30);q.addColorStop(0,'rgba(255,244,200,.35)');q.addColorStop(1,'rgba(255,244,200,0)');g.fillStyle=q;g.fillRect(mx-30,my-30,60,60);g.fillStyle='#f4ecc0';g.beginPath();g.arc(mx,my,11,0,7);g.fill();g.fillStyle='rgba(170,160,110,.45)';[[-3,-2,3],[4,2,3.5],[-1,5,2]].forEach(m=>{g.beginPath();g.arc(mx+m[0],my+m[1],m[2],0,7);g.fill()})}
 ridge(t*3,128,34,'#2a2f66',53,23);
 ridge(t*7,150,16,'#1b2050',31,13);
 spruceRow(t*14,160);
 q=g.createLinearGradient(0,158,0,H);q.addColorStop(0,'#dfe8ff');q.addColorStop(1,'#9aaee0');g.fillStyle=q;g.fillRect(0,158,W,42);
 g.fillStyle='rgba(90,110,180,.25)';for(let i=0;i<6;i++){g.beginPath();g.ellipse((i*61+20)%W,172+(i*13)%22,22+(i*7)%14,2.5,0,0,7);g.fill()}g.fillStyle='#f4f8ff';g.beginPath();g.moveTo(10,H);g.quadraticCurveTo(30,160,62,158);g.quadraticCurveTo(96,160,112,H);g.fill();g.fillStyle='rgba(60,80,150,.35)';g.beginPath();g.ellipse(60,162,16,2.5,0,0,7);g.fill();
 // palju oikealla
 {const x0=226,y0=168;g.fillStyle='rgba(60,80,150,.35)';g.fillRect(x0-4,y0+22,78,4);for(let i=0;i<7;i++){g.fillStyle=i%2?'#7a4620':'#8e5428';g.fillRect(x0+i*10,y0,10,22)}g.fillStyle='#c8c8d4';g.fillRect(x0,y0+6,70,2);g.fillRect(x0,y0+15,70,2);g.fillStyle='#e8b06a';g.fillRect(x0-2,y0-3,74,3);
  [[SP.as,248,4],[SP.ws,276,2]].forEach(([sp,cx,ph])=>{const o=idle(T,ph);o.s=.62;o.aL=.9;o.aR=-.9;o.clip=[0,0,W,y0-3.5];if(sp===SP.ws)o.blush=.3;drawChar(sp,cx,y0-3+12.4+Math.sin(T*1.2+ph)*.5,o)});
  const wq=g.createLinearGradient(0,y0-6,0,y0);wq.addColorStop(0,'#60e0ff');wq.addColorStop(1,'#1a8ab8');g.fillStyle=wq;g.fillRect(x0+2,y0-4,66,2);g.save();g.globalCompositeOperation='lighter';const gq=g.createRadialGradient(x0+35,y0-4,2,x0+35,y0-4,40);gq.addColorStop(0,'rgba(80,220,255,.3)');gq.addColorStop(1,'rgba(80,220,255,0)');g.fillStyle=gq;g.fillRect(x0-10,y0-40,90,50);g.restore();
  for(let k=0;k<5;k++){const ph=(T*.3+k/5)%1,x=x0+8+k*13+Math.sin(ph*6+k)*3,y=y0-20-ph*36,r=3+ph*7,s2=g.createRadialGradient(x,y,0,x,y,r);s2.addColorStop(0,`rgba(225,232,255,${.5*(1-ph)})`);s2.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=s2;g.fillRect(x-r,y-r,2*r,2*r)}}
 // Esa sankariposeerauksessa
 {const o=idle(T,0);o.s=1.05;o.aR=-2.5+Math.sin(T*4)*.08;o.aL=.35;o.item='c';o.iR=-.3;drawChar(SP.e[0],58,160,o)}
 flakes.forEach(f=>{g.fillStyle='rgba(255,255,255,.85)';g.fillRect(f.x|0,f.y|0,1,1)});
 // logo
 if(!TI.logo)TI.logo=titleLogo();{const u=Math.min(1,t/.9),yb=-90+(1-Math.pow(1-u,3))*100+(u>=1?Math.sin(Math.max(0,t-.9)*7)*Math.exp(-(t-.9)*3)*4:0),sm=g.imageSmoothingEnabled;g.imageSmoothingEnabled=false;g.drawImage(TI.logo,10,yb|0,300,96);g.imageSmoothingEnabled=sm}
 g.save();g.textAlign='center';g.font='bold 7px monospace';g.fillStyle='#bfe8ff';if(t>.9)g.fillText('– PALUU OF DRUNKEN MASTER –',W/2,118);
 if(!TI.on){if(t>1.2&&Math.floor(T*2.2)%2===0){g.font='bold 10px monospace';g.fillStyle='#000';g.fillText('PAINA START',W/2+1,145);g.fillStyle='#ffe23a';g.fillText('PAINA START',W/2,144)}g.font='6px monospace';g.fillStyle='#c8d4ff';if(t>1.2)g.fillText(INP==='touch'?'napauta ruutua':INP==='gp'?'Start / '+gpG(GB.sel):'Enter / välilyönti / mikä tahansa näppäin',W/2,154)}
 else{['ALOITA PELI','ASETUKSET'].forEach((l,i)=>{const y=134+i*16,on=TI.sel===i;g.fillStyle=on?'rgba(255,226,58,.95)':'rgba(10,14,40,.75)';g.fillRect(104,y,112,13);g.fillStyle=on?'#2a0a3a':'#e8eeff';g.font='bold 8px monospace';g.fillText((on&&Math.floor(T*4)%2?'▶ ':'  ')+l,W/2,y+9.5)})}
 g.font='bold 5px monospace';g.fillStyle='#4a5694';g.fillText('© 2026 PALJUSOFT  ·  ESA & KUPARIBÄNDI',W/2,196);g.restore();
 if(TI.f>0){g.fillStyle=`rgba(255,255,255,${TI.f/.35})`;g.fillRect(0,0,W,H)}}
/* ---- Grafiikka (aina päällä): pikselimaailma 320x200, porrastetut värit + rasterointi, valojen hehku, teksti terävänä ---- */
try{localStorage.removeItem('ph_retro')}catch(x){}
