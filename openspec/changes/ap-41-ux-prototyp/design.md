## Context

Siehe proposal.md – Why. Grundlagen:

- **Konzept, UI- und Interaktionskonzept:** Modell im Zentrum, Featurebaum links, Eigenschaften rechts, unten
  eine Werkzeugleiste mit fünf Werkzeugen (Auswählen, Messen, Schnitt, Skizze, Fragen), Befehlssuche
  Strg/Cmd+K, keine Menüleiste, kein Ribbon, keine modalen Dialoge; Skizzieren (Ebene wählen, Ansicht dreht
  senkrecht, Element anklicken und Wert tippen, nach dem Schließen passende nächste Schritte mit Vorschau und
  Ziehgriff); Letzte Aktion nachjustieren; unter 15 Kürzel; Reaktion unter 100 ms; Messlatte „4 von 5
  Konstrukteuren lösen die Kernabläufe ohne Einweisung“.
- **Leitbild „Oberfläche und KI“, Variante A** (`docs/design/leitbild.md` auf Branch `adr/leitbild-ui-ki`):
  fünf Grundbegriffe Element, Auswahl, Befehl, Vorschlag, Befund; ein Ablauf Auswählen → Absicht → Vorschau →
  Übernehmen oder Verwerfen → Nachjustieren; Komplexitätsbudget; die KI als gleichberechtigte Nutzerin ohne
  eigenes Chat-Fenster, die ihre genutzten Befehle zeigt.
- **Musterkatalog** `docs/design/muster.md` (19 Muster), **Tokens** `docs/design/tokens.json`,
  **UI-Entwurf** `docs/design/ui-entwurf/` (Anordnung als Anschauung: Entwurf und Suche in der Kopfzeile,
  Reiter „Struktur“ im linken Panel, Umschalter „Ergebnis · Alle Entwürfe“ unten im linken Panel, Letzte
  Aktion unten links in der 3D-Fläche, Entscheidungskarte der KI in der 3D-Fläche neben „Fragen“, Rückmeldung
  als Zeile unten).
- **Gerüst `client/`** aus ap-00: Vite 6, TypeScript 5 strict, ESLint 9 mit typescript-eslint, Prettier 3,
  Vitest. Noch keine Bausteine, keine Tokens, kein three.js.

## Goals / Non-Goals

**Goals:** ein klickbarer Prototyp, mit dem Testpersonen ohne Einweisung die drei Kernabläufe, Entwürfe, Suche
und den simulierten KI-Ablauf durchspielen; automatisch geprüft, dass er nur Tokens und Katalogmuster nutzt,
das Komplexitätsbudget einhält und jede Funktion über die Suche erreichbar ist; ein Testleitfaden, mit dem das
Kernteam die Abnahme 4 von 5 durchführt und Go oder No-Go für G1 begründet.

**Non-Goals:** siehe proposal.md – Impact. Der Prototyp ist Wegwerf-Code: Er beweist Bedienbarkeit, nicht
Architektur. Nichts davon wird in `client/` übernommen.

## Decisions

### Aufbau

```
spikes/ux-prototyp/
  package.json  vite.config.ts  tsconfig.json  eslint.config.js  .prettierrc
  build.sh                 npm ci, Chromium für Playwright, Token-Erzeugung, Build
  scripts/tokens.mjs       erzeugt src/erzeugt/tokens.css und tokens.ts aus docs/design/tokens.json
  src/erzeugt/             erzeugte Dateien (nie von Hand ändern)
  src/ui/                  Bausteine, je Muster aus dem Katalog einer (data-muster="<Name>")
  src/befehle.json         Befehlsregister als Daten
  src/i18n/de.json en.json Übersetzungen (gleiche Schlüssel)
  src/modell/              simuliertes Modell (Elementform, Größen mit Einheit), Rückgängig
  src/ansicht3d/           three.js-Darstellung der vorbereiteten Körper
  src/zustaende/           Testzustände
  src/ki/                  Simulation der drei Absichten
  pruefen/                 Prüfwerkzeug (Playwright), Schnittstelle der Abnahmetests
```

