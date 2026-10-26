## ADDED Requirements

### Requirement: Nur Befehle mit Wirkung sichtbar
Start-Menü, Dropdowns, Kontextmenü (beide Ebenen), Kontextaktionen, Ansichtsleiste und „Alle Befehle zeigen“ SHALL
nur Befehle zeigen, die im Register kein `folgt: true` tragen. Platzhalter (`folgt: true`) MUST im Register bleiben
und MUST nur über die Suche erreichbar sein, dort in der letzten Gruppe „Folgt später“ mit höchstens 3 sichtbaren
Treffern; ein Platzhalter MUST NOT erster Treffer sein und MUST NOT Modell oder Ansicht ändern (ADR-065 Punkte 12
und 14).

#### Scenario: [auto] Keine Platzhalter in Menüs
- **WHEN** `pruefen sichtbarkeit-befehle` für die Taskleisten-Einträge „Modellieren“ und „Simulation“ Start-Menü,
  alle Dropdowns, Ansichtsleiste und „Alle Befehle zeigen“ ausliest und `pruefen kontextmenue` alle Auswahlarten
  einschließlich der Ebene „Mehr …“ und der Kontextaktionen ausliest
- **THEN** ist die Zahl der Einträge mit `folgt: true` (laut `befehle()`) in allen diesen Orten 0, und jeder Eintrag
  trägt `data-befehl` mit einer ID aus dem Register

#### Scenario: [auto] Jeder sichtbare Eintrag wirkt
- **WHEN** `pruefen ausloesen` jeden sichtbaren Eintrag aus Start-Menü, Dropdowns, Kontextmenü (beide Ebenen) und
  Kontextaktionen der Zustände `halter` und `auswahl` je einmal aus frischem Zustand auslöst
- **THEN** steht für jeden Eintrag genau ein neuer Eintrag mit diesem Befehl und `wirkung: true` in `ausgeloest()`,
  die Rückmeldezeile zeigt 0-mal den Text „folgt in einer späteren Stufe“, und die Konsole enthält 0 nicht
  abgefangene Fehler

#### Scenario: [auto] Platzhalter nur am Ende der Suche
- **WHEN** `pruefen suche` die Eingaben aus design.md (Abschnitt 7) tippt und jeweils Enter drückt
- **THEN** ist „Folgt später“ in jeder Ergebnisliste mit Platzhaltern die letzte Gruppe mit ≤ 3 sichtbaren Treffern,
  der erste Treffer ist in 0 Fällen ein Platzhalter, Enter löst in 0 Fällen einen Platzhalter aus, und bei der Eingabe,
  die nur Platzhalter trifft, ist nach Enter `modellHash()` unverändert und `ausgeloest()` ohne neuen Eintrag mit
  `wirkung: true`

#### Scenario: [auto] Platzhalter anklicken ändert nichts
- **WHEN** in der Suche ein Treffer der Gruppe „Folgt später“ angeklickt wird
- **THEN** sind `modellHash()`, `ansicht()` und die Länge von `protokoll()` unverändert, und die Rückmeldezeile zeigt
  genau einmal „<Titel> folgt in einer späteren Stufe.“

#### Scenario: [auto] Jeder Beta-Befehl hat weiter einen Ort
- **WHEN** der Test jeden Befehl mit `beta: true` aus `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json`
  mit `befehle()` abgleicht
- **THEN** ist jeder dieser Befehle im Register, `orte` enthält für jeden mindestens einen Eintrag, und bei
  Platzhaltern ist `orte` genau `["suche-folgt"]`

#### Scenario: [mensch] Nur, was etwas tut
- **WHEN** das Kernteam im Zustand `halter` Start-Menü, alle Dropdowns und das Kontextmenü der Grundplatte öffnet
- **THEN** beurteilt es mit Ja/Nein: „Ich sehe nur Funktionen, die schon etwas tun“

### Requirement: Jeder Befehl nur einmal je Menü
In jedem Menü (Liste in design.md, Abschnitt 10) SHALL jede Befehls-ID, jeder Titel und jede Handlung (Feld
`handlung`) höchstens einmal erscheinen, nur in der zur Auswahl passenden Variante. In der Menüleiste einer
Taskleisten-Ansicht MUST jede ID höchstens einmal erscheinen; Befehle mit eigenem Knopf MUST NOT zusätzlich im
Dropdown stehen.

