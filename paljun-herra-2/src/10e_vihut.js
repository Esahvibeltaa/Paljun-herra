/* Paljun Herra 2 – Tavallisten vihollisten taistelutekoäly (mätkintä).
   - Vuorot: korkeintaan ENG.max vihollista hyökkää samaan kohteeseen kerrallaan, muut odottavat kehällä ja sivuaskeltavat.
   - Saarto: hyökkäävät asettuvat eri puolille kohdetta (toinen eteen, toinen selän taakse), jos ruudussa on tilaa.
   - Torjunta: kun Esa aloittaa iskun edessä, vihollinen voi nostaa suojan (ylä- ja keskitason iskut, ei matalia eikä
     ilmaiskuja). Torjuttu isku tekee vain murto-osan vahingosta eikä horjauta, ja torjuja vastaa nopeasti.
   - Rangaistus: kun Esa palautuu ohi lyödystä iskusta, vihollinen iskee reaktioajan jälkeen (ei jäykkyyden aikana, ettei synny lukkoa).
   - Sarjat ja vetäytyminen: osa iskuista jatkuu toisella iskulla, iskun jälkeen osa perääntyy ja antaa vuoron toiselle.
   Luonteet tyypeittäin (EAI): haalarimies sarjalyöjä, takatukka lyö-ja-pakene, Sali-Make torjuu paljon. */
const ENG={max:2,wait:58,strafe:1.6,wz:12,edge:22,rot:.5};
const EAI_D={combo:.3,block:.2,back:.3,react:.26,th:[1.0,.9]};
const EAI={hm:{combo:.45,block:.22,back:.25},tk:{combo:.3,block:.12,back:.6,react:.2,th:[.85,.8]},sm:{combo:.2,block:.3,back:.15,react:.32,th:[1.3,.9]},
 rr:{block:0,combo:0,back:0},ms:{block:.15}};
const BLOCK={t:.42,dmg:.15,push:45};
function eai(f){return f.ai||(f.ai=Object.assign({},EAI_D,EAI[f.kind]))}

/* Reagointi Esan iskun alkuun: suoja ylös, jos isku tulee edestä ja ylä- tai keskitasolle */
function eaiReact(f,t,dx,dz){if(t!==M.e||!t.atk||t.atk===f.seen)return false;f.seen=t.atk;const m=t.atk.m,A=eai(f);
 if(m.h==='lo'||m.air||m.fx||Math.sign(f.x-t.x)!==t.face||Math.abs(dx)>48||Math.abs(dz)>9||Math.random()>=A.block)return false;
 f.st='block';f.blk=BLOCK.t;f.vx=f.vz=0;f.face=Math.sign(dx)||f.face;return true}
/* Torjuttu isku (kutsutaan mjDamage-funktiosta): pieni vahinko, työntö taaksepäin, nopea vastaisku */
function eaiBlocked(a,d,m){if(d.st!=='block'||a.team===d.team||m.n==='heitto'||m.h==='lo'||Math.sign(a.x-d.x)!==d.face)return false;
 d.hp=Math.max(1,d.hp-m.d*BLOCK.dmg);d.vx=-d.face*BLOCK.push;d.blk=Math.max(d.blk,.15);d.th=Math.min(d.th,eai(d).react);
 M.fx.push({x:(a.x+d.x)/2,y:112+d.z-34-(d.base||0),t:0,txt:'TORJUNTA!'});tn(900,700,.06,.12,'square');nz(.05,'highpass',3000,.08);return true}

/* Liikkuminen ja hyökkäys (tyyppikohtaisten erikoisliikkeiden jälkeen) */
function eaiMove(f,t,dx,dz,dt,kt){const A=eai(f),sp=f.spd*(DIFF?1.15:1);f.face=Math.sign(dx)||f.face;
 if(f.bk>0){f.bk-=dt;f.vx=-Math.sign(dx||1)*sp*1.1;f.vz=0;f.st='walk';f.wk+=dt;return}
 const others=M.ents.filter(x=>x!==f&&x.team==='e'&&!x.dead&&x.eng&&x.tgt===t);
 if(!f.eng&&others.length<ENG.max){f.eng=1;const s0=others.length?Math.sign(others[0].x-t.x):0;f.side=s0?-s0:(Math.sign(f.x-t.x)||1)}
 if(!f.eng)f.side=Math.sign(f.x-t.x)||1;
 // saarto vain, jos kohdepaikka mahtuu ruutuun; muuten samalle puolelle
 const want=f.slot||22,lo=M.cam+ENG.edge,hi=M.cam+320-ENG.edge;let side=f.side,tx=t.x+side*(f.eng?want:ENG.wait+(f.slot||0)%8);
 if(tx<lo||tx>hi){side=-side;f.side=side;tx=t.x+side*(f.eng?want:ENG.wait)}tx=rfClamp(f,tx);
 f.st2=(f.st2||0)-dt;if(f.st2<=0){f.st2=ENG.strafe*(.7+Math.random()*.6);f.wz=(Math.random()*2-1)*ENG.wz}
 let tz=f.eng?t.z:t.z+f.wz;if(f.eng&&Math.sign(f.x-t.x)!==side&&Math.abs(dx)<26)tz=t.z+(t.z>20?-14:14);// kierretään ohi, ei läpi
 tz=Math.max(0,Math.min(40,tz));const ex=tx-f.x,ez=tz-f.z;
 // hyökkäysvuorossa oleva lyö aina, kun ulottuu (myös liikkeestä); ajastin käy koko vuoron ajan
 if(f.eng){const ta=t.atk;if(ta&&ta.t>ta.m.st+ta.m.ac&&!ta.hits.size)f.th=Math.min(f.th,A.react);// rangaistus ohi lyödystä (ei jäykkyydestä: ei lukkoa)
  f.th-=dt;if(f.th<=0&&Math.abs(dx)<=want+8&&Math.abs(dz)<6){f.th=(A.th[0]+Math.random()*A.th[1])*(DIFF?.75:1);
   const list=kt.atk||['punch','kick','punch'];if(Math.random()<A.combo)f.cq=[pick(list)];mStart(f,pick(list));return}}
 if(Math.abs(ex)>3||Math.abs(ez)>3){f.vx=Math.abs(ex)>3?Math.sign(ex)*sp*(f.eng?1:.6):0;f.vz=Math.abs(ez)>3?Math.sign(ez)*sp*.6:0;f.st='walk';f.wk+=dt;return}
 f.vx=f.vz=0;f.st='idle'}
/* Iskun päätyttyä: sarjan jatko, muuten mahdollinen vetäytyminen ja vuoron luovutus odottajalle */
function eaiAfter(f){if(f.dead||f.st!=='idle')return;const A=eai(f);
 if(f.cq&&f.cq.length){mStart(f,f.cq.shift());return}
 if(Math.random()<A.back){f.bk=.4+Math.random()*.25;if(M.ents.some(x=>x!==f&&x.team==='e'&&!x.dead&&!x.eng)&&Math.random()<ENG.rot)f.eng=0}}