- **Ohne UI-Framework:** TypeScript und DOM. So nimmt der Prototyp die Framework-Entscheidung von ap-08a und
  ap-08b nicht vorweg. Laufzeit-Abhängigkeiten nur: `three`, `lucide`, `@fontsource-variable/inter`,
  `@fontsource/jetbrains-mono`. Entwicklung zusätzlich wie `client/` plus `playwright`. Eine weitere
  Abhängigkeit nur per Änderung dieses Designs.
- **Kein Server:** `npm run build` erzeugt eine statische Seite in `dist/`; `npm run preview` startet sie lokal.
  Keine Anfrage an fremde Hosts, keine Schriften oder Symbole aus dem Netz (ADR-056).
- **Layout Desktop**, ab 1280 × 800 px; Bezugsgröße der Screenshots 1440 × 900 px. Kürzel nach Plattform
  (Cmd auf macOS, sonst Strg).

### Testprojekt (vorbereitete Daten)

Das simulierte Modell besteht aus Elementen in der Elementform (`id`, `type`, `params`, `content`, `meta`),
Zahlen als Größe `{"value": <Zahl>, "unit": "mm"}` (ADR-057). Projekt „Sensorgehäuse“:

| Element | Typ | Inhalt |
| --- | --- | --- |
| Teil 1 | `part` | leer; Ursprung mit Ebenen XY, XZ, YZ |
| Platte | `part` | Skizze 1 (Rechteck 80 × 50 mm auf XY), Extrusion 1 (Tiefe 5 mm) |
| Gehäuse | `part` | Quader 80 × 50 × 30 mm, Schale 2 mm, oben offen; Verbindungspunkt „Oberkante“ (Mitte oben) |
| Deckel | `part` | Quader 80 × 50 × 4 mm; Verbindungspunkt „Unterseite“ (Mitte unten) |

Darstellung in three.js mit Standardmitteln: Quader, abgerundete Quader (`RoundedBoxGeometry` aus den
three.js-Beispielen) und Schalen als einfache Körper, Kanten als Linien mit Trefferzone von mindestens 8 px.
Farben aus den Tokens (`viewport`, `linie-stark`, `flaeche-2`, `akzent`, Achsen `achse.x/y/z`), zur Laufzeit
aus den CSS-Variablen gelesen. Die Geometrie ist Darstellung, keine Berechnung.

### Befehlsregister

`src/befehle.json`: je Befehl `id` (Muster `^[a-z]+(\.[a-z-]+)+$`), `titel` (Übersetzungsschlüssel),
`parameter` (Name → Typ; Zahlen mit Dimension und Standard-Einheit), optional `kuerzel`. Jede Bedienhandlung
ruft genau einen Befehl auf; Bedienelemente tragen `data-befehl="<id>"`. Ausführen schreibt einen Eintrag ins
Protokoll `{befehl, parameter, quelle}` mit `quelle` `mensch` oder `ki`. Mindestumfang:

| Bereich | Befehle |
| --- | --- |
| Werkzeuge | `werkzeug.auswaehlen`, `werkzeug.messen`, `werkzeug.schnitt`, `werkzeug.skizze`, `werkzeug.fragen` |
| Allgemein | `suche.oeffnen`, `bearbeiten.rueckgaengig`, `bearbeiten.wiederholen`, `auswahl.setzen`, `ansicht.einpassen`, `thema.umschalten` |
| Skizze und Formelemente | `skizze.anlegen`, `skizze.rechteck`, `skizze.schliessen`, `element.wert-setzen`, `feature.extrudieren`, `feature.verrunden`, `feature.schale` |
| Baugruppe | `baugruppe.anlegen`, `verbindung.anlegen` |
| Entwürfe | `entwurf.anlegen`, `entwurf.wechseln`, `entwurf.vergleichen`, `entwurf.uebernehmen`, `entwurf.verwerfen`, `ansicht.ergebnis`, `ansicht.alle-entwuerfe` |
| Vorschläge und KI | `ki.fragen`, `ki.anhalten`, `vorschlag.uebernehmen`, `vorschlag.verwerfen` |

