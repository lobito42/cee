Alle Befehle aus dem Wurzelverzeichnis, sofern nicht anders angegeben; `P` steht für `spikes/ux-prototyp-2`.
Gesamtprüfung: `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`. Prüfbefehle des Prüfwerkzeugs:
`npm --prefix P run --silent pruefen -- <befehl> --json`. Dateien aus ap-41 holen mit
`git show origin/change/ap-41-ux-prototyp:spikes/ux-prototyp/<pfad>`.

Jede Gruppe endet mit einem klickbaren Stand. Die letzte Task jeder Gruppe baut die Vorschau und ergänzt im PR
unter „Klick-Anleitung“ 3–6 Schritte in Alltagssprache mit Startadresse und dem, was zu sehen sein muss
(design.md, „Klickbarer Stand nach jeder Gruppe“).

## 1. Gerüst und lesbarer Halter

- [x] 1.1 `P/` aus ap-41 übernehmen: `package.json` (Name `@cee/ux-prototyp-2`), `tsconfig.json`,
  `vite.config.ts`, `eslint.config.js`, `.prettierrc.json`, `build.sh`, `scripts/tokens.mjs`, `src/erzeugt/`,
  `src/i18n/`, `src/wert/` (Wertfeld um `N`, `kN` erweitern), `src/modell/register.ts`; Werkzeug-Befehle und
  -Texte entfernen – Prüfung: `bash P/build.sh && npm --prefix P run lint && npm --prefix P test && npm --prefix P run tokens:check`;
  AK-1, AK-3 (statisch)
- [x] 1.2 `P/src/geometrie/`: Halter aus Schritten (Grundplatte, Steg, Bohrungen mit Skizzen als Unterelemente),
  Abmessungen, Volumen, Masse nach design.md; Testprojekt Sensorgehäuse aus ap-41 – Prüfung: `npm --prefix P test`
  (Vitest: drei Volumen-Stände ± 0,1 %); AK-1
- [x] 1.3 Layout mit fünf Zonen (`data-zone`, Maße nach design.md), Kopfzeile mit Pfad, Reiter „Modell“, Feld
  „Suchen oder fragen“ (noch ohne Funktion außer Fokus mit Strg/Cmd+K), Rückgängig mit Kürzel; Aufbau als Liste
  der Schritte mit Unterzeilen; Rückmeldezeile – Prüfung: `npm --prefix P run lint && npm --prefix P test`
- [x] 1.4 Modell: three.js-Szene mit gerichtetem Licht (≥ 60 % Anteil), flach schattierten Flächen, Kanten
  (`EdgesGeometry`, `linie-stark`), Startansicht isometrisch, `ansicht.einpassen`; `window.__cee` mit
  `modell()`, `teil()`, `ansicht()` inklusive `projektion(id)` – Prüfung: `npm --prefix P run lint && npm --prefix P test`
- [x] 1.5 Prüfwerkzeug `P/pruefen/` aus ap-41 übernehmen und anpassen; Testzustände `halter`, `leer`, `teile`
  und unbekannter Zustand; Prüfbefehle `zustaende`, `zonen`, `lesbarkeit` (ohne Auswahlkontur), `anfragen` –
  Prüfung: `pruefen zonen` und `pruefen lesbarkeit`; AK-2 (Teil), AK-4, AK-5 (Licht, Kanten, Einpassen)
- [x] 1.6 Vorschau bauen und Klick-Anleitung im PR aktualisieren (Halter öffnen, Flächen unterscheiden sich in
  der Helligkeit, Kanten sichtbar, Einpassen) – Prüfung: `bash P/build.sh` und `npm --prefix P run preview` startet

## 2. Auswahl und Inspektor

- [x] 2.1 Synchrone Auswahl: Klick auf Fläche wählt erzeugenden Schritt, Klick auf Aufbauzeile wählt im Modell,
  Kante wählt Kante (Trefferzone ≥ 8 px, Schritt `data-zugehoerig`), Umschalt+Klick, Klick ins Leere; Kontur in
  `akzent` – Prüfung: `pruefen auswahl`; AK-7 (Klick), AK-5 (Kontur)
- [x] 2.2 Überfahren in beide Richtungen (`data-hervorgehoben`, dünne Kontur); keine Bedienung nur beim
  Überfahren – Prüfung: `pruefen auswahl`; AK-7 (Überfahren, Hover-Regeln)
- [x] 2.3 Inspektor: Teil ohne Auswahl (Material, Abmessungen, Volumen, Masse, berechnet), Schritt mit Gruppen
  „Maße“ und „Aus der Skizze“, Knopf „Skizze bearbeiten“ (Befehl, Wirkung folgt in 4.1), Kante mit Länge –
  Prüfung: `npm --prefix P test`, Zustand `schritt` in `pruefen zustaende`; AK-8 (Teil, Gruppen)
