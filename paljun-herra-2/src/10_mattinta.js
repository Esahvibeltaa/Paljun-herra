/* Paljun Herra 2 – Sivuttain vierivä mätkintä (kentät, viholliset, aseet) (pohja: Paljun herra 1) */
function recol(gen,map){return()=>{const sk=gen();for(const k in LY)LY[k].forEach(r=>{for(let i=0;i<r.length;i++)if(r[i]&&map[r[i]])r[i]=map[r[i]]});return sk}}
SP.rn=buildSpr(recol(genPena,{'#2a3a6a':'#4a4a54','#1c2850':'#34343c','#3a4a7a':'#5a5a66','#b02020':'#1a1a1a','#8a1818':'#0e0e0e','#e8e040':'#e07a20','#5a5a62':'#7a3a2a','#45454c':'#5a2a1e'}));
SP.pasi=buildSpr(recol(genTapsa,{'#1e1e28':'#1e5a3a','#121218':'#123a26','#8a5a2a':'#2a2a2a','#6a4420':'#1a1a1a'}));
SP.tp=buildSpr(recol(genTapsa,{'#1e1e28':'#e4e4ee','#121218':'#b0b0c0','#f0f0f0':'#c8202a','#8a5a2a':'#d8b040','#6a4420':'#b08a28'}));
SP.tt=buildSpr(recol(genPena,{'#b02020':'#e8c020','#8a1818':'#b89010','#f0f0f0':'#e8c020','#2a3a6a':'#e07a20','#1c2850':'#b05a10','#3a4a7a':'#f09a40','#5a5a62':'#4a4a52'}));
SP.ms=buildSpr(recol(genTapsa,{'#1e1e28':'#2a2a32','#121218':'#16161a','#f0f0f0':'#9aa0ac','#8a5a2a':'#0a0a0a','#6a4420':'#1a1a1a','#8a8a94':'#e8c040','#6a4020':'#1a1a1a'}));
function pipeW(a,b){g.fillStyle=mkLg(0,0,[]);const q=g.createLinearGradient(a,0,a+3,0);q.addColorStop(0,'#5a5e68');q.addColorStop(.4,'#c8ccd6');q.addColorStop(1,'#5a5e68');g.fillStyle=q;g.fillRect(a,b,3,18);R('#3a3e46',a-.5,b,4,2);R('#3a3e46',a-.5,b+16,4,2);R('rgba(140,60,20,.5)',a,b+8,3,2)}
function chainW(a,b){for(let i=0;i<7;i++){g.strokeStyle=i%2?'#8a8e98':'#c8ccd6';g.lineWidth=.9;g.beginPath();g.ellipse(a+1.5+Math.sin(i*1.3)*.8,b+i*2.5,1.3,1.8,0,0,7);g.stroke()}R('#5a3a1a',a,b+16,3,4)}
function wrench(a,b){R('#9aa0ac',a,b+2,2.4,10);ell(a+1.2,b+1.5,2.6,2.2,'#b8bcc8','#333');ell(a+1.2,b+1.5,1,1,'#222');R('#5a5a64',a,b+9,2.4,3)}
const MVJ={};for(const k in MV)MVJ[k]=Object.assign({},MV[k],{r:MV[k].r*.95});MVJ.solo={h:'mid',d:0,r:0,st:.3,ac:1.2,rc:.3,fx:3,n:'solo'};MVJ.star={h:'mid',d:0,r:0,st:.35,ac:.1,rc:.35,fx:4,n:'throw'};MVJ.throw.fx=2;
const KT={tt:{sp:'tt',hp:120,spd:28,dm:1.3,sc:1.12,nm:'TRUKKI-TAISTO'},rn:{sp:'rn',hp:36,spd:30},pasi:{sp:'pasi',hp:30,spd:34},tp:{sp:'tp',hp:30,spd:46},pe:{sp:'pe',hp:80,spd:24,dm:1.4},ta:{sp:'ta',hp:60,spd:46,dm:1.1},ms:{sp:'ms',hp:240,spd:26,dm:1.3,sc:1.22,nm:'MERSUMIES'}};
const L1={n:1,intro:1,kid:1,name:'pääkatu',theme:'city',len:1500,waves:[{x:260,list:['rn','rn','rn']},{x:620,list:['rn','pasi','rn']},{x:980,list:['rn','rn','rn','rn']},{x:1300,list:['pasi','rn','rn','pasi','rn']}],bins:[[200,30,'c'],[540,8,'w'],[700,24,'v'],[860,34,'p'],[1180,12,'c']]};
const LG={n:2,name:'huoltoasema',theme:'gas',len:1400,waves:[{x:260,list:['rn','rn','pasi']},{x:600,list:['tp','rn','tp']},{x:950,list:['pasi','rn','tp','rn']},{x:1240,list:['rn','tp','pasi','rn','tp']}],bins:[[170,32,'c'],[480,8,'p'],[650,26,'v'],[820,30,'c'],[1120,14,'k']],msg:['Kenttä 2: huoltoasema','Pakun jäljet kääntyivät tänne.'],say:['a','Aapeli: Täällä ei edes oo latauspistettä!'],done:['Kassa: "Musta paku ajoi romuttamolle."','Napauta: kenttä 3.']};
const LS={n:3,name:'romuttamo',theme:'scrap',len:1500,waves:[{x:260,list:['rn','pasi','rn']},{x:620,list:['tp','rn','pasi','tp']},{x:980,list:['rn','rn','tp','pasi','rn']},{x:1300,list:['tt','rn','tp']}],bins:[[190,30,'k'],[520,10,'p'],[700,24,'v'],[870,32,'c'],[1150,8,'w']],msg:['Kenttä 3: romuttamo','Pakun jäljet johtavat romuttamolle.'],say:['k','Kermis: Täällä haisee vanha diesel.'],done:['Trukki-Taisto on nurin!','Taisto: "Mersumies... teollisuusalueella..."','Napauta: kenttä 4.']};
const L2={n:4,roof:{lad:700,A:[712,900,32],B:[922,1140,38],S:1200},msg:['Kenttä 4: teollisuusalue','Kiipeä tikkaita katoille!'],done:['Turbo-Tapsa: Autotalli on hallin takana!','Mersumies odottaa siellä.','Napauta: autotalliin!'],name:'teollisuusalue',theme:'ind',len:1800,waves:[{x:240,list:['rn','tp','rn']},{x:520,list:['pasi','tp','rn']},{x:760,roof:1,list:['rn','pasi']},{x:1000,roof:1,list:['tp','rn','rn']},{x:1360,list:['rn','pasi','tp','rn']},{x:1600,list:['pe','ta','rn']}],bins:[[170,10,'w'],[420,34,'p'],[600,24,'v'],[1280,20,'c'],[1480,8,'k'],[1580,12,'v'],[1660,32,'c']]};
const LB={n:5,boss:1,name:'Mersumiehen autotalli',theme:'garage',len:320,waves:[{x:0,list:['ms']}],bins:[[40,34,'c'],[70,8,'v']]},LV=[null,L1,LG,LS,L2,LB];
const MJB=[[.6,'p','Esa: Hempukka! Ja tuolla on moottori!'],[3.2,'b','Mersumies: Kuka häiritsee Mersumiestä?'],[6.2,'k','Kermis: Me tultiin hakeen mun moottori!'],[9,'b','Mersumies: Maistakaa tähtiä!']];
const MJR=[[1.2,'w','Hempukka: Esa! Mä tiesin että sä tuut!'],[4,'k','Kermis: Mun moottori! Ihan tahallaan.'],[6.8,'a','Aapeli: Ja kotiin mennään... sähköllä!']];
const M={};let PHB=[16,304];
const MJI=[[.8,'k','Kermis: Hei! Joku on vienyt mun moottorin!'],[3.8,'a','Aapeli: Renkaanjäljet... dieselpaku!'],[6.8,'p','Esa: Diesel-jengi! Perään!'],[9.5,'w','Hempukka: Mä tuun kanssa!']];
const MJK=[[1.7,'w','Hempukka: ESAAA!'],[3.8,'p','Esa: Ne vei Hempukan!'],[6.3,'k','Kermis: Ja mun moottori on varmaan samassa paikassa!'],[8.8,'a','Aapeli: Seurataan pakua!']];
const MSAY={tt:['Trukki-Taisto: Trukki tulee, väistykää!'],pe:['Diesel-Pena: Nyt on revanssin aika!'],ta:['Turbo-Tapsa: Turbo päälle, sähköjätkät!'],p:['Esa: Diesel-jengi kyytiin!','Esa: Tonttulakki iskee!'],a:['Aapeli: ID.3-potku!','Aapeli: Hiljaa ja nopeasti!'],k:['Kermis: Hevi-voimaa!','Kermis: Rock and roll!'],e:['Rasvanäppi: Diesel jyrää!','Pasi: Pakoputki tulee!','Rasvanäppi: Sähköjätkät!']};
const hsh=i=>((Math.sin(i*127.1+11)*43758.5453)%1+1)%1;
function mjE(sp,x,z,team,kind,hp){const k=KT[kind]||{};return{sp,x,z,y:0,vx:0,vz:0,vy:0,face:1,hp,mhp:hp,st:'idle',atk:null,wk:0,ht:0,dt:0,rw:0,rwv:0,team,kind,th:Math.random(),cd:2+Math.random()*3,cmb:0,ct:9,wpn:0,tired:0,sw:1,spd:k.spd||30,dm:k.dm||1,sc:k.sc||1,fd:null}}
function startMJ(retry){stage=7;state='s7';PHB=[16,304];if(retry){B.h=M.h0;B.hs=M.hs0}else{M.h0=B.h;M.hs0=B.hs;M.kills=0;M.bonus=0;M.lvl=1;M.hp=100}
 showPad(true);document.getElementById('bj').style.display='block';document.getElementById('bh').style.gridColumn='auto';
 document.querySelector('p').textContent='Ristiohjain liikuttaa (ylös/alas = kadun syvyys). LYÖNTI (sarja 1-2-3), POTKU, HYPPY ja HAUKI. Näppäimistö: nuolet tai WASD, J = lyönti, K = potku, välilyönti = hyppy, L = Hauki.';
 if(ambG){setAP(ambG.gain,.5,.4);setAP(bubG.gain,0,.2)}mjLevel(M.lvl,retry)}
function mjLevel(n,retry){const L=LV[n];M.lvl=n;M.L=L;M.camY=0;const hp=retry?100:Math.min(100,(M.hp||100)+(n>1?30:0));
 M.e=mjE(SP.e[S2.outfit],70,22,'p','p',100);M.e.hp=hp;M.al=[mjE(SP.a,44,32,'a','a',80),mjE(SP.k,28,12,'a','k',90)];M.al[1].cd=4;
 if(L.boss){M.e.x=60;M.al[0].x=40;M.al[1].x=24}
 Object.assign(M,{w:{x:12,z:36,wk:0,face:1,gone:n>1||L.noW?1:0},hk:L.boss?{x:270,z:6,tied:1,x0:270}:null,ents:[M.e,...M.al],cam:0,lock:0,wi:0,sq:[],proj:[],items:[],fx:[],objs:L.bins.map(b=>({x:b[0],z:b[1],drop:b[2],br:0,bt:0})),q:[],hist:[],ck:0,t:0,ph:L.intro?(retry?'play':'intro'):L.boss?'bintro':'title',say:null,sayT:0,ii:0,stop:0,van:null,kt:0,nx:6,smoke:0,boss:null,stg:0,w80:0,w20:0});
 if(L.boss){mjSpawn('ms');M.wi=1}
 musicStop();musicStart(L.boss?'bb':'b');
 msgL=retry?['Uusi yritys!',L.msg?L.msg[0]:'']:L.intro?['Falconin pihalla...']:L.boss?(L.msg||['Pomo odottaa...']):L.msg;
 if(L.boss){M.lock=1;M.camT=0}}
function mjPress(a){if(M.ph==='play')pushPress(M.q,M.ck,a,M.e&&M.e.y>0)}
function act7(e){if(!e){mjPress('J');return}if(e.target!==cv)return;
 if(M.ph==='intro'){const nx=M.ii<MJI.length?MJI[M.ii][0]:12;M.t=Math.max(M.t,nx)}
 else if(M.ph==='kid'){const nx=M.ii<MJK.length?MJK[M.ii][0]:11.5;M.kt=Math.max(M.kt,nx)}
 else if(M.ph==='bintro'){const nx=M.ii<MJB.length?MJB[M.ii][0]:11.5;M.t=Math.max(M.t,nx)}
 else if(M.ph==='rescue'){const nx=M.ii<MJR.length?MJR[M.ii][0]:9.5;M.kt=Math.max(M.kt,nx)}
 else if(M.ph==='title'&&M.t>.5)M.t=Math.max(M.t,2.6);
 else if(M.ph==='done'&&M.t>1){M.hp=M.e.hp;if(M.lvl+1<LV.length)mjLevel(M.lvl+1);else{PTS.mj=M.kills*25+700+Math.round(M.e.hp)+(M.bonus||0);showPad(false);onLevelsDone()}}
 else if(M.ph==='lose'&&M.t>1.5){if(LIVES>0)startMJ(true);else{showPad(false);restartAll()}}}
