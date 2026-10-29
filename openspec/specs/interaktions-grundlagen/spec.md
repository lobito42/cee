# interaktions-grundlagen Specification

## Purpose
TBD - created by archiving change ap-41b-ux-bedienkonzept. Update Purpose after archive.

## Requirements

### Requirement: Eigenständiger Prototyp ohne Server und Netz
Der Prototyp SHALL als eigenes npm-Projekt unter `spikes/ux-prototyp-2/` (Vite, TypeScript strict) zu einer
statischen Seite ohne Server bauen. Er MUST NOT Anfragen an fremde Hosts stellen oder ein KI-Modell einbinden;
Laufzeit-Abhängigkeiten nur nach design.md, Lizenzen nach ADR-034. `spikes/ux-prototyp/` (ap-41) MUST
unverändert bleiben.

#### Scenario: [auto] Bauen, Lint und Unit-Tests
- **WHEN** `bash spikes/ux-prototyp-2/build.sh` läuft und danach in `spikes/ux-prototyp-2/` `npm run lint` und
  `npm test`
- **THEN** enden alle drei mit Exit-Code 0 und `dist/index.html` existiert

#### Scenario: [auto] Keine Anfrage an fremde Hosts
- **WHEN** `npm run --silent pruefen -- anfragen --json` alle Testzustände, alle Katalogseiten und alle
  Pilotabläufe durchläuft
- **THEN** ist die Liste der Anfragen an andere Hosts als die lokale Vorschau leer (0 Einträge)

#### Scenario: [auto] Abhängigkeiten und Lizenzen
- **WHEN** der Test `spikes/ux-prototyp-2/package.json` und die installierten npm-Pakete prüft
- **THEN** enthält `dependencies` nur `three`, `lucide`, `@fontsource-variable/inter` und
  `@fontsource/jetbrains-mono`, und 0 installierte Pakete haben eine Lizenz aus GPL, AGPL oder LGPL

### Requirement: Testzustände per Adresse
Der Prototyp SHALL jeden der 22 Testzustände aus design.md allein aus der Adresse
`?zustand=<name>&thema=<hell|dunkel>` herstellen, ohne Klick und ohne Tastendruck, und danach
`document.documentElement.dataset.bereit` auf `"1"` setzen.

#### Scenario: [auto] Screenshots ohne Klicken
- **WHEN** `npm run --silent pruefen -- zustaende --out <dir> --json` läuft
- **THEN** entstehen 44 PNG-Dateien (22 Zustände × 2 Themen) mit je 1440 × 900 px, jede mit `bereit_ms`
  ≤ 3.000 und 0 Eingaben, und keine zwei Dateien haben denselben Pixel-Hash

#### Scenario: [auto] Unbekannter Zustand
- **WHEN** die Adresse `?zustand=gibt-es-nicht` geladen wird
- **THEN** ist der Prototyp nach ≤ 3.000 ms bereit, zeigt den Leeren Zustand und genau einen Befund
  „Zustand unbekannt“, und die Konsole enthält 0 nicht abgefangene Fehler

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

### Requirement: Elementzustände
Der Prototyp SHALL die Zustände überfahren, ausgewählt, aktiv, ausgeblendet, fehlerhaft, pausiert, rechnet und
von anderen bearbeitet mit je einer festen Optik nach der Tabelle in design.md zeigen, nur mit Tokens aus
`docs/design/tokens.json`. Derselbe Zustand MUST in Modell, Struktur, Chat-Kontext und Pfad dieselben Kanäle und
Tokens nutzen. Treffen mehrere Zustände zusammen, MUST die Vorrangregel aus design.md gelten.

#### Scenario: [auto] Gleiche Optik in allen Darstellungen
- **WHEN** `pruefen elementzustaende` den Zustand `zustaende` misst
- **THEN** meldet `window.__cee.zustaende(id)` für jedes Element in jeder Darstellung, in der es vorkommt,
  dieselbe Liste von Zuständen, und für jeden Zustand stimmen Kanal und Token-Name mit der Tabelle in design.md
  überein (0 Abweichungen)

