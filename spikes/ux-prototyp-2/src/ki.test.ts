import { describe, expect, it } from 'vitest';
import { App } from './app';
import { uebersetzer } from './i18n';
import { erkenne } from './ki';
import { wirkungenRegistrieren } from './wirkungen';
import { wirkungenRegistrieren as kiRegistrieren } from './ki';

const neueApp = () => {
  const app = new App(uebersetzer('de'), 'de', 0);
  wirkungenRegistrieren(app);
  kiRegistrieren(app);
  return app;
};

describe('Simulierte KI', () => {
  it('Höhe des Stegs: ein Vorschlag mit genau einem Befehl', () => {
    const v = erkenne(neueApp(), 'Der Steg soll 40 mm hoch werden');
    expect(v?.befehle).toEqual([
      {
        id: 'element.wert-setzen',
        parameter: { element: 'steg', name: 'hoehe', wert: { value: 40, unit: 'mm' } },
      },
    ]);
    expect(v?.werte[0]).toMatchObject({ vorher: '30 mm', nachher: '40 mm' });
  });

  it('Dicke der Grundplatte, Duplizieren, Verwerfen und Anlegen', () => {
    const app = neueApp();
    expect(erkenne(app, 'Grundplatte 12 mm dick')?.befehle[0]?.parameter).toMatchObject({
      element: 'grundplatte',
      name: 'dicke',
    });
    expect(erkenne(app, 'Dupliziere den Steg')?.befehle[0]?.id).toBe('element.duplizieren');
    expect(erkenne(app, 'Verwirf den Steg')?.befehle[0]?.id).toBe('element.verwerfen');
    expect(erkenne(app, 'Lege ein neues Teil an')?.befehle[0]).toEqual({
      id: 'element.anlegen',
      parameter: { typ: 'teil' },
    });
  });

  it('Unverständliches ergibt keinen Vorschlag', () => {
    expect(erkenne(neueApp(), 'Wie wird das Wetter?')).toBeNull();
  });

  it('Übernehmen ruft denselben Befehl mit Quelle ki auf, genau ein Eintrag', () => {
    const app = neueApp();
    app.chat.eingabe = 'Der Steg soll 40 mm hoch werden';
    app.ausfuehren('chat.senden', {}, 'chat');
    expect(app.chat.vorschlag).not.toBeNull();
    app.ausfuehren('chat.uebernehmen', {}, 'chat');
    expect(app.protokoll).toHaveLength(1);
    expect(app.protokoll[0]).toMatchObject({
      befehl: 'element.wert-setzen',
      quelle: 'ki',
      weg: 'chat',
    });
    expect(app.verlaufLaenge()).toBe(1);
  });
});