function mStart(f,n){const m=MVJ[n];f.atk={m,t:0,hits:new Set()};f.st='atk';if(!m.air){f.vx=0;f.vz=0}if(!m.fx)sSwing(n)}
function mjVo(f){return f.team==='p'?240:f.kind==='k'?110:f.kind==='a'?200:f.kind==='pasi'?170:130}
function mjSay(k,t){M.say=[k,t];M.sayT=2.6;sTalk(k==='w'?0:1)}
function mjSpk(k){if(typeof k==='object')return[k.x-M.cam,112+k.z-66*(k.sc||1)-(k.base||0)];if(k==='b'&&M.boss)return mjSpk(M.boss);const f=k==='p'?M.e:k==='a'?M.al[0]:k==='k'?M.al[1]:k==='w'?(M.L.boss?M.hk:M.w):null;return f?[f.x-M.cam,112+f.z-66-(f.base||0)]:[160,40]}
function mjDamage(a,d,m){let dmg=m.d*(a.team==='p'?pow(B.h):a.team==='a'?.8:(DIFF?1.25:1)*.85*(a.dm||1));if(a.team==='p'&&a.wpn>0){const wn=WN[a.wt||'w'];dmg+=wn[3];a.wpn--;tn(1800,1700,.06,.1,'square');if(!a.wpn){msgL=[wn[0]+' '+wn[1]+'!'];nz(.2,'highpass',3000,.15,1500)}}
 d.hp=Math.max(0,d.hp-dmg);const ad=d.x>a.x?1:-1;sImpact(KICKS.includes(m.n)?'k':'p',dmg>=10);M.stop=dmg>=10?.08:.04;M.fx.push({x:(a.x+d.x)/2,y:112+d.z-30-d.y-(d.base||0),t:0,big:dmg>=10,txt:dmg>=14?'POW!':dmg>=10?'BAM!':null});
 if(d.team==='p')vib(dmg>=10?50:20);else if(dmg>=10)vib(25);
 const big=d.kind==='ms'?(dmg>=14||d.hp<=0):(m.kd||dmg>=12||d.hp<=0||(a.team==='p'&&a.cmb>=3&&m.n==='upper'));
 if(m.n==='upper'&&d.kind!=='ms'&&d.st!=='climb'){d.ko=d.hp<=0?1:0;launchUp(d,ad,d.kind==='tt'?170:205);crowd('ooh')}else if(big){d.ko=d.hp<=0?1:0;launch(d,ad,Math.max(8,dmg+(d.hp<=0?4:0)));if(dmg>=10)crowd('ooh')}else{d.st='hit';d.ht=d.kind==='ms'?.18:.38;d.atk=null;d.vx=ad*60;d.rwv+=ad*(5+dmg*.5);if(Math.random()<.4)voice(mjVo(d),mjVo(d)*.65,.2,'u',.5)}
 if(d.hp<=0){if(d.team==='e'){d.dead=1;M.kills++;if(d.kind==='tt'){M.boss=null;crowd('cheer');bell(2);if(LIVES<3){LIVES++;lifeLoss=-9;msgL=['Trukki-Taisto tyrmätty!','Esa saa yhden sydämen takaisin! +1 ♥'];[659,880,1175].forEach((f,i)=>tn(f,f,.18,.08,'triangle',i*.1))}else{M.bonus=(M.bonus||0)+150;msgL=['Trukki-Taisto tyrmätty!','Sydämet täynnä: +150 pistettä.']}}if(d.kind==='ms'){M.ents.forEach(x=>{if(x.team==='e'&&!x.dead&&x!==d){x.dead=1;x.ko=1;launch(x,x.x>d.x?1:-1,10)}});M.proj=[];M.ph='rescue';M.kt=0;M.ii=0;M.say=[d,'Mersumies: Mun... Mersu...'];M.sayT=2;bell(3);crowd('cheer');msgL=['Mersumies on tyrmätty!','Hempukka ja moottori ovat turvassa!'];[784,988,1175,1568].forEach((f,i)=>tn(f,f,.25,.07,'triangle',.5+i*.1))}if(!d.fallR){const it=t=>M.items.push({x:d.x+(M.items.length%2?6:-6),z:d.z,base:d.base||0,type:t,t:0});if(Math.random()<(DIFF?.15:.3))it('c');else if(Math.random()<(d.kind==='pasi'?.6:.25))it(d.kind==='pasi'?'p':pick(['v','w','p','k']))}}else if(d.team==='a'){d.tired=6;msgL=[(d.kind==='a'?'Aapeli':'Kermis')+' on väsynyt!','Hän palaa pian taisteluun.']}else{M.ph='lose';M.t=0;loseLife();bell(3);crowd('gasp');msgL=['Esa kaatui!']}}}
function mjHitCheck(a){const m=a.atk.m;
 if(a.team==='p')M.objs.forEach(o=>{if(o.br||a.atk.hits.has(o)||a.lev==='roof')return;const dx=o.x-a.x;if((m.both||Math.sign(dx)===a.face)&&Math.abs(dx)<=reachOf(m,a.sc||1,1)+3&&Math.abs(o.z-a.z)<9){a.atk.hits.add(o);o.br=1;o.bt=0;tn(500,300,.15,.25,'square');nz(.3,'bandpass',1200,.3,400);M.items.push({x:o.x+a.face*10,z:o.z,type:o.drop,t:0});M.fx.push({x:o.x,y:112+o.z-8,t:0})}});
 for(const d of M.ents){if(d===a||d.team===a.team||(a.team!=='e'&&d.team!=='e'))continue;if(a.atk.hits.has(d)||['down','ko','fly','roll','kip'].includes(d.st))continue;
  const dx=d.x-a.x;if(!m.both&&Math.sign(dx)!==a.face&&Math.abs(dx)>3)continue;if(Math.abs(dx)>reachOf(m,a.sc||1,d.sc||1)+(a.team==='p'&&a.wpn>0&&['punch','jpunch','lowp','upper'].includes(m.n)?WN[a.wt||'w'][4]:0)||Math.abs(d.z-a.z)>9)continue;if(m.h==='lo'&&d.y>8)continue;if(d.st==='climb'||Math.abs((d.base||0)-(a.base||0))>12)continue;
  if(a.team==='p'&&B.h>=80&&!m.air&&Math.random()<.25){a.atk.hits.add(d);M.fx.push({x:(a.x+d.x)/2,y:112+d.z-30-d.y-(d.base||0),t:0,txt:'OHI!'});nz(.15,'highpass',2500,.08,1200);continue}
  a.atk.hits.add(d);if(a.atk.hitT===undefined)a.atk.hitT=M.ck;mjDamage(a,d,m)}}
function mjSpecial(f){const fx=f.atk.m.fx;
 if(fx===1){M.smoke=3;nz(1.5,'lowpass',400,.35,120);msgL=['Diesel-Pena päästi pakokaasupilven!','Köh köh!'];[M.e,...M.al].forEach(d=>{if(Math.abs(d.x-f.x)<55&&Math.abs(d.z-f.z)<14&&!['down','ko','fly'].includes(d.st)&&d.tired<=0)mjDamage({team:'e',x:f.x,face:f.face,dm:.7},d,{d:7,n:'punch',h:'mid'})})}
 if(fx===4){const sp=f.hp<f.mhp/2?[-28,0,28]:[0];sp.forEach(vz=>M.proj.push({x:f.x+f.face*14,z:f.z,y:34,vx:f.face*135,vz,r:0,star:1}));tn(1800,2600,.15,.06,'square');nz(.2,'highpass',4000,.08,6000)}
 if(fx===2){M.proj.push({base:f.base||0,x:f.x+f.face*12,z:f.z,y:30,vx:f.face*150,r:0});tn(700,400,.12,.06,'square')}
 if(fx===3){msgL=['Kermis: ILMAKITARASOOLO!','Viholliset ovat tyrmistyksissä!'];[82.4,123.5,164.8].forEach(fq=>{tn(fq,fq,.9,.08,'sawtooth');tn(fq*1.01,fq*1.01,.9,.06,'square')});for(let i=0;i<8;i++)tn(330+i*40,360+i*40,.08,.05,'sawtooth',.15+i*.09);
  M.ents.forEach(d=>{if(d.team==='e'&&!d.dead&&['idle','walk','atk'].includes(d.st)&&Math.abs(d.x-f.x)<60&&Math.abs(d.z-f.z)<16){d.st='hit';d.ht=1.8;d.atk=null;d.rwv+=(d.x>f.x?1:-1)*8}});f.notes=1.4}}
function mjUpd(f,dt){phys(f,dt);
 if(f.st!=='fly'&&f.st!=='kip'&&(f.y>0||f.vy>0)){f.vy-=440*dt;f.y=Math.max(0,f.y+f.vy*dt);if(f.y===0){f.vy=0;if(f.st==='jump'||(f.atk&&f.atk.m.air)){f.atk=null;f.st='idle';nz(.06,'lowpass',500,.12)}}}
 if(f.st==='jump'&&f.jk>0&&!f.atk){f.jk-=dt;if(f.jk<=0)mStart(f,'fkick')}
 if(f.atk){const a=f.atk,m=a.m;a.t+=dt;if(m.dash)f.vx=a.t>=m.st&&a.t<m.st+m.ac?f.face*230:0;if(a.t>=m.st&&a.t<=m.st+m.ac){if(m.fx){if(!a.fxd){a.fxd=1;mjSpecial(f)}}else mjHitCheck(f)}if(f.atk&&!m.air&&a.t>=m.st+m.ac+m.rc){f.atk=null;f.st='idle'}}
 f.x+=f.vx*dt;f.z=Math.max(0,Math.min(40,f.z+f.vz*dt));
 if(['hit','down','ko'].includes(f.st)||(f.st==='fly'&&f.y===0))f.vx*=Math.pow(.02,dt);
 if(f.st==='hit'){f.ht-=dt;if(f.ht<=0)f.st='idle'}
 if(f.st==='down'){f.dt-=dt;if(f.dt<=0){f.gt=0;f.kj=0;f.vx=0;if(Math.random()<.5)f.st='kip';else{f.st='roll';f.x+=f.lie*16}}}
 if(f.team==='a'&&f.tired>0){f.tired-=dt;if(f.st==='down'||f.st==='ko'){f.ko=1;f.st='ko'}if(f.tired<=0){f.ko=0;f.hp=f.mhp*.55;if(f.st==='ko'){f.st='down';f.dt=.1}}}
 if(f.st==='ko'&&f.team==='e'){f.kt=(f.kt||0)+dt;if(f.kt>1.6)f.gone=1}
 f.cd-=dt;f.ct+=dt;if(f.notes>0)f.notes-=dt}
