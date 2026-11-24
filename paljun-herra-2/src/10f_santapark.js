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
const PAJA={x0:552,w:140,gap:44,h:76,gf:68,door:[24,58],win:[30,20],
 back:{p:.7,s:.62,n:9,gap:104,x0:0,dy:24}};// takarivi: vierityskerroin, mittakaava (perspektiivi), määrä, väli
const VEISTOT=['poro','karhu','tonttu','kuusi','poro'];
const LSP={n:2,of:2,fin:1,noW:1,indoor:1,name:'Santapark',hud:'SANTAPARK',len:SPKX.len,
 waves:[{x:250,list:['to','to']},{x:560,list:['to','hm','to']},{x:820,list:['to','to','tk','to']},{x:1100,list:['hm','to','to','tk']},
  {x:1420,list:['to','to','to','hm']},{x:1700,list:['tk','to','hm','to','to']},{x:2060,list:['to','tk','to','hm','to','to']}],
 bins:[[200,28,'c'],[640,10,'v'],[1000,30,'w'],[1380,12,'c'],[1600,30,'v'],[1960,20,'c'],[2120,8,'v']],
 msg:['Kenttä 2: Santapark','Tontut on kaapattu!'],say:['k','Kermis: Joulu kesken kesän? Rock!'],
 done:['Pajakylän sali on hiljentynyt...','Valtaistuimelta nousee joku.','Napauta: jatka.'],
 bg:spkBg,onFg:spkFg,onDraw:spkDraw,onStep:spkStep,onMove:spkMove,onHud:spkHud,onSort:spkSort,binDraw:crateDraw};
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

// ---- Tausta: parallaksikerrokset (kaukaa lähelle) ----
/* Kerroksen laatta piirretään kerran välimuistiin (2x) ja toistetaan vaakasuunnassa: p = vierityskerroin,
   w = laatan leveys. paint(x) piirtää laatan sisällön; reunojen yli menevät osat piirretään myös laatan toiselle puolelle,
   jotta sauma ei näy. */
const PLX={};
function plxTile(id,w,paint){let t=PLX[id];if(t)return t;const cv=document.createElement('canvas');cv.width=w*2;cv.height=H*2;const x=cv.getContext('2d');x.setTransform(2,0,0,2,0,0);const gs=g;g=x;
 try{[-w,0,w].forEach(o=>{g.save();g.translate(o,0);paint();g.restore()})}finally{g=gs}return PLX[id]={cv,w}}
function plxDraw(id,p,w,paint){const t=plxTile(id,w,paint),o=-(((M.cam*p)%w)+w)%w;for(let x=o;x<W;x+=w)g.drawImage(t.cv,x,0,w,H)}
/* 0. Luolan holvi: kiinteä liukuväri (välimuisti) */
function spkCave(){g.fillStyle=mkLg(10,104,[[0,'#0a0814'],[.5,'#1a1424'],[1,'#2a2030']]);g.fillRect(0,10,W,H-10)}
const SPL={far:{p:.12,w:480},mid:{p:.3,w:560},near:{p:.55,w:400},fg:{p:1.35,w:360}};
/* 1. Kaukainen luolasali: utuiset kivikartiot ja Pajakylän pienet ikkunavalot syvällä pimeässä */
function spkFar(){const w=SPL.far.w;for(let i=0;i<9;i++){const x=hsh(i+300)*w,h=30+hsh(i+310)*40,bw=40+hsh(i+320)*50;g.fillStyle='#16122a';g.beginPath();g.moveTo(x-bw/2,104);g.lineTo(x-4,104-h);g.lineTo(x+4,104-h);g.lineTo(x+bw/2,104);g.fill()}
 for(let i=0;i<7;i++){const x=hsh(i+330)*w,y=84+hsh(i+340)*14;R('#1c1830',x-7,y,14,104-y);g.fillStyle='#221c38';g.beginPath();g.moveTo(x-9,y);g.lineTo(x,y-6);g.lineTo(x+9,y);g.fill();
  R('rgba(255,200,110,.55)',x-4,y+3,2,2);R('rgba(255,200,110,.55)',x+2,y+3,2,2)}
 g.fillStyle=mkLg(60,104,[[0,'rgba(60,50,110,0)'],[1,'rgba(60,50,110,.25)']]);g.fillRect(0,60,w,44)}
/* 2. Kivipylväät lattiasta kattoon, reunavalo vasemmalla; välissä riippuvat lyhdyt */
function spkMid(){const w=SPL.mid.w;for(let i=0;i<4;i++){const x=40+i*140+hsh(i+400)*30,bw=18+hsh(i+410)*10;g.fillStyle='#1e1830';g.beginPath();g.moveTo(x-bw,104);g.quadraticCurveTo(x-bw*.4,60,x-bw*.7,10);g.lineTo(x+bw*.7,10);g.quadraticCurveTo(x+bw*.4,60,x+bw,104);g.fill();
  g.strokeStyle='#3a3458';g.lineWidth=1;g.beginPath();g.moveTo(x-bw,104);g.quadraticCurveTo(x-bw*.4,60,x-bw*.7,10);g.stroke()}
 for(let i=0;i<3;i++){const x=110+i*170,y=36+hsh(i+420)*14;R('#3a3040',x-.3,10,.6,y-12);R('#2a2020',x-3,y-2,6,8);R('#ffd27a',x-2,y,4,4);const q=g.createRadialGradient(x,y+2,0,x,y+2,14);q.addColorStop(0,'rgba(255,190,90,.25)');q.addColorStop(1,'rgba(255,190,90,0)');g.fillStyle=q;g.fillRect(x-14,y-12,28,28)}}
