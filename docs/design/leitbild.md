# Leitbild für Oberfläche und KI

Status: Entwurf zur Abstimmung im Kernteam, 2026-10-20. Gilt zusammen mit ADR-061 und dem Musterkatalog
(`muster.md`). Die Vorbilder im Konzept (Blender, VS Code, Onshape, Synera, klassisches CAD) liefern Ideen, das
Leitbild entscheidet. Nach der Abstimmung wird es per Nachtrag zu ADR-061 verbindlich.

## Anspruch

Die beste Bedienung, die ein CAD-System je hatte, und die beste KI-Unterstützung, die mitwächst, **als ein
Entwurf**. Mensch und KI arbeiten mit denselben Begriffen, denselben Befehlen und derselben Entscheidungskarte.
Es gibt kein KI-Produkt neben dem CAD.

## Fünf Grundbegriffe

Alles, was man in CEE sieht und tut, ist einer dieser fünf Begriffe. Wer sie verstanden hat, kennt die Oberfläche.

| Begriff | Bedeutung | Wo man ihm begegnet |
| --- | --- | --- |
| **Element** | Alles im Modell, vom Achsenursprung bis zur Baugruppe, alles in derselben Form (ADR-028) | 3D, Featurebaum, Knoten, Text |
| **Auswahl** | Woran ich gerade arbeite; in allen Ansichten gleich und das, was die KI mit „das hier“ meint | Kontur in der Akzentfarbe |
| **Befehl** | Alles, was man tun kann, aus einem Register (ADR-045): Werkzeug, Suche, Kürzel, Plugin, KI | Suche, Kontextaktionen |
| **Vorschlag** | Jede Änderung, die nicht ich selbst direkt mache: KI, Konflikt, Update, Korrektur, Studie | Entscheidungskarte |
| **Befund** | Alles, was nicht stimmt oder auffällt, am Element und mit Korrektur, wenn möglich | Markierung am Modell, Liste |

## Ein Ablauf für alles

**Auswählen → Absicht → Vorschau → Übernehmen oder Verwerfen → Nachjustieren**, und Rückgängig geht immer.

Die Absicht kann man auf vier Wegen äußern: ein Werkzeug nehmen, einen Wert ändern, einen Befehl suchen oder der KI
einen Satz sagen. Alle vier enden in derselben Graph-Operation. Was ich direkt tue, wirkt sofort und lässt sich
rückgängig machen. Was andere oder die KI vorschlagen, kommt als Entscheidungskarte.

## Komplexitätsbudget

Feste Obergrenzen. Wer etwas hinzufügen will, muss zeigen, dass es hineinpasst, oder etwas anderes wegnehmen.

| Was | Grenze |
| --- | --- |
| Arbeitsbereiche | ≤ 5 |
| Panels neben dem Modell | 2 (Aufbau links, Inspektor rechts; ADR-063) |
| Tastenkürzel | < 15, alle in der Suche sichtbar |
| Muster im Katalog | ≤ 20 (heute 17); ein neues nur per ADR |
| Modale Dialoge, Menüleisten, Ribbons | 0 |
| Akzentfarben | 1, nur für Auswahl und KI |
| Reaktion auf eine Eingabe | < 100 ms |

## Andockstellen

Fachpakete und Plugins erweitern CEE nur an diesen Stellen (ADR-045, ADR-054): Befehle, Elementtypen, Knoten,
Gruppen im Eigenschaften-Panel, Regeln (die Befunde liefern), Arbeitsbereiche und Einstellungen. Eigene Fenster,
Werkzeugleisten, Farben oder Dialoge gibt es nicht. Jeder Beitrag ist damit automatisch in der Suche und für die KI
verfügbar. So bleibt CEE auch mit vielen Fachpaketen eine Oberfläche.

## Die KI als gleichberechtigte Nutzerin

1. **Sie sieht, was der Mensch sieht:** denselben Graphen, dieselbe Auswahl, dieselben Befunde und Einheiten.
2. **Sie kann, was der Mensch kann, und nicht mehr:** Jeder Befehl ist ein MCP-Werkzeug (ADR-007, ADR-045). Es gibt
   keine Befehle nur für die KI und keine Funktion, die nur über die KI erreichbar ist.