`werkzeug.messen` und `werkzeug.schnitt` sind vorhanden, zeigen im Prototyp aber nur die Rückmeldung „Im
Prototyp nicht enthalten“. Weitere angebotene, aber nicht gebaute Schritte (z. B. „Drehen“ nach dem Schließen
einer Skizze) erscheinen nicht; der Prototyp zeigt nur, was funktioniert. Höchstens 10 Kürzel, mindestens
Cmd/Strg+K, Cmd/Strg+Z, Cmd/Strg+Umschalt+Z und je eines für die fünf Werkzeuge.

### Wertfeld

Ein Baustein für jede Zahl mit Einheit (Panel, Maß an der Skizze, Tiefe am Ziehgriff, Letzte Aktion). Liest
Zahl mit oder ohne Einheit (`mm`, `cm`, `m`; ohne Einheit gilt die Standard-Einheit des Felds), Dezimalkomma
und -punkt, einfache Formeln mit `+ − × * /` und Klammern. Fehler (nicht lesbar, falsche Dimension wie „5 kg“)
erscheinen als Befund am Feld, der Wert bleibt unverändert. Anzeige mit höchstens zwei Nachkommastellen ohne
Nullen am Ende, tabellarische Ziffern. Ziehen am Feld ändert den Wert in 1-mm-Schritten.

### Kernabläufe

Jeder Ablauf hat eine Startadresse; die Aufgaben sind unabhängig voneinander.

**A – Skizze mit Maßen anlegen und extrudieren** (Start `?zustand=leer`)

1. Werkzeug „Skizze“; die Ebenen XY, XZ, YZ werden in 3D und im Featurebaum anwählbar.
2. Ebene XY anklicken; die Ansicht dreht sich senkrecht darauf (≤ 200 ms, Token `bewegung.mittel`).
3. Rechteck aufziehen (Raster 1 mm, Maße live); Länge (in X) und Breite (in Y) erscheinen als Wertfelder am
   Rechteck und im Eigenschaften-Panel; 80 mm und 50 mm tippen.
4. „Skizze schließen“ (die eine Hauptaktion); als nächster Schritt erscheint „Extrudieren“ an der Auswahl und
   in den Kontextaktionen.
5. „Extrudieren“: Geister-Vorschau mit Ziehgriff und Wertfeld „Tiefe“ (Vorgabe 10 mm); 5 mm tippen, Enter.
6. Letzte Aktion nachjustieren zeigt „Extrusion · Tiefe 5 mm“.

Sollzustand: Teil 1 enthält Skizze 1 (Rechteck Länge 80 mm × Breite 50 mm auf XY) und Extrusion 1
(Tiefe 5 mm); die 3D-Ansicht zeigt einen Quader 80 × 50 × 5 mm.

**B – Formelement ändern und verrunden** (Start `?zustand=platte`)

1. Extrusion 1 im Featurebaum oder eine Fläche der Platte in 3D auswählen; im Eigenschaften-Panel „Tiefe“ auf
   8 mm setzen (Tippen oder Ziehen).
2. Die vier senkrechten Kanten auswählen (Klick, weitere mit Umschalt+Klick).
3. „Verrunden“ über Kontextaktionen oder Suche; Wertfeld „Radius“, 3 mm tippen, Enter.

Sollzustand: Extrusion 1 Tiefe 8 mm; Verrundung 1 mit Radius 3 mm an 4 Kanten. **Befund (simuliert):** Ein
Radius über 24 mm macht Verrundung 1 „fehlerhaft“ (Statusanzeige mit Farbe, Symbol und Wort in Baum und 3D);
der Befund nennt die Ursache und bietet „Radius auf 24 mm setzen“ (`element.wert-setzen`) an; alle anderen
Elemente bleiben auswählbar und änderbar (ADR-050).

**C – Zwei Teile zur Baugruppe verbinden** (Start `?zustand=teile`)

1. Gehäuse und Deckel im Featurebaum auswählen (Umschalt+Klick); „Baugruppe anlegen“ über Kontextaktionen oder
   Suche. Baugruppe 1 enthält zwei Instanzen, nebeneinander platziert.
2. Deckel auswählen, „Verbinden“; die Verbindungspunkte beider Teile werden sichtbar.
3. Verbindungspunkt „Unterseite“ am Deckel und „Oberkante“ am Gehäuse anklicken; Auswahlfeld „Art“ (Fest,
   Drehen, Schieben, Zylinder, Kugel, Eben; Vorgabe Fest) – die Verbindung wirkt sofort, der Deckel rastet auf
   dem Gehäuse ein (≤ 200 ms).
