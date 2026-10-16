# ADR-015: Explizite Publikation statt Sichtbarkeit

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-028

## Kontext

Klassische CAD-Systeme steuern Export über Hide/Show und Speicherzustand – intransparent und fehleranfällig.

## Entscheidung

Jedes Element ist intern (Standard), veröffentlicht oder freigegeben. Publikation ist eine explizite Aussage im Code (`publish(...)`), gesetzt per Klick oder im Code. Sichtbarkeit ist reine Ansicht.

## Alternativen

Hide/Show als Exportsteuerung.

## Konsequenzen

Die Schnittstelle eines Bauteils ist jederzeit sichtbar und reviewbar. Claude schlägt vor, der Mensch bestätigt.
