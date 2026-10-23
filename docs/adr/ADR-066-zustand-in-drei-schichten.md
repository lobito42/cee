# ADR-066: Zustand in drei Schichten – Eingaben, Rechenergebnis, Ansicht

- Status: vorgeschlagen
- Datum: 2026-10-23
- Entscheider: Kernteam
- Ergänzt: ADR-028 (Quelle der Wahrheit), ADR-032 (Geometrie als Cache), ADR-065 (Ansicht am Modell)

## Kontext

Im Projekt wird an drei Dingen gearbeitet, die leicht verwechselt werden: an dem, was Menschen und Agenten
eingeben, an dem, was daraus berechnet wird, und an dem, was jemand gerade sieht. ADR-028 und ADR-032 legen die
ersten beiden Schichten im Kern fest, ADR-015 und ADR-065 sagen, dass Ausblenden nur die Ansicht betrifft. Nirgends
steht aber als eine Regel, wohin ein Zustand gehört und wie man belegt, dass ein Ergebnis zu bestimmten Eingaben
passt. Ohne das drohen Ansichtszustand im Graphen, gespeicherte Geometrie als zweite Wahrheit und Streit darüber,
ob zwei Exporte „dasselbe“ sind. Der Begriff „Ergebnis“ ist im Glossar schon für einen übernommenen Entwurf
vergeben (ADR-051); diese Regel nennt die berechnete Schicht deshalb **Rechenergebnis**.

## Entscheidung

1. **Schicht 1, Eingaben:** Alles, was Menschen oder Agenten festlegen, ist ein Element im Graphen (Skizze,
   Parameter, Regel, Verbindung, benannte Ansicht). Nur diese Schicht wird versioniert und synchronisiert. Entwürfe
   und Meilensteine sind Stände dieser Schicht (ADR-051).
2. **Schicht 2, Rechenergebnis:** Geometrie, Darstellung (Rendering) und Exportdateien sind abgeleitet, eine reine
   Funktion der Eingaben und der Version von Kern und Worker. Sie werden nie gespeichert oder synchronisiert
   (ADR-032); ein Cache ist erlaubt, aber jederzeit verwerfbar. Ausnahme bleibt, was ADR-047 für Freigabestände
   archiviert.
3. **Schicht 3, Ansicht:** Kamera, Zoom, Beleuchtung, Darstellungsart, Auswahl sowie Ausblenden und Einblenden sind
   flüchtig und gelten je Person. Sie ändern weder Schicht 1 noch das Rechenergebnis und nie den Export (ADR-015).
   Nur **„Ansicht speichern“** macht daraus ein benanntes Element in Schicht 1; dann gilt es für alle. Das löst die
   offene Frage in ADR-065, ob Ausblenden für alle gilt: standardmäßig nein, nur über eine gespeicherte Ansicht.
4. **Fingerabdruck der Eingaben (Vorschlag zum Prüfen):** Jeder Meilenstein erhält einen Hash über die kanonische
   Textprojektion der Eingaben (ADR-035) und die Version von Kern, Worker und Kernel (OpenCascade). Gleicher
   Fingerabdruck heißt: gleiche Eingaben, gleiche Rechenumgebung. Elemente werden über ihre ID adressiert
   (ADR-058), Größen mit Einheit (ADR-057), damit Umbenennen oder Umrechnen den Abdruck nicht zufällig ändert.
5. **Fingerabdruck des Rechenergebnisses (Vorschlag zum Prüfen):** Für ausgewählte Ergebnisse, zuerst den STL-Export,
   wird zusätzlich ein Hash der erzeugten Datei notiert. Das Rechenergebnis wird weiter nicht gespeichert. Wer
   nachrechnen will, rechnet aus dem Meilenstein neu und vergleicht; gleicher Hash belegt Gleichheit, ein
   abweichender wird als Befund gemeldet, nicht als Fehler des Modells (ADR-050).
6. **Oberfläche:** Keine Git-Wörter. Gezeigt werden „Stand“, „Rechenergebnis stimmt überein“ und „Ansicht
   speichern“; der Hash ist nur in Details und für Agenten sichtbar.

## Offen (Messfrage, nicht behauptet)

Ob das Rechenergebnis bit-genau wiederholbar ist, ist ungeprüft: Gleitkomma über Plattformen, Thread-Reihenfolge im
Worker, Version und Build von OpenCascade und der Netzbildung. Ein Spike klärt, auf wie vielen Maschinen und in
wie vielen Läufen STL und Kennzahlen identisch ausfallen. Fällt er schlecht aus, gilt Punkt 5 nur mit Toleranz
(Vergleich von Volumen, Schwerpunkt, Maßen mit Einheit) oder mit festgehaltener Umgebung; Punkt 4 bleibt unberührt.

## Alternativen

- Rechenergebnis mit versionieren: widerspricht ADR-032, bläht Verlauf und Synchronisation auf, schafft eine zweite
  Wahrheit.
- Ansicht immer teamweit teilen: Kamera und Auswahl würden zwischen Personen springen.
- Ansicht immer nur lokal: gute Ansichten (Schnitt, Explosion) ließen sich nicht weitergeben.
- Nur Hash der Eingaben, keiner des Ergebnisses: belegt nicht, dass Kern und Umgebung dasselbe berechnen.

## Konsequenzen

- Der Kern liefert eine kanonische Textprojektion und einen stabilen Hash; Meilensteine tragen Fingerabdruck und
  Versionen von Kern, Worker und Kernel.
- Ein Spike „Wiederholbarkeit des Kernels“ wird als Change vorgeschlagen (Reihenfolge nach ADR-062, kein Vorziehen
  aus späteren Meilensteinen).
- `docs/glossar.md`: Einträge „Rechenergebnis“, „Ansicht“, „Fingerabdruck“; Hinweis zur Abgrenzung von „Ergebnis“.
- Verhältnis zur Idee „Projektordner mit Git synchronisieren“ (`docs/ideen/`, nichts festgelegt): Dort läge nur
  Schicht 1; Rechenergebnis und Ansicht blieben außen vor.