function mjCtrl(dt){const e=M.e,dl=dlyM(B.h);M.hist.push([M.ck,keysNow()]);while(M.hist.length>1&&M.hist[1][0]<=M.ck-dl)M.hist.shift();const d=M.hist[0][1];const RR=M.L.roof;
 if(M.lift&&M.lift.on){liftRide(e,dt);return}
 if(RR&&e.st==='climb'){e.vx=e.vz=0;if(RR.lift){liftRide(e,dt);return}if(d.u){e.base+=18*dt;e.cl=(e.cl||0)+dt;if(Math.floor(e.cl/.28)!==Math.floor((e.cl-dt)/.28))tn(1300,1200,.03,.05,'square')}else if(d.d){e.base-=22*dt;e.cl=(e.cl||0)+dt}if(e.base>=RR.A[2]){e.base=RR.A[2];e.lev='roof';e.x=RR.A[0]+10;e.z=6;e.st='idle';msgL=['Katolla!','Potki viholliset reunan yli.']}if(e.base<=0){e.base=0;e.st='idle'}return}
 if(RR&&e.lev!=='roof'&&!e.atk&&e.y===0&&['idle','walk'].includes(e.st)&&(RR.lift?Math.abs(e.x-(RR.A[0]-12))<22:Math.abs(e.x-RR.lad)<12&&e.z<=8)&&d.u){if(RR.lift){liftStart();return}e.st='climb';e.x=RR.lad;e.z=1;e.cl=0;msgL=['Esa kiipeää tikkaita...'];return}
 if(M.stg>0){M.stg-=dt;e.vx=M.sgd*(30+Math.sin(M.stg*18)*14);e.vz=Math.sin(M.stg*11)*10;e.st='walk';e.wk+=dt*.6;return}
 if(B.h>=80&&e.lev!=='roof'&&!e.atk&&e.y===0&&['idle','walk'].includes(e.st)&&Math.random()<dt*(.12+(B.h-80)*.01)){M.stg=.7;M.sgd=Math.random()<.5?-1:1;msgL=pick([['Esa horjahtaa!'],['Hups... katu kallistuu.'],['Esa: Kuka kallisti tän kadun?']]);nz(.25,'lowpass',400,.15,200);return}
 const can=!e.atk&&e.y===0&&['idle','walk'].includes(e.st);
 if(can){const vx=(d.r?1:0)-(d.l?1:0),vz=(d.d?1:0)-(d.u?1:0);e.vx=vx*56;e.vz=vz*32;if(vx)e.face=vx;e.st=vx||vz?'walk':'idle';if(vx||vz)e.wk+=dt;
  if(B.h>=55&&!vx&&!vz){e.sw-=dt;if(e.sw<=0){e.sw=1.4+Math.random()*2;e.vx=(Math.random()-.5)*(B.h-40)*1.4}}}
 while(M.q.length&&M.q[0][0]<=M.ck){const [t0,a,kz,pt]=M.q[0],cx=a!=='J'&&e.y===0&&hitCancel(e,pt),rl=a!=='J'&&rateLim(e,M.ck);if(rl||!(a==='J'?can:(can||(e.st==='jump'&&!e.atk)||cx))){if(M.ck-t0>IBUF){M.q.shift();continue}break}M.q.shift();if(cx){e.atk=null;e.st='idle'}if(a!=='J')e.la=M.ck;
  if(a==='J'){const kd=kz||d;e.vy=165;e.y=.01;e.st='jump';e.vx=((kd.r?1:0)-(kd.l?1:0))*62;e.vz=0;tn(300,600,.1,.05);continue}
  if(a==='H'){if(B.hs<=0||e.y>0)continue;B.hs--;mStart(e,'spin');msgL=['HAUKI-PYÖRRE!','Hauki-shotteja jäljellä: '+B.hs];sShot();continue}
  if(e.y>0){mStart(e,a==='P'?'jpunch':'fkick');continue}
  const foes=M.ents.filter(x=>x.team==='e'&&!x.dead&&Math.abs(x.z-e.z)<7),front=foes.filter(x=>Math.sign(x.x-e.x)===e.face&&Math.abs(x.x-e.x)<32),back=foes.filter(x=>Math.sign(x.x-e.x)!==e.face&&Math.abs(x.x-e.x)<28);
  if(a==='K'){if(!front.length&&back.length){e.face*=-1;mStart(e,'bkick')}else mStart(e,'kick');if(Math.random()<.3)kiai(e);continue}
  const daze=front.find(x=>x.st==='hit'&&Math.abs(x.x-e.x)<20);
  if(daze&&e.cmb>=2&&e.ct<.6){e.cmb=0;e.ct=9;mStart(e,'upper');e.atk.hits.add(daze);daze.x=e.x+e.face*4;daze.hp=Math.max(0,daze.hp-12);daze.ko=daze.hp<=0?1:0;launch(daze,-e.face,18);daze.vx=-e.face*150;if(daze.hp<=0){daze.dead=1;M.kills++}sImpact('k',true);crowd('ooh');msgL=['HEITTO!'];kiai(e);continue}
  e.cmb=e.ct<.55&&e.cmb<3?e.cmb+1:1;e.ct=0;mStart(e,e.cmb===3?'upper':'punch');if(e.cmb===3&&Math.random()<.5)kiai(e)}}
function mjAlly(f,dt){if(f.inLift){f.vx=f.vz=0;return}if(f.tired>0||f.atk||f.y>0||!['idle','walk'].includes(f.st))return;
 let t=null,best=1e9;M.ents.forEach(x=>{if(x.team!=='e'||x.dead||x.st==='ko')return;const dd=Math.abs(x.x-f.x)+Math.abs(x.z-f.z)*2;if(dd<best){best=dd;t=x}});f.tgt=t;
 if(!t||best>220){const tx=M.e.x+(f.kind==='a'?-28:-48),tz=Math.max(0,Math.min(40,M.e.z+(f.kind==='a'?9:-9))),dx=tx-f.x,dz=tz-f.z;if(Math.abs(dx)>6||Math.abs(dz)>4){f.vx=Math.abs(dx)>6?Math.sign(dx)*Math.min(70,Math.abs(dx)*2):0;f.vz=Math.abs(dz)>4?Math.sign(dz)*28:0;f.st='walk';f.wk+=dt;if(Math.abs(dx)>6)f.face=Math.sign(dx)}else{f.vx=f.vz=0;f.st='idle';f.face=M.e.face}return}
 const dx=t.x-f.x,dz=t.z-f.z,want=f.kind==='a'?21:18;
 if(Math.abs(dz)>4||Math.abs(dx)>want+4||Math.abs(dx)<want-10){f.vx=Math.abs(dx)>want+4?Math.sign(dx)*58:Math.abs(dx)<want-10?-Math.sign(dx)*35:0;f.vz=Math.abs(dz)>3?Math.sign(dz)*30:0;f.st='walk';f.wk+=dt;f.face=Math.sign(dx)||1;return}
 f.vx=f.vz=0;f.st='idle';f.face=Math.sign(dx)||1;f.th-=dt;if(f.th>0)return;f.th=f.kind==='a'?.6:.85;
 if(f.kind==='k'&&f.cd<=0){f.cd=11;mStart(f,'solo');return}
 mStart(f,f.kind==='a'?pick(['kick','hikick','kick']):pick(['punch','punch','kick']))}
function mjEnemy(f,dt){if(f.dead||f.atk||f.y>0||!['idle','walk'].includes(f.st))return;
 f.tc=(f.tc||0)-dt;if(!f.tgt||f.tgt.st==='ko'||f.tgt.tired>0||f.tc<=0){f.tc=2+Math.random()*2;const c=[M.e,M.e,...M.al.filter(a=>a.tired<=0)];f.tgt=pick(c)}
 const t=f.tgt,dx=t.x-f.x,dz=t.z-f.z;
 if(f.kind==='ms'){if(!f.sum&&f.hp<f.mhp/2){f.sum=1;M.say=[f,'Mersumies: Pojat, apuun!'];M.sayT=2.4;mjSpawn('rn');mjSpawn('tp')}if(f.cd<=0&&Math.abs(dx)>34){f.cd=f.hp<f.mhp/2?2.2:3.4;f.face=Math.sign(dx)||f.face;mStart(f,'star');msgL=['Mersumies heittää Mersun tähtiä!','Hyppää tai väistä sivuun!'];return}}
 if(f.kind==='tt'&&f.cd<=0&&Math.abs(dz)<7&&Math.abs(dx)>40&&Math.abs(dx)<230){f.cd=5.5;f.face=Math.sign(dx);mStart(f,'dash');msgL=['TRUKKIRYNNÄKKÖ!','Väistä sivuun tai hyppää!'];tn(110,320,.6,.14,'sawtooth');nz(.6,'lowpass',400,.2,150);return}
 if(f.kind==='pe'&&f.cd<=0&&Math.abs(dx)<70&&Math.abs(dz)<12){f.cd=9;mStart(f,'smoke');return}
 if(f.kind==='ta'&&f.cd<=0&&Math.abs(dz)<5&&Math.abs(dx)>45&&Math.abs(dx)<200){f.cd=6;f.face=Math.sign(dx);mStart(f,'dash');msgL=['TURBORYNTÄYS!','Hyppää yli tai väistä!'];tn(200,900,.4,.1,'sawtooth');return}
 if((f.kind==='tp'||f.kind==='ta')&&Math.abs(dz)<6&&Math.abs(dx)<75&&Math.abs(dx)>28&&Math.random()<dt*1.4){f.vy=150;f.y=.01;f.vx=Math.sign(dx)*62;f.vz=0;f.st='jump';f.jk=.22;f.face=Math.sign(dx);return}
 if(f.kind==='pasi'&&f.cd<=0&&Math.abs(dz)<5&&Math.abs(dx)>50&&Math.abs(dx)<170){f.cd=4+Math.random()*2;f.face=Math.sign(dx);mStart(f,'throw');msgL=['Pakoputki-Pasi heittää putken!','Hyppää tai väistä sivuun!'];return}
 const want=f.slot||22;
 if(Math.abs(dz)>4||Math.abs(dx)>want+3){f.vx=Math.abs(dx)>want+3?Math.sign(dx)*f.spd*(DIFF?1.15:1):0;f.vz=Math.abs(dz)>3?Math.sign(dz)*f.spd*.6:0;f.st='walk';f.wk+=dt;f.face=Math.sign(dx)||f.face;return}
 f.vx=f.vz=0;f.st='idle';f.face=Math.sign(dx)||f.face;f.th-=dt;if(f.th>0)return;f.th=(.8+Math.random()*1)*(DIFF?.75:1);mStart(f,pick(['punch','kick','punch']))}
