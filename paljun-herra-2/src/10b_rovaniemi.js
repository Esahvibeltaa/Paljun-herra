/* Paljun Herra 2 – Kenttä 1: Rovaniemen keskusta (Jätkänkynttilä-silta → Koskikatu → Lordin aukio).
   Mätkintämoottorin (10_mattinta) päälle: oma tausta, uudet dieselsällit, lukitut latausasemat ja Lordin aukion kioski ja vanhus. */

// ---- Uudet viholliset: haalarimies ja toppahaalarinen takatukka (värimuunnokset ykkösosan hahmoista) ----
SP.hm=buildSpr(recol(genPena,{'#2a3a6a':'#3a4a5a','#1c2850':'#26323e','#3a4a7a':'#4a5a6a','#e8e040':'#e8e8e8','#b02020':'#1a1a1a','#8a1818':'#0e0e0e','#5a5a62':'#5a3a2a','#45454c':'#3e2618'}));
SP.tk=buildSpr(recol(genTapsa,{'#1e1e28':'#2a3a1a','#121218':'#1a2410','#f0f0f0':'#e07a20','#8a5a2a':'#d8b860','#6a4420':'#b09040','#8a8a94':'#3a4a2a'}));
// Sali-Make: hidas mutta kovaa lyövä lihaskimppu toppiksessa keskellä talvea
function genMake(){LY={};const sk='#e8a882',sd='#c4845e';bare(sk,sd);L('torso');P(9,21,8,12,'#f0f0f0');P(15,21,2,12,'#c8c8d0');P(10,22,6,1,'#e8c040');P(12,23,2,1,'#e8c040');
 ['armL','armR'].forEach((n,i)=>{L(n);P(i?20:4,25,2,3,'#f4c4a0')});sLegs('#4a4a54','#3a3a44','#f4f4f4','#c8c8d0');['legL','legR'].forEach((n,i)=>{L(n);P(i?17:8,36,1,12,'#f4f4f4')});
 sFace(sk,sd);P(8,12,10,2,'#111');P(9,12,2,1,'#5a6a8a');P(14,12,2,1,'#5a6a8a');P(12,15,2,1,sd);P(10,17,6,1,'#8a4a40');P(9,18,8,2,'#c49a7a');P(8,6,10,4,'#2a1a10');P(8,9,1,2,'#2a1a10');P(17,9,1,2,'#2a1a10');return sk}
SP.sm=buildSpr(genMake);
KT.hm={sp:'hm',hp:36,spd:30};KT.tk={sp:'tk',hp:48,spd:26,dm:1.15,sc:1.05};KT.sm={sp:'sm',hp:120,spd:16,dm:1.8,sc:1.18,nm:'SALI-MAKE'};
MSAY.e.push('Haalarimies: Täällä tankataan dieseliä!','Takatukka: Tukka edessä bisnes, takana bileet!','Takatukka: Latausasema on nyt diesel-asema!');

// ---- Lapin vanhus: karvalakki, pitkä valkoinen parta, turkki ja punainen nenä ----
function genVanhus(){LY={};const sk='#e0b494',sd='#c0906c',c='#5a3a22',cd='#3e2614',f='#e4dccc',fur='#a88a62';
 sBody(c,cd,sk,sd,12);L('torso');P(7,21,12,2,fur);P(7,30,12,1,'#1a1a1a');P(12,30,2,1,'#c8a040');
 sLegs('#3a2a1e','#2a1e14','#2a1a10','#5a4a3a');
 sFace(sk,sd);P(9,13,2,1,'#1a1a2a');P(14,13,2,1,'#1a1a2a');P(12,14,2,2,'#d87070');
 P(8,11,4,1,f);P(14,11,4,1,f);P(9,15,8,1,'#f4f0e6');P(8,16,10,4,f);P(9,20,8,3,f);P(10,23,6,3,f);P(11,26,4,2,f);
 P(7,4,12,6,'#7a5a3a');P(8,3,10,1,'#7a5a3a');P(6,8,14,3,fur);P(6,10,2,6,fur);P(18,10,2,6,fur);return sk}
SP.vh=buildSpr(genVanhus);

