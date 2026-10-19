# ADR-057: Einheiten und Größen

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Ergänzt: 2026-10-19 (Nachtrag: UCUM-Codes, Standard-Einheit je Parameter)

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

## Nachtrag 2026-10-19: Einheitentabelle und Standard-Einheit

Einheiten kommen aus vielen Quellen (Oberfläche, Import, KI über MCP, Skripte, Fachpakete, Textprojektion). Die
Oberfläche bietet Einheiten als Auswahl an; prüfen und umrechnen muss trotzdem der Kern, weil alle anderen Wege
keine Auswahlliste haben.

5. **Codes nach UCUM:** Einheiten werden nach dem Unified Code for Units of Measure geschrieben (`mm`, `deg`,
   `kg`, `[in_i]`, `kg{CO2e}`). Dimensionen sind Exponenten der SI-Grundgrößen; Winkel und CO₂-Äquivalent
   sind eigene Achsen. Abgeleitete Größen speichern im Produkt der kanonischen Einheiten (Druck N/mm² = MPa).
6. **Eine Einheitentabelle im Kern:** Codes, Dimensionen und exakte Faktoren nach NIST SP 811; Oberfläche,
   Import und Fachpakete nutzen dieselbe Tabelle. Neue Einheiten nur per Change.
7. **Standard-Einheit je Parameter:** Typdefinitionen der Fachpakete legen je Parameter Dimension und
   Standard-Einheit fest. Eine Zahl ohne Einheit bekommt die Standard-Einheit und eine Warnung; ohne
   Typdefinition bleibt sie unverändert mit Warnung. Eine Einheit mit falscher Dimension wird abgelehnt. Der
   Kern rät keine Dimension.

## Konsequenzen

Ergänzt ADR-028, ADR-044 und ADR-046. Festgelegt im Schema von ap-05a (Einheitentabelle, Typdefinitionen,
Regeln); die Auswahl in der Oberfläche kommt mit ap-08a. Temperatur zunächst nur in K.
