# ADR-007: MCP-Server als einzige KI-Schnittstelle

- Status: ersetzt durch ADR-030, ADR-037 und ADR-045
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-030 (MCP-Endpunkt im Server), ADR-045 (Werkzeuge aus dem Befehlsregister)

## Aktuell gilt (Stand 2026-10-17)

Ersetzt. MCP ist nicht mehr ein Python-Server über stdio für ein bestimmtes Modell, sondern ein Endpunkt im Elixir-Server (ADR-030) für jedes Modell (ADR-037); die Werkzeuge entstehen aus dem Befehlsregister (ADR-045) und aus veröffentlichten Untergraphen (ADR-049).

## Kontext

Claude braucht einen stabilen, prüfbaren Zugang zur Geometrie.

## Entscheidung

Ein Python-MCP-Server (stdio) mit typisierten Tools: build_part, get_topology, measure, check_rules, render_views, export, list_library, read_requirements, publish, resolve, diff, get_selection. Konstruktionswissen zusätzlich als Skills.

## Alternativen

Direkte Code-Ausführung im Terminal.

## Konsequenzen

Auch mit anderen MCP-fähigen Agenten nutzbar. Tool-Antworten müssen kompakt und strukturiert sein.