// ---- Kentän mitat: osioiden rajat (maailman x), kioskin ja penkin paikat ----
const RV={silta:760,koski:1560,len:2300,kioski:1960,penkki:2090,kuusi:1770,aukioK:1572};
// Lukitut latausasemat: maailman x ja aalto (indeksi), jonka voittaminen vapauttaa aseman
const RV_ST=[{x:600,w:1},{x:1665,w:4},{x:1860,w:5}];
// Yllättäen aukeavat ovet: oven paikka, Esan x joka laukaisee, vihollinen, kyltti ja repliikki
const RV_DOOR=[{x:830,trig:790,k:'hm',sign:'RAPPU',say:'Haalarimies: Kuka koputti?'},{x:1492,trig:1455,k:'sm',sign:'KUNTOSALI',say:'Sali-Make: Kuka häiritsee mun penkkiä?'},{x:1540,trig:1505,k:'tk',sign:'PUB',say:'Takatukka: Mun tuoppi jäi kesken!'}];
// Sampokeskus: hissi (lad) vie katolle A, hyppy katolle B ja ramppi alas kadulle (S); korkeudet pikseleinä
const RV_ROOF={lad:900,lift:1,A:[912,1110,80],B:[1134,1330,64],S:1450};
const LR={n:1,fin:1,noW:1,name:'Rovaniemen keskusta',hud:'ROVANIEMI',theme:'rova',len:RV.len,roof:RV_ROOF,camY:{off:10,max:72},
 waves:[{x:240,list:['hm','hm']},{x:540,list:['hm','tk','hm']},{x:1000,roof:1,list:['hm','tk']},{x:1200,roof:1,list:['tk','hm','hm']},{x:1490,list:['hm','tk','hm']},{x:1740,list:['tk','hm','tk','hm','tk']}],
 bins:[[180,30,'c'],[460,10,'v'],[820,28,'w'],[1520,30,'c'],[1600,12,'v'],[1700,26,'p']],
 msg:['Kenttä 1: Rovaniemen keskusta','Vapauta lukitut latausasemat!'],say:['a','Aapeli: Jätkänkynttilä! Täältä se alkaa.'],
 done:['Latausasemat vapautettu!','Lordin aukio on hiljainen... liian hiljainen.','Napauta: jatka.'],
 onStep:rovaStep,onDraw:rovaDraw,onHud:rovaHud,onFg:rovaFg};
const RV_QUIP=[['a','Aapeli: Latausasema vapaa! ID.3 kiittää.'],['k','Kermis: Virta kulkee taas. Rock!'],['p','Esa: Seuraava!']];
function startRova(){LV.length=1;LV.push(LR);startMJ()}

/* Asemien tila nollataan, kun kenttä alkaa tai yritetään uudestaan (mjLevel nollaa kellon M.ck) */
function rovaSt(){if(!M.rv||M.ck<M.rvCk){M.rv=RV_ST.map(s=>({...s,free:0,t:0}));M.lift=null;M.rvD=RV_DOOR.map(d=>({...d,op:0}))}M.rvCk=M.ck;return M.rv}
/* Vihollinen ilmestyy maailman kohtaan (ovesta), ei ruudun reunalta kuten aalloissa */
function spawnAt(k,x,z){const t=KT[k],f=mjE(SP[t.sp],x,z,'e',k,t.hp*(DIFF?1.3:1));f.face=M.e.x<x?-1:1;f.slot=(t.sc?21:15)+Math.random()*6;f.cd=1.2;M.ents.push(f);return f}
function rovaDoors(dt){for(const d of M.rvD){if(d.op){d.op=Math.min(1,d.op+dt*3);continue}if(M.e.lev!=='roof'&&M.e.x>=d.trig){d.op=.01;tn(160,90,.25,.25,'square');nz(.25,'lowpass',600,.3);const f=spawnAt(d.k,d.x,2);M.say=[f,d.say];M.sayT=2.6;sTalk(1);msgL=['Ovi paukahtaa auki!']}}}
/* ---- Sampokeskuksen hissi ----
   Kulku: (kori alas, jos se on ylhäällä) → ovet aukeavat → Esa ja kaverit kävelevät koriin → ovet sulkeutuvat →
   kori nousee lasitornissa → kilahdus, ovet aukeavat → porukka kävelee katolle → ovet sulkeutuvat. Esa ei ohjaa kulun aikana. */
// catchUp = kauempana olevat kaverit siirretään tämän matkan päähän ennen kävelyä koriin
const LIFT={w:32,h:54,tw:46,door:.55,rise:2.2,walk:42,slots:[0,-8,8],catchUp:70};
function liftStart(){const r=M.L.roof,L0=M.lift||{y:0};M.lift={on:1,ph:L0.y>0?'down':'open',t:0,d:0,y:L0.y,who:[M.e,...M.al.filter(a=>!a.tired&&!['fly','down','ko','roll','kip'].includes(a.st)&&a.lev!=='roof')]};
 M.lift.who.forEach(f=>{if(f!==M.e&&Math.abs(f.x-r.lad)>LIFT.catchUp)f.x=r.lad-LIFT.catchUp;f.atk=null});
 M.lift.who.forEach(f=>{f.inLift=1;f.vx=f.vz=0});tn(880,880,.08,.05,'sine');tn(660,660,.12,.05,'sine',.1);msgL=['Hissi tulee...']}
