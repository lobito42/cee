# Gemeinsame Sprache für CEE und das ERP-Projekt (Entwurf)

Lizenz: Apache-2.0 (wie `format/`). Status: **Entwurf zum Lesen, noch nichts gebaut.** Grundlage sind ADR-047, 048,
057, 058, 069 und die Vorgaben des Kernteams vom 2026-11-07 zu Kennungen und Beziehungen. Das zweite Projekt ist ein
eigenes, privates ERP-Projekt des Kernteams; Einzelheiten daraus stehen hier bewusst nicht.

## Idee

Zwei Projekte, eine Sprache: Wer ein Teil konstruiert, eine Spezifikation schreibt oder eine Rezeptur entwickelt,
tut sieben Dinge, die in jeder Branche gleich heißen können. Beschreiben beide Projekte sie mit denselben Wörtern
und Feldern, lässt sich ein freigegebener Stand übergeben, ohne umzurechnen. Zusammengelegt wird erst, wenn beide
Projekte denselben Code schreiben würden.

## Die sieben Bausteine

| Nr. | Baustein | Kern | Beispiele |
| --- | --- | --- | --- |
| 1 | **Element** | Etwas Benanntes mit **technischer ID**, **lesbarer ID**, **Name** und **Beschreibung** | Teil, Baugruppe, Spezifikation, Anforderung, Rezeptur |
| 2 | **Beziehung** | Verbindung zwischen Elementen mit eigener Art (und Menge mit Einheit oder Formel, wo es passt) | Baugruppe → Bauteilverwendung; Spezifikation → Anforderungen |
| 3 | **Lebenszyklus** | Status je Elementart und Regeln, was in welchem Status angelegt, gelesen, geändert, gelöscht werden darf | in Arbeit → freigegeben → ausgelaufen |
| 4 | **Variante** | Dasselbe Element in Ausprägungen, die sich in benannten Größen oder Merkmalen unterscheiden | Länge, Farbe, Sorte |
| 5 | **Änderung** | Vorschlag → Prüfung → Entscheidung eines Menschen | Änderungsauftrag |
| 6 | **Freigabestand** | Unveränderlicher Stand mit Revision, Prüfbericht und Datum | Revision A |
| 7 | **Übergabe** | Ein Freigabestand geht an Produktion oder Vertrieb, als Ereignis | an ERP, Fertigung |

## Kennungen (Baustein 1)

Jedes Element hat drei Arten von Kennzeichnung:

1. **Technische ID.** Unveränderlich, maschinell vergeben, nie bedeutungstragend, wird dem Menschen nicht
   angezeigt. Adressen und Beziehungen beruhen auf ihr (ADR-058). Sie muss auch bei gleichzeitigem Anlegen durch
   zwei Bearbeiter kollisionsfrei sein (siehe Zusammenarbeit, Runde 3).
2. **Menschenlesbare ID.** Darf sich logisch aus mehreren Bestandteilen zusammensetzen, zum Beispiel **Stamm-ID**,
   **Version** (Revision) und **Dokumentationsversion**. Aufbau, Vergabe, Prüfziffer oder Zeichenvorrat sind
   **individuelle Regeln je Elementart** (und je Firma). Die lesbare ID ist eine Anzeige- und Suchhilfe; die
   technische ID bleibt die Wahrheit.
3. **Name und Beschreibung.** Frei, änderbar, mehrsprachig denkbar; keine Identität.

## Lebenszyklus und CRUD (Baustein 3)

Pro Elementart gibt es eigene Regeln: Welche Status gibt es, welche Übergänge sind erlaubt, wer darf anlegen,
ändern, verwerfen (nicht löschen, ADR-051/052), und welche Teile der lesbaren ID ändern sich bei welchem Übergang
(zum Beispiel erhöht eine technische Änderung die Version, eine reine Dokumentationsänderung die
Dokumentationsversion). Die Regeln sind Daten der Elementart, nicht Sonderwege im Code.

## Beziehungen (Baustein 2)

Beziehungen sind selbst beschrieben (Art, Richtung, Menge, Gültigkeit) und verbinden Elemente, die **jeweils
eigene Revisionen und einen eigenen Lebenszyklus** haben. Beispiele:

- Eine **Spezifikation** besteht aus **eigens revisionierten Anforderungen**, hat selbst einen Lebenszyklus und
  kann Varianten haben.
- Eine **Baugruppe** besteht aus **Bauteilverwendungen**; eine Verwendung nennt das Bauteil (mit Revision), Menge,
  Gültigkeit und Position.
- Eine Variante kann Beziehungen ein- oder ausschalten oder Mengen ändern.

## Verweise: fest, gleitend und die Auflösung bei der Transaktion

