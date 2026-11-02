## ADDED Requirements

### Requirement: Befehle im Register mit echter Wirkung
Der Prototyp SHALL die sechs Befehle aus design.md Abschnitt 5 im einen Befehlsregister führen (ADR-045), ohne
`folgt: true`. Nach der Platzhalter-Regel aus ap-41c MUST jeder in Menü, Suche und – je nach Bezug – im
Kontextmenü erscheinen und den Graphen ändern; die Grenzen aus ADR-065 Punkte 2 und 3 MUST weiter gelten.

#### Scenario: [auto] Orte und Grenzen
- **WHEN** der Abnahmetest `pruefen -- drahtmodell befehle --json` aufruft
- **THEN** stehen alle 6 Befehle mit `folgt` = false im Ergebnis, jeder hat den Ort Menü (Dropdown „Referenz“ unter
  „Modellieren“) und Suche, `referenz.punkt-relativ` zusätzlich Kontextaktion auf einem Punkt, die drei
  Linienbefehle Kontextaktion bei zwei gewählten Punkten, das Dropdown hat ≤ 12 Einträge und jedes Kontextmenü
  höchstens 5 Kontextaktionen

#### Scenario: [auto] Jeder Befehl wirkt
- **WHEN** jeder der 6 Befehle im Zustand `drahtmodell-beispiel` mit passender Auswahl über `ablauf` ausgelöst wird
- **THEN** ändert sich `graph_hash` in 6 von 6 Fällen, und `konsolenfehler` ist leer

### Requirement: Anlegen in der Vorschau
Die Vorschau SHALL Koordinatensysteme, Punkte (frei per Klick, auf Koordinaten, relativ) und Linien als Elemente
in der Elementform anlegen, über die Brücke vom Worker berechnen lassen und an der Lage aus dem Ergebnis zeigen.
Die Vorschau MUST NOT selbst Geometrie berechnen; Werte MUST mit Einheit eingegeben werden können (ADR-057).

#### Scenario: [auto] Ablauf Koordinatensystem, Punkte, Linien
- **WHEN** im Zustand `drahtmodell-leer` per `ablauf` nacheinander: „Koordinatensystem setzen“, Eigenschaft `x` =
  „100 mm“ und `rz` = „30°“; „Punkt setzen“ mit Klick auf `modell_mm` (150, 40, 0); Eigenschaft `x` des Punkts =
  „1,2 m“; „Punkt relativ setzen“ auf diesen Punkt mit `z` = „25 mm“; beide Punkte wählen und „Strecke“, „Gerade“,
  „Halbgerade“ auslösen
- **THEN** enthält der Graph genau 1 `frame` mit 7 Kindern, 2 `point`, je 1 `segment`, `line` und `ray`; jede
  Lage in `szene` stimmt auf 10⁻³ mm mit `ergebnis` überein; der freie Punkt lag vor der Änderung auf der XY-Ebene
  von K1 (Abstand ≤ 10⁻³ mm, Klickpunkt ± 1 mm) und danach bei `x` = 1 200 mm im System K1; der relative Punkt
  liegt 25 mm über ihm

#### Scenario: [auto] Linie ohne zwei gewählte Punkte
- **WHEN** im Zustand `drahtmodell-beispiel` „Strecke durch zwei Punkte“ ohne Auswahl ausgelöst wird, dann zwei
  Punkte angeklickt werden, und in einem
  zweiten Lauf nach dem ersten Klick Esc gedrückt wird
- **THEN** zeigt die Rückmeldezeile die Aufforderung „Zwei Punkte wählen“, im ersten Lauf entsteht genau 1 Strecke
  mit `a` und `b` in Klickreihenfolge, im zweiten Lauf ist `graph_hash` danach gleich wie davor

### Requirement: Auswahl per Klick
Ein Klick im Modell SHALL das nächste sichtbare Wireframe-Element im Fangradius von 6 px wählen (Vorrang Punkt vor
Linie vor Ebene) und dieselbe Auswahl in Struktur und Eigenschaften zeigen wie bei ap-41b. Ausgeblendete und
verworfene Elemente MUST NOT wählbar sein. Die Auswahl MUST über Element-IDs adressiert sein (ADR-058).

#### Scenario: [auto] Klick wählt
- **WHEN** im Zustand `drahtmodell-beispiel` nacheinander P1, S1 (Mitte), die XY-Ebene von K1 (Ecke, abseits von
  Achsen) und die Stelle von P2, an der auch S1 endet, angeklickt werden
