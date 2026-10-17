# ADR-043: Komponenten, Instanzen und Bibliotheken

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Wiederverwendbare, konfigurierbare Vorlagen wie in Figma: Der Absorber-Katalog der Firma, Möbel und ganze
Raumvorlagen sollen einmal gepflegt und vielfach genutzt werden, mit kontrollierten Aktualisierungen.

## Entscheidung

- Eine **Komponente** ist ein Element vom Typ `component` mit Untergraph (`content`), freigegebenen
  Parametern (`params.parameters`: Name → Typ, Standardwert, Grenzen) und benannten **Varianten**
  (`params.variants`: Name → Parametersatz). Ausgang `definition`.
- Eine **Instanz** ist ein Element vom Typ `instance` mit Eingang `definition` = `<komponenten-id>.definition`
  und `params` = `variant` plus `overrides` (nur die Abweichungen). Die Instanz speichert keine Kopie des
  Untergraphen; der Kern leitet ihn aus der Definition ab.
- Ändert sich die Definition, übernehmen alle Instanzen die Änderung; Überschreibungen bleiben erhalten,
  solange der Parameter existiert. Entfällt ein Parameter, wird die Überschreibung als Befund gemeldet,
  nicht still verworfen.
- Komponenten sind verschachtelbar (Raumvorlage enthält Absorber-Instanzen); Zyklen sind verboten.
- **Bibliotheken** sind Projekte mit veröffentlichten Komponenten (ADR-015), semantisch versioniert
  (ADR-017). Instanzen aus Bibliotheken verweisen auf eine Version; neue Versionen werden mit Vorschau der
  Wirkung (Geometrie, Nachhallzeit, Kosten) angeboten und erst nach Zustimmung übernommen.
- **Lösen** macht aus einer Instanz einen eigenständigen Untergraphen.
- Komponenten liefern berechnete Ausgänge (z. B. äquivalente Absorptionsfläche je Band, Gewicht, Preis, CO₂).

## Alternativen

Kopieren statt Instanzen; Vorlagen nur als Python-Skripte.

## Konsequenzen

Der Absorber-Katalog ist eine Komponentenbibliothek mit Varianten. Der Datenmodell-Spike (ap-01) misst die
Weitergabe einer Definitionsänderung an 1.000 Instanzen. Ergänzt ADR-015, ADR-017 und ADR-028.
