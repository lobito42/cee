## ADDED Requirements

### Requirement: Eigenständiger Prototyp ohne Server und Netz
Der Prototyp SHALL als eigenes npm-Projekt unter `spikes/ux-prototyp-2/` (Vite, TypeScript strict) zu einer
statischen Seite ohne Server bauen. Er MUST NOT Anfragen an fremde Hosts stellen oder ein KI-Modell einbinden;
Laufzeit-Abhängigkeiten nur nach design.md, Lizenzen nach ADR-034. `spikes/ux-prototyp/` (ap-41) MUST
unverändert bleiben.

#### Scenario: [auto] Bauen, Lint und Unit-Tests
- **WHEN** `bash spikes/ux-prototyp-2/build.sh` läuft und danach in `spikes/ux-prototyp-2/` `npm run lint` und
  `npm test`
- **THEN** enden alle drei mit Exit-Code 0, `dist/index.html` existiert, und die Unit-Tests enthalten
  mindestens 10 Fälle für das Wertfeld (darunter „8 cm“ → 80 mm, „0,1 kN“ → 100 N, „5 kg“ in einem Längenfeld →
  Befund) und mindestens 3 Fälle für das Volumen des Halters (die drei Stände aus design.md, je ± 0,1 %)

#### Scenario: [auto] Keine Anfrage an fremde Hosts
- **WHEN** `npm run --silent pruefen -- anfragen --json` alle Testzustände und alle Abläufe A bis H durchläuft
- **THEN** ist die Liste der Anfragen an andere Hosts als die lokale Vorschau leer (0 Einträge)

#### Scenario: [auto] Abhängigkeiten und Lizenzen
- **WHEN** der Test `spikes/ux-prototyp-2/package.json` und die installierten npm-Pakete prüft
- **THEN** enthält `dependencies` nur die vier Pakete oben, und 0 installierte Pakete haben eine Lizenz aus
  GPL, AGPL oder LGPL

### Requirement: Testzustände per Adresse
Der Prototyp SHALL jeden der 17 Testzustände aus design.md allein aus der Adresse
`?zustand=<name>&thema=<hell|dunkel>` herstellen, ohne Klick und ohne Tastendruck, und danach
`document.documentElement.dataset.bereit` auf `"1"` setzen.

#### Scenario: [auto] Screenshots ohne Klicken
- **WHEN** `npm run --silent pruefen -- zustaende --out <dir> --json` läuft
- **THEN** entstehen 34 PNG-Dateien (17 Zustände × 2 Themen) mit je 1440 × 900 px, jede mit `bereit_ms`
  ≤ 3.000 und 0 Eingaben, und keine zwei Dateien haben denselben Pixel-Hash

#### Scenario: [auto] Unbekannter Zustand
- **WHEN** die Adresse `?zustand=gibt-es-nicht` geladen wird
- **THEN** ist der Prototyp nach ≤ 3.000 ms bereit, zeigt den Leeren Zustand und genau einen Befund
  „Zustand unbekannt“, und die Konsole enthält 0 nicht abgefangene Fehler

### Requirement: Tokens, Muster und Texte
Der Prototyp SHALL Farben, Schriften, Abstände, Radien und Bewegungen ausschließlich aus Variablen beziehen, die
aus `docs/design/tokens.json` erzeugt werden, Bausteine nach `docs/design/muster.md` mit `data-muster`
kennzeichnen (Kandidaten Pfad, Legende, Gespräch mit `data-muster-kandidat`) und alle sichtbaren Texte über
Schlüssel aus `src/i18n/de.json` und `en.json` zeigen. Er MUST NOT Git-Begriffe oder einen Knopf „Speichern“
zeigen (ADR-051).

#### Scenario: [auto] Erzeugte Tokens und keine Literale
- **WHEN** `npm run tokens:check` läuft und der Test alle Dateien unter `spikes/ux-prototyp-2/src/` außer
  `src/erzeugt/` durchsucht
- **THEN** endet `tokens:check` mit Exit-Code 0 und 0 Unterschieden, und der Test findet 0 Farbliterale
  (`#` mit 3, 4, 6 oder 8 Hex-Ziffern, `rgb(`, `hsl(`, `oklch(`, `0x` mit 6 Hex-Ziffern), 0 `font-family`,
  0 `font-size` und 0 `margin`, `padding` oder `gap` mit einer Zahl ungleich 0

#### Scenario: [auto] Sichtbare Farben und Schrift
- **WHEN** `budget` in allen 17 Zuständen und beiden Themen die berechneten Farben aller sichtbaren Elemente
  außerhalb der three.js-Leinwand ausliest
- **THEN** ist jede Farbe ein Farbwert des aktiven Themas aus `tokens.json` oder transparent (0 Abweichungen),
  und die berechnete Schrift von `body` beginnt mit „Inter“

#### Scenario: [auto] Keine festen Texte, vollständige Übersetzungen, keine Git-Begriffe
- **WHEN** `texte` alle 17 Zustände mit `sprache=schluessel`, `de` und `en` lädt und der Test `de.json` mit
  `en.json` vergleicht
