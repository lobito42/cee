## Why

Gate G1 (Ende M0) verlangt neben den Spikes einen UX-Prototyp mit Go (ADR-059, ADR-062 Punkt 2). Bevor ap-08a
das Befehlsregister und ap-08b die Arbeitsfläche produktiv bauen, soll belegt sein, dass die geplante Bedienung
trägt: fünf Werkzeuge, zwei Panels, eine Suche, Entscheidungskarten statt Dialogen, Entwürfe statt
Git-Begriffen (ADR-022, ADR-045, ADR-051, ADR-061). Arbeitspaket ap-41: „Klickbarer Prototyp: Arbeitsfläche
mit Modellier-Abläufen (Skizze, Formelement, Baugruppe), Entwürfe und Suche, gebaut aus Musterkatalog und
Tokens (ADR-061)“; Abnahme „4 von 5 Testpersonen lösen drei Kernabläufe ohne Einweisung“. Das Konzept nennt
dieselbe Messlatte („Vor der Implementierung entstehen klickbare Prototypen …“).

Das Kernteam hat am 2026-10-20 für das Leitbild „Oberfläche und KI“ die **Variante A** gewählt
(`docs/design/leitbild.md`, derzeit auf Branch `adr/leitbild-ui-ki`): Der Prototyp zeigt den KI-Ablauf als
klickbare **Simulation**, ohne echte KI und ohne Anbieter, damit Testpersonen ihn mittesten, obwohl die KI
(ap-15) erst in M3 kommt. Eine ADR-Änderung ist dafür nicht nötig.

## What Changes

- Wegwerf-Prototyp `spikes/ux-prototyp/` (eigenes npm-Projekt mit Vite und TypeScript strict, dieselbe
  Werkzeugkette wie das Gerüst `client/` aus ap-00; kein Produktcode, wird nicht übernommen):
  - Arbeitsfläche nach Musterkatalog: Kopfzeile, Featurebaum links, 3D-Ansicht (einfache three.js-Darstellung
    vorbereiteter Körper), Eigenschaften-Panel rechts, Werkzeugleiste mit den fünf Werkzeugen, Suche
    (Cmd/Strg+K), Entscheidungskarte, „Letzte Aktion nachjustieren“, Rückmeldung, Befund
  - Farben, Schrift und Abstände nur aus `docs/design/tokens.json` (erzeugt, hell und dunkel); Inter und
    JetBrains Mono selbst gehostet; Symbole aus Lucide; keine festen Texte (Übersetzungsschlüssel Deutsch und
    Englisch)
  - Befehlsregister als Daten im Prototyp: Jede Funktion ist ein Befehl und über die Suche erreichbar
  - drei Kernabläufe: **(A)** Skizze mit Maßen anlegen und extrudieren, **(B)** Formelement ändern und
    Kanten verrunden, **(C)** zwei Teile zur Baugruppe verbinden
  - **Entwürfe** (ADR-051): Entwurf anlegen, vergleichen, übernehmen oder mit Begründung verwerfen; Ansichten
    „Ergebnis“ und „Alle Entwürfe“
  - **Suche** (ADR-052, ADR-061): eine Suche für Befehle und Elemente, gruppiert, mit Facetten und Kürzeln
  - **simulierter KI-Ablauf** nach dem Leitbild: Auswählen → Absicht → Vorschau → Übernehmen oder Verwerfen →
    Nachjustieren; drei vorbereitete Absichten, Entscheidungskarte mit Geister-Vorschau und den genutzten
    Befehlen als Textzeilen; kein Chat-Fenster, keine Netzanfrage
  - Testzustände per Adresse (`?zustand=…&thema=…&sprache=…`) für Screenshots ohne Klicken (wie später ap-08b)
  - Prüfwerkzeug `npm run --silent pruefen -- <befehl> --json` (Playwright, headless Chromium) als
    Schnittstelle der Abnahmetests: Zustände, Budget, Befehle, Texte, Abläufe, Netzanfragen, Messwerte
- Testleitfaden mit Ergebnisvorlage `docs/spikes/ux-prototyp.md` für die Abnahme mit Testpersonen

## Capabilities

### New Capabilities

