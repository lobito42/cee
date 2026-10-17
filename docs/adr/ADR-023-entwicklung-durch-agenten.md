# ADR-023: Entwicklung durch Agenten

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Gilt werkzeugoffen: Claude Code, OpenCode und Pi über `AGENTS.md`; unbeaufsichtigte Läufe über die Nachtschicht, höchstens ein offener Agenten-PR. Das Kernteam besteht derzeit aus ein bis zwei Personen.

## Kontext

Zwei Menschen sollen mit vielen Agenten ein großes Produkt bauen.

## Entscheidung

Claude-Code-Agenten implementieren Arbeitspakete parallel in eigenen Worktrees. Das Kernteam schreibt Specs und gibt Abnahmetests frei, entscheidet ADRs, testet mit Konstrukteuren und reviewt jeden Merge. Specs, ADRs und Abnahmetests sind gegen Agenten-Änderungen geschützt.

## Alternativen

Klassisches Entwicklerteam.

## Konsequenzen

Engpass sind Spec-Qualität, Testabdeckung und Review-Kapazität.
