import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Values travel over stdin, never in command arguments or logs.
const entries = readFileSync('.env.local', 'utf8').split(/\r?\n/)
  .filter(line => /^VITE_[A-Z_]+=.+/.test(line))
  .map(line => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]);
for (const target of ['production', 'preview']) {
  for (const [name, value] of entries) {
    const result = spawnSync('vercel', ['env', 'add', name, target, '--sensitive', '--force', '--scope', 'jaa-ds-global'], { input: `${value}\n`, encoding: 'utf8' });
    if (result.status !== 0) {
      console.error(`Failed to configure ${name} (${target}).`);
      process.exit(1);
    }
    console.log(`Configured ${name} (${target}).`);
  }
}
