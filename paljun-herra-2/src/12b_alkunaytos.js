/* Paljun Herra 2 – Välinäytökset NES-elokuvakohtausten tyyliin: animoitu kuva ylhäällä, teksti kirjoituskoneena alla */
// Kuva-alue ja tekstialue (ruudun koordinaatit)
const CP={x:16,y:12,w:288,h:110},CTX={x:26,y:140,w:268,lh:11,font:'bold 8px monospace'};
// Säädettävät: kirjoitusnopeus (merkkiä/s), kohtauksen häivytys sisään ja loppuhäivytys mustaan (s), soittoäänen väli (s)
// minTap = aika repliikin alusta, ennen kuin napautus näyttää koko tekstin; minRead = lukuaika kokonaan näkyvälle repliikille ennen siirtymistä (s);
// readCps = lukunopeus (merkkiä/s): repliikin alusta on kuluttava vähintään pituus/readCps ennen siirtymistä
const CUTK={minTap:.25,minRead:.6,readCps:30,cps:38,fadeIn:.35,fadeOut:2.6,ring:1.3,snore:2.6,logoIn:1.5,subIn:1.2,titleWait:2.4};
// Puhujien nimien värit
const SPK={Esa:'#ffe23a',Pera:'#7dff9a'};
const CUT={list:null,i:0,sc:null,li:0,ch:0,t:0,fin:0,tt:0,rt:0,sn:0,sk:0,ls:0,full:-1,amb:0,endTitle:false,done:null};

/* Staattinen kerros piirretään kerran omaan kankaaseen (2x tarkkuus) ja kopioidaan joka kehys */
const CUTL={};
function cutLayer(id,fn){let c=CUTL[id];if(!c){c=CUTL[id]=mk();const x=c.getContext('2d');x.setTransform(2,0,0,2,0,0);const gs=g;g=x;try{fn()}finally{g=gs}}g.drawImage(c,0,0,W,H)}
/* Valohehku: säteittäinen liukuväri luodaan kerran kokoa ja väriä kohden, piirretään lisäävänä */
const GLOW={};
function glow(x,y,r,rgb,a){const k=r+'|'+rgb;let c=GLOW[k];if(!c){c=document.createElement('canvas');c.width=c.height=r*4;const q=c.getContext('2d'),gr=q.createRadialGradient(r*2,r*2,0,r*2,r*2,r*2);gr.addColorStop(0,`rgba(${rgb},1)`);gr.addColorStop(1,`rgba(${rgb},0)`);q.fillStyle=gr;q.fillRect(0,0,r*4,r*4);GLOW[k]=c}
 g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;g.drawImage(c,x-r,y-r,r*2,r*2);g.restore()}

/* ---- Välinäytöksen kulku ---- */
/* list = kohtaukset; done = jatko; endTitle = häivytyksen jälkeen pelin nimi mustalla */
function startCut(list,done,endTitle){stage=6;state='cut';CUT.list=list;CUT.done=done;CUT.endTitle=!!endTitle;CUT.fin=0;CUT.tt=0;CUT.amb=0;showPad(false);msgL=[''];cutScene(0)}
function cutScene(i){CUT.i=i;CUT.sc=CUT.list[i];CUT.t=0;CUT.li=0;CUT.ch=0;CUT.ls=0;CUT.full=-1;CUT.rt=0;CUT.sn=0}
/* Kohtauksen musiikki (merkkijono tai repliikin mukaan valitseva funktio); käynnistyy myös, jos ääni avautuu vasta kesken näytöksen */
function cutMusic(m){if(!AC)return;if(!m){if(mus)musicStop();return}if(!mus||mus.m!==m){if(mus)musicStop();musicStart(m)}}
function cutFinish(){musicStop();CUT.fin=0;CUT.tt=0;CUT.done()}
function cutWrap(){return wrapLines([CUT.sc.lines[CUT.li][1]],CTX.w,CTX.font)}
function cutLen(){return cutWrap().reduce((a,l)=>a+l.length,0)}
function stepCut(dt){musicTick();CUT.t+=dt;
 // mökin ja kentän taustaäänet (tuuli, poreet) pois näytöksen ajaksi
 if(ambG&&!CUT.amb){CUT.amb=1;setAP(ambG.gain,0,.05);setAP(bubG.gain,0,.05)}
 if(CUT.tt){CUT.tt+=dt;cutMusic('vt');return}
 if(CUT.fin){CUT.fin+=dt;if(CUT.fin>=CUTK.fadeOut){if(CUT.endTitle){CUT.fin=0;CUT.tt=1e-6;musicStop()}else cutFinish()}return}
 const m=CUT.sc.music;if(m!==undefined)cutMusic(typeof m==='function'?m(CUT.li):m);
 const n=cutLen();if(CUT.t>CUTK.fadeIn&&CUT.ch<n){const p=CUT.ch|0;CUT.ch=Math.min(n,CUT.ch+CUTK.cps*dt);if(CUT.ch>=n)CUT.full=CUT.t;if((CUT.ch|0)!==p&&p%3===0&&AC)tn(1180,1180,.025,.022,'square')}
 if(CUT.sc.tick)CUT.sc.tick(dt)}