/* Siirtää hahmoa kohti x:ää kävellen; palauttaa true, kun perillä */
function liftWalk(f,x,z,dt){const dx=x-f.x,dz=z-f.z,d=Math.hypot(dx,dz),s=LIFT.walk*dt;if(d<=s){f.x=x;f.z=z;f.st='idle';return true}f.x+=dx/d*s;f.z+=dz/d*s;f.face=Math.abs(dx)>.5?Math.sign(dx):f.face;f.st='walk';f.wk=(f.wk||0)+dt;return false}
function liftDoorSound(){nz(.35,'bandpass',1800,.06,900)}
function liftRide(e,dt){const r=M.L.roof,L=M.lift,top=r.A[2],ease=u=>u*u*(3-2*u);L.t+=dt;e.vx=e.vz=0;
 const rideAll=()=>L.who.forEach(f=>{f.base=L.y;f.y=0;f.vy=0});
 if(L.ph==='down'){L.y=top*(1-ease(Math.min(1,L.t/LIFT.rise)));if(L.t>=LIFT.rise){L.y=0;L.ph='open';L.t=0}}
 else if(L.ph==='open'){if(L.t<dt*1.5){tn(1319,1319,.3,.05,'sine');liftDoorSound()}L.d=Math.min(1,L.t/LIFT.door);if(L.d>=1){L.ph='enter';L.t=0}}
 else if(L.ph==='enter'){let ok=true;L.who.forEach((f,i)=>{if(!liftWalk(f,r.lad+LIFT.slots[i],2,dt))ok=false});if(ok){L.who.forEach(f=>f.face=1);L.ph='close';L.t=0;liftDoorSound();msgL=['Ovet sulkeutuvat...']}}
 else if(L.ph==='close'){L.d=1-Math.min(1,L.t/LIFT.door);if(L.d<=0){L.ph='rise';L.t=0;msgL=['Hissi nousee...']}}
 else if(L.ph==='rise'){const u=Math.min(1,L.t/LIFT.rise);L.y=top*ease(u);rideAll();if(Math.floor(L.t/.25)!==Math.floor((L.t-dt)/.25))tn(70,70,.22,.05,'sawtooth');if(u>=1){L.ph='open2';L.t=0;tn(1319,1319,.5,.06,'sine');tn(1047,1047,.6,.05,'sine',.18);liftDoorSound();msgL=['Kling! Sampokeskuksen katto.']}}
 else if(L.ph==='open2'){rideAll();L.d=Math.min(1,L.t/LIFT.door);if(L.d>=1){L.ph='exit';L.t=0}}
 else if(L.ph==='exit'){let ok=true;L.who.forEach((f,i)=>{const tx=r.A[0]+14+i*12;if(!liftWalk(f,tx,6+i*8,dt))ok=false;f.base=top;if(f.x>=r.A[0]-3)f.lev='roof'});if(ok){L.ph='close2';L.t=0;liftDoorSound()}}
 else if(L.ph==='close2'){L.d=1-Math.min(1,L.t/LIFT.door);if(L.d<=0){L.on=0;L.who.forEach(f=>{f.inLift=0;f.st='idle'});msgL=['Katolla!','Potki viholliset reunan yli.']}}}
/* Hissin kori: lattian korkeus ruudulla (kori lepää ylhäällä, kun se on viety sinne) */
function liftCab(){const L=M.lift;return 114-(L?L.y:0)}
/* Tausta (ennen hahmoja): teräs- ja lasitorni, korin takaseinä valoineen */
function liftBack(T){const r=M.L.roof,x=r.lad-M.cam;if(x<-40||x>W+40)return;const top=112-r.A[2]-LIFT.h-12,tw=LIFT.tw/2,fy=liftCab(),cw=LIFT.w/2;
 R('#141824',x-tw,top,LIFT.tw,116-top);R('rgba(110,170,230,.14)',x-tw+3,top+3,LIFT.tw-6,113-top);for(let y=top+14;y<114;y+=14)R('#262c3c',x-tw,y,LIFT.tw,1.5);
 g.strokeStyle='#262c3c';g.lineWidth=.8;for(let y=top+14;y<100;y+=28){g.beginPath();g.moveTo(x-tw,y);g.lineTo(x+tw,y+14);g.moveTo(x+tw,y);g.lineTo(x-tw,y+14);g.stroke()}
 R('#2e3444',x-1,top,2,fy-LIFT.h-top);
 R('#3a3226',x-cw,fy-LIFT.h,LIFT.w,LIFT.h);R('#4a4030',x-cw,fy-LIFT.h,LIFT.w,3);R('#c8a060',x-cw+2,fy-LIFT.h+1,LIFT.w-4,1);R('#5a4c38',x-cw,fy-14,LIFT.w,1.2);R('#2a241c',x-cw,fy-3,LIFT.w,3);glow(x,fy-LIFT.h+4,14,'255,220,160',.25)}
