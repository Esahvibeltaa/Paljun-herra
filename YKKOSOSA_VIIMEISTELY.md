# Ykkösosan viimeistely Paljun Herra 2:n ohjeiden mukaan

Tämä tehtävä on tarkoitettu ykkösosan (`index.html`) keskusteluun. Noudata myös juuren `CLAUDE.md`:tä, eli ykkösosan omaa työtapaa: Playwright-testit, julkaisu ykkösosan artifactiin, commit ja push. Windows-versio rakennetaan uudelleen, jos käyttäjä haluaa.

## 1. Lue ensin

- `GRAFIIKKAOHJE.md` kokonaan. Se on yhteinen molemmille peleille, ja sitä noudatetaan aina. Ohjeen lopussa on tarkistuslista.
- Mallit löytyvät jatko-osan koodista `paljun-herra-2/src/`, erityisesti tiedostoista `10_mattinta.js`, `10b_rovaniemi.js` ja `05_hahmot.js`.

## 2. Käy kaikki vaiheet läpi tarkistuslistan avulla

Ota kuvakaappaukset jokaisesta vaiheesta ja korjaa löydökset: allas ja sauna, mökki, Cessna, Falcon, taistelu, Moottorijahti kaikkine kenttineen (pääkatu, huoltoasema, romuttamo, teollisuusalue ja autotalli) sekä epilogi. Tarkista erityisesti nämä:

- **Mittasuhteet hahmoihin:** hahmo on noin 52 px, ovi noin 58 px, katutason kerros noin 68 px ja muut kerrokset noin 56 px. Pelaajien tason esineet piirretään hahmojen kokoisiksi, ja taustoissa noudatetaan perspektiiviä.
- **Reunat:** mikään pinta ei pääty tyhjään, vaan reunassa on seinä, pilari tai kehys. Ovet, ikkunat ja myymälät mahtuvat kokonaan rakennuksen sisään (`fitRow`).
- **Rakenteet:** tukevat pilarit, palkit ja tolpat. Pilarit piirretään portaiden taakse ja nostetaan portaiden sisään, jotta liitoskohta ei näy.
- **Piirtojärjestys:** revontulet aina taivaan jälkeen ja ennen maastoa ja rakennuksia. Taustatalot piirretään kokonaisina eikä puolikkaina.
- **Valot ja tekstit:** kirkkaat pinnat pidetään himmeinä, jottei hehku liimaa niitä. Tekstit ovat terävinä omalla taulullaan (`labelBoard`).
- **Elävyys:** toistuvissa esineissä on vaihtelua kiinteällä `hsh`-satunnaisluvulla, esimerkiksi roskisten malleissa (`BINS`, `binDraw`) ja lumipenkoissa.

## 3. Katot ylös ja ulkoasu jatko-osan mukaiseksi

- **Nosta kaikki liian matalat katot.** Moottorijahdin teollisuusalueen (`L2`) katot ovat nyt 32 ja 38 px, mikä on hahmoa matalampi. Katon täytyy olla vähintään yhden kerroksen korkeudella (56 px tai enemmän). Teollisuusalueelle sopii esimerkiksi noin 80 ja 96 px. Tarkista myös muut korkeudet, kuten rampin pituus, `S`-kohta ja vihollisten kattoaallot.
- **Pystykamera:** ota käyttöön jatko-osan `mjCamY` ja pystyparallaksi (`vpar` ja kenttäasetus `camY:{off,max}`), jotta korkeat katot mahtuvat ruutuun. Taivas pysyy paikallaan, ja kaukaiset kerrokset liikkuvat vain osan matkasta.
- **Yhtenäinen ulkoasu jatko-osan kanssa:**
  - Kattorakennukset ovat hahmojen mittakaavassa: kerrokset, ihmisen kokoiset ikkunat syvennyksineen ja kulmapilarit. Rakennukset piirretään välimuistiin (`RFC`, `rfBldDraw`, ja tarvittaessa oma julkisivumaalari `roof.paintA/paintB`).
  - Ramppi saa kantavan palkin ja tukevat betonipilarit anturoineen (`RAMP`).
  - Ovitalot ja muut pelaajien tason rakennukset ovat kaksikerroksisia ja hahmojen mittakaavassa (`DOORW`-malli).
  - Roskiksissa on vaihtelua (`BINS`), ja lumipenkoilla on satunnainen muoto.

## 4. Tikapuut ja kiipeäminen

Kopioi jatko-osan tiedostosta `paljun-herra-2/src/10_mattinta.js` seuraavat osat: `LADDER`, `ladderDraw(X,top,bot)` ja `climbPose(base)`. Tiedostosta `05_hahmot.js` kopioidaan `buildSpr`-funktion `post`-parametri ja takaa nähty Esa (`ESA_BACK`, `esaBackPost`, `esaBack`).

- `roofDraw`-funktiossa vanha tikaspiirto korvataan näin: `{const X=r.lad-c;if(X>-20&&X<W+20)ladderDraw(X,112-r.A[2],113)}`
- `mjDrawE`-funktiossa vanha climb-asento korvataan näin: `if(f.st==='climb')Object.assign(o,climbPose(f.base||0))`
- Kiipeävä Esa piirretään takaa, kasvot tikkaita kohti: `drawChar(f===M.e&&f.st==='climb'?esaBack(S2.outfit):f.sp, ...)`

Tikapuut ovat 18 px leveät, puolat ovat 8 px välein, kaiteet jatkuvat katon yli kaarevina kahvoina, ja mukana ovat seinäkiinnikkeet ja jalat. Kiipeämisasento lasketaan korkeudesta: kädet vuorottelevat puola kerrallaan ja vastakkainen polvi nousee.

## 5. Lopuksi

Aja ykkösosan kaikki aiemmat testit (allas, intro, vaiheet, katot ja reunat) ja mittaa kehysaika Shift+F-mittarilla. Kirjaa muutokset `SUUNNITELMA.md`:n kohtaan "Tehty myöhemmin", julkaise ja kerro käyttäjälle lyhyesti, mitä korjasit.
