# ADR-032: Geometrie als abgeleiteter Cache hinter einer Kernel-Schnittstelle

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-047 (Exporte von Freigabeständen werden archiviert)

## Kontext

Geometrie ist groß und deterministisch aus dem Rezept berechenbar. OpenCascade kann bei fehlerhaften Operationen abstürzen. Ein eigener Kernel ist auf absehbare Zeit unrealistisch, soll aber möglich bleiben.

## Entscheidung

Synchronisiert wird nur das Rezept (der Graph), nie Geometrie. Ergebnisse werden nach Inhalts-Hash (Element, Eingänge, Kernel-Version) gecacht. Der Kernel steht hinter einer versionierten Nachrichten-Schnittstelle (`format/kernel/`). Erste Implementierung: Python-Worker (`worker/`) mit OCP und build123d. Worker laufen als eigene Betriebssystem-Prozesse, überwacht vom Server bzw. vom Tauri-Host, mit Zeitlimit und Neustart. Optional zeigt der Client eine schnelle Netz-Vorschau, die exakte Geometrie kommt vom Worker. Ein eigener Kernel ist nur als spezialisierter Zusatz denkbar (z. B. implizite Modelle, Gitter), frühestens nach der Beta (ADR-059).

## Alternativen

OCCT als NIF in der BEAM; Rust-Kernel (Truck, Fornjot) als Hauptkernel; eigener Kernel.

## Konsequenzen

Ergänzt ADR-001 und ADR-025. Ein zweiter Kernel kann später ohne Änderung an Datenmodell und Synchronisation hinzukommen.
