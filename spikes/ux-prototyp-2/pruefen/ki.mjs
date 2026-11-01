// Prüfbefehle der KI-Konstruktion (ap-52, design.md Abschnitte 5 und 6): `ki werkzeuge`, `ki anbieter`,
// `ki ablauf --zustand <n> --datei <ablauf.json>`, `ki pruefsatz --datei <pfad> --anbieter <id> [--wiederholungen n]`.
// Nur Rohdaten (und für den Prüfsatz die Prüfer am Graphen, ADR-053); Urteile der Abnahme fällt der Test.
import { readFileSync } from 'node:fs';
import { Lauf, adresse, oeffnen, sammler, schliessen } from './grundlage.mjs';
import { schnappschuss, schrittAusfuehren, warteBereit } from './drahtmodell.mjs';

const kiDaten = (seite) => seite.evaluate(() => window.__cee.ki());

async function kiAnfragen(basis) {
  try {
    const r = await globalThis.fetch(`${basis}/ki/anfragen`);
    return r.ok ? await r.json() : [];
  } catch {
    return [];
  }
}

async function warteKi(seite, ms = 300_000) {
  await seite.waitForFunction(() => !window.__cee.ki().beschaeftigt, null, {
    polling: 10,
    timeout: ms,
  });
}

/** Satz wie ein Mensch eintippen und senden; zurück, sobald Karte oder Antwort da ist. */
async function senden(seite, satz) {
  const vorher = (await kiDaten(seite)).nachrichten.length;
  const t0 = Date.now();
  await seite.fill('[data-chat-eingabe]', satz);
  await seite.click('[data-chat-senden]');
  await seite.waitForFunction(
    (n) => {
      const k = window.__cee.ki();
      return !k.beschaeftigt && k.nachrichten.length >= n + 2;
    },
    vorher,
    { polling: 10, timeout: 300_000 },
  );
  await warteBereit(seite);
  return Date.now() - t0;
}

/** chat.uebernehmen / chat.verwerfen: Knopf der Karte wie ein Mensch, sonst über das Register. */
async function chatBefehl(o, l, schritt) {
  const s = o.seite;
  const knopf = s.locator(`[data-zone="chat"] [data-befehl="${schritt.befehl}"]`).last();
  if (!schritt.args && (await knopf.count()) > 0 && (await knopf.isVisible())) {
    await knopf.click();
    l.eingaben += 1;
  } else
    await s.evaluate(
      ([i, a]) => window.__cee.draht_befehl(i, a),
      [schritt.befehl, schritt.args ?? {}],
    );
  await warteKi(s);
}

async function kiSchritt(o, l, schritt, basis) {
  if ('chat' in schritt) return senden(o.seite, schritt.chat);
  if (schritt.befehl === 'chat.uebernehmen' || schritt.befehl === 'chat.verwerfen')
    await chatBefehl(o, l, schritt);
  else if (schritt.befehl === 'ki.anbieter-waehlen') {
    await o.seite.evaluate(
      ([i, a]) => window.__cee.draht_befehl(i, a),
      [schritt.befehl, schritt.args ?? {}],
    );
    await o.seite.waitForTimeout(20);
    await warteKi(o.seite);
  } else await schrittAusfuehren(o, l, schritt, basis);
  return null;
}

async function kiSchnappschuss(seite, basis, extra) {
  const k = await kiDaten(seite);
  return schnappschuss(seite, {
    chat: { kopf: k.kopf, nachrichten: k.nachrichten, karten: k.karten },
    geister: k.geister,
    verlauf: k.verlauf,
    // Aktionsprotokoll (ap-41b, design.md 7a von ap-53): ausgelöste Befehle mit Wirkung
    protokoll: await seite.evaluate(() =>
      window.__cee
        .ausgeloest()
        .filter((a) => a.wirkung)
        .map((a) => ({ befehl: a.befehl, weg: a.weg })),
    ),
    ki_anfragen: await kiAnfragen(basis),
    ...extra,
  });
}

async function ablauf({ browser, basis, optionen }) {
  const schritte = JSON.parse(readFileSync(optionen.datei, 'utf8'));
  const fehler = [];
  const anfragen = [];
  sammler.anfragen = anfragen;
  const o = await oeffnen(browser, adresse(basis, optionen.zustand ?? 'drahtmodell-leer'), fehler);
  const l = new Lauf(o.seite);
  await warteBereit(o.seite);
  const schnappschuesse = [];
  let gesehen = 0;
  for (const schritt of schritte) {
    const t0 = Date.now();
    const kiMs = await kiSchritt(o, l, schritt, basis);
    await warteBereit(o.seite);
    schnappschuesse.push(
      await kiSchnappschuss(o.seite, basis, {
        bereit_ms: Date.now() - t0,
        ki_bereit_ms: kiMs,
        anfragen: anfragen.slice(gesehen),
        konsolenfehler: [...fehler],
        ursprung: basis,
      }),
    );
    gesehen = anfragen.length;
  }
  await schliessen(o);
  sammler.anfragen = null;
  return { schnappschuesse };
}

