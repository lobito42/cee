## Why

Gate G1 (Ende M0) verlangt einen UX-Prototyp mit Go (ADR-059, ADR-062 Punkt 2). Der erste Prototyp aus
ap-41-ux-prototyp (PR #32, Code auf Branch `change/ap-41-ux-prototyp`) ist gebaut und testgrün, aber der
Pilotlauf des Kernteams (TP1, 2026-10-21) war ein **No-Go**: Die 3D-Fläche war kaum lesbar (nur Umgebungslicht,
keine Kanten, nicht drehbar), Featurebaum und Modell waren unverbunden, und eine Leitidee war nicht erkennbar.
Grüne Tests haben das nicht gefangen, weil sie Zählwerte prüften, nicht Lesbarkeit und Zusammenhang.

Danach hat das Kernteam ein **Bedienkonzept** freigegeben (zehn Punkte, verbindlich; Wortlaut in design.md,
Abschnitt „Bedienkonzept“). Dieser Change baut den UX-Prototyp nach diesem Konzept neu. Er ersetzt ap-41 als
Grundlage für G1, ap-08a und ap-08b; Aufgaben A–F, Leitfaden, Tokens, Musterkatalog und Prüfwerkzeug aus ap-41
gelten weiter, soweit das Konzept nichts anderes sagt. Messlatte bleibt die von ap-41 im Konzept: „4 von 5
Testpersonen lösen drei Kernabläufe ohne Einweisung“.

## What Changes

- Neuer Wegwerf-Prototyp `spikes/ux-prototyp-2/` (eigenes npm-Projekt, Vite, TypeScript strict, ohne
  UI-Framework, Werkzeugkette wie `client/`). Begründung für den neuen Ordner in design.md: Die Abnahmetests von
  ap-41 auf `main` prüfen `spikes/ux-prototyp/` und dürfen nicht geändert werden; ap-41 bleibt als Vergleich
  erhalten. Übernommen (kopiert und angepasst) werden Befehlsregister, Wertfeld, i18n, Token-Erzeugung und das
  Prüfwerkzeug; die Oberfläche wird neu gebaut.
- **Ein Bildschirm, fünf Zonen:** Kopfzeile (Pfad, Arbeitsbereich-Reiter, ein Feld „Suchen oder fragen“
  Strg/Cmd+K, Rückgängig mit sichtbarem Kürzel), links **Aufbau** (Schritte von oben nach unten, Skizzen als
  Unterzeilen), Mitte **Modell**, rechts **Inspektor**, unten leise **Rückmeldezeile**. Grundregel: erst wählen,
  dann tun.
- **Synchrone Auswahl** zwischen Modell und Aufbau, Überfahren als Zusatz in beide Richtungen.
- **Zahlen an einem Ort:** dauerhaft nur im Inspektor (Wertfelder, live, Enter, Esc); am Modell Griffe am
  gewählten Schritt mit Zahl am Zeiger und Tippen beim Ziehen (ADR-044); in der Skizze Maße als Teil der
  Zeichnung, Klick fokussiert das Feld im Inspektor.
- **Inspektor** zeigt immer das Gewählte, ohne Auswahl das ganze Teil (Material, Abmessungen, Volumen, Masse).
- **Drei Ebenen des Umschaltens** an festen Orten: Arbeitsbereich (Reiter), Ort (Teil/Skizze, Pfad, Fertig/Esc),
  Darstellung (Körper/Kanten/Durchsicht, Taste W).
- **Kontextaktionen** über dem Gewählten, derselbe Inhalt per Rechtsklick.
- **Erweiterung ohne eigene Fenster**, gezeigt am simulierten Beispielpaket „Simulation“ (Lager, Kraft,
  Ergebnis als Farbdarstellung mit Legende, als simuliert gekennzeichnet).
- **Eingabe:** Drehen, Schieben, Zoomen mit der Maus nach Navigationsprofil „Standard“; Ansicht einpassen.
- **KI im selben Feld** (simuliert, gekennzeichnet): Befehl → ausführen; Wunsch → Gespräch an der Stelle des
  Inspektors; Vorschlag als Entscheidungskarte mit Geister-Vorschau; danach ein normaler Schritt im Aufbau.
- **Lesbare 3D-Darstellung:** gerichtetes Licht, schattierte Flächen, sichtbare Kanten, Auswahlkontur im Akzent.
- **Beispielteil Halter** (Grundplatte 80 × 50 × 8 mm, Ecken R 3, Steg 60 × 10 × 30 mm, zwei Bohrungen Ø 6),
  änderbar und neu berechnet aus Quadern und Zylindern; Volumen und Masse nachrechenbar.
- Testleitfaden `docs/spikes/ux-prototyp-2.md` mit Aufgaben A–H (A–F angepasst an den Halter, neu G „Skizze
  öffnen, Länge 100 mm, zurück“ und H „Darstellung Kanten“).
- Jede Task-Gruppe endet mit einem klickbaren Stand und einer Klick-Anleitung im PR, damit das Kernteam nach
  jeder Nacht Software testen kann, ohne Code zu lesen.

## Capabilities

### New Capabilities

- `ux-bedienkonzept`: klickbarer Prototyp nach dem freigegebenen Bedienkonzept (fünf Zonen, synchrone Auswahl,
  Zahlen im Inspektor, Orte Teil/Skizze, Darstellungen, Kontextaktionen, Erweiterung ohne Fenster, KI im
  Suchfeld, lesbare 3D-Darstellung), Testzustände per Adresse, Testleitfaden mit Aufgaben A–H. Prototyp-
  Verhalten; wird ohne Übernahme in `openspec/specs/` archiviert (`--skip-specs`).

### Modified Capabilities

Keine.

## Impact

- **Betroffene ADRs:** ADR-021 (KI nur als Vorschlag mit Vorschau), ADR-022 (Arbeitsfläche, keine Menüs und
  Dialoge), ADR-044 (Werte beim Ziehen tippen, Arbeitsbereiche), ADR-045 (Befehlsregister, Kontextaktionen),
  ADR-050 (fehlerhafter Schritt zerbricht das Modell nicht), ADR-051 (Entwürfe, keine Git-Begriffe), ADR-052
  (eine Suche), ADR-054 (Fachpaket trägt Arbeitsbereich, Schritte, Werte und Befehle bei), ADR-056 (keine
  Abrufe bei Dritten, Testpersonen pseudonym), ADR-057 (Zahlen mit Einheit), ADR-059/ADR-062 (M0, Gate G1),
  ADR-060 (Layout Desktop, Eingabe als Schicht, Navigationsprofile), ADR-061 (Musterkatalog, Tokens, ein
  Akzent), ADR-037 (kein KI-Anbieter: der Prototyp nutzt keinen).
- **Mögliche Widersprüche, ausdrücklich gemeldet** (Entscheidung beim Kernteam, Details in design.md unter
  „Open Questions“):
  1. ADR-022, Leitbild und Musterkatalog verlangen eine **Werkzeugleiste mit genau fünf Werkzeugen**. Das
     Bedienkonzept nennt fünf Zonen ohne Werkzeugleiste. Der Prototyp folgt dem Konzept (keine Werkzeugleiste);
     ADR-022 und das Muster „Werkzeugleiste“ wären anzupassen.
  2. ADR-061: Neue Muster nur per ADR. Das Konzept braucht voraussichtlich **Pfad**, **Legende** und
     **Gespräch** (KI-Antwort an der Stelle des Inspektors), die der Katalog (19 Muster, Grenze 20) nicht hat.
     Der Prototyp kennzeichnet sie als Kandidaten (`data-muster-kandidat`); die Prüfung zählt sie getrennt.
  3. Muster „Letzte Aktion nachjustieren“ (Feld unten links) widerspricht „Zahlen an einem Ort“. Der Prototyp
     zeigt es nicht; nach jeder Aktion ist der neue Schritt gewählt und seine Werte stehen im Inspektor.
  4. Leitbild: „kein eigenes Chat-Fenster“. Das Gespräch ersetzt den Inspektor auf derselben Fläche, die Zahl
     der Panels bleibt 2; ob das dem Leitbild genügt, entscheidet das Kernteam.
  5. Kennung **ap-41b** (folgt ap-41 wie ap-05a/ap-05b); die Zeile in der Tabelle der Arbeitspakete ergänzt das
     Kernteam.
- **Gate:** G1.
- **Abnahmetests:** `tests/acceptance/ap-41b-ux-bedienkonzept/` (AK-1 bis AK-17, Zuordnung in design.md). Die
  Bedienbarkeit ist `[mensch]` und Punkt der PR-Checkliste „Menschliche Abnahme“ (Pilotlauf vor dem Merge).
- **Referenzdaten:** keine unter `tests/golden/ap-41b-ux-bedienkonzept/`; Halter und Testprojekt sind Teil des
  Prototyps und in design.md mit Sollwerten beschrieben. Keine Referenzbilder unter `tests/ui-reference/` (die
  ersten entstehen mit ap-08b). Die Referenzbilder des Konzepts liegen nur als Link vor (design.md).
- **Neue Abhängigkeiten nur im Prototyp:** wie ap-41 – `three` (MIT), `lucide` (ISC),
  `@fontsource-variable/inter` und `@fontsource/jetbrains-mono` (SIL OFL 1.1), `playwright` (Apache-2.0, nur
  Entwicklung). Keine weiteren.
- **Nachtschicht:** Die Gruppen 1–7 sind nachttauglich und durch AK-1 bis AK-17 prüfbar; jede Gruppe endet mit
  einer Vorschau zum Klicken. Pilotlauf und Testpersonen sind ein eigener Schritt des Kernteams.
- **Verhältnis zu ap-41:** ap-41 wird durch diesen Change abgelöst. Ob PR #32 geschlossen oder als Vergleich
  gemergt wird und wie ap-41 archiviert wird, entscheidet das Kernteam (Open Questions).
- **Nicht-Ziele** (spätere Meilensteine nach ADR-059/ADR-062 oder andere Changes):
  - kein Produktcode in `client/`, `crates/`, `server/`, `worker/`; kein Rust-Kern, kein WASM, kein Server, keine
    Synchronisation, keine Anwesenheit, keine Kommentare (ap-07a, ap-07b)
  - kein echter Geometriekernel, kein OpenCascade, keine Identität von Flächen (ap-06, ap-39); Geometrie nur aus
    Quadern, Zylindern und einfachen Abrundungen; keine Zwangsbedingungen in Skizzen (ap-12)
  - keine echte Simulation oder FEM (ADR-012); das Beispielpaket „Simulation“ zeigt nur die Andockstellen,
    sein Ergebnis ist erfunden und als „simuliert“ gekennzeichnet; keine Raum- oder Akustik-Abläufe (ADR-062)
  - keine echte KI, kein MCP, kein Anbieter, kein lokales Modell (ap-15, M3)
  - keine weiteren Navigationsprofile als „Standard“, keine Profil-Einstellungsseite, keine 3D-Maus-Belegung,
    kein Trackpad-Gestenprofil, kein Layout Tablet (ap-43, ap-08c); 3D-Maus nur als Erkundung (Open Questions)
  - keine Knoten- und Textansicht (ap-23a, ap-24), kein Aktionsprotokoll-Panel
  - keine Konflikte beim Übernehmen von Entwürfen, keine Meilensteine (ap-25); keine Freigabe (ap-33a); kein
    Material-Element mit Eigenschaftsgruppen (ap-10), nur ein fester Materialname mit Dichte; kein Export (ap-47)
  - keine Bausteine in `client/src/ui/`, keine Tokens für `client/`, kein Lint dort (ap-08a, ap-08b); keine
    vollständige WCAG-Prüfung (ap-08b)
  - kein öffentliches Hosting ohne Entscheidung des Kernteams
