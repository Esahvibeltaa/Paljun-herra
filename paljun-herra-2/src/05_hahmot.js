/* Paljun Herra 2 – Hahmot: pikselisprite, osat, asennot ja animaatiot (pohja: Paljun herra 1) */
const GW=26,GH=52;let LY,CL;
function L(n){CL=n;if(!LY[n])LY[n]=Array.from({length:GH},()=>Array(GW).fill(null))}
function P(x,y,w,h,c){const q=LY[CL];for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(i>=0&&i<GW&&j>=0&&j<GH)q[j][i]=c}
const px=(a,c)=>a.forEach(([x,y])=>P(x,y,1,1,c));
function sFace(sk,sd){L('torso');P(11,20,4,2,sd);L('head');P(8,9,10,11,sk);P(17,9,1,11,sd);P(8,19,10,1,sd);P(7,13,1,3,sk);P(18,13,1,3,sd)}
function sEyes(){const e='#1a1a2a';P(9,12,2,1,e);P(14,12,2,1,e);P(9,13,1,1,'#fff');P(10,13,1,1,e);P(14,13,1,1,'#fff');P(15,13,1,1,e)}
function sBody(c,cd,sk,sd,sl){L('torso');P(7,21,12,13,c);P(17,21,2,13,cd);
 [['armL',4,6],['armR',19,21]].forEach(([n,x,sx])=>{L(n);for(let y=22;y<34;y++){const v=y<22+sl;P(x,y,3,1,v?c:sk);P(sx,y,1,1,v?cd:sd)}P(x,34,3,2,sk);P(sx,34,1,2,sd)})}
function sLegs(c,cd,shoe,sole,sf,sk,sd){L('torso');P(8,34,10,2,c);P(12,34,2,2,cd);
 [['legL',8,11,7],['legR',14,17,14]].forEach(([n,x,sx,fx])=>{L(n);for(let y=36;y<48;y++){const s=sf&&y>=sf;P(x,y,4,1,s?sk:c);P(sx,y,1,1,s?sd:cd)}
  if(shoe){P(fx,48,5,3,shoe);P(fx,50,5,1,sole)}else{P(x,48,4,2,sk);P(x-(n==='legL'?1:0),50,5,1,sk);P(sx,48,1,2,sd)}})}
