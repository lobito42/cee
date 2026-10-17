# ADR-039: Material als Element mit Eigenschaften

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Materialien sind der Kern des Angebots der Zielgruppe: Aussehen, akustische Wirkung, Gewicht, Brandverhalten, Kosten und Nachhaltigkeit müssen an einer Stelle gepflegt und überall gleich genutzt werden.

## Entscheidung

Ein Material ist ein Element (`material`) mit Eigenschaftsgruppen: Aussehen (PBR nach glTF 2.0, optional MaterialX), Akustik (Absorptionsgrad α je Oktavband 125, 250, 500, 1000, 2000, 4000 Hz; daraus αw und Absorberklasse nach EN ISO 11654), Physik (Dichte, Wärmeleitfähigkeit), Brandverhalten (Klasse nach EN 13501-1), Kosten (Preis je Einheit, Einheit), Nachhaltigkeit (GWP in kg CO₂-Äq. je Einheit, Quelle, z. B. EPD). Jeder Wert trägt Einheit und Quelle. Elemente verweisen über einen Eingang `material` auf Materialien; Schichtaufbauten (Wand, Absorber) sind Listen von Material-Referenzen mit Dicke. Materialbibliotheken sind Untergraphen und lassen sich zwischen Projekten teilen.

## Alternativen

Material als Attribut jedes Bauteils; getrennte Datenbanken für Aussehen und Technik.

## Konsequenzen

Mengen, Kosten, Gewicht und CO₂ ergeben sich aus Geometrie und Material, ohne Zusatzpflege. Herstellerdaten der Firma werden als eigene Bibliothek importiert.
