/* Paljun Herra 2 – Välipomo Rysty-Rane (Lordin aukio, Rovaniemi).
   Liioitellun leveät hartiat, isot hauikset, 1,5 × pelaajahahmojen korkeus (KT.rr.sc).
   Vaarallinen koukku (MVJ.hook): pitkä, selvästi näkyvä valmistelu (käsi taakse, punainen "!", murina).
   Valmistelun ja lyönnin ajan Rane on panssaroitu (iskut eivät keskeytä), eikä horjuva väistö auta:
   ainoa keino on perääntyä ulottumattomiin ja rangaista pitkän palautumisen aikana. */
const RANE={hp:300,trig:2130,startX:2275,hookCd:3.4,rageCd:2.4,hookDx:48,hookDz:9,slot:30,rage:.5};

function genRane(){LY={};const sk='#d8987a',sd='#b0725a',hl='#f0bca0',tk='#2c2c34',tkd='#1a1a20',jn='#34466a',jd='#24324e',bt='#2a1a10',kn='#d8b040';
 sBody(sk,sd,sk,sd,0);
 // hihaton toppi: kapea keskiosa, olkaimet ja paljaat, leveät hartiat (trapetsit ylös asti)
 L('torso');P(3,21,20,3,sk);P(4,20,18,1,sk);P(19,21,4,3,sd);P(6,22,1,1,hl);P(9,20,8,1,sd);
 P(8,24,10,10,tk);P(16,24,2,10,tkd);P(9,21,2,3,tk);P(15,21,2,3,tk);P(10,26,6,1,'#3c3c46');P(9,24,8,1,sk);
 // käsivarret: iso olkapää, pullea hauis, paksu kyynärvarsi, nyrkissä rystyrauta
 [['armL',3,-1],['armR',19,1]].forEach(([n,x,s])=>{L(n);const o=s<0?x-1:x+4,c=s<0?sk:sd;
  for(let y=21;y<36;y++)P(x,y,4,1,sk);P(s<0?x:x+3,21,1,15,sd);
  P(x-1,21,6,4,sk);P(o,22,1,3,c);P(s<0?x:x+1,21,2,1,hl);// olkapää
  P(o,25,1,4,c);P(s<0?x+3:x,25,1,4,sk);P(s<0?x:x+2,26,2,1,hl);// hauis
  P(x,34,4,2,sk);P(x,34,4,1,kn);P(x+1,35,2,1,'#a88020')});
 sLegs(jn,jd,bt,'#4a3a2a');L('torso');P(8,33,10,1,'#5a3a20');P(12,33,2,1,kn);
 // pää: kalju ja kiiltävä, paksut kulmat, arpi, sänkiparta, paksu niska
 sFace(sk,sd);L('torso');P(9,18,8,3,sk);P(15,18,2,3,sd);L('head');
 P(8,6,10,3,sk);P(9,5,8,1,sk);P(17,6,1,3,sd);P(10,6,3,1,hl);
 P(9,11,3,1,'#2a1a10');P(14,11,3,1,'#2a1a10');P(9,12,2,1,'#1a1a2a');P(14,12,2,1,'#1a1a2a');
 P(12,14,2,2,sd);P(15,9,1,3,'#a0584a');P(10,16,6,1,'#5a3020');P(9,17,8,3,'#5a3a26');P(11,17,4,1,'#7a3a30');return sk}
/* Sivuprofiili: rajaus näyttäisi vain kapean keskivartalon, joten maalataan hartiamassa, rintakehä ja selän lihakset */
function raneProf(sk){const sd='#b0725a',tk='#2c2c34',tkd='#1a1a20';L('torso');
 P(6,20,13,4,sk);P(5,21,1,3,sd);P(7,19,10,1,sd);// trapetsit ja hartiat
 P(6,24,13,9,tk);P(18,24,1,7,tk);P(19,25,1,4,tk);P(6,24,1,8,tkd);P(5,25,1,5,tkd);P(16,24,3,1,sk)}
SP.rr=buildSpr(genRane,0,null,raneProf);
KT.rr={sp:'rr',hp:RANE.hp,spd:20,dm:1.2,sc:1.5,nm:'RYSTY-RANE',heavy:1,front:1,atk:['punch','punch','kick'],ai:raneAI,ko:raneKO};

/* Koukku: valmistelu st (käsi taakse), lyönti ac (kaari eteen + syöksy), pitkä palautuminen rc (avoin vastaiskuille) */
MVJ.hook={h:'mid',d:30,r:42,tip:25,st:.85,ac:.14,rc:.75,kd:1,nd:1,arm:1,lunge:95,n:'hook',pose:hookPose,over:hookOver};
/* Koukku takakädellä (aL) etuviistosta: valmistelussa käsi nousee leveälle sivulle ja taakse, lyönnissä se pyyhkäisee
   laajassa kaaressa vartalon yli kohti kohdetta. Etukäsi (aR) suojaa. Kulmat: 0 = alas, + = myötäpäivään. */
