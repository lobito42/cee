## Why

Gate G1 (Ende M0) verlangt einen UX-Prototyp mit Go (ADR-059, ADR-062 Punkt 2). Der erste Prototyp ap-41 war im
Pilotlauf des Kernteams (TP1, 2026-10-21) ein No-Go. Der zweite Stand dieses Changes (PR #51,
`spikes/ux-prototyp-2/`, fünf Zonen nach ADR-063) ist durch ADR-065 „Bedienkonzept – Fensteraufbau“ überholt:
Menüleiste, Taskleiste, Struktur, Modell mit Dokument-Reitern, Eigenschaften über Chat, optionales Panel.

Bevor Funktionen „am Fließband“ je Nacht entstehen, sollen die **gemeinsamen Bausteine der Bedienung** einmal
verbindlich festgelegt und in einem spielbaren Prototyp gezeigt werden: wie ein Element aussieht, wenn es
überfahren, gewählt, aktiv, ausgeblendet, fehlerhaft oder von anderen bearbeitet ist; wie Auswahl, Anlegen,
Verwerfen, Kontextmenü, Navigation, Ziehen, Sichtbarkeit, Rückmeldung und Tastatur überall gleich funktionieren.
Der Mensch wünscht ausdrücklich eine durchgängige, einfache Oberfläche ohne Mischmasch, nach Aufgaben geordnet.
Dieser Change schneidet ap-41b deshalb neu zu **„Interaktions-Grundlagen“** (Kennung bleibt). Mit seiner Abnahme
gilt ADR-065 (Status „vorgeschlagen, gilt nach der Abnahme des Prototyps ap-41b“).

## What Changes

- Neuer Stand des Wegwerf-Prototyps in `spikes/ux-prototyp-2/` (ersetzt den Stand aus PR #51; Begründung und
  Übernahme brauchbarer Teile in design.md). Kein Produktcode.
- **Fensteraufbau nach ADR-065:** Menüleiste (Start-Menü, Dropdowns, Suche, Rückgängig, drei Schalter),
  Taskleiste, Struktur, Modell mit Dokument-Reitern, Pfad und Ansichtsleiste, rechts Eigenschaften über Chat,
  optionales Panel unten (in diesem Change nur „Befunde“), leise Rückmeldezeile.
- **Elementzustände** mit je einer festen Optik aus den Tokens, gleich in Modell, Struktur und Chat, und einer
  Vorrangregel.
- **Eine Auswahl für alles** (Struktur, Modell, Eigenschaften, Chat), Mehrfachauswahl, Abwählen, Verhalten in Teil
  und Baugruppe; Schnittstelle zur Auswahl nach Regel aus ap-49-spike-auswahl.
- **Anlegen, Umbenennen, Duplizieren, Verwerfen** mit je genau einem Befehl, den Menü, Kürzel, Kontextmenü und
  (simulierte) KI gleichermaßen aufrufen; ein Rückgängig für alles.
- **Kontextmenü aus dem Befehlsregister** nach Befehlsfamilie und Auswahl (Platzierungsregel ADR-065 Punkt 12),
  gleich in Struktur und Modell.
- **Navigation** über austauschbare Navigationsprofile (Maus, Trackpad, Touch), auf Auswahl zoomen,
  Perspektive/Orthogonal.
- **Ziehen:** Griff im Modell (Maß ändern) und Ziehen & Ablegen in der Struktur, mit sichtbarem Ziel, erlaubt/nicht
  erlaubt und Abbruch mit Esc.
- **Ausblenden/Einblenden** am Auge der Strukturzeile, wirkt nur auf die Ansicht.
- **Ansicht ist flüchtig, Speichern ist ausdrücklich:** drei Schichten (Arbeitsschritte im Graphen, abgeleitetes
  Arbeitsergebnis, flüchtige Ansicht je Person); „Ansicht speichern“ legt ein benanntes Element im Graphen an.