- [x] 2.4 Wertfelder im Inspektor live beim Tippen mit Neuberechnung von Modell, Volumen und Masse, Enter
  übernimmt (ein Protokolleintrag), Esc bricht ab; Rückgängig/Wiederholen über Kopfzeile und Kürzel – Prüfung:
  `npm --prefix P test` (Vitest: live, Enter, Esc, Rückgängig); AK-8 (Live, Enter, Esc)
- [x] 2.5 Vorschau bauen und Klick-Anleitung im PR aktualisieren (Fläche anklicken → Zeile links markiert;
  Zeile überfahren → Geometrie leuchtet; Dicke rechts tippen → Modell wächst beim Tippen; Esc) – Prüfung:
  `bash P/build.sh`

## 3. Am Modell arbeiten: Navigation, Griffe, Kontextaktionen, Darstellung

- [x] 3.1 Eingabeschicht `P/src/eingabe/`: Navigationsprofil „Standard“ als Einstellung (rechts drehen, Mitte
  schieben, Rad zoomen zum Zeiger, Rechtsklick < 4 px = Kontextaktionen), Ansichtseingabe mit sechs Achsen und
  `window.__ceeEingabe.ansicht` – Prüfung: `pruefen navigation` (ohne Ziehen); AK-6
- [x] 3.2 Griffe am gewählten Schritt, Ziehen in 1-mm-Schritten mit Zahl am Zeiger, Tippen beim Ziehen, Esc;
  Ansichtseingabe wirkt während des Ziehens nur auf die Kamera; Zustand `ziehen` – Prüfung: `pruefen navigation`
  und Vitest; AK-9, AK-6 (Ziehen)
- [x] 3.3 Kontextaktionen über dem Gewählten (Lage nach design.md, ≤ 5 Einträge) und per Rechtsklick in Modell
  und Aufbau mit gleichem Inhalt; `schritt.ausblenden`, `schritt.einblenden`, `schritt.verwerfen` (nichts
  löschen) – Prüfung: Vitest und `pruefen zustaende`; AK-11 (Kontextaktionen)
- [x] 3.4 Darstellungen Körper, Kanten, Durchsicht mit Umschalter unten rechts (Muster Auswahlfeld) und Taste W;
  Zustände `kanten`, `durchsicht`; Prüfbefehl `ablauf h` – Prüfung: `pruefen ablauf h`; AK-11 (Darstellung)
- [x] 3.5 Vorschau bauen und Klick-Anleitung im PR aktualisieren (drehen, schieben, zoomen; Pfeil an der
  Grundplatte ziehen und 15 tippen; Rechtsklick; W drücken) – Prüfung: `bash P/build.sh`

## 4. Skizze: Orte Teil und Skizze, Aufgaben G und A

- [x] 4.1 Ort Skizze: hinein per Doppelklick (Fläche, Aufbauzeile), Knopf und Kontextaktion; Ansicht senkrecht
  (`bewegung.mittel`); Pfad mit Stand-Glied; hinaus per „Fertig“, Esc, Pfad – Prüfung: Vitest und `pruefen
  zustaende` (Zustand `skizze`); AK-10 (hinein, hinaus)
- [x] 4.2 In der Skizze: spätere Schritte ausgegraut, ihre Geometrie gestrichelt ohne Flächen; Maße als
  Maßlinien in der Zeichnung, Klick fokussiert das Wertfeld im Inspektor; Prüfbefehl `ablauf g` – Prüfung:
  `pruefen ablauf g`; AK-10
- [x] 4.3 Neue Skizze (Aufgabe A): Leerer Zustand mit „Skizze anlegen“, Ebenen wählen, Rechteck aufziehen
  (Raster 1 mm), Maße im Inspektor, „Fertig“, Kontextleiste „Extrudieren“ mit Geister-Vorschau, Griff und Dicke;
  Zustand `extrusion`; Prüfbefehl `ablauf a` – Prüfung: `pruefen ablauf a`; AK-15 (A)
- [x] 4.4 Vorschau bauen und Klick-Anleitung im PR aktualisieren (Doppelklick auf die Grundplatte, Maß 80
  anklicken, 100 tippen, Fertig; neues Teil von `leer` aus) – Prüfung: `bash P/build.sh`

## 5. Suche und KI im selben Feld

- [x] 5.1 Feld „Suchen oder fragen“: Befehle und Elemente gruppiert, Facetten, Kürzel, Synonyme, Enter führt
  aus; Zustand `suche`; Prüfbefehle `befehle`, `ablauf e` – Prüfung: `pruefen befehle` und `pruefen ablauf e`;
  AK-12, AK-15 (E)
- [x] 5.2 Simulierte KI: Eintrag „KI fragen: …“, Gespräch an der Stelle des Inspektors (Plan, „Arbeitet“,
  Anhalten, `tempo=0`), Erklärung bei unbekanntem Satz; Kennzeichnung „KI simuliert“; Zustand `ki-gespraech` –
  Prüfung: Vitest (Absichtserkennung Deutsch und Englisch) und `pruefen zustaende`; AK-13 (Teil)