function bare(sk,sd){sBody(sk,sd,sk,sd,0);L('torso');P(9,25,3,1,sd);P(14,25,3,1,sd);px([[10,27],[15,27]],'#d88a78');P(12,29,2,3,sd)}
function genEsa(o){LY={};const sk='#f0b890',sd='#cf8f6a';
 if(o===0){bare(sk,sd);sLegs('#2a4aa8','#1d357e',null,null,40,sk,sd);L('torso');P(7,33,12,1,'#3a62c8')}
 else if(o===5){bare(sk,sd);sLegs(sk,sd,null,null,36,sk,sd);L('torso');P(6,32,14,4,'#f4f4f8');P(6,33,14,1,'#4a78c8');P(17,32,2,4,'#d0d4e0');
  ['legL','legR'].forEach((n,i)=>{L(n);P(7+i*7,36,5,6,'#f4f4f8');P(7+i*7,38,5,1,'#4a78c8')})}
 else if(o===1){const a='#e8731a',ad='#b8560e',y='#f0f070';sBody(a,ad,sk,sd,12);sLegs(a,ad,'#1a1a1a','#3a3a3a');L('torso');P(7,27,12,1,y);P(12,21,1,13,ad);P(10,21,6,1,'#c8601a');
  ['armL','armR'].forEach((n,i)=>{L(n);P(4+i*15,29,3,1,y)});['legL','legR'].forEach((n,i)=>{L(n);P(8+i*6,42,4,1,y)})}
 else if(o===2){const sh='#9cc3ea',shd='#6f97c4';sBody(sh,shd,sk,sd,12);sLegs('#3a5a8c','#2a4268','#5a3418','#d8c8b0');L('torso');
  P(7,33,12,1,'#4a2a12');P(12,33,2,1,'#e8c040');P(12,21,2,2,sk);P(10,21,2,2,'#fff');P(14,21,2,2,'#fff');px([[12,24],[12,27],[12,30]],shd);P(8,25,3,2,shd);P(8,25,3,1,'#b4d4f2');
  ['legL','legR'].forEach((n,i)=>{L(n);P(8+i*6,46,4,1,'#5a7ab0')})}
 else if(o===3){const r='#c8202a',rd='#9a1820',w='#f4f4f4';sBody(r,rd,sk,sd,12);sLegs(r,rd,'#1a1a1a','#3a3a3a');L('torso');P(12,21,2,13,w);P(7,30,12,2,'#1a1a1a');P(12,30,2,2,'#e8c040');P(9,21,8,1,w);
  ['armL','armR'].forEach((n,i)=>{L(n);P(4+i*15,32,3,2,w)});['legL','legR'].forEach((n,i)=>{L(n);P(8+i*6,46,4,2,w)})}
 else if(o===4){const b='#1e1e26',bd='#121218';sBody(b,bd,sk,sd,12);sLegs('#1a1a22','#101016','#0a0a0e','#5a5a64');L('torso');P(11,21,4,9,'#f4f4f8');P(12,30,2,1,'#f4f4f8');
  P(11,21,1,2,'#c8202a');P(14,21,1,2,'#c8202a');P(12,21,2,1,'#8a1018');P(10,22,1,8,'#2e2e3a');P(15,22,1,8,'#2e2e3a');px([[12,25],[12,28]],'#9a9aa8');
  ['legL','legR'].forEach((n,i)=>{L(n);P(8+i*7,49,2,1,'#5a5a64')})}
 sFace(sk,sd);sEyes();P(9,11,2,1,'#b08020');P(14,11,2,1,'#b08020');P(7,10,1,3,'#e8c050');P(18,10,1,3,'#e8c050');px([[9,15],[16,15]],'#e87878');P(12,15,2,1,sd);
 P(9,16,8,1,'#e0b030');P(8,17,2,1,'#e0b030');P(16,17,2,1,'#e0b030');P(11,17,4,1,'#b88a20');P(12,18,2,1,'#8a3a3a');
 if(o===4){P(9,1,8,8,'#14141a');P(7,8,12,2,'#14141a');P(9,6,8,1,'#c8202a');P(10,2,1,4,'#2e2e38')}
 else{P(8,4,10,5,'#c8323c');P(9,3,8,1,'#c8323c');P(11,2,6,1,'#c8323c');P(16,1,3,3,'#c8323c');P(18,2,3,3,'#a82830');P(15,4,3,5,'#a82830');P(9,5,1,2,'#e05a62');
  P(20,4,3,3,'#f4f4f4');P(22,6,1,1,'#d8d8e0');P(7,9,12,2,'#f4f4f4');P(7,10,12,1,'#d8d8e0')}
 return sk}
function genW(sw){LY={};const sk='#f6c8a4',sd='#d8a080',h='#f0cc58',hd='#c99a30',d='#e0559a',dd='#b83a78';
 L('back');P(6,5,14,17,h);P(16,8,3,12,hd);
 if(sw){sBody(d,dd,sk,sd,0);sLegs(d,dd,null,null,36,sk,sd);L('torso');P(7,21,12,2,sk);P(9,21,1,2,d);P(16,21,1,2,d);P(8,23,1,1,sk);P(17,23,1,1,sk)}
 else{sBody(d,dd,sk,sd,4);sLegs(sk,sd,null,null,36,sk,sd);['legL','legR'].forEach((n,i)=>{L(n);P(7+i*7,50,6,1,null);P(8+i*6,48,4,2,'#c8203a');P(8+i*6,50,1,1,'#8a1020');P(11+i*6,50,1,1,'#8a1020')});L('torso');P(10,21,6,2,sk);P(11,23,4,1,'#f4e090');P(13,23,1,1,'#fff');
  P(7,30,12,1,'#ffd0e4');P(6,34,14,3,d);P(5,37,16,3,d);P(17,34,3,6,dd);P(5,39,16,1,dd);P(9,35,1,4,dd);P(15,35,1,4,dd);
  ['legL','legR'].forEach((n,i)=>{L(n);P(8+i*6,36,4,4,null)})}
 sFace(sk,sd);sEyes();px([[8,12],[16,12]],'#1a1a2a');px([[9,15],[16,15]],'#f08090');P(12,15,1,1,sd);P(12,17,2,1,'#d0304a');P(11,17,1,1,'#e86a80');P(14,17,1,1,'#e86a80');
 P(9,11,2,1,'#b08030');P(14,11,2,1,'#b08030');
 P(8,4,10,2,h);P(7,5,12,4,h);P(8,9,10,2,h);P(8,11,1,2,h);P(17,9,1,5,h);P(7,9,1,10,h);P(16,5,3,4,hd);P(10,10,4,1,hd);P(15,5,3,2,'#e84a8a');P(16,4,1,1,'#ff8ab8');
 L('front');P(6,19,3,9,h);P(17,19,3,9,h);P(6,27,2,2,h);P(18,27,2,2,h);P(18,20,1,7,hd);
 return sk}
