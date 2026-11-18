/* Paljun Herra 2 – Kenttä 1: Rovaniemen keskusta (Jätkänkynttilä-silta → Koskikatu → Lordin aukio).
   Mätkintämoottorin (10_mattinta) päälle: oma tausta, uudet dieselsällit, lukitut latausasemat ja Lordin aukion kioski ja vanhus. */

// ---- Uudet viholliset: haalarimies ja toppahaalarinen takatukka (värimuunnokset ykkösosan hahmoista) ----
SP.hm=buildSpr(recol(genPena,{'#2a3a6a':'#3a4a5a','#1c2850':'#26323e','#3a4a7a':'#4a5a6a','#e8e040':'#e8e8e8','#b02020':'#1a1a1a','#8a1818':'#0e0e0e','#5a5a62':'#5a3a2a','#45454c':'#3e2618'}));
SP.tk=buildSpr(recol(genTapsa,{'#1e1e28':'#2a3a1a','#121218':'#1a2410','#f0f0f0':'#e07a20','#8a5a2a':'#d8b860','#6a4420':'#b09040','#8a8a94':'#3a4a2a'}));
KT.hm={sp:'hm',hp:36,spd:30};KT.tk={sp:'tk',hp:48,spd:26,dm:1.15,sc:1.05};
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
const RV={silta:760,koski:1560,len:2300,kioski:1960,penkki:2090,kuusi:1680};
// Lukitut latausasemat: maailman x ja aalto (indeksi), jonka voittaminen vapauttaa aseman
const RV_ST=[{x:600,w:1},{x:1300,w:3},{x:1830,w:4}];
const LR={n:1,fin:1,noW:1,name:'Rovaniemen keskusta',hud:'ROVANIEMI',theme:'rova',len:RV.len,
 waves:[{x:240,list:['hm','hm']},{x:540,list:['hm','tk','hm']},{x:900,list:['tk','hm','hm']},{x:1240,list:['hm','tk','tk','hm']},{x:1720,list:['tk','hm','tk','hm','tk']}],
 bins:[[180,30,'c'],[460,10,'v'],[820,28,'w'],[1100,12,'c'],[1400,30,'v'],[1640,10,'p']],
 msg:['Kenttä 1: Rovaniemen keskusta','Vapauta lukitut latausasemat!'],say:['a','Aapeli: Jätkänkynttilä! Täältä se alkaa.'],
 done:['Latausasemat vapautettu!','Lordin aukio on hiljainen... liian hiljainen.','Napauta: jatka.'],
 onStep:rovaStep,onDraw:rovaDraw,onHud:rovaHud};
const RV_QUIP=[['a','Aapeli: Latausasema vapaa! ID.3 kiittää.'],['k','Kermis: Virta kulkee taas. Rock!'],['p','Esa: Seuraava!']];
function startRova(){LV.length=1;LV.push(LR);startMJ()}

/* Asemien tila nollataan, kun kenttä alkaa tai yritetään uudestaan (mjLevel nollaa kellon M.ck) */
function rovaSt(){if(!M.rv||M.ck<M.rvCk)M.rv=RV_ST.map(s=>({...s,free:0,t:0}));M.rvCk=M.ck;return M.rv}
function rovaStep(dt){const st=rovaSt();for(const s of st){if(s.free){s.t+=dt;continue}if(M.wi>s.w){s.free=1;s.t=0;const n=st.filter(x=>x.free).length;
 msgL=['Latausasema vapautettu! ('+n+'/'+st.length+')'];[784,988,1175,1568].forEach((f,i)=>tn(f,f,.12,.06,'square',i*.07));const q=RV_QUIP[(n-1)%RV_QUIP.length];mjSay(q[0],q[1])}}}