#### Scenario: [auto] Kontur in der richtigen Farbe und Strichart
- **WHEN** im Zustand `zustaende` die Kontur der gewählten Grundplatte und des überfahrenen Stegs im Modell als
  Pixel gemessen wird (Median 5 × 5 px auf der durchgezogenen Linie) und die Kontur des von Testperson B
  bearbeiteten Elements über `zustaende(id)` bzw. die DOM-Attribute `data-kontur`, `data-kontur-token` und
  `data-kontur-breite` gelesen wird
- **THEN** liegt die Farbe der Auswahl und des Überfahrens je höchstens ΔE (OKLCH) 0,05 vom Token `akzent`, die
  Auswahlkontur ist mindestens doppelt so breit wie die des Überfahrens, und die Kontur der anderen Person meldet
  `gestrichelt` mit Token `linie-stark`

#### Scenario: [auto] Vorrang bei mehreren Zuständen
- **WHEN** ein fehlerhaftes Element überfahren und gewählt wird und ein ausgeblendetes Element in der Struktur
  gewählt wird
- **THEN** zeigt das fehlerhafte Element genau eine Kontur (Auswahl) und zusätzlich die Statusanzeige mit Farbe,
  Symbol und Wort „fehlerhaft“; das ausgeblendete Element ist in der Struktur gewählt und trägt `eye-off`, und im
  Modell wird es nicht gezeichnet

#### Scenario: [auto] Status immer mit Farbe, Symbol und Wort
- **WHEN** die Zustände `rechnet`, `befund` und ein pausiertes Element geprüft werden
- **THEN** hat jede Statusanzeige ein Farbtoken, ein Lucide-Symbol und ein Wort aus den Übersetzungen (3 von 3)

#### Scenario: [mensch] Zustände auf einen Blick
- **WHEN** das Kernteam den Zustand `zustaende` und die Katalogseite „Elementzustände“ ansieht
- **THEN** kann es jeden Zustand ohne Erklärung benennen (Ja/Nein je Zustand)

### Requirement: Eine Auswahl für alles
Der Prototyp SHALL genau einen Auswahlzustand (Liste von Adressen nach ADR-058) haben, den Struktur, Modell,
Eigenschaften, Chat-Kontext und Pfad zeigen und ändern. Klick, Umschalt+Klick, Mod+Klick, Klick ins Leere, Esc,
Mod+A und Doppelklick MUST in Struktur und Modell dieselbe Wirkung haben, mit dem Verhalten in Teil und Baugruppe
nach design.md. Funktionen MUST NOT nur beim Überfahren erreichbar sein (ADR-060). Die Auswahl nach Regel ist
nicht Teil dieses Changes (ap-49-spike-auswahl).

#### Scenario: [auto] Ein Zustand, überall gleich
- **WHEN** `pruefen auswahl` im Zustand `halter` die Grundplatte einmal im Modell und einmal in der Struktur
  anklickt
- **THEN** ist `auswahl()` in beiden Fällen gleich (eine Adresse, ID der Grundplatte), und Struktur
  (`aria-selected="true"`), Modell (Kontur), Eigenschaften (Name „Grundplatte“), Chat („zu: Grundplatte“) zeigen
  dasselbe

#### Scenario: [auto] Mehrfachauswahl und Abwählen
- **WHEN** nacheinander Klick auf Grundplatte, Umschalt+Klick auf Steg, Mod+Klick auf Grundplatte, Mod+A, Klick
  ins Leere ausgeführt werden – je einmal in der Struktur und einmal im Modell
- **THEN** enthält `auswahl()` nach den Schritten 1, 2, 1, alle sichtbaren und 0 Elemente, in Struktur und
  Modell identisch, und Esc mit Auswahl leert sie ebenfalls

#### Scenario: [auto] Teil und Baugruppe
- **WHEN** im Dokument Sensorgehäuse auf eine Fläche des Gehäuses geklickt, dann doppelt geklickt und dann erneut
  auf eine Fläche geklickt wird
- **THEN** ist zuerst das Teil „Gehäuse“ gewählt, danach ist „Gehäuse“ aktiv (Pfad endet auf „Gehäuse“, Rest
  gedimmt), und der dritte Klick wählt das Element im Gehäuse, das die Fläche erzeugt; „Fertig“, Esc ohne Auswahl
  und Klick im Pfad verlassen das aktive Element (3 von 3)

