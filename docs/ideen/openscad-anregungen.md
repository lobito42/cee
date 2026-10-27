# Idee: Anregungen aus OpenSCAD

Stand: abgelegt 2026-10-27 · Status: nur Referenz, nicht freigegeben. Unsere Ziele bleiben (ADR-062: CAD zuerst,
Anfänger und KI bedienen dieselben Befehle). **Lizenz:** OpenSCAD steht unter GPL; wir übernehmen daraus weder Code
noch Quelltext (ADR-034), nur Ideen.

| OpenSCAD | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Modell als Skript, das neu gerechnet wird („3D-Compiler“) | Passt zu Script-Elementen und Textprojektion (ADR-028); Parameter als Eingänge des Graphen | schon angelegt |
| Parameter-Fenster (Customizer) | Veröffentlichter Untergraph mit Eingaben wird zur kleinen App (ADR-049) | mit ap-49-Folgearbeit |
| Zweigeteilte Ansicht: Code links, 3D rechts, sofortige Vorschau | Text- und 3D-Ansicht nebeneinander als Layout derselben Befehle (ADR-060) | mit ap-08b |
| CSG (Vereinigung, Differenz, Schnitt) als Grundoperationen | Boolesche Operationen früh in der Volumenmodellierung (Stufe nach Extrusion) | mit ap-45 |
| Extrusion aus 2D-Umrissen, DXF-Import | Skizze → Extrusion; DXF steht in ADR-042 | Stufe 3/4 des Streifens |
| Schnelle Vorschau, dann genaues Rechnen (F5/F6) | Detailstufen und Cache nach Inhalts-Hash (ADR-050) | mit ap-06 |

## Bewusst nicht

- Nur Skript, keine interaktive Bedienung: CEE bleibt für Anfänger klickbar und für KI befehlbar.
- Eigene Sprache: wir nutzen Python und build123d.
- GPL-Code oder -Bibliotheken einbinden.
