## Context

Siehe proposal.md – Why. Grundlagen:

- **ap-41b-ux-bedienkonzept**, design.md Abschnitt „Befehlsregister und Platzierung“: Register `src/befehle.json`
  mit `id`, `familie`, `titel`, `parameter`, `bezug`, `rang`, `wesentlich`, `untergruppe`, optional `kuerzel`,
  `kontext` (Befehl ohne Bezug erscheint im Kontextmenü) und `folgt` (Platzhalter ohne Wirkung).
- Stand des Registers in PR #73 (`origin/change/ap-41b-ux-bedienkonzept`): 79 Befehle, davon 31 mit `folgt: true`.
  28 dieser 31 stehen im Befehlsinventar des Kernteams mit `beta: true`; die drei Simulationsbefehle
  (`simulation.lager`, `simulation.kraft`, `simulation.ergebnis`) stehen nicht im Inventar.
  Nachzählen: `jq '[.befehle[] | select(.folgt)] | length' spikes/ux-prototyp-2/src/befehle.json`.
- Heutige Logik in `src/modell/register.ts`: `kontextmenue()` nimmt alle Befehle, deren `bezug` zur Auswahlart passt
  (bei `bezug: keine` nur mit `kontext: true`), gruppiert nach Familie, je Gruppe höchstens 12, Unwesentliches hinter
  „Mehr …“ je Gruppe; `kontextaktionen()` = die ersten fünf nach `rang`. Platzhalter werden mit `data-folgt` und
  dem Zusatz „folgt“ angezeigt, aber nicht ausgefiltert.
- ADR-065 Punkte 2 (Menüleiste, ≤ 12 je Untergruppe), 3 (≤ 5 Kontextaktionen, die Suche findet alles), 9 (Ansicht
  gehört ans Modell), 12 (Sichtbarkeit ändern, nicht die Familie), 14 (jeder Beta-Befehl hat einen Ort: Menü,
  Kontextaktion oder Suche). `docs/design/muster.md`: Suche (ein Feld, gruppierte Ergebnisse), Kontextaktionen
  (über dem Gewählten, häufigste oben). ADR-060 (nichts nur beim Überfahren), ADR-061 (ein Muster je Aufgabe).

## Goals / Non-Goals

**Goals:** Das Kernteam sieht im Prototyp nur, was schon etwas tut, und findet am Rechtsklick eine kurze Liste. Alle
Grenzen sind Zahlen und werden vom Prüfwerkzeug gemessen.

**Non-Goals:** siehe proposal.md – Impact. Keine neue Bedienlogik, keine neuen Befehle, keine Familie wechselt.

## Decisions

### 1. „Wirkung“ ist eine Eigenschaft im Register

- Ein Befehl hat **Wirkung**, wenn er im Register kein `folgt: true` trägt. Das Feld bleibt die einzige Quelle; es
  gibt keine zweite Liste sichtbarer Befehle.
- `window.__cee.befehle()` liefert zusätzlich je Befehl `wirkung: boolean` (= nicht `folgt`) und `orte: string[]`
  (wo er gerade angezeigt wird: `start-menue`, `dropdown`, `kontextmenue`, `kontextmenue-mehr`, `kontextaktion`,
  `ansichtsleiste`, `menueleiste`, `auge`, `suche`, `suche-folgt`, `alle-befehle`).
- Neu in der Testschnittstelle: `window.__cee.ausgeloest()` – Liste aller ausgelösten Befehle seit dem Laden,
  **auch** Ansichts- und Fensterbefehle (anders als `protokoll()`, das nur Modelländerungen enthält), je Eintrag
  `{befehl, weg, wirkung}`. Ein Platzhalter, der doch ausgelöst wird, erscheint dort mit `wirkung: false`.

### 2. Platzhalter: nur in der Suche (Vorschlag, begründet)

Drei Möglichkeiten wurden abgewogen:

| Möglichkeit | Vorteil | Nachteil |
| --- | --- | --- |
| a) wie heute überall, mit „folgt“ | zeigt den späteren Umfang | genau das, was beim Testen stört |
| **b) nur in der Suche, eigene letzte Gruppe „Folgt später“** | Menüs und Kontextmenü zeigen nur Wirkendes; ADR-065 Punkt 14 bleibt erfüllt (jeder Beta-Befehl hat mit der Suche einen Ort); das Befehlsinventar-Kriterium aus ap-41b bleibt prüfbar | Platzhalter sind noch auffindbar |
| c) gar nicht anzeigen | am ruhigsten | 28 Beta-Befehle hätten keinen Ort; widerspricht ADR-065 Punkt 14 und dem Abnahmekriterium „Jeder Beta-Befehl hat einen Ort“ aus ap-41b |

**Entschieden: b).** Regeln:

- Start-Menü, Dropdowns, Kontextmenü (beide Ebenen), Kontextaktionen, Ansichtsleiste und „Alle Befehle zeigen“
  enthalten **0** Platzhalter.
- Die Suche zeigt Platzhalter nur in der Gruppe **„Folgt später“**, immer als letzte Gruppe nach Befehlen, Elementen
  und Hilfe, mit höchstens **3** Treffern sichtbar (Rest über „Alle zeigen“ in derselben Gruppe), Text in `text-3`,
  ohne Akzent. Ein Platzhalter ist nie der erste Treffer und nie vorausgewählt; Enter auf der leeren Eingabe oder auf
  dem ersten Treffer löst nie einen Platzhalter aus.
- Wird ein Platzhalter in der Suche ausdrücklich angeklickt, ändert sich nichts am Modell und an der Ansicht; die
  Rückmeldezeile zeigt den vorhandenen Text „{befehl} folgt in einer späteren Stufe.“ (Schlüssel aus ap-41b).
- „Alle Befehle zeigen“ (`hilfe.befehle-zeigen`) listet nur Befehle mit Wirkung; Platzhalter dort ebenfalls nur in
  einem eingeklappten Abschnitt „Folgt später“.
- Die drei Simulationsbefehle (nicht im Inventar) folgen derselben Regel; keine Sonderbehandlung (ADR-065 Punkt 11
  „Gleichheit statt Ausnahmen“).

Folgen für das Start-Menü und die Taskleiste: Von den Datei-Befehlen hat im Prototyp nur `element.anlegen` Wirkung;
das Start-Menü zeigt also nur „Neu“. Im Taskleisten-Eintrag „Simulation“ sind alle Befehle Platzhalter; die
Menüleiste zeigt dort **keine** Dropdowns (Start-Menü, Suche, Rückgängig und Schalter bleiben). Ein leeres Dropdown
wird nie gezeigt.

### 3. Kontextmenü: kurz, Rest hinter „Mehr …“

Kandidaten für eine Auswahlart sind alle Befehle, die

1. Wirkung haben (kein `folgt`),
2. deren `bezug` zur Auswahlart passt (Tabelle `PASST` aus ap-41b, unverändert; `bezug: keine` nur mit
   `kontext: true`),
3. die im aktuellen Zustand anwendbar sind (z. B. „Einblenden“ nur bei Ausgeblendetem, „Fortsetzen“ nur bei
   Pausiertem, „Verlassen“ nur bei aktivem Element – wie heute `anwendbar()`),
