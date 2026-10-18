# ADR-051: Versionierung in Alltagsbegriffen und Entwicklungstrichter

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Git ist für die Mechanik der Versionierung ideal, seine Begriffe (Commit, Branch, Merge, Rebase) sind
Endanwendern aber nicht zuzumuten. Der klassische Entwicklungsprozess läuft als Trichter: gemeinsam Ideen
finden, verdichten (verwerfen, Arbeitsstände ausblenden, Ergebnis kenntlich machen), wiederverwenden und für
die nächste Schleife anpassen. Die Oberfläche muss diesen Prozess abbilden, einfach und fehlerarm.

## Entscheidung

1. **Alltagsbegriffe:** Die Oberfläche spricht nie Git. Gesichert wird automatisch (kein Speichern, keine
   Commit-Nachricht). Begriffe: **Entwurf** (Zweig), **Meilenstein** (benannte Version), **Übernehmen**
   (Zusammenführen mit Vergleich), **Zur Prüfung geben** (Änderungsanfrage, führt in ADR-047),
   **Zurückholen** (früheren Stand ganz oder für einzelne Elemente), **Ableiten** (Kopie mit Herkunft),
   **Verlauf** (wer, wann, warum – am Element). Git-Begriffe nur in Textprojektion und Expertenansicht.
2. **Konflikte als Entscheidungskarten:** Beim Übernehmen erscheinen Konflikte als Karten mit Vorschau beider
   Seiten und klarer Wahl, nie als Fehlermeldung; nichts wird still überschrieben.
3. **Trichter-Zustände eines Entwurfs:** Idee → In Arbeit → **Ergebnis** → (Zur Prüfung → Freigegeben nach
   ADR-047); Seitenausgang **Verworfen**. Verwerfen löscht nie: Der Entwurf wird ausgeblendet, archiviert,
   bleibt durchsuchbar und braucht eine kurze Begründung.
4. **Ruhige Standardansicht:** Projekte zeigen standardmäßig die Ansicht **Ergebnis** (übernommener
   Stand). Die Ansicht **Alle Entwürfe**, auch nebeneinander auf der Arbeitsfläche, öffnet man bei Bedarf
   (Begriff geändert am 2026-10-18, früher „Werkstatt“).
5. **Herkunft:** Ableiten und Wiederverwenden speichern die Herkunft (`meta.derived_from` mit Version).
   Verbesserungen am Original werden dem Abgeleiteten mit Vorschau angeboten, nie automatisch übernommen.
6. **Entscheidungsprotokoll je Projekt:** Ergebnisse, Verwerfungen mit Begründung und Prüfentscheidungen
   tragen sich automatisch ein; eigene Einträge sind möglich (wie ADRs im Kleinen).

## Alternativen

Git-Begriffe direkt zeigen; manuelles Speichern mit Versionsnummern; Löschen statt Verwerfen.

## Konsequenzen

Ändert ADR-033 (Begriffe und Zustände der Zweige) und ergänzt ADR-047 (Zustände vor der Prüfung). Betrifft
ap-08b, ap-17 und ap-25.
