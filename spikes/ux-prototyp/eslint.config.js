import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const knoten = {
  console: 'readonly',
  process: 'readonly',
  URL: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  document: 'readonly',
  window: 'readonly',
  performance: 'readonly',
  requestAnimationFrame: 'readonly',
  URLSearchParams: 'readonly',
  getComputedStyle: 'readonly',
  NodeFilter: 'readonly',
};

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/', 'src/erzeugt/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.mjs'], languageOptions: { globals: knoten } },
);