function hookPose(f,o,T){const a=f.atk,m=a.m,t=a.t,L2=(x,y,u)=>x+(y-x)*u;
 if(t<m.st){const u=ease(t/m.st),q=Math.sin(T*42)*.06*u;// värisevä jännitys
  Object.assign(o,{aL:L2(-.75,2.15,u)+q,eL:L2(-2,1.35,u),aR:L2(-1.15,-1.3,u),eR:L2(-1.55,-1.9,u),rot:-.12*u,tilt:-.08*u,lx:-3*u,bob:1.5*u,cy:26})}
 else if(t<m.st+m.ac){let v=Math.min(1,(t-m.st)/(m.ac*.7));v=1-Math.pow(1-v,3);
  Object.assign(o,{aL:L2(2.15,-1.75,v),eL:L2(1.35,.25,v),aR:L2(-1.3,-.4,v),eR:L2(-1.9,-1.9,v),rot:L2(-.12,.14,v),tilt:L2(-.08,.06,v),lx:L2(-3,9,v),cy:26})}
 else{const w=ease((t-m.st-m.ac)/m.rc);// raskas palautuminen: käsi roikkuu, hengästyy
  Object.assign(o,{aL:L2(-1.75,-.75,w),eL:L2(.25,-2,w),aR:L2(-.4,-1.15,w),eR:L2(-1.9,-1.55,w),rot:.14*(1-w),tilt:.06*(1-w)+Math.sin(T*9)*.04,lx:9*(1-w),bob:Math.sin(T*9)*1.2,cy:26})}}
/* Varoitus valmistelun aikana: vilkkuva punainen huutomerkki pään yläpuolella ja maassa punainen ulottuvuusviiva */
function hookOver(f,X,Y,T){const a=f.atk,m=a.m;if(a.t>=m.st)return;const u=a.t/m.st,sc=f.sc||1,top=Y-42*sc;
 const reach=reachOf(m,sc,1)+m.lunge*m.ac;g.save();g.globalAlpha=.25+.35*u;g.fillStyle='#ff2a1a';g.fillRect(f.face>0?X:X-reach,Y-1,reach,2);g.restore();
 if(Math.sin(T*24)>-.2){g.save();g.font='bold 14px monospace';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#1a0408';g.strokeText('!',X,top);g.fillStyle=u>.6?'#ff3a2a':'#ffb040';g.fillText('!',X,top);g.restore()}}

function raneAI(f,dx,dz,dt){
 if(!f.rage&&f.hp<f.mhp*RANE.rage){f.rage=1;f.spd*=1.3;mjSay(f,'Rysty-Rane: Nyt suututtaa! Rystyt kuumana!');tn(80,50,.6,.2,'sawtooth')}
 if(f.cd<=0&&Math.abs(dz)<RANE.hookDz&&Math.abs(dx)<RANE.hookDx){f.cd=f.rage?RANE.rageCd:RANE.hookCd;f.face=Math.sign(dx)||f.face;mStart(f,'hook');
  tn(75,52,.7,.2,'sawtooth');tn(180,640,.8,.05,'square');return true}
 return false}
function raneKO(d){M.boss=null;const Q=aukioQ();Q.rane=2;bell(3);crowd('cheer');M.say=[d,'Rysty-Rane: Rystyt... puutuu...'];M.sayT=2.4;
 msgL=['Rysty-Rane tyrmätty!','Lordin aukio on vapaa. Jatka eteenpäin →'];[659,880,1175,1568].forEach((f,i)=>tn(f,f,.2,.07,'triangle',.3+i*.1));M.go=3}
/* Ranen saapuminen: kun vanhus on opettanut väistön ja Esa kävelee aukion poikki */
function raneStep(){const Q=aukioQ(),e=M.e;if(!Q.taught||Q.rane||e.x<RANE.trig||Q.talk>=0)return;Q.rane=1;
 const f=spawnAt('rr',RANE.startX,14);f.slot=RANE.slot;f.cd=2.4;f.face=-1;M.boss=f;bell(2);tn(60,45,1,.22,'sawtooth');nz(.6,'lowpass',300,.35,120);
 M.say=[f,'Rysty-Rane: Kuka täällä horjuu? Mun koukku oikaisee!'];M.sayT=3;sTalk(1);msgL=['VÄLIPOMO: RYSTY-RANE']}
