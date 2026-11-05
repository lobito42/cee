# Vorbilder: Prinzipien statt Nachbau

Verbindlich nach ADR-067. Wir bauen keine Oberfläche eines Vorbilds nach. Wir übernehmen das **Prinzip**, das
erklärt, warum es dort funktioniert, und kombinieren diese Prinzipien. Eine Funktion, die sich nicht auf eines
dieser Prinzipien zurückführen lässt, braucht eine Begründung.

## Das tragende Prinzip

**Ein Bauplan, viele Sichten.** Es gibt genau eine Wahrheit: den parametrischen Bauplan. Code, Größen-Tabelle,
Schrittliste, 3D mit Griffen und KI-Vorschlag sind Sichten darauf, und jede ist zugleich ein Editor. Jede
Bedienhandlung schreibt in den Bauplan, und jede Änderung am Bauplan zeigt sich sofort in allen Sichten.

## Was wir von wem lernen

| Vorbild | Prinzip (warum es funktioniert) | So bei CEE |
| --- | --- | --- |
| Zoo Design Studio | Klicken und Code sind zwei Wege zur selben Quelle; jeder Klick schreibt Code | Jede Handlung in 3D oder in der Größen-Tabelle ist eine Änderung am Bauplan; der Code ist nie veraltet |
| OpenSCAD-Customizer | Die Bedienung entsteht aus dem Code, nicht daneben | Regler, Einheiten und Bereiche werden aus `Params` erzeugt; nichts wird doppelt gepflegt |
| build123d / CadQuery | Bezüge über Absicht („oberste Fläche“, „Kanten parallel zu Z“) statt über Nummern | Bezüge im Bauplan sind Auswahlregeln; sie überstehen Größenänderungen |
| Onshape, Fusion (Zeitleiste) | Die Entstehung ist eine lesbare Liste von Schritten; man kann zurückspulen und dazwischen einfügen | Die benannten Schritte (`feature`) sind die Schrittliste; ein Klick zeigt den Stand bis dahin |
| Onshape (FeatureScript) | Eingebaute Funktionen und eigene sind dasselbe – keine Bürger zweiter Klasse | Eigene Bausteine (z. B. „Bohrung für M5“) sind Bauplan-Funktionen wie die eingebauten |
| Onshape-Variablen, Excel | Größen haben Namen und Formeln; ändert sich eine, rechnet alles nach | `wand = 3 mm`, `innen = rohr + 2 * spiel`; die Tabelle zeigt Formel und Wert |
| Onshape-Konfigurationen | Varianten sind eine Tabelle über denselben Plan, keine Kopien | Varianten (S/M/L) sind Wertesätze für `Params` |
| Fusion, Figma (Griffe) | Direkt am Objekt ziehen oder eine Zahl eintippen – beides ändert denselben Wert | Pfeil am Modell ändert die zugehörige Größe; Tippen öffnet das Wertfeld |
| Blender („Letzte Aktion anpassen“) | Nach einer Handlung kann man ihre Parameter noch nachjustieren, ohne neu anzufangen | Nach jedem Schritt bleibt ein kleines Feld mit seinen Werten offen |
| Blender-Modifikatoren | Nicht-destruktiv: Schritte lassen sich ab- und anschalten und umsortieren | Schritte können ruhen, ohne gelöscht zu werden (Verwerfen statt Löschen) |
| Cursor, Claude Code | KI ändert dieselbe Quelle wie der Mensch, zeigt einen Diff, Prüfungen laufen, der Mensch nimmt an | KI-Vorschlag = Bauplan-Diff mit vorher/nachher in 3D und Prüferergebnis; Übernehmen oder Verwerfen |
| VS Code, Blender (F3) | Ein Suchfeld für alle Befehle; Menüs sind zum Nachschlagen | Befehlssuche (Strg/Cmd+K) als Hauptweg, Menüs nur als Übersicht |
| Grasshopper, Synera | Derselbe Plan als Datenfluss sichtbar, für Abhängigkeiten | Später: Knoten-Sicht auf Größen und Schritte, als weitere Sicht – nicht als zweite Wahrheit |
| Git | Verlauf und Entwürfe ohne Angst vor Fehlern | Verlauf des Bauplans, Entwürfe; ohne Git-Begriffe (ADR-051) |

## Was daraus folgt

1. **Keine Sicht hat eigene Daten.** Was nur in einer Sicht steht (z. B. „Material PLA“ ohne Eintrag im Bauplan),
   gibt es nicht.
2. **Zeigen, was der Mensch denkt, nicht was das Datenmodell ist.** Schritte und Größen statt „Elemente“,
   „Wurzel“ oder „Referenz“.
3. **Nur zeigen, was funktioniert.** Kein Knopf ohne Wirkung, kein Platzhalter-Wert, keine simulierte Funktion
   im Bild.
4. **Eine Sache, ein Ort.** Gleiche Symbole bedeuten dasselbe; keine zwei Wege, die anders aussehen und dasselbe
   tun.

## Bewusst nicht übernommen

- Eigene Modelliersprache (Zoo KCL, FeatureScript): Wir nutzen Python und build123d, das Modelle schon kennen.
- Nur-Code ohne direkte Bedienung (OpenSCAD): Größen und Griffe sind gleichwertige Wege.
- Unbeschriftete Symbolleisten und tief geschachtelte Menüs aus klassischem CAD.
- Nur Cloud, geschlossener Kern (Onshape, Fusion).

## Entwurf vor Bau

Jeder Bildschirm wird zuerst als Entwurf gezeichnet und nennt die Prinzipien, auf denen er beruht. Gebaut wird
erst nach dem Ja des Menschen zum Bild. Abgenommen wird im Vergleich: Der gebaute Bildschirm steht neben dem
Entwurf, und der Mensch urteilt.
