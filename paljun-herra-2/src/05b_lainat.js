/* Paljun Herra 2 – Lainatut apufunktiot ykkösosasta (laatikot, Cessnan runko, tanssi, pullot, musiikkidata) */
function mkLg(y0,y1,st){const q=g.createLinearGradient(0,y0,0,y1);st.forEach(([a,c])=>q.addColorStop(a,c));return q}
function mkBox(x,y,w,h,c1,c2,r){const q=g.createLinearGradient(x,0,x+w,0);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.beginPath();g.roundRect(x,y,w,h,r||0);g.fill()}
function sShot(){tn(900,600,.04,.1,'square');nz(.35,'bandpass',500,.09,350);[.25,.5,.75].forEach(d=>tn(150,90,.14,.22,'sine',d))}
function hullPath(){g.beginPath();g.moveTo(-130,-6);g.lineTo(-50,-24);g.lineTo(40,-30);g.lineTo(80,-28);g.lineTo(100,-14);g.lineTo(130,-10);g.quadraticCurveTo(140,-8,139,0);g.quadraticCurveTo(138,8,128,10);g.lineTo(100,14);g.lineTo(40,22);g.lineTo(-50,18);g.lineTo(-130,2);g.closePath()}
function cutPath(){g.beginPath();g.moveTo(-62,-23);for(let x=-56;x<=78;x+=7)g.lineTo(x,-24+((x/7|0)%2?2:-1));g.lineTo(84,-22);g.lineTo(95,-14);g.lineTo(96,-4);g.lineTo(93,4);g.lineTo(95,12);for(let x=88;x>=-60;x-=8)g.lineTo(x,16+((x/8|0)%2?2:0));g.lineTo(-64,8);g.lineTo(-61,0);g.lineTo(-65,-8);g.lineTo(-61,-16);g.closePath()}
function hull3(T,inner){let q;
 ell(-116,0,18,2.6,'#d8dce6','#556');
 g.fillStyle='#eef0f6';g.beginPath();g.moveTo(-128,-4);g.lineTo(-132,-44);g.lineTo(-116,-44);g.lineTo(-92,-12);g.closePath();g.fill();g.strokeStyle='#556';g.lineWidth=.6;g.stroke();
 g.fillStyle='#c8202a';g.beginPath();g.moveTo(-131,-36);g.lineTo(-131,-44);g.lineTo(-116,-44);g.lineTo(-110,-36);g.closePath();g.fill();
 lim(40,20,34,33,1.6,'#888','#333');ell(34,35,4.5,4.5,'#1a1a1a','#000');ell(34,35,1.6,1.6,'#888');
 lim(112,12,114,28,1.4,'#888','#333');ell(114,30,3.6,3.6,'#1a1a1a','#000');
 q=g.createLinearGradient(0,-30,0,22);q.addColorStop(0,'#ffffff');q.addColorStop(.6,'#e4e8f0');q.addColorStop(1,'#a8b0c4');g.fillStyle=q;hullPath();g.fill();
 g.save();hullPath();g.clip();g.fillStyle='#c8202a';g.fillRect(-140,4,290,3.5);g.fillStyle='#1d357e';g.fillRect(-140,8,290,1.5);
 g.fillStyle='#5a7ab8';g.beginPath();g.moveTo(80,-27);g.lineTo(99,-14);g.lineTo(92,-10);g.lineTo(78,-20);g.closePath();g.fill();
 g.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<3;i++)g.fillRect(112+i*5,-4,3,.8);
 if(inner)inner();
 g.restore();hullPath();g.strokeStyle='#3a4258';g.lineWidth=.8;g.stroke();
 g.font='bold 6px monospace';tx('OH-KRM',-98,0,'#1d357e','center');g.font='bold 8px monospace';
 q=g.createLinearGradient(0,-38,0,-29);q.addColorStop(0,'#ffffff');q.addColorStop(1,'#b8c0d4');g.fillStyle=q;g.beginPath();g.moveTo(2,-31);g.quadraticCurveTo(10,-39,40,-38);g.lineTo(96,-35);g.lineTo(96,-32);g.lineTo(2,-30);g.closePath();g.fill();g.strokeStyle='#3a4258';g.lineWidth=.6;g.stroke();
 lim(60,-32,44,18,1.1,'#d8dce6','#3a4258');
 ell(140,0,4,5,'#c8202a','#600');
 g.globalAlpha=.3+.15*Math.sin(T*40);ell(143,0,1.6,24,'#d8dce6');g.globalAlpha=1;const pb=22*Math.sin(T*30);lim(143,-pb,143,pb,1.2,'#555','#222')}
const CH2=[[36.71,[293.7,349.2,440]],[29.14,[233.1,293.7,349.2]],[43.65,[349.2,440,523.3]],[32.70,[261.6,329.6,392]]];
const EL2=[[74,-1,77,-1,81,-1,77,74,-1,72,74,-1,77,-1,76,-1],[74,-1,77,-1,82,-1,81,77,-1,74,77,-1,81,-1,79,-1],[77,-1,81,-1,84,-1,81,77,-1,76,77,-1,81,-1,84,-1],[79,-1,76,-1,72,-1,76,79,-1,84,-1,81,79,-1,76,-1]];
function dance4(T,ph){const s=Math.sin(T*7.33+ph);return{bob:-Math.abs(s)*1.6+.6,lL:Math.sin(T*3.66+ph)*.18,lR:-Math.sin(T*3.66+ph)*.18,aL:2.4+Math.sin(T*7.33+ph)*.45,eL:.5+Math.sin(T*7.33+ph)*.3,aR:-2.4+Math.sin(T*7.33+ph+1)*.45,eR:-.5-Math.sin(T*7.33+ph+1)*.3,tilt:Math.sin(T*3.66+ph)*.1}}
function waterB(a,b){const q=g.createLinearGradient(a,0,a+5,0);q.addColorStop(0,'rgba(120,190,240,.75)');q.addColorStop(.4,'rgba(220,245,255,.95)');q.addColorStop(1,'rgba(90,160,220,.75)');g.fillStyle=q;g.fillRect(a,b+3.5,5,9.5);g.fillRect(a+1.2,b+1,2.6,3);R('#2a6ad8',a+1,b,3,1.4);R('#3a8ae8',a,b+6.5,5,3);R('#ffffff',a+.8,b+7.3,3.4,.6);R('rgba(255,255,255,.8)',a+.7,b+4,.6,8)}
function bottle(a,b){const q=g.createLinearGradient(a,0,a+5,0);q.addColorStop(0,'#0e4a2a');q.addColorStop(.35,'#3fb070');q.addColorStop(1,'#0e4a2a');g.fillStyle=q;g.fillRect(a,b+4,5,9);g.fillRect(a+1.3,b+.5,2.4,4);ell(a+2.5,b+4,2.5,.9,q);R('#c8c8d0',a+1.2,b,2.6,1);R('#f4f4ee',a,b+7,5,3.2);R('#2a5ac8',a+.4,b+8,4.2,.6);R('#2a5ac8',a+1.5,b+9,2,.5);R('#ffffff77',a+.6,b+5,.5,7)}
