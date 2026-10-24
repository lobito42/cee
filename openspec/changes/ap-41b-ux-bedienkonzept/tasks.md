Alle Befehle aus dem Wurzelverzeichnis, sofern nicht anders angegeben; `P` steht für `spikes/ux-prototyp-2`.
Gesamtprüfung: `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`. Prüfbefehle:
`npm --prefix P run --silent pruefen -- <befehl> --json`. Dateien aus dem vorigen Stand holen mit
`git show origin/change/ap-41b-ux-bedienkonzept:spikes/ux-prototyp-2/<pfad>` (Liste in design.md, „Ablage“).

Voraussetzung: Branch `change/ap-41b-ux-bedienkonzept` neu von `main` (entschieden, Open Questions 9). Jede Gruppe endet mit
einem klickbaren Stand und 3–6 Schritten unter „Klick-Anleitung“ im PR (design.md). Umfang: etwa drei Nächte.

## 1. Gerüst und Fensteraufbau

- [x] 1.1 `P/` aus dem vorigen Stand übernehmen (Werkzeugkette, Tokens, i18n, Wertfeld, Register, Protokoll,
  Rückgängig, Halter-Geometrie, 3D-Lesbarkeit, `pruefen/basis.mjs`); alte Zonen, Paket Simulation und
  Gespräch entfernen – Prüfung: `bash P/build.sh && npm --prefix P run lint && npm --prefix P test && npm --prefix P run tokens:check`; AK-1
- [x] 1.2 Fensteraufbau mit allen Zonen (`data-zone`, Maße nach design.md), Dokument-Reiter Halter und
  Sensorgehäuse, Pfad, Ansichtsleiste, Schalter Mod+B/Mod+J/Mod+Alt+B, Taskleiste mit Platzhalter „Simulation“,
  Rückmeldezeile – Prüfung: `pruefen fenster`; AK-3
- [x] 1.3 Register mit `familie`, `bezug`, `rang`, `wesentlich`; Start-Menü und Dropdowns aus dem Register
  (≤ 12 je Untergruppe), `?register=` – Prüfung: Vitest (Erzeugung der Menüs) und `pruefen fenster`; AK-3, AK-7
- [x] 1.4 Testzustände (alle 22, zunächst ohne die Wirkung späterer Gruppen) und unbekannter Zustand; Prüfbefehle
  `zustaende`, `anfragen` – Prüfung: `pruefen zustaende` und `pruefen anfragen`; AK-1, AK-2
- [x] 1.5 Taskleiste wechselt Menüs: Wechsel „Modellieren“ ↔ „Simulation“ tauscht Dropdowns und Struktur
  (Leerer Zustand „simuliert“), Rückweg stellt Menüs, Struktur und Auswahl wieder her – Prüfung: `pruefen
  fenster` (Scenario „Taskleiste wechselt Menüs“); AK-3
- [x] 1.6 Vorschau bauen, Klick-Anleitung im PR (Fenster ansehen, Taskleiste wechseln, Reiter wechseln, Bereiche ein- und ausblenden,
  Menüs öffnen) – Prüfung: `bash P/build.sh` und `npm --prefix P run preview` startet

## 2. Elementzustände und Auswahl

- [x] 2.1 Elementzustände als Kanäle nach design.md in Modell, Struktur, Chat-Kontext und Pfad;
  `window.__cee.zustaende(id)`; Vorrangregel; Zustand `zustaende` – Prüfung: `pruefen elementzustaende`; AK-4
- [x] 2.2 Ein Auswahlzustand als Adressliste; Klick, Umschalt, Mod, Leere, Esc, Mod+A in Struktur und Modell;
  Überfahren beidseitig ohne Hover-only-Bedienung – Prüfung: `pruefen auswahl`; AK-5
- [x] 2.3 Aktiv und Isolieren: Doppelklick/Enter, Ebenen in Teil und Baugruppe, Dimmen, Pfad, „Fertig“/Esc/Pfad;
  Zustände `aktiv`, `isoliert` – Prüfung: `pruefen auswahl`; AK-5
