## Context

Siehe proposal.md – Why. Ausgangslage (Stand 2026-10-29):

- ap-50 (Umsetzung in Arbeit) liefert im Prototyp `spikes/ux-prototyp-2/` die lokale Brücke
  `bruecke/kernel.ts` (Vite-Plugin, nur `127.0.0.1`, Worker als eigener Prozess), die sechs Befehle
  `referenz.koordinatensystem`, `referenz.punkt`, `referenz.punkt-relativ`, `referenz.gerade`,
  `referenz.halbgerade`, `referenz.strecke` (bisher ohne Parameter, Wirkung per Klick und Auswahl), die
  Testzustände `drahtmodell-leer` und `drahtmodell-beispiel` und den Prüfbefehl `pruefen -- drahtmodell ablauf`.
- Der Chat im Prototyp (`src/ki.ts`) ist simuliert: Schlüsselwörter → ein `Vorschlag` (`titel`, `begruendung`,
  `werte`, `befehle`, `ziel`), Befehle `chat.senden`, `chat.uebernehmen`, `chat.verwerfen`; Ausführung über
  `app.ausfuehren(id, parameter, 'chat', 'ki')`; Geister-Vorschau `geisterKoerper()` für Wertänderungen.
- Befehle in `src/befehle.json` haben ein Feld `parameter` (`{name: {typ | dimension, einheit}}`); der Wert-Parser
  `src/wert/` versteht Eingaben mit Einheit wie im Eigenschaftenfeld.
- Regeln: `docs/rules/mcp.md` (Werkzeuge aus dem Register, Schema, kompakte Antworten, strukturierte Fehler,
  kleine Modelle), `docs/rules/client.md` (KI-Änderung nur als Entscheidungskarte), `docs/design/muster.md`
  (Entscheidungskarte, Chat unter den Eigenschaften).

## Goals / Non-Goals

**Goals:** Ein Satz im Chat wird über das Befehlsregister zu einem prüfbaren Änderungssatz mit Vorschau; der
Mensch übernimmt oder verwirft. Ohne Modell und ohne Netz reproduzierbar prüfbar (Satzerkennung), mit einem
echten Modell austauschbar (OpenAI-kompatibel). Ein fester Prüfsatz misst jeden Anbieter.

**Non-Goals:** siehe proposal.md – Nicht-Ziele.

## Decisions

### 1. Anbieter-Schnittstelle in der Brücke (Empfehlung, angenommen)

Ort: `spikes/ux-prototyp-2/bruecke/ki/` (TypeScript, läuft im Vite-Prozess wie `kernel.ts`, nur in
`vorschau.sh` und im Prüfmodus). Schnittstelle:

```ts
interface Anbieter {
  id: 'regel' | 'openai-kompatibel';
  schritt(nachrichten: Nachricht[], werkzeuge: Werkzeug[]): Promise<{ text?: string; aufrufe: Aufruf[] }>;
}
// Nachricht: {rolle: 'system'|'mensch'|'ki'|'werkzeug', text?, aufrufe?, aufruf_id?, ergebnis?}
// Aufruf: {id, werkzeug, argumente: object}
```

HTTP auf demselben Ursprung `127.0.0.1`: `GET /ki/anbieter` → `{aktiv, anbieter: [{id, verfuegbar, ziel,
befund?}]}`; `POST /ki/schritt` → `{anbieter, nachrichten, werkzeuge}` → `{text?, aufrufe}`; `POST /ki/anbieter`
→ `{id}` wählt den aktiven Anbieter für die laufende Vorschau.

**Ablauf (Schleife im Browser):** `chat.senden` baut die Nachrichten (feste Anweisung aus
`bruecke/ki/anweisung.md`, kompakte Modellübersicht, Satz) und ruft `/ki/schritt`. Jeder Aufruf wird im
**Entwurf** ausgeführt (Kopie des Graphen, der echte Graph bleibt unberührt), der Entwurf über die Brücke vom Worker
berechnet, das Ergebnis des Aufrufs als Nachricht `werkzeug` zurückgegeben. Die Schleife endet, wenn der Anbieter
keine Aufrufe mehr liefert, nach 20 Aufrufen oder nach dem Zeitlimit. Grund für die Schleife im Browser: Die
Wirkung der Befehle lebt im Prototyp (`wirkungen.ts`); die Brücke kennt nur Anbieter und Schlüssel, die nie in den
Browser gelangen.

