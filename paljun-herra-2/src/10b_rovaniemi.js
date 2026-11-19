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
const RV={silta:760,koski:1560,len:2300,kioski:1960,penkki:2090,kuusi:1770,aukioK:1630};
// Lukitut latausasemat: maailman x ja aalto (indeksi), jonka voittaminen vapauttaa aseman
const RV_ST=[{x:600,w:1},{x:1665,w:4},{x:1860,w:5}];
// Yllättäen aukeavat ovet: oven paikka, Esan x joka laukaisee, vihollinen, kyltti ja repliikki
const RV_DOOR=[{x:830,trig:790,k:'hm',sign:'RAPPU',say:'Haalarimies: Kuka koputti?'},{x:1505,trig:1470,k:'sm',sign:'KUNTOSALI',say:'Sali-Make: Kuka häiritsee mun penkkiä?'},{x:1585,trig:1550,k:'tk',sign:'PUB',say:'Takatukka: Mun tuoppi jäi kesken!'}];
// Sampokeskus: hissi (lad) vie katolle A, hyppy katolle B ja ramppi alas kadulle (S); korkeudet pikseleinä
const RV_ROOF={lad:940,lift:1,A:[912,1110,180],B:[1134,1330,124],S:1462,paintA:(w,h)=>mallFacade(w,h,0),paintB:(w,h)=>mallFacade(w,h,1)};
const LR={n:1,fin:1,noW:1,name:'Rovaniemen keskusta',hud:'ROVANIEMI',theme:'rova',len:RV.len,roof:RV_ROOF,camY:{off:10,max:170},
 waves:[{x:240,list:['hm','hm']},{x:540,list:['hm','tk','hm']},{x:1000,roof:1,list:['hm','tk']},{x:1200,roof:1,list:['tk','hm','hm']},{x:1490,list:['hm','tk','hm']},{x:1740,list:['tk','hm','tk','hm','tk']}],
 bins:[[180,30,'c'],[460,10,'v'],[820,28,'w'],[1520,30,'c'],[1600,12,'v'],[1700,26,'p']],
 msg:['Kenttä 1: Rovaniemen keskusta','Vapauta lukitut latausasemat!'],say:['a','Aapeli: Jätkänkynttilä! Täältä se alkaa.'],
 done:['Latausasemat vapautettu!','Lordin aukio on hiljainen... liian hiljainen.','Napauta: jatka.'],
 onStep:rovaStep,onDraw:rovaDraw,onHud:rovaHud,onFg:rovaFg,onSort:liftSort};
const RV_QUIP=[['a','Aapeli: Latausasema vapaa! ID.3 kiittää.'],['k','Kermis: Virta kulkee taas. Rock!'],['p','Esa: Seuraava!']];
function startRova(){LV.length=1;LV.push(LR);startMJ()}

/* Asemien tila nollataan, kun kenttä alkaa tai yritetään uudestaan (mjLevel nollaa kellon M.ck) */
function rovaSt(){if(!M.rv||M.ck<M.rvCk){M.rv=RV_ST.map(s=>({...s,free:0,t:0}));M.lift=null;M.rvD=RV_DOOR.map(d=>({...d,op:0}))}M.rvCk=M.ck;return M.rv}
/* Vihollinen ilmestyy maailman kohtaan (ovesta), ei ruudun reunalta kuten aalloissa */
function spawnAt(k,x,z){const t=KT[k],f=mjE(SP[t.sp],x,z,'e',k,t.hp*(DIFF?1.3:1));f.face=M.e.x<x?-1:1;f.slot=(t.sc?21:15)+Math.random()*6;f.cd=1.2;M.ents.push(f);return f}
function rovaDoors(dt){for(const d of M.rvD){if(d.op){d.op=Math.min(1,d.op+dt*3);continue}if(M.e.lev!=='roof'&&M.e.x>=d.trig){d.op=.01;tn(160,90,.25,.25,'square');nz(.25,'lowpass',600,.3);const f=spawnAt(d.k,d.x,2);M.say=[f,d.say];M.sayT=2.6;sTalk(1);msgL=['Ovi paukahtaa auki!']}}}
/* Sampokeskuksen lasijulkisivu (piirretään kerran välimuistiin rakennuksen päälle). Mittasuhteet hahmoihin: hahmo ~52 px,
   joten katutaso MALL.gf ja yläkerrat MALL.floor ovat reilusti hahmoa korkeampia. Kerrokset rakennetaan alhaalta ylös.
   Yläkerroksissa liikkeiden lasiset myymäläjulkisivut kyltteineen ja kerrosten välillä liukuportaat (runko, askelmat,
   lasikaide ja käsijohde). part 0 = pääosa (hissi), 1 = viereinen siipi. Kirkkaus hehkurajan alla, reunoissa pilarit. */
