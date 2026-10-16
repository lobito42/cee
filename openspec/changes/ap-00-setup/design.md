## Context

Siehe proposal.md – Why. Architektur und Entscheidungen stehen in `docs/adr/`; dieser Change liefert die
Messwerte, mit denen die ADRs im Workshop bestätigt oder überarbeitet werden.

## Goals / Non-Goals

**Goals:** belastbare Messwerte je Spike; lauffähige Pipeline; reproduzierbare Umgebung.

**Non-Goals:** keine produktiven Funktionen in `packages/`; Spike-Code wird nicht übernommen, sondern
dient nur als Beleg.

## Decisions

| Spike | Frage | Messung | Go, wenn |
| --- | --- | --- | --- |
| S1 Identität | Lässt sich die OCCT-Topologie-Historie über OCP stabil auf IDs abbilden? | Erhaltungsquote der Flächen-IDs über ≥ 50 zufällige Parameteränderungen an 3 Referenzteilen | ≥ 95 % ohne Eingriff, 0 falsche Zuordnungen |
| S2 Rebuild | Reicht ein Feature-Cache für flüssige Bedienung? | Rebuild-Zeit nach Parameteränderung an 3 Referenzteilen | typisch < 1 s |
| S3 Interaktion | Trägt three.js mit Element-IDs und GPU-Picking im Webview? | Picking-Latenz, Ziehgriff funktioniert | Auswahl < 100 ms |
| S4 Blech | Ist die Abwicklung genau genug? | Abweichung zur Referenz aus kommerziellem CAD | ≤ 0,1 mm |
| S5 Rendering | Klappt Offscreen-Rendering auf allen Plattformen? | 7 Ansichten als PNG ohne Display | auf Linux, macOS, Windows |

Alternative zu S1, falls No-Go: OCAF/TNaming direkt nutzen (ADR-016 nennt das bereits).

## Risks / Trade-offs

- [Referenzteile fehlen] → Spikes zunächst mit synthetischen Teilen, Fachbereich liefert nach
- [S4 ohne kommerzielles CAD] → Referenzwerte aus Lehrbuch-Formeln für einfache Biegungen