function mjSpawn(k,rf){const t=KT[k],fromR=k==='ms'?true:Math.random()<.6,x=k==='ms'?M.cam+240:M.cam+(fromR?345:-25),f=mjE(SP[t.sp],x,k==='ms'?20:4+Math.random()*34,'e',k,t.hp*(DIFF?1.3:1));if(rf){const R2=M.L.roof,sA=M.e.x<R2.B[0];f.lev='roof';f.x=sA?R2.A[1]-8-Math.random()*40:R2.B[1]-8-Math.random()*50;f.base=sA?R2.A[2]:R2.B[2];f.face=-1}f.face=fromR?-1:1;f.slot=(t.sc?21:15)+Math.random()*6;if(k==='ms'){f.cd=2.5;M.boss=f}if(k==='tt'){f.cd=2;M.boss=f}M.ents.push(f);if(MSAY[k]){M.say=[f,MSAY[k][0]];M.sayT=2.6;sTalk(1)}}
/* Pystykamera: kenttä voi antaa camY={off,max}; kamera nousee pehmeästi Esan korkeuden (katot, hissi) mukaan */
function mjCamY(dt){const c=M.L.camY,ty=c?Math.max(0,Math.min(c.max,(M.e.base||0)-c.off)):0;M.camY=(M.camY||0)+(ty-(M.camY||0))*Math.min(1,dt*4)}
function stepMJ(dt){M.t+=dt;mjCamY(dt);musicTick();M.sayT-=dt;M.fx.forEach(x=>x.t+=dt);M.fx=M.fx.filter(x=>x.t<.45);
 const bj=document.getElementById('bh');bj.style.visibility=B.hs>0?'visible':'hidden';bj.textContent='HAUKI ×'+B.hs+hk('hauki');
 if(M.stop>0){M.stop-=dt;return}
 const e=M.e;
 if(M.ph==='intro'){while(M.ii<MJI.length&&M.t>=MJI[M.ii][0]){mjSay(MJI[M.ii][1],MJI[M.ii][2]);msgL=[MJI[M.ii][2]];M.ii++}if(M.t>=12){M.ph='play';M.ii=0;msgL=['Kenttä 1: pääkatu','Etsi moottori! GO →'];M.go=2}}
 if(M.ph==='title'&&M.t>=3){M.ph='play';msgL=[M.L.msg[0],'GO →'];M.go=2;if(M.L.say)mjSay(M.L.say[0],M.L.say[1])}
 if(M.ph==='bintro'){while(M.ii<MJB.length&&M.t>=MJB[M.ii][0]){mjSay(MJB[M.ii][1],MJB[M.ii][2]);msgL=[MJB[M.ii][2]];M.ii++}if(M.t>=12){M.ph='play';M.ii=0;msgL=['Päihitä Mersumies!','Varo Mersun tähtiä!'];bell(1)}}
 M.smoke=Math.max(0,M.smoke-dt);
 if(M.ph==='rescue'){M.kt+=dt;const h=M.hk;if(M.kt>.8&&h.tied){h.tied=0;tn(660,990,.2,.08);nz(.3,'bandpass',900,.1,400)}if(!h.tied){const dx=e.x+22-h.x;if(Math.abs(dx)>3){h.x+=Math.sign(dx)*Math.min(Math.abs(dx),70*dt);h.wk=(h.wk||0)+dt;h.face=Math.sign(dx)}else h.wk=0;h.z+=(e.z+4-h.z)*Math.min(1,dt*2)}
  while(M.ii<MJR.length&&M.kt>=MJR[M.ii][0]){const [,k,l]=MJR[M.ii];mjSay(k,l);msgL=[l];M.ii++}
  M.ents.forEach(f=>{if(f.team!=='e'&&!f.atk&&['idle','walk'].includes(f.st)){f.vx=f.vz=0;f.st='idle'}mjUpd(f,dt)});M.ents=M.ents.filter(f=>!f.gone);
  if(M.kt>=9.5){M.ph='done';M.t=0;[523,659,784,1047].forEach((f,i)=>tn(f,f,.4,.07,'triangle',i*.13));msgL=['Moottorijahti suoritettu!']}}
 if(M.ph==='play'||M.ph==='lose'){if(M.ph==='play'){M.ck+=dt;mjCtrl(dt);if(M.L.onStep)M.L.onStep(dt)}M.al.forEach(a=>mjAlly(a,dt));M.ents.forEach(f=>{if(f.team==='e')mjEnemy(f,dt)});
  M.ents.forEach(f=>mjUpd(f,dt));if(M.L.roof){M.ents.forEach(f=>mjRoof(f,dt));mjAllySync()}
  const en=M.ents.filter(f=>f.team==='e'&&!f.dead);for(let i=0;i<en.length;i++)for(let j=i+1;j<en.length;j++){const a=en[i],b=en[j];if(Math.abs(a.x-b.x)<10&&Math.abs(a.z-b.z)<5){const s=a.z<b.z?-1:1;a.z=Math.max(0,a.z+s*12*dt);b.z=Math.min(40,b.z-s*12*dt)}}
  M.ents=M.ents.filter(f=>!f.gone);
  const L0=M.cam+16,H0=M.cam+304,edge=(f,lo,hi)=>{if(f.x<lo){f.x=lo;if(f.vx<0)f.vx=f.st==='fly'?-f.vx*.45:0}else if(f.x>hi){f.x=hi;if(f.vx>0)f.vx=f.st==='fly'?-f.vx*.45:0}};edge(e,L0,M.lock?H0:M.L.len-12);M.al.forEach(f=>edge(f,L0,Math.min(H0,M.L.len-12)));M.ents.forEach(f=>{if(f.team!=='e')return;if(!f.inS&&f.x>=L0&&f.x<=H0)f.inS=1;if(f.inS&&!f.fallR)edge(f,L0,H0);else f.x=Math.max(M.cam-40,Math.min(M.cam+360,f.x))});
  M.proj.forEach(p=>{p.x+=p.vx*dt;p.z=Math.max(0,Math.min(40,p.z+(p.vz||0)*dt));p.r+=dt*16;if(p.done)return;[e,...M.al].forEach(d=>{if(p.done||['down','ko','fly','roll','kip'].includes(d.st)||d.tired>0)return;if(Math.abs(p.x-d.x)<8&&Math.abs(p.z-d.z)<6&&d.y<10&&d.st!=='climb'&&Math.abs((p.base||0)-(d.base||0))<12){p.done=1;mjDamage({team:'e',x:p.x-Math.sign(p.vx),face:Math.sign(p.vx)},d,{d:p.star?11:8,n:'punch',h:'mid'});if(p.star)tn(2400,1800,.08,.1,'square')}})});M.proj=M.proj.filter(p=>!p.done&&p.x>M.cam-30&&p.x<M.cam+350);
  M.items.forEach(it=>{it.t+=dt;if(Math.abs(it.x-e.x)<10&&Math.abs(it.z-e.z)<7&&e.y<5&&!it.got&&Math.abs((it.base||0)-(e.base||0))<6){it.got=1;if(it.type==='c'){e.hp=Math.min(100,e.hp+20);B.h+=10;sCan();msgL=['Kuparitölkki! +20 energiaa','...ja vähän lisää humalaa.']}else if(it.type==='v'){const h0=B.h;B.h=Math.max(0,B.h-25);e.hp=Math.min(100,e.hp+5);nz(.6,'lowpass',900,.12,300);[0,.12,.24].forEach(d=>tn(320,220,.1,.08,'sine',d));msgL=h0>B.h+1?['Vesipullo! Glug glug...','Humala laskee, pää selkenee.']:['Vesipullo! Raikasta.','Esa on jo valmiiksi selvä.']}else{const wn=WN[it.type];e.wt=it.type;e.wpn=wn[2];tn(1500,1800,.08,.12,'square');tn(2200,2100,.1,.08,'square',.05);msgL=[wn[0]+'! Iskut +'+wn[3]+(wn[4]?', pidempi ulottuvuus':''),'Kestää '+wn[2]+' iskua.']}}});M.items=M.items.filter(i=>!i.got&&i.t<14);
  M.objs.forEach(o=>{if(o.br)o.bt+=dt});
  if(M.ph==='play'){B.h=Math.max(0,B.h-.7*dt);if(B.h>=80&&!M.w80){M.w80=1;msgL=['Liikaa kuparia! Esa horjuu','ja lyönnit menevät ohi. Vesipullo auttaa.']}else if(B.h<70)M.w80=0;if(B.h<20&&!M.w20){M.w20=1;msgL=['Esa on selvinnyt: lyönnit heikkenevät.','Kuparitölkki palauttaa voimat!']}else if(B.h>=25)M.w20=0;const wv=!M.L.boss?M.L.waves[M.wi]:null;
   if(wv&&!M.lock&&e.x>=wv.x&&(!wv.roof||e.lev==='roof')){M.lock=1;M.camT=wv.x-160;M.sq=wv.list.map((k,i)=>[i*.7,k]);M.sqR=wv.roof;M.sqT=0;msgL=['Diesel-jengi hyökkää!'];bell(1)}
   if(M.lock){M.sqT+=dt;while(M.sq.length&&M.sq[0][0]<=M.sqT)mjSpawn(M.sq.shift()[1],M.sqR);if(!M.sq.length&&!M.ents.some(f=>f.team==='e'&&!f.dead)){M.lock=0;M.wi++;M.go=2.5;msgL=M.wi<M.L.waves.length?['Alue tyhjä! GO →']:['Katu on tyhjä. Jatka eteenpäin!'];tn(660,990,.15,.08);tn(990,1320,.2,.08,'sine',.15)}}
   if((M.lvl>1||M.L.fin)&&!M.L.boss&&!M.lock&&M.wi>=M.L.waves.length&&e.x>=M.L.len-90){M.ph='done';M.t=0;tn(523,523,.3,.07,'triangle');tn(659,659,.3,.07,'triangle',.12);tn(784,784,.5,.07,'triangle',.24);msgL=['Kenttä '+M.lvl+' suoritettu!']}
   if(M.L.kid&&!M.lock&&M.wi>=M.L.waves.length&&e.x>=M.L.len-90){M.ph='kid';M.kt=0;M.ii=0;M.van={x:M.cam+380,z:40,ph:0};msgL=['Mikä tuo ääni on?'];tn(90,140,1.5,.12,'sawtooth')}
   M.nx-=dt;if(M.nx<=0&&M.sayT<=0){M.nx=6+Math.random()*4;const k=pick(['p','a','k']);mjSay(k,pick(MSAY[k]))}}
  const tc=M.lock?M.camT:Math.max(0,Math.min(M.L.len-320,e.x-140));M.cam+=(tc-M.cam)*Math.min(1,dt*4);PHB=[M.cam+16,M.cam+304];M.go=Math.max(0,M.go-dt)}
 if(M.ph!=='intro'&&M.ph!=='kid'&&!M.w.gone){const w=M.w,tx=e.x-58,dx=tx-w.x;if(Math.abs(dx)>4&&!M.lock){w.x+=Math.sign(dx)*Math.min(Math.abs(dx),60*dt);w.wk+=dt;w.face=Math.sign(dx)}else w.wk=0}
 if(M.ph==='kid'){M.kt+=dt;const v=M.van,w=M.w;
  if(M.kt<1.6)v.x+=(w.x+22-v.x)*Math.min(1,dt*3);else if(M.kt>2.6)v.x+=(M.kt-2.6)*260*dt;
  if(M.kt>1.6&&!w.gone){w.gone=1;nz(.4,'bandpass',800,.3,300);tn(200,120,.3,.2,'sawtooth');vib(120)}
  if(M.kt>2.6&&!v.go){v.go=1;nz(1.5,'lowpass',400,.3,900);tn(70,180,1.6,.12,'sawtooth')}
  while(M.ii<MJK.length&&M.kt>=MJK[M.ii][0]){const [,k,l]=MJK[M.ii];M.say=[k==='w'?'v':k,l];M.sayT=2.4;sTalk(k==='w'?0:1);msgL=[l];M.ii++}
  M.al.forEach(a=>{a.st='idle';a.vx=a.vz=0;mjUpd(a,dt)});e.st='idle';e.vx=e.vz=0;mjUpd(e,dt);
  if(M.kt>=11.5){M.ph='done';M.t=0;tn(523,523,.3,.07,'triangle');tn(659,659,.3,.07,'triangle',.12);tn(784,784,.5,.07,'triangle',.24);msgL=['Kenttä 1 suoritettu!']}}
 if(M.ph==='done'||M.ph==='lose'){}}
function mjVan(x,y,T){g.save();g.translate(x,y);g.scale(1.7,1.7);let q=g.createLinearGradient(0,-36,0,0);q.addColorStop(0,'#5a5e68');q.addColorStop(1,'#2a2c34');g.fillStyle=q;g.beginPath();g.moveTo(0,-4);g.lineTo(0,-30);g.quadraticCurveTo(0,-34,4,-34);g.lineTo(52,-34);g.lineTo(62,-20);g.lineTo(70,-18);g.lineTo(70,-4);g.closePath();g.fill();g.strokeStyle='#111';g.lineWidth=.7;g.stroke();
 g.fillStyle='#9ab8d8';g.beginPath();g.moveTo(52,-31);g.lineTo(60,-21);g.lineTo(52,-21);g.closePath();g.fill();R('#1a1a20',36,-31,12,10);R('#c8a020',4,-18,46,2.4);g.save();g.font='bold 6px monospace';g.fillStyle='#e8e0d0';g.fillText('DIESEL-JENGI',6,-24);g.restore();
 [12,56].forEach(wx=>{ell(wx,-3,6,6,'#141418','#000');ell(wx,-3,2.4,2.4,'#8a8a94')});ell(69,-12,1.6,1.2,'#fff4b0');
 for(let i=0;i<4;i++){const u=(T*1.5+i*.25)%1;ell(-4-u*20,-6-u*6,2+u*5,2+u*4,`rgba(40,40,44,${.5*(1-u)})`)}g.restore()}
function gasBg(T){const c=M.cam;let q=g.createLinearGradient(0,10,0,110);q.addColorStop(0,'#06081e');q.addColorStop(1,'#2a2050');g.fillStyle=q;g.fillRect(0,10,W,100);
 for(let i=0;i<36;i++){const x=((hsh(i)*W*2-c*.05)%W+W)%W;g.fillStyle=`rgba(255,250,230,${.3+.6*Math.abs(Math.sin(T+i))})`;g.fillRect(x,12+hsh(i+3)*40,.8,.8)}
 for(let i=Math.floor(c*.25/40)-1;i<Math.floor(c*.25/40)+10;i++){const bx=i*40-c*.25,h=18+hsh(i+7)*30;g.fillStyle='#10122a';g.fillRect(bx,104-h,38,h);g.fillStyle='rgba(255,220,140,.45)';for(let y=104-h+4;y<100;y+=6)if(hsh(i*9+y)>.6)g.fillRect(bx+4+hsh(i+y)*28,y,2,2.4)}
 for(let i=Math.floor(c*.5/260)-1;i<Math.floor(c*.5/260)+3;i++){const x=i*260+180-c*.5;R('#2a2a34',x-1.5,36,3,68);mkBox(x-20,34,40,30,'#14141c','#24242e',2);g.save();g.font='bold 6px monospace';g.textAlign='center';g.fillStyle='#e8e8f0';g.fillText('DIESEL',x,43);g.fillText('95E10',x,56);g.shadowBlur=6;g.shadowColor='#ff8a20';g.fillStyle='#ffb040';g.font='bold 8px monospace';g.fillText('1,99',x,50);g.fillText('2,09',x,63);g.restore()}
 for(let i=Math.floor(c*.8/420)-1;i<Math.floor(c*.8/420)+2;i++){const bx=i*420+40-c*.8;
  mkBox(bx+200,56,120,48,'#3a3e4a','#2a2e38');R('#ffe8a8',bx+210,66,60,24);R('rgba(60,40,10,.3)',bx+210,78,60,1);[[bx+214,72,'#c8202a'],[bx+228,74,'#2a6ad0'],[bx+242,71,'#e8c040'],[bx+256,73,'#2f8f55']].forEach(([x,y,cc])=>R(cc,x,y,7,10));R('#1a1a20',bx+280,70,24,34);R('#8ac0e0',bx+284,74,16,26);
  g.save();g.font='bold 9px monospace';g.textAlign='center';g.shadowBlur=7;g.shadowColor='#ff3a3a';g.fillStyle='#ffd0d0';g.fillText('KIOSKI 24h',bx+260,63);g.restore();
  R('#c8c8d0',bx+10,40,170,6);R('#c8202a',bx+10,46,170,4);R('#e8e8f0',bx+10,50,170,2);R('#8a8a94',bx+10,52,170,1);
  [bx+30,bx+160].forEach(x=>{mkBox(x-3,52,6,52,'#c8c8d0','#8a8a94')});
  for(let k=0;k<6;k++){g.save();g.globalCompositeOperation='lighter';const lq=g.createLinearGradient(0,53,0,110);lq.addColorStop(0,'rgba(240,250,255,.22)');lq.addColorStop(1,'rgba(240,250,255,0)');g.fillStyle=lq;g.beginPath();g.moveTo(bx+22+k*28,53);g.lineTo(bx+32+k*28,53);g.lineTo(bx+40+k*28,110);g.lineTo(bx+14+k*28,110);g.fill();g.restore();R('#f4faff',bx+22+k*28,52,10,1)}
  [bx+64,bx+122].forEach((x,j)=>{mkBox(x,70,18,34,'#e8e8f0','#a8acb8',2);R(j?'#2a6ad0':'#1a1a1a',x,70,18,7);g.save();g.font='bold 5px monospace';g.textAlign='center';g.fillStyle='#fff';g.fillText(j?'95E10':'DIESEL',x+9,75.5);g.restore();R('#1a2a1a',x+3,80,12,6);g.save();g.fillStyle='#5fe08a';g.font='bold 4px monospace';g.fillText('1,99',x+4,85);g.restore();R('#2a2a30',x+16,84,4,14);g.strokeStyle='#1a1a1a';g.lineWidth=1;g.beginPath();g.moveTo(x+18,86);g.quadraticCurveTo(x+26,92,x+22,100);g.stroke()});
  R('#5a5a64',bx+92,96,16,8);R('#3a3a42',bx+92,96,16,1)}
 g.fillStyle='#3a3a44';g.fillRect(0,104,W,8);g.fillStyle='#5a5a66';g.fillRect(0,104,W,1);q=g.createLinearGradient(0,112,0,160);q.addColorStop(0,'#34343e');q.addColorStop(1,'#202028');g.fillStyle=q;g.fillRect(0,112,W,48);
 g.fillStyle='rgba(240,240,200,.4)';for(let i=Math.floor(c/60)-1;i<Math.floor(c/60)+7;i++)g.fillRect(i*60-c,120,1.4,30);
 for(let i=Math.floor(c/140)-1;i<Math.floor(c/140)+4;i++){const x=i*140+70-c+hsh(i)*30;ell(x,130+hsh(i+1)*20,12,3,'rgba(20,10,30,.5)');ell(x-3,129+hsh(i+1)*20,5,1.2,'rgba(140,100,200,.25)')}}