/* Napautus: ensin koko repliikki näkyviin, sitten seuraava repliikki tai kohtaus; viimeisen jälkeen hidas häivytys mustaan.
   Nopeat peräkkäiset painallukset eivät ohita kohtauksia: häivytyksen aikana ja ennen lukuaikaa (minTap, minRead) painallus ei tee mitään */
function cutReady(){return CUT.full>=0&&CUT.t-CUT.full>=CUTK.minRead&&CUT.t-CUT.ls>=cutLen()/CUTK.readCps}
function actCut(e){if(CUT.tt){if(CUT.tt>CUTK.titleWait)cutFinish();return}if(CUT.fin)return;const tap=e&&e.target===cv&&e.clientX!==undefined;
 if(tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(x>240&&y>184){cutSkip();return}}
 if(CUT.t<CUTK.fadeIn)return;
 if(CUT.ch<cutLen()){if(CUT.t-CUT.ls>=CUTK.minTap){CUT.ch=cutLen();CUT.full=CUT.t}return}
 if(!cutReady())return;
 if(CUT.li<CUT.sc.lines.length-1){CUT.li++;CUT.ch=0;CUT.ls=CUT.t;CUT.full=-1;return}
 if(CUT.i<CUT.list.length-1)cutScene(CUT.i+1);else{CUT.fin=1e-6;if(mus)setAP(mus.g.gain,0,CUTK.fadeOut/3)}}
function cutSkip(){if(stage===6)cutFinish()}
addEventListener('keydown',e=>{if(stage===6&&!PAUSED&&(e.key==='s'||e.key==='S'))cutSkip()});
function drawCut(T){if(CUT.tt){drawCutTitle(T);return}R('#000',0,0,W,H);g.save();g.beginPath();g.rect(CP.x,CP.y,CP.w,CP.h);g.clip();CUT.sc.draw(T,CUT.t);g.restore();
 g.strokeStyle='#3a4270';g.lineWidth=1;g.strokeRect(CP.x-.5,CP.y-.5,CP.w+1,CP.h+1);
 const fi=1-CUT.t/CUTK.fadeIn;if(fi>0)R(`rgba(0,0,0,${fi})`,CP.x,CP.y,CP.w,CP.h);
 cutText(T);if(CUT.fin)R(`rgba(0,0,0,${Math.min(1,CUT.fin/CUTK.fadeOut)})`,0,0,W,H)}
function cutText(T){const who=CUT.sc.lines[CUT.li][0],L=cutWrap();let left=CUT.ch|0;g.save();g.textAlign='left';
 if(who){g.font='bold 7px monospace';g.fillStyle=SPK[who]||'#fff';g.fillText(who.toUpperCase(),CTX.x,CTX.y-4)}
 g.font=CTX.font;g.fillStyle='#f0f2ff';L.forEach((l,i)=>{if(left>0)g.fillText(l.slice(0,left),CTX.x,CTX.y+8+i*CTX.lh);left-=l.length});
 if(cutReady()&&Math.floor(T*3)%2===0){g.fillStyle='#ffe23a';g.fillText('▼',CTX.x+CTX.w-6,CTX.y+8+3*CTX.lh)}
 g.font='bold 5px monospace';if(!AC){g.fillStyle='#8a90c0';g.fillText('♪ Napauta: äänet päälle',CTX.x,196)}g.textAlign='right';g.fillStyle='#5a6090';g.fillText((INP==='touch'?'':INP==='gp'?gpG(1)+': ':'S: ')+'OHITA ▶▶',W-6,196);g.restore()}

