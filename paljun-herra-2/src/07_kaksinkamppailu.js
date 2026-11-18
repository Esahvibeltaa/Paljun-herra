/* Paljun Herra 2 – Kaksinkamppailu (1v1) ja yhteinen taistelumekaniikka (pohja: Paljun herra 1) */
const FL=150,K={keys:{l:0,r:0,u:0,d:0}};let DIFF=0;try{DIFF=+(localStorage.getItem('ph_diff')||0)===1?1:0}catch(x){}
const MV={punch:{h:'mid',d:6,r:31,st:.08,ac:.1,rc:.16},upper:{h:'hi',d:9,r:26,st:.12,ac:.1,rc:.22},lowp:{h:'lo',d:5,r:29,st:.08,ac:.1,rc:.16,cr:1},kick:{h:'mid',d:8,r:38,st:.13,ac:.1,rc:.2},
 hikick:{h:'hi',d:10,r:38,st:.17,ac:.1,rc:.24},bkick:{h:'mid',d:11,r:38,st:.22,ac:.1,rc:.26},sweep:{h:'lo',d:7,r:40,st:.14,ac:.1,rc:.3,cr:1,kd:1},fkick:{h:'mid',d:14,r:36,st:.05,ac:.4,rc:0,air:1,kd:1},
 jpunch:{h:'mid',d:6,r:29,st:.05,ac:.25,rc:0,air:1},spin:{h:'mid',d:22,r:38,st:.1,ac:.5,rc:.25,both:1,kd:1},smoke:{h:'mid',d:0,r:0,st:.5,ac:.1,rc:.5,fx:1},throw:{h:'mid',d:0,r:0,st:.3,ac:.1,rc:.3,fx:2},dash:{h:'mid',d:12,r:22,st:.3,ac:.5,rc:.3,dash:1}};
/* nyrkin/jalan kärjen graafinen ulottuvuus keskeltä (mitattu sprite-piirroksesta, koko 1); osuma vain kun kärki koskee vartaloon */
{const TIP={punch:22,upper:17.5,lowp:21,kick:24,hikick:16,bkick:22,sweep:17.5,fkick:22,jpunch:22};for(const k in TIP)MV[k].tip=TIP[k]}
const BODY=6,reachOf=(m,sa,sd)=>m.tip!==undefined?m.tip*sa+BODY*sd:m.r;
for(const k in MV)MV[k].n=k;
const FOES=[{name:'DIESEL-PENA',sp:'pe',hp:120,spd:24,mult:1.3,tk:.8,moves:['punch','kick','upper','punch','kick'],blk:.22,pref:26,def:.8,jmp:0},
 {name:'TURBO-TAPSA',sp:'ta',hp:90,spd:50,mult:.9,tk:.5,moves:['punch','kick','hikick','sweep'],blk:.32,pref:32,def:1,jmp:.28}];
const pow=h=>h<20?.5:h<55?1:h<80?1.4:1.6,dly=h=>h<20?0:h<55?.1:h<80?.25:.4;const dlyM=h=>Math.min(.15,dly(h)*.4);
const CHE={a:['Aapeli: Potkase, niinku ID.3 kiihtyy!','Aapeli: Sähkövoimaa, Esa!'],k:['Kermis: Hevi-voimaa, Esa!','Kermis: Vasen, oikea, ROCK!'],w:['Hempukka: Esa! Esa!','Hempukka: Näytä niille!'],
 pe:['Diesel-Pena: Diesel jyrää!','Diesel-Pena: Tule tänne, tonttu!'],ta:['Turbo-Tapsa: Turbo päälle!','Turbo-Tapsa: Liian hidas, sähköjätkä!']};
function mkF(sp,x,face,hp,fd){return{sp,x,y:0,vx:0,vy:0,face,hp,mhp:hp,st:'idle',atk:null,wk:0,ht:0,dt:0,bt:0,th:1.2,sc:4,jk:0,fd:fd||null,sw:0,rw:0,rwv:0}}
const OM=[62,-1,65,67,69,-1,67,65,62,-1,60,62,65,-1,-1,-1,69,-1,72,74,72,-1,69,67,65,-1,67,69,62,-1,-1,-1];
function koto(t0,f,v){mt(t0,f,f*.995,.5,v,'triangle');mt(t0,f*2,f*2,.16,v*.35,'sine');mn(t0,.02,'highpass',5000,v*.5)}
function orientStep(t0,st){const s=st%16,ph=Math.floor(st/16)%4;
 if(s===0||s===6||s===8||s===11)mt(t0,95,38,.3,.8,'sine');
 if(s%4===2)mn(t0,.08,'bandpass',900,.22);if(s===4||s===12)mn(t0,.15,'bandpass',2200,.16);if(s%2===1)mt(t0,1600,1500,.03,.025,'square');
 const n=OM[(ph%2)*16+s];if(n>0&&ph<3)koto(t0,mf(n),.09);
 if(ph===3&&s%2===0){const sc2=[62,65,67,69,72,74];koto(t0,mf(sc2[(s/2+st)%6]+12),.06)}
 if(s===0)mt(t0,73.4,73.4,1.7,.12,'triangle');if(s===0&&st%64===0)mt(t0,110,104,2.4,.18,'sine')}
function gong(){tn(110,104,2.6,.35,'sine');tn(220,206,2,.15,'triangle');tn(330,318,1.5,.1,'sine')}
function sWhoosh(){nz(.14,'highpass',1800,.07,4500)}
function sBlk(){tn(900,700,.05,.1,'square');nz(.05,'highpass',3000,.1)}
const pad=document.createElement('div');pad.id='pad';
pad.innerHTML='<div id="dp"><span style="top:6px;left:50%;transform:translateX(-50%)">▲</span><span style="bottom:6px;left:50%;transform:translateX(-50%)">▼</span><span style="left:8px;top:50%;transform:translateY(-50%)">◀</span><span style="right:8px;top:50%;transform:translateY(-50%)">▶</span><div class="kn"></div></div><div id="ab"><button id="bp">LYÖNTI</button><button id="bk">POTKU</button><button id="bj">HYPPY</button><button id="bh">HAUKI</button></div>';
{const st=document.createElement('style');st.textContent='#pad{display:none;width:var(--gw);min-width:min(320px,100%);margin-top:10px;justify-content:space-between;align-items:center;gap:14px;user-select:none;-webkit-user-select:none;touch-action:none}#dp{position:relative;width:calc(136px*var(--ts,1));height:calc(136px*var(--ts,1));border-radius:50%;background:#2a2f3e;border:3px solid var(--line);touch-action:none;flex:none}#dp span{position:absolute;color:#cfd6e6;font-size:18px;line-height:1;pointer-events:none}#dp .kn{position:absolute;width:46px;height:46px;border-radius:50%;background:#6a7290;left:calc(50% - 23px);top:calc(50% - 23px);pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,.4)}#ab{display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;max-width:300px}#ab button{margin:0;padding:calc(22px*var(--ts,1)) 4px;font-size:calc(16px*var(--ts,1));border-radius:40px;touch-action:none}#bp{background:#c8323c!important}#bk{background:#2f6fd0!important}#bj{background:#7a3fc8!important;display:none}#bh{background:#2f8f55!important;grid-column:span 2;padding:12px 4px!important}';document.head.appendChild(st)}
cv.after(pad);
{const dp=pad.querySelector('#dp'),kn=pad.querySelector('.kn');
 const set=e=>{const r=dp.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2,m=Math.hypot(x,y)||1,t=r.width*.15;K.keys.l=x<-t?1:0;K.keys.r=x>t?1:0;K.keys.u=y<-t?1:0;K.keys.d=y>t?1:0;const k=Math.min(1,m/(r.width/2-23))*36;kn.style.transform=`translate(${x/m*k}px,${y/m*k}px)`};
 dp.addEventListener('pointerdown',e=>{e.preventDefault();audioInit();try{dp.setPointerCapture(e.pointerId)}catch(x){}set(e)});
 dp.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch')set(e)});
 ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>dp.addEventListener(ev,()=>{K.keys.l=K.keys.r=K.keys.u=K.keys.d=0;kn.style.transform=''}));
 [['bp','P'],['bk','K'],['bh','H'],['bj','J']].forEach(([id,a])=>pad.querySelector('#'+id).addEventListener('pointerdown',e=>{e.preventDefault();audioInit();fPress(a)}))}
