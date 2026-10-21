# Regeln für den Client (TypeScript, Web und Tauri)

- Bedienkonzept nach Figma (ADR-022): keine Menüleisten, keine modalen Dialoge, kein Ribbon. Neue
  Funktionen kommen in die Befehlssuche (Strg/Cmd+K), ins Eigenschaften-Panel oder an die Auswahl.
- Fünf Zonen, erst wählen, dann tun (ADR-063): keine Werkzeugleiste; Aktionen erscheinen über dem Gewählten
  und in der Suche. Zahlen stehen nur im Inspektor, am Modell gibt es Griffe.
- Ein Muster je Aufgabe (ADR-061): vor jedem neuen Bedienelement `docs/design/muster.md` lesen und das
  vorhandene Muster benutzen. Neue Muster oder Abweichungen nur per ADR. Bausteine nur in `client/src/ui/`;
  außerhalb davon keine rohen Bedienelemente, keine Farbwerte, keine Schriftangaben (Lint).
- Farben, Schriften, Abstände ausschließlich über die Tokens. Quelle ist `docs/design/tokens.json` (Kernteam);
  `client/src/design/tokens.ts` und das CSS werden daraus erzeugt und nie von Hand geändert. Hell und dunkel.
  Eine Akzentfarbe, nur für Auswahl, Fokus, die eine Hauptaktion je Ansicht und KI-Vorschläge.
- Schrift Inter (selbst gehostet) mit `tnum` und `cv05`, Code und Textprojektion in JetBrains Mono; nur die
  Größen und Schnitte aus den Tokens. Symbole nur aus Lucide bzw. im selben 24-px-Raster gezeichnet.
- Status immer als Farbe, Symbol und Wort zusammen; keine Sicherheitsabfragen – Rückgängig statt „Wirklich?“.
- Reaktionszeit: Auswahl und Hervorhebung < 100 ms; nichts blockiert den UI-Thread länger als 16 ms.
- Der Client ändert das Modell nur über Graph-Operationen des Kerns (`crates/graph` als WASM bzw. nativ),
  nie über eigene Datenstrukturen. 3D, Knoten-Editor und Text zeigen denselben Graphen (ADR-035).
- KI-Änderungen erscheinen immer als Entscheidungskarte mit Vorschau, nie direkt (ADR-021, ADR-061).
- Keine Git-Begriffe in der Oberfläche (ADR-051): Entwurf, Meilenstein, Übernehmen, Zur Prüfung geben,
  Zurückholen, Ableiten, Verlauf. Kein Speichern-Knopf; Konflikte nur als Entscheidungskarten.
- Nichts wird gelöscht, was andere nutzen oder was Wissen trägt: Entwürfe werden verworfen (mit Begründung)
  und ausgeblendet. Standardansicht „Ergebnis“ zeigt den übernommenen Stand; „Alle Entwürfe“ zeigt alles.
- Wiederfinden (ADR-052): Inhalte erreicht man über die eine Suche, Facetten, Sammlungen, Rückverweise und
  die Startseite – keine zusätzlichen Ordnerebenen unter Projekt.
- Bewegen, Drehen, Skalieren: Achse sperren und Wert tippen ist immer möglich, mit Einheiten und einfachen
  Formeln; nie ein Dialog für exakte Werte (ADR-044).
- Arbeitsbereiche sind Beiträge von Fachpaketen (ADR-054); der Kern bringt nur „Modell“, Raum und Akustik
  bringen Raum, Akustik, Präsentation, Bericht. Ein neues Panel gehört genau einem Arbeitsbereich; höchstens
  fünf Arbeitsbereiche gleichzeitig sichtbar.
- Jede Aktion erzeugt eine Graph-Operation, die im Aktionsprotokoll als Text sichtbar und kopierbar ist.
- Der Stapel im Eigenschaften-Panel ist eine Projektion des Graphen, kein eigenes Datenmodell.
- Fehlerhafte und veraltete Elemente sind in allen Ansichten sichtbar markiert (Baum, 3D, Knoten); das Modell
  bleibt bedienbar (ADR-050). Große Baugruppen laden Untergraphen und Detailstufen bei Bedarf nach.
- Der Knoten-Editor zeigt an jedem Knoten bzw. jeder Kante das aktuelle Zwischenergebnis mit Einheit (ADR-049);
  große Werte gekürzt, Geometrie als kleine Vorschau aus dem Cache, nie neu berechnet nur für die Anzeige.
