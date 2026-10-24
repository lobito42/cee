"""Messungen des Auswahl-Spikes (ap-49): alle Kennzahlen aus design.md als JSON. Kein Produktcode.

- `treffer_quote`: Anteil der 20 Fälle R×P, deren Ziele genau die Sollziele aus
  `tests/golden/ap-49-spike-auswahl/faelle.json` sind (Schwerpunkt ≤ 10⁻³ mm, Richtung ≤ 10⁻⁶ rad).
- `permutation_stabil`: alle 20 Fälle mit gemischter Kernel-Reihenfolge (Seeds 1 bis 10) gleich.
- `befunde`: K1 bis K3; `abstuerze`: nicht abgefangene Ausnahmen über alle Läufe.
- Zeiten: p95 über 100 Läufe nach 5 Aufwärmläufen. Graph-Regel über `synth::project(10_000)` im Rust-Teil
  `graph/` (Automerge-Dokument aus dem Datenmodell-Spike).
- `einordnung`: die 21 Auswahlbefehle aus `einordnung.json`.

Aufruf: `bash spikes/auswahl/bench.sh --json [--out <datei>]`. Fortschritt auf stderr.
"""

from __future__ import annotations

import json
import math
import subprocess
import sys
import time
from pathlib import Path

HIER = Path(__file__).resolve().parent
ROOT = HIER.parent.parent
GOLDEN = ROOT / "tests" / "golden" / "ap-49-spike-auswahl" / "faelle.json"
sys.path.insert(0, str(HIER))

import auswahl as a  # noqa: E402

WARMUP, RUNS = 5, 100
SEEDS = range(1, 11)
TOL_SCHWERPUNKT_MM, TOL_RICHTUNG_RAD = 1e-3, 1e-6


def fortschritt(msg: str) -> None:
    print(f"[bench] {msg}", file=sys.stderr, flush=True)


def _winkel(p: list[float], q: list[float], vorzeichen: bool) -> float:
    c = sum(x * y for x, y in zip(p, q, strict=True)) / (math.hypot(*p) * math.hypot(*q))
    return math.acos(max(-1.0, min(1.0, c if vorzeichen else abs(c))))


def gleich(ist: dict, soll: dict) -> bool:
    if ist["art"] != soll["art"] or ist["geometrie"] != soll["geometrie"]:
        return False
    if math.dist(ist["schwerpunkt_mm"], soll["schwerpunkt_mm"]) > TOL_SCHWERPUNKT_MM:
        return False
    return _winkel(ist["richtung"], soll["richtung"], soll["geometrie"] == "ebene") <= TOL_RICHTUNG_RAD


def gleiche_menge(ist: list[dict], soll: list[dict]) -> bool:
    if len(ist) != len(soll):
        return False
    offen = list(soll)
    for z in ist:
        t = next((s for s in offen if gleich(z, s)), None)
        if t is None:
            return False
        offen.remove(t)
    return True


def p95(werte: list[float]) -> float:
    w = sorted(werte)
    return w[max(0, math.ceil(0.95 * len(w)) - 1)]


def messen(f) -> list[float]:
    for _ in range(WARMUP):
        f()
    zeiten = []
    for _ in range(RUNS):
        t = time.perf_counter()
        f()
        zeiten.append((time.perf_counter() - t) * 1000.0)
    return zeiten


class Zaehler:
    def __init__(self) -> None:
        self.abstuerze: list[str] = []

    def fall(self, fall: str, seed: int | None = None) -> dict | None:
        try:
            return a.fall_auswerten(fall, seed)
        except Exception as err:  # noqa: BLE001 - genau das wird gezählt
            self.abstuerze.append(f"{fall} seed={seed}: {err!r}")
            return None


def soll_ziele() -> dict[str, dict]:
    out = {}
    for f in json.loads(GOLDEN.read_text(encoding="utf-8"))["faelle"]:
        out[f.get("fall") or f"{f['regel']}-{f['satz']}"] = f
    return out


def graph_messung() -> dict:
    fortschritt("Graph-Regel über synth::project(10_000) (cargo, release)")
    res = subprocess.run(
        ["cargo", "run", "--release", "-q", "--manifest-path", str(HIER / "graph" / "Cargo.toml")],
        capture_output=True,
        text=True,
        check=False,
    )
    if res.returncode != 0:
        raise RuntimeError(f"graph: Exit {res.returncode}: {res.stderr[-2000:]}")
    return json.loads(res.stdout)


