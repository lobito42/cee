# ADR-027: Parametrische Skizzen mit PlaneGCS

- Status: vorgeschlagen, Lizenzfrage offen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Lizenzfrage offen. PlaneGCS steht unter LGPL-2.1-or-later; ADR-034 erlaubt LGPL nur dynamisch gebunden bzw. im Worker-Prozess. Bis zur Klärung (vor ap-12) gilt: im Client nur als eigenes, separat geladenes und austauschbares WebAssembly-Modul mit Quellcode-Angebot und Hinweis in `NOTICE` (entspricht dynamischem Binden), eingetragen in `tools/lgpl_modules.txt`; falls die Prüfung das nicht trägt, löst der Worker die Skizzen und der Client zeigt eine Näherung. Skizzen sind Elemente im Graphen (ADR-028), kein Code. Die Begründung bei SolveSpace lautet richtig: GPL-3 ist mit unserer Lizenzpolitik (ADR-034) unvereinbar.

## Kontext

Konstrukteure denken in Skizzen mit Bedingungen; build123d hat keinen Constraint-Solver.

## Entscheidung

PlaneGCS (FreeCAD, LGPL-2.1-or-later) zweimal mit identischem Kern: WebAssembly in der Arbeitsfläche, Python im Geometrie-Dienst. Skizzen sind lesbarer Code; Elemente haben IDs und sind veröffentlichbar.

## Alternativen

SolveSpace (GPL-3, nach ADR-034 ausgeschlossen); Skizzen ohne Bedingungen; eigener Solver.

## Konsequenzen

Beide Solver versionsgleich; Abweichungen sind Pflicht-Testfall in der CI.