- **THEN** ist jeder sichtbare Text in `schluessel` ein Schlüssel oder Datenwert (0 Abweichungen), die
  Schlüsselmengen sind gleich mit 0 leeren Werten, und der sichtbare Text enthält 0 der Wörter Commit, Branch,
  Merge, Rebase, Pull Request, Checkout, Push, Pull, Fork, Repository und 0 Bedienelemente „Speichern“/„Save“

#### Scenario: [mensch] Aus einem Guss
- **WHEN** das Kernteam die 34 Screenshots aus `zustaende` nebeneinander ansieht
- **THEN** wirkt kein Bedienelement fremd oder doppelt gelöst, und hell und dunkel sind gleichwertig lesbar
  (Ja/Nein)

### Requirement: Ein Bildschirm, fünf Zonen
Der Prototyp SHALL in jedem Zustand genau fünf Zonen zeigen: Kopfzeile, Aufbau (links), Modell (Mitte),
Inspektor (rechts) und Rückmeldezeile (unten), mit Lage und Größe nach design.md. Die Kopfzeile SHALL den Pfad,
die Arbeitsbereich-Reiter, genau ein Eingabefeld „Suchen oder fragen“ mit Kürzel und „Rückgängig“ mit sichtbarem
Kürzel enthalten. Es MUST NOT eine Menüleiste, eine Werkzeugleiste oder einen modalen Dialog geben.

#### Scenario: [auto] Zonen in Lage und Größe
- **WHEN** `npm run --silent pruefen -- zonen --json` alle 17 Zustände bei 1440 × 900 px misst
- **THEN** gibt es in jedem Zustand genau je ein sichtbares `data-zone` `kopf`, `aufbau`, `modell`,
  `inspektor`, `rueckmeldung`; Kopfzeile oben über die volle Breite mit Höhe ≤ 56 px, Aufbau links mit Breite
  220–320 px, Inspektor rechts mit Breite 260–360 px, Rückmeldezeile unten mit Höhe ≤ 32 px, Modell
  dazwischen mit ≥ 50 % der Fensterfläche; die Zonen überlappen sich nicht (0 px²)

#### Scenario: [auto] Inhalt der Kopfzeile
- **WHEN** im Zustand `skizze` die Kopfzeile gelesen wird
- **THEN** zeigt der Pfad die Glieder „Halter“, „Grundplatte“, „Skizze“ in dieser Reihenfolge (nach dem Glied
  für den Stand, siehe Entwürfe), es gibt genau 1 Texteingabe in der Kopfzeile mit dem Platzhalter
  „Suchen oder fragen“ und dem angezeigten Kürzel Strg K (auf macOS ⌘K), und der Knopf mit
  `data-befehl="bearbeiten.rueckgaengig"` zeigt sein Kürzel als sichtbaren Text

#### Scenario: [mensch] Erst wählen, dann tun
- **WHEN** eine Testperson nach den Aufgaben gefragt wird „Wo ändert man hier eine Zahl?“ und „Was tut man
  zuerst, bevor man etwas ändert?“
- **THEN** nennt sie den Inspektor (rechts) und das Wählen des Teils oder Schritts (Ja/Nein je Testperson, im
  Ergebnisbogen)

### Requirement: Lesbare 3D-Darstellung
Die Modellzone SHALL das Teil mit gerichtetem Licht und schattierten Flächen, sichtbaren Körperkanten und einer
Auswahlkontur in der Akzentfarbe zeigen und das Einpassen der Ansicht erlauben (design.md, 3D-Darstellung).

#### Scenario: [auto] Licht und Schattierung
- **WHEN** `npm run --silent pruefen -- lesbarkeit --json` den Zustand `halter` in der Startansicht in beiden
  Themen auswertet
- **THEN** meldet `ansicht().lichter` mindestens ein gerichtetes Licht mit einem Anteil von ≥ 60 % der
  Gesamtintensität, und die Helligkeit (OKLCH L, Median 7 × 7 px an der projizierten Flächenmitte) der
  Oberseite, Vorderseite und rechten Seite der Grundplatte unterscheidet sich paarweise um mindestens 0,04

#### Scenario: [auto] Kanten sichtbar
- **WHEN** `lesbarkeit` an den projizierten Mittelpunkten aller sichtbaren äußeren Kanten von Grundplatte und
  Steg misst
- **THEN** liegt bei 100 % dieser Kanten innerhalb von 2 px ein Pixel, dessen Helligkeit (OKLCH L) sich um
  mindestens 0,10 vom Median der angrenzenden Flächen unterscheidet

#### Scenario: [auto] Auswahlkontur im Akzent
- **WHEN** im Zustand `halter` der Steg per Klick gewählt wird
- **THEN** hat entlang der projizierten Umrisslinie des Stegs bei mindestens 90 % der Messpunkte (alle 10 px)
  ein Pixel innerhalb von 3 px die Akzentfarbe des Themas (Abstand in OKLCH ≤ 0,03), und außerhalb der Hüllbox
  des Stegs (plus 4 px) gibt es 0 Pixel in Akzentfarbe in der Leinwand

#### Scenario: [auto] Ansicht einpassen
- **WHEN** die Ansicht gedreht und auf das Dreifache herausgezoomt wird und danach `ansicht.einpassen` über den
  Knopf im Modell ausgeführt wird