function carSil(x,y,w,col){g.fillStyle=col;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-w*.22);g.lineTo(x+w*.2,y-w*.26);g.lineTo(x+w*.32,y-w*.44);g.lineTo(x+w*.7,y-w*.44);g.lineTo(x+w*.82,y-w*.26);g.lineTo(x+w,y-w*.22);g.lineTo(x+w,y);g.closePath();g.fill()}
function scrapBg(T){const c=M.cam;let q=g.createLinearGradient(0,10,0,110);q.addColorStop(0,'#140a24');q.addColorStop(.6,'#3a1a30');q.addColorStop(1,'#6a3020');g.fillStyle=q;g.fillRect(0,10,W,100);
 ell(70-c*.03,40,10,10,'#e8d0a0');
 for(let i=Math.floor(c*.2/90)-1;i<Math.floor(c*.2/90)+6;i++){const bx=i*90-c*.2,h=24+hsh(i)*20;g.fillStyle='#1e1020';g.beginPath();g.moveTo(bx-10,104);g.quadraticCurveTo(bx+45,104-h*2,bx+100,104);g.fill();for(let k=0;k<4;k++)carSil(bx+5+k*20,104-h*.6+hsh(i*5+k)*14,22,'#2a1828')}
 for(let i=Math.floor(c*.45/300)-1;i<Math.floor(c*.45/300)+3;i++){const x=i*300+120-c*.45,sw=Math.sin(T*.5+i)*.3;R('#c89020',x-3,30,6,74);for(let y=34;y<100;y+=8){g.strokeStyle='#8a6010';g.lineWidth=.8;g.beginPath();g.moveTo(x-3,y);g.lineTo(x+3,y+8);g.stroke()}mkBox(x-8,22,30,9,'#e0a020','#a87010');R('#2a2a30',x-4,22,8,6);
  const ex=x+60*Math.cos(sw),ey=24+10*Math.sin(sw);g.strokeStyle='#c89020';g.lineWidth=2.5;g.beginPath();g.moveTo(x+18,26);g.lineTo(ex,ey);g.stroke();g.strokeStyle='#222';g.lineWidth=.5;g.beginPath();g.moveTo(ex,ey);g.lineTo(ex,ey+28);g.stroke();ell(ex,ey+30,6,2.4,'#3a3a44','#111');carSil(ex-12,ey+46,24,'#5a3a2a');R('#ff3030',x+14,22,1.6,1.6)}
 g.fillStyle='#4a4a52';g.fillRect(0,84,W,20);g.fillStyle='rgba(0,0,0,.25)';for(let x=-((c*.8)%6);x<W;x+=6)g.fillRect(x,84,1.4,20);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(0,84,W,1);
 for(let i=Math.floor(c*.8/180)-1;i<Math.floor(c*.8/180)+3;i++){const x=i*180+60-c*.8;R('#e8c040',x,88,30,10);g.save();g.font='bold 6px monospace';g.textAlign='center';g.fillStyle='#1a1a1a';g.fillText(Math.abs(i)%2?'ROMU':'VAARA',x+15,95);g.restore()}
 for(let i=Math.floor(c*.9/160)-1;i<Math.floor(c*.9/160)+4;i++){const x=i*160-c*.9;[0,1,2].forEach(k=>{const cc=['#6a2a2a','#2a4a6a','#4a5a2a','#5a4a3a'][((i+k)%4+4)%4];mkBox(x+k*2,104-12*(k+1),26,11,cc,shd(cc,.6));R('rgba(0,0,0,.3)',x+k*2,104-12*(k+1)+5,26,1);R('#9ab0c8',x+4+k*2,104-12*(k+1)+2,6,3)})}
 for(let i=Math.floor(c/230)-1;i<Math.floor(c/230)+3;i++){const x=i*230+190-c;mkBox(x,92,12,14,'#4a3a2a','#2a2018',1);R('#2a2018',x,96,12,1);R('#2a2018',x,101,12,1);for(let k=0;k<3;k++){const hh=4+4*Math.sin(T*9+k*2+i);g.fillStyle=k%2?'#ffb02a':'#ff5a1a';g.beginPath();g.moveTo(x+2+k*4,92);g.quadraticCurveTo(x+4+k*4,92-hh,x+5+k*4,92-hh*.3);g.lineTo(x+6+k*4,92);g.fill()}g.save();g.globalCompositeOperation='lighter';const lq=g.createRadialGradient(x+6,90,1,x+6,90,40);lq.addColorStop(0,'rgba(255,140,40,.35)');lq.addColorStop(1,'rgba(255,140,40,0)');g.fillStyle=lq;g.fillRect(x-34,50,80,80);g.restore()}
 q=g.createLinearGradient(0,104,0,160);q.addColorStop(0,'#4a3a2e');q.addColorStop(1,'#2a2018');g.fillStyle=q;g.fillRect(0,104,W,56);g.fillStyle='rgba(0,0,0,.2)';for(let i=0;i<40;i++){const x=((hsh(i)*W*3-c)%W+W)%W;g.fillRect(x,108+hsh(i+2)*48,2+hsh(i+4)*4,1)}
 for(let i=Math.floor(c/120)-1;i<Math.floor(c/120)+5;i++){const x=i*120+40-c+hsh(i)*40;ell(x,126+hsh(i+3)*28,14,3.5,'rgba(10,8,14,.55)');ell(x-4,125+hsh(i+3)*28,6,1.4,'rgba(120,80,200,.25)');if(hsh(i+9)>.5){R('#6a6a74',x+20,118+hsh(i)*30,6,2);ell(x+30,122+hsh(i+1)*30,3,3,'#1a1a1a','#000')}}}
function mjStar(x,y,r,rot){g.save();g.translate(x,y);g.rotate(rot);g.strokeStyle='#eef2fa';g.lineWidth=1.1;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.fillStyle='#dfe4ee';for(let i=0;i<3;i++){const a=i*2.094-1.571;g.beginPath();g.moveTo(Math.cos(a)*r,Math.sin(a)*r);g.lineTo(Math.cos(a+1.3)*r*.24,Math.sin(a+1.3)*r*.24);g.lineTo(Math.cos(a-1.3)*r*.24,Math.sin(a-1.3)*r*.24);g.fill()}g.restore()}
function indBg(T){const c=M.cam;let q=g.createLinearGradient(0,10,0,110);q.addColorStop(0,'#16102c');q.addColorStop(.55,'#43203a');q.addColorStop(1,'#8a4226');g.fillStyle=q;g.fillRect(0,10,W,100);
 for(let i=0;i<30;i++){const x=((hsh(i)*W*2-c*.05)%W+W)%W;g.fillStyle='rgba(255,230,210,.25)';g.fillRect(x,12+hsh(i+5)*30,.8,.8)}
 for(let i=Math.floor(c*.25/60)-1;i<Math.floor(c*.25/60)+8;i++){const bx=i*60-c*.25,h=24+hsh(i)*26,cx=bx+11+hsh(i+1)*30;g.fillStyle='#1a1220';g.fillRect(bx,104-h,52,h);g.fillRect(cx-3,104-h-28,6,28);for(let k=0;k<4;k++){const u=(T*.12+k/4+hsh(i))%1;ell(cx+u*14,104-h-30-u*30,3+u*8,2+u*6,`rgba(90,80,100,${.35*(1-u)})`)}if(hsh(i+7)>.5&&Math.sin(T*3+i)>0){g.fillStyle='#ff4030';g.fillRect(cx-1,104-h-29,2,1.5)}}
 const SG=['VARASTO','HUOLTO','ROMU','KORJAAMO'];
 for(let i=Math.floor(c*.6/110)-1;i<Math.floor(c*.6/110)+5;i++){if(i<0)continue;const bx=i*110-c*.6,h=46+hsh(i+3)*16,top=104-h;
  if(i%4===2){g.fillStyle='#1e1e24';g.fillRect(bx+40,top+18,60,104-top-18);g.fillStyle='#ffd890';g.fillRect(bx+48,top+30,24,12);g.fillStyle='#2a2a30';g.fillRect(bx,58,108,7);g.fillStyle='#e07a20';g.fillRect(bx,65,108,3);g.fillStyle='#3a3a42';g.fillRect(bx+8,68,3,36);g.fillRect(bx+97,68,3,36);[bx+24,bx+64].forEach(x=>{g.fillStyle='#c8c8d0';g.fillRect(x,86,9,18);g.fillStyle='#e07a20';g.fillRect(x,86,9,4);g.fillStyle='#1a1a1a';g.fillRect(x+2,92,5,4)});
   g.save();g.font='bold 7px monospace';g.textAlign='center';g.shadowBlur=6;g.shadowColor='#ff9a3a';g.fillStyle='#ffd8a0';g.fillText('DIESEL',bx+54,64);g.restore();g.save();g.globalCompositeOperation='lighter';const lq=g.createLinearGradient(0,68,0,104);lq.addColorStop(0,'rgba(255,240,200,.25)');lq.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=lq;g.fillRect(bx,68,108,36);g.restore();continue}
  const wc=['#3a3440','#30383e','#3e3630'][i%3];g.fillStyle=wc;g.fillRect(bx,top,106,h);g.fillStyle='rgba(0,0,0,.22)';for(let x=bx;x<bx+106;x+=4)g.fillRect(x,top,1,h);g.fillStyle='rgba(255,255,255,.06)';g.fillRect(bx,top,106,2);
  g.fillStyle='#5a5a62';g.fillRect(bx+22,76,46,28);g.fillStyle='rgba(0,0,0,.3)';for(let y=78;y<104;y+=3)g.fillRect(bx+22,y,46,1);g.fillStyle='#1a1a20';g.fillRect(bx+78,84,12,20);
  g.fillStyle='#1a1a1e';g.fillRect(bx+24,top+6,58,10);g.save();g.font='bold 7px monospace';g.textAlign='center';g.fillStyle='#d8d0c0';g.fillText(SG[i%SG.length],bx+53,top+14);g.restore();g.save();g.globalCompositeOperation='lighter';const lq=g.createRadialGradient(bx+45,73,1,bx+45,73,18);lq.addColorStop(0,'rgba(255,170,70,.45)');lq.addColorStop(1,'rgba(255,170,70,0)');g.fillStyle=lq;g.fillRect(bx+27,60,36,36);g.restore()}
 g.strokeStyle='rgba(150,150,160,.35)';g.lineWidth=.4;const fo=-((c*.8)%8);for(let x=fo-8;x<W+8;x+=8){g.beginPath();g.moveTo(x,90);g.lineTo(x+14,104);g.moveTo(x+14,90);g.lineTo(x,104);g.stroke()}g.fillStyle='#4a4a52';for(let x=-((c*.8)%64);x<W;x+=64)g.fillRect(x,88,1.5,16);g.fillRect(0,89,W,.8);
 g.fillStyle='#45454c';g.fillRect(0,104,W,8);g.fillStyle='#62626a';g.fillRect(0,104,W,1);q=g.createLinearGradient(0,112,0,160);q.addColorStop(0,'#34343a');q.addColorStop(1,'#222228');g.fillStyle=q;g.fillRect(0,112,W,48);
 for(let i=Math.floor(c/90)-1;i<Math.floor(c/90)+5;i++){const x=i*90-c+hsh(i)*40;ell(x,124+hsh(i+2)*30,10+hsh(i+4)*10,3,'rgba(10,10,14,.5)')}g.fillStyle='rgba(230,200,60,.45)';for(let i=Math.floor(c/50)-1;i<Math.floor(c/50)+8;i++){g.fillRect(i*50-c,118,1.4,14)}
 for(let i=Math.floor(c/220)-1;i<Math.floor(c/220)+3;i++){const x=i*220+150-c;g.fillStyle='#2a2a34';g.fillRect(x-1,42,2.4,64);g.fillRect(x-1,42,10,2);g.save();g.globalCompositeOperation='lighter';q=g.createLinearGradient(0,46,0,140);q.addColorStop(0,'rgba(255,160,60,.32)');q.addColorStop(1,'rgba(255,160,60,0)');g.fillStyle=q;g.beginPath();g.moveTo(x+6,45);g.lineTo(x+12,45);g.lineTo(x+34,140);g.lineTo(x-16,140);g.fill();g.restore();ell(x+9,45,3,1.4,'#ffc070')}}