function genA(sw){LY={};const sk='#e6ad8c',sd='#c68868',f='#a83232',fd='#7a2222';
 if(sw){bare(sk,sd);sLegs('#3a8a4a','#2a6a38',null,null,41,sk,sd);L('torso');P(7,33,12,1,'#4aa85a')}
 else{sBody(f,'#8a2828',sk,sd,12);L('torso');P(6,27,1,7,f);P(19,27,1,7,f);
  ['torso','armL','armR'].forEach(n=>{const q=LY[n];for(let y=21;y<34;y++)for(let x=0;x<GW;x++)if((q[y][x]===f||q[y][x]==='#8a2828')&&(x%3===0||y%3===0))q[y][x]=fd});
  L('torso');P(9,21,1,13,'#3a3a3a');P(16,21,1,13,'#3a3a3a');P(10,21,6,3,'#f4f0e6');P(12,21,2,2,sk);
  sLegs('#6a5638','#4e3e26','#2e2218','#6a5a48');L('torso');P(7,33,12,1,'#2a2a2a')}
 sFace(sk,sd);sEyes();const hr='#7a4a22';P(9,11,2,1,'#5a3416');P(14,11,2,1,'#5a3416');
 P(12,15,2,1,sd);P(11,17,4,1,'#9a4a40');P(14,16,1,1,'#9a4a40');px([[9,15],[16,15]],'#f0a08a');px([[10,16],[15,14]],'#d89070');
 P(7,9,1,5,hr);P(18,9,1,5,hr);P(8,9,3,1,hr);P(15,9,3,1,hr);px([[7,14],[18,14]],hr);
 P(8,4,10,5,'#5f7a34');P(9,3,8,1,'#5f7a34');P(15,4,3,5,'#46592a');P(9,4,1,2,'#7a9a46');P(8,8,10,1,'#46592a');P(12,2,2,1,'#46592a');P(3,8,6,2,'#3e4f22');P(3,9,6,1,'#2e3a18');BRIM='#3e4f22';
 return sk}
function genK(){LY={};const sk='#eab894',sd='#c8906c',h='#1a1a20',hl='#34343e',t='#1e1e24',td='#141418';
 L('back');P(5,4,16,24,h);
 sBody(t,td,sk,sd,4);[['armL',4],['armR',19]].forEach(([n,x])=>{L(n);P(x,31,3,2,'#222228');P(x+1,31,1,1,'#c0c0c8')});
 L('torso');px([[12,24],[13,24],[11,25],[12,25],[12,26],[13,26],[14,26],[13,27],[12,28]],'#e8e8e8');
 {const dn='#4a6a9a',dk='#34507a',lt='#7a9ac8';P(7,21,4,13,dn);P(15,21,4,13,dn);P(10,22,1,12,lt);P(15,22,1,12,lt);P(17,22,2,12,dk);P(7,22,1,12,dk);
  P(9,21,2,3,dk);P(15,21,2,3,dk);P(8,26,2,1,lt);P(16,26,2,1,lt);px([[8,27],[17,27],[10,30],[15,30],[10,32],[15,32]],'#c0c0c8');P(8,30,2,2,'#c8202a');P(16,30,1,2,'#e8c040');P(17,30,1,2,'#1a1a20');P(7,33,4,1,dk);P(15,33,4,1,dk)}
 sLegs('#2a2a36','#1c1c26','#141418','#2e2e34');L('torso');P(7,33,12,1,'#0e0e12');P(12,33,2,1,'#c0c0c8');px([[16,34],[16,35]],'#c0c0c8');
 L('legL');P(9,41,2,1,sk);P(9,49,1,1,'#c0c0c8');L('legR');P(16,49,1,1,'#c0c0c8');P(17,36,1,1,'#c0c0c8');
 sFace(sk,sd);sEyes();P(9,11,3,1,'#111');P(14,11,3,1,'#111');P(12,15,2,1,sd);P(11,17,4,1,'#7a3a3a');P(15,16,1,1,'#7a3a3a');P(12,18,2,2,h);P(11,19,4,1,h);
 P(7,4,12,4,h);P(8,8,3,2,h);P(13,8,4,2,h);P(8,10,1,1,h);P(11,8,1,1,h);P(17,8,2,6,h);P(7,8,1,7,h);
 P(8,3,10,1,'#55555f');P(6,12,2,4,'#3a3a44');P(18,12,2,4,'#3a3a44');px([[19,16],[18,17],[17,17],[16,17]],'#55555f');P(15,17,1,1,'#222');
 L('front');P(5,19,3,9,h);P(18,19,3,9,h);px([[5,28],[7,28],[18,28],[20,28],[8,20],[17,20]],h);
 ['back','head','front'].forEach(n=>{const q=LY[n];for(let y=4;y<31;y++)for(let x=5;x<21;x++)if(q[y][x]===h&&((x*7+y*5)%9===0))q[y][x]=hl});
 return sk}
