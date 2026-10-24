// Prüfbefehl `messen`: Reaktionszeiten. Gemessen wird im Browser vom Zeitstempel der Eingabe bis zum zweiten
// requestAnimationFrame nach dem erwarteten Ergebnis („gezeichnet“); je Kennzahl mindestens 20 Messungen.
import { MOD, Lauf, adresse, lies, oeffnen, schliessen } from './grundlage.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;
const mitteVon = (r) => ({ x: r.x + r.breite / 2, y: r.y + r.hoehe / 2 });
const N = 40;
/** Aufwärmläufe vor der Messung (Übersetzung des Skripts, erste Zeichnung); sie zählen nicht. */
const WARM = 6;

/** Richtet die Messung ein: Start beim ersten Ereignis `ereignis`, Ende nach `bedingung` und zwei Bildern. */
const einrichten = (seite, ereignis, bedingung) =>
  seite.evaluate(
    ([typ, text]) => {
      window.__t0 = null;
      const merken = (e) => {
        if (window.__t0 === null) window.__t0 = e.timeStamp;
      };
      window.addEventListener(typ, merken, { capture: true, once: true });
      const pruefen = new Function(`return (${text})();`);
      window.__fertig = new Promise((aufloesen) => {
        const schritt = () => {
          if (window.__t0 !== null && pruefen()) {
            requestAnimationFrame(() =>
              requestAnimationFrame(() => aufloesen(performance.now() - window.__t0)),
            );
          } else requestAnimationFrame(schritt);
        };
        schritt();
      });
    },
    [ereignis, bedingung],
  );

const ergebnis = (seite) => seite.evaluate(() => window.__fertig);

async function messreihe(o, l, wiederholungen, eingabe) {
  const roh = [];
  for (let i = 0; i < wiederholungen + WARM; i++) {
    const { ereignis, bedingung, tun, danach } = await eingabe(i);
    await einrichten(o.seite, ereignis, bedingung);
    await tun();
    const ms = Math.round((await ergebnis(o.seite)) * 100) / 100;
    if (i >= WARM) roh.push(ms);
    await l.warte();
    await danach?.();
  }
  return { roh_ms: roh };
}

const ausgewaehlt = (id, name) => `() => {
  const z = document.querySelector('[data-zone="struktur"] [role="treeitem"][data-id="${id}"]');
  const k = [...document.querySelectorAll('[data-zone="modell"] path[data-kontur-id="${id}"]')].some(p => p.dataset.zustand === 'ausgewaehlt');
  const e = document.querySelector('[data-zone="eigenschaften"] .zonenkopf h2')?.textContent.trim() === '${name}';
  const c = document.querySelector('[data-chat-kontext] .chip')?.textContent.trim() === '${name}';
  return z?.getAttribute('aria-selected') === 'true' && k && e && c;
}`;

async function auswahl(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const r = await messreihe(o, l, N, (i) => {
    const id = i % 2 === 0 ? 'steg' : 'grundplatte';
    const name = i % 2 === 0 ? 'Steg' : 'Grundplatte';
    return {
      ereignis: 'pointerdown',
      bedingung: ausgewaehlt(id, name),
      tun: async () => o.seite.click(ZEILE(id)),
    };
  });
  await schliessen(o);
  return r;
}

async function hover(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const ids = ['steg', 'grundplatte', 'bohrungen'];
  const r = await messreihe(o, l, N, (i) => {
    const id = ids[i % ids.length];
    return {
      ereignis: 'pointermove',
      bedingung: `() => [...document.querySelectorAll('[data-zone="modell"] path[data-kontur-id="${id}"]')].some(p => p.dataset.zustand === 'hover')`,
      tun: async () => {
        const p = mitteVon(await lies.rechteck(o.seite, ZEILE(id)));
        await o.seite.mouse.move(p.x, p.y);
      },
    };
  });
  await schliessen(o);
  return r;
}

async function kontextmenue(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const r = await messreihe(o, l, N, (i) => ({
    ereignis: 'pointerdown',
    bedingung: `() => !!document.querySelector('.kontextmenue [data-befehl]')`,
    tun: async () =>
      o.seite.click(ZEILE(i % 2 === 0 ? 'steg' : 'grundplatte'), { button: 'right' }),
    danach: async () => o.seite.keyboard.press('Escape'),
  }));
  await schliessen(o);
  return r;
}

async function ablegen(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  await l.klick('[role="tab"]:has-text("Sensorgehäuse")');
  const r = await messreihe(o, l, N, (i) => {
    const hinein = i % 2 === 0;
    return {
      ereignis: 'pointerup',
      bedingung: `() => document.querySelector('[data-zone="struktur"] [role="treeitem"][data-id="deckel"]')?.dataset.ebene === '${hinein ? 1 : 0}'`,
      tun: async () => {
        const s = o.seite;
        const von = mitteVon(await lies.rechteck(s, ZEILE('deckel')));
        const nach = hinein
          ? mitteVon(await lies.rechteck(s, ZEILE('baugruppe-1')))
          : mitteVon(await lies.rechteck(s, '[data-zone="struktur"] .wurzel'));
        await s.mouse.move(von.x, von.y);
        await s.mouse.down();
        await s.mouse.move(von.x + 8, von.y + 8, { steps: 2 });
        await s.mouse.move(nach.x, nach.y, { steps: 4 });
        await s.mouse.up();
      },
    };
  });
  await schliessen(o);
  return r;
}

async function wertLive(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  await l.klick(ZEILE('grundplatte'));
  await l.klick('[data-feld-eingabe="laenge"]');
  const roh = [];
  const runden = ['1', '2', '3'];
  for (let k = 0; k < Math.ceil(N / 3) + 2; k++) {
    await o.seite.keyboard.press(`${MOD}+a`);
    for (const ziffer of runden) {
      const vorher = await o.seite.evaluate(() => window.__cee.teil().volumen_mm3);
      await einrichten(
        o.seite,
        'keydown',
        `() => window.__cee.teil().volumen_mm3 !== ${vorher} && !!document.querySelector('[data-feld-eingabe="laenge"]')`,
      );
      await o.seite.keyboard.press(ziffer);
      const ms = Math.round((await ergebnis(o.seite)) * 100) / 100;
      if (k >= 2) roh.push(ms);
    }
  }
  await schliessen(o);
  return { roh_ms: roh };
}

async function suche(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  await l.taste(`${MOD}+k`);
  const roh = [];
  const woerter = [
    'hilfe',
    'ansicht',
    'bearbeiten',
    'auswahl',
    'element',
    'sichtbarkeit',
    'fenster',
  ];
  for (const wort of woerter) {
    await o.seite.keyboard.press(`${MOD}+a`);
    await o.seite.keyboard.press('Backspace');
    let text = '';
    for (const z of wort) {
      text += z;
      await einrichten(
        o.seite,
        'keydown',
        `() => document.querySelector('.suche-popup .ergebnisse')?.dataset.text === '${text}'`,
      );
      await o.seite.keyboard.press(z);
      const ms = Math.round((await ergebnis(o.seite)) * 100) / 100;
      if (wort !== 'hilfe') roh.push(ms);
    }
  }
  await schliessen(o);
  return { roh_ms: roh };
}

export const messBefehle = {
  async messen({ browser, basis }) {
    return {
      auswahl: await auswahl(browser, basis),
      hover: await hover(browser, basis),
      kontextmenue: await kontextmenue(browser, basis),
      ablegen: await ablegen(browser, basis),
      wert_live: await wertLive(browser, basis),
      suche: await suche(browser, basis),
    };
  },
};
