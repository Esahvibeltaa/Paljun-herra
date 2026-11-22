/* Paljun Herra 2 – Kenttä 2: Santapark (maanalainen joulupuisto Napapiirillä).
   Osiot: jäätunneli (sisäänkäynti, Napapiirin viiva) → tonttupajat (liukuhihnat) → jääveistosgalleria (liukas jää)
   → Pajakylän sali (takka, kuusi, pukin valtaistuin). Viholliset: kaapatut tontut (pienet, nopeat, heittävät
   lahjapaketteja, palaavat järkiinsä voitettuina) ja Mersumiehen dieselsällit. Hempukka vierailee galleriassa apuna.
   Lopussa pukki nousee valtaistuimelta: kaksinkamppailu (10g_pukki). */

// ---- Kaapattu tonttu: punainen suippolakki tupsulla, punainen nuttu valkoisin reunuksin, aivopesun vihreät silmät ja Mersu-merkki ----
function genTonttu(){LY={};const sk='#f0c0a0',sd='#d09878',rd='#c8282c',rdd='#8a1a1e',wh='#f0ece4';
 sBody(rd,rdd,sk,sd,9);L('torso');P(7,21,12,2,wh);P(7,32,12,2,'#3a2418');P(12,32,2,2,'#c8a040');P(10,25,3,3,'#c0c4cc');P(11,26,1,1,'#3a3e48');
 ['armL','armR'].forEach((n,i)=>{L(n);P(i?19:4,30,3,1,wh)});
 sLegs('#5a5a66','#44444e','#5a3418','#3a2410');
 sFace(sk,sd);P(9,13,2,1,'#3aff7a');P(14,13,2,1,'#3aff7a');P(9,12,2,1,'#1a1a2a');P(14,12,2,1,'#1a1a2a');P(8,15,2,2,'#f09090');P(16,15,2,2,'#f09090');P(11,17,4,1,'#8a3a3a');P(12,14,2,2,sd);
 P(8,6,10,4,rd);P(9,4,8,2,rd);P(10,2,6,2,rd);P(13,0,5,2,rd);P(17,0,2,3,rdd);P(18,2,3,3,wh);P(15,6,3,4,rdd);P(7,9,12,1,rdd);return sk}
SP.to=buildSpr(genTonttu);
KT.to={sp:'to',hp:26,spd:46,dm:.75,sc:.72,atk:['punch','kick','punch'],ai:tonttuAI,ko:d=>{d.wake=1}};
EAI.to={combo:.2,block:.05,back:.7,react:.2,th:[.8,.6]};

/* Lahjapaketti: tontun heittoase (kulkee suoraan, vahinko pieni) */
const GIFTC=['#d8303a','#3a8ad8','#3ab85a','#d8a030','#a85ad8'];
function giftDraw(x,y,r,col){g.save();g.translate(x,y);g.rotate(r*.5);R(col||GIFTC[0],-4,-3.5,8,7);R('rgba(0,0,0,.25)',1.5,-3.5,2.5,7);R('#ffe070',-.7,-3.5,1.4,7);R('#ffe070',-4,-.7,8,1.4);ell(-1.5,-4.5,1.6,1.1,'#ffe070');ell(1.5,-4.5,1.6,1.1,'#ffe070');g.restore()}
function giftToss(f){M.proj.push({gift:1,col:pick(GIFTC),base:f.base||0,x:f.x+f.face*8,z:f.z,y:20,vx:f.face*125,r:0});tn(900,600,.1,.05,'square')}
MVJ.gift=Object.assign({},MVJ.throw,{spec:giftToss});
function tonttuAI(f,dx,dz){if(f.cd<=0&&Math.abs(dz)<6&&Math.abs(dx)>45&&Math.abs(dx)<170){f.cd=3.5+Math.random()*2;f.face=Math.sign(dx);mStart(f,'gift');return true}return false}
/* Voitettu tonttu palaa järkiinsä: nousee, ihmettelee ja juoksee pajalleen (ei välky pois kuten muut) */
const WAKE={t:1.0,spd:72,p:.45,lines:['Tonttu: Häh? Missä mä oon? Pajalle!','Tonttu: Kiitos, setä! Mersu-meemit lähti päästä.','Tonttu: Mä haluun takaisin lelupajalle!','Tonttu: Pukki ei oo pukki! Se haisee dieseliltä!']};
function wakeUp(f){f.st='walk';f.ko=0;f.wake=0;f.runOff=1;f.inS=0;f.y=0;f.vy=0;f.rw=f.rwv=0;f.face=f.x<M.e.x?-1:1;f.vx=f.face*WAKE.spd;f.vz=0;M.free=(M.free||0)+1;
 [784,988,1319].forEach((q,i)=>tn(q,q,.08,.05,'square',i*.06));if(Math.random()<WAKE.p&&M.sayT<=0)mjSay(f,pick(WAKE.lines))}

