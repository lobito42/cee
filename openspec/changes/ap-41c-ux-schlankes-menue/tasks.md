Alle Befehle aus dem Wurzelverzeichnis; `P` steht für `spikes/ux-prototyp-2`. Prüfbefehle:
`npm --prefix P run --silent pruefen -- <befehl> --json`. Gesamtprüfung:
`uv run pytest -q tests/acceptance/ap-41c-ux-schlankes-menue` und, als Regression,
`uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`.

Voraussetzung: Prototyp aus ap-41b (PR #73) auf `main`; Abnahmetests von ap-41c und der Einspruch zu ap-41b
(design.md, Abschnitt 9) gemergt. Branch `change/ap-41c-ux-schlankes-menue` von `main`. Ränge im Register nicht
ändern (design.md, Abschnitt 4). Umfang: eine Nacht.

## 1. Wirkung im Register und in den Menüs

- [ ] 1.1 `befehle()` um `wirkung` und `orte` erweitern, `window.__cee.ausgeloest()` einführen (alle ausgelösten
  Befehle mit `weg` und `wirkung`) – Prüfung: Vitest in `P/src/modell/register.test.ts` und `npm --prefix P test`
- [ ] 1.2 Start-Menü, Dropdowns, Ansichtsleiste und „Alle Befehle zeigen“ filtern Platzhalter heraus; leere
  Untergruppen und Dropdowns entfallen; „Simulation“ ohne Dropdowns – Prüfung: neuer Prüfbefehl
  `pruefen sichtbarkeit-befehle` und `pruefen fenster`; AK-1
- [ ] 1.3 Prüfbefehl `pruefen ausloesen` (jeder sichtbare Eintrag aus frischem Zustand) – Prüfung:
  `pruefen ausloesen` meldet für jeden Eintrag `wirkung: true`; AK-1
- [ ] 1.4 Vorschau bauen, Klick-Anleitung im PR (Start-Menü und Dropdowns öffnen, Taskleiste auf „Simulation“) –
  Prüfung: `bash P/build.sh` und `npm --prefix P run preview` startet

## 2. Suche mit „Folgt später“

- [ ] 2.1 Suche: Platzhalter nur in der letzten Gruppe „Folgt später“ (≤ 3 sichtbar, „Alle zeigen“), nie erster
  Treffer, Enter löst nie einen Platzhalter aus, Klick zeigt nur die Rückmeldung – Prüfung: Vitest für die
  Gruppierung und neuer Prüfbefehl `pruefen suche`; AK-2
- [ ] 2.2 Abgleich mit dem Befehlsinventar: Platzhalter haben `orte` = `["suche-folgt"]` – Prüfung: `pruefen
  inventar --datei tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json`; AK-2
- [ ] 2.3 Vorschau bauen, Klick-Anleitung im PR (in der Suche „ansicht“ und „baugruppe“ tippen) – Prüfung:
  `bash P/build.sh`

## 3. Kurzes Kontextmenü

- [ ] 3.1 `kontextmenue()` in `P/src/modell/register.ts` nach design.md Abschnitt 3: Kandidaten ohne Platzhalter und
  ohne Befehle mit festem Ort, sichtbar die ersten 8 nach `rang`, Rest in „Mehr …“ nach Familie (≤ 12 je Gruppe);
  `kontextaktionen()` = erste 5 Kandidaten – Prüfung: Vitest in `register.test.ts` (Grenzen, Rang, Ausschlussliste)
- [ ] 3.2 Darstellung: sichtbare Ebene ohne Gruppenüberschriften mit Trennlinien, „Mehr …“ als Untermenü per Klick,
  Enter und Pfeil rechts, Esc und Pfeil links schließen nur die zweite Ebene; Ausgabe von `pruefen kontextmenue`
  erweitern (`sichtbar`, `mehr`, `mehr_gruppen`, `hoehe_px`, `kandidaten_nach_rang`) – Prüfung: `pruefen
  kontextmenue` und `pruefen tastatur`; AK-3
- [ ] 3.3 Bausteinkatalog: Seiten „Kontextmenü“, „Kontextaktionen“, „Dropdown“ und „Suche“ mit der neuen Regel
  (2–6 Sätze, de und en) – Prüfung: `pruefen katalog --out <tmp>` und `pruefen texte`
- [ ] 3.4 Regression: Pilotabläufe und Reaktionszeit – Prüfung: `pruefen ablauf e` … `pruefen ablauf l` und
  `pruefen messen`; `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`; AK-4
- [ ] 3.5 Vorschau bauen, Klick-Anleitung im PR (Rechtsklick auf Grundplatte, „Mehr …“ öffnen, Rechtsklick auf zwei
  Elemente) und alle Abnahmetests – Prüfung: `uv run pytest -q tests/acceptance/ap-41c-ux-schlankes-menue`