/* 3. Lähempi kiviseinä: kivilohkot, jääkristallirykelmät */
function spkNear(){const w=SPL.near.w;for(let i=0;i<12;i++){const x=hsh(i+70)*w,h=hsh(i+80);R(h>.5?'#241c2e':'#1e1828',x,22+h*34,26+h*18,16+h*22);R('rgba(255,255,255,.04)',x,22+h*34,26+h*18,1)}
 for(let i=0;i<5;i++){const x=hsh(i+90)*w,y=70+hsh(i+95)*24;g.fillStyle='rgba(140,200,255,.35)';[[-4,9],[0,14],[4,10],[7,6]].forEach(([dx,h])=>{g.beginPath();g.moveTo(x+dx-2,y);g.lineTo(x+dx,y-h);g.lineTo(x+dx+2,y);g.fill()})}}
/* Etuala hahmojen edessä: tummat jääpuikot ja valonauha ylhäällä (piirretään onFg:ssä, laatta välimuistissa) */
function spkFgTile(){const w=SPL.fg.w;for(let i=0;i<10;i++){const x=hsh(i+500)*w,l=8+hsh(i+510)*14;g.fillStyle='#0c0a14';g.beginPath();g.moveTo(x-5,10);g.lineTo(x+5,10);g.lineTo(x,10+l);g.fill()}
 g.strokeStyle='#14101c';g.lineWidth=1.2;g.beginPath();g.moveTo(0,14);for(let x=0;x<=w;x+=60)g.quadraticCurveTo(x+30,30,x+60,14);g.stroke()}
/* Jouluvalot: lamppujen paikat lasketaan kerran, väri vaihtuu juoksevana (chase) joka kehys */
const XMAS=['#ff4a4a','#5aff7a','#ffd25a','#5ab4ff','#ff7ad8'];
function bulbs(pts,T,sp,ox,oy,s){s=s||1;const z=s<1?1.4:2;for(let k=0;k<pts.length;k++){const [x,y]=pts[k],ph=(Math.floor(T*sp)+k)%5;R(ph===0?'#fff6d0':XMAS[k%5],ox+x*s-z/2,oy+y*s-z/2,z,z)}}
function spkLights(c,T){for(let i=Math.floor(c*.9/64)-1;i<Math.floor(c*.9/64)+7;i++){const x0=i*64-c*.9;g.strokeStyle='#2a2430';g.lineWidth=.7;g.beginPath();g.moveTo(x0,18);g.quadraticCurveTo(x0+32,34,x0+64,18);g.stroke();
 for(let k=1;k<8;k++){const u=k/8,on=Math.sin(T*2+i*3+k)>-.3;R(on?XMAS[(i+k)%5]:'#3a3440',x0+64*u-1,18+8*u*(1-u)*2+2,2,2)}}}
function spkIcicles(c){for(let i=Math.floor(c*.8/18)-1;i<Math.floor(c*.8/18)+20;i++){const x=i*18-c*.8,l=4+hsh(i+9)*12;g.fillStyle='rgba(170,210,255,.5)';g.beginPath();g.moveTo(x,10);g.lineTo(x+5,10);g.lineTo(x+2.5,10+l);g.closePath();g.fill()}}

/* Jäätunneli: syvemmällä pienemmät kaaret (p .75), edessä isot kaaret lamppuineen, sisäänkäynnin kyltti taulullaan */
const TUN={gap:96,r:62,back:{p:.75,r:44,gap:80}};
function spkTunnel(xa,xb,c,T){R('#141e34',xa,24,xb-xa,80);
 const B=TUN.back;for(let x=Math.floor(c*B.p/B.gap)*B.gap;x<c*B.p+W+B.gap;x+=B.gap){const sx=x-c*B.p;g.strokeStyle='#2e4a78';g.lineWidth=3;g.beginPath();g.arc(sx,104,B.r,Math.PI,2*Math.PI);g.stroke()}
 g.fillStyle='rgba(120,180,255,.07)';g.fillRect(xa,24,xb-xa,80);
 for(let x=Math.floor(c/TUN.gap)*TUN.gap;x<c+W+TUN.gap;x+=TUN.gap){const sx=x-c;if(sx<xa-70||sx>xb+70)continue;
  g.strokeStyle='#5a8ac8';g.lineWidth=5;g.beginPath();g.arc(sx,104,TUN.r,Math.PI,2*Math.PI);g.stroke();g.strokeStyle='#9ac8f0';g.lineWidth=1;g.beginPath();g.arc(sx,104,TUN.r-2,Math.PI*1.1,Math.PI*1.5);g.stroke();
  bulbs(TUN_B,T,3,sx,104)}
 const sx=120-c;if(sx>-60&&sx<W+60){R('#3a2a1a',sx-32,52,4,52);R('#3a2a1a',sx+28,52,4,52);R('#5a3a1e',sx-36,54,72,24);R('#7a5028',sx-36,54,72,2);R('#2a1a0c',sx-36,76,72,2);bulbs(SIGN_B,T,4,sx,54);labelBoard('SANTAPARK',sx,62,'#ffe070');labelBoard('NAPAPIIRI 66°33′',sx,72,'#bfe8ff')}}