- `ux-prototyp`: klickbarer Prototyp der Arbeitsfläche mit drei Modellier-Abläufen, Entwürfen, Suche und
  simuliertem KI-Ablauf; Testzustände per Adresse; Testleitfaden (Prototyp-Verhalten; wird ohne Übernahme in
  `openspec/specs/` archiviert, `--skip-specs`)

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs (bestätigen oder überarbeiten): ADR-021 (KI nur als Änderungssatz mit Vorschau), ADR-022
  (fünf Werkzeuge, keine Menüs und Dialoge), ADR-044 (Letzte Aktion nachjustieren, Werte tippen), ADR-045
  (Befehlsregister, Befunde), ADR-050 (fehlerhaftes Element zerbricht das Modell nicht), ADR-051 (Entwürfe in
  Alltagsbegriffen), ADR-052 (eine Suche), ADR-056 (keine Abrufe bei Dritten, Testpersonen nur pseudonym),
  ADR-057 (Zahlen mit Einheit), ADR-059 und ADR-062 (M0, Gate G1, Modellier-Abläufe statt Raum-Abläufe),
  ADR-060 (Layout Desktop, Plattform-Kürzel), ADR-061 (Musterkatalog, Tokens, ein Akzent), ADR-037 (kein fester
  KI-Anbieter: der Prototyp nutzt gar keinen). Kein Widerspruch zu einem ADR bekannt. Der Prototyp hält sein
  simuliertes Modell im eigenen TypeScript-Code statt im Rust-Kern (ADR-029); das ist kein Widerspruch, weil er
  kein Produktcode ist und nicht übernommen wird (wie `spikes/sync/` in ap-03).
- Grundlage: Leitbild „Oberfläche und KI“, Variante A (Entscheidung des Kernteams vom 2026-10-20; siehe
  Offene Fragen, Punkt 1), Musterkatalog `docs/design/muster.md` (19 Muster), Tokens
  `docs/design/tokens.json`, UI-Entwurf `docs/design/ui-entwurf/` (Anschauung, kein Vertrag).
- Abnahmetests: `tests/acceptance/ap-41-ux-prototyp/` (AK-1 bis AK-12, Zuordnung in design.md). Die
  Testpersonen-Abnahme ist `[mensch]` und Punkt der PR-Checkliste „Menschliche Abnahme“.
- Gate G1
- Referenzdaten: keine unter `tests/golden/ap-41-ux-prototyp/`; das Testprojekt (Platte, Gehäuse, Deckel) ist
  Teil des Prototyps und in design.md beschrieben. Keine Referenz-Screenshots unter `tests/ui-reference/`: Die
  Screenshots des Prototyps werden erzeugt und geprüft, aber nicht als Referenzbilder abgelegt (die ersten
  Referenzbilder entstehen mit ap-08b).
- Neue Abhängigkeiten nur im Prototyp: three (MIT), lucide (ISC), @fontsource-variable/inter und
  @fontsource/jetbrains-mono (SIL OFL 1.1, nach ADR-061 erlaubt), playwright (Apache-2.0, nur Entwicklung).
  Playwright lädt einmalig Chromium herunter (`build.sh`); kein Abruf zur Laufzeit des Prototyps.
- Nachtschicht: Die automatisch prüfbaren Teile (AK-1 bis AK-12) sind nachttauglich; die Abnahme mit
  Testpersonen ist ein eigener Schritt des Kernteams und nicht nachttauglich (ADR-059, Nachtrag).