const KM={ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r',ArrowUp:'u',w:'u',W:'u',ArrowDown:'d',s:'d',S:'d'};
addEventListener('keydown',e=>{if(stage!==5&&stage!==7)return;if(KM[e.key]){K.keys[KM[e.key]]=1;e.preventDefault()}if(!e.repeat){const a={j:'P',J:'P',k:'K',K:'K',l:'H',L:'H'}[e.key];if(a)fPress(a);else if(e.key===' '&&stage===5){e.preventDefault();fPress('J')}}});
addEventListener('keyup',e=>{if((stage===5||stage===7)&&KM[e.key])K.keys[KM[e.key]]=0});
function showPad(v){pad.style.display=v?'flex':'none';document.body.classList.toggle('padon',!!v)}
function fPress(a){if(PAUSED){setPause(false);return}if(stage===5&&K.ph==='guide'){K.ph='intro';K.t=0;markGuide();return}if(stage===7){mjPress(a);return}if(stage===5&&K.ph==='fight')pushPress(K.q,K.ck,a,K.e&&K.e.y>0)}
function startFight(){stage=5;state='s5';PHB=[16,304];document.getElementById('bj').style.display='block';document.getElementById('bh').style.gridColumn='auto';K.h0=B.h;K.hs0=B.hs;K.bc=0;Object.assign(K,{foe:0,hpE:100,fx:[],q:[],hist:[],ck:0,say:null,sayT:0});setupBout();showPad(true);if(!guideSeen()){K.ph='guide';K.t=0}
 document.querySelector('p').textContent='Ristiohjain liikuttaa (ylös = hyppy, alas = kyykky, taaksepäin = torjunta). LYÖNTI ja POTKU yhdessä suunnan kanssa antavat eri liikkeitä. Näppäimistö: nuolet tai WASD, J = lyönti, K = potku, L = Hauki.';
 musicStop();musicStart('o');gong()}
function setupBout(){const f0=FOES[K.foe],fd=DIFF?Object.assign({},f0,{hp:f0.hp*1.25,mult:f0.mult*1.25,tk:f0.tk*.75,blk:f0.blk+.12,spd:f0.spd*1.15,jmp:f0.jmp?f0.jmp+.08:0}):f0;K.e=mkF(SP.e[S2.outfit],100,1,K.hpE);K.f=mkF(SP[fd.sp],222,-1,fd.hp,fd);Object.assign(K,{ph:'intro',t:0,time:75,proj:[],smoke:0,shake:0,nx:4,q:[]});
 msgL=['Erä '+(K.foe+1)+': Esa vs. '+(K.foe?'Turbo-Tapsa':'Diesel-Pena'),K.foe?'Varo turboryntäystä ja hylsyavaimia!':'Varo pakokaasupilveä!']}
function canAct(f){return!f.atk&&f.y===0&&['idle','walk','crouch','block','cblock'].includes(f.st)}
/* Ohjauksen terävyys: painallus säilyy puskurissa IBUF sekuntia, jos hahmo on vielä kesken liikettä */
const IBUF=.18;
/* Iskujen enimmäistiheys: iskujen alkujen väli vähintään ATK_MIN s, naputtelu ei nopeuta */
const ATK_MIN=.3;
/* Painallusjono: vain viimeisin iskupainallus jää odottamaan; ilmassa painettu isku ei viivästy (hyppypotku onnistuu humalassakin) */
function pushPress(q,ck,a,airborne){if(a!=='J')for(let i=q.length-1;i>=0;i--)if(q[i][1]!=='J')q.splice(i,1);q.push([ck+(airborne?0:dlyM(B.h)),a,keysNow(),ck])}
/* Osuman jälkeen iskun palautusvaiheen voi katkaista uuteen iskuun (ketjutus) */
/* true, jos edellisestä iskun alusta on alle ATK_MIN (kellon nollaus uudessa kentässä ei jumita) */
function rateLim(f,now){return f.la!==undefined&&now>=f.la&&now-f.la<ATK_MIN}
function hitCancel(f,pressT){const a=f.atk;return!!a&&!a.m.air&&!a.m.fx&&!a.m.dash&&a.hitT!==undefined&&pressT>=a.hitT&&a.t>=a.m.st+a.m.ac}
/* Koukku lennättää vastustajan korkeaan kaareen */
function launchUp(f,dir,vy){launch(f,dir,6);f.vy=vy;f.vx=dir*38;f.rwv=dir*8}
function startAtk(f,n){const m=MV[n];f.atk={m,t:0,hit:false};f.st='atk';if(!m.air)f.vx=0;if(!m.fx){sSwing(n);if((f===K.e&&(KICKS.includes(n)&&Math.random()<.4||n==='spin'))||(f!==K.e&&Math.random()<.25))kiai(f)}}
function sayF(k,t){K.say=[k,t];K.sayT=2.4;sTalk(k==='w'?0:1)}
function KO(d,why){d.ko=1;vib([50,40,120]);d.atk=null;if(d.st!=='fly')d.st='ko';bell(3);crowd(d===K.e?'gasp':'cheer');K.ph='ko';K.t=0;K.loser=d===K.e?'e':'f';gong();msgL=why||(d===K.e?['Esa kaatui!','K.O.']:[(K.foe?'Turbo-Tapsa':'Diesel-Pena')+' on tyrmätty!','K.O.!'])}
function tryHit(a,d,at){const m=at.m,sd=Math.sign(d.x-a.x)||a.face;if(!m.both&&sd!==a.face)return;if(Math.abs(d.x-a.x)>reachOf(m,1.35,1.35))return;if(['down','ko','fly','roll','kip'].includes(d.st))return;
 const cr=d.st==='crouch'||d.st==='cblock'||(d.atk&&d.atk.m.cr),air=d.y>8;if(m.h==='hi'&&cr)return;if(m.h==='lo'&&air)return;
 at.hit=true;if(at.hitT===undefined)at.hitT=K.ck;const ad=d.x>a.x?1:-1;
 if((d.st==='block'&&m.h!=='lo')||(d.st==='cblock'&&m.h==='lo')){sBlk();d.vx=ad*70;d.rwv+=ad*3;K.fx.push({x:(a.x+d.x)/2,y:FL-(m.h==='hi'?60:m.h==='lo'?14:38),t:0,c:'#cfe8ff'});return}
 const dmg=m.d*(a===K.e?pow(B.h):a.fd.mult)*(d.fd?d.fd.def:1);d.hp=Math.max(0,d.hp-dmg);d.atk=null;d.vx=ad*95;
 if(m.n==='upper'){launchUp(d,ad,230);crowd('ooh')}else if(m.kd||dmg>=10||d.hp<=0)launch(d,ad,m.n==='sweep'?2:dmg+(d.hp<=0?6:0));else{d.st='hit';d.ht=.32;d.rwv+=ad*(5+dmg*.6)}
 sImpact(KICKS.includes(m.n)?'k':'p',dmg>=10);vib(d===K.e?(dmg>=10?60:25):(dmg>=10?30:0));K.stop=dmg>=10?.09:.045;if(dmg>=10)crowd('ooh');else if(Math.random()<.45)pain(d);if(a===K.e){K.cmb=K.ck-(K.lh||-9)<1.3?(K.cmb||0)+1:1;K.lh=K.ck;if(K.cmb>=2){K.cmbT=1.3;K.bc=Math.max(K.bc||0,K.cmb);tn(660*Math.pow(1.12,K.cmb),990*Math.pow(1.12,K.cmb),.12,.07,'triangle')}}else K.cmb=0;K.shake=dmg>=12?.3:.12;K.fx.push({x:(a.x+d.x)/2,y:FL-(m.h==='hi'?60:m.h==='lo'?14:38)-d.y,t:0,c:'#fff36a',big:dmg>=12,txt:dmg>=14?'POW!':dmg>=10?'BAM!':null});
 if(d.hp<=0)KO(d)}
function special(f,o){const fx=f.atk.m.fx;
 if(fx===1){K.smoke=3;nz(1.5,'lowpass',400,.35,120);msgL=['Diesel-Pena päästi pakokaasupilven!','Köh köh!'];if(Math.abs(o.x-f.x)<60&&o.st!=='down'&&o.st!=='ko'&&o.y<10){o.hp=Math.max(0,o.hp-5);o.st='hit';o.ht=.5;if(o.hp<=0)KO(o)}}
 if(fx===2){K.proj.push({x:f.x+f.face*14,h:Math.random()<.5?'hi':'lo',vx:f.face*140,r:0});tn(700,400,.12,.06,'square');msgL=['Turbo-Tapsa heitti hylsyavaimen!','Kyykkää tai hyppää!']}}
function voice(f0,f1,dur,vw,v,dl){if(!AC)return;const n=AC.currentTime+(dl||0),o=AC.createOscillator(),g2=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(f0,n);o.frequency.exponentialRampToValueAtTime(f1,n+dur);
 g2.gain.setValueAtTime(.0001,n);g2.gain.exponentialRampToValueAtTime(v,n+.025);g2.gain.exponentialRampToValueAtTime(.001,n+dur);
 ({o:[450,800],a:[750,1150],i:[300,2200],u:[330,650]}[vw]).forEach(fr=>{const b2=AC.createBiquadFilter();b2.type='bandpass';b2.frequency.value=fr;b2.Q.value=5;o.connect(b2);b2.connect(g2)});g2.connect(master);o.start(n);o.stop(n+dur+.05)}
const VO=f=>f===K.e?240:f.fd&&f.fd.sp==='pe'?120:175;
function kiai(f){const b=VO(f);voice(b*1.15,b*.95,.13,'i',.55);voice(b*1.05,b*.7,.2,'a',.6,.1)}
function pain(f){const b=VO(f)*(.9+Math.random()*.2);voice(b,b*.65,.22,Math.random()<.5?'u':'o',.55)}
function crowd(t){if(!AC)return;if(t==='ooh'){for(let i=0;i<7;i++){const b=120+Math.random()*150;voice(b,b*.8,.8,'o',.12,Math.random()*.08)}nz(.6,'bandpass',600,.05,400)}
 else if(t==='gasp'){for(let i=0;i<7;i++){const b=160+Math.random()*120;voice(b*1.1,b*.6,1,'o',.12,Math.random()*.1)}}
 else{nz(1.8,'bandpass',1300,.14,900);for(let i=0;i<14;i++){const b=150+Math.random()*220;voice(b,b*1.1,.25,Math.random()<.5?'a':'i',.12,Math.random()*1.3)}tn(1800,2500,.35,.05,'sine',.2);tn(2500,1900,.3,.05,'sine',.55)}}
function bell(n){for(let i=0;i<n;i++){tn(1320,1310,.9,.13,'sine',i*.22);tn(2650,2630,.5,.05,'sine',i*.22);tn(3960,3940,.3,.03,'sine',i*.22)}}
const KICKS=['kick','hikick','bkick','sweep','fkick','spin','dash'];
function sImpact(k,big){const r=.88+Math.random()*.24;
 if(k==='p'){nz(.05,'highpass',2600*r,.5,1400);nz(.09,'bandpass',950*r,.55,420);tn(190*r,70,.09,.5,'sine')}
 else{nz(.11,'bandpass',620*r,.6,200);tn(125*r,42,.17,.65,'sine');nz(.04,'highpass',3600,.32)}
 if(big){nz(.35,'lowpass',900,.45,110);tn(62,30,.42,.65,'sine');nz(.13,'highpass',5200,.25,2200);tn(900*r,300,.06,.12,'square')}}
function sSwing(n){if(n==='spin'){for(let i=0;i<6;i++)nz(.1,'bandpass',900+i*250,.12,2600+i*300);tn(400,1400,.5,.04,'triangle');tn(2400,2500,.15,.05,'sine',.05);return}
 KICKS.includes(n)?nz(.2,'bandpass',900,.12,3600):nz(.09,'highpass',2500,.09,5800)}
function sThud(big){nz(big?.28:.16,'lowpass',big?420:520,big?.45:.3,90);tn(big?58:72,30,big?.3:.14,big?.65:.4,'sine');if(big)nz(.08,'highpass',3000,.08,1500)}
function launch(f,dir,str){f.st='fly';f.atk=null;f.y=Math.max(f.y,.01);f.vy=60+str*5;f.vx=dir*(50+str*4);f.rwv=dir*(4+str*.2);f.bn=0;f.lie=undefined}
function phys(f,dt){
 if(f.st==='fly'){f.vy-=440*dt;f.y+=f.vy*dt;f.rw+=f.rwv*dt;if(Math.abs(f.rw)>1.6){f.rw=Math.sign(f.rw)*1.6;f.rwv*=.4}
  if(f.y<=0){f.y=0;if(!f.bn&&f.vy<-70){f.bn=1;f.vy=-f.vy*.3;f.vx*=.55;sThud(false);K.shake=Math.max(K.shake,.15)}
   else{f.vy=0;f.lie=f.rw>=0?1:-1;f.st=f.ko?'ko':'down';f.dt=.6;sThud(true);K.fx.push({x:f.x+f.lie*20,y:FL-3,t:0,c:'#e8e0ff'})}}}
 else if(f.st==='down'||f.st==='ko'){if(f.lie===undefined){f.lie=-f.face}f.rw+=(f.lie*1.5-f.rw)*Math.min(1,dt*12);const cx=Math.max(PHB[0]+(f.lie<0?44:0),Math.min(PHB[1]-(f.lie>0?44:0),f.x));f.x+=(cx-f.x)*Math.min(1,dt*5)}
 else if(f.st==='roll'){f.gt+=dt;const u=Math.min(1,f.gt/.5);f.rw=f.lie*(1.5+(Math.PI*2-1.5)*ease(u));f.vx=f.lie*50*(1-u*.5);if(u>=1){f.st='idle';f.rw=0;f.rwv=0;f.vx=0;f.lie=undefined}}
 else if(f.st==='kip'){f.gt+=dt;if(f.gt>.16&&!f.kj){f.kj=1;f.vy=130;f.y=.01;voice(VO(f)*1.1,VO(f)*1.3,.12,'u',.4);nz(.12,'highpass',2000,.08,4500)}
  if(f.kj){f.vy-=440*dt;f.y=Math.max(0,f.y+f.vy*dt);f.rw+=(0-f.rw)*Math.min(1,dt*11);if(f.y===0&&f.vy<0){f.st='idle';f.vy=0;f.rw=0;f.rwv=0;f.lie=undefined;f.kj=0;nz(.06,'lowpass',500,.12);nz(.04,'highpass',2500,.2,1500)}}}
 else{f.rwv+=(-170*f.rw-13*f.rwv)*dt;f.rw+=f.rwv*dt}}
function upd(f,o,dt){
 phys(f,dt);
 if(!['fly','kip'].includes(f.st)&&(f.y>0||f.vy>0)){f.vy-=440*dt;f.y=Math.max(0,f.y+f.vy*dt);if(f.y===0){f.vy=0;if(f.st==='jump'||(f.atk&&f.atk.m.air)){f.atk=null;f.st='idle';nz(.06,'lowpass',500,.12)}}}
 if(f.atk){const a=f.atk,m=a.m;a.t+=dt;if(m.dash){f.vx=a.t>=m.st&&a.t<m.st+m.ac?f.face*230:0}
  if(!a.hit&&a.t>=m.st&&a.t<=m.st+m.ac){if(m.fx){a.hit=true;special(f,o)}else tryHit(f,o,a)}
  if(f.atk&&!m.air&&a.t>=m.st+m.ac+m.rc){f.atk=null;f.st='idle'}}
 f.x+=f.vx*dt;if(f.st==='hit'||f.st==='down'||f.st==='ko'||(f.st==='fly'&&f.y===0))f.vx*=Math.pow(.02,dt);
 if(f.st==='hit'){f.ht-=dt;if(f.ht<=0)f.st='idle'}if(f.st==='down'){f.dt-=dt;if(f.dt<=0){f.gt=0;f.kj=0;f.vx=0;if(Math.random()<(f.fd?(f.fd.sp==='ta'?.75:.3):.5)){f.st='kip';sWhoosh()}else{f.st='roll';f.x+=f.lie*16;nz(.3,'bandpass',600,.12,300);nz(.25,'bandpass',1400,.06,500,);sThud(false)}}}if(f.st==='block'&&f.bt>0){f.bt-=dt;if(f.bt<=0)f.st='idle'}
 if(!f.atk&&f.y===0&&!['ko','down','fly','roll','kip'].includes(f.st))f.face=o.x>f.x?1:-1;
 f.x=Math.max(16,Math.min(304,f.x))}
function ctrlE(dt){const e=K.e,now=K.ck,dl=dlyM(B.h);K.hist.push([now,keysNow()]);while(K.hist.length>1&&K.hist[1][0]<=now-dl)K.hist.shift();const d=K.hist[0][1],fwd=e.face>0?d.r:d.l,back=e.face>0?d.l:d.r;
 if(canAct(e)){if(d.u&&!K.pu){e.vy=160;e.y=.01;e.vx=(fwd?1:back?-1:0)*e.face*60;e.st='jump';tn(300,600,.1,.05)}
  else if(d.d){e.st=back?'cblock':'crouch';e.vx=0}else if(back){e.st='block';e.vx=-e.face*30;e.wk+=dt}else if(fwd){e.st='walk';e.vx=e.face*50;e.wk+=dt}else{e.st='idle';e.vx=0}
  if(B.h>=55&&e.y===0&&e.st==='idle'){e.sw-=dt;if(e.sw<=0){e.sw=1.2+Math.random()*2;e.vx=(Math.random()-.5)*(B.h-40)*1.6}}}
 K.pu=d.u;
 while(K.q.length&&K.q[0][0]<=now){const [t0,a,kz,pt]=K.q[0],cx=a!=='J'&&e.y===0&&hitCancel(e,pt),rl=a!=='J'&&rateLim(e,now);if(rl||!(canAct(e)||(a!=='J'&&e.st==='jump'&&!e.atk)||cx)){if(now-t0>IBUF){K.q.shift();continue}break}K.q.shift();if(cx){e.atk=null;e.st='idle'}if(a!=='J')e.la=now;const kd=kz||d,fw=e.face>0?kd.r:kd.l,bk=e.face>0?kd.l:kd.r;
  if(a==='J'){e.vy=160;e.y=.01;e.vx=(fw?1:bk?-1:0)*e.face*60;e.st='jump';tn(300,600,.1,.05);continue}
  let n;
  if(a==='H'){if(B.hs<=0||e.y>0)continue;B.hs--;n='spin';msgL=['HAUKI-PYÖRRE!','Hauki-shotteja jäljellä: '+B.hs];sShot()}
  else if(e.y>0)n=a==='P'?'jpunch':'fkick';else if(kd.d)n=a==='P'?'lowp':'sweep';else if(fw)n=a==='P'?'upper':'hikick';else if(bk&&a==='K')n='bkick';else n=a==='P'?'punch':'kick';
  if(B.h>=80&&a==='K'&&e.y===0&&Math.random()<.14){launch(e,-e.face,1);msgL=['Esa kompastui omaan potkuunsa!','Liikaa kuparia...'];nz(.3,'lowpass',600,.25,150);continue}
  startAtk(e,n)}}
function ai(f,o,dt){const fd=f.fd;f.sc-=dt;
 if(f.st==='jump'&&!f.atk&&f.jk>0){f.jk-=dt;if(f.jk<=0)startAtk(f,'fkick')}
 if(!(f.st==='idle'||f.st==='walk'))return;
 const d=Math.abs(o.x-f.x),dir=Math.sign(o.x-f.x)||1;
 if(o.atk&&!o.atk.seen&&o.atk.t<o.atk.m.st&&d<o.atk.m.r+10){o.atk.seen=1;if(o.atk.m.h!=='lo'&&Math.random()<fd.blk){f.st='block';f.bt=.4;f.vx=0;return}}
 f.th-=dt;
 if(f.th>0){if(d>fd.pref+8){f.st='walk';f.vx=dir*fd.spd;f.wk+=dt}else if(d<fd.pref-10){f.st='walk';f.vx=-dir*fd.spd*.6;f.wk+=dt}else{f.st='idle';f.vx=0}return}
 f.th=fd.tk*(.6+Math.random()*.9);
 if(f.sc<=0){if(fd.sp==='pe'&&d<80){f.sc=DIFF?6.5:9;startAtk(f,'smoke');return}
  if(fd.sp==='ta'){f.sc=(5+Math.random()*2)*(DIFF?.7:1);if(d>70&&Math.random()<.55){startAtk(f,'throw');return}if(d>45){startAtk(f,'dash');msgL=['TURBORYNTÄYS!','Hyppää yli!'];tn(200,900,.4,.1,'sawtooth');return}}}
 if(fd.jmp&&d<80&&d>30&&Math.random()<fd.jmp){f.vy=150;f.y=.01;f.vx=dir*62;f.st='jump';f.jk=.22;return}
 const n=pick(fd.moves);if(d<=reachOf(MV[n],1.35,1.35)-2)startAtk(f,n);else{f.st='walk';f.vx=dir*fd.spd}}
function stepFight(dt){K.t+=dt;musicTick();K.sayT-=dt;K.shake=Math.max(0,K.shake-dt);K.smoke=Math.max(0,K.smoke-dt);K.fx.forEach(x=>x.t+=dt);K.fx=K.fx.filter(x=>x.t<.45);
 const e=K.e,f=K.f;document.getElementById('bh').style.visibility=B.hs>0?'visible':'hidden';document.getElementById('bh').textContent='HAUKI ×'+B.hs+(DESK?' (L)':'');
 if(K.ph==='guide'){if(K.t>12){K.ph='intro';K.t=0;markGuide()}return}if(K.ph==='intro'){if(K.t>2.4){K.ph='fight';K.t=0;msgL=['TAISTELE!'];bell(1)}}
 else if(K.ph==='fight'){if(K.stop>0){K.stop-=dt;return}K.ck+=dt;if(e.hp<25){K.hb=(K.hb||0)-dt;if(K.hb<=0){K.hb=.78;tn(72,44,.12,.55,'sine');tn(66,40,.1,.45,'sine',.17)}}ctrlE(dt);ai(f,e,dt);upd(e,f,dt);upd(f,e,dt);
  const dx=f.x-e.x;if(Math.abs(dx)<20&&e.y<18&&f.y<18&&!(f.atk&&f.atk.m.dash)){const p=(20-Math.abs(dx))/2,s=Math.sign(dx)||1;e.x-=s*p;f.x+=s*p}
  K.proj.forEach(p=>{p.x+=p.vx*dt;p.r+=dt*16;if(!p.done&&Math.abs(p.x-e.x)<9&&e.st!=='down'&&e.st!=='ko'){const cr=e.st==='crouch'||e.st==='cblock'||(e.atk&&e.atk.m.cr);if(p.h==='hi'&&cr)return;if(p.h==='lo'&&e.y>6)return;p.done=1;
   if(e.st==='block'&&p.h==='hi'){sBlk();return}e.hp=Math.max(0,e.hp-7);e.st='hit';e.ht=.3;e.atk=null;e.rwv+=Math.sign(p.vx)*6;sImpact('p',false);tn(1800,1700,.08,.12,'square');tn(2500,2450,.12,.06,'square',.02);K.stop=.05;K.cmb=0;pain(e);K.fx.push({x:p.x,y:FL-(p.h==='hi'?58:10),t:0,c:'#fff36a'});if(e.hp<=0)KO(e)}});
  K.proj=K.proj.filter(p=>!p.done&&p.x>-10&&p.x<330);
  K.time-=dt;if(K.time<=0&&K.ph==='fight'){const l=e.hp>=f.hp?f:e;KO(l,['Portsari: Aika loppui, pojat!',(l===f?'Esalla':'Vastustajalla')+' oli enemmän energiaa.'])}
  K.nx-=dt;if(K.nx<=0&&K.sayT<=0){K.nx=3+Math.random()*3;const k=pick(['a','k','w',K.foe?'ta':'pe']);sayF(k,pick(CHE[k]))}}
 else if(K.ph==='ko'){upd(e,f,dt);upd(f,e,dt);if(K.t>2.8){if(K.loser==='f'){if(K.foe===0){K.ph='break';K.hpE=Math.max(30,e.hp);K.t=0}else{K.ph='win';K.t=0;K.hx=20;PTS.fight=Math.round((400+e.hp*2+(K.bc||0)*25)*(DIFF?1.5:1));e.x=150;e.face=1;f.x=212;musicStop();musicStart('c')}}else{K.ph='lose';K.t=0;loseLife();musicStop()}}}
 else if(K.ph==='win'){K.hx+=Math.min(60*dt,Math.max(0,e.x-26-K.hx));if(K.t>11)onBossWon()}}
function act5(e){if(!e||e.target!==cv)return;if(K.ph==='guide'){K.ph='intro';K.t=0;markGuide();return}const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;
 if(K.ph==='break'&&K.t>.5){if(y>=110&&y<=134){if(x>=48&&x<=154){B.h+=13;K.hpE=Math.min(100,K.hpE+15);sCan();K.foe=1;setupBout();gong()}else if(x>=166&&x<=272){K.foe=1;setupBout();gong()}}return}
 if(K.ph==='lose'&&K.t>1.5&&LIVES>0){B.h=K.h0;B.hs=K.hs0;startFight();return}if(K.ph==='win'){if(K.t>8.5)onBossWon();else if(K.t>3)K.t=Math.max(K.t,7);return}if(K.ph==='lose'&&K.t>1.5){showPad(false);restartAll()}}
function charPt(x,y,o,lx,ly){const s=o.s||1,cy=o.cy||0,px=(o.flip?-1:1)*s*(lx-13),py=s*(ly-51)+cy*s,r=o.rot||0;return[x+px*Math.cos(r)-py*Math.sin(r),y-cy*s+px*Math.sin(r)+py*Math.cos(r)]}
/* liikevana: aseen heilautus ja koukku jättävät hetkeksi valkoisen kaaren */
function swingTrail(f,o,x,y,now){const a=f.atk;if(!a||f.st!=='atk'){f.tr=null;return}const m=a.m,wpn=!!o.wsw;if(!wpn&&m.n!=='upper'){f.tr=null;return}
 f.tr=f.tr||[];const t=a.t;if(t>=m.st&&t<m.st+m.ac+(m.rc||.15)*.45){const A=o.aR||0,E=o.eR||0,sc=o.sR||1,B=o.bob||0,ex=12.5-Math.sin(A)*5.6*sc,ey=23+B+Math.cos(A)*5.6*sc,hx=ex-Math.sin(A+E)*6*sc,hy=ey+Math.cos(A+E)*6*sc;
  let p1,p2;if(wpn){const L=(f.wt==='w'?11:14)*(o.iS||1),ir=o.iR||0;p1=charPt(x,y,o,hx,hy);p2=charPt(x,y,o,hx+Math.sin(ir)*L,hy-Math.cos(ir)*L)}else{p1=charPt(x,y,o,ex,ey);p2=charPt(x,y,o,hx,hy)}f.tr.push([p1[0],p1[1],p2[0],p2[1],now])}
 f.tr=f.tr.filter(p=>now-p[4]<.11&&now>=p[4]);g.save();for(let i=1;i<f.tr.length;i++){const p=f.tr[i-1],q=f.tr[i],al=(1-(now-p[4])/.11)*(wpn?.5:.6);g.fillStyle=`rgba(255,255,255,${al})`;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[2],p[3]);g.lineTo(q[2],q[3]);g.lineTo(q[0],q[1]);g.closePath();g.fill()}g.restore()}