/* ---- Kohtaus 1: krapulainen mökki ja soiva puhelin ---- */
function mokkiBg(){const X=CP.x,Y=CP.y,FY=Y+92;
 R('#3b2412',X,Y,CP.w,CP.h);for(let y=Y;y<FY;y+=8){R('#6a4422',X,y,CP.w,6);R('#7c5230',X,y,CP.w,1.5);R('#2a160a',X,y+6,CP.w,2)}
 for(let i=0;i<9;i++)ell(X+12+i*33+(i*17)%11,Y+3+((i*5)%10)*8,2,1.4,'#4e3018');
 R('#4a2c14',X,FY,CP.w,CP.h-92);for(let x=X;x<X+CP.w;x+=23)R('#36200e',x,FY,1,CP.h-92);R('#2a160a',X,FY,CP.w,1.5);
 // ikkuna: Lapin yö, kuu ja lumiset kuuset
 {const wx=196,wy=22,ww=46,wh=34;R('#2a160a',wx-3,wy-3,ww+6,wh+6);g.fillStyle=mkLg(wy,wy+wh,[[0,'#060a24'],[1,'#1e2a5a']]);g.fillRect(wx,wy,ww,wh);
  for(let i=0;i<12;i++)R('#e8ecff',wx+(i*13)%ww,wy+(i*7)%20,1,1);ell(wx+34,wy+8,4,4,'#f4ecc0');
  R('#cfdcf4',wx,wy+wh-7,ww,7);for(let i=0;i<5;i++){const x=wx+4+i*10;g.fillStyle='#0c2a2a';g.beginPath();g.moveTo(x,wy+wh-16);g.lineTo(x+4,wy+wh-6);g.lineTo(x-4,wy+wh-6);g.fill()}
  R('#2a160a',wx+ww/2-1,wy,2,wh);R('#2a160a',wx,wy+wh/2-1,ww,2);R('#e8f0ff',wx-3,wy+wh+3,ww+6,2)}
 // juliste ja hylly
 R('#c8323c',120,22,22,28);R('#ffe23a',123,26,16,3);R('#f4f4f4',124,32,14,12);R('#1a1a20',128,35,6,6);
 R('#4e3018',36,34,48,3);[40,48,56,70].forEach((x,i)=>{i%2?can(x,22):bottle(x,21)});
 // sohvan selkänoja ja nojatuolin selkä
 R('#7a1e26',22,60,92,22);R('#8e2a32',22,60,92,3);R('#5e161c',22,78,92,4);
 R('#2f5a3a',248,62,42,28);R('#3e7048',248,62,42,3);
 // lattian roinat: pizzalaatikko ja kaatuneet tölkit
 R('#c89a5a',56,110,24,5);R('#a87a3a',56,110,24,1);R('#d8c8a8',212,112,8,3);R('#c8702a',224,113,6,3)}
function mokkiFurniture(ans){
 // sohvan istuinosa ja käsinojat (Esan edessä)
 R('#9a2a32',22,80,92,10);R('#b0363e',22,80,92,1.5);R('#6a161e',16,66,9,28);R('#6a161e',111,66,9,28);R('#2a0a0e',24,90,4,4);R('#2a0a0e',108,90,4,4);
 // pöytä
 R('#3a200c',130,92,4,18);R('#3a200c',182,92,4,18);R('#a8262c',124,88,68,15);for(let x=124;x<192;x+=6)R('#d8d0c0',x,88,3,15);R('#e8e0d0',124,88,68,1.2);R('#6a161a',124,102,68,1);
 can(140,77);can(172,77);bottle(160,76);R('#b8c8d8',152,86,6,2);
 // nojatuolin istuin ja käsinojat (Hempukan edessä)
 R('#3e7048',246,92,46,14);R('#2f5a3a',244,80,6,26);R('#2f5a3a',288,80,6,26);R('#1a2a1a',248,106,4,4);R('#1a2a1a',286,106,4,4)}