4. **und keinen festen, dauernd sichtbaren Ort außerhalb des Kontextmenüs haben.** Das sind (abschließend):
   - Familie **Ansicht** – Ansichtsleiste im Modell (ADR-065 Punkt 9): `ansicht.einpassen`, `ansicht.auf-auswahl`,
     `ansicht.projektion`, `darstellung.wechseln`, `ansicht.isolieren`, `ansicht.alles-einblenden`,
     `ansicht.verworfenes` und die Blick-Befehle;
   - Familie **Fenster** – Schalter und Suche in der Menüleiste: `fenster.*`, `suche.oeffnen`, `task.wechseln`,
     `dokument.wechseln`, `thema.umschalten`, `einstellung.navigationsprofil`;
   - **Verlauf** – Knopf Rückgängig in der Menüleiste: `bearbeiten.rueckgaengig`, `bearbeiten.wiederholen`.

   Diese Befehle bleiben an ihrem festen Ort (Knopf in der Menüleiste, Ansichtsleiste oder – ohne eigenen Knopf –
   Dropdown ihrer Familie), mit Kürzel und in der Suche. Sie „wandern nach oben“ in die Menüleiste bzw. an die
   Ansichtsleiste und tauchen im Kontextmenü nicht doppelt auf (zur Doppelung innerhalb der Menüleiste Abschnitt 10).

Aufbau:

- **Sichtbare Ebene:** die ersten höchstens **8** Kandidaten nach `rang` (kleiner zuerst; bei gleichem Rang nach
  Reihenfolge im Register). Angezeigt nach Familie in der festen Familienreihenfolge aus ap-41b, innerhalb nach
  `rang`; zwischen Familien eine Trennlinie (`linie`), **keine** Gruppenüberschriften in dieser Ebene.
- **„Mehr …“:** genau ein Eintrag am Ende, nur wenn es mehr als 8 Kandidaten gibt. Er öffnet eine zweite Ebene
  (Untermenü rechts daneben, per Pfeil rechts oder Enter) mit allen übrigen Kandidaten, nach Familie gruppiert mit
  Überschrift, höchstens 12 je Gruppe, innerhalb nach `rang`. Esc oder Pfeil links schließt nur die zweite Ebene.
- `wesentlich` entscheidet im Kontextmenü nicht mehr über „Mehr …“; der Rang entscheidet. `wesentlich` bleibt im
  Register (Befehlsinventar, ADR-065 Punkt 12), hat im Kontextmenü aber keine Wirkung mehr.
- Die **Kontextaktionen** über dem Gewählten sind die ersten höchstens **5** Kandidaten nach `rang` und damit immer
  in der sichtbaren Ebene enthalten. Keine eigene Liste.
- Struktur und Modell zeigen für dieselbe Auswahl dasselbe Menü (beide Ebenen).

Grenzwerte (gemessen von `pruefen kontextmenue`):

| Größe | Grenze |
| --- | --- |
| sichtbare Befehlseinträge je Auswahlart | ≤ 8 |
| Einträge „Mehr …“ | 0 bei ≤ 8 Kandidaten, sonst genau 1 |
| Gruppenüberschriften in der sichtbaren Ebene | 0 |
| Einträge je Gruppe in „Mehr …“ | ≤ 12 |
| Kontextaktionen | ≤ 5, gleich den ersten Einträgen nach `rang` |
| Platzhalter oder Befehle mit festem Ort (Liste oben) im Kontextmenü | 0 |
| Höhe der sichtbaren Ebene bei 1440 × 900 | ≤ 360 px (8 Zeilen, Trennlinien, „Mehr …“) |

Die Höhe folgt aus den Tokens für Zeilenhöhe und Abstände; schlägt sie trotz ≤ 8 Einträgen fehl, ist das ein Punkt
für „Offene Fragen“ im PR, keine Änderung der Grenze.

### 4. Erwartete sichtbare Ebene im Prototyp (zur Orientierung, nicht Prüfreferenz)

Mit den Rängen aus PR #73 ergibt sich für einen gewählten Schritt (Grundplatte im Halter): Duplizieren (1),
Umbenennen (2), Verwerfen (3), Ausblenden (4), Wert ändern (11), Neu anlegen (101), Pausieren (119), Alles wählen
(121); hinter „Mehr …“: Umkehren, Ansicht speichern, Baugruppe anlegen. Kontextaktionen: Duplizieren, Umbenennen,
Verwerfen, Ausblenden, Wert ändern. Der Test prüft die Regel, nicht diese Liste. Ränge darf die Umsetzung **nicht**
ändern, damit das Kernteam die Wirkung der Regel allein beurteilt; Rangänderungen sind eine Frage (Open Questions 3).