#### Scenario: [auto] Keine Doppelungen in einem Menü
- **WHEN** `pruefen doppelt` für „Modellieren“ und „Simulation“ in den Zuständen `halter`, `auswahl`, `mehrfach`,
  `aktiv` und `ausgeblendet` jedes Menü öffnet und ausliest
- **THEN** sind `doppelte_ids`, `doppelte_titel` und `doppelte_handlungen` in jedem Menü leer (0 Einträge)

#### Scenario: [auto] Jede ID nur an einem Ort der Menüleiste
- **WHEN** `pruefen doppelt` für „Modellieren“ im Zustand `halter` Start-Menü, alle Dropdowns und alle Knöpfe der
  Menüleiste zusammen ausliest
- **THEN** ist `doppelte_ids_menueleiste` leer, `bearbeiten.rueckgaengig`, `bearbeiten.wiederholen`,
  `fenster.struktur`, `fenster.panel`, `fenster.rechts` und `suche.oeffnen` stehen nur als Knopf (je 1-mal), und
  Rückgängig, Wiederholen und Suche zeigen am Knopf ihr Kürzel

#### Scenario: [auto] Ansichtsleiste ohne Wiederholung
- **WHEN** im Zustand `halter` das Aufklappmenü der Ansichtsleiste geöffnet wird
- **THEN** enthält es 0 Befehle, die als Knopf in der Ansichtsleiste stehen, und jeder der sechs Knöpfe erscheint in
  der Ansichtsleiste genau 1-mal

#### Scenario: [auto] Eine Handlung, die passende Variante
- **WHEN** das Dropdown „Bearbeiten“ und das Menü am Auge einmal im Zustand `auswahl` (ein Element) und einmal im
  Zustand `mehrfach` (zwei Elemente) geöffnet und darin „Duplizieren“ ausgelöst wird
- **THEN** zeigt jedes Menü für jede darin vorkommende Handlung (duplizieren, verwerfen, ausblenden) genau 1 Eintrag; bei einem Element ist
  es die Variante mit `bezug: element`, bei zwei Elementen die mit `bezug: mehrfach`, und `protokoll()` enthält danach
  `element.duplizieren` bzw. `auswahl.duplizieren`

#### Scenario: [mensch] Menüs ohne Wiederholung
- **WHEN** das Kernteam im Zustand `halter` alle Dropdowns, die Ansichtsleiste und das Menü am Auge öffnet
- **THEN** beurteilt es mit Ja/Nein: „Ich sehe keinen Befehl zweimal im selben Menü oder in der Menüleiste“

## MODIFIED Requirements

### Requirement: Fensteraufbau nach ADR-065
Der Prototyp SHALL die Zonen Menüleiste, Taskleiste, Struktur, Modell (mit Dokument-Reitern, Pfad und
Ansichtsleiste), Eigenschaften über Chat, optionales Panel und Rückmeldezeile mit Lage und Maßen nach design.md
zeigen. Dokument-Reiter MUST die einzigen Reiter im Fenster sein. Dropdowns der Menüleiste MUST höchstens 12
Einträge je Untergruppe haben, und jeder Eintrag MUST ein Befehl aus dem Register mit Wirkung sein (Requirement
„Nur Befehle mit Wirkung sichtbar“). Ein Dropdown oder eine Untergruppe ohne Befehl mit Wirkung MUST NOT angezeigt
werden.

#### Scenario: [auto] Zonen in Lage und Größe
- **WHEN** `pruefen fenster` die Zustände `halter`, `befund` und `chat` misst
- **THEN** liegen alle Zonen mit `data-zone` innerhalb der Maße aus design.md von ap-41b (± 2 px), die Modellzone
  nimmt ≥ 45 % der Fensterfläche ein, Eigenschaften und Chat sind beide sichtbar, und das Panel ist nur im Zustand
  `befund` sichtbar

#### Scenario: [auto] Menüleiste und Schalter
- **WHEN** im Zustand `halter` nacheinander Mod+B, Mod+J und Mod+Alt+B gedrückt werden und danach dieselben
  Schalter in der Menüleiste geklickt werden
- **THEN** blendet jede Taste genau ihre Zone aus bzw. ein (Struktur, Panel, rechte Seitenleiste), jeder Klick
  hat dieselbe Wirkung wie die Taste, und die Menüleiste enthält Start-Menü, mindestens ein Dropdown, Suche mit
  angezeigtem Kürzel und Rückgängig mit angezeigtem Kürzel

