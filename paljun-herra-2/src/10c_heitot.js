/* Paljun Herra 2 – Heitot (sama sääntö kaikille):
   1) Perille mennyt isku horjauttaa osuman saaneen (stag-aika, puolustus auki).
   2) Lyöntinappi pohjaan heti perään ja pidetään hetki (GRAB.hold) → kiinniotto (hiuksista, kauluksesta).
   3) Pidon aikana suuntanappi valitsee heiton suunnan: vasen / oikea, ylös = ruudusta poispäin (kadun taakse),
      alas = ruutua kohti. Ilman suuntaa heitetään eteenpäin.
   4) Lyöntinappi löysätään → heitto lähtee. Lennossa oleva heitetty kaataa samalla tiellä olevat.
   Vihollisista osa (GRAB.kinds) käyttää samaa sääntöä Esaan: kun Esa on horjahtanut, vihollinen voi napata ja heittää. */
/* enemyP = vihollisen nappausalttius horjahdusikkunassa (1/s), cool = Esan suoja-aika otteen jälkeen (s): ehtii vaihtaa paikkaa */
const GRAB={stag:.75,hold:.12,reach:24,dz:7,maxHold:2.4,dmg:16,side:220,depth:95,up:120,splash:9,enemyP:1.4,cool:4,enemyHold:.85,lift:6,
 kinds:['hm','tk','sm','rn','pe','ta','tt']};
