// Prüfbefehle von Skizze und Hochziehen (ap-53, design.md Abschnitte 7 und 7a): `skizze befehle`,
// `skizze ablauf --zustand <n> --datei <ablauf.json>`, `skizze messen --dreiecke <n>`, `skizze lizenzen`.
// Nur Rohdaten; Urteile fällt der Test.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Lauf, MOD, adresse, oeffnen, sammler, schliessen, zeichnen } from './grundlage.mjs';
import {
  aufloesen,
  befehlAusloesen,
  imModell,
  schnappschuss,
  warteBereit,
  zielPunkt,
} from './drahtmodell.mjs';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SIEBEN = [
  'skizze.anlegen',
  'skizze.linie',
  'skizze.rechteck',
  'skizze.kreis',
  'skizze.fertig',
  'skizze.bearbeiten',
  'koerper.hochziehen',
];

/** Bildzeiten und Long Tasks in der Seite mitschreiben (für `bild_ms`, `long_tasks`). */
async function messungAnbinden(seite) {
  await seite.evaluate(() => {
    if (window.__ceeBild) return;
    const b = { zeiten: [], lang: 0, letzte: performance.now() };
    window.__ceeBild = b;
    const schleife = (t) => {
      b.zeiten.push(t - b.letzte);
      b.letzte = t;
      requestAnimationFrame(schleife);
    };
    requestAnimationFrame(schleife);
    try {
      new window.PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (e.duration >= 50) b.lang += 1;
      }).observe({ type: 'longtask', buffered: false });
    } catch {
      /* ohne Long-Task-API */
    }
  });
}

const bildStand = (seite) =>
  seite.evaluate(() => ({ n: window.__ceeBild.zeiten.length, lang: window.__ceeBild.lang }));

async function bildSeit(seite, stand) {
  return seite.evaluate(
    (s) => ({
      bild_ms: window.__ceeBild.zeiten.slice(s.n + 1),
      long_tasks: window.__ceeBild.lang - s.lang,
    }),
    stand,
  );
}

/** Bildschirmpunkt eines Zeiger-Schritts. */
async function zeigerPunkt(seite, z) {
  if (z.modell_mm) return seite.evaluate((p) => window.__cee.draht_projiziere(p), z.modell_mm);
  const id = z.element ? await aufloesen(seite, z.element) : null;
  if (z.skizze_mm) {
    const sk = id ?? (await seite.evaluate(() => window.__cee.skizze().skizze_offen));
    const lesen = () =>
      seite.evaluate(([i, uv]) => window.__cee.skizze_bildschirm(i, uv), [sk, z.skizze_mm]);
    let p = await lesen();
    if (!(await imModell(seite, p))) {
      // außerhalb: Ansicht verschieben wie von Hand (Maßstab bleibt, Fangen rechnet weiter mit 5 px/mm)
      await seite.evaluate(([i, uv]) => window.__cee.skizze_zeigen(i, uv), [sk, z.skizze_mm]);
      await zeichnen(seite);
      p = await lesen();
    }
    return p;
  }
  const typ = await seite.evaluate(
    (i) => window.__cee.draht().graph.find((e) => e.id === i)?.type ?? null,
    id,
  );
  if (typ === 'sketch') {
    // auf eine Skizze zeigen: Punkt ihres größten Bereichs, sonst Ursprung ihrer Ebene
    const b = await seite.evaluate(
      (i) => window.__cee.skizze().bereiche.find((x) => x.skizze === i)?.punkt ?? [0, 0],
      id,
    );
    return seite.evaluate(([i, uv]) => window.__cee.skizze_bildschirm(i, uv), [id, b]);
  }
  return zielPunkt(seite, { element: id });
}

async function zeigerSchritt(seite, l, z) {
  const p = await zeigerPunkt(seite, z);
  if (!p) throw new Error(`Zeigerziel nicht gefunden: ${JSON.stringify(z)}`);
  const m = seite.mouse;
  const aktion = z.aktion ?? 'bewegen';
  if (aktion === 'bewegen') await m.move(p.x, p.y);
  else if (aktion === 'klicken') {
    await m.move(p.x, p.y);
    await m.click(p.x, p.y);
  } else if (aktion === 'doppelklick') await m.dblclick(p.x, p.y);
  else if (aktion === 'druecken') {
    await m.move(p.x, p.y);
    await m.down();
  } else if (aktion === 'loslassen') {
    await m.move(p.x, p.y);
    await m.up();
  } else throw new Error(`unbekannte Zeigeraktion: ${aktion}`);
  l.eingaben += 1;
  await l.warte();
}