4. Letzte Aktion nachjustieren zeigt Art und Versatz (0 mm).

Sollzustand: Baugruppe 1 mit Instanzen Gehäuse und Deckel und Verbindung 1 (Art Fest) zwischen den beiden
Verbindungspunkten; die Unterseite des Deckels liegt auf 30 mm Höhe. Andere Arten als „Fest“ werden
gespeichert, aber nicht bewegt (keine Freiheitsgrade, ap-46).

Eigene Handlungen wirken sofort und lassen sich mit Cmd/Strg+Z zurücknehmen; Entscheidungskarten gibt es nur für
Vorschläge (KI, Befund-Korrektur), wie im Leitbild.

### Entwürfe (ADR-051)

- Die Kopfzeile zeigt den aktuellen Stand („Hauptstand“ oder den Namen des Entwurfs). Ein Klick öffnet eine
  Liste (Muster Auswahlfeld bzw. Suchfeld mit Liste, nicht modal) mit „Entwurf anlegen“.
- Neuer Entwurf mit Name (Textfeld, Platzhalter „Dickere Platte“); Änderungen im Entwurf ändern den Hauptstand
  nicht.
- „Vergleichen“: Muster Vergleich – Geister-Überlagerung in 3D, Werte vorher/nachher als Tabelle im
  Eigenschaften-Panel, Unterschiede im Akzent.
- „Übernehmen“ führt den Entwurf in den Hauptstand; Zustand des Entwurfs danach „Übernommen“.
- „Verwerfen“ verlangt eine Begründung (Textfeld, mindestens ein Zeichen), blendet den Entwurf in der Ansicht
  „Ergebnis“ aus und zeigt ihn in „Alle Entwürfe“ mit Begründung; nichts wird gelöscht.
- Umschalter „Ergebnis · Alle Entwürfe“ unten im linken Panel; Standard ist „Ergebnis“.
- Vorbereitet: Entwurf „Platte 6 mm“ (verworfen, Begründung „zu biegsam“). Konflikte beim Übernehmen werden
  nicht simuliert (ap-25).

### Suche (ADR-045, ADR-052, Muster Suche)

Ein Feld in der Kopfzeile, Cmd/Strg+K. Ergebnisse gruppiert in Befehle und Elemente (Gruppe „Hilfe“ und
„Projekte“ entfallen im Prototyp); Facetten als Chips (Typ, Berechnungszustand); Kürzel neben jedem Befehl;
Pfeiltasten und Enter; Esc schließt. Treffer über Titel, Synonyme aus den Übersetzungen (z. B. „abrunden“ →
Verrunden, „Fillet“ in Englisch) und Elementnamen. Ein Satz, der wie eine Absicht aussieht (mehr als drei
Wörter und kein Treffer unter den Befehlen), wird als erster Eintrag „KI fragen: …“ angeboten.

### Simulierter KI-Ablauf (Leitbild, Variante A)

- **Absicht äußern auf drei Wegen**, alle führen zu `ki.fragen` mit der aktuellen Auswahl: Werkzeug „Fragen“
  (Eingabezeile an der Auswahl in der 3D-Fläche), „KI fragen“ im Eigenschaften-Panel, Satz in der Suche. Es gibt
  kein Chat-Fenster und keinen Verlauf von Nachrichten.
- **Vorbereitete Absichten** (Erkennung über Schlüsselwörter und eine Zahl mit Einheit im Satz, Deutsch und
  Englisch):

  | Absicht | Schlüsselwörter (Auszug) | Befehle im Vorschlag |
  | --- | --- | --- |
  | Aushöhlen | Schale, Gehäuse, Kästchen, hohl, Wand, offen | `feature.schale` (Wandstärke aus dem Satz, Vorgabe 2 mm; offene Fläche oben) |
  | Abrunden | rund, abrunden, Verrundung, Kanten | `feature.verrunden` (Radius aus dem Satz, Vorgabe 1 mm; alle Außenkanten) |
  | Maß ändern | länger, breiter, dicker, kürzer, schmaler | `element.wert-setzen` (betroffener Parameter ± Zahl aus dem Satz) |

