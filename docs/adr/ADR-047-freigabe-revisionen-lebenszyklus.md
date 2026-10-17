# ADR-047: Freigabeprozess, Revisionen und Lebenszyklus

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Auch kleine Firmen brauchen reguläre Freigabeprozesse: eine Sachnummer je Teil, nachvollziehbare
Revisionen, Prüfung durch eine zweite Person, unveränderliche Freigabestände, Stücklisten und geregelte
Änderungen. Bisher gibt es Publikation (ADR-015), Manifest (ADR-017) und Zweige mit Änderungsanfragen
(ADR-033), aber keinen Lebenszyklus.

## Entscheidung

1. **Item:** Elementtyp `item` – das, was freigegeben, bestellt und gefertigt wird (Teil, Baugruppe,
   Zeichnung, Dokument, Raum, Angebot). Ein Item verweist auf seine Definition und trägt Sachnummer,
   Benennung, Revision und Status. Sachnummern vergibt ein austauschbarer Nummernkreis (intern oder extern,
   ADR-048).
2. **Revisionen und Versionen:** Jede Änderung ist in der Historie (Mikroversion). Benannte **Versionen**
   setzt man jederzeit. Eine **Revision** (Schema je Organisation, Standard A, B, C …; Vorabstände 01, 02 …)
   entsteht nur durch Freigabe.
3. **Lebenszyklus:** In Arbeit → In Prüfung → Freigegeben → Ersetzt bzw. Gesperrt. Übergänge sind Befehle
   (ADR-045) mit Rechten und Bedingungen (alle Regeln mit Schweregrad „Fehler“ bestanden, Pflichtfelder
   gesetzt, alle referenzierten Items freigegeben).
4. **Freigabe-Workflow:** je Organisation konfigurierbar. Solange eine Organisation höchstens zwei Personen
   mit Freigaberecht hat, ist Selbstfreigabe standardmäßig an; ab drei Personen gilt standardmäßig das
   Vier-Augen-Prinzip (Prüfer ≠ Ersteller). Eine Selbstfreigabe wird immer im Freigabestand vermerkt.
   KI-Agenten dürfen vorbereiten und prüfen, nie freigeben.
5. **Freigabestand:** unveränderlicher Schnappschuss des Untergraphen mit Inhalts-Hash, Manifest,
   aufgelöster Stückliste und den abgeleiteten Dokumenten (STEP, PDF-Zeichnung, Bericht). Diese Dokumente
   werden archiviert, weil eine Freigabe auch mit späteren Kernel-Versionen bitgenau gleich bleiben muss.
   Signiert mit Person, Zeit und Rolle.
6. **Stückliste (EBOM):** aus dem Graphen abgeleitet (Instanzen, Mengen, Items, Material), nie von Hand
   gepflegt; Mengen- und Strukturstückliste, Verwendungsnachweis („Wo verwendet?“).
7. **Änderungswesen:** Änderungsantrag (Problem, betroffene Items) und Änderungsauftrag (Zweig mit den
   Änderungen) bauen auf Zweigen und Änderungsanfragen auf. Der Auftrag zeigt den Vergleich (ADR-045), die
   Folgen für Verwender und erzeugt beim Abschluss die neuen Revisionen gemeinsam.

## Alternativen

Freigabe nur als Git-Tag; Revisionen von Hand; Freigabe-Workflow nur im externen PLM; Stücklisten als
eigene Tabelle.

## Konsequenzen

Ändert ADR-017 (Manifest ist Teil des Freigabestands, Versionierung im Server statt nur in Git) und ADR-032
(Exporte eines Freigabestands werden archiviert; das Modell selbst speichert weiter keine Geometrie).
Ergänzt ADR-015 („Freigegeben“ = Status eines Items). Arbeitspaket ap-33 vor der Beta.
