# Mitmachen bei CEE

Danke für dein Interesse! CEE soll eine offene Plattform für Produktdefinition werden – für kleine und mittlere
Unternehmen das, was Blender und OpenSCAD für ihre Communities sind.

## So läuft ein Beitrag

1. **Idee oder Fehler:** Issue anlegen (Vorlagen unter `.github/ISSUE_TEMPLATE/`). Größere Vorschläge kommen als
   OpenSpec-Change (`openspec/changes/<id>/`), das ist unser RFC-Verfahren.
2. **Architektur:** Entscheidungen stehen in `docs/adr/`, Begriffe in `docs/glossar.md`. Widerspricht dein
   Vorschlag einem ADR, sag es offen; das Kernteam entscheidet.
3. **Umsetzen:** Branches folgen den Regeln in `AGENTS.md` (gilt für Menschen wie Agenten). Abnahmetests sind der
   Vertrag; sie werden nie abgeschwächt.
4. **Pull Request:** mit dem Abschnitt „In einfachen Worten“ aus der PR-Vorlage. Die CI muss grün sein.

## Developer Certificate of Origin

Jeder Commit braucht eine Zeile `Signed-off-by: Name <E-Mail>` (`git commit -s`). Damit bestätigst du das
[Developer Certificate of Origin](https://developercertificate.org/): Du darfst den Beitrag unter der Lizenz des
jeweiligen Teils einbringen (Kern MPL-2.0, `sdk/` und `format/` Apache-2.0, siehe ADR-034). Die CI prüft das.

## Verhalten

Wir gehen freundlich und sachlich miteinander um. Kritik gilt Entwürfen, nicht Menschen.