- [x] 5.3 Entscheidungskarte im Gespräch mit Geister-Vorschau, Werten vorher/nachher, Befehlszeilen;
  Übernehmen erzeugt einen normalen Schritt im Aufbau und bringt den Inspektor zurück, Verwerfen ändert nichts;
  Zustand `ki-vorschlag`; Prüfbefehl `ablauf f` – Prüfung: `pruefen ablauf f`; AK-13
- [x] 5.4 Vorschau bauen und Klick-Anleitung im PR aktualisieren (Strg K, „Kanten“; Steg wählen, „Runde die
  oberen Kanten mit 2 mm ab“, Übernehmen, Radius 3 mm) – Prüfung: `bash P/build.sh`

## 6. Erweiterung, Befund, Baugruppe und Entwürfe

- [x] 6.1 Andockstellen (Arbeitsbereich, Schritttypen, Inspektor-Gruppen, Darstellung, Befehle) als
  Registrierungsfunktionen; Beispielpaket `P/src/pakete/simulation/` mit Reiter, Lager, Kraft, Ergebnis,
  Legende, Kennzeichnung „simuliert“; Zustand `simulation` – Prüfung: Vitest und `pruefen zustaende`; AK-14
- [x] 6.2 Verrunden von Kanten, Befund bei Radius > 5 mm mit Korrektur, andere Schritte bleiben bedienbar;
  Zustand `befund`; Prüfbefehl `ablauf b` – Prüfung: `pruefen ablauf b`; AK-15 (B)
- [x] 6.3 Baugruppe aus Gehäuse und Deckel mit Verbindungspunkten und Art im Inspektor; Zustände `teile`,
  `verbindung`; Prüfbefehl `ablauf c` – Prüfung: `pruefen ablauf c`; AK-15 (C)
- [x] 6.4 Entwürfe (Stand als erstes Glied des Pfads, Liste, anlegen, vergleichen, übernehmen, verwerfen mit
  Begründung, „Ergebnis“/„Alle Entwürfe“); Zustände `entwuerfe`, `vergleich`; Prüfbefehl `ablauf d` – Prüfung:
  `pruefen ablauf d`; AK-15 (D)
- [x] 6.5 Vorschau bauen und Klick-Anleitung im PR aktualisieren (Reiter Simulation, Kraft 200 N; Befund
  beheben; Deckel aufsetzen; Entwurf ausprobieren und übernehmen) – Prüfung: `bash P/build.sh`

## 7. Budget, Messung, Leitfaden

- [x] 7.1 Prüfbefehle `budget` und `texte` für alle 17 Zustände; Nacharbeit, bis Budget, Farben und Texte halten
  – Prüfung: `pruefen budget` und `pruefen texte`; AK-2, AK-3, AK-16 (Budget)
- [x] 7.2 Prüfbefehl `messen` (fünf Kennzahlen, je 20 Messungen, p95) und Nacharbeit, bis alle Schwellen halten
  – Prüfung: `pruefen messen`; AK-16
- [x] 7.3 Testleitfaden `docs/spikes/ux-prototyp-2.md` nach design.md (Aufgaben A–H, Ergebnisbogen TP1–TP5,
  Fragen zur Leitidee, Datenschutz, Auswertung, Start mit `npm run preview`) – Prüfung: AK-17
- [x] 7.4 Vorschau bauen und Klick-Anleitung im PR zur vollständigen Pilot-Anleitung (Aufgaben A–H mit
  Startadressen) zusammenfassen – Prüfung: `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`

## Menschliche Abnahme (eigener Schritt des Kernteams, nicht nachts)

Keine Agenten-Tasks; stehen als Checkliste „Menschliche Abnahme“ im PR.

- Nach jeder Gruppe: Klick-Anleitung durchspielen, Auffälligkeiten als PR-Kommentar
- Pilotlauf vor dem Merge: Kernteam als TP1, Aufgaben A–H und Fragen zur Leitidee (Scenario „Pilotlauf des
  Kernteams vor dem Merge“), Augenschein der 34 Screenshots („Aus einem Guss“, „Auf einen Blick lesbar“,
  „Baum und Modell gehören zusammen“)
- Testpersonen TP2–TP5, Ergebnisse in `docs/spikes/ux-prototyp-2.md`, Go oder No-Go für G1

## Workflow follow-up

- Open Questions in design.md vor dem Schreiben der Abnahmetests entscheiden, besonders 1 (Werkzeugleiste),
  2 (Muster-Kandidaten), 7 (Annahmen zu Lage, Material, Kraft) und 8 (Kennung, Konzepttabelle) – Kernteam
- Eintrag in `openspec/queue.yaml` – Kernteam
- Archivieren mit `--skip-specs` nach dem Go für G1 – Kernteam