function fpose(f,T,isE){const a=f.atk,m=a&&a.m,ex=a?(a.t<m.st?ease(a.t/m.st):a.t<m.st+m.ac?1:m.rc?Math.max(0,1-(a.t-m.st-m.ac)/m.rc):1):0,lp=(x,y)=>x+(y-x)*ex;
 const G={aL:-.75+Math.sin(T*6)*.05,eL:-2.0,aR:-1.15+Math.sin(T*6+1)*.06,eR:-1.55+Math.sin(T*6+.5)*.06,lL:.24,lR:-.24,kL:.3,kR:.22,bob:Math.sin(T*6+f.x)*.6,tilt:0,blink:((T+f.x)%4.1)<.12};let o;
 if(f.st==='ko'||f.st==='down')o={aL:1.2,eL:.3,aR:-.6,eR:-.4,lL:.2,lR:-.3,kL:.5,kR:.2,cy:2,blink:true,dy:-2};
 else if(f.st==='fly')o={aL:1.9+Math.sin(T*17)*.6,eL:Math.sin(T*13)*.6,aR:-1.9+Math.sin(T*15+1)*.6,eR:Math.sin(T*12+2)*.6,lL:.5+Math.sin(T*13)*.5,lR:-.5+Math.sin(T*14+2)*.5,kL:.4+Math.sin(T*11)*.5,kR:.3+Math.sin(T*9+1)*.5,blink:true,cy:26-24*Math.min(1,Math.abs(f.rw)/1.5),tilt:Math.sin(T*11)*.3};
 else if(f.st==='roll')o={lL:-1.4,lR:-1.6,kL:2.3,kR:2.3,aL:-1.2,eL:-1.8,aR:-1.3,eR:-1.8,dy:7,cy:14};
 else if(f.st==='kip')o=f.kj?{aL:2.3,eL:.4,aR:-2.3,eR:-.4,lL:.35,lR:-.35,cy:2}:{lL:-1.1,lR:1.1,aL:2.8,eL:-.9,aR:-2.8,eR:.9,cy:2,dy:-2};
 else if(f.st==='hit')o={aL:.7,eL:.5,aR:-.3,eR:.6,lL:.15,lR:-.1,kL:.4,kR:.25,rot:-.25,cy:26,blink:true};
 else if(f.st==='crouch')o={...G,lL:-.45,kL:1.75,lR:-1.25,kR:2.05,dy:7};
 else if(f.st==='cblock')o={...G,lL:-.45,kL:1.75,lR:-1.25,kR:2.05,dy:7,aL:-.9,eL:-2.2,aR:-1.05,eR:-2.1};
 else if(f.st==='block')o={...G,aL:-.9,eL:-2.2,aR:-1.05,eR:-2.1,rot:-.08,cy:26};
 else if(f.st==='jump')o={...G,lL:.15,kL:1.75,lR:-1.0,kR:1.5,aL:-1.1,eL:-1.1,aR:-1.4,eR:-1.2};
 else if(f.st==='walk'){const w=walk(T,f.wk,f.x);o={...w,aL:G.aL+w.aL*.3,eL:G.eL,aR:G.aR-w.aL*.3,eR:G.eR}}
 else if(f.st==='atk'){const n=m.n,pre=a.t<m.st?Math.sin(Math.PI*Math.min(1,a.t/m.st)):0;o={...G};
  if(f.wpn>0&&f.wt&&(n==='punch'||n==='jpunch'||n==='lowp'||n==='upper')){const t=a.t,st=m.st,ac=m.ac,rc=m.rc||.15,L2=(x,y,u)=>x+(y-x)*u;
   if(t<st){const u=ease(t/st);o.aR=L2(-1.15,-3.0,u);o.eR=L2(-1.55,-.5,u);o.iR=L2(.3,-1.5,u);o.rot=-.1*u;o.lx=-2*u;o.aL=L2(-.75,.3,u)}
   else if(t<st+ac){let v=Math.min(1,(t-st)/(ac*.6));v=1-Math.pow(1-v,3);o.aR=L2(-3.0,-1.5,v);o.eR=L2(-.5,.05,v);o.iR=L2(-1.5,1.65,v);o.rot=.17*v;o.lx=5*v;o.aL=L2(.3,-.2,v);o.sR=1.15}
   else{const w=Math.min(1,(t-st-ac)/rc),w1=Math.min(1,w/.35);o.aR=w<.35?L2(-1.5,-1.0,w1):L2(-1.0,-1.15,(w-.35)/.65);o.eR=L2(.05,-1.55,w);o.iR=w<.35?L2(1.65,2.3,w1):L2(2.3,.3,(w-.35)/.65);o.rot=.17*(1-w);o.lx=5*(1-w);o.sR=1.15-.15*w}
   if(f.wt==='k')o.iS=t>=st?1.35:1;o.cy=26;if(n==='jpunch'){o.lL=.15;o.kL=1.75;o.lR=-1.0;o.kR=1.5}if(n==='lowp'){o.lL=-.45;o.kL=1.75;o.lR=-1.25;o.kR=2.05;o.dy=7}o.wsw=1}
  else if(n==='punch'||n==='jpunch'){o.aR=lp(-1.15,-1.57)+.6*pre;o.eR=lp(-1.55,0)-.8*pre;o.aL=lp(-.75,-.25);o.eL=lp(-2.0,-2.3);o.tilt=.1*ex;o.rot=.13*ex-.07*pre;o.cy=26;o.lx=4*ex-2*pre;if(n==='jpunch'){o.lL=.15;o.kL=1.75;o.lR=-1.0;o.kR=1.5}}
  else if(n==='upper'){o.cy=26;if(a.t<m.st){const u=ease(a.t/m.st);o.aR=-1.15+1.5*u;o.eR=-1.55-.9*u;o.bob=3.5*u;o.rot=.1*u;o.lL=.24+.25*u;o.kL=.3+.7*u;o.kR=.22+.7*u}else if(a.t<m.st+m.ac){let v=Math.min(1,(a.t-m.st)/(m.ac*.6));v=1-Math.pow(1-v,3);const L2=(x,y)=>x+(y-x)*v;o.aR=L2(.35,-1.95);o.eR=L2(-2.45,-1.3);o.bob=L2(3.5,-4);o.tilt=-.2*v;o.rot=L2(.1,.02);o.lx=7*v;o.aL=L2(-.75,.2);o.lL=L2(.49,.24);o.kL=L2(1,.3);o.kR=L2(.92,.22)}else{o.aR=lp(-1.15,-1.95);o.eR=lp(-1.55,-1.3);o.bob=-4*ex;o.tilt=-.2*ex;o.rot=.02*ex;o.lx=7*ex;o.aL=lp(-.75,.2)}}
  else if(n==='lowp'){o.lL=-.45;o.kL=1.75;o.lR=-1.25;o.kR=2.05;o.dy=7;o.aR=lp(-1.15,-1.25)+.5*pre;o.eR=lp(-1.55,0)-.7*pre;o.rot=.1*ex;o.cy=10;o.lx=3*ex-1.5*pre}
  else if(n==='kick'){o.lR=-.24-1.35*ex-.5*pre;o.kR=4.8*ex*(1-ex)+.05+1.6*pre;o.rot=-.2*ex+.05*pre;o.cy=26;o.lx=2*ex;o.aL=lp(-.75,.5);o.aR=lp(-1.15,-.4)}
  else if(n==='hikick'){o.lR=-.24-2.05*ex-.5*pre;o.kR=5.2*ex*(1-ex)+.05+1.6*pre;o.kL=.35;o.rot=-.4*ex;o.cy=26;o.lx=1.5*ex;o.aL=lp(-.75,.8);o.eL=lp(-2.0,-.6);o.aR=lp(-1.15,-.3)}
  else if(n==='bkick'){o.lR=-.24-1.45*ex-.5*pre;o.kR=4.8*ex*(1-ex)+.05+1.4*pre;o.rot=-.3*ex;o.cy=26;if(a.t<m.st*.6)o.flipX=f.face>0}
  else if(n==='sweep'){o.lL=-.45;o.kL=1.75;o.lR=-1.25-.45*ex;o.kR=2.05*(1-ex)+.1;o.dy=8;o.rot=-.16*ex;o.cy=10;o.aL=1.1;o.eL=-.3;o.lx=2*ex}
  else if(n==='fkick'){o.lR=-1.35;o.kR=0;o.lL=.6;o.kL=1.7;o.rot=-.22;o.cy=26;o.aL=1.6;o.eL=-.4;o.aR=-1.3;o.eR=-1.4}
  else if(n==='spin'){o.aL=1.57;o.eL=0;o.aR=-1.57;o.eR=0;o.flipX=Math.floor(a.t/.06)%2===0;o.bob=-2}
  else if(n==='smoke'){o.rot=.18*ex;o.cy=26;o.aL=.4;o.eL=-.6;o.aR=-.6;o.eR=-1.6;o.blink=ex>.5}
  else if(n==='throw'){if(a.t<m.st){o.aR=lp(-1.15,2.4);o.eR=lp(-1.55,.9)}else{o.aR=-1.5;o.eR=0}}
  else if(n==='dash'){o.rot=.28*ex;o.cy=26;o.aL=.9;o.eL=0;o.aR=-1.2;o.eR=-.6;o.lL=.5;o.kL=.9;o.lR=-.6;o.kR=.3}
  if(o.wsw){}else if(n==='punch'||n==='jpunch'||n==='lowp')o.sR=1+.4*ex;else if(n==='upper')o.sR=1+.5*ex;else if(n==='kick'||n==='hikick'||n==='bkick')o.qR=1+.35*ex;else if(n==='sweep')o.qR=1+.3*ex;else if(n==='fkick')o.qR=1.3}
 else o=G;
 if(isE&&B.h>=55&&f.st!=='ko'&&f.st!=='down'){o.rot=(o.rot||0)+Math.sin(T*1.7)*(B.h-55)/220;o.cy=o.cy||26}
 if(isE)o.blush=Math.min(.55,Math.max(0,(B.h-25)/80));return o}
