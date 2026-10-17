# ADR-055: Rechte, Rollen und Anmeldung

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-059 (Zuordnung zu Meilensteinen)

## Kontext

Freigaben (ADR-047), Apps ohne Modellrechte (ADR-049) und die Suche (ADR-052) setzen Rechte voraus. KMU
brauchen Anmeldung über vorhandene Konten, wenige verständliche Rollen und Gäste wie Kunden oder Lieferanten.

## Entscheidung

1. **Anmeldung über OpenID Connect:** eigener Server mit eingebauten Konten (Passwort plus zweiter Faktor) oder
   ein externer Anbieter (z. B. Keycloak, Authentik, Microsoft, Google). Die Desktop-App arbeitet offline mit
   dem zuletzt gültigen Konto weiter; Rechte werden beim Abgleich geprüft.
2. **Wenige Rollen:** Betrachten, Kommentieren, Bearbeiten, Prüfen, Freigeben, Verwalten; dazu **App-Nutzer**
   (nur Apps nach ADR-049) und **Gast** (Zugriff auf einzelne Ergebnisse oder Freigabestände per Einladung,
   zeitlich begrenzt). Rollen gelten für Organisation, Bereich oder Projekt und vererben sich nach unten;
   keine Rechte je Element.
3. **Durchsetzung im Server:** Jede Operation und jede Suche prüft der Server; der Client zeigt nur an.
   Offline entstandene Änderungen außerhalb der eigenen Rechte werden beim Abgleich als Entscheidungskarte
   zurückgewiesen, nie still verworfen.
4. **Agenten mit eigener Identität:** KI-Agenten und Automatisierungen laufen als Dienstkonto mit eigenen
   Rechten, nie mit mehr Rechten als der auslösende Mensch; die Rolle Freigeben ist für Dienstkonten gesperrt.
5. **Nachvollziehbar:** Rechteänderungen und Freigaben stehen im Verlauf (ADR-051).

## Alternativen

Feingranulare Rechte je Element; nur eigene Konten ohne OIDC; Agenten unter dem Konto des Menschen.

## Konsequenzen

Ergänzt ADR-030, ADR-047 und ADR-049. Umgesetzt in ap-07a (lokale Anmeldung, M1) und ap-07b (Rollen, Rechte, OIDC, M2), siehe ADR-059.
