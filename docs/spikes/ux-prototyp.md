# Testleitfaden UX-Prototyp (ap-41-ux-prototyp)

Leitfaden und Ergebnisvorlage für die Abnahme des UX-Prototyps mit Testpersonen. Grundlage:
`openspec/changes/ap-41-ux-prototyp/design.md`.

## Ziel

Prüfen, ob Menschen ohne CAD-Erfahrung die Grundabläufe (Bauen, Ändern, Verbinden, Entwürfe, KI-Vorschlag)
im Prototyp ohne Einweisung lösen. Das Ergebnis begründet Go oder No-Go für G1 und liefert Folgen für ap-08a
und ap-08b. Geprüft wird das Programm, nicht die Testperson.

## Rahmen

- Rechner mit Maus; Chromium, Firefox oder Safari; Fenster mindestens 1440 × 900 px.
- Start des Prototyps: `npm --prefix spikes/ux-prototyp run build`, danach
  `npm --prefix spikes/ux-prototyp run preview` und die ausgegebene Adresse öffnen.
- Startadressen je Aufgabe: `<Adresse>/?zustand=<name>` (siehe Aufgaben).
- Fünf Testpersonen (TP1 bis TP5). Ein Pilotlauf des Kernteams wird als solcher gekennzeichnet.

## Ablauf

1. Begrüßung: „Wir prüfen das Programm, nicht Sie.“ Lautes Denken ist erwünscht.
2. Die Leitung liest nur den Aufgabentext vor und hilft nicht.
3. Bittet die Testperson um Hilfe, gilt die Aufgabe als nicht ohne Einweisung gelöst; die Leitung darf dann
   helfen, damit die nächste Aufgabe startet.
4. Vor Aufgabe F sagt die Leitung nicht, dass die KI simuliert ist; danach schon.

## Aufgaben

### Aufgabe A

„Bau eine Grundplatte für ein kleines Gehäuse: 80 mm lang, 50 mm breit und 5 mm dick.“

- Start: `?zustand=leer`
- Soll: wie Ablauf A (Platte 80 × 50 × 5 mm)
- Zeit: 5 min

### Aufgabe B

„Die Platte soll 8 mm dick werden, und ihre vier Ecken sollen mit 3 mm Radius rund sein.“

- Start: `?zustand=platte`
- Soll: wie Ablauf B (Tiefe 8 mm, Verrundung 3 mm)
- Zeit: 4 min

### Aufgabe C

„Setz den Deckel auf das Gehäuse, sodass beide fest zusammengehören.“

- Start: `?zustand=teile`
- Soll: wie Ablauf C (Verbindung angelegt)
- Zeit: 5 min

### Aufgabe D

„Probier aus, wie die Platte mit 10 mm Dicke aussieht, ohne den bisherigen Stand zu verändern. Gefällt es dir,
soll es der neue Stand werden.“

- Start: `?zustand=platte`
- Soll: Hauptstand Tiefe 10 mm, Entwurf übernommen
- Zeit: 5 min

### Aufgabe E

„Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“

- Start: `?zustand=platte`
- Soll: richtige Antwort (Kürzel laut Anzeige im Programm)
- Zeit: 2 min

### Aufgabe F

„Lass dir vom Programm helfen: Aus der Platte soll ein nach oben offenes Kästchen mit 2 mm Wand werden. Schau
dir das Ergebnis an, bevor es gilt, und mach die Wand danach 3 mm dick.“

- Start: `?zustand=platte`
- Soll: Vorschlag übernommen, offenes Kästchen mit Wandstärke 3 mm
- Zeit: 4 min

## Erfolgskriterium

Je Aufgabe: Sollzustand erreicht, innerhalb der Zeit, ohne Hilfe. Die Leitung prüft den Sollzustand an den
Werten im Eigenschaften-Panel.

Gate (Abnahme ap-41): mindestens 4 von 5 Testpersonen lösen A, B und C. D bis F werden berichtet (gelöst,
Zeit, bei F: Vorschlag übernommen ja/nein), zählen aber nicht.

## Ergebnisbogen

Je Testperson eine Zeile; „Gelöst“ je Aufgabe mit ja/nein, Zeit in min, Hilfe ja/nein.

| Kürzel | CAD-Erfahrung | 3D-Druck-Erfahrung | A | B | C | D | E | F | Zeit in min | Hilfe | Beobachtungen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TP1 |  |  |  |  |  |  |  |  |  |  |  |
| TP2 |  |  |  |  |  |  |  |  |  |  |  |
| TP3 |  |  |  |  |  |  |  |  |  |  |  |
| TP4 |  |  |  |  |  |  |  |  |  |  |  |
| TP5 |  |  |  |  |  |  |  |  |  |  |  |

Bei F zusätzlich: Vorschlag übernommen ja/nein.

## Nachbefragung

- Was war schwer?
- Was hat gefehlt?
- Würden Sie die Vorschläge der KI nutzen?

## Auswertung

- Go oder No-Go für G1 mit Begründung (Zählweise siehe Erfolgskriterium).
- Je Befund aus den Tests eine Folge für ap-08a oder ap-08b oder ein Eintrag in `docs/ideen/`.
- Der Pilotlauf des Kernteams wird als solcher gekennzeichnet.

## Datenschutz

Nach ADR-056: keine Namen, kein Alter, keine Bildschirm- oder Tonaufnahmen ohne ausdrückliche Einwilligung. Im
Repository liegt nur der pseudonyme Ergebnisbogen.
