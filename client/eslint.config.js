import js from '@eslint/js';
import tseslint from 'typescript-eslint';

// Laufzeit-Globale für die Prüfprogramme unter tools/ (Node bzw. Browserseite von bindctl, ap-40).
const toolGlobals = {
  process: 'readonly',
  console: 'readonly',
  Buffer: 'readonly',
  URL: 'readonly',
  window: 'readonly',
  fetch: 'readonly',
  crypto: 'readonly',
  performance: 'readonly',
  atob: 'readonly',
  TextEncoder: 'readonly',
};

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/', 'src-tauri/', 'src/kern/pkg-node/', 'src/kern/pkg-web/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['tools/**/*.mjs'], languageOptions: { globals: toolGlobals } },
);
