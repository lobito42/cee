# ADR-065: Bedienkonzept – Fensteraufbau nach Apple-Gerüst mit VS-Code-Leisten

- Status: vorgeschlagen (gilt nach der Abnahme des Prototyps ap-41b)
- Datum: 2026-10-23
- Entscheider: Kernteam
- Ändert: ADR-063 (Zonen, Werkzeugleiste, KI im selben Feld), ADR-054 (Begriff „Arbeitsbereich“),
  ADR-061 (Musterkatalog, Abschnitt „Fensteraufbau“)

## Kontext

ADR-063 hat fünf Zonen und „keine feste Werkzeugleiste“ festgelegt. Beim Ausprobieren des klickbaren
Low-Fi-Mockups blieb offen, ob sich alle Befehle sinnvoll einsortieren lassen und ob die Oberfläche bei
Erweiterungen durchgängig und einfach bleibt. Das Befehlsinventar (246 Befehle aus Konzept und ADRs, 167 davon in der
Beta) zeigt: Ansicht (21 Befehle), Skizze und Körper (je 15), Versionieren (14) und Freigabe (12) sprengen ein Konzept
aus Suche und Kontextaktionen allein. Vorbilder: Apple (Human Interface Guidelines, SwiftUI) für den Rahmen,
VS Code für Leisten, Reiter und Befehlssuche, Onshape und Figma für das Arbeiten am Modell. Das Zielsystem Mac, iPad
und später Vision Pro (ADR-060) spricht für das Apple-Gerüst.

## Entscheidung

1. **Rahmen nach dem Apple-Gerüst:** Menüleiste, Seitenleisten, Inhaltsbereich. Zonen von links nach rechts:
   **Taskleiste** (Symbole, Shop unten), **Struktur** (Seitenleiste links), **Modell** mit Dokument-Reitern und Pfad,
   **Eigenschaften** über **Chat** (Seitenleiste rechts), optional **Panel** unten. Begriffe: `docs/glossar.md`.
2. **Menüleiste statt Werkzeugleiste:** Start-Menü, Dropdowns des gewählten Eintrags der Taskleiste, Suche
   (Strg/Cmd+K), Rückgängig und die drei Schalter für Struktur, Panel und rechte Seitenleiste in einer schmalen Zeile.
   Dropdowns tragen höchstens 12 Einträge, gegliedert in Untergruppen; Menge und Reihenfolge folgen dem
   Befehlsinventar. Jeder Eintrag ist ein Befehl aus dem einen Befehlsregister (ADR-045).
3. **Kontextaktionen bleiben** (höchstens fünf je Objektart, häufigste zuerst); die Suche findet alles. Es gibt kein
   zweites Werkzeugfeld mit denselben Befehlen.
4. **Start-Menü:** Öffnen und Wurzel wählen (Projekt, Teil, Ordner, Datei), Neu, Teilen, Exportieren, Einstellungen.
   Die Wurzel der Struktur ist frei wählbar; der Pfad zeigt die Position, ein Klick auf ein Glied setzt die Wurzel.
5. **Taskleiste:** Ein Eintrag wechselt Menüs, Befehle und Inhalt der Struktur (Modellieren, Simulation, später
   Fachpakete). Einträge haben keinen Sammelnamen. Der Shop (Fachpakete, Erweiterungen, Apps) liegt unten in der
   Taskleiste; Hinzugefügtes erscheint dort, wo es hingehört.
6. **Rechte Seitenleiste ohne Reiter:** Eigenschaften oben, Chat unten, beide immer sichtbar. Der Chat zeigt die Auswahl
   als Kontext („zu: …“); KI-Vorschläge sind Entscheidungskarten (ADR-021, nur **Übernehmen** hervorgehoben).
   Ersetzt „KI im selben Feld“: Die Suche öffnet bei einem Wunsch den Chat.
7. **Dokument-Reiter über dem Modell** (ein Reiter je Teil oder Datei) sind die einzigen Reiter im Fenster; es gibt
   keine Befehlsreiter und keine Reiter in Reitern. **Teilen** zeigt zwei Teile nebeneinander, **Vergleichen** ein Teil
   mit einem früheren Stand (Entwurf oder Meilenstein), Unterschiede als Tabelle (Muster Vergleich).