function garageBg(T){let q=g.createLinearGradient(0,10,0,104);q.addColorStop(0,'#1e1e24');q.addColorStop(1,'#2e2e36');g.fillStyle=q;g.fillRect(0,10,W,94);
 g.fillStyle='rgba(0,0,0,.25)';for(let y=14;y<104;y+=6){g.fillRect(0,y,W,.6);for(let x=(y/6%2)*8;x<W;x+=16)g.fillRect(x,y,.6,6)}
 const fl=Math.sin(T*37)>-.96?1:.3;[[60,18],[200,18]].forEach(([x,y])=>{R(fl>.5?'#f0f8ff':'#8a90a0',x,y,50,2.5);g.save();g.globalCompositeOperation='lighter';const lq=g.createLinearGradient(0,y,0,150);lq.addColorStop(0,`rgba(220,240,255,${.18*fl})`);lq.addColorStop(1,'rgba(220,240,255,0)');g.fillStyle=lq;g.beginPath();g.moveTo(x,y+2);g.lineTo(x+50,y+2);g.lineTo(x+80,150);g.lineTo(x-30,150);g.fill();g.restore()});
 g.fillStyle='#6a4a2a';g.fillRect(120,36,70,40);g.fillStyle='rgba(0,0,0,.35)';for(let x=124;x<190;x+=5)for(let y=40;y<76;y+=5)g.fillRect(x,y,.8,.8);g.save();g.translate(134,44);g.rotate(.2);wrench(0,0);g.restore();R('#8a8a94',150,42,3,20);R('#5a3a1a',146,42,11,5);R('#c8202a',166,46,3,14);R('#1a1a1a',165,44,5,3);R('#e8c040',176,40,8,8);
 g.save();g.translate(4,104);let c2=g.createLinearGradient(0,-36,0,0);c2.addColorStop(0,'#2a2a32');c2.addColorStop(1,'#0e0e12');g.fillStyle=c2;g.beginPath();g.moveTo(0,-6);g.lineTo(2,-16);g.lineTo(22,-18);g.lineTo(34,-32);g.lineTo(68,-32);g.lineTo(82,-18);g.lineTo(104,-15);g.lineTo(106,-6);g.closePath();g.fill();g.fillStyle='#4a5a70';g.beginPath();g.moveTo(37,-30);g.lineTo(52,-30);g.lineTo(52,-19);g.lineTo(28,-19);g.closePath();g.fill();g.beginPath();g.moveTo(55,-30);g.lineTo(67,-30);g.lineTo(78,-19);g.lineTo(55,-19);g.closePath();g.fill();R('#c8ccd8',2,-9,104,1.4);[22,84].forEach(x=>{ell(x,-4,7,7,'#0a0a0a','#000');ell(x,-4,3,3,'#b8bcc8')});mjStar(100,-20,3,0);ell(104,-11,1.6,1.2,'#fff4c0');g.restore();
 q=g.createLinearGradient(0,104,0,160);q.addColorStop(0,'#4a4a52');q.addColorStop(1,'#303036');g.fillStyle=q;g.fillRect(0,104,W,56);R('#62626a',0,104,W,1);ell(150,140,30,5,'rgba(10,10,14,.45)');ell(60,128,14,3,'rgba(10,10,14,.4)');R('#1e1e22',150,150,14,2);
 R('#5a3a1a',196,88,58,4);R('#3a2410',200,92,4,14);R('#3a2410',246,92,4,14);R('#7a7a84',206,74,38,14);R('#5a5a64',206,74,38,3);for(let i=0;i<4;i++){R('#9a9aa4',209+i*9,68,6,7);R('#5a5a64',209+i*9,68,6,1.5)}R('#c8202a',240,80,6,2);ell(225,88,22,2,'rgba(0,0,0,.3)')}
function rfH(x){const r=M.L.roof;if(x>=r.A[0]&&x<=r.A[1])return r.A[2];if(x>=r.B[0]&&x<=r.B[1])return r.B[2];if(x>r.B[1]&&x<r.S)return r.B[2]*(1-(x-r.B[1])/(r.S-r.B[1]));return null}
function rfSeg(f){const r=M.L.roof;if(f.lev!=='roof')return f.x<r.A[0]?0:3;return f.x<=(r.A[1]+r.B[0])/2?1:2}
const WN={w:['Hylsyavain','hajosi',6,6,9],p:['Putki','taipui käyttökelvottomaksi',5,9,13],k:['Ketju','katkesi',7,5,18]};
function mjRoof(f,dt){const r=M.L.roof;if(!r||f.gone)return;f.base=f.base||0;const e=M.e;
 if(f.lev==='roof'){
  if(f.st!=='fly'&&!f.fallR){if(f.x<r.A[0]+2)f.x=r.A[0]+2;if(f.team==='e'){const sg=rfSeg(f);if(sg===1)f.x=Math.min(f.x,r.A[1]-3);else f.x=Math.max(f.x,r.B[0]+3)}}
  const fl=rfH(f.x),air=f.y>0||f.vy>0;
  if(fl!==null){if(air&&f.vy<0&&f.base+f.y<=fl&&f.st!=='fly'){f.y=0;f.vy=0;f.base=fl;if(f.st==='jump'){f.st='idle';f.atk=null}nz(.06,'lowpass',500,.12)}else if(!air)f.base=fl;if(f.x>=r.S-1){f.lev='street';f.base=0}}
  else if(f.team==='a'){f.x=e.x-(f.kind==='a'?20:36);if(rfH(f.x)===null)f.x=e.x;f.base=rfH(f.x)||e.base;f.y=0;f.vy=0}
  else if(air&&f.st!=='fly'){}
  else{f.y+=f.base;f.base=0;f.lev='street';f.fallR=1;
   if(f.team==='e'){if(!f.dead){f.dead=1;f.ko=1;f.hp=0;M.kills++;msgL=pick([['Alas meni!','Diesel-jengiläinen putosi katolta.'],['Bye bye!','Suoraan kujalle.']])}voice(mjVo(f)*1.2,mjVo(f)*.5,.9,'a',.5);if(f.st!=='fly')launch(f,f.face||1,2)}
   else if(f.st!=='fly'){f.st='jump';f.atk=null}}}
 else if(!f.fallR&&!f.inLift&&f.st!=='climb'&&f.x>r.A[0]-2&&f.x<r.S){f.x=f.x<(r.A[0]+r.S)/2?r.A[0]-2:r.S}
 if(f.fallR&&f===e&&f.y===0&&f.vy===0){f.fallR=0;f.st='idle';f.vx=0;f.hp=Math.max(0,f.hp-15);sThud(true);vib(120);K.shake=.3;
  if(f.hp<=0){M.ph='lose';M.t=0;loseLife();bell(3);msgL=['Esa putosi katolta!']}else{f.lev='roof';f.base=r.A[2];f.x=r.A[0]+18;f.z=20;msgL=['Auts! Esa putosi kujalle.','Takaisin katolle... -15 energiaa'];M.al.forEach(a=>{a.lev='roof';a.base=r.A[2];a.x=r.A[0]+10;a.y=0})}}}
function mjAllySync(){const r=M.L.roof;if(!r||(M.lift&&M.lift.on))return;const e=M.e;if(e.st==='climb'||e.fallR)return;const es=rfSeg(e);
 M.al.forEach(a=>{if(a.atk||a.tired>0||['fly','down','ko','roll','kip'].includes(a.st))return;if(rfSeg(a)!==es){a.lev=e.lev;a.x=e.x-(a.kind==='a'?20:36);if(e.lev==='roof'&&rfH(a.x)===null)a.x=e.x-4;if(e.lev!=='roof'&&es===3)a.x=Math.max(r.S+2,a.x);if(e.lev!=='roof'&&es===0)a.x=Math.min(r.A[0]-4,a.x);a.base=e.lev==='roof'?rfH(a.x):0;a.y=.01;a.vy=110;a.st='jump';a.vx=0}})}
/* Kattorakennus piirretään kerran välimuistikankaaseen (2x) ja kopioidaan joka kehys; ikkunavalot kiinteät rakennuksen mukaan */
const RFC={};
function rfBldDraw(x0,w,h,c1,c2){const X0=0,X1=w,yb=112-h,yf=152-h;let q;
  mkBox(X0,yb-10,w,10,'#3a3640','#2a2630');R('#5a5660',X0,yb-10,w,1.5);
  for(let i=0;i<3;i++){const ax=X0+20+i*((w-50)/2);mkBox(ax,yb-18,16,10,'#8a909a','#5a606a',1);R('#3a3e46',ax+2,yb-16,12,1);R('#3a3e46',ax+2,yb-13,12,1);ell(ax+8,yb-18,5,1.2,'#a8b0ba')}
  q=g.createLinearGradient(0,yb,0,yf);q.addColorStop(0,'#3e3e48');q.addColorStop(1,'#56565f');g.fillStyle=q;g.fillRect(X0,yb,w,yf-yb);
  g.fillStyle='rgba(0,0,0,.18)';for(let i=0;i<w*.6;i++){const gx=X0+hsh(i+x0)*w,gy=yb+hsh(i*3+x0)*(yf-yb);g.fillRect(gx,gy,1,1)}
  g.fillStyle='rgba(255,255,255,.05)';for(let y=yb+4;y<yf;y+=8)g.fillRect(X0,y,w,.6);
  mkBox(X0,yf,w,4,'#6a6a74','#4a4a54');R('#9a9aa4',X0,yf,w,.8);
  q=g.createLinearGradient(0,yf+4,0,160);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.fillRect(X0,yf+4,w,160-yf-4);
  g.fillStyle='rgba(0,0,0,.2)';for(let y=yf+8;y<160;y+=5){g.fillRect(X0,y,w,.6);for(let x=X0+((y/5|0)%2)*6;x<X1;x+=12)g.fillRect(x,y,.6,5)}
  for(let x=X0+12;x<X1-14;x+=26){const lit=hsh(x+x0)>.45;R('#1a1a22',x-1,yf+11,14,13);R(lit?'#ffd890':'#2a3040',x,yf+12,12,11);R('rgba(0,0,0,.3)',x+5.5,yf+12,1,11);if(lit){g.save();g.globalCompositeOperation='lighter';const lq=g.createRadialGradient(x+6,yf+18,1,x+6,yf+18,14);lq.addColorStop(0,'rgba(255,200,120,.18)');lq.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=lq;g.fillRect(x-8,yf+4,28,28);g.restore()}}
  R('rgba(0,0,0,.45)',X0,yb-10,2,170-yb);R('rgba(0,0,0,.45)',X1-2,yb-10,2,170-yb)}