function mkPart(q){if(!q)return null;const c=document.createElement('canvas');c.width=GW+2;c.height=GH+2;const x=c.getContext('2d'),O=(i,j)=>j>=0&&j<GH&&i>=0&&i<GW&&q[j][i];
 for(let j=-1;j<=GH;j++)for(let i=-1;i<=GW;i++){const v=O(i,j);if(v){x.fillStyle=v;x.fillRect(i+1,j+1,1,1)}else if(O(i+1,j)||O(i-1,j)||O(i,j+1)||O(i,j-1)){x.fillStyle='#18121a';x.fillRect(i+1,j+1,1,1)}}return c}
function shd(c,f){if(!c||c[0]!=='#')return c;if(c.length===4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];if(c.length!==7)return c;const n=parseInt(c.slice(1),16);return'#'+[16,8,0].map(b=>Math.round(((n>>b)&255)*f).toString(16).padStart(2,'0')).join('')}
function buildProf(G,sk,pp){const E=()=>Array.from({length:GH},()=>Array(GW).fill(null)),hm=d=>12+Math.round((16-d)/1.5);
 const mapH=q=>{if(!q)return null;const o=E();for(let y=0;y<GH;y++)for(let d=0;d<=16;d++){const s=hm(d);if(s<GW&&q[y][s])o[y][d]=q[y][s]}return o};
 const sh=(q,dx,f)=>{if(!q)return null;const o=E();for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const v=q[y][x];if(v&&x+dx>=0&&x+dx<GW)o[y][x+dx]=f?shd(v,f):v}return o};
 const crop=(q,a,b)=>{if(!q)return null;const o=E();for(let y=0;y<GH;y++)for(let x=a;x<=b;x++)o[y][x]=q[y][x];return o};
 const EC=['#1a1a2a','#ffffff','#fff','#3a2418'],hasEye=G.head&&[[14,12],[15,12],[14,13],[15,13]].some(([x,y])=>EC.includes(G.head[y][x]));
 const fixH=(q,bl)=>{if(!q)return null;for(let y=12;y<=13;y++)for(let x=9;x<=16;x++)if(EC.includes(q[y][x]))q[y][x]=sk;
  if(hasEye){if(bl){q[13][13]=q[13][14]='#3a2418'}else{q[12][13]=q[12][14]='#1a1a2a';q[13][13]='#ffffff';q[13][14]='#1a1a2a'}}
  if(q[14][16]||q[15][16]){q[14][17]=sk;q[15][17]=shd(sk,.85)}return q};
 const hb=G.head.map(v=>v.slice());[[9,12],[10,12],[14,12],[15,12],[9,13],[10,13],[14,13],[15,13]].forEach(([x,y])=>hb[y][x]=y===13?'#3a2418':sk);
 const L={back:mapH(G.back),front:mapH(G.front),head:fixH(mapH(G.head),0),headB:fixH(mapH(hb),1),torso:crop(G.torso,8,17),legR:sh(G.legR,-4),legL:sh(G.legR,-4,.72),legR2:sh(G.legR2,-4),legL2:sh(G.legR2,-4,.72),armR:sh(G.armR,-8),armL:sh(G.armR,-8,.72),armR2:sh(G.armR2,-8),armL2:sh(G.armR2,-8,.72)};
 if(BRIM){[L.head,L.headB].forEach(q=>{for(let x=8;x<=11;x++){q[8][x]=q[9][x]=null}for(let x=15;x<=20;x++){q[8][x]=BRIM;if(x<20)q[9][x]=shd(BRIM,.75)}})}
 if(pp){const s0=LY;LY=L;pp(sk);LY=s0}// valinnainen sivuprofiilin lisämaalaus (esim. leveät hartiat, joita rajaus ei näytä)
 const r={pv:1};for(const k in L)r[k]=mkPart(L[k]);return r}