**Satzerkennung (`regel`)**: deterministischer Parser (Abschnitt 4). Er arbeitet wie ein Modell über die
Nachrichten: Aus dem letzten Satz entsteht ein Plan; je Schritt liefert er den nächsten Aufruf und setzt dabei
Element-IDs aus den vorigen Werkzeugergebnissen ein. Kein Netz, kein Zufall, keine Zeit. Standard-Anbieter.

**OpenAI-kompatibel (`openai-kompatibel`)**: `POST <CEE_KI_URL>/chat/completions` mit `{model: CEE_KI_MODELL,
messages, tools: [{type: "function", function: {name, description, parameters}}], tool_choice: "auto",
temperature: 0}`; Antwort `choices[0].message.content` und `.tool_calls[].function.{name, arguments}`. Deckt
Ollama, llama.cpp, vLLM, LM Studio und Dienste mit dieser Schnittstelle ab. Eingerichtet nur über Umgebungsvariablen
beim Start von `vorschau.sh`:

| Variable | Bedeutung |
| --- | --- |
| `CEE_KI_URL` | Basisadresse, z. B. `http://127.0.0.1:11434/v1`; ohne sie ist der Anbieter nicht verfügbar |
| `CEE_KI_MODELL` | Modellname, Pflicht wenn `CEE_KI_URL` gesetzt |
| `CEE_KI_SCHLUESSEL` | optional, als `Authorization: Bearer …`; nie im Browser, nie in Ausgaben oder Protokollen |
| `CEE_KI_EXTERN=ja` | ausdrückliche Wahl, dass Daten den Rechner verlassen; Pflicht, wenn der Host von `CEE_KI_URL` nicht `127.0.0.1`, `::1` oder `localhost` ist, sonst Befund `extern_nicht_gewaehlt` und keine Verbindung |
| `CEE_KI_ZEITLIMIT_S` | nur im Prüfmodus: Zeitlimit überschreiben (Abnahmetest) |

Der aktive Anbieter steht im Kopf des Chats mit seinem Ziel: „Satzerkennung – ohne Modell, bleibt auf diesem
Rechner“ bzw. „<Modell> – bleibt auf diesem Rechner“ bzw. „<Modell> – geht an <Host>“. Wechsel über die Befehle
`ki.anbieter-waehlen` (im Register, Familie „Chat“). Nach dem Start ist immer `regel` aktiv; ein echter Anbieter
wird nur durch den Menschen aktiv (ADR-037: kein Anbieter vorkonfiguriert).

**Keine Telemetrie, keine weiteren Ziele:** Die Brücke baut Verbindungen nur zu `CEE_KI_URL`; der Browser nur zu
seinem Ursprung. Im Prüfmodus protokolliert die Brücke jede ausgehende KI-Anfrage (`ki_anfragen`: Host, Pfad,
Werkzeugnamen, Byte-Zahl, ob ein Schlüssel gesendet wurde – nicht der Schlüssel).

**Frage an den Menschen (die Spec blockiert sie nicht):** Ob zum Ausprobieren schon ein echtes Modell
angeschlossen wird und welches. Angenommene Empfehlung: Der OpenAI-kompatible Anbieter wird gebaut und mit einem
Testmodell geprüft; zum Ausprobieren ist ein **lokales Modell** auf dem eigenen Rechner vorgesehen (keine Daten
nach außen). Ein Dienst im Internet geht technisch auch, braucht aber die ausdrückliche Wahl `CEE_KI_EXTERN=ja`.
Sagt der Mensch „nur Satzerkennung“, entfällt nur der optionale Teil der Klick-Anleitung (Schritt 6).