function drawF(f,T,isE){const o=fpose(f,T,isE);o.prof=1;o.s=1.35;o.flip=o.flipX!==undefined?o.flipX:f.face<0;{const pp=['fly','down','ko','roll','kip'].includes(f.st);o.rot=pp?f.rw:(o.rot||0)*f.face+f.rw;if(!pp&&Math.abs(f.rw)>.02&&!o.cy)o.cy=4}ell(f.x,FL+1,14,3,'rgba(0,0,0,.4)');{const X=f.x+(o.lx||0)*1.35*f.face,Y=FL-f.y+(o.dy||0)*1.35;drawChar(f.sp,X,Y,o);swingTrail(f,o,X,Y,T)}
 if(f.st==='ko')for(let j=0;j<3;j++){const a=T*4+j*2.1;ell(f.x+(f.lie||-f.face)*28+Math.cos(a)*7,FL-10+Math.sin(a)*2,1.4,1.4,'#ffe27a')}
 if(f.atk&&f.atk.m.n==='spin'){g.save();g.globalAlpha=.5;g.strokeStyle='#3aff8a';g.lineWidth=1.5;for(let i=0;i<3;i++){g.beginPath();g.ellipse(f.x,FL-36+i*10,26-i*3,6,0,T*20+i,T*20+i+4);g.stroke()}g.restore()}}