#### Scenario: [auto] Mehrere Elemente in Eigenschaften und Chat
- **WHEN** der Zustand `mehrfach` geladen wird
- **THEN** zeigen die Eigenschaften nur Felder, die beide Elemente haben, unterschiedliche Werte als „gemischt“,
  und der Chat zeigt „zu: 2 Elemente“

#### Scenario: [auto] Nichts nur beim Überfahren
- **WHEN** `pruefen budget` alle Bedienelemente in allen Zuständen mit und ohne Überfahren vergleicht
- **THEN** gibt es 0 Bedienelemente, die nur beim Überfahren sichtbar oder bedienbar sind (das Auge der Struktur
  ist immer sichtbar)

### Requirement: Elemente anlegen, ändern und verwerfen
Der Prototyp SHALL für Anlegen, Umbenennen, Duplizieren, Verwerfen und Wert ändern je genau einen Befehl haben,
den Menü, Tastenkürzel, Kontextmenü, Suche und Chat gleichermaßen aufrufen. Verwerfen MUST NOT löschen
(ADR-051/052), es gibt keine Sicherheitsabfrage. Rückgängig und Wiederholen MUST unabhängig von Zone und Weg auf
denselben Verlauf wirken.

#### Scenario: [auto] Ein Befehl, viele Wege
- **WHEN** `pruefen crud` jede Operation über jeden Weg aus design.md ausführt
- **THEN** steht im `protokoll()` für jede Operation auf allen Wegen derselbe Befehl (gleiche `id`, nur `weg`
  verschieden), und jeder Weg erzeugt genau einen Verlaufseintrag

#### Scenario: [auto] Verwerfen statt Löschen
- **WHEN** das Element „Bohrungen“ verworfen, dann „Verworfenes zeigen“ eingeschaltet und das Element
  zurückgeholt wird
- **THEN** ist es nach dem Verwerfen im Modell nicht gezeichnet, aber in `modell()` mit Kennzeichnung verworfen
  vorhanden; mit „Verworfenes zeigen“ steht es durchgestrichen in der Struktur; nach dem Zurückholen ist
  `modellHash()` gleich dem Stand vor dem Verwerfen; es erschien 0-mal eine Abfrage

#### Scenario: [auto] Rückgängig wirkt überall gleich
- **WHEN** die Dicke der Grundplatte über die Eigenschaften, den Griff und den Chat geändert wird und danach
  Rückgängig je einmal mit Fokus in Struktur, Modell und Chat und einmal über die Menüleiste ausgelöst wird
- **THEN** nimmt jeder Auslöser genau einen Eintrag zurück, nach drei Auslösern ist `modellHash()` gleich dem
  Ausgangsstand, und Wiederholen stellt die Schritte in derselben Reihenfolge wieder her

#### Scenario: [mensch] Aufgabe J
- **WHEN** eine Testperson Aufgabe J löst
- **THEN** findet sie Duplizieren, Umbenennen und Verwerfen ohne Hilfe in ≤ 3 min und sagt in der Nachbefragung,
  dass das Verworfene zurückzuholen ist (Ja/Nein)

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

### Requirement: Navigation im Modell
Drehen, Zoomen und Verschieben SHALL über austauschbare Navigationsprofile (Daten, ADR-060) laufen, mit dem
Standardprofil für Maus, Trackpad und Touch nach design.md. Auf Auswahl zoomen, Einpassen und der Wechsel
Perspektive/Orthogonal MUST Befehle sein.

#### Scenario: [auto] Standardprofil für drei Geräte
- **WHEN** `pruefen navigation` im Zustand `halter` je Gerät (Maus, Trackpad über `wheel`-Ereignisse, Touch über
  CDP) Drehen, Verschieben und Zoomen auslöst
- **THEN** ändert sich je Geste genau die erwartete Größe der Kamera (Drehen: Azimut oder Höhe ≥ 10°, Verschieben:
  Ziel ≥ 5 mm, Zoomen: Abstand ≥ 10 %), die übrigen um höchstens 1 %, und `auswahl()` und `modellHash()` bleiben
  unverändert

