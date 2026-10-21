# cee-graph

Der Element-Graph als Rust-Kern (ADR-028, ADR-029): Schema, Einheiten (ADR-057), Dokument auf Automerge,
Prüfung. Server, Client und SDK binden diese Crate ein und bauen keine eigene Logik nach. Lizenz MPL-2.0.

| Modul | Inhalt |
| --- | --- |
| `units` | Dimensionen, Einheitentabelle (UCUM), Umrechnung, Lesen von Eingaben |
| `types` | Typdefinitionen: Parameter → Dimension und Standard-Einheit (zur Laufzeit, nicht im Dokument) |
| `schema` | Elementform, Größe und Geld, Muster für IDs und Namen, Regeln beim Schreiben von Zahlen, ULID |
| `doc` | Dokument: Operationen, Laden, Speichern, Merge, Inhalts-Hash, Export, Stapel-Import |
| `validate` | Prüfung mit Befunden (`element`, `field`, `name`, `code`, `severity`, `message`) |
| `synth` | Deterministischer Generator für Projekte und Prüfkorpora |
| `index` | Index (ID → Eltern, Kinder, Eingänge, Nutzer), Untergraph, Abbild zum Mitspeichern |
| `deps` | Zyklen, stabile Reihenfolge, betroffene Elemente |
| `state` | Berechnungszustände `current`, `stale`, `running`, `failed` – neben dem Dokument, nie darin |
| `migrate` | Schema-Version im Dokument, Migrationen, Beispiel-Migration hinter Feature `demo-migration` |

Alle öffentlichen Funktionen geben `Result<_, Error>` zurück; `Error::code()` liefert den stabilen
Fehlercode für Bindungen. Kein `unsafe`, kein `unwrap`/`expect`/`panic!` außerhalb von Tests.

## Einheitentabelle

Kanonisch sind mm, kg, s, rad, A, K, mol, cd, kg{CO2e}; abgeleitete Dimensionen speichern im Produkt der
kanonischen Einheiten. Faktor = Wert einer Einheit in der kanonischen Einheit. Weitere Einheiten nur per Change.

| Dimension (kanonisch) | Codes und Faktoren |
| --- | --- |
| `length` (mm) | `um` 0,001 · `mm` 1 · `cm` 10 · `m` 1000 · `km` 10⁶ · `[in_i]` 25,4 · `[ft_i]` 304,8 |
| `area` (mm2) | `mm2` 1 · `cm2` 100 · `m2` 10⁶ · `[in_i]2` 645,16 |
| `volume` (mm3) | `mm3` 1 · `cm3` 1000 · `l` 10⁶ · `m3` 10⁹ · `[in_i]3` 16.387,064 |
| `angle` (rad) | `rad` 1 · `deg` π/180 |
| `mass` (kg) | `g` 0,001 · `kg` 1 · `t` 1000 · `[lb_av]` 0,45359237 |
| `time` (s) | `ms` 0,001 · `s` 1 · `min` 60 · `h` 3600 |
| `frequency` (Hz) | `Hz` 1 · `kHz` 1000 |
| `force` (N) | `N` 1 · `kN` 1000 |
| `pressure` (MPa = N/mm2) | `Pa` 10⁻⁶ · `kPa` 0,001 · `MPa` 1 · `GPa` 1000 · `N/mm2` 1 |
| `density` (kg/mm3) | `kg/mm3` 1 · `kg/m3` 10⁻⁹ · `g/cm3` 10⁻⁶ |
| `temperature` (K) | `K` 1 |
| `co2e` (kg{CO2e}) | `kg{CO2e}` 1 · `t{CO2e}` 1000 |
| `dimensionless` (1) | `1` 1 · `%` 0,01 |

Die Dimension ist ein Exponentenvektor über L, M, T, I, Theta, N, J sowie die eigenen Achsen A (Winkel) und
C (CO₂-Äquivalent); dadurch wird `90°` nie mit einer reinen Zahl und `kg{CO2e}` nie mit einer Masse verrechnet.
Eingaben liest `units::parse_quantity`: `<Zahl> [<Code>]`, Dezimalkomma oder -punkt, `°` für `deg`.

## Speicherform und Regeln

Ein Projekt ist ein Automerge-Dokument: `project` (Map), `roots` (Liste von IDs), `elements` (Map ID → Element).
Größe: `{"value": <Zahl>, "unit": "<kanonischer Code>"}`; Geld: `{"amount": "<Dezimalzahl>", "currency": "<ISO 4217>"}`.
Beim Schreiben (Operation und Import) gilt die Regeltabelle aus `design.md`: Umrechnen in die kanonische Einheit,
Ablehnen bei falscher Dimension, unbekanntem Code oder ungültigem Geld, bei einer Zahl ohne Einheit die Standard-Einheit
aus der Typdefinition annehmen (Warnung `unit_assumed`, vermerkt in `meta.assumed_units`) oder unverändert speichern
(Warnung `unit_missing`). Der Stapel-Import lehnt nichts als Ganzes ab; zulässige Werte werden normalisiert, unzulässige
bleiben stehen und die Prüfung meldet sie.

Der Import baut das Dokument mit Automerge-Batch-Operationen (`batch_create_object`). Einzelne `put_object`-Aufrufe
kosten etwa 15–20 µs je Operation und machten den Aufbau 20-mal langsamer.

## Kommandozeile `graphctl`