/* Etuala (hahmojen päälle): korin kehys, liukuovet ikkunakaistaleineen, kerrosnäyttö, lasipinta ja tornin katto kyltteineen */
function liftFront(T){const r=M.L.roof,x=r.lad-M.cam;if(x<-40||x>W+40)return;const L=M.lift,d=L?L.d:0,top=112-r.A[2]-LIFT.h-12,tw=LIFT.tw/2,fy=liftCab(),cw=LIFT.w/2,ch=LIFT.h,pw=cw-1;
 g.save();g.beginPath();g.rect(x-cw+1,fy-ch,LIFT.w-2,ch);g.clip();for(const s of[-1,1]){const px=s<0?x-pw-d*pw:x+d*pw;R('#8a909c',px,fy-ch+3,pw,ch-3);R('#a8aeb8',px,fy-ch+3,1,ch-3);R('rgba(255,230,180,.35)',px+2,fy-ch+6,pw-4,5);R('#5a606a',px+(s<0?pw-1:0),fy-ch+3,1,ch-3)}g.restore();
 R('#4a505c',x-cw-2,fy-ch-3,LIFT.w+4,4);R('#4a505c',x-cw-2,fy-ch,2,ch);R('#4a505c',x+cw,fy-ch,2,ch);R('#2a2e38',x-cw-2,fy,LIFT.w+4,2);
 const fl=!L||L.y<1?'1':L.y>=r.A[2]-1?'K':'↑';R('#0a0c12',x-6,fy-ch-11,12,7);g.save();g.font='bold 5px monospace';g.textAlign='center';g.fillStyle='#ff6a3a';g.fillText(fl,x,fy-ch-5.5);g.restore();
 R('rgba(170,210,255,.08)',x-tw+3,top+3,LIFT.tw-6,113-top);R('#3a3e4a',x-tw-2,top-5,LIFT.tw+4,5);R('#5a5e6a',x-tw-2,top-5,LIFT.tw+4,1);R('#9aa6c8',x-tw-2,top-6.5,LIFT.tw+4,1.5);labelBoard('HISSI',x,top-9,'#7dd8ff');
 const sx=(r.A[0]+r.A[1])/2-M.cam,sy=112-r.A[2]-22;if(sx>-80&&sx<W+80){R('#3a3e48',sx-30,sy+3,2,14);R('#3a3e48',sx+28,sy+3,2,14);R('#5a5e68',sx-40,sy-10,80,15);R('#0e0c14',sx-39,sy-9,78,13);
  g.save();g.font='bold 8px monospace';g.textAlign='center';const on=Math.sin(T*3)>-.95;g.shadowBlur=on?7:0;g.shadowColor='#ff6a3a';g.fillStyle=on?'#ffb07a':'#5a3a2a';g.fillText('SAMPOKESKUS',sx,sy);g.restore()}}
function rovaStep(dt){const st=rovaSt();rovaDoors(dt);for(const s of st){if(s.free){s.t+=dt;continue}if(M.wi>s.w){s.free=1;s.t=0;const n=st.filter(x=>x.free).length;
 msgL=['Latausasema vapautettu! ('+n+'/'+st.length+')'];[784,988,1175,1568].forEach((f,i)=>tn(f,f,.12,.06,'square',i*.07));const q=RV_QUIP[(n-1)%RV_QUIP.length];mjSay(q[0],q[1])}}}
function rovaHud(){const st=M.rv||RV_ST,n=st.filter(s=>s.free).length;g.save();g.font='bold 7px monospace';g.textAlign='right';g.fillStyle=n===st.length?'#7dff9a':'#bfe8ff';g.shadowColor='#000';g.shadowBlur=2;g.fillText('ASEMAT '+n+'/'+st.length,314,29);g.restore()}

// ---- Tausta ----
function rovaSky(){g.fillStyle=mkLg(10,110,[[0,'#03041a'],[1,'#1e2456']]);g.fillRect(0,10,W,H-10);for(let i=0;i<60;i++)R(i%6?'#c8ccf0':'#fff',(i*53)%W,12+(i*29)%60,1,1)}
/* Katu ja jalkakäytävä (staattinen kerros) */
function rovaGround(){R('#3a3a4a',0,104,W,8);R('#5a5a6a',0,104,W,1);R('#8a8a98',0,111,W,1.5);g.fillStyle=mkLg(112,160,[[0,'#2c2c36'],[1,'#1a1a22']]);g.fillRect(0,112,W,48)}
/* Osion kaistale ruudulla: piirtää fn:n vain sille alueelle, jossa kameran mukaan näkyy maailman väli [a,b).
   clip=false: ei leikkausta, fn saa rajat ruudulla ja piirtää vain kokonaiset talot (ei terävästi katkeavia julkisivuja) */
function rovaStrip(c,a,b,fn,clip){const x0=Math.max(0,a-c),x1=Math.min(W,b-c);if(x1<=x0)return;if(clip===false){fn(a-c,b-c);return}g.save();g.beginPath();g.rect(x0,-200,x1-x0,400);g.clip();fn(a-c,b-c);g.restore()}
/* Pystyparallaksi: kerros p (0 = taivas paikallaan, 1 = kulkee maailman mukana) kumoaa osan pystykameran siirrosta */
function vpar(p,fn){const d=-Math.round(M.camY||0)*(1-p);if(!d){fn();return}g.save();g.translate(0,d);fn();g.restore()}
function kynttila(x,T){R('#7a7e8a',x-3,32,6,72);R('#9a9eaa',x-3,32,2,72);R('#5a5e6a',x-5,30,10,3);
 const f=Math.sin(T*9+x)*.6;g.fillStyle='#ff9a2a';g.beginPath();g.moveTo(x-3,30);g.quadraticCurveTo(x-2,22+f,x,18+f);g.quadraticCurveTo(x+2,22-f,x+3,30);g.fill();g.fillStyle='#ffe28a';g.beginPath();g.moveTo(x-1.4,30);g.quadraticCurveTo(x,24,x,22+f);g.quadraticCurveTo(x+.5,25,x+1.4,30);g.fill();
 glow(x,24,16,'255,170,70',.45+.1*Math.sin(T*7+x));g.strokeStyle='rgba(200,205,220,.5)';g.lineWidth=.5;for(const s of[-1,1])for(const d of[30,60]){g.beginPath();g.moveTo(x,34);g.lineTo(x+s*d,100);g.stroke()}}
