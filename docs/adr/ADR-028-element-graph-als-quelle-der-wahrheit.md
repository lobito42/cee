# ADR-028: Element-Graph als Quelle der Wahrheit

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Ein Achsenursprung soll genauso behandelt werden wie ein komplettes Bauteil: adressierbar, veröffentlichbar, versionierbar, kommentierbar. Zusammenarbeit in Echtzeit, Knoten-Editor und KI brauchen ein Modell, das ohne Parsen von Quellcode änderbar ist.

## Entscheidung

Ein Projekt ist ein gerichteter, azyklischer Graph aus **Elementen**. Jedes Element hat dieselbe Form:

- `id` – stabil und global eindeutig (UUIDv7), ändert sich nie
- `type` – z. B. `point`, `axis`, `plane`, `sketch`, `extrude`, `face-ref`, `body`, `part`, `assembly`, `pmi`, `sheet`, `rule`, `requirement`, `script`
- `inputs` – Referenzen auf Ausgänge anderer Elemente (`<id>.<output>`)
- `params` – typisierte Werte oder Ausdrücke
- `outputs` – benannte, typisierte Ergebnisse
- `content` – optionaler Untergraph; ein Bauteil ist ein Element mit Untergraph, eine Baugruppe ebenso
- `meta` – Name, Publikationsstatus (ADR-015), Beschreibung, Herkunft

Geometrie ist abgeleitet und wird nie gespeichert oder synchronisiert (ADR-032). Python mit build123d bleibt als Elementtyp `script` mit deklarierten Ein- und Ausgängen erhalten. Für Git, Review und KI gibt es eine deterministische, verlustfreie **Textprojektion** des Graphen. Schema und Textformat liegen unter `format/` und sind versioniert.

## Alternativen

Python-Code als Quelle (ADR-003): KI-freundlich, aber Echtzeit-Zusammenarbeit, Knoten-Editor und atomare Adressierung nur über Parsen und Zurückschreiben. Eigenes Binärformat: nicht reviewbar.

## Konsequenzen

Ersetzt ADR-003 und ADR-024. ADR-015 bis ADR-020 gelten sinngemäß für Elemente statt für Code. Das Schema ist Vertrag: Änderungen nur per OpenSpec-Change mit Migration.
