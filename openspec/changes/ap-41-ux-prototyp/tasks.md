Alle Befehle aus dem Wurzelverzeichnis, sofern nicht anders angegeben; `P` steht für `spikes/ux-prototyp`.
Gesamtprüfung: `uv run pytest -q tests/acceptance/ap-41-ux-prototyp`.

## 1. Gerüst

- [ ] 1.1 `P/` als eigenes npm-Projekt anlegen (Vite, TypeScript strict, ESLint, Prettier, Vitest in den
  Versionen von `client/`; Laufzeit-Abhängigkeiten nur laut design.md; `playwright` als Entwicklung) und
  `P/build.sh` (npm ci, Chromium für Playwright, Build) – Prüfung: `bash P/build.sh && (cd P && npm run lint &&
  npm test)`; AK-1, AK-11 (Abhängigkeiten, Lizenzen)
- [ ] 1.2 `P/scripts/tokens.mjs` erzeugt `src/erzeugt/tokens.css` und `tokens.ts` aus
  `docs/design/tokens.json` (hell und dunkel über `[data-thema]`); `npm run tokens:check`; Inter und JetBrains
  Mono über `@fontsource` mit den Schriftmerkmalen aus den Tokens – Prüfung: `cd P && npm run tokens:check`;
  AK-3 (statischer Teil)
- [ ] 1.3 Übersetzungen `src/i18n/de.json` und `en.json` mit gleichen Schlüsseln, Sprache `schluessel`,
  Umschalten per Adresse – Prüfung: `cd P && npm test`; AK-4 (Schlüssel)
- [ ] 1.4 Befehlsregister `src/befehle.json` mit allen Befehlen aus design.md, Ausführung mit Protokoll,
  Rückgängig und Wiederholen, simuliertes Modell mit Testprojekt (Größen mit Einheit), `window.__cee` –
  Prüfung: `cd P && npm test` (Vitest: Register gültig, Rückgängig/Wiederholen, Modell-JSON)
- [ ] 1.5 Wertfeld-Logik (Einheiten mm, cm, m; Formeln; Befund bei Fehler; Anzeige) mit mindestens 10
  Vitest-Fällen – Prüfung: `cd P && npm test`; AK-1

## 2. Arbeitsfläche und Prüfwerkzeug

- [ ] 2.1 Bausteine in `src/ui/` je Katalogmuster mit `data-muster` und `data-befehl`; Layout: Kopfzeile
  (Arbeitsbereich „Modell“, Stand/Entwurf, Suche), Featurebaum, 3D-Fläche (three.js, Farben aus Tokens),
  Eigenschaften-Panel, Werkzeugleiste mit fünf Werkzeugen, Letzte Aktion nachjustieren, Rückmeldung –
  Prüfung: `cd P && npm run lint && npm test`
- [ ] 2.2 Prüfwerkzeug `P/pruefen/` mit `npm run pruefen` (lokale Vorschau, headless Chromium 1440 × 900) und
  den Befehlen `zustaende`, `budget`, `texte`, `anfragen`; Testzustände per Adresse (13 Zustände, Themen,
  Sprache, `tempo=0`, unbekannter Zustand) – Prüfung: `cd P && npm run --silent pruefen -- zustaende --out
  "$(mktemp -d)" --json && npm run --silent pruefen -- budget --json`; AK-2, AK-3, AK-4, AK-9
- [ ] 2.3 Suche (Cmd/Strg+K) für Befehle und Elemente mit Gruppen, Facetten, Kürzeln, Synonymen und Angebot
  „KI fragen: …“; Kontextaktionen an der Auswahl; Prüfbefehl `befehle` – Prüfung: `cd P && npm run --silent
  pruefen -- befehle --json`; AK-5

## 3. Abläufe

- [ ] 3.1 Ablauf A: Werkzeug Skizze, Ebenen, Rechteck mit Wertfeldern, Skizze schließen, Extrudieren mit
  Geister-Vorschau, Ziehgriff und Tiefe; Prüfbefehl `ablauf a` – Prüfung: `cd P && npm run --silent pruefen --
  ablauf a --json`; AK-6
- [ ] 3.2 Ablauf B: Tiefe im Eigenschaften-Panel, Kanten auswählen, Verrunden, Befund bei Radius über 24 mm mit
  Korrektur; Prüfbefehl `ablauf b` – Prüfung: `cd P && npm run --silent pruefen -- ablauf b --json`; AK-6
- [ ] 3.3 Ablauf C: Baugruppe anlegen, Verbinden über Verbindungspunkte, Auswahlfeld „Art“, Einrasten;
  Prüfbefehl `ablauf c` – Prüfung: `cd P && npm run --silent pruefen -- ablauf c --json`; AK-6
- [ ] 3.4 Entwürfe: Liste in der Kopfzeile, Entwurf anlegen, Vergleich, Übernehmen, Verwerfen mit Begründung,
  Ansichten „Ergebnis“ und „Alle Entwürfe“; Prüfbefehle `ablauf d` und `ablauf e` – Prüfung: `cd P && npm run
  --silent pruefen -- ablauf d --json && npm run --silent pruefen -- ablauf e --json`; AK-7
- [ ] 3.5 Simulierter KI-Ablauf: drei Wege, drei Absichten, Fortschritt mit Anhalten, Entscheidungskarte mit
  Geister-Vorschau und Befehlszeilen, Übernehmen mit `quelle: ki`, Nachjustieren, Erklärung bei unbekanntem
  Satz; Prüfbefehl `ablauf f` – Prüfung: `cd P && npm run --silent pruefen -- ablauf f --json`; AK-8

## 4. Messung und Leitfaden

- [ ] 4.1 Prüfbefehl `messen` (Auswahl, Werkzeugwechsel, Suche, je 20 Messungen, p95) und Nacharbeit, bis alle
  Schwellen halten – Prüfung: `cd P && npm run --silent pruefen -- messen --json`; AK-10
- [ ] 4.2 Testleitfaden mit Ergebnisvorlage `docs/spikes/ux-prototyp.md` nach design.md (Aufgaben A bis F,
  Ergebnisbogen TP1 bis TP5, Datenschutz, Auswertung); Hinweis zum Start des Prototyps (`npm run preview`) –
  Prüfung: AK-12; gesamt `uv run pytest -q tests/acceptance/ap-41-ux-prototyp`

## Menschliche Abnahme (eigener Schritt des Kernteams, nicht nachts)

Diese Punkte sind keine Agenten-Tasks und haben deshalb keine Häkchen; sie stehen als Checkliste
„Menschliche Abnahme“ im PR.

- Pilotlauf: Kernteam als TP1 nach dem Leitfaden, Ergebnisbogen ausfüllen, Zeitlimits bei Bedarf einmal
  anpassen (Scenario „Pilotlauf des Kernteams“)
- Augenschein der 26 Screenshots aus `zustaende` (Scenario „Aus einem Guss“)
- Testpersonen TP2 bis TP5, Ergebnisse in `docs/spikes/ux-prototyp.md` (Scenarios „Testpersonen lösen
  Aufgabe A/B/C“, „Aufgabe D“, „Aufgabe F“, „Abnahme 4 von 5“)
- Auswertung: Go oder No-Go für G1, Folgen für ap-08a und ap-08b

## Workflow follow-up

- Leitbild-Branch `adr/leitbild-ui-ki` mergen und „Vorschlag“ ins Glossar aufnehmen, bevor die Abnahmetests
  geschrieben werden (Kernteam; Offene Fragen, Punkt 1)
- Change archivieren mit `--skip-specs` nach dem Go für G1 (Kernteam)
