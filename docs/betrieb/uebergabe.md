# Übergabe – Stand 2026-10-19

Für die nächste Sitzung (Claude CLI am Rechner, Claude in der Cloud oder ein anderer Agent). Der Projektzustand liegt
vollständig im Repository; diese Seite fasst zusammen, was zuletzt passiert ist und was offen ist. Wie der Alltag läuft: `docs/betrieb/arbeitsweise.md`
(kurz: `claude` → `/stand`).

## Weiterarbeiten in der CLI

```bash
git clone git@github.com:lobito42/cee.git && cd cee     # bzw. git pull
git config core.hooksPath .githooks
mise install                                            # Erlang/Elixir/Node aus .tool-versions (oder eigene Installation)
rustup toolchain install                                # Rust aus rust-toolchain.toml
uv sync --extra cad
npm install -g @fission-ai/openspec@1.14.2
export CEE_ROLE=core                                    # nur für das Kernteam: hebt den Vertragsschutz auf main auf
claude
```

Einstieg in der Sitzung: „Lies `AGENTS.md` und `docs/betrieb/uebergabe.md`, dann `openspec/queue.yaml`.“
Prüfen, was die Nachtschicht als Nächstes täte: `python3 tools/next_step.py` (braucht `gh auth login`).

## Was entschieden ist (ADR-045 bis ADR-061)

| Thema | ADR | Kern |
| --- | --- | --- |
| Befehle, Erweiterungen, Vertrauen | 045 | Ein Befehlsregister für Mensch, Plugins, KI; Plugins isoliert |
| Fachneutraler Kern | 046 | Raum und Akustik sind nur das erste Fachpaket |
| Freigabe, Revisionen | 047 | Item, Revision, Lebenszyklus; Selbstfreigabe bis zwei Personen |
| PLM/ERP | 048 | offenes Format, API, Ereignisse |
| Automatisierung (Synera) | 049 | Untergraph als Befehl, Apps, Studien |
| Bewährtes aus CAD | 050 | Referenz-Eingänge, robuste Neuberechnung, Detailstufen |
| Versionierung in Alltagsbegriffen | 051 | Entwurf, Meilenstein, Übernehmen; Ansichten „Ergebnis“ und „Alle Entwürfe“ |
| Ordnung und Wiederfinden | 052 | eine Suche, Facetten, Rückverweise statt Ordner |
| Lernschleife lokaler Modelle | 053 | Prüfer bewerten, nie Selbstbewertung |
| Fachpakete und Arbeitsbereiche | 054 | interne Fachpaket-API zuerst |
| Rechte, Datenschutz, Einheiten, Adressen | 055–058 | Dienstkonten ohne Freigaberecht; Größen mit Einheit; ID-Adressen |
| Meilensteine | 059, 062 | M0 Klären, M1 Modellieren, M2 Zusammen, M3 Beta; Raum und Akustik als F1 nach der Beta (CAD zuerst); Nachtrag Machbarkeit |
| Geräte, Layouts, Eingabe, XR | 060 | Linux und Mac zuerst, Windows mit, iPad, kein Handy; Layouts Desktop und Tablet; Befehle als Daten; 3D-Maus über HID; XR erst WebXR, Endziel native App auf der Vision Pro |
| Designsystem | 061 | ein Muster je Aufgabe (`docs/design/muster.md`), Tokens (`docs/design/tokens.json`), Inter, Graphit mit Akzent Stahlblau |

Begriffe stehen in `docs/glossar.md` (u. a. nicht „Werkbank“, „Kompakt“, „Werkstatt“, „Änderungskarte“).

## Harness (unbeaufsichtigtes Arbeiten)

- Nachtschicht als GitHub-Action `.github/workflows/nachtschicht.yml`, werktags 01:07; Ausschalter
  Repository-Variable `NACHTSCHICHT=an`. Betrieb und Morgenroutine: `docs/betrieb/routine-nachtschicht.md`.
- `tools/next_step.py` entscheidet ohne KI, Zustand aus dem Repo (Tests auf main → Umsetzung; Tasks abgehakt oder
  `change/<id>` gemergt → fertig); Entwurfs-PRs werden fortgesetzt, rote PRs bis zu zweimal repariert, dann `blocked`.
- Strenger Testmodus (`CI` bzw. `CEE_STRICT=1`): fehlende Werkzeuge sind Fehler.
- Feste Versionen: `.tool-versions`, `rust-toolchain.toml`.
- Abnahmetest-PRs (`tests/<id>`): die neuen Tests sind absichtlich rot; die CI prüft dort nur, dass sie sich sammeln
  lassen, alle anderen fälligen Tests bleiben Pflicht – so können sie trotz Branch-Schutz gemergt werden.
- Warteschlange: ap-00 (Gerüst) ist fertig und archiviert. Offen: ap-01 (Spike Datenmodell, Opus) und ap-02
  (Akustik), beide mit Abnahmetests auf main. Nächster Schritt der Nachtschicht: `build` für ap-01.

## Wo was liegt

| Was | Wo |
| --- | --- |
| Konzept (Quelle, kommentierbar) | Claude-Doc, Link oben in `docs/konzept.md`; Export im Repo: `docs/konzept.md` |
| UI-Entwurf | Design-Canvas, Link und Quelltexte in `docs/design/ui-entwurf/` |
| Entscheidungen | `docs/adr/` (Index `README.md`) |
| Regeln je Bereich | `docs/rules/` |
| Ideen (nicht umsetzen ohne Change) | `docs/ideen/` |

## Offen – braucht Menschen

| Punkt | Wann | Notiz |
| --- | --- | --- |
| Lizenzfrage PlaneGCS (LGPL im Browser); Vergleich mit dem Löser aus CADCraft | Spike zu Beginn von ap-12 | ADR-027, ADR-062 |
| F1-Schnitt mit der Firma: Zielwerte DIN 18041, Angebotsfelder, Grundriss-Hintergrund | nach der Beta, wenn die Firma dazukommt | ADR-062 |
| Sachnummernschema, UX-Test (ap-41) | mit der Firma | ADR-047, Konzept |
| Testkorpora für ap-39 (Identität) und ap-25 (Konflikte) | vor deren Abnahmetests | `tests/golden/<id>/`, vom Kernteam |
| Hardware für Spike ap-42 (Quest 3, 3D-Maus, iPad, Vision Pro) | wenn gewünscht | vorhanden, kommt später |
| Apple-Entwicklerkonto (Signatur Mac-App und Apple-Apps) | vor Auslieferung | ADR-060 |
| Eigene GitHub-App bzw. Bot-Identität für Agenten | wenn Produktcode steht | zurückgestellt |
| GitHub-Namen von `@person-b` (CODEOWNERS) | bald | – |
| Grundtypliste in `format/`, Beispiel `parts/examples/halter.py` | mit ap-05 | – |
| Nächste Changes freigeben (M0: ap-39, ap-03, ap-04, ap-41) | wenn ap-00 bis ap-02 laufen | Specs per `/opsx:propose` |

## Bekannte Risiken

- Linux: WebKitGTK in Tauri ist das schwächste Glied (3D-Leistung, kein WebHID) – ap-04 misst.
- Rust für visionOS noch kein voll unterstütztes Ziel – ap-42/ap-44 prüfen früh.
- In der Cloud-Umgebung von Claude Code sind hex.pm und static.rust-lang.org gesperrt; deshalb läuft die
  Nachtschicht als GitHub-Action.
- Zeitplan hängt an der Review-Frequenz (ADR-059, Nachtrag): bei 2–3 Reviews pro Woche G2 eher Monat 5–6.
