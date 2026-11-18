/* Paljun Herra 2 – Musiikki: kappaleet ja ajastin (pohja: Paljun herra 1) */
let mus=null;
const CH=[[55,[220,261.6,329.6]],[43.65,[174.6,220,261.6]],[65.41,[261.6,329.6,392]],[49,[196,246.9,293.7]]];
const HOOK=[0,-1,2,-1,1,-1,2,-1,0,-1,2,-1,1,2,1,0];
function musicStart(m){if(!AC||mus)return;const gn=AC.createGain();gn.gain.value=m==='e'?.26:.32;if(m==='e'){const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=4200;gn.connect(lp);lp.connect(musB||master)}else gn.connect(musB||master);mus={next:AC.currentTime+.15,step:0,g:gn,m}}
function musicStop(){if(mus){setAP(mus.g.gain,0,.15);mus=null}}
function duck(v){if(mus)setAP(mus.g.gain,v,.25)}
function mt(t0,f,f2,dur,v,type,dt2){const o=AC.createOscillator();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);if(f2!==f)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);if(dt2)o.detune.value=dt2;const q=AC.createGain();q.gain.setValueAtTime(v,t0);q.gain.exponentialRampToValueAtTime(.001,t0+dur);o.connect(q);q.connect(mus.g);o.start(t0);o.stop(t0+dur+.02)}
function mn(t0,dur,type,f,v){const s=AC.createBufferSource();s.buffer=nb;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;const q=AC.createGain();q.gain.setValueAtTime(v,t0);q.gain.exponentialRampToValueAtTime(.001,t0+dur);s.connect(fl);fl.connect(q);q.connect(mus.g);s.start(t0,Math.random());s.stop(t0+dur+.02)}
const EL=[[76,-1,74,76,-1,72,-1,74,76,-1,79,-1,76,74,72,-1],[72,-1,72,74,-1,72,-1,69,72,-1,74,-1,72,69,65,-1],[72,-1,74,76,-1,79,-1,76,74,-1,72,-1,74,76,79,-1],[74,-1,71,74,-1,79,-1,74,71,-1,74,-1,76,74,71,-1]],mf=n=>440*Math.pow(2,(n-69)/12);
function euroStep(t0,st){const s=st%16,bar=Math.floor(st/16),tr=mus&&mus.m==='c'?Math.floor(bar/16)%2:0,c=(tr?CH2:CH)[bar%4],sec=Math.floor(bar/4)%2;
 if(s%4===0)mt(t0,160,45,.16,.95,'sine');
 if(s%4===2){mt(t0,c[0]*2,c[0]*2,.11,.3,'sawtooth');mn(t0,.16,'highpass',7000,.12)}if(s%4===3)mt(t0,c[0]*4,c[0]*4,.08,.16,'sawtooth');
 if(s%2===1)mn(t0,.03,'highpass',9500,.06);
 if(s===4||s===12){mn(t0,.14,'bandpass',1400,.32);mn(t0+.01,.12,'bandpass',2400,.18)}
 if(s===0)c[1].forEach(f=>[-12,0,12].forEach(d=>mt(t0,f,f,1.6,.025,'sawtooth',d)));
 if(s===0||s===3||s===6||s===10||s===12)c[1].forEach(f=>{mt(t0,f*2,f*2,.12,.035,'sawtooth',-9);mt(t0,f*2,f*2,.12,.035,'sawtooth',9)});
 if(sec){const n=(tr?EL2:EL)[bar%4][s];if(n>0){const f=mf(n);mt(t0,f,f,.14,.055,'square',-6);mt(t0,f,f,.14,.055,'square',6);mt(t0,f*2,f*2,.1,.02,'sine')}}
 if(s===15&&bar%4===3)mn(t0,.25,'highpass',3000,.15)}
const PW={};function pw(d){if(!PW[d]){const n=40,re=new Float32Array(n),im=new Float32Array(n);for(let k=1;k<n;k++)re[k]=2/(k*Math.PI)*Math.sin(k*Math.PI*d);PW[d]=AC.createPeriodicWave(re,im)}return PW[d]}
function tv(t0,f,dur,v,w,dt2){const o=AC.createOscillator();if(typeof w==='number')o.setPeriodicWave(pw(w));else o.type=w;o.frequency.setValueAtTime(f,t0);if(dt2)o.detune.value=dt2;const q=AC.createGain();q.gain.setValueAtTime(v,t0);q.gain.setValueAtTime(v*.75,t0+dur*.6);q.gain.linearRampToValueAtTime(.0001,t0+dur);o.connect(q);q.connect(mus.g);o.start(t0);o.stop(t0+dur+.02)}
/* Paljun herran tunnari: alkuperäinen sävellys, E-molli, 150 bpm */
const TB=[40,36,38,35,40,36,38,35],TC=[[0,3,7],[0,4,7],[0,4,7],[0,3,7]];
const TM=[[76,-1,79,-1,83,-1,81,79,-1,78,79,-1,76,-1,74,-1],[72,-1,76,-1,79,-1,76,-1,74,72,71,-1,72,-1,-1,-1],[74,-1,78,-1,81,-1,79,78,-1,76,78,-1,81,-1,83,-1],[83,-1,81,-1,78,-1,74,-1,71,-1,74,-1,78,-1,-1,-1],
 [88,-1,86,-1,83,-1,86,88,-1,86,83,-1,79,-1,81,83],[84,-1,83,-1,79,-1,76,-1,79,-1,84,-1,83,-1,79,-1],[86,-1,83,-1,81,-1,78,81,-1,83,86,-1,90,-1,88,86],[83,-1,-1,-1,78,-1,83,-1,86,-1,83,-1,81,-1,78,-1]];