const TUN_B=Array.from({length:11},(_,k)=>{const a=Math.PI*(1.04+k*.092);return[Math.cos(a)*(TUN.r+3),Math.sin(a)*(TUN.r+3)]});
const SIGN_B=Array.from({length:12},(_,k)=>[-35+k*6.4,-1]);

/* Tonttupaja: julkisivu välimuistiin (hirsiseinä, katto paksuudella ja räystäsvarjolla, savupiippu, jääpuikot,
   kuisti tukevilla tolpilla, portaat, lyhty, ikkunat fitRow-riviin talon sisään, nurkkapilarit ja sokkeli).
   Kylki piirretään joka kehys perspektiivissä (näkyy ruudun keskustaa kohti), valot vilkkuvat räystäällä. */
const PAJAC={};
const PAJA_EAVE=[...Array.from({length:12},(_,k)=>[k*(PAJA.w/2+4)/11,10-k*18/11]),...Array.from({length:12},(_,k)=>[PAJA.w/2+4+k*(PAJA.w/2+4)/11,-8+k*18/11])];
function pajaFacade(P0,w,h,sc){const top=10,base=top+h,gf=PAJA.gf;
 R('#3a1a14',w*.68,top-14,10,22);R('#5a2a1e',w*.68,top-16,12,3);// savupiippu
 for(let y=top+8;y<base;y+=6){R(P0.c,4,y,w,5);R('rgba(255,255,255,.08)',4,y,w,1);R('rgba(0,0,0,.35)',4,y+5,w,1)}
 R('rgba(0,0,0,.35)',4,top+10,w,4);// räystäsvarjo
 g.fillStyle='#5a1a1a';g.beginPath();g.moveTo(0,top+10);g.lineTo(w/2+4,top-8);g.lineTo(w+8,top+10);g.closePath();g.fill();g.fillStyle='#7a2a24';g.beginPath();g.moveTo(0,top+10);g.lineTo(w/2+4,top-8);g.lineTo(w/2+4,top-5);g.lineTo(4,top+10);g.fill();R('#8a2a2a',0,top+8,w+8,3);
 for(let i=0;i<9;i++){const x=4+i*w/8.5,l=2+hsh(i+P0.n.length)*4;g.fillStyle='rgba(190,225,255,.75)';g.beginPath();g.moveTo(x,top+11);g.lineTo(x+2,top+11);g.lineTo(x+1,top+11+l);g.fill()}// jääpuikot
 R('#2a1a10',4,top+8,4,h-8);R('#2a1a10',w,top+8,4,h-8);R('#3a2a1a',2,base-4,w+4,4);R('#4a3a28',2,base-4,w+4,1);// nurkkapilarit ja sokkeli
 const [dw,dh]=PAJA.door,[ww,wh]=PAJA.win,dx=14;
 R('#1a1008',dx-1,base-dh-1,dw+2,dh+1);R('#5a3418',dx,base-dh,dw,dh);R('#7a4a22',dx+2,base-dh+3,dw-4,dh-6);R('#5a3418',dx+2,base-dh/2,dw-4,1);ell(dx+dw-4,base-dh/2,1.2,1.2,'#e8c040');
 // kuisti: katos kahdella tukevalla tolpalla, portaat
 R('#3a1a14',dx-6,base-dh-8,dw+12,4);R('#5a2a1e',dx-6,base-dh-8,dw+12,1.5);R('#3a2414',dx-5,base-dh-4,3,dh+4);R('#3a2414',dx+dw+2,base-dh-4,3,dh+4);R('#4a3a28',dx-6,base-2,dw+12,2);
 // seppele ovessa
 g.strokeStyle='#2a6a3a';g.lineWidth=2;g.beginPath();g.arc(dx+dw/2,base-dh+14,4,0,7);g.stroke();R('#c8282c',dx+dw/2-1,base-dh+17,2,2);
 fitRow(dx+dw+12,w-4,ww,10).forEach(wx=>{const wy=base-gf+19;R('#1a1008',wx-1,wy-1,ww+2,wh+2);R('#b07a3a',wx,wy,ww,wh);R('#2a1a10',wx+ww/2-.5,wy,1,wh);R('#2a1a10',wx,wy+wh/2-.5,ww,1);
  R('rgba(40,20,10,.55)',wx+3,wy+wh-7,ww-6,3);R('rgba(40,20,10,.55)',wx+5,wy+wh-11,3,4);R('rgba(40,20,10,.55)',wx+ww-9,wy+wh-12,4,5);// työpöytä ja tonttujen siluetit
  R('#3a2414',wx-2,wy+wh+1,ww+4,2);R(GIFTC[Math.floor(hsh(wx)*5)],wx+2,wy+wh-2,5,3)})}// ikkunalauta, paketti
