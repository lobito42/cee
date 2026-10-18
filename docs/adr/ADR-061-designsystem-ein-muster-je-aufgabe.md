# ADR-061: Designsystem – ein Muster je Aufgabe

- Status: akzeptiert
- Datum: 2026-10-18
- Entscheider: Kernteam

## Kontext

Die Oberfläche ist für die Nutzer das Produkt. Sie soll sich wie aus einem Guss anfühlen: Nichts Ähnliches darf
auf zwei Arten gelöst sein, und wo es Standards gibt, gelten sie. Viele Agenten bauen parallel an der Oberfläche –
ohne verbindlichen Katalog entstünden fünf Arten von Bestätigungen, drei Wertfelder und mehrere Suchen. In CEE
sind die Inhalte farbig (Materialien, Renderings); die Oberfläche darf nicht mit ihnen konkurrieren.

## Entscheidung

1. **Ein Muster je Aufgabe:** Der Musterkatalog `docs/design/muster.md` ist verbindlich. Jede wiederkehrende
   Aufgabe hat genau ein Muster (u. a. Entscheidungskarte, Wertfeld, Suche, Statusanzeige, Befund, Vergleich,
   Tabelle, Eigenschaften-Panel). Neue Muster oder Abweichungen nur per ADR. Besonders:
   - **Eine Entscheidungskarte** für jede vorgeschlagene Änderung – KI, Konflikt, Bibliotheks-Update, Befund mit
     Korrektur, Studienergebnis, Freigabe-Prüfung. „Änderungskarte“ ist kein eigener Begriff mehr.
   - **Ein Wertfeld** für jede Zahl mit Einheit, überall gleich (Panel, Griff, Studie, App, XR).
   - **Eine Suche** für Befehle und Inhalte (wie in ADR-052).
   - **Keine Sicherheitsabfragen:** Rückgängig für alles, Verwerfen statt Löschen.
   - **Eine Statussprache:** Farbe, Symbol und Wort immer gemeinsam, dieselbe Farbe bedeutet überall dasselbe.

2. **Standards statt Eigenbau:** Bedienmuster nach den WAI-ARIA Authoring Practices, WCAG 2.2 AA; Design-Tokens im
   Format der W3C Design Tokens Community Group; Farben in OKLCH mit geprüften Kontrasten; Einheiten nach ISO 80000
   (ADR-057), Zahlen nach Sprachumgebung; Achsen X rot, Y grün, Z blau, Standardansichten nach ISO (europäische
   Projektion); ein Symbolsatz (Lucide, ISC) im 24-px-Raster. Plattformüblich nur Kürzel, Zwischenablage,
   Scrollrichtung, Datei-Dialoge und das App-Menü auf macOS (ADR-060).

3. **Schrift:** Inter (Variable) für die ganze Oberfläche, JetBrains Mono für Textprojektion, Code und
   Aktionsprotokoll; beide selbst gehostet (kein Abruf bei Dritten, ADR-056). Pflicht-Merkmale tabellarische
   Ziffern (`tnum`) und l mit Fuß (`cv05`). Drei Schnitte (400, 500, 600). Größen 12, 13, 14, 16, 20, 24 px;
   Grundgröße 13 px im Layout Desktop, 15 px im Layout Tablet.

4. **Farbschema „Graphit“ mit einem Akzent:** neutrale Grautöne mit leichtem Blaustich, hell und dunkel; eine
   Akzentfarbe „Stahlblau“ nur für Auswahl, Fokus, die eine Hauptaktion je Ansicht und KI-Vorschläge; gedämpfte
   Statusfarben (Erfolg, Warnung, Fehler); 3D-Ansicht auf ruhigem neutralem Grund, Auswahl als Akzent-Kontur.
   Fließtext und Akzent mindestens 4,5 : 1 gegen die Fläche, in beiden Modi.

5. **Eine Quelle, viele Ziele:** `docs/design/tokens.json` ist die einzige Quelle. Daraus werden CSS und
   TypeScript (Web, Tauri) und später Swift (Apple-App, ADR-060) erzeugt; erzeugte Dateien werden nie von Hand
   geändert. Tokens und Musterkatalog ändert nur das Kernteam.

6. **Durchsetzung:** Bausteine nur in `client/src/ui/`; ein Lint verbietet rohe Bedienelemente, Farbwerte und
   Schriftangaben außerhalb davon; eine Katalogseite zeigt jeden Baustein in hell und dunkel, Desktop und
   Tablet; UI-Tests vergleichen mit Referenzbildern auf Linux und Mac; ein Unit-Test prüft die Kontraste der
   Tokens. Review-Frage: „Gibt es dafür schon ein Muster?“

## Alternativen

Fertiges Designsystem (Material, Fluent, Carbon) – geprüft, aber fremde Formensprache und für ein dichtes
CAD-Werkzeug zu luftig bzw. zu laut. Plattform-native Optik je System – widerspricht „aus einem Guss“. Mehrere
Akzentfarben – lenken vom Modell ab.

## Konsequenzen

Präzisiert ADR-022 (Tokens, eine Akzentfarbe), ADR-045 und ADR-052 (eine Suche), ADR-021 und ADR-051 (eine
Entscheidungskarte). Ergänzt ADR-034: Schriften unter der SIL Open Font License 1.1 sind erlaubt. ap-41
(UX-Prototyp) baut auf Katalog und Tokens auf; ap-08a erzeugt die Tokens und richtet Lint und Katalogseite ein;
ap-08b baut die Bausteine. Der Katalog wächst mit, aber jedes neue Muster ist ein ADR-Eintrag.
