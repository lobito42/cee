# ADR-059: Meilensteine und Beta-Umfang

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-062 (CAD zuerst: M1 „Modellieren“ statt „Erstes Angebot“, Raum und Akustik als F1 nach
  der Beta)

## Kontext

Vor der Beta standen 32 von 42 Arbeitspaketen, sortiert nach Fachgebieten. Der Engpass ist nicht die Rechenzeit
der Agenten, sondern die menschliche Prüfzeit. Die Firma soll so früh wie möglich echt arbeiten können, ohne dass
Grundsatzentscheidungen später umgebaut werden müssen.

## Entscheidung

1. **Vier Meilensteine bis zur Beta**, jeder mit greifbarem Nutzen:
   - **M0 Klären (Gate G1):** Gerüst, Spikes Datenmodell, Akustik, Sync, Rendering, Identität; UX-Prototyp.
   - **M1 Erstes Angebot (Gate G2, früher „Werkbank“):** Die Firma erstellt allein ein echtes Angebot – Raum, Absorber aus dem Katalog,
     Nachhallzeit live, Fotomodus, Bericht mit Mengen und Kosten; im Browser, selbst gehostet, eine Person.
   - **M2 Zusammen:** mehrere Personen live und offline, Entwürfe, Freigabe (light), Suche (light).
   - **M3 Beta (Gate G3):** KI über MCP mit lokalem Modell, Textprojektion, Regeln, Knoten-Ansicht (nur lesen),
     öffentliche Fachpaket-API (minimal).
2. **Nach der Beta:** Knoten-Editor zum Bearbeiten, Apps und Studien, direktes Bearbeiten und Skelett, IFC/DXF,
   Möbel aus glTF, Änderungswesen, Ordnung im Ausbau, PLM/ERP, Lernschleife, Hosting, XR, Fertigung, zweiter Kernel.
3. **Architektur vollständig ab M1:** Befehlsregister, interne Fachpaket-API, Einheiten, fachneutraler Kern und
   CRDT-Datenmodell kommen in M1, auch wenn Funktionen darauf später folgen. Verschoben werden Funktionen, keine
   Grundsatzentscheidungen.
4. **Ein Change je Nacht:** Große Pakete werden in Teil-Changes geteilt (ap-07a/b, ap-08a/b/c, ap-13a/b, ap-23a,
   ap-33a/b, ap-37a/b). Kritischer Pfad: ap-05 → ap-40 → ap-06, ap-07a und ap-08a → ap-08b → ap-09 bis ap-13a →
   ap-14, ap-18, ap-19.
5. **Warteschlange:** `openspec/queue.yaml` folgt dieser Reihenfolge; ein Change aus einem späteren Meilenstein wird
   erst freigegeben, wenn der vorige Meilenstein erreicht ist (Ausnahme: Spikes und Spec-Entwürfe).

## Alternativen

Beta mit allen Funktionen (32 Pakete); Live-Zusammenarbeit schon in M1; Knoten-Editor zum Bearbeiten in der Beta.

## Konsequenzen

Ändert ADR-047, ADR-048, ADR-049, ADR-052, ADR-054 und ADR-055 (Zuordnung der Arbeitspakete).
M1 ist für eine Person; das Datenmodell bleibt von Anfang an auf Zusammenarbeit ausgelegt. Der Knoten-Editor ist
in der Beta eine lesende Ansicht; bearbeitet wird über 3D, Text und KI. Richtwerte: G1 Monat 1–2, G2 Monat 3–4,
G3 Monat 6, danach Ausbau.

## Nachtrag (2026-10-17): Machbarkeit und Autonomie (dritte Prüfschleife)

- **Zeitplan:** Die Richtwerte halten nur, wenn PRs meist am selben Werktag gemergt werden. Engpass ist nicht
  das Abo-Kontingent, sondern die Wartezeit auf Menschen (höchstens ein offener Agenten-PR). Bei zwei bis drei
  Reviews pro Woche ergibt die Schätzung G2 etwa im Monat 5–6 und G3 im Monat 9–10. Gegenmittel ohne mehr
  menschliche Zeit: Zustand aus dem Repository ableiten, rote PRs automatisch reparieren, nach jeder Task
  sichern (`tools/next_step.py`, `.github/workflows/nachtschicht.yml`).
- **Nachttauglich:** etwa die Hälfte der 35 Changes vollständig, ein Drittel teilweise (Logik nachts,
  Abnahme durch Menschen), einige gar nicht (ap-04 GPU, ap-41 UX-Test, ap-14 Bildurteil, ap-20 Normwerte).
  Scenarios werden deshalb als `[auto]` oder `[mensch]` gekennzeichnet (`openspec/config.yaml`).
- **Offen bis zum Einstieg der Firma** (bewusst zurückgestellt, Schnitt bleibt vorerst wie oben): Ob für G2
  „Erstes Angebot“ Zielwerte nach DIN 18041 (bisher ap-20, M3), Angebotsfelder (Kunde, Positionen, Rabatt,
  MwSt., Nummer, Briefkopf) in ap-19 und ein Grundriss als PDF/DXF im Hintergrund nötig sind, und ob dafür
  ap-39/ap-12 vom kritischen Pfad zu G2 sowie PyO3/SDK, Tauri und Englisch nach M2 rücken.

