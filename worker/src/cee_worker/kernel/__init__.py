"""Kernel-Schnittstelle des Workers (ADR-032): einziger Ort für OCP- und build123d-Aufrufe.

`rechnen(auftrag)` liefert das Ergebnis nach `cee-kernel/0`, `formen(auftrag)` die OCP-Formen je Element-ID.
"""

from __future__ import annotations

from .rechnen import KERNEL_NAME, PROTOCOL, berechnen, formen, kanonisch, kernel_version, rechnen

__all__ = ["KERNEL_NAME", "PROTOCOL", "berechnen", "formen", "kanonisch", "kernel_version", "rechnen"]