/* Koskikadun talo i välimuistikankaaseen (2x): ikkunat, kauppa, ovi ja neonkyltti hehkuineen; on = kyltti palaa (välkkyy harvoin) */
const KOSKI={signs:['KOSKIKATU','KAUPPAHALLI','POROKEBAB','APTEEKKI','REVONTULI','PUB','SAUNA-BAARI','KIRJASTO'],col:['#3ad8ff','#ffb03a','#ff5a4a','#7aff6a','#c08aff','#ff3aa8'],wall:['#3a2a3a','#2a3242','#3a3028','#2e2e3e'],awn:['#5a2a2a','#2a4a3a','#3a3a5a','#5a4a2a']},KOSKIC={};
function koskiBld(i,on){const key=i+(on?'+':'-');let k=KOSKIC[key];if(k)return k;const h=58+hsh(i+3)*24,top=104-h,cv=document.createElement('canvas');cv.width=100*2;cv.height=(h+8)*2;const x=cv.getContext('2d');x.scale(2,2);x.translate(2,6-top);
 const gs=g;g=x;try{const m=n=>((i%n)+n)%n;R(KOSKI.wall[m(4)],0,top,94,h);R('#e8f0ff',-1,top-2,96,3);R('rgba(0,0,0,.25)',90,top,4,h);
  R('rgba(0,0,0,.35)',0,top+1,94,2);for(let px=0;px<94;px+=31)R('rgba(255,255,255,.04)',px,top,2,h);
  for(let wy=top+6;wy<84;wy+=12)for(let wx=8;wx<88;wx+=16){R(hsh(i*17+wy+wx)>.5?'#e8c47a':'#1a1a28',wx,wy,8,7);R('rgba(0,0,0,.45)',wx,wy,8,1.2);R('rgba(0,0,0,.3)',wx,wy,1,7);R('rgba(220,226,240,.35)',wx-1,wy+7,10,1)}R('rgba(0,0,0,.35)',0,100,94,4);// näyteikkuna himmeänä ja jäsenneltynä (ei hehkua): kehys, ruudut, tuotteet ja markiisi
  R('#1a1418',8,86,44,18);R('#7a6040',10,88,40,14);R('#94744c',10,88,40,3);for(let wx=12;wx<48;wx+=9)R('#4a3a2a',wx,93,6,9);R('#1a1418',29,88,1.5,14);R(KOSKI.awn[m(KOSKI.awn.length)],7,84,46,3);R('rgba(0,0,0,.3)',7,87,46,1);
  R('#1a1418',62,86,14,18);R('#3a2e28',64,88,10,16);
  const col=KOSKI.col[m(KOSKI.col.length)];g.font='bold 8px monospace';g.textAlign='center';g.shadowBlur=on?6:0;g.shadowColor=col;g.fillStyle=on?col:'#3a2a3a';g.fillText(KOSKI.signs[m(KOSKI.signs.length)],47,82)}finally{g=gs}
 return KOSKIC[key]={cv,top}}
/* Lumipenkka i: satunnainen määrä kumpareita, joiden leveys, korkeus ja paikka vaihtelevat (hsh = kiinteä satunnaisluku); välillä aukko */
const SNOWB={gap:.18,maxLumps:3,base:'#5e6888',top:'#7c88aa',hi:'#94a0c0'};
function snowBank(i,x){if(hsh(i+40)<SNOWB.gap)return;const n=1+Math.floor(hsh(i+5)*SNOWB.maxLumps);
 for(let k=0;k<n;k++){const w=3.5+hsh(i*7+k)*7,h=1.2+hsh(i*3+k)*2.6,dx=(hsh(i*11+k)-.5)*12;ell(x+dx,111.6,w,h,SNOWB.base);ell(x+dx-w*.15,111.3-h*.35,w*.7,h*.55,SNOWB.top);if(h>2.6)R(SNOWB.hi,x+dx-w*.3,110.6-h*.6,w*.35,.8)}}
/* Aukion kaukainen talo välimuistiin: tummempi ja utuinen (sininen huntu), lumireuna ja himmeät ikkunat → jää taka-alalle */
const AUKC={};
function aukioBld(i){let k=AUKC[i];if(k)return k;const h=36+hsh(i+11)*18,top=104-h,cv=document.createElement('canvas');cv.width=84*2;cv.height=(h+6)*2;const x=cv.getContext('2d');x.scale(2,2);x.translate(2,4-top);
 const gs=g;g=x;try{R('#1e2238',0,top,76,h);R('#161a2c',70,top,6,h);R('#9aa4c4',-1,top-2,78,2.5);for(let wy=top+6;wy<96;wy+=10)for(let wx=6;wx<64;wx+=12)R(hsh(i*7+wy+wx)>.6?'#b89a68':'#121420',wx,wy,6,6);R('rgba(40,52,100,.28)',0,top-2,78,h+2)}finally{g=gs}
 return AUKC[i]={cv,top}}
