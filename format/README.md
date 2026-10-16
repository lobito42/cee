# format

Offene Spezifikation des Datenformats. Lizenz: **Apache-2.0** (siehe `LICENSE`), damit jeder es lesen
und schreiben darf (ADR-034).

- `schema/` – Elementschema mit Versionsnummer (ADR-028)
- `text/` – Textprojektion für Git, Review und KI (ADR-028, ADR-033)
- `kernel/` – Nachrichten zwischen Kern und Geometrie-Worker (ADR-032)

Entsteht in `ap-01-spike-datenmodell`. Änderungen am Schema nur per OpenSpec-Change mit Migration.
