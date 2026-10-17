# ADR-053: Lernschleife für lokale Modelle

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Lokale Modelle sollen CEE gut bedienen (ADR-037). CEE-Aufgaben lassen sich objektiv prüfen: Graph gültig,
Geometrie baut, Regeln bestehen, Zielwerte erreicht. Damit kann ein Modell aus geprüften Versuchen lernen,
lokal und ohne Daten an Dritte.

## Entscheidung

1. **Bewertung nur durch Prüfer, nie durch das Modell selbst:** Kern, Worker, Regeln und Analysen bewerten.
   Ein Sprachmodell als Gutachter ist nur für weiche Kriterien zulässig und nie allein entscheidend.
2. **Aufgabengenerator:** Aufgaben entstehen aus Vorlagen mit zufälligen Parametern und Schwierigkeitsstufen;
   jedes Fachpaket bringt eigene Aufgaben und Prüfer mit. Er ist zugleich Grundlage der Eval-Suite (ADR-014).
3. **Stufen:** (1) Aufgaben und Prüfer; (2) Erfahrungsspeicher – geprüfte Lösungswege als Beispiele für neue
   Aufgaben, ohne Training; (3) Lernen aus Erfolgen – mehrere Versuche je Aufgabe, nur geprüfte Erfolge werden
   Trainingsdaten für einen LoRA-Adapter; (4) bestärkendes Lernen erst später (Ideenspeicher).
4. **Schutz gegen Schummeln:** geheime Prüfaufgaben, nie im Training; ein Adapter wird nur übernommen, wenn er
   dort besser und in keiner Kategorie schlechter ist, auch nicht bei Sicherheitsregeln; mehrere unabhängige
   Prüfer; Stichproben durch Menschen.
5. **Daten und Offenheit:** Training lokal oder auf eigenem Server; Projektdaten nur mit ausdrücklicher
   Zustimmung je Organisation. Aufgabensätze, Prüfer und Adapter können offen geteilt werden; Lizenzen der
   Basismodelle werden beachtet. Werkzeuge nur mit erlaubten Lizenzen (ADR-034).

## Alternativen

Kein Training, nur Prompts; Selbstbewertung durch das Modell; Training nur beim Cloud-Anbieter.

## Konsequenzen

Ergänzt ADR-014 und ADR-037. Stufe 1 gehört zu ap-15, Stufen 2 und 3 zu ap-38 nach der Beta. Entwicklungs-
Agenten werden nicht trainiert; ihre Erfahrungen fließen in Skills, Regeln und `AGENTS.md`.