function rovaHud(){const st=M.rv||RV_ST,n=st.filter(s=>s.free).length;g.save();g.font='bold 7px monospace';g.textAlign='right';g.fillStyle=n===st.length?'#7dff9a':'#bfe8ff';g.shadowColor='#000';g.shadowBlur=2;g.fillText('ASEMAT '+n+'/'+st.length,314,29);g.restore()}

// ---- Tausta ----
function rovaSky(){g.fillStyle=mkLg(10,110,[[0,'#03041a'],[1,'#1e2456']]);g.fillRect(0,10,W,100);for(let i=0;i<60;i++)R(i%6?'#c8ccf0':'#fff',(i*53)%W,12+(i*29)%60,1,1)}
/* Katu ja jalkakäytävä (staattinen kerros) */
function rovaGround(){R('#3a3a4a',0,104,W,8);R('#5a5a6a',0,104,W,1);R('#8a8a98',0,111,W,1.5);g.fillStyle=mkLg(112,160,[[0,'#2c2c36'],[1,'#1a1a22']]);g.fillRect(0,112,W,48)}
/* Osion kaistale ruudulla: piirtää fn:n vain sille alueelle, jossa kameran mukaan näkyy maailman väli [a,b) */
function rovaStrip(c,a,b,fn){const x0=Math.max(0,a-c),x1=Math.min(W,b-c);if(x1<=x0)return;g.save();g.beginPath();g.rect(x0,10,x1-x0,100);g.clip();fn();g.restore()}
function kynttila(x,T){R('#7a7e8a',x-3,32,6,72);R('#9a9eaa',x-3,32,2,72);R('#5a5e6a',x-5,30,10,3);
 const f=Math.sin(T*9+x)*.6;g.fillStyle='#ff9a2a';g.beginPath();g.moveTo(x-3,30);g.quadraticCurveTo(x-2,22+f,x,18+f);g.quadraticCurveTo(x+2,22-f,x+3,30);g.fill();g.fillStyle='#ffe28a';g.beginPath();g.moveTo(x-1.4,30);g.quadraticCurveTo(x,24,x,22+f);g.quadraticCurveTo(x+.5,25,x+1.4,30);g.fill();
 glow(x,24,16,'255,170,70',.45+.1*Math.sin(T*7+x));g.strokeStyle='rgba(200,205,220,.5)';g.lineWidth=.5;for(const s of[-1,1])for(const d of[30,60]){g.beginPath();g.moveTo(x,34);g.lineTo(x+s*d,100);g.stroke()}}
