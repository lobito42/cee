# ADR-052: Ordnungssystem und Wiederfinden

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-059 (Zuordnung zu Meilensteinen)

## Kontext

Unterlagen wiederzufinden ist in fast jedem Werkzeug ungelöst: In Confluence bleiben Links und Lesezeichen,
in Figma entsteht schnell Chaos. Ordnung ist dort Handarbeit. In CEE ist alles ein Element mit ID, Typ,
Status und Beziehungen; Ordnung kann deshalb aus dem Graphen entstehen, statt gepflegt zu werden.

## Entscheidung

1. **Schlanke feste Struktur:** Organisation › Bereich (Produkt, Kunde oder Thema) › Projekt. Keine weiteren
   Ordnerebenen.
2. **Facetten statt Ordner:** Typ, Status, Sachnummer, Revision, Material, Kunde, Verantwortliche, Datum und
   Fachpaket werden automatisch aus dem Graphen gelesen; eigene Schlagworte sind möglich, aber nie nötig.
3. **Eine Suche für alles:** Die Befehlssuche (ADR-045) findet auch Inhalte: Volltext, Facetten und
   Parameterbedingungen (z. B. „Deckensegel, α500 ≥ 0,8, freigegeben“), dazu semantische Suche mit einem
   lokalen Modell (ADR-037). Rechte gelten auch in der Suche.
4. **Links, die nie brechen:** Jedes Element hat eine feste Adresse (ADR-018), die Umbenennen und Verschieben
   übersteht; alte Adressen leiten weiter.
5. **Rückverweise:** Jedes Element zeigt „Verwendet in“, „Abgeleitet von/zu“ und „Erwähnt in“, über Projekte
   einer Organisation hinweg.
6. **Gespeicherte Sammlungen:** Gespeicherte Suchen ersetzen Ordner und aktualisieren sich selbst; teilbar.
7. **Startseite je Person:** Zuletzt bearbeitet, wartet auf mich, Änderungen an Dingen, die ich nutze.
8. **Kontext am Element:** Notizen, Anforderungen, Entscheidungen und Dokumente hängen am Element bzw.
   Projekt, nicht in einem separaten Wiki.
9. **Hygiene:** Entwürfe ohne Aktivität seit 30 Tagen werden zum Verwerfen oder Kennzeichnen vorgeschlagen;
   beim Anlegen weist CEE auf ähnliche vorhandene Elemente hin, damit nichts doppelt entsteht.

## Alternativen

Frei verschachtelte Ordner; manuelle Verschlagwortung; externe Wiki- und Suchwerkzeuge.

## Konsequenzen

Ergänzt ADR-018 und ADR-045. Der Suchindex ist abgeleitet (wie Geometrie) und wird nie synchronisiert,
sondern je Server bzw. Gerät aufgebaut. Arbeitspakete ap-37a (Grundfunktionen, M2) und ap-37b (Ausbau nach der Beta), siehe ADR-059.