def halter_zeiten() -> tuple[float, float]:
    halter = a.halter_elemente(a.SAETZE["P0"])
    regeln = [a.REGELN[r] for r in ("R1", "R2", "R3", "R4", "R5")]
    fortschritt("Neuberechnung des Halters (P0)")
    neu = messen(lambda: a.berechnen(halter, a.Kernel()))
    erg = a.berechnen(halter, a.Kernel())

    def auswahl() -> None:
        k = a.Kernel()
        for r in regeln:
            ziele, befunde = a.regel_auswerten(r, erg[r["inputs"]["quelle"].split(".")[0]], k)
            assert ziele and not befunde, r["id"]

    fortschritt("Auswertung R1 bis R5 am berechneten Halter")
    return p95(messen(auswahl)), p95(neu)


def run() -> dict:
    z = Zaehler()
    soll = soll_ziele()

    fortschritt("20 Fälle R×P gegen die Sollziele")
    treffer, abweichend, ohne = 0, [], {}
    for fall in a.FAELLE:
        erg = z.fall(fall)
        if erg is None:
            abweichend.append(fall)
            continue
        ohne[fall] = erg["ziele"]
        if not erg["befunde"] and gleiche_menge(erg["ziele"], soll[fall]["ziele"]):
            treffer += 1
        else:
            abweichend.append(fall)

    fortschritt("200 Läufe mit gemischter Kernel-Reihenfolge")
    instabil = []
    for fall in a.FAELLE:
        for seed in SEEDS:
            erg = z.fall(fall, seed)
            if erg is None or fall not in ohne or not gleiche_menge(erg["ziele"], ohne[fall]):
                instabil.append(f"{fall}/{seed}")

    fortschritt("Fälle K1 bis K3")
    befunde = []
    k1, k2, k3 = z.fall("K1"), z.fall("K2"), z.fall("K3")
    if k1 is not None:
        b = k1["befunde"][0] if len(k1["befunde"]) == 1 and not k1["ziele"] else {}
        befunde.append({"fall": "K1", "code": b.get("code"), "element": b.get("element")})
    if k2 is not None:
        b = next((x for x in k2["befunde"] if x["code"] == "mehrdeutig"), {})
        ok = not k2["ziele"] and gleiche_menge(b.get("kandidaten", []), soll["K2"]["kandidaten"])
        befunde.append(
            {
                "fall": "K2",
                "code": b.get("code") if ok else None,
                "element": b.get("element"),
                "kandidaten": len(b.get("kandidaten", [])),
            }
        )
    if k3 is not None:
        zs = k3["zustaende"]
        ok = zs["folgeelement"] in ("fehlerhaft", "pausiert") and zs["unabhaengig"] == "aktuell"
        befunde.append(
            {
                "fall": "K3",
                "code": zs["folgeelement"] if ok else None,
                "element": a.FOLGEELEMENT["id"],
                "unabhaengig": {"element": a.UNABHAENGIG["id"], "zustand": zs["unabhaengig"]},
                "regel": {"element": k3["regel"], "zustand": zs["regel"]},
            }
        )

    halter_auswahl, halter_neu = halter_zeiten()
    graph = graph_messung()
    einordnung = json.loads((HIER / "einordnung.json").read_text(encoding="utf-8"))

    m = {
        "treffer_quote": round(treffer / len(a.FAELLE), 4),
        "faelle_gesamt": len(a.FAELLE),
        "faelle_abweichend": abweichend,
        "permutation_stabil": not instabil,
        "permutation_laeufe": len(a.FAELLE) * len(SEEDS),
        "permutation_abweichend": instabil,
        "befunde": befunde,
        "abstuerze": len(z.abstuerze),
        "abstuerze_liste": z.abstuerze,
        "graph_auswahl_p95_ms": graph["graph_auswahl_p95_ms"],
        "halter_auswahl_p95_ms": round(halter_auswahl, 3),
        "halter_neuberechnung_p95_ms": round(halter_neu, 3),
        "graph": {k: v for k, v in graph.items() if k != "graph_auswahl_p95_ms"},
        "einordnung": einordnung,
        "einordnung_klassen": {k: sum(1 for e in einordnung if e["klasse"] == k) for k in ("A", "B", "C")},
    }
    erwartet = {"K1": "kein_ziel", "K2": "mehrdeutig"}
    befunde_ok = all(
        any(b["fall"] == f and b["code"] == c for b in befunde) for f, c in erwartet.items()
    ) and any(b["fall"] == "K3" and b["code"] for b in befunde)
    go = (
        m["treffer_quote"] == 1.0
        and m["permutation_stabil"]
        and befunde_ok
        and m["abstuerze"] == 0
        and m["graph_auswahl_p95_ms"] < 100
        and len(einordnung) == 21
    )
    m["empfehlung"] = "go" if go else "no-go"
    return m


def main(argv: list[str]) -> int:
    m = run()
    text = json.dumps(m, ensure_ascii=False, indent=2) + "\n"
    if "--out" in argv:
        Path(argv[argv.index("--out") + 1]).write_text(text, encoding="utf-8")
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
