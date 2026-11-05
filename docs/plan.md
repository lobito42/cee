# Plan – kurze Runden (ADR-067, ADR-068)

Ziel über allem: **Teil beschreiben → KI baut ein wirklich parametrisches Teil → ansehen → Größen ändern →
drucken.** Den CAD-Kern liefert SolidCraft (ADR-068); CEE liefert Prüfen, Absicht und Zusammenarbeit. Jede Runde
endet mit etwas, das der Mensch ausprobiert. Fertige Runden wandern nach unten unter „Erledigt“.

## Runde 1 – CEE-Prüfer für SolidCraft-Teile

Was du danach ausprobieren kannst: Ein Teil (z. B. den Winkelhalter) prüfen lassen und einen Bericht mit Bildern
lesen: Welche Zahlen stehen fest, obwohl sie Größen sein sollten? Hält das Teil jede Größe über ihren Bereich, und
wo genau kippt es (z. B. „Bohrung schneidet den Steg ab Dicke 3 mm“)?

- Teil lesen (`.sc` oder Befehlsliste), Größen mit Rollen und Bereichen aus dem Kommentar.
- Feste Zahlen in Skizzen und Schritten finden.
- Jede Größe an Rändern und dazwischen durchprobieren (SolidCraft „Werte durchprobieren“), Fehler, offene Körper
  und Gestaltänderungen (andere Zahl an Flächen, Bohrungen, Körpern) melden, mit Bild des Grenzfalls.
- Bericht als Seite zum Ansehen.

## Runde 2 – Die KI schlägt eine Änderung vor

„Bohrungen für M5 und die Platte 2 mm dicker“: Die KI arbeitet an einer Kopie über die SolidCraft-Schnittstelle,
du siehst vorher/nachher, die geänderten Größen und das Prüferergebnis, dann Übernehmen oder Verwerfen.

## Runde 3 – Die KI baut ein neues Teil aus einer Beschreibung

„Halter für ein 25-mm-Rohr, zwei M5-Schrauben, 3 mm Wand, druckbar.“ Gemessen an fünf festen Aufgaben: läuft,
druckbar, jede genannte Größe ist eine benannte Größe mit Bereich, und der Prüfer findet nichts.

## Danach (Reihenfolge offen)

Mehrere Teile zu einer Baugruppe, Skizzen mit Bedingungen, Materialien, Zusammenarbeit, Knoten-Ansicht.

## Ruht (ADR-067, ADR-068)

Eigener Geometrie-Worker (build123d), eigene CAD-Oberfläche, Element-Graph im Rust-Kern, Synchronisierung, Server, Bindungen, Fachpakete, Akustik, die offenen Changes in
`openspec/queue.yaml`. Nichts davon ist gelöscht.

## Erledigt

– noch nichts –