function pajaBld(i,back){const key=i+(back?'b':'f');let k=PAJAC[key];if(k)return k;const P0=PAJAT[i%PAJAT.length],w=PAJA.w,h=PAJA.h,cv=document.createElement('canvas');cv.width=(w+8)*2;cv.height=(h+30)*2;const x=cv.getContext('2d');x.setTransform(2,0,0,2,0,20*2);const gs=g;g=x;
 try{pajaFacade(P0,w,h);if(back){g.globalCompositeOperation='source-atop';R('rgba(20,16,40,.55)',-10,-20,w+30,h+40);g.globalCompositeOperation='source-over'}}finally{g=gs}
 return PAJAC[key]={cv,w:w+8,h:h+30,oy:20}}
/* Kylki perspektiivissä: lähin reuna → kaukainen reuna kohti katoamispistettä (ruudun keskikohta, horisontti PERS.vy) */
const PERS={vy:56,k:.11,max:14};
function pajaSide(bx,T){const w=PAJA.w,top=104-PAJA.h+8,base=104,cx=bx+w/2+4,right=cx<W/2,ex=right?bx+w+8:bx;// näkyvä kylki ruudun keskustaa kohti
 const fx=x=>x+(W/2-x)*PERS.k,fy=y=>y+(PERS.vy-y)*PERS.k;let x1=fx(ex);if(Math.abs(x1-ex)>PERS.max)x1=ex+Math.sign(x1-ex)*PERS.max;const ix=right?ex-4:ex+4;
 g.fillStyle='#2a1810';g.beginPath();g.moveTo(ix,top);g.lineTo(x1,fy(top));g.lineTo(x1,fy(base));g.lineTo(ix,base);g.fill();
 g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.6;for(let y=top+6;y<base;y+=6){g.beginPath();g.moveTo(ix,y);g.lineTo(x1,fy(y));g.stroke()}
 const pk=104-PAJA.h-8;g.fillStyle='#3a1210';g.beginPath();g.moveTo(cx,pk);g.lineTo(fx(cx),fy(pk));g.lineTo(x1,fy(top-2));g.lineTo(right?bx+w+8:bx,top-2);g.fill()}// katon lape
function spkPajat(xa,xb,c,T){const B=PAJA.back;
 // takarivi: pienemmät pajat syvemmällä (p .7), perspektiivin mukaan pienemmät ovet ja ikkunat
 for(let i=0;i<B.n;i++){const bx=(SPKX.tunneli-c)*B.p+B.x0+i*B.gap;if(bx>W||bx+PAJA.w*B.s<0)continue;const k=pajaBld(i,1),yt=104-B.dy-k.h*B.s;g.drawImage(k.cv,bx,yt,k.w*B.s,k.h*B.s);bulbs(PAJA_EAVE,T,2,bx,yt+k.oy*B.s,B.s)}
 R('rgba(10,8,20,.35)',Math.max(0,xa),24,Math.min(W,xb)-Math.max(0,xa),80);// syvyysusva takarivin päällä
 PAJAT.forEach((p,i)=>{const bx=PAJA.x0+i*(PAJA.w+PAJA.gap)-c;if(bx>W+20||bx+PAJA.w<-20)return;pajaSide(bx,T);const k=pajaBld(i);g.drawImage(k.cv,bx-4,104-PAJA.h-10-k.oy,k.w,k.h);
  bulbs(PAJA_EAVE,T,3,bx-4,104-PAJA.h-10);labelBoard(p.n,bx+PAJA.w/2,104-PAJA.gf+6,'#ffe070');
  const lx=bx+PAJA.door[0]+22,lg=.5+.5*Math.sin(T*3+i);g.save();g.globalCompositeOperation='lighter';ell(lx,104-PAJA.door[1]+6,6,6,`rgba(255,200,100,${.12+lg*.08})`);g.restore();R('#ffd27a',lx-1.5,104-PAJA.door[1]+4,3,4);// lyhty
  for(let s=0;s<3;s++){const u=((T*.35+s/3+i*.2)%1),sx=bx+PAJA.w*.68+5+Math.sin(u*6+i)*3,sy=104-PAJA.h-26-u*20;g.fillStyle=`rgba(200,200,220,${.25*(1-u)})`;g.beginPath();g.arc(sx,sy,2+u*4,0,7);g.fill()}})}// savu

