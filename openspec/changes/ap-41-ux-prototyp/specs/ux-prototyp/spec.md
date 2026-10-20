## ADDED Requirements

### Requirement: Eigenständiger Prototyp ohne Server und Netz
Der Prototyp SHALL als eigenes npm-Projekt unter `spikes/ux-prototyp/` mit Vite und TypeScript strict zu einer
statischen Seite bauen, ohne Server, ohne Rust-Kern und ohne Synchronisation. Er MUST NOT zur Laufzeit Anfragen
an andere Hosts als die lokale Vorschau stellen und MUST NOT einen KI-Anbieter oder ein KI-Modell einbinden.
Laufzeit-Abhängigkeiten sind nur `three`, `lucide`, `@fontsource-variable/inter` und
`@fontsource/jetbrains-mono`; alle Lizenzen sind nach ADR-034 erlaubt.

#### Scenario: [auto] Bauen, Lint und Unit-Tests
- **WHEN** `bash spikes/ux-prototyp/build.sh` läuft und danach in `spikes/ux-prototyp/` `npm run lint` und
  `npm test`
- **THEN** enden alle drei mit Exit-Code 0, `dist/index.html` existiert, und die Unit-Tests enthalten
  mindestens 10 Fälle für das Wertfeld (darunter „8 cm“ → 80 mm, „60 + 20“ → 80 mm, „0,08 m“ → 80 mm,
  „5 kg“ → Befund)

#### Scenario: [auto] Keine Anfrage an fremde Hosts
- **WHEN** das Prüfwerkzeug alle Testzustände und alle Abläufe A bis F durchläuft
  (`npm run --silent pruefen -- anfragen --json`)
- **THEN** ist die Liste der Anfragen an andere Hosts als die lokale Vorschau leer (0 Einträge)

#### Scenario: [auto] Abhängigkeiten und Lizenzen
- **WHEN** der Test `spikes/ux-prototyp/package.json` und die installierten npm-Pakete prüft
- **THEN** enthält `dependencies` nur Pakete aus der Liste oben, und 0 installierte Pakete haben eine Lizenz
  aus GPL, AGPL oder LGPL

### Requirement: Testzustände per Adresse
Der Prototyp SHALL jeden der 13 Testzustände aus design.md (`leer`, `skizze`, `extrusion`, `platte`,
`verrundung`, `befund`, `teile`, `verbindung`, `suche`, `entwuerfe`, `vergleich`, `ki-arbeitet`,
`ki-vorschlag`) allein aus der Adresse `?zustand=<name>&thema=<hell|dunkel>` herstellen, ohne Klick und ohne
Tastendruck, und danach `document.documentElement.dataset.bereit` auf `"1"` setzen.

#### Scenario: [auto] Screenshots ohne Klicken
- **WHEN** `npm run --silent pruefen -- zustaende --out <dir> --json` läuft
- **THEN** entstehen 26 PNG-Dateien (13 Zustände × 2 Themen) mit je 1440 × 900 px, jede mit `bereit_ms`
  ≤ 3.000 und 0 Eingaben, und keine zwei Dateien haben denselben Pixel-Hash

#### Scenario: [auto] Unbekannter Zustand
- **WHEN** die Adresse `?zustand=gibt-es-nicht` geladen wird
- **THEN** ist der Prototyp nach ≤ 3.000 ms bereit, zeigt den Leeren Zustand und genau einen Befund
  „Zustand unbekannt“, und die Konsole enthält 0 nicht abgefangene Fehler

### Requirement: Nur Tokens und Muster aus dem Katalog
Der Prototyp SHALL Farben, Schriften, Abstände, Radien und Bewegungen ausschließlich aus Variablen beziehen, die
`scripts/tokens.mjs` aus `docs/design/tokens.json` erzeugt (hell und dunkel). Jeder Baustein SHALL genau einem
Muster aus `docs/design/muster.md` entsprechen und dessen Namen in `data-muster` tragen. Schriften MUST lokal
ausgeliefert werden (Inter für die Oberfläche, JetBrains Mono für Befehlszeilen).