#### Scenario: [auto] Nur Dokument-Reiter
- **WHEN** `pruefen fenster` alle Elemente mit `role="tab"` zählt
- **THEN** liegen alle in der Reiterzeile über dem Modell, es sind genau 2 (Halter, Sensorgehäuse), und kein
  Dropdown hat mehr als 12 Einträge in einer Untergruppe

#### Scenario: [auto] Keine leeren Menüs
- **WHEN** `pruefen sichtbarkeit-befehle` für „Modellieren“ und „Simulation“ Start-Menü und Dropdowns ausliest
- **THEN** gibt es 0 Dropdowns und 0 Untergruppen ohne Eintrag, und das Start-Menü enthält mindestens
  `element.anlegen`

#### Scenario: [auto] Taskleiste wechselt Menüs
- **WHEN** in der Taskleiste von „Modellieren“ auf „Simulation“ gewechselt wird
- **THEN** ändern sich die Dropdowns der Menüleiste (bei „Simulation“ 0 Dropdowns, weil alle ihre Befehle
  Platzhalter sind; Start-Menü, Suche, Rückgängig und Schalter bleiben), die Struktur zeigt einen Leeren Zustand mit
  der Kennzeichnung „simuliert“, und nach dem Zurückwechseln sind Menüs, Struktur und Auswahl wie vorher

#### Scenario: [mensch] Aufgeräumt und durchgängig
- **WHEN** das Kernteam die 44 Screenshots und die Klick-Anleitung durchgeht
- **THEN** beurteilt es mit Ja/Nein: „Jede Aufgabe hat einen erkennbaren Ort“, „Nichts ist doppelt“, „Es sieht aus
  einem Guss aus“

### Requirement: Kontextmenü aus dem Befehlsregister
Das Kontextmenü SHALL aus dem Befehlsregister erzeugt werden: Kandidaten sind die Befehle mit Wirkung, deren `bezug`
zur Auswahl passt, die anwendbar sind und die keinen festen Ort außerhalb des Kontextmenüs haben (Familien Ansicht
und Fenster, Rückgängig und Wiederholen; Liste in design.md). Die sichtbare Ebene MUST höchstens 8 Befehlseinträge
zeigen – die ersten nach `rang` – und genau einen Eintrag „Mehr …“, wenn es weitere Kandidaten gibt; „Mehr …“
öffnet eine zweite Ebene mit den übrigen Kandidaten, nach Familie gruppiert, höchstens 12 je Gruppe. Für dieselbe
Auswahl MUST das Menü in Struktur und Modell gleich sein. Die Kontextaktionen über dem Gewählten MUST die ersten
höchstens fünf Kandidaten nach `rang` sein (ADR-065 Punkt 3).

#### Scenario: [auto] Gleich in Struktur und Modell
- **WHEN** `pruefen kontextmenue` für die Auswahlarten Teil, Schritt, Kante, Baugruppe, mehrere Elemente und
  keine Auswahl je einmal in der Struktur und im Modell das Kontextmenü öffnet
- **THEN** sind sichtbare Ebene und Ebene „Mehr …“ (Einträge und Reihenfolge) je Auswahlart in beiden Zonen
  identisch, die sichtbare Ebene hat ≤ 8 Befehlseinträge und 0 Gruppenüberschriften, „Mehr …“ erscheint genau dann
  (genau 1-mal), wenn es mehr als 8 Kandidaten gibt, jede Gruppe in „Mehr …“ hat ≤ 12 Einträge, und jeder Eintrag
  ist ein Befehl des Registers mit Wirkung, dessen `bezug` zur Auswahl passt

#### Scenario: [auto] Die ersten nach Rang sind sichtbar
- **WHEN** der Test für jede Auswahlart `kandidaten_nach_rang` mit der sichtbaren Ebene und der Ebene „Mehr …“
  vergleicht
- **THEN** besteht die sichtbare Ebene genau aus den ersten min(8, Anzahl) Kandidaten nach `rang`, die Ebene
  „Mehr …“ genau aus den übrigen, und kein Kandidat fehlt oder steht doppelt

