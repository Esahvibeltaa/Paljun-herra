/* Paljun Herra 2 – Mökin piha: pelattava hetki nimiruudun jälkeen. Esa kävelee napautettuun kohtaan ja käyttää kohteen;
   Tesla vie Peran selostukseen ja road tripille (välinäytös). Kaverit odottavat auton luona ja jutustelevat satunnaisesti. */
// Kohteet: osuma-alue (ruudun koordinaatit), mihin Esa kävelee (go) ja nimilappu
const PZH=[
 {id:'ovi',x0:92,x1:118,y0:68,y1:106,go:105,name:'OVI'},
 {id:'palju',x0:146,x1:190,y0:86,y1:108,go:168,name:'PALJU'},
 {id:'kupari',x0:121,x1:139,y0:102,y1:118,go:130,name:'KUPARI'},
 {id:'tesla',x0:220,x1:298,y0:88,y1:120,go:240,name:'TESLA'}];
// Säädettävät: Esan kävelynopeus (px/s), liikealue ja maataso, jutustelun väli (s), viestin kesto (s), kyytiin nousun väli ja kokonaisaika (s)
const PZK={spd:38,xMin:30,xMax:300,y:113,talkMin:5,talkVar:4,msgT:4,bubT:3.2,board:.4,leave:2.2,near:40,humala:15};
// Kaverit auton vieressä: sprite, x ja vaihe (idle-animaation tahdistus)
const PZF=[[SP.w,198,0],[SP.a,211,1],[SP.k,224,2]];
// Jutustelu: puhuja (0 Hempukka, 1 Aapeli, 2 Kermis, 3 Pera autosta) ja repliikki
const PZN=['Hempukka','Aapeli','Kermis','Pera'];
const PIHA_JUTUT=[[0,'Esa! Ota kaulahuivi.'],[1,'Latausasemat ei vapauta itseään!'],[2,'Mä jäädyn tähän kiinni.'],[1,'Pera, onks tässä istuinlämmitys?'],
 [2,'Joku sanoi, että Rovaniemellä on yökebab.'],[0,'Esa kävelee kuin pingviini.'],[3,'Tesla ei odota! ...Siis odottaa, se on parkissa. Mutta silti!'],
 [3,'Takasiipi ei ole teipattu. Se on aerodynaamisesti kiinnitetty.'],[2,'Esa, sun tonttulakki on väärinpäin.'],[0,'Mä otan ikkunapaikan.'],[1,'Kuka muisti sammuttaa paljun?']];
// Kohteiden käyttö: Esan kommentti (kupari ja tesla käsitellään erikseen)
const PZSAY={ovi:'Kaikki on mukana. Paitsi järki.',palju:'Palju odottaa. Ensin pelastetaan Sam Disco.',kupari:'Aamiainen.',tesla:'Etupenkki on krapulaisen oikeus.'};
const PZ={ex:60,tx:60,face:1,go:null,msg:null,mt:0,talk:0,bub:null,bt:0,can:true,leave:0,gone:0,kl:0,kr:0};

function startPiha(){stage=10;state='piha';Object.assign(PZ,{ex:60,tx:60,face:1,go:null,msg:null,mt:0,talk:PZK.talkMin,bub:null,bt:0,can:true,leave:0,gone:0,kl:0,kr:0});showPad(false);msgL=['']}
function pzSay(who,txt){PZ.msg=[who,txt];PZ.mt=PZK.msgT}
function pzUse(h){PZ.face=1;if(h.id==='kupari'){PZ.can=false;B.h=Math.min(100,B.h+PZK.humala);sCan()}
 if(h.id==='tesla'){PZ.leave=1e-6;sDoor();pzSay('Esa',PZSAY.tesla);return}pzSay('Esa',PZSAY[h.id])}
function pzHot(){return PZH.filter(h=>h.id!=='kupari'||PZ.can)}
function stepPiha(dt){musicTick();muteAmb();cutMusic('n');
 if(PZ.leave){const n=Math.min(PZF.length,Math.floor((PZ.leave+=dt)/PZK.board));if(n>PZ.gone){PZ.gone=n;sDoor()}if(PZ.leave>=PZK.leave)startCut(MATKA_CUT,showSoon);return}
 if(PZ.kl||PZ.kr){PZ.tx=PZ.ex+(PZ.kr-PZ.kl)*20;PZ.go=null}
 PZ.tx=Math.max(PZK.xMin,Math.min(PZK.xMax,PZ.tx));const d=PZ.tx-PZ.ex;
 if(Math.abs(d)>.5){PZ.face=Math.sign(d);PZ.ex+=Math.sign(d)*Math.min(Math.abs(d),PZK.spd*dt)}else if(PZ.go){const h=PZ.go;PZ.go=null;pzUse(h)}
 if(PZ.mt>0)PZ.mt-=dt;if(PZ.bt>0)PZ.bt-=dt;
 if((PZ.talk-=dt)<=0){PZ.talk=PZK.talkMin+Math.random()*PZK.talkVar;PZ.bub=pick(PIHA_JUTUT);PZ.bt=PZK.bubT;if(AC)sTalk(PZ.bub[0]===2)}}
