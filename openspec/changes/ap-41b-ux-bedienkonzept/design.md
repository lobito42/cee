## Context

Siehe proposal.md – Why. Grundlagen:

- **ADR-065** „Bedienkonzept – Fensteraufbau“ (Punkte 1–14, inkl. Platzierungsregel Punkt 12 und Auswahl als
  Befehlsfamilie Punkt 13); Status „vorgeschlagen, gilt nach der Abnahme des Prototyps ap-41b“.
- **Musterkatalog** `docs/design/muster.md` (Abschnitt „Fensteraufbau (Entwurf)“ und die Muster), **Tokens**
  `docs/design/tokens.json`, **Glossar** `docs/glossar.md` (Abschnitt „Oberfläche“: Taskleiste, Start-Menü,
  Menüleiste, Struktur, Wurzel, Eigenschaften, Chat, Panel, Dokument-Reiter).
- ADR-060 (Eingabe als Schicht, Navigationsprofile, nichts am Überfahren), ADR-061 (ein Muster je Aufgabe, ein
  Akzent, eine Statussprache), ADR-050 (Berechnungszustände), ADR-051/052, ADR-056, ADR-057.
- **ap-49-spike-auswahl** (auf `main`): klärt die Auswahl nach Regel im Kern. Hier nur die Schnittstelle.
- **Vorheriger Stand dieses Changes** (PR #51, Branch `change/ap-41b-ux-bedienkonzept`, `spikes/ux-prototyp-2/`):
  fünf Zonen nach ADR-063, testgrün gegen die alten Abnahmetests; überholt durch ADR-065.

Leitgedanke: **Erst die Bausteine, dann die Funktionen.** Jede spätere Funktion (Skizze, Bohrung, Baugruppe …)
nutzt dieselben Zustände, dieselbe Auswahl, dasselbe Kontextmenü, dasselbe Ziehen und dieselbe Rückmeldung. Der
Prototyp zeigt diese Bausteine an einem kleinen Beispiel; der Bausteinkatalog hält sie als Maßstab fest.

## Goals / Non-Goals

**Goals:** Ein spielbarer Prototyp mit dem Fensteraufbau aus ADR-065, an dem das Kernteam die Grundlagen
ausprobieren kann (Klick-Anleitung nach jeder Gruppe), und ein Bausteinkatalog, den Nachtagenten und der
ui-checker als Maßstab nutzen. Was messbar ist, prüft das Prüfwerkzeug (Playwright, Attribute, Pixel, Zeiten);
der Rest ist `[mensch]`.

**Non-Goals:** siehe proposal.md – Impact. Wegwerf-Code: beweist Bedienbarkeit, nicht Architektur.

## Decisions

### Ablage: `spikes/ux-prototyp-2/` neu aufbauen (entschieden, Open Questions 9)

- Der Ordner existiert nur auf dem Branch von PR #51, nicht auf `main`. Der neue Stand entsteht auf einem frisch
  von `main` abgezweigten `change/ap-41b-ux-bedienkonzept` im selben Ordner; so bleibt der Testleitfaden
  `docs/spikes/ux-prototyp-2.md` und `spikes/ux-prototyp/` (ap-41) unberührt.
- Übernommen per `git show origin/change/ap-41b-ux-bedienkonzept:spikes/ux-prototyp-2/<pfad>` (kopiert und
  angepasst): `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `.prettierrc.json`,
  `build.sh`, `vorschau.sh`, `scripts/tokens.mjs`, `src/erzeugt/`, `src/i18n/`, `src/wert/`, `src/modell/`
  (Register, Protokoll, Rückgängig), `src/geometrie/` (Halter), `src/ansicht/` (Licht, Kanten, Kontur,
  Einpassen), `src/ki/` (Absichten), `pruefen/basis.mjs`. Neu gebaut: Fensteraufbau, Struktur, Eigenschaften,
  Chat, Menüs, Kontextmenü, Zustände, Ziehen & Ablegen, Sichtbarkeit, Rückmeldung, Katalog, Prüfbefehle.
- Ohne UI-Framework (TypeScript und DOM). Laufzeit-Abhängigkeiten nur `three`, `lucide`,
  `@fontsource-variable/inter`, `@fontsource/jetbrains-mono`. Statische Seite, keine Anfrage an fremde Hosts.
  Layout Desktop ab 1280 × 800 px, Bezugsgröße 1440 × 900 px. Kürzel nach Plattform (Cmd auf macOS, sonst Strg;
  im Folgenden „Mod“).

### Fensteraufbau (ADR-065 Punkte 1–9, Maße bei 1440 × 900 px)

| Zone | Attribut | Lage und Größe | Inhalt im Prototyp |
| --- | --- | --- | --- |
| Menüleiste | `data-zone="menueleiste"` | oben, volle Breite, Höhe ≤ 40 px | Start-Menü, Dropdowns des Taskleisten-Eintrags, Suche (Mod+K), Rückgängig mit Kürzel, Schalter Struktur (Mod+B), Panel (Mod+J), rechte Seitenleiste (Mod+Alt+B) |
| Taskleiste | `data-zone="taskleiste"` | ganz links, Breite 40–56 px | Symbole „Modellieren“, „Simulation“ (Platzhalter, gekennzeichnet), unten Shop (Platzhalter) |
| Struktur | `data-zone="struktur"` | links, Breite 220–320 px | Elemente unter der Wurzel, je Zeile Name, Symbol, Auge, Status |
| Modell | `data-zone="modell"` | Mitte, ≥ 45 % der Fensterfläche | Dokument-Reiter, Pfad, three.js-Szene, Ansichtsleiste |
| Eigenschaften | `data-zone="eigenschaften"` | rechts oben, Breite 260–360 px | Gruppen › Felder der Auswahl, ohne Auswahl das aktive Element |
| Chat | `data-zone="chat"` | rechts unten, gleiche Breite | Kontext „zu: …“, Eingabe, Entscheidungskarten (simuliert) |
| Panel | `data-zone="panel"` | unten unter dem Modell, optional, Höhe 160–320 px | nur „Befunde“ (Muster Befund); weitere Einträge der Auswahl sind M2+ |
| Rückmeldezeile | `data-zone="rueckmeldung"` | unten, volle Breite, Höhe ≤ 28 px | Muster Rückmeldung, leise (Standardvorschlag, Open Questions 13) |

Dropdowns der Menüleiste: höchstens 12 Einträge, in Untergruppen; Inhalt aus dem Register nach Familie (siehe
Befehlsregister). Es gibt keine Befehlsreiter, keine Reiter in Reitern, keinen modalen Dialog.

### Beispielinhalt

Zwei Dokumente als Reiter, beide aus dem vorigen Stand übernommen:

- **Halter** (Teil): Grundplatte 80 × 50 × 8 mm mit Ecken R 3, Steg 60 × 10 × 30 mm, Bohrungen 2 × Ø 6; Lage,
  Material PLA (1,24 g/cm³) und Volumenformel wie im vorigen Stand dieses Changes (Ausgangsvolumen 49,49 cm³,
  Masse 61,36 g; Steg Höhe 40 mm → 55,49 cm³ ohne Verrundung). Toleranz der Anzeige ± 0,1 %.
- **Sensorgehäuse** (Baugruppe): „Baugruppe 1“ mit Teil „Gehäuse“ (80 × 50 × 30 mm, Schale 2 mm, oben offen);
  Teil „Deckel“ (80 × 50 × 4 mm) liegt neben der Baugruppe auf oberster Ebene (Ziel für Ziehen & Ablegen).

Jedes Element hat die Elementform (`id`, `type`, `params`, `content`, `meta`), Zahlen als Größe
`{"value": …, "unit": "mm"}` (ADR-057). Jede Fläche im Modell trägt die ID des Elements, das sie erzeugt.

### Elementzustände (Requirement „Elementzustände“)

Ein Zustand wird über **Kanäle** dargestellt, damit sich Zustände nicht gegenseitig verdecken. Jede Darstellung
(Modell, Struktur, Chat-Kontext, Pfad) setzt am Element `data-zustand` (Liste der aktiven Zustände) und zeichnet
die Kanäle so:

| Zustand | Kanal | Modell | Struktur-Zeile | Chat-Kontext / Pfad | Tokens |
| --- | --- | --- | --- | --- | --- |
| Überfahren (`hover`) | Kontur | dünne Kontur 1 × `linie.breite` | Zeilenfläche `flaeche-2` | Chip-Fläche `flaeche-2` | `akzent`, `flaeche-2` |
| Ausgewählt (`ausgewaehlt`) | Kontur | Kontur 2 × `linie.breite` | Zeilenfläche `akzent-flaeche`, Text `text` | Chip `akzent-flaeche` | `akzent`, `akzent-flaeche` |
| Von anderen bearbeitet (`andere`) | Kontur | gestrichelte Kontur `linie-stark` + Namensschild der Person | Kürzel der Person rechts in der Zeile | Name im Chip | `linie-stark`, `text-2` (Open Questions 3) |
| Aktiv (`aktiv`) | Umfeld | alles außerhalb des aktiven Elements mit Deckkraft 0,35 bzw. gestrichelt | aktive Zeile `schrift.schnitt.halbfett`, übrige Zeilen `text-3` | letztes Glied des Pfads, Reiter hervorgehoben | `text-3`, `schrift.schnitt.halbfett` |
| Ausgeblendet (`ausgeblendet`) | Sichtbarkeit | nicht gezeichnet | Text `text-3`, Auge-Symbol `eye-off` | Chip mit `eye-off` | `text-3` |
| Fehlerhaft (`fehlerhaft`) | Status | Kontur `fehler` an der letzten gültigen Geometrie, sonst Hüllbox | Statusanzeige: Farbe `fehler` + Symbol `circle-alert` + Wort „fehlerhaft“ | dieselbe Statusanzeige | `fehler`, `fehler-flaeche` |
| Pausiert (`pausiert`) | Status | Geometrie des letzten Stands, Deckkraft 0,6 | Statusanzeige neutral `text-2` + `circle-pause` + „pausiert“ | dieselbe | `text-2` |
| Rechnet (`rechnet`) | Status | unverändert | Statusanzeige `text-2` + `loader` + „rechnet“ | dieselbe | `text-2` |

**Vorrangregel** (entschieden, Open Questions 3): Die Kanäle Status, Sichtbarkeit und Umfeld werden immer
zusätzlich gezeigt. Im Kanal Kontur gewinnt genau einer: **ausgewählt > von anderen bearbeitet > überfahren**.
Ein fehlerhaftes, gewähltes Element trägt also die Akzent-Kontur *und* die Statusanzeige „fehlerhaft“; ein
ausgeblendetes, gewähltes Element erscheint in der Struktur gewählt mit `eye-off`, im Modell nicht. Akzent nur für
Auswahl, Überfahren, Fokus, die eine Hauptaktion und KI (ADR-061).

### Eine Auswahl (Requirement „Eine Auswahl für alles“)

- Genau ein Auswahlzustand je Fenster: eine geordnete Liste von **Adressen** (`{element_id}` bzw.
  `{element_id, teil: {art: "kante"|"flaeche", adresse}}`, ADR-058; keine Indizes, ADR-016). Struktur, Modell,
  Eigenschaften, Chat-Kontext und Pfad lesen und ändern nur diesen Zustand (`window.__cee.auswahl()`).
- Klick wählt (ersetzt), **Umschalt+Klick** fügt hinzu, **Mod+Klick** schaltet ein Element um, **Klick ins
  Leere** (Modell oder leere Fläche der Struktur) und **Esc** heben auf, **Mod+A** wählt alle sichtbaren Elemente
  der aktiven Ebene.
- **Ebene der Auswahl** (entschieden, Open Questions 4): Klick wählt das Element der nächsten Ebene unter dem
  aktiven Element. In der Baugruppe wählt ein Klick auf eine Fläche das Teil; Doppelklick (bzw. Enter in der
  Struktur) macht das Teil **aktiv**; dann wählt ein Klick auf eine Fläche das Element (Schritt), das sie erzeugt
  hat, ein Klick auf eine Kante die Kante (Trefferzone ≥ 8 px). „Fertig“, Esc ohne Auswahl oder Klick im Pfad
  verlassen das aktive Element.
- **Isolieren** (Ansichtsleiste) ist eine Form von „aktiv“: nur die Auswahl wird gezeigt; „Alles einblenden“
  hebt es auf.
- Eigenschaften zeigen bei einem Element dessen Gruppen, bei mehreren nur die gemeinsamen Felder mit „gemischt“,
  ohne Auswahl das aktive Element. Der Chat zeigt „zu: <Name>“ bzw. „zu: 3 Elemente“.
- **Schnittstelle zu ap-49:** Die Befehlsfamilie „Auswahl“ hat im Prototyp `auswahl.setzen`,
  `auswahl.hinzufuegen`, `auswahl.umschalten`, `auswahl.aufheben`, `auswahl.alles`, `auswahl.umkehren`. Jeder
  Auswahlbefehl, auch eine spätere Regel, endet in derselben Adressliste. Ob eine Regel als Element im Graphen
  gespeichert wird und wie sie aufgelöst wird, entscheidet ap-49; der Prototyp baut dazu nichts.

### Anlegen, ändern, verwerfen (Requirement „Elemente anlegen, ändern und verwerfen“)

| Operation | Befehl | Wege (alle rufen denselben Befehl) | Kürzel (entschieden) |
| --- | --- | --- | --- |
| Anlegen | `element.anlegen` (Parameter `typ`: Teil, Baugruppe) | Start-Menü „Neu“, Dropdown, Suche, Kontextmenü auf leerer Struktur, Chat | – |
| Umbenennen | `element.umbenennen` | Kontextmenü, Suche, F2, Doppelklick auf den Namen in den Eigenschaften | F2 |
| Duplizieren | `element.duplizieren` | Dropdown „Bearbeiten“, Kontextmenü, Suche, Chat | Mod+D |
| Verwerfen | `element.verwerfen` | Kontextmenü, Suche, Entf/Rücktaste, Chat | Entf |
| Wert ändern | `element.wert-setzen` | Eigenschaften, Griff, Chat | – |

- **Verwerfen statt Löschen** (ADR-051/052): Das Element wird aus dem Ergebnis ausgeblendet und als verworfen
  gekennzeichnet, nicht gelöscht; „Verworfenes zeigen“ (Befehl `ansicht.verworfenes`) blendet es in der Struktur
  durchgestrichen ein, „Zurückholen“ (`element.zurueckholen`) stellt es wieder her. Keine Sicherheitsabfrage.
- **Rückgängig** (`bearbeiten.rueckgaengig`, Mod+Z; `bearbeiten.wiederholen`, Mod+Umschalt+Z) wirkt auf einen
  Verlauf je Dokument, unabhängig davon, in welcher Zone der Fokus steht und auf welchem Weg der Befehl kam. Jede
  Modelländerung ist genau ein Eintrag (Live-Tippen im Wertfeld: ein Eintrag bei Enter). Auswahl, Kamera,
  Sichtbarkeit und Aktiv sind Ansicht und keine Einträge (Standardvorschlag, Open Questions 6).
- Die simulierte KI ruft dieselben Befehle über eine Entscheidungskarte auf (ADR-021); nach dem Übernehmen steht
  im Protokoll derselbe Befehl mit `quelle: "ki"`.

### Befehlsregister und Platzierung (ADR-065 Punkte 2, 3, 12, 14)

- `src/befehle.json`: je Befehl `id`, `familie`, `titel` (Schlüssel), `parameter`, `bezug` (wofür er gilt:
  `keine`, `element`, `teil`, `baugruppe`, `kante`, `flaeche`, `mehrfach`), `rang` (Häufigkeit, kleiner =
  weiter vorn), `wesentlich` (ja/nein), optional `kuerzel`. Jedes Bedienelement trägt `data-befehl`.
- Familien und Ort im Prototyp:

| Familie | Ort | Befehle im Prototyp (Auszug) |
| --- | --- | --- |
| Datei | Start-Menü | `dokument.oeffnen`, `element.anlegen`, `wurzel.setzen`, `einstellungen.oeffnen` (Teilen, Exportieren sichtbar, aber als „folgt“ ohne Wirkung) |
| Bearbeiten | Dropdown „Bearbeiten“, Kontextmenü | `element.umbenennen`, `element.duplizieren`, `element.verwerfen`, `element.zurueckholen`, `bearbeiten.rueckgaengig`, `bearbeiten.wiederholen` |
| Auswahl | Dropdown „Auswahl“, Kontextmenü | siehe Auswahl |
| Ansicht | Ansichtsleiste im Modell | `ansicht.einpassen`, `ansicht.auf-auswahl`, `ansicht.isolieren`, `ansicht.alles-einblenden`, `ansicht.projektion`, `darstellung.wechseln` (Körper, Kanten, Durchsicht) |
| Sichtbarkeit | Auge, Kontextmenü | `element.ausblenden`, `element.einblenden`, `ansicht.verworfenes` |
| Ansicht speichern | Ansichtsleiste, Suche, Kontextmenü | `ansicht.speichern`, `ansicht.anwenden` |
| Fenster | Menüleiste (Schalter), Suche | `fenster.struktur`, `fenster.panel`, `fenster.rechts`, `suche.oeffnen` |
| Baugruppe | Dropdown „Baugruppe“, Kontextmenü | `element.umhaengen` (Ziel), `element.aktivieren`, `element.verlassen` |
| Hilfe | Suche | `katalog.oeffnen` |

- **Kontextmenü** (Rechtsklick oder Shift+F10 bzw. Kontextmenü-Taste): erzeugt aus allen Befehlen, deren `bezug`
  zur Auswahl passt, gruppiert nach Familie (Reihenfolge der Familien fest, innerhalb nach `rang`), höchstens 12
  Einträge je Gruppe, nicht wesentliche Befehle hinter „Mehr …“. In Struktur und Modell dieselbe Liste für
  dieselbe Auswahl.
- **Kontextaktionen** (Leiste über dem Gewählten im Modell, ADR-065 Punkt 3): die ersten höchstens fünf Einträge
  desselben Kontextmenüs nach `rang` (entschieden, Open Questions 2). Keine eigene Liste.
- **Befehlsinventar:** Prüfreferenz nach ADR-065 Punkt 14, Format für
  `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` (Kernteam):
  `[{"id": "…", "titel": "…", "familie": "…", "beta": true, "wesentlich": true}]`. Geprüft wird nur: Jede Familie
  des Inventars hat genau einen Ort nach der Tabelle oben, und kein Dropdown überschreitet mit den Beta-Befehlen
  seiner Familie 12 Einträge je Untergruppe. Der Prototyp muss die Befehle nicht ausführen können, aber jeder
  Beta-Befehl muss als Eintrag (Menü, Kontextmenü oder Suche) vorhanden sein. Das Kernteam liefert die Datei über
  den Branch `tests/ap-41b-ux-bedienkonzept` (entschieden, Open Questions 15).

### Navigation (ADR-060 Punkt 3)

- `src/eingabe/` trennt Quellen (Maus, Trackpad, Touch, Tastatur, Ansichtseingabe mit sechs Achsen für eine
  spätere 3D-Maus) und erzeugt nur Befehle oder Kameraänderungen.
- **Navigationsprofile sind Daten** (`src/eingabe/profile.json`), Einstellung `einstellung.navigationsprofil`.
  Profil „Standard“ (entschieden, Open Questions 8):

| Gerät | Drehen | Verschieben | Zoomen |
| --- | --- | --- | --- |
| Maus | rechte Taste ziehen | mittlere Taste oder Umschalt+rechte Taste ziehen | Rad, zum Zeiger |
| Trackpad | zwei Finger wischen | Umschalt + zwei Finger wischen | Zwei-Finger-Spreizen (Browser: `wheel` mit `ctrlKey`) |
| Touch | ein Finger ziehen (im Leeren) | zwei Finger ziehen | zwei Finger spreizen |

  Rechtsklick ohne Bewegung (< 4 px) öffnet das Kontextmenü; Tippen wählt. Ein zweites Profil „wie Onshape/SolidWorks“
  (Open Questions 8) belegt die Austauschbarkeit; Umschalten ändert keine Codezeile außerhalb der Daten.
- `ansicht.einpassen` (alles) und `ansicht.auf-auswahl` (Taste F): die projizierte Hüllbox füllt danach 60–90 %
  der kürzeren Seite der Modellzone, Mitte auf ± 5 %. `ansicht.projektion` schaltet Perspektive/Orthogonal,
  Standard orthogonal (Open Questions 7). Kameraübergänge dauern `bewegung.mittel`.

### Ziehen (Requirement „Ziehen im Modell und in der Struktur“)

- **Ziehen im Modell (Griff):** Am gewählten Element Pfeil-Griffe für seine Längen-Parameter (Extrusion: Dicke
  bzw. Höhe). Ziehen ändert in 1-mm-Schritten, die Zahl erscheint am Zeiger und verschwindet ≤ 1.000 ms nach dem
  Loslassen; Ziffern während des Ziehens setzen den genauen Wert (ADR-044); Loslassen oder Enter übernimmt (ein
  Verlaufseintrag); Esc bricht ab (Wert wie vorher, kein Eintrag).
- **Ziehen & Ablegen in der Struktur:** Zeilen lassen sich auf eine andere Zeile ziehen, um sie umzuhängen
  (`element.umhaengen`). Erlaubt im Prototyp: Teil in eine Baugruppe, Teil aus einer Baugruppe auf oberste Ebene.
  Nicht erlaubt: Element in sich selbst oder in eigene Nachfahren, Schritt aus seinem Teil heraus, Umordnen von
  Schritten innerhalb eines Teils (entschieden, Open Questions 12). Ab 4 px Bewegung folgt eine
  Zieh-Vorschau (Name) dem Zeiger; ein erlaubtes Ziel trägt `data-ziel="erlaubt"` (Zeilenfläche
  `akzent-flaeche`), ein nicht erlaubtes `data-ziel="verboten"` (Zeiger `not-allowed`, Grund in der
  Rückmeldezeile). Ablegen auf erlaubtem Ziel: ein Verlaufseintrag; auf verbotenem Ziel oder Esc: keine Änderung.
- Ziehen im Modell auf die Struktur ist kein Weg (es gibt keine zwei Arten für dieselbe Aufgabe).

### Sichtbarkeit (ADR-065 Punkt 9, ADR-015)

- Auge in jeder Strukturzeile (immer sichtbar, nicht nur beim Überfahren); `element.ausblenden`/`einblenden`,
  dazu H und Alt+H („Alles einblenden“).
- Sichtbarkeit ist **Ansichtszustand der Person** (vom Kernteam im Sinn bestätigt, Open Question 1): Sie steht
  in `window.__cee.ansicht().ausgeblendet`, nie in `modell()`; der Hash von `modell()` ist vor und nach dem
  Ausblenden gleich. Damit kann sie den Export nicht beeinflussen (ADR-015). Ausblenden eines Elements blendet
  seine Nachfahren mit aus; sie behalten ihr eigenes Auge.

### Ansicht ist flüchtig, Speichern ist ausdrücklich (drei Schichten)

| Schicht | Inhalt | Gespeichert? | Im Prototyp |
| --- | --- | --- | --- |
| 1 Arbeitsschritte | Elemente im Graphen: Eingaben, Projektzustand (ADR-028, ADR-051) | ja, versioniert und synchronisiert | `modell()`, Verlauf; gehalten in `localStorage` unter `cee-prototyp-graph` als Ersatz für den Server |
| 2 Arbeitsergebnis | Geometrie, Rendering, Export, abgeleitet (ADR-032) | nie | aus `modell()` neu berechnet |
| 3 Ansicht | Drehen, Zoom, Kamera, Beleuchtung, Darstellung (Körper/Kanten/Durchsicht), Projektion, Auswahl, Aktiv/Isolieren, Ausblenden/Einblenden | nein, flüchtig und je Person | nur `ansicht()` und `auswahl()` im Speicher der Seite; nach Neuladen Vorgaben |

- Eine Ansichtsänderung erzeugt keinen Eintrag in `modell()`, `protokoll()` oder im Verlauf (passt zu Open
  Questions 6) und keinen Speichereintrag.
- **Ausdrücklich speichern:** Befehl `ansicht.speichern` (Familie Ansicht, Ansichtsleiste und Suche) legt ein
  benanntes Element im Graphen an (z. B. „Ansicht: Schnitt A“) mit Kamera, Projektion, Darstellung und – nur auf
  diesem Weg – Auswahl (Adressen) und Ausgeblendetem. Es ist Schicht 1: gilt für alle, steht in der Struktur, ist
  ein Verlaufseintrag und lässt sich wie jedes Element umbenennen, duplizieren und verwerfen. `ansicht.anwenden`
  (Doppelklick oder Enter auf das Element) setzt die Ansicht; das ändert den Graphen nicht.
- Eine gespeicherte Ansicht wirkt nie auf den Export (ADR-015): Auch ihr Ausgeblendetes blendet nur die Ansicht aus.
- Elementtyp `view`; er wird Grundtyp im Kern (entschieden, Open Questions 17).
- Testzustände per Adresse setzen Schicht 1 und 3 für den Test; ohne `zustand=` lädt die Seite den gehaltenen
  Graphen und die Ansicht-Vorgaben.

### Rückmeldung und Fehler (ADR-050)

- Feste Orte: **Statusanzeige** an Element (Struktur-Zeile, Modell) für rechnet/fehlerhaft/pausiert;
  **Rückmeldezeile** unten für Bestätigungen und Hinweise (leise, ohne „erfolgreich“, ohne Ausrufezeichen);
  **Befund** im Panel „Befunde“ mit Ort, Schwere und – wenn möglich – Korrektur; Befund am Wertfeld bei falscher
  Eingabe. Keine Dialoge, keine Toasts an anderen Orten.
- Simulation im Prototyp: Neuberechnung nach einer Wertänderung dauert `&rechenzeit=<ms>` (Vorgabe 0); während
  dessen trägt das Element „rechnet“. Ein Wert, der ungültige Geometrie erzeugt (Bohrung Ø ≥ 50 mm oder Steg
  Höhe 0 mm), macht das Element **fehlerhaft**: Befund mit Korrektur „Letzten gültigen Wert setzen“, alle anderen
  Elemente bleiben sichtbar, wählbar und änderbar. „Pausieren“ (`element.pausieren`) setzt den Zustand pausiert.

### Tastatur und Fokus

- **Tab-Reihenfolge** der Zonen: Menüleiste → Taskleiste → Struktur → Modell → Eigenschaften → Chat → Panel →
  Rückmeldezeile; F6 springt zur nächsten Zone. Innerhalb von Struktur und Menüs Pfeiltasten
  (WAI-ARIA Tree bzw. Menu). Fokus sichtbar als Ring in `akzent`.
- **Esc** schließt bzw. bricht genau eine Ebene ab, in dieser Reihenfolge: offenes Menü/Kontextmenü/Suche →
  laufendes Ziehen → Eingabe im Wertfeld (alter Wert) → aktive Auswahl → aktives Element verlassen.
- **Enter:** führt den markierten Menü- oder Sucheintrag aus, übernimmt im Wertfeld, macht in der Struktur das
  fokussierte Element aktiv, übernimmt im Chat die fokussierte Entscheidungskarte nicht (nur per Knopf).
- **Kürzel** stehen im Register und neben jedem Menüeintrag: Mod+K Suche, Mod+Z / Mod+Umschalt+Z, Mod+B Struktur,
  Mod+J Panel, Mod+Alt+B rechte Seitenleiste; Standardvorschläge F2, Mod+D, Entf, Mod+A, F, H, Alt+H, W
  (Darstellung). Zusammen 14 – unter der Grenze „< 15“ des Leitbilds (Open Questions 5).

### Andere Personen (ADR-056)

Zustand `andere`: eine simulierte zweite Person („Testperson B“) hat den Steg gewählt und bewegt einen Zeiger im
Modell. Darstellung nach Elementzustand „von anderen bearbeitet“. Nichts davon wird gespeichert: kein Eintrag in
`localStorage`, `sessionStorage`, IndexedDB oder Cookies, keine Anfrage nach außen, nach Neuladen ohne Adresse
`zustand=andere` keine Spur davon.

### Bausteinkatalog

- Erreichbar über die Suche (`katalog.oeffnen`) und die Adresse `/?katalog` (Übersicht) bzw.
  `/?katalog=<baustein>` (eine Seite). Jede Seite zeigt: Name, **Bild** (der echte Baustein live gerendert, in
  hell und dunkel, in jedem seiner Zustände), **Regel** (2–6 Sätze in Alltagssprache aus den Übersetzungen),
  Bezug (Muster aus `muster.md` oder „Kandidat“, ADR-Nummer), Befehle, die er nutzt, und Tokens.
- Bausteine (mindestens): Elementzustände, Auswahl, Struktur-Zeile, Auge, Kontextmenü, Kontextaktionen,
  Dropdown, Suche, Wertfeld, Griff, Ziehen & Ablegen, Statusanzeige, Befund, Rückmeldung, Entscheidungskarte,
  Pfad, Dokument-Reiter, Ansichtsleiste, Fokus und Tastatur.
- Das Prüfwerkzeug erzeugt aus jeder Seite ein PNG (`pruefen katalog --out <dir>`); Nachtagenten und der
  ui-checker vergleichen neue Oberflächen damit. Kandidaten ohne Muster-Zeile tragen `data-muster-kandidat`.

### Testzustände per Adresse

`/?zustand=<name>&thema=<hell|dunkel>&sprache=<de|en|schluessel>[&tempo=0][&rechenzeit=<ms>][&register=<datei>]`
(`register` nur in der Vorschau: lädt ein Befehlsregister aus einer lokalen Datei unter `dist/`, damit ein Test
zeigen kann, dass Menüs und Kontextmenü aus dem Register erzeugt werden), danach
`document.documentElement.dataset.bereit = "1"`; unbekannter Zustand → Leerer Zustand mit Befund.

| Zustand | Zeigt |
| --- | --- |
| `leer` | neues Teil ohne Elemente, Leerer Zustand mit einem nächsten Schritt |
| `halter` | Halter, keine Auswahl, Eigenschaften zeigen das Teil |
| `auswahl` | Grundplatte gewählt: Kontur, Griff, Kontextaktionen, Eigenschaften, Chat „zu: Grundplatte“ |
| `mehrfach` | Grundplatte und Steg gewählt, Eigenschaften mit gemeinsamen Feldern |
| `zustaende` | alle Elementzustände gleichzeitig an verschiedenen Elementen (Steg überfahren, Grundplatte gewählt, Bohrungen fehlerhaft, Skizze ausgeblendet, Testperson B am Deckel im zweiten Reiter) |
| `aktiv` | Sensorgehäuse, Gehäuse aktiv, Rest gedimmt, Pfad „Sensorgehäuse › Baugruppe 1 › Gehäuse“ |
| `isoliert` | Halter, Steg isoliert |
| `kontextmenue` | Kontextmenü auf der Grundplatte offen |
| `menue` | Dropdown „Bearbeiten“ offen |
| `ziehen` | Griff „Dicke“ beim Ziehen, Zahl am Zeiger |
| `ablegen` | Deckel über „Baugruppe 1“ gezogen, Ziel erlaubt |
| `ablegen-verboten` | Baugruppe 1 über ihr eigenes Teil gezogen, Ziel verboten, Grund in der Rückmeldezeile |
| `ausgeblendet` | Steg ausgeblendet |
| `verworfen` | Bohrungen verworfen, „Verworfenes zeigen“ an |
| `rechnet` | Grundplatte „rechnet“ |
| `befund` | Bohrungen fehlerhaft, Panel „Befunde“ offen, Befund mit Korrektur |
| `andere` | Testperson B am Steg, Zeiger im Modell |
| `chat` | Chat mit Kontext „zu: Steg“ und Entscheidungskarte (simuliert) mit Geister-Vorschau |
| `suche` | Suche offen mit Eingabe „ver“ |
| `fokus` | Tastaturfokus auf der Zeile „Steg“ der Struktur |
| `perspektive` | Halter perspektivisch |
| `kanten` | Halter in Darstellung Kanten |

### Testschnittstelle

- `window.__cee` (nur lesend): `bereit`, `zustand`, `modell()`, `modellHash()`, `auswahl()`, `protokoll()`
  (Einträge `{befehl, parameter, quelle, weg}` mit `weg` ∈ menue, kuerzel, kontextmenue, kontextaktion, suche,
  eigenschaften, griff, struktur, chat), `befehle()`, `teil()` (`{abmessungen_mm, volumen_mm3, masse_g}`),
  `ansicht()` (`{aktiv, pfad, ausgeblendet, isoliert, darstellung, projektion, profil, kamera, projektion_von(id)}`),
  `zustaende(id)` (je Darstellung die aktiven Zustände und gezeichneten Kanäle mit Token-Namen). Aktionen nur über
  echte Eingaben, außer `window.__ceeEingabe.ansicht({tx, ty, tz, rx, ry, rz})` (Ansichtseingabe, wie bisher).
- Prüfwerkzeug: `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> --json` (lokale Vorschau,
  headless Chromium, 1440 × 900):

| Befehl | Ausgabe |
| --- | --- |
| `zustaende --out <dir>` | je Testzustand und Thema PNG und `{zustand, thema, datei, bereit_ms, eingaben}` |
| `fenster` | je Zustand Lage und Größe der Zonen, Inhalte der Menüleiste, Schalter-Wirkung |
| `elementzustaende` | je Zustand und Darstellung (Modell, Struktur, Chat, Pfad) gezeichnete Kanäle, Tokens, Pixelfarbe an der Kontur |
| `auswahl` | Klickfolgen (Klick, Umschalt, Mod, Leere, Esc, Mod+A, Doppelklick) aus Struktur und Modell → `auswahl()` und Anzeige in allen Zonen |
| `crud` | je Operation und Weg: protokollierter Befehl, Verlaufseinträge, Rückgängig aus jeder Zone |
| `kontextmenue` | je Auswahlart Einträge in Struktur und Modell, Gruppen, Größe, Kontextaktionen |
| `navigation` | Kamera vor/nach Drehen, Verschieben, Zoomen je Gerät und Profil; Einpassen, auf Auswahl, Projektion |
| `ziehen` | Griff (Werte, Zahl am Zeiger, Tippen, Esc) und Ziehen & Ablegen (Ziele, erlaubt/verboten, Esc) |
| `sichtbarkeit` | Auge, `modellHash()` vorher/nachher, Nachfahren, Alles einblenden |
| `rueckmeldung` | Orte von Status, Befund, Rückmeldung; Bedienbarkeit anderer Elemente bei Fehler |
| `tastatur` | Tab-Reihenfolge, F6, Esc-Kette, Enter, Kürzel aus dem Register |
| `anwesenheit` | Speicher (Storage, IndexedDB, Cookies) und Anfragen nach dem Zustand `andere` |
| `neuladen` | Kamera, Auswahl, Ausblenden, `modellHash()` und Elementliste vor/nach Neuladen; gespeicherte Ansicht nach Neuladen |
| `katalog --out <dir>` | je Baustein Seite, Bild hell/dunkel, Regeltext, Bezug |
| `budget` | je Zustand Dialoge, Farben außerhalb der Tokens, Akzent an unzulässiger Stelle, Bedienelemente ohne `data-befehl`, Hover-only-Elemente, Zahl der Kürzel |
| `texte` | feste Texte, fehlende Schlüssel, Git-Begriffe, Zahlen ohne Einheit |
| `ablauf <aufgabe>` | Endzustand der Pilotaufgabe, Soll erreicht |
| `anfragen` | Netzanfragen an fremde Hosts |
| `messen` | `auswahl_p95_ms`, `hover_p95_ms`, `kontextmenue_p95_ms`, `ablegen_p95_ms`, `wert_live_p95_ms`, `suche_p95_ms` (je 20 Messungen) |

### Leistung (ubuntu-latest, headless Chromium, 1440 × 900)

| Kennzahl | Schwelle |
| --- | --- |
| `auswahl_p95_ms` – Klick bis Auswahl in Struktur, Modell, Eigenschaften und Chat gezeichnet | < 100 ms |
| `hover_p95_ms` – Überfahren bis Hervorhebung auf der Gegenseite | < 100 ms |
| `kontextmenue_p95_ms` – Rechtsklick bis Menü gezeichnet | < 100 ms |
| `ablegen_p95_ms` – Loslassen bis Struktur neu gezeichnet | < 100 ms |
| `wert_live_p95_ms` – Tastendruck im Wertfeld bis Modell und Volumen neu gezeichnet | < 100 ms |
| `suche_p95_ms` – Tastendruck bis Ergebnisliste gezeichnet | < 100 ms |
| `bereit_ms` je Zustand | ≤ 3.000 ms |

Gezeichnet = zweites `requestAnimationFrame` nach der Eingabe. Die Tests messen selbst nach (Median aus 3 Läufen
von `pruefen -- messen --json`). Bildrate beim Drehen wird im CI nicht gemessen, nur im Pilotlauf beurteilt.

### Tokens, Schrift, Texte

Farben, Schrift, Abstände nur aus `docs/design/tokens.json` (erzeugt nach `src/erzeugt/`), keine Literale
außerhalb davon; Inter und JetBrains Mono lokal; alle Texte über Schlüssel in `de.json`/`en.json` (Code und
Schlüssel englisch oder als Bezeichner, Oberfläche Deutsch und Englisch); Begriffe aus `docs/glossar.md`; keine
Git-Begriffe, kein „Speichern“. Jede angezeigte Zahl mit Einheit (ADR-057). Simuliertes (KI, Testperson B,
Simulation) trägt sichtbar „simuliert“.

### Pilotaufgaben (`docs/spikes/ux-prototyp-2.md`)

Gliederung wie bisher (Ziel, Rahmen, Ablauf, Aufgaben, Erfolgskriterium, Ergebnisbogen, Nachbefragung,
Auswertung, Datenschutz). Aus dem alten Pilotlauf A–H bleiben nur E, F, G und H (angepasst); A (Grundplatte
skizzieren und extrudieren), B (Verrunden), C (Verbindung) und D (Entwürfe) entfallen, weil sie Funktionen
statt Grundlagen prüfen. Aufgaben, Zeiten und Gate entschieden (Open Questions 10); Texte passt das Kernteam nach dem eigenen
Pilotlauf einmal an.

| Aufgabe | Text | Start | Sollzustand | Zeit |
| --- | --- | --- | --- | --- |
| E | „Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“ | `halter` | richtige Antwort | 2 min |
| F | „Lass dir vom Programm helfen: Der Steg soll 40 mm hoch werden. Schau dir das Ergebnis an, bevor es gilt.“ | `halter` | Vorschlag übernommen (Protokoll `quelle: ki`), Steg 40 mm | 3 min |
| G | „Mach im Halter die Grundplatte 100 mm lang und geh danach zurück zum ganzen Teil.“ | `halter` | Länge 100 mm, nichts aktiv, Volumen 57,49 cm³ | 3 min |
| H | „Zeig das Teil nur mit seinen Kanten.“ | `halter` | Darstellung Kanten | 1 min |
| I | „Wähle Grundplatte und Steg gemeinsam und blende beide aus. Hol sie danach wieder zurück.“ | `halter` | beide kurz ausgeblendet, am Ende beide sichtbar, Modell unverändert | 2 min |
| J | „Mach eine Kopie des Stegs, nenn sie ‚Steg 2‘, und wirf sie dann wieder weg. Merkst du, dass sie nicht endgültig weg ist?“ | `halter` | „Steg 2“ verworfen, nicht gelöscht | 3 min |
| K | „Der Deckel soll mit zur Baugruppe gehören.“ | Sensorgehäuse | Deckel in Baugruppe 1 | 2 min |
| L | „Etwas am Halter ist fehlerhaft. Finde es und behebe es.“ | `befund` | Bohrungen aktuell, Befund weg | 3 min |

Erfolgskriterium je Aufgabe: Sollzustand, innerhalb der Zeit, ohne Hilfe. Gate: 4 von 5 Testpersonen
lösen G, I, J und K (Open Questions 10). Nachbefragung: „Woran erkennst du, was gewählt ist?“, „Wo findest du,
was du mit dem Gewählten tun kannst?“, „Was passiert, wenn etwas schiefgeht?“.

### Klickbarer Stand nach jeder Gruppe

Jede Task-Gruppe endet mit „Vorschau bauen und Klick-Anleitung im PR aktualisieren“: `bash
spikes/ux-prototyp-2/build.sh && npm --prefix spikes/ux-prototyp-2 run preview`; die PR-Beschreibung bekommt unter
„Klick-Anleitung“ 3–6 Schritte in Alltagssprache mit Startadresse und dem, was zu sehen sein muss. Die Anleitung
nennt nur, was schon funktioniert.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-41b-ux-bedienkonzept/`, neu zu schreiben)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | `build.sh`, Lint, Vitest, `dist/`, Abhängigkeiten, Lizenzen, `anfragen` | Eigenständiger Prototyp |
| AK-2 | `zustaende`: 22 Zustände × 2 Themen, `bereit_ms`, 0 Eingaben; unbekannter Zustand | Testzustände per Adresse |
| AK-3 | `fenster`: Zonen, Maße, Menüleiste, Schalter, Dokument-Reiter, keine Befehlsreiter | Fensteraufbau |
| AK-4 | `elementzustaende`: Kanäle, Tokens, gleiche Zustände in allen Darstellungen, Vorrang | Elementzustände |
| AK-5 | `auswahl`: ein Zustand, Klickfolgen, Teil/Baugruppe, Anzeige in allen Zonen | Eine Auswahl für alles |
| AK-6 | `crud`: ein Befehl je Operation über alle Wege, Verwerfen statt Löschen, Rückgängig überall | Anlegen, ändern, verwerfen |
| AK-7 | `kontextmenue` und Abgleich mit dem Befehlsinventar (Referenzdaten) | Kontextmenü aus dem Register |
| AK-8 | `navigation` | Navigation im Modell |
| AK-9 | `ziehen` | Ziehen |
| AK-10 | `sichtbarkeit` | Ausblenden und Einblenden |
| AK-11 | `rueckmeldung` | Rückmeldung und Fehler |
| AK-12 | `tastatur` | Tastatur und Fokus |
| AK-13 | `anwesenheit` | Andere Personen nur live |
| AK-14 | `budget`, `texte`, Tokens | Einheiten, Texte und Tokens |
| AK-15 | `katalog` | Bausteinkatalog |
| AK-16 | `ablauf e…l`, `messen`, Leitfaden | Pilotaufgaben und Reaktion |
| AK-17 | `neuladen` | Ansicht ist flüchtig, Speichern ist ausdrücklich |

