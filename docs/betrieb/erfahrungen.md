# Erfahrungen aus den Läufen

Was wir aus echten Läufen gelernt haben und was daraus geworden ist. Neue Einträge oben.

## ap-00-setup (17.–18.10.2026) – erster Durchlauf der Pipeline

**Ergebnis:** gemergt (PR #3) und archiviert. 4 Läufe der Nachtschicht plus Handarbeit am Wochenende. Der Agent
hat Worker, Phoenix-Server, Client und Tauri-Hülle gebaut; das Kernteam hat den Harness nachgezogen.

| Was hakte | Ursache | Daraus geworden |
| --- | --- | --- |
| `mix` und `npm` durften nichts installieren | Allow-Liste zu eng | Freigaben für cargo, mix, npm, uv erweitert; Rechte als Parameter an den Lauf |
| Lauf endete ohne Protokolleintrag | Rechte verweigert, Lauf gab vorzeitig auf | Lauf ohne Protokoll gilt als rot |
| Commits gingen bei Abbruch verloren | nicht gepusht | Nachtschicht sichert nicht gepushte Commits auf Agenten-Branches |
| Branch hinkte main hinterher (Lizenz-Eintrag fehlte) | Agent durfte `main` nicht hineinmergen | `git merge` für Agenten-Branches erlaubt |
| Push mit Optionen scheiterte | Muster der Allow-Liste | Push mit Optionen auf Agenten-Branches erlaubt, Push auf main per Refspec verboten |
| Tauri lokal nicht baubar | WebKitGTK fehlt im Runner-Lauf | Task 1.4 über den CI-Job „desktop“ belegt |
| `next_step.py` bekam HTTP 403 auf den CI-Status | Rechte des Workflow-Tokens | beobachten; falls wieder: `actions: read` prüfen |
| Feinschliff (App-Symbol, Windows-Symbol) | Geschmack, kein Testkriterium | vom Menschen erledigt – passt zu `[mensch]`-Kriterien |

**Lehren:**
- Die ersten Läufe eines neuen Bereichs scheitern eher am Harness (Rechte, Werkzeuge) als am Code. Ein Probelauf
  von Hand vor der ersten echten Nacht lohnt sich.
- Ein großer Change über mehrere Nächte funktioniert, weil Läufe fortgesetzt werden.
- Abhängigkeits-Updates aus Sicherheitsmeldungen (PR #6) sind Kernteam-Arbeit am Tag, nicht Nachtschicht.