async function werkzeuge({ browser, basis }) {
  const o = await oeffnen(browser, adresse(basis, 'drahtmodell-leer'));
  const liste = await o.seite.evaluate(() => window.__cee.ki_werkzeuge());
  await schliessen(o);
  return { werkzeuge: liste };
}

async function anbieter({ basis }) {
  const r = await globalThis.fetch(`${basis}/ki/anbieter`);
  return r.json();
}

// --- Prüfsatz (design.md Abschnitt 5): Prüfer am Graphen und am Ergebnis des Workers -------------------

const TOL_MM = 1e-6;
const TOL_RAD = 1e-9;

function flach(graph) {
  const aus = {};
  const rein = (e) => {
    aus[e.id] = e;
    for (const k of e.content ?? []) if (k && typeof k === 'object') rein(k);
  };
  for (const e of graph) rein(e);
  return aus;
}

function wurzelIds(graph) {
  const f = flach(graph);
  const kinder = new Set(
    Object.values(f).flatMap((e) =>
      (e.content ?? []).map((k) => (typeof k === 'string' ? k : k.id)),
    ),
  );
  return new Set(Object.keys(f).filter((i) => !kinder.has(i)));
}

function neueWurzeln(vorher, nachher) {
  const alt = new Set(Object.keys(flach(vorher.graph)));
  const g = flach(nachher.graph);
  const w = wurzelIds(nachher.graph);
  return Object.keys(g)
    .filter((i) => w.has(i) && !alt.has(i))
    .map((i) => g[i]);
}

const nameVon = (e) =>
  [e, e.meta ?? {}, e.params ?? {}].find((q) => typeof q?.name === 'string')?.name ?? '';

function nachNamen(snap, name) {
  const t = Object.values(flach(snap.graph)).filter((e) => nameVon(e) === name || e.id === name);
  if (t.length !== 1) throw new Error(`Element „${name}“: ${t.length} Treffer`);
  return t[0];
}

function ausgang(ergebnis, id, name) {
  const r = ergebnis.results.find((x) => x.id === id);
  if (!r) throw new Error(`kein Ergebnis für ${id}`);
  const o = r.outputs[name];
  if (!o) throw new Error(`kein Ausgang ${name} an ${id}`);
  return o;
}

const vec = (l, einheit = 'mm') => {
  if (!Array.isArray(l) || l.length !== 3) throw new Error('kein Vektor');
  return l.map((g) => {
    if (g.unit !== einheit) throw new Error(`Einheit ${g.unit} statt ${einheit}`);
    return Number(g.value);
  });
};
const pos = (erg, id, name = 'point') => vec(ausgang(erg, id, name).position);
const skalar = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const kreuz = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const betrag = (a) => Math.sqrt(skalar(a, a));
const winkel = (a, b) => Math.atan2(betrag(kreuz(a, b)), skalar(a, b));
const nahe = (a, b, tol = TOL_MM) =>
  a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) <= tol);
