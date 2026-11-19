# Paljun herra – grafiikka- ja mittasuhdeohje (molemmat pelit)

Tämä ohje kokoaa Paljun Herra 2:n kehityksessä opitut säännöt. Sitä noudatetaan **aina** sekä ykkösosassa (`index.html`) että jatko-osassa (`paljun-herra-2/src/`). Ennen kuin piirtomuutos on valmis, se käydään läpi alla olevan tarkistuslistan avulla.

## 1. Mittasuhteet hahmoihin

Perusmitta on hahmo, joka on noin **52 px** korkea (sprite koossa 1, pikselimaailma 320×200).

| Kohde | Mitta |
|---|---|
| Ovi | vähintään 22–24 × 58 px |
| Hissin kori ja hissin ovet | vähintään 28–30 × 58 px |
| Katutason kerros | noin 68 px |
| Muut kerrokset | noin 56 px |
| Ikkuna ihmisen tasossa | noin 16 × 28 px |
| Tikapuut | leveys 18 px, puolien väli 8 px (≈ 30 cm), kaiteet jatkuvat 16 px katon yli |
| Penkin istuin | noin 14 px maasta |
| Kioski, latausasema, automaatti | vähintään olkapään korkeus (40–60 px) |
| Katto, jolle kiivetään | vähintään yksi kerros (56 px) maasta |

- Ei matalia "nukkekodin" kerroksia. Jos hahmo ei mahtuisi kerrokseen seisomaan, kerros on liian matala.
- **Pelaajien tasossa** olevat rakennukset ja esineet (ovitalot, kioskit, latausasemat, roskikset) piirretään hahmojen mittakaavassa.
- **Perspektiivi:** kaukana olevat rakennukset ovat pienempiä, ja niiden ovet ja ikkunat pienenevät samassa suhteessa. Ovien ja ikkunoiden täytyy olla järkevässä suhteessa omaan rakennukseensa, ei hahmoihin.
- Mittasuhteet tarkistetaan aina kuvakaappauksesta, jossa hahmo seisoo kohteen vieressä.

## 2. Reunat ja rakenteet

- **Pinta ei koskaan pääty tyhjään.** Ikkunat, lasi, näyteikkunat ja julkisivut eivät katkea terävästi, vaan reunaan piirretään aina ohut seinä, pilari, kehys tai lista.
- **Ovet, ikkunat ja myymälät mahtuvat kokonaan rakennuksen sisään.** Ne eivät tule osittain kyljen, pilarin tai kuilun yli. Rivit sovitetaan vapaisiin väleihin ja keskitetään niihin (`fitRow`-apufunktio: vapaa väli, kohteen leveys, väli ja esteet).
- **Rakenteiden täytyy olla luontevia.** Portaat, rampit, katokset ja kyltit kantavat tukevilla pilareilla, palkeilla tai tolpilla, eivät ohuiden tikkujen varassa tai ilmassa.
  - Portaiden pilarit piirretään portaiden **taakse** ja nostetaan portaiden sisään, jolloin portaiden reuna ja kantava palkki peittävät liitoskohdan.
  - Pilarin juureen tulee antura, ja palkki kulkee yhtenäisenä.
- **Hissi on rakennuksen sisällä**, ei erillinen torni rakennusten päällä. Katutasolla ovi on julkisivussa, nousu näkyy lasikaistaleessa, ja ylhäällä on konehuone, josta astutaan ulos kattotasolle niin, että katto on hahmon edessä.
- **Tikapuut** kiinnitetään seinään kiinnikkeillä, ja niiden jalat ovat maassa. Kaiteet jatkuvat katon yli kaarevina tarttumakahvoina.

## 3. Syvyys ja kerrokset

- Rakennuksiin tehdään pientä syvyyttä: räystään varjo, varjostettu sivuseinä, ikkunasyvennys ja -penkki, sokkeli ja maavarjo. Pahvimaisuutta vältetään.
- **Taustakerrokset piirretään kokonaisina.** Osioiden rajoilla talot eivät saa leikkautua puolikkaiksi, vaan kokonaan mahtumaton talo jätetään piirtämättä. Saumat peitetään luontevalla objektilla, kuten sillan maatuella tai lyhdyllä.
- **Piirtojärjestys:** taivas, revontulet ja kuu → kaukainen maasto → kaukaiset talot → lähitalot → katu → esineet ja hahmot syvyysjärjestyksessä → etuala (lumisade). Revontulet piirretään aina taivaan jälkeen ja ennen maastoa ja rakennuksia, koska ne eivät saa näkyä mökin tai talon päällä.
- Kaukaiset kerrokset ovat tummempia ja utuisempia (sininen huntu), jotta etuala erottuu.
- **Pystyparallaksi:** jos kamera nousee pystysuunnassa (hissi, katot), taivas pysyy paikallaan ja kaukaiset kerrokset liikkuvat vain osan matkasta (esimerkiksi tunturi 25 %, kaukaiset talot 55 %, lähitalot 70 %, katu 100 %).

