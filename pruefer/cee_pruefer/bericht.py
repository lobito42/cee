"""Bericht des Prüfers: eine Seite zum Ansehen (HTML, Bilder eingebettet) und eine Kurzfassung als Text."""

from __future__ import annotations

import base64
import html
import tempfile
from pathlib import Path

from .pruefen import Ergebnis, fmt
from .solidcraft import bild

FARBE = {"fehler": ("#C13C36", "#FFE0DB", "Fehler"), "warnung": ("#7E5403", "#FAE9CE", "Warnung"),
         "hinweis": ("#3A69AD", "#DFECFF", "Hinweis")}
ROLLE = {"groesse": "Größe", "fest": "festgelegt", "ohne": "ohne Rolle"}


def _png(pfad: Path | None) -> str:
    if pfad is None:
        return ""
    daten = base64.b64encode(pfad.read_bytes()).decode()
    return f'<img alt="" src="data:image/png;base64,{daten}">'


def kurz(e: Ergebnis) -> str:
    zaehl = {a: sum(1 for b in e.befunde if b.art == a) for a in FARBE}
    zeilen = [f"Teil {e.teil}: {zaehl['fehler']} Fehler, {zaehl['warnung']} Warnungen, {zaehl['hinweis']} Hinweise "
              f"({e.probiert} Varianten durchprobiert)"]
    zeilen += [f"- [{FARBE[b.art][2]}] {b.titel}" for b in e.befunde]
    return "\n".join(zeilen)


def html_bericht(e: Ergebnis, teil: Path, bilder: bool = True) -> str:
    tmp = Path(tempfile.mkdtemp(prefix="cee-bilder-"))
    nenn_bild = bild(teil, {}, tmp / "nenn.png") if bilder else None
    zaehl = {a: sum(1 for b in e.befunde if b.art == a) for a in FARBE}
    zeilen = []
    for g in e.groessen:
        hat_bereich = g.von is not None and g.bis is not None
        bereich = f"{fmt(g.von, g.einheit)} – {fmt(g.bis, g.einheit)}" if hat_bereich else "–"
        halt = e.haltbar.get(g.name, "–")
        farbe = "#227849" if halt.startswith("hält") else ("#C13C36" if halt.startswith("kippt") else "#595E64")
        zeilen.append(
            f"<tr><td>{html.escape(g.name)}</td><td>{html.escape(g.ausdruck)}</td><td>{ROLLE[g.rolle]}</td>"
            f"<td>{bereich}</td><td style='color:{farbe}'>{html.escape(halt)}</td>"
            f"<td class='grund'>{html.escape(g.grund)}</td></tr>"
        )
    karten = []
    for i, b in enumerate(e.befunde):
        fg, bg, wort = FARBE[b.art]
        abb = ""
        if bilder and b.werte:
            p = bild(teil, b.werte, tmp / f"b{i}.png")
            if p is not None:
                werte = ", ".join(f"{k} = {v}" for k, v in b.werte.items())
                abb = (f"<div class='paar'><figure>{_png(nenn_bild)}<figcaption>Nennwerte</figcaption></figure>"
                       f"<figure>{_png(p)}<figcaption>{html.escape(werte)}</figcaption></figure></div>")
        karten.append(
            f"<section class='karte'><span class='marke' style='color:{fg};background:{bg}'>{wort}</span>"
            f"<h3>{html.escape(b.titel)}</h3><p>{html.escape(b.text)}</p>{abb}</section>"
        )
    if not karten:
        karten.append("<section class='karte'><h3>Keine Befunde</h3><p>Das Teil ist parametrisch und hält jede "
                      "Größe über ihren Bereich.</p></section>")
    return f"""<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Prüfbericht {html.escape(e.teil)}</title>
<style>
:root{{--grund:#F5F7F9;--flaeche:#FDFDFE;--linie:#DDE0E3;--text:#1B2025;--text2:#595E64;--akzent:#3A69AD}}
body{{margin:0;background:var(--grund);color:var(--text);font:14px/1.5 Inter,system-ui,sans-serif}}
main{{max-width:980px;margin:0 auto;padding:32px 16px}}
h1{{font-size:24px;margin:0 0 4px}} h2{{font-size:16px;margin:32px 0 12px}} h3{{font-size:15px;margin:8px 0 4px}}
.unter{{color:var(--text2)}}
.zahlen{{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}}
.zahl{{background:var(--flaeche);border:1px solid var(--linie);border-radius:10px;padding:12px 16px;min-width:120px}}
.zahl b{{display:block;font-size:22px}}
table{{width:100%;border-collapse:collapse;background:var(--flaeche);border:1px solid var(--linie);border-radius:10px;
overflow:hidden}} td,th{{text-align:left;padding:8px 10px;border-bottom:1px solid var(--linie);vertical-align:top}}
th{{font-weight:600;color:var(--text2);font-size:12px}} .grund{{color:var(--text2)}}
.tabelle{{overflow-x:auto}}
.karte{{background:var(--flaeche);border:1px solid var(--linie);border-radius:10px;padding:16px;margin-bottom:12px}}
.marke{{font-size:12px;font-weight:600;padding:2px 8px;border-radius:10px}}
.paar{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:12px}}
figure{{margin:0}} img{{width:100%;border-radius:8px;border:1px solid var(--linie)}}
figcaption{{color:var(--text2);font-size:12px;margin-top:4px}}
</style></head><body><main>
<h1>Prüfbericht: {html.escape(e.teil)}</h1>
<div class="unter">CEE-Prüfer auf SolidCraft · {e.probiert} Varianten durchprobiert</div>
<div class="zahlen"><div class="zahl"><b>{zaehl['fehler']}</b>Fehler</div><div class="zahl"><b>{zaehl['warnung']}</b>
Warnungen</div><div class="zahl"><b>{zaehl['hinweis']}</b>Hinweise</div></div>
{_png(nenn_bild)}
<h2>Größen</h2><div class="tabelle"><table><tr><th>Größe</th><th>Wert</th><th>Rolle</th><th>Bereich</th>
<th>Ergebnis</th><th>Grund</th></tr>{''.join(zeilen)}</table></div>
<h2>Befunde</h2>{''.join(karten)}
</main></body></html>"""