#### Scenario: [auto] Profile sind austauschbar
- **WHEN** die Einstellung `einstellung.navigationsprofil` auf das zweite Profil gesetzt wird
- **THEN** wirkt dieselbe Maustaste nach der Belegung des zweiten Profils, und der Unterschied zwischen den
  Profilen steht nur in `src/eingabe/profile.json` (0 Bezeichner eines Profils in anderen Quelldateien)

#### Scenario: [auto] Auf Auswahl zoomen, Einpassen, Projektion
- **WHEN** im Zustand `auswahl` F gedrückt, danach `ansicht.einpassen` ausgeführt und danach die Projektion
  umgeschaltet wird
- **THEN** füllt die Hüllbox der Grundplatte bzw. des ganzen Teils 60–90 % der kürzeren Seite der Modellzone mit
  Mitte auf ± 5 %, und `ansicht().projektion` wechselt von „orthogonal“ zu „perspektivisch“

#### Scenario: [mensch] Navigation fühlt sich vertraut an
- **WHEN** das Kernteam mit Maus und Trackpad (und, falls vorhanden, Touch) den Halter dreht, verschiebt und zoomt
- **THEN** beurteilt es mit Ja/Nein: „ohne Nachdenken bedienbar“ und „flüssig“

### Requirement: Ziehen im Modell und in der Struktur
Es SHALL zwei getrennte Arten des Ziehens geben: Ziehen eines Griffs im Modell (Maß ändern, ADR-044) und Ziehen &
Ablegen in der Struktur (umhängen). Beide MUST ein sichtbares Ziel bzw. einen sichtbaren Wert zeigen, erlaubt und
nicht erlaubt unterscheiden und mit Esc ohne Änderung abbrechen.

#### Scenario: [auto] Griff mit Zahl am Zeiger und Tippen
- **WHEN** im Zustand `auswahl` der Griff „Dicke“ um 30 px gezogen, dann „12“ getippt und Enter gedrückt wird
- **THEN** zeigt die Zahl am Zeiger während des Ziehens den Wert in ganzen Millimetern mit Einheit, nach Enter ist
  die Dicke 12 mm, `protokoll()` hat genau einen neuen Eintrag, und die Zahl ist ≤ 1.000 ms danach verschwunden

#### Scenario: [auto] Ablegen auf erlaubtem Ziel
- **WHEN** im Sensorgehäuse die Zeile „Deckel“ auf „Baugruppe 1“ gezogen und losgelassen wird
- **THEN** trägt „Baugruppe 1“ während des Ziehens `data-ziel="erlaubt"`, nach dem Loslassen ist der Deckel Kind
  von Baugruppe 1, und `protokoll()` hat genau einen Eintrag `element.umhaengen`

#### Scenario: [auto] Nicht erlaubtes Ziel und Esc
- **WHEN** „Baugruppe 1“ auf ihr eigenes Teil „Gehäuse“ gezogen und losgelassen wird, und danach der Deckel
  gezogen und mit Esc abgebrochen wird, und danach der Griff gezogen und mit Esc abgebrochen wird
- **THEN** trägt „Gehäuse“ `data-ziel="verboten"`, die Rückmeldezeile nennt den Grund, und in allen drei Fällen ist
  `modellHash()` unverändert und `protokoll()` ohne neuen Eintrag

### Requirement: Ausblenden und Einblenden
Das Auge an jeder Strukturzeile SHALL ein Element und seine Nachfahren aus der Ansicht nehmen und wieder zeigen.
Sichtbarkeit MUST nur die Ansicht der Person betreffen und MUST NOT das Modell und damit den Export ändern
(ADR-015). Sichtbarkeit gilt nur für die Person (entschieden, design.md, Open Questions 1).

#### Scenario: [auto] Ausblenden ändert das Modell nicht
- **WHEN** im Zustand `halter` das Auge des Stegs geklickt wird
- **THEN** wird der Steg im Modell nicht mehr gezeichnet, `ansicht().ausgeblendet` enthält seine ID,
  `modellHash()` ist unverändert, und `protokoll()` hat keinen Modell-Eintrag

#### Scenario: [auto] Einblenden auf drei Wegen
- **WHEN** der ausgeblendete Steg über das Auge, über das Kontextmenü und über „Alles einblenden“ (Ansichtsleiste
  bzw. Alt+H) je einmal wieder eingeblendet wird