## 4. Valot, tekstit ja värit

- **Kirkkaat pinnat pidetään himmeinä.** Retrografiikan hehku tarttuu lähes valkoisiin pintoihin, jolloin ne näyttävät liimatuilta. Näyteikkunat ovat himmeän lämpimiä ja jäsenneltyjä (kehys, ruudut, tuotteet, markiisi), ja lumi on yöllä sinertävän harmaata.
- **Tekstit tulevat omalle tummalle taululleen** (`labelBoard`, isommille kylteille tolpat). Ikkunavalot eivät saa sekoittua kirjaimiin.
- Välimuistiin piirretyt tekstit sumenevat, joten tekstit piirretään joka kehys terävänä tekstipolkua pitkin. Kuvat voivat olla välimuistissa, mutta tekstit eivät.
- Pitkät kyltin tekstit kavennetaan mahtumaan kylttiin. Ne eivät saa valua yli.

## 5. Elävyys

- Pienet yksityiskohdat tekevät näkymästä elävän: myymälöiden nimet, viherkasvit, savu piipusta, höyry paljusta ja kipinät.
- Toistuvissa esineissä on vaihtelua. Roskiksia on useaa mallia ja väriä, ja lumipenkkojen muoto, koko ja välit vaihtelevat, joskus niissä on aukko. Vaihtelu arvotaan **kiinteällä** satunnaisluvulla (`hsh`), jotta se ei välky.
- Sää ja taivas elävät: lunta sataa vain osassa kenttää ja hiipuu reunoilla, ja revontulet hiipuvat välillä, jolloin tähtitaivas tuikkii esiin.

## 6. Animaatio

- Liike sidotaan siihen, mitä hahmo tekee, ei pelkkään aikaan. Esimerkiksi kiipeämisasento lasketaan korkeudesta, joten pysähtyessä asento pysyy eikä hahmo heilu paikallaan.
- **Hahmon suunta vastaa toimintaa:** tikapuita kiivetään kasvot ja maha tikkaita kohti, joten pelaaja näkee hahmon **selän**: takaraivon, niskan ja paidan selkäpuolen (oma takaa nähty sprite, esim. `esaBack`, ilman silmiä tai kasvojen piirteitä). Sama koskee muita seinää, ovea tai konetta kohti tehtäviä toimintoja.
- **Tikapuilla kiipeäminen** (`climbPose`): kädet ovat lähes suoraan ylhäällä kaiteiden levyisinä ja vuorottelevat puola kerrallaan. Ylempi käsi ojentuu seuraavalle puolalle ja vastakkainen polvi nousee. Vartalo nytkähtää kevyesti joka askeleella. Asento lasketaan puolien välistä (`base / LADDER.rung`), jotta kädet ja askeleet osuvat puoliin.
- Siirtymät animoidaan kokonaan. Esimerkiksi hississä ovet aukeavat, porukka kävelee sisään, ovet sulkeutuvat, kori nousee, ovet aukeavat ja porukka astuu ulos.

## 7. Suorituskyky (piirto)

- Staattiset rakennukset, julkisivut ja talot piirretään kerran välimuistikankaaseen ja kopioidaan joka kehys.
- Liukuvärit ja kankaat luodaan kerran, ei silmukoissa.
- Raskaat muutokset mitataan millisekunteina kehystä kohden ennen ja jälkeen (Shift+F-mittari).

## Tarkistuslista ennen valmista

1. Kuvakaappaus, jossa hahmo seisoo uuden kohteen vieressä: ovatko ovet, kerrokset ja esineet hahmon kokoisia?
2. Kuvakaappaukset rajakohdista ja kameran ääripäistä (myös pystysuunnasta): katkeaako jokin terävästi tai jääkö jokin tyhjän päälle?
3. Tuleeko jokin ovi, ikkuna tai myymälä osittain rakennuksen kyljen tai pilarin yli?
4. Kantaako jokin ohuen tikun varassa tai ilmassa? Näkyykö rumia liitoskohtia?
5. Ovatko tekstit terävät ja omalla taululla? Liimaantuuko jokin kirkas pinta hehkulla?
6. Onko piirtojärjestys oikea (revontulet taivaalla, etuala edessä)?
7. Onko toistuvissa esineissä vaihtelua?
8. Kehysaika mitattu, ei merkittävää hidastumista.
