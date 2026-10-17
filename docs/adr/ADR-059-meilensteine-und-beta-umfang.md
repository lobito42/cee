# ADR-059: Meilensteine und Beta-Umfang

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Vor der Beta standen 32 von 42 Arbeitspaketen, sortiert nach Fachgebieten. Der Engpass ist nicht die Rechenzeit
der Agenten, sondern die menschliche Prüfzeit. Die Firma soll so früh wie möglich echt arbeiten können, ohne dass
Grundsatzentscheidungen später umgebaut werden müssen.

## Entscheidung

1. **Vier Meilensteine bis zur Beta**, jeder mit greifbarem Nutzen:
   - **M0 Klären (Gate G1):** Gerüst, Spikes Datenmodell, Akustik, Sync, Rendering, Identität; UX-Prototyp.
   - **M1 Werkbank (Gate G2):** Die Firma erstellt allein ein echtes Angebot – Raum, Absorber aus dem Katalog,
     Nachhallzeit live, Fotomodus, Bericht mit Mengen und Kosten; im Browser, selbst gehostet, eine Person.
   - **M2 Zusammen:** mehrere Personen live und offline, Entwürfe, Freigabe (light), Suche (light).
   - **M3 Beta (Gate G3):** KI über MCP mit lokalem Modell, Textprojektion, Regeln, Knoten-Ansicht (nur lesen),
     öffentliche Fachpaket-API (minimal).
2. **Nach der Beta:** Knoten-Editor zum Bearbeiten, Apps und Studien, direktes Bearbeiten und Skelett, IFC/DXF,
   Möbel aus glTF, Änderungswesen, Ordnung im Ausbau, PLM/ERP, Lernschleife, Hosting, XR, Fertigung, zweiter Kernel.
3. **Architektur vollständig ab M1:** Befehlsregister, interne Fachpaket-API, Einheiten, fachneutraler Kern und
   CRDT-Datenmodell kommen in M1, auch wenn Funktionen darauf später folgen. Verschoben werden Funktionen, keine
   Grundsatzentscheidungen.
4. **Ein Change je Nacht:** Große Pakete werden in Teil-Changes geteilt (ap-07a/b, ap-08a/b, ap-23a, ap-33a/b,
   ap-37a/b). Kritischer Pfad: ap-05 → ap-40 → ap-06 und ap-07a → ap-08a → ap-09 bis ap-13 → ap-14, ap-18, ap-19.
5. **Warteschlange:** `openspec/queue.yaml` folgt dieser Reihenfolge; ein Change aus einem späteren Meilenstein wird
   erst freigegeben, wenn der vorige Meilenstein erreicht ist (Ausnahme: Spikes und Spec-Entwürfe).

## Alternativen

Beta mit allen Funktionen (32 Pakete); Live-Zusammenarbeit schon in M1; Knoten-Editor zum Bearbeiten in der Beta.

## Konsequenzen

M1 ist für eine Person; das Datenmodell bleibt von Anfang an auf Zusammenarbeit ausgelegt. Der Knoten-Editor ist
in der Beta eine lesende Ansicht; bearbeitet wird über 3D, Text und KI. Richtwerte: G1 Monat 1–2, G2 Monat 3–4,
G3 Monat 6, danach Ausbau.