// ---- Hempukka: käsilaukku laajassa kaaressa (osuu molemmille puolille ja kaataa) ----
function handbag(){g.strokeStyle='#3a2418';g.lineWidth=.8;g.beginPath();g.moveTo(-.5,0);g.lineTo(-2.5,6);g.moveTo(.5,0);g.lineTo(2.5,6);g.stroke();
 R('#e0559a',-4,5.5,8,6);R('#b83a78',-4,10,8,1.5);R('#f07ab8',-4,5.5,8,1.2);R('#ffd84a',-.8,7.2,1.6,1.6)}
MVJ.laukku={h:'mid',d:11,r:40,tip:27,st:.16,ac:.26,rc:.3,both:1,kd:1,n:'laukku',pose:laukkuPose};
function laukkuPose(f,o){const a=f.atk,m=a.m,t=a.t,L2=(x,y,u)=>x+(y-x)*u;let aR;
 if(t<m.st)aR=L2(-.3,2.3,ease(t/m.st));else if(t<m.st+m.ac)aR=L2(2.3,-3.7,(t-m.st)/m.ac);else aR=L2(-3.7,-6.6,ease((t-m.st-m.ac)/m.rc));// täysi kierros
 Object.assign(o,{aR,eR:-.1,item:'b',iR:aR-.1,aL:-.8,eL:-1.4,tilt:t>=m.st&&t<m.st+m.ac?.08:0,cy:26})}

// ---- Kentän mitat (maailman x) ----
const SPKX={tunneli:520,pajat:1250,galleria:1850,len:2400,napapiiri:330,valtaistuin:2310,kuusi:2190,takka:2010};
// Liukuhihnat pajoissa: x-väli, syvyysväli (z) ja nopeus; kuljettavat kaikkia maassa olevia
const BELTS=[{x0:690,x1:880,z0:6,z1:16,v:40},{x0:960,x1:1150,z0:26,z1:36,v:-40}];
// Liukas jää galleriassa: pito (mitä pienempi, sitä pidempään liukuu)
const ICE={x0:SPKX.pajat+40,x1:SPKX.galleria-30,grip:2.6};
// Hempukan vierailu: tulee galleriaan, lähtee ennen salia
const HEMP={in:1290,out:1880,hp:70};
const PAJAT=[{n:'LELUPAJA',c:'#7a4a2a'},{n:'KARKKIPAJA',c:'#6a3a4a'},{n:'PAKETTIPAJA',c:'#5a4a2a'},{n:'POSTIPAJA',c:'#4a3a5a'}];
const PAJA={x0:556,w:150,gap:22,h:76,gf:68,door:[24,58],win:[30,20]};
const VEISTOT=['poro','karhu','tonttu','kuusi','poro'];
const LSP={n:2,of:2,fin:1,noW:1,indoor:1,name:'Santapark',hud:'SANTAPARK',len:SPKX.len,
 waves:[{x:250,list:['to','to']},{x:560,list:['to','hm','to']},{x:820,list:['to','to','tk','to']},{x:1100,list:['hm','to','to','tk']},
  {x:1420,list:['to','to','to','hm']},{x:1700,list:['tk','to','hm','to','to']},{x:2060,list:['to','tk','to','hm','to','to']}],
 bins:[[200,28,'c'],[640,10,'v'],[1000,30,'w'],[1380,12,'c'],[1600,30,'v'],[1960,20,'c'],[2120,8,'v']],
 msg:['Kenttä 2: Santapark','Tontut on kaapattu!'],say:['k','Kermis: Joulu kesken kesän? Rock!'],
 done:['Pajakylän sali on hiljentynyt...','Valtaistuimelta nousee joku.','Napauta: jatka.'],
 bg:spkBg,onDraw:spkDraw,onStep:spkStep,onMove:spkMove,onHud:spkHud,onSort:spkSort,binDraw:crateDraw};
