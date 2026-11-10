#!/usr/bin/env node
// Writes the one generated copy (.openclaw) from the source skill in skills/brief/.
// --check writes nothing and exits 1 when the copy is stale or the manifest versions
// disagree, so CI catches a hand edit.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKILL = 'brief';
const SKILL_DIR = path.join('skills', SKILL);
const SHORT_DESCRIPTION =
  'Turn a short request into a clear engineering brief, critique it, get the user\'s approval, and only then carry it out. Use when the user runs /brief with a short sentence.';

const VERSION_FILES = [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.devin-plugin/plugin.json',
  '.github/plugin/plugin.json',
  '.qoder-plugin/plugin.json',
  'gemini-extension.json',
  'package.json',
];

const read = rel => fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n');
const body = text => text.replace(/^---\n[\s\S]*?\n---\n*/, '');

function outputs() {
  return {
    [`.openclaw/skills/${SKILL}/SKILL.md`]:
      `---\nname: ${SKILL}\ndescription: "${SHORT_DESCRIPTION}"\n---\n\n${body(read(path.join(SKILL_DIR, 'SKILL.md')))}`,
  };
}

function versionErrors() {
  const versions = VERSION_FILES.map(rel => [rel, JSON.parse(read(rel)).version]);
  const distinct = new Set(versions.map(([, v]) => v));
  const bad = versions.filter(([, v]) => !/^\d+\.\d+\.\d+$/.test(String(v)));
  const errors = bad.map(([rel, v]) => `${rel}: version must be X.Y.Z, got ${JSON.stringify(v)}`);
  if (distinct.size > 1) {
    errors.push('versions disagree: ' + versions.map(([rel, v]) => `${v} ${rel}`).join(', '));
  }
  return errors;
}

const check = process.argv.includes('--check');
const errors = versionErrors();
for (const [rel, content] of Object.entries(outputs())) {
  const target = path.join(root, rel);
  const current = fs.existsSync(target) ? read(rel) : null;
  if (current === content) {
    continue;
  }
  if (check) {
    errors.push(`${rel} is stale: run node scripts/build-adapters.js`);
    continue;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  console.log(`wrote ${rel}`);
}

if (errors.length) {
  errors.forEach(e => console.error(e));
  process.exit(1);
}
console.log(check ? 'adapters match their sources, versions agree' : 'adapters up to date');