/* Napautus: kohde → Esa kävelee sen luo ja käyttää sitä; muu kohta → Esa kävelee sinne. Ilman osoitinta (Enter, välilyönti) lähin kohde. */
function actPiha(e){if(PZ.leave)return;const tap=e&&e.target===cv&&e.clientX!==undefined;
 if(tap){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;if(y>CP.y+CP.h)return;
  const h=pzHot().find(h=>x>=h.x0&&x<=h.x1&&y>=h.y0&&y<=h.y1);if(h){PZ.go=h;PZ.tx=h.go}else{PZ.go=null;PZ.tx=x}return}
 let best=null;for(const h of pzHot())if(Math.abs(h.go-PZ.ex)<PZK.near&&(!best||Math.abs(h.go-PZ.ex)<Math.abs(best.go-PZ.ex)))best=h;if(best){PZ.go=best;PZ.tx=best.go}}
const PZKEYS={ArrowLeft:'kl',a:'kl',A:'kl',ArrowRight:'kr',d:'kr',D:'kr'};
['keydown','keyup'].forEach(ev=>addEventListener(ev,e=>{const k=PZKEYS[e.key];if(k&&stage===10){PZ[k]=ev==='keydown'?1:0;e.preventDefault()}}));

function drawPiha(T){const t=performance.now()/1000;panelFrame(()=>{cutLayer('pihaSky',pihaSky);
 auroraSky('piha',T,CP.x,CP.w,CP.y+6,9,7,41,2,15,.4);
 cutLayer('piha',pihaBg);
 glow(54,74,22,'255,190,100',.35);glow(105,88,22,'255,200,120',.3);
 for(let k=0;k<5;k++){const p=(t*.25+k/5)%1;R(`rgba(200,205,225,${.5*(1-p)})`,112+Math.sin(p*5+k)*4+p*10,28-p*22,2+p*5,2+p*5)}
 for(let k=0;k<4;k++){const p=(t*.3+k/4)%1;R(`rgba(225,232,255,${.4*(1-p)})`,152+k*9+Math.sin(p*6+k)*3,88-p*20,3+p*5,3+p*5)}
 g.save();g.translate(PIHA.car,114);teslaCar(T,t,true);g.restore();
 if(PZ.can){g.save();g.translate(130,111);g.rotate(1.45);can(-3.5,-6);g.restore()}
 PZF.forEach(([sp,x,ph],i)=>{if(i<PZ.gone)return;const o=idle(T,ph);o.s=.6;o.tilt-=.04*ph;drawChar(sp,x,PZK.y-1+ph%2,o)});
 if(!PZ.leave){const mv=Math.abs(PZ.tx-PZ.ex)>.5,o=mv?walk(T,PZ.ex/30,0):idle(T,0);o.s=.62;o.flip=PZ.face<0;o.tilt=(o.tilt||0)+Math.sin(T*1.7)*.07;drawChar(SP.e[2],PZ.ex,PZK.y+2,o)}
 g.save();g.font='bold 5px monospace';g.textAlign='center';for(const h of pzHot()){const y=h.id==='tesla'?h.y0+2:h.y0-2;g.fillStyle='rgba(0,0,0,.55)';g.fillRect((h.x0+h.x1)/2-13,y-5,26,7);g.fillStyle='#e8eeff';g.fillText(h.name,(h.x0+h.x1)/2,y)}g.restore();
 if(PZ.bt>0&&PZ.bub){const [w,txt]=PZ.bub,x=w===3?PIHA.car:PZF[w][1];g.save();g.globalAlpha=Math.min(1,PZ.bt*2);sbub(x,w===3?78:70,PZN[w]+': '+txt);g.restore()}
 for(const f of flakes)R('rgba(255,255,255,.8)',CP.x+f.x*CP.w/W,CP.y+f.y*CP.h/H,1,1)});
 if(PZ.mt>0&&PZ.msg)textArea(PZ.msg[0],PZ.msg[1],999);
 else textArea('',INP==='touch'?'Napauta kohdetta: Esa kävelee sinne ja käyttää sitä. Tesla vie matkaan.':INP==='gp'?'Liikuta osoitinta ja paina '+gpG(GB.sel)+': Esa kävelee kohteeseen. Tesla vie matkaan.':'Klikkaa kohdetta tai kävele nuolilla, Enter käyttää lähintä. Tesla vie matkaan.',999);
 audioHint();if(PZ.leave)R(`rgba(0,0,0,${Math.min(1,PZ.leave/PZK.leave)})`,0,0,W,H)}
