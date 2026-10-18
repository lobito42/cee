# UI-Entwurf (2026-10-18)

Erster Eindruck der Oberfläche nach ADR-060 und ADR-061 – kein Vertrag, sondern Anschauung für ap-41
(UX-Prototyp) und ap-08b. Inhalte (Firma, Preise, Messwerte) sind Platzhalter; die 3D-Ansicht ist eine Skizze.

- Live und kommentierbar: Design-Canvas in Claude, https://claude.ai/artifact/QrRiW9HhtAp1fgvzym17jR
  (privat; zum Teilen im Canvas über „Share“ freigeben). Jede Ansicht hat den Tweak „dunkel“.
- Hier im Repo: die Quelltexte der Artboards (`*.dc.html`, Format des Design-Canvas; sie brauchen dessen
  Laufzeit `support.js` und öffnen nicht direkt im Browser) und `canvas.json`.

| Datei | Zeigt |
| --- | --- |
| `Main.dc.html` | Layout Desktop, Arbeitsbereich Akustik: Kopfzeile, Struktur, 3D mit fünf Werkzeugen, Entscheidungskarte der KI, Eigenschaften mit Wertfeldern und Nachhallzeit gegen Zielband |
| `Suche.dc.html` | Die eine Suche (⌘K): Befehle, Elemente, Projekte, Facetten |
| `Uebernehmen.dc.html` | Entwurf übernehmen: Vorher/nachher-Vergleich, Konflikt und Bibliotheks-Update als Entscheidungskarten |
| `iPad.dc.html` | Layout Tablet beim Kunden: Vorher/Nachher, Kennzahlen, Freigeben |

Farben und Schrift entsprechen `docs/design/tokens.json`; verbindlich sind die Tokens, nicht diese Dateien.
Änderungen am Entwurf im Canvas machen und die Dateien hier danach ersetzen.
