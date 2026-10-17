# Idee: 3D-gedruckte, auf den Raum optimierte Schallabsorber

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Bezug: ADR-038, ADR-039, ADR-041, ap-31, ap-32

## Kurz

CEE kennt den Raum, seine Materialien und seine Nachhallzeit je Oktavband. Daraus lässt sich ablesen, in
welchen Bändern der Raum zu lange nachhallt – typisch 125–250 Hz, wo poröse Absorber (Schaum, Mineralwolle)
schwach sind. Für genau diese Bänder legt CEE Resonator-Absorber aus, zeigt ihre Wirkung sofort in der
Nachhallzeit und exportiert sie druckfertig. Das wäre ein Alleinstellungsmerkmal: Analyse, Auslegung,
Wirkung und Fertigung in einem Modell.

## Nutzen für die Firma

- Tiefe Frequenzen gezielt behandeln, ohne dicke Aufbauten
- Formen, die sich in Architektur und Corporate Design einfügen (Sonderanfertigungen)
- Kleine Serien und Einzelstücke ohne Werkzeugkosten
- Argument im Angebot: „Absorber für genau diesen Raum berechnet“

## Absorbertypen, die sich drucken lassen

| Typ | Prinzip | Wirksam | Druckverfahren | Bemerkung |
| --- | --- | --- | --- | --- |
| Helmholtz-Resonator | Hohlraum mit Hals; Luft im Hals schwingt gegen das Luftpolster | schmalbandig, gut abstimmbar, 80–500 Hz | FDM (PLA, PETG), SLS | Arrays mit gestaffelten Frequenzen ergeben breitere Wirkung |
| Viertelwellen-/Rohrresonator | Kanal, an einem Ende geschlossen; gefaltet als Labyrinth | tiefe Frequenzen bei kleiner Bautiefe | SLS, FDM | Pulverreste in engen Kanälen bei SLS beachten |
| Mikroperforierte Platte (MPP) | Löcher < 1 mm vor einem Luftraum, Reibung in den Löchern | breitbandig, faserfrei | DLP/SLA | Lochdurchmesser nahe an der Druckgrenze |
| Poröse Gitterstruktur | definierte Poren (z. B. Gyroid) statt Faservlies | mittlere und hohe Frequenzen | SLS, DLP | Porengröße bestimmt die Wirkung; Modell aufwendiger |
| Biobasiertes Formteil | z. B. Pilzmyzel in gedruckter Form | wie konventionelle poröse Absorber | Formgebung per Druck | nachhaltig; Brandverhalten offen |

## Auslegung (Näherungen für den Entwurf)

- **Helmholtz-Resonator:** f₀ = c / (2π) · √(A / (V · L_eff)) mit c = 343 m/s, Halsquerschnitt A, Hohlraumvolumen
  V und effektiver Halslänge L_eff = L + Mündungskorrektur (näherungsweise L + 1,7 · r für einen runden Hals mit
  Radius r, je nach Einbau). Die Güte (Bandbreite) hängt von Halsgeometrie und Dämpfung ab; Dämpfungsmaterial im
  Hohlraum verbreitert die Wirkung und senkt das Maximum.
- **Viertelwellen-Rohr:** f₀ ≈ c / (4 · L_eff), L_eff = Rohrlänge plus Mündungskorrektur.
- **Mikroperforierte Platte:** Modell nach Maa (Lochdurchmesser, Plattendicke, Perforationsgrad, Wandabstand).
- **Wirkung im Raum:** Ein Absorber geht als äquivalente Absorptionsfläche je Band in die Nachhallzeit ein
  (ADR-041). Für Resonator-Arrays zunächst aus Modell, später aus Messung des Firmenmusters.

Alle Formeln sind Näherungen für den Entwurf; verbindlich ist die Messung (siehe Validierung).

## Ablauf in CEE

1. **Defizit erkennen:** Das Analyse-Element Nachhallzeit vergleicht mit dem Zielband und liefert je Band, wie
   viel äquivalente Absorptionsfläche fehlt.
2. **Auslegen:** Ein Generator-Element (Knoten im Knoten-Editor) erzeugt aus Defizit, verfügbarer Fläche,
   Bautiefe und Druckverfahren ein Resonator-Array: Frequenzen staffeln, Hals- und Hohlraummaße berechnen,
   Mindestwandstärken des Verfahrens einhalten.