- **THEN** ist er nach jedem Weg wieder gezeichnet und `ansicht().ausgeblendet` leer

### Requirement: Ansicht ist flüchtig
Der Prototyp SHALL drei Schichten trennen: Arbeitsschritte sind Elemente im Graphen (ADR-028, ADR-051), das
Arbeitsergebnis ist abgeleitet und wird nie gespeichert (ADR-032), und die Ansicht (Kamera, Beleuchtung,
Darstellung, Projektion, Auswahl, Aktiv/Isolieren, Ausblenden) ist flüchtig und je Person. Die Ansicht MUST NOT
im Projekt gespeichert werden.

#### Scenario: [auto] Neuladen setzt die Ansicht zurück, der Graph bleibt
- **WHEN** `pruefen neuladen` ohne `zustand=` den Halter öffnet, die Kamera dreht und zoomt, Darstellung auf Kanten
  stellt, die Grundplatte wählt, den Steg ausblendet und die Seite neu lädt
- **THEN** sind Kamera, Darstellung, Auswahl und Ausgeblendetes nach dem Neuladen auf den Vorgaben, und Zahl und
  Inhalt der Elemente in `modell()` sind byte-gleich mit dem Stand vor dem Neuladen (gleicher `modellHash()`)

#### Scenario: [auto] Ansichtsänderung ändert den Graphen nicht
- **WHEN** nacheinander gedreht, gezoomt, die Darstellung gewechselt, die Projektion umgeschaltet, gewählt,
  isoliert, ausgeblendet und eingeblendet wird
- **THEN** sind `modellHash()`, die Länge von `protokoll()` und der Verlauf (Rückgängig) nach jedem Schritt
  unverändert, und der gehaltene Graph in `localStorage` ist byte-gleich

### Requirement: Speichern einer Ansicht ist ausdrücklich
Der Befehl „Ansicht speichern“ SHALL ein benanntes Element im Graphen anlegen, das für alle gilt. Auswahl und
Ausgeblendetes MUST nur auf diesem Weg mitgespeichert werden. Eine gespeicherte Ansicht MUST NOT auf Ergebnis
oder Export wirken (ADR-015).

#### Scenario: [auto] Gespeicherte Ansicht überlebt Neuladen
- **WHEN** im Halter mit gedrehter Kamera, gewählter Grundplatte und ausgeblendetem Steg „Ansicht speichern“ mit
  dem Namen „Ansicht: Schnitt A“ ausgeführt, die Seite neu geladen und die Ansicht angewendet wird
- **THEN** gibt es nach dem Neuladen genau ein Element vom Typ `view` mit diesem Namen in `modell()` und in der
  Struktur, das Speichern war genau ein Verlaufseintrag, und nach dem Anwenden stimmen Kamera (± 0,5°, ± 1 %
  Abstand), Auswahl und Ausgeblendetes mit dem gespeicherten Stand überein, während `modellHash()` beim Anwenden
  unverändert bleibt

#### Scenario: [auto] Gespeicherte Ansicht wirkt nicht auf das Ergebnis
- **WHEN** die Ansicht „Ansicht: Schnitt A“ (Steg ausgeblendet) angewendet ist
- **THEN** enthält `teil()` weiter das Volumen mit Steg (49,49 cm³ ± 0,1 %), und der Steg ist in `modell()` nicht
  als verworfen oder ausgeschlossen gekennzeichnet

### Requirement: Rückmeldung und Fehler
Der Prototyp SHALL „rechnet“, „fehlerhaft“ und „pausiert“ als Statusanzeige am Element, Bestätigungen und
Hinweise in der Rückmeldezeile und Befunde im Panel „Befunde“ zeigen – jeweils nur an diesen festen Orten. Ein
fehlerhaftes Element MUST NOT das übrige Modell unbedienbar machen (ADR-050).

#### Scenario: [auto] Feste Orte
- **WHEN** `pruefen rueckmeldung` eine Wertänderung mit `&rechenzeit=500`, einen ungültigen Wert und eine
  Bestätigung (Element dupliziert) auslöst
- **THEN** erscheint „rechnet“ nur an der Struktur-Zeile und im Modell des Elements, „fehlerhaft“ als
  Statusanzeige am Element und als Befund im Panel, die Bestätigung nur in der Rückmeldezeile; es öffnen sich 0
  Dialoge und 0 Elemente außerhalb der Zonen

