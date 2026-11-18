# Paljun Herra 2 – the paluu of drunken master

## Tavoite

Jatko-osa, jossa ykkösosan parhaat osat ovat pohjana:

- **Pääpeli:** sivuttain vierivä mätkintä (Moottorijahdin moottori): kentät, syvyyssuunta, kaverit tekoälynä, aseet (putki, ketju, hylsyavain), roskikset, kupari ja vesipullot, katot ja tasohyppely.
- **Pomotaistelut:** Falconin kaksinkamppailu (1v1): torjunta, kyykky, hypyt, koukku ja potkut.
- **Grafiikka:** retrotyyli aina päällä, pikselihahmot, venyvät raajat, liikevanat.
- **Hahmot mukana:** Esa, Aapeli, Kermis ja Hempukka.

## Nykytila (prototyyppi)

- Moottori erotettu ykkösosasta moduuleiksi (`src/`), koonti yhdeksi tiedostoksi.
- Intro: PALJUN HERRA 2 – THE PALUU OF DRUNKEN MASTER, tunnusmusiikki.
- Kulku: intro → harjoituskenttä (mätkintä) → pomotaistelu (1v1) → loppuruutu → intro.
- Viholliset ja pomot ovat ykkösosan **paikkamerkkejä** (Diesel-jengi, Pena, Tapsa).
- Ykkösosan tarinakentät ovat vielä mukana tietona (`L1`, `LG`, `LS`, `L2`, `LB`), mutta eivät käytössä.

## Tarinapolku (karkea luonnos, kommentoitavana)

Perusidea: **Esalta viedään palju.** Ilman paljua ei ole paljun herraa. Esa saa ensin turpaansa, oppii humalanyrkin vanhalta mestarilta ja hakee valtaistuimensa takaisin. Klassinen drunken master -kaari: nöyryytys → harjoitus → paluu.

| # | Vaihe | Tyyppi | Tapahtumat |
|---|-------|--------|------------|
| 0 | **Prologi: Tyhjä laituri** | välinäytös | Vuosi ykkösosan jälkeen. Talviyö, Esa nukkuu paljussa. Aamulla Esa herää hangesta: palju on poissa, jäljellä vain lavettiauton renkaanjäljet ja käyntikortti: *"Kloori-Kalle – Kylpyläimperiumi Oy. Puulämmitys on mennyttä aikaa."* Aapeli: "Esa, sun palju." Esa: "Mun... palju." |
| 1 | **Kenttä 1: Kyläraitti** | mätkintä | Kioski, grilli, huoltoasema. Kloori-Kallen kylpytakkijengi jakaa mainoksia ("Uusi AquaDome – ei enää halkoja!"). Väliottelu: Diesel-Pena (vanha tuttu, nyt kylpylän vartijana). |
| 2 | **Nöyryytys** | välinäytös + pomo, jota ei voi voittaa | Kenttä 1:n lopussa vastaan tulee Kloori-Kallen henkivartija **Hana-Harri**. Esa on krapulassa ja häviää, vaikka tekisi mitä. Esa herää savusaunan lauteilta. |
| 3 | **Savusauna: Mestarin oppi** | harjoituskenttä | Järven takana asuu **Löylymestari** (vanha, aina pöhnässä, puhuu arvoituksin: "Tyhjä tuoppi on täynnä mahdollisuuksia."). Hän opettaa **humalanyrkin** (drunken master -mekaniikka) vaiheittain. Nykyinen harjoituskenttä sopii tähän. Lopuksi koe: 1v1 Mestaria vastaan. |
| 4 | **Kenttä 2: Satama ja kloorivarasto** | mätkintä + tasohyppely | Kontit, trukit, kloorikanisterit (vaara: liukas lattia). Löydetään rahtikirja: palju on viety kylpylään "nähtävyydeksi". Pomo: Hana-Harri, revanssi. Nyt humalanyrkki toimii. |
| 5 | **Kenttä 3: Kylpylähotelli AquaDome** | mätkintä + tasohyppely | Allasosasto, vesiliukumäet, höyryhuoneet, katot. Viholliset kylpytakeissa, uimaopettajat pillien kanssa, hierojat. Mersumies palaa (palkattu turvallisuuspäälliköksi). |
| 6 | **Loppupomo: Kloori-Kalle** | 1v1 | Kylpylän katolla Esan palju on lasivitriinissä ja täynnä kloorivettä (pyhäinhäväistys). Kloori-Kallen erikoisliikkeet: klooripommit, vesitykki, liukas lattia. |
| 7 | **Loppu** | välinäytös | Palju vapautetaan, ja Kermis lentää sen kotiin Cessnalla (köysi, tietysti). Kamiina sytytetään, Esa laskeutuu veteen. Löylymestari ilmestyy reunalle: "Nyt olet herra." Pistetaulukko. |

**Humalanyrkin opetus vaiheittain (luonnos):** Mestarin oppitunnit avaavat tyylejä yksi kerrallaan, ja jokainen sitoutuu humalatasoon:
1. **Horjuva väistö** (lievässä humalassa horjuminen väistää iskuja oikealla ajoituksella)
2. **Tuoppikoukku** (iskusarja, joka jatkuu horjahduksesta)
3. **Kaatuva puu** (kaatuminen eteen on hyökkäys)
4. **Hauki-henkäys** (Hauki-shotti erikoisliikkeeksi)
Liika humala sammuttaa, liian vähäinen ei avaa tyylejä: humala on resurssi, jota tasapainotetaan.

**Avoimet kysymykset tarinassa:**
- Pahis: Kloori-Kalle (kylpyläpomo, joka vihaa puulämmitystä) vai joku muu?
- Mestari: Löylymestari savusaunassa, vai onko mestari yllätys (esim. Esan oma isä tai ykkösosan joku tuttu)?
- Hempukka: lähteekö Esan mukaan taistelemaan, vai onko hänellä oma juonensa (esim. soluttautuu kylpylään hierojaksi ja avaa ovia)?
- Aapeli ja Kermis: kaverit tekoälynä kentissä kuten ykkösosassa, vai omat erikoistehtävät (Kermis ja Cessna)?

## Seuraavaksi päätettävät

1. **Tarina:** karkea polku yllä, tarkennetaan.
2. **Viholliset:** uudet vihollistyypit (perusvihollinen, heittäjä, nopea, raskas), uudet pomot ja niiden erikoisliikkeet.
3. **Kentät:** paikat ja niiden järjestys (taustat, esteet, tasohyppely).
4. **Drunken master -mekaniikka:** esim. humalatasoon sidottu erikoistyyli, jossa horjuminen väistää iskuja.
5. **Hempukan rooli:** pelastettava, apuri vai pelattava?
6. **Pisteytys ja loppu.**

## Tehty

- Projektin pohja: moduulit, koonti, intro, harjoituskenttä, pomotaistelu ja loppuruutu.
- Suorituskykykorjaukset ykkösosasta: apukankaat prosessorilla (willReadFrequently), ääniparametrit setAP-funktion kautta, kankaan skaalaus enintään 4×, yksi hehkukerros, vinjetti ja rivivarjo CSS-kerroksena (#fxov), introruutu 30 fps:llä, Shift+F-kehysnopeusmittari.
- Tarinapolun karkea luonnos.