- **THEN** füllt die projizierte Hüllbox des Teils 60–90 % der kürzeren Seite der Modellzone, und ihre Mitte
  liegt höchstens 5 % der Zonengröße von der Zonenmitte entfernt

#### Scenario: [mensch] Auf einen Blick lesbar
- **WHEN** das Kernteam im Pilotlauf den Zustand `halter` öffnet und das Teil mit der Maus dreht
- **THEN** sind Grundplatte, Steg und beide Bohrungen ohne Erklärung erkennbar, und das Drehen wirkt flüssig
  (Ja/Nein)

### Requirement: Eingabe und Navigation
Der Prototyp SHALL Drehen, Schieben und Zoomen mit der Maus nach dem Navigationsprofil „Standard“ (design.md)
erlauben; das Profil MUST als Einstellung hinterlegt sein. Eingaben der Ansichtsquelle mit sechs Achsen (später
3D-Maus) MUST nur die Kamera bewegen, auch während eines Griff-Ziehens, und MUST NOT Auswahl, Ort oder Werte
ändern. Navigation MUST NOT das Modell oder die Auswahl ändern.

#### Scenario: [auto] Drehen, Schieben, Zoomen
- **WHEN** `npm run --silent pruefen -- navigation --json` im Zustand `schritt` mit der rechten Taste 200 px
  waagrecht zieht, mit der mittleren Taste 100 px zieht und das Rad 5 Rasten dreht
- **THEN** ändert sich der Azimut der Kamera um mindestens 30°, das Ziel der Kamera verschiebt sich, der
  Abstand ändert sich um mindestens 20 %, und `modell()` und `auswahl()` sind danach gleich wie vorher

#### Scenario: [auto] Rechtsklick ohne Bewegung
- **WHEN** im Zustand `schritt` mit der rechten Taste auf die Grundplatte geklickt wird (Bewegung < 4 px)
- **THEN** ändert sich die Kamera nicht, und die Kontextaktionen erscheinen

#### Scenario: [auto] Ansichtseingabe auch während des Ziehens
- **WHEN** im Zustand `schritt` der Griff „Dicke“ gezogen wird und währenddessen über
  `window.__ceeEingabe.ansicht({ry: 20})` eine Drehung eingespeist wird, danach losgelassen
- **THEN** ändert sich der Azimut der Kamera um mindestens 10°, der Ziehvorgang läuft weiter (die Zahl am Zeiger
  bleibt sichtbar bis zum Loslassen), und der übernommene Wert für Dicke hängt nur von der Mausbewegung ab
  (gleicher Wert wie ein Lauf ohne Einspeisung, ± 0 mm)

### Requirement: Synchrone Auswahl
Ein Klick auf eine Fläche SHALL den Schritt wählen, der sie erzeugt hat, und ihn im Aufbau markieren; ein Klick
auf eine Aufbauzeile SHALL dieselbe Auswahl im Modell zeigen. Überfahren SHALL in beide Richtungen hervorheben.
Keine Funktion MUST vom Überfahren abhängen.

#### Scenario: [auto] Fläche wählt Schritt
- **WHEN** `npm run --silent pruefen -- auswahl --json` im Zustand `halter` nacheinander auf die Oberseite der
  Grundplatte, die Vorderseite des Stegs und die Wand einer Bohrung klickt
- **THEN** ist jeweils genau der Schritt Grundplatte, Steg bzw. Bohrungen gewählt, seine Aufbauzeile hat
  `aria-selected="true"`, alle anderen Zeilen nicht, und der Inspektor zeigt diesen Schritt

#### Scenario: [auto] Aufbau wählt im Modell
- **WHEN** im Zustand `halter` die Aufbauzeile „Steg“ angeklickt wird
- **THEN** ist `auswahl()` gleich dem Ergebnis eines Klicks auf eine Fläche des Stegs, und die Akzentkontur
  liegt am Steg (Messung wie „Auswahlkontur im Akzent“)

#### Scenario: [auto] Überfahren in beide Richtungen
- **WHEN** der Zeiger über die Aufbauzeile „Bohrungen“ und danach über eine Fläche der Grundplatte bewegt wird
- **THEN** ist im ersten Fall die Geometrie der Bohrungen im Modell hervorgehoben (`ansicht()` meldet sie als
  hervorgehoben, sichtbare dünne Kontur), im zweiten Fall trägt die Aufbauzeile „Grundplatte“
  `data-hervorgehoben`, und in beiden Fällen ändert sich `auswahl()` nicht

#### Scenario: [auto] Nichts nur beim Überfahren
- **WHEN** der Test alle Stylesheets des Builds und `auswahl` alle Bedienelemente in allen Zuständen prüft
- **THEN** gibt es 0 Regeln, die unter `:hover` `display`, `visibility`, `opacity` oder `pointer-events` eines
  Bedienelements ändern, und 0 Bedienelemente, die erst nach Überfahren sichtbar werden

#### Scenario: [mensch] Baum und Modell gehören zusammen
- **WHEN** eine Testperson im Pilotlauf auf eine Fläche klickt und eine Aufbauzeile überfährt
- **THEN** erkennt sie ohne Erklärung, welche Zeile zu welcher Geometrie gehört (Ja/Nein)