/* Joulukuusi omassa kivialtaassaan aukion keskellä: oksakerrokset varjostettuina, valot ja tähti */
function kuusiDraw(kx,T){if(kx<-60||kx>W+60)return;ell(kx,105,22,4,'#2e323e');R('#4a4e5a',kx-18,96,36,8);R('#5e6270',kx-18,96,36,1.5);ell(kx,96,18,2.4,'#8a96b8');R('#3a2410',kx-2,86,4,10);
 for(let j=0;j<5;j++){const w=8+j*6,y=36+j*11;g.fillStyle='#0c3a24';g.beginPath();g.moveTo(kx,y-6);g.lineTo(kx+w,y+8);g.lineTo(kx-w,y+8);g.fill();g.fillStyle='#082a1a';g.beginPath();g.moveTo(kx,y-6);g.lineTo(kx+w,y+8);g.lineTo(kx+2,y+8);g.fill();R('#9aa6c8',kx-w+2,y+7,w*2-4,1)}
 for(let j=0;j<14;j++){const a=hsh(j+3),y=36+a*50,x=kx+(hsh(j+9)-.5)*(8+(y-30)*.55);R(Math.sin(T*3+j)>0?'#ffe23a':'#ff5a8a',x,y,1.5,1.5)}g.fillStyle='#ffe23a';g.beginPath();g.arc(kx,29,3,0,7);g.fill();glow(kx,56,28,'255,220,120',.12)}
/* Revontulet hiipuvat välillä (jakso AURK.per s) ja tähtitaivas tulee esiin: voimakkuus 0–1, pehmeä siirtymä */
const AURK={per:46,min:-.35};
function auroraLevel(T){const v=.5+.75*Math.sin(T*2*Math.PI/AURK.per)+.25*Math.sin(T*.31);return Math.max(0,Math.min(1,v))}
/* Kirkkaat tuikkivat tähdet, jotka näkyvät sitä selvemmin mitä himmeämmät revontulet (a = näkyvyys) */
function twinkle(T,a){for(let i=0;i<34;i++){const x=(i*97+13)%W,y=14+(i*41)%62,s=.4+.6*Math.abs(Math.sin(T*(1.3+hsh(i)*2)+i));R(`rgba(255,250,235,${a*s})`,x,y,i%5?1:1.6,i%5?1:1.6)}}
/* Lumisade vain osassa kenttää: alueet maailman x:nä, reunoilla sade hiipuu (fade px). Hiutaleet sijoittuvat ajan ja kameran mukaan. */
const SNOWF={areas:[[260,720],[1150,1520],[1880,2300]],fade:120,n:90,spd:[16,34],par:[.5,1]};
function snowAmt(wx){let a=0;for(const [x0,x1] of SNOWF.areas){const v=Math.min(wx-x0,x1-wx)/SNOWF.fade;a=Math.max(a,Math.min(1,v))}return Math.max(0,a)}
function rovaFg(T){liftFront(T);const c=M.cam,a=snowAmt(c+W/2);if(a<=0)return;const n=Math.floor(SNOWF.n*a);vpar(0,()=>{
 for(let i=0;i<n;i++){const p=SNOWF.par[0]+hsh(i+300)*(SNOWF.par[1]-SNOWF.par[0]),v=SNOWF.spd[0]+hsh(i+500)*(SNOWF.spd[1]-SNOWF.spd[0]),y=((hsh(i+700)*150+T*v)%150)+10,x=((hsh(i+900)*W*1.4-c*p+Math.sin(T*.8+i)*6)%W+W)%W,s=p>.8?1.4:1;
  R(`rgba(235,240,255,${.45+.4*p})`,x,y,s,s)}})}