function startSanta(){saveSet('santa');SKILL.dodge=true;LV.length=1;LV.push(LSP);startMJ()}

/* Liukuhihnat ja jää: kutsutaan tekoälyn jälkeen ja ennen fysiikkaa (mjUpd) */
function spkMove(dt){for(const f of M.ents){if(f.y>0||['fly','down','ko','roll','kip','held','grab'].includes(f.st)){f.ivx=f.vx;continue}
 for(const b of BELTS)if(f.x>b.x0&&f.x<b.x1&&f.z>=b.z0-2&&f.z<=b.z1+2){f.x+=b.v*dt;break}
 if(f.x>ICE.x0&&f.x<ICE.x1&&!f.atk&&['idle','walk'].includes(f.st)){const p=f.ivx||0;f.vx=p+(f.vx-p)*Math.min(1,dt*ICE.grip)}
 f.ivx=f.vx}}

/* Hempukka tulee ja lähtee; lähtijä piirretään erillisenä (ei enää liittolainen) */
function spkStep(dt){const e=M.e;if(M.ck<(M.spkCk||0)){M.hIn=0;M.hOut=null;M.free=0}M.spkCk=M.ck;
 if(!M.hIn&&e.x>=HEMP.in){M.hIn=1;const h=mjE(SP.w,M.cam-16,20,'a','h',HEMP.hp);h.th=.6;M.al.push(h);M.ents.push(h);mjSay('h','Hempukka: Joku tilasi käsilaukun?');tn(660,880,.12,.06,'square')}
 const h=M.al.find(a=>a.kind==='h');
 if(h&&M.hIn===1&&e.x>=HEMP.out&&!M.lock&&!h.atk&&['idle','walk'].includes(h.st)){M.hIn=2;M.al.splice(M.al.indexOf(h),1);M.ents.splice(M.ents.indexOf(h),1);M.hOut={x:h.x,z:h.z,wk:0};mjSay({x:h.x,z:h.z,sc:1},'Hempukka: Kynnet kärsii. Mä palaan Teslaan!')}
 if(M.hOut){M.hOut.x-=60*dt;M.hOut.wk+=dt;if(M.hOut.x<M.cam-30)M.hOut=null}}
function spkSort(Ls,T){const o=M.hOut;if(o)Ls.push([o.z,()=>{const w=walk(T,o.wk,1);w.flip=true;ell(o.x-M.cam,112+o.z+1,9,2.2,'rgba(0,0,0,.35)');drawChar(SP.w,o.x-M.cam,112+o.z,w)}])}
function spkHud(){const n=M.free||0;if(!n)return;g.save();g.font='bold 7px monospace';g.textAlign='right';g.fillStyle='#9fffb0';g.shadowColor='#000';g.shadowBlur=2;g.fillText('TONTTUJA VAPAANA '+n,314,29);g.restore()}