/* Jääveistos jalustallaan (välimuistiin): yksinkertaiset muodot läpikuultavana jäänä */
const VEC={};
function veistos(i){let k=VEC[i];if(k)return k;const cv=document.createElement('canvas');cv.width=80;cv.height=100;const x=cv.getContext('2d');x.setTransform(2,0,0,2,0,0);const gs=g;g=x;
 try{R('#4a5a7a',8,40,24,10);R('#6a7a9a',8,40,24,2);g.fillStyle='rgba(170,220,255,.7)';const t=VEISTOT[i%VEISTOT.length];g.beginPath();
  if(t==='poro'){g.rect(10,26,18,8);g.rect(11,34,2,6);g.rect(25,34,2,6);g.rect(26,16,4,11);g.moveTo(27,16);g.lineTo(22,6);g.lineTo(24,6);g.lineTo(28,14);g.lineTo(33,5);g.lineTo(34,7);g.lineTo(30,16)}
  else if(t==='karhu'){g.ellipse(20,30,11,8,0,0,7);g.moveTo(31,26);g.ellipse(30,24,5,5,0,0,7);g.rect(11,34,4,6);g.rect(25,34,4,6)}
  else if(t==='tonttu'){g.moveTo(20,4);g.lineTo(26,16);g.lineTo(14,16);g.closePath();g.ellipse(20,20,5,5,0,0,7);g.rect(15,24,10,16)}
  else{g.moveTo(20,2);g.lineTo(30,20);g.lineTo(26,20);g.lineTo(33,34);g.lineTo(7,34);g.lineTo(14,20);g.lineTo(10,20);g.closePath();g.rect(18,34,4,6)}
  g.fill();g.strokeStyle='rgba(230,250,255,.9)';g.lineWidth=.6;g.stroke()}finally{g=gs}return VEC[i]={cv}}
/* Galleria: läpikuultava jääseinä (takaa näkyy luola), takarivissä pienemmät veistokset, kattokruunut */
const GAL={back:{p:.75,s:.6,gap:90,dy:4},chand:{p:.9,gap:150}};
function spkGallery(xa,xb,c,T){R('rgba(30,50,80,.55)',Math.max(0,xa),24,Math.min(W,xb)-Math.max(0,xa),80);
 const B=GAL.back;for(let i=0;i<8;i++){const vx=(SPKX.pajat-c)*B.p+40+i*B.gap;if(vx<-30||vx>W+30)continue;const k=veistos(i+2);g.globalAlpha=.55;g.drawImage(k.cv,vx-20*B.s,104-B.dy-50*B.s,40*B.s,50*B.s);g.globalAlpha=1}
 R('rgba(150,200,255,.06)',Math.max(0,xa),24,Math.min(W,xb)-Math.max(0,xa),80);
 for(let i=0;i<5;i++){const vx=SPKX.pajat+70+i*120-c;if(vx<-50||vx>W+50)continue;const k=veistos(i);g.drawImage(k.cv,vx-20,54,40,50);g.save();g.globalCompositeOperation='lighter';ell(vx,80,22,26,'rgba(120,200,255,.07)');g.restore()}
 const C=GAL.chand;for(let i=0;i<6;i++){const x=(SPKX.pajat-c)*C.p+60+i*C.gap;if(x<-30||x>W+30)continue;R('#8aa8c8',x-.3,10,.6,14);R('rgba(180,220,255,.8)',x-10,24,20,2);
  for(let k=0;k<5;k++){const tx=x-8+k*4,on=Math.sin(T*4+k+i)>.6;g.fillStyle=on?'#ffffff':'rgba(170,220,255,.8)';g.beginPath();g.moveTo(tx-1.5,26);g.lineTo(tx+1.5,26);g.lineTo(tx,31+(k%2)*3);g.fill()}}}

/* Pajakylän sali: punainen seinä, kultapilarit valokierteineen, köynnökset lamppuineen, seppeleet, kynttiläkruunut,
   takka (liekki), kuusi valoineen ja lahjapinoineen, valtaistuin */
