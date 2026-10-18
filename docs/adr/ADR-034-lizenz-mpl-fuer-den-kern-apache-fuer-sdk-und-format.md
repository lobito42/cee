# ADR-034: Lizenz: MPL-2.0 für den Kern, Apache-2.0 für SDK und Format

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-18)

Wie unten, ergänzt durch ADR-061: Schriften unter der SIL Open Font License 1.1 (Inter, JetBrains Mono) sind erlaubt;
sie werden unverändert mitgeliefert, der Lizenztext liegt bei.

## Kontext

Verbesserungen am Kern sollen zurückfließen, Plugins und Anbindungen sollen unter jeder Lizenz möglich sein. Das Projekt soll in Unternehmen einsetzbar sein.

## Entscheidung

MPL-2.0 für `crates/`, `server/`, `client/` und `worker/`. Apache-2.0 für `sdk/` und `format/` (Spezifikation, Schemas, Plugin-Vorlagen). Developer Certificate of Origin für Beiträge. Die Marke wird angemeldet, sobald der Name feststeht. Erlaubte Abhängigkeiten: MPL, Apache, MIT, BSD, ISC, Zlib sowie gleichwertig freizügige Lizenzen (CC0-1.0, Unicode-3.0, Unicode-DFS-2016, 0BSD, BSL-1.0, PSF-2.0; Stand 2026-10-17); LGPL (OCCT) nur dynamisch gelinkt bzw. im separaten Worker-Prozess; kein GPL, kein AGPL. Forks werden durch Plugin-SDK, offene Governance (RFCs über OpenSpec) und Markenschutz vermieden, nicht durch die Lizenz.

## Alternativen

Apache-2.0 für alles (ADR-013); GPL/AGPL; Dual-Lizenz.

## Konsequenzen

Ersetzt ADR-013. Lizenzprüfung in der CI für Cargo, npm, Mix und Python. Vor dem ersten öffentlichen Release rechtliche Prüfung.