/* Katolta kadulle laskeutuvan rampin rakenne: palkin paksuus, pilarin leveys, ensimmäisen pilarin etäisyys ja pilariväli (px) */
const RAMP={beam:7,pw:12,first:16,gap:44};
function roofDraw(T){const r=M.L.roof,c=M.cam;let q;
 {const X0=r.A[1]-c,X1=r.B[0]-c;q=g.createLinearGradient(0,60,0,160);q.addColorStop(0,'#0a0a14');q.addColorStop(1,'#1a1620');g.fillStyle=q;g.fillRect(X0,112-r.B[2]-14,X1-X0,60+r.B[2]);mkBox(X0+6,134,20,14,'#2a5a3a','#1a3a26',1);R('#3a7a4a',X0+5,132,22,3);for(let i=0;i<3;i++){const u=(T*.3+i*.33)%1;ell(X0+16+Math.sin(u*5)*3,128-u*30,2+u*4,2+u*4,`rgba(120,110,130,${.25*(1-u)})`)}}
 // paint = kentän oma julkisivumaalari (piirtää julkisivun perusrakennuksen päälle välimuistiin)
 const bld=(x0,x1,h,c1,c2,paint)=>{const X0=x0-c;if(x1-c<-10||X0>W+10)return;const key=x0+'|'+x1+'|'+h+'|'+c1+(paint?'|p':''),top=112-h-20;let cc=RFC[key];
  if(!cc){const w=x1-x0;cc=RFC[key]=document.createElement('canvas');cc.width=(w+2)*2;cc.height=(172-top)*2;const x=cc.getContext('2d');x.scale(2,2);x.translate(0,-top);const gs=g;g=x;try{rfBldDraw(x0,w,h,c1,c2);if(paint)paint(w,h)}finally{g=gs}}
  g.drawImage(cc,X0,top,cc.width/2,cc.height/2)};
 bld(r.A[0],r.A[1],r.A[2],'#5a3a2e','#3a2620',r.paintA);bld(r.B[0],r.B[1],r.B[2],'#3e4a5a','#2a323e',r.paintB);
 {const X0=r.B[1]-c,X1=r.S-c,h=r.B[2];if(X1>-10&&X0<W+10){for(let x=X0;x<X1;x+=5){const u=(x-X0)/(X1-X0),hh=h*(1-u);mkBox(x,112-hh,5.5,40,'#6a6e78','#4a4e58');R('#9aa0aa',x,112-hh,5.5,.8);R('#9aa0aa',x,152-hh,5.5,.8)}
  g.strokeStyle='#2a2e36';g.lineWidth=1.6;g.beginPath();g.moveTo(X0,152-h-12);g.lineTo(X1,140);g.stroke();g.lineWidth=1.2;for(let x=X0;x<X1;x+=10){const u=(x-X0)/(X1-X0);g.beginPath();g.moveTo(x,152-h*(1-u)-12+h*0*u);g.lineTo(x,152-h*(1-u));g.stroke()}
  // kantava rakenne: portaiden alla yhtenäinen betonipalkki ja sen alla tukevat betonipilarit anturoineen (ei ohuita tikkuja)
  const RP=RAMP;g.fillStyle='#4a4e58';g.beginPath();g.moveTo(X0,152-h);g.lineTo(X1,152);g.lineTo(X1,152+RP.beam);g.lineTo(X0,152-h+RP.beam);g.closePath();g.fill();
  g.strokeStyle='#6a6e78';g.lineWidth=.8;g.beginPath();g.moveTo(X0,152-h);g.lineTo(X1,152);g.stroke();
  for(let x=X0+RP.first;x<X1-RP.pw;x+=RP.gap){const u=(x+RP.pw/2-X0)/(X1-X0),top=152-h*(1-u)+RP.beam-1;if(160-top<6)continue;
   R('#3e424c',x,top,RP.pw,160-top);R('#565a64',x,top,2,160-top);R('rgba(0,0,0,.3)',x+RP.pw-2,top,2,160-top);R('#5a5e68',x-2,top-1,RP.pw+4,2);R('#4a4e58',x-3,157,RP.pw+6,3);R('#6a6e78',x-3,157,RP.pw+6,.8)}}}
 if(!r.lift){const X=r.lad-c;if(X>-10&&X<W+10){const top=112-r.A[2]-10;R('#7a7e86',X-5,top,1.6,160-top);R('#7a7e86',X+4,top,1.6,160-top);for(let y=top+3;y<158;y+=5)R('#9aa0aa',X-4,y,8.5,1.2);R('rgba(0,0,0,.3)',X-4,top,1,160-top)}}}
function mjBg(T){if(M.L&&M.L.theme==='rova'){rovaBg(T);return}if(M.L&&M.L.theme==='gas'){gasBg(T);return}if(M.L&&M.L.theme==='scrap'){scrapBg(T);return}if(M.L&&M.L.theme==='ind'){indBg(T);return}if(M.L&&M.L.theme==='garage'){garageBg(T);return}const c=M.cam;let q=g.createLinearGradient(0,10,0,110);q.addColorStop(0,'#05061a');q.addColorStop(1,'#1e1a44');g.fillStyle=q;g.fillRect(0,10,W,100);
 for(let i=0;i<40;i++){const x=((hsh(i)*W*2-c*.05)%W+W)%W,y=12+hsh(i+50)*50;g.fillStyle=`rgba(255,250,230,${.3+.7*Math.abs(Math.sin(T*(1+hsh(i+9))+i))})`;g.fillRect(x,y,.8,.8)}
 ell(272-c*.02,30,8,8,'#f2ecc8');
 for(let i=Math.floor(c*.25/34)-1;i<Math.floor(c*.25/34)+12;i++){const bx=i*34-c*.25,h=26+hsh(i)*44;g.fillStyle='#0c0e2a';g.fillRect(bx,104-h,32,h);for(let wy=0;wy<h-8;wy+=7)for(let wx=3;wx<30;wx+=6)if(hsh(i*31+wy*7+wx)>.55){g.fillStyle=hsh(i+wy+wx)>.5?'rgba(255,220,140,.7)':'rgba(140,200,255,.5)';g.fillRect(bx+wx,104-h+4+wy,2.4,3)}}
 const SIGNS=['KIOSKI','GRILLI','PIZZA','PANTTI','PUB','KEBAB','SAUNA','APTEEKKI'],COL=['#ff3aa8','#3ad8ff','#ffb03a','#7aff6a','#ff5a4a','#c08aff'];
 for(let i=Math.floor(c*.6/96)-1;i<Math.floor(c*.6/96)+5;i++){if(i<0)continue;const bx=i*96-c*.6,h=58+hsh(i+3)*24,top=104-h,bc=['#3a2a3a','#2a3242','#3a3028','#2e2e3e'][i%4];
  g.fillStyle=bc;g.fillRect(bx,top,94,h);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(bx+90,top,4,h);for(let wy=top+6;wy<84;wy+=12)for(let wx=8;wx<88;wx+=16){g.fillStyle=hsh(i*17+wy+wx)>.5?'#ffd890':'#1a1a28';g.fillRect(bx+wx,wy,8,7)}
  g.fillStyle='#ffe8a8';g.fillRect(bx+10,88,40,14);g.fillStyle='rgba(60,30,10,.4)';g.fillRect(bx+10,95,40,1);g.fillStyle='#1a1418';g.fillRect(bx+62,86,14,18);
  const txt=i===0?'FALCON':SIGNS[i%SIGNS.length],col=i===0?'#ff3aa8':COL[i%COL.length],on=Math.sin(T*(3+i)+i)>-.92;g.save();g.font='bold 9px monospace';g.textAlign='center';g.shadowBlur=on?7:0;g.shadowColor=col;g.fillStyle=on?col:'#3a2a3a';g.fillText(txt,bx+47,82);g.restore()}
 g.fillStyle='#3a3a4a';g.fillRect(0,104,W,8);g.fillStyle='#5a5a6a';g.fillRect(0,104,W,1);g.fillStyle='#8a8a98';g.fillRect(0,111,W,1.5);
 for(let i=Math.floor(c/24)-1;i<Math.floor(c/24)+15;i++){const x=i*24-c;ell(x,111,8+hsh(i)*6,2.5,'#eef3ff')}
 q=g.createLinearGradient(0,112,0,160);q.addColorStop(0,'#2c2c36');q.addColorStop(1,'#1a1a22');g.fillStyle=q;g.fillRect(0,112,W,48);
 g.fillStyle='rgba(230,230,200,.5)';for(let i=Math.floor(c/40)-1;i<Math.floor(c/40)+10;i++)g.fillRect(i*40-c,135,18,1.6);
 if(c<280){g.save();g.translate(196-c,106);g.scale(.3,.3);hull3(.02,null);g.restore();R('#0c0c10',196-c+33,102.5,9,6);R('#3a3a42',196-c+38,104,3,2)}
 for(let i=Math.floor(c/200)-1;i<Math.floor(c/200)+3;i++){const x=i*200+120-c;g.fillStyle='#2a2a34';g.fillRect(x-1,40,2.4,66);g.fillRect(x-1,40,10,2);g.save();g.globalCompositeOperation='lighter';q=g.createLinearGradient(0,44,0,140);q.addColorStop(0,'rgba(255,220,150,.28)');q.addColorStop(1,'rgba(255,220,150,0)');g.fillStyle=q;g.beginPath();g.moveTo(x+6,43);g.lineTo(x+12,43);g.lineTo(x+32,140);g.lineTo(x-14,140);g.fill();g.restore();ell(x+9,43,3,1.4,'#fff2c0')}}
function mjDrawE(f,T){if(f.hidden)return;const isE=f===M.e,o=Object.assign(fpose(f,T,isE),{prof:1}),pp=['fly','down','ko','roll','kip'].includes(f.st);o.rot=pp?f.rw:(o.rot||0)*f.face+f.rw;if(!pp&&Math.abs(f.rw)>.02&&!o.cy)o.cy=4;
 if(f.atk&&f.atk.m.n==='solo'){o.aL=-1.35;o.eL=.15;o.aR=-.45+Math.sin(T*30)*.22;o.eR=-1.25;o.tilt=Math.sin(T*14)*.2}
 if(isE&&f.wpn>0&&!o.item)o.item=f.wt||'w';
 if(f.team==='e'&&f.st==='ko'&&f.kt>1&&Math.sin(T*40)>0)return;
 if(f.st==='climb'&&!(M.L.roof&&M.L.roof.lift)){const c2=f.cl||0;Object.assign(o,{prof:0,flip:false,aL:2.9+Math.sin(c2*9)*.25,eL:-.3,aR:-2.9+Math.sin(c2*9+3)*.25,eR:.3,lL:Math.sin(c2*9)*.35,kL:.5+Math.sin(c2*9)*.4,lR:-Math.sin(c2*9)*.35,kR:.5-Math.sin(c2*9)*.4,rot:0,cy:0,tilt:0,item:null})}
 const sx=f.x-M.cam,sy=112+f.z-(f.base||0),sc=f.sc||1;ell(sx,sy+1,10*sc,2.4*sc,'rgba(0,0,0,.35)');o.flip=o.flipX!==undefined?o.flipX:f.face<0;o.s=sc;{const X=sx+(o.lx||0)*sc*f.face,Y=sy-f.y+(o.dy||0)*sc;drawChar(f.sp,X,Y,o);swingTrail(f,o,X,Y,T)}
 if(f.notes>0)for(let i=0;i<3;i++){const u=((T*.8+i*.33)%1);g.save();g.globalAlpha=1-u;g.font='bold 9px monospace';g.fillStyle=['#ff6ac8','#6ae0ff','#ffe23a'][i];g.fillText('♪',sx-10+i*9+Math.sin(u*6)*3,sy-56-u*18);g.restore()}
 if(f.team==='a'&&f.tired>0)zzz(sx+8,sy-20,T)}
/* Roskikset: malli arvotaan paikan mukaan (kiinteä): vihreä peltipönttö, harmaa kannellinen sinkkipönttö, harmaa pyörillinen jäteastia, matala tummanvihreä. Rikottu = kaatunut. */
const BINS=[{w:10,h:15,c:'#2a6a3a',hi:'#3a8a4a',lid:'#1a4a2a'},{w:10,h:14,c:'#6a6e78',hi:'#8a8e98',lid:'#4a4e58',ribs:1},{w:12,h:18,c:'#4a4e56',hi:'#5e626a',lid:'#33363e',wheels:1},{w:12,h:11,c:'#1e4a34',hi:'#2a5e44',lid:'#143424'}];
function binDraw(o,x,y){const b=BINS[Math.floor(hsh(o.x*.37+o.z)*BINS.length)];
 if(o.br){g.save();g.translate(x,y-4);g.rotate(1.4);R(b.c,-b.w/2,-5,b.w,b.h-1);R(b.hi,-b.w/2,-5,2.5,b.h-1);g.restore();return}
 const l=x-b.w/2,t=y-b.h;ell(x,y+.5,b.w*.7,1.6,'rgba(0,0,0,.35)');R(b.c,l,t,b.w,b.h);R(b.hi,l,t,b.w*.3,b.h);R('rgba(0,0,0,.25)',l+b.w-2,t,2,b.h);
 if(b.ribs)for(let yy=t+4;yy<y-2;yy+=4)R('rgba(0,0,0,.3)',l,yy,b.w,.8);
 if(b.wheels){R('#16181c',l+1,y-2,3,3);R('#16181c',l+b.w-4,y-2,3,3);R(b.lid,l-1,t-2,b.w+2,3);R('#9aa6c8',l,t-2.6,b.w,1)}else{R(b.lid,l-1,t-1,b.w+2,2.5);ell(x,t-1.5,b.w*.55,1.4,'#9aa6c8')}}