Ein Verweis zeigt entweder **fest** auf eine Revision oder **gleitend** auf „Objekt X in der aktuellsten Version“
(Vorgabe des Kernteams 2026-11-07). Beides ist auch im freigegebenen Zustand erlaubt. Festgeschrieben wird erst bei
einer **tatsächlichen Transaktion**; dabei wird die **tatsächlich angezogene Version dokumentiert**.

Zwei Beispiele aus dem Alltag:

1. **Verhandlung mit einem Lieferanten (drei Monate).** Die Anforderungen und die Spezifikation ändern sich
   währenddessen laufend. Die Anfrageunterlagen verweisen deshalb **gleitend** auf die Spezifikation und ihre
   Anforderungen; sonst müsste man die Unterlagen ständig neu ausgeben. **Zur Vergabe** wird die Version
   **fest dokumentiert**: Der Vergabebeleg trägt die tatsächlich gültige Revision von Spezifikation und
   Anforderungen.
2. **Rückwärtskompatibles Bauteil (Lagerbestand aufbrauchen).** Ein Bauteil wird aktualisiert, bleibt aber
   innerhalb des **Austauschbarkeitskorridors** (Form, Passung, Funktion). Die **technische Freigabe nennt nur die
   Bauteil-ID**. Welche Revision tatsächlich verbaut wird, schreibt erst die **Fertigung** fest (am Fertigungsauftrag
   oder an der Entnahme), je nachdem, was im Lager liegt.

Daraus folgt: Der **Auflöser** ist nicht überall derselbe. Bei der Vergabe löst ein Mensch auf, bei der Fertigung
löst der Fertigungsauftrag auf. Jeder Verweis bekommt deshalb eine **Auflösungsregel** (wann, durch wen, nach welcher
Auswahl, zum Beispiel „neueste freigegebene Revision im Korridor“). Das Ergebnis steht am Beleg, nicht im
verweisenden Element.

## Regeln (gelten für alle Bausteine)

1. **Jede Zahl ist eine Größe mit Einheit** (ADR-057).
2. **Technische IDs sind stabil**; die lesbare ID kann Bedeutung tragen, die sich ändert.
3. **Nur Menschen geben frei** (ADR-047); Agenten und KI machen Vorschläge (Baustein 5).
4. **Ein Freigabestand ändert sich nie.** Eine Änderung erzeugt immer einen neuen Stand. Gleitende Verweise bleiben
   dabei erlaubt; aufgelöst und festgehalten wird erst bei der Transaktion, nie still.
5. **Ein führendes System je Feld** (ADR-048): CEE führt Geometrie und Konstruktions-Stückliste, das ERP Bestand,
   Preise, Aufträge.
6. **Offenes Textformat**, das sich in einer Versionsverwaltung lesen und vergleichen lässt.

## Was noch offen ist

- **Freigabestand: Teil oder Aufbau?** Vorschlag: Ein Freigabestand ist immer ein Element mit allem, was darunter
  hängt (bei einem einzelnen Teil dasselbe).
- **Austauschbarkeitskorridor:** Wie wird er je Element beschrieben (Form, Passung, Funktion als Prüfpunkte, die ein
  Mensch beim Freigeben bestätigt)? Vorschlag: Eine Änderung innerhalb des Korridors ist eine neue Revision derselben
  technischen Identität; eine Änderung außerhalb ist ein neues Element mit Verweis „ersetzt“.
- **Auflösungsregel:** Welche Regeln gibt es (neueste freigegebene Revision, neueste im Korridor, ausdrücklich
  gewählte), und wo wird die gezogene Version festgehalten (am Beleg)? Wann darf ein gleitender Verweis nachgezogen
  werden (Hinweis oder Zustimmung, nie still)?
- **Freigabestand mit gleitenden Verweisen:** Er selbst ändert sich nie; was „aktuellste“ bedeutet, kann sich ändern.
  Zu klären, was er zusichert (Vorschlag: nur die Struktur und die Auflösungsregeln, nicht die Versionen).
- **Regeln als Daten:** Wie werden die individuellen Regeln für lesbare IDs und Lebenszyklen beschrieben (eigenes
  kleines Regelformat), und wo liegen sie (Firma, Elementart)?
- **Rechenregeln in Mengen** (Formeln) und **Merkmale mit Bereich** für Varianten: Vorschlag ja, passend zu
  SolidCraft-Größen mit Bereich (ADR-068).
- **Feldnamen und Schema:** kommen mit Runde 5, wenn das Austauschformat in `format/` konkret wird (ADR-069).
- **Lizenz des ERP-Projekts:** offen; ohne Lizenz nur Wörter und Ideen.
