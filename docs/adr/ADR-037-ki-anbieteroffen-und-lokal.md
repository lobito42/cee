# ADR-037: KI anbieteroffen und lokal

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Zielgruppe sind Einzelpersonen und kleine Projektgruppen, privat oder in kleinen Firmen. Konstruktionsdaten
sind oft vertraulich, Budgets klein. Lokale Modelle, selbst gehostete Daten und selbst gehostete Modelle sind
von Anfang an Pflicht, nicht Ausbaustufe.

## Entscheidung

- Das Produkt ist an kein KI-Modell gebunden. Agenten greifen über den MCP-Endpunkt zu (ADR-007); jeder
  MCP-fähige Client funktioniert, auch mit lokalen Modellen.
- Der eingebaute Assistent spricht über eine Anbieter-Schnittstelle mit Modellen: OpenAI-kompatible API
  (Ollama, llama.cpp, vLLM, LM Studio), Anthropic und weitere als Plugin. Standard nach der Installation:
  kein Anbieter vorkonfiguriert, lokale Modelle werden automatisch erkannt.
- Schlüssel bringt der Nutzer selbst mit; CEE rechnet keine Tokens ab und hat keinen eigenen KI-Dienst.
- Daten verlassen den Rechner bzw. den eigenen Server nur an den ausdrücklich gewählten Anbieter, je Projekt
  einstellbar. Keine Telemetrie ohne Zustimmung.
- Werkzeuge für Modelle sind so gebaut, dass auch kleine lokale Modelle sie bedienen können: wenige,
  eindeutige Tools, kompakte Antworten, strukturierte Fehler, Beispiele in jeder Tool-Beschreibung.
- Die Eval-Suite misst jede Version mit mindestens einem Cloud-Modell und einem lokalen Modell.

## Alternativen

Feste Bindung an einen Anbieter; eigener gehosteter KI-Dienst mit Abrechnung.

## Konsequenzen

Lokale Modelle sind schwächer; Funktionen müssen auch mit ihnen nützlich sein und dürfen nicht nur mit
dem stärksten Modell funktionieren. Selbstbetrieb (Server, Speicher, Modelle) wird in Phase 1 vorgezogen.
