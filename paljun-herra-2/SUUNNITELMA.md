# Paljun Herra 2 Paluu of drunken master

## Tavoite

Jatko-osa, jossa ykkösosan parhaat osat ovat pohjana:

- **Pääpeli:** sivuttain vierivä mätkintä (Moottorijahdin moottori): kentät, syvyyssuunta, kaverit tekoälynä, aseet (putki, ketju, hylsyavain), roskikset, kupari ja vesipullot, katot ja tasohyppely.
- **Pomotaistelut:** Falconin kaksinkamppailu (1v1): torjunta, kyykky, hypyt, koukku ja potkut.
- **Grafiikka:** retrotyyli aina päällä, pikselihahmot, venyvät raajat, liikevanat.
- **Hahmot mukana:** Esa, Aapeli, Kermis ja Hempukka.

## Nykytila (prototyyppi)

- Moottori erotettu ykkösosasta moduuleiksi (`src/`), koonti yhdeksi tiedostoksi.
- Intro: PALJUN HERRA 2 – PALUU OF DRUNKEN MASTER, tunnusmusiikki.
- Kulku: linkki aloittaa suoraan alkunäytöksen (ei päävalikkoa vielä) → pelin nimi mustalla → harjoituskenttä (mätkintä) → pomotaistelu (1v1) → loppuruutu → alkunäytös.
- Viholliset ja pomot ovat ykkösosan **paikkamerkkejä** (Diesel-jengi, Pena, Tapsa).
- Ykkösosan tarinakentät ovat vielä mukana tietona (`L1`, `LG`, `LS`, `L2`, `LB`), mutta eivät käytössä.

## Tarinapolku (karkea luonnos, kommentoitavana)

Perusidea (tarkentuu alkunäytöksen mukaan: Mersumies on palannut ja kaapannut Sam Discon palvelimen): **Esalta viedään palju.** Ilman paljua ei ole paljun herraa. Esa saa ensin turpaansa, oppii humalanyrkin vanhalta mestarilta ja hakee valtaistuimensa takaisin. Klassinen drunken master -kaari: nöyryytys → harjoitus → paluu.

| # | Vaihe | Tyyppi | Tapahtumat |
|---|-------|--------|------------|
| 0 | **Alkunäytös (tehty)** | välinäytös | NES-tyylinen elokuvakohtaus. Mökissä sankarit potevat ankaraa krapulaa, Esan puhelin soi. Vihreä takasiipinen Tesla Model 3 kiitää Lapin yössä: "Hei Esa, Pera tässä. Meillä on ongelma." Auton sisältä pelkääjän paikalta, kuski vain hämäränä ääriviivana: "Mersumies on palannut. Sam Discon palvelin on kaapattu..." Hidas häivytys mustaan. |
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
- Nimi muutettu muotoon Paljun Herra 2 Paluu of drunken master (intro: PALUU OF DRUNKEN MASTER).
- Alkunäytös: välinäytösmoottori (`12b_alkunaytos.js`: kuva-alue, kirjoituskoneteksti, puhujan nimi, ohitus S / B / OHITA), kolme kohtausta (krapulainen mökki, Tesla Lapin yössä, auton sisänäkymä), jännitysteema (`cutStep`), soittoääni (`sRing`). Intron vuoret ja kuusirivi yhteisiksi funktioiksi (`ridge`, `spruceRow`). Piirto noin 2–3 ms/kehys.
- Teslan sivuprofiili Model 3:n (Highland) mukaan: matala pyöreä nokka, kalteva tuulilasi, yhtenäinen kattokaari viistoperään, musta lasikatto, viiltovalot, aerovanteet (`TESLA`, `teslaPath`), koko 1,2×.
- Alkunäytöksen äänet ja loppu: mökissä ei taustaääniä, hiljainen kuorsaus (`sSnore`) soittoon asti ja jännitysteema vastaamisen jälkeen; autokohtauksissa oma ajobiitti (`driveStep`, 16-bittisten toimintapelien henkeen, alkuperäinen sävellys); häivytyksen jälkeen pelin nimi mustalla tunnarin kera (`drawCutTitle`). Teslan sivulasit tummennettu, Peralle pipo ja täysin pyöreä tupsu (`PIPO`). Linkki aloittaa suoraan alkunäytöksen, päävalikko jätetty pois toistaiseksi.
- Pera takaa nähtynä: iso musta pää pipoineen ja pyöreine tupsuineen, penkin selkänoja peittää kaulan (`PERA`).
- Sisänäkymään katto ja taustapeili, viistot A-pilarit (`CABIN`) sekä tyhjä matkustajan penkki niskatukineen (`PSEAT`).
- Autokohtausten musiikille kolme vaihtoehtoa vertailuun (`DRV`, nappi Automusiikki tai M): 1 Ajobiitti, 2 Varjojahti (D-molli 160 bpm, 8-bittisten ninjapelien henkeen), 3 Kohtalon yö (C-molli 112 bpm, hidas ja uhkaava). Musiikkitilat taulukossa `MST`.
- Autokohtausten musiikiksi valittu Varjojahti (`darkStep`), muut vaihtoehdot ja valintanappi poistettu. Nimiruudulle neljä vaihtoehtoa vertailuun (`TTV`, nappi Nimiruudun musiikki tai M): Mestarin paluu (E-molli 140), Lumimyrsky (H-molli 170), Viimeinen tuoppi (A-molli 96) ja vanha tunnari. Yhteinen melodiasoitin `leadNote`.
- Nimiruudun musiikiksi valittu Viimeinen tuoppi (`vtStep`), muut vaihtoehdot ja valintanappi poistettu. Nimiruudun alareunaan © 2026 PALJUSOFT · ESA & KUPARIBÄNDI.
- Nimiruudun ALOITA vie toistaiseksi mustaan ruutuun: PELATTAVISSA PIAN... (`showSoon`, stage 9). Kenttä ja pomo jäävät koodiin odottamaan uusia vihollisia.