### Requirement: Inspektor
Der Inspektor SHALL immer das Gewählte zeigen, ohne Auswahl das ganze Teil mit Material, Abmessungen,
berechnetem Volumen und berechneter Masse. Für einen Schritt SHALL er die Gruppen „Maße“ und „Aus der Skizze“
und den Knopf „Skizze bearbeiten“ zeigen. Werte stehen dauerhaft nur hier, als Wertfelder: Änderung wirkt live
beim Tippen, Enter übernimmt, Esc bricht ab.

#### Scenario: [auto] Teil ohne Auswahl
- **WHEN** der Zustand `halter` geladen wird
- **THEN** zeigt der Inspektor Material „PLA“, Abmessungen 80 × 50 × 38 mm, Volumen 49,49 cm³ und Masse
  61,36 g (je ± 0,1 % gegen die Formel in design.md), und Volumen und Masse sind nicht editierbar

#### Scenario: [auto] Schritt mit Gruppen
- **WHEN** im Zustand `halter` die Grundplatte gewählt wird
- **THEN** zeigt der Inspektor die Gruppe „Maße“ mit Wertfeld Dicke 8 mm, die Gruppe „Aus der Skizze“ mit
  Länge 80 mm, Breite 50 mm und Eckradius 3 mm und genau einen Knopf mit
  `data-befehl="ort.skizze-bearbeiten"`

#### Scenario: [auto] Live, Enter, Esc
- **WHEN** im Zustand `schritt` im Wertfeld Dicke „12“ getippt wird (ohne Enter), danach Esc; danach erneut
  „12“ und Enter
- **THEN** zeigt das Modell nach dem Tippen ohne Enter eine Grundplatte von 12 mm Höhe und der Inspektor des
  Teils das neu berechnete Volumen, nach Esc wieder 8 mm und das alte Volumen ohne neuen Eintrag im Protokoll,
  nach Enter 12 mm mit genau einem Eintrag `element.wert-setzen` im Protokoll; einmal Strg/Cmd+Z stellt 8 mm her

#### Scenario: [auto] Zahlen nur im Inspektor
- **WHEN** in den Zuständen `halter` und `schritt` alle sichtbaren Texte der Modellzone gelesen werden
- **THEN** enthält die Modellzone 0 Zahlen mit Längeneinheit (Zahl am Zeiger beim Ziehen und Skizzenmaße
  ausgenommen, siehe dort)

### Requirement: Griffe am Modell mit Tippen beim Ziehen
Am gewählten Schritt SHALL das Modell Pfeil-Griffe für seine Längen-Parameter zeigen. Beim Ziehen SHALL die Zahl
am Zeiger erscheinen; Ziffern während des Ziehens setzen den genauen Wert (ADR-044), Esc bricht ab.

#### Scenario: [auto] Ziehen mit Zahl am Zeiger
- **WHEN** im Zustand `schritt` der Griff „Dicke“ um eine Strecke gezogen wird, die 4 mm entspricht, und
  losgelassen
- **THEN** ist während des Ziehens eine Zahl mit „mm“ höchstens 40 px vom Zeiger entfernt sichtbar, nach dem
  Loslassen ist Dicke 12 mm (± 1 mm, Schritt 1 mm), und die Zahl am Zeiger ist ≤ 1.000 ms nach dem Loslassen
  verschwunden

#### Scenario: [auto] Tippen beim Ziehen
- **WHEN** während des Ziehens am Griff „Dicke“ „15“ getippt und Enter gedrückt wird; in einem zweiten Lauf
  während des Ziehens Esc
- **THEN** ist im ersten Lauf Dicke 15 mm (genau), im zweiten 8 mm, und im zweiten Lauf gibt es 0 neue Einträge
  im Protokoll

#### Scenario: [auto] Griffe nur am Gewählten
- **WHEN** die Zustände `halter` und `schritt` verglichen werden
- **THEN** zeigt `halter` 0 Griffe und `schritt` mindestens 1 Griff, und alle Griffe gehören zum gewählten
  Schritt

### Requirement: Orte Teil und Skizze
Doppelklick auf eine Fläche oder eine Aufbauzeile, der Knopf „Skizze bearbeiten“ und die Kontextaktion SHALL in
die Skizze des Schritts führen; der Pfad SHALL zeigen, wo man ist. „Fertig“, Esc und ein Klick im Pfad SHALL
hinausführen. In der Skizze SHALL spätere Schritte im Aufbau ausgegraut und ihre Geometrie gestrichelt sein; Maße
sind Teil der Zeichnung, und ein Klick auf ein Maß SHALL das passende Wertfeld im Inspektor fokussieren.

#### Scenario: [auto] Hinein auf drei Wegen
- **WHEN** im Zustand `halter` einmal die Oberseite der Grundplatte doppelt angeklickt wird, einmal die
  Aufbauzeile „Grundplatte“ doppelt angeklickt wird und einmal „Skizze bearbeiten“ im Inspektor gewählt wird
  (je von `halter` aus)
- **THEN** ist in allen drei Fällen nach ≤ 400 ms `ansicht().ort` die Skizze der Grundplatte, und der Pfad
  endet mit „Halter › Grundplatte › Skizze“

