# ADR-058: Adressen auf ID-Basis

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

ADR-018 adressiert über `#<name>`; ein Umbenennen bricht damit Verweise. ADR-052 verlangt Links, die
Umbenennen und Verschieben überstehen.

## Entscheidung

1. **Form:** `cee://<server>/<organisation>/<projekt>/<element-id>[@<meilenstein|revision>]`. Die Element-ID
   ist führend; Namen sind Aliase (`…/~<name>`), die der Server auflöst und bei Mehrdeutigkeit eine Auswahl
   zeigt.
2. **Stabil:** Umbenennen ändert die Adresse nicht. Beim Verschieben zwischen Projekten bleibt die ID, und die
   alte Adresse leitet weiter.
3. **Ohne Versionsangabe** zeigt eine Adresse auf den aktuellen Hauptstand; Verweise über Projektgrenzen
   speichern immer eine Version bzw. Revision (ADR-046).
4. **Querverweise** bleiben nur auf veröffentlichte Elemente erlaubt (ADR-015).

## Alternativen

Namensbasierte Adressen; Adressen mit Pfad.

## Konsequenzen

Ersetzt die Adressform von ADR-018. Web-Links der App sind die Browser-Entsprechung derselben Adresse
(`https://<server>/e/<element-id>[@<meilenstein|revision>]`).