function cutMokki(T,t){cutLayer('mokki',mokkiBg);const ring=CUT.li===1,ans=CUT.li>=2;
 // Hempukka nukkuu nojatuolissa, Kermis on nukahtanut pöydän ääreen, Aapeli lattialla
 drawChar(SP.w,269,108,{s:.72,blink:true,tilt:.28,aL:.25,aR:-.25,bob:Math.sin(T*1.3)*.4});
 drawChar(SP.k,154,106,{s:.72,blink:true,tilt:.45,rot:.22,aR:-.5,aL:.5,bob:1+Math.sin(T*1.1+1)*.3});
 drawChar(SP.a,186,111,{s:.72,blink:true,rot:1.57,bob:Math.sin(T*1.2+2)*.3});
 if(ans){const o={s:.72,blink:((t%3.4)<.12),aR:-2.75,eR:-1.9,aL:.25,tilt:-.08,qL:.5,qR:.5};drawChar(SP.e[2],62,96,o);R('#14141c',65,63,3,6);R('#6ad0ff',66,64,1,3)}
 else drawChar(SP.e[2],104,75,{s:.72,blink:true,rot:-1.57,bob:Math.sin(T*1.4)*.4});
 mokkiFurniture(ans);
 // puhelin pöydällä: värisee ja hehkuu soidessa
 if(!ans){const j=ring?Math.sin(T*90)*.7:0;R('#14141c',145+j,85,8,3);R(ring?'#6ad0ff':'#22283a',146+j,85,6,1)}
 R('rgba(6,8,34,.38)',CP.x,CP.y,CP.w,CP.h);
 glow(219,40,26,'120,150,255',.18);
 if(ring){glow(149,84,18,'110,210,255',.5+.3*Math.sin(T*16));g.font='bold 6px monospace';g.textAlign='center';const k=Math.floor(T*6)%2;tx(k?'♪':'♫',149+Math.sin(T*5)*8,74-(T*10)%8,'#bfefff','center')}
 if(ans)glow(66,66,10,'110,210,255',.35);
 g.font='bold 6px monospace';if(!ans)zzz(84,62,T);zzz(272,66,T+1);zzz(166,70,T+2);zzz(222,98,T+3)}
/* Mökin äänet: hiljainen kuorsaus puhelimen soittoon asti, sitten soittoääni */
function mokkiSound(dt){if(CUT.li===0){CUT.sn-=dt;if(CUT.sn<=0){CUT.sn=CUTK.snore;sSnore(CUT.sk=(CUT.sk+1)%4)}}else if(CUT.li===1){CUT.rt-=dt;if(CUT.rt<=0){CUT.rt=CUTK.ring;sRing()}}}

/* ---- Kohtaus 2: vihreä takasiipinen Tesla kiitää Lapin yössä ---- */
function tieSky(){const X=CP.x,Y=CP.y;g.fillStyle=mkLg(Y,Y+96,[[0,'#03041a'],[.6,'#121a4a'],[1,'#26306a']]);g.fillRect(X,Y,CP.w,96);
 for(let i=0;i<60;i++)R(i%5?'#c8ccf0':'#ffffff',X+(i*53)%CP.w,Y+(i*29)%60,i%7?1:1.5,i%7?1:1.5);ell(266,30,8,8,'#f4ecc0');ell(263,28,2,2,'#c8bf90')}
/* Tesla Model 3 (Highland) sivuprofiilina, nokka oikealle: matala pyöreä nokka, pitkä kalteva tuulilasi, yhtenäinen kattokaari viistoperään,
   musta lasikatto, kapeat viiltovalot ja tummat aerovanteet. Lisänä iso takasiipi. Mitat auton keskeltä, maa y=0. */
const TESLA={body:'#2fae4a',shade:'#1d7a32',dark:'#145a24',hi:'#7ae890',glass:'#04060a',win:'#070a12',wheels:[-25,24],sc:1.2};
function teslaPath(){g.beginPath();g.moveTo(-38,-2.5);g.lineTo(-40,-6);g.lineTo(-40,-12.5);g.quadraticCurveTo(-39.5,-15,-36,-15.4);g.quadraticCurveTo(-22,-23.5,-8,-24.8);
 g.quadraticCurveTo(0,-24.8,4,-22.5);g.lineTo(16,-14.6);g.quadraticCurveTo(32,-12.5,39,-9.5);g.quadraticCurveTo(41.5,-7,39.5,-3.5);g.lineTo(38,-2.5);g.closePath()}