- **Fortschritt:** Statusanzeige „Arbeitet“ mit den Plan-Schritten als Text, Dauer 1.500 ms, jederzeit
  „Anhalten“ (`ki.anhalten`; danach kein Vorschlag, Modell unverändert). Für Tests per Adresse `&tempo=0`
  ohne Verzögerung.
- **Entscheidungskarte** (nicht modal, in der 3D-Fläche neben der Eingabe, Akzent): Titel = was sich ändert;
  Geister-Vorschau im Modell; Begründung; Werte vorher/nachher; die genutzten Befehle als kopierbare
  Textzeilen (`feature.schale wandstaerke=2 mm flaeche=oben`); genau zwei Hauptaktionen **Übernehmen** und
  **Verwerfen**. Übernehmen schreibt die Befehle mit `quelle: ki` ins Protokoll; danach zeigt Letzte Aktion
  nachjustieren deren Parameter.
- **Ohne Auswahl** oder bei **unbekanntem Satz**: eine Erklärung (Muster Rückmeldung bzw. Leerer Zustand mit
  einem nächsten Schritt), die die drei Beispielsätze anbietet und sagt, dass der Prototyp nur vorbereitete
  Beispiele kennt. Nie ein Fehlerdialog.
- Die KI nutzt nur Befehle aus dem Register, die auch über die Suche erreichbar sind; keine Netzanfrage, kein
  Anbieter, kein Modell.

### Testzustände per Adresse

`/?zustand=<name>&thema=<hell|dunkel>&sprache=<de|en|schluessel>[&tempo=0]`. Der Zustand wird ohne Klick
hergestellt; danach setzt der Prototyp `document.documentElement.dataset.bereit = "1"`. `sprache=schluessel`
zeigt statt Texten die Übersetzungsschlüssel (für die Prüfung auf feste Texte). Unbekannter Zustand: Leerer
Zustand mit Befund „Zustand unbekannt“.

| Zustand | Zeigt |
| --- | --- |
| `leer` | Teil 1 leer, Leerer Zustand mit einem nächsten Schritt |
| `skizze` | Skizze auf XY, Rechteck aufgezogen, Wertfeld „Länge“ aktiv |
| `extrusion` | Vorschau der Extrusion mit Ziehgriff und Wertfeld „Tiefe“ |
| `platte` | Platte 80 × 50 × 5 mm, Letzte Aktion nachjustieren sichtbar |
| `verrundung` | vier Kanten ausgewählt, Vorschau Verrundung 3 mm |
| `befund` | Verrundung 30 mm fehlerhaft, Befund mit Korrektur |
| `teile` | Gehäuse und Deckel im Projekt, noch keine Baugruppe |
| `verbindung` | Baugruppe 1, Deckel auf Gehäuse, Auswahlfeld „Art“ |
| `suche` | Suche offen mit Eingabe „ver“, Gruppen Befehle und Elemente |
| `entwuerfe` | Liste der Entwürfe, Ansicht „Alle Entwürfe“ mit dem verworfenen Entwurf |
| `vergleich` | Vergleich Entwurf „Dickere Platte“ gegen Hauptstand |
| `ki-arbeitet` | Statusanzeige „Arbeitet“ mit Plan-Schritten und „Anhalten“ |
| `ki-vorschlag` | Entscheidungskarte „Schale 2 mm“ mit Geister-Vorschau und Befehlszeilen |

### Testschnittstelle

- Im Browser `window.__cee` (nur lesend): `bereit`, `zustand`, `modell()` (Projekt-JSON des simulierten
  Modells), `auswahl()` (IDs), `protokoll()` (ausgeführte Befehle), `befehle()` (Register). Aktionen löst das
  Prüfwerkzeug nur über echte Eingaben aus (Klicks, Tasten), nie über `__cee`.
- Prüfwerkzeug: `cd spikes/ux-prototyp && npm run --silent pruefen -- <befehl> --json` (startet selbst eine
  lokale Vorschau auf einem freien Port, headless Chromium, Fenster 1440 × 900):