#### Scenario: [auto] Erzeugte Tokens sind aktuell
- **WHEN** `npm run tokens:check` in `spikes/ux-prototyp/` läuft
- **THEN** endet es mit Exit-Code 0, und die neu erzeugten Dateien unterscheiden sich in 0 Zeilen von denen im
  Repository

#### Scenario: [auto] Keine Literale außerhalb der erzeugten Dateien
- **WHEN** der Test alle Dateien unter `spikes/ux-prototyp/src/` außer `src/erzeugt/` durchsucht
- **THEN** findet er 0 Farbliterale (`#` mit 3, 4, 6 oder 8 Hex-Ziffern, `rgb(`, `hsl(`, `oklch(`, `0x` mit 6
  Hex-Ziffern), 0 `font-family`, 0 `font-size` sowie 0 `margin`, `padding` oder `gap` mit einer Zahl ungleich 0

#### Scenario: [auto] Sichtbare Farben stammen aus den Tokens
- **WHEN** das Prüfwerkzeug in allen 13 Zuständen und beiden Themen die berechneten Farben aller sichtbaren
  Elemente außerhalb der 3D-Fläche ausliest (`budget`)
- **THEN** ist jede Farbe ein Farbwert des aktiven Themas aus `tokens.json` oder transparent (0 Abweichungen),
  und die berechnete Schrift von `body` beginnt mit „Inter“

#### Scenario: [mensch] Aus einem Guss
- **WHEN** das Kernteam die 26 Screenshots aus `zustaende` nebeneinander ansieht
- **THEN** wirkt kein Bedienelement fremd oder doppelt gelöst, und hell und dunkel sind gleichwertig lesbar
  (Ja/Nein)

### Requirement: Keine festen Texte und Alltagsbegriffe
Der Prototyp SHALL alle sichtbaren Texte über Übersetzungsschlüssel aus `src/i18n/de.json` und `en.json`
anzeigen; beide Dateien MUST dieselben Schlüssel ohne leere Werte haben. Die Oberfläche SHALL die Begriffe aus
`docs/glossar.md` und die fünf Grundbegriffe des Leitbilds verwenden und MUST NOT Git-Begriffe oder einen
Knopf „Speichern“ zeigen (ADR-051).

#### Scenario: [auto] Keine festen Texte
- **WHEN** das Prüfwerkzeug alle 13 Zustände mit `sprache=schluessel` lädt (`texte`)
- **THEN** ist jeder sichtbare Text ein Übersetzungsschlüssel oder ein Datenwert (Elementname des
  Testprojekts, Zahl mit Einheit, Kürzel); 0 Abweichungen

#### Scenario: [auto] Übersetzungen vollständig
- **WHEN** der Test `de.json` und `en.json` vergleicht
- **THEN** sind die Schlüsselmengen gleich und 0 Werte leer

#### Scenario: [auto] Keine Git-Begriffe
- **WHEN** das Prüfwerkzeug alle 13 Zustände in `sprache=de` und `sprache=en` lädt
- **THEN** enthält der sichtbare Text 0 der Wörter Commit, Branch, Merge, Rebase, Pull Request, Checkout,
  Push, Pull, Fork, Repository (ganze Wörter, ohne Groß- und Kleinschreibung) und 0 Bedienelemente mit dem
  Text „Speichern“ bzw. „Save“

### Requirement: Jede Funktion ist ein Befehl und über die Suche erreichbar
Der Prototyp SHALL ein Befehlsregister als Daten (`src/befehle.json`) mit mindestens den Befehlen aus design.md
führen. Jedes Bedienelement SHALL genau einen Befehl aus dem Register auslösen und ihn in `data-befehl` nennen;
es MUST NOT eine Funktion geben, die nur hinter einem Knopf liegt (ADR-045). Die Suche (Cmd/Strg+K) SHALL
Befehle und Elemente gruppiert anzeigen und neben jedem Befehl sein Kürzel nennen.

#### Scenario: [auto] Register gültig
- **WHEN** der Test `src/befehle.json` liest
- **THEN** hat jeder Befehl eine eindeutige ID nach `^[a-z]+(\.[a-z-]+)+$`, einen Titelschlüssel, der in
  `de.json` und `en.json` existiert, und jede Zahl unter `parameter` eine Dimension und eine Standard-Einheit;
  alle Befehle aus der Tabelle in design.md sind enthalten