### 5. Dropdowns und Start-Menü

- Zeigen nur Befehle mit Wirkung, weiterhin aus dem Register nach Familie und Untergruppe, ≤ 12 je Untergruppe,
  ohne Doppelungen nach Abschnitt 10.
- Eine Untergruppe ohne Befehl mit Wirkung entfällt samt Überschrift; ein Dropdown ohne Befehl mit Wirkung entfällt
  samt Auslöser.

### 6. Testschnittstelle und Prüfwerkzeug

Erweitert, nicht ersetzt (ap-41b bleibt gültig):

| Befehl | Ausgabe (neu bzw. erweitert) |
| --- | --- |
| `kontextmenue` | je Auswahlart (`teil`, `schritt`, `kante`, `baugruppe`, `mehrfach`, `keine`) und Zone: `sichtbar: [{befehl, familie}]`, `trennlinien`, `ueberschriften`, `mehr: bool`, `mehr_gruppen: [{name, eintraege}]`, `hoehe_px`, `kontextaktionen`, `kandidaten_nach_rang` |
| `sichtbarkeit-befehle` (neu) | je Taskleisten-Eintrag: Einträge von Start-Menü, Dropdowns, Ansichtsleiste und „Alle Befehle zeigen“ mit `befehl` und `folgt`; leere Dropdowns/Untergruppen |
| `suche` (neu) | für die Eingaben aus Abschnitt 7: Gruppen in Reihenfolge, Treffer je Gruppe, erster Treffer, Enter-Ergebnis |
| `doppelt` (neu) | je Taskleisten-Eintrag und Zustand (`halter`, `auswahl`, `mehrfach`, `aktiv`, `ausgeblendet`) je Menü (Start-Menü, jedes Dropdown, Knöpfe der Menüleiste, Ansichtsleiste mit ihrem Aufklappmenü, Menü am Auge der Struktur, Kontextmenü mit Ebene „Mehr …“): `{menue, eintraege: [{befehl, titel, handlung}]}`, dazu `doppelte_ids`, `doppelte_titel`, `doppelte_handlungen` je Menü und `doppelte_ids_menueleiste` über die ganze Menüleiste |
| `ausloesen` (neu) | löst jeden sichtbaren Eintrag in Start-Menü, Dropdowns, Kontextmenü (beide Ebenen) und Kontextaktionen der Zustände `halter` und `auswahl` einmal aus, je aus frischem Zustand; Ergebnis aus `ausgeloest()` |

### 7. Sucheingaben für den Test

Die Prüfung der Suche nutzt Eingaben, die sowohl Befehle mit Wirkung als auch Platzhalter treffen, abgeleitet aus
den Titeln in `src/i18n/de.json` (keine erfundenen Listen): `ansicht` (Ansichtsbefehle mit Wirkung und
`ansicht.schnitt`, `ansicht.ergebnis`), `auswahl` (Alles wählen und `auswahl.aehnliche`), `baugruppe`
(`element.umhaengen` und die Verbindungs-Platzhalter), sowie ein Titel, der nur Platzhalter trifft (der Test wählt
ihn aus dem Register: den ersten `folgt`-Befehl, dessen deutscher Titel kein Wort mit einem Befehl mit Wirkung
teilt).

