/* Paljun Herra 2 – Pelin kulku: alkunäytös → nimiruutu → mökin piha (pelattava) → road trip -näytös → pelattavissa pian; mätkintäkentät → pomotaistelu (1v1) → loppu */

/* Prototyypin harjoituskenttä. Viholliset ovat ykkösosan paikkamerkkejä ja suunnitellaan uusiksi. */
const LT={n:1,name:'harjoitusalue',theme:'city',hud:'HARJOITUS',len:1200,
 waves:[{x:260,list:['rn','rn']},{x:600,list:['rn','pasi','rn']},{x:950,list:['tp','rn','pasi','rn']}],
 bins:[[200,30,'c'],[460,10,'v'],[760,26,'p'],[1040,14,'k']],
 msg:['Harjoitusalue','Viholliset ovat paikkamerkkejä.'],done:['Harjoitus suoritettu!','Napauta: pomotaistelu.']};
LV.length=1;LV.push(LT);

const START_HS=2;

/* Tarkistuspisteet: päävalikon JATKA ja kehitysversion kenttävalinta. go = käynnistys, skill = taidot opittu ennen tätä */
const CHK={rova:{nm:'ROVANIEMI',go:()=>startRova()},santa:{nm:'SANTAPARK',go:()=>startSanta()},pukki:{nm:'PAJAKYLÄN PUKKI',go:()=>startPukki()}};
const SAVE_KEY='ph2_cp';
function saveGet(){try{const v=localStorage.getItem(SAVE_KEY);return CHK[v]?v:null}catch(x){return null}}
function saveSet(k){try{localStorage.setItem(SAVE_KEY,k)}catch(x){}}
/* Aloitus tarkistuspisteestä: elämät ja humala alkuarvoihin, taidot sen mukaan, mitä ennen pistettä on opittu */
function startAt(k){LIVES=3;for(const q in PTS)PTS[q]=0;B.h=0;B.hs=START_HS;S2.outfit=2;musicStop();showPad(false);TI.sub=null;CHK[k].go()}
/* Päävalikko (nimiruutu): avautuu sivun latautuessa, pelin loputtua ja taukovalikosta */
function showMenu(){stage=1;state='title';TI.on=false;TI.t=0;TI.sel=0;TI.sub=null;showPad(false);musicStop();setPause(false)}
function startGame(){LIVES=3;for(const k in PTS)PTS[k]=0;B.h=0;B.hs=START_HS;S2.outfit=2;musicStop();startCut(INTRO_CUT,JULKINEN?showSoon:startPiha,true)}
/* Toistaiseksi alkunäytöksen jälkeen vain musta ruutu: pelattavissa pian (kenttä ja pomo odottavat uusia vihollisia) */
function showSoon(){stage=9;state='soon';ot=0;showPad(false);musicStop()}
/* Musta loppuruutu: "pelattavissa pian" (lukittu julkinen versio) tai "jatkoa seuraa" (Rysty-Ranen jälkeen, dramaattinen teema) */
const SOON_TXT={soon:'PELATTAVISSA PIAN',tbc:'JATKOA SEURAA'};
function showTbc(){showSoon();state='tbc';musicStart('js')}
function drawSoon(){R('#000',0,0,W,H);const tbc=state==='tbc',fade=tbc?3:1.2;g.save();g.globalAlpha=Math.min(1,Math.max(0,ot-(tbc?1.5:0))/fade);g.textAlign='center';g.font=tbc?'bold 14px monospace':'bold 10px monospace';g.fillStyle=tbc?'#ffe8c0':'#e8eeff';g.fillText(SOON_TXT[tbc?'tbc':'soon']+'...'.slice(0,1+Math.floor(ot*1.5)%3),W/2,H/2+3);g.restore()}
// Rovaniemen (ja Rysty-Ranen) jälkeen: jatkoa seuraa (Santapark tulee myöhemmin)
// Rovaniemen jälkeen Peran kyyti Santaparkkiin (testiversio päättyy Raneen), Santaparkin jälkeen pukki
function onLevelsDone(){if(M.L===LR){if(KEHITYS)startCut(SANTA_MATKA_CUT,startSanta);else showTbc()}else if(M.L===LSP)startPukki();else startFight()}
function onBossWon(){stage=8;state='end';ot=0;TI.on=false;PTS.lives=LIVES*100;showPad(false);musicStop();musicStart('t');msgL=['Prototyyppi läpäisty!']}
function restartAll(){showMenu()}

function step(dt){if(stage===10){stepPiha(dt);return}if(stage===9){ot+=dt;return}if(stage===6){stepCut(dt);return}if(stage===7){stepMJ(dt);return}if(stage===5){stepFight(dt);return}
 musicTick();if(stage===8)ot+=dt;TI.t+=dt;if(TI.f>0)TI.f=Math.max(0,TI.f-dt);
 flakes.forEach(f=>{f.y+=f.v*dt;f.x+=Math.sin(f.p+f.y/20)*8*dt;if(f.y>H){f.y=0;f.x=Math.random()*W}})}

function draw(T){if(stage===10){drawPiha(T);return}if(stage===9){drawSoon();return}if(stage===6){drawCut(T);return}if(stage===7){drawMJ(T);return}if(stage===5){drawFight(T);return}drawTitle(T);
 if(stage===8)box3('PROTOTYYPPI LÄPÄISTY!',['Pisteet: '+ptsSum(),'Uudet viholliset ja tarina tulevat seuraavaksi.',ot>1?'Napauta: alkuun.':''])}

/* Napautus/painallus: tauko, vaiheen oma käsittely tai intro */
function act(e){const tap=e&&e.target===cv&&e.clientX!==undefined;
 if(PAUSED){if(tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(x>=96&&x<=224){if(y>=118&&y<=134){openCfg();return}if(y>=136&&y<=150&&stage!==1){showMenu();return}}}setPause(false);return}
 audioInit();if(stage===9){if(ot>(state==='tbc'?5:2.5))showMenu();return}if(stage===10){actPiha(e);return}if(stage===6){actCut(e);return}if(stage===7){act7(e);return}if(stage===5){act5(e);return}if(stage===8){if(ot>1)restartAll();return}
 if(state==='title'){if(TI.on&&tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height,h=titleHit(x,y);if(h<0)return;TI.sel=h}titlePress()}}

cv.addEventListener('pointerdown',act);
addEventListener('keydown',e=>{if(e.code==='Space'||e.key==='Enter'){e.preventDefault();if(!e.repeat)act()}});
document.getElementById('m').addEventListener('click',e=>{mute=!mute;e.target.textContent='Äänet: '+(mute?'pois':'päällä');if(master)master.gain.value=mute?0:.8;audioInit()});
['pointerdown','touchend','click','keydown'].forEach(ev=>addEventListener(ev,()=>audioInit(),{passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&stage!==1&&stage!==8&&stage!==9&&stage!==10)setPause(true)});

showMenu();
requestAnimationFrame(loop);