- **Rückmeldung und Fehler** („rechnet“, „fehlerhaft“, Meldungen an fester Stelle); das Modell zerbricht nie.
- **Tastatur und Fokus:** Reihenfolge, Esc/Enter-Regeln, Kürzel aus dem Register.
- **Andere Personen** (simuliert) nur live; Zahlen mit Einheit, Texte über Übersetzungsschlüssel.
- **Bausteinkatalog** im Prototyp: eine Seite je Baustein mit Bild und Regel, Maßstab für Nachtagenten und den
  ui-checker.
- Testleitfaden `docs/spikes/ux-prototyp-2.md` mit Pilotaufgaben (aus dem alten A–H nur, was noch passt, dazu neue
  Aufgaben zu Auswahl, Verwerfen, Ziehen und Ausblenden).
- Jede Task-Gruppe endet mit einem klickbaren Stand und einer Klick-Anleitung im PR.

## Capabilities

### New Capabilities

- `interaktions-grundlagen`: klickbarer Prototyp der gemeinsamen Bausteine der Bedienung nach ADR-065
  (Fensteraufbau, Elementzustände, Auswahl, Anlegen/Verwerfen, Kontextmenü, Navigation, Ziehen, Sichtbarkeit,
  Rückmeldung, Tastatur, Bausteinkatalog). Prototyp-Verhalten; wird ohne Übernahme in `openspec/specs/`
  archiviert (`--skip-specs`). Ersetzt die Capability `ux-bedienkonzept` des vorigen Stands dieses Changes.

### Modified Capabilities

Keine.

## Impact

- **Betroffene ADRs:** ADR-065 (Fensteraufbau, Punkte 1–14; dieser Change ist seine Abnahme), ADR-063 (durch
  ADR-065 geändert), ADR-060 (Navigationsprofile, Eingabe als Schicht, nichts am Überfahren, Kürzel nach
  Plattform), ADR-061 (ein Muster je Aufgabe, Tokens, ein Akzent, eine Statussprache), ADR-045 (ein
  Befehlsregister), ADR-050 (fehlerhaft/pausiert, Modell zerbricht nicht), ADR-051/ADR-052 (Verwerfen statt
  Löschen, keine Git-Begriffe, eine Suche), ADR-015 (Sichtbarkeit wirkt nie auf den Export), ADR-028/ADR-032 (Graph ist Quelle, Ergebnis abgeleitet), ADR-016/ADR-058
  (Auswahl über Adressen, keine Indizes), ADR-021 (KI nur als Vorschlag), ADR-044 (Tippen beim Ziehen), ADR-056
  (Anwesenheit nur flüchtig), ADR-057 (Zahlen mit Einheit), ADR-037 (kein KI-Anbieter im Prototyp),
  ADR-059/ADR-062 (M0, Gate G1).
- **Mögliche Widersprüche, ausdrücklich gemeldet** (Entscheidung beim Kernteam, design.md „Open Questions“):
  1. `docs/rules/client.md` und `docs/design/leitbild.md` verlangen noch „keine Menüleisten“, „Inspektor“,
     „fünf Zonen“, „Arbeitsbereiche“ und „Panels neben dem Modell: 2“; der Prototyp folgt ADR-065.
  2. ADR-065 Punkt 3 begrenzt Kontextaktionen auf fünf je Objektart, der Auftrag nennt höchstens 12 Einträge je
     Gruppe im Kontextmenü. Der Prototyp zeigt beides aus derselben Quelle (Vorschlag in design.md).
  3. ADR-061: Neue Muster nur per ADR. Mehrere Bausteine (Elementzustände, Kontextmenü, Dropdown, Ziehen &
     Ablegen, Auge, Pfad, Dokument-Reiter, Ansichtsleiste) haben noch keine Zeile im Musterkatalog; der Prototyp
     kennzeichnet sie als Kandidaten.
  4. Für „von anderen bearbeitet“ gibt es kein Token in `docs/design/tokens.json`.