### 8. Zuordnung der Abnahmetests (`tests/acceptance/ap-41c-ux-schlankes-menue/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | `sichtbarkeit-befehle`, `ausloesen`: 0 Platzhalter in Menüs, jeder sichtbare Eintrag wirkt, keine leeren Dropdowns, Simulation ohne Dropdowns | Nur Befehle mit Wirkung sichtbar; Fensteraufbau |
| AK-2 | `suche`: Gruppe „Folgt später“ zuletzt, ≤ 3 sichtbar, nie erster Treffer, Klick ohne Wirkung; Inventar-Abgleich | Nur Befehle mit Wirkung sichtbar |
| AK-3 | `kontextmenue`: ≤ 8 sichtbar, „Mehr …“, keine festen Orte, Kontextaktionen, gleich in beiden Zonen, Höhe | Kontextmenü aus dem Befehlsregister |
| AK-5 | `doppelt`: jeder Befehl, Titel und jede Handlung höchstens einmal je Menü; jede ID höchstens einmal in der Menüleiste; Varianten nach Auswahl | Jeder Befehl nur einmal je Menü |
| AK-4 | Regression: `pruefen ablauf e…l` und `messen` (`kontextmenue_p95_ms` < 100 ms) | Kontextmenü aus dem Befehlsregister |

Alle Werte misst der Test selbst über die Prüfbefehle oben (`npm --prefix spikes/ux-prototyp-2 run --silent
pruefen -- <befehl> --json`).

### 9. Verhältnis zu den Abnahmetests von ap-41b

Diese laufen weiter. Bekannter Konflikt: `test_gl_befehle.py::test_kontextmenue_gleich_in_struktur_und_modell`
fordert `mehr is (not wesentlich)`. Mit diesem Change gilt „die ersten 8 nach Rang sichtbar“. Vorgehen
(entschieden): Der test-author schreibt die Tests von ap-41c auf `tests/ap-41c-ux-schlankes-menue` und öffnet
**zusätzlich** einen Einspruch auf `tests/ap-41b-ux-bedienkonzept`, der genau diese Zusicherung durch einen Verweis
auf ap-41c ersetzt. Weitere Prüfungen von ap-41b (z. B. `test_register_erzeugt_menues_nicht_von_hand`,
`test_jeder_beta_befehl_hat_einen_ort`) prüft der test-author dabei auf Verträglichkeit; sie sollen ohne Änderung
grün bleiben (der Probebefehl mit Rang 99 steht in der Gruppe „Bearbeiten“, sichtbar oder hinter „Mehr …“;
Platzhalter haben mit der Suche einen Ort). Die Umsetzung auf `change/ap-41c-ux-schlankes-menue` beginnt erst, wenn
beide Testzweige gemergt sind.

### 10. Doppelte Einträge: Ursache und Regel

Rückmeldung des Kernteams (zweite Runde): Viele Befehle erscheinen doppelt und machen die Menüs lang. Untersucht am
Stand von PR #73 (`origin/change/ap-41b-ux-bedienkonzept`, Commit `05a1426`, `src/befehle.json`, `src/ui/menue.ts`,
`src/zonen/menueleiste.ts`, `src/zonen/modell.ts`, `src/zonen/struktur.ts`, `src/wirkungen.ts`).

**Nicht die Ursache:** Im Register gehört jede ID zu genau einer Familie und einer Untergruppe; `familienMenue()`
erzeugt je Familie jede ID genau einmal, kein Titel kommt innerhalb einer Familie zweimal vor, und keine Untergruppe
ist größer als 12 (die Teilung in „<Name> 2“ greift nie). Die Doppelungen entstehen an drei anderen Stellen:

