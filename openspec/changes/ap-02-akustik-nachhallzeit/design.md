## Context

Siehe proposal.md – Why. Regeln: `docs/rules/akustik.md`. Formeln (c = 343 m/s, Konstante 0,161 s/m):

- Sabine: T = 0,161 · V / (Σ Sᵢ·αᵢ + Σ Aₒ)
- Eyring: T = 0,161 · V / (−S · ln(1 − ᾱ) + Σ Aₒ) mit S = Σ Sᵢ und ᾱ = Σ Sᵢ·αᵢ / S

V Raumvolumen in m³, Sᵢ Flächen in m², αᵢ Absorptionsgrad je Band, Aₒ äquivalente Absorptionsfläche von
Objekten (z. B. Baffeln, Möbel) in m² je Band.

## Goals / Non-Goals

**Goals:** korrekte, schnelle, gut getestete Berechnung mit klarer Schnittstelle.

**Non-Goals:** Zielwerte nach Norm, Luftabsorption, Strahlverfolgung, Bindungen für WASM und Elixir.

## Decisions

### Kommandozeile

`cargo run -q --release -p cee-acoustics --bin cee-acoustics -- rt` liest JSON von stdin:

```json
{
  "volume_m3": 60.0,
  "surfaces": [{"area_m2": 20.0, "alpha": {"125": 0.1, "250": 0.1, "500": 0.1, "1000": 0.1, "2000": 0.1, "4000": 0.1}}],
  "objects": [{"absorption_area_m2": {"125": 0.5, "250": 1.0, "500": 1.5, "1000": 1.8, "2000": 1.8, "4000": 1.7}}]
}
```

`objects` ist optional. Antwort auf stdout, Exit-Code 0:

```json
{"sabine_s": {"125": 0.0, "…": 0.0}, "eyring_s": {"125": 0.0, "…": 0.0}, "assumptions": ["Diffusfeld", "ohne Luftabsorption"]}
```

Fehler: Exit-Code 2 und auf stdout `{"error": {"code": "<code>", "message": "…", "hint": "…"}}` mit den Codes
`volume_invalid` (V ≤ 0), `alpha_out_of_range` (α < 0 oder > 1), `band_missing` (nicht genau die sechs Bänder),
`no_absorption` (Nenner 0 in einem Band), `invalid_json`.

`cargo run -q --release -p cee-acoustics --bin cee-acoustics -- bench --surfaces 1000` gibt
`{"surfaces": 1000, "runs": <n>, "mean_us": <Zahl>}` aus.

### Budgets

| Messung | Budget |
| --- | --- |
| Abweichung zur Formel | ≤ 0,1 % |
| Mittelwert 1.000 Flächen, alle Bänder, beide Verfahren (release) | ≤ 1.000 µs |

## Risks / Trade-offs

- [Diffusfeld-Annahme gilt in stark gedämpften oder sehr ungleichmäßigen Räumen nur grob] → Annahmen in der
  Antwort ausweisen; geometrische Verfahren später als eigenes Analyse-Element
