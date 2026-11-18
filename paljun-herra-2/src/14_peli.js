/* Paljun Herra 2 – Pelin kulku: intro → alkunäytös → mätkintäkentät → pomotaistelu (1v1) → loppu */

/* Prototyypin harjoituskenttä. Viholliset ovat ykkösosan paikkamerkkejä ja suunnitellaan uusiksi. */
const LT={n:1,name:'harjoitusalue',theme:'city',hud:'HARJOITUS',len:1200,
 waves:[{x:260,list:['rn','rn']},{x:600,list:['rn','pasi','rn']},{x:950,list:['tp','rn','pasi','rn']}],
 bins:[[200,30,'c'],[460,10,'v'],[760,26,'p'],[1040,14,'k']],
 msg:['Harjoitusalue','Viholliset ovat paikkamerkkejä.'],done:['Harjoitus suoritettu!','Napauta: pomotaistelu.']};
LV.length=1;LV.push(LT);

const START_HS=2;

function startGame(){LIVES=3;for(const k in PTS)PTS[k]=0;B.h=0;B.hs=START_HS;S2.outfit=2;musicStop();startCut(INTRO_CUT,showSoon,true)}
/* Toistaiseksi alkunäytöksen jälkeen vain musta ruutu: pelattavissa pian (kenttä ja pomo odottavat uusia vihollisia) */
function showSoon(){stage=9;state='soon';ot=0;showPad(false);musicStop()}
function drawSoon(){R('#000',0,0,W,H);g.save();g.globalAlpha=Math.min(1,ot/1.2);g.textAlign='center';g.font='bold 10px monospace';g.fillStyle='#e8eeff';g.fillText('PELATTAVISSA PIAN'+'...'.slice(0,1+Math.floor(ot*1.5)%3),W/2,H/2+3);g.restore()}
function onLevelsDone(){startFight()}
function onBossWon(){stage=8;state='end';ot=0;TI.on=false;PTS.lives=LIVES*100;showPad(false);musicStop();musicStart('t');msgL=['Prototyyppi läpäisty!']}
// Ei päävalikkoa vielä: alkuun = alkunäytös
function restartAll(){showPad(false);musicStop();startGame()}

function step(dt){if(stage===9){ot+=dt;return}if(stage===6){stepCut(dt);return}if(stage===7){stepMJ(dt);return}if(stage===5){stepFight(dt);return}
 musicTick();if(stage===8)ot+=dt;TI.t+=dt;if(TI.f>0)TI.f=Math.max(0,TI.f-dt);
 flakes.forEach(f=>{f.y+=f.v*dt;f.x+=Math.sin(f.p+f.y/20)*8*dt;if(f.y>H){f.y=0;f.x=Math.random()*W}})}

function draw(T){if(stage===9){drawSoon();return}if(stage===6){drawCut(T);return}if(stage===7){drawMJ(T);return}if(stage===5){drawFight(T);return}drawTitle(T);
 if(stage===8)box3('PROTOTYYPPI LÄPÄISTY!',['Pisteet: '+ptsSum(),'Uudet viholliset ja tarina tulevat seuraavaksi.',ot>1?'Napauta: alkuun.':''])}

/* Napautus/painallus: tauko, vaiheen oma käsittely tai intro */
function act(e){const tap=e&&e.target===cv&&e.clientX!==undefined;
 if(PAUSED){if(tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(y>=118&&y<=134&&x>=96&&x<=224){openCfg();return}}setPause(false);return}
 audioInit();if(stage===9)return;if(stage===6){actCut(e);return}if(stage===7){act7(e);return}if(stage===5){act5(e);return}if(stage===8){if(ot>1)restartAll();return}
 if(state==='title'){if(TI.on&&tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height,h=titleHit(x,y);if(h<0)return;TI.sel=h}titlePress()}}

cv.addEventListener('pointerdown',act);
addEventListener('keydown',e=>{if(e.code==='Space'||e.key==='Enter'){e.preventDefault();act()}});
document.getElementById('m').addEventListener('click',e=>{mute=!mute;e.target.textContent='Äänet: '+(mute?'pois':'päällä');if(master)master.gain.value=mute?0:.8;audioInit()});
['pointerdown','touchend','click','keydown'].forEach(ev=>addEventListener(ev,()=>audioInit(),{passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&stage!==1&&stage!==8&&stage!==9)setPause(true)});

startGame();
requestAnimationFrame(loop);
