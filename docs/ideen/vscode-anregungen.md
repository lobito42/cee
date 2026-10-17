# Idee: Weitere Anregungen aus VS Code

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits (ADR-045):
Befehlsregister für Mensch und KI, Erweiterungsmodell mit Manifest und Sandbox, Projekt-Vertrauen, Befunde
mit Korrekturen, Einstellungen in Ebenen, Vergleich und Verlauf.

## Bedienung

| VS Code | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Breadcrumbs | Pfad über der Arbeitsfläche: Projekt › Raum 2.07 › Deckensegel 3, jede Stufe klickbar | mit ap-08 |
| Walkthroughs | Geführter Einstieg in der App: erster Raum, erster Absorber, erste Nachhallzeit, erstes Bild | vor der Beta |
| Keymaps als Erweiterungen | Tastenbelegungen wie SolidWorks, Fusion 360, SketchUp oder Blender zum Umsteigen | mit ap-27 |
| Zen-Modus | Fokusmodus ohne Panels, z. B. für Präsentationen beim Kunden | mit ap-14 |
| Themes | Farbschemata als Erweiterung, darunter hoher Kontrast; baut auf den Design-Tokens auf | mit ap-27 |
| Profile | Benannte Sätze aus Einstellungen, Plugins und Arbeitsbereichen („Akustikplanung“, „Vertrieb“) | nach der Beta |

## Architektur und Betrieb

| VS Code | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Language Server Protocol | Offenes Protokoll für Analysen: externe Akustik- oder Simulationswerkzeuge docken an wie Sprachserver an Editoren; Kandidat für `format/` | nach ap-30 |
| Remote Development | Desktop-App lokal bedienen, schwere Rechnung (Fotomodus, große IFC) auf dem eigenen Firmenserver | mit ap-16 |
| Settings Sync | Persönliche Einstellungen und Plugins auf allen Geräten, über den eigenen Server statt einen Cloud-Dienst | mit ap-17 |
| Stable und Insiders | Zwei Kanäle: stabile Version und tägliche Vorabversion für Neugierige | mit der Beta |
| Open VSX | Offenes, selbst hostbares Plugin-Verzeichnis unter neutraler Trägerschaft | nach ap-27 |
| Live Share mit Folgen | „Folgen“ einer Person: die eigene Kamera folgt deren Sicht, z. B. für Schulungen | mit ap-07 |

## Bewusst nicht

- Telemetrie standardmäßig an (ADR-037).
- Offizielles Produkt mit anderer Lizenz als der offene Code, geschlossener Marktplatz.
- Entwickler-Oberfläche: Terminal, Debugger, viele Seitenleisten.