#### Scenario: [auto] Das Modell zerbricht nie
- **WHEN** im Zustand `befund` Grundplatte und Steg gewählt, geändert und ausgeblendet werden und danach die
  Korrektur des Befunds ausgeführt wird
- **THEN** gelingen alle Änderungen an Grundplatte und Steg, die Konsole enthält 0 nicht abgefangene Fehler, und
  nach der Korrektur ist das Element aktuell und der Befund weg

#### Scenario: [mensch] Aufgabe L
- **WHEN** eine Testperson Aufgabe L löst
- **THEN** findet sie den Fehler und behebt ihn ohne Hilfe in ≤ 3 min (Ja/Nein)

### Requirement: Tastatur und Fokus
Alle Zonen SHALL per Tastatur in fester Reihenfolge erreichbar sein; Esc und Enter MUST nach den Regeln in
design.md wirken; jedes Tastenkürzel MUST aus dem Befehlsregister kommen und neben dem Befehl in Menü und Suche
stehen, darunter Mod+K, Mod+B, Mod+J und Mod+Alt+B.

#### Scenario: [auto] Reihenfolge und Fokus sichtbar
- **WHEN** `pruefen tastatur` im Zustand `halter` wiederholt F6 drückt
- **THEN** erreicht der Fokus die Zonen in der Reihenfolge aus design.md, und jeder fokussierte Bereich hat einen
  sichtbaren Fokusring in `akzent` (Pixel-Abstand ≤ 0,05 ΔE)

#### Scenario: [auto] Esc-Kette
- **WHEN** im Sensorgehäuse mit aktivem Gehäuse, gewähltem Element und offenem Kontextmenü fünfmal Esc gedrückt
  wird
- **THEN** schließt der erste Druck das Kontextmenü, der zweite hebt die Auswahl auf, der dritte verlässt das
  aktive Element, und die weiteren ändern nichts

#### Scenario: [auto] Kürzel aus dem Register
- **WHEN** der Test alle Kürzel aus `befehle()` liest und je einmal auslöst
- **THEN** führt jedes Kürzel seinen Befehl aus (Eintrag im Protokoll bzw. Wirkung in `ansicht()`), jedes steht
  neben dem Befehl in Menü und Suche, es gibt keine Kürzel außerhalb des Registers, und ihre Zahl ist ≤ 15 (genau die 15 aus
  design.md)

### Requirement: Andere Personen nur live
Auswahl und Zeiger anderer Personen (im Prototyp simuliert) SHALL nur live erscheinen und MUST NOT gespeichert
werden (ADR-056).

#### Scenario: [auto] Nichts gespeichert
- **WHEN** `pruefen anwesenheit` den Zustand `andere` lädt, 5 s wartet und danach `?zustand=halter` lädt
- **THEN** zeigt `andere` den Steg im Zustand „von anderen bearbeitet“ und einen Zeiger mit Namen und
  „simuliert“; `localStorage`, `sessionStorage`, IndexedDB und Cookies enthalten 0 Einträge dazu, und `halter`
  zeigt 0 Spuren der anderen Person

### Requirement: Einheiten, Texte und Tokens
Jede angezeigte Zahl SHALL eine Einheit haben (ADR-057). Alle Texte MUST über Übersetzungsschlüssel kommen
(Deutsch und Englisch), Begriffe aus `docs/glossar.md`, keine Git-Begriffe. Farben, Schrift und Abstände MUST nur
aus `docs/design/tokens.json` stammen; der Akzent nur an Auswahl, Überfahren, Fokus, der einen Hauptaktion und
KI.

#### Scenario: [auto] Tokens und keine Literale
- **WHEN** `npm run tokens:check` läuft und der Test alle Quelldateien außerhalb von `src/erzeugt/` durchsucht
- **THEN** ist der Check grün, und es gibt 0 Farbliterale und 0 Schriftangaben außerhalb von `src/erzeugt/`

#### Scenario: [auto] Texte und Einheiten
- **WHEN** `pruefen texte` alle Zustände mit `sprache=de`, `sprache=en` und `sprache=schluessel` lädt
- **THEN** gibt es 0 Texte ohne Schlüssel, 0 fehlende Übersetzungen, 0 Git-Begriffe aus der Liste in ADR-051,
  0 Knöpfe „Speichern“ und 0 angezeigte Zahlen ohne Einheit (außer Zählern wie „2 Elemente“)

