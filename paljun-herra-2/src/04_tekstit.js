/* Paljun Herra 2 – Tekstit: rivitys, viestilaatikko, puhekuplat, ilmoitukset (pohja: Paljun herra 1) */
const WRAPC=new Map();
function wrapLines(lines,maxW,font){const key=font+'|'+maxW+'|'+lines.join('\n');let r=WRAPC.get(key);if(r)return r;
 const fs=g.font;g.font=font;r=[];for(const ln of lines){const words=String(ln).split(' ');let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){r.push(cur);cur=w}else cur=t}r.push(cur)}g.font=fs;
 if(WRAPC.size>400)WRAPC.clear();WRAPC.set(key,r);return r}
/* Viestilaatikko: rivitetty teksti; jos ei mahdu kahdelle riville, fontti pienenee */
function drawMsg(w){const x=9,mw=w-8;for(const [sz,lh,max] of [[8,11,2],[7,8.5,3],[6,7,4]]){const f=`bold ${sz}px monospace`,L=wrapLines(msgL,mw,f);if(L.length<=max||sz===6){const fs=g.font;g.font=f;const y0=sz===8?177:sz===7?174.5:173;L.slice(0,max).forEach((l,i)=>tx(l,x,y0+i*lh,'#000'));g.font=fs;return}}}
/* Puhekupla: leveys mitataan, pitkä repliikki rivitetään (enintään 3 riviä), kupla pysyy ruudulla */
function sbub(cx,y,t){const f='bold 8px monospace',L=wrapLines([t],170,f),fs=g.font;g.font=f;let tw=0;for(const l of L)tw=Math.max(tw,g.measureText(l).width);const w=tw+10,h=4+L.length*9.5,yy=Math.max(12,y-(L.length-1)*9.5),x=Math.max(2,Math.min(W-w-2,cx-w/2)),c2=Math.max(x+5,Math.min(x+w-5,cx));
 g.fillStyle='#fffffa';g.strokeStyle='#222';g.lineWidth=.6;g.beginPath();g.roundRect(x,yy,w,h,4);g.fill();g.stroke();g.beginPath();g.moveTo(c2-3,yy+h);g.lineTo(c2,yy+h+5);g.lineTo(c2+3,yy+h);g.fill();g.stroke();g.fillStyle='#fffffa';g.fillRect(c2-2.5,yy+h-.6,5,1.2);
 L.forEach((l,i)=>tx(l,x+w/2,yy+9.5+i*9.5,'#111','center'));g.font=fs}
function zzz(x,y,T){g.font='bold 6px monospace';const u=(T*.6)%1;g.globalAlpha=1-u;tx('z',x+u*6,y-u*10,'#fff');tx('Z',x+4+u*4,y-6-u*8,'#fff');g.globalAlpha=1;g.font='bold 8px monospace'}
function box3(t1,ls){ls=wrapLines(ls,248,'bold 8px monospace');g.fillStyle='rgba(0,0,0,.6)';g.fillRect(0,10,W,150);const h=32+ls.length*12,y0=85-h/2;R('#20243a',28,y0,264,h);R('#fffff4',30,y0+2,260,h-4);g.font='bold 14px monospace';tx(t1,W/2,y0+20,'#000','center');g.font='bold 8px monospace';ls.forEach((l,i)=>tx(l,W/2,y0+34+i*12,'#000','center'))}
const tx=(s,x,y,c,a)=>{g.fillStyle=c;g.textAlign=a||'left';g.fillText(s,x,y)};
function ell(x,y,rx,ry,f,l){g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);if(f){g.fillStyle=f;g.fill()}if(l){g.strokeStyle=l;g.lineWidth=.5;g.stroke()}}
function lim(x,y,x2,y2,w,c,o){g.lineCap='round';g.strokeStyle=o;g.lineWidth=w+.8;g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.stroke();g.strokeStyle=c;g.lineWidth=w;g.stroke()}