function splitArms(){['legL','legR'].forEach(k=>{const q=LY[k];if(!q)return;LY[k+'2']=q.map((r,y)=>y>=41?r.slice():Array(GW).fill(null));LY[k]=q.map((r,y)=>y<=43?r.slice():Array(GW).fill(null))});['armL','armR'].forEach(k=>{const q=LY[k];if(!q)return;LY[k+'2']=q.map((r,y)=>y>=27?r.slice():Array(GW).fill(null));LY[k]=q.map((r,y)=>y<=29?r.slice():Array(GW).fill(null))})}
function capC(c){if(!c)return null;const cc=document.createElement('canvas');cc.width=cc.height=5;const x=cc.getContext('2d');x.fillStyle=c;x.beginPath();x.arc(2.5,2.5,2.1,0,7);x.fill();return cc}
/* post = valinnainen kerrosten muokkaus ennen kokoamista (esim. takaa nähty versio) */
let BRIM=null;function buildSpr(gen,a,post,pp){BRIM=null;const sk=gen(a),r={};if(post)post(LY,sk);splitArms();r.shL=capC(LY.armL&&LY.armL[23][5]);r.shR=capC(LY.armR&&LY.armR[23][20]);for(const k in LY)r[k]=mkPart(LY[k]);const hb=LY.head.map(v=>v.slice());
 [[9,12],[10,12],[14,12],[15,12],[9,13],[10,13],[14,13],[15,13]].forEach(([x,y])=>hb[y][x]=y===13?'#3a2418':sk);r.headB=mkPart(hb);r.P=buildProf(LY,sk,pp);return r}