const MALL={edge:7,gf:68,floor:56,slab:4,mull:18,glass:['#173248','#1d3c56'],shops:['#7a5a3a','#6a5070','#4a6a5a','#7a6040','#5a5a7a'],signs:['#c86a3a','#3a9ac8','#c8a03a','#9a5ac8','#5ac87a']};
/* Rivin paikat: mahtuu kokonaan väliin [a,b] ilman esteitä (block = [[x0,x1],...]); jokaiseen vapaaseen väliin keskitetty rivi.
   Näin ovet, ikkunat ja myymälät eivät koskaan tule osittain rakennuksen kyljen, pilarin tai hissikuilun yli. */
function fitRow(a,b,sw,gap,block){const segs=[[a,b]];for(const [x0,x1] of block||[]){for(let i=segs.length-1;i>=0;i--){const [s0,s1]=segs[i];if(x1<=s0||x0>=s1)continue;segs.splice(i,1,...[[s0,x0],[x1,s1]].filter(([p,q])=>q-p>0))}}
 const out=[];for(const [s0,s1] of segs){const n=Math.floor((s1-s0+gap)/(sw+gap));if(n<1)continue;const st=s0+(s1-s0-(n*sw+(n-1)*gap))/2;for(let i=0;i<n;i++)out.push(st+i*(sw+gap))}return out}
/* Liukuportaat kerroksesta toiseen: x0 = alapää, y0 = alakerran lattia, dir = +1 nousee oikealle; korkeus = yksi kerros */
function escalator(x0,y0,dir){const h=MALL.floor-MALL.slab,run=h*1.6,x1=x0+dir*run,y1=y0-h,st=4;
 // runko (tumma kotelo portaiden alla)
 g.fillStyle='#2a2e38';g.beginPath();g.moveTo(x0-dir*8,y0);g.lineTo(x0+dir*4,y0);g.lineTo(x1+dir*8,y1);g.lineTo(x1-dir*4,y1);g.lineTo(x1-dir*4,y1+8);g.lineTo(x0-dir*8,y0+0);g.closePath();g.fill();
 g.fillStyle='#3e4450';g.beginPath();g.moveTo(x0-dir*8,y0);g.lineTo(x1-dir*4,y1+6);g.lineTo(x1-dir*4,y1+9);g.lineTo(x0-dir*8,y0+3);g.closePath();g.fill();
 // askelmat: porraspolku metallinsävyisenä
 g.fillStyle='#8a909c';g.beginPath();g.moveTo(x0-dir*6,y0);const n=Math.floor(h/st);for(let k=0;k<n;k++){const ax=x0+dir*(k*run/n),ay=y0-k*st;g.lineTo(ax,ay-st);g.lineTo(ax+dir*run/n,ay-st)}g.lineTo(x1+dir*6,y1);g.lineTo(x1+dir*6,y1+2);g.lineTo(x0-dir*6,y0+2);g.closePath();g.fill();
 g.strokeStyle='#5a606c';g.lineWidth=.6;for(let k=0;k<n;k++){const ax=x0+dir*(k*run/n),ay=y0-k*st;g.beginPath();g.moveTo(ax,ay);g.lineTo(ax,ay-st);g.stroke()}
 // lasikaide ja musta kumikäsijohde pyöristettyine päineen
 g.fillStyle='rgba(170,210,240,.18)';g.beginPath();g.moveTo(x0-dir*6,y0-2);g.lineTo(x1+dir*6,y1-2);g.lineTo(x1+dir*6,y1-12);g.lineTo(x0-dir*6,y0-12);g.closePath();g.fill();
 g.strokeStyle='#14161c';g.lineWidth=1.6;g.lineCap='round';g.beginPath();g.moveTo(x0-dir*10,y0-11);g.lineTo(x0-dir*6,y0-12);g.lineTo(x1+dir*6,y1-12);g.lineTo(x1+dir*10,y1-11);g.stroke();
 R('#c4c8d2',Math.min(x0,x0-dir*12)-2,y0,16,2);R('#c4c8d2',Math.min(x1,x1+dir*12)-2,y1,16,2)}