- Apps (ADR-049) sind generierte Oberflächen aus den Eingängen eines veröffentlichten Untergraphen, keine
  eigenen Masken von Hand. Sie schreiben nie direkt ins Modell, nur Änderungssätze bzw. eigene Stände.
- Jede Funktion ist ein Befehl im Befehlsregister (stabile ID, Parameter-Schema). Befehlssuche,
  Tastenkürzel, Kontextaktionen und Plugins rufen nur Befehle auf; keine Funktion nur hinter einem Knopf
  (ADR-045).
- Plugin-Code läuft nie im UI-Thread und nie mit Zugriff auf interne Module, nur über die Plugin-API im
  Web Worker. Ein Fehler im Plugin zeigt einen Befund, bricht aber nichts ab.
- Fremde Projekte und Bibliotheken öffnen im eingeschränkten Modus, bis man ihnen vertraut: keine
  Script-Elemente, kein Plugin-Code des Projekts.
- Einstellungen nur über das Einstellungs-Schema (Ebenen Standard, Organisation, Benutzer, Projekt), nie
  verstreut über `localStorage` oder eigene Dateien.
- Derselbe Code für Browser und Tauri. Plattformzugriffe (Dateien, Worker, HID) nur über `client/src/platform/`.
- Zielsysteme (ADR-060): Linux und macOS zuerst (Referenzbilder, Feinschliff), Windows läuft mit (CI-Pflicht),
  iPad als Tablet-Ziel; kein Handy-Layout. Kürzel folgen der Plattform (Cmd bzw. Strg). Unter Linux ist
  WebKitGTK das schwächste Glied – Leistung dort messen, nicht nur in Chromium.
- Geräte und Layouts (ADR-060): zwei Layouts – Desktop und Tablet – mit denselben Befehlen; kein Layout
  hat eigene Logik. Nichts hängt am Überfahren mit der Maus; jede Hover-Information ist auch per Antippen bzw.
  Fokus erreichbar. Bedienflächen im Layout Tablet ≥ 44 × 44 px.
- Eingabe nur über die Eingabeschicht (`client/src/input/`): Maus, Trackpad, Touch, Stift, 3D-Maus,
  XR-Controller und Sprache erzeugen Befehle oder Kameraänderungen, nie direkte Modelländerungen.
  Navigationsprofile und Belegung der 3D-Maus-Tasten sind Einstellungen, keine Sonderfälle im Code.
- Befehle sind Daten (ID, Parameter-Schema mit Einheiten, Übersetzungsschlüssel); ihre Wirkung ist eine
  Graph-Operation im Rust-Kern. Keine Befehlslogik nur im TypeScript-Client – ein nativer Client, MCP und die
  PLM-Schnittstelle nutzen dasselbe Register (ADR-060).
- 3D-Maus: in Tauri nativ über HID (Hauptweg auf Linux und Mac), im Chromium-Browser über WebHID; kein
  proprietäres Hersteller-SDK; fehlt die Unterstützung, ein Hinweis statt eines Fehlers.
- XR zuerst über WebXR auf derselben Interaktionsschicht, später nativ auf iPad und Vision Pro als dünner Client
  ohne eigene Logik: ≥ 72 fps (Meta Quest 3, Raum mit 50 Objekten), Teleport als
  Standard, keine Kamerabewegung ohne Kopfbewegung. In XR nur Instanzen platzieren, verschieben, austauschen und
  Varianten wählen – kein Modellieren, keine Freigabe. Höreindrücke immer als „Höreindruck, kein Messwert“
  kennzeichnen.
- Barrierefreiheit: Bedienelemente außerhalb der 3D-Fläche nach WCAG 2.2 AA (Kontrast, Tastatur, Fokus,
  Beschriftung für Screenreader); jede Funktion ist per Tastatur über die Befehlssuche erreichbar.
- Sprache: keine festen Texte im Code, nur Übersetzungsschlüssel; Deutsch und Englisch von Anfang an.
- Zahlen immer mit Einheit anzeigen und annehmen (ADR-057); gerundet wird nur in der Anzeige.
- Begriffe aus `docs/glossar.md`; neue Begriffe erst dort eintragen.
- Jede sichtbare UI-Änderung braucht einen aktualisierten Referenz-Screenshot unter
  `tests/ui-reference/` – den legt der Test-Autor nach Freigabe durch UX an, nicht der Implementierer.
