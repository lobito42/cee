# Regeln für Extension und Arbeitsfläche (TypeScript)

- Bedienkonzept nach Figma (ADR-022): keine Menüleisten, keine modalen Dialoge, kein Ribbon. Neue
  Funktionen kommen in die Befehlssuche (Strg/Cmd+K), ins Eigenschaften-Panel oder an die Auswahl.
- Die Werkzeugleiste hat genau fünf Werkzeuge (Auswählen, Messen, Schnitt, Skizze, Fragen). Ein sechstes
  nur per ADR.
- Farben, Schriften, Abstände ausschließlich über VS-Code-Theme-Variablen (`var(--vscode-…)`) und die
  Tokens in `src/design/tokens.ts`. Keine Hex-Werte im Komponentencode.
- Eine Akzentfarbe, und nur für Auswahl und KI-Vorschläge.
- Reaktionszeit: Auswahl und Hervorhebung < 100 ms; nichts blockiert den UI-Thread länger als 16 ms.
- Jede Modelländerung aus der UI erzeugt einen Code-Diff über den Geometrie-Dienst (LibCST, ADR-024);
  die UI schreibt nie selbst in `.py`-Dateien.
- KI-Änderungen erscheinen immer als Änderungskarte mit Vorschau, nie direkt (ADR-021).
- Jede sichtbare UI-Änderung braucht einen aktualisierten Referenz-Screenshot unter
  `tests/ui-reference/` – den legt der Test-Autor nach Freigabe durch UX an, nicht der Implementierer.
- Featurebaum ist eine native TreeView in der Primary Sidebar, nicht Teil der Webview.