#### Scenario: [auto] Kein Bedienelement ohne Befehl
- **WHEN** das Prüfwerkzeug in allen 13 Zuständen alle sichtbaren Elemente mit Rolle `button`, `menuitem`,
  `option`, `tab`, `switch` oder `checkbox` sammelt (`budget`)
- **THEN** trägt jedes ein `data-befehl` mit einer ID aus dem Register (0 Abweichungen)

#### Scenario: [auto] Jeder Befehl über die Suche
- **WHEN** das Prüfwerkzeug für jeden Befehl des Registers die Suche mit Cmd/Strg+K öffnet, den deutschen Titel
  tippt und Enter drückt (`befehle`)
- **THEN** steht der Befehl bei 100 % der Befehle unter den ersten 3 Treffern der Gruppe Befehle, wird
  ausgeführt (Eintrag im Protokoll), und bei jedem Befehl mit Kürzel steht das Kürzel neben dem Treffer

#### Scenario: [auto] Elemente in der Suche
- **WHEN** im Zustand `teile` die Suche geöffnet, „Deckel“ getippt und Enter gedrückt wird
- **THEN** erscheint „Deckel“ in der Gruppe Elemente, und danach ist genau das Element Deckel ausgewählt

### Requirement: Kernablauf A – Skizze mit Maßen und Extrusion
Der Prototyp SHALL ab `?zustand=leer` den Ablauf A aus design.md erlauben: Werkzeug Skizze, Ebene wählen,
Rechteck aufziehen, Maße im Wertfeld tippen, Skizze schließen, Extrudieren mit Vorschau, Ziehgriff und Wertfeld
„Tiefe“, danach Letzte Aktion nachjustieren.

#### Scenario: [auto] Grundplatte entsteht
- **WHEN** das Prüfwerkzeug Ablauf A nur mit Klicks und Tasten durchspielt (Länge 80 mm, Breite 50 mm,
  Tiefe 5 mm; `ablauf a`)
- **THEN** enthält `modell()` in Teil 1 eine Skizze mit Rechteck 80 mm × 50 mm auf XY und eine Extrusion mit
  Tiefe 5 mm, und Letzte Aktion nachjustieren zeigt „5 mm“

#### Scenario: [auto] Rückgängig
- **WHEN** nach Ablauf A einmal Cmd/Strg+Z gedrückt wird und danach einmal Cmd/Strg+Umschalt+Z
- **THEN** fehlt nach dem Zurücknehmen die Extrusion, die Skizze ist noch da, und nach dem Wiederholen ist
  `modell()` gleich dem Stand nach Ablauf A

#### Scenario: [mensch] Testpersonen lösen Aufgabe A
- **WHEN** eine Testperson Aufgabe A aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** erreicht sie den Sollzustand in höchstens 5 min ohne Hilfe (Ja/Nein je Testperson, im
  Ergebnisbogen)

### Requirement: Kernablauf B – Formelement ändern und verrunden
Der Prototyp SHALL ab `?zustand=platte` den Ablauf B aus design.md erlauben: Tiefe der Extrusion im
Eigenschaften-Panel ändern, Kanten auswählen und verrunden. Ein Radius über 24 mm SHALL die Verrundung als
fehlerhaft markieren und einen Befund mit Korrektur zeigen; alle anderen Elemente MUST bedienbar bleiben
(ADR-050).

#### Scenario: [auto] Dicker und gerundet
- **WHEN** das Prüfwerkzeug Ablauf B durchspielt (Tiefe 8 mm, vier senkrechte Kanten, Radius 3 mm; `ablauf b`)
- **THEN** hat die Extrusion in `modell()` die Tiefe 8 mm, und eine Verrundung mit Radius 3 mm verweist auf
  genau 4 Kanten