- [x] 2.4 Eigenschaften der Auswahl (eins, mehrere mit „gemischt“, keins = aktives Element), Wertfelder live,
  Enter, Esc; Chat-Kontext „zu: …“ – Prüfung: Vitest und `pruefen auswahl`; AK-5
- [x] 2.5 Vorschau bauen, Klick-Anleitung (Grundplatte im Modell und in der Struktur wählen, Umschalt-Klick, ins
  Leere klicken, Gehäuse doppelklicken) – Prüfung: `bash P/build.sh`

## 3. Anlegen, Verwerfen, Kontextmenü, Tastatur

- [x] 3.1 Befehle `element.anlegen`, `umbenennen`, `duplizieren`, `verwerfen`, `zurueckholen`,
  `ansicht.verworfenes`; Protokoll mit `weg`; ein Verlauf je Dokument – Prüfung: `pruefen crud`; AK-6
- [x] 3.2 Kontextmenü aus dem Register (Rechtsklick, Shift+F10) gleich in Struktur und Modell, Gruppen ≤ 12,
  „Mehr …“; Kontextaktionen als erste ≤ 5; jeder Beta-Befehl aus
  `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` als Eintrag im Register mit Familie – Prüfung:
  `pruefen kontextmenue`; AK-7
- [x] 3.3 Tastatur und Fokus: Tab/F6-Reihenfolge, Fokusring, Esc-Kette, Enter-Regeln, Kürzel nur aus dem Register
  – Prüfung: `pruefen tastatur`; AK-12
- [x] 3.4 Vorschau bauen, Klick-Anleitung (Steg kopieren, umbenennen, verwerfen, zurückholen; Rechtsklick in
  Struktur und Modell vergleichen; Mod+Z) – Prüfung: `bash P/build.sh`

## 4. Modell: Navigation, Ziehen, Sichtbarkeit

- [x] 4.1 Navigationsprofile als Daten (`P/src/eingabe/profile.json`), Standard für Maus, Trackpad, Touch, zweites
  Profil; Ansichtseingabe beibehalten – Prüfung: `pruefen navigation`; AK-8
- [x] 4.2 Ansichtsleiste: Einpassen, Auf Auswahl (F), Projektion, Darstellung (W), Isolieren, Alles einblenden;
  Zustände `perspektive`, `kanten` – Prüfung: `pruefen navigation`; AK-8
- [x] 4.3 Griff im Modell mit Zahl am Zeiger, Tippen, Enter, Esc; Zustand `ziehen` – Prüfung: `pruefen ziehen`;
  AK-9
- [x] 4.4 Ziehen & Ablegen in der Struktur mit Zielregeln, `data-ziel`, Grund in der Rückmeldezeile, Esc;
  Zustände `ablegen`, `ablegen-verboten` – Prüfung: `pruefen ziehen`; AK-9
- [x] 4.5 Auge, Ausblenden/Einblenden, Nachfahren, Alles einblenden, `ansicht().ausgeblendet`; Zustände
  `ausgeblendet`, `verworfen` – Prüfung: `pruefen sichtbarkeit`; AK-10
- [x] 4.6 Drei Schichten: Graph in `localStorage` (`cee-prototyp-graph`), Ansicht nur im Speicher der Seite;
  `ansicht.speichern`/`ansicht.anwenden` mit Element `view` in der Struktur – Prüfung: `pruefen neuladen`; AK-17
- [x] 4.7 Vorschau bauen, Klick-Anleitung (drehen, verschieben, zoomen mit Maus und Trackpad; Dicke ziehen und 12
  tippen; Deckel in die Baugruppe ziehen; Steg ausblenden; Seite neu laden; Ansicht speichern und neu laden) – Prüfung: `bash P/build.sh`

## 5. Rückmeldung, Chat, andere Personen

- [x] 5.1 Statusanzeige rechnet/fehlerhaft/pausiert, Befund mit Korrektur im Panel „Befunde“, Rückmeldezeile,
  `&rechenzeit=`; Zustände `rechnet`, `befund` – Prüfung: `pruefen rueckmeldung`; AK-11
