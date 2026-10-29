## 1. Werkzeuge und Satzerkennung (Nacht 1)

- [ ] 1.1 Feld `ki: true` und Parameter-Schemas für die sechs `referenz.*`-Befehle sowie `element.ausblenden` und
  `element.verwerfen` in `spikes/ux-prototyp-2/src/befehle.json` (design.md Abschnitt 2); Wirkung mit Parametern
  ohne Klick, ohne Parameter wie bisher – Prüfung: AK-8 (Klickweg),
  `npm --prefix spikes/ux-prototyp-2 test`
- [ ] 1.2 Werkzeugliste im MCP-Format aus dem Register (Namen, flaches `inputSchema`, Beschreibungen mit Beispiel
  de), Prüfbefehl `pruefen -- ki werkzeuge` – Prüfung: AK-1
- [ ] 1.3 Ausführen eines Werkzeugaufrufs im Entwurf mit kompaktem Ergebnis und strukturierten Fehlern (`unit`,
  `degenerate`, `input_missing`, `input_type`, `invalid_arguments`, `unknown_tool`) – Prüfung: AK-2
- [ ] 1.4 Satzerkennung `bruecke/ki/regel.ts` nach design.md Abschnitt 4 (Plan, Schritt für Schritt, IDs aus
  Werkzeugergebnissen, festgelegte Deutung Rechteck und „darüber“, deterministisch) mit Unit-Tests im Prototyp –
  Prüfung: `npm --prefix spikes/ux-prototyp-2 test`

## 2. Anbieter-Schnittstelle und Datenschutz (Nacht 2)

- [ ] 2.1 `bruecke/ki/` mit Schnittstelle, `GET/POST /ki/anbieter`, `POST /ki/schritt`, feste Anweisung
  `bruecke/ki/anweisung.md`, Modellübersicht ≤ 8 000 Zeichen, Befehl `ki.anbieter-waehlen`, Chat-Kopf mit Anbieter
  und Ziel, Prüfbefehl `ki anbieter` – Prüfung: AK-7 (ohne Einrichtung)
- [ ] 2.2 Anbieter `openai-kompatibel` (`fetch`, `chat/completions`, `tools`, `temperature: 0`, Zeitlimit 120 s,
  `CEE_KI_ZEITLIMIT_S` nur im Prüfmodus), Schleife bis 20 Aufrufe – Prüfung: AK-6
- [ ] 2.3 Datenschutz: `CEE_KI_EXTERN`, Schlüssel nur in der Brücke, Protokoll `ki_anfragen` im Prüfmodus –
  Prüfung: AK-7

## 3. Änderungssatz, Karte und Prüfsatz (Nacht 3)

- [ ] 3.1 Schleife im Browser, Entwurf mit Worker-Berechnung, Änderungssatz, Entscheidungskarte im Chat nach
  `docs/design/muster.md` mit Geister-Vorschau, Übernehmen als ein Rückgängig-Schritt, Verwerfen, Urheber im Verlauf,
  Rückfall auf `src/ki.ts`, Antwort mit Beispielsätzen – Prüfung: AK-4, AK-5
- [ ] 3.2 Prüfbefehl `ki ablauf` (Schritte `chat`, Schnappschuss mit `chat`, `geister`, `verlauf`, `ki_anfragen`,
  `ki_bereit_ms`) – Prüfung: AK-4, AK-8 (Budgets)
- [ ] 3.3 Prüfbefehl `ki pruefsatz` mit den Prüfern aus design.md Abschnitt 5 (`--anbieter`, `--wiederholungen`) –
  Prüfung: AK-3; zum Schluss `uv run pytest -q tests/acceptance/ap-52-ki-konstruktion-wireframe`
- [ ] 3.4 Klick-Anleitung aus design.md Abschnitt 9 in die PR-Beschreibung übernehmen; Lint im Prototyp –
  Prüfung: `npm --prefix spikes/ux-prototyp-2 run lint`