const SP={e:[0,1,2,3,4,5].map(o=>buildSpr(genEsa,o)),w:buildSpr(genW,0),ws:buildSpr(genW,1),a:buildSpr(genA,0),as:buildSpr(genA,1),k:buildSpr(genK)};
SP.eS=[0,1,2,3,4,5].map(o=>buildSpr(()=>{const sk=genEsa(o);['legL','legR'].forEach(k=>LY[k]&&LY[k].forEach((r,y)=>{if(y>=48)for(let i=0;i<r.length;i++)if(r[i])r[i]=y>=50?'#c4c4d0':'#ececf2'}));return sk}));
const OCv=document.createElement('canvas');OCv.width=128;OCv.height=144;const oc=OCv.getContext('2d');
const ease=u=>{u=Math.max(0,Math.min(1,u));return u*u*(3-2*u)};
function drawChar(sp,x,y,o){o=o||{};if(o.prof&&sp.P)sp=sp.P;const PV=sp.pv;const legD=(up,lo,lx,a,k,sc)=>{sc=sc||1;a=a||0;k=k||0;oc.save();oc.translate(lx,36);oc.rotate(a);oc.save();oc.translate(0,6*sc);oc.rotate(k);oc.scale(1,sc);if(lo)oc.drawImage(lo,-lx-1,-42-1);oc.restore();oc.scale(1,sc);if(up)oc.drawImage(up,-lx-1,-36-1);oc.restore()};const armD=(up,lo,sh,ax,a,e,sc)=>{sc=sc||1;a=a||0;e=e||0;oc.save();oc.translate(ax,23);oc.rotate(a);oc.save();oc.translate(0,5.6*sc);oc.rotate(e);oc.scale(1,sc);if(lo)oc.drawImage(lo,-ax-1,-28.6-1);oc.restore();oc.scale(1,sc);if(up)oc.drawImage(up,-ax-1,-23-1);oc.restore();if(sh)oc.drawImage(sh,ax-2.5,20.5)};const B=o.bob||0,tl=o.tilt||0;
 oc.setTransform(1,0,0,1,0,0);oc.clearRect(0,0,128,144);oc.imageSmoothingEnabled=false;oc.setTransform(2,0,0,2,36,20);
 const d=(c,ax,ay,a,sy)=>{if(!c)return;oc.save();oc.translate(ax,ay);if(a)oc.rotate(a);if(sy&&sy!==1)oc.scale(1,sy);oc.drawImage(c,-ax-1,-ay-1);oc.restore()};
 oc.save();oc.translate(0,B);d(sp.back,12.5,20,tl);oc.restore();
 if(PV)armD(sp.armL,sp.armL2,null,12.5,o.aL,o.eL,o.sL);legD(sp.legL,sp.legL2,PV?12:10,o.lL,o.kL,o.qL);legD(sp.legR,sp.legR2,PV?12.5:15,o.lR,o.kR,o.qR);
 oc.save();oc.translate(0,B);d(sp.torso,0,0);d(sp.front,0,0);
 oc.save();oc.translate(12.5,20);oc.rotate(tl);oc.translate(-12.5,-20);oc.drawImage(o.blink?sp.headB:sp.head,-1,-1);
 if(o.blush>0){oc.fillStyle=`rgba(230,70,90,${o.blush})`;oc.fillRect(9,15,2,1);oc.fillRect(15,15,2,1)}oc.restore();
 
 const hand=(L2)=>{const a=(L2?o.aL:o.aR)||0,e=(L2?o.eL:o.eR)||0,ax=PV?12.5:L2?5:20,sc=(L2?o.sL:o.sR)||1,ex=ax-Math.sin(a)*5.6*sc,ey=23+Math.cos(a)*5.6*sc;return[ex-Math.sin(a+e)*6*sc,ey+Math.cos(a+e)*6*sc]};
 const itm=()=>{const [hx,hy]=hand(o.itemArm==='L'),gs=g;g=oc;g.save();g.translate(hx,hy);g.rotate(o.iR||0);if(o.iS)g.scale(1,o.iS);o.item==='h'?bottle(-2.5,-9):o.item==='w'?wrench(-1,-11):o.item==='p'?pipeW(-1,-14):o.item==='k'?chainW(-1,-13):(g.scale(.72,.72),can(-3.5,-10));g.restore();g=gs};
 if(!PV)armD(sp.armL,sp.armL2,sp.shL,5,o.aL,o.eL,o.sL);if(o.item&&o.itemArm==='L')itm();
 armD(sp.armR,sp.armR2,sp.shR,PV?12.5:20,o.aR,o.eR,o.sR);if(o.item&&o.itemArm!=='L')itm();
 oc.restore();
 if(o.tint){oc.setTransform(1,0,0,1,0,0);oc.globalCompositeOperation='source-atop';oc.fillStyle=o.tint;oc.fillRect(0,0,128,144);oc.globalCompositeOperation='source-over'}
 g.save();if(o.clip){g.beginPath();g.rect(o.clip[0],o.clip[1],o.clip[2],o.clip[3]);g.clip()}
 const s=o.s||1,cy=o.cy||0;g.translate(x,y-cy*s);if(o.rot)g.rotate(o.rot);g.translate(0,cy*s);g.scale(o.flip?-s:s,s);g.imageSmoothingEnabled=s<.95;g.drawImage(OCv,-31,-61,64,72);g.imageSmoothingEnabled=true;g.restore()}