const verworfen = (e) => !!(e.meta?.verworfen || e.verworfen);
const kanon = (x) =>
  JSON.stringify(x, (_k, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
      : v,
  );
const eckeId = (v) => String(v).split('.')[0];
const r6 = (v) => v.map((x) => Math.round(x * 1e6) / 1e6);

export function prueferPruefen(aufgabe, vorher, nachher) {
  const gruende = [];
  const neu = neueWurzeln(vorher, nachher);
  const neuTyp = {};
  for (const e of neu) (neuTyp[e.type] ??= []).push(e);
  const g = flach(nachher.graph);
  const erg = nachher.ergebnis;
  const fehl = (t) => gruende.push(`${aufgabe.id}: ${t}`);
  for (const p of aufgabe.pruefer) {
    const art = p.art;
    try {
      if (art === 'neu') {
        const ist = Object.fromEntries(Object.entries(neuTyp).map(([t, v]) => [t, v.length]));
        if (kanon(ist) !== kanon(p.anzahl))
          fehl(`neue Elemente ${kanon(ist)}, erwartet ${kanon(p.anzahl)}`);
      } else if (art === 'kinder') {
        for (const e of neuTyp[p.typ] ?? [])
          if ((e.content ?? []).length !== p.anzahl)
            fehl(`${p.typ} hat ${(e.content ?? []).length} Kinder statt ${p.anzahl}`);
      } else if (art === 'frame_ursprung_mm') {
        for (const e of neuTyp.frame ?? [])
          if (!nahe(pos(erg, e.id, 'origin'), p.lage))
            fehl(`Ursprung ${r6(pos(erg, e.id, 'origin'))}`);
      } else if (art === 'frame_x_richtung') {
        const w = (p.rz_grad * Math.PI) / 180;
        const soll = [Math.cos(w), Math.sin(w), 0];
        for (const e of neuTyp.frame ?? []) {
          const ist = vec(ausgang(erg, e.id, 'x').direction, '1');
          if (winkel(ist, soll) > TOL_RAD) fehl(`x-Achse ${r6(ist)}`);
        }
      } else if (art === 'punkt_lage_mm') {
        for (const e of neuTyp.point ?? [])
          if (!nahe(pos(erg, e.id), p.lage)) fehl(`Punkt bei ${r6(pos(erg, e.id))}`);
      } else if (
        [
          'umlauf',
          'laengen_sortiert_mm',
          'benachbart_senkrecht',
          'ecken_z_mm',
          'punkt_ueber_mitte',
        ].includes(art)
      ) {
        const kanten = neuTyp.segment ?? [];
        const punkte = Object.fromEntries((neuTyp.point ?? []).map((e) => [e.id, e]));
        const enden = kanten.map((k) => [eckeId(k.inputs.a), eckeId(k.inputs.b)]);
        const grad = {};
        for (const [a, b] of enden) {
          grad[a] = (grad[a] ?? 0) + 1;
          grad[b] = (grad[b] ?? 0) + 1;
        }
        const ecken = Object.keys(grad);
        const kante = (k) => {
          const o = ausgang(nachher.ergebnis, k.id, k.type);
          return [vec(o.start), vec(o.end)];
        };
        if (art === 'umlauf') {
          const grade = new Set(Object.values(grad));
          if (
            ecken.length !== p.ecken ||
            grade.size !== 1 ||
            !grade.has(2) ||
            !ecken.every((i) => i in punkte)
          )
            fehl(`kein Umlauf über ${p.ecken} Eckpunkte: Grade ${kanon(grad)}`);
          else {
            const stand = new Set(enden[0] ? [enden[0][0]] : []);
            let rest = [...enden];
            for (;;) {
              const weiter = rest.filter((k) => stand.has(k[0]) || stand.has(k[1]));
              if (!weiter.length) break;
              for (const k of weiter) {
                stand.add(k[0]);
                stand.add(k[1]);
              }
              rest = rest.filter((k) => !weiter.includes(k));
            }
            if (rest.length) fehl('Strecken bilden mehr als einen Umlauf');
          }
        } else if (art === 'laengen_sortiert_mm') {
          const ls = kanten
            .map((k) => {
              const [a, b] = kante(k);
              return betrag(b.map((x, i) => x - a[i]));
            })
            .sort((x, y) => x - y);
          if (ls.length !== p.werte.length || !nahe(ls, p.werte)) fehl(`Längen ${r6(ls)}`);
        } else if (art === 'benachbart_senkrecht') {
          for (const ecke of ecken) {
            const d = [];
            kanten.forEach((k, i) => {
              const [a, b] = enden[i];
              if (ecke === a || ecke === b) {
                const [s0, s1] = kante(k);
                d.push(s1.map((x, j) => x - s0[j]));
              }
            });
            if (d.length === 2 && Math.abs(winkel(d[0], d[1]) - Math.PI / 2) > TOL_RAD)
              fehl(`Ecke ${ecke} nicht senkrecht`);
          }
        } else if (art === 'ecken_z_mm') {
          for (const ecke of ecken)
            if (Math.abs(pos(erg, ecke)[2] - p.wert) > TOL_MM)
              fehl(`Ecke ${ecke} bei z = ${pos(erg, ecke)[2]}`);
        } else {
          const frei = Object.keys(punkte).filter((i) => !(i in grad));
          if (frei.length !== 1 || ecken.length !== 4)
            fehl(`${frei.length} freie Punkte, ${ecken.length} Ecken`);
          else {
            const mitte = [0, 1, 2].map((k) => ecken.reduce((s, i) => s + pos(erg, i)[k], 0) / 4);
            const soll = mitte.map((m, k) => m + p.abstand_mm * p.richtung[k]);
            if (!nahe(pos(erg, frei[0]), soll))
              fehl(`Punkt bei ${r6(pos(erg, frei[0]))}, erwartet ${r6(soll)}`);
          }
        }
      } else if (art === 'punkt_relativ') {
        const ref = nachNamen(vorher, eckeId(p.ref));
        for (const e of neuTyp.point ?? []) {
          const soll = `${ref.id}.${p.ref.split('.')[1]}`;
          if (e.inputs?.ref !== soll)
            fehl(`Punkt hat ref = ${JSON.stringify(e.inputs?.ref ?? null)}`);
          const s = pos(vorher.ergebnis, ref.id).map((x, i) => x + p.versatz_mm[i]);
          if (!nahe(pos(erg, e.id), s)) fehl(`Punkt bei ${r6(pos(erg, e.id))}, erwartet ${r6(s)}`);
        }
      } else if (art === 'halbgerade_bezug') {
        const ref = nachNamen(vorher, eckeId(p.a));
        const pk = neuTyp.point ?? [];
        for (const e of neuTyp.ray ?? []) {
          if (e.inputs?.a !== `${ref.id}.point`)
            fehl(`Halbgerade a = ${JSON.stringify(e.inputs?.a)}`);
          if (pk.length !== 1 || e.inputs?.b !== `${pk[0].id}.point`)
            fehl(`Halbgerade b = ${JSON.stringify(e.inputs?.b)}`);
        }
      } else if (art === 'verworfen' || art === 'ausgeblendet') {
        const zeilen = Object.fromEntries(nachher.struktur.map((z) => [z.id, z]));
        for (const name of p.namen) {
          const i = nachNamen(vorher, name).id;
          let markiert = (zeilen[i]?.zustaende ?? []).includes(art);
          if (art === 'verworfen') markiert = markiert || verworfen(g[i] ?? {});
          if (!markiert) fehl(`${name} nicht ${art}`);
        }
      } else if (art === 'keine_befunde') {
        if (nachher.befunde.length) fehl(`Befunde ${kanon(nachher.befunde)}`);
      } else if (art === 'uebrige_unveraendert') {
        for (const [i, alt] of Object.entries(flach(vorher.graph))) {
          const a = JSON.parse(kanon(alt));
          const b = JSON.parse(kanon(g[i] ?? {}));
          for (const x of [a, b]) if (x.meta) delete x.meta.verworfen;
          if (kanon(a) !== kanon(b)) fehl(`Element ${i} verändert`);
        }
      } else fehl(`unbekannter Prüfer ${art}`);
    } catch (x) {
      fehl(`Prüfer ${art} nicht auswertbar: ${x.message ?? x}`);
    }
  }
  return gruende;
}

async function pruefsatz({ browser, basis, optionen }) {
  const daten = JSON.parse(readFileSync(optionen.datei, 'utf8'));
  const id = optionen.anbieter ?? 'regel';
  const n = Math.max(1, Number(optionen.wiederholungen ?? 1) || 1);
  const info = await anbieter({ basis });
  const eintrag = info.anbieter.find((a) => a.id === id);
  const aufgaben = [];
  for (const a of daten.aufgaben) {
    const gruende = [];
    let erfolge = 0;
    for (let w = 0; w < n; w++) {
      const o = await oeffnen(browser, adresse(basis, a.zustand), []);
      const l = new Lauf(o.seite);
      await warteBereit(o.seite);
      if (id !== 'regel')
        await kiSchritt(o, l, { befehl: 'ki.anbieter-waehlen', args: { id } }, basis);
      const vorher = await kiSchnappschuss(o.seite, basis, {});
      await senden(o.seite, a.satz);
      const k = await kiDaten(o.seite);
      const karte = k.karten.find((x) => x.offen);
      if (!karte) {
        gruende.push(`${a.id}: keine Karte (Antwort: ${k.nachrichten.at(-1)?.text ?? ''})`);
        await schliessen(o);
        continue;
      }
      if (karte.anbieter !== id) gruende.push(`${a.id}: Karte vom Anbieter ${karte.anbieter}`);
      await chatBefehl(o, l, { befehl: 'chat.uebernehmen' });
      await warteBereit(o.seite);
      const nachher = await kiSchnappschuss(o.seite, basis, {});
      const g = prueferPruefen(a, vorher, nachher);
      if (!g.length && karte.anbieter === id) erfolge += 1;
      gruende.push(...g);
      await schliessen(o);
    }
    aufgaben.push({ id: a.id, bestanden: erfolge === n, versuche: n, erfolge, gruende });
  }
  return {
    anbieter: id,
    ...(id !== 'regel' && eintrag?.modell ? { modell: eintrag.modell } : {}),
    aufgaben,
    bestanden: aufgaben.filter((a) => a.bestanden).length,
    gesamt: aufgaben.length,
  };
}

export const kiBefehle = {
  async ki(kontext) {
    const unter = kontext.positionen[0];
    if (unter === 'werkzeuge') return werkzeuge(kontext);
    if (unter === 'anbieter') return anbieter(kontext);
    if (unter === 'ablauf') return ablauf(kontext);
    if (unter === 'pruefsatz') return pruefsatz(kontext);
    throw new Error(`unbekannter Unterbefehl: ki ${unter}`);
  },
};