function rovaBg(T){const c=M.cam;
 // taivas pysyy paikallaan pystykameran noustessa (kattaa koko ruudun, ettei mikään jää piirtämättä)
 vpar(0,()=>{cutLayer('rovaSky',rovaSky);const al=auroraLevel(T);if(al<1)twinkle(T,1-al);auroraSky('rova',T,0,W,16,9,7,41,2,15,.4,al);ell(272-c*.02,30,8,8,'#f2ecc8')});
 // Ounasvaara ja hyppyrimäki kaukana
 vpar(.25,()=>{ridge(c*.06,98,22,'#1a2050',61,27);{const hx=230-c*.06;if(hx>-40&&hx<W+40){g.fillStyle='#141a44';g.beginPath();g.moveTo(hx,60);g.lineTo(hx+4,60);g.lineTo(hx+34,92);g.lineTo(hx+28,92);g.closePath();g.fill();R('#141a44',hx,56,4,6)}}});
 // Jätkänkynttilä-silta: Kemijoen jää, vastaranta ja sillan kynttiläpylväät
 rovaStrip(c,-400,RV.silta,()=>{vpar(.45,()=>{R('#1c2648',0,84,W,40);for(let i=0;i<8;i++)R('#2e3a64',((i*67-c*.5)%W+W)%W,88+(i*5)%12,30,1);
  for(let i=Math.floor(c*.3/30)-1;i<Math.floor(c*.3/30)+13;i++){const bx=i*30-c*.3,h=10+hsh(i+7)*16;R('#10142e',bx,84-h,28,h);for(let wy=84-h+3;wy<82;wy+=5)for(let wx=3;wx<26;wx+=5)if(hsh(i*13+wy+wx)>.6)R('rgba(255,220,140,.6)',bx+wx,wy,2,2)}});
  for(let i=0;i<4;i++){const x=120+i*230-c;if(x>-80&&x<W+80)kynttila(x,T)}
  for(let x=-((c)%12);x<W;x+=12)R('#4a4e5a',x,96,1.2,8);R('#6a6e7a',0,96,W,1.5);R('#4a4e5a',0,100,W,1)});
 // Koskikatu: kaupat, neonkyltit ja lumiset katot (talo kerrallaan välimuistista)
 rovaStrip(c,RV.silta,RV.koski,(xa,xb)=>{for(let i=Math.floor(c*.6/96)-1;i<Math.floor(c*.6/96)+5;i++){const bx=i*96-c*.6;if(bx<xa+14||bx+96>xb)continue;const on=Math.sin(T*(3+i)+i)>-.92,k=koskiBld(i,on);vpar(.7,()=>g.drawImage(k.cv,bx-2,k.top-6,k.cv.width/2,k.cv.height/2))}},false);
 // Lordin aukio: kaukaiset talot utuisina (syvyys), kyltti portilla omilla tolpillaan, kuusi vapaana kivialtaassaan
 rovaStrip(c,RV.koski,RV.len+400,(xa)=>{for(let i=Math.floor(c*.4/80)-1;i<Math.floor(c*.4/80)+6;i++){const bx=i*80-c*.4,h=36+hsh(i+11)*18;if(bx<xa+20)continue;const k=aukioBld(i);vpar(.55,()=>g.drawImage(k.cv,bx-2,k.top-4,k.cv.width/2,k.cv.height/2))}
  const sx=RV.aukioK-c;if(sx>-80&&sx<W+20){R('#2a2a34',sx+3,66,3,38);R('#2a2a34',sx+64,66,3,38);R('#3a3a46',sx,58,70,16);R('#14141c',sx+1,59,68,13);R('#4a4a56',sx,73,70,1.5);
   g.save();g.font='bold 8px monospace';g.textAlign='center';g.shadowBlur=6;g.shadowColor='#ff3a3a';g.fillStyle='#ff6a5a';g.fillText('LORDIN AUKIO',sx+35,69);g.restore()}
  kuusiDraw(RV.kuusi-c,T)},false);
 // sillan pää: kivinen maatuki ja lyhty peittävät sillan ja kadun rajan
 {const x=RV.silta-c;if(x>-20&&x<W+20){R('#3e424e',x-9,80,18,24);R('#565a66',x-10,78,20,3);for(let y=84;y<104;y+=5)R('#2e323c',x-9,y,18,.8);R('#2a2e38',x-1,58,2,20);R('#3a3e48',x-3,56,6,3);ell(x,60,2.2,1.4,'#fff2c0');glow(x,60,10,'255,220,150',.25)}}
 cutLayer('rovaGround',rovaGround);
 // lumipenkat jalkakäytävän reunassa: himmeät ja varjostetut, jotta ne istuvat yöhön
 for(let i=Math.floor(c/24)-1;i<Math.floor(c/24)+15;i++){if(i*24<RV.silta-10)continue;snowBank(i,i*24-c+(hsh(i+77)-.5)*10)}
 for(let i=Math.floor(c/40)-1;i<Math.floor(c/40)+10;i++)R('rgba(230,230,200,.5)',i*40-c,135,18,1.6)}

/* Pieni nimikyltti tummalla taululla, jotta taustan ikkunat ja valot eivät sekoitu tekstiin */
function labelBoard(txt,x,y,col){g.save();g.font='bold 5px monospace';const w=g.measureText(txt).width+4;R('rgba(10,10,18,.85)',x-w/2,y-5,w,6.5);g.textAlign='center';g.fillStyle=col;g.fillText(txt,x,y);g.restore()}
// ---- Maailman esineet taustalla: latausasemat, kioski ja vanhus penkillä ----
function chargerDraw(x,s,T){const y=108,fr=s&&s.free;R('#2a2e38',x-5,y-26,10,26);R('#3a3e4a',x-5,y-26,3,26);R(fr?'#1a6a3a':'#5a1a1a',x-3,y-23,6,6);R('#0a0c12',x+5,y-16,4,2);g.strokeStyle='#1a1a1a';g.lineWidth=1.2;g.beginPath();g.moveTo(x+7,y-15);g.quadraticCurveTo(x+12,y-6,x+8,y);g.stroke();
 glow(x,y-20,10,fr?'80,255,140':'255,60,60',.5+.2*Math.sin(T*(fr?3:8)));
 if(!fr){R('#c8a040',x-3,y-12,6,5);g.strokeStyle='#c8a040';g.lineWidth=1;g.beginPath();g.arc(x,y-12,2.2,Math.PI,0);g.stroke()}
 labelBoard(fr?'VAPAA':'LUKITTU',x,y-29,fr?'#7dff9a':'#ff8a8a');
 if(fr&&s.t<1.2)for(let k=0;k<6;k++){const a=k*1.05+s.t*4,r=s.t*22;R('#bfffd0',x+Math.cos(a)*r,y-18+Math.sin(a)*r*.6,1.5,1.5)}}