#### Scenario: [auto] Befund statt Abbruch
- **WHEN** im Zustand `verrundung` der Radius auf 30 mm gesetzt wird
- **THEN** zeigt die Verrundung in Featurebaum und 3D die Statusanzeige „fehlerhaft“ mit Farbe, Symbol und
  Wort, ein Befund bietet „Radius auf 24 mm setzen“ an, die Extrusion lässt sich danach noch auswählen und auf
  9 mm setzen, und nach Klick auf die Korrektur ist der Radius 24 mm und der Befund weg

#### Scenario: [mensch] Testpersonen lösen Aufgabe B
- **WHEN** eine Testperson Aufgabe B aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** erreicht sie den Sollzustand in höchstens 4 min ohne Hilfe (Ja/Nein je Testperson)

### Requirement: Kernablauf C – zwei Teile zur Baugruppe verbinden
Der Prototyp SHALL ab `?zustand=teile` den Ablauf C aus design.md erlauben: Gehäuse und Deckel zur Baugruppe
zusammenfassen, Verbinden wählen, je einen Verbindungspunkt anklicken und die Art im Auswahlfeld wählen; die
Verbindung wirkt sofort.

#### Scenario: [auto] Deckel sitzt auf dem Gehäuse
- **WHEN** das Prüfwerkzeug Ablauf C durchspielt (Art Fest; `ablauf c`)
- **THEN** enthält `modell()` eine Baugruppe mit zwei Instanzen (Gehäuse, Deckel) und eine Verbindung mit Art
  „Fest“ zwischen den Verbindungspunkten „Unterseite“ und „Oberkante“, und die Unterseite des Deckels liegt auf
  30 mm Höhe (± 0,01 mm)

#### Scenario: [mensch] Testpersonen lösen Aufgabe C
- **WHEN** eine Testperson Aufgabe C aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** erreicht sie den Sollzustand in höchstens 5 min ohne Hilfe (Ja/Nein je Testperson)

### Requirement: Entwürfe in Alltagsbegriffen
Der Prototyp SHALL Entwürfe nach ADR-051 zeigen: Entwurf anlegen, darin ändern, ohne den Hauptstand zu ändern,
vergleichen, übernehmen oder mit Begründung verwerfen. Verwerfen MUST NOT löschen; die Ansicht „Ergebnis“ ist
Standard, „Alle Entwürfe“ zeigt auch verworfene Entwürfe mit Begründung.

#### Scenario: [auto] Entwurf übernehmen
- **WHEN** das Prüfwerkzeug Ablauf D durchspielt (Entwurf „Dickere Platte“, Tiefe 10 mm, Vergleichen,
  Übernehmen; `ablauf d`)
- **THEN** zeigt der Vergleich die Tiefe 5 mm → 10 mm, vor dem Übernehmen hat der Hauptstand die Tiefe 5 mm,
  danach 10 mm, und der Entwurf hat den Zustand „Übernommen“

#### Scenario: [auto] Verwerfen braucht eine Begründung und löscht nicht
- **WHEN** ein Entwurf verworfen werden soll, zuerst ohne Begründung, dann mit „zu schwer“
- **THEN** ist „Verwerfen“ ohne Begründung nicht auslösbar, nach dem Verwerfen fehlt der Entwurf in der Ansicht
  „Ergebnis“ und steht in „Alle Entwürfe“ mit der Begründung „zu schwer“; die Zahl der Entwürfe in `modell()`
  ist unverändert

#### Scenario: [mensch] Testpersonen bearbeiten Aufgabe D
- **WHEN** eine Testperson Aufgabe D aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen, ob sie den Sollzustand in höchstens 5 min ohne Hilfe erreicht hat (Ja/Nein;
  berichtet, nicht Teil des Gates)

### Requirement: Simulierter KI-Ablauf
Der Prototyp SHALL den KI-Ablauf des Leitbilds als Simulation ohne Netz und ohne Modell zeigen: Auswählen →
Absicht → Vorschau → Übernehmen oder Verwerfen → Nachjustieren. Die Absicht SHALL über das Werkzeug „Fragen“,
über „KI fragen“ im Eigenschaften-Panel und über einen Satz in der Suche geäußert werden können; es MUST NOT ein
eigenes Chat-Fenster geben.