- Nicht-Ziele (spätere Meilensteine nach ADR-059 und ADR-062 oder andere Changes):
  - kein Produktcode in `client/`, `crates/`, `server/`, `worker/`; kein Rust-Kern, kein WASM, kein Server,
    keine Synchronisation, keine Anwesenheit, keine Kommentare (ap-07a, ap-07b)
  - keine echte Geometrie, kein OpenCascade, keine Identität von Flächen (ap-06, ap-39, ap-12, ap-45); keine
    Zwangsbedingungen in Skizzen (ap-12)
  - keine echte KI, kein MCP, kein Anbieter, kein lokales Modell (ap-15, M3)
  - kein Layout Tablet, keine 3D-Maus, keine Navigationsprofile (ap-08c, ap-43)
  - keine Knoten- und Textansicht (ap-23a, ap-24), kein Aktionsprotokoll-Panel, kein Stapel (ap-08c)
  - keine Konflikte beim Übernehmen von Entwürfen, keine Meilensteine, kein Zurückholen (ap-25)
  - keine Freigabe, keine Revisionen, kein „Zur Prüfung geben“ (ap-33a), kein Material (ap-10), kein Export
    (ap-47), keine Komponenten mit Varianten (ap-13a), keine echten Verbindungsarten mit Freiheitsgraden und
    keine Kollisionsprüfung (ap-46)
  - keine Token-Erzeugung, kein Lint und keine Katalogseite für `client/` (ap-08a), keine Bausteine in
    `client/src/ui/` (ap-08b), keine vollständige WCAG-Prüfung (ap-08b)
  - keine Raum- oder Akustik-Abläufe (ADR-062, F1 nach der Beta)
  - kein öffentliches Hosting des Prototyps ohne Entscheidung des Kernteams (Offene Fragen, Punkt 5)

## Offene Fragen

Nur das Kernteam kann diese Punkte entscheiden; je mit Empfehlung.

1. **Leitbild auf main:** Der Change stützt sich auf `docs/design/leitbild.md`, das noch auf Branch
   `adr/leitbild-ui-ki` liegt; der Begriff „Vorschlag“ (einer der fünf Grundbegriffe) steht noch nicht in
   `docs/glossar.md`. *Empfehlung:* Leitbild-Branch mergen und „Vorschlag“ ins Glossar aufnehmen, bevor die
   Abnahmetests (`tests/ap-41-ux-prototyp`) geschrieben werden, damit Test-Autor und Umsetzung dieselbe Quelle
   lesen.
2. **Zählweise „4 von 5 lösen drei Kernabläufe“:** streng (eine Testperson zählt nur, wenn sie alle drei
   Abläufe A, B, C löst) oder je Ablauf (jeder Ablauf von mindestens 4 von 5 gelöst)? *Empfehlung:* streng, wie
   der Wortlaut; die Werte je Ablauf werden zusätzlich berichtet. Entwürfe, Suche und KI-Ablauf (Aufgaben D bis
   F) werden beobachtet und berichtet, zählen aber nicht für das Gate.
3. **Zeitlimits je Aufgabe:** Vorschlag A 5 min, B 4 min, C 5 min, D 5 min, E 2 min, F 4 min (design.md).
   *Empfehlung:* so übernehmen und nach dem Pilotlauf des Kernteams einmal anpassen, danach fest.
4. **Testpersonen und Zeitpunkt des Merges:** Das Kernteam ist Testperson 1, die Firma kommt später. Wer sind
   Testpersonen 2 bis 5, und wartet der PR auf alle fünf? *Empfehlung:* Merge nach grünen Abnahmetests und dem
   Pilotlauf des Kernteams (Scenario „Pilotlauf“); die Testpersonen 2 bis 5 (mindestens zwei mit CAD-Erfahrung,
   z. B. aus der Firma, und zwei aus dem 3D-Druck, die CEE nicht kennen) folgen; das Go für G1 gibt das Kernteam
   erst mit allen fünf Ergebnissen in `docs/spikes/ux-prototyp.md`. Der Pilotlauf ist durch Vorwissen
   verzerrt; das steht im Bericht.
5. **Bereitstellung für Testpersonen:** Der Prototyp ist eine statische Seite. Öffentlich hosten (z. B. GitHub
   Pages, Repo ist öffentlich) oder nur lokal (`npm run preview`) bzw. als gepacktes Build? *Empfehlung:* lokal
   bzw. gepacktes Build für die Tests vor Ort; öffentliches Hosting nur, wenn Testpersonen aus der Ferne
   teilnehmen, dann mit Hinweis „Prototyp“ auf der Seite. Das braucht eine Workflow-Änderung durch das Kernteam
   und ist nicht Teil dieses Changes.
6. **Ort des Prototyps:** `spikes/ux-prototyp/` (eigenes Projekt, wie `spikes/sync/`) oder in `client/`?
   *Empfehlung:* `spikes/`, damit kein Wegwerf-Code in den Produkt-Client gelangt und ap-08a/ap-08b die
   Entscheidungen zu Framework und Bausteinen frei treffen; Werkzeugkette und Versionen wie `client/`.
