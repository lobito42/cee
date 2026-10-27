# Idee: KI und CAD – Landschaft quelloffener Projekte

Stand: abgelegt 2026-10-27 · Status: nur Referenz, nicht freigegeben. Quelle: Recherche des Kernteams (Claude-Dokument
„KI & professionelles CAD – Open-Source-Projekte“); Angaben dort stammen aus Drittquellen und sind nicht von uns geprüft.
Unsere Ziele bleiben (ADR-062): präziser Kernel, optimiert auf KI und Einsteiger.

**Kernaussage der Recherche:** Die aussichtsreichen Ansätze setzen auf Code-CAD – die KI erzeugt Code, der einen echten
Volumenkörper (B-Rep, STEP) rechnet, statt eines Meshes. Das ist versionierbar, parametrisch und gut lesbar für Modelle.

| Projekt (laut Recherche) | Ansatz | Anregung für CEE |
| --- | --- | --- |
| text-to-cad (MIT) | Skill-Paket für Coding-Agenten: Prompt → build123d → STEP | Bestätigt build123d als Worker-Sprache (ADR-032); Befehle statt Code bleiben unser Weg |
| build123d, CadQuery (Apache-2.0) | Code-CAD auf OpenCascade | Schon gewählt (Worker) |
| FreeCAD-KI-Add-ons und MCP-Server (56 bzw. 83 Werkzeuge) | Chat und MCP-Werkzeuge in FreeCAD | Gegenbild: viele Werkzeuge; wir halten das Register klein und mit Wirkung (Menü-Nachbesserung) |
| Zoo Design Studio (Open Core, eigener Kernel) | Klick und Code-Sprache KCL, Text-to-CAD im Dienst | Warnung: Abhängigkeit vom proprietären Dienst; CEE bleibt offen und selbst hostbar (ADR-037) |
| CAD-Recode, Text2CAD | Punktwolke bzw. Text → Code bzw. Skizze-und-Extrusion | Später: Handskizze/Scan als Eingabe (siehe F-19); Forschungsstand, nichts zu übernehmen |

**Einordnung der Recherche:** Gut sind heute Einzelteile, Varianten und Vorrichtungen. Schwach sind Baugruppen,
Toleranzen, normgerechte Zeichnungen und PDM. Das deckt sich mit unserer Reihenfolge: Einzelteile zuerst, Baugruppen
danach (ADR-062).

## Bewusst nicht

- KI schreibt freien Code in das Modell: Änderungen laufen als Änderungssatz mit Vorschau (ADR-021), Mensch und KI
  nutzen dieselben Befehle.
- Abhängigkeit von einem fremden Dienst oder Kernel.