#### Scenario: [auto] Spätere Schritte ausgegraut und gestrichelt
- **WHEN** der Zustand `skizze` geladen wird
- **THEN** tragen die Aufbauzeilen „Steg“ und „Bohrungen“ `aria-disabled="true"`, „Grundplatte“ nicht, und
  `ansicht()` meldet die Geometrie von Steg und Bohrungen als gestrichelt und ohne Flächen

#### Scenario: [auto] Maß fokussiert das Feld
- **WHEN** im Zustand `skizze` auf das Maß „80“ in der Zeichnung geklickt wird
- **THEN** hat das Wertfeld „Länge“ in der Gruppe „Aus der Skizze“ den Fokus und sein Inhalt ist markiert

#### Scenario: [auto] Hinaus auf drei Wegen und Aufgabe G
- **WHEN** `npm run --silent pruefen -- ablauf g --json` die Skizze der Grundplatte öffnet, auf das Maß 80
  klickt, „100“ und Enter tippt und mit „Fertig“ hinausgeht; dazu je ein Lauf mit Esc und mit Klick auf
  „Halter“ im Pfad statt „Fertig“
- **THEN** ist in allen drei Läufen danach `ansicht().ort` das Teil, der Pfad endet mit „Halter“, die Länge der
  Grundplatte 100 mm, die Abmessungen 100 × 50 × 38 mm und das Volumen 57,49 cm³ (± 0,1 %)

#### Scenario: [mensch] Aufgabe G
- **WHEN** eine Testperson Aufgabe G aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen, ob sie den Sollzustand in höchstens 3 min ohne Hilfe erreicht hat (Ja/Nein)

### Requirement: Darstellung umschalten
Die Darstellungen Körper, Kanten und Durchsicht SHALL über einen Umschalter unten rechts in der Modellzone und
über die Taste W wählbar sein; die Darstellung ändert weder Modell noch Auswahl.

#### Scenario: [auto] Umschalter und Taste W
- **WHEN** im Zustand `halter` dreimal W gedrückt wird und danach im Umschalter „Durchsicht“ gewählt wird
- **THEN** ist `ansicht().darstellung` der Reihe nach `kanten`, `durchsicht`, `koerper`, `durchsicht`; der
  Umschalter liegt im unteren rechten Viertel der Modellzone; `modell()` und `auswahl()` sind unverändert

#### Scenario: [auto] Aufgabe H
- **WHEN** `npm run --silent pruefen -- ablauf h --json` im Zustand `halter` die Darstellung über den Umschalter
  auf Kanten stellt
- **THEN** ist `ansicht().darstellung` gleich `kanten`, und innerhalb der projizierten Hüllbox des Teils weichen
  höchstens 15 % der Pixel von der Hintergrundfarbe `viewport` ab (Abstand in OKLCH > 0,03), im Zustand `halter`
  in Darstellung Körper dagegen mindestens 50 %

#### Scenario: [mensch] Aufgabe H
- **WHEN** eine Testperson Aufgabe H ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen, ob sie den Sollzustand in höchstens 1 min ohne Hilfe erreicht hat (Ja/Nein)

### Requirement: Kontextaktionen über dem Gewählten
Für eine Auswahl SHALL eine Leiste mit Kontextaktionen über dem Gewählten erscheinen (Muster Kontextaktionen);
ein Rechtsklick auf das Gewählte im Modell oder im Aufbau SHALL dieselben Befehle in derselben Reihenfolge
zeigen. „Verwerfen“ MUST NOT löschen (ADR-051).

#### Scenario: [auto] Lage und Inhalt
- **WHEN** im Zustand `halter` die Grundplatte gewählt wird
- **THEN** erscheint eine Leiste mit höchstens 5 Einträgen, darunter `ort.skizze-bearbeiten`,
  `schritt.ausblenden` und `schritt.verwerfen`; ihre Unterkante liegt höchstens 24 px über der oberen Kante der
  projizierten Hüllbox der Grundplatte und ganz in der Modellzone

#### Scenario: [auto] Rechtsklick zeigt dasselbe
- **WHEN** nacheinander rechts auf die Grundplatte im Modell und auf die Aufbauzeile „Grundplatte“ geklickt wird
- **THEN** ist die Liste der `data-befehl` in beiden Fällen gleich der Liste der Leiste (gleiche Befehle, gleiche
  Reihenfolge)

#### Scenario: [auto] Verwerfen löscht nicht
- **WHEN** der Steg über die Kontextaktion verworfen wird
- **THEN** ist der Steg im Modell nicht mehr sichtbar, steht in `modell()` weiter mit Kennzeichen „verworfen“,
  das Volumen sinkt um 18.000 mm³ (± 0,1 %), und einmal Strg/Cmd+Z stellt den Stand davor her

### Requirement: Jede Funktion ist ein Befehl und über die Suche erreichbar
Der Prototyp SHALL ein Befehlsregister als Daten (`src/befehle.json`) mit mindestens den Befehlen aus design.md
führen. Jedes Bedienelement SHALL genau einen Befehl aus dem Register auslösen und ihn in `data-befehl` nennen
(ADR-045). Das Feld „Suchen oder fragen“ (Strg/Cmd+K) SHALL Befehle und Elemente gruppiert zeigen, mit dem Kürzel
neben jedem Befehl.

