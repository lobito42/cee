# Regeln für Akustik und Materialien (crates/acoustics, Material-Elemente)

- Einheiten immer SI und explizit im Namen oder Typ: `volume_m3`, `area_m2`, `t_s`. Frequenzbänder fest:
  125, 250, 500, 1000, 2000, 4000 Hz, als Aufzählung, nie als freie Zahl.
- Formeln mit Quelle im Kommentar (z. B. Sabine, Eyring). Konstante 0,161 s/m bei 20 °C; Luftabsorption
  nur als optionaler, getrennt ausgewiesener Term.
- Jede Berechnung hat Tests gegen von Hand nachgerechnete Referenzfälle und Grenzfälle (α = 0, α → 1,
  leerer Raum, eine Fläche). Toleranz ≤ 1 % gegenüber der Referenzformel.
- Absorptionsgrade liegen zwischen 0 und 1; Werte > 1 aus Herstellerdaten (Messartefakt) werden beim
  Import auf 1 begrenzt und als Hinweis gemeldet, nie still verändert.
- Materialwerte tragen Einheit und Quelle. Ohne Quelle gilt ein Wert als Schätzung und wird so angezeigt.
- Keine Normtexte oder Tabellen aus Normen (DIN, EN, ISO) übernehmen. Zielwerte kommen als Regelpaket,
  das das Kernteam prüft.
- Ergebnisse zeigen ihre Annahmen (z. B. „Diffusfeld nach Sabine“) und Gültigkeitsgrenzen an.
- Wie im Kern: kein `unsafe`, kein `unwrap()` außerhalb von Tests, Property-Tests für neue Logik.
