import { describe, expect, it } from 'vitest';
import { APP_NAME, greeting } from './app';

describe('greeting', () => {
  it('nennt den Namen der Anwendung', () => {
    expect(greeting()).toBe(`Willkommen bei ${APP_NAME}`);
  });
});
