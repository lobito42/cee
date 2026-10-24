// Simulierte KI (Wegwerf): erkennt wenige Absichten per Schlüsselwort, Deutsch und Englisch. Kein Modell, kein Netz
// (ADR-037). Sie ruft nur Befehle des Registers auf, und zwar erst nach der Entscheidungskarte (ADR-021).
import type { App, Vorschlag } from './app';
import { groesseText } from './ui/format';
import { wert, type Element } from './modell/element';
import { mm } from './modell/element';

const NAMEN: [RegExp, string][] = [
  [/\bsteg\b|\brib\b|\bweb\b/, 'steg'],
  [/grundplatte|base ?plate|\bbase\b/, 'grundplatte'],
  [/bohrung|\bholes?\b/, 'bohrungen'],
  [/deckel|\blid\b/, 'deckel'],
  [/gehäuse|gehaeuse|\bhousing\b/, 'gehaeuse'],
];

const MASSE: [RegExp, string][] = [
  [/dick|thick/, 'dicke'],
  [/hoch|höher|hoeher|höhe|hoehe|tall|high|height/, 'hoehe'],
  [/lang|länge|laenge|long|length/, 'laenge'],
  [/breit|wide|width/, 'breite'],
  [/durchmesser|diameter|ø/, 'durchmesser'],
  [/radius|rund|round/, 'eckradius'],
];

function ziel(app: App, s: string): Element | undefined {
  for (const [r, id] of NAMEN) if (r.test(s)) return app.find(id);
  return app.gewaehlteElemente()[0];
}

function primaerParameter(e: Element): string | undefined {
  return ['dicke', 'hoehe', 'durchmesser'].find((p) => e.params[p] !== undefined);
}

export function vorschlagWert(app: App, e: Element, name: string, mmWert: number): Vorschlag {
  const vorher = groesseText(e.params[name], app.sprache);
  const nachher = groesseText(mm(mmWert), app.sprache);
  return {
    titel: app.t('chat.vorschlag.wert', {
      element: e.meta.name,
      feld: app.t(`feld.${name}`),
      nachher,
    }),
    begruendung: app.t('chat.vorschlag.begruendung'),
    werte: [{ feld: app.t(`feld.${name}`), vorher, nachher }],
    befehle: [{ id: 'element.wert-setzen', parameter: { element: e.id, name, wert: mm(mmWert) } }],
    ziel: e.id,
  };
}

function einfach(
  app: App,
  titelSchluessel: string,
  e: Element | undefined,
  id: string,
  parameter: Record<string, unknown>,
): Vorschlag {
  return {
    titel: app.t(titelSchluessel, { element: e?.meta.name ?? '' }),
    begruendung: app.t('chat.vorschlag.begruendung'),
    werte: [],
    befehle: [{ id, parameter }],
    ziel: e?.id ?? '',
  };
}

/** Erkennt die Absicht; `null`, wenn keine passt (dann erklärt der Chat Beispiele). */
export function erkenne(app: App, text: string): Vorschlag | null {
  const s = text.toLowerCase();
  const e = ziel(app, s);
  const zahl = /(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(s);
  if (zahl && e) {
    const faktor = { mm: 1, cm: 10, m: 1000 }[zahl[2] as 'mm' | 'cm' | 'm'];
    const wertMm = Number((zahl[1] as string).replace(',', '.')) * faktor;
    const dim = MASSE.find(([r]) => r.test(s))?.[1] ?? primaerParameter(e);
    if (dim && e.params[dim] !== undefined) return vorschlagWert(app, e, dim, wertMm);
  }
  if (/dupliz|kopie|kopier|copy|clone/.test(s) && e)
    return einfach(app, 'chat.vorschlag.duplizieren', e, 'element.duplizieren', { element: e.id });
  if (/verwirf|wirf .*weg|entfern|lösch|loesch|discard|remove|delete/.test(s) && e)
    return einfach(app, 'chat.vorschlag.verwerfen', e, 'element.verwerfen', { element: e.id });
  if (/\banlegen\b|leg .*an|neues|neue |create|new /.test(s)) {
    const typ = /baugruppe|assembly/.test(s) ? 'baugruppe' : 'teil';
    return einfach(app, 'chat.vorschlag.anlegen', undefined, 'element.anlegen', { typ });
  }
  return null;
}

export function wirkungenRegistrieren(app: App): void {
  app.registriere('chat.senden', (par) => {
    const text = (typeof par.text === 'string' ? par.text : app.chat.eingabe).trim();
    if (!text) return false;
    app.chat.nachrichten.push({ von: 'person', text });
    app.chat.eingabe = '';
    const v = erkenne(app, text);
    if (v) {
      app.chat.vorschlag = v;
      app.chat.nachrichten.push({ von: 'ki', text: '', schluessel: 'chat.antwort.vorschlag' });
    } else {
      app.chat.vorschlag = null;
      app.chat.nachrichten.push({ von: 'ki', text: '', schluessel: 'chat.antwort.unklar' });
    }
  });
  app.registriere('chat.uebernehmen', () => {
    const v = app.chat.vorschlag;
    if (!v) return false;
    app.chat.vorschlag = null;
    for (const b of v.befehle) app.ausfuehren(b.id, b.parameter, 'chat', 'ki');
    app.chat.nachrichten.push({ von: 'ki', text: '', schluessel: 'chat.antwort.erledigt' });
  });
  app.registriere('chat.verwerfen', () => {
    app.chat.vorschlag = null;
    app.chat.nachrichten.push({ von: 'ki', text: '', schluessel: 'chat.antwort.verworfen' });
  });
}

void wert;
