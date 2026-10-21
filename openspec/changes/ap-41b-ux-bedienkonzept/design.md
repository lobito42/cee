## Context

Siehe proposal.md – Why. Grundlagen:

- **ap-41-ux-prototyp** (`openspec/changes/ap-41-ux-prototyp/`, PR #32, Code `spikes/ux-prototyp/` auf Branch
  `change/ap-41-ux-prototyp`): Aufgaben A–F, Testleitfaden (`docs/spikes/ux-prototyp.md` auf demselben Branch),
  Befehlsregister, Wertfeld, i18n, Token-Erzeugung, Prüfwerkzeug. Pilotlauf TP1 am 2026-10-21: No-Go
  (3D kaum lesbar, Baum und Modell unverbunden, keine Leitidee).
- **Freigegebenes Bedienkonzept des Kernteams** (unten wörtlich zusammengefasst; verbindlich für diesen Change).
- **Referenzbilder des Konzepts** (Anschauung, kein Vertrag): https://claude.ai/artifact/MeTNBuRhmZvfshKHkcJdDU
- **Leitbild** `docs/design/leitbild.md` (fünf Grundbegriffe, ein Ablauf, Komplexitätsbudget, KI an der Auswahl),
  **Musterkatalog** `docs/design/muster.md` (19 Muster), **Tokens** `docs/design/tokens.json`.
- ADR-021, ADR-022, ADR-044, ADR-045, ADR-050, ADR-051, ADR-052, ADR-054, ADR-057, ADR-060, ADR-061, ADR-062.

### Bedienkonzept (freigegeben, verbindlich)

1. **Ein Bildschirm, fünf Zonen:** Kopfzeile (Pfad „Halter › Grundplatte › Skizze“, Arbeitsbereich-Reiter,
   *ein* Feld „Suchen oder fragen“ Strg K, Rückgängig mit sichtbarem Kürzel), links Aufbau (Featurebaum als
   Schritte von oben nach unten, Skizzen als Unterzeilen), Mitte Modell, rechts Inspektor, unten leise
   Rückmeldezeile. Grundregel: erst wählen, dann tun.
2. **Auswahl ist synchron:** Klick auf eine Fläche wählt den Schritt, der sie erzeugt hat, und markiert ihn im
   Aufbau; Überfahren im Aufbau hebt die Geometrie hervor und umgekehrt (Hover nur als Zusatz, keine Funktion
   hängt daran).
3. **Zahlen an einem Ort:** Dauerhaft stehen Werte nur im Inspektor (echte Wertfelder, Änderung live beim
   Tippen, Enter übernimmt, Esc bricht ab). Am Modell nur Griffe (Pfeile) am gewählten Schritt; beim Ziehen
   erscheint die Zahl kurz am Zeiger, Tippen während des Ziehens setzt den genauen Wert (ADR-044). In der Skizze
   sind Maße Teil der Zeichnung; Klick auf ein Maß fokussiert das Feld im Inspektor.
4. **Inspektor** zeigt immer das Gewählte, ohne Auswahl das ganze Teil (Material, Abmessungen, berechnetes
   Volumen/Masse). Gruppen „Maße“ und „Aus der Skizze“; Knopf „Skizze bearbeiten“.
5. **Drei Ebenen des Umschaltens**, jede an festem Ort: Arbeitsbereich (Reiter oben), Ort (Teil/Skizze:
   Doppelklick auf Fläche oder Aufbauzeile geht hinein, Pfad zeigt wo, „Fertig“/Esc/Klick im Pfad geht hinaus; in
   der Skizze sind spätere Schritte ausgegraut, spätere Geometrie gestrichelt), Darstellung (Körper/Kanten/
   Durchsicht unten rechts im Modell, Taste W).
6. **Kontextaktionen** erscheinen über dem Gewählten (z. B. Skizze bearbeiten, Ausblenden, Verwerfen); derselbe
   Inhalt per Rechtsklick und 3D-Maus-Taste.
7. **Erweiterungen bringen keine eigenen Fenster:** Reiter, eigene Schritte im Aufbau, Darstellung im Modell mit
   Legende, Werte im Inspektor, Befehle in Suche und Kontextleiste. Im Prototyp ein simuliertes Beispielpaket
   „Simulation“ (Lager, Kraft, Ergebnis als Farbdarstellung; Ergebnis simuliert, als solches gekennzeichnet).
8. **Eingabe:** 3D-Maus bewegt nur die Ansicht (immer, auch während des Ziehens); Maus wählt/zieht;
   Navigationsprofile als Einstellung. Im Prototyp: Drehen/Schieben/Zoomen mit Maus nach Profil „Standard“,
   3D-Maus nur falls per WebHID einfach möglich, sonst offene Frage.
9. **KI im selben Feld:** Befehl gefunden → ausführen; Wunsch → Gespräch erscheint an der Stelle des
   Inspektors; Vorschlag als Entscheidungskarte mit Geister-Vorschau, Übernehmen/Verwerfen; danach ein normaler
   Schritt im Aufbau. KI im Prototyp simuliert und gekennzeichnet.
10. **3D-Darstellung gut lesbar:** gerichtetes Licht mit Schattierung der Flächen, sichtbare Kanten,
    Auswahlkontur in Akzentfarbe, Drehen/Zoomen, Ansicht einpassen.

Beispielteil: Halter (Grundplatte 80 × 50 × 8 mm mit Ecken R 3, Steg 60 × 10 × 30 mm, zwei Bohrungen Ø 6),
änderbar und neu berechnet (Quader/Zylinder reichen, kein echter Kernel).

## Goals / Non-Goals

**Goals:** Ein klickbarer Prototyp, an dem Testpersonen ohne Einweisung die Leitidee „erst wählen, dann tun“
erfassen und die Aufgaben A–H lösen; die zehn Punkte des Konzepts sind automatisch geprüft, soweit messbar
(Playwright, Pixel- und Zeitmessungen), der Rest ist `[mensch]`. Lesbarkeit und Zusammenhang werden diesmal
**gemessen** (Helligkeitsunterschiede, Kanten, Kontur, synchrone Auswahl), nicht nur gezählt. Nach jeder
Task-Gruppe gibt es eine Vorschau, die das Kernteam ohne Code-Kenntnis anklicken kann.