| Befehl | Ausgabe |
| --- | --- |
| `zustaende --out <dir>` | je Zustand und Thema ein PNG und `{zustand, thema, datei, bereit_ms, eingaben}` |
| `budget` | je Zustand: Werkzeuge, Arbeitsbereiche, Panels, Hauptaktionen, Muster (Menge), modale Dialoge, Farben außerhalb der Tokens, Akzent an unzulässiger Stelle, Bedienelemente ohne `data-befehl`; dazu Zahl der Kürzel |
| `befehle` | je Befehl: Rang in der Suche nach Eingabe des deutschen Titels, ausgeführt ja/nein, Kürzel angezeigt ja/nein |
| `texte` | sichtbare Texte, die in `sprache=schluessel` weder Schlüssel noch Datenwert sind; Git-Begriffe in `de` und `en` |
| `ablauf <a\|b\|c\|d\|e\|f>` | Endzustand `modell()`, `protokoll()`, Zahl der Eingaben, Sollzustand erreicht ja/nein |
| `anfragen` | alle Netzanfragen aller Zustände und Abläufe an andere Hosts als die lokale Vorschau |
| `messen` | `auswahl_p95_ms`, `werkzeug_p95_ms`, `suche_p95_ms` (je 20 Messungen) |

Die statischen Prüfungen (Literale, Übersetzungsschlüssel, Abhängigkeiten, Lizenzen, Musternamen) machen die
Abnahmetests direkt in Python, ohne das Prüfwerkzeug.

### Komplexitätsbudget und Zählweise

| Was | Grenze | Gezählt als |
| --- | --- | --- |
| Werkzeuge | genau 5 | Kinder von `[data-muster="Werkzeugleiste"]` mit `data-befehl^="werkzeug."` |
| Arbeitsbereiche | ≤ 5 (Prototyp: 1, „Modell“) | Reiter in `[data-muster="Arbeitsbereiche"]` |
| Panels | genau 2 in jedem Zustand | sichtbare `[data-panel]` (Featurebaum, Eigenschaften); Suche, Listen und Karten sind keine Panels |
| Kürzel | < 15 (Entwurf: ≤ 10) | Einträge mit `kuerzel` in `befehle.json` |
| Muster | ≤ 20, nur aus dem Katalog | Menge der `data-muster`-Werte über alle Zustände ⊆ Musternamen aus `muster.md` |
| Modale Dialoge | 0 | `[aria-modal="true"]`, `dialog:modal`; im Quelltext kein `alert(`, `confirm(`, `prompt(`, `showModal(` |
| Akzent | 1 | sichtbare Farben nur aus den Tokens des Themas; Akzentfarben (`akzent`, `akzent-flaeche`, `auf-akzent`) nur an Auswahl (`aria-selected`/`aria-current`), Fokus, `data-hauptaktion` (≤ 1 je Zustand) und KI (`data-quelle="ki"`) |
| Reaktion | < 100 ms | `messen`, siehe Leistung |

### Leistung (GitHub-Runner ubuntu-latest, headless Chromium, 1440 × 900)

| Kennzahl | Schwelle |
| --- | --- |
| `auswahl_p95_ms` – Klick im Featurebaum bis Auswahl in Baum und 3D gezeichnet (zweites `requestAnimationFrame`) | < 100 ms |
| `werkzeug_p95_ms` – Werkzeugwechsel per Klick bis aktives Werkzeug gezeichnet | < 100 ms |
| `suche_p95_ms` – Tastendruck in der Suche bis Ergebnisliste gezeichnet | < 100 ms |
| `bereit_ms` – Laden einer Zustandsadresse bis `bereit` | ≤ 3.000 ms je Zustand |

Die Abnahmetests messen selbst nach (`npm run --silent pruefen -- messen --json`, Median aus 3 Läufen) und
vergleichen ohne pauschale Toleranz.

### Tokens, Schrift, Texte

- `scripts/tokens.mjs` liest `docs/design/tokens.json` und schreibt CSS-Variablen (`--farbe-<name>` je Thema
  über `[data-thema]`, `--schrift-*`, `--abstand-*`, `--radius-*`, `--bewegung-*`, `--achse-*`) und ein
  TypeScript-Modul. `npm run tokens:check` erzeugt neu und vergleicht (0 Unterschiede). Die erzeugten Dateien
  liegen im Repository, damit Lint und Prüfungen ohne Erzeugung laufen.
