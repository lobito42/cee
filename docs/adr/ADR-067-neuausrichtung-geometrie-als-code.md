# ADR-067: Neuausrichtung – Geometrie als Code, parametrisch und editierbar

- Status: vorgeschlagen
- Datum: 2026-11-04
- Entscheider: Kernteam
- Nimmt wieder auf: ADR-003 (Code ist die Quelle der Wahrheit)
- Stellt zurück: ADR-028 und ADR-033 als Startpunkt (Element-Graph, Echtzeit-Zusammenarbeit), ADR-059/ADR-062
  (Reihenfolge der Meilensteine), ADR-064 (Nachtschicht und Auto-Merge als Hauptarbeitsweise)

## Kontext

Nach zwei Wochen und 215 Commits kann der Prototyp Koordinatensysteme, Punkte und Linien anlegen. Gut 38.000
Zeilen sind Regeln, Specs, Abnahmetests und Agenten-Werkzeug; der Geometrie-Worker hat rund 840 Zeilen, der
Server rund 860. Gebaut wurde von unten nach oben (Datenmodell, Sync, Bindungen, Server); das Erlebnis, das den
Wert zeigt, kam zuletzt.

Am deutlichsten wurde das bei der KI-Konstruktion (ap-52): Der Mensch sollte Sätze wie „setze einen Punkt bei
x 40 mm, y 20 mm“ schreiben. Das ist langsamer und fehleranfälliger als ein Klick und zwingt die KI in das, was sie
am schlechtesten kann (Koordinaten, räumliches Rechnen), statt in das, was sie gut kann (Absicht in Struktur und
lesbaren Code übersetzen).

Der Kern der Idee steht schon in ADR-003: Ein Teil ist ein Python-Modul mit typisierten Parametern und einer
`build()`-Funktion (build123d). Dieser Bauplan ist parametrisch, lesbar, versionierbar, und KI-Modelle schreiben
und ändern ihn zuverlässig. `parts/examples/halter.py` zeigt die Form. ADR-028 hat das zugunsten des
Element-Graphen ersetzt, weil Echtzeit-Zusammenarbeit und Knoten-Editor ohne Parsen leichter sind – beides ist
für den ersten echten Nutzen aber nicht nötig.

## Entscheidung

1. **Ein Ziel, durchgängig:** Der Mensch beschreibt ein Teil, die KI schreibt einen parametrischen Bauplan, der
   Worker rechnet ihn, der Mensch sieht das Teil in 3D, ändert benannte Größen (Regler oder Satz) und lädt eine
   STL für den 3D-Druck. Alles wird daran gemessen, ob es diesem Ablauf dient.
2. **Der Bauplan ist die Quelle der Wahrheit (ADR-003 gilt wieder).** Ein Teil ist eine Python-Datei mit
   `Params` (benannte Größen mit Einheit, Standardwert, Bereich) und `build(p) -> Part`, plus benannten
   Konstruktionsschritten (`feature`). Geometrie, Netze und STL sind abgeleitet und werden nicht gespeichert
   (ADR-032 bleibt).
3. **Editierbar auf drei Wegen, immer am selben Bauplan:** Größen-Liste mit Reglern (ändert nur Parameterwerte),
   Code-Ansicht zum direkten Bearbeiten, Chat. Die KI ändert den Bauplan nur als Vorschlag mit Vorschau
   (vorher/nachher in 3D, geänderte Größen, Code-Diff) – Übernehmen oder Verwerfen (ADR-021 bleibt).
4. **Parametrisch heißt prüfbar parametrisch.** Ein Bauplan gilt erst als gut, wenn Prüfer – nie das Modell selbst
   (ADR-053) – bestätigen: er läuft, das Teil ist gültig und geschlossen, und jede Größe lässt sich im erlaubten
   Bereich ändern, ohne dass das Teil zerbricht. Keine festen Zahlen im Code, die eigentlich Größen sind.
5. **Zurückgestellt, nicht gelöscht:** Element-Graph im Rust-Kern, CRDT-Sync, Elixir-Server, Bindungen,
   Knoten-Editor, Fachpakete und Akustik. Sie kommen später *um* den Bauplan herum (der Bauplan wird zum
   Element vom Typ `script`, wie ADR-028 es schon vorsieht). Bestehender Code bleibt im Repository.
6. **Arbeitsweise: kurze Runden mit dem Menschen.** Eine Runde hat ein Ziel, das man ausprobieren kann, und endet
   mit einer Vorschau im Browser. Keine Nachtschicht, kein vierstufiger Ablauf (Spec → Tests → Umsetzung →
   Archiv) für Prototyp-Arbeit; ein kurzer Rundenplan in `docs/plan.md` und Prüfungen im selben Branch genügen.
   OpenSpec bleibt für Teile, die stabil werden (Format des Bauplans, Prüfer).
7. **Vorbilder über Prinzipien, nicht Nachbau.** `docs/design/prinzipien.md` hält fest, welches Prinzip wir
   von welchem Vorbild übernehmen; tragend ist „ein Bauplan, viele Sichten“. Jeder Bildschirm wird zuerst
   gezeichnet und vom Menschen bestätigt, dann gebaut; abgenommen wird im Vergleich mit dem Entwurf, nicht über
   Zähl-Tests. Der bisherige Prototyp ist Steinbruch, nicht Vorlage.
8. **Weiter gültig:** Lizenzen und Abhängigkeiten (ADR-034), kein fester KI-Anbieter, lokale Modelle, keine Daten
   an Dritte ohne Wahl (ADR-037), Einheiten (ADR-057), Designsystem (ADR-061), Kernel-Schnittstelle im Worker
   (ADR-032). Wo ein älteres ADR dieser Entscheidung widerspricht, gilt diese.

## Alternativen

- **Weiter wie bisher (Element-Graph zuerst):** gründlich, aber der erste echte Nutzen liegt Wochen bis Monate
  entfernt, und jede Stufe zerfällt in kleine Abnahmen ohne erkennbaren Wert.
- **Neues Repository:** sauberer Schnitt, verliert aber Worker, Prototyp-Oberfläche, Vorschau-Workflow und
  Konzept. Aufräumen am selben Ort ist billiger.

## Konsequenzen

- Echtzeit-Zusammenarbeit und Knoten-Editor kommen später und brauchen dann eine Brücke zwischen Bauplan und
  Graph (Parsen bzw. Script-Element). Das ist der bewusste Preis.
- `openspec/queue.yaml` ruht; die Nachtschicht ist ausgeschaltet. Die laufende KI-Stufe ap-52 wird nicht
  abgenommen; ihr Unterbau (Werkzeuge aus dem Befehlsregister, Vorschlagskarte, Anbieter-Schnittstelle) kann in
  Runde 1 weiterverwendet werden.
- `AGENTS.md` wird stark gekürzt; die Regeln stehen dort als etwa zehn Grundsätze.