/* Myymälöiden nimet (arvotaan paikan mukaan, pysyvät samoina). Kyltin teksti kutistetaan mahtumaan kylttiin. */
const MALL_NAMES=['HUONEKALUT','KAHVILA MIMOSA','LASSEN LELU','REVONTULI-KIRJA','POROKENKÄ','TONTTU-SPORT','LAPIN KULTA','SAUNA-MAAILMA','KUPARIPANIMO','HAUKI-KALA','NAPAPIIRIN KUKKA','ELEKTRO-ESA','KIRPPU-KAMU','PIPO & LAPANEN','KAAMOS-KUVA','JÄTKÄN APTEEKKI','SAMPO-SUSHI','LUMI-OPTIIKKA','KEMI-KONE','PALJUKAUPPA'];
/* Kyltin pohja piirretään välimuistiin, teksti talletetaan ja piirretään joka kehys terävänä (retrotekstipolku), muuten se sumenisi */
const MALL_TXT=[[],[]];let MALL_PART=0;
function mallSign(txt,x,y,w,col){R('#14161e',x,y,w,8);R(col,x,y+7,w,1);MALL_TXT[MALL_PART].push({txt,x:x+w/2,y:y+6,w:w-2,col})}
function mallSignsDraw(){const r=M.L.roof;[[r.A[0],0],[r.B[0],1]].forEach(([x0,p])=>{for(const t of MALL_TXT[p]){const x=x0+t.x-M.cam;if(x<-30||x>W+30)continue;g.save();g.font='bold 5px monospace';const tw=g.measureText(t.txt).width,sc=Math.min(1,t.w/tw);g.translate(x,t.y);g.scale(sc,1);g.textAlign='center';g.fillStyle=t.col;g.fillText(t.txt,0,0);g.restore()}})}
/* Viherkasvi käytävälle: ruukku, multa ja lehvästö (koko vaihtelee) */
function mallPlant(x,yb,v){const h=10+v*8;R('#5a3a2a',x-3,yb-6,6,6);R('#7a5038',x-3,yb-6,6,1.2);R('#2a1a10',x-2.5,yb-6.5,5,1);
 g.fillStyle='#1e5a32';for(let k=0;k<5;k++){const a=-1.9+k*.45+(v-.5)*.3;g.beginPath();g.ellipse(x+Math.cos(a)*h*.35,yb-6-h*.55+Math.sin(a)*h*.25,2,h*.32,a+1.57,0,7);g.fill()}g.fillStyle='#2e7a44';g.beginPath();g.ellipse(x,yb-6-h*.6,2.2,h*.38,0,0,7);g.fill()}
/* Myymälä yläkerrassa: lasinen myymäläjulkisivu, sisävalo, hyllyt/tuotteet ja nimikyltti */
function mallShop(x,yb,w,k){const h=MALL.floor-MALL.slab-6,c=MALL.shops[Math.floor(hsh(x*3+k*7)*MALL.shops.length)],col=MALL.signs[Math.floor(hsh(x+k*5)*MALL.signs.length)];R('#1a2028',x-1,yb-h-1,w+2,h+1);R(c,x,yb-h+9,w,h-9);R('rgba(255,235,200,.12)',x,yb-h+9,w,3);
 mallSign(MALL_NAMES[Math.floor(hsh(x*1.7+k*13.1)*MALL_NAMES.length)],x,yb-h,w,col);for(let sx=x+4;sx<x+w-4;sx+=8){R('rgba(0,0,0,.25)',sx,yb-20,5,18);R('rgba(255,255,255,.08)',sx,yb-h+12,1,h-14)}R('#22303e',x+w/2-.5,yb-h+9,1,h-9)}