function teslaCar(T,t){const C=TESLA,sp=t*36;
 // valokeila tielle ja takavalon hehku
 g.fillStyle='rgba(255,248,200,.16)';g.beginPath();g.moveTo(38,-9);g.lineTo(150,-14);g.lineTo(150,6);g.lineTo(38,-6);g.fill();
 glow(37,-9,12,'255,250,210',.8);glow(-39,-13,8,'255,40,40',.7);
 // lumipöllähdys takapyörän takaa
 for(let k=0;k<12;k++){const p=(t*2.6+k/12)%1;g.globalAlpha=(1-p)*.8;R('#e8f0ff',-31-p*52,-2-Math.sin(p*Math.PI)*9-(k%3),1+p*2,1+p*2)}g.globalAlpha=1;
 // kori: perusväri, alaosan varjo ja helman tumma reuna rajattuna korin muotoon
 g.fillStyle=C.body;teslaPath();g.fill();g.save();teslaPath();g.clip();R(C.shade,-41,-7,82,5);R(C.dark,-41,-3.6,82,2);g.restore();
 // olkalinjan heijastus
 g.strokeStyle=C.hi;g.lineWidth=.6;g.beginPath();g.moveTo(-35,-15);g.quadraticCurveTo(-8,-14.6,31,-12.2);g.stroke();
 // musta lasikatto ja sivuikkunat; katon reunassa kapea korinvärinen kaari
 g.fillStyle=C.glass;g.beginPath();g.moveTo(14.5,-14.8);g.lineTo(3.4,-22.3);g.quadraticCurveTo(-.5,-24,-8,-24);g.quadraticCurveTo(-21,-22.6,-32,-16.2);g.quadraticCurveTo(-10,-16,14.5,-14.8);g.fill();
 g.fillStyle=C.win;g.beginPath();g.moveTo(12.4,-15.2);g.lineTo(3,-21.6);g.quadraticCurveTo(-1,-22.9,-4.6,-23);g.lineTo(-4.6,-15.7);g.fill();
 g.beginPath();g.moveTo(-6.6,-15.8);g.lineTo(-6.6,-23.1);g.quadraticCurveTo(-17,-22,-26.5,-17.2);g.fill();
 g.strokeStyle=C.body;g.lineWidth=.7;g.beginPath();g.moveTo(3.2,-22.9);g.quadraticCurveTo(-.5,-24.5,-8,-24.5);g.quadraticCurveTo(-21,-23.1,-31.5,-16.8);g.stroke();
 R('#26344c',1,-21,3,.5);R('#26344c',-12,-21.6,3,.5);
 // ovien saumat, upotetut kahvat ja sivupeili
 R(C.dark,-5.4,-15.4,.5,11);R(C.dark,-21,-16.4,.5,11.6);R(C.dark,-1.4,-12.8,3,.7);R(C.dark,-17.4,-13.4,3,.7);g.fillStyle=C.body;g.beginPath();g.ellipse(11.5,-15.6,2.2,1.2,.3,0,7);g.fill();
 // iso takasiipi
 R('#111316',-35,-21,1.6,6);R('#111316',-29,-21.5,1.6,6);R('#111316',-44,-23.5,19,2.6);R(C.body,-44,-23.5,19,.8);R('#111316',-44,-25,1.5,4.5);R('#111316',-26.5,-25,1.5,4.5);
 // viiltovalot ja takavalo
 g.lineCap='round';g.strokeStyle='#fff8d0';g.lineWidth=.9;g.beginPath();g.moveTo(37.6,-9.3);g.lineTo(31.5,-9.9);g.stroke();
 g.strokeStyle='#ff3030';g.lineWidth=1.2;g.beginPath();g.moveTo(-39.4,-13.2);g.lineTo(-35,-13.8);g.stroke();
 // pyöränkaaret ja tummat aerovanteet
 for(const wx of C.wheels){ell(wx,-2,7.3,7.3,'#07090a');ell(wx,-2,6,6,'#0a0a0e');ell(wx,-2,4.2,4.2,'#1c2026');
  for(let k=0;k<5;k++){const a=sp+k*1.2566;lim(wx+Math.cos(a)*1,-2+Math.sin(a)*1,wx+Math.cos(a+.5)*3.8,-2+Math.sin(a+.5)*3.8,.9,'#555c6a','#24282f')}ell(wx,-2,1,1,'#3a3e48')}}
function cutTie(T,t){cutLayer('tie',tieSky);
 aurora('tie',T,()=>AG.forEach((q2,r)=>{for(let x=CP.x;x<CP.x+CP.w;x+=1.5){const y=CP.y+8+r*10+Math.sin(x/41+T*.5+r*1.7)*8+Math.sin(x/15+T)*3;g.drawImage(AGI[r],0,0,1,(24-r*3)*2,x,y,1.7,24-r*3)}}));
 ridge(t*10,86,24,'#232a5e',53,23);ridge(t*26,96,12,'#171c48',31,13);spruceRow(t*70,104,'#0a2226');
 R('#c8d4f0',CP.x,102,CP.w,5);R('#1a1c26',CP.x,107,CP.w,12);R('#2a2c36',CP.x,107,CP.w,1);R('#dfe8ff',CP.x,119,CP.w,3);
 const off=(t*320)%44;for(let x=CP.x-off;x<CP.x+CP.w;x+=44)R('#d8d8c0',x,112.5,18,1.2);
 g.save();g.translate(148,114+Math.sin(T*22)*.35);g.scale(TESLA.sc,TESLA.sc);teslaCar(T,t);g.restore();
 for(const f of flakes){const x=CP.x+(((f.x-t*160)%CP.w)+CP.w)%CP.w;R('rgba(255,255,255,.85)',x,CP.y+f.y*CP.h/H,1.5,1)}}

