"""Anbindung an SolidCraft (ADR-068): Programm finden oder fest gewählte Version holen, MCP-Sitzung, Bilder."""

from __future__ import annotations

import io
import json
import os
import shutil
import subprocess
import tarfile
import tempfile
import urllib.request
from pathlib import Path
from typing import Any

VERSION = "0.30.1"
DEB_URL = (
    f"https://github.com/tangency-labs/solidcraft/releases/download/v{VERSION}/solidcraft-linux-x86_64.deb"
)
CACHE = Path(os.environ.get("CEE_CACHE", Path.home() / ".cache" / "cee")) / "solidcraft" / VERSION


class SolidCraftFehlt(RuntimeError):
    """SolidCraft ist nicht vorhanden und konnte nicht geholt werden."""


def finden(holen: bool = True) -> Path:
    """Pfad zu `solidcraft-cli`: Umgebungsvariable, Zwischenspeicher, PATH; sonst die feste Version holen."""
    if env := os.environ.get("CEE_SOLIDCRAFT"):
        return Path(env)
    cached = CACHE / "usr" / "bin" / "solidcraft-cli"
    if cached.exists():
        return cached
    if found := shutil.which("solidcraft-cli"):
        return Path(found)
    if not holen:
        raise SolidCraftFehlt("solidcraft-cli nicht gefunden")
    return installieren()


def _ar_mitglieder(data: bytes) -> dict[str, bytes]:
    if not data.startswith(b"!<arch>\n"):
        raise SolidCraftFehlt("Download ist kein Debian-Paket")
    pos, out = 8, {}
    while pos + 60 <= len(data):
        kopf = data[pos : pos + 60]
        name = kopf[:16].decode().strip().rstrip("/")
        groesse = int(kopf[48:58].decode().strip())
        out[name] = data[pos + 60 : pos + 60 + groesse]
        pos += 60 + groesse + (groesse % 2)
    return out


def installieren() -> Path:
    """Holt die fest gewählte SolidCraft-Version (Linux x86_64) in den Zwischenspeicher."""
    try:
        with urllib.request.urlopen(DEB_URL, timeout=300) as antwort:
            data = antwort.read()
    except OSError as fehler:
        raise SolidCraftFehlt(f"SolidCraft {VERSION} konnte nicht geladen werden: {fehler}") from fehler
    mitglieder = _ar_mitglieder(data)
    name = next((n for n in mitglieder if n.startswith("data.tar")), None)
    if name is None:
        raise SolidCraftFehlt("Debian-Paket ohne data.tar")
    CACHE.mkdir(parents=True, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(mitglieder[name])) as archiv:
        archiv.extractall(CACHE, filter="data")
    cli = CACHE / "usr" / "bin" / "solidcraft-cli"
    if not cli.exists():
        raise SolidCraftFehlt("solidcraft-cli fehlt im Paket")
    return cli


class Sitzung:
    """Eine MCP-Sitzung ohne Fenster auf einem Teil (`.sc`)."""

    def __init__(self, teil: Path, cli: Path | None = None) -> None:
        self.cli = cli or finden()
        self._proc = subprocess.Popen(
            [str(self.cli), "mcp", "--headless", "--in", str(teil)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True,
        )
        self._id = 0
        self._senden(
            "initialize",
            {
                "protocolVersion": "2025-06-18",
                "capabilities": {},
                "clientInfo": {"name": "cee-pruefer", "version": "1"},
            },
        )
        assert self._proc.stdin is not None
        self._proc.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}) + "\n")
        self._proc.stdin.flush()

    def _senden(self, methode: str, params: dict[str, Any]) -> dict[str, Any]:
        assert self._proc.stdin is not None and self._proc.stdout is not None
        self._id += 1
        nachricht = {"jsonrpc": "2.0", "id": self._id, "method": methode, "params": params}
        self._proc.stdin.write(json.dumps(nachricht) + "\n")
        self._proc.stdin.flush()
        while True:
            zeile = self._proc.stdout.readline()
            if not zeile:
                raise RuntimeError("SolidCraft hat die Sitzung beendet")
            antwort = json.loads(zeile)
            if antwort.get("id") == self._id:
                if "error" in antwort:
                    raise RuntimeError(antwort["error"].get("message", str(antwort["error"])))
                return antwort["result"]

    def werkzeug(self, name: str, argumente: dict[str, Any]) -> Any:
        ergebnis = self._senden("tools/call", {"name": name, "arguments": argumente})
        text = "".join(t.get("text", "") for t in ergebnis.get("content", []) if t.get("type") == "text")
        if ergebnis.get("isError"):
            raise RuntimeError(text)
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            return text

    def schliessen(self) -> None:
        self._proc.kill()
        self._proc.wait()

    def __enter__(self) -> Sitzung:
        return self

    def __exit__(self, *_: object) -> None:
        self.schliessen()


def als_teil(quelle: Path, cli: Path | None = None) -> Path:
    """Eine Befehlsliste (`.json`) wird zu einem Teil (`.sc`); ein `.sc` bleibt, wie es ist."""
    if quelle.suffix == ".sc":
        return quelle
    cli = cli or finden()
    ziel = Path(tempfile.mkdtemp(prefix="cee-")) / (quelle.stem + ".sc")
    lauf = subprocess.run(
        [str(cli), "run", str(quelle), "--save", str(ziel), "--quiet"], capture_output=True, text=True
    )
    if lauf.returncode != 0 or not ziel.exists():
        raise RuntimeError(f"Befehlsliste läuft nicht: {lauf.stderr.strip() or lauf.stdout.strip()}")
    return ziel


def bild(teil: Path, werte: dict[str, str], ziel: Path, cli: Path | None = None) -> Path | None:
    """Bild des Teils mit geänderten Größen (ohne das Teil zu ändern); None, wenn es nicht geht."""
    cli = cli or finden()
    skript = ziel.with_suffix(".json")
    befehle = [
        {"command": "parameters.change", "params": {"name": n, "expression": w}} for n, w in werte.items()
    ]
    skript.write_text(json.dumps({"commands": befehle}), encoding="utf-8")
    lauf = subprocess.run(
        [str(cli), "snapshot", str(skript), "--in", str(teil), "--out", str(ziel), "--view", "iso",
         "--width", "640", "--height", "440"],
        capture_output=True,
        text=True,
    )
    skript.unlink(missing_ok=True)
    return ziel if lauf.returncode == 0 and ziel.exists() else None
