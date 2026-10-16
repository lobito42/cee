# ADR-013: Lizenz und Governance

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Das Projekt ist Open Source und soll auch in Unternehmen nutzbar sein.

## Entscheidung

Apache-2.0 für alle eigenen Komponenten; OCCT (LGPL) nur dynamisch gelinkt; Developer Certificate of Origin; Release auf VS Code Marketplace und Open VSX.

## Alternativen

GPL, Dual-Licensing.

## Konsequenzen

Lizenz-Scan in der CI; GPL-Abhängigkeiten sind ausgeschlossen.
