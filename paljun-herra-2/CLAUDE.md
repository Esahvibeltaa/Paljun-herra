# Paljun Herra 2 Paluu of drunken master – työohjeet

Jatko-osa Paljun herralle. Pohjana ykkösosan taistelumekaniikka, retrografiikka ja koodaussäännöt.
Suunnitelma: `SUUNNITELMA.md`.

## Pysyvät säännöt (noudatetaan aina)

1. **Optimoi tehdessä.**
   - ei turhaa työtä joka kehyksellä (välimuisti hitaasti muuttuville kerroksille, mittauksille ja laskennalle)
   - ei kankaiden, liukuvärien tai muiden olioiden luontia silmukoissa, jos ne voi luoda kerran
   - raskaat muutokset mitataan (ms/kehys) ennen ja jälkeen
   - apukankaat ovat prosessorilla (keskitetty getContext-asetus, `willReadFrequently`), vain pääkangas `#c` näytönohjaimella
   - ääniparametrit muutetaan `setAP`-funktiolla, ei `.value`/`setTargetAtTime` suoraan eikä joka kehys
   - kehysnopeus mitataan pelissä Shift+F-mittarilla (`FPSM`, `fpsMeter`)
2. **Koodaa hyvän tavan mukaisesti.**
   - ei kopioitua koodia: toistuva logiikka yhteiseen funktioon
   - kuvaavat nimet ja lyhyt kommentti ei-ilmeisille ratkaisuille
   - mitatut tai säädettävät arvot nimettyihin vakioihin/taulukoihin
   - tekstit rivitetään yhteisillä apufunktioilla (`wrapLines`, `drawMsg`, `sbub`, `box3`)
3. **Retrografiikka on aina päällä** (pikselipuskuri 320×200, väriportaat, hehku, teksti terävänä).
4. **Taistelun periaatteet:** osuma vain kun raaja koskee vartaloon (`TIP`, `BODY`, `reachOf`), iskujen enimmäistiheys (`ATK_MIN`), ajoitukseen perustuva ketjutus, terävä ohjaus (syötepuskuri `IBUF`, suunta tallennetaan painalluksen hetkellä, humalaviive enintään 0,15 s).

## Rakenne

- `src/*.js` moduulit, liitetään nimijärjestyksessä (`00_tila.js` ensin, `14_peli.js` viimeisenä):
  `00_tila` yhteinen tila · `01_kangas` piirto · `02_aani` ääni · `03_musiikki` · `04_tekstit` · `05_hahmot` spritet ja asennot · `05b_lainat` apufunktiot · `06_kunto` humala · `07_kaksinkamppailu` 1v1 ja yhteinen taistelumekaniikka · `08_elamat` · `09_tauko` · `10_mattinta` sivuttain vierivä mätkintä · `11_ohjaus` näppäimet, ohjain, kosketus, asetukset · `12_intro` · `13_grafiikka` retro ja pääsilmukka · `14_peli` pelin kulku
- `src/pohja.html`, `src/tyyli.css` sivupohja
- `python3 koonti.py` → `dist/index.html` (yksi tiedosto: selain, artifact ja Windows-versio)

## Työtapa

- Julkaisu artifactiin https://claude.ai/artifact/PfPEXVXgVBtXA21taSFgks (julkaistaan tiedostosta `dist/index.html`).
- Koonti ja Playwright-testit jokaisen muutoksen jälkeen (koko pelikulku: intro → kenttä → pomo → loppu).
- Commit haaraan `claude/paljun-herra-project-import-0ezkqx` ja push myös `main`-haaraan.
- Merkintä `SUUNNITELMA.md`:hen.
