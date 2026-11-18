# Paljun herra – työohjeet

Selainpeli yhdessä tiedostossa (`index.html`). Suunnitelma ja muutoshistoria: `SUUNNITELMA.md`.

## Pysyvät säännöt (noudatetaan aina)

1. **Optimoi tehdessä.** Jokainen muutos tehdään suorituskyky huomioiden:
   - ei turhaa työtä joka kehyksellä (välimuisti hitaasti muuttuville kerroksille, mittauksille ja laskennalle)
   - ei kankaiden, liukuvärien tai muiden olioiden luontia silmukoissa, jos ne voi luoda kerran
   - raskaat muutokset mitataan (ms/kehys) ennen ja jälkeen
   - apukankaat ovat prosessorilla (keskitetty getContext-asetus), vain pääkangas näytönohjaimella; ääniparametrit muutetaan `setAP`-funktiolla, ei `.value`/`setTargetAtTime` suoraan joka kehys
   - testaus: Shift+F näyttää kehysnopeusmittarin
2. **Koodaa hyvän tavan mukaisesti.**
   - ei kopioitua koodia: toistuva logiikka yhteiseen funktioon (esim. `drawMsg`, `sbub`, `wrapLines`, `reachOf`)
   - kuvaavat nimet ja lyhyt kommentti ei-ilmeisille ratkaisuille
   - mitatut tai säädettävät arvot nimettyihin taulukoihin/vakioihin (esim. `TIP`, `BODY`, `WN`, `KT`)
   - tekstit rivitetään yhteisillä apufunktioilla, ei kiinteillä merkkimäärillä

## Työtapa

- Muutokset testataan Playwrightilla (kuvat scratchpadiin), myös aiemmat testit (allas, intro, vaiheet, katot, reunat).
- Julkaisu artifactiin https://claude.ai/artifact/5G6NK3T25MGUbhniSuJ5hX
- Commit haaraan `claude/paljun-herra-project-import-0ezkqx` ja push myös `main`-haaraan.
- Merkintä `SUUNNITELMA.md`:n kohtaan "Tehty myöhemmin".

## Windows-versio

- `desktop/build.sh <neutralino-win_x64.exe> [kohde]` rakentaa `PaljunHerra-Windows.zip`:n (Neutralinojs 5.6.0, WebView2).
- Sisältö paketoidaan omalla `desktop/pack_neu.py`-skriptillä (asar-muoto), ei npm-riippuvuuksia.
- Exe-tiedoston kuvake lisätään `desktop/set_icon.py`-skriptillä (uusi .rsrc-osio, RT_ICON + RT_GROUP_ICON, PNG-kuvakkeet 16–256 px). Neutralinon exe ei sisällä resursseja.
- Rakennetaan uudelleen aina, kun `index.html` muuttuu ja Windows-versio halutaan päivittää.
- Jaettava lataus: `lataa/PaljunHerra-Windows.zip` (linkki README.md:ssä). Päivitä tiedosto aina, kun Windows-versio rakennetaan uudelleen.