/* Lahjalaatikkopino (rikottava, pudottaa esineen) roskiksen tilalla */
function crateDraw(o,x,y){const c=GIFTC[Math.floor(hsh(o.x)*GIFTC.length)],c2=GIFTC[Math.floor(hsh(o.x+3)*GIFTC.length)];
 if(o.br){R(c,x-7,y-4,6,4);R(c2,x+1,y-3,6,3);R('#ffe070',x-5,y-4,1,4);return}ell(x,y+.5,9,1.8,'rgba(0,0,0,.35)');
 R(c,x-7,y-9,14,9);R('rgba(0,0,0,.25)',x+3,y-9,4,9);R('#ffe070',x-1,y-9,2,9);R('#ffe070',x-7,y-5.5,14,1.6);R(c2,x-4,y-16,9,7);R('#ffe070',x-.5,y-16,1.5,7);ell(x-1.5,y-17,2,1.2,'#ffe070');ell(x+1.5,y-17,2,1.2,'#ffe070')}

// ---- Tausta ----
/* Luolan holvi: kiinteä liukuväri (välimuisti), kivipinta ja jääpuikot parallaksina, valosarjat kaarina */
function spkCave(){g.fillStyle=mkLg(10,104,[[0,'#0a0814'],[.5,'#1a1424'],[1,'#2a2030']]);g.fillRect(0,10,W,H-10)}
function spkRock(c){for(let i=Math.floor(c*.5/40)-1;i<Math.floor(c*.5/40)+10;i++){const x=i*40-c*.5,h=hsh(i+70);R(h>.5?'#221a2c':'#1c1626',x,20+h*30,30+h*16,18+h*20);R('rgba(255,255,255,.03)',x,20+h*30,30+h*16,1)}}
function spkIcicles(c){for(let i=Math.floor(c*.8/18)-1;i<Math.floor(c*.8/18)+20;i++){const x=i*18-c*.8,l=4+hsh(i+9)*12;g.fillStyle='rgba(170,210,255,.5)';g.beginPath();g.moveTo(x,10);g.lineTo(x+5,10);g.lineTo(x+2.5,10+l);g.closePath();g.fill()}}
function spkLights(c,T){const cl=['#ff5a5a','#5aff7a','#ffd25a','#5ab4ff'];for(let i=Math.floor(c*.9/64)-1;i<Math.floor(c*.9/64)+7;i++){const x0=i*64-c*.9;g.strokeStyle='#2a2430';g.lineWidth=.7;g.beginPath();g.moveTo(x0,18);g.quadraticCurveTo(x0+32,34,x0+64,18);g.stroke();
 for(let k=1;k<8;k++){const u=k/8,x=x0+64*u,y=18+16*u*(1-u)*4*.5+2;const on=Math.sin(T*2+i*3+k)>-.3;R(on?cl[(i+k)%4]:'#3a3440',x-1,y,2,2)}}}
/* Jäätunneli: kaaret ja sininen hohde, sisäänkäynnin kyltti tolpillaan */
function spkTunnel(xa,xb,c,T){R('#1a2a44',xa,24,xb-xa,80);for(let x=Math.floor(c/96)*96;x<c+W+96;x+=96){const sx=x-c;if(sx<xa-40||sx>xb+40)continue;
 g.strokeStyle='#5a8ac8';g.lineWidth=5;g.beginPath();g.arc(sx,104,62,Math.PI,2*Math.PI);g.stroke();g.strokeStyle='#9ac8f0';g.lineWidth=1;g.beginPath();g.arc(sx,104,60,Math.PI*1.1,Math.PI*1.5);g.stroke()}
 g.fillStyle='rgba(120,180,255,.06)';g.fillRect(xa,24,xb-xa,80);
 const sx=120-c;if(sx>-60&&sx<W+60){R('#3a2a1a',sx-32,52,4,52);R('#3a2a1a',sx+28,52,4,52);R('#5a3a1e',sx-36,54,72,24);R('#7a5028',sx-36,54,72,2);R('#2a1a0c',sx-36,76,72,2);labelBoard('SANTAPARK',sx,62,'#ffe070');labelBoard('NAPAPIIRI 66°33′',sx,72,'#bfe8ff')}}