/* ---- Kohtaus 3: auton sisältä pelkääjän paikalta; kuski näkyy vain hämäränä ääriviivana ---- */
const VP={x:150,y:50};
// Pera takaa: pään keskipiste ja säteet, pipon tupsu (täysin pyöreä: säde pr, keskikohta py), penkin selkänojan yläreuna sy ja väri
// Sisänäkymän mitat: katon reuna sivuilla (roofE) ja keskellä (roofC), A-pilarin leveys ylhäällä ja alhaalla, kojelaudan korkeus
const CABIN={roof:'#0a0c14',pillar:'#05060b',roofE:34,roofC:22,aTop:46,aBot:12,dash:96};
// Tyhjä matkustajan penkki: keskikohta, selkänojan yläreuna, niskatuen yläreuna ja puolileveydet
const PSEAT={x:220,sy:70,hy:44,hw:12,w:30};
const PERA={x:74,y:58,rx:15,ry:16.5,pr:5.5,py:34,sy:70,seat:'#07090f'};
function sisaBg(){const X=CP.x,Y=CP.y;g.fillStyle=mkLg(Y,VP.y,[[0,'#02030c'],[1,'#141c42']]);g.fillRect(X,Y,CP.w,VP.y-Y);
 for(let i=0;i<40;i++)R('#b8c0e8',X+(i*67)%CP.w,Y+(i*31)%30,1,1);
 g.fillStyle='#10163a';g.beginPath();g.moveTo(X,VP.y);for(let x=X;x<=X+CP.w;x+=6)g.lineTo(x,VP.y-3-Math.abs(Math.sin(x/37))*7);g.lineTo(X+CP.w,VP.y);g.fill();
 g.fillStyle=mkLg(VP.y,Y+CP.h,[[0,'#5a6aa0'],[1,'#c8d4f0']]);g.fillRect(X,VP.y,CP.w,Y+CP.h-VP.y);
 g.fillStyle='#22263a';g.beginPath();g.moveTo(VP.x-2,VP.y);g.lineTo(VP.x+2,VP.y);g.lineTo(X+CP.w+40,Y+CP.h);g.lineTo(X-40,Y+CP.h);g.closePath();g.fill()}