### Veraltete Abnahmetests und Dateien (nicht in diesem Change geändert)

Alle Dateien unter `tests/acceptance/ap-41b-ux-bedienkonzept/` prüfen den Stand nach ADR-063 und **veralten**;
`ux2_helpers.py` hängt an Zonen `kopf`, `aufbau`, `inspektor`, `rueckmeldung` und 17 alten Zuständen, deshalb
fallen auch inhaltlich passende Tests mit:

| Datei | Bewertung |
| --- | --- |
| `test_ux2_zonen.py`, `test_ux2_auswahl.py`, `test_ux2_inspektor.py`, `test_ux2_orte.py`, `test_ux2_ki_simulation.py`, `test_ux2_zustaende.py`, `test_ux2_ablaeufe.py`, `test_ux2_befehle.py`, `test_ux2_budget.py`, `test_ux2_darstellung_kontext.py`, `test_ux2_leitfaden.py`, `ux2_helpers.py` | veraltet (fünf Zonen, Inspektor, Aufbau, Gespräch statt Chat, Paket Simulation, Aufgaben A–D, ≤ 10 Kürzel, Kontextleiste mit eigener Liste) |
| `test_ux2_bau.py`, `test_ux2_tokens_texte.py`, `test_ux2_lesbarkeit.py`, `test_ux2_navigation.py` | veraltet wegen der Helfer, Inhalt als Vorlage brauchbar (Bauen, Lizenzen, Anfragen, Tokens, Git-Begriffe, Licht/Kanten, Drehen/Schieben/Zoomen) |

