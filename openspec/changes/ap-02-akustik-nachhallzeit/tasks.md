## 1. Kern

- [ ] 1.1 Crate `crates/acoustics` mit Typen für Band, Fläche, Objekt, Ergebnis, Fehler – Prüfung: `cargo test -q -p cee-acoustics`
- [ ] 1.2 Sabine und Eyring je Band nach design.md, Property-Tests (z. B. mehr Absorption ⇒ kürzere Nachhallzeit) – Prüfung: AK-1, AK-2
- [ ] 1.3 Eingabeprüfung mit strukturierten Fehlern – Prüfung: AK-3

## 2. Schnittstelle

- [ ] 2.1 Kommandozeile `cee-acoustics rt` (JSON) – Prüfung: AK-1 bis AK-4
- [ ] 2.2 `cee-acoustics bench` – Prüfung: AK-5

## 3. Integration

- [ ] 3.1 Alle Abnahmetests grün – Prüfung: `uv run pytest -q tests/acceptance/ap-02-akustik-nachhallzeit`

## Workflow follow-up

- Spec nach `openspec/specs/raumakustik/` übernehmen und Change archivieren (Kernteam)