// Lyöntinapin pohjassapito: näppäimistö (J), kosketusnappi LYÖNTI ja peliohjaimen lyöntinappi
const PHOLD={p:0};
addEventListener('keydown',e=>{if(!e.repeat&&(e.key==='j'||e.key==='J'))PHOLD.p=1});
addEventListener('keyup',e=>{if(e.key==='j'||e.key==='J')PHOLD.p=0});
{const b=pad.querySelector('#bp');b.addEventListener('pointerdown',()=>PHOLD.p=1);['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>PHOLD.p=0))}
function punchHeld(){return PHOLD.p||!!gpPrev[GB.punch]}

/* Esan lyönti, kun edessä on horjahtanut vastustaja: odotetaan hetki, pidetäänkö nappi pohjassa (kiinniotto) vai oliko se näpäytys (lyönti) */
function grabTarget(e){return M.ents.find(x=>x.team==='e'&&!x.dead&&x.stag>0&&!(KT[x.kind]||{}).heavy&&['hit','idle','walk','atk'].includes(x.st)&&Math.sign(x.x-e.x)===e.face&&Math.abs(x.x-e.x)<GRAB.reach&&Math.abs(x.z-e.z)<GRAB.dz&&Math.abs((x.base||0)-(e.base||0))<8)}
function startGrab(g,v){g.grab=v;v.held=g;g.atk=null;v.atk=null;g.st='grab';v.st='held';g.gt=0;g.vx=g.vz=v.vx=v.vz=0;v.stag=0;g.gdir=null;g.face=Math.sign(v.x-g.x)||g.face;
 nz(.12,'bandpass',900,.12,500);tn(220,160,.1,.08,'square');if(g===M.e)msgL=['KIINNI!','Valitse suunta ja päästä lyöntinappi.'];else if(v===M.e){msgL=['Esa joutui otteeseen!'];M.say=[g,pick(['Tuu tänne!','Hiuksista kiinni!','Nyt lentää!'])];M.sayT=1.6}}
/* Heitto valittuun suuntaan; vahinko kulkee yhteisen mjDamage-funktion kautta (kaatuminen, pisteet, häviö) */
function doThrow(g,v,dir){if(v===M.e)v.grabT=GRAB.cool;const dx=dir==='l'?-1:dir==='r'?1:g.face;g.grab=null;v.held=null;g.st='idle';g.atk=null;g.face=dx;v.x=g.x+dx*8;
 mjDamage({team:g.team,x:g.x-dx*4,face:dx,dm:g.dm||1,cmb:0},v,{d:GRAB.dmg,n:'heitto',h:'mid',kd:1});
 if(v.st==='fly'){v.vy=GRAB.up;if(dir==='u'||dir==='d'){v.vx=dx*40;v.vz=dir==='u'?-GRAB.depth:GRAB.depth}else{v.vx=dx*GRAB.side;v.vz=0}v.thrown=g.team;v.hitSet=new Set([g])}
 M.fx.push({x:v.x,y:112+v.z-50-(v.base||0),t:0,big:1,txt:'HEITTO!'});if(g===M.e)kiai(g);crowd('ooh')}
function grabStep(f,dt){if(f.stag>0)f.stag-=dt;if(f.grabT>0)f.grabT-=dt;
 // Esan odottava kiinniotto: pito → kiinni, näpäytys → tavallinen lyönti
 if(f.pg){f.pg.t+=dt;const v=f.pg.tgt;if(!punchHeld()||v.dead||v.st==='fly'){f.pg=null;if(!f.atk&&['idle','walk'].includes(f.st))mStart(f,'punch')}else if(f.pg.t>=GRAB.hold){f.pg=null;startGrab(f,v)}}
 if(f.st==='grab'){const v=f.grab;if(!v||v.dead||v.st!=='held'){f.grab=null;f.st='idle';return}f.vx=f.vz=0;f.gt+=dt;
  v.x=f.x+f.face*13;v.z=f.z+.1;v.base=f.base||0;v.y=GRAB.lift;v.vx=v.vz=v.vy=0;
  if(f===M.e){const k=keysNow();if(k.l)f.gdir='l';else if(k.r)f.gdir='r';else if(k.u)f.gdir='u';else if(k.d)f.gdir='d';if(!punchHeld()||f.gt>=GRAB.maxHold)doThrow(f,v,f.gdir)}
  else if(f.gt>=GRAB.enemyHold)doThrow(f,v,f.gdir)}
 if(f.st==='held'&&(!f.held||f.held.st!=='grab')){f.held=null;f.st='idle';f.y=0;if(f===M.e)f.grabT=GRAB.cool}
 // heitetty kaataa tiellä olevat omat joukkonsa (keilaus)
 if(f.thrown){if(f.st!=='fly'){f.thrown=null;f.hitSet=null}else for(const d of M.ents){if(d===f||d.team!==f.team||d.dead||f.hitSet.has(d)||['fly','down','ko','held'].includes(d.st))continue;
  if(Math.abs(d.x-f.x)<12&&Math.abs(d.z-f.z)<8){f.hitSet.add(d);mjDamage({team:f.thrown,x:f.x-Math.sign(f.vx||1)*4,face:Math.sign(f.vx)||1,dm:1,cmb:0},d,{d:GRAB.splash,n:'heitto',h:'mid',kd:1})}}}
 // vihollinen nappaa horjahtaneen Esan samalla säännöllä
 const e=M.e;if(f.team==='e'&&!f.dead&&GRAB.kinds.includes(f.kind)&&['idle','walk'].includes(f.st)&&!f.atk&&e.stag>0&&!(e.grabT>0)&&['hit','idle','walk'].includes(e.st)&&!e.inLift
  &&Math.abs(e.x-f.x)<GRAB.reach&&Math.abs(e.z-f.z)<GRAB.dz&&Math.abs((e.base||0)-(f.base||0))<8&&Math.random()<dt*GRAB.enemyP){startGrab(f,e);f.gdir=pick(['f','f','u','d'])}}
/* Asennot: nappaaja kädet edessä otteessa, pidetty sätkii ilmassa */
function grabPose(f,o,T){if(f.st==='grab')Object.assign(o,{aL:-1.7,eL:-.4,aR:-1.8,eR:-.3,tilt:-.08,lL:.3,lR:-.2,kL:.3,kR:.2});
 else if(f.st==='held')Object.assign(o,{aL:2.1+Math.sin(T*16)*.4,eL:Math.sin(T*13)*.5,aR:-2.1+Math.sin(T*15)*.4,eR:Math.sin(T*12)*.5,lL:.4+Math.sin(T*14)*.4,lR:-.3+Math.sin(T*11)*.4,kL:.6,kR:.5,tilt:-.15,blink:true})}
