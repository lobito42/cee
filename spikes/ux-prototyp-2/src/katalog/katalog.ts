// Bausteinkatalog (`/?katalog`): folgt in Gruppe 6.
import type { Uebersetzer } from '../i18n';

export async function ladeKatalog(
  wurzel: HTMLElement,
  _baustein: string,
  t: Uebersetzer,
): Promise<void> {
  wurzel.textContent = t('katalog.titel');
  document.documentElement.dataset.bereit = '1';
}
