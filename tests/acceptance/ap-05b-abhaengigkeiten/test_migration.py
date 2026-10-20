"""AK-5 und AK-6: Migrationen (Capability `graph-kern`)."""

from __future__ import annotations

import json

from graphctl5b import ctl, ctl_json, element, flat, make_doc


def _v1(tmp_path, n=100):
    return make_doc(tmp_path, [element(f"e{i}", meta={"name": f"Teil {i}"}) for i in range(n)])


def test_beispiel_migration(tmp_path):
    """Requirement Migrationen / Beispiel-Migration: Version 2, meta.name -> meta.title, 100 Elemente."""
    doc = _v1(tmp_path)
    res = ctl_json("migrate", doc, "--out", tmp_path / "m.doc", demo=True)
    assert (res["before"], res["after"]) == (1, 2)
    exp = ctl_json("export", tmp_path / "m.doc", demo=True)
    assert exp["schema_version"] == 2
    els = list(flat(exp["elements"]))
    assert len(els) == 100
    for e in els:
        assert e["meta"].get("title") == f"Teil {e['id'][1:]}" and "name" not in e["meta"], e


def test_idempotent_und_konvergent(tmp_path):
    """Requirement Migrationen / Idempotent und konvergent: zwei Kopien offline, ein Dokument zweimal."""
    doc = _v1(tmp_path)
    ctl_json("migrate", doc, "--out", tmp_path / "single.doc", demo=True)
    ctl_json("migrate", doc, "--out", tmp_path / "l.doc", demo=True)
    ctl_json("migrate", doc, "--out", tmp_path / "r.doc", demo=True)
    ctl_json("merge", tmp_path / "l.doc", tmp_path / "r.doc", "--out", tmp_path / "lr.doc", demo=True)
    ctl_json("migrate", doc, "--out", tmp_path / "once.doc", demo=True)
    ctl_json("migrate", doc, "--out", tmp_path / "again.doc", demo=True)  # dasselbe v1-Dokument zweimal
    ctl_json("migrate", tmp_path / "single.doc", "--out", tmp_path / "twice.doc", demo=True)  # v2 -> v2
    want = ctl_json("hash", tmp_path / "single.doc", demo=True)
    assert ctl_json("hash", tmp_path / "lr.doc", demo=True) == want
    assert ctl_json("hash", tmp_path / "twice.doc", demo=True) == want
    assert ctl_json("hash", tmp_path / "once.doc", demo=True) == ctl_json(
        "hash", tmp_path / "again.doc", demo=True
    )
    assert ctl_json("hash", tmp_path / "again.doc", demo=True) == want


def test_zu_neue_version(tmp_path):
    """Requirement Migrationen / Zu neue Version: `schema_too_new`, Bytes unverändert (Kern ohne Feature)."""
    doc = _v1(tmp_path, 10)
    ctl_json("migrate", doc, "--out", tmp_path / "v2.doc", demo=True)
    raw = (tmp_path / "v2.doc").read_bytes()
    for cmd in ("hash", "export", "validate"):
        res = ctl(cmd, tmp_path / "v2.doc")
        assert res.returncode != 0, cmd
        assert json.loads(res.stdout)["error"] == "schema_too_new", (cmd, res.stdout, res.stderr)
    res = ctl("migrate", tmp_path / "v2.doc", "--out", tmp_path / "x.doc")
    assert res.returncode != 0 and json.loads(res.stdout)["error"] == "schema_too_new"
    assert (tmp_path / "v2.doc").read_bytes() == raw


def test_v1_dokument_bleibt_ohne_feature_unveraendert(tmp_path):
    """Requirement Migrationen: die aktuelle Version bleibt 1, `migrate` ändert nichts."""
    doc = _v1(tmp_path, 10)
    res = ctl_json("migrate", doc, "--out", tmp_path / "m.doc")
    assert (res["before"], res["after"]) == (1, 1)
    assert ctl_json("hash", tmp_path / "m.doc") == ctl_json("hash", doc)