const HALL={gap:90,swag:[...Array.from({length:9},(_,k)=>{const u=(k+1)/10;return[u*90,8*4*u*(1-u)]})]};
function spkHall(xa,xb,c,T){R('#4a1418',xa,24,xb-xa,80);R('rgba(0,0,0,.18)',xa,24,xb-xa,6);
 for(let y=40;y<104;y+=12)R('rgba(255,255,255,.03)',xa,y,xb-xa,1);
 const x0=Math.ceil((SPKX.galleria+40)/HALL.gap)*HALL.gap;
 for(let x=x0;x<SPKX.len+HALL.gap;x+=HALL.gap){const sx=x-c;if(sx<xa-HALL.gap||sx>xb+10)continue;
  // köynnös pilarista seuraavaan, lamput köynnöksessä
  g.strokeStyle='#1e4a2a';g.lineWidth=3;g.beginPath();g.moveTo(sx,30);g.quadraticCurveTo(sx+45,46,sx+90,30);g.stroke();bulbs(HALL.swag,T,3,sx,31);
  R('#8a6a2a',sx-3,24,6,80);R('#c8a04a',sx-3,24,2,80);for(let y=30;y<100;y+=8)R(XMAS[((y>>3)+Math.floor(T*3))%5],sx-3+((y>>3)%2)*4,y,2,2);// valokierre
  g.strokeStyle='#1e5a2e';g.lineWidth=2.4;g.beginPath();g.arc(sx,52,5,0,7);g.stroke();R('#c8282c',sx-1.5,56,3,3);// seppele
  if((x/HALL.gap)%2===0){const cx=sx+45;R('#c8a04a',cx-8,58,16,2);for(let k=0;k<3;k++){const fx=cx-6+k*6;R('#f0e8d0',fx-1,52,2,6);g.fillStyle='#ffcc4a';g.beginPath();g.ellipse(fx,50.5+Math.sin(T*12+k)*.4,1,2,0,0,7);g.fill()}}}// kynttilät
 R('#2a0a0c',xa,24,xb-xa,4);
 const tx=SPKX.takka-c;if(tx>-50&&tx<W+50){R('#5a4a40',tx-26,54,52,50);R('#6a5a50',tx-26,54,52,3);R('#4a3a30',tx-30,52,60,4);R('#1a0a08',tx-16,74,32,30);
  [-20,-6,8].forEach((o,k)=>{R('#c8282c',tx+o,56,6,9);R('#f4f0e8',tx+o,56,6,2)});// sukat
  for(let i=0;i<5;i++){const fh=8+Math.abs(Math.sin(T*9+i*1.7))*10;g.fillStyle=i%2?'#ffb03a':'#ff6a2a';g.beginPath();g.moveTo(tx-12+i*6,104);g.lineTo(tx-9+i*6,104-fh);g.lineTo(tx-6+i*6,104);g.fill()}
  g.save();g.globalCompositeOperation='lighter';ell(tx,96,24,10,'rgba(255,140,40,.12)');g.restore()}
 const kx=SPKX.kuusi-c;if(kx>-50&&kx<W+50){R('#3a2010',kx-3,94,6,10);for(let j=0;j<4;j++){const y=36+j*15,wd=10+j*8;g.fillStyle='#1a4a2a';g.beginPath();g.moveTo(kx,y-6);g.lineTo(kx+wd,y+12);g.lineTo(kx-wd,y+12);g.closePath();g.fill()}
  bulbs(TREE_B,T,3,kx,0);ell(kx,30,3,3,'#ffe070');[[-22,6],[-12,8],[10,7],[20,5],[0,4]].forEach(([o,s],k)=>{R(GIFTC[k%5],kx+o-s/2,104-s,s,s);R('#ffe070',kx+o-.5,104-s,1,s)})}
 const vx=SPKX.valtaistuin-c;if(vx>-50&&vx<W+50){R('#6a1a1e',vx-18,40,36,64);R('#8a2a2e',vx-14,44,28,40);R('#c8a04a',vx-18,40,36,3);R('#c8a04a',vx-20,74,6,30);R('#c8a04a',vx+14,74,6,30);bulbs(THRONE_B,T,2,vx,40);if(!M.pkUp)drawChar(SP.pk[0],vx,104,Object.assign(idle(T,1),{s:.95,prof:1,flip:true,aL:-.5,aR:-.4}))}}
const TREE_B=Array.from({length:22},(_,k)=>{const y=38+(k*11)%58;return[(hsh(k)*2-1)*(6+(y-36)*.35),y]});
const THRONE_B=Array.from({length:10},(_,k)=>[-17+k*3.8,-1]);
/* Lattia osioittain: jäinen kivi, lankkulattia, kiiltävä jää, punainen matto; sauma- ja lankkuviivat kulkevat kameran mukana */
/* Lattia osioittain (jäinen kivi, lankkulattia, kiiltävä jää, salin kivi); saumoissa materiaali vaihtuu liukuvärinä
   (SEAM.floor px), pajojen lankkuihin hiipii huurre ennen jäätä, salin matto alkaa oviaukon jälkeen kultareunalla. */
const SFLOOR=[{a:-400,b:SPKX.tunneli,c1:'#3a4a64',c2:'#4a5a78'},{a:SPKX.tunneli,b:SPKX.pajat,c1:'#5a3e26',c2:'#6a4a2e'},{a:SPKX.pajat,b:SPKX.galleria,c1:'#5a7a9a',c2:'#7a9aba'},{a:SPKX.galleria,b:SPKX.len+400,c1:'#3a2a2a',c2:'#4a3434'}];
const SEAM={floor:80,frost:90,carpet:46,glow:70};
const SEAMC={};// saumojen liukuvärit luodaan kerran (origo 0, piirretään siirrettynä)
function seamGrad(k,A,B){if(SEAMC[k])return SEAMC[k];const w=SEAM.floor,q=g.createLinearGradient(0,0,w,0);q.addColorStop(0,A.c2);q.addColorStop(1,B.c2);
 const v=g.createLinearGradient(0,104,0,160);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.28)');return SEAMC[k]={q,v}}