#### Scenario: [auto] Drei Wege, dieselbe Absicht
- **WHEN** im Zustand `platte` mit ausgewählter Platte und `tempo=0` der Satz „Mach daraus ein Kästchen mit
  2 mm Wand“ einmal über „Fragen“, einmal über „KI fragen“ und einmal über die Suche eingegeben wird
- **THEN** entsteht in allen drei Fällen eine Entscheidungskarte mit derselben Befehlszeile `feature.schale`
  mit Wandstärke 2 mm, und das Modell ist vor dem Übernehmen unverändert

#### Scenario: [auto] Unbekannter Satz und keine Auswahl
- **WHEN** ohne Auswahl ein Satz eingegeben wird bzw. mit Auswahl der Satz „Wie wird das Wetter?“
- **THEN** erscheint jeweils eine Erklärung mit den drei Beispielsätzen und 0 modale Dialoge, und das Modell
  bleibt unverändert

#### Scenario: [auto] Kein Chat-Fenster
- **WHEN** das Prüfwerkzeug in den Zuständen `ki-arbeitet` und `ki-vorschlag` die Panels zählt (`budget`)
- **THEN** sind genau 2 Panels sichtbar, und die Entscheidungskarte trägt `data-muster="Entscheidungskarte"`
  und `data-quelle="ki"`

### Requirement: KI-Vorschläge als Entscheidungskarte
Vorschläge der simulierten KI MUST als nicht modale Entscheidungskarte erscheinen, mit Geister-Vorschau,
Begründung, Werten vorher/nachher, den genutzten Befehlen als Textzeilen und genau den zwei Hauptaktionen
Übernehmen und Verwerfen (ADR-021, ADR-061). Sie MUST nur Befehle aus dem Register nutzen, die auch über die
Suche erreichbar sind.

#### Scenario: [auto] Drei vorbereitete Absichten
- **WHEN** nacheinander die Sätze „Mach daraus ein Kästchen mit 2 mm Wand“, „Runde die Kanten mit 1 mm ab“ und
  „Mach die Platte 20 mm länger“ eingegeben werden (je mit Verwerfen dazwischen)
- **THEN** zeigen die Karten der Reihe nach `feature.schale` (2 mm), `feature.verrunden` (1 mm) und
  `element.wert-setzen` (Länge 80 mm → 100 mm), jede ID steht im Register, und jede Karte hat genau zwei
  Hauptaktionen

#### Scenario: [auto] Übernehmen, Nachjustieren, Rückgängig
- **WHEN** das Prüfwerkzeug Ablauf F durchspielt (Vorschlag Schale 2 mm übernehmen, danach in Letzte Aktion
  nachjustieren 3 mm tippen; `ablauf f`)
- **THEN** enthält `modell()` eine Schale mit Wandstärke 3 mm, das Protokoll enthält `feature.schale` mit
  `quelle: ki`, und höchstens zweimal Cmd/Strg+Z stellt den Stand vor dem Vorschlag wieder her

#### Scenario: [auto] Verwerfen und Anhalten ändern nichts
- **WHEN** ein Vorschlag verworfen wird bzw. die KI ohne `tempo=0` während „Arbeitet“ angehalten wird
- **THEN** ist `modell()` in beiden Fällen gleich dem Stand davor, und nach dem Anhalten erscheint keine Karte

#### Scenario: [mensch] Testpersonen bearbeiten Aufgabe F
- **WHEN** eine Testperson Aufgabe F aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen, ob sie den Sollzustand in höchstens 4 min ohne Hilfe erreicht hat und ob sie
  den Vorschlag übernommen hat (Ja/Nein; berichtet, nicht Teil des Gates)

### Requirement: Komplexitätsbudget und Reaktion
Der Prototyp SHALL das Komplexitätsbudget des Leitbilds in jedem Testzustand einhalten: genau 5 Werkzeuge,
höchstens 5 Arbeitsbereiche, genau 2 Panels, weniger als 15 Kürzel, höchstens 20 Muster und nur solche aus dem
Katalog, 0 modale Dialoge, 1 Akzent (nur an Auswahl, Fokus, der einen Hauptaktion und KI-Vorschlägen). Auswahl,
Werkzeugwechsel und Suche SHALL in weniger als 100 ms reagieren.