function fightBg(T){let q=g.createLinearGradient(0,10,0,120);q.addColorStop(0,'#07040f');q.addColorStop(1,'#1c0c32');g.fillStyle=q;g.fillRect(0,10,W,110);
 for(let i=0;i<46;i++){const x=(((160+Math.cos(i*2.4+T*.5)*(30+i*5)+i*37)%W)+W)%W,y=14+((i*29+T*9)%100);g.fillStyle=`hsla(${i*40},90%,75%,.5)`;g.fillRect(x,y,1.3,1.3)}
 g.save();g.font='bold 13px monospace';g.textAlign='center';g.shadowBlur=8;g.shadowColor='#ff3aa8';g.fillStyle='#ffd0ec';g.fillText('FALCON',160,44);g.restore();
 ell(160,24,7,7,'#8a90a0','#333');for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){if(i*i+j*j>5)continue;const v=Math.sin(T*3+i*1.3+j*2.1);g.fillStyle=v>.5?'#fff':'#9aa0b0';g.fillRect(160+i*2.4-1,24+j*2.4-1,2,2)}
 g.fillStyle='#0e0a18';g.fillRect(0,118,W,42);const beat=Math.floor((mus?mus.step:T*7)/4);
 for(let c=0;c<16;c++)for(let r=0;r<4;r++){const on=(c+r*2+beat)%4===0;g.fillStyle=`hsl(${(c*25+beat*40)%360},70%,${on?40:12}%)`;g.fillRect(c*20+.5,119+r*10.3,19,9.8)}
 aurora('yleisoF',T,()=>{for(let i=0;i<15;i++){const x=10+i*21.5;if(i===1||i===2||i===13)continue;const o=dance4(T*.8,i*1.7);o.aL=2.6+Math.sin(T*6+i)*.3;o.aR=-2.6-Math.sin(T*6+i+1)*.3;o.s=.68;o.tint='rgba(22,6,44,.82)';o.flip=i%2>0;drawChar([SP.w,SP.a,SP.k,SP.ws,SP.e[1],SP.as][i%6],x,122,o)}});
 [[SP.a,31.5,'a'],[SP.w,53,'w'],[SP.k,289.5,'k']].forEach(([sp,x],i)=>{const o=K.ph==='lose'?idle(T,i):dance4(T,i*2);o.s=.7;o.aL=2.5+Math.sin(T*7+i)*.35;o.aR=-2.5-Math.sin(T*7+i+2)*.35;drawChar(sp,x,124,o)})}