**Non-Goals:** siehe proposal.md – Impact. Wegwerf-Code: beweist Bedienbarkeit, nicht Architektur.

## Decisions

### Ablage: `spikes/ux-prototyp-2/` (neuer Ordner)

Entschieden für einen neuen Ordner statt `spikes/ux-prototyp/`:

- Auf `main` liegen die Abnahmetests `tests/acceptance/ap-41-ux-prototyp/`, die `spikes/ux-prototyp/` prüfen
  (u. a. genau fünf Werkzeuge, 13 Zustände). Ein Umbau im selben Ordner würde diese Tests brechen; Tests dürfen
  nicht geändert oder gelöscht werden.
- `spikes/ux-prototyp/` liegt nur auf dem offenen Branch von PR #32. Ein eigener Ordner macht ap-41b unabhängig
  davon, ob und wann das Kernteam PR #32 schließt oder mergt; Agenten auf `change/ap-41b-…` müssen den fremden
  Branch nicht auschecken, sondern holen die Dateien gezielt (`git show origin/change/ap-41-ux-prototyp:<pfad>`).
- Beide Prototypen bleiben für einen Vorher-nachher-Vergleich im Bericht nebeneinander lauffähig.

Leitfaden entsprechend `docs/spikes/ux-prototyp-2.md`.

### Übernahme aus ap-41

Kopiert und angepasst (nicht verlinkt), Quelle Branch `change/ap-41-ux-prototyp`:

| Aus `spikes/ux-prototyp/` | Nach `spikes/ux-prototyp-2/` | Anpassung |
| --- | --- | --- |
| `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `.prettierrc.json`, `build.sh` | gleich | Name `@cee/ux-prototyp-2`, Beschreibung ap-41b |
| `scripts/tokens.mjs`, `src/erzeugt/` | gleich | keine |
| `src/i18n/` | gleich | neue Schlüssel; Werkzeug-Schlüssel entfallen |
| `src/modell/register.ts` (Befehlsregister, Protokoll, Rückgängig) | gleich | Befehle nach Tabelle unten |
| `src/wert/wertfeld.ts` | gleich | zusätzlich Dimension Kraft (`N`, `kN`) |
| `pruefen/index.mjs` | gleich | Befehle nach Tabelle „Testschnittstelle“ |

Neu gebaut: Layout, Aufbau, Modell (three.js-Szene, Licht, Kanten, Navigation, Griffe), Inspektor, Kontext-
aktionen, Orte, Darstellungen, Gespräch, Beispielpaket, Testzustände, simulierte Geometrie des Halters.

### Aufbau des Projekts

```
spikes/ux-prototyp-2/
  build.sh  package.json  …          wie ap-41
  scripts/tokens.mjs  src/erzeugt/   wie ap-41
  src/befehle.json                   Befehlsregister als Daten
  src/i18n/de.json en.json           Übersetzungen
  src/modell/                        Elemente, Schritte, Register, Rückgängig, Entwürfe
  src/geometrie/                     Halter aus Quadern/Zylindern, Volumen, Abmessungen (rein, mit Vitest)
  src/ansicht/                       three.js: Szene, Licht, Kanten, Kontur, Navigation, Griffe, Darstellungen
  src/eingabe/                       Eingabeschicht: Maus-Profil „Standard“, Ansichtseingabe (6 Achsen)
  src/zonen/                         Kopfzeile, Aufbau, Inspektor, Rückmeldezeile, Kontextaktionen, Gespräch
  src/pakete/simulation/             Beispielpaket über dieselben Andockstellen
  src/ki/                            Simulation der Absichten
  src/zustaende/                     Testzustände
  pruefen/                           Prüfwerkzeug (Playwright)