3. **Wirkung sehen:** Die neuen `absorber`-Elemente fließen sofort in die Nachhallzeit ein; vorher/nachher je Band.
4. **Gestalten:** Außenform, Raster und Farbe frei; Material mit Aussehen, Brandklasse, Kosten und CO₂ (ADR-039).
5. **Fertigen:** Prüfung auf Druckbarkeit (Überhänge, Wandstärken, Bauraum, Pulverabfuhr), Aufteilen in
   druckbare Segmente, Export als 3MF bzw. STL; Druckzeit und Materialverbrauch als Kennzahl.

Im Datenmodell sind das keine Sonderfälle: Resonator, Generator und Analyse sind Elemente wie alle anderen.

## Voraussetzungen in der Roadmap

| Benötigt | Paket |
| --- | --- |
| Nachhallzeit je Band, Zielband | ap-02, ap-11, ap-20 |
| Skizze und Extrusion, stabile Flächen-IDs | ap-12 |
| Absorber-Katalog mit Varianten | ap-13 |
| Knoten-Editor für den Generator | ap-23 |
| Druckbarkeit, 3MF-Export | ap-31 (Fertigung) |
| Gitter und implizite Geometrie für poröse Strukturen | ap-32 (zweiter Kernel) |

Helmholtz- und Rohrresonatoren gehen mit dem OCCT-Kernel; Gitterstrukturen brauchen ap-32.

## Validierung

- **Impedanzrohr** (ISO 10534-2): kleine Proben, Absorptionsgrad bei senkrechtem Schalleinfall; schnell und
  günstig für den Abgleich Modell ↔ Druck.
- **Hallraum** (ISO 354): realistische Wirkung im Diffusfeld, braucht etwa 10–12 m² Probe; für Produkte.
- Abgleich mit Messungen der Firma in drei Referenzräumen (siehe offene Punkte im Konzept).

## Grenzen und Risiken

- **Brandschutz:** Gedruckte Kunststoffe erreichen meist nicht die geforderten Klassen nach EN 13501-1;
  flammhemmende Werkstoffe einzeln prüfen. Für öffentliche Räume das größte Hindernis.
- **Zeit und Kosten:** Ein Quadratmeter dauert im FDM-Druck viele Stunden; SLS ist teuer. Wirtschaftlich eher
  für Sonderformen, tiefe Frequenzen und kleine Serien.
- **Toleranzen:** Schrumpf und Maßabweichungen verschieben die Resonanzfrequenz; Messwerte liegen oft unter
  der Theorie.
- **Hybride sind oft besser:** gedruckte, abgestimmte Fronten kombiniert mit klassischem porösem Material.

## Vorschlag für einen ersten Schritt (wenn die Idee freigegeben wird)

Spike „Resonator 125 Hz“: einen Helmholtz-Resonator bzw. ein kleines Array für 125 Hz auslegen, in PLA/PETG
drucken, im Impedanzrohr messen und Abweichung von Frequenz und Absorptionsgrad zur Berechnung dokumentieren.
Go, wenn die Resonanzfrequenz innerhalb ± 10 % liegt. Voraussetzung: Zugang zu einem Impedanzrohr.

## Offene Fragen

- Hat die Firma Zugang zu Impedanzrohr oder Hallraum?
- Welche Brandschutzklasse brauchen die typischen Kundenräume?
- Welche Drucker und Werkstoffe stehen zur Verfügung (FDM, SLS, DLP)?
- Soll CEE Druckdaten liefern oder mit einem Druckdienstleister zusammenarbeiten?

## Quellen

- TU Delft: 3D-gedruckte Rohrresonator-Absorber (SLS, PA12), 240–315 Hz, Messung im Hallraum –
  https://research.tudelft.nl/files/154501941/s44150_023_00086_9.pdf
- Engineering Helmholtz resonators for directional low-frequency sound attenuation –
  https://sonicfield.org/library/engineering-helmholtz-resonators-for-directional-low-frequency-sound-attenuation
- Modified Helmholtz resonator based tunable acoustic metamaterial –
  https://research.nottingham.edu.cn/en/publications/modified-helmholtz-resonator-based-tunable-acoustic-metamaterial-/
- Micro-Perforated Panel absorbers via DLP 3D printing (Applied Acoustics 2024) –
  https://observatorio-cientifico.ua.es/documentos/657f1b2f3ea324404509cdf4?lang=en
- 3D printed thick micro-perforated panel with graded perforation – https://idr.nitk.ac.in/handle/123456789/21270
- Acoustic modeling of 3D-printed fibrous sound absorbers – https://digitalcommons.mtu.edu/michigantech-p2/1277
- Fraunhofer UMSICHT, Schallabsorber auf Pilzbasis aus dem 3D-Drucker –
  https://www.baunetzwissen.de/akustik/tipps/news-produkte/schallschutz-auf-pilzbasis-aus-dem-3d-drucker-7343355