3. **Sie schlägt vor, der Mensch entscheidet:** Änderungen nur als Änderungssatz mit Vorschau (ADR-021).
   Plan und Fortschritt sind sichtbar, sie lässt sich jederzeit unterbrechen.
4. **Sie wohnt an der Auswahl:** Man spricht sie über das Werkzeug „Fragen“, über „KI fragen“ im Eigenschaften-Panel
   oder mit einem Satz in der Suche an. Es gibt kein eigenes Chat-Fenster als zweites Produkt. Eine Antwort ist ein
   Vorschlag oder eine Erklärung mit Verweisen auf Elemente.
5. **Sie macht schlau statt abhängig:** Zu jedem Vorschlag zeigt sie die Befehle, die sie benutzt hat, als Textzeile
   zum Nachmachen. So lernt man die Werkzeuge nebenbei.

## Mitwachsen

- **Mit dem Produkt:** Jeder neue Befehl ist ohne Zusatzarbeit auch ein Werkzeug für die KI.
- **Mit den Modellen:** Bessere Modelle lassen sich einstecken, aus der Cloud oder lokal (ADR-037).
- **Messbar:** Die Eval-Suite mit festen Aufgaben und automatischen Prüfern misst jede Version mit einem Cloud- und
  einem lokalen Modell (ADR-014, ADR-053). Ein Rückschritt hält die Version auf.
- **Lernend:** Nach der Beta lernen lokale Modelle aus geprüften Lösungen, bewertet nur durch Prüfer (ap-38).
- **Mit dem Menschen:** Einsteiger äußern ihre Absicht, Profis tippen beim Ziehen und arbeiten im Text. Beide nutzen
  dieselben Befehle; es gibt keinen Einsteiger- und keinen Expertenmodus.

## Messlatten

| Ziel | Messung |
| --- | --- |
| Ohne Einweisung bedienbar | 4 von 5 Testpersonen lösen die Kernabläufe (ap-41, ap-08b) |
| Schneller als die Etablierten | Dieselben Aufgaben in CEE und in Onshape oder Fusion; Erstnutzer sind in CEE schneller, Geübte nicht langsamer |
| Ruhig und schnell | Reaktion < 100 ms, Auswahl < 100 ms (ap-08b) |
| KI wird besser | Erfolgsquote der Eval-Suite je Modell und Version, nie rückläufig |
| KI ist nützlich | Anteil übernommener Vorschläge in den Tests mit Testpersonen; im Betrieb nur lokal oder mit Zustimmung (ADR-037) |

## Prüffragen für jeden neuen Vorschlag

1. Zu welchem der fünf Grundbegriffe gehört er?
2. Welches Muster aus dem Katalog nutzt er?
3. Ist er ein Befehl, also auch für die KI und die Suche da?
4. Passt er ins Komplexitätsbudget, oder was fällt dafür weg?
5. Woran messen wir, dass es danach besser ist?

Kann man eine Frage nicht beantworten, wird der Vorschlag nicht gebaut, sondern in `docs/ideen/` abgelegt.

## Zur Entscheidung: KI früher sichtbar machen

Nach ADR-062 kommt die KI (ap-15) erst in M3. Damit Oberfläche und KI trotzdem gemeinsam entstehen, gibt es
zwei Wege:

- **A, ohne ADR-Änderung (Empfehlung):** Der UX-Prototyp ap-41 (M0) enthält den KI-Ablauf als klickbare
  Simulation: Satz sagen, Entscheidungskarte mit Vorschau, Übernehmen. So testen die Testpersonen ihn mit.
  ap-08a legt das Parameter-Schema der Befehle so an, dass es ohne Umbau als MCP-Werkzeugbeschreibung taugt.
- **B, zusätzlich mit Nachtrag zu ADR-059 und ADR-062:** Ein kleiner echter KI-Durchstich am Ende von M1. Ein
  Cloud-Modell baut über das Befehlsregister ein einfaches Teil als Änderungssatz mit Vorschau, belegt durch
  zehn Aufgaben mit Prüfern.

## Danach

- Den UI-Abschnitt im Konzept nach den fünf Grundbegriffen und dem Ablauf ordnen. Die Tabellen „Von … übernommen“
  wandern in einen Anhang „Herkunft der Ideen“.
- Das Leitbild per Nachtrag zu ADR-061 verbindlich machen und in `docs/rules/client.md` verweisen.
