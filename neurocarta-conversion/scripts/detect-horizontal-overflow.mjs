import { chromium } from 'playwright'

const url = process.env.URL ?? 'http://localhost:5184/'

async function run() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark',
    locale: 'es-ES',
  })
  const page = await context.newPage()
  await page.goto(url.includes('?') ? `${url}&pw=${Date.now()}` : `${url}?pw=${Date.now()}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const result = await page.evaluate(() => {
    // Try to scroll horizontally; if overflow is clipped it should remain 0
    window.scrollTo(250, 0)
    const attemptedScrollX = window.scrollX
    window.scrollTo(0, 0)

    const vw = document.documentElement.clientWidth
    const offenders = []
    const nodes = Array.from(document.querySelectorAll('body *'))

    for (const el of nodes) {
      const r = el.getBoundingClientRect()
      // ignore non-visible
      if (r.width <= 0 || r.height <= 0) continue
      // element extends beyond viewport (right or left)
      const overRight = r.right - vw
      const overLeft = -r.left
      const over = Math.max(overRight, overLeft)
      if (over > 1) {
        const cs = getComputedStyle(el)
        offenders.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: el.className ? String(el.className).slice(0, 180) : null,
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          over: Math.round(over),
          position: cs.position,
          transform: cs.transform !== 'none' ? cs.transform : null,
        })
      }
    }

    offenders.sort((a, b) => b.over - a.over)
    return {
      vw,
      scrollWidth: document.documentElement.scrollWidth,
      attemptedScrollX,
      overflowX: {
        html: getComputedStyle(document.documentElement).overflowX,
        body: getComputedStyle(document.body).overflowX,
      },
      top: offenders.slice(0, 20),
    }
  })

  console.log(JSON.stringify(result, null, 2))

  await context.close()
  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exitCode = 1
})

