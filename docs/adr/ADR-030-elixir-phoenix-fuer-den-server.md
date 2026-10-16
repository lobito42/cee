# ADR-030: Elixir und Phoenix für den Server

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Ziel ist Zusammenarbeit wie in Figma: viele gleichzeitige Verbindungen, ein langlebiger Zustand je Dokument, Fehlerisolation und einfacher Selbstbetrieb.

## Entscheidung

Der Server ist in Elixir mit Phoenix geschrieben. Er übernimmt: Synchronisation (Channels) und Anwesenheit (Presence); einen überwachten Prozess je geöffnetem Dokument (Registry, DynamicSupervisor); Historie, Zweige und Änderungsanfragen (ADR-033); Freigabe-Ablauf, Rechte und Webhooks; Steuerung der Geometrie-Worker als Ports (ADR-032); Hintergrundaufgaben über Oban; den MCP-Endpunkt für KI-Agenten (ADR-007). Speicher: PostgreSQL.

## Alternativen

Sync-Server in TypeScript (automerge-repo); Rust (axum).

## Konsequenzen

Selbstbetrieb als ein Release plus PostgreSQL. Elemente sind Daten, keine Prozesse: ein Prozess je Dokument, nicht je Element. Keine Geometrie und kein OCCT in der BEAM.