function rovaBg(T){const c=M.cam;cutLayer('rovaSky',rovaSky);auroraSky('rova',T,0,W,16,9,7,41,2,15,.4);ell(272-c*.02,30,8,8,'#f2ecc8');
 // Ounasvaara ja hyppyrimäki kaukana
 ridge(c*.06,98,22,'#1a2050',61,27);{const hx=230-c*.06;if(hx>-40&&hx<W+40){g.fillStyle='#141a44';g.beginPath();g.moveTo(hx,60);g.lineTo(hx+4,60);g.lineTo(hx+34,92);g.lineTo(hx+28,92);g.closePath();g.fill();R('#141a44',hx,56,4,6)}}
 // Jätkänkynttilä-silta: Kemijoen jää, vastaranta ja sillan kynttiläpylväät
 rovaStrip(c,-400,RV.silta,()=>{R('#1c2648',0,84,W,20);for(let i=0;i<8;i++)R('#2e3a64',((i*67-c*.5)%W+W)%W,88+(i*5)%12,30,1);
  for(let i=Math.floor(c*.3/30)-1;i<Math.floor(c*.3/30)+13;i++){const bx=i*30-c*.3,h=10+hsh(i+7)*16;R('#10142e',bx,84-h,28,h);for(let wy=84-h+3;wy<82;wy+=5)for(let wx=3;wx<26;wx+=5)if(hsh(i*13+wy+wx)>.6)R('rgba(255,220,140,.6)',bx+wx,wy,2,2)}
  for(let i=0;i<4;i++){const x=120+i*230-c;if(x>-80&&x<W+80)kynttila(x,T)}
  for(let x=-((c)%12);x<W;x+=12)R('#4a4e5a',x,96,1.2,8);R('#6a6e7a',0,96,W,1.5);R('#4a4e5a',0,100,W,1)});
 // Koskikatu: kaupat, neonkyltit ja lumiset katot
 rovaStrip(c,RV.silta,RV.koski,()=>{const SIGNS=['KOSKIKATU','KAUPPAHALLI','POROKEBAB','APTEEKKI','REVONTULI','PUB','SAUNA-BAARI','KIRJASTO'],COL=['#3ad8ff','#ffb03a','#ff5a4a','#7aff6a','#c08aff','#ff3aa8'];
  for(let i=Math.floor(c*.6/96)-1;i<Math.floor(c*.6/96)+5;i++){const bx=i*96-c*.6,h=58+hsh(i+3)*24,top=104-h;R(['#3a2a3a','#2a3242','#3a3028','#2e2e3e'][((i%4)+4)%4],bx,top,94,h);R('#e8f0ff',bx-1,top-2,96,3);R('rgba(0,0,0,.25)',bx+90,top,4,h);
   for(let wy=top+6;wy<84;wy+=12)for(let wx=8;wx<88;wx+=16)R(hsh(i*17+wy+wx)>.5?'#ffd890':'#1a1a28',bx+wx,wy,8,7);R('#ffe8a8',bx+10,88,40,14);R('#1a1418',bx+62,86,14,18);
   const k=((i%SIGNS.length)+SIGNS.length)%SIGNS.length,col=COL[((i%COL.length)+COL.length)%COL.length],on=Math.sin(T*(3+k)+i)>-.92;g.save();g.font='bold 8px monospace';g.textAlign='center';g.shadowBlur=on?6:0;g.shadowColor=col;g.fillStyle=on?col:'#3a2a3a';g.fillText(SIGNS[k],bx+47,82);g.restore()}});
 // Lordin aukio: väljä aukio, valaistu joulukuusi ja kyltti
 rovaStrip(c,RV.koski,RV.len+400,()=>{for(let i=Math.floor(c*.4/80)-1;i<Math.floor(c*.4/80)+6;i++){const bx=i*80-c*.4,h=40+hsh(i+11)*20;R('#22263e',bx,104-h,76,h);R('#e8f0ff',bx-1,104-h-2,78,3);for(let wy=104-h+6;wy<96;wy+=10)for(let wx=6;wx<70;wx+=12)R(hsh(i*7+wy+wx)>.55?'#ffd890':'#14141e',bx+wx,wy,6,6)}
  const kx=RV.kuusi-c;if(kx>-60&&kx<W+60){R('#3a2410',kx-2,92,4,12);for(let j=0;j<5;j++){const w=8+j*6,y=40+j*11;g.fillStyle='#0c3a24';g.beginPath();g.moveTo(kx,y-6);g.lineTo(kx+w,y+8);g.lineTo(kx-w,y+8);g.fill();R('#e8f0ff',kx-w+2,y+7,w*2-4,1)}
   for(let j=0;j<14;j++){const a=hsh(j+3),y=40+a*50,x=kx+(hsh(j+9)-.5)*(8+(y-34)*.55);R(Math.sin(T*3+j)>0?'#ffe23a':'#ff5a8a',x,y,1.5,1.5)}g.fillStyle='#ffe23a';g.beginPath();g.arc(kx,33,3,0,7);g.fill();glow(kx,60,30,'255,220,120',.15)}
  const sx=RV.koski+60-c;if(sx>-80&&sx<W+20){R('#1a1a24',sx,62,70,14);g.save();g.font='bold 8px monospace';g.textAlign='center';g.shadowBlur=6;g.shadowColor='#ff3a3a';g.fillStyle='#ff6a5a';g.fillText('LORDIN AUKIO',sx+35,72);g.restore();R('#3a3a44',sx+33,76,3,28)}});
 cutLayer('rovaGround',rovaGround);
 for(let i=Math.floor(c/24)-1;i<Math.floor(c/24)+15;i++){const x=i*24-c;if(i*24<RV.silta-10)continue;ell(x,111,8+hsh(i)*6,2.5,'#eef3ff')}
 for(let i=Math.floor(c/40)-1;i<Math.floor(c/40)+10;i++)R('rgba(230,230,200,.5)',i*40-c,135,18,1.6)}

