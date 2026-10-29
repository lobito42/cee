## Why

Mit ap-50 kann der Mensch Koordinatensysteme, Punkte und Linien mit dem echten Geometriekern anlegen – aber nur
Punkt für Punkt mit der Maus. Das Kernteam will (Auftrag vom 2026-10-29), dass der Mensch stattdessen in den Chat
des Prototyps schreibt, z. B. „Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber“, und die KI das über
**dieselben Befehle** konstruiert, die auch der Mensch hat. Der Chat im Prototyp ist bisher simuliert
(`spikes/ux-prototyp-2/src/ki.ts`, Schlüsselwörter, keine Konstruktion). Diese Stufe macht den Weg
Satz → Werkzeugaufrufe aus dem Befehlsregister → Änderungssatz mit Vorschau → Übernehmen oder Verwerfen einmal
durchgängig, anbieteroffen und an einem festen Prüfsatz messbar. Fernziel (nur Orientierung, nicht Teil dieser
Stufe): „Konstruiere mir ein Rennrad …“ selbständig; Folgestufen Skizze und Extrusion, dann Teile und Baugruppen.

## What Changes

- **Anbieter-Schnittstelle in der lokalen Brücke** des Prototyps (ADR-037): ein Schritt „Nachrichten und
  Werkzeuge hinein, Text und Werkzeugaufrufe heraus“. Zwei Anbieter:
  - **Satzerkennung** (`regel`): deterministischer Regel-Parser für einfache Wireframe-Sätze, ohne Netz und ohne
    Modell; Standard, damit Abnahmetests reproduzierbar sind und der Prototyp ohne Einrichtung geht.
  - **OpenAI-kompatibel** (`openai-kompatibel`): austauschbarer echter Anbieter (lokales Modell über Ollama,
    llama.cpp, LM Studio oder ein vom Menschen ausdrücklich gewählter Dienst mit eigenem Schlüssel). Nur aktiv,
    wenn der Mensch ihn einrichtet; Ziele außerhalb des eigenen Rechners nur mit ausdrücklicher Wahl.
- **Werkzeugliste aus dem Befehlsregister** (ADR-045, Regel MCP): Die KI bekommt die Werkzeuge im Format von MCP
  `tools/list`, erzeugt aus `src/befehle.json`. Kein Werkzeug ohne Befehl, den auch der Mensch aufrufen kann. Dazu
  erhalten die sechs `referenz.*`-Befehle aus ap-50 sowie `element.ausblenden` und `element.verwerfen` ein
  Parameter-Schema (optionale Parameter; ohne Parameter bleibt der bisherige Weg per Klick und Auswahl).
- **Änderungssatz mit Vorschau im Chat** (ADR-021, Muster „Entscheidungskarte“): Werkzeugaufrufe der KI wirken
  zuerst nur auf einen Entwurf; der Chat zeigt eine Karte mit Titel, Begründung, neuen, verworfenen und
  ausgeblendeten Elementen, Befunden des Workers und Geister-Vorschau im Modell. **Übernehmen** führt dieselben
  Befehle als ein Rückgängig-Schritt aus, **Verwerfen** ändert nichts.
- **Prüfsatz „Wireframe-Aufgaben“** (ADR-053): fünf feste Sätze mit Ausgangszustand und Prüfer; bewertet wird nur
  durch Prüfer am Graphen und am Ergebnis des Workers, nie durch das Modell. Prüfbefehl misst jeden Anbieter;
  jede spätere Stufe wird daran gemessen.
- **Prüfbefehle** der Vorschau für Werkzeugliste, Anbieter, Chat-Ablauf und Prüfsatz; Klick-Anleitung zum
  Ausprobieren.

## Capabilities

### New Capabilities

- `ki-anbieter`: Anbieter-Schnittstelle mit Satzerkennung und OpenAI-kompatiblem Anbieter; Wahl, Datenschutz,
  Zeitlimit.
- `ki-werkzeuge`: Werkzeugliste für die KI aus dem Befehlsregister (MCP-Format), Parameter-Schemas der Befehle,
  strukturierte Fehler, Urheber „KI“.
- `ki-konstruktion`: Satz im Chat wird zum Änderungssatz mit Vorschau; Übernehmen, Verwerfen, Rückgängig.
- `ki-pruefsatz`: fester Prüfsatz „Wireframe-Aufgaben“ mit Prüfern und Messbefehl je Anbieter.

`ki-anbieter` und `ki-konstruktion` beschreiben Prototyp-Verhalten wie ap-50 `drahtmodell-vorschau`; beim
Archivieren entscheidet das Kernteam, ob sie nach `openspec/specs/` übernommen werden (Vorschlag: `ki-werkzeuge`
und `ki-pruefsatz` ja, weil ap-15 darauf aufbaut; die beiden anderen nein, Produktfassung mit ap-15 und ap-08b).

### Modified Capabilities

Keine. (`drahtmodell-vorschau` aus ap-50 ist noch nicht archiviert; die Parameter-Schemas der Befehle sind eine
Ergänzung, ohne den Klickweg zu ändern.)

## Impact