function kioskiDraw(x,T){const y=108;R('#6a2420',x-24,y-40,48,40);R('#8a3430',x-24,y-40,48,3);R('#8a6a40',x-18,y-32,36,14);R('#a8844e',x-18,y-32,36,3);for(let wx=x-15;wx<x+15;wx+=8)R('#5a4430',wx,y-27,5,9);R('#3a1a10',x-20,y-18,40,3);R('#e8f0ff',x-26,y-43,52,3);
 g.save();g.font='bold 6px monospace';g.textAlign='center';const on=Math.sin(T*4)>-.9;g.shadowBlur=on?5:0;g.shadowColor='#ffe23a';g.fillStyle=on?'#ffe23a':'#6a5a2a';g.fillText('KIOSKI',x,y-45);g.shadowBlur=0;g.font='bold 4px monospace';g.fillStyle='#3a1a10';g.fillText('POROBURGER',x,y-26);g.restore();glow(x,y-26,20,'255,200,120',.12)}
function penkkiDraw(x,T){const y=108;R('#4a3420',x-16,y-14,32,3);R('#2a1e14',x-14,y-11,2,11);R('#2a1e14',x+12,y-11,2,11);
 const o=idle(T,4);o.s=.62;o.qL=.45;o.qR=.45;o.blink=Math.sin(T*.7)>.6;o.tilt=.06+Math.sin(T*.5)*.05;o.item='h';o.aR=-.9;o.eR=-1;drawChar(SP.vh,x,y-4,o);
 R('#5a3e26',x-16,y-8,32,3);g.font='bold 6px monospace';zzz(x+6,y-40,T)}
/* Ovi on osa lähitaloa (samassa syvyydessä kuin pelaajat): julkisivu, varjostettu sivuseinä, lumireuna, yläkerran ikkunat ja maavarjo */
const DOORW={w:44,h:62,wall:{RAPPU:'#4a3a40',KUNTOSALI:'#3a4048',PUB:'#4a3428'}};
function doorDraw(x,d,T){const y=104,op=d?d.op:0,W2=DOORW.w/2,top=y-DOORW.h,wall=DOORW.wall[d?d.sign:'RAPPU']||'#4a3a40';
 ell(x,y+1,W2+6,2.5,'rgba(0,0,0,.35)');g.fillStyle='#1c1820';g.beginPath();g.moveTo(x+W2,top);g.lineTo(x+W2+6,top+4);g.lineTo(x+W2+6,y);g.lineTo(x+W2,y);g.fill();
 R(wall,x-W2,top,DOORW.w,DOORW.h);R('rgba(0,0,0,.25)',x-W2,top+2,DOORW.w,2);R('#9aa6c8',x-W2-1,top-2,DOORW.w+2,2.5);for(let wx=-W2+5;wx<W2-6;wx+=13){R('#e0bc76',x+wx,top+8,8,8);R('rgba(0,0,0,.4)',x+wx,top+8,8,1.2);R('rgba(220,226,240,.3)',x+wx-1,top+16,10,1)}
 R('rgba(0,0,0,.35)',x-W2,y-4,DOORW.w,4);R('#1a1418',x-10,y-31,20,31);
 if(op>0){R('#a8844e',x-9,y-30,18,30);R('#c49a5a',x-9,y-30,18,4);glow(x,y-12,16,'255,190,110',.18*op)}R('#6a3a22',x-9,y-30,18*(1-op*.85),30);R('#c8a040',x-9+18*(1-op*.85)-4,y-16,2,2);
 labelBoard(d?d.sign:'',x,y-34,'#ffe8a8')}
function rovaDraw(T){const c=M.cam,st=M.rv||RV_ST;for(const d of (M.rvD||RV_DOOR)){const x=d.x-c;if(x>-30&&x<W+30)doorDraw(x,M.rvD?d:null,T)}liftBack(T);for(const s of st){const x=s.x-c;if(x>-20&&x<W+20)chargerDraw(x,M.rv?s:null,T)}
 const kx=RV.kioski-c;if(kx>-40&&kx<W+40)kioskiDraw(kx,T);const px=RV.penkki-c;if(px>-30&&px<W+30)penkkiDraw(px,T)}