// ---- Maailman esineet taustalla: latausasemat, kioski ja vanhus penkillä ----
function chargerDraw(x,s,T){const y=108,fr=s&&s.free;R('#2a2e38',x-5,y-26,10,26);R('#3a3e4a',x-5,y-26,3,26);R(fr?'#1a6a3a':'#5a1a1a',x-3,y-23,6,6);R('#0a0c12',x+5,y-16,4,2);g.strokeStyle='#1a1a1a';g.lineWidth=1.2;g.beginPath();g.moveTo(x+7,y-15);g.quadraticCurveTo(x+12,y-6,x+8,y);g.stroke();
 glow(x,y-20,10,fr?'80,255,140':'255,60,60',.5+.2*Math.sin(T*(fr?3:8)));
 if(!fr){R('#c8a040',x-3,y-12,6,5);g.strokeStyle='#c8a040';g.lineWidth=1;g.beginPath();g.arc(x,y-12,2.2,Math.PI,0);g.stroke()}
 g.save();g.font='bold 5px monospace';g.textAlign='center';g.fillStyle=fr?'#7dff9a':'#ff8a8a';g.fillText(fr?'VAPAA':'LUKITTU',x,y-29);g.restore();
 if(fr&&s.t<1.2)for(let k=0;k<6;k++){const a=k*1.05+s.t*4,r=s.t*22;R('#bfffd0',x+Math.cos(a)*r,y-18+Math.sin(a)*r*.6,1.5,1.5)}}
function kioskiDraw(x,T){const y=108;R('#6a2420',x-24,y-40,48,40);R('#8a3430',x-24,y-40,48,3);R('#ffd890',x-18,y-32,36,14);R('#3a1a10',x-20,y-18,40,3);R('#e8f0ff',x-26,y-43,52,3);
 g.save();g.font='bold 6px monospace';g.textAlign='center';const on=Math.sin(T*4)>-.9;g.shadowBlur=on?5:0;g.shadowColor='#ffe23a';g.fillStyle=on?'#ffe23a':'#6a5a2a';g.fillText('KIOSKI',x,y-45);g.shadowBlur=0;g.font='bold 4px monospace';g.fillStyle='#3a1a10';g.fillText('POROBURGER',x,y-26);g.restore();glow(x,y-26,22,'255,210,120',.25)}
function penkkiDraw(x,T){const y=108;R('#4a3420',x-16,y-14,32,3);R('#2a1e14',x-14,y-11,2,11);R('#2a1e14',x+12,y-11,2,11);
 const o=idle(T,4);o.s=.62;o.qL=.45;o.qR=.45;o.blink=Math.sin(T*.7)>.6;o.tilt=.06+Math.sin(T*.5)*.05;o.item='h';o.aR=-.9;o.eR=-1;drawChar(SP.vh,x,y-4,o);
 R('#5a3e26',x-16,y-8,32,3);g.font='bold 6px monospace';zzz(x+6,y-40,T)}
function rovaDraw(T){const c=M.cam,st=M.rv||RV_ST;for(const s of st){const x=s.x-c;if(x>-20&&x<W+20)chargerDraw(x,M.rv?s:null,T)}
 const kx=RV.kioski-c;if(kx>-40&&kx<W+40)kioskiDraw(kx,T);const px=RV.penkki-c;if(px>-30&&px<W+30)penkkiDraw(px,T)}