function mallFacade(w,h,part){MALL_PART=part;MALL_TXT[part]=[];const y1=160,y0=156-h;g.fillStyle=mkLg(y0,y1,[[0,MALL.glass[0]],[1,MALL.glass[1]]]);g.fillRect(0,y0,w,y1-y0);
 for(let x=0;x<w;x+=MALL.mull)R('#22303e',x,y0,1.2,y1-y0);for(let i=0;i<5;i++){const x=hsh(i+part*9)*w;g.fillStyle='rgba(170,210,240,.07)';g.beginPath();g.moveTo(x,y0);g.lineTo(x+18,y0);g.lineTo(x-24,y1);g.lineTo(x-42,y1);g.fill()}
 // katutaso: korkeat näyteikkunat ja (pääosassa) sisäänkäyntikatos
 const gy=y1-MALL.gf;R('#c4c8d2',0,gy-MALL.slab,w,MALL.slab);R('#e0e4ec',0,gy-MALL.slab,w,1);
 // kyljet ja hissikuilu (pääosassa) pidetään vapaina; reunapilarin sisäpuolelta 3 px väli
 const lo=MALL.edge+3,hi=w-MALL.edge-3,liftZ=part===0?[[RV_ROOF.lad-RV_ROOF.A[0]-LIFT.w/2-6,RV_ROOF.lad-RV_ROOF.A[0]+LIFT.w/2+6]]:[],cx0=w*.62;
 for(const x of fitRow(lo,hi,32,8,[...liftZ,...(part===0?[[cx0-32,cx0+32]]:[])])){R('#1a2028',x-1,gy+5,34,MALL.gf-12);R('#6a5434',x,gy+6,32,MALL.gf-14);R('#806640',x,gy+6,32,3);R('#3a2e22',x+4,gy+28,8,MALL.gf-36);R('#4a3a2a',x+16,gy+22,9,MALL.gf-30);R('#22303e',x+15.5,gy+6,1,MALL.gf-14)}
 if(part===0){const cx=cx0;R('#1a1e26',cx-24,gy+10,48,MALL.gf-14);R('#8a6a44',cx-20,gy+14,40,MALL.gf-18);R('#c8ccd6',cx-30,gy+2,60,4);R('rgba(0,0,0,.4)',cx-30,gy+6,60,2);mallPlant(cx-28,y1-4,.8);mallPlant(cx+28,y1-4,.6)}
 // yläkerrat alhaalta ylös: myymälät ja liukuportaat
 // liukuportaat pidetään kokonaan hissikuilun ja pilarien välissä (14 px väli päihin, käsijohteen pää mukaan lukien)
 const escLo=Math.max(lo,...liftZ.map(z=>z[1]))+14;
 let k=0;for(let yb=gy-MALL.slab;yb-MALL.floor>=y0-2;yb-=MALL.floor,k++){const dir=k%2?-1:1,run=(MALL.floor-MALL.slab)*1.6,ex=dir>0?Math.max(w*.2,escLo):Math.max(w*.62,escLo+run),a=Math.min(ex,ex+dir*run)-14,b=Math.max(ex,ex+dir*run)+14;
  // liukuportaat vain, jos yläpuolella on vielä kerros (ylimmästä ei kulje portaita katolle)
  const top=yb-MALL.floor,esc=top>y0+2;const xs=fitRow(lo,hi,36,8,[...liftZ,...(esc?[[a,b]]:[])]);xs.forEach(x=>mallShop(x,yb,36,k+part*3));
  for(let n=0;n<xs.length-1;n++)if(xs[n+1]-xs[n]<50&&hsh(xs[n]+k*3+part)>.45)mallPlant(xs[n]+40,yb,hsh(xs[n]*2+k));if(esc)escalator(ex,yb,dir);
  if(esc){R('#c4c8d2',0,top,w,MALL.slab);R('#e0e4ec',0,top,w,1);R('rgba(0,0,0,.35)',0,top+MALL.slab,w,1.5)}}
 R('#3a4048',0,y1-4,w,4);R('#5ad8e8',0,y0+2,w,1.2);R('rgba(90,216,232,.25)',0,y0+3.2,w,1.5);
 // kulmapilarit: lasi ei saa loppua tyhjään, vaan reunassa on aina umpinainen seinä (betonipilari varjoineen)
 for(const x of[0,w-MALL.edge]){R('#5a606c',x,y0,MALL.edge,y1-y0);R('#767c88',x+(x?0:MALL.edge-1.5),y0,1.5,y1-y0);R('rgba(0,0,0,.3)',x+(x?MALL.edge-2:0),y0,2,y1-y0)}R('#767c88',0,y0,w,2)}
/* ---- Sampokeskuksen hissi (rakennuksen sisällä) ----
   Katutasolla ovi on julkisivussa, kori näkyy noustessaan julkisivun lasikaistaleesta, ja ylhäällä hissi tulee katon läpi
   konehuoneeseen katon takaosaan. Porukka astuu ulos konehuoneen ovista kattotasolle (katto heidän edessään).
   Kulku: (kori alas) → ovet aukeavat → porukka kävelee koriin → ovet kiinni → nousu → ovet auki ylhäällä → ulos katolle → ovet kiinni. */