function idle(T,ph){return{bob:Math.sin(T*2.1+ph)*.45,aL:.06+Math.sin(T*1.7+ph)*.04,aR:-.06-Math.sin(T*1.7+ph+1)*.04,tilt:Math.sin(T*.9+ph)*.04,blink:((T+ph*1.7)%4.3+4.3)%4.3<.13}}
function walk(T,w,ph){const s=Math.sin(w*9),c=Math.cos(w*9);return{bob:-Math.abs(c)*1.3+.6,lL:s*.5,lR:-s*.5,aL:-s*.5,aR:s*.5,eL:-.3-Math.max(0,s)*.45,eR:-.3-Math.max(0,-s)*.45,kL:.08+Math.max(0,-c)*.75,kR:.08+Math.max(0,c)*.75,tilt:s*.035+.05,blink:((T+ph)%4.3+4.3)%4.3<.13,prof:1}}
function sip(o,u,th0,th1,it){o.aR=th0+(.9-th0)*u;o.eR=1.75*u;o.sR=1;o.iR=-1.1*u*u;o.item=it;if(u>.6)o.blink=true}
function genPena(){LY={};const sk='#e2a080',sd='#c07a5c',nv='#2a3a6a',nd='#1c2850',hv='#e8e040';
 sBody('#5a5a62','#45454c',sk,sd,4);L('torso');P(5,26,16,8,nv);P(8,23,10,11,nv);P(8,21,2,3,nv);P(16,21,2,3,nv);P(18,26,3,8,nd);P(5,29,16,1,hv);P(11,24,4,2,'#3a4a7a');
 sLegs(nv,nd,'#2a1a0a','#4a3a2a');['legL','legR'].forEach((n,i)=>{L(n);P(8+i*6,44,4,1,hv)});
 sFace(sk,sd);P(9,13,2,1,'#1a1a2a');P(14,13,2,1,'#1a1a2a');P(8,11,4,1,'#2a1a10');P(14,11,4,1,'#2a1a10');P(12,14,2,2,sd);
 P(8,16,10,2,'#2a1a10');P(8,18,2,1,'#2a1a10');P(16,18,2,1,'#2a1a10');px([[10,19],[12,19],[14,19],[9,18],[16,19]],'#a87050');
 P(8,4,10,5,'#b02020');P(9,3,8,1,'#b02020');P(15,4,3,5,'#8a1818');P(7,8,13,2,'#1a1a1a');BRIM='#1a1a1a';P(11,5,4,2,'#f0f0f0');P(12,5,2,2,'#1a1a1a');
 P(7,10,1,3,'#3a2a1a');P(18,10,1,3,'#3a2a1a');return sk}
function genTapsa(){LY={};const sk='#ecc0a0',sd='#cc9a7a',ts='#1e1e28',tsd='#121218',hr='#8a5a2a';
 L('back');P(7,8,12,15,hr);P(15,10,3,12,'#6a4420');
 sBody(ts,tsd,sk,sd,12);['armL','armR'].forEach((n,i)=>{L(n);P(i?21:4,22,1,12,'#f0f0f0')});L('torso');P(12,21,1,13,'#8a8a94');P(10,21,6,2,'#f4f4f4');P(12,21,2,1,sk);P(10,23,6,1,'#e8c040');
 sLegs(ts,tsd,'#f4f4f4','#c8c8d0');['legL','legR'].forEach((n,i)=>{L(n);P(i?17:8,36,1,12,'#f0f0f0')});
 sFace(sk,sd);P(8,12,10,2,'#111');P(9,12,1,1,'#5a6a8a');P(14,12,1,1,'#5a6a8a');P(12,15,2,1,sd);P(10,16,6,1,'#6a4020');P(11,18,4,1,'#9a4a40');
 P(8,5,10,4,hr);P(7,7,12,2,hr);P(8,9,2,1,hr);P(16,9,2,1,hr);P(14,5,3,3,'#6a4420');return sk}
SP.pe=buildSpr(genPena);SP.ta=buildSpr(genTapsa);

/* Esa takaa nähtynä (tikapuilla kasvot tikkaita kohti): kasvot peitetään takaraivolla (hiukset ja niska), paidan etuosan
   yksityiskohdat (kaulus, napit, tasku) korvataan selkäpuolella, jossa keskellä sauma. Lakki, korvat, kädet ja jalat ennallaan. */
const ESA_BACK={hair:'#c89a38',hairD:'#a07820'};
function esaBackPost(LY,sk){const sd='#cf8f6a',h=LY.head,t=LY.torso;
 for(let y=11;y<=19;y++)for(let x=8;x<=17;x++){if(!h[y][x])continue;const neck=y>=17&&x>=10&&x<=15;h[y][x]=neck?(x===15?sd:sk):(x>=16||y===16?ESA_BACK.hairD:ESA_BACK.hair)}
 let sh=null,shd=null;for(let y=24;y<=31&&!sh;y++)if(t[y][8])sh=t[y][8];shd=t[26]&&t[26][18]||sh;
 if(sh)for(let y=20;y<=32;y++)for(let x=7;x<=18;x++){if(!t[y][x])continue;if(y<=21&&x>=10&&x<=15){t[y][x]=y===20?sk:sh;continue}t[y][x]=x>=17?shd:x===12?shd:sh}}
const ESA_BACKC={};
function esaBack(o){return ESA_BACKC[o]||(ESA_BACKC[o]=buildSpr(genEsa,o,esaBackPost))}