8. **Panel unten** (optional, Strg/Cmd+J) mit einer Auswahl statt Reitern: Befunde, Verlauf, Studien, Entwürfe und
   Meilensteine, Freigabe. Es hält Nachschlagendes und Entscheidungen; bearbeitet wird im Modell und in den Eigenschaften.
9. **Ansicht gehört ans Modell, nicht ins Menü:** Darstellung (Körper, Kanten, Durchsicht), Isolieren, Alles
   einblenden in einer Leiste im Modell. **Ausblenden/Einblenden** am Auge der Struktur-Zeile; es betrifft nur die
   Ansicht, nie den Export (ADR-015).
10. **Detailtiefe je Feature, kein globaler Anfänger- oder Expertenmodus:** „Mehr zu <Feature>“ klappt weitere Werte
    auf; die Oberfläche merkt sich je Person und Feature, was oft genutzt wird.
11. **Gleichheit statt Ausnahmen:** Erweiterungen füllen dieselben Zonen (Einträge der Taskleiste, Menüs, Struktur,
    Eigenschaften-Gruppen, Panel-Auswahl) und bringen keine eigenen Fenster oder Leisten mit.
12. **Platzierungsregel:** Jeder Befehl gehört zu einer Familie (Skizze zeichnen, Skizze bearbeiten, Körper erzeugen,
    Kanten und Muster, Baugruppe, Messen und Prüfen, Ansicht, Auswahl, Import und Export …), und die Familie bestimmt
    seinen Ort: Dropdown mit Untergruppe, Kontextaktion, Ansichtsleiste im Modell oder Panel. Ein neuer Befehl braucht
    keine neue Bedienlogik, auch wenn er nicht als wesentlich gilt. „Wesentlich“ bestimmt nur die Sichtbarkeit (vorne
    oder über Suche und „Mehr“). Wo Befehle fehlen oder stören, meldet das Kernteam es beim Testen; dann ändert sich die
    Sichtbarkeit, nicht die Familie.
13. **Auswahl ist eine Befehlsfamilie:** Auswählen geschieht zuerst durch Klicken und Ziehen im Modell; dazu kommen
    Alles, Umkehren, Ähnliche, Kantenschleife, Auswahlfilter und die Auswahl nach Regel („alle Kanten oben“). Regeln
    sind Daten im Graphen und gelten über stabile Adressen (ADR-016, ADR-058). Der Spike ap-42-spike-auswahl klärt, wie
    das im Kern trägt.
14. **Prüfung:** Das Befehlsinventar ist die Referenz. Jeder Befehl der Beta hat einen Ort (Menü, Kontextaktion, Suche).
    Menü- und Kontextgrenzen aus den Punkten 2 und 3 gelten als Abnahmekriterium von ap-41b.

## Offen

Schwebende Werkzeugleiste im Modell (Entwurf G1, zurückgestellt bis das Kernteam sie geprüft hat); ob Ausblenden nur für
die Person oder für das ganze Team gilt (Vorschlag: nur für die Person); Layout für Tablet; Git-Graph für Entwürfe und
Meilensteine (nur Idee, `docs/ideen/`); Wahl des UI-Frameworks (eigener Spike).

## Alternativen

- ADR-063 unverändert (Suche und Kontextaktionen ohne Menüleiste): trägt die Menge an Befehlen nicht und ist
  schwer zu entdecken.
- Office-Reiter mit Befehlsgruppen (Ribbon): zweite Reiterebene, im Mockup als „Reiter unter Reitern“ abgelehnt.
- Reines VS-Code-Layout: kein Bezug zu Apple-Plattformen (ADR-060), Aktivitätsleiste ohne Menüs.

## Konsequenzen

- `ap-41b-ux-bedienkonzept`: Spec, Abnahmetests und Prototyp werden nach diesem ADR neu geschnitten; der Prototyp
  aus PR #51 wird ersetzt.
- `docs/design/muster.md`: Zeilen „Kontextaktionen“ und „Arbeitsbereiche“ anpassen; Vergleich, Panel,
  Dokument-Reiter und Sichtbarkeit als Muster aufnehmen. ADR-054 spricht noch von „Arbeitsbereichen“.
- Das Befehlsinventar ist um 33 Befehle aus dem Abgleich mit build123d, Onshape, FreeCAD und Blender ergänzt (279 Befehle) und wird mit dem Client abgeglichen. Die einfache Bohrung ist ein Kernbefehl (ADR-062 angepasst).