### 2. Werkzeugliste aus dem Befehlsregister

- Ein Befehl wird Werkzeug, wenn er in `src/befehle.json` das Feld `"ki": true` trägt. In dieser Stufe genau 8:
  die sechs `referenz.*`, `element.ausblenden`, `element.verwerfen`. Kein Werkzeug ohne Befehl; kein Befehl der
  Familie Freigabe (ADR-047, ADR-055).
- Format wie MCP `tools/list`: `{name, description, inputSchema}`. `name` = Befehls-ID mit `_` statt `.` und `-`
  (`referenz.punkt-relativ` → `referenz_punkt_relativ`). `description` aus dem Übersetzungsschlüssel
  `ki.werkzeug.<id>` (de), ein Satz, dann `Beispiel: ` und genau ein JSON-Objekt mit Argumenten, z. B.
`Punkt auf Koordinaten setzen. Beispiel: {"x": "10 mm", "y": "20 mm", "z": "0 mm"}`. `inputSchema` (JSON Schema 2020-12) aus
  `parameter`; flach, ohne verschachtelte Pflichtobjekte (Regel MCP):
  - Größe (`dimension`) → `{"type": "string", "pattern": "<Zahl> <Einheit>"}`, Beispiel `"40 mm"`, `"30 deg"`;
    geprüft und umgerechnet mit dem Wert-Parser aus `src/wert/` (wie im Eigenschaftenfeld, ADR-057). Zahl ohne
    Einheit → Fehler `unit`.
  - Bezug (`typ: referenz`) → String `<Element-ID>.<Ausgang>` (z. B. `"P1.point"`) bzw. `<Element-ID>` bei
    `element`; Namen werden nicht aufgelöst, die ID steht in der Modellübersicht.
- Neue Parameter (alle optional für den Menschen, Klickweg unverändert; ruft die KI auf, gelten fehlende Größen
  als `0 mm` bzw. `0 deg`):

| Befehl | Parameter (Pflicht für das Werkzeug fett) |
| --- | --- |
| `referenz.koordinatensystem` | `x`, `y`, `z` (Länge), `rx`, `ry`, `rz` (Winkel), `parent` (frame), `name` |
| `referenz.punkt` | `x`, `y`, `z` (Länge), `frame` (frame), `name` |
| `referenz.punkt-relativ` | **`ref`** (point), `x`, `y`, `z` (Länge), `name` |
| `referenz.gerade`, `.halbgerade`, `.strecke` | **`a`**, **`b`** (point), `name` |
| `element.ausblenden`, `element.verwerfen` | **`element`** |

- **Werkzeugergebnis** kompakt (≤ 600 Zeichen je Aufruf): Erfolg `{"ok": true, "element": "<id>", "name", "typ",
  "ausgaenge": {"<name>": {Lage als Größen-Strings}}}`; Fehler `{"ok": false, "code", "message", "element_id",
  "hint"}` mit Codes `unknown_tool`, `invalid_arguments`, `unit`, `input_missing`, `input_type`, `degenerate`
  (Befunde des Workers aus ap-50 werden übernommen). Ein Fehler ändert den Entwurf nicht und bricht die Schleife
  nicht ab (ADR-050).
- **Urheber:** Übernommene Aufrufe laufen mit `ursprung = 'chat'`, `urheber = 'ki'`; der Verlaufseintrag nennt
  `urheber: "ki"`, `anbieter: <id>` und `ausgeloest_von: "mensch"` (Dienstkonto-Gedanke aus ADR-055 im Prototyp,
  ohne Server).

### 3. Änderungssatz und Entscheidungskarte

- **Modellübersicht** in der Anweisung: je Element eine Zeile `<id> <typ> "<name>" <Parameter mit Einheit>
  [ausgeblendet] [verworfen]` plus Auswahl („zu: …“, ADR-065 Punkt 6); höchstens 8 000 Zeichen (≈ 2 000 Tokens),
  bei mehr Elementen nur Auswahl, Koordinatensysteme und die zuletzt angelegten.
