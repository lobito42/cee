// Baut den Kern als WebAssembly (crates/graph-wasm, ap-40) für Node und Browser:
//   client/src/kern/pkg-node  (wasm-bindgen --target nodejs)
//   client/src/kern/pkg-web   (wasm-bindgen --target web)
// Aufruf: npm run kern:build [-- --features pkg-beispiel,test-hooks]
// Installiert bei Bedarf das Ziel wasm32-unknown-unknown und wasm-bindgen-cli in genau der Version aus
// Cargo.lock (lokal unter target/tools), wie spikes/sync/build.sh.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const client = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(client, '..');
const target = process.env.CARGO_TARGET_DIR || join(root, 'target');

function run(cmd, args, env = {}) {
  execFileSync(cmd, args, {
    cwd: root,
    stdio: ['ignore', 'inherit', 'inherit'],
    env: { ...process.env, ...env },
  });
}

function output(cmd, args) {
  try {
    return execFileSync(cmd, args, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return '';
  }
}

const args = process.argv.slice(2);
const at = args.indexOf('--features');
const features = at >= 0 ? (args[at + 1] ?? '') : '';

if (
  !output('rustup', ['target', 'list', '--installed'])
    .split('\n')
    .includes('wasm32-unknown-unknown')
) {
  run('rustup', ['target', 'add', 'wasm32-unknown-unknown']);
}

const cargoArgs = [
  'build',
  '--quiet',
  '--release',
  '--target',
  'wasm32-unknown-unknown',
  '-p',
  'cee-graph-wasm',
];
if (features) cargoArgs.push('--features', features);
// Zufall für Actor-IDs kommt in WASM aus der JS-Laufzeit (automerge mit Feature `wasm`, getrandom/wasm_js).
run('cargo', cargoArgs, { RUSTFLAGS: '--cfg getrandom_backend="wasm_js"' });

const lock = readFileSync(join(root, 'Cargo.lock'), 'utf8');
const version = /\[\[package\]\]\nname = "wasm-bindgen"\nversion = "([^"]+)"/.exec(lock)?.[1];
if (!version) throw new Error('wasm-bindgen fehlt in Cargo.lock');
const tools = join(target, 'tools');
const bindgen = join(tools, 'bin', 'wasm-bindgen');
if (!output(bindgen, ['--version']).includes(version)) {
  console.error(`== wasm-bindgen-cli ${version} installieren (einmalig, dauert einige Minuten)`);
  run('cargo', [
    'install',
    '-q',
    'wasm-bindgen-cli',
    '--version',
    version,
    '--locked',
    '--root',
    tools,
  ]);
}

const wasm = join(target, 'wasm32-unknown-unknown', 'release', 'cee_graph_wasm.wasm');
for (const [kind, dir] of [
  ['nodejs', 'pkg-node'],
  ['web', 'pkg-web'],
]) {
  const outDir = join(client, 'src', 'kern', dir);
  if (existsSync(outDir)) rmSync(outDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  run(bindgen, ['--target', kind, '--out-dir', outDir, '--out-name', 'cee_graph_wasm', wasm]);
}
// Das Node-Paket ist CommonJS; der Client selbst ist ein ES-Modul-Paket.
writeFileSync(join(client, 'src', 'kern', 'pkg-node', 'package.json'), '{"type": "commonjs"}\n');
