# ADR-068: Auf SolidCraft aufsetzen – CAD-Kern nutzen, nicht nachbauen

- Status: akzeptiert
- Datum: 2026-11-05
- Entscheider: Kernteam (Ja im Gespräch, 2026-11-05)
- Ändert: ADR-067 Punkt 2 (Python-Bauplan als Wahrheit) und Punkt 5; stellt ADR-001, ADR-002, ADR-028, ADR-029,
  ADR-032 und ADR-062 für den CAD-Kern zurück

## Kontext

SolidCraft (github.com/tangency-labs/solidcraft, MIT/Apache-2.0, Rust) ist ein offenes parametrisches CAD mit
Skizzen und Bedingungen, Volumenmodellierung, Baugruppen, Blech, Größen mit Einheiten und Formeln, Zeitleiste,
STL/3MF/STEP, Desktop- und Browser-App, Kommandozeile und MCP-Server. Ein Praxistest am 2026-11-05 (Version
0.30.1) hat gezeigt: Der Winkelhalter lässt sich vollständig parametrisch aufbauen; Breite, Dicke und Randabstand
ändern das Teil exakt (Volumen auf 0,1 mm³ wie berechnet), Neuaufbau unter 0,5 s, STL dicht.

Gefunden wurden aber genau die Lücken, für die CEE seine Grundsätze hat:

1. Parametrisch ist möglich, aber nicht erzwungen (das mitgelieferte Beispielteil hat feste Bohrungspositionen).
2. Größen haben keine Bereiche; Breite 30 mm oder Dicke 2 mm erzeugen unbrauchbare Teile ohne Meldung.
3. Ein Gewinde (M6) kann keine Größe sein.
4. Die KI ändert direkt, ohne Vorschlag mit Vorher/Nachher.
5. Kein gemeinsames Arbeiten, keine Freigaben, keine Fachpakete.

## Entscheidung

1. **Den CAD-Kern nutzen wir von SolidCraft** (Geometrie, Skizzen, Zeitleiste, Größen, Baugruppen, Export,
   Oberfläche). CEE steuert ihn über die Kommandozeile (`solidcraft-cli`) und die MCP-Schnittstelle an.
2. **Die Wahrheit ist das SolidCraft-Teil** (`.sc`, als Text: die Befehlsliste aus `solidcraft-cli script`).
   Es gibt keinen zweiten Bauplan daneben. „Ein Bauplan, viele Sichten“ gilt weiter, mit diesem Bauplan.
3. **CEE baut, was fehlt**, in dieser Reihenfolge:
   - **Prüfer:** feste Zahlen, die Größen sein sollten; Bereiche je Größe durchprobieren; Gestaltänderungen und
     Fehler melden (die drei Rollen und Bereiche aus `docs/design/prinzipien.md`).
   - **KI auf Ebene der Absicht** mit Vorschlag, Vorher/Nachher und Prüferergebnis, bevor etwas übernommen wird.
   - Später: gemeinsames Arbeiten, Freigaben, Firmenfunktionen, Fachpakete.
4. **Rollen und Bereiche stehen im Teil selbst**, im Kommentar der Größe (Format in `docs/design/prinzipien.md`),
   damit es keine zweite Datei gibt. Was SolidCraft dafür besser direkt könnte (Bereiche, Gewinde als Größe),
   schlagen wir dort als Beitrag vor – erst nach Ja des Menschen, weil es nach außen geht.
5. **Ruht:** eigener Geometrie-Worker (build123d), eigenes Datenmodell, eigene CAD-Oberfläche. Nichts wird
   gelöscht. Der Entwurf „ein Bauplan, viele Sichten“ bleibt Vorlage für die CEE-eigenen Sichten (Rollen,
   Prüfergebnis, KI-Vorschlag).

## Alternativen

- Eigener Weg mit Python-Bauplan (ADR-067): passt am besten zu unseren Ideen, aber Monate Rückstand beim
  CAD-Kern gegenüber einem freien Projekt, das ihn schon hat.
- Eigene Kopie von SolidCraft (Fork) von Anfang an: nur, wenn Beiträge dort nicht angenommen werden.

## Konsequenzen

- Abhängigkeit von einem jungen, sehr schnell wachsenden Projekt mit eigenem Geometriekern. Die freie Lizenz
  erlaubt jederzeit eine eigene Kopie; das Risiko, festzusitzen, ist klein.
- SolidCraft-Versionen werden fest gewählt und bewusst aktualisiert; die Prüfer laufen gegen die gewählte Version.
