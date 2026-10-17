# ADR-033: Local-first-Zusammenarbeit mit CRDT und Zweigen

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-051 (Alltagsbegriffe, Trichter-Zustände)

## Kontext

Online sollen alle immer dasselbe sehen. Offline soll man weiterarbeiten können, mit den von Git bekannten Abläufen.

## Entscheidung

Jedes Projekt ist ein CRDT-Dokument (Automerge) im Format des Rust-Kerns. Online verteilt der Server Änderungen sofort an alle Teilnehmer. Offline arbeitet der Client lokal weiter, beim Verbinden werden die Stände automatisch zusammengeführt. Darüber liegt ein Ablauf wie bei Git: benannte Zweige, Änderungsanfrage, Review, Freigabe. Semantische Konflikte (zwei Personen ändern denselben Parameter, eine Referenz bricht) erscheinen nach dem Zusammenführen als Prüfbefund, sie werden nicht still aufgelöst. Die Textprojektion (ADR-028) lässt sich in echte Git-Repositories exportieren und wieder importieren.

## Alternativen

Operational Transformation mit zentralem Server; Yjs; nur Git.

## Konsequenzen

Der Datenmodell-Spike misst Dokumentgröße, Lade- und Merge-Zeiten. Schemaänderungen brauchen Migrationen, die mit der CRDT-Historie verträglich sind.
