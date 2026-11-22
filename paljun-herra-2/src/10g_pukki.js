/* Paljun Herra 2 – Pomo: Pajakylän paha joulupukki (kaksinkamppailu, 07_kaksinkamppailu + asetukset FIGHT_PUKKI).
   Mersumiehen palkkaama huijari. Erikoisliike lahjapakettisade: paketit putoavat holvista, maassa kasvava varjo näyttää
   paikan. Vaiheet kestävyyden mukaan: 2/3 → liimattu parta irtoaa, 1/3 → nuttu lentää ja paljastuu dieselsällin
   toppi Mersu-merkillä (VALEPUKKI: nopeampi, sade tiheämpi). Voiton jälkeen oikea pukki vapautuu lahjakaapista. */

// ---- Sprite: vaihe 0 = täysi pukki, 1 = ilman partaa, 2 = ilman nuttua ----
function genPukki(a){LY={};const sk='#eab894',sd='#c88e6c',rd='#c8202a',rdd='#8a141c',fur='#f4f0e8',bt='#1a1010';
 if(a<2){sBody(rd,rdd,sk,sd,12);['armL','armR'].forEach((n,i)=>{L(n);P(i?19:4,32,3,2,fur)});L('torso');P(6,25,14,8,rd);P(17,25,3,8,rdd);P(12,21,2,12,fur);P(6,33,14,2,fur);P(6,30,14,2,'#1a1a1a');P(12,30,2,2,'#e8c040')}
 else{sBody(sk,sd,sk,sd,0);L('torso');P(8,22,10,12,'#8a8a92');P(16,22,2,12,'#6a6a72');P(9,21,2,1,'#8a8a92');P(15,21,2,1,'#8a8a92');P(11,25,4,4,'#c0c4cc');P(12,26,2,2,'#3a3e48');P(12,25,2,1,'#c0c4cc');
  ['armL','armR'].forEach((n,i)=>{L(n);P(i?19:4,25,3,2,'#3a5a8a')})}// käsivarressa tatuointi
 sLegs(rd,rdd,bt,'#3a2a2a');
 sFace(sk,sd);P(9,12,2,1,'#1a1a2a');P(14,12,2,1,'#1a1a2a');P(12,14,2,2,'#e07070');
 if(a===0){P(9,11,3,1,fur);P(14,11,3,1,fur);P(8,15,10,2,'#ffffff');P(7,17,12,6,fur);P(8,23,10,3,fur);P(10,26,6,2,fur);P(7,10,1,6,fur);P(18,10,1,6,fur)}
 else{P(9,11,3,1,'#3a2418');P(14,11,3,1,'#3a2418');P(9,17,8,3,'#8a6a5a');P(10,17,6,1,'#7a3a30');P(8,16,1,1,'#f0e0c0');P(17,16,1,1,'#f0e0c0')}// sänki ja liimajäljet
 P(7,6,12,4,rd);P(8,4,10,2,rd);P(10,2,7,2,rd);P(15,1,4,2,rd);P(18,0,3,3,fur);P(7,9,12,2,fur);return sk}
SP.pk=[0,1,2].map(a=>buildSpr(genPukki,a));SP.pk0=SP.pk[0];
CHE.pk0=['Pukki: Ho ho... hoitakaa itsenne!','Pukki: Tuhmat saa risuja!','Pukki: Kuka haluaa lahjan päähänsä?','Pukki: Kilttien lista on lyhyt tänä vuonna.'];

/* Lahjapakettisade: N pakettia, yksi aina Esan kohdalle; varjo kasvaa putoamisen ajan */
const RAIN={n:[3,4,5],fall:1.05,gap:.16,hit:11,dmg:9,minX:30,maxX:290,space:34};
MV.sade={h:'mid',d:0,r:0,st:.55,ac:.1,rc:.5,fx:9,n:'sade',spec:rainStart,pose:(f,o)=>Object.assign(o,{aL:2.7,eL:.3,aR:-2.7,eR:-.3,bob:-1.5})};
function rainStart(f,o){const n=RAIN.n[f.ph||0],xs=[o.x];while(xs.length<n){const x=RAIN.minX+Math.random()*(RAIN.maxX-RAIN.minX);if(xs.every(q=>Math.abs(q-x)>RAIN.space))xs.push(x)}
 K.rain=(K.rain||[]).concat(xs.map((x,i)=>({x,t:-i*RAIN.gap,col:pick(GIFTC)})));voice(140,90,.5,'o',.5);voice(130,80,.4,'o',.45,.45);sayF('pk0',f.ph===2?'Valepukki: Syökää lahjoja!':'Pukki: HO HO HOO! Lahjoja kaikille!')}