async function griffSchritt(seite, l, g) {
  if (g.element) {
    const id = await aufloesen(seite, g.element);
    const gewaehlt = await seite.evaluate(() => window.__cee.auswahl().map((a) => a.element_id));
    if (!(gewaehlt.length === 1 && gewaehlt[0] === id)) {
      await seite.evaluate((i) => window.__cee.skizze_waehlen(i), id);
      await l.warte();
    }
  }
  const pos = await seite.evaluate(() => window.__cee.skizze().griff);
  if (!pos) throw new Error('kein Griff sichtbar');
  const m = seite.mouse;
  await m.move(pos.x, pos.y);
  await zeichnen(seite);
  await m.down();
  const dauer = g.dauer_ms ?? 300;
  const schritte = Math.max(2, Math.round(dauer / 16));
  const t0 = Date.now();
  for (let i = 1; i <= schritte; i++) {
    const f = (g.ziehen_mm * i) / schritte;
    await m.move(pos.x + pos.dx * f, pos.y + pos.dy * f);
    const soll = t0 + (dauer * i) / schritte;
    const rest = soll - Date.now();
    if (rest > 0) await seite.waitForTimeout(rest);
  }
  await zeichnen(seite);
  if (!g.halten) await m.up();
  l.eingaben += 2;
  await l.warte();
}

async function wuerfelSchritt(seite, l, seite_) {
  const p = await seite.evaluate((s) => window.__cee.wuerfel_punkt(s), seite_);
  if (!p) throw new Error(`Ansichtswürfel: keine Seite ${seite_}`);
  await seite.mouse.click(p.x, p.y);
  l.eingaben += 1;
  await l.warte();
}

