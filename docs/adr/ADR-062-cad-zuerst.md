# ADR-062: CAD zuerst – Meilensteine neu geschnitten

- Status: akzeptiert
- Datum: 2026-10-19
- Entscheider: Kernteam
- Geändert durch: ADR-065 (Bohrung als Kernbefehl, Operationen aus dem Abgleich)
- Ändert: ADR-059 (Meilensteine, kritischer Pfad), ADR-038 (Rolle des ersten Anwendungsfalls), ADR-046
  (Verbindungen in Baugruppen gehören zum Kern statt zum Fachpaket Mechanik)

## Kontext

CEE ist in erster Linie ein CAD-System: Geometrie und Eigenschaften im Element-Graphen. ADR-059 hat M1 als
„Erstes Angebot“ für die Absorber-Firma geschnitten – Raum, Absorber, Nachhallzeit live, Fotomodus und Bericht.
Damit stehen Akustik, Rendering und Angebotsbericht auf dem kritischen Pfad, während allgemeines Modellieren
(Skizze, Formelemente, Teile, Baugruppen) nur so weit vorkommt, wie die Absorber es brauchen. Das widerspricht
dem fachneutralen Kern (ADR-046) und der Rolle der Akustik als Fachpaket (ADR-054): Ein Fachpaket soll sich an
einen fertigen Kern anschließen, nicht dessen Reihenfolge bestimmen. Akustik und die Firma haben keine Eile.
Die Spikes ap-00 und ap-01 sind abgeschlossen, ap-02 (Akustik) ist seit 2026-10-19 aus der Nachtschicht genommen.

## Entscheidung

1. **Leitlinie:** Alles, was zum CAD-Kern gehört – Geometrie, Identität, Skizzen, Formelemente, Teile,
   Baugruppen mit Verbindungen, Eigenschaften und die Ansichten auf den Graphen –, kommt so früh wie möglich.
   Fachpakete, Rendering für Präsentation, Angebote und Export folgen danach.
   Begonnen wird mit regulärer 3D-Modellierung, wie man sie für den 3D-Druck braucht: Volumenkörper aus Skizzen,
   Schalen, Verrundungen, Muster. Die einfache Bohrung (Durchgang, Senkung, Kegelsenkung) ist ein Kernbefehl
   (ADR-065, Abgleich mit build123d, Onshape, FreeCAD). Fertigungsoperationen (Gewinde, Fräs- und Blech-Features,
   Fertigungsregeln) kommen später als Fachpakete.
2. **M0 Klären (Gate G1):** Gerüst (ap-00, fertig), Datenmodell (ap-01, fertig), Sync (ap-03), persistente
   Identität (ap-39), UX-Prototyp (ap-41) mit Modellier-Abläufen (Skizze, Formelement, Baugruppe) statt
   Raum-Abläufen. Akustik-Spike ap-02 und Rendering-Spike ap-04 gehören nicht mehr zu G1.
3. **M1 Modellieren (Gate G2, bisher „Erstes Angebot“):** Eine Person modelliert im Browser, selbst gehostet,
   parametrische Teile und Baugruppen mit Eigenschaften.
   - ap-05 Graph-Kern, ap-40 Bindungen, ap-06 Kernel-Worker (Abnahme an einem Referenzteil statt am Raum),
     ap-07a Server-Dokument, ap-08a Grundlagen, ap-08b Arbeitsfläche (Darstellung mit three.js-Standardmitteln),
     ap-16 Selbstbetrieb
   - ap-12 Skizzen mit Maßen und Zwangsbedingungen, Extrusion; für beliebige Teile, nicht nur Absorberformen
   - neu **ap-45 Volumenmodellierung:** Drehen, Ausformen (Loft), Austragen (Sweep), Schale, Verrundung, Fase,
     Spiegeln, lineares, kreisförmiges und Raster-Muster, boolesche Operationen (auch Körper teilen), Bohrung, Rippe,
     Extrudieren mit Optionen (beidseitig, Schräge, bis Fläche) – mit stabiler Identität (ap-39)
   - ap-10 Material als Element mit Eigenschaftsgruppen (ADR-039); Akustik ist eine Gruppe unter mehreren
   - ap-13a Komponenten, Varianten und Instanzen mit Verbindungspunkten (ADR-043) an einem fachneutralen Katalog
   - neu **ap-46 Baugruppen mit Verbindungen:** Verbindungen (fest, Drehen, Schieben, Zylinder, Kugel, eben)
     zwischen Verbindungspunkten (ADR-043), Bewegen innerhalb der Freiheitsgrade, Kollisionsprüfung
   - neu **ap-47 Export STL** von Teilen und Baugruppen für den Slicer
   - ap-18 Eigenschaften auswerten: Volumen, Masse, Schwerpunkt, Mengen und Kosten je Teil und Baugruppe
   - **G2-Kriterium:** Eine Testperson modelliert allein im Browser ein typisches 3D-Druck-Teil (Gehäuse mit
     Deckel: Schale, Verrundungen, Muster) und eine Baugruppe aus fünf Teilen mit Varianten und mindestens einer
     Dreh- und einer Schiebeverbindung; die Kollisionsprüfung findet eine absichtlich eingebaute Überschneidung;
     50 Parameteränderungen zerbrechen keine Referenz; Masse und Schwerpunkt stimmen mit der Handrechnung; die
     STL des Gehäuses öffnet ein Slicer (PrusaSlicer) ohne Reparaturhinweis.