- **Betroffene ADRs:** ADR-007 (ersetzt; gilt in der Fassung von ADR-030/037/045: Werkzeuge aus dem Register,
  MCP-Format), ADR-021 (Änderungssatz mit Vorschau, Übernahme erst nach Annahme), ADR-037 (kein fester Anbieter,
  lokale Modelle gehen, kein Anbieter ohne ausdrückliche Wahl, keine Daten an Dritte, keine Telemetrie, wenige
  eindeutige Werkzeuge mit Beispiel), ADR-045 (ein Register für Mensch und KI), ADR-053 (Bewertung nur durch
  Prüfer), ADR-055 (KI als eigener Urheber, nie Freigaberecht), ADR-050 (Befund statt Absturz, auch bei falschen
  Werkzeugaufrufen), ADR-057 (jede Zahl mit Einheit, Umrechnung nicht im Parser), ADR-051 (Verwerfen statt
  Löschen, Rückgängig statt Rückfrage), ADR-061 und `docs/design/muster.md` (Entscheidungskarte, Chat in der
  rechten Seitenleiste), ADR-065 Punkt 6 (Chat zeigt Auswahl als Kontext), ADR-016/058 (Bezüge nur über
  Element-ID und benannten Ausgang).
- **Ausdrücklich gemeldete Abweichungen** (Entscheidung beim Kernteam, design.md „Open Questions“):
  1. ADR-059/ADR-037 legen KI-Anbindung und lokale Modelle in ap-15 (M3). Dieser Change zieht eine
     Prototyp-Fassung von Anbieter-Schnittstelle, Werkzeugliste und Prüfsatz vor. Das ist ein Auftrag des
     Kernteams; es entsteht kein MCP-Endpunkt und kein Produktcode im Server, ap-15 übernimmt Werkzeugformat und
     Prüfsatz.
  2. `ap-52-ki-konstruktion-wireframe` hat noch keine Zeile in der Arbeitspaket-Tabelle von `docs/konzept.md`.
  3. ADR-021 nennt „Code-Diff“ und „Auswirkung auf veröffentlichte Elemente“; im Prototyp gibt es weder Text-
     Projektion noch Veröffentlichung. Die Karte zeigt stattdessen die Liste der Befehlsaufrufe und der
     betroffenen Elemente.
- **Gate:** G2 (M1 Modellieren); Baustein, nicht das G2-Kriterium.
- **Abnahmetests:** `tests/acceptance/ap-52-ki-konstruktion-wireframe/` (AK-1 bis AK-8, Zuordnung in design.md);
  Prüfbefehle `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- ki <unterbefehl> --json`. Ein Scenario
  `[mensch]` („Ausprobieren“) wird Punkt der PR-Checkliste „Menschliche Abnahme“.
- **Referenzdaten:** `tests/golden/ap-52-ki-konstruktion-wireframe/wireframe-aufgaben.json` – der Prüfsatz aus
  design.md Abschnitt 5, wörtlich übernommen vom Test-Autor; alle Sollwerte sind aus den Sätzen nachrechenbar,
  keine weiteren Quellen nötig. Erweiterungen des Prüfsatzes entscheidet das Kernteam.
- **Abhängigkeiten (Vorschlag für die Warteschlange):** `depends_on: [ap-50-wireframe-basics]` (Befehle, Brücke,
  Worker, Testzustände `drahtmodell-leer` und `drahtmodell-beispiel`). Nicht abhängig von
  ap-51-wireframe-ebenen, ap-15, ap-07a/b.
- **Abhängigkeiten im Code:** keine neuen Pakete. Der OpenAI-kompatible Anbieter nutzt `fetch` aus Node; das
  Testmodell im Abnahmetest ist ein kleiner Python-HTTP-Server aus der Standardbibliothek.
- **Umfang:** drei Task-Gruppen, höchstens etwa drei Nächte.
- **Nicht-Ziele:**
  - kein MCP-Endpunkt, kein Elixir-Code, kein Dienstkonto im Server, keine Rechteprüfung (ap-15, ap-07b, ADR-055
    im Produkt)
  - keine automatische Erkennung lokaler Modelle, keine Einstellungsoberfläche je Projekt, kein Anthropic- oder
    sonstiger Nicht-OpenAI-Anbieter, keine Schlüsselverwaltung über Umgebungsvariablen hinaus (ap-15)
  - keine Eval-Suite mit Aufgabengenerator, kein Erfahrungsspeicher, kein Training (ap-15, ap-38, ADR-053 Stufen
    2–4); der Prüfsatz ist fest und klein
  - keine Skizzen, Extrusion, Teile, Baugruppen per KI (Folgestufen); kein „Rennrad“
  - keine neuen Elementtypen, keine Änderung an Worker, Kernel-Schnittstelle oder Rust-Kern
  - keine Produkt-Oberfläche in `client/` (ap-08b); die Satzerkennung versteht nur deutsche Sätze nach den
    Mustern in design.md (ein echtes Modell versteht, was es eben versteht)
  - keine Anzeige von Code-Diff oder Text-Projektion (ADR-035, spätere Changes)