| Nr. | Ursache | Wo | Betroffene Befehle |
| --- | --- | --- | --- |
| D1 | **Gleiche Handlung unter zwei IDs.** Für eine und für mehrere gewählte Elemente gibt es je eine eigene ID; beide stehen in derselben Familie und Untergruppe und rufen in `wirkungen.ts` dieselbe Funktion auf (`duplizieren(...)`, `verwerfen(...)`). | Dropdown „Bearbeiten“ (Untergruppe „Element“), Menü am Auge (Familie Sichtbarkeit) | `element.duplizieren`/`auswahl.duplizieren`, `element.verwerfen`/`auswahl.verwerfen`, `element.ausblenden`/`auswahl.ausblenden` |
| D2 | **Knopf und Dropdown in derselben Menüleiste.** `baueMenueleiste()` setzt eigene Knöpfe für Suche, Rückgängig, Wiederholen und die drei Schalter; die Dropdowns „Bearbeiten“ (Untergruppe „Verlauf“) und „Fenster“ (Untergruppen „Zonen“, „Suche“) zeigen dieselben IDs noch einmal. | Menüleiste | `bearbeiten.rueckgaengig`, `bearbeiten.wiederholen`, `fenster.struktur`, `fenster.panel`, `fenster.rechts`, `suche.oeffnen` |
| D3 | **Knopf und Aufklappmenü in derselben Ansichtsleiste.** `ansichtsleiste()` zeigt sechs Knöpfe (`LEISTE`), ihr Aufklappmenü `familienMenue('Ansicht')` danach die ganze Familie, also dieselben sechs noch einmal. | Ansichtsleiste im Modell | `ansicht.einpassen`, `ansicht.auf-auswahl`, `ansicht.isolieren`, `ansicht.alles-einblenden`, `ansicht.projektion`, `darstellung.wechseln` |

Dazu kommt im Kontextmenü die Doppelung mit Menüleiste und Ansichtsleiste (Ansicht, Verlauf, Fenster), die schon
Abschnitt 3 behebt.

**Regel (entschieden):**

- **Ein Menü** ist: das Start-Menü, jedes Dropdown, die Ansichtsleiste samt Aufklappmenü, das Menü am Auge der
  Struktur, das Kontextmenü samt Ebene „Mehr …“. In jedem Menü erscheint jede Befehls-ID, jeder angezeigte Titel und
  jede Handlung höchstens einmal.
- **Die Menüleiste einer Taskleisten-Ansicht** (Start-Menü, alle Dropdowns und alle Knöpfe zusammen) zeigt jede ID
  höchstens einmal. Befehle mit eigenem Knopf (Suche, Rückgängig, Wiederholen, die drei Schalter) stehen nur als
  Knopf, nicht zusätzlich im Dropdown (behebt D2). Ihr Kürzel steht weiter am Knopf (Rückgängig, Wiederholen, Suche
  sichtbar als Taste, Schalter im Namen des Knopfs) und in der Suche.
- **Ansichtsleiste:** Das Aufklappmenü zeigt nur Befehle der Familien Ansicht und Ansicht speichern, die keinen Knopf
  in der Leiste haben (behebt D3).
- **Handlung:** Neues Feld `handlung` im Register (z. B. `"duplizieren"`), gemeinsam für Varianten derselben Handlung
  (behebt D1). Ein Menü zeigt je Handlung nur die Variante, deren `bezug` zur aktuellen Auswahl passt (bei mehreren
  gewählten Elementen die Variante mit `bezug: mehrfach`, sonst die mit `bezug: element`). Beide IDs bleiben im
  Register und in der Suche (dort als ein Treffer je Handlung, ausgeführt wird die passende Variante); Familie und
  `rang` ändern sich nicht. Das Feld ist eine Eigenschaft der Daten, keine Sonderlogik je Befehl (ADR-045).
- Erlaubt bleiben Wege in **verschiedenen** Zonen: Kontextaktionen wiederholen den Anfang des Kontextmenüs (ADR-065
  Punkt 3), das Kontextmenü wiederholt Befehle aus Dropdowns, das Auge an der Zeile wiederholt „Ausblenden“. Das ist
  kein Menü und wird nicht als Doppelung gezählt.

