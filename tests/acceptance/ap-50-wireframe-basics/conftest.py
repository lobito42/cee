"""Suchpfad für gemeinsame Hilfen aus ap-41c, damit `test_vorschau.py` auch allein gesammelt werden kann."""

import sys
from pathlib import Path

_MENUE = str(Path(__file__).resolve().parent.parent / "ap-41c-ux-schlankes-menue")
if _MENUE not in sys.path:
    sys.path.insert(0, _MENUE)
