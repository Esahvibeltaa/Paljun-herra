# Paljun herra – jatkosuunnitelma

## Nykytila

Pelissä on jo seuraavat vaiheet:

1. Allas ja sauna (aloitusohje ja tavoitelista)
2. Mökki
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
- Mökki-vaiheeseen lisää tekemistä ja vitsejä.
- Lisää salaisuuksia, kuten Plaid-nopeus, muihin vaiheisiin.
- Koodin siivous: vanhat käyttämättömät piirtofunktiot pois.
