/* Paljun Herra 2 – Ääni: syntetisaattori ja efektit (pohja: Paljun herra 1) */
const flakes=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,v:12+Math.random()*20,p:Math.random()*6}));
let steam=[];
const pick=a=>a[Math.floor(Math.random()*a.length)];
let AC=null,mute=false,muteM=false,musB=null,master,nb,sil=null,ambG=null,bubG=null;
// Ääniparametrin muutos: vanhat ajastukset poistetaan ensin, jotta niitä ei kerry (ei suoria .value/setTargetAtTime-asetuksia joka kehys)
function setAP(p,v,tc){if(!AC)return;const t0=AC.currentTime;if(p.cancelAndHoldAtTime)p.cancelAndHoldAtTime(t0);else p.cancelScheduledValues(t0);p.setTargetAtTime(v,t0,tc)}
function audioInit(){
 try{navigator.audioSession.type='playback'}catch(e){}if(!sil){sil=new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');sil.loop=true;sil.play().catch(()=>{})}if(AC){AC.resume();return}
 try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 master=AC.createGain();master.gain.value=mute?0:.8;master.connect(AC.destination);musB=AC.createGain();musB.gain.value=muteM?0:.8;musB.connect(AC.destination);
 const len=AC.sampleRate*2;nb=AC.createBuffer(1,len,AC.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
 const ws=AC.createBufferSource();ws.buffer=nb;ws.loop=true;
 const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=500;bp.Q.value=.7;
 const wg=AC.createGain();wg.gain.value=.2;
 const l1=AC.createOscillator();l1.frequency.value=.12;const g1=AC.createGain();g1.gain.value=250;l1.connect(g1);g1.connect(bp.frequency);
 const l2=AC.createOscillator();l2.frequency.value=.07;const g2=AC.createGain();g2.gain.value=.1;l2.connect(g2);g2.connect(wg.gain);
 ambG=AC.createGain();ambG.connect(master);ws.connect(bp);bp.connect(wg);wg.connect(ambG);ws.start();l1.start();l2.start();
 const bs=AC.createBufferSource();bs.buffer=nb;bs.loop=true;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=380;
 const bg2=AC.createGain();bg2.gain.value=.09;const l3=AC.createOscillator();l3.frequency.value=5.5;const g3=AC.createGain();g3.gain.value=.05;l3.connect(g3);g3.connect(bg2.gain);
 bubG=AC.createGain();bubG.connect(master);bs.connect(lp);lp.connect(bg2);bg2.connect(bubG);bs.start();l3.start();
}
function nz(dur,type,f,v,f2){if(!AC)return;const s=AC.createBufferSource();s.buffer=nb;const fl=AC.createBiquadFilter();fl.type=type;const n=AC.currentTime;fl.frequency.setValueAtTime(f,n);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,n+dur);const gn=AC.createGain();gn.gain.setValueAtTime(v,n);gn.gain.exponentialRampToValueAtTime(.001,n+dur);s.connect(fl);fl.connect(gn);gn.connect(master);s.start(n,Math.random());s.stop(n+dur)}
function tn(f,f2,dur,v,type,delay){if(!AC)return;const n=AC.currentTime+(delay||0),o=AC.createOscillator();o.type=type||'sine';o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(f2,n+dur);const gn=AC.createGain();gn.gain.setValueAtTime(v,n);gn.gain.exponentialRampToValueAtTime(.001,n+dur);o.connect(gn);gn.connect(master);o.start(n);o.stop(n+dur)}
function sCan(){tn(1800,900,.03,.08,'square');nz(.9,'highpass',3500,.22,1500);[.3,.58,.84].forEach((d,i)=>tn(180-i*10,110,.12,.25,'sine',d))}
function sDoor(){tn(220,330,.35,.05,'sawtooth');tn(90,50,.15,.3,'sine',.3)}
function sFlush(){nz(1.4,'lowpass',900,.18,300)}
function sEnd(r){if(r==='d'){[0,.3,.6].forEach((d,i)=>tn(500-i*100,200,.25,.18,'sine',d));nz(1.2,'lowpass',700,.12,200)}else if(r==='f'){tn(1400,300,.9,.1,'triangle');tn(2400,2300,.5,.05,'sine',.1)}else{[[330,250,.4,0],[300,220,.4,.4],[270,170,.9,.8]].forEach(a=>tn(a[0],a[1],a[2],.08,'sawtooth',a[3]));nz(2,'bandpass',1500,.05,900)}}
/* Puhelimen soittoääni: kaksi vuorottelevaa piippausta */
function sRing(){[0,.11,.22,.33,.44].forEach((d,i)=>tn(i%2?1660:1320,i%2?1660:1320,.08,.045,'square',d))}
