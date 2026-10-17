# ADR-050: Bewährtes aus klassischem CAD (CATIA, NX, Creo)

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

CATIA, NX und Creo sind schwer zu bedienen, tragen aber 30 Jahre Erfahrung mit großen, realen Produkten:
Vorlagen in fremdem Kontext, Bearbeiten importierter Geometrie, Modelle, die bei Fehlern nicht zerbrechen,
Top-down-Entwurf und Baugruppen mit Tausenden Teilen. Diese Konzepte übernehmen wir, die Bedienung nicht.

## Entscheidung

1. **Referenz-Eingänge an Komponenten** (nach PowerCopy, Engineering Templates, UDF): Eine Komponente
   deklariert neben Parametern Referenz-Eingänge mit Typ (Fläche, Kante, Ebene, Verbindungspunkt, Skizze).
   Beim Einfügen werden sie im Kontext gewählt; die Instanz speichert nur diese Verweise. **Ersetzen mit
   Umhängen:** Ein Eingang lässt sich austauschen, alle Nachfolger folgen; nicht eindeutige Zuordnungen werden
   vorgeschlagen und bestätigt, nie geraten (ergänzt ADR-043, ADR-016).
2. **Direktes Bearbeiten als Element** (nach Synchronous Technology, Flexible Modeling): Fläche verschieben,
   versetzen, drehen, löschen oder ersetzen funktioniert an jeder Geometrie, auch an importiertem STEP ohne
   Historie. Jede direkte Bearbeitung ist ein Element im Graphen, nachvollziehbar und rückgängig zu machen.
3. **Robuste Neuberechnung** (nach dem Fehlerbehebungsmodus von Creo): Schlägt ein Element fehl, bleibt das
   Modell benutzbar. Das Element bekommt den Zustand „fehlerhaft“ mit Befund und Korrekturvorschlag;
   Nachfolger nutzen das letzte gültige Ergebnis (gekennzeichnet als veraltet) oder pausieren. Ein Fehler
   stoppt nie die übrige Berechnung und blockiert kein Speichern oder Zusammenführen.
4. **Skelett und Top-down** (nach CATIA-Skelett, NX WAVE): Ein Skelett ist ein Element mit veröffentlichten
   Bezügen (Verbindungspunkte, Variablen, Hüllen, Achsen), aus dem Teile einer Baugruppe abgeleitet werden.
   Verknüpfungen sind live oder **eingefroren**; eine eingefrorene Verknüpfung zeigt Änderungen an und folgt
   erst nach Bestätigung.
5. **Teil-Laden und Detailstufen** (nach Simplified Representations): Untergraphen werden bei Bedarf geladen;
   Geometrie gibt es in Stufen (Hülle, vereinfacht, voll), jeweils im Cache nach Inhalts-Hash. Ansicht,
   Analyse und Export wählen die nötige Stufe. Ziel: Baugruppen mit 5.000 Teilen bzw. Gebäude flüssig.
6. **Messungen und Prüfungen als Elemente** (nach Knowledgeware, Check-Mate, verknüpften Messungen): Eine
   Messung ist ein Element mit Eingängen, Ergebnis und optionalem Grenzwert; eine Verletzung erzeugt einen
   Befund (ADR-045). Modellierrichtlinien (z. B. Skizzen vollständig bestimmt, jedes Teil mit Material) sind
   Regeln wie alle anderen (ADR-008).

## Nicht übernommen

Ribbon und Menüs mit tausend Befehlen, Dialogketten; dateibasiertes PDM mit Ein- und Auschecken und Sperren;
geschlossene Formate und Lizenzen je Modul; Bedienung, die nur mit Schulung funktioniert.

## Alternativen

Komponenten nur mit Parametern; nur historienbasiertes Modellieren; Abbruch der Neuberechnung beim ersten
Fehler; Baugruppen nur bottom-up; immer vollständig laden.

## Konsequenzen

Ändert ADR-043 (Referenz-Eingänge) und ADR-025 (robuste Neuberechnung, Detailstufen); ergänzt ADR-008,
ADR-016 und ADR-032. Betrifft ap-05, ap-06, ap-13 und ap-20; neues Arbeitspaket ap-36 (Direktes Bearbeiten
und Skelett). Weitere Anregungen liegen im Ideenspeicher (`docs/ideen/klassisches-cad-anregungen.md`).
