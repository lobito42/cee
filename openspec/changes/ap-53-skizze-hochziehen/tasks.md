## 1. Skizze, Bereiche und Hochziehen im Worker (Nacht 1)

- [ ] 1.1 `format/types/skizze.json` mit den 5 Typen nach design.md Abschnitt 2 und `format/examples/skizze.json`
  (Halter nach Abschnitt 8) – Prüfung: AK-1
- [ ] 1.2 Skizzenelemente im Worker (`cee_worker/kernel/`): Lage in Weltkoordinaten, Reihenfolge Kinder vor Skizze,
  Befunde `degenerate`, `not_in_sketch`, Einheiten nur über den Kern – Prüfung: AK-2
- [ ] 1.3 Bereiche nach Abschnitt 3 (Konturen, Löcher, Linienzüge, `curves_intersect`, innerer Punkt, Rand) –
  Prüfung: AK-3
- [ ] 1.4 Hochziehen nach Abschnitt 4 (Punkt-Selektor, Prisma, Kennwerte, Netz, Kantenzüge, `region_missing`),
  Schema-Ergänzung `sketch`/`solid` in `format/kernel/`, Inhalts-Hash der Skizze über ihre Kinder – Prüfung: AK-4,
  AK-5, AK-6; `uv run pytest -q -x tests/acceptance/ap-53-skizze-hochziehen -k "worker"`
- [ ] 1.5 Befehle aus design.md Abschnitt 6 als Daten in `spikes/ux-prototyp-2/src/befehle.json` (ID, Familie,
  Untergruppe, Kürzel, Parameter-Schema, `ki`), Übersetzungen de/en, Prüfbefehl `skizze befehle` mit IDs, Kürzeln
  und `ki` (Orte folgen in 2.2) – Prüfung: `npm --prefix spikes/ux-prototyp-2 test`, Teil „Kürzel“ von AK-7

## 2. Ansicht und Skizzieren im Prototyp (Nacht 2)

- [ ] 2.1 Abhängigkeiten `three-mesh-bvh`, `camera-controls`, `three-viewport-gizmo` (ggf. `postprocessing`)
  hinzufügen; Picking mit BVH, Kontur (Überfahren dünn, Auswahl Akzent), Kanten als Line2, Kamera über
  camera-controls mit den bestehenden Navigationsprofilen, Ansichtswürfel mit Weltachsen; Prüfbefehle
  `skizze messen` und `skizze lizenzen` – Prüfung: AK-13; Abnahmetests ap-41b/ap-41c/ap-50 bleiben grün
  (`uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept tests/acceptance/ap-41c-ux-schlankes-menue
  tests/acceptance/ap-50-wireframe-basics`)
- [ ] 2.2 Kontextleiste und Skizzier-Werkzeugleiste nach design.md Abschnitt 1 aus den Befehlen von Task 1.5,
  Dropdowns „Skizze“ und „Körper“, Orte im Prüfbefehl `skizze befehle` – Prüfung: AK-7
- [ ] 2.3 Skizze anlegen, öffnen, schließen (Kamera senkrecht, Ausschnitt, zurück, Doppelklick), Testzustände
  `skizze-leer`, `skizze-halter`, `skizze-last` – Prüfung: AK-8
- [ ] 2.4 Zeichnen von Linie (Kette), Rechteck, Kreis mit Gummiband, Fangen mit Anzeige, Wertfeld am Zeiger,
  Prüfbefehl `skizze ablauf` mit den neuen Schritten und Feldern – Prüfung: AK-9; `npm --prefix
  spikes/ux-prototyp-2 test`

## 3. Bereich, Griff, KI und Abnahme (Nacht 3)

- [ ] 3.1 Bereiche anzeigen und wählen (Kontur nur über Farbe, Antippen statt Überfahren), Hochziehen mit
  Geister-Vorschau, TransformControls als Höhengriff, Wertfeld, Esc, Griff am gewählten Hochziehen, Skizze danach
  ausblenden, kein Dialog – Prüfung: AK-10
- [ ] 3.2 Halter per Direktbedienung im Ablauf – Prüfung: AK-11
- [ ] 3.3 KI-Werkzeuge: Parameterweg der 5 Befehle, Werkzeugergebnis mit Bereichen bzw. Volumen, Halter über das
  Testmodell aus ap-52 als Änderungssatz – Prüfung: AK-12
- [ ] 3.4 Klick-Anleitung aus design.md Abschnitt 10 in die PR-Beschreibung, Lint im Prototyp und Worker, zum
  Schluss alle Abnahmetests – Prüfung: `npm --prefix spikes/ux-prototyp-2 run lint`, `uv run ruff check worker`,
  `uv run pytest -q tests/acceptance/ap-53-skizze-hochziehen`
