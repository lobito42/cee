# Gemeinsame Sprache für CEE und das KMU-Projekt (Entwurf)

Lizenz: Apache-2.0 (wie `format/`). Status: **Entwurf zum Lesen, noch nichts gebaut.** Grundlage ist die Übergabe
vom 2026-11-06; das zweite Projekt (End-to-End-Software für kleine und mittlere Unternehmen) ist hier noch nicht
gesichtet, die Muster sind deshalb bewusst abstrakt und aus ADR-047/048/069 abgeleitet.

## Idee

Zwei Projekte, eine Sprache: Wer ein Teil konstruiert, eine Rezeptur entwickelt oder ein Leistungsverzeichnis
schreibt, tut sechs Dinge, die in jeder Branche gleich heißen können. Wenn beide Projekte diese sechs Muster mit
denselben Wörtern und Feldern beschreiben, können Daten und Werkzeuge (Prüfer, Freigabe, ERP-Anbindung) geteilt
werden, ohne dass eines das andere übernehmen muss. Zusammengelegt wird erst, wenn beide Projekte denselben Code
schreiben würden.

## Die sechs Muster

| Muster | Wort | Kern | Konstruktion | Bäckerei | Handwerk |
| --- | --- | --- | --- | --- | --- |
| 1 | **Item** | Etwas Benanntes mit stabiler Nummer, das es einmal gibt | Teil, Baugruppe | Brötchen, Rohstoff | Leistung, Material |
| 2 | **Struktur** | Ein Item besteht aus anderen Items mit Menge und Einheit | Stückliste | Rezeptur | Leistungsverzeichnis |
| 3 | **Variante** | Ein Item in Ausprägungen, die sich in benannten Größen unterscheiden | Länge, Farbe | Größe, Sorte | Ausführung |
| 4 | **Änderung** | Vorschlag → Prüfung → Entscheidung eines Menschen | Änderungsauftrag | neue Rezeptur | geändertes Angebot |
| 5 | **Freigabestand** | Unveränderlicher Stand mit Revision, Prüfbericht und Datum | Revision A | Rezeptur Version 3 | Angebot Stand 2026-11 |
| 6 | **Übergabe** | Ein Freigabestand geht an Produktion oder Vertrieb, als Ereignis | an ERP/Fertigung | an Produktionsplanung | an Rechnung/Auftrag |

## Regeln (gelten für alle sechs)

1. **Jede Zahl ist eine Größe mit Einheit** (ADR-057). Keine nackten Zahlen.
2. **Nummern sind stabil und tragen keine Bedeutung, die sich ändern kann**; Adressen beruhen auf der ID (ADR-058).
3. **Nur Menschen geben frei** (ADR-047); Agenten und KI machen Vorschläge (Muster 4).
4. **Ein Freigabestand ändert sich nie.** Eine Änderung erzeugt immer einen neuen Stand.
5. **Ein führendes System je Feld** (ADR-048): Jede Angabe hat genau ein System, das sie pflegt.
6. **Offenes Textformat**, das sich in einer Versionsverwaltung lesen und vergleichen lässt.

## Was dieser Entwurf noch nicht festlegt

- Feldnamen und Schema (kommt, wenn Runde 5 das Austauschformat in `format/` konkret macht, ADR-069).
- Ob „Struktur“ Mengen nur zählt oder auch Rechenregeln erlaubt (Skalieren einer Rezeptur).
- Wie Muster 3 (Variante) mit SolidCraft-Größen zusammenpasst (Größe mit Bereich, ADR-068).
- Der Abgleich mit dem tatsächlichen Stand des zweiten Projekts.

## Frage an den Menschen

Soll das zweite Projekt die Wörter und Muster so übernehmen, oder passen die Wörter dort anders? Dafür fehlt der
Zugriff auf das zweite Projekt (freiwillig).