4. **M2 Zusammen:** wie in ADR-059 (ap-07b, ap-25, ap-17, ap-26, ap-13b, ap-33a, ap-37a), zusätzlich vorgezogen
   aus M3 die beiden anderen Ansichten auf den Graphen: ap-24 Textprojektion und ap-23a Knoten-Ansicht (lesen).
5. **M3 Beta:** ap-15 MCP und KI, ap-08c Arbeitsfläche Ausbau, ap-27 öffentliche Fachpaket-API mit einem
   minimalen Beispiel-Fachpaket, neu **ap-48 Prüfungen für den 3D-Druck** (Mindestwandstärke, Überhänge,
   geschlossener Körper) als Regeln (ADR-008). Abnahmen, die bisher an Raum oder Absorbern hängen (ap-15, ap-08c, ap-23a),
   werden fachneutral formuliert.
6. **Fachpaket Raum und Akustik (F1, nach der Beta, ohne Termin):** ap-02 Nachhallzeit, ap-09 Raum-Elemente,
   ap-04 und ap-14 Rendering mit Fotomodus, ap-11 Akustik live, ap-19 Bericht und Angebot, ap-20 Regeln. Es nutzt
   nur die Fachpaket-API (ADR-054). Kriterium wie bisher G2: Die Firma erstellt allein ein echtes Angebot.
7. **Export:** bis zur Beta nur STL (ap-47) für den 3D-Druck; ap-33a bringt STEP als Teil des Freigabestands mit.
   Weitere Formate (glTF, 3MF, STEP einzeln) folgen nach der Beta.
8. **Kritischer Pfad:** ap-05 → ap-40 → ap-39 → ap-06 → ap-08a → ap-08b → ap-12 → ap-45 → ap-13a → ap-46 → ap-18; ap-47 nach ap-45.
   ap-07a und ap-10 laufen daneben.
9. **Warteschlange:** `openspec/queue.yaml` folgt dieser Reihenfolge. Changes aus F1 werden erst nach der Beta
   freigegeben; ap-02 bleibt freigegeben, aber ohne Nachtschicht.

## Alternativen

- ADR-059 unverändert (Angebot zuerst): früher Nutzen für die Firma, aber der Kern wächst entlang eines
  Fachgebiets, und allgemeines Modellieren kommt spät.
- F1 parallel zu M2: hält die Firma näher, bindet aber Prüfzeit, die für den CAD-Kern gebraucht wird.
- Export (STEP) schon in M1: für die ersten Abnahmen nicht nötig.

## Konsequenzen

- Die Firma bekommt ihr erstes Angebot erst nach der Beta. Dafür steht zuerst ein allgemeines, fachneutrales
  CAD-Fundament, auf dem auch andere Fachpakete aufbauen.
- ADR-038 gilt weiter als erster *Anwendungsfall*, bestimmt aber keinen Meilenstein des Kerns mehr; ADR-040
  (Fotomodus) und ADR-041 (Akustik-Berechnung) wandern zu F1.
- Zeichnungsblätter und semantische PMI (F-17, F-18, ap-31) bleiben nach der Beta.
- Abnahmekriterien von ap-06, ap-10, ap-12, ap-13a, ap-15, ap-08c und ap-23a werden fachneutral umformuliert,
  wenn ihre Changes entworfen werden; ap-45 bis ap-48 bekommen Einträge in der
  Arbeitspaket-Liste; F-09 (Verbindungen, Kollision) wird Muss vor der Beta; F-05 nennt STL vor der Beta, 3D-Druck-
  Prüfungen rücken aus „nach der Beta“ (F-04, ap-31) nach M3.
- Nachgezogen bei der Annahme: Vermerk „geändert durch ADR-062“ in ADR-038, ADR-046 und ADR-059, Index in
  `docs/adr/README.md`, Roadmap und Arbeitspakete in `docs/konzept.md`, Architekturregeln in `AGENTS.md`.

## Offene Fragen

1. Zwangsbedingungen in Skizzen hängen an der Lizenzklärung für PlaneGCS (ADR-027). Option ohne diese Frage:
   der Löser aus [CADCraft](https://github.com/storytold/cadcraft) (`crates/constraints`, reines Rust,
   MIT oder Apache-2.0, eigenes gedämpftes Gauss-Newton-Verfahren, Freiheitsgrade, Formeln, Widerspruchserkennung,
   läuft auch als WASM); er hängt am Dokumentmodell von CADCraft und müsste herausgelöst oder als Vorlage für
   einen eigenen Löser genutzt werden. Ein kurzer Spike zu Beginn von ap-12 vergleicht PlaneGCS, den
   CADCraft-Löser und einen eigenen Löser (Lizenz, Robustheit an Referenzskizzen, Zeit, WASM). Bis dahin starten
   Skizzen nur mit Maßen, Zwangsbedingungen folgen als eigener Change.
