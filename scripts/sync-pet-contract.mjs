#!/usr/bin/env node
/**
 * Sync the vendored pet contract: packages/dsh-pets/lib → the copy inside
 * packages/dsh-lingxi/lib/pet-contract.
 *
 * WHY THIS EXISTS: the npm name dsh-pets is owned by another account, so
 * dsh-lingxi cannot take a registry dependency on it yet; its first release
 * vendors the contract instead. Until that settles, the two copies must not
 * drift — this script is the ONLY sanctioned way to change the vendored
 * files (edit packages/dsh-pets, run this, commit both).
 *
 * Usage: node scripts/sync-pet-contract.mjs
 */
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(root, 'packages', 'dsh-pets', 'lib')
const target = join(root, 'packages', 'dsh-lingxi', 'lib', 'pet-contract')

const FILES = ['vocab.js', 'bridge.js', 'settings.js', 'policy.js', 'reminders.js']
for (const file of FILES) {
  if (!readdirSync(source).includes(file)) {
    console.error(`missing ${file} in packages/dsh-pets/lib — is the source package intact?`)
    process.exit(1)
  }
}

mkdirSync(target, { recursive: true })
for (const file of FILES) copyFileSync(join(source, file), join(target, file))

// Regenerate the re-export index from the actual exports of each file, so a
// new export in dsh-pets cannot silently vanish from the vendored surface.
const namedExports = (file) => {
  const src = readFileSync(join(source, file), 'utf8')
  const names = new Set()
  // Same-line capture only: `[^;\n]*` stops at the end of the declaration
  // statement, so a function body's `return …` can never be read as a name.
  const exportPattern = /^export (?:async )?(?:function\*?|class|const|let|var)\s+\{?([^;\n]*)/gm
  for (const match of src.matchAll(exportPattern)) {
    for (const piece of match[1].split(/[,{]/)) {
      const name = piece.trim().split(/[\s(=:]/)[0].trim()
      if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name)
    }
  }
  return [...names].sort()
}

const groups = FILES.map((file) => ({ file, names: namedExports(file) }))
let index = `/**
 * Vendored pet contract - copied verbatim from packages/dsh-pets in this
 * monorepo (see scripts/sync-pet-contract.mjs).
 *
 * Why vendored: the npm name dsh-pets is currently owned by another account,
 * so dsh-lingxi cannot take a registry dependency on its first release.
 * Once ownership is granted, replace this directory with
 * dependencies: { "dsh-pets": "^<version>" } and delete it - the monorepo
 * package remains the source of truth. GENERATED FILE: do not edit.
 */

`
for (const { file, names } of groups) {
  index += `export {\n${names.map((n) => `  ${n},`).join('\n')}\n} from './${file}'\n`
}
writeFileSync(join(target, 'index.js'), index, 'utf8')
console.log(`synced ${FILES.length} contract files into packages/dsh-lingxi/lib/pet-contract`)