function drawMJ(T){const e=M.e,cy=Math.round(M.camY||0);g.font='bold 8px monospace';g.textBaseline='alphabetic';
 // maailma piirretään pystykameran verran alemmas; taustakerrokset kumoavat osan siirrosta (syvyys)
 g.save();g.translate(0,cy);mjBg(T);if(M.L.roof)roofDraw(T);if(M.L.onDraw)M.L.onDraw(T);
 const L=[];M.objs.forEach(o=>L.push([o.z,()=>binDraw(o,o.x-M.cam,112+o.z)]));
 M.items.forEach(it=>L.push([it.z-.1,()=>{if(it.t>11&&Math.sin(T*30)>0)return;const x=it.x-M.cam,y=112+it.z-2+Math.sin(T*4)*1-(it.base||0);if(it.type==='c')can(x-3.5,y-12);else if(it.type==='v')waterB(x-2.5,y-13);else{g.save();g.translate(x,y-6);g.rotate(.6);it.type==='p'?pipeW(-1,-8):it.type==='k'?chainW(-1,-8):wrench(-1,-6);g.restore()}}]));
 M.ents.forEach(f=>L.push([f.z+(f===e?.05:0),()=>mjDrawE(f,T)]));
 if(!M.w.gone){const w=M.w;L.push([w.z,()=>{const o=M.lock&&M.ph==='play'?{...idle(T,2),aL:2.6,aR:-2.6}:w.wk>0?walk(T,w.wk,2):idle(T,2);o.flip=w.face<0;if(M.ph==='kid'&&M.kt>1){o.aL=2.8;o.aR=-2.8}ell(w.x-M.cam,112+w.z+1,9,2.2,'rgba(0,0,0,.35)');drawChar(SP.w,w.x-M.cam,112+w.z,o)}])}
 if(M.hk){const h=M.hk;L.push([h.z,()=>{const x=h.x-M.cam,y=112+h.z;if(h.tied){R('#5a3418',x-9,y-34,18,22);R('#3a2410',x-9,y-12,2,12);R('#3a2410',x+7,y-12,2,12)}const o=h.tied?{...idle(T,3),aL:.05,aR:-.05,blink:Math.sin(T*2)>.7}:h.wk>0?walk(T,h.wk,2):{...idle(T,3),aL:2.5,aR:-2.5};o.flip=(h.face||-1)<0;drawChar(SP.w,x,y,o);if(h.tied){g.strokeStyle='#c8a060';g.lineWidth=1.2;[y-22,y-17,y-28].forEach(yy=>{g.beginPath();g.moveTo(x-8,yy);g.lineTo(x+8,yy+1);g.stroke()})}}])}
 if(M.van)L.push([M.van.z,()=>mjVan(M.van.x-M.cam-60,112+M.van.z+5,T)]);
 if(M.L.onSort)M.L.onSort(L,T);L.sort((a,b)=>a[0]-b[0]).forEach(x=>x[1]());if(M.L.onFg)M.L.onFg(T);
 M.proj.forEach(p=>{const pb=p.base||0;if(p.star){mjStar(p.x-M.cam,112+p.z-p.y-pb,5,p.r);g.save();g.globalCompositeOperation='lighter';ell(p.x-M.cam,112+p.z-p.y-pb,8,8,'rgba(200,220,255,.15)');g.restore()}else{g.save();g.translate(p.x-M.cam,112+p.z-p.y-pb);g.rotate(p.r);R('#8a8a94',-6,-1.6,12,3.2);R('#5a5a64',-6,-1.6,2,3.2);g.restore()}ell(p.x-M.cam,112+p.z+1,4,1.2,'rgba(0,0,0,.3)')});
 M.fx.forEach(x=>{const u=x.t/.45,r=(x.big?12:8)*(.4+u),sx=x.x-M.cam;g.strokeStyle='#fff36a';g.globalAlpha=1-u;g.lineWidth=1.1;for(let i=0;i<8;i++){const a=i*.785+.3;g.beginPath();g.moveTo(sx+Math.cos(a)*r*.4,x.y+Math.sin(a)*r*.4);g.lineTo(sx+Math.cos(a)*r,x.y+Math.sin(a)*r);g.stroke()}
  if(x.txt){g.font='bold 10px monospace';g.textAlign='center';g.fillStyle='#ffe23a';g.strokeStyle='#a01010';g.lineWidth=2;g.strokeText(x.txt,sx,x.y-10-u*8);g.fillText(x.txt,sx,x.y-10-u*8);g.font='bold 8px monospace';g.textAlign='left'}g.globalAlpha=1});
 g.restore();
 if(M.L.theme!=='garage')flakes.forEach(f=>R('rgba(255,255,255,.8)',f.x,f.y,.9,.9));
 if(M.smoke>0){const a=Math.min(1,M.smoke)*.8;for(let i=0;i<14;i++){const cx=160+Math.sin(i*1.9+T)*120,cy=70+((i*23+T*14)%80);g.fillStyle=`rgba(40,38,44,${a*(.5+.5*Math.sin(i))})`;g.beginPath();g.arc(cx,cy,14+(i%4)*5,0,7);g.fill()}}
 if(M.ph==='title'){g.save();g.textAlign='center';g.font='bold 22px monospace';g.lineWidth=4;g.strokeStyle='#1a0820';g.strokeText('KENTTÄ '+M.lvl,160,74);g.fillStyle='#ffe23a';g.fillText('KENTTÄ '+M.lvl,160,74);g.font='bold 9px monospace';g.fillStyle='#fff';g.fillText(M.L.name.toUpperCase(),160,90);g.restore()}
 if(M.sayT>0&&M.say){const k=M.say[0],p=k==='v'?[M.van?M.van.x-M.cam:200,58]:mjSpk(k);sbub(p[0],Math.max(32,p[1]+cy),M.say[1])}
 if(M.L.roof&&M.ph==='play'&&Math.sin(T*6)>-.3){const r=M.L.roof;let ht=null,hx=0,hy=0;if(e.lev!=='roof'&&e.st!=='climb'&&!(M.lift&&M.lift.on)&&Math.abs(e.x-(r.lift?r.A[0]:r.lad))<60){ht=r.lift?'↑ HISSI':'↑ KIIPEÄ';hx=r.lad-M.cam;hy=r.lift?104:112-r.A[2]-16}else if(e.lev==='roof'&&e.x>r.A[1]-60&&e.x<r.A[1]){ht='HYPPÄÄ →';hx=r.A[1]-M.cam+6;hy=112-r.B[2]-18}if(ht){hy+=cy;g.save();g.font='bold 9px monospace';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#1a0820';g.strokeText(ht,hx,hy);g.fillStyle='#9ff';g.fillText(ht,hx,hy);g.restore()}}
 if(M.go>0&&M.ph==='play'&&!M.lock&&Math.sin(T*8)>-.2){g.save();g.font='bold 16px monospace';g.textAlign='right';g.lineWidth=3;g.strokeStyle='#1a0820';g.strokeText('GO →',312,72);g.fillStyle='#ffe23a';g.fillText('GO →',312,72);g.restore()}
 hpBar(8,100,e.hp,e.mhp,'ESA',false);[[M.al[0],'AAPELI',122],[M.al[1],'KERMIS',190]].forEach(([a,n,x])=>{R('#000',x-1,13,62,6);R('#1a2a1a',x,14,60,4);R(a.tired>0?'#8a8a8a':'#5fd08a',x,14,60*a.hp/a.mhp,4);g.save();g.font='bold 6px monospace';g.fillStyle='#fff';g.shadowColor='#000';g.shadowBlur=2;g.fillText(n+(a.tired>0?' (väsynyt)':''),x,26);g.restore()});
 if(M.boss&&!M.boss.dead){const b=M.boss;R('#000',195,31,120,7);R('#3a1010',196,32,118,5);R('#ff5a3a',196+118*(1-b.hp/b.mhp),32,118*b.hp/b.mhp,5);g.save();g.font='bold 7px monospace';g.textAlign='right';g.fillStyle='#ffd0c0';g.shadowColor='#000';g.shadowBlur=2;g.fillText(KT[b.kind].nm,314,46);g.restore()}
 {const n=M.ents.filter(f=>f.team==='e'&&!f.dead&&f!==M.boss).length;if(n){g.save();g.font='bold 7px monospace';g.textAlign='right';g.fillStyle='#ff8a8a';g.shadowColor='#000';g.shadowBlur=2;g.fillText('JENGI: '+n,314,20);g.restore()}}
 if(M.L.onHud)M.L.onHud(T);
 let q=g.createLinearGradient(0,0,0,10);q.addColorStop(0,'#fff');q.addColorStop(1,'#c8ccd8');g.fillStyle=q;g.fillRect(0,0,W,10);R('#000',0,10,W,.5);tx((M.L.hud||'MOOTTORIJAHTI')+' – '+(M.L.boss?'POMO':'KENTTÄ '+M.lvl+'/'+(LV.length-1)),4,8,'#000');tx('Hauki: '+B.hs,W-4,8,'#000','right');
 q=g.createLinearGradient(0,160,0,200);q.addColorStop(0,'#b8bccc');q.addColorStop(1,'#7c8096');g.fillStyle=q;g.fillRect(0,160,W,40);R('#fff',0,160,W,.6);R('#20243a',4,164,198,32);
 q=g.createLinearGradient(0,165,0,195);q.addColorStop(0,'#fdfdf6');q.addColorStop(1,'#e4e4d4');g.fillStyle=q;g.fillRect(5,165,196,30);drawMsg(196);
 const ku=kunto(B.h);tx('KUNTO:',206,172,'#000');tx(ku[0],244,172,ku[1]);tx('VOIMA: '+Math.round(pow(B.h)*100)+' %',206,183,'#000');tx(e.wpn>0?WN[e.wt||'w'][0].toUpperCase()+': '+e.wpn+' iskua':'KAATO: '+M.kills,206,194,e.wpn>0?'#2a5ac8':'#000');
 if(M.ph==='lose'&&M.t>1)box3('ESA KAATUI',['Diesel-jengi oli liikaa tällä kertaa.',RT()]);
 if(M.ph==='done'&&M.t>.6){if(!M.L.boss)box3('KENTTÄ '+M.lvl+' SUORITETTU!',['Kaadettuja yhteensä: '+M.kills,...M.L.done]);else box3('MOOTTORIJAHTI SUORITETTU!',['Mersumies on voitettu!','Hempukka pelastettu ja moottori löytyi.','Kaadettuja yhteensä: '+M.kills,'Napauta: kotiin!'])}}
const BEL=[[76,-1,74,76,-1,71,-1,74,76,-1,79,-1,76,74,71,-1],[72,-1,71,72,-1,67,-1,71,72,-1,76,-1,74,72,67,-1],[74,-1,72,74,-1,69,-1,72,74,-1,78,-1,76,74,69,-1],[71,-1,74,78,-1,74,-1,71,75,-1,78,-1,83,-1,78,-1]],BBS=[82.41,65.41,73.42,61.74];
function beatStep(t0,st){const tf=mus&&mus.m==='bb'?.89:1,mf=n=>440*Math.pow(2,(n-69)/12)*tf,s=st%16,bar=Math.floor(st/16),r=BBS[bar%4]*tf;
 if(s===0||s===8||s===10)mt(t0,140,40,.13,.85,'sine');if(s===4||s===12){mn(t0,.12,'bandpass',1800,.3);mn(t0,.06,'highpass',4000,.15)}if(s%2===0)mn(t0,.03,'highpass',8000,.05);
 if(s%2===0)mt(t0,r*(s%4===0?1:2),r*(s%4===0?1:2),.11,.32,'triangle');
 const n=BEL[bar%4][s];if(n>0&&Math.floor(bar/4)%2===0){const f=mf(n);mt(t0,f,f,.12,.05,'square')}else if(n>0){const f=mf(n-12);mt(t0,f,f,.1,.035,'square')}
 if(s%4===2){const f=mf(52+[0,7,12][(st>>2)%3]+(bar%4===1?-4:bar%4===2?-2:bar%4===3?-5:0));mt(t0,f*2,f*2,.07,.025,'square')}}