```

Ohne UI-Framework (TypeScript und DOM), Laufzeit-Abhängigkeiten nur `three`, `lucide`,
`@fontsource-variable/inter`, `@fontsource/jetbrains-mono`. Statische Seite, keine Anfrage an fremde Hosts.
Layout Desktop ab 1280 × 800 px; Bezugsgröße 1440 × 900 px. Kürzel nach Plattform (Cmd auf macOS, sonst Strg).

### Fünf Zonen (Maße bei 1440 × 900 px)

| Zone | Attribut | Lage und Größe | Inhalt |
| --- | --- | --- | --- |
| Kopfzeile | `data-zone="kopf"` | oben, volle Breite, Höhe ≤ 56 px | Pfad, Arbeitsbereich-Reiter, Feld „Suchen oder fragen“ mit Kürzel, Rückgängig mit sichtbarem Kürzel (z. B. „Strg Z“, auf macOS „⌘Z“) |
| Aufbau | `data-zone="aufbau"` | links, Breite 220–320 px | Schritte in Reihenfolge, Skizzen als eingerückte Unterzeilen; Ursprung mit Ebenen oben |
| Modell | `data-zone="modell"` | Mitte, ≥ 50 % der Fensterfläche | three.js; unten rechts Umschalter Darstellung; Knopf Ansicht einpassen |
| Inspektor | `data-zone="inspektor"` | rechts, Breite 260–360 px | Gewähltes oder Teil; bzw. Gespräch (siehe KI) |
| Rückmeldezeile | `data-zone="rueckmeldung"` | unten, volle Breite, Höhe ≤ 32 px | Muster Rückmeldung, leise |

Aufbau und Inspektor sind die zwei Panels des Komplexitätsbudgets (`data-panel`). Es gibt keine Werkzeugleiste
(siehe Open Questions 1), keine Menüleiste, keinen modalen Dialog.

### Beispielteil Halter (Sollwerte)

Koordinaten: Ursprung in der Mitte der Unterseite der Grundplatte, X Länge, Y Breite, Z Höhe. Zahlen als Größe
`{"value": …, "unit": "mm"}` (ADR-057). Elemente in der Elementform (`id`, `type`, `params`, `content`, `meta`).

| Schritt (Aufbau) | Unterzeile | Parameter |
| --- | --- | --- |
| Grundplatte (Extrusion) | Skizze (auf XY): Rechteck Länge 80 mm × Breite 50 mm, Eckradius 3 mm | Dicke 8 mm |
| Steg (Extrusion) | Skizze (auf Oberseite Grundplatte): Rechteck Länge 60 mm × Breite 10 mm | Höhe 30 mm |
| Bohrungen (Bohrung, 2 ×) | Skizze (auf Oberseite Grundplatte): zwei Mittelpunkte | Durchmesser 6 mm, durchgehend |

**Annahmen zur Lage** (nicht im Konzept, Open Questions 7): Steg mittig in X, an der hinteren Langseite bündig
(Y 15 … 25 mm), auf der Grundplatte (Z 8 … 38 mm); Bohrungen bei X = ±25 mm, Y = −7,5 mm. Material „PLA“ mit
Dichte 1,24 g/cm³.

**Volumen** (L, B, T Grundplatte; r Eckradius; d Bohrung; l, b, h Steg):
`V = L·B·T − 4·r²·(1 − π/4)·T − 2·π·(d/2)²·T + l·b·h`, abzüglich Verrundungen `n·r_v²·(1 − π/4)·Kantenlänge`.

| Stand | Volumen | Masse (1,24 g/cm³) | Abmessungen |
| --- | --- | --- | --- |
| Ausgangsstand | 49.485,81 mm³ = 49,49 cm³ | 61,36 g | 80 × 50 × 38 mm |
| Länge 100 mm (Aufgabe G) | 57.485,81 mm³ = 57,49 cm³ | 71,28 g | 100 × 50 × 38 mm |
| Steg Höhe 40 mm, zwei Längskanten oben R 3 (Aufgabe B) | 55.254,04 mm³ = 55,25 cm³ | 68,52 g | 80 × 50 × 48 mm |

Toleranz der Anzeige gegen die Formel: ± 0,1 %. Neuberechnung bei jeder Wertänderung (auch live beim Tippen),
Darstellung aus Quadern, Zylindern und abgerundeten Quadern (`RoundedBoxGeometry`, Bohrungen als dunkle
Zylinderflächen bzw. per einfacher CSG ist frei). Jede Fläche trägt die ID des Schritts, der sie erzeugt.

Zweites Testprojekt für Aufgabe C, unverändert aus ap-41: „Sensorgehäuse“ mit Gehäuse (Quader 80 × 50 × 30 mm,
Schale 2 mm, oben offen, Verbindungspunkt „Oberkante“) und Deckel (80 × 50 × 4 mm, Verbindungspunkt
„Unterseite“).

### 3D-Darstellung (Punkt 10)

- **Licht:** ein gerichtetes Licht (Hauptlicht schräg von oben vorn links) plus schwaches Umgebungs- oder
  Halbkugellicht; Anteil des Umgebungslichts ≤ 40 % der Gesamtintensität. Flächen mit `MeshStandardMaterial`
  bzw. `MeshLambertMaterial`, flach schattiert. Körperfarbe aus Token `flaeche-2`, Hintergrund `viewport`.
- **Kanten:** Körperkanten als Linien (`EdgesGeometry`, Schwellwinkel 30°) in `linie-stark`, Breite aus Token
  `linie.breite`; Kanten haben eine Trefferzone von mindestens 8 px.
- **Auswahl:** Kontur in `akzent` um den gewählten Schritt (bzw. die gewählte Kante), Überfahren als dünne
  Kontur (Muster „Auswahl im Modell“).
- **Navigation, Profil „Standard“:** rechte Taste ziehen = drehen um den Mittelpunkt des Teils; mittlere Taste
  ziehen = schieben; Rad = zoomen zum Zeiger; Rechtsklick ohne Bewegung (< 4 px) öffnet die Kontextaktionen;
  linke Taste wählt bzw. zieht Griffe. Das Profil ist eine Einstellung (`einstellung.navigationsprofil =
  "standard"`), weitere Profile gibt es im Prototyp nicht.
- **Einpassen:** Befehl `ansicht.einpassen` (Knopf im Modell und Suche); danach füllt die projizierte
  Hüllbox 60–90 % der kürzeren Seite der Modellzone, Mitte auf ± 5 % der Zonengröße. Startansicht isometrisch,
  eingepasst.
- **Darstellungen:** `koerper` (Flächen + Kanten), `kanten` (nur Kanten, verdeckte Kanten dünner), `durchsicht`
  (Flächen mit Deckkraft 0,3 + alle Kanten). Umschalter unten rechts (Muster Auswahlfeld), Taste W schaltet der
  Reihe nach.

### Eingabeschicht (Punkt 8)

`src/eingabe/` trennt Quellen: Maus (wählen, ziehen, Navigation nach Profil) und **Ansichtseingabe mit sechs
Achsen** (später 3D-Maus). Die Ansichtseingabe wirkt nur auf die Kamera, auch während eine Griff-Bewegung läuft,
und ändert nie Auswahl, Ort oder Werte. Weil im CI keine 3D-Maus steckt, nimmt die Schicht zum Testen Ereignisse
über `window.__ceeEingabe.ansicht({tx, ty, tz, rx, ry, rz})` an – die einzige schreibende Testschnittstelle, auf
diesen Zweck beschränkt. Eine Anbindung über WebHID ist nicht Pflicht (Open Questions 6).

### Auswahl und Überfahren (Punkt 2)

- Klick auf eine Fläche wählt den **Schritt**, der sie erzeugt hat; der Schritt ist im Aufbau markiert
  (`aria-selected="true"`) und im Modell konturiert. Klick auf eine Kante wählt die **Kante**; ihr Schritt ist im
  Aufbau als zugehörig markiert (`data-zugehoerig`). Umschalt+Klick erweitert die Auswahl. Klick ins Leere hebt
  die Auswahl auf.
- Überfahren einer Aufbauzeile hebt die Geometrie des Schritts hervor, Überfahren einer Fläche hebt die
  Aufbauzeile hervor (`data-hervorgehoben`). Keine Funktion hängt am Überfahren: Es gibt keine Bedienelemente, die
  nur beim Überfahren sichtbar oder bedienbar sind.

### Inspektor (Punkte 3 und 4)

- **Ohne Auswahl:** Gruppe „Teil“ mit Name, Material (fester Wert „PLA“), Abmessungen (X × Y × Z), Volumen
  (cm³), Masse (g); berechnete Werte sind nicht editierbar und als „berechnet“ gekennzeichnet.
- **Schritt gewählt:** Gruppe „Maße“ (Parameter des Schritts, z. B. Dicke), Gruppe „Aus der Skizze“ (Maße der
  Skizze, z. B. Länge, Breite, Eckradius), Knopf „Skizze bearbeiten“ (`ort.skizze-bearbeiten`).
- **Kante gewählt:** Länge der Kante (berechnet) und der Schritt, zu dem sie gehört.
- **Wertfeld:** Änderung wirkt live beim Tippen (Modell, Volumen, Masse; ungültige Zwischeneingaben ändern
  nichts), Enter übernimmt (ein Eintrag in Rückgängig), Esc stellt den Wert vor dem Fokus wieder her. Einheiten
  `mm`, `cm`, `m`, für Kraft `N`, `kN`; Formeln wie ap-41. Fehler als Befund am Feld.

### Griffe und Tippen beim Ziehen (Punkt 3, ADR-044)

Am gewählten Schritt erscheinen Pfeil-Griffe für seine Längen-Parameter (Extrusion: ein Griff für Dicke bzw.
Höhe in Z). Ziehen ändert den Wert in 1-mm-Schritten; die Zahl erscheint am Zeiger (Muster Wertfeld, Teil des
Griffs) und verschwindet ≤ 1.000 ms nach dem Loslassen. Ziffern während des Ziehens setzen den genauen Wert,
Enter oder Loslassen übernimmt, Esc bricht ab (Wert wie vorher). Am Modell stehen sonst keine Zahlen, außer in
der Skizze.

### Orte Teil und Skizze (Punkt 5)

- **Hinein:** Doppelklick auf eine Fläche oder eine Aufbauzeile eines Schritts mit Skizze, Knopf „Skizze
  bearbeiten“ oder Kontextaktion. Die Ansicht dreht sich senkrecht auf die Skizzenebene (Dauer Token
  `bewegung.mittel`).
- **Pfad:** im Teil „Halter“, in der Skizze „Halter › Grundplatte › Skizze“ (Muster-Kandidat Pfad). Davor steht
  als erstes Glied der Stand (siehe Entwürfe). Jedes Glied ist anklickbar; Klick auf „Halter“ geht hinaus.
- **In der Skizze:** Schritte nach dem bearbeiteten sind im Aufbau ausgegraut (`aria-disabled="true"`), ihre
  Geometrie ist gestrichelt (`LineDashedMaterial`), Flächen späterer Schritte sind ausgeblendet. Maße sind Teil
  der Zeichnung (Maßlinien mit Zahl); Klick auf ein Maß fokussiert das passende Wertfeld im Inspektor
  (Gruppe „Aus der Skizze“) mit markiertem Inhalt.
- **Hinaus:** Knopf „Fertig“ (die eine Hauptaktion in der Skizze), Esc oder Klick im Pfad.
- **Neue Skizze (Aufgabe A):** im Leeren Zustand ist „Skizze anlegen“ der eine nächste Schritt (auch über die
  Suche); danach Ebene wählen (Ebenen XY, XZ, YZ im Modell und im Aufbau unter „Ursprung“), Rechteck aufziehen
  (Raster 1 mm), Maße im Inspektor tippen, „Fertig“. Danach bietet die Kontextleiste über der Skizze
  „Extrudieren“ an; Extrudieren zeigt eine Geister-Vorschau mit Griff, Dicke im Inspektor (Vorgabe 10 mm).

### Kontextaktionen (Punkt 6)

Muster Kontextaktionen. Eine Leiste erscheint über dem Gewählten (Unterkante ≤ 24 px über der oberen Kante der
projizierten Hüllbox, horizontal mittig, innerhalb der Modellzone), höchstens 5 Einträge, die häufigsten zuerst;
für einen Schritt mindestens „Skizze bearbeiten“, „Ausblenden“, „Verwerfen“; für eine Skizze nach „Fertig“
„Extrudieren“; für Kanten „Verrunden“. Rechtsklick auf das Gewählte (im Modell oder im Aufbau) zeigt dieselben
Befehle in derselben Reihenfolge. Die 3D-Maus-Taste ist im Prototyp nicht angebunden (Open Questions 6).
„Verwerfen“ blendet den Schritt aus und kennzeichnet ihn als verworfen; nichts wird gelöscht (ADR-051).

### Beispielpaket „Simulation“ (Punkt 7, ADR-054)

Das Paket registriert sich über dieselben Andockstellen wie der Kern des Prototyps (`src/pakete/simulation/`
nutzt nur die Registrierungsfunktionen für Arbeitsbereich, Schritttypen, Inspektor-Gruppen, Darstellung und
Befehle):

- Reiter „Simulation“ neben „Modell“ (Muster Arbeitsbereiche, höchstens 5).
- Schritte im Aufbau unter einer Trennzeile „Simulation“: **Lager** (Unterseite der Grundplatte, fest),
  **Kraft** (Oberseite des Stegs, Vorgabe 100 N in −Y; Annahme), **Ergebnis**.
- Inspektor: Kraft als Wertfeld (N), Richtung als Auswahlfeld (±X, ±Y, ±Z).
- Darstellung „Ergebnis“ im Modell: Farbverlauf über die Flächen, Legende in der Modellzone (Muster-Kandidat
  Legende) mit Skala 0 bis Höchstwert in mm. Der Höchstwert ist erfunden und proportional zur Kraft
  (`0,02 mm je N`, Annahme). Legende und Inspektor zeigen deutlich „Simuliert – kein berechnetes Ergebnis“.
- Befehle `simulation.lager`, `simulation.kraft`, `simulation.ergebnis` in Suche und Kontextleiste.
- Kein eigenes Fenster, kein Dialog, keine eigene Werkzeugleiste, keine eigene Farbe außerhalb der Tokens
  (Farbverlauf Open Questions 9).

### KI im selben Feld (Punkt 9, ADR-021)

- Ein Feld „Suchen oder fragen“ (Strg/Cmd+K). Treffer unter den Befehlen → Enter führt aus. Ein Satz mit mehr als
  drei Wörtern ohne Befehlstreffer wird als erster Eintrag „KI fragen: …“ angeboten (wie ap-41).
- **Gespräch** (Muster-Kandidat) erscheint an der Stelle des Inspektors (gleiche Zone, gleiches Panel): die
  Frage, Statusanzeige „Arbeitet“ mit den Plan-Schritten (1.500 ms, mit `&tempo=0` sofort), „Anhalten“, danach
  die Entscheidungskarte. Kein Verlauf früherer Gespräche, kein zweites Fenster. „Schließen“ oder Esc bringt den
  Inspektor zurück.
- **Entscheidungskarte:** Titel, Geister-Vorschau im Modell, Begründung, Werte vorher/nachher, genutzte Befehle
  als Textzeilen (JetBrains Mono), genau zwei Hauptaktionen Übernehmen und Verwerfen. Übernehmen erzeugt einen
  normalen Schritt im Aufbau (bzw. ändert den Parameter), der danach gewählt ist; der Inspektor zeigt ihn.
- Kennzeichnung: Gespräch und Karte tragen sichtbar „KI simuliert“ und `data-quelle="ki"`.
- **Vorbereitete Absichten** (Schlüsselwörter, Zahl mit Einheit, Deutsch und Englisch):

  | Absicht | Schlüsselwörter (Auszug) | Vorschlag |
  | --- | --- | --- |
  | Maß ändern | länger, breiter, dicker, höher, kürzer, schmaler | `element.wert-setzen` am genannten oder gewählten Schritt (± Zahl) |
  | Abrunden | rund, abrunden, Verrundung, Kanten | `feature.verrunden` an den oberen Kanten des gewählten bzw. genannten Schritts (Radius aus dem Satz, Vorgabe 1 mm) |

  Ohne Auswahl und ohne genannten Schritt oder bei unbekanntem Satz: Erklärung mit den Beispielsätzen, kein
  Dialog, Modell unverändert.

### Entwürfe (ADR-051, Aufgabe D)

Wie ap-41 (anlegen, vergleichen, übernehmen, mit Begründung verwerfen, Ansichten „Ergebnis“/„Alle Entwürfe“).
**Annahme zum Ort** (Konzept nennt keinen, Open Questions 4): Der aktuelle Stand („Hauptstand“ oder Name des
Entwurfs) ist das erste Glied des Pfads und öffnet beim Klick die Liste der Entwürfe; dazu alle Entwurfsbefehle
in der Suche. Vergleich: Geister-Überlagerung im Modell, Werte vorher/nachher im Inspektor.

### Befehlsregister

`src/befehle.json`, Form wie ap-41 (`id`, `titel`, `parameter`, optional `kuerzel`); jedes Bedienelement trägt
`data-befehl`. Mindestumfang:

| Bereich | Befehle |
| --- | --- |
| Allgemein | `suche.oeffnen` (Mod+K), `bearbeiten.rueckgaengig` (Mod+Z), `bearbeiten.wiederholen` (Mod+Shift+Z), `auswahl.setzen`, `auswahl.aufheben`, `ansicht.einpassen`, `thema.umschalten`, `arbeitsbereich.wechseln` |
| Darstellung | `darstellung.wechseln` (W), `darstellung.koerper`, `darstellung.kanten`, `darstellung.durchsicht` |
| Ort | `ort.skizze-bearbeiten`, `ort.fertig` (Esc in der Skizze) |
| Schritte | `skizze.anlegen`, `skizze.rechteck`, `element.wert-setzen`, `feature.extrudieren`, `feature.verrunden`, `schritt.ausblenden`, `schritt.einblenden`, `schritt.verwerfen` |
| Baugruppe | `baugruppe.anlegen`, `verbindung.anlegen` |
| Entwürfe | `entwurf.anlegen`, `entwurf.wechseln`, `entwurf.vergleichen`, `entwurf.uebernehmen`, `entwurf.verwerfen`, `ansicht.ergebnis`, `ansicht.alle-entwuerfe` |
| KI | `ki.fragen`, `ki.anhalten`, `vorschlag.uebernehmen`, `vorschlag.verwerfen`, `gespraech.schliessen` |
| Paket Simulation | `simulation.lager`, `simulation.kraft`, `simulation.ergebnis` |

Höchstens 10 Kürzel. Navigation mit der Maus ist kein Befehl (Eingabe), Einpassen ist einer.

### Testzustände per Adresse

`/?zustand=<name>&thema=<hell|dunkel>&sprache=<de|en|schluessel>[&tempo=0]`, danach
`document.documentElement.dataset.bereit = "1"`; unbekannter Zustand → Leerer Zustand mit Befund.

| Zustand | Zeigt |
| --- | --- |
| `leer` | Teil 1 ohne Schritte, Leerer Zustand mit einem nächsten Schritt |
| `halter` | Halter, keine Auswahl, Inspektor zeigt das Teil |
| `schritt` | Grundplatte gewählt: Kontur, Griff, Kontextleiste, Inspektor mit „Maße“ und „Aus der Skizze“ |
| `ziehen` | Griff „Dicke“ beim Ziehen, Zahl am Zeiger |
| `skizze` | Ort Skizze der Grundplatte, Pfad „Halter › Grundplatte › Skizze“, Maße, Steg und Bohrungen ausgegraut/gestrichelt |
| `extrusion` | Teil 1 mit geschlossener Skizze 80 × 50 mm, Geister-Vorschau der Extrusion mit Griff |
| `kanten` | Halter in Darstellung Kanten |
| `durchsicht` | Halter in Darstellung Durchsicht |
| `befund` | Verrundung am Steg mit Radius 8 mm fehlerhaft, Befund mit Korrektur |
| `teile` | Gehäuse und Deckel, keine Baugruppe |
| `verbindung` | Baugruppe 1, Deckel auf Gehäuse, Auswahlfeld „Art“ im Inspektor |
| `suche` | Feld offen mit Eingabe „ver“, Gruppen Befehle und Elemente |
| `entwuerfe` | Liste der Entwürfe, Ansicht „Alle Entwürfe“ mit einem verworfenen Entwurf |
| `vergleich` | Vergleich Entwurf „Dickere Platte“ gegen Hauptstand |
| `ki-gespraech` | Gespräch an der Stelle des Inspektors, „Arbeitet“ mit Plan-Schritten |
| `ki-vorschlag` | Entscheidungskarte „Verrundung 2 mm“ mit Geister-Vorschau |
| `simulation` | Reiter Simulation, Lager, Kraft 100 N, Ergebnis-Darstellung mit Legende |

### Testschnittstelle

- `window.__cee` (lesend): `bereit`, `zustand`, `modell()`, `auswahl()`, `protokoll()`, `befehle()`, dazu neu
  `teil()` (`{abmessungen_mm, volumen_mm3, masse_g}`), `ansicht()` (`{darstellung, ort, pfad,
  kamera: {azimut_grad, hoehe_grad, abstand_mm, ziel}, lichter: [{art, intensitaet}], projektion(id) → Hüllbox
  und Flächenmitten in Pixeln}`). Aktionen nur über echte Eingaben, außer `window.__ceeEingabe.ansicht(…)`
  (siehe Eingabeschicht).
- Prüfwerkzeug: `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> --json` (lokale Vorschau,
  headless Chromium, 1440 × 900):

| Befehl | Ausgabe |
| --- | --- |
| `zustaende --out <dir>` | je Zustand und Thema PNG und `{zustand, thema, datei, bereit_ms, eingaben}` |
| `zonen` | je Zustand Lage und Größe der fünf Zonen, Inhalte der Kopfzeile |
| `budget` | je Zustand Panels, Arbeitsbereiche, Hauptaktionen, Muster, Muster-Kandidaten, modale Dialoge, Farben außerhalb der Tokens, Akzent an unzulässiger Stelle, Bedienelemente ohne `data-befehl`, Fenster/Overlays außerhalb der fünf Zonen; Zahl der Kürzel |
| `lesbarkeit` | Licht, Helligkeit der Flächen oben/vorn/seitlich (OKLCH L, Median 7 × 7 px), Kantenkontrast, Konturanteil der Auswahl, Einpassen |
| `navigation` | Kamera vor/nach Drehen, Schieben, Zoomen, Ansichtseingabe (auch während des Ziehens) |
| `auswahl` | Klick auf Flächen → gewählter Schritt; Überfahren in beide Richtungen; Hover-only-Prüfung |
| `befehle` | je Befehl Rang in der Suche, ausgeführt, Kürzel angezeigt |
| `texte` | feste Texte, Git-Begriffe |
| `ablauf <a…h>` | Endzustand `modell()`, `teil()`, `ansicht()`, `protokoll()`, Eingaben, Soll erreicht |
| `anfragen` | Netzanfragen an fremde Hosts |
| `messen` | `auswahl_p95_ms`, `hover_p95_ms`, `wert_live_p95_ms`, `darstellung_p95_ms`, `suche_p95_ms` (je 20 Messungen) |

### Komplexitätsbudget

Wie ap-41 mit diesen Änderungen: **keine Werkzeugleiste** (Werkzeuge = 0, statt genau 5; Open Questions 1);
Panels genau 2 (Aufbau, Inspektor; das Gespräch nimmt den Platz des Inspektors ein); Arbeitsbereiche 2
(„Modell“, „Simulation“); Kürzel ≤ 10; Muster nur aus dem Katalog (`data-muster`), zusätzlich höchstens die
Kandidaten Pfad, Legende, Gespräch (`data-muster-kandidat`, getrennt gezählt); 0 modale Dialoge; Akzent nur an
Auswahl, Fokus, der einen Hauptaktion und KI; 0 sichtbare Fenster oder Overlays außerhalb der fünf Zonen außer
Suchliste, Kontextaktionen, Zahl am Zeiger und Legende.

### Leistung (ubuntu-latest, headless Chromium, 1440 × 900)

| Kennzahl | Schwelle |
| --- | --- |
| `auswahl_p95_ms` – Klick (Fläche oder Aufbauzeile) bis Auswahl in Aufbau und Modell gezeichnet | < 100 ms |
| `hover_p95_ms` – Überfahren bis Hervorhebung auf der Gegenseite gezeichnet | < 100 ms |
| `wert_live_p95_ms` – Tastendruck im Wertfeld bis Modell und Volumen neu gezeichnet | < 100 ms |
| `darstellung_p95_ms` – Taste W bis neue Darstellung gezeichnet | < 100 ms |
| `suche_p95_ms` – Tastendruck im Feld bis Ergebnisliste gezeichnet | < 100 ms |
| Ort wechseln – Doppelklick bis Pfad und Ansicht der Skizze fertig | ≤ 400 ms |
| `bereit_ms` je Zustand | ≤ 3.000 ms |

Gezeichnet = zweites `requestAnimationFrame` nach der Eingabe. Die Tests messen selbst nach (Median aus 3 Läufen
von `pruefen -- messen --json`). Bildrate beim Drehen wird im CI nicht gemessen (Software-Rendering), nur im
Pilotlauf beurteilt.

### Tokens, Schrift, Texte

Wie ap-41: Farben, Schrift, Abstände nur aus `docs/design/tokens.json` (erzeugt), keine Literale außerhalb
`src/erzeugt/`, Inter und JetBrains Mono lokal, alle Texte über Schlüssel in `de.json`/`en.json`, keine
Git-Begriffe, kein „Speichern“. Simulierte Inhalte (KI, Ergebnis) tragen den Text „simuliert“ aus den
Übersetzungen.

### Testleitfaden (`docs/spikes/ux-prototyp-2.md`)

Gliederung und Regeln wie ap-41 (Ziel, Rahmen, Ablauf, Aufgaben, Erfolgskriterium, Ergebnisbogen,
Nachbefragung, Auswertung, Datenschutz). Aufgabentexte enthalten keinen Befehlstitel, den der Ablauf braucht.
Texte und Zeitlimits sind Vorschläge; das Kernteam passt sie nach dem Pilotlauf einmal an (Open Questions 3).

| Aufgabe | Text | Start | Sollzustand | Zeit |
| --- | --- | --- | --- | --- |
| A | „Bau eine Grundplatte: 80 mm lang, 50 mm breit und 8 mm dick.“ | `leer` | Teil 1: Skizze Rechteck 80 × 50 mm auf XY, Extrusion Dicke 8 mm | 5 min |
| B | „Der Steg soll 40 mm hoch werden, und seine beiden oberen langen Kanten sollen mit 3 mm Radius rund sein.“ | `halter` | Steg Höhe 40 mm; Verrundung Radius 3 mm an 2 Kanten | 4 min |
| C | „Setz den Deckel auf das Gehäuse, sodass beide fest zusammengehören.“ | `teile` | wie ap-41 Ablauf C | 5 min |
| D | „Probier aus, wie der Halter mit 10 mm dicker Grundplatte aussieht, ohne den bisherigen Stand zu verändern. Gefällt es dir, soll es der neue Stand werden.“ | `halter` | Hauptstand Dicke 10 mm, Entwurf übernommen | 5 min |
| E | „Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“ | `halter` | richtige Antwort | 2 min |
| F | „Lass dir vom Programm helfen: Die oberen Kanten des Stegs sollen mit 2 mm rund werden. Schau dir das Ergebnis an, bevor es gilt, und mach den Radius danach 3 mm.“ | `halter` | Vorschlag übernommen (Protokoll `quelle: ki`), Verrundung Radius 3 mm am Steg | 4 min |
| G | „Öffne die Skizze der Grundplatte, mach die Platte 100 mm lang und geh zurück zum ganzen Teil.“ | `halter` | Länge 100 mm, Ort Teil, Volumen 57,49 cm³ | 3 min |
| H | „Zeig das Teil nur mit seinen Kanten.“ | `halter` | Darstellung Kanten | 1 min |

Aufgabe G steht wörtlich so im Auftrag des Kernteams und enthält deshalb das Wort „Skizze“; die Prüfung „ohne
Befehlstitel“ nimmt G aus.

Erfolgskriterium je Aufgabe: Sollzustand, innerhalb der Zeit, ohne Hilfe. Gate (4 von 5) wie ap-41 über A, B
und C; D–H werden berichtet. Zusätzlich je Testperson die Nachbefragung „Wo ändert man in diesem Programm eine
Zahl?“ und „Was tut man zuerst, bevor man etwas ändert?“ (Prüfung der Leitidee).

### Klickbarer Stand nach jeder Gruppe

Jede Task-Gruppe endet mit der Task „Vorschau bauen und Klick-Anleitung im PR aktualisieren“: `bash
spikes/ux-prototyp-2/build.sh && npm --prefix spikes/ux-prototyp-2 run preview` startet die Vorschau; die
PR-Beschreibung bekommt unter „Klick-Anleitung“ je Gruppe 3–6 Schritte in Alltagssprache mit Startadresse
(z. B. „Öffne `/?zustand=halter`, klicke auf die Grundplatte, ändere rechts die Dicke auf 12 mm – das Modell wird
beim Tippen dicker“) und was dabei zu sehen sein muss. Die Anleitung nennt nur, was schon funktioniert.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-41b-ux-bedienkonzept/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | `build.sh`, Lint, Vitest (Wertfeld inkl. N/kN, Geometrie/Volumen), `dist/`, Abhängigkeiten, Lizenzen, `anfragen` | Eigenständiger Prototyp |
| AK-2 | 17 Zustände × 2 Themen, `bereit_ms`, 0 Eingaben, verschieden; unbekannter Zustand | Testzustände per Adresse |
| AK-3 | Tokens, Literale, Farben, Schrift; Texte, Übersetzungen, Git-Begriffe | Tokens, Muster und Texte |
| AK-4 | `zonen`: fünf Zonen, Maße, Kopfzeile, Rückgängig mit Kürzel | Ein Bildschirm, fünf Zonen |
| AK-5 | `lesbarkeit`: Licht, Flächenhelligkeit, Kanten, Kontur, Einpassen | Lesbare 3D-Darstellung |
| AK-6 | `navigation`: Drehen, Schieben, Zoomen; Ansichtseingabe auch beim Ziehen | Eingabe und Navigation |
| AK-7 | `auswahl`: Fläche → Schritt, Aufbau ↔ Modell, Überfahren beidseitig, keine Hover-only-Bedienung | Synchrone Auswahl |
| AK-8 | Inspektor: Teil ohne Auswahl, Gruppen, live, Enter, Esc, Volumen/Masse | Inspektor |
| AK-9 | Griffe, Zahl am Zeiger, Tippen beim Ziehen, Esc | Griffe am Modell |
| AK-10 | Orte: hinein (drei Wege), Pfad, ausgegraut/gestrichelt, Maß → Feld, hinaus (drei Wege); `ablauf g` | Orte Teil und Skizze |
| AK-11 | Darstellungen, Taste W, `ablauf h`; Kontextaktionen über dem Gewählten = Rechtsklick | Darstellung; Kontextaktionen |
| AK-12 | Register, Bedienelemente mit Befehl, jeder Befehl über die Suche, Elemente in der Suche | Befehle und Suche |
| AK-13 | KI: `ablauf f`, Gespräch an der Stelle des Inspektors, Karte, Übernehmen → Schritt, Verwerfen, Anhalten, unbekannter Satz | KI im selben Feld |
| AK-14 | Paket Simulation: Reiter, Schritte, Inspektor, Legende, Befehle, Kennzeichnung, keine Fenster | Erweiterung ohne Fenster |
| AK-15 | `ablauf a`–`e`: Sollzustände, Rückgängig, Befund | Aufgaben A–E |
| AK-16 | `budget`, `messen` | Komplexitätsbudget und Reaktion |
| AK-17 | Leitfaden vollständig, Aufgaben ohne Befehlstitel (außer G), `ablauf e` | Testleitfaden |

## Risks / Trade-offs

- **Pixelmessungen im headless Chromium** (Software-Rendering): Helligkeit und Kantenkontrast sind stabil, weil
  die Szene klein ist und flach schattiert wird; Schwellen bewusst mit Abstand gewählt. Schlagen sie trotz
  guter Darstellung fehl, ist das ein Fall für „Offene Fragen“ im PR, nicht für schwächere Tests.
- **Prototyp zu gut:** einfache Körper statt Kernel; Bericht nennt Abweichungen.
- **Gespräch wird zum Chat:** Gegenmittel ist der Verzicht auf Verlauf und zweites Fenster; Kernteam entscheidet
  (Open Questions 5).
- **Umfang:** 17 Zustände und 8 Abläufe sind mehr als bei ap-41; Gruppen sind so geschnitten, dass nach jeder
  Nacht ein klickbarer Stand bleibt, auch wenn spätere Gruppen nicht fertig werden.
- **Aufgabe C** nutzt das Testprojekt von ap-41 und passt nicht zum Halter; Abweichung bewusst, damit der
  Kernablauf „Baugruppe“ aus dem Konzept erhalten bleibt.

## Open Questions

Nur das Kernteam kann diese Punkte entscheiden; je mit Empfehlung.

1. **Werkzeugleiste (ADR-022, Leitbild, Muster „Werkzeugleiste“: genau fünf Werkzeuge):** Das Konzept nennt fünf
   Zonen ohne Werkzeugleiste; Werkzeuge wie Skizze erreicht man über Leeren Zustand, Kontextaktionen und Suche.
   *Empfehlung:* so bauen und nach dem Pilotlauf ADR-022, Leitbild und Musterkatalog anpassen (Budget
   „Werkzeuge“ streichen oder auf 0 setzen). Messen, Schnitt und Fragen entfallen im Prototyp als Werkzeuge
   (Fragen geht im Suchfeld auf).
2. **Neue Muster (ADR-061):** Pfad, Legende, Gespräch fehlen im Katalog (19 von 20). *Empfehlung:* als Kandidaten
   bauen, nach dem Pilotlauf per ADR aufnehmen; „Letzte Aktion nachjustieren“ dafür streichen (widerspricht
   „Zahlen an einem Ort“). Dann 21 → 20 Muster.
3. **Aufgabentexte, Werte und Zeitlimits** für A, B, D, F (an den Halter angepasst) sowie G (3 min) und H (1 min)
   sind Vorschläge. Zählen G und H für das Gate? *Empfehlung:* Gate weiter über A, B, C; G und H berichten, im
   Pilotlauf aber alle A–H verlangen.
4. **Ort der Entwürfe:** Das Konzept nennt keinen. *Empfehlung:* Stand als erstes Glied des Pfads (siehe
   Entwürfe); Alternative: nur über die Suche.
5. **Gespräch an der Stelle des Inspektors vs. Leitbild „kein eigenes Chat-Fenster“:** *Empfehlung:* zulässig,
   solange es keinen Verlauf und kein zweites Panel gibt; Leitbild-Satz entsprechend präzisieren.
6. **3D-Maus:** WebHID in Chromium ist möglich, aber Treiber der Hersteller belegen das Gerät oft; das ist
   genau der Inhalt von `ap-42-spike-xr-eingabe`. *Empfehlung:* im Prototyp nur die Eingabeschicht mit
   Testeinspeisung (AK-6), keine WebHID-Anbindung; 3D-Maus-Taste für Kontextaktionen ebenfalls dorthin.
7. **Lage von Steg und Bohrungen, Material und Dichte** (Annahmen PLA 1,24 g/cm³, Steg hinten bündig,
   Bohrungen bei X ±25, Y −7,5 mm) und **Kraft im Paket Simulation** (100 N, 0,02 mm je N) sind nicht im
   Konzept. *Empfehlung:* übernehmen oder vor den Abnahmetests korrigieren; die Sollwerte in design.md hängen
   daran.
8. **Kennung und Konzepttabelle:** entschieden – Kennung `ap-41b`. Die Zeile in der Tabelle der Arbeitspakete
   und die Abhängigkeit von ap-08b auf ap-41b ergänzt das Kernteam.
9. **Tokens für das Modell:** `tokens.json` hat keine Körperfarbe und keine Farbskala für Ergebnisse.
   *Empfehlung:* Körper aus `flaeche-2`, Ergebnisskala vorläufig zwischen `flaeche-2` und `fehler`
   interpoliert; eigene Tokens („modell-koerper“, „skala-*“) durch das Kernteam mit ap-08a. Die Statusfarben
   dürfen nicht doppelt belegt werden (ADR-061 „eine Statussprache“) – sonst eine andere Lösung.
10. **Glossar:** Aufbau, Inspektor, Pfad, Darstellung, Schritt stehen nicht in `docs/glossar.md`; „Inspektor“
    ersetzt sprachlich „Eigenschaften-Panel“. *Empfehlung:* vor den Abnahmetests ins Glossar aufnehmen.
11. **Abschluss von ap-41:** entschieden – ap-41 verlässt die Warteschlange, PR #32 wird mit dem No-Go von TP1
    geschlossen; der Branch `change/ap-41-ux-prototyp` bleibt als Quelle für die übernommenen Dateien erhalten.
    Das No-Go von TP1 wandert als Anhang in `docs/spikes/ux-prototyp-2.md`.
12. **Navigationsprofil „Standard“:** Belegung (rechte Taste drehen, mittlere schieben) ist eine Annahme; auf
    Mac-Trackpads gibt es keine mittlere Taste. *Empfehlung:* zusätzlich Umschalt+rechte Taste = schieben;
    Trackpad-Gesten bleiben ap-43.
