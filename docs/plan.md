# Plan – kurze Runden (ADR-067, ADR-068)

Ziel über allem: **Teil beschreiben → KI baut ein wirklich parametrisches Teil → ansehen → Größen ändern →
drucken – gemeinsam, mit KI-Vorschlägen und Freigabe.** Den CAD-Kern liefert unsere Kopie von SolidCraft (ADR-068);
CEE liefert Prüfen, Zusammenarbeit, Vorschläge, KI und PLM. Jede Runde
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

## Runde 2 – Eigene Kopie, die sich selbst abgleicht

Was du danach siehst: Unsere Kopie von SolidCraft (mit CEE-Namen) läuft im Browser und als App. Einmal pro Woche
holt sie die Neuerungen von SolidCraft automatisch herein; der Prüfer und die Tests entscheiden, ob es übernommen
wird. Ein Bericht sagt, was neu ist.

## Runde 3 – Zu zweit am selben Teil, Änderungen als Vorschlag

Was du ausprobierst: Zwei Fenster (oder zwei Personen) bearbeiten denselben Winkelhalter, mit Cursor und Namen.
Jede Änderung kann als Vorschlag gemacht werden: Vorher/Nachher, geänderte Größen, Prüferergebnis, dann Übernehmen
oder Verwerfen. Zusammenarbeit nach dem Vorbild von FigCraft (ADR-068).

## Runde 4 – Die KI als Teilnehmer

Die KI sitzt mit in der Sitzung und macht nur Vorschläge, zum Beispiel „Bohrungen für M5 und die Platte 2 mm
dicker“. Modell frei wählbar; lokal, sobald schnell genug.

## Runde 5 – Freigabe: der Anfang von PLM

Ein Stand wird freigegeben: Teilenummer, Revision A, unveränderlich, mit Prüfbericht und STEP/STL. Danach
Stückliste und Ereignisse für PLM/ERP.

## Danach (Reihenfolge offen)

PLM/ERP-Schnittstelle, KI baut neue Teile aus einer Beschreibung, langlebige Entwürfe, Fachpakete (Raum, Akustik).

## Ruht (ADR-067, ADR-068)

Eigener Geometrie-Worker (build123d), eigene CAD-Oberfläche, Element-Graph im Rust-Kern, Synchronisierung, Server, Bindungen, Fachpakete, Akustik, die offenen Changes in
`openspec/queue.yaml`. Nichts davon ist gelöscht.

## Erledigt

– noch nichts –