function cutSisa(T,t){g.save();g.translate(0,Math.sin(T*27)*.3);cutLayer('sisa',sisaBg);
 // tien keskiviiva, heijastinpylväät ja kuuset kiitävät kohti katsojaa
 for(let k=0;k<6;k++){const u=(t*1.5+k/6)%1,y=VP.y+u*u*60,w=.4+u*2.6;R('#e8e8c8',VP.x-w/2,y,w,.6+u*u*7)}
 for(let k=0;k<5;k++){const u=(t*1.2+k/5)%1,d=u*u,y=VP.y+d*58;for(const s of[-1,1]){const x=VP.x+s*(6+d*190);R('#e0e0e8',x,y-1-d*12,.5+d*2,1+d*12);R('#ff9a2a',x,y-1-d*12,.5+d*2,.6+d*2)}}
 for(let k=0;k<7;k++){const u=(t*.9+k/7)%1,d=u*u,y=VP.y+d*40;for(const s of[-1,1]){const x=VP.x+s*(18+d*300),h=3+d*70;g.fillStyle='#08162a';g.beginPath();g.moveTo(x,y-h);g.lineTo(x+h*.28,y);g.lineTo(x-h*.28,y);g.fill()}}
 for(let k=0;k<26;k++){const a=k*2.4,u=(t*.8+k*.618)%1,r=u*u*170,x=VP.x+Math.cos(a)*r,y=VP.y+Math.sin(a)*r*.55;g.globalAlpha=u;lim(x,y,x+Math.cos(a)*r*.06,y+Math.sin(a)*r*.033,.6,'#ffffff','rgba(255,255,255,.3)')}g.globalAlpha=1;
 // katto, peili, viistot A-pilarit ja kojelauta
 const Y0=CP.y,X0=CP.x,X1=CP.x+CP.w,AP=CABIN;
 g.fillStyle=AP.roof;g.beginPath();g.moveTo(X0,Y0);g.lineTo(X1,Y0);g.lineTo(X1,AP.roofE);g.quadraticCurveTo(150,AP.roofC,X0,AP.roofE);g.closePath();g.fill();
 g.strokeStyle='rgba(110,200,255,.1)';g.lineWidth=.6;g.beginPath();g.moveTo(X0+AP.aTop,AP.roofE-3);g.quadraticCurveTo(150,AP.roofC+1,X1-AP.aTop,AP.roofE-3);g.stroke();
 R(AP.pillar,149,Y0,2,9);g.fillStyle=AP.pillar;g.beginPath();g.roundRect(138,Y0+8,24,7,2);g.fill();R('#1a2436',140,Y0+9.5,20,1);
 g.fillStyle=AP.pillar;for(const s2 of[-1,1]){const xe=s2<0?X0:X1;g.beginPath();g.moveTo(xe,Y0);g.lineTo(xe-s2*AP.aTop,Y0);g.lineTo(xe-s2*AP.aBot,AP.dash);g.lineTo(xe,AP.dash);g.fill()}
 g.strokeStyle='rgba(110,200,255,.14)';for(const s2 of[-1,1]){const xe=s2<0?X0:X1;g.beginPath();g.moveTo(xe-s2*AP.aTop,AP.roofE-2);g.lineTo(xe-s2*AP.aBot,AP.dash);g.stroke()}
 g.fillStyle=AP.pillar;g.beginPath();g.moveTo(X0,96);g.quadraticCurveTo(150,84,X1,94);g.lineTo(X1,CP.y+CP.h);g.lineTo(X0,CP.y+CP.h);g.fill();
 // keskinäyttö: kartta ja reitti
 const sx=124,sy=88;R('#0a0c12',sx-1,sy-1,42,25);R('#0b2232',sx,sy,40,23);for(let i=0;i<5;i++)R('#123448',sx+((i*9+t*6)%40),sy,1,23);
 g.strokeStyle='#3aa8ff';g.lineWidth=1.2;g.beginPath();g.moveTo(sx+20,sy+22);g.lineTo(sx+20,sy+12);g.lineTo(sx+28+Math.sin(t)*2,sy+2);g.stroke();
 R('#ffffff',sx+19,sy+14,2,3);g.font='bold 4px monospace';tx('142',sx+3,sy+6,'#bfefff');
 glow(sx+20,sy+11,30,'60,170,255',.22);
 // kuski takaa nähtynä: iso musta pää pipoineen ja pyöreine tupsuineen; penkin selkänoja peittää kaulan.
 // Näytön valo hipaisee juuri ja juuri pään, pipon ja selkänojan reunaa.
 const P=PERA,kc='#030409',rim=.25+.2*Math.sin(T*2.3)+(Math.sin(T*.9)>.97?.4:0);
 ell(P.x,P.y,P.rx,P.ry,kc);g.fillStyle=kc;g.beginPath();g.ellipse(P.x,P.y-6,P.rx+1,P.ry-3,0,Math.PI,0);g.fill();R(kc,P.x-P.rx-2,P.y-9,P.rx*2+4,6);
 g.beginPath();g.arc(P.x,P.py,P.pr,0,Math.PI*2);g.fill();
 lim(98,88,106,99,4,kc,kc);
 g.fillStyle=P.seat;g.beginPath();g.moveTo(42,CP.y+CP.h);g.lineTo(44,P.sy+8);g.quadraticCurveTo(45,P.sy,56,P.sy);g.lineTo(92,P.sy);g.quadraticCurveTo(103,P.sy,104,P.sy+8);g.lineTo(106,CP.y+CP.h);g.fill();
 g.strokeStyle=`rgba(110,200,255,${rim})`;g.lineWidth=.8;g.beginPath();g.arc(P.x,P.y,P.rx+.5,-.6,.75);g.stroke();
 g.beginPath();g.ellipse(P.x,P.y-6,P.rx+1.4,P.ry-2.6,0,-1.25,-.1);g.stroke();g.beginPath();g.arc(P.x,P.py,P.pr+.3,-1.3,.9);g.stroke();
 g.strokeStyle=`rgba(110,200,255,${rim*.6})`;g.beginPath();g.moveTo(92,P.sy);g.quadraticCurveTo(103,P.sy,104,P.sy+8);g.stroke();
 // tyhjä matkustajan penkki: selkänoja ja siihen yhtenäinen niskatuki; näytön puoleista reunaa valaisee heikosti
 {const Q=PSEAT,x=Q.x,b=CP.y+CP.h;g.fillStyle=PERA.seat;g.beginPath();g.moveTo(x-Q.w,b);g.lineTo(x-Q.w+1,Q.sy+8);g.quadraticCurveTo(x-Q.w+2,Q.sy,x-Q.w+10,Q.sy);g.lineTo(x-Q.hw,Q.sy);g.lineTo(x-Q.hw,Q.hy+8);
  g.quadraticCurveTo(x-Q.hw,Q.hy,x,Q.hy);g.quadraticCurveTo(x+Q.hw,Q.hy,x+Q.hw,Q.hy+8);g.lineTo(x+Q.hw,Q.sy);g.lineTo(x+Q.w-10,Q.sy);g.quadraticCurveTo(x+Q.w-2,Q.sy,x+Q.w-1,Q.sy+8);g.lineTo(x+Q.w,b);g.fill();
  R('#0c0f18',x-Q.hw+2,Q.sy-4,Q.hw*2-4,.8);
  g.strokeStyle=`rgba(110,200,255,${rim*.7})`;g.lineWidth=.8;g.beginPath();g.moveTo(x-Q.hw,Q.sy);g.lineTo(x-Q.hw,Q.hy+8);g.quadraticCurveTo(x-Q.hw,Q.hy,x-2,Q.hy);g.stroke();
  g.beginPath();g.moveTo(x-Q.w+1,Q.sy+10);g.quadraticCurveTo(x-Q.w+2,Q.sy,x-Q.w+10,Q.sy);g.stroke()}
 // ratti
 g.strokeStyle='#06070c';g.lineWidth=3.2;g.beginPath();g.ellipse(80,104,18,8,-.15,0,7);g.stroke();g.strokeStyle=`rgba(110,200,255,${rim*.5})`;g.lineWidth=.6;g.beginPath();g.ellipse(80,104,19.4,9.2,-.15,-1.2,.2);g.stroke();
 g.restore();R('rgba(10,30,60,.12)',CP.x,CP.y,CP.w,CP.h)}