- **THEN** ist `auswahl` jeweils genau [P1], [S1], [XY-Ebene von K1] bzw. [P2], und die Struktur markiert dieselbe
  Zeile als gewählt (4 von 4)

#### Scenario: [auto] Nicht wählbar, wenn ausgeblendet
- **WHEN** P1 ausgeblendet und dann auf seine Stelle geklickt wird
- **THEN** ist P1 nicht in `auswahl`, und `szene` meldet P1 mit `sichtbar` = false

### Requirement: Ausblenden und Verwerfen
Ausblenden SHALL nur die Ansicht ändern, nie den Graphen (ADR-065 Punkt 9, ADR-015). Verwerfen SHALL ein Element
als verworfen markieren statt es zu löschen (ADR-051); Folgeelemente MUST als fehlerhaft mit Befund erscheinen,
unabhängige Elemente MUST unverändert bleiben (ADR-050), und Rückgängig MUST den vorigen Zustand herstellen.

#### Scenario: [auto] Ausblenden ändert den Graphen nicht
- **WHEN** im Zustand `drahtmodell-beispiel` eine Achse, eine Ebene und S1 ausgeblendet und wieder eingeblendet werden
- **THEN** ist `graph_hash` nach jedem Schritt gleich dem Ausgangswert, und `sichtbar` wechselt für genau das
  betroffene Element auf false und zurück auf true

#### Scenario: [auto] Verwerfen mit Folgebefund und Rückgängig
- **WHEN** P1 verworfen und danach Rückgängig ausgelöst wird
- **THEN** ist P1 nach dem Verwerfen weiter im Graphen mit `meta.verworfen` = true und nicht in `szene`, P3, S1 und
  G1 zeigen den Zustand „fehlerhaft“ mit Befund `input_discarded` im Panel „Befunde“, K1 mit Kindern, P2 und H1
  sind unverändert in `szene`; nach Rückgängig ist `graph_hash` gleich dem Ausgangswert und alle Elemente sind
  `aktuell`

### Requirement: Brücke zum Worker robust und lokal
Die Brücke SHALL den Worker als eigenen Prozess mit Zeitlimit 10 s je Auftrag betreiben, nach einem Absturz neu
starten und nur Anfragen an den eigenen Ursprung `127.0.0.1` zulassen. Ohne Brücke MUST die Vorschau bedienbar
bleiben und einen Befund zeigen; die Abnahmetests von ap-41b und ap-41c MUST ohne Worker weiter grün sein.

#### Scenario: [auto] Absturz und Neustart
- **WHEN** im Zustand `drahtmodell-beispiel` per `ablauf` `{bruecke: "beenden"}` und danach „Punkt setzen“ mit
  einem Klick ausgeführt werden
- **THEN** kommt höchstens ein Befund `kernel_unavailable`, die vorhandenen Elemente bleiben in `szene`, und der
  neue Punkt ist ≤ 5 s nach dem Klick mit Lage aus einem neuen Ergebnis sichtbar

#### Scenario: [auto] Ohne Brücke
- **WHEN** der statische Build (`build.sh`) ohne Brücke geöffnet und „Koordinatensystem setzen“ ausgelöst wird
- **THEN** zeigt das Panel „Befunde“ „Geometrie-Dienst nicht erreichbar“, das Element steht in der Struktur,
  `konsolenfehler` ist leer, und `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept
  tests/acceptance/ap-41c-ux-schlankes-menue` ist grün

#### Scenario: [auto] Nur lokal und schnell
- **WHEN** der Ablauf aus „Ablauf Koordinatensystem, Punkte, Linien“ 5-mal mit warmem Worker läuft
- **THEN** geht jede Anfrage in `anfragen` an `127.0.0.1` auf dem Port der Vorschau (0 andere Hosts), und der
  Median von `bereit_ms` je Befehl ist ≤ 500 ms

#### Scenario: [mensch] Ausprobieren
- **WHEN** eine Person aus dem Kernteam die Klick-Anleitung aus design.md Abschnitt 9 (Schritte 1 bis 7) im Browser
  durchgeht
- **THEN** erreicht sie jede beschriebene Erwartung ohne Hilfe, und sie beantwortet die Frage „Fühlt sich das
  Setzen von Koordinatensystemen, Punkten und Linien richtig an, um darauf als Nächstes Skizzen aufzubauen?“ mit
  Ja oder Nein mit kurzer Begründung im PR
