# Musterkatalog

Verbindlich nach ADR-061. **Jede wiederkehrende Aufgabe hat genau ein Muster.** Wer etwas baut, sucht hier zuerst;
gibt es ein Muster, wird es benutzt – auch wenn eine eigene Lösung an dieser Stelle „schöner“ wäre. Ein neues
Muster oder eine Abweichung gibt es nur per ADR. Farben, Schrift, Abstände kommen ausschließlich aus
`docs/design/tokens.json`.

Jedes Muster ist ein Baustein in `client/src/ui/` (später auch in der Apple-App, ADR-060) und hat einen Eintrag
auf der Katalogseite mit Referenzbildern (hell und dunkel, Desktop und Tablet, Linux und Mac).

## Entscheiden und ändern

| Muster | Wofür | Regeln |
| --- | --- | --- |
| **Entscheidungskarte** | Jede vorgeschlagene Änderung: KI-Änderungssatz (ADR-021), Konflikt beim Übernehmen (ADR-051), Bibliotheks-Update (ADR-043), Prüfbefund mit Korrektur, Studienergebnis (ADR-049), Freigabe-Prüfung (ADR-047) | Titel = was sich ändert; Vorschau im Modell (Geister-Darstellung); Begründung; Auswirkungen (Werte vorher/nachher); genau zwei Hauptaktionen **Übernehmen** und **Verwerfen**, bei Konflikten die Wahl zwischen den Ständen; nie modal; mehrere Karten stapeln sich in einer Liste |
| **Verlauf und Rückgängig** | Jede Änderung, auch durch KI, Übernehmen, Import | Cmd/Strg+Z und Cmd/Strg+Umschalt+Z überall; keine Sicherheitsabfragen („Wirklich …?“) – stattdessen Rückgängig, Verwerfen statt Löschen (ADR-051) |

## Eingeben

| Muster | Wofür | Regeln |
| --- | --- | --- |
| **Wertfeld** | Jede Zahl mit Einheit: Panel, Griff am Modell, Komponente, Studie, App, XR | Einheit immer sichtbar; Eingabe mit Einheit und einfachen Formeln („1,2 m“, „600 + 2 × 50“); Ziehen am Feld ändert den Wert; beim Ziehen im Modell Achse sperren und tippen (ADR-044); tabellarische Ziffern; Fehler als Befund am Feld, nie als Dialog |
| **Auswahlfeld** | Eine aus wenigen Optionen (≤ 7) | Segmentierte Auswahl; mehr als 7 Optionen → Suchfeld mit Liste |
| **Schalter** | Ein/Aus mit sofortiger Wirkung | Kein Speichern-Knopf; Wirkung sofort und rückgängig machbar |
| **Textfeld** | Namen, Kommentare, Begründungen | Platzhalter ist ein echtes Beispiel; Erwähnungen mit @ |

## Finden und tun

| Muster | Wofür | Regeln |
| --- | --- | --- |
| **Suche** (Cmd/Strg+K) | Befehle *und* Inhalte (ADR-045, ADR-052) | Ein Feld, Ergebnisse gruppiert: Befehle, Elemente, Projekte, Hilfe; Facetten als Chips; Tastenkürzel neben jedem Befehl |
| **Kontextaktionen** | Aktionen am Ausgewählten (ersetzt die Werkzeugleiste, ADR-063) | Über dem Gewählten, Rechtsklick = langes Drücken = Taste der 3D-Maus; derselbe Inhalt an jedem Ort: die Befehle, die zur Auswahl passen, die häufigsten oben |
| **Arbeitsbereiche** | Aufgabenbezogene Panels (ADR-054) | Reiter in der Kopfzeile, höchstens fünf |

## Zeigen

| Muster | Wofür | Regeln |
| --- | --- | --- |
| **Statusanzeige** | Berechnung (aktuell, veraltet, fehlerhaft, pausiert – ADR-050), Lebenszyklus (In Arbeit, In Prüfung, Freigegeben, Ersetzt, Gesperrt – ADR-047), Abgleich | Immer Farbe **und** Symbol **und** Wort; dieselbe Farbe bedeutet überall dasselbe: Erfolg = freigegeben/aktuell, Warnung = in Prüfung/veraltet, Fehler = fehlerhaft/gesperrt, neutral = in Arbeit/pausiert |
| **Befund** | Validierung, Worker-Fehler, Regeln, Lizenz, Rechte | Was ist los, wo (Element, in 3D markiert), was tun (Knopf zum Beheben, wenn möglich); Schwere als Statusanzeige |
| **Rückmeldung** | Bestätigungen, Hintergrundarbeit | Leise Zeile unten; Fortschritt blockiert nie; nie modal; Text ohne „erfolgreich“ und ohne Ausrufezeichen |
| **Vergleich** | Vorher/nachher, Entwürfe, Revisionen, Varianten | Schieber bzw. nebeneinander im 3D, Werte und Nachhallzeit als Tabelle daneben, Unterschiede im Akzent |
| **Tabelle** | Mengenliste, Katalog, Suchergebnisse, Stückliste | Eine Komponente: sortieren, Facetten, Spalten wählen, Zahlen rechtsbündig mit Einheit, Export als CSV |
| **Eigenschaften-Panel** | Alles am ausgewählten Element | Grammatik Gruppe › Feld; Expertenwerte klappen auf; Stapel (ADR-044) als eigene Gruppe; dieselbe Reihenfolge für alle Elementtypen: Identität, Geometrie, Material, Fachwerte, Freigabe, Verlauf |
| **Leerer Zustand** | Leere Projekte, Listen, Suchen | Einladung mit genau einem nächsten Schritt |
| **Auswahl im Modell** | 3D, Grundriss, Knoten, Baum | Kontur in der Akzentfarbe, Überfahren als dünne Kontur; Auswahl ist in allen Ansichten synchron |

## Sprache

Begriffe nur aus `docs/glossar.md`. Satzanfang groß, keine Großschreibung jedes Wortes, Knöpfe beginnen mit einem
Verb („Übernehmen“, „Zur Prüfung geben“). Fehlermeldungen sagen, was passiert ist und was zu tun ist. Keine
Git-Begriffe (ADR-051).

## Plattform

Gleich auf allen Systemen. Plattformüblich sind nur: Kürzel (Cmd bzw. Strg), Zwischenablage, Scrollrichtung,
Datei-Dialoge des Systems, das App-Menü auf macOS (ADR-060).