- **Änderungssatz** = `{titel, begruendung, anbieter, aufrufe: [{werkzeug, argumente, ergebnis}], neu: [id],
  verworfen: [id], ausgeblendet: [id], befunde: [Befund]}`. `titel` aus dem Satz („Rechteck 100 × 60 mm …“ bzw.
  „<n> Elemente anlegen“), `begruendung` = Schlusstext des Anbieters.
- **Entscheidungskarte** im Chat nach `docs/design/muster.md`: Titel, Begründung, Liste der Änderungen (neu,
  verworfen, ausgeblendet, je mit Name), Befunde, Geister-Vorschau aller neuen Elemente im Modell (Darstellung wie
  ap-50 im Geister-Zustand aus ap-41b), Hauptaktion **Übernehmen**, ruhige Aktion **Verwerfen**, nie modal. Karten
  stapeln sich; jede wird beim Übernehmen gegen den dann aktuellen Graphen ausgeführt (fehlt ein Bezug, erscheinen
  Befunde, nichts bricht).
- **Übernehmen** führt die erfolgreichen Aufrufe in Reihenfolge mit denselben Befehlen aus; ein Rückgängig-Schritt
  nimmt den ganzen Satz zurück. **Verwerfen** ändert Graph und Ansicht nicht. Ein Satz ohne Aufruf ergibt keine
  Karte, nur eine Antwort.
- **Ohne Brücke** (statischer Build, Abnahmetests von ap-41b/ap-41c) bleibt die bisherige Simulation aus
  `src/ki.ts` unverändert. Erkennt die Satzerkennung einen Satz nicht, versucht der Chat danach die bisherige
  Simulation, erst dann „nicht verstanden“ mit drei Beispielsätzen aus dem Prüfsatz.

### 4. Satzerkennung: Satzmuster

Deutsch, Groß-/Kleinschreibung egal; Zahlen mit Komma oder Punkt; Einheiten `mm`, `cm`, `m`, `°`, `grad`, `deg`
(Umrechnung nur über den Wert-Parser); `×`, `x`, `mal` als Maßtrenner. Teilsätze mit „und“, „mit“, „,“ verbunden.
Bezüge über Namen oder IDs aus der Modellübersicht („P1“, „Strecke S1“, „die XY-Ebene von K1“).

| Muster | Aufrufe |
| --- | --- |
| „Koordinatensystem [bei x A, y B, z C] [um W° um x/y/z gedreht]“ | `referenz_koordinatensystem` |
| „Punkt bei A, B, C mm“ / „Punkt bei x A, y B, z C“ | `referenz_punkt` |
| „Punkt N mm über/unter/neben <Punkt>“ (über = +z, unter = −z, neben = +x) | `referenz_punkt_relativ` |
| „Strecke/Gerade/Halbgerade von/durch <P> nach/und/durch <Q>“; P, Q als Name oder „(A, B, C) mm“ | ggf. 2× `referenz_punkt`, dann Linie |
| „diesen Punkt“, „ihn“ | zuletzt angelegter Punkt im selben Satz |
| „Rechteck B × H mm [in der XY/YZ/ZX-Ebene]“ | 4× `referenz_punkt`, 4× `referenz_strecke` |
| „… mit Punkt N mm darüber“ (nach Rechteck) | `referenz_punkt_relativ` |
| „Verwirf <Element>“ / „Blende <Element> aus“ | `element_verwerfen` / `element_ausblenden` |

**Festgelegte Deutung** (Open Question 3): Ein Rechteck B × H liegt mit einer Ecke im Ursprung des gewählten
Koordinatensystems (sonst Welt), Kante B entlang der ersten, H entlang der zweiten Achse der Ebene (XY: x, y; YZ:
y, z; ZX: z, x); ohne Ebene XY. Ecken im Umlauf E1 (0, 0), E2 (B, 0), E3 (B, H), E4 (0, H); Strecken E1–E2, E2–E3,
E3–E4, E4–E1. „Punkt N mm darüber“ ist relativ zu E1 mit Versatz (B/2, H/2, N) in Ebenenrichtungen, also N mm über
der Mitte entlang der Ebenennormalen; er folgt dem Rechteck. Unbekannter Name → Antwort mit Hinweis, keine Karte.
Gleicher Satz und gleicher Graph → bytegleiche Folge von Aufrufen.