/* Vaiheet ja sade joka kehys (kutsutaan taistelun askeleesta) */
const PKPH=[{at:2/3,sp:1,name:'PAJAKYLÄN PUKKI?',say:['e','Esa: Hetkinen... toi parta oli liimattu!'],drop:'parta'},
 {at:1/3,sp:2,name:'VALEPUKKI',vs:'Valepukki',say:['pk0','Valepukki: Okei okei! Mersumies maksoi hyvin!'],drop:'nuttu',spd:1.3,tk:.75,moves:['punch','kick','hikick','upper','punch']}];
function pukkiStep(dt){const f=K.f,e=K.e;f.ph=f.ph||0;
 const P2=PKPH[f.ph];if(P2&&f.hp>0&&f.hp<f.mhp*P2.at){f.ph++;f.sp=SP.pk[P2.sp];f.fd.name=P2.name;if(P2.vs)f.fd.vs=P2.vs;if(P2.spd){f.fd.spd*=P2.spd;f.fd.tk*=P2.tk;f.fd.moves=P2.moves}
  K.drop={k:P2.drop,x:f.x,y:FL-60,vx:-f.face*40,vy:-60,r:0};sayF(P2.say[0],P2.say[1]);nz(.3,'bandpass',1400,.15,500);crowd('ooh')}
 if(K.drop){const d=K.drop;d.vy+=300*dt;d.x+=d.vx*dt;d.y=Math.min(FL-2,d.y+d.vy*dt);d.r+=dt*4*(d.y<FL-2?1:0)}
 if(K.rain)for(const p of K.rain){p.t+=dt;if(p.t>=RAIN.fall&&!p.done){p.done=1;K.fx.push({x:p.x,y:FL-6,t:0,c:'#ffe070'});nz(.12,'lowpass',700,.2,200);
   if(Math.abs(e.x-p.x)<RAIN.hit&&e.y<16&&!['down','ko'].includes(e.st)){fightHurt(e,RAIN.dmg,Math.sign(e.x-p.x)||1);K.stop=.05;pain(e);if(e.hp<=0)KO(e)}}}
 if(K.rain)K.rain=K.rain.filter(p=>!p.done)}
function pukkiDraw(T){if(K.rain)for(const p of K.rain){if(p.t<0)continue;const u=Math.min(1,p.t/RAIN.fall);ell(p.x,FL+1,4+u*7,1+u*1.6,`rgba(0,0,0,${.15+u*.4})`);
  g.save();g.translate(p.x,14+(FL-20)*u*u);g.scale(1.5,1.5);giftDraw(0,0,p.t*3,p.col);g.restore()}
 const d=K.drop;if(d){g.save();g.translate(d.x,d.y);g.rotate(d.r);if(d.k==='parta'){ell(0,0,7,5,'#f4f0e8');ell(-3,4,4,3,'#f4f0e8')}else{R('#c8202a',-9,-6,18,12);R('#f4f0e8',-9,4,18,2.5);R('#f4f0e8',-1,-6,2,12)}g.restore()}}

/* Pajakylän sali taistelun taustana: staattinen osa välimuistissa, liekit ja valot joka kehys; kannustajat salin reunoilla */
function pukkiSali(){R('#3a0e12',0,10,W,108);for(let x=20;x<W;x+=70){R('#8a6a2a',x-4,10,8,108);R('#c8a04a',x-4,10,2,108)}R('#2a0a0c',0,10,W,4);
 R('#5a4a40',22,58,58,60);R('#6a5a50',22,58,58,3);R('#1a0a08',34,78,34,40);
 R('#6a1a1e',140,30,40,88);R('#8a2a2e',144,34,32,50);R('#c8a04a',140,30,40,3);R('#c8a04a',138,70,6,48);R('#c8a04a',176,70,6,48);
 R('#3a2010',261,106,6,12);for(let j=0;j<4;j++){const y=48+j*15,wd=10+j*8;g.fillStyle='#1a4a2a';g.beginPath();g.moveTo(264,y-6);g.lineTo(264+wd,y+12);g.lineTo(264-wd,y+12);g.closePath();g.fill()}
 g.fillStyle=mkLg(118,160,[[0,'#6a1a22'],[1,'#3a0a10']]);g.fillRect(0,118,W,42);R('#c8a04a',0,118,W,1.5);R('rgba(255,255,255,.08)',0,130,W,1)}