#### Scenario: [auto] Befehle mit festem Ort stehen nicht im Kontextmenü
- **WHEN** `pruefen kontextmenue` alle Auswahlarten in den Zuständen `halter`, `auswahl`, `aktiv` und `ausgeblendet`
  ausliest
- **THEN** enthält keine Ebene einen Befehl der Familien Ansicht oder Fenster, `bearbeiten.rueckgaengig` oder
  `bearbeiten.wiederholen` (0 Treffer), und jeder dieser Befehle mit Wirkung ist weiter an seinem Ort (Ansichtsleiste,
  Schalter, Rückgängig-Knopf oder Dropdown) und in der Suche erreichbar

#### Scenario: [auto] Erzeugt, nicht von Hand
- **WHEN** der Test dem Register (Kopie im Testverzeichnis, Prototyp mit `?register=<datei>` geladen) einen Befehl
  der Familie „Bearbeiten“ mit `bezug: "element"` und `rang: 0` hinzufügt
- **THEN** erscheint er ohne weitere Änderung als erster Eintrag der sichtbaren Ebene im Kontextmenü eines Elements
  und als erste Kontextaktion, im Dropdown „Bearbeiten“ und in der Suche; mit zusätzlich `folgt: true` erscheint er
  in keinem dieser Orte außer der Suchgruppe „Folgt später“

#### Scenario: [auto] Kontextaktionen sind der Anfang des Menüs
- **WHEN** im Zustand `auswahl` die Kontextaktionen über dem Gewählten gelesen werden
- **THEN** sind es höchstens 5 Einträge, sie sind gleich den ersten Einträgen von `kandidaten_nach_rang`, und alle
  stehen in der sichtbaren Ebene des Kontextmenüs

#### Scenario: [auto] Jeder Beta-Befehl hat einen Ort
- **WHEN** der Test jeden Befehl mit `beta: true` aus `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json`
  (Referenzdaten des Kernteams) über seine Familie mit der Platzierungstabelle in design.md von ap-41b abgleicht
- **THEN** hat jede Familie des Inventars genau einen Ort in der Platzierungstabelle (0 Familien ohne Ort, 0 mit zwei
  Orten), jeder Beta-Befehl mit Wirkung ist über den Ort seiner Familie und die Suche erreichbar und an keinem
  weiteren Ort der Platzierungstabelle, jeder Platzhalter (`folgt: true`) ist nur über die Suchgruppe „Folgt später“
  erreichbar, und kein Dropdown hätte mit den Beta-Befehlen seiner Familie mehr als 12 Einträge in einer Untergruppe

#### Scenario: [auto] „Mehr …“ per Klick und Tastatur, Esc schließt eine Ebene
- **WHEN** im Zustand `kontextmenue` „Mehr …“ einmal per Klick und einmal per Pfeil runter bis „Mehr …“ und Pfeil
  rechts geöffnet wird und danach je einmal Esc gedrückt wird
- **THEN** öffnet sich die zweite Ebene in beiden Fällen ohne Überfahren, der erste Esc schließt nur die zweite Ebene
  (sichtbare Ebene bleibt offen, Fokus auf „Mehr …“), ein weiterer Esc schließt das Kontextmenü

#### Scenario: [auto] Kurz in der Höhe und schnell
- **WHEN** `pruefen kontextmenue` die Höhe der sichtbaren Ebene je Auswahlart misst und `pruefen messen`
  `kontextmenue_p95_ms` über mindestens 20 Rechtsklicks misst
- **THEN** ist jede sichtbare Ebene ≤ 360 px hoch (1440 × 900), und das vom Test aus den Rohwerten berechnete p95 liegt
  unter 100 ms

#### Scenario: [auto] Pilotabläufe bleiben lösbar
- **WHEN** `pruefen ablauf <e…l>` je Aufgabe den Ablauf mit echten Eingaben spielt
- **THEN** erreicht jede der 8 Aufgaben den Sollzustand aus design.md von ap-41b (Aufgabe G: Volumen 57,49 cm³
  ± 0,1 %)

#### Scenario: [mensch] Kurzes Kontextmenü
- **WHEN** das Kernteam im Halter die Grundplatte und danach Grundplatte und Steg gemeinsam mit Rechtsklick öffnet
- **THEN** beurteilt es mit Ja/Nein: „Das Menü ist kurz genug, um es auf einen Blick zu erfassen“ und „Was ich oft
  brauche, steht ohne ‚Mehr …‘ da“