const FROST=Array.from({length:70},(_,k)=>{const u=Math.pow(hsh(k+600),.5);return[SPKX.pajat-u*SEAM.frost,106+hsh(k+610)*52,.6+hsh(k+620)*1.4]});
function spkFloor(c){for(const f of SFLOOR){const x0=Math.max(0,f.a-c),x1=Math.min(W,f.b-c);if(x1<=x0)continue;g.fillStyle=mkLg(104,160,[[0,f.c2],[1,f.c1]]);g.fillRect(x0,104,x1-x0,56);R('rgba(255,255,255,.15)',x0,104,x1-x0,1)}
 // lankut ohenevat sauman lähellä
 for(let x=-(c%16);x<W;x+=16){const wx=x+c;if(wx>SPKX.tunneli&&wx<SPKX.pajat){const e=Math.min(1,(wx-SPKX.tunneli)/SEAM.floor,(SPKX.pajat-wx)/SEAM.floor);if(e>0)R(`rgba(0,0,0,${.25*e})`,x,105,.7,55)}}
 {const x0=Math.max(0,SPKX.pajat-c),x1=Math.min(W,SPKX.galleria-c);if(x1>x0){g.save();g.beginPath();g.rect(x0,104,x1-x0,56);g.clip();for(let i=0;i<6;i++){const sx=((i*67-c)%W+W)%W;R('rgba(255,255,255,.12)',sx,110+i*7,40,1)}g.restore()}}
 // saumat: materiaali liukuu toiseen
 for(let k=0;k<SFLOOR.length-1;k++){const b=SFLOOR[k].b,sx=b-c-SEAM.floor/2;if(sx>W||sx+SEAM.floor<0)continue;const G=seamGrad(k,SFLOOR[k],SFLOOR[k+1]);g.save();g.translate(sx,0);g.fillStyle=G.q;g.fillRect(0,104,SEAM.floor,56);g.fillStyle=G.v;g.fillRect(0,104,SEAM.floor,56);g.restore()}
 for(const [x,y,r] of FROST){const sx=x-c;if(sx<-2||sx>W+2)continue;R('rgba(220,240,255,.5)',sx,y,r,r*.6)}
 {const cs=SPKX.galleria+SEAM.carpet,x0=Math.max(0,cs-c),x1=Math.min(W,SPKX.len-c);if(x1>x0){R('#8a1a22',x0,116,x1-x0,26);R('#c8a04a',x0,116,x1-x0,1.5);R('#c8a04a',x0,140,x1-x0,1.5);const ex=cs-c;if(ex>-4&&ex<W){R('#c8a04a',ex,116,2,26);for(let y=117;y<142;y+=3)R('#e8c870',ex-1.5,y,1.5,1.5)}}}// maton kultareuna ja hapsut
 const nx=SPKX.napapiiri-c;if(nx>-10&&nx<W+10){R('#e8eef8',nx-1,104,2,56);R('rgba(255,255,255,.3)',nx-4,104,8,56)}}
/* Oviaukot osioiden saumoissa: paksut pielet ja kaari peittävät seinän vaihtumiskohdan; seuraavan osion valo
   hohtaa aukosta. tyyli: puu (pajoihin), jää (galleriaan), kulta (saliin) */
