"""Aufruf: python -m cee_pruefer TEIL.sc|BEFEHLE.json [--bericht bericht.html] [--json ergebnis.json]"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import asdict
from pathlib import Path

from .bericht import html_bericht, kurz
from .pruefen import pruefen
from .solidcraft import Sitzung, als_teil, finden


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="cee-pruefer", description="Prüft, ob ein SolidCraft-Teil parametrisch ist.")
    ap.add_argument("teil", type=Path)
    ap.add_argument("--bericht", type=Path, help="Bericht als HTML-Seite schreiben")
    ap.add_argument("--json", type=Path, help="Ergebnis als JSON schreiben")
    ap.add_argument("--ohne-bilder", action="store_true")
    args = ap.parse_args(argv)

    cli = finden()
    teil = als_teil(args.teil, cli)
    with Sitzung(teil, cli) as sitzung:
        ergebnis = pruefen(teil, sitzung)
    ergebnis.teil = args.teil.stem
    print(kurz(ergebnis))
    if args.json:
        daten = asdict(ergebnis)
        daten.pop("nennwert", None)
        args.json.write_text(json.dumps(daten, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.bericht:
        args.bericht.write_text(html_bericht(ergebnis, teil, bilder=not args.ohne_bilder), encoding="utf-8")
    return 1 if any(b.art == "fehler" for b in ergebnis.befunde) else 0


if __name__ == "__main__":
    sys.exit(main())