Zur Orientierung (keine Prüfreferenz): Das Dropdown „Bearbeiten“ hat heute 13 Einträge; nach Abschnitt 2, 10 D1 und
D2 bleiben bei einem gewählten Element Duplizieren, Umbenennen, Verwerfen, Zurückholen (falls anwendbar), Wert setzen,
Berechnung pausieren und Berechnung fortsetzen, also höchstens 7.

Verträglichkeit mit ap-41b: `test_kuerzel_aus_dem_register` verlangt `im_menue` für jedes Kürzel. Der Prüfbefehl
`tastatur` muss dafür den Knopf in der Menüleiste als Ort des Kürzels werten (das gilt schon heute für die Suche).
Der test-author prüft das beim Einspruch nach Abschnitt 9 mit; die Zusicherung selbst bleibt unverändert.

## Risks / Trade-offs

- **Wichtiges rutscht hinter „Mehr …“:** Die Ränge stammen aus ap-41b und sind geschätzt (z. B. „Alles wählen“
  sichtbar, „Ansicht speichern“ nicht). Gegenmittel: Ränge bleiben in diesem Change unverändert, damit das Kernteam
  die Regel beurteilt; eine Anpassung ist eine Frage (Open Questions 3).
- **Start-Menü fast leer:** wirkt im Prototyp unfertig, ist aber ehrlich. Alternative als Frage (Open Questions 1).
- **Suche zeigt noch Platzhalter:** bewusst wegen ADR-065 Punkt 14; abgeschwächt durch letzte Gruppe, Begrenzung
  auf drei und leise Darstellung.
- **Untermenü per Tastatur und Touch:** zweite Ebene muss mit Pfeiltasten (WAI-ARIA Menu) und ohne Überfahren
  bedienbar sein (ADR-060); „Mehr …“ öffnet per Klick/Tippen, nicht beim Überfahren.

## Open Questions

1. **Start-Menü nur mit „Neu“?** Vorschlag: Ja, ehrlich zeigen, was wirkt. Bei Nein bleiben Öffnen, Teilen,
   Exportieren und Einstellungen im Start-Menü als Ausnahme mit „folgt“ sichtbar, weil ADR-065 Punkt 4 sie dort
   verlangt. Bis zur Antwort gilt der Vorschlag.
2. **Eigene Kontextleiste oben in der Menüleiste?** Das Kernteam nannte „Befehlsleiste oben (Kontextaktionen/
   Menüleiste)“. Dieser Change legt die Befehle mit festem Ort in die vorhandenen Orte der Menüleiste und an die
   Ansichtsleiste und lässt die fünf Kontextaktionen über dem Gewählten (ADR-065 Punkt 3, `muster.md`). Vorschlag:
   so lassen. Bei Ja (Kontextaktionen wandern vom Gewählten in die Menüleiste) braucht es vorher eine Änderung von
   ADR-065 Punkt 2 und von `muster.md` (Kernteam-Dateien); danach ein eigener kleiner Change.
3. **Ränge nachschärfen?** Vorschlag: erst nach dem nächsten Ausprobieren. Wenn dem Kernteam im gekürzten Menü ein
   Befehl fehlt oder stört, nennt es ihn; dann ändert sich nur sein `rang` im Register (ADR-065 Punkt 12).
4. **Grenze 8 oder 6?** Der Auftrag nennt „etwa 6–8“. Vorschlag: 8, weil die fünf Kontextaktionen plus Ausblenden,
   Neu und Alles wählen sonst nicht ohne „Mehr …“ erreichbar wären. Bei 6 ändert sich nur die Zahl in Regel und Test.
5. **Rückgängig nicht mehr im Dropdown „Bearbeiten“?** Viele Programme führen es dort; nach der Regel in Abschnitt 10
   steht es nur noch als Knopf mit Taste in der Menüleiste (und in der Suche). Vorschlag: Ja, so lassen, weil der Knopf
   immer sichtbar ist. Bei Nein bleibt Rückgängig/Wiederholen als einzige erlaubte Doppelung im Dropdown.
