# ADR-062: CAD zuerst – Meilensteine neu geschnitten

- Status: vorgeschlagen
- Datum: 2026-10-19
- Entscheider: Kernteam
- Ändert: ADR-059 (Meilensteine M0 und M1, kritischer Pfad), ADR-038 (Rolle des ersten Anwendungsfalls)

## Kontext

CEE ist in erster Linie ein CAD-System: Geometrie und Eigenschaften im Element-Graphen. ADR-059 hat M1 als
„Erstes Angebot“ für die Absorber-Firma geschnitten – Raum, Absorber, Nachhallzeit live, Fotomodus und Bericht.
Damit stehen Akustik, Rendering und Angebotsbericht auf dem kritischen Pfad, während allgemeines Modellieren
(Skizze, Extrusion, Teile, Baugruppen, Export) nur so weit vorkommt, wie die Absorber es brauchen. Das widerspricht
dem fachneutralen Kern (ADR-046) und der Rolle der Akustik als Fachpaket (ADR-054): Ein Fachpaket soll sich an
einen fertigen Kern anschließen, nicht dessen Reihenfolge bestimmen. Die Spikes ap-00 und ap-01 sind abgeschlossen,
ap-02 (Akustik) ist seit 2026-10-19 aus der Nachtschicht genommen.

## Entscheidung

1. **M0 Klären (Gate G1)** prüft nur noch die Grundlagen eines CAD-Systems: Gerüst (ap-00, fertig), Datenmodell
   (ap-01, fertig), Sync (ap-03), persistente Identität (ap-39), Rendering (ap-04, nur Echtzeit; Fotomodus wandert
   zum Fachpaket), UX-Prototyp (ap-41) mit allgemeinen Modellier-Abläufen statt Raum-Abläufen. Der Akustik-Spike
   ap-02 gehört nicht mehr zu G1.
2. **M1 Modellieren (Gate G2, bisher „Erstes Angebot“):** Eine Person modelliert im Browser, selbst gehostet,
   parametrische Teile und Baugruppen mit Eigenschaften und gibt sie als STEP weiter.
   - ap-05 Graph-Kern, ap-40 Bindungen, ap-06 Kernel-Worker (Abnahme an einem Referenzteil statt am Raum),
     ap-07a Server-Dokument, ap-08a Grundlagen, ap-08b Arbeitsfläche, ap-16 Selbstbetrieb
   - ap-12 Skizze und Extrusion für beliebige Teile (nicht nur Absorberformen)
   - ap-10 Material als Element mit Eigenschaftsgruppen (ADR-039); Akustik ist eine Gruppe unter mehreren, Import
     von Herstellerdaten bleibt
   - ap-13a Komponenten, Varianten und Instanzen mit Verbindungspunkten (ADR-043) an einem fachneutralen Katalog
   - ap-18 Eigenschaften auswerten: Mengen, Masse, Kosten und CO₂ je Baugruppe, CSV
   - neu **ap-45 STEP-Export und -Import** von Teilen und Baugruppen (ADR-004, ADR-042), bisher erst mit ap-33a
   - **G2-Kriterium:** Eine Testperson modelliert ein Referenzteil (Platte mit Bohrungen, Taschen und Fasen) und
     eine Baugruppe aus fünf Teilen mit Varianten allein im Browser; Mengenliste mit Masse stimmt mit der
     Handrechnung; STEP öffnet ohne Fehler in einem zweiten CAD-System.
3. **Fachpaket Raum und Akustik (F1, nach G2, parallel zu M2):** ap-02 Nachhallzeit, ap-09 Raum-Elemente, ap-11
   Akustik live, ap-14 Fotomodus, ap-19 Bericht und Angebot, später ap-20 Regeln. Es nutzt nur die interne
   Fachpaket-API (ADR-054) und ist damit ihr erster Prüfstein. Kriterium wie bisher G2: Die Firma erstellt allein
   ein echtes Angebot.
4. **M2 Zusammen und M3 Beta** bleiben wie in ADR-059. In M3 wird die Fachpaket-API öffentlich (ap-27); das
   Fachpaket aus F1 ist dann das mitgelieferte Beispiel.
5. **Kritischer Pfad:** ap-05 → ap-40 → ap-39 → ap-06 → ap-08a → ap-08b → ap-12 → ap-13a → ap-45, ap-18.
   ap-07a und ap-10 laufen daneben.
6. **Warteschlange:** `openspec/queue.yaml` folgt dieser Reihenfolge. Changes aus F1 werden erst nach G2
   freigegeben; ap-02 bleibt freigegeben, aber ohne Nachtschicht, bis F1 beginnt.

## Alternativen

- ADR-059 unverändert (Angebot zuerst): früher Nutzen für die Firma, aber der Kern wächst entlang eines
  Fachgebiets, und allgemeines Modellieren kommt spät.
- Akustik ganz nach der Beta: verliert den ersten echten Nutzer und den Prüfstein für die Fachpaket-API.
- Kein M1, direkt M2 (Zusammenarbeit): zu viel auf einmal für eine erste Abnahme durch Menschen.

## Konsequenzen

- Die Firma bekommt ihr erstes Angebot später (nach G2 und F1 statt mit G2). Dafür steht ein allgemeines,
  fachneutrales CAD-Fundament, auf dem auch andere Fachpakete aufbauen können.
- ADR-038 gilt weiter als erster *Anwendungsfall*, ist aber kein Meilenstein des Kerns mehr; ADR-040 (Fotomodus)
  und ADR-041 (Akustik im Kern bzw. eigenem Crate) wandern zu F1.
- Abnahmekriterien von ap-06, ap-10, ap-12 und ap-13a werden fachneutral umformuliert, wenn ihre Changes
  entworfen werden; ap-45 bekommt einen Eintrag in der Arbeitspaket-Liste.
- Nach Annahme nachziehen: Vermerk „geändert durch ADR-062“ in ADR-038 und ADR-059, Index in `docs/adr/README.md`,
  Roadmap und Arbeitspakete in `docs/konzept.md`, Abschnitt Architekturregeln in `AGENTS.md`
  („Erster Anwendungsfall …“).

## Offene Fragen

1. Braucht die Firma vor G2 ein Zwischenergebnis (z. B. Nachhallzeit als Kommandozeile, also ap-02 allein)?
2. Gehört ap-45 (STEP) in M1, oder reicht für G2 ein Export als glTF/STL und STEP folgt in M2?
3. Bleibt ap-04 (Rendering-Spike) in M0, oder wandert er ganz zu F1, weil Echtzeit-Darstellung im Browser für M1
   mit der Standard-Darstellung von three.js reicht?