- **Gate:** G1.
- **Abnahmetests:** `tests/acceptance/ap-41b-ux-bedienkonzept/` (AK-1 bis AK-17, Zuordnung in design.md). Die
  vorhandenen Abnahmetests dort prüfen den alten Stand und **veralten vollständig** (Liste in design.md); der
  test-author schreibt sie auf `tests/ap-41b-ux-bedienkonzept` neu. Bedienbarkeit und Augenschein sind
  `[mensch]` und Punkt der PR-Checkliste „Menschliche Abnahme“.
- **Referenzdaten:** Das Kernteam legt das Befehlsinventar (Beta-Befehle mit Familie) unter
  `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` ab, bevor Abnahmetests geschrieben werden (Format
  in design.md; entschieden 2026-10-23, Ablage über den Branch `tests/ap-41b-ux-bedienkonzept`). Keine Referenzbilder unter `tests/ui-reference/` (die
  ersten entstehen mit ap-08b).
- **Neue Abhängigkeiten nur im Prototyp:** wie bisher `three` (MIT), `lucide` (ISC),
  `@fontsource-variable/inter` und `@fontsource/jetbrains-mono` (SIL OFL 1.1), `playwright` (Apache-2.0, nur
  Entwicklung). Keine weiteren.
- **Verhältnis zu PR #51 und Branch `change/ap-41b-ux-bedienkonzept`:** Der dortige Code folgt ADR-063 und wird
  nicht gemergt; brauchbare Teile (Wertfeld, i18n, Token-Erzeugung, Register, Halter-Geometrie, 3D-Lesbarkeit,
  Prüfwerkzeug) werden übernommen. Vorschlag zum Schließen in design.md (Open Questions).
- **Nachtschicht:** Gruppen 1–6 sind nachttauglich (höchstens etwa drei Nächte), jede endet mit einer Vorschau
  zum Klicken. Pilotlauf und Testpersonen sind ein eigener Schritt des Kernteams.
- **Nicht-Ziele** (spätere Meilensteine nach ADR-059/ADR-062 oder andere Changes):
  - kein Produktcode in `client/`, `crates/`, `server/`, `worker/`; keine Bausteine in `client/src/ui/`, keine
    Tokens für `client/`, kein Lint dort (ap-08a, ap-08b); keine vollständige WCAG-Prüfung (ap-08b)
  - keine Auswahl nach Regel, kein „Ähnliche“, keine Kantenschleife, kein Auswahlfilter (ap-49-spike-auswahl,
    danach ap-08b); hier nur die Schnittstelle
  - keine Inhalte des Panels außer „Befunde“: kein Verlauf, keine Studien, keine Entwürfe und Meilensteine, keine
    Freigabe (M2+ bzw. ap-25, ap-33a); kein Teilen und Vergleichen der Dokument-Reiter
  - kein Shop-Inhalt, keine echten Fachpakete, keine Raum- und Akustik-Abläufe (ADR-062); der Eintrag
    „Simulation“ in der Taskleiste ist ein gekennzeichneter Platzhalter
  - kein echter Geometriekernel (ap-06, ap-39), keine Skizzen-Zwangsbedingungen (ap-12), keine neuen
    Formelemente; Geometrie nur aus Quadern und Zylindern
  - keine echte KI, kein MCP, kein Anbieter, kein lokales Modell (ap-15, M3); Chat simuliert
  - keine echte Anwesenheit, kein Server, keine Synchronisation (ap-07a, ap-07b); andere Personen simuliert
  - keine 3D-Maus-Anbindung, kein Layout Tablet, keine Profil-Einstellungsseite (ap-42, ap-43, ap-08c); Touch
    nur als Navigationsprofil im Desktop-Layout
  - keine Detailtiefe „Mehr zu …“ mit Lernen je Person (ADR-065 Punkt 10), keine schwebende Werkzeugleiste
    (ADR-065 „Offen“), kein Export (ap-47)
  - kein öffentliches Hosting ohne Entscheidung des Kernteams