/* Alkunäytös: krapula → puhelu → Tesla Lapin yössä → auton sisällä → häivytys mustaan */
const INTRO_CUT=[
 {draw:cutMokki,tick:mokkiSound,music:li=>li>=2?'n':null,lines:[['','Lappi. Mökki. Bileiden jälkeinen aamuyö. Sankarit potevat ankaraa krapulaa.'],['','PIRRR... PIRRR...'],['Esa','Nnngh... Esa. Kuka soittaa tähän aikaan?']]},
 {draw:cutTie,music:'d2',lines:[['Pera','Hei Esa, Pera tässä. Meillä on ongelma.'],['Esa','Mitä on tapahtunut?']]},
 {draw:cutSisa,music:'d2',lines:[['Pera','Mersumies on palannut.'],['Pera','Sam Discon palvelin on kaapattu...']]}];

/* Loppu: pelin nimi esiin mustalla, Viimeinen tuoppi soi, alareunassa Paljusoft; napautus aloittaa pelin */
function drawCutTitle(T){const t=CUT.tt;R('#000',0,0,W,H);
 TI.stars.forEach(s=>{const a=.5+.5*Math.sin(T*3+s.p);g.fillStyle=`rgba(255,250,230,${(.15+a*.35)*Math.min(1,t)})`;g.fillRect(s.x|0,s.y|0,s.s,s.s)});
 if(!TI.logo)TI.logo=titleLogo();const sm=g.imageSmoothingEnabled;g.globalAlpha=Math.min(1,t/CUTK.logoIn);g.imageSmoothingEnabled=false;g.drawImage(TI.logo,10,40,300,96);g.imageSmoothingEnabled=sm;g.globalAlpha=1;
 g.save();g.textAlign='center';if(t>CUTK.subIn){g.globalAlpha=Math.min(1,(t-CUTK.subIn)/.8);g.font='bold 8px monospace';g.fillStyle='#bfe8ff';g.fillText('– PALUU OF DRUNKEN MASTER –',W/2,150);g.globalAlpha=1}
 if(t>CUTK.titleWait&&Math.floor(T*2.2)%2===0){g.font='bold 8px monospace';g.fillStyle='#ffe23a';g.fillText(INP==='touch'?'NAPAUTA: ALOITA':INP==='gp'?'PAINA '+gpG(GB.sel)+': ALOITA':'ENTER: ALOITA',W/2,178)}
 if(t>CUTK.subIn){g.globalAlpha=Math.min(1,(t-CUTK.subIn)/.8);g.font='bold 5px monospace';g.fillStyle='#4a5694';g.fillText('© 2026 PALJUSOFT  ·  ESA & KUPARIBÄNDI',W/2,195);g.globalAlpha=1}g.restore()}