const PORTAL=[{x:SPKX.tunneli,st:'puu',name:'TONTTUPAJAT',glow:'255,190,110'},{x:SPKX.pajat,st:'jaa',name:'JÄÄGALLERIA',glow:'140,200,255'},{x:SPKX.galleria,st:'kulta',name:'PAJAKYLÄN SALI',glow:'255,150,80'}];
const PSTY={puu:{p:'#4a2e18',h:'#6a4426',d:'#2a1a0c'},jaa:{p:'#6a9ac8',h:'#b0d8f8',d:'#3a5a88'},kulta:{p:'#8a6a2a',h:'#d8b058',d:'#5a4418'}};
const PRT={half:30,pil:13,top:32,lint:12};// kamana yläpalkin nimien alapuolella
const PGLOW={};
function portalGlow(rgb){if(PGLOW[rgb])return PGLOW[rgb];const q=g.createRadialGradient(0,70,2,0,70,SEAM.glow);q.addColorStop(0,`rgba(${rgb},.22)`);q.addColorStop(1,`rgba(${rgb},0)`);return PGLOW[rgb]=q}
function spkPortals(c,T){for(const P of PORTAL){const sx=P.x-c;if(sx<-SEAM.glow||sx>W+SEAM.glow)continue;const S=PSTY[P.st],L=sx-PRT.half,Rx=sx+PRT.half-PRT.pil;
 g.save();g.globalCompositeOperation='lighter';g.translate(sx,0);g.fillStyle=portalGlow(P.glow);g.fillRect(-SEAM.glow,0,SEAM.glow*2,104);g.restore();
 [L,Rx].forEach(x=>{R(S.d,x-2,PRT.top,PRT.pil+4,104-PRT.top);R(S.p,x,PRT.top,PRT.pil,104-PRT.top);R(S.h,x,PRT.top,3,104-PRT.top);R(S.d,x-3,100,PRT.pil+6,4)});// pielet ja jalustat
 R(S.d,L-4,PRT.top-2,PRT.half*2+8,PRT.lint+2);R(S.p,L-3,PRT.top-1,PRT.half*2+6,PRT.lint);R(S.h,L-3,PRT.top-1,PRT.half*2+6,2);// kamana
 if(P.st==='puu'){for(let y=PRT.top+16;y<100;y+=8){R(S.d,L,y,PRT.pil,1);R(S.d,Rx,y,PRT.pil,1)}bulbs(PORTAL_B,T,3,sx,PRT.top)}
 if(P.st==='jaa')for(let k=0;k<9;k++){const x=L+k*7.5,l=3+hsh(k+700)*7;g.fillStyle='rgba(200,235,255,.85)';g.beginPath();g.moveTo(x,PRT.top+PRT.lint-1);g.lineTo(x+3,PRT.top+PRT.lint-1);g.lineTo(x+1.5,PRT.top+PRT.lint-1+l);g.fill()}
 if(P.st==='kulta'){[[L+PRT.pil,1],[Rx,-1]].forEach(([x,d])=>{g.fillStyle='#8a1a22';g.beginPath();g.moveTo(x,PRT.top+PRT.lint);g.lineTo(x+d*16,PRT.top+PRT.lint);g.quadraticCurveTo(x+d*4,60,x+d*6,104);g.lineTo(x,104);g.fill();R('#c8a04a',x+d*(d>0?3:5)-(d>0?0:2),62,3,3)});bulbs(PORTAL_B,T,2,sx,PRT.top)}// verhot nyörillä
 labelBoard(P.name,sx,PRT.top+PRT.lint/2+3,P.st==='jaa'?'#e0f4ff':'#ffe070')}}
const PORTAL_B=Array.from({length:13},(_,k)=>[-PRT.half-2+k*(PRT.half*2+4)/12,-2]);
function spkBg(T){const c=M.cam;cutLayer('spkCave',spkCave);
 plxDraw('spkFar',SPL.far.p,SPL.far.w,spkFar);plxDraw('spkMid',SPL.mid.p,SPL.mid.w,spkMid);plxDraw('spkNear',SPL.near.p,SPL.near.w,spkNear);
 rovaStrip(c,-400,SPKX.tunneli,(xa,xb)=>spkTunnel(Math.max(0,xa),Math.min(W,xb),c,T));
 rovaStrip(c,SPKX.tunneli,SPKX.pajat,(xa,xb)=>spkPajat(xa,xb,c,T));
 rovaStrip(c,SPKX.pajat,SPKX.galleria,(xa,xb)=>spkGallery(xa,xb,c,T));
 rovaStrip(c,SPKX.galleria,SPKX.len+400,(xa,xb)=>spkHall(Math.max(0,xa),Math.min(W,xb),c,T));
 // osioiden saumat: oviaukot pielineen ja kamanoineen peittävät vaihtumiskohdan, valo hohtaa aukosta
 spkPortals(c,T);
 spkIcicles(c);spkLights(c,T);spkFloor(c)}
/* Etuala hahmojen edessä (nopein vieritys): tummat jääpuikot ja valonauha, lamput vilkkuvat */
function spkFg(T){plxDraw('spkFg',SPL.fg.p,SPL.fg.w,spkFgTile);const o=-(((M.cam*SPL.fg.p)%SPL.fg.w)+SPL.fg.w)%SPL.fg.w;for(let x=o;x<W;x+=SPL.fg.w)bulbs(FG_B,T,2.5,x,0)}
const FG_B=Array.from({length:30},(_,k)=>{const x=k*12+6,u=(x%60)/60;return[x,14+16*u*(1-u)*2+1]});
/* Lattiakerros ennen hahmoja: liukuhihnat (rullat liikkuvat, lahjat kulkevat päällä) */
function spkDraw(T){const c=M.cam;for(const b of BELTS){const x0=b.x0-c,x1=b.x1-c;if(x1<0||x0>W)continue;const y0=112+b.z0-3,y1=112+b.z1+2;
 R('#2a2a30',x0,y0,x1-x0,y1-y0);R('#4a4a52',x0,y0,x1-x0,1.2);R('#18181c',x0,y1-1.5,x1-x0,1.5);const ph=((T*b.v)%8+8)%8;
 for(let x=x0+ph;x<x1;x+=8)R('#3a3a42',x,y0+1.2,1.2,y1-y0-2.7);R('#5a5a64',x0-3,y0-1,4,y1-y0+2);R('#5a5a64',x1-1,y0-1,4,y1-y0+2);
 for(let k=0;k<4;k++){const span=x1-x0,gx=x0+((k*span/4+T*b.v)%span+span)%span;giftDraw(gx,y0+3,0,GIFTC[k%5])}}}
