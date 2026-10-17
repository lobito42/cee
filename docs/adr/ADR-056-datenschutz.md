# ADR-056: Datenschutz

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Verlauf, Anwesenheit, Kommentare und Signaturen sind personenbezogene Daten. CEE richtet sich an Firmen in
der EU; die DSGVO gilt, und Datenschutz ist ein Argument für den Selbstbetrieb.

## Entscheidung

1. **Datensparsam:** Anwesenheit und Cursor werden nur live verteilt, nie gespeichert. Der Verlauf speichert
   die Konto-ID, nicht Name oder E-Mail. Server-Protokolle enthalten keine Modellinhalte und werden nach
   höchstens 30 Tagen gelöscht.
2. **Austritt:** Wird ein Konto gelöscht, zeigt der Verlauf „ehemaliges Mitglied“. Ausnahme sind Signaturen in
   Freigabeständen; sie bleiben, solange die Organisation Aufbewahrungspflichten hat, und sind nur für
   Berechtigte sichtbar.
3. **Auskunft und Export:** Jede Person kann ihre Daten exportieren; jede Organisation kann alle Projekte im
   offenen Format (`format/`) exportieren.
4. **Keine Weitergabe:** Keine Telemetrie ohne Zustimmung, keine Daten an KI-Anbieter ohne ausdrückliche Wahl
   je Projekt (ADR-037), Lernschleife nur mit Zustimmung (ADR-053). Der Serverstandort ist frei wählbar.
5. **Gehosteter Dienst:** Für ap-28 Vertrag zur Auftragsverarbeitung, Standort in der EU, Verschlüsselung
   bei Übertragung und im Speicher.

## Alternativen

Vollständiger Verlauf mit Klarnamen; Anwesenheit als Protokoll speichern.

## Konsequenzen

Ergänzt ADR-037, ADR-047 und ADR-055. Prüfpunkt im Review (REVIEW.md) für jede neue gespeicherte Angabe zu
Personen.
