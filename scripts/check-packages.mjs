// Structural sanity check for every package in the monorepo. Runs in CI.
//
//   node scripts/check-packages.mjs
import { readdir, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATALOG, PLACEHOLDER_VERSION, REAL_PACKAGES, REPO } from './catalog.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGES = join(ROOT, 'packages')

const expected = new Set([...Object.keys(CATALOG), ...REAL_PACKAGES])
const errors = []
const rows = []

// Naming rule: the namespace is dsh-xxx - "plugin" never appears inside a name.
for (const name of expected) {
  if (name.includes('plugin')) fail(name, 'naming rule violation: dsh-xxx must not contain "plugin"')
}

function fail(name, msg) {
  errors.push(`${name}: ${msg}`)
}

const dirs = (await readdir(PACKAGES, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

for (const name of dirs) {
  if (!expected.has(name)) fail(name, 'directory exists but is not in catalog.mjs or REAL_PACKAGES')
}

for (const name of dirs) {
  if (!expected.has(name)) continue
  const dir = join(PACKAGES, name)
  let pkg
  try {
    pkg = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'))
  } catch (err) {
    fail(name, `package.json unreadable: ${err.message}`)
    continue
  }
  const isPlaceholder = name in CATALOG && !REAL_PACKAGES.includes(name)

  if (pkg.name !== name) fail(name, `package name "${pkg.name}" does not match directory`)
  if (!pkg.name?.startsWith('dsh-')) fail(name, 'package name does not start with dsh-')
  if (pkg.license !== 'MIT') fail(name, `license is "${pkg.license}", expected MIT`)
  if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(pkg.version ?? '')) fail(name, `bad version "${pkg.version}"`)
  if (!pkg.description) fail(name, 'missing description')

  const repoUrl = pkg.repository?.url ?? ''
  if (!repoUrl.includes(`${REPO.repo}.git`)) fail(name, `repository url "${repoUrl}" does not point at the monorepo`)
  if (isPlaceholder && pkg.repository?.directory !== `packages/${name}`) {
    fail(name, 'repository.directory missing or wrong')
  }

  if (isPlaceholder) {
    const expectedVersion = CATALOG[name]?.version ?? PLACEHOLDER_VERSION
    if (pkg.version !== expectedVersion) {
      fail(name, `placeholder version is ${pkg.version}, expected ${expectedVersion}`)
    }
  }
  if (!isPlaceholder) {
    const hasCode = Boolean(pkg.main || pkg.exports || pkg.bin)
    if (!hasCode) fail(name, 'real package has no main/exports/bin entry')
  }

  try {
    await readFile(join(dir, 'README.md'), 'utf8')
  } catch {
    fail(name, 'missing README.md')
  }

  rows.push({
    name,
    version: pkg.version,
    kind: isPlaceholder ? 'reserved' : 'real',
    niche: CATALOG[name]?.niche ?? '—',
  })
}

const missing = [...expected].filter((n) => !dirs.includes(n))
for (const name of missing) fail(name, 'expected package directory is missing')

rows.sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'real' ? -1 : 1))
for (const r of rows) {
  console.log(`${r.kind.padEnd(8)} ${r.version.padEnd(7)} ${r.name}  [${r.niche}]`)
}

const real = rows.filter((r) => r.kind === 'real').length
const reserved = rows.filter((r) => r.kind === 'reserved').length
console.log(`\n${real} real, ${reserved} reserved, ${rows.length} total packages`)

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('all packages OK')
