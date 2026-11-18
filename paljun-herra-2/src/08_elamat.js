/* Paljun Herra 2 – Elämät (pohja: Paljun herra 1) */
let LIVES=3,lifeLoss=-9;
function loseLife(){LIVES=Math.max(0,LIVES-1);lifeLoss=performance.now()/1000}
const RT=()=>LIVES>0?'Elämiä jäljellä: '+LIVES+'. Napauta: uusi yritys.':'GAME OVER! Pisteet: '+ptsSum()+'. Napauta: alkuun.';
function heartAt(x,y,c,s){g.save();g.translate(x+3,y+3);g.scale(s,s);g.fillStyle=c;g.strokeStyle='rgba(30,10,20,.8)';g.lineWidth=.5;g.beginPath();g.moveTo(0,2.6);g.bezierCurveTo(-4.2,-.9,-2.4,-4.6,0,-2);g.bezierCurveTo(2.4,-4.6,4.2,-.9,0,2.6);g.fill();g.stroke();g.restore()}
function drawLives(){if((stage===1&&(state==='ready'||state==='title'))||stage===6)return;const T=performance.now()/1000,x0=(stage===5||stage===7)?27:5,y0=(stage===5||stage===7)?23.5:14,fl=T-lifeLoss;
 for(let i=0;i<3;i++){const lost=i===LIVES&&fl<2;heartAt(x0+i*8,y0,i<LIVES||(lost&&Math.sin(fl*20)>0)?'#ff3a5a':'rgba(70,70,90,.55)',lost?1+.5*Math.max(0,1-fl):1)}}
