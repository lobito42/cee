# ADR-057: Einheiten und Größen

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Bisher sind Einheiten nur nebenbei geregelt (ADR-044, ADR-046, Akustik-Regeln). Fehler durch Einheiten sind
in der Produktentwicklung teuer; Fachpakete aus verschiedenen Branchen nutzen verschiedene Gewohnheiten.

## Entscheidung

1. **Jeder Zahlenwert hat eine Größe:** Parameter, Ausgänge und Variablen tragen eine Dimension (Länge, Fläche,
   Volumen, Winkel, Masse, Zeit, Frequenz, Kraft, Geld, CO₂-Äquivalent, dimensionslos). Der Kern prüft
   Dimensionen in Ausdrücken und lehnt z. B. „Länge + Masse“ ab.
2. **Kanonische Speicherung:** Länge in mm, Winkel in rad, Masse in kg, Zeit in s, Frequenz in Hz, CO₂ in
   kg CO₂e. Geld als Dezimalzahl mit Währung, nie als Gleitkommazahl; keine Umrechnung von Währungen ohne
   Kurs mit Quelle und Datum.
3. **Ein- und Ausgabe:** Eingaben mit Einheit und einfachen Formeln („1,2 m“, „1200“, „3 × 400 mm“); ohne
   Einheit gilt die Anzeigeeinheit des Felds. Anzeige je Projekt bzw. Person (metrisch oder zöllig); gerundet
   wird nur in der Anzeige.
4. **Grenzen sind explizit:** Fachpakete rechnen intern in ihren Einheiten (z. B. Akustik in m), wandeln aber
   nur an ihrer Schnittstelle und benennen Einheiten in Namen oder Typen.

## Alternativen

Einheitenlose Zahlen mit Konvention; alles in SI-Basiseinheiten (m) speichern.

## Konsequenzen

Ergänzt ADR-028, ADR-044 und ADR-046. Festgelegt im Schema von ap-05; der Spike ap-01 prüft Einheiten bisher
nur an Projektvariablen.
