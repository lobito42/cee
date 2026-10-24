// Größe des Browser-Pakets client/src/kern/pkg-web/*.wasm in KB (1 KB = 1024 Byte), für `bindctl bench`.
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function wasmSizeKb() {
  const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'kern', 'pkg-web');
  const files = readdirSync(dir).filter((f) => f.endsWith('.wasm'));
  return files.reduce((sum, f) => sum + statSync(join(dir, f)).size, 0) / 1024;
}