#### Scenario: [auto] Budget in allen Zuständen
- **WHEN** `npm run --silent pruefen -- budget --json` alle 13 Zustände in beiden Themen zählt
- **THEN** gilt in jedem Zustand: Werkzeuge = 5 (Auswählen, Messen, Schnitt, Skizze, Fragen), Arbeitsbereiche
  ≤ 5, Panels = 2, Hauptaktionen ≤ 1, modale Dialoge = 0, Akzentfarbe an unzulässiger Stelle = 0; über alle
  Zustände ist die Menge der Muster eine Teilmenge der Musternamen aus `docs/design/muster.md` mit höchstens 20
  Einträgen, und die Zahl der Kürzel ist kleiner als 15

#### Scenario: [auto] Keine Dialoge im Quelltext
- **WHEN** der Test `spikes/ux-prototyp/src/` durchsucht
- **THEN** findet er 0 Vorkommen von `alert(`, `confirm(`, `prompt(` und `showModal(`

#### Scenario: [auto] Reaktion unter 100 ms
- **WHEN** `npm run --silent pruefen -- messen --json` dreimal läuft
- **THEN** ist der Median von `auswahl_p95_ms`, `werkzeug_p95_ms` und `suche_p95_ms` jeweils kleiner als 100

### Requirement: Testleitfaden und Abnahme mit Testpersonen
Der Change SHALL einen Testleitfaden mit Ergebnisvorlage in `docs/spikes/ux-prototyp.md` liefern, mit den
Aufgaben A bis F aus design.md in Alltagssprache, je mit Startadresse, Sollzustand und Zeitlimit, dem
Erfolgskriterium, einem pseudonymen Ergebnisbogen ohne personenbezogene Daten (ADR-056), Nachbefragung und
Auswertung. Die Abnahme ap-41 gilt als bestanden, wenn mindestens 4 von 5 Testpersonen die Kernabläufe A, B und
C ohne Einweisung lösen.

#### Scenario: [auto] Leitfaden vollständig
- **WHEN** der Test `docs/spikes/ux-prototyp.md` liest
- **THEN** enthält er die Abschnitte Ziel, Rahmen, Ablauf, Aufgaben, Erfolgskriterium, Ergebnisbogen,
  Nachbefragung, Auswertung und Datenschutz, für jede der Aufgaben A bis F Text, Startadresse (einer der 13
  Zustände), Sollzustand und Zeitlimit in Minuten, und eine Ergebnistabelle für TP1 bis TP5 ohne Spalten für
  Name oder Alter

#### Scenario: [auto] Aufgaben ohne Befehlsnamen
- **WHEN** der Test die Aufgabentexte A bis F mit den deutschen Titeln der Befehle vergleicht, die der jeweilige
  Ablauf im Protokoll von `pruefen ablauf <x>` nutzt
- **THEN** enthält kein Aufgabentext einen dieser Titel (ohne Groß- und Kleinschreibung), und `ablauf e` zeigt,
  dass die Suche nach „zurück“ den Befehl Rückgängig mit seinem Kürzel unter den ersten 3 Treffern liefert

#### Scenario: [mensch] Pilotlauf des Kernteams
- **WHEN** das Kernteam als Testperson 1 die Aufgaben A bis F nach dem Leitfaden bearbeitet
- **THEN** sind A, B und C je innerhalb des Zeitlimits ohne Hilfe gelöst, und der Ergebnisbogen ist ausgefüllt
  und als Pilotlauf gekennzeichnet (Ja/Nein)

#### Scenario: [mensch] Abnahme 4 von 5
- **WHEN** fünf Testpersonen (TP1 bis TP5) die Aufgaben nach dem Leitfaden bearbeitet haben
- **THEN** haben mindestens 4 von 5 die Aufgaben A, B und C je innerhalb des Zeitlimits ohne Hilfe gelöst, und
  `docs/spikes/ux-prototyp.md` enthält die Ergebnisse, die Werte je Aufgabe und die Empfehlung Go oder No-Go für
  G1 (Ja/Nein)