function pukkiBg(T){cutLayer('pukkiSali',pukkiSali);
 for(let i=0;i<5;i++){const fh=8+Math.abs(Math.sin(T*9+i*1.7))*10;g.fillStyle=i%2?'#ffb03a':'#ff6a2a';g.beginPath();g.moveTo(38+i*6,118);g.lineTo(41+i*6,118-fh);g.lineTo(44+i*6,118);g.fill()}
 for(let k=0;k<12;k++){const y=52+(k*13)%54,x=264+(hsh(k)*2-1)*(6+(y-48)*.35);R(Math.sin(T*3+k)>0?GIFTC[k%5]:'#2a3a2a',x,y,2,2)}ell(264,42,3,3,'#ffe070');
 [[SP.a,31.5],[SP.w,53],[SP.k,289.5]].forEach(([sp,x],i)=>{const o=K.ph==='lose'?idle(T,i):dance4(T,i*2);o.s=.7;o.aL=2.5+Math.sin(T*7+i)*.35;o.aR=-2.5-Math.sin(T*7+i+2)*.35;drawChar(sp,x,124,o)});
 // vapautetut tontut kannustavat takarivissä valtaistuimen molemmin puolin
 PK_TONTUT.forEach((x,i)=>{const o=dance4(T,i*1.3);o.s=.5;o.aL=2.4;o.aR=-2.4;o.flip=x>160;drawChar(SP.to,x,121,o)})}
const PK_TONTUT=[104,122,198,216];

/* Pomomusiikki (alkuperäinen): E-molli 150 bpm, kulkusten kahdeksasosat, basso ja uhkaava riffi */
const PKR=[28,24,26,23];
const PKM=[[64,-1,67,-1,71,-1,69,67,66,-1,64,-1,62,-1,64,-1],[60,-1,64,-1,67,-1,66,64,62,-1,60,-1,59,-1,60,-1],[62,-1,66,-1,69,-1,67,66,64,-1,62,-1,66,-1,69,-1],[71,-1,-1,-1,70,-1,-1,-1,71,-1,74,-1,75,-1,-1,-1]];
function pkStep(t0,st,L){const s=st%16,bar=Math.floor(st/16)%4,r=PKR[bar];
 if(s%2===0)tv(t0,mf(s%4===0?r:r+12),L*1.7,.4,'triangle');if(s===0||s===8||s===10)mt(t0,120,40,.12,.85,'sine');if(s===4||s===12)mn(t0,.14,'bandpass',2200,.3);
 if(s%2===0)mn(t0,.05,'highpass',7500,s%4===0?.09:.05);leadNote(PKM[bar],s,t0,L,.06,.25,2)}
MST.pk=[150,pkStep];

const PUKKI={name:'PAJAKYLÄN PUKKI',vs:'Pajakylän pukki',sp:'pk0',hp:150,spd:26,mult:1.25,tk:.8,moves:['punch','kick','upper','punch'],blk:.2,pref:28,def:.9,jmp:0,
 spec:(f,o,d)=>{f.sc=(f.ph===2?4.2:6)*(DIFF?.75:1);startAtk(f,'sade');return true}};
const FIGHT_PUKKI={foes:[PUKKI],bg:pukkiBg,music:'pk',che:['a','k','w'],step:pukkiStep,draw:pukkiDraw,
 lose:['Pukki kääri porukan lahjapaperiin.','Kermis: Ihan tahallaan.'],
 setup:()=>{K.rain=[];K.drop=null;K.f.sc=4},onWin:pukkiWon};
function startPukki(){saveSet('pukki');SKILL.dodge=true;startFight(FIGHT_PUKKI)}

/* Voiton jälkeen: oikea pukki vapautuu, valepukki tunnustaa; sitten jatkoa seuraa */
function pukkiCut(T,t){g.save();g.translate(CP.x,CP.y);g.scale(CP.w/W,CP.h/118);g.translate(0,-10);pukkiSali();g.restore();
 const fy=CP.y+CP.h-6;drawChar(SP.e[S2.outfit],100,fy,Object.assign(idle(T,0),{s:.95,prof:1}));drawChar(SP.pk0,200,fy,Object.assign(idle(T,1),{s:.95,prof:1,flip:true,aL:-.4,aR:.3}));
 g.save();g.translate(250,fy-4);g.rotate(-1.45);drawChar(SP.pk[2],0,0,Object.assign(idle(T,2),{s:.9,prof:1,blink:true}));g.restore()}
const PUKKI_CUT=[{draw:pukkiCut,music:'vt',lines:[['','Salin lahjakaapista kuuluu koputusta. Ovi aukeaa.'],['Oikea pukki','Ho ho hoo! Kiitos, Esa. Tuo huijari lukitsi minut lahjakaappiin.'],
 ['Esa','Kuka sen palkkasi?'],['Valepukki','Mersumies... Se lähti lentokentälle yksityiskoneella. Sam Discon palvelin on mukana.'],
 ['Oikea pukki','Tontut ovat taas omia itsejään. Ottakaa tämä, lahja kiltille humalanyrkkeilijälle.'],['Esa','Kupari! Oikea pukki on paras pukki.'],
 ['Pera','(puhelimessa) Kuulin kaiken. Euroopan nopein Tesla-kuski on jo lentokentän parkissa.']]}];
function pukkiWon(){B.h=Math.min(100,B.h+10);startCut(PUKKI_CUT,showTbc)}