- [x] 5.2 Chat (simuliert) mit Kontext und Entscheidungskarte, ruft dieselben Befehle auf (`quelle: "ki"`);
  Absichten aus dem vorigen Stand übernehmen; Zustand `chat` – Prüfung: Vitest und `pruefen crud`; AK-6
- [x] 5.3 Testperson B simuliert (Auswahl, Zeiger, Name, „simuliert“), nichts gespeichert; Zustand `andere` –
  Prüfung: `pruefen anwesenheit`; AK-13
- [x] 5.4 Vorschau bauen, Klick-Anleitung (Befund finden und beheben; im Chat „Steg 40 mm hoch“; Zustand `andere`
  ansehen) – Prüfung: `bash P/build.sh`

## 6. Bausteinkatalog, Budget, Leitfaden

- [x] 6.1 Bausteinkatalog (`?katalog`, `katalog.oeffnen`), mindestens 19 Seiten mit Bild hell/dunkel, Regel,
  Bezug, Befehlen, Tokens; Prüfbefehl `katalog` – Prüfung: `pruefen katalog`; AK-15
- [x] 6.2 Prüfbefehle `budget`, `texte` für alle Zustände; Nacharbeit, bis Tokens, Akzent, Texte und Einheiten
  halten – Prüfung: `pruefen budget` und `pruefen texte`; AK-14
- [x] 6.3 Prüfbefehle `ablauf e…l` und `messen`; Nacharbeit, bis alle Sollzustände und Schwellen halten –
  Prüfung: `pruefen ablauf` und `pruefen messen`; AK-16
- [x] 6.4 Testleitfaden `docs/spikes/ux-prototyp-2.md` nach design.md (Aufgaben E–L, Ergebnisbogen TP1–TP5,
  Nachbefragung, Datenschutz, Start mit `npm run preview`) – Prüfung: AK-16
- [x] 6.5 Vorschau bauen, Klick-Anleitung zur vollständigen Pilot-Anleitung (Aufgaben E–L mit Startadressen,
  Katalog) zusammenfassen – Prüfung: `uv run pytest -q tests/acceptance/ap-41b-ux-bedienkonzept`

## Menschliche Abnahme (eigener Schritt des Kernteams, nicht nachts)

Keine Agenten-Tasks; stehen als Checkliste „Menschliche Abnahme“ im PR.

- Nach jeder Gruppe: Klick-Anleitung durchspielen, Auffälligkeiten als PR-Kommentar
- Pilotlauf vor dem Merge: Kernteam als TP1, Aufgaben E–L, Bausteinkatalog durchblättern, Augenschein der 44
  Screenshots
- Testpersonen TP2–TP5, Ergebnisse in `docs/spikes/ux-prototyp-2.md`, Go oder No-Go für G1; mit Go gilt ADR-065

## Workflow follow-up

- Open Questions: entschieden bzw. Standardvorschlag gilt (design.md, Stand 2026-10-23); `view` als Grundtyp in
  `format/` und Glossar nachtragen – Kernteam
- Befehlsinventar unter `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json` ablegen (Branch
  `tests/ap-41b-ux-bedienkonzept`, vor den Abnahmetests) – Kernteam
- Abnahmetests unter `tests/acceptance/ap-41b-ux-bedienkonzept/` neu schreiben (alte veraltet, design.md) –
  test-author auf `tests/ap-41b-ux-bedienkonzept`
- PR #51 schließen, `change/ap-41b-ux-bedienkonzept` neu von `main` – Agent nach Ja des Kernteams
- Eintrag bzw. Phase in `openspec/queue.yaml` – Kernteam
- Nach der Abnahme: `docs/rules/client.md`, `docs/design/leitbild.md`, `docs/design/muster.md` nach ADR-065
  angleichen (Branch `adr/…`) – Kernteam
- Archivieren mit `--skip-specs` nach dem Go für G1
