# ADR-063: Bedienkonzept – fünf Zonen, erst wählen, dann tun

- Status: akzeptiert
- Datum: 2026-10-21
- Entscheider: Kernteam
- Ändert: ADR-022 (Werkzeugleiste), ADR-061 (Musterkatalog)

## Kontext

Der UX-Prototyp ap-41 war testgrün, im Pilotlauf TP1 des Kernteams aber nicht bedienbar: Modell kaum lesbar,
Featurebaum und Modell unverbunden, keine erkennbare Leitidee. Danach hat das Kernteam ein Bedienkonzept
freigegeben (Tafeln und klickbares Mockup: https://claude.ai/artifact/MeTNBuRhmZvfshKHkcJdDU). Es soll auf
Anhieb verständlich sein und trotzdem großen Funktionsumfang und Erweiterungen tragen. ap-41b-ux-bedienkonzept
baut den Prototyp danach neu.

## Entscheidung

1. **Ein Bildschirm, fünf Zonen**, in jedem Arbeitsbereich gleich: Kopfzeile (Pfad, Arbeitsbereiche, ein Feld
   „Suchen oder fragen“, Rückgängig), Aufbau links (Schritte von oben nach unten, Skizzen als Unterzeilen),
   Modell in der Mitte, Inspektor rechts (das bisherige Eigenschaften-Panel), Rückmeldezeile unten.
2. **Erst wählen, dann tun.** Die Auswahl ist in Modell und Aufbau synchron. Was man mit dem Gewählten tun kann,
   erscheint als Kontextaktionen über dem Gewählten (derselbe Inhalt per Rechtsklick und 3D-Maus-Taste); alles
   andere findet die Suche. **Es gibt keine feste Werkzeugleiste mehr** (ersetzt „fünf Werkzeuge“ aus ADR-022):
   Auswählen ist der Grundzustand, Messen, Schnitt und Skizze sind Befehle (Suche, Kontextaktionen, Kürzel),
   Fragen ist das Feld in der Kopfzeile.
3. **Zahlen an einem Ort:** Werte stehen dauerhaft nur im Inspektor. Am Modell gibt es Griffe; beim Ziehen
   erscheint die Zahl kurz am Zeiger, Tippen setzt den genauen Wert (ADR-044). Das ersetzt das Muster „Letzte
   Aktion nachjustieren“: Nach jeder Aktion ist der neue Schritt gewählt und seine Werte stehen im Inspektor.
4. **Drei Ebenen des Umschaltens, jede an einem festen Ort:** Arbeitsbereich (Reiter in der Kopfzeile), Ort
   (Teil, Baugruppe, Skizze: Doppelklick geht hinein, der Pfad zeigt, wo man ist, „Fertig“, Esc oder Pfad geht
   hinaus), Darstellung (Körper, Kanten, Durchsicht unten rechts im Modell). Keine versteckten Modi.
5. **KI im selben Feld:** Ein gefundener Befehl wird ausgeführt, ein Wunsch geht an die KI. Das Gespräch nimmt
   vorübergehend den Platz des Inspektors ein; Vorschläge kommen als Entscheidungskarte mit Vorschau im Modell
   (ADR-021) und werden nach dem Übernehmen ein normaler Schritt im Aufbau.
6. **Erweiterungen füllen dieselben Zonen** (ADR-045, ADR-054): Reiter, eigene Schritte im Aufbau, Darstellung im
   Modell, Gruppen im Inspektor, Befehle in Suche und Kontextaktionen – keine eigenen Fenster oder Leisten.
7. Pfad, Legende und Gespräch sind Kandidaten für den Musterkatalog; aufgenommen werden sie nach dem Pilotlauf
   von ap-41b.

## Alternativen

- Werkzeugleiste mit fünf Werkzeugen beibehalten (ADR-022): im Pilotlauf ohne Bezug zur Auswahl, verdoppelt die
  Kontextaktionen.
- Zahlen zusätzlich am Modell: im Mockup verwirrend, zwei Felder für denselben Wert.

## Konsequenzen

- Musterkatalog: „Werkzeugleiste“ und „Letzte Aktion nachjustieren“ entfallen; Komplexitätsbudget ohne Zeile
  für Werkzeuge. Regeln für den Client entsprechend.
- ap-41b-ux-bedienkonzept prüft das Konzept; ap-08b baut die Arbeitsfläche danach.
- Jeder sichtbare Schritt endet in einem Stand, den das Kernteam ausprobieren kann (Klick-Anleitung im PR).