#### Scenario: [auto] Register gültig
- **WHEN** der Test `src/befehle.json` liest
- **THEN** hat jeder Befehl eine eindeutige ID nach `^[a-z]+(\.[a-z-]+)+$`, einen Titelschlüssel in `de.json` und
  `en.json`, jede Zahl unter `parameter` eine Dimension und Standard-Einheit, alle Befehle aus der Tabelle in
  design.md sind enthalten, und höchstens 10 Befehle haben ein Kürzel

#### Scenario: [auto] Kein Bedienelement ohne Befehl
- **WHEN** `budget` in allen 17 Zuständen alle sichtbaren Elemente mit Rolle `button`, `menuitem`, `option`,
  `tab`, `switch`, `radio` oder `checkbox` sammelt
- **THEN** trägt jedes ein `data-befehl` mit einer ID aus dem Register (0 Abweichungen)

#### Scenario: [auto] Jeder Befehl über die Suche
- **WHEN** `npm run --silent pruefen -- befehle --json` für jeden Befehl Strg/Cmd+K drückt, den deutschen Titel
  tippt und Enter drückt
- **THEN** steht der Befehl bei 100 % der Befehle unter den ersten 3 Treffern der Gruppe Befehle, wird
  ausgeführt (Eintrag im Protokoll), und bei jedem Befehl mit Kürzel steht das Kürzel neben dem Treffer

#### Scenario: [auto] Elemente in der Suche
- **WHEN** im Zustand `halter` Strg/Cmd+K gedrückt, „Steg“ getippt und Enter gedrückt wird
- **THEN** erscheint „Steg“ in der Gruppe Elemente, und danach ist genau der Schritt Steg gewählt und im Aufbau
  markiert

### Requirement: KI im selben Feld
Das Feld „Suchen oder fragen“ SHALL einen gefundenen Befehl ausführen und einen Wunsch an die simulierte KI geben;
das Gespräch SHALL an der Stelle des Inspektors erscheinen, ohne zweites Fenster. Ein Vorschlag MUST als nicht
modale Entscheidungskarte nach design.md erscheinen (ADR-021, ADR-061) und nach dem Übernehmen ein normaler
Schritt im Aufbau sein. Gespräch und Karte MUST als simuliert gekennzeichnet sein.

#### Scenario: [auto] Befehl oder Wunsch
- **WHEN** im Zustand `halter` einmal „Kanten“ getippt und Enter gedrückt wird und einmal mit gewähltem Steg
  „Runde die oberen Kanten mit 2 mm ab“ getippt und Enter gedrückt wird (`tempo=0`)
- **THEN** wird im ersten Fall `darstellung.kanten` ausgeführt und kein Gespräch geöffnet; im zweiten Fall ist
  der erste Eintrag „KI fragen: …“, danach nimmt das Gespräch die Zone `inspektor` ein (gleiche Lage und Größe
  ± 2 px), es sind genau 2 Panels sichtbar, und die Karte zeigt die Befehlszeile `feature.verrunden` mit
  Radius 2 mm; `modell()` ist vor dem Übernehmen unverändert

#### Scenario: [auto] Aufgabe F – Übernehmen wird ein Schritt
- **WHEN** `npm run --silent pruefen -- ablauf f --json` den Vorschlag „Verrundung 2 mm“ am Steg übernimmt und
  danach im Inspektor den Radius auf 3 mm setzt
- **THEN** steht im Aufbau ein neuer Schritt Verrundung nach „Bohrungen“, er ist gewählt, der Inspektor ist
  wieder sichtbar und zeigt Radius 3 mm, das Protokoll enthält `feature.verrunden` mit `quelle: ki`, und
  höchstens zweimal Strg/Cmd+Z stellt den Stand vor dem Vorschlag her

#### Scenario: [auto] Verwerfen, Anhalten, unbekannter Satz
- **WHEN** ein Vorschlag verworfen wird, die KI ohne `tempo=0` während „Arbeitet“ angehalten wird und ohne
  Auswahl der Satz „Wie wird das Wetter morgen?“ gefragt wird
- **THEN** ist `modell()` in allen drei Fällen unverändert, nach dem Anhalten erscheint keine Karte, beim
  unbekannten Satz erscheint eine Erklärung mit den Beispielsätzen, und es gibt 0 modale Dialoge

#### Scenario: [auto] Kennzeichnung
- **WHEN** die Zustände `ki-gespraech` und `ki-vorschlag` geladen werden
- **THEN** tragen Gespräch und Karte `data-quelle="ki"`, zeigen den übersetzten Text für „KI simuliert“, und die
  Karte trägt `data-muster="Entscheidungskarte"` mit genau einer Hauptaktion (`vorschlag.uebernehmen`) und
  der ruhigen Aktion `vorschlag.verwerfen` (ohne Akzent, ohne `data-hauptaktion`)

#### Scenario: [mensch] Aufgabe F
- **WHEN** eine Testperson Aufgabe F ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen, ob sie den Sollzustand in höchstens 4 min ohne Hilfe erreicht und den
  Vorschlag übernommen hat (Ja/Nein; berichtet)