function titleStep(t0,st,L){const s=st%16,b0=Math.floor(st/16),intro=b0<2,bar=b0%8,r=TB[bar],c=TC[bar%4];
 if(s%2===0)tv(t0,mf(s%4===0?r:r+12),L*1.7,.42,'triangle');
 if(s===0||s===8||(s===10&&bar%2))mt(t0,140,38,.13,.85,'sine');
 if(s===4||s===12)mn(t0,.13,'bandpass',2600,.3);if(s%2===1)mn(t0,.025,'highpass',8500,.07);if(s===14&&bar===7)mn(t0,.2,'bandpass',1800,.25);
 tv(t0,mf(r+24+c[s%3]),L*.85,.035,.125);
 if(!intro){const row=TM[bar],n=row[s];if(n>0){let k=0;while(k<3&&row[s+1+k]===-1)k++;const d=L*(1+k)*.92;tv(t0,mf(n),d,.1,.25);tv(t0+L*.75,mf(n),d*.6,.025,.25)}}}
function musicTick(){if(!mus||!AC)return;const L=60/(mus.m==='t'?150:mus.m==='o'?112:mus.m==='b'?150:mus.m==='bb'?164:mus.m==='n'?132:140)/4;if(mus.next<AC.currentTime-.1){const k=Math.ceil((AC.currentTime-mus.next)/L);mus.step+=k;mus.next+=k*L}
 while(mus.next<AC.currentTime+.2){if(mus.m==='t'){titleStep(mus.next,mus.step,L);mus.next+=L;mus.step++;continue}if(mus.m==='n'){cutStep(mus.next,mus.step,L);mus.next+=L;mus.step++;continue}if(mus.m==='b'||mus.m==='bb'){beatStep(mus.next,mus.step);mus.next+=L;mus.step++;continue}if(mus.m==='o'){orientStep(mus.next,mus.step);mus.next+=L;mus.step++;continue}if(mus.m==='e'||mus.m==='c'){euroStep(mus.next,mus.step);mus.next+=L;mus.step++;continue}const t0=mus.next,st=mus.step,s=st%16,c=CH[Math.floor(st/16)%4];
  if(s%4===0)mt(t0,150,42,.14,.9,'sine');
  if(s%4===2){mn(t0,.09,'highpass',8000,.18);mt(t0,c[0],c[0],.17,.28,'sawtooth')}
  if(s===4||s===12){mn(t0,.12,'bandpass',1600,.35);mn(t0+.012,.1,'bandpass',2200,.2)}
  if(s%2===1)mn(t0,.03,'highpass',9000,.07);
  if(s===0||s===6||s===10)c[1].forEach(f=>{mt(t0,f,f,.2,.07,'sawtooth',-7);mt(t0,f,f,.2,.07,'sawtooth',7)});
  const h=HOOK[s];if(h>=0){const f=c[1][h]*2;mt(t0,f,f,.13,.06,'square',-5);mt(t0,f,f,.13,.06,'square',5)}
  mus.next+=L;mus.step++}}
function sSip(){nz(.7,'highpass',3500,.1,1500);[.35,.6].forEach(d=>tn(170,105,.12,.1,'sine',d))}
function sTalk(w){[0,.09,.18].forEach((d,i)=>{const f0=w?150+i*12:480+i*40;tn(f0,f0*.9,.07,.05,'square',d)})}

/* Välinäytöksen jännitysteema: alkuperäinen, E-molli, 132 bpm. Matala sykkivä basso, hiljainen arpeggio ja harva virveli */
const CB=[40,36,38,35],CA=[[0,3,7,12],[0,4,7,12],[0,4,7,10],[0,3,7,12]];
function cutStep(t0,st,L){const s=st%16,bar=Math.floor(st/16)%4,r=CB[bar];
 if(s%2===0)tv(t0,mf(r),L*1.6,.34,'triangle');if(s===0||s===10)mt(t0,120,40,.16,.7,'sine');
 if(s===8)mn(t0,.16,'bandpass',1800,.18);if(s%4===2)mn(t0,.03,'highpass',8000,.05);
 if(st>=32){const c=CA[bar];tv(t0,mf(r+24+c[s%4]),L*.8,.03,.125)}
 if(s===0&&bar===0)tv(t0,mf(r+36),L*12,.022,.5)}