### 5. Prüfsatz „Wireframe-Aufgaben“

Datei `tests/golden/ap-52-ki-konstruktion-wireframe/wireframe-aufgaben.json`:
`{"version": 1, "aufgaben": [{"id", "zustand", "satz", "pruefer": [Prüfer]}]}`. Bewertet wird nur durch Prüfer am
Graphen nach Übernehmen und am Worker-Ergebnis, nie durch Text des Anbieters (ADR-053). Toleranzen: Lagen 1e-6 mm,
Richtungen 1e-9 rad (wie ap-50). Jede Aufgabe prüft zusätzlich: keine Befunde, alle übrigen Elemente unverändert.

| ID | Zustand | Satz | Prüfer (alle müssen gelten) |
| --- | --- | --- | --- |
| W1 | `drahtmodell-leer` | Koordinatensystem bei x 100 mm, um 30° um z gedreht | genau 1 neues `frame` mit 7 Kindern; Ursprung (100, 0, 0) mm; x-Achse (cos 30°, sin 30°, 0) |
| W2 | `drahtmodell-leer` | Punkt bei 10, 20, 5 mm | genau 1 neuer `point` bei (10, 20, 5) mm, sonst nichts neu |
| W3 | `drahtmodell-leer` | Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber | genau 4 neue `segment`, 5 neue `point`; die Strecken bilden einen geschlossenen Umlauf über 4 Eckpunkte (jeder Eckpunkt Ende von genau 2 Strecken); Längen sortiert (60, 60, 100, 100) mm; benachbarte Strecken senkrecht; alle Ecken bei z = 0 mm; der fünfte Punkt liegt 40 mm über der Mitte des Rechtecks entlang +z (Lage in der Ebene beliebig, damit auch Modelle mit anderer Ecke bestehen) |
| W4 | `drahtmodell-beispiel` | Punkt 25 mm über P2 und eine Halbgerade von P2 durch diesen Punkt | genau 1 neuer `point` mit Eingang `ref = P2.point`, Lage = Lage(P2) + (0, 0, 25) mm; genau 1 neuer `ray` mit `a = P2.point`, `b = <neuer Punkt>.point` |
| W5 | `drahtmodell-beispiel` | Verwirf die Strecke S1 und blende die Gerade G1 aus | nichts neu; S1 verworfen; G1 ausgeblendet; Graph sonst gleich (bis auf `meta.verworfen` von S1) |

Prüfbefehl: `pruefen -- ki pruefsatz --datei <pfad> --anbieter <id> [--wiederholungen n] --json` →
`{anbieter, modell?, aufgaben: [{id, bestanden, versuche, gruende: [Text]}], bestanden, gesamt}`. Er setzt je
Aufgabe den Zustand, sendet den Satz, übernimmt die erste Karte und wendet die Prüfer an. Für echte Modelle ist das
Ergebnis ein Messwert, kein Abnahmekriterium; der Abnahmetest rechnet die Prüfer für `regel` selbst nach.

### 6. Prüfbefehle der Vorschau

`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- ki <unterbefehl> … --json` (startet Vorschau und
Brücke selbst wie ap-50; Umgebungsvariablen aus Abschnitt 1 werden durchgereicht):