- Außerhalb von `src/erzeugt/`: keine Farbliterale (`#rgb[a]`, `#rrggbb[aa]`, `rgb(`, `hsl(`, `oklch(`, `0x`
  mit sechs Hex-Ziffern in three.js), kein `font-family`, keine `font-size`, `margin`, `padding` oder `gap` mit
  Zahl außer 0, keine Schriftschnitte außer über Variablen. Bedienflächen mindestens `bedienflaeche.desktop`.
- Inter und JetBrains Mono über `@fontsource`, mit `font-feature-settings` aus dem Token `schrift.merkmale`.
- Texte nur über Schlüssel aus `src/i18n/de.json` und `en.json` (gleiche Schlüssel, keine leeren Werte);
  Begriffe nach `docs/glossar.md` und den fünf Grundbegriffen; keine Git-Begriffe (Commit, Branch, Merge,
  Rebase, Pull Request, Checkout, Push, Pull, Fork, Repository) und kein „Speichern“. Datenwerte (Element-
  namen des Testprojekts, Zahlen mit Einheit, Kürzel) sind keine festen Texte.

### Testleitfaden (`docs/spikes/ux-prototyp.md`)

Abschnitte: Ziel, Rahmen (Rechner mit Maus, Chromium, Firefox oder Safari, Fenster ≥ 1440 × 900, Startadressen),
Ablauf, Aufgaben, Erfolgskriterium, Ergebnisbogen, Nachbefragung, Auswertung, Datenschutz.

- **Ablauf:** kurze Begrüßung („Wir prüfen das Programm, nicht Sie“), lautes Denken erwünscht; die Leitung
  liest nur den Aufgabentext vor und hilft nicht. Bittet die Testperson um Hilfe, gilt die Aufgabe als nicht
  ohne Einweisung gelöst; die Leitung darf dann helfen, damit die nächste Aufgabe startet. Die Leitung sagt
  vor Aufgabe F nicht, dass die KI simuliert ist, aber danach.
- **Aufgaben** (Alltagssprache; kein Aufgabentext enthält den Titel eines Befehls, den der Ablauf braucht):

  | Aufgabe | Text | Start | Sollzustand | Zeit |
  | --- | --- | --- | --- | --- |
  | A | „Bau eine Grundplatte für ein kleines Gehäuse: 80 mm lang, 50 mm breit und 5 mm dick.“ | `leer` | wie Ablauf A | 5 min |
  | B | „Die Platte soll 8 mm dick werden, und ihre vier Ecken sollen mit 3 mm Radius rund sein.“ | `platte` | wie Ablauf B | 4 min |
  | C | „Setz den Deckel auf das Gehäuse, sodass beide fest zusammengehören.“ | `teile` | wie Ablauf C | 5 min |
  | D | „Probier aus, wie die Platte mit 10 mm Dicke aussieht, ohne den bisherigen Stand zu verändern. Gefällt es dir, soll es der neue Stand werden.“ | `platte` | Hauptstand Tiefe 10 mm, Entwurf übernommen | 5 min |
  | E | „Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“ | `platte` | richtige Antwort | 2 min |
  | F | „Lass dir vom Programm helfen: Aus der Platte soll ein nach oben offenes Kästchen mit 2 mm Wand werden. Schau dir das Ergebnis an, bevor es gilt, und mach die Wand danach 3 mm dick.“ | `platte` | Vorschlag übernommen, Schale mit Wandstärke 3 mm | 4 min |

- **Erfolgskriterium je Aufgabe:** Sollzustand erreicht, innerhalb der Zeit, ohne Hilfe. Die Leitung prüft den
  Sollzustand an den Werten im Eigenschaften-Panel.
- **Gate (Abnahme ap-41):** mindestens 4 von 5 Testpersonen lösen A, B und C (Zählweise: Offene Fragen,
  Punkt 2). D bis F werden berichtet (gelöst, Zeit, bei F: Vorschlag übernommen ja/nein), zählen aber nicht.