function hpBar(x,w,v,mx,name,right){R('#000',x-1,13,w+2,8);R('#3a1010',x,14,w,6);const f=w*v/mx;R(v/mx<.3?'#ff4040':'#ffd23a',right?x+w-f:x,14,f,6);R('rgba(255,255,255,.4)',right?x+w-f:x,14,f,1.5);g.save();g.font='bold 7px monospace';g.textAlign=right?'right':'left';g.fillStyle='#fff';g.shadowColor='#000';g.shadowBlur=2;g.fillText(name,right?x+w:x,29);g.restore()}
function drawFight(T){const e=K.e,f=K.f;g.font='bold 8px monospace';g.textBaseline='alphabetic';
 g.save();if(K.shake>0)g.translate((Math.random()-.5)*4,(Math.random()-.5)*3);fightBg(T);
 K.proj.forEach(p=>{g.save();g.translate(p.x,FL-(p.h==='hi'?58:10));g.rotate(p.r);g.fillStyle='#b8bcc8';g.fillRect(-6,-1.2,12,2.4);ell(-6,0,2.6,2.6,'#b8bcc8','#333');ell(6,0,2.2,2.2,'#b8bcc8','#333');ell(-6,0,1,1,'#222');g.restore()});
 if(K.ph==='win'){drawF(f,T,false);const o=dance4(T,0);o.s=1.35;drawChar(e.sp,e.x,FL,o);const w=walk(T,K.t,2);w.s=1.25;w.blush=.4;drawChar(SP.w,K.hx,FL,K.hx>=e.x-27?Object.assign(dance4(T,1),{s:1.25,blush:.5}):w);
  for(let k=0;k<3;k++){const ph=(T*.4+k*.33)%1;g.globalAlpha=1-ph;g.fillStyle='#ff4a7a';const hx=(e.x+K.hx)/2-6+k*6,hy=80-ph*30;g.beginPath();g.moveTo(hx+2.5,hy+4.5);g.bezierCurveTo(hx-1,hy+1.5,hx+1,hy-1.5,hx+2.5,hy+.8);g.bezierCurveTo(hx+4,hy-1.5,hx+6,hy+1.5,hx+2.5,hy+4.5);g.fill()}g.globalAlpha=1}
 else{const ord=e.atk?[f,e]:[e,f];ord.forEach(x=>drawF(x,T,x===e))}
 K.fx.forEach(x=>{const u=x.t/.45,r=(x.big?14:9)*(.4+u);g.strokeStyle=x.c;g.globalAlpha=1-u;g.lineWidth=1.2;for(let i=0;i<8;i++){const a=i*.785+.3;g.beginPath();g.moveTo(x.x+Math.cos(a)*r*.4,x.y+Math.sin(a)*r*.4);g.lineTo(x.x+Math.cos(a)*r,x.y+Math.sin(a)*r);g.stroke()}
  if(x.txt){g.font='bold 11px monospace';g.textAlign='center';g.fillStyle='#ffe23a';g.strokeStyle='#a01010';g.lineWidth=2;g.strokeText(x.txt,x.x,x.y-12-u*8);g.fillText(x.txt,x.x,x.y-12-u*8);g.font='bold 8px monospace'}g.globalAlpha=1});
 if(K.smoke>0){const a=Math.min(1,K.smoke)*.85;for(let i=0;i<16;i++){const cx=f.x-f.face*10+Math.sin(i*1.9+T)*70,cy=60+((i*23+T*14)%90);g.fillStyle=`rgba(40,38,44,${a*(.5+.5*Math.sin(i))})`;g.beginPath();g.arc(cx,cy,14+(i%4)*5,0,7);g.fill()}}
 g.save();g.globalCompositeOperation='lighter';[[60,0],[260,2]].forEach(([sx,ph],i)=>{const ex=sx+Math.sin(T*.6+ph)*60,c=`hsla(${(T*40+i*150)%360},90%,60%,`;const q=g.createLinearGradient(0,10,0,160);q.addColorStop(0,c+'.22)');q.addColorStop(1,c+'.04)');g.fillStyle=q;g.beginPath();g.moveTo(sx-2,10);g.lineTo(sx+2,10);g.lineTo(ex+22,160);g.lineTo(ex-22,160);g.fill()});g.restore();
 if(K.sayT>0&&K.say){const k=K.say[0],p=k==='a'?[31,74]:k==='w'?[53,74]:k==='k'?[289,74]:[f.x,64];sbub(p[0],p[1],K.say[1])}
 g.restore();
 hpBar(8,130,e.hp,e.mhp,'ESA',false);if(K.cmbT>0&&K.cmb>=2){K.cmbT-=1/60;g.save();g.font='bold 13px monospace';g.textAlign='center';const sc2=1+Math.max(0,K.cmbT-1)*1.5;g.translate(160,74);g.scale(sc2,sc2);g.lineWidth=3;g.strokeStyle='#4a0a2a';g.strokeText(K.cmb+' OSUMAN KOMBO!',0,0);g.fillStyle='#ffe23a';g.fillText(K.cmb+' OSUMAN KOMBO!',0,0);g.restore()}hpBar(182,130,f.hp,f.mhp,f.fd.name,true);
 g.save();g.font='bold 11px monospace';g.textAlign='center';g.fillStyle='#fff';g.shadowColor='#000';g.shadowBlur=3;g.fillText(Math.max(0,Math.ceil(K.time)),160,22);g.restore();
 let q=g.createLinearGradient(0,0,0,10);q.addColorStop(0,'#fff');q.addColorStop(1,'#c8ccd8');g.fillStyle=q;g.fillRect(0,0,W,10);R('#000',0,10,W,.5);tx('POMOTAISTELU – ERÄ '+(K.foe+1)+'/2'+(DIFF?' (KOVA)':''),4,8,'#000');tx('Hauki: '+B.hs,W-4,8,'#000','right');
 q=g.createLinearGradient(0,160,0,200);q.addColorStop(0,'#b8bccc');q.addColorStop(1,'#7c8096');g.fillStyle=q;g.fillRect(0,160,W,40);R('#fff',0,160,W,.6);R('#20243a',4,164,198,32);
 q=g.createLinearGradient(0,165,0,195);q.addColorStop(0,'#fdfdf6');q.addColorStop(1,'#e4e4d4');g.fillStyle=q;g.fillRect(5,165,196,30);drawMsg(196);
 const ku=kunto(B.h);tx('KUNTO:',206,172,'#000');tx(ku[0],244,172,ku[1]);tx('VOIMA: '+Math.round(pow(B.h)*100)+' %',206,183,'#000');tx('VIIVE: '+Math.round(dlyM(B.h)*1000)+' ms',206,194,'#000');
 const big=(t,y,c)=>{g.save();g.font='bold 22px monospace';g.textAlign='center';g.lineWidth=4;g.strokeStyle='#1a0820';g.strokeText(t,160,y);g.fillStyle=c||'#ffe23a';g.fillText(t,160,y);g.restore()};
 if(K.ph==='intro'){big(K.t<1.3?'ERÄ '+(K.foe+1):'TAISTELE!',78);g.save();g.font='bold 9px monospace';g.textAlign='center';g.fillStyle='#fff';g.shadowColor='#000';g.shadowBlur=3;g.fillText('Esa vs. '+(K.foe?'Turbo-Tapsa':'Diesel-Pena'),160,94);g.restore()}
 if(K.ph==='ko'&&K.t>.3)big('K.O.!',78,'#ff5a3a');
 if(K.ph==='guide'){g.fillStyle='rgba(8,4,20,.72)';g.fillRect(0,10,W,150);g.save();g.textAlign='center';g.font='bold 13px monospace';g.fillStyle='#ffe23a';g.fillText('OHJAUS',W/2,30);g.font='bold 7.5px monospace';g.fillStyle='#fff';['← →  kävele   HYPPY tai ↑  hyppy   ↓  kyykky','Taaksepäin pohjassa  =  torjunta','LYÖNTI / POTKU  =  perusiskut','eteen + LYÖNTI  =  yläkoukku    eteen + POTKU  =  korkea potku','alas + POTKU  =  pyyhkäisy (kaataa)','ilmassa POTKU  =  lentopotku','HAUKI  =  Hauki-pyörre (Hauki-shoteista)'].forEach((l,i)=>g.fillText(l,W/2,48+i*13));g.fillStyle=Math.sin(T*5)>-.4?'#9ff':'rgba(150,255,255,.4)';g.font='bold 8px monospace';g.fillText('Napauta aloittaaksesi',W/2,148);g.restore()}if((K.ph==='guide'||K.ph==='intro'||(K.ph==='fight'&&K.t<4))&&innerHeight>innerWidth&&innerWidth<760){R('rgba(255,210,58,.92)',40,32,240,14);g.save();g.textAlign='center';g.font='bold 7.5px monospace';g.fillStyle='#1a0820';g.fillText('↻ Käännä puhelin vaakaan – ohjaus toimii paremmin',W/2,42);g.restore()}if(K.ph==='break'){box3('ERÄ 1 VOITETTU!',['Diesel-Pena makaa tanssilattialla.','Seuraavaksi: Turbo-Tapsa','Esan energia: '+Math.round(K.hpE)+'   Humala: '+Math.round(B.h),'Kupari: +15 energiaa, +13 humalaa','','']);
  [[48,'JUO KUPARI','#c8702a'],[166,'JATKA','#3b7dd8']].forEach(([x,t,c])=>{R('#20243a',x-1,111,108,22);R(c,x,112,106,20);g.save();g.font='bold 9px monospace';g.textAlign='center';g.fillStyle='#fff';g.fillText(t,x+53,125);g.restore()})}
 if(K.ph==='win'&&K.t>3){if(K.t<7)box3('VOITTO!',['Diesel-äijät lensivät ulos Falconista.','Hempukka: Sä olit ihan sankari, Esa!','Aapeli: ID.3-jengi voittaa aina!','Kermis: Ihan tahallaan.']);
  else{g.fillStyle=`rgba(0,0,0,${Math.min(1,(K.t-7)/1.5)})`;g.fillRect(0,0,W,H);if(K.t>8){g.save();g.textAlign='center';g.fillStyle='#ffd0ec';g.font='bold 12px monospace';g.fillText('Mutta kun porukka astui ulos Falconista...',160,82);g.restore()}}}
 if(K.ph==='lose'&&K.t>1)box3('ESA TYRMÄTTIIN',['Portsari heitti koko porukan hankeen.','Kermis: Ihan tahallaan.',RT()])}
