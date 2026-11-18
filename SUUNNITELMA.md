# Paljun herra – jatkosuunnitelma

## Nykytila

Pelissä on jo seuraavat vaiheet:

1. Allas ja sauna (aloitusohje ja tavoitelista)
2. Mökki (kenkäjahti: tiirikointi, makuuhuone, takka, jääkaappi ja peili)
3. Lento Cessnalla (Plaid-nopeus)
4. Yökerho Falcon
5. Taistelu (Diesel-Pena ja Turbo-Tapsa)
6. Epilogi ja pistetaulukko

Lisäksi:

- kolme elämää ja vaiheen uusinta
- vaikeustasot
- ragdoll-fysiikka, iskuäänet, kombot ja iskupysähdys
- skaalautuva näkymä ja puhelimen vaakataso (lasimaiset napit)
- tauko, erilliset ääni- ja musiikkisäätimet, häivytykset ja sivun kuvake

## Seuraavaksi: Vaihe 6 "Moottorijahti"

Uusi vaihe tulee taisteluvoiton ja epilogin väliin.

Tyylinä on sivuttain vierittävä 8-bittinen mätkintä (beat 'em up). Grafiikka, hahmot, kentät ja musiikki tehdään omina.

- **Liikkuminen:** sivuttain ja kadun syvyyssuunnassa (ylös ja alas). Hahmot piirretään syvyyden mukaan oikeaan järjestykseen.
- **Vieritys:** kamera seuraa Esaa pehmeästi. Maisemassa on 3–4 kerrosta eri nopeuksilla (taivas, kaukaiset talot, katu, etualan esineet).
- **Lukittu alue:** vihollisaallon ajaksi kamera pysähtyy, ja kun alue on tyhjä, ruudulle välähtää "GO →".

### Päätökset

- **Aapeli ja Kermis taistelevat tekoälyn ohjaamina Esan rinnalla** (vaihtoehto A).
  - Aapeli on nopea ja potkii.
  - Kermis on vahva. Hänen erikoisliikkeensä on ilmakitarasoolo, joka tainnuttaa lähellä olevat.
  - Kaverit voivat väsyä ja istahtaa hetkeksi, mutta eivät kuole.
- **Aluksi 2 kenttää ja pomo.** Lisää kenttiä (huoltoasema, romuttamo) voidaan lisätä myöhemmin.
- **Loppuvastus on Mersumies.** Hänen vaarallinen erikoisvoimansa on Mersun tähtien heittely: tähdet lentävät kuin heittotähdet, ja niitä väistetään hyppäämällä tai liikkumalla syvyyssuunnassa.
- **Erillinen HYPPY-nappi**, koska ristiohjaimen ylös-suunta liikuttaa kadun syvyyssuunnassa.

### Juoni (ensimmäinen versio)

1. **Alku Falconin pihalla:** Cessnan nokka on auki ja moottori poissa.
   - Kermis: "Joku on vienyt mun moottorin!"
   - Hangessa on dieselpakun renkaanjäljet, ja porukka lähtee perään.
2. **Kenttä 1, pääkatu:** yöllinen katu, neonkyltit, kioski ja grillikoju. Diesel-jengin hampparit.
3. **Juonenkäänne kentän 1 lopussa:** pakettiauto kaappaa Hempukan.
   - Pakettiauto kiihdyttää ohi, ja ikkunasta kuuluu "Esaaa!".
   - Tästä eteenpäin etsitään sekä moottoria että Hempukkaa.
4. **Kenttä 2:** esimerkiksi huoltoasema tai teollisuusalue. Kovemmat viholliset, ja Diesel-Pena ja Turbo-Tapsa palaavat revanssiin.
5. **Pomo, Mersumiehen autotalli:** Mersumies heittelee Mersun tähtiä.
   - Hempukka on köytettynä tuolissa, ja moottori on pöydällä.
6. **Loppu:** Hempukka vapautetaan ja moottori viedään takaisin.
   - Kermis ruuvaa moottorin paikalleen ("Ihan tahallaan").
   - Lennetään kotiin, ja peli jatkuu epilogiin.

### Ohjaus

- Ristiohjain: vasen ja oikea liikuttavat sivuttain, ylös ja alas kadun syvyyssuunnassa.
- Napit: LYÖNTI, POTKU, HYPPY ja HAUKI.
- Lyöntisarja 1-2-3, jonka viimeinen isku kaataa.
- Heitto, kun vastustaja on vierellä ja tainnuksissa.
- Taaksepäin potkaisu takaa tuleville.
- Ilmassa POTKU on hyppypotku.

### Viholliset

- **Rasvanäppi:** perusvihollinen, haalari ja hylsyavain.
- **Pakoputki-Pasi:** heittää pakoputkenpätkiä.
- **Turbopoika:** nopea ja hyppivä.
- **Diesel-Pena ja Turbo-Tapsa** palaavat revanssiin.
- **Pomo: Mersumies.**

### Mekaniikka

- Kerättävät ja aseet roskiksista ja laatikoista:
  - kuparitölkki palauttaa energiaa, mutta nostaa humalaa
  - hylsyavain toimii lyömäaseena
  - vihollisilta voi pudota ketju tai jakoavain
- Humala vaikuttaa samoin kuin Falconissa: iskuvoima, ohjausviive ja horjunta.
- Esan elämät käyvät tässäkin vaiheessa. Jos Esa kaatuu, alue alkaa alusta.
- Pisteet:
  - voitetut viholliset
  - pelastettu Hempukka
  - löydetty moottori
  - vaiheelle oma rivi pistetaulukkoon
- Valmista koodia voi käyttää uudelleen:
  - pikselihahmot ja animaatiot
  - ragdoll-fysiikka
  - äänet
  - humalamekaniikka
  - ristiohjain, elämät ja tauko

## Ohjainten määrittely

Tehty (perustuki):

- **Peliohjaimen tuki** (Gamepad API). Taisteluissa ristiohjain tai tikku liikuttaa, ja napit lyövät, potkivat, hyppäävät ja käyttävät Haukea. Napautettavissa vaiheissa tikku liikuttaa osoitinta ja A napauttaa. Start = tauko, Select = asetukset.
- **Asetukset-valikko** alkuruudussa ja taukoruudussa. Taisteluiden näppäimet (kaksi kullekin toiminnolle) ja ohjaimen napit voi määritellä itse. Asetukset tallentuvat selaimeen.

Myöhemmin:

- Ruudulla näytettävät nappivihjeet ohjaimen mukaan (A/B/X/Y tai PlayStationin symbolit).
- Altaan näppäinten (juo, vessa, sauna, Hauki) määrittely.
- Kosketusnappien asettelu puhelimella: koon ja paikan säätö, esimerkiksi vasenkätisille.

## Muita ideoita myöhemmäksi

- Yhteinen ennätyslista pelilinkkiin, jolla pelaajat näkevät toistensa tulokset nimimerkkeineen.
- Lisää salaisuuksia, kuten Plaid-nopeus, muihin vaiheisiin.

## Tehty myöhemmin

- Moottorijahti laajennettu: pääkatu, huoltoasema, teollisuusalue, romuttamo (välivastus Trukki-Taisto) ja Mersumies. Trukki-Taisto antaa yhden sydämen (täysillä sydämillä +150 pistettä).
- Ohjainten jatko: syötteen mukaiset nappivihjeet (näppäin, Xbox tai PlayStation), altaan näppäinten määrittely, kosketusnappien koko ja vasenkätinen asettelu.
- Teollisuusalueelle kattojen tasohyppely (tikkaat, kaksi kattoa, kuja ja paloportaat) sekä putki ja ketju aseiksi, jotka hajoavat muutamassa iskussa.
- Altaan ohjaus yhtenäistetty muun pelin kanssa: alanapit poistettu, toiminnot napautetaan suoraan kohteista (tölkit tai Esa = juo, mökin ovi = vessa, uusi saunamökki = sauna, Hauki-pullo = naukku, BAARIIN-kyltti = lähtö). Kohteissa on nimilaput ja näppäin- tai ohjainvihjeet. B-näppäin lähtee baariin.
- Allas kavennettu ja piirretty syvyysvaikutelmalla: sivureunat perspektiivissä, sisäseinien varjot, kulmapylväät, portaat, pyöreä varjostus etuseinässä ja varjo hangella.
- Mökki ja saunamökki piirretty perspektiiviin: oikea sivuseinä hirsineen ja ikkunoineen sekä lumen peittämä katon sivulape näkyvät.
- Humalarajat (15–55) poistettu ohjeista. Tilalle pelinsisäiset vihjeet: Esan puhe sammaltaa humalassa (sh, venyvät vokaalit, *hik*), Hempukka ja Aapeli kehottavat hidastamaan tai ottamaan kunnolla.
- Retrotyyli: pelimaailma piirretään 320×200-pikselipuskuriin ja suurennetaan terävästi. Värit porrastetaan ruuturasteroinnilla, kirkkaat valot hehkuvat, reunoilla on vinjetti ja pikseliriveissä hento varjo. Tekstit piirretään erikseen terävinä. Retrotyyli on aina päällä (valinta poistettu asetuksista).
- Introruutu NES-henkeen: palikkamainen PALJUN HERRA -logo pudottautuu ruutuun, Esa kinoksella kupari koholla, Aapeli ja Hempukka paljussa, revontulet ja vierivät vuoret ja metsä, "PAINA START" ja valikko (Aloita peli / Asetukset). Oma chiptune-tunnari (E-molli, 150 bpm: pulssiaaltomelodia, kolmiobasso, arpeggiot ja kohinarummut) alkaa ensimmäisestä painalluksesta. Retrohehku ei enää tartu valkoiseen lumeen.
- Koko näyttö -nappi: avaa pelin koko näytölle ja kääntää puhelimen vaakaan, jos selain sallii. iPhonessa ohjeistetaan lisäämään peli Koti-valikkoon.
- Puhelimen vaakanäkymässä taisteluiden aikana sivupalkista näkyy vain Tauko, jotta Koko näyttö-, Äänet- ja Musiikki-napit eivät jää iskunappien alle. Tauolla iskunapit väistyvät ja kaikki sivupalkin napit palaavat.
- Moottorijahdissa humalan aiheuttama ohjausviive puolitettu ja rajattu enintään 0,15 sekuntiin (ennen jopa 0,4 s). Falconin taistelussa viive ennallaan.
- Moottorijahtiin vesipullot: löytyvät roskiksista (jokaisessa kentässä vähintään yksi, teollisuusalueella kaksi) ja joskus vihollisilta. Pullo laskee humalaa 25 ja antaa +5 energiaa.
- Moottorijahdin humalatasapaino: humala laskee 0,7/s, joten kuparia pitää täydentää. Paras taso on Kova kunto (55–79, voima 140 %). Liikaa! (80+): voima 160 %, mutta Esa horjahtelee ja 25 % lyönneistä menee ohi (OHI!). Viestit varoittavat liiasta ja liian selvästä humalasta.
- Altaalla kupari juodaan vain napauttamalla tölkkejä pöydällä (tai välilyönnillä). Napautus muualle ei juota, vaan antaa vihjeen korkeintaan 4 s välein.
- Koodikatselmointi ja optimointi: revontulet ja taustayleisöt välimuistikerrokseen (päivitys 20 krt/s), revontulten liukuvärit valmiiksi piirretyiksi liuskoiksi, retrotilan välipiirroissa kopioidaan vain muuttunut alue ja pikselipuskuri näytönohjaimelle. Korjattu musiikin rätinä, kun välilehti palaa taustalta intro- tai vaikeustasoruudulla.
- Moottorijahti: hahmot pysyvät taistelussa ruudulla. Viholliset rajataan näkyvään alueeseen, kun ne ovat kerran tulleet ruutuun, ja reunaan lentävä hahmo kimpoaa takaisin. Esa ja kaverit eivät enää jää puoliksi reunan taakse, eivätkä kaverit karkaa oikealle ruudun ulkopuolelle.
- Moottorijahti: tyrmätyltä viholliselta putoaa kuparitölkki 30 %:n todennäköisyydellä, Kovalla vaikeustasolla 15 %:lla (ennen noin 10 %). Muuten pudotukset ennallaan: Pasi putken 60 %:lla, muut vesipullon tai aseen 25 %:lla.
- Moottorijahdin järjestys: pääkatu, huoltoasema, romuttamo (Trukki-Taisto), teollisuusalue (katot) ja Mersumiehen autotalli. Trukki-Taisto antaa yhden sydämen. Mersumies ei enää täytä sydämiä, joten säästetyt sydämet näkyvät lopputuloksissa (100 p/kpl).
- Kenttien siirtymät tarkistettu uudessa järjestyksessä: aamu sarastaa nyt johdonmukaisesti (pääkatu ja huoltoasema yötä, romuttamolla ensimmäinen kajo, teollisuusalueella kirkkaampi rusko ja himmeämmät tähdet, lopuksi autotallin sisätila).
- Lyöntien ulottuvuus perustuu grafiikkaan: jokaiselle iskulle on mitattu nyrkin tai jalan kärjen ulottuvuus spritestä, ja osumaraja = kärki × hyökkääjän koko + vartalon puolileveys × puolustajan koko. Osuma tapahtuu vain, kun raaja koskee vartaloon (mitattu rako −1…1 px kaikissa iskuissa, Falconissa ja Moottorijahdissa, myös isokokoisia pomoja vastaan). Raajat venyvät iskiessä (käsi noin +34 %, jalka noin +28 %), ja tekoälyn etäisyydet on sovitettu rajoihin.
- Iskujen liioittelu: lyönneissä ennakkoveto taakse ja syöksy eteen, potkuissa polven nosto ja vahvempi kallistus, Esa astuu iskun mukana. Koukku: kyykky ja nyrkki nousee lantiolta viistosti ylös kaarivanan kanssa. Putki, ketju ja hylsyavain heilahtavat pään yli vaakaan eteen ja läpi alas, ketju suoristuu, ja heilautus jättää valkoisen liikevanan. Aseen ulottuvuus vastaa piirrettyä pituutta ja koskee vain käsi-iskuja.
- Tekstit: viestilaatikon teksti rivitetään yhteisellä funktiolla (drawMsg, aiemmin 8 kopiota), ja fontti pienenee, jos teksti ei mahdu kahdelle riville. Puhekuplat mitataan ja rivitetään 2–3 riville, ilmoituslaatikot (box3) rivitetään. Rivitys on välimuistissa. Koko pelin tekstitarkastus: ruudun yli menee vain taustan vierivät neonkyltit, kuten kuuluu. Koukun ulottuvuus +50 % (nyrkki viistosti eteen, osumaraja mitattu).
- Ohjauksen terävyys: poistettu yhden kehyksen ylimääräinen syöteviive, painallukset säilyvät 0,18 s puskurissa (ei enää katoa kesken liikkeen), osuman jälkeen iskun voi ketjuttaa heti seuraavaan, suunta tallennetaan painalluksen hetkellä (eteen + LYÖNTI, suunta + HYPPY toimivat samanaikaisina), humalaviive enintään 0,15 s myös Falconissa ja Moottorijahdin napeissa (bugi: napit käyttivät rajoittamatonta viivettä). Falconiin HYPPY-nappi (myös välilyönti ja ohjaimen hyppynappi). Koukku lennättää vastustajan korkealle kaareen (Mersumies vain isoilla osumilla).
- Taktisuus: iskujen enimmäistiheys (alkujen väli vähintään 0,3 s), vain viimeisin iskupainallus odottaa jonossa, ja ketjutus osuman jälkeen vaatii ajoituksen (nappi painettava osuman jälkeen). Naputus 40 krt/s antaa saman tahdin kuin ajoitetut painallukset (noin 3 iskua/s). Humalassa eteenpäin hyppypotku onnistuu: ilmassa painettu isku ei viivästy, horjahdus ei syö painalluksia eikä ilmaisku mene ohi.
- Hahmojen koot tarkistettu kaikista vaiheista: mökissä seisova Esa 0,92 → 1,1 (oli pienempi kuin pöydän takana istuvat), Falconissa seisovat hahmot 0,92–0,95 → 1,0 (istuvien kokoisiksi). Kokovakiot SC_ROOM ja SC_BAR. Muissa vaiheissa koot ovat johdonmukaiset (epilogin kaukana ovella seisova Hempukka on tarkoituksella pienempi).
- Windows-versio (Windows 10/11, toimii ilman nettiä): Neutralinojs-ikkuna (WebView2), paketti noin 3 Mt. Rakennus: desktop/build.sh, sisällön paketointi omalla pack_neu.py-skriptillä. Ohje LUEMINUT.txt.
- Suorituskyky (päävalikon hidastuminen puhelimissa): kankaan enimmäisskaala 4 (ennen 5, puhelimissa 1600×1000 → 1280×800), yksi hehkukerros kahden sijaan, vinjetti ja pikselirivien varjo CSS-kerroksena (ei piirtoa joka kehys), introruutu 30 fps. Prosessoria 6x hidastettaessa valikko 6 fps → 15–30 fps.
- Suorituskyky (Win10: peli hidastui, jos valikossa odotti pitkään): apukankaat aina prosessorilla (willReadFrequently, keskitetty getContext-asetus), äänen parametrit yhteisen setAP-funktion kautta (vanhat ajastukset poistetaan, valikko ei enää aseta ääntä joka kehys). Shift+F näyttää kehysnopeusmittarin testausta varten.