/* Tonttupaja: talo välimuistiin (hirsiseinä, räystäs, ovi ja ikkunat fitRow-riviin talon sisään, nurkkapilarit) */
const PAJAC={};
function pajaBld(i){let k=PAJAC[i];if(k)return k;const P0=PAJAT[i],w=PAJA.w,h=PAJA.h,cv=document.createElement('canvas');cv.width=(w+8)*2;cv.height=(h+10)*2;const x=cv.getContext('2d');x.setTransform(2,0,0,2,0,0);const gs=g;g=x;
 try{const top=10,base=top+h;for(let y=top+8;y<base;y+=6){R(P0.c,4,y,w,5);R('rgba(255,255,255,.08)',4,y,w,1);R('rgba(0,0,0,.35)',4,y+5,w,1)}
  g.fillStyle='#5a1a1a';g.beginPath();g.moveTo(0,top+10);g.lineTo(w/2+4,top-8);g.lineTo(w+8,top+10);g.closePath();g.fill();R('#8a2a2a',0,top+8,w+8,3);
  R('#2a1a10',4,top+8,4,h-8);R('#2a1a10',w,top+8,4,h-8);R('#3a2a1a',4,base-4,w,4);// nurkkapilarit ja sokkeli
  const [dw,dh]=PAJA.door,[ww,wh]=PAJA.win,dx=12;R('#1a1008',dx-1,base-dh-1,dw+2,dh+1);R('#5a3418',dx,base-dh,dw,dh);R('#7a4a22',dx+2,base-dh+3,dw-4,dh-6);ell(dx+dw-4,base-dh/2,1.2,1.2,'#e8c040');
  fitRow(dx+dw+10,w-4,ww,10).forEach(wx=>{R('#1a1008',wx-1,base-PAJA.gf+18,ww+2,wh+2);R('#c8904a',wx,base-PAJA.gf+19,ww,wh);R('#2a1a10',wx+ww/2-.5,base-PAJA.gf+19,1,wh);R('#2a1a10',wx,base-PAJA.gf+19+wh/2-.5,ww,1)})}finally{g=gs}
 return PAJAC[i]={cv,w:w+8,h:h+10}}
/* Jääveistos jalustallaan (välimuistiin): yksinkertaiset muodot läpikuultavana jäänä */
const VEC={};
function veistos(i){let k=VEC[i];if(k)return k;const cv=document.createElement('canvas');cv.width=80;cv.height=100;const x=cv.getContext('2d');x.setTransform(2,0,0,2,0,0);const gs=g;g=x;
 try{R('#4a5a7a',8,40,24,10);R('#6a7a9a',8,40,24,2);g.fillStyle='rgba(170,220,255,.7)';const t=VEISTOT[i%VEISTOT.length];g.beginPath();
  if(t==='poro'){g.rect(10,26,18,8);g.rect(11,34,2,6);g.rect(25,34,2,6);g.rect(26,16,4,11);g.moveTo(27,16);g.lineTo(22,6);g.lineTo(24,6);g.lineTo(28,14);g.lineTo(33,5);g.lineTo(34,7);g.lineTo(30,16)}
  else if(t==='karhu'){g.ellipse(20,30,11,8,0,0,7);g.moveTo(31,26);g.ellipse(30,24,5,5,0,0,7);g.rect(11,34,4,6);g.rect(25,34,4,6)}
  else if(t==='tonttu'){g.moveTo(20,4);g.lineTo(26,16);g.lineTo(14,16);g.closePath();g.ellipse(20,20,5,5,0,0,7);g.rect(15,24,10,16)}
  else{g.moveTo(20,2);g.lineTo(30,20);g.lineTo(26,20);g.lineTo(33,34);g.lineTo(7,34);g.lineTo(14,20);g.lineTo(10,20);g.closePath();g.rect(18,34,4,6)}
  g.fill();g.strokeStyle='rgba(230,250,255,.9)';g.lineWidth=.6;g.stroke()}finally{g=gs}return VEC[i]={cv}}
