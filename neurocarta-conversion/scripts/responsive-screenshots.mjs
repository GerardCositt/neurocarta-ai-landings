import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'

const url = process.env.URL ?? 'http://localhost:5180/'
const outDir = new URL('../docs/responsive/', import.meta.url)

const viewports = [
  { name: 'iphone-12-390x844', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { name: 'ipad-820x1180', width: 820, height: 1180, deviceScaleFactor: 2, isMobile: false, hasTouch: true },
]

async function ensureDir() {
  const fs = await import('node:fs/promises')
  await fs.mkdir(fileURLToPath(outDir), { recursive: true })
}

async function run() {
  await ensureDir()
  const browser = await chromium.launch()

  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        colorScheme: 'dark',
        locale: 'es-ES',
      })

      const page = await context.newPage()
      page.setDefaultTimeout(60_000)

      const bustUrl = url.includes('?') ? `${url}&pw=${Date.now()}` : `${url}?pw=${Date.now()}`
      await page.goto(bustUrl, { waitUntil: 'networkidle' })
      await page.waitForTimeout(600)

      // Capture top and a few strategic sections if present
      const shots = [
        { suffix: '01-top', y: 0 },
        { suffix: '02-demo', selector: '#demo' },
        { suffix: '03-pricing', selector: '#precios' },
        { suffix: '04-cta', selector: '#cta' },
      ]

      for (const s of shots) {
        if (s.selector) {
          const el = await page.$(s.selector)
          if (!el) continue
          await el.scrollIntoViewIfNeeded()
          await page.waitForTimeout(250)
        } else if (typeof s.y === 'number') {
          await page.evaluate((yy) => window.scrollTo(0, yy), s.y)
          await page.waitForTimeout(250)
        }

        const outPath = fileURLToPath(new URL(`${vp.name}-${s.suffix}.png`, outDir))
        await page.screenshot({ path: outPath, fullPage: false })
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

