# ADR-007: MCP-Server als einzige KI-Schnittstelle

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Claude braucht einen stabilen, prüfbaren Zugang zur Geometrie.

## Entscheidung

Ein Python-MCP-Server (stdio) mit typisierten Tools: build_part, get_topology, measure, check_rules, render_views, export, list_library, read_requirements, publish, resolve, diff, get_selection. Konstruktionswissen zusätzlich als Skills.

## Alternativen

Direkte Code-Ausführung im Terminal.

## Konsequenzen

Auch mit anderen MCP-fähigen Agenten nutzbar. Tool-Antworten müssen kompakt und strukturiert sein.
