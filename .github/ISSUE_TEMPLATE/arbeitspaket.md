---
name: Arbeitspaket
about: Ein Arbeitspaket aus dem Konzept (ein Issue je Change)
title: "ap-xx-kurzname: "
labels: arbeitspaket
---

**Change-ID:** `ap-xx-kurzname` · **Gate:** G1 / G2 / G3 / G4 · **Abhängig von:** …

- [ ] Change entworfen (Branch `spec/<id>`, `/opsx:propose`) und gemergt
- [ ] Freigegeben: Eintrag in `openspec/queue.yaml` mit `phase: tests`
- [ ] Abnahmetests (Branch `tests/<id>`) gemergt → `phase: build`
- [ ] Umsetzung (Branch `change/<id>`) mit Review gemergt → `phase: done`
- [ ] Archiviert (`/opsx:archive <id>`)