#### Scenario: [auto] Akzent nur an erlaubter Stelle
- **WHEN** `pruefen budget` alle Zustände misst
- **THEN** hat kein Element außerhalb von Auswahl, Überfahren, Fokus, der einen Hauptaktion und KI die Farbe
  `akzent`, und es gibt 0 modale Dialoge

### Requirement: Bausteinkatalog
Der Prototyp SHALL einen Bausteinkatalog enthalten, mit einer Seite je Baustein aus design.md, die den
Baustein live in hell und dunkel und in jedem seiner Zustände zeigt (Bild), seine Regel in Alltagssprache,
seinen Bezug (Muster oder Kandidat, ADR) und die genutzten Befehle und Tokens nennt. Der Katalog MUST über die
Suche und über die Adresse `?katalog` erreichbar sein.

#### Scenario: [auto] Jede Seite vollständig
- **WHEN** `pruefen katalog --out <dir> --json` läuft
- **THEN** gibt es mindestens 19 Seiten, je Seite ein PNG hell und dunkel, einen Regeltext mit 2–6 Sätzen aus den
  Übersetzungen, einen Bezug (Muster aus `muster.md` oder `data-muster-kandidat`) und mindestens eine ADR-Nummer

#### Scenario: [auto] Katalog und Prototyp stimmen überein
- **WHEN** der Test die Optik jedes Bausteins auf seiner Katalogseite mit derselben Optik im Testzustand
  vergleicht (z. B. Kontextmenü in `kontextmenue`, Elementzustände in `zustaende`)
- **THEN** nutzen beide dieselben Kanäle und Tokens (0 Abweichungen in `zustaende(id)`)

#### Scenario: [mensch] Katalog als Maßstab
- **WHEN** das Kernteam den Katalog durchblättert
- **THEN** beurteilt es mit Ja/Nein: „Ich verstehe jede Regel ohne Fachwissen“ und „Danach würde ich neue
  Funktionen beurteilen“

### Requirement: Pilotaufgaben und Reaktion
Der Prototyp SHALL die Pilotaufgaben E bis L aus design.md lösbar machen und auf Eingaben in < 100 ms (p95 über mindestens 20 Messungen)
reagieren; der Testleitfaden `docs/spikes/ux-prototyp-2.md` MUST Aufgaben, Ergebnisbogen, Nachbefragung,
Datenschutz und Start mit `npm run preview` enthalten.

#### Scenario: [auto] Abläufe erreichen den Sollzustand
- **WHEN** `pruefen ablauf <e…l>` je Aufgabe den Ablauf mit echten Eingaben spielt
- **THEN** erreicht jede der 8 Aufgaben den Sollzustand aus design.md (Aufgabe G: Volumen 57,49 cm³ ± 0,1 %)

#### Scenario: [auto] Reaktion unter 100 ms
- **WHEN** `pruefen messen` je Kennzahl aus design.md (Auswahl, Überfahren, Kontextmenü, Ablegen, Wert live,
  Suche) mindestens 20 Eingaben misst und der Test aus den Rohwerten das 95. Perzentil berechnet
- **THEN** liegt das p95 jeder Kennzahl unter 100 ms

#### Scenario: [auto] Leitfaden vollständig
- **WHEN** der Test `docs/spikes/ux-prototyp-2.md` liest
- **THEN** enthält er die Aufgaben E bis L mit Text, Start, Sollzustand und Zeit, einen Ergebnisbogen für TP1 bis
  TP5, die drei Fragen der Nachbefragung und einen Abschnitt Datenschutz, und kein Aufgabentext nennt den Titel
  des Befehls, den der Ablauf braucht

#### Scenario: [mensch] Pilotlauf des Kernteams vor dem Merge
- **WHEN** das Kernteam als TP1 die Aufgaben E bis L löst
- **THEN** entscheidet es Go oder No-Go für den Pilot mit Testpersonen; für G1 gilt das Gate aus
  design.md (4 von 5 Testpersonen lösen G, I, J und K)

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