- **Ergebnisbogen** je Testperson: Kürzel (TP1 … TP5), Vorerfahrung CAD ja/nein und 3D-Druck ja/nein, je
  Aufgabe gelöst ja/nein, Zeit in min, Hilfe ja/nein, Beobachtungen. **Nachbefragung:** Was war schwer? Was
  hat gefehlt? Würden Sie die Vorschläge der KI nutzen?
- **Datenschutz (ADR-056):** keine Namen, kein Alter, keine Bildschirm- oder Tonaufnahmen ohne ausdrückliche
  Einwilligung; im Repository nur der pseudonyme Ergebnisbogen.
- **Auswertung:** Go oder No-Go für G1 mit Begründung; je Befund aus den Tests eine Folge für ap-08a oder
  ap-08b (oder ein Eintrag in `docs/ideen/`). Der Pilotlauf des Kernteams wird als solcher gekennzeichnet.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-41-ux-prototyp/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | `build.sh`, `npm run lint`, `npm test` (inkl. Wertfeld-Fälle), Build in `dist/` | Eigenständiger Prototyp |
| AK-2 | 13 Zustände × 2 Themen: PNG 1440 × 900, `bereit_ms` ≤ 3.000, 0 Eingaben, paarweise verschieden; unbekannter Zustand | Testzustände per Adresse |
| AK-3 | `tokens:check`; keine Literale außerhalb `src/erzeugt/`; Farben nur aus Tokens; Schrift Inter lokal | Tokens und Muster |
| AK-4 | `texte`: 0 feste Texte, 0 Git-Begriffe, kein „Speichern“; Schlüssel `de` = `en`, keine leeren Werte | Keine festen Texte |
| AK-5 | Register gültig; 0 Bedienelemente ohne Befehl; jeder Befehl in den ersten 3 Treffern und ausführbar; Kürzel sichtbar; Elemente in der Suche | Befehle und Suche |
| AK-6 | `ablauf a`, `b`, `c`: Sollzustand; Rückgängig; Befund bei Radius 30 mm | Kernabläufe A, B, C |
| AK-7 | `ablauf d` und Verwerfen mit Begründung, Ansichten „Ergebnis“ und „Alle Entwürfe“ | Entwürfe |
| AK-8 | `ablauf f` und die KI-Fälle (drei Wege, drei Absichten, Anhalten, Verwerfen, unbekannter Satz, ohne Auswahl) | Simulierter KI-Ablauf; KI-Vorschläge als Entscheidungskarte |
| AK-9 | `budget` in allen Zuständen | Komplexitätsbudget |
| AK-10 | `messen`: alle Schwellen | Komplexitätsbudget (Reaktion) |
| AK-11 | `anfragen` leer; Laufzeit-Abhängigkeiten nur aus der Liste; Lizenzen freizügig (ADR-034) | Eigenständiger Prototyp |
| AK-12 | Testleitfaden vollständig; Aufgabentexte ohne Befehlstitel; `ablauf e` | Testleitfaden |

## Risks / Trade-offs

- **Prototyp zu gut oder zu schlecht:** Was im Prototyp leicht geht, kann mit echter Geometrie schwer werden
  (z. B. Kanten treffen). Gegenmittel: nur vorbereitete Körper, Bericht nennt Abweichungen zum Produkt.
- **Kernteam als Testperson:** Vorwissen verzerrt; deshalb als Pilotlauf gekennzeichnet (Offene Fragen,
  Punkt 4).
- **Headless-Chromium mit Software-Rendering:** three.js läuft im CI ohne GPU langsamer; die Szene bleibt klein
  (≤ 4 Körper), die Schwellen messen Bedienreaktion, nicht Bildrate.
- **Chromium-Download in CI und Nachtschicht:** `build.sh` installiert ihn einmalig; fehlt das Netz, schlägt
  der Test im strengen Modus fehl (wie bei anderen Werkzeugen).
- **Wegwerf-Code wird doch übernommen:** ausgeschlossen per Nicht-Ziel; ap-08a/ap-08b nehmen nur Erkenntnisse
  aus dem Bericht mit.

## Open Questions

Die Fragen an das Kernteam stehen mit Empfehlung in proposal.md unter „Offene Fragen“ (Leitbild auf main und
Begriff „Vorschlag“, Zählweise, Zeitlimits, Testpersonen und Merge-Zeitpunkt, Bereitstellung, Ort des
Prototyps).