// w,h = oviaukko; sz = katuoven syvyys (z), hz = konehuoneen oven syvyys katolla; houseH/houseW = konehuoneen koko
const LIFT={w:30,h:58,door:.55,rise:4,walk:42,slots:[0,-7,7],catchUp:70,sz:40,hz:1,houseH:88,houseW:46};
function liftStart(){const r=M.L.roof,L0=M.lift||{y:0};M.lift={on:1,ph:L0.y>0?'down':'open',t:0,d:0,y:L0.y,who:[M.e,...M.al.filter(a=>!a.tired&&!['fly','down','ko','roll','kip'].includes(a.st)&&a.lev!=='roof')]};
 M.lift.who.forEach(f=>{if(f!==M.e&&Math.abs(f.x-r.lad)>LIFT.catchUp)f.x=r.lad-LIFT.catchUp;f.atk=null;f.inLift=1;f.vx=f.vz=0});tn(880,880,.08,.05,'sine');tn(660,660,.12,.05,'sine',.1);msgL=['Hissi tulee...']}
/* Siirtää hahmoa kohti (x,z) kävellen; palauttaa true, kun perillä */
function liftWalk(f,x,z,dt){const dx=x-f.x,dz=z-f.z,d=Math.hypot(dx,dz),s=LIFT.walk*dt;if(d<=s){f.x=x;f.z=z;f.st='idle';return true}f.x+=dx/d*s;f.z+=dz/d*s;f.face=Math.abs(dx)>.5?Math.sign(dx):f.face;f.st='walk';f.wk=(f.wk||0)+dt;return false}
function liftDoorSound(){nz(.35,'bandpass',1800,.06,900)}
function liftRide(e,dt){const r=M.L.roof,L=M.lift,top=r.A[2],ease=u=>u*u*(3-2*u);L.t+=dt;e.vx=e.vz=0;
 if(L.ph==='down'){L.y=top*(1-ease(Math.min(1,L.t/LIFT.rise)));if(L.t>=LIFT.rise){L.y=0;L.ph='open';L.t=0}}
 else if(L.ph==='open'){if(L.t<dt*1.5){tn(1319,1319,.3,.05,'sine');liftDoorSound()}L.d=Math.min(1,L.t/LIFT.door);if(L.d>=1){L.ph='enter';L.t=0}}
 else if(L.ph==='enter'){let ok=true;L.who.forEach((f,i)=>{if(!liftWalk(f,r.lad+LIFT.slots[i],LIFT.sz,dt))ok=false});if(ok){L.who.forEach(f=>f.face=1);L.ph='close';L.t=0;liftDoorSound();msgL=['Ovet sulkeutuvat...']}}
 else if(L.ph==='close'){L.d=1-Math.min(1,L.t/LIFT.door);if(L.d<=0){L.ph='rise';L.t=0;L.who.forEach(f=>f.hidden=1);msgL=['Hissi nousee...']}}
 else if(L.ph==='rise'){const u=ease(Math.min(1,L.t/LIFT.rise));L.y=top*u;L.who.forEach(f=>{f.base=L.y;f.z=LIFT.sz+(LIFT.hz-LIFT.sz)*u;f.y=0;f.vy=0});if(Math.floor(L.t/.25)!==Math.floor((L.t-dt)/.25))tn(70,70,.22,.05,'sawtooth');
  if(L.t>=LIFT.rise){L.ph='open2';L.t=0;L.who.forEach((f,i)=>{f.hidden=0;f.base=top;f.z=LIFT.hz;f.x=r.lad+LIFT.slots[i];f.face=1});tn(1319,1319,.5,.06,'sine');tn(1047,1047,.6,.05,'sine',.18);liftDoorSound();msgL=['Kling! Sampokeskuksen katto.']}}
 else if(L.ph==='open2'){L.d=Math.min(1,L.t/LIFT.door);if(L.d>=1){L.ph='exit';L.t=0;L.who.forEach(f=>f.lev='roof')}}
 else if(L.ph==='exit'){let ok=true;L.who.forEach((f,i)=>{if(!liftWalk(f,r.lad+10+i*14,12+i*9,dt))ok=false;f.base=top});if(ok){L.ph='close2';L.t=0;liftDoorSound()}}
 else if(L.ph==='close2'){L.d=1-Math.min(1,L.t/LIFT.door);if(L.d<=0){L.on=0;L.who.forEach(f=>{f.inLift=0;f.hidden=0;f.st='idle'});msgL=['Katolla!','Potki viholliset reunan yli.']}}}