/* Pajakylän sali: punainen seinä, kultapilarit, takka (liekki), kuusi valoineen ja valtaistuin */
function spkHall(xa,xb,c,T){R('#4a1418',xa,24,xb-xa,80);for(let x=Math.ceil((SPKX.galleria+40)/90)*90;x<SPKX.len+90;x+=90){const sx=x-c;if(sx<xa-10||sx>xb+10)continue;R('#8a6a2a',sx-3,24,6,80);R('#c8a04a',sx-3,24,2,80)}
 R('#2a0a0c',xa,24,xb-xa,4);
 const tx=SPKX.takka-c;if(tx>-50&&tx<W+50){R('#5a4a40',tx-26,54,52,50);R('#6a5a50',tx-26,54,52,3);R('#1a0a08',tx-16,74,32,30);for(let i=0;i<5;i++){const fh=8+Math.abs(Math.sin(T*9+i*1.7))*10;g.fillStyle=i%2?'#ffb03a':'#ff6a2a';g.beginPath();g.moveTo(tx-12+i*6,104);g.lineTo(tx-9+i*6,104-fh);g.lineTo(tx-6+i*6,104);g.fill()}
  g.save();g.globalCompositeOperation='lighter';ell(tx,96,24,10,'rgba(255,140,40,.12)');g.restore()}
 const kx=SPKX.kuusi-c;if(kx>-50&&kx<W+50){R('#3a2010',kx-3,94,6,10);for(let j=0;j<4;j++){const y=36+j*15,wd=10+j*8;g.fillStyle='#1a4a2a';g.beginPath();g.moveTo(kx,y-6);g.lineTo(kx+wd,y+12);g.lineTo(kx-wd,y+12);g.closePath();g.fill()}
  for(let k=0;k<14;k++){const y=40+(k*13)%54,xx=kx+(hsh(k)*2-1)*(6+(y-36)*.35);R(Math.sin(T*3+k)>0?GIFTC[k%5]:'#2a3a2a',xx,y,2,2)}ell(kx,30,3,3,'#ffe070')}
 const vx=SPKX.valtaistuin-c;if(vx>-50&&vx<W+50){R('#6a1a1e',vx-18,40,36,64);R('#8a2a2e',vx-14,44,28,40);R('#c8a04a',vx-18,40,36,3);R('#c8a04a',vx-20,74,6,30);R('#c8a04a',vx+14,74,6,30);if(!M.pkUp)drawChar(SP.pk[0],vx,104,Object.assign(idle(T,1),{s:.95,prof:1,flip:true,aL:-.5,aR:-.4}))}}
/* Lattia osioittain: jäinen kivi, lankkulattia, kiiltävä jää, punainen matto; sauma- ja lankkuviivat kulkevat kameran mukana */
function spkFloor(c){const sec=[[-400,SPKX.tunneli,'#3a4a64','#4a5a78'],[SPKX.tunneli,SPKX.pajat,'#5a3e26','#6a4a2e'],[SPKX.pajat,SPKX.galleria,'#5a7a9a','#7a9aba'],[SPKX.galleria,SPKX.len+400,'#3a2a2a','#4a3434']];
 for(const [a,b,c1,c2] of sec){const x0=Math.max(0,a-c),x1=Math.min(W,b-c);if(x1<=x0)continue;g.fillStyle=mkLg(104,160,[[0,c2],[1,c1]]);g.fillRect(x0,104,x1-x0,56);R('rgba(255,255,255,.15)',x0,104,x1-x0,1)}
 for(let x=-(c%16);x<W;x+=16){const wx=x+c;if(wx>SPKX.tunneli&&wx<SPKX.pajat)R('rgba(0,0,0,.25)',x,105,.7,55)}
 {const x0=Math.max(0,SPKX.pajat-c),x1=Math.min(W,SPKX.galleria-c);if(x1>x0){g.save();g.beginPath();g.rect(x0,104,x1-x0,56);g.clip();for(let i=0;i<6;i++){const sx=((i*67-c)%W+W)%W;R('rgba(255,255,255,.12)',sx,110+i*7,40,1)}g.restore()}}
 {const x0=Math.max(0,SPKX.galleria+20-c),x1=Math.min(W,SPKX.len-c);if(x1>x0){R('#8a1a22',x0,116,x1-x0,26);R('#c8a04a',x0,116,x1-x0,1.5);R('#c8a04a',x0,140,x1-x0,1.5)}}
 const nx=SPKX.napapiiri-c;if(nx>-10&&nx<W+10){R('#e8eef8',nx-1,104,2,56);R('rgba(255,255,255,.3)',nx-4,104,8,56)}}