`cargo run -q --release -p cee-graph --example graphctl -- <befehl>` (Ausgabe JSON): `units`, `parse`, `convert`,
`import`, `validate`, `apply`, `export`, `hash`, `merge`, `synth`, `bench --json` sowie (ap-05b) `order`, `affected`,
`states`, `migrate`, `subgraph`. Mit `--features demo-migration` übersetzt, kennt `graphctl` die Beispiel-Migration.

## Abhängigkeiten, Zustände, Migrationen, Teil-Laden (ap-05b)

- **Abhängigkeiten:** Hat `b` einen Eingang `a.out`, hängt `b` von `a` ab; `content` ist keine Abhängigkeit, macht
  aber die Eltern eines betroffenen Elements mit betroffen. `set_input` lehnt einen Zyklus mit dem Fehler `cycle`
  ab (Dokument unverändert). Entsteht ein Zyklus erst durch Zusammenführen, meldet `Doc::validate` den Befund `cycle`
  an allen Elementen auf dem Zyklus; `deps::order` lässt sie und ihre Nachfolger aus (`skipped`), der Rest bleibt
  berechenbar. Gleichstand in der Reihenfolge entscheidet die kleinste ID.
- **Zustände:** `state::States` hält je Element `current`, `stale`, `running` oder `failed` (mit Befund) getrennt vom
  Dokument. `ready()` liefert `stale`-Elemente, deren Eingänge alle `current` sind; ein Fehler blockiert nur seine
  Nachfolger. Wird ein laufendes Element geändert, ist es nach `finish_ok` wieder `stale`.
- **Migrationen:** `ROOT.project.schema_version`; `Doc::load` migriert der Reihe nach (ein Commit `migrate n->n+1`
  je Schritt) und lehnt neuere Versionen mit `schema_too_new` ab. Die Beispiel-Migration 1 → 2 (`meta.name` →
  `meta.title`) gibt es nur mit Feature `demo-migration`; die echte Version bleibt 1.
- **Teil-Laden:** `Doc::open` lädt die Bytes und baut nur den Index auf; `Doc::subgraph(id)` bereitet Parameter und
  Meta der Nachfahren erst bei Bedarf auf (`materialized_count`) und nennt die nach außen zeigenden Eingänge.
- **Index-Abbild:** Der Index aus dem Dokument zu lesen kostet rund 1,6 s für 100.000 Elemente (je Element mehrere
  Automerge-Zugriffe). `Doc::save` hängt deshalb ein Abbild des Index an die Automerge-Bytes
  (`<automerge><abbild><länge u64>CEEIDX01`). Es ist abgeleitet, liegt außerhalb des CRDT und gilt nur, wenn die Köpfe
  des Dokuments übereinstimmen; sonst oder bei beschädigtem Abbild wird der Index neu gelesen. `Doc::save_plain`
  liefert reine Automerge-Bytes für den Austausch mit anderen Werkzeugen. Der Import baut den Index beim Aufbau mit.

## Messwerte

Gemessen mit `graphctl bench --json` im Release-Build (Entwicklungsumgebung des Change, Median aus 3 Läufen steht in
den Abnahmetests). Budgets laut `design.md`:

| Kennzahl | Wert | Budget |
| --- | --- | --- |
| `load_100k_ms` (Laden 100k, 10.000 Änderungen Historie) | ≈ 1.200 | ≤ 2.000 |
| `validate_100k_ms` (Prüfung des gelesenen Modells, 100k) | ≈ 310 | ≤ 1.000 |
| `op_p95_ms` (Änderung inkl. Einheitenregel und Commit) | ≈ 0,17 | ≤ 5 |
| `parse_p95_us` (Eingabe lesen und umrechnen) | ≈ 0,2 | ≤ 50 |
| `import_10k_ms` | ≈ 260 | ≤ 2.000 |
| `import_100k_ms` | ≈ 2.700 | nur gemessen |
| `size_100k_mb` (reine Automerge-Bytes) | ≈ 7,1 | nur gemessen |
| `size_with_index_100k_mb` (mit Index-Abbild) | ≈ 11 | nur gemessen |
| `load_index_100k_ms` (Laden samt Index, ap-05b) | ≈ 1.300 | ≤ 2.000 |
| `index_100k_ms` (Index aus dem Abbild) | ≈ 90 | ≤ 300 |
| `index_rebuild_100k_ms` (Index aus dem Dokument gelesen, nur zur Information) | ≈ 1.600 | – |
| `order_100k_ms` | ≈ 75 | ≤ 300 |
| `affected_p95_ms` (1.000 zufällige Elemente in 100k) | ≈ 3,5 | ≤ 5 |
| `op_p95_ms` (Eingang setzen inkl. Zyklustest; ab ap-05b) | ≈ 0,1 | ≤ 5 |
| `param_op_p95_ms` (Parameter setzen, früher `op_p95_ms`) | ≈ 0,2 | – |
| `subgraph_1000_ms` (Gruppe mit 1.000 Elementen aus 100k) | ≈ 30 | ≤ 50 |
| `export_100k_ms` (ganzes Dokument lesen, nur zur Information) | ≈ 1.700 | – |

Hinweis zu `validate_100k_ms`: Das Lesen des ganzen Dokuments (`Doc::export`, ein sequentieller Durchgang über rund
1,6 Mio. Automerge-Einträge) kostet allein etwa 0,9 s Untergrenze und im Ganzen rund 1,7 s. Die Kennzahl misst deshalb die
Prüfung selbst auf dem gelesenen Modell; `Doc::validate` führt beides aus. Ob das Budget das Lesen einschließen soll,
entscheidet das Kernteam (siehe PR, „Offene Fragen“).