Ebenso veraltet: der Code auf `change/ap-41b-ux-bedienkonzept` (PR #51) und dessen Klick-Anleitung.

## Risks / Trade-offs

- **Umfang:** Neun Grundlagen plus Fensteraufbau und Katalog sind viel für drei Nächte. Gegenmittel: Übernahme
  von Geometrie, 3D-Lesbarkeit, Wertfeld, i18n und Register; keine neuen Formelemente; Gruppen so geschnitten,
  dass nach jeder Nacht ein klickbarer Stand bleibt.
- **Kürzel im Browser:** Mod+J (Downloads in Chromium) und Mod+B lassen sich in manchen Browsern nicht immer
  abfangen; in Tauri gibt es das Problem nicht. Schlägt es im Prototyp fehl, ist das ein Punkt für „Offene
  Fragen“ im PR, kein Grund, das Kürzel zu ändern.
- **Trackpad und Touch im CI** sind nur über synthetische Ereignisse prüfbar; das echte Gefühl ist `[mensch]`.
- **Pixelmessungen** im Software-Rendering: Schwellen mit Abstand; bei Fehlschlag trotz guter Darstellung
  „Offene Fragen“ im PR, nie schwächere Tests.
- **Prototyp zu gut:** einfache Körper, simulierte KI und Anwesenheit; der Bericht nennt Abweichungen.

## Open Questions

Stand 2026-10-23: Das Kernteam hat die Fragen 1–5, 7–10, 12, 15 und 17 im Gespräch entschieden (im Bericht an
das Kernteam als Punkte 1–10 nummeriert, dazu Befehlsinventar und Elementtyp). Für 6, 11, 13, 14 und 16 gilt der
Standardvorschlag, bis das Kernteam anders entscheidet.

1. **Ausblenden nur für mich?** **Entschieden (Kernteam, 2026-10-23):** Ja. Ansicht (auch Ausblenden und Auswahl)
   ist flüchtig und je Person; geteilt wird nur über „Ansicht speichern“ (Abschnitt „Ansicht ist flüchtig“).
2. **Kontextaktionen und Kontextmenü:** **Entschieden (Kernteam, 2026-10-23):** Das Kontextmenü (Rechtsklick) hat
   Gruppen mit höchstens 12 Einträgen; die Leiste über dem Gewählten zeigt dessen ersten fünf.
3. **Aussehen „von anderen bearbeitet“:** **Entschieden (Kernteam, 2026-10-23):** Option 1, gestrichelte neutrale
   Kontur (`linie-stark`) und Namensschild; Vorrangregel ausgewählt > andere > überfahren, Status immer zusätzlich:
   Ja.
4. **Was wählt ein Klick?** **Entschieden (Kernteam, 2026-10-23):** die nächste Ebene unter dem aktiven Element (in
   der Baugruppe das Teil, im aktiven Teil der Schritt bzw. die Kante); Doppelklick geht hinein.
5. **Kürzel:** **Entschieden (Kernteam, 2026-10-23):** Ja – F2 Umbenennen, Mod+D Duplizieren, Entf Verwerfen, Mod+A
   Alles, F Auf Auswahl zoomen, H/Alt+H Ausblenden/Alles einblenden, W Darstellung, F6 nächste Zone (zusammen 14,
   unter 15).
6. **Ist Ausblenden, Auswahl oder Kamera ein Rückgängig-Schritt?** **Standardvorschlag gilt** (nicht vom Kernteam
   einzeln entschieden): Nein, nur Änderungen am Modell (passt zu „Ansicht ist flüchtig“).
7. **Projektion beim Start:** **Entschieden (Kernteam, 2026-10-23):** orthogonal.
8. **Zweites Navigationsprofil:** **Entschieden (Kernteam, 2026-10-23):** Option 1, „wie Onshape/SolidWorks“;
   Standardprofil nach der Tabelle oben.
9. **Alter Stand:** **Entschieden (Kernteam, 2026-10-23):** Ja – PR #51 ohne Merge schließen,
   `change/ap-41b-ux-bedienkonzept` nach dem Merge dieser Spec neu von `main` aufsetzen, Code daraus nur gezielt
   übernehmen.
10. **Pilotaufgaben und Gate:** **Entschieden (Kernteam, 2026-10-23):** Ja – Aufgaben E–L und Zeiten nach der
    Tabelle; Gate über G, I, J, K (4 von 5 Testpersonen); das Kernteam passt Texte nach dem eigenen Pilotlauf einmal
    an.
11. **Neue Muster (ADR-061):** **Standardvorschlag gilt** (nicht vom Kernteam einzeln entschieden): Elementzustände,
    Kontextmenü, Dropdown, Ziehen & Ablegen, Auge, Pfad, Dokument-Reiter, Ansichtsleiste sind Kandidaten im
    Bausteinkatalog; nach dem Pilotlauf per ADR in `muster.md` aufnehmen, „Arbeitsbereiche“ und „Kontextaktionen“
    nach ADR-065 anpassen.
12. **Schritte per Ziehen umordnen?** **Entschieden (Kernteam, 2026-10-23):** Nein in diesem Change.
13. **Rückmeldezeile:** **Standardvorschlag gilt** (nicht vom Kernteam einzeln entschieden): Ja, schmale Zeile am
    unteren Fensterrand (ADR-065 nennt keine, das Muster „Rückmeldung“ verlangt sie).
14. **Kernteam-Dateien nachziehen:** **Standardvorschlag gilt** (nicht vom Kernteam einzeln entschieden):
    `docs/rules/client.md` und `docs/design/leitbild.md` nach der Abnahme auf einem Branch `adr/…` an ADR-065
    anpassen.
15. **Befehlsinventar:** **Entschieden (Kernteam, 2026-10-23):** Ja – das Kernteam legt die Beta-Befehle mit Familie
    als `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` ab (über den Branch `tests/…`, nicht in dieser
    Spec); der Abgleich ist ein `[auto]`-Kriterium.
16. **Taskleiste „Simulation“:** **Standardvorschlag gilt** (nicht vom Kernteam einzeln entschieden): Ja, nur
    Platzhalter, der Menüs und Struktur umschaltet (Leerer Zustand, gekennzeichnet „simuliert“).
17. **Gespeicherte Ansicht als Elementtyp:** **Entschieden (Kernteam, 2026-10-23):** Ja – `view` wird Grundtyp im
    Kern (Liste in `format/`, Glossar; Nachtrag durch das Kernteam).
