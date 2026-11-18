/* Paljun Herra 2 – Retrografiikka ja pääsilmukka (pohja: Paljun herra 1) */
const loCv=document.createElement('canvas');loCv.width=W;loCv.height=H;const lo=loCv.getContext('2d');window.__lo=lo;
const glCv=document.createElement('canvas');glCv.width=W;glCv.height=H;const glc=glCv.getContext('2d');
const gl2=[160,80,40].map(w=>{const c=document.createElement('canvas');c.width=w;c.height=w*H/W;return c});
const RTX={seg:0,dirty:false,lut:null,gd:null,fx:null,fxK:0};
{const Bm=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],Lv=10;RTX.lut=Bm.map(b=>{const t=(b/16-.5)*.55,a=new Uint8ClampedArray(256);for(let v=0;v<256;v++)a[v]=Math.round(Math.min(1,Math.max(0,Math.floor(v/255*(Lv-1)+.5+t)/(Lv-1)))*255);return a})}
RTX.bb=[1e9,1e9,-1e9,-1e9];RTX.full=false;
function rtBB(x,y,w,h,pad){const t=lo.getTransform(),b=RTX.bb;for(const [px,py] of [[x,y],[x+w,y],[x,y+h],[x+w,y+h]]){const X=t.a*px+t.c*py+t.e,Y=t.b*px+t.d*py+t.f;if(X-pad<b[0])b[0]=X-pad;if(Y-pad<b[1])b[1]=Y-pad;if(X+pad>b[2])b[2]=X+pad;if(Y+pad>b[3])b[3]=Y+pad}}
['fillRect','strokeRect','fill','stroke','drawImage','putImageData'].forEach(n=>{const f=lo[n].bind(lo);lo[n]=function(...a){RTX.dirty=true;if(RTX.seg>0&&!RTX.full){const pad=2+(lo.shadowBlur||0)+Math.abs(lo.shadowOffsetX||0)+Math.abs(lo.shadowOffsetY||0)+(n.startsWith('stroke')?lo.lineWidth:0);
 if(n==='fillRect'||n==='strokeRect')rtBB(a[0],a[1],a[2],a[3],pad);else if(n==='drawImage'){if(a.length>=9)rtBB(a[5],a[6],a[7],a[8],pad);else if(a.length>=5)rtBB(a[1],a[2],a[3],a[4],pad);else rtBB(a[1],a[2],a[0].width,a[0].height,pad)}else RTX.full=true}return f(...a)}});
['fillText','strokeText'].forEach(n=>{lo[n]=function(...a){rtFlush();const t=lo.getTransform(),m=main;m.save();m.setTransform(t.a*SC,t.b*SC,t.c*SC,t.d*SC,t.e*SC,t.f*SC);
 for(const k of['fillStyle','strokeStyle','lineWidth','lineJoin','font','textAlign','textBaseline','globalAlpha','globalCompositeOperation','shadowColor'])m[k]=lo[k];
 m.shadowBlur=lo.shadowBlur*SC;m.shadowOffsetX=lo.shadowOffsetX*SC;m.shadowOffsetY=lo.shadowOffsetY*SC;m.imageSmoothingEnabled=true;m[n](...a);m.restore()}});
function rtPost(){const id=lo.getImageData(0,0,W,H),d=id.data,L=RTX.lut;if(!RTX.gd)RTX.gd=glc.createImageData(W,H);const gd=RTX.gd.data;
 for(let y=0,i=0;y<H;y++){const ry=(y&3)<<2;for(let x=0;x<W;x++,i+=4){const lt=L[ry|(x&3)],r=lt[d[i]],g2=lt[d[i+1]],b=lt[d[i+2]];d[i]=r;d[i+1]=g2;d[i+2]=b;
  const mx=r>g2?(r>b?r:b):(g2>b?g2:b),mn=r<g2?(r<b?r:b):(g2<b?g2:b);if(d[i+3]>200&&((mx>235&&mx-mn>24)||(mx>200&&mx-mn>40))){gd[i]=r;gd[i+1]=g2;gd[i+2]=b;gd[i+3]=255}else gd[i+3]=0}}
 lo.putImageData(id,0,0);glc.putImageData(RTX.gd,0,0)}
function rtFlush(){if(!RTX.dirty)return;RTX.dirty=false;const m=main,first=RTX.seg===0;m.save();m.setTransform(1,0,0,1,0,0);m.globalAlpha=1;m.globalCompositeOperation='source-over';m.shadowBlur=0;m.shadowColor='transparent';
 if(first)rtPost();m.imageSmoothingEnabled=false;let bx=0,by=0,bw=W,bh=H;
 if(!first&&!RTX.full){const b=RTX.bb;bx=Math.max(0,Math.floor(b[0]));by=Math.max(0,Math.floor(b[1]));bw=Math.min(W,Math.ceil(b[2]))-bx;bh=Math.min(H,Math.ceil(b[3]))-by}
 if(bw>0&&bh>0){const k=cv.width/W;m.drawImage(loCv,bx,by,bw,bh,bx*k,by*k,bw*k,bh*k)}
 if(first){let src=glCv;for(const c of gl2){const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.imageSmoothingEnabled=true;x.drawImage(src,0,0,c.width,c.height);src=c}
  m.imageSmoothingEnabled=true;m.globalCompositeOperation='lighter';m.globalAlpha=.42;m.drawImage(gl2[1],0,0,cv.width,cv.height);m.globalAlpha=.3;m.drawImage(gl2[2],0,0,cv.width,cv.height)}
 m.restore();RTX.seg++;lo.save();lo.setTransform(1,0,0,1,0,0);if(bw>0&&bh>0)lo.clearRect(bx,by,bw,bh);lo.restore();RTX.bb=[1e9,1e9,-1e9,-1e9];RTX.full=false}
function rtFx(){if(RTX.fxK!==cv.width){RTX.fxK=cv.width;const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d'),q=x.createRadialGradient(c.width/2,c.height/2,c.height*.35,c.width/2,c.height/2,c.width*.62);q.addColorStop(0,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(0,0,0,.32)');x.fillStyle=q;x.fillRect(0,0,c.width,c.height);x.fillStyle='rgba(0,0,0,.07)';for(let y=SC-1;y<c.height;y+=SC)x.fillRect(0,y,c.width,1);RTX.fx=c}
 main.save();main.setTransform(1,0,0,1,0,0);main.globalAlpha=1;main.globalCompositeOperation='source-over';main.drawImage(RTX.fx,0,0);main.restore()}
function frameBegin(){g=lo;lo.setTransform(1,0,0,1,0,0);lo.imageSmoothingEnabled=false;lo.clearRect(0,0,W,H);RTX.seg=0;RTX.dirty=false;RTX.full=false;RTX.bb=[1e9,1e9,-1e9,-1e9];main.setTransform(1,0,0,1,0,0);main.clearRect(0,0,cv.width,cv.height)}
function frameEnd(){rtFlush();rtFx()}
let last=performance.now();
function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;gpPoll(dt);if((HT+=dt)>.5){HT=0;updHints()}if(!PAUSED)step(dt);frameBegin();draw(now/1000);drawLives();overlayFx(dt);gpDraw();frameEnd();requestAnimationFrame(loop)}

