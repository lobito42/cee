# ADR-045: Befehle, Erweiterungen und Vertrauen nach dem Vorbild von VS Code

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

VS Code bleibt mit Tausenden fremder Erweiterungen schnell, sicher und bedienbar. Das liegt weniger an der
Oberfläche als an der Architektur dahinter: ein Befehlsregister, deklarierte Erweiterungspunkte, isolierte
Erweiterungen und eingeschränkte Ausführung fremder Projekte. CEE soll ebenso von einer Community erweitert
werden (Plugin-SDK, ap-27), ohne Forks und ohne Sicherheitsrisiko durch Script-Elemente.

## Entscheidung

1. **Ein Befehlsregister für alles:** Jede Funktion ist ein Befehl mit stabiler ID (z. B.
   `room.wall.create`), Parametern mit Schema und Rückgabe. Befehlssuche, Tastenkürzel, Kontextaktionen,
   Plugins, Aktionsprotokoll (ADR-044) und die MCP-Werkzeuge der KI (ADR-007, ADR-037) kommen aus diesem
   Register. Was ein Mensch kann, kann ein Agent, und umgekehrt. Befehle erzeugen Graph-Operationen.
2. **Erweiterungsmodell:** Ein Plugin hat ein Manifest, in dem es seine Beiträge deklariert (Befehle,
   Elementtypen, Knoten, Panels je Arbeitsbereich, Regeln, Einstellungen, Materialbibliotheken) und wann es
   geladen wird. Plugins laufen isoliert (Web Worker bzw. eigener Prozess, Python im Worker), sprechen nur
   über eine versionierte API und brauchen ausdrücklich erteilte Rechte (Netz, Dateien). Ein abstürzendes
   Plugin beeinträchtigt weder Oberfläche noch Modell. Verzeichnis offen und selbst hostbar, keine
   Sonderstellung eines offiziellen Marktplatzes.
3. **Projekt-Vertrauen:** Ein fremdes Projekt oder eine fremde Bibliothek öffnet zuerst im eingeschränkten
   Modus: Script-Elemente und Plugin-Code des Projekts werden nicht ausgeführt, Geometrie kommt nur aus dem
   Cache bzw. bleibt Platzhalter. Erst nach ausdrücklichem Vertrauen (je Projekt bzw. Herausgeber) wird
   ausgeführt.
4. **Befunde und Korrekturen:** Regeln (ADR-008) liefern Befunde mit Ort im Graphen, Schwere und optional
   festen Korrekturen als Befehl. Befunde erscheinen am Modell und als Liste mit Sprung zur Stelle;
   Korrekturen laufen wie KI-Vorschläge über einen Änderungssatz mit Vorschau (ADR-021).
5. **Einstellungen in Ebenen:** Standard < Organisation < Benutzer < Projekt. Einstellungen haben ein
   Schema, sind durchsuchbar, als Oberfläche und als Text bearbeitbar; Plugins tragen eigene bei.
6. **Vergleich und Verlauf:** Zwei Stände (Zweige, Versionen, Änderungssätze) lassen sich visuell
   vergleichen: Geometrie überlagert, Parameter als Liste, Kennzahlen wie Nachhallzeit und Kosten vorher und
   nachher. Jedes Element hat einen eigenen Verlauf.

## Nicht übernommen

Telemetrie standardmäßig an (widerspricht ADR-037); Trennung in offenen Code und ein proprietäres
offizielles Produkt bzw. einen geschlossenen Marktplatz; die Fülle an Panels und Entwickler-Oberfläche.

## Alternativen

Plugins im selben Prozess ohne Rechte; getrennte Werkzeugsätze für Mensch und KI; Ausführung fremder
Projekte ohne Rückfrage.

## Konsequenzen

Ändert ADR-022 (Befehlssuche aus dem Register) und ADR-007 (MCP-Werkzeuge aus dem Register), ergänzt
ADR-008 und ADR-044. Das Befehlsregister wird früh gebraucht (ap-08), das Projekt-Vertrauen spätestens mit
Script-Elementen und Bibliotheken. Weitere Anregungen liegen im Ideenspeicher
(`docs/ideen/vscode-anregungen.md`).
