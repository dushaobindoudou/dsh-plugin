// Idempotent placeholder generator for reserved dsh-* npm names.
//
//   node scripts/sync-placeholders.mjs
//
// Rewrites packages/<name>/{package.json,README.md} for every CATALOG entry.
// Real packages (REAL_PACKAGES in catalog.mjs) are never touched.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATALOG, NICHE_ORDER, PLACEHOLDER_VERSION, REAL_PACKAGES, REPO } from './catalog.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGES = join(ROOT, 'packages')

function pkgJson(name, entry) {
  return {
    name,
    version: PLACEHOLDER_VERSION,
    description: `${entry.headline} - name reserved; first release in development.`,
    license: 'MIT',
    author: REPO.owner,
    keywords: ['dsh', 'dsh-plugin', 'deepseek-harness', 'cordis-plugin', ...entry.extra],
    repository: {
      type: 'git',
      url: `${REPO.url}.git`,
      directory: `packages/${name}`,
    },
    homepage: `${REPO.url}/tree/main/packages/${name}#readme`,
  }
}

function readme(name, entry) {
  return `# ${name}

[![npm](https://img.shields.io/npm/v/${name}.svg)](https://www.npmjs.com/package/${name})
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**${entry.headline}** - a plugin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (\`dsh\`).

This package name is reserved; the first release is in development.

${entry.body}

Source and roadmap live in the [${REPO.repo} monorepo](${REPO.url}).
Watch the repo or the npm package to catch the release. Related releases from
the same suite: [dsh-workflow](https://www.npmjs.com/package/dsh-workflow),
[dsh-selfrepair](https://www.npmjs.com/package/dsh-selfrepair),
[dsh-finder](https://www.npmjs.com/package/dsh-finder).

## License

MIT
`
}

let count = 0
for (const [name, entry] of Object.entries(CATALOG)) {
  if (REAL_PACKAGES.includes(name)) continue
  const dir = join(PACKAGES, name)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'package.json'), JSON.stringify(pkgJson(name, entry), null, 2) + '\n')
  await writeFile(join(dir, 'README.md'), readme(name, entry))
  count++
}
console.log(`generated ${count} placeholder packages under ${PACKAGES}`)

// ---- keep the root README's niche table in sync with the catalog ----------
const readmePath = join(ROOT, 'README.md')
const START = '<!-- placeholder-table:start -->'
const END = '<!-- placeholder-table:end -->'
const readmeSrc = await readFile(readmePath, 'utf8')
const table = NICHE_ORDER.map((niche) => {
  const entries = Object.entries(CATALOG).filter(([n, e]) => e.niche === niche && !REAL_PACKAGES.includes(n))
  if (entries.length === 0) return ''
  return [
    `### ${niche.charAt(0).toUpperCase() + niche.slice(1)} (${entries.length})`,
    '',
    '| Name | Planned first release |',
    '| --- | --- |',
    ...entries.map(([n, e]) => `| [\`${n}\`](packages/${n}) | ${e.headline} |`),
    '',
  ].join('\n')
})
  .filter(Boolean)
  .join('\n')
const next = readmeSrc.replace(
  new RegExp(`${START}[\\s\\S]*?${END}`),
  `${START}\n${table.trimEnd()}\n${END}`,
)
if (next !== readmeSrc) {
  await writeFile(readmePath, next)
  console.log('root README niche table updated')
}