- `werkzeuge` → `{werkzeuge: [{name, befehl, description, inputSchema}]}` (genau das, was ein Anbieter bekommt).
- `anbieter` → Antwort von `GET /ki/anbieter`.
- `ablauf --zustand <name> --datei <ablauf.json>` → wie `drahtmodell ablauf` aus ap-50, zusätzliche Schritte
  `{chat: "<Satz>"}`, `{befehl: "chat.uebernehmen" | "chat.verwerfen", args?: {karte}}`; Schnappschuss zusätzlich
  `chat: {nachrichten, karten: [Änderungssatz + {offen}]}`, `geister: [{element, art, lage_mm}]`,
  `verlauf: [{befehl, urheber, anbieter?, ausgeloest_von?}]`, `ki_anfragen`, `ki_bereit_ms` (Senden bis Karte mit
  Vorschau).
- `pruefsatz` → Abschnitt 5.

### 7. Budgets und Grenzen

| Messung | Wert | Wie gemessen |
| --- | --- | --- |
| Satzerkennung: Senden bis Karte mit Vorschau, warm (W3) | ≤ 2,0 s | `ki_bereit_ms`, Median aus 5 |
| Übernehmen bis Anzeige, warm | ≤ 500 ms | `bereit_ms` aus `ablauf` (wie ap-50) |
| Zeitlimit echter Anbieter je Satz | 120 s | fest; im Prüfmodus über `CEE_KI_ZEITLIMIT_S` |
| Aufrufe je Satz | ≤ 20 | danach Abbruch mit Antwort, Karte mit dem Bisherigen |
| Modellübersicht | ≤ 8 000 Zeichen | Länge der Systemnachricht in `ki_anfragen` bzw. Testmodell |
| Werkzeugergebnis | ≤ 600 Zeichen | Länge jeder Nachricht `werkzeug` |

### 8. Abnahmetests (Zuordnung)

Pfad `tests/acceptance/ap-52-ki-konstruktion-wireframe/`. Voraussetzungen wie ap-50 (Worker, `npm ci`,
Playwright-Chromium). Das **Testmodell** ist ein kleiner HTTP-Server in Python (Standardbibliothek) auf
`127.0.0.1` mit freiem Port, der `/v1/chat/completions` mit vorgegebenen Antworten beantwortet und jede Anfrage
aufzeichnet.

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Werkzeugliste: genau 8, Namen, Schema flach, Größen als String mit Einheit, je ein Beispiel, kein Werkzeug ohne Befehl | Werkzeuge aus dem Register |
| AK-2 | Werkzeugergebnisse und strukturierte Fehler; Fehler ändert Entwurf nicht | Werkzeugergebnis und Fehler |
| AK-3 | Prüfsatz mit `regel`: 5/5 bestanden, Prüfer im Test nachgerechnet, 3 Läufe bytegleich | Satzerkennung, Prüfsatz |
| AK-4 | Änderungssatz: Graph unverändert bis Übernehmen, Geister, Verwerfen, Rückgängig, Urheber | Änderungssatz mit Vorschau |
| AK-5 | Unbekannter Satz und unbekannter Name: keine Karte, Antwort mit Beispielen | Satzerkennung |
| AK-6 | OpenAI-kompatibel gegen Testmodell: Anfrageform, Werkzeuge, Schleife mit Fehler und Korrektur, W3 bestanden, Zeitlimit | Echter Anbieter |
| AK-7 | Datenschutz: ohne `CEE_KI_URL` nur `regel`; externes Ziel ohne `CEE_KI_EXTERN` keine Verbindung; Schlüssel nie im Browser; Browser nur eigener Ursprung | Keine Daten ohne Wahl |
| AK-8 | Budgets Satzerkennung und Übernehmen; Klickweg der sechs Befehle aus ap-50 unverändert (`drahtmodell ablauf` aus AK-13 von ap-50 weiter grün) | Leistung, Klickweg |

### 9. Klick-Anleitung „Ausprobieren“ (Scenario `[mensch]` und PR)

1. `bash spikes/ux-prototyp-2/vorschau.sh` starten, Adresse im Browser öffnen. Rechts unten steht der Chat, im
   Kopf „Satzerkennung – ohne Modell, bleibt auf diesem Rechner“.
2. In den Chat schreiben: `Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber`. Erwartung: Eine Karte
   mit vier Ecken, vier Strecken und einem Punkt; im Modell erscheinen sie blass als Vorschau, die Struktur ist noch
   unverändert.