### Requirement: Erweiterung ohne eigene Fenster
Das simulierte Beispielpaket „Simulation“ SHALL nur über die Andockstellen des Prototyps beitragen: einen Reiter,
eigene Schritte im Aufbau (Lager, Kraft, Ergebnis), eine Darstellung im Modell mit Legende, Werte im Inspektor
und Befehle in Suche und Kontextleiste. Es MUST NOT eigene Fenster, Dialoge, Werkzeugleisten oder Farben
außerhalb der Tokens bringen. Sein Ergebnis MUST als simuliert gekennzeichnet sein.

#### Scenario: [auto] Andockstellen
- **WHEN** im Zustand `halter` der Reiter „Simulation“ gewählt wird
- **THEN** zeigt der Aufbau die Schritte Lager, Kraft und Ergebnis, die Kopfzeile genau 2 Reiter, das Modell
  eine Farbdarstellung mit einer Legende (`data-muster-kandidat="Legende"`) in der Modellzone, und `zonen`
  meldet weiterhin genau die fünf Zonen und 2 Panels

#### Scenario: [auto] Werte und Befehle des Pakets
- **WHEN** der Schritt Kraft gewählt und im Inspektor 200 N eingegeben wird; danach in der Suche „Kraft“ gesucht
  wird
- **THEN** verdoppelt sich der Höchstwert der Legende (± 1 %), und `simulation.kraft` steht unter den ersten 3
  Treffern der Gruppe Befehle

#### Scenario: [auto] Kennzeichnung und keine Fenster
- **WHEN** der Zustand `simulation` geladen wird
- **THEN** zeigen Legende und Inspektor den übersetzten Text für „simuliert“, und `budget` meldet 0 modale
  Dialoge, 0 Werkzeugleisten und 0 sichtbare Fenster oder Overlays außerhalb der erlaubten (design.md)

### Requirement: Aufgaben A bis E im neuen Bedienkonzept
Der Prototyp SHALL die Aufgaben A bis E aus design.md erlauben: A neue Grundplatte aus Skizze und Extrusion,
B Schritt ändern und Kanten verrunden mit Befund bei zu großem Radius (ADR-050), C zwei Teile zur Baugruppe
verbinden, D Entwurf anlegen, vergleichen und übernehmen, E Kürzel für Rückgängig finden.

#### Scenario: [auto] Aufgabe A
- **WHEN** `ablauf a` ab `leer` nur mit Klicks und Tasten die Skizze anlegt, XY wählt, ein Rechteck aufzieht,
  80 mm und 50 mm im Inspektor tippt, „Fertig“ wählt, über die Kontextleiste extrudiert und 8 mm tippt
- **THEN** enthält `modell()` in Teil 1 eine Skizze mit Rechteck 80 × 50 mm auf XY und eine Extrusion mit Dicke
  8 mm, die Skizze ist im Aufbau Unterzeile der Extrusion, die Extrusion ist gewählt, und `teil()` meldet
  80 × 50 × 8 mm

#### Scenario: [auto] Aufgabe B mit Befund
- **WHEN** `ablauf b` ab `halter` den Steg auf 40 mm Höhe setzt, die zwei oberen Längskanten wählt und mit 3 mm
  verrundet; danach im Zustand `befund` die Grundplatte gewählt und auf 9 mm gesetzt und die Korrektur geklickt
  wird
- **THEN** hat der Steg 40 mm, eine Verrundung mit Radius 3 mm verweist auf genau 2 Kanten, das Volumen ist
  55,25 cm³ (± 0,1 %); im Zustand `befund` zeigt die Verrundung in Aufbau und Modell die Statusanzeige
  „fehlerhaft“ (Farbe, Symbol, Wort), die Grundplatte lässt sich trotzdem auf 9 mm setzen, und nach der
  Korrektur „Radius auf 5 mm setzen“ ist der Radius 5 mm und der Befund weg

#### Scenario: [auto] Aufgabe C
- **WHEN** `ablauf c` ab `teile` Gehäuse und Deckel wählt, „Baugruppe anlegen“ und „Verbinden“ über
  Kontextaktionen oder Suche ausführt, die Verbindungspunkte anklickt und im Inspektor die Art „Fest“ lässt
- **THEN** enthält `modell()` eine Baugruppe mit zwei Instanzen und eine Verbindung „Fest“ zwischen
  „Unterseite“ und „Oberkante“, und die Unterseite des Deckels liegt auf 30 mm (± 0,01 mm)

#### Scenario: [auto] Aufgabe D
- **WHEN** `ablauf d` ab `halter` einen Entwurf „Dickere Platte“ anlegt, die Grundplatte auf 10 mm setzt,
  vergleicht und übernimmt; dazu ein zweiter Entwurf, der zuerst ohne und dann mit der Begründung „zu schwer“
  verworfen wird
- **THEN** zeigt der Vergleich Dicke 8 mm → 10 mm, der Hauptstand hat vor dem Übernehmen 8 mm und danach 10 mm,
  der Entwurf ist „Übernommen“; Verwerfen ohne Begründung ist nicht auslösbar, der verworfene Entwurf fehlt in
  „Ergebnis“ und steht in „Alle Entwürfe“ mit „zu schwer“, und die Zahl der Entwürfe in `modell()` ist
  unverändert

