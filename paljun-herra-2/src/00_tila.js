/* Paljun Herra 2 – Pelin yhteinen tila (ladataan ensimmäisenä) */
// stage: 1 = intro/valikko, 5 = kaksinkamppailu (pomo), 7 = mätkintäkenttä, 8 = loppu
let stage=1,state='title',t=0,ot=0,reason='',best=0,msgL=['Paljun Herra 2'];
// Pisteet osa-alueittain (ptsSum laskee yhteen)
const PTS={mj:0,fight:0,lives:0};
// Esan asu: 2 = farkut ja paita (ykkösosan asutaulukko)
const S2={outfit:2};
// Humala (h) ja Hauki-shotit (hs) taisteluissa
const B={h:0,hs:2};
