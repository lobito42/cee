# Architecture Decision Records

Geschützter Bereich: Änderungen nur durch das Kernteam. Status-Werte: vorgeschlagen, akzeptiert, zurückgestellt, ersetzt durch ADR-xxx, verworfen; Zusatz „geändert durch ADR-xxx“, wenn ein späteres ADR Teile ändert. Ältere ADRs (001–027), die der heutigen Richtung widersprechen oder sie nur teilweise treffen, haben einen Abschnitt „Aktuell gilt“; die übrigen gelten unverändert bzw. über ihre Vermerke. Neue ADRs mit der nächsten freien Nummer nach demselben Aufbau.

| ADR | Titel | Status |
| --- | --- | --- |
| [ADR-001](ADR-001-geometriekernel-opencascade.md) | Geometriekernel OpenCascade | vorgeschlagen, geändert durch ADR-032 |
| [ADR-002](ADR-002-build123d-als-modelliersprache.md) | build123d als Modelliersprache | vorgeschlagen, geändert durch ADR-028 |
| [ADR-003](ADR-003-code-ist-die-quelle-der-wahrheit.md) | Code ist die Quelle der Wahrheit | ersetzt durch ADR-028 |
| [ADR-004](ADR-004-step-ap242-als-bruecke-zu-allen-cad-systemen.md) | STEP AP242 als Brücke zu allen CAD-Systemen | vorgeschlagen, geändert durch ADR-042 |
| [ADR-005](ADR-005-extension-plus-lokaler-geometrie-dienst.md) | Extension plus lokaler Geometrie-Dienst | ersetzt durch ADR-031 |
| [ADR-006](ADR-006-bestehende-viewer-komponenten-wiederverwenden.md) | Bestehende Viewer-Komponenten wiederverwenden | vorgeschlagen |
| [ADR-007](ADR-007-mcp-server-als-einzige-ki-schnittstelle.md) | MCP-Server als einzige KI-Schnittstelle | ersetzt durch ADR-030, ADR-037 und ADR-045 |
| [ADR-008](ADR-008-ausfuehrbare-regelpakete.md) | Ausführbare Regelpakete | vorgeschlagen, geändert durch ADR-041 |
| [ADR-009](ADR-009-strukturierte-anforderungsdatei.md) | Strukturierte Anforderungsdatei | ersetzt durch ADR-028 |
| [ADR-010](ADR-010-visuelle-selbstpruefung.md) | Visuelle Selbstprüfung | vorgeschlagen |
| [ADR-011](ADR-011-eigene-blech-schicht.md) | Eigene Blech-Schicht | zurückgestellt (nach der Beta) |
| [ADR-012](ADR-012-optionale-fem.md) | Optionale FEM | vorgeschlagen |
| [ADR-013](ADR-013-lizenz-und-governance.md) | Lizenz und Governance | ersetzt durch ADR-034 |
| [ADR-014](ADR-014-zwei-testebenen.md) | Zwei Testebenen | vorgeschlagen |
| [ADR-015](ADR-015-explizite-publikation-statt-sichtbarkeit.md) | Explizite Publikation statt Sichtbarkeit | vorgeschlagen, geändert durch ADR-028 |
| [ADR-016](ADR-016-persistente-identitaet.md) | Persistente Identität | vorgeschlagen, geändert durch ADR-028 |
| [ADR-017](ADR-017-manifest-als-lockfile-mit-semantischer-versionieru.md) | Manifest als Lockfile mit semantischer Versionierung | ersetzt durch ADR-047 |
| [ADR-018](ADR-018-adressierung-per-uri.md) | Adressierung per URI | ersetzt durch ADR-058 |
| [ADR-019](ADR-019-semantische-pmi-im-code.md) | Semantische PMI im Code | vorgeschlagen, geändert durch ADR-028 |
| [ADR-020](ADR-020-zeichnungsblaetter-als-code.md) | Zeichnungsblätter als Code | ersetzt durch ADR-028 |
| [ADR-021](ADR-021-ki-aenderungen-als-pruefbare-aenderungssaetze.md) | KI-Änderungen als prüfbare Änderungssätze | vorgeschlagen, geändert durch ADR-035 |
| [ADR-022](ADR-022-eine-cad-arbeitsflaeche-mit-figma-bedienkonzept.md) | Eine CAD-Arbeitsfläche mit Figma-Bedienkonzept | vorgeschlagen, geändert durch ADR-031, ADR-044, ADR-045, ADR-060, ADR-061, ADR-063 und ADR-065 |
| [ADR-023](ADR-023-entwicklung-durch-agenten.md) | Entwicklung durch Agenten | vorgeschlagen |
| [ADR-024](ADR-024-code-transformation-ueber-den-syntaxbaum.md) | Code-Transformation über den Syntaxbaum | ersetzt durch ADR-028 und ADR-035 |
| [ADR-025](ADR-025-inkrementeller-rebuild-und-naeherungsvorschau.md) | Inkrementeller Rebuild und Näherungsvorschau | vorgeschlagen, geändert durch ADR-032 und ADR-050 |
| [ADR-026](ADR-026-eigene-interaktionsschicht-auf-three-js.md) | Eigene Interaktionsschicht auf three.js | vorgeschlagen, geändert durch ADR-040 |
| [ADR-027](ADR-027-parametrische-skizzen-mit-planegcs.md) | Parametrische Skizzen mit PlaneGCS | vorgeschlagen, Lizenzfrage offen |
| [ADR-028](ADR-028-element-graph-als-quelle-der-wahrheit.md) | Element-Graph als Quelle der Wahrheit | akzeptiert, geändert durch ADR-043, ADR-046, ADR-047 und ADR-049 |
| [ADR-029](ADR-029-rust-kern-fuer-das-datenmodell.md) | Rust-Kern für das Datenmodell | akzeptiert |
| [ADR-030](ADR-030-elixir-phoenix-fuer-den-server.md) | Elixir und Phoenix für den Server | akzeptiert |
| [ADR-031](ADR-031-web-app-und-desktop-app-mit-tauri.md) | Web-App und Desktop-App mit Tauri | akzeptiert, geändert durch ADR-060 |
| [ADR-032](ADR-032-geometrie-als-abgeleiteter-cache-hinter-kernel-schnittstelle.md) | Geometrie als abgeleiteter Cache hinter einer Kernel-Schnittstelle | akzeptiert, geändert durch ADR-047 |
| [ADR-033](ADR-033-local-first-zusammenarbeit-mit-crdt-und-zweigen.md) | Local-first-Zusammenarbeit mit CRDT und Zweigen | akzeptiert, geändert durch ADR-051 |
| [ADR-034](ADR-034-lizenz-mpl-fuer-den-kern-apache-fuer-sdk-und-format.md) | Lizenz: MPL-2.0 für den Kern, Apache-2.0 für SDK und Format | akzeptiert, ergänzt durch ADR-061 |
| [ADR-035](ADR-035-drei-projektionen-3d-knoten-text.md) | Drei Projektionen: 3D, Knoten, Text | akzeptiert, geändert durch ADR-044 |
| [ADR-036](ADR-036-immersives-review-ueber-webxr.md) | Immersives Review über WebXR | vorgeschlagen, geändert durch ADR-060 |
| [ADR-037](ADR-037-ki-anbieteroffen-und-lokal.md) | KI anbieteroffen und lokal | akzeptiert |
| [ADR-038](ADR-038-erster-anwendungsfall-raumakustik.md) | Erster Anwendungsfall: Raumgestaltung und Raumakustik | akzeptiert, geändert durch ADR-046 und ADR-062 |
| [ADR-039](ADR-039-material-als-element-mit-eigenschaften.md) | Material als Element mit Eigenschaften | akzeptiert |
| [ADR-040](ADR-040-rendering-echtzeit-und-fotomodus.md) | Rendering: Echtzeit und Fotomodus im Client | akzeptiert, geändert durch ADR-044 |
| [ADR-041](ADR-041-akustik-berechnung-im-kern.md) | Akustik-Berechnung im Rust-Kern | akzeptiert, geändert durch ADR-054 |
| [ADR-042](ADR-042-austauschformate-gltf-ifc-dxf-step.md) | Austauschformate: glTF, IFC, DXF, STEP | akzeptiert |
| [ADR-043](ADR-043-komponenten-instanzen-bibliotheken.md) | Komponenten, Instanzen und Bibliotheken | akzeptiert, geändert durch ADR-049 und ADR-050 |
| [ADR-044](ADR-044-bedienmuster-aus-blender.md) | Bedienmuster aus Blender | akzeptiert, geändert durch ADR-054 |
| [ADR-045](ADR-045-befehle-erweiterungen-vertrauen-nach-vs-code.md) | Befehle, Erweiterungen und Vertrauen nach dem Vorbild von VS Code | akzeptiert, präzisiert durch ADR-060 |
| [ADR-046](ADR-046-fachneutraler-kern-muster-aus-onshape.md) | Fachneutraler Kern und Muster aus Onshape | akzeptiert, geändert durch ADR-054 und ADR-062 |
| [ADR-047](ADR-047-freigabe-revisionen-lebenszyklus.md) | Freigabeprozess, Revisionen und Lebenszyklus | akzeptiert, geändert durch ADR-059 |
| [ADR-048](ADR-048-schnittstelle-plm-erp.md) | Offene Schnittstelle zu PLM und ERP | akzeptiert, geändert durch ADR-059 |
| [ADR-049](ADR-049-automatisierung-apps-studien-nach-synera.md) | Automatisierung, Apps und Studien nach dem Vorbild von Synera | akzeptiert, geändert durch ADR-059 |
| [ADR-050](ADR-050-bewaehrtes-aus-klassischem-cad.md) | Bewährtes aus klassischem CAD (CATIA, NX, Creo) | akzeptiert |
| [ADR-051](ADR-051-versionierung-in-alltagsbegriffen-entwicklungstrichter.md) | Versionierung in Alltagsbegriffen und Entwicklungstrichter | akzeptiert |
| [ADR-052](ADR-052-ordnungssystem-und-wiederfinden.md) | Ordnungssystem und Wiederfinden | akzeptiert, geändert durch ADR-059 |
| [ADR-053](ADR-053-lernschleife-fuer-lokale-modelle.md) | Lernschleife für lokale Modelle | akzeptiert |
| [ADR-054](ADR-054-fachpakete-interne-api-und-arbeitsbereiche.md) | Fachpakete: interne API zuerst, Arbeitsbereiche als Beitrag | akzeptiert |
| [ADR-055](ADR-055-rechte-rollen-anmeldung.md) | Rechte, Rollen und Anmeldung | akzeptiert, geändert durch ADR-059 |
| [ADR-056](ADR-056-datenschutz.md) | Datenschutz | akzeptiert |
| [ADR-057](ADR-057-einheiten-und-groessen.md) | Einheiten und Größen | akzeptiert |
| [ADR-058](ADR-058-adressen-auf-id-basis.md) | Adressen auf ID-Basis | akzeptiert |
| [ADR-059](ADR-059-meilensteine-und-beta-umfang.md) | Meilensteine und Beta-Umfang | akzeptiert, geändert durch ADR-062 |
| [ADR-060](ADR-060-geraete-layouts-eingabe-xr.md) | Geräte, Layouts, Eingabe und XR | akzeptiert |
| [ADR-061](ADR-061-designsystem-ein-muster-je-aufgabe.md) | Designsystem – ein Muster je Aufgabe | akzeptiert |
| [ADR-062](ADR-062-cad-zuerst.md) | CAD zuerst – Meilensteine neu geschnitten | akzeptiert |
| [ADR-063](ADR-063-bedienkonzept-fuenf-zonen.md) | Bedienkonzept – fünf Zonen, erst wählen, dann tun | akzeptiert, geändert durch ADR-065 |
| [ADR-064](ADR-064-mensch-entscheidet-agenten-integrieren.md) | Mensch entscheidet, Agenten integrieren | akzeptiert |
| [ADR-065](ADR-065-bedienkonzept-fensteraufbau.md) | Bedienkonzept – Fensteraufbau nach Apple-Gerüst mit VS-Code-Leisten | vorgeschlagen |
