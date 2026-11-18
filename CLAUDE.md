# Paljun herra – työohjeet

Selainpeli yhdessä tiedostossa (`index.html`). Suunnitelma ja muutoshistoria: `SUUNNITELMA.md`.

## Pysyvät säännöt (noudatetaan aina)

1. **Optimoi tehdessä.** Jokainen muutos tehdään suorituskyky huomioiden:
   - ei turhaa työtä joka kehyksellä (välimuisti hitaasti muuttuville kerroksille, mittauksille ja laskennalle)
   - ei kankaiden, liukuvärien tai muiden olioiden luontia silmukoissa, jos ne voi luoda kerran
   - raskaat muutokset mitataan (ms/kehys) ennen ja jälkeen
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
