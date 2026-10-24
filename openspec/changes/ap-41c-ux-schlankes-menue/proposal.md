## Why

Das Kernteam hat den Prototyp aus ap-41b (`spikes/ux-prototyp-2/`, PR #73) ausprobiert. Ergebnis: Die Funktionen
passen, aber

1. **Es werden zu viele Funktionen angezeigt, viele davon noch ohne Wirkung.** Im Register von ap-41b tragen 31 von
   79 Befehlen `folgt: true` (Platzhalter); sie stehen heute im Start-Menü, in den Dropdowns, im Kontextmenü und in
   der Suche wie echte Befehle, nur mit dem Zusatz „folgt“.
2. **Das Kontextmenü ist zu lang.** Es zeigt alle Befehle, deren `bezug` zur Auswahl passt, in Gruppen bis zu zwölf
   Einträgen. Für einen gewählten Schritt kommen laut Register bis zu 26 Befehle in Frage (14 ohne Bezug mit
   `kontext: true`, 12 mit Bezug `element`), darunter Ansichts-, Verlaufs- und
   Platzhalterbefehle, die anderswo schon einen festen Ort haben.

ADR-065 Punkt 12 sieht genau diesen Fall vor: „Wo Befehle fehlen oder stören, meldet das Kernteam es beim Testen;
dann ändert sich die Sichtbarkeit, nicht die Familie.“ Dieser Change ändert deshalb nur die Sichtbarkeit im
Prototyp: Familien, Orte und das eine Befehlsregister bleiben.

## What Changes

- **Nur Befehle mit Wirkung sichtbar:** Start-Menü, Dropdowns, Kontextmenü, Kontextaktionen und „Alle Befehle
  zeigen“ führen nur Befehle ohne `folgt`. Platzhalter bleiben im Register (für das Befehlsinventar nach ADR-065
  Punkt 14) und sind **nur über die Suche** erreichbar, dort in einer eigenen, letzten Gruppe „Folgt später“, nie als
  erster Treffer und ohne Wirkung beim Auslösen (Begründung in design.md).
- **Kurzes Kontextmenü:** höchstens **8** sichtbare Befehlseinträge plus genau ein Eintrag „Mehr …“, wenn weitere
  passende Befehle mit Wirkung existieren. „Mehr …“ öffnet eine zweite Ebene mit dem Rest, nach Familie gruppiert.
  Die sichtbaren acht sind die ersten nach `rang`.
- **Befehle mit festem Ort verlassen das Kontextmenü:** Ansicht (Ansichtsleiste im Modell, ADR-065 Punkt 9),
  Rückgängig/Wiederholen (Knopf in der Menüleiste), Fenster und Suche (Schalter in der Menüleiste). Sie stehen dort
  dauerhaft sichtbar und zusätzlich in Dropdown bzw. Suche wie bisher.
- **Kontextaktionen** über dem Gewählten bleiben die ersten höchstens fünf Einträge des (gekürzten) Kontextmenüs
  nach `rang` (ADR-065 Punkt 3); sie sind damit immer Teil der sichtbaren acht.
- **Taskleiste „Simulation“:** Weil alle Simulationsbefehle Platzhalter sind, zeigt die Menüleiste dort keine
  Dropdowns; die Struktur zeigt wie bisher den Leeren Zustand „simuliert“.
- Bausteinkatalog (Seiten „Kontextmenü“, „Kontextaktionen“, „Dropdown“, „Suche“) und Klick-Anleitung an die neue
  Regel anpassen.

## Capabilities

### New Capabilities

Keine.

### Modified Capabilities

- `interaktions-grundlagen` (aus ap-41b, Prototyp-Verhalten): Requirements „Fensteraufbau nach ADR-065“ und
  „Kontextmenü aus dem Befehlsregister“ geändert; neues Requirement „Nur Befehle mit Wirkung sichtbar“. Die
  Capability liegt nicht unter `openspec/specs/` (ap-41b wird mit `--skip-specs` archiviert); dieser Change wird
  ebenso mit `--skip-specs` archiviert.

## Impact

- **Betroffene ADRs:** ADR-065 (Punkte 2, 3, 9, 12, 14 – dieser Change nutzt die in Punkt 12 vorgesehene Änderung
  der Sichtbarkeit), ADR-045 (ein Befehlsregister, bleibt die einzige Quelle), ADR-060 (nichts nur beim Überfahren,
  Kürzel aus dem Register), ADR-061 (ein Muster je Aufgabe; Kontextmenü und Dropdown bleiben Kandidaten im
  Bausteinkatalog), ADR-051/ADR-052 (eine Suche für alles), ADR-059/ADR-062 (M0, Gate G1).
- **Mögliche Widersprüche, ausdrücklich gemeldet** (design.md, Open Questions):
  1. ADR-065 Punkt 4 zählt für das Start-Menü Öffnen, Wurzel wählen, Teilen, Exportieren und Einstellungen auf. Im
     Prototyp sind das Platzhalter; nach diesem Change zeigt das Start-Menü nur „Neu“. Das ist eine Änderung der
     Sichtbarkeit nach Punkt 12, kein Widerspruch zum Zielbild – aber sichtbar anders als in ADR-065 beschrieben.
  2. Der Wunsch des Kernteams, Befehle „in die Befehlsleiste oben“ zu verlegen, wird hier über die vorhandenen Orte
     erfüllt (Dropdowns, Rückgängig-Knopf, Schalter, Ansichtsleiste). Eine eigene Kontextleiste in der Menüleiste
     widerspräche ADR-065 Punkt 2 (feste Bestandteile der Menüleiste) und Punkt 3 (kein zweites Werkzeugfeld) sowie
     `docs/design/muster.md` („Kontextaktionen: über dem Gewählten“) und ist deshalb nur als Frage notiert.
  3. ap-41b, Abnahmetest `test_kontextmenue_gleich_in_struktur_und_modell`, prüft „Mehr … nur für Unwesentliches“.
     Nach diesem Change entscheidet der Rang (die ersten acht), nicht `wesentlich`. Der Test wird über einen
     Einspruch auf `tests/ap-41b-ux-bedienkonzept` mit Verweis auf diese Spec angepasst (design.md).
- **Gate:** G1 (verfeinert den UX-Prototyp, an dem das Kernteam Go oder No-Go entscheidet).
- **Abnahmetests:** `tests/acceptance/ap-41c-ux-schlankes-menue/` (AK-1 bis AK-4, Zuordnung in design.md). Die
  Abnahmetests von ap-41b laufen weiter; nur die in design.md genannte Prüfung wird angepasst.
- **Referenzdaten:** keine neuen. Gelesen wird das vorhandene Befehlsinventar
  `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` (unverändert).
- **Voraussetzung:** Der Prototyp aus ap-41b (PR #73) ist auf `main`. Umgesetzt wird auf `change/ap-41c-ux-schlankes-menue`
  im selben Ordner `spikes/ux-prototyp-2/`. Keine neuen Abhängigkeiten.
- **Nachtschicht:** eine Nacht (drei Gruppen), jede endet mit klickbarem Stand.
- **Nicht-Ziele:**
  - keine neuen Befehle und keine Wirkung für Platzhalter; kein Befehl wechselt seine Familie (ADR-065 Punkt 12)
  - kein Produktcode in `client/`, `crates/`, `server/`, `worker/`; keine Bausteine in `client/src/ui/` (ap-08a, ap-08b)
  - keine eigene Kontextleiste in der Menüleiste, keine schwebende Werkzeugleiste (ADR-065 „Offen“)
  - keine Detailtiefe „Mehr zu …“ mit Lernen je Person (ADR-065 Punkt 10); `rang` bleibt fest im Register
  - keine Änderung an Kürzeln (bleiben die 15 aus ap-41b), Testzuständen (bleiben 22), Fensteraufbau-Maßen,
    Elementzuständen, Auswahl, Navigation, Ziehen
  - keine Änderung an Kernteam-Dateien (`docs/design/muster.md`, ADR-065); Vorschläge dazu stehen als Fragen in
    design.md
