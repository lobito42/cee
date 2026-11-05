# ADR-068: Auf SolidCraft aufsetzen – eigene Kopie mit Abgleich, Zusammenarbeit und Vorschläge als Fundament

- Status: akzeptiert
- Datum: 2026-11-05
- Entscheider: Kernteam (Ja im Gespräch, 2026-11-05: „aufsetzen“; „eigene Kopie, die sich regelmäßig abgleicht“;
  „KI und Zusammenarbeit zusammen schaffen“; PLM/ERP bleibt Ziel)
- Ändert: ADR-067 Punkt 2 und 5; stellt für den CAD-Kern ADR-001, ADR-002, ADR-028, ADR-029, ADR-032 und ADR-062
  zurück; ersetzt für den Anfang ADR-030 (Elixir-Server) und ADR-033 (CRDT) durch Punkt 4

## Kontext

SolidCraft (github.com/tangency-labs/solidcraft, MIT/Apache-2.0, Rust) ist ein offenes parametrisches CAD mit
Skizzen und Bedingungen, Volumenmodellierung, Baugruppen, Blech, Größen mit Formeln, Zeitleiste, STL/3MF/STEP,
Desktop- und Browser-App, Kommandozeile und MCP-Server. Ein Praxistest am 2026-11-05 (Version 0.30.1) zeigte: Der
Winkelhalter lässt sich vollständig parametrisch aufbauen; Änderungen stimmen exakt, Neuaufbau unter 0,5 s, STL
dicht. Es fehlen genau die Dinge, für die CEE steht: erzwungene Parametrik (Rollen, Bereiche, Prüfer), KI-Vorschläge
mit Vorschau, Zusammenarbeit, Freigaben, PLM/ERP, Fachpakete.

FigCraft (github.com/storytold/figcraft, MIT/Apache-2.0, Rust, gleiche Bauweise wie SolidCraft) hat Zusammenarbeit
in Echtzeit fertig: Server legt die Reihenfolge fest, übertragen wird „Eigenschaft X von Objekt Y ist jetzt Z“,
Anwesenheit (Cursor, Auswahl, Folgen), Rückgängig nur für eigene Änderungen, kurzes Offline mit Nachholen, eigener
Server mit Freigabe-Links, Browser tritt bei, Agenten über dieselben Befehle.

## Entscheidung

1. **Eigene Kopie von SolidCraft, die sich regelmäßig abgleicht.** CEE pflegt eine Kopie (Fork) und holt die
   Neuerungen von SolidCraft automatisch und regelmäßig herein; ein Abgleich wird nur übernommen, wenn Prüfer und
   Tests grün sind. CEE-eigener Code liegt in eigenen Bausteinen (Crates `cee-*`) und greift möglichst nur über
   Befehle und Schnittstellen ein, damit der Abgleich selten Konflikte hat. Was allen nützt (z. B. Gewinde als
   Größe, Bereiche für Größen), wird SolidCraft zusätzlich als Beitrag angeboten – erst nach Ja des Menschen.
2. **Die Wahrheit ist das Teil im SolidCraft-Format** (`.sc`, als Text die Befehlsliste). Kein zweiter Bauplan.
3. **Ein gemeinsames Fundament für Zusammenarbeit, KI und PLM: der Änderungssatz.** Jede Änderung – von einem
   Menschen, einer KI oder einem Abgleich – ist ein Änderungssatz am Teil.
   - **Zusammenarbeit** überträgt Änderungssätze live an alle.
   - **Vorschläge:** Ein Änderungssatz kann zurückgehalten werden; alle sehen Vorher/Nachher und das
     Prüferergebnis, ein Mensch übernimmt oder verwirft (ADR-021). Die KI ist ein Teilnehmer der Sitzung, dessen
     Änderungen immer als Vorschlag ankommen; welches Modell dahintersteht, ist austauschbar (ADR-037). Lokale
     Modelle sind das Ziel; bis sie schnell genug sind, geht es mit einem ausdrücklich gewählten Anbieter.
   - **Freigabe und PLM:** Ein Stand wird freigegeben (Item, Revision, unveränderlich, mit Prüfbericht; ADR-047);
     Verlauf, Stückliste und Ereignisse für PLM/ERP (ADR-048) bauen auf denselben Änderungssätzen auf.
4. **Zusammenarbeit nach dem Vorbild von FigCraft**, Code übernommen und auf das Teil-Modell von SolidCraft
   (Größen, Skizzen, Schritte) angepasst; CAD-eigene Regeln (gleichzeitiges Einfügen in die Zeitleiste, Löschen von
   Bezügen) kommen dazu. Server in Rust. Langlebige getrennte Entwürfe mit Zusammenführen kommen später.
5. **Der CEE-Prüfer** (Runde 1) prüft jeden Vorschlag, jeden Abgleich und jede Freigabe.
6. **Ruht:** eigener Geometrie-Worker (build123d), eigenes Datenmodell im Rust-Kern, Elixir-Server, eigene
   CAD-Oberfläche. Nichts wird gelöscht.

## Alternativen

- Nur Beiträge zu SolidCraft, keine Kopie: abhängig davon, ob dort Zusammenarbeit, Freigaben und PLM gewollt sind.
- Eigener Weg mit Python-Bauplan (ADR-067): Monate Rückstand beim CAD-Kern.

## Konsequenzen

- Der Abgleich ist laufende Arbeit; er wird automatisiert und durch Prüfer abgesichert.
- SolidCraft und FigCraft sind junge, sehr schnell wachsende Projekte. Die freie Lizenz sichert die Kopie ab.
- Die Lizenz der CEE-Bausteine bleibt MPL-2.0 (ADR-034); die übernommenen Teile behalten MIT/Apache-2.0.