async function schritt(o, l, s, basis) {
  const seite = o.seite;
  if ('warten_ms' in s) {
    if (s.warten_ms > 0) await seite.waitForTimeout(s.warten_ms);
    return;
  }
  if (s.zeiger) return zeigerSchritt(seite, l, s.zeiger);
  if (typeof s.tippen === 'string') return l.text(s.tippen).then(() => l.warte());
  if (s.griff) return griffSchritt(seite, l, s.griff);
  if (s.klick?.wuerfel) return wuerfelSchritt(seite, l, s.klick.wuerfel);
  if (s.befehl && s.args) {
    const args = { ...s.args };
    for (const [k, v] of Object.entries(args))
      if (typeof v === 'string' && /#\d/.test(v)) args[k] = await aufloesen(seite, v);
    await seite.evaluate(([i, a]) => window.__cee.draht_befehl(i, a), [s.befehl, args]);
    return l.warte();
  }
  if (s.befehl) return befehlAusloesen(o, l, s);
  if (s.klick) {
    const p = await zielPunkt(seite, {
      ...s.klick,
      element: s.klick.element ? await aufloesen(seite, s.klick.element) : undefined,
    });
    if (!p) throw new Error(`Klickziel nicht gefunden: ${JSON.stringify(s.klick)}`);
    return l.klickPunkt(p, { modifiers: s.klick.umschalt ? ['Shift'] : [] });
  }
  if (s.eigenschaft) {
    const { element, feld, eingabe } = s.eigenschaft;
    const id = await aufloesen(seite, element);
    await seite.evaluate((i) => window.__cee.skizze_waehlen(i), id);
    await l.warte();
    return l.tippen(`[data-zone="eigenschaften"] [data-feld-eingabe="${feld}"]`, eingabe);
  }
  if (s.taste) return l.taste(s.taste);
  if (s.chat) {
    await l.tippen('[data-chat-eingabe]', s.chat);
    return;
  }
  if (s.bruecke === 'beenden') {
    await globalThis.fetch(`${basis}/kernel/test-beenden`, { method: 'POST' }).catch(() => {});
    return;
  }
  throw new Error(`unbekannter Schritt: ${JSON.stringify(s)}`);
}

async function domFelder(seite) {
  return seite.evaluate(() => {
    const ids = (sel) => [...document.querySelectorAll(sel)].map((e) => e.dataset.befehl);
    const eig = {};
    for (const f of document.querySelectorAll('[data-zone="eigenschaften"] [data-feld-eingabe]')) {
      const gruppe = f.closest('[data-gruppe]')?.dataset.gruppe ?? 'lage';
      (eig[gruppe] ??= {})[f.dataset.param ?? f.dataset.feldEingabe] = f.value;
    }
    return {
      werkzeugleiste: ids('[data-werkzeugleiste] [data-befehl]'),
      kontextleiste: ids('[data-muster="Kontextaktionen"] [data-befehl]'),
      dialoge: document.querySelectorAll('[role="dialog"], dialog[open]').length,
      eigenschaften: eig,
    };
  });
}

async function skizzenSchnappschuss(seite, extra) {
  const basis = await schnappschuss(seite, extra);
  const s = await seite.evaluate(() => window.__cee.skizze());
  const protokoll = await seite.evaluate(() =>
    window.__cee
      .ausgeloest()
      .filter((a) => a.wirkung)
      .map((a) => ({ befehl: a.befehl, weg: a.weg })),
  );
  const dom = await domFelder(seite);
  const { griff, hover_seit, bereich_wahl, ...rest } = s;
  void griff;
  void hover_seit;
  return {
    ...basis,
    ...rest,
    ...dom,
    auswahl: bereich_wahl ? [bereich_wahl.element] : basis.auswahl,
    protokoll,
  };
}

async function hoverMs(seite) {
  return seite.evaluate(() => window.__cee.skizze_hover_ms());
}

async function ablauf({ browser, basis, optionen }) {
  const schritte = JSON.parse(readFileSync(optionen.datei, 'utf8'));
  const fehler = [];
  const anfragen = [];
  sammler.anfragen = anfragen;
  const o = await oeffnen(browser, adresse(basis, optionen.zustand ?? 'skizze-leer'), fehler);
  const l = new Lauf(o.seite);
  await warteBereit(o.seite);
  await messungAnbinden(o.seite);
  const schnappschuesse = [];
  let gesehen = 0;
  for (const s of schritte) {
    const stand = await bildStand(o.seite);
    const t0 = Date.now();
    await schritt(o, l, s, basis);
    const tLos = Date.now();
    await warteBereit(o.seite);
    const bereit_ms = Date.now() - (s.griff && !s.griff.halten ? tLos : t0);
    const bild = await bildSeit(o.seite, stand);
    schnappschuesse.push(
      await skizzenSchnappschuss(o.seite, {
        bereit_ms,
        ...bild,
        hover_ms: await hoverMs(o.seite),
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

async function befehle({ browser, basis }) {
  const reg = JSON.parse(readFileSync(resolve(WURZEL, 'src/befehle.json'), 'utf8')).befehle;
  const o = await oeffnen(browser, adresse(basis, 'skizze-halter'));
  const s = o.seite;
  const l = new Lauf(s);
  await warteBereit(s);
  const register = await s.evaluate(() => window.__cee.befehle());
  const orte = Object.fromEntries(SIEBEN.map((id) => [id, []]));
  const merke = (id, ort) => orte[id] && !orte[id].includes(ort) && orte[id].push(ort);
  const ausloeser = await s.$$eval(
    '[data-zone="menueleiste"] [data-menue-trigger^="dropdown:"]',
    (x) => x.map((e) => e.dataset.menueTrigger),
  );
  for (const t of ausloeser) {
    await l.klick(`[data-menue-trigger="${t}"]`);
    for (const id of await s.$$eval('[data-zone="menueleiste"] .popup [data-befehl]', (x) =>
      x.map((e) => e.dataset.befehl),
    ))
      merke(id, 'dropdown');
    await l.taste('Escape');
  }
  for (const id of SIEBEN) {
    const titel = register.find((b) => b.id === id)?.titel_text ?? id;
    await l.taste(`${MOD}+k`);
    await s.keyboard.type(titel);
    await l.warte();
    const treffer = await s.$$eval('.suche-popup [data-befehl]', (x) =>
      x.map((e) => e.dataset.befehl),
    );
    if (treffer.includes(id)) merke(id, 'suche');
    await l.taste('Escape');
  }
  const kontext = async () => {
    for (const id of await s.$$eval('[data-muster="Kontextaktionen"] [data-befehl]', (x) =>
      x.map((e) => e.dataset.befehl),
    ))
      merke(id, 'kontextaktion');
  };
  // Ebene, Bereich, Skizze, offene Skizze (Werkzeugleiste)
  const xy = await aufloesen(s, 'frame#1>plane#1');
  // Körper verwerfen, damit Ebene und Bereiche der Skizze frei liegen
  for (const id of await s.evaluate(() =>
    window.__cee
      .draht()
      .graph.filter((e) => e.type === 'extrude')
      .map((e) => e.id),
  ))
    await s.evaluate((i) => window.__cee.draht_befehl('element.verwerfen', { element: i }), id);
  await warteBereit(s);
  await l.klickPunkt(await zielPunkt(s, { element: xy }));
  await kontext();
  await l.taste('Escape');
  const b = await s.evaluate(() => window.__cee.skizze().bereiche[0]);
  if (b) {
    const p = await s.evaluate(
      ([i, uv]) => window.__cee.skizze_bildschirm(i, uv),
      [b.skizze, b.punkt],
    );
    await l.klickPunkt(p);
    await kontext();
    await l.taste('Escape');
    await s.evaluate((i) => window.__cee.skizze_waehlen(i), b.skizze);
    await l.warte();
    await kontext();
  }
  await l.klickPunkt(await zielPunkt(s, { element: xy }));
  await l.taste('S');
  for (const id of await s.$$eval('[data-werkzeugleiste] [data-befehl]', (x) =>
    x.map((e) => e.dataset.befehl),
  ))
    merke(id, 'werkzeugleiste');
  await schliessen(o);
  return {
    befehle: SIEBEN.map((id) => {
      const r = reg.find((x) => x.id === id) ?? {};
      return {
        id,
        familie: r.familie ?? null,
        untergruppe: r.untergruppe ?? null,
        kuerzel: r.kuerzel ?? null,
        ki: r.ki === true,
        folgt: r.folgt === true,
        orte: orte[id],
      };
    }),
  };
}

async function messen({ browser, basis, optionen }) {
  const n = Number(optionen.dreiecke ?? 200000);
  const o = await oeffnen(browser, adresse(basis, 'skizze-last'));
  await warteBereit(o.seite);
  // 200 feste Zeigerpositionen (Gitter 20 × 10 in Bildkoordinaten −0,9 … 0,9)
  const pos = [];
  for (let i = 0; i < 200; i++)
    pos.push([-0.9 + ((i % 20) * 1.8) / 19, -0.9 + (Math.floor(i / 20) * 1.8) / 9]);
  const raycast_ms = await o.seite.evaluate(([k, p]) => window.__cee.skizze_messen(k, p), [n, pos]);
  await schliessen(o);
  const sortiert = [...raycast_ms].sort((a, b) => a - b);
  const median_ms = (sortiert[99] + sortiert[100]) / 2;
  return { raycast_ms, median_ms };
}

function lizenzen() {
  const pkg = JSON.parse(readFileSync(resolve(WURZEL, 'package.json'), 'utf8'));
  const lock = JSON.parse(readFileSync(resolve(WURZEL, 'package-lock.json'), 'utf8'));
  const namen = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})];
  return {
    pakete: namen.sort().map((name) => {
      const e = lock.packages?.[`node_modules/${name}`] ?? {};
      return { name, version: e.version ?? null, lizenz: e.license ?? null };
    }),
  };
}

export const skizzeBefehle = {
  async skizze(kontext) {
    const unter = kontext.positionen[0];
    if (unter === 'befehle') return befehle(kontext);
    if (unter === 'ablauf') return ablauf(kontext);
    if (unter === 'messen') return messen(kontext);
    if (unter === 'lizenzen') return lizenzen(kontext);
    throw new Error(`unbekannter Unterbefehl: ${unter}`);
  },
};