/* Korin lattian korkeus (maailman y): katuovella 112+sz, konehuoneessa katolla 112-katto+hz */
function liftFloorY(){const r=M.L.roof,L=M.lift,u=L?L.y/r.A[2]:0;return 112+LIFT.sz+((112-r.A[2]+LIFT.hz)-(112+LIFT.sz))*u}
function cabInside(x,fy){const cw=LIFT.w/2;R('#3a3226',x-cw,fy-LIFT.h,LIFT.w,LIFT.h);R('#4a4030',x-cw,fy-LIFT.h,LIFT.w,3);R('#c8a060',x-cw+2,fy-LIFT.h+1,LIFT.w-4,1);R('#5a4c38',x-cw,fy-15,LIFT.w,1.2);R('#2a241c',x-cw,fy-3,LIFT.w,3);glow(x,fy-LIFT.h+4,12,'255,220,160',.22)}
/* Liukuovet ja kehys aukolle (pohja y0, d = avautuneisuus 0–1) */
function liftDoors(x,y0,d){const cw=LIFT.w/2,pw=cw-1,h=LIFT.h;g.save();g.beginPath();g.rect(x-cw+1,y0-h,LIFT.w-2,h);g.clip();
 for(const s of[-1,1]){const px=s<0?x-pw-d*pw:x+d*pw;R('#8a909c',px,y0-h+2,pw,h-2);R('#a8aeb8',px,y0-h+2,1,h-2);R('rgba(255,230,180,.3)',px+2,y0-h+5,pw-4,4);R('#5a606a',px+(s<0?pw-1:0),y0-h+2,1,h-2)}g.restore();
 R('#4a505c',x-cw-3,y0-h-3,LIFT.w+6,4);R('#4a505c',x-cw-3,y0-h,3,h);R('#4a505c',x+cw,y0-h,3,h)}
/* Taka-ala (ennen hahmoja): katuovi aukkoineen, julkisivun lasikaistale korin kanssa, konehuone katolla sisuksineen, Sampokeskus-kyltti */
function liftBack(T){const r=M.L.roof,x=r.lad-M.cam;if(x<-60||x>W+60)return;const L=M.lift,fy=liftFloorY(),cw=LIFT.w/2,sy=112+LIFT.sz,hy=112-r.A[2]+LIFT.hz,top=r.A[2],atBot=!L||L.y<.5,atTop=L&&L.y>=top-.5;
 // katuovi julkisivussa
 R('#0c0e14',x-cw,sy-LIFT.h,LIFT.w,LIFT.h);if(atBot)cabInside(x,sy);
 // lasikaistale julkisivussa: kori näkyy rakennuksen sisällä noustessaan
 const wy0=152-top+6,wy1=sy-LIFT.h-6;R('#1a2232',x-cw-2,wy0,LIFT.w+4,wy1-wy0);g.save();g.beginPath();g.rect(x-cw,wy0+1,LIFT.w,wy1-wy0-2);g.clip();for(let y=wy0;y<wy1;y+=10)R('#24304a',x-cw,y,LIFT.w,1);if(!atBot&&!atTop)cabInside(x,fy);R('rgba(150,200,255,.12)',x-cw,wy0,LIFT.w,wy1-wy0);g.restore();R('#4a505c',x-cw-2,wy0,2,wy1-wy0);R('#4a505c',x+cw,wy0,2,wy1-wy0);
 // konehuone katon takaosassa
 const hw=LIFT.houseW/2,ht=hy-LIFT.houseH;R('#3a3e4a',x-hw,ht,LIFT.houseW,LIFT.houseH);R('#4a4e5a',x-hw,ht,LIFT.houseW,2);R('#9aa6c8',x-hw-1,ht-2,LIFT.houseW+2,2.5);R('rgba(0,0,0,.3)',x+hw-4,ht,4,LIFT.houseH);
 R('#0c0e14',x-cw,hy-LIFT.h,LIFT.w,LIFT.h);if(atTop)cabInside(x,hy);labelBoard('HISSI',x,ht+8,'#7dd8ff');
 const fl=atBot?'1':atTop?'K':'↑';for(const yy of[sy-LIFT.h-11,hy-LIFT.h-11]){R('#0a0c12',x-6,yy,12,7);g.save();g.font='bold 5px monospace';g.textAlign='center';g.fillStyle='#ff6a3a';g.fillText(fl,x,yy+5.5);g.restore()}
 const sx=(r.A[0]+r.A[1])/2+30-M.cam,sgy=112-r.A[2]-22;if(sx>-80&&sx<W+80){R('#3a3e48',sx-30,sgy+3,2,14);R('#3a3e48',sx+28,sgy+3,2,14);R('#5a5e68',sx-40,sgy-10,80,15);R('#0e0c14',sx-39,sgy-9,78,13);
  g.save();g.font='bold 8px monospace';g.textAlign='center';const on=Math.sin(T*3)>-.95;g.shadowBlur=on?7:0;g.shadowColor='#ff6a3a';g.fillStyle=on?'#ffb07a':'#5a3a2a';g.fillText('SAMPOKESKUS',sx,sgy);g.restore()}}
