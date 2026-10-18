/** Name der Anwendung, wie er in Titel und Hülle erscheint. */
export const APP_NAME = 'CEE';

/** Begrüßungstext der leeren Arbeitsfläche. */
export function greeting(name: string = APP_NAME): string {
  return `Willkommen bei ${name}`;
}
