# Plan – kurze Runden (ADR-067)

Ziel über allem: **Teil beschreiben → KI schreibt parametrischen Bauplan → 3D ansehen → Größen ändern → STL
drucken.** Jede Runde endet mit etwas, das der Mensch ausprobiert. Fertige Runden wandern nach unten unter
„Erledigt“, mit einem Satz zum Ergebnis.

## Runde 1 – Ein Teil als Bauplan, mit Reglern und STL (ohne KI)

Was du danach ausprobieren kannst: Den Winkelhalter öffnen, in 3D drehen, Breite, Dicke oder Bohrung per Regler
ändern, das Teil passt sich an, „Als STL herunterladen“ liefert eine druckbare Datei. Die Code-Ansicht zeigt den
Bauplan; eine Änderung dort wirkt sofort.

- Zuerst: Entwurf des einen Bildschirms nach `docs/design/prinzipien.md` (Größen-Tabelle, Schrittliste, 3D mit
  Ansichtswürfel, Code zum Aufklappen, STL). Gebaut wird erst nach dem Ja zum Bild.
- Format des Bauplans festziehen: `Params` mit Einheit, Standardwert und Bereich je Größe, `build(p)`, benannte
  Schritte. Vorlage: `parts/examples/halter.py`.
- Worker: Bauplan laden, mit Werten rechnen, Netz und STL liefern, Fehler verständlich melden (Zeile, Ursache).
- Oberfläche (auf Basis des bisherigen Prototyps): Größen-Liste mit Reglern links, 3D in der Mitte, Code-Ansicht
  zum Aufklappen, STL-Knopf.
- Prüfer: läuft, gültig und geschlossen, jede Größe am Rand ihres Bereichs baut noch.

## Runde 2 – Die KI ändert den Bauplan

„Mach die Wand 1 mm dicker“, „Bohrungen auf M6“, „noch eine Bohrung in die Mitte“: Die KI schlägt eine Änderung
vor, du siehst vorher/nachher in 3D und welche Größen sich ändern, dann Übernehmen oder Verwerfen.
Weiterverwendet wird der Unterbau aus der letzten KI-Stufe (Vorschlagskarte, Anbieter-Schnittstelle, lokale
Modelle).

## Runde 3 – Die KI baut ein neues Teil aus einer Beschreibung

„Halter für ein 25-mm-Rohr, zwei M5-Schrauben, 3 mm Wand, druckbar.“ Gemessen an einem festen Satz von fünf
Aufgaben mit Prüfern: läuft, gültig, druckbar, und jede genannte Größe ist eine benannte, änderbare Größe.

## Danach (Reihenfolge offen)

Mehrere Teile zu einer Baugruppe, Skizzen mit Bedingungen, Materialien, Zusammenarbeit, Knoten-Ansicht.

## Ruht (ADR-067)

Element-Graph im Rust-Kern, Synchronisierung, Server, Bindungen, Fachpakete, Akustik, die offenen Changes in
`openspec/queue.yaml`. Nichts davon ist gelöscht.

## Erledigt

– noch nichts –