#### Scenario: [auto] Aufgabe E
- **WHEN** `ablauf e` im Zustand `halter` die Kopfzeile liest und im Feld „zurück“ sucht
- **THEN** zeigt der Rückgängig-Knopf in der Kopfzeile das Kürzel als Text, und die Suche liefert
  `bearbeiten.rueckgaengig` mit demselben Kürzel unter den ersten 3 Treffern

#### Scenario: [mensch] Testpersonen lösen A, B und C
- **WHEN** eine Testperson die Aufgaben A, B und C aus dem Testleitfaden ohne Einweisung bearbeitet
- **THEN** steht im Ergebnisbogen je Aufgabe, ob sie den Sollzustand innerhalb des Zeitlimits (A 5 min, B 4 min,
  C 5 min) ohne Hilfe erreicht hat (Ja/Nein); D und E werden ebenso berichtet

### Requirement: Komplexitätsbudget und Reaktion
Der Prototyp SHALL in jedem Testzustand das Budget aus design.md einhalten: genau 2 Panels, höchstens 5
Arbeitsbereiche, keine Werkzeugleiste, höchstens 10 Kürzel, Muster nur aus dem Katalog plus höchstens die drei
Kandidaten, 0 modale Dialoge, Akzent nur an Auswahl, Fokus, der einen Hauptaktion und KI. Auswahl, Überfahren,
Live-Änderung, Darstellungswechsel und Suche SHALL in weniger als 100 ms reagieren.

#### Scenario: [auto] Budget in allen Zuständen
- **WHEN** `npm run --silent pruefen -- budget --json` alle 17 Zustände in beiden Themen zählt
- **THEN** gilt in jedem Zustand: Panels = 2, Arbeitsbereiche ≤ 5, Werkzeugleisten = 0, Hauptaktionen ≤ 1, modale
  Dialoge = 0, Akzentfarbe an unzulässiger Stelle = 0; über alle Zustände ist die Menge der `data-muster` eine
  Teilmenge der Musternamen aus `docs/design/muster.md`, die Menge der `data-muster-kandidat` eine Teilmenge von
  {Pfad, Legende, Gespräch}, und im Quelltext gibt es 0 Vorkommen von `alert(`, `confirm(`, `prompt(`,
  `showModal(`

#### Scenario: [auto] Reaktion unter 100 ms
- **WHEN** `npm run --silent pruefen -- messen --json` dreimal läuft
- **THEN** ist der Median von `auswahl_p95_ms`, `hover_p95_ms`, `wert_live_p95_ms`, `darstellung_p95_ms` und
  `suche_p95_ms` jeweils kleiner als 100

### Requirement: Testleitfaden und Abnahme mit Testpersonen
Der Change SHALL einen Testleitfaden mit Ergebnisvorlage in `docs/spikes/ux-prototyp-2.md` liefern, mit den
Aufgaben A bis H aus design.md, je mit Text, Startadresse, Sollzustand und Zeitlimit, Erfolgskriterium,
pseudonymem Ergebnisbogen (ADR-056), Nachbefragung (inklusive der zwei Fragen zur Leitidee) und Auswertung. Die
Abnahme gilt als bestanden, wenn mindestens 4 von 5 Testpersonen A, B und C ohne Einweisung lösen.

#### Scenario: [auto] Leitfaden vollständig
- **WHEN** der Test `docs/spikes/ux-prototyp-2.md` liest
- **THEN** enthält er die Abschnitte Ziel, Rahmen, Ablauf, Aufgaben, Erfolgskriterium, Ergebnisbogen,
  Nachbefragung, Auswertung und Datenschutz, für jede der Aufgaben A bis H Text, Startadresse (einer der 17
  Zustände), Sollzustand und Zeitlimit in Minuten, und eine Ergebnistabelle für TP1 bis TP5 ohne Spalten für
  Name oder Alter

#### Scenario: [auto] Aufgaben ohne Befehlsnamen
- **WHEN** der Test die Aufgabentexte A bis F und H mit den deutschen Titeln der Befehle vergleicht, die der
  jeweilige Ablauf im Protokoll von `pruefen ablauf <x>` nutzt
- **THEN** enthält keiner dieser Texte einen dieser Titel (ohne Groß- und Kleinschreibung)

#### Scenario: [mensch] Pilotlauf des Kernteams vor dem Merge
- **WHEN** das Kernteam als TP1 die Aufgaben A bis H nach dem Leitfaden bearbeitet
- **THEN** sind A bis H je innerhalb des Zeitlimits ohne Hilfe gelöst, beide Fragen zur Leitidee richtig
  beantwortet, und der Ergebnisbogen ist ausgefüllt und als Pilotlauf gekennzeichnet (Ja/Nein)

#### Scenario: [mensch] Abnahme 4 von 5
- **WHEN** fünf Testpersonen (TP1 bis TP5) die Aufgaben nach dem Leitfaden bearbeitet haben
- **THEN** haben mindestens 4 von 5 die Aufgaben A, B und C je innerhalb des Zeitlimits ohne Hilfe gelöst, und
  `docs/spikes/ux-prototyp-2.md` enthält die Ergebnisse, die Werte je Aufgabe und die Empfehlung Go oder No-Go
  für G1 (Ja/Nein)