function spkBg(T){const c=M.cam;cutLayer('spkCave',spkCave);spkRock(c);
 rovaStrip(c,-400,SPKX.tunneli,(xa,xb)=>spkTunnel(Math.max(0,xa),Math.min(W,xb),c,T));
 rovaStrip(c,SPKX.tunneli,SPKX.pajat,(xa,xb)=>{R('#2a2026',Math.max(0,xa),24,Math.min(W,xb)-Math.max(0,xa),80);
  PAJAT.forEach((p,i)=>{const bx=PAJA.x0+i*(PAJA.w+PAJA.gap)-c;if(bx>W||bx+PAJA.w<0)return;const k=pajaBld(i);g.drawImage(k.cv,bx-4,104-PAJA.h-10,k.w,k.h);labelBoard(p.n,bx+PAJA.w/2,104-PAJA.gf+6,'#ffe070')})});
 rovaStrip(c,SPKX.pajat,SPKX.galleria,(xa,xb)=>{R('#24344e',Math.max(0,xa),24,Math.min(W,xb)-Math.max(0,xa),80);for(let i=0;i<5;i++){const vx=SPKX.pajat+70+i*120-c;if(vx<-50||vx>W+50)continue;const k=veistos(i);g.drawImage(k.cv,vx-20,54,40,50);g.save();g.globalCompositeOperation='lighter';ell(vx,80,22,26,'rgba(120,200,255,.07)');g.restore()}});
 rovaStrip(c,SPKX.galleria,SPKX.len+400,(xa,xb)=>spkHall(Math.max(0,xa),Math.min(W,xb),c,T));
 // osioiden rajat: tukevat kivipilarit (pinnat eivät pääty tyhjään)
 [SPKX.tunneli,SPKX.pajat,SPKX.galleria].forEach(x=>{const sx=x-c;if(sx<-12||sx>W+12)return;R('#3a3040',sx-6,20,12,84);R('#4a4050',sx-6,20,3,84);R('#2a2030',sx-8,100,16,4)});
 spkIcicles(c);spkLights(c,T);spkFloor(c)}
/* Lattiakerros ennen hahmoja: liukuhihnat (rullat liikkuvat, lahjat kulkevat päällä) */
function spkDraw(T){const c=M.cam;for(const b of BELTS){const x0=b.x0-c,x1=b.x1-c;if(x1<0||x0>W)continue;const y0=112+b.z0-3,y1=112+b.z1+2;
 R('#2a2a30',x0,y0,x1-x0,y1-y0);R('#4a4a52',x0,y0,x1-x0,1.2);R('#18181c',x0,y1-1.5,x1-x0,1.5);const ph=((T*b.v)%8+8)%8;
 for(let x=x0+ph;x<x1;x+=8)R('#3a3a42',x,y0+1.2,1.2,y1-y0-2.7);R('#5a5a64',x0-3,y0-1,4,y1-y0+2);R('#5a5a64',x1-1,y0-1,4,y1-y0+2);
 for(let k=0;k<4;k++){const span=x1-x0,gx=x0+((k*span/4+T*b.v)%span+span)%span;giftDraw(gx,y0+3,0,GIFTC[k%5])}}}
