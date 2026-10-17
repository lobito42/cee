# Idee: Weitere Anregungen aus Synera

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits (ADR-049):
Untergraph als Befehl, Apps aus dem Graphen, Bibliotheksebenen und gesperrte Komponenten, Werte an jeder
Kante, Studien.

| Synera | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Konnektoren zu CATIA, NX, SolidWorks, ANSYS, Abaqus | Fremdwerkzeuge als Worker-Plugins steuern; Ergebnis kommt als Analyse-Element zurück | nach ap-27 |
| Berichte als Word, Excel, PowerPoint | Bericht-Knoten mit Vorlagen und mehreren Ausgabeformaten statt nur PDF | mit ap-19 |
| Vorlagen je Branche | Fachpakete mit Startvorlagen: Besprechungsraum, Blechhalter, Gehäuse | vor der Beta |
| Skripte in C#, MATLAB, TCL | Weitere Sprachen für Script-Elemente, nur bei echtem Bedarf | offen |
| Multi-Agenten-Systeme | Mehrere Agenten mit Rollen (Entwurf, Prüfung, Kosten) arbeiten am selben Änderungssatz | nach ap-15 |
| Web-API- und OAuth-Knoten | Knoten für externe Dienste (z. B. Materialpreise eines Händlers), nur mit ausdrücklichen Rechten | mit ap-34 |
| Optimierung (Topologie, Gitter) | Optimierer als Studienverfahren bzw. zweiter Kernel | mit ap-32 |
| Apps einbetten | App als Konfigurator auf der Website der Firma einbetten, mit Anfrage statt Bestellung | nach ap-35 |

## Bewusst nicht

- Workflow getrennt vom Modell.
- Agenten nur in einer bestimmten Cloud (ADR-037).
- Lizenzpool mit Tokens und geschlossener Marktplatz (ADR-045).
- Tausende Knoten im Kern; die Breite kommt aus Fachpaketen (ADR-046).
