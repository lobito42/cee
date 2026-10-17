# ADR-046: Fachneutraler Kern und Muster aus Onshape

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Der erste Anwendungsfall (ADR-038) sind Räume mit Schallabsorbern. CEE ist aber eine Plattform für
Produktdefinition allgemein: Bauteile, Baugruppen, Zeichnungen, Varianten und Freigaben für Maschinenbau,
Geräte, Möbel oder Räume. Ohne klare Grenze wächst der Kern in Richtung Raumplaner. Onshape zeigt, wie ein
kollaboratives CAD ohne Dateien seine eigenen Funktionen auf dieselben Mittel stellt, die auch Nutzer haben.

## Entscheidung

1. **Fachneutraler Kern:** Der Kern (`crates/graph`, Server, Client-Grundgerüst) kennt nur fachneutrale
   Begriffe: Element, Untergraph, Komponente, Instanz, Verbindungspunkt, Variable, Material, Analyse,
   Publikation, Item, Revision und Freigabe. Fachbegriffe wie Wand, Absorber oder Nachhallzeit leben in
   **Fachpaketen** (z. B. `raum`, `akustik`, später `mechanik`, `blech`, `druck`). Das Schema zählt keine
   Fachtypen auf.
2. **Eingebaute Typen über dieselbe API wie Plugins** (nach FeatureScript): Fachpakete, auch die
   mitgelieferten, nutzen nur das Plugin-SDK (ADR-045). Was ein eingebautes Paket kann, kann jedes
   Community-Paket; jedes eingebaute Paket ist zugleich Vorlage.
3. **Verbindungspunkte (nach Mate Connectors):** Elementtyp `frame` – ein lokales Koordinatensystem, an
   Geometrie oder einem anderen Element verankert (ID-basiert, ADR-016). Instanzen werden über Verbindungspunkte
   platziert (Eingang `at` auf einen Verbindungspunkt, Parameter `frame` für den eigenen), mit Freiheitsgraden
   für Baugruppen. Dasselbe Mittel für Schraube an Platte wie für Deckensegel an Decke.
4. **Projektvariablen (nach Variable Studio):** Elementtyp `variables` mit benannten, typisierten Werten und
   Einheiten als Ausgänge; andere Elemente verweisen über `inputs` darauf. Bibliotheken können Variablensätze
   veröffentlichen.
5. **Verweise auf feste Versionen:** Verweise über Projektgrenzen zeigen immer auf eine Version bzw.
   Revision, nie auf den Arbeitsstand; neue Versionen werden angezeigt und mit Vorschau übernommen
   (bestätigt ADR-043 und ADR-018).

## Alternativen

Fachtypen fest im Kern (schneller für den ersten Anwendungsfall); eingebaute Typen über interne Abkürzungen;
Platzieren nur über absolute Koordinaten; Variablen nur innerhalb von Komponenten.

## Konsequenzen

Ändert ADR-038: Die Raum- und Akustiktypen bilden das erste Fachpaket, nicht den Kern. Der Spike ap-01 prüft
neben dem Raum ein zweites, fachfremdes Beispiel (Baugruppe mit Verbindungspunkten, Variablen und Item) gegen
dasselbe Schema. Weitere Anregungen aus Onshape liegen im Ideenspeicher (`docs/ideen/onshape-anregungen.md`).
