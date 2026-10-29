## 1. Typen, Kernel-Schnittstelle und Worker (Nacht 1)

- [x] 1.1 `format/types/drahtmodell.json` mit den sieben Typen nach design.md Abschnitt 1 und Beispiel
  `format/examples/drahtmodell.json` nach Abschnitt 4 – Prüfung: AK-1
- [x] 1.2 `format/kernel/README.md`, `auftrag.schema.json`, `ergebnis.schema.json` (`cee-kernel/0`, Befund-Codes,
  Größen mit Einheit) – Prüfung: AK-2
- [x] 1.3 `worker/src/cee_worker/kernel/`: Typtabelle, `frame` mit Kind-Ausgängen, `point`, `axis`, `plane` mit
  OCP-Formen und Rücklesen der Werte; `rechnen(auftrag)` und `formen(auftrag)` – Prüfung: AK-3, AK-4, AK-9
- [x] 1.4 `line`, `ray`, `segment` als OCP-Kanten (unbegrenzt, einseitig, begrenzt), Befund `degenerate` –
  Prüfung: AK-5

## 2. Befunde, Hash, Prozess und Auftrag (Nacht 2)

- [x] 2.1 Befunde `input_missing`, `input_type`, `input_discarded`, `input_failed`, `unit`, `unknown_type`,
  `kernel_error`; unabhängige Elemente rechnen weiter; nur benannte Ausgänge – Prüfung: AK-6, AK-7
- [x] 2.2 Inhalts-Hash nach design.md Abschnitt 3, kanonisches JSON, bytegleiche Ausgabe – Prüfung: AK-8
- [x] 2.3 CLI `rechnen` und `--stdio` (JSON Lines, Befund `protocol`), Prüfhaken `CEE_WORKER_TEST`, Budget
  1,0 s – Prüfung: AK-10
- [x] 2.4 `cee_worker/auftrag.py` über `cee-sdk` (`import_project` mit Typdefinitionen, `validate`, `order`,
  Zyklus als Befund, Umrechnung nur über `Quantity`), Abhängigkeit `cee-sdk` in `worker/pyproject.toml`,
  Budget 0,5 s – Prüfung: AK-11; `uv run ruff check worker && uv run pytest -q tests/acceptance/ap-50-wireframe-basics -k "not vorschau"`

## 3. Vorschau im Prototyp (Nacht 3)

- [x] 3.1 Brücke `spikes/ux-prototyp-2/bruecke/kernel.ts` (Worker-Prozess über `--stdio` und `auftrag`,
  Zeitlimit 10 s, Neustart, `/kernel/test-beenden` nur im Prüfmodus), Befund ohne Brücke – Prüfung: AK-16
- [x] 3.2 Sechs Befehle in `src/befehle.json` (ohne `folgt`), Dropdown „Referenz“, Kontextaktionen,
  Übersetzungen de/en, Testzustände `drahtmodell-leer` und `drahtmodell-beispiel` – Prüfung: AK-12
- [x] 3.3 Darstellung von Punkten, Linien, Achsen, Ebenen aus dem Ergebnis (Tokens), Anlegen frei per Klick, auf
  Koordinaten und relativ, Linien mit Auswahl oder zwei Klicks, Esc – Prüfung: AK-13
- [x] 3.4 Auswahl per Klick (6 px, Vorrang), Ausblenden und Verwerfen mit Folgebefund im Panel, Rückgängig –
  Prüfung: AK-14, AK-15
- [x] 3.5 Prüfbefehle `pruefen -- drahtmodell befehle|ablauf` nach design.md Abschnitt 6; ap-41b- und
  ap-41c-Abnahmetests weiter grün – Prüfung: `uv run pytest -q tests/acceptance/ap-50-wireframe-basics` und
  `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept tests/acceptance/ap-41c-ux-schlankes-menue`
- [x] 3.6 Klick-Anleitung aus design.md Abschnitt 9 in den PR übernehmen – Prüfung: PR-Text enthält die Schritte 1
  bis 7

## Workflow follow-up

- [ ] [mensch] Ausprobieren nach der Klick-Anleitung (Scenario „Ausprobieren“), Antwort im PR (Kernteam)
- Kernteam: Open Questions 1 bis 4 in design.md beantworten (Menüname, Befehlsinventar, Ursprung je Teil, Zeile in
  der Arbeitspaket-Tabelle); Eintrag in `openspec/queue.yaml` mit `depends_on: [ap-40-bindungen-sdk,
  ap-41b-ux-bedienkonzept, ap-41c-ux-schlankes-menue]`
- Archivieren: `kernel-protokoll` und `drahtmodell` nach `openspec/specs/`; `drahtmodell-vorschau` nach
  Entscheidung des Kernteams (Vorschlag: nicht übernehmen)