3. „Verwerfen“: Vorschau verschwindet, nichts hat sich geändert. Satz noch einmal senden, „Übernehmen“: Rechteck
   und Punkt sind da, in der Struktur wählbar. Rückgängig nimmt alles auf einmal zurück, Wiederholen bringt es
   zurück.
4. `Punkt 25 mm über P2 und eine Halbgerade von P2 durch diesen Punkt` nach dem Laden des Beispiels
   (Adresse mit `?zustand=drahtmodell-beispiel`) ausprobieren, dann `Verwirf die Strecke S1 und blende die
   Gerade G1 aus`.
5. Einen Satz schreiben, den es nicht versteht. Erwartung: freundliche Antwort mit Beispielsätzen, keine Karte.
6. Optional mit lokalem Modell: z. B. Ollama starten, Vorschau mit `CEE_KI_URL=http://127.0.0.1:11434/v1
   CEE_KI_MODELL=<name> bash spikes/ux-prototyp-2/vorschau.sh` starten, im Chat den Anbieter wechseln und die
   Sätze aus Schritt 2 und 4 frei formuliert versuchen.

## Risks / Trade-offs

- **Satzerkennung ist keine KI** → Sie versteht nur die Muster aus Abschnitt 4. Bewusst: Sie macht Tests
  reproduzierbar und den Ablauf ohne Modell erlebbar; echte Sprachfreiheit kommt mit dem echten Anbieter.
- **Kleine lokale Modelle rufen Werkzeuge unzuverlässig auf** → wenige, flache Werkzeuge mit Beispiel, strukturierte
  Fehler mit `hint`, Schleife erlaubt Korrektur; der Prüfsatz macht die Güte messbar statt gefühlt.
- **Vorgezogener Teil von ap-15 im Wegwerf-Prototyp** → Doppelarbeit möglich. Abgeschwächt: Werkzeugformat (MCP)
  und Prüfsatz sind so gewählt, dass ap-15 sie übernimmt; Anbieter-Code ist klein.
- **Karten stapeln gegen sich ändernden Graphen** → beim Übernehmen können Bezüge fehlen; dann Befunde statt
  Absturz (ADR-050).
- **Deutung von „darüber“ und Lage des Rechtecks** ist eine Festlegung, keine Wahrheit → Prüfer für W3 ist
  lageunabhängig in der Ebene.

## Migration Plan

Keine Daten zu migrieren. Rückbau: `bruecke/ki/`, Feld `ki` und neue Parameter in `src/befehle.json`, Karte im
Chat und Prüfbefehle `ki` entfernen; die Simulation aus `src/ki.ts` bleibt ohnehin bestehen.

## Open Questions

1. **Vorziehen aus ap-15.** Anbieter-Schnittstelle, Werkzeugliste und Prüfsatz entstehen hier als Prototyp, vor
   ap-15 (M3). Vorschlag: so lassen; ap-15 übernimmt Werkzeugformat und Prüfsatz. Bei Nein: Change auf Satzerkennung
   ohne echten Anbieter verkleinern.
2. **Zeile in der Arbeitspaket-Tabelle.** Vorschlag: ap-52 als M1-Baustein nach ap-50 in `docs/konzept.md`
   eintragen („KI konstruiert Wireframe-Basics über das Befehlsregister, Prototyp“).
3. **Deutung „Rechteck“ und „darüber“.** Festgelegt in Abschnitt 4 (Ecke im Ursprung, Punkt über der Mitte,
   relativ zur ersten Ecke). Bei anderer Wahl des Kernteams (z. B. Rechteck um den Ursprung zentriert) ändern
   sich nur Satzerkennung und Beispiele, nicht der Prüfer von W3.
4. **Echter Anbieter zum Ausprobieren** – siehe Abschnitt 1, als Frage an den Menschen gestellt; Empfehlung
   (lokales Modell, Internetdienst nur mit ausdrücklicher Wahl) ist angenommen und blockiert nichts.
