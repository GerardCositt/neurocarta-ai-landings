/**
 * Rasteriza public/favicon.svg → favicon.png (64) y apple-touch-icon.png (180).
 * Ejecutar: node scripts/render-favicon.mjs
 */
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')
const svg = readFileSync(join(publicDir, 'favicon.svg'))

await sharp(svg).resize(64, 64).png().toFile(join(publicDir, 'favicon.png'))
await sharp(svg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'))
console.log('OK: public/favicon.png (64×64), public/apple-touch-icon.png (180×180)')