/* Ovet syvyysjärjestyksessä hahmojen kanssa: katuovi (z = sz+.5) ja konehuoneen ovi (z = hz+.5); sisällä olevat jäävät ovien taakse */
function liftSort(Ls){const r=M.L.roof,x=r.lad-M.cam;if(x<-60||x>W+60)return;const L=M.lift,top=r.A[2],atBot=!L||L.y<.5,atTop=L&&L.y>=top-.5,d=L?L.d:0;
 Ls.push([LIFT.sz+.5,()=>liftDoors(x,112+LIFT.sz,atBot?d:0)]);Ls.push([LIFT.hz+.5,()=>liftDoors(x,112-top+LIFT.hz,atTop?d:0)])}
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
function rovaFg(T){const c=M.cam,a=snowAmt(c+W/2);if(a<=0)return;const n=Math.floor(SNOWF.n*a);vpar(0,()=>{
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
/* Latausasema ja kioski mitoitetaan hahmoihin: piirretään 1,5- ja 1,45-kertaisina maan tasosta */
const PROPSC={charger:1.5,kioski:1.45};
function chargerDraw(x,s,T){g.save();g.translate(x,108);g.scale(PROPSC.charger,PROPSC.charger);g.translate(-x,-108);chargerDraw0(x,s,T);g.restore()}
function kioskiDraw(x,T){g.save();g.translate(x,108);g.scale(PROPSC.kioski,PROPSC.kioski);g.translate(-x,-108);kioskiDraw0(x,T);g.restore()}
function chargerDraw0(x,s,T){const y=108,fr=s&&s.free;R('#2a2e38',x-5,y-26,10,26);R('#3a3e4a',x-5,y-26,3,26);R(fr?'#1a6a3a':'#5a1a1a',x-3,y-23,6,6);R('#0a0c12',x+5,y-16,4,2);g.strokeStyle='#1a1a1a';g.lineWidth=1.2;g.beginPath();g.moveTo(x+7,y-15);g.quadraticCurveTo(x+12,y-6,x+8,y);g.stroke();
 glow(x,y-20,10,fr?'80,255,140':'255,60,60',.5+.2*Math.sin(T*(fr?3:8)));
 if(!fr){R('#c8a040',x-3,y-12,6,5);g.strokeStyle='#c8a040';g.lineWidth=1;g.beginPath();g.arc(x,y-12,2.2,Math.PI,0);g.stroke()}
 labelBoard(fr?'VAPAA':'LUKITTU',x,y-29,fr?'#7dff9a':'#ff8a8a');
 if(fr&&s.t<1.2)for(let k=0;k<6;k++){const a=k*1.05+s.t*4,r=s.t*22;R('#bfffd0',x+Math.cos(a)*r,y-18+Math.sin(a)*r*.6,1.5,1.5)}}
function kioskiDraw0(x,T){const y=108;R('#6a2420',x-24,y-40,48,40);R('#8a3430',x-24,y-40,48,3);R('#8a6a40',x-18,y-32,36,14);R('#a8844e',x-18,y-32,36,3);for(let wx=x-15;wx<x+15;wx+=8)R('#5a4430',wx,y-27,5,9);R('#3a1a10',x-20,y-18,40,3);R('#e8f0ff',x-26,y-43,52,3);
 g.save();g.font='bold 6px monospace';g.textAlign='center';const on=Math.sin(T*4)>-.9;g.shadowBlur=on?5:0;g.shadowColor='#ffe23a';g.fillStyle=on?'#ffe23a':'#6a5a2a';g.fillText('KIOSKI',x,y-45);g.shadowBlur=0;g.font='bold 4px monospace';g.fillStyle='#3a1a10';g.fillText('POROBURGER',x,y-26);g.restore();glow(x,y-26,20,'255,200,120',.12)}
function penkkiDraw(x,T){const y=108;R('#4a3420',x-16,y-14,32,3);R('#2a1e14',x-14,y-11,2,11);R('#2a1e14',x+12,y-11,2,11);
 const o=idle(T,4);o.s=.62;o.qL=.45;o.qR=.45;o.blink=Math.sin(T*.7)>.6;o.tilt=.06+Math.sin(T*.5)*.05;o.item='h';o.aR=-.9;o.eR=-1;drawChar(SP.vh,x,y-4,o);
 R('#5a3e26',x-16,y-8,32,3);g.font='bold 6px monospace';zzz(x+6,y-40,T)}
/* Ovi on osa lähitaloa (samassa syvyydessä kuin pelaajat): julkisivu, varjostettu sivuseinä, lumireuna, yläkerran ikkunat ja maavarjo */
// Ovitalot ovat pelaajien tasossa, joten ne mitoitetaan hahmoihin (hahmo ~52 px): katutaso 68 px, yläkerros 56 px, ovi 24×58
const DOORW={w:64,gf:68,fl:56,dw:24,dh:58,wall:{RAPPU:'#4a3a40',KUNTOSALI:'#3a4048',PUB:'#4a3428'}};
function doorDraw(x,d,T){const y=104,op=d?d.op:0,W2=DOORW.w/2,h=DOORW.gf+DOORW.fl,top=y-h,wall=DOORW.wall[d?d.sign:'RAPPU']||'#4a3a40',dw=DOORW.dw,dh=DOORW.dh;
 ell(x,y+1,W2+6,2.5,'rgba(0,0,0,.35)');g.fillStyle='#1c1820';g.beginPath();g.moveTo(x+W2,top);g.lineTo(x+W2+7,top+5);g.lineTo(x+W2+7,y);g.lineTo(x+W2,y);g.fill();
 R(wall,x-W2,top,DOORW.w,h);R('rgba(0,0,0,.25)',x-W2,top+2,DOORW.w,2);R('#9aa6c8',x-W2-1,top-2,DOORW.w+2,2.5);
 // kerrosten välinen lista ja yläkerran ikkunat (ihmisen kokoiset)
 const fy=y-DOORW.gf;R('rgba(0,0,0,.3)',x-W2,fy-2,DOORW.w,3);R('rgba(255,255,255,.08)',x-W2,fy+1,DOORW.w,1);
 for(const wx of fitRow(x-W2+5,x+W2-5,16,6)){R('#1a1418',wx-1,top+11,18,30);R('#c8a468',wx,top+12,16,28);R('#1a1418',wx+7.5,top+12,1,28);R('rgba(0,0,0,.4)',wx,top+12,16,1.5);R('rgba(220,226,240,.3)',wx-1,top+40,18,1.2)}
 // katutaso: ovi keskellä, sen vieressä pieni ikkuna, sokkeli
 R('#1a1418',x+dw/2+4,fy+14,10,24);R('#a8844e',x+dw/2+5,fy+15,8,22);R('rgba(0,0,0,.35)',x-W2,y-5,DOORW.w,5);
 R('#1a1418',x-dw/2-1,y-dh-1,dw+2,dh+1);if(op>0){R('#a8844e',x-dw/2,y-dh,dw,dh);R('#c49a5a',x-dw/2,y-dh,dw,4);glow(x,y-dh/2,18,'255,190,110',.18*op)}
 const dwc=dw*(1-op*.85);R('#6a3a22',x-dw/2,y-dh,dwc,dh);R('#5a3018',x-dw/2+2,y-dh+4,dwc-4,dh*.4);R('#c8a040',x-dw/2+dwc-4,y-dh/2,2,2);
 labelBoard(d?d.sign:'',x,y-dh-4,'#ffe8a8')}
function rovaDraw(T){const c=M.cam,st=M.rv||RV_ST;for(const d of (M.rvD||RV_DOOR)){const x=d.x-c;if(x>-30&&x<W+30)doorDraw(x,M.rvD?d:null,T)}mallSignsDraw();liftBack(T);for(const s of st){const x=s.x-c;if(x>-20&&x<W+20)chargerDraw(x,M.rv?s:null,T)}
 const kx=RV.kioski-c;if(kx>-40&&kx<W+40)kioskiDraw(kx,T);const px=RV.penkki-c;if(px>-30&&px<W+30)penkkiDraw(px,T)}
