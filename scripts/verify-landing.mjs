import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { chromium } from 'playwright'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const reference = resolve(process.argv[2] ?? '../design/landing.html')
const referenceDir = resolve(reference, '..')
const exported = resolve('out')
const output = resolve('qa-output')
const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp'
}

const sections = {
  '헤더': '.nav',
  '히어로': '.hero-box',
  '기능 소개': '#features',
  '기능 01': '#features .feature:nth-of-type(2)',
  '기능 02': '#features .feature:nth-of-type(3)',
  '기능 03': '#features .feature:nth-of-type(4)',
  '기능 04': '#features .feature:nth-of-type(5)',
  '사용 방법': '#how',
  'FAQ': '#faq',
  '다운로드': '#download',
  '푸터': 'footer'
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost')
  const isReference = url.pathname.startsWith('/reference/')
  const root = isReference ? referenceDir : exported
  const file = isReference && url.pathname === '/reference/'
    ? reference
    : resolve(root, '.' + (isReference ? url.pathname.slice(10) : url.pathname), url.pathname === '/' ? 'index.html' : '')
  if (!file.startsWith(root + sep)) {
    response.writeHead(404).end()
    return
  }
  try {
    const contents = await readFile(file)
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' })
    response.end(contents)
  } catch {
    response.writeHead(404).end()
  }
})

await mkdir(output, { recursive: true })
await new Promise((ready) => server.listen(0, '127.0.0.1', ready))
const base = 'http://127.0.0.1:' + server.address().port

async function load(page, pathname) {
  await page.goto(base + pathname, { waitUntil: 'networkidle' })
  const imagesAndFonts = await page.evaluate(async () => {
    const weights = await Promise.all([400, 600, 700, 800].map(
      async (weight) => (await document.fonts.load(weight + ' 16px Paperlogy')).length
    ))
    await document.fonts.ready
    await Promise.all(Array.from(document.images, (image) => image.decode()))
    return weights
  })
  assert.deepEqual(imagesAndFonts, [1, 1, 1, 1], 'Paperlogy 4종을 불러와야 한다.')
}

const screenshot = { animations: 'disabled', caret: 'hide', scale: 'css' }

function compare(before, after, bands) {
  const width = before.width
  assert.equal(after.width, width)
  const height = Math.max(before.height, after.height)
  const oldPixels = Buffer.alloc(width * height * 4)
  const newPixels = Buffer.alloc(width * height * 4)
  before.data.copy(oldPixels)
  after.data.copy(newPixels)
  const diff = new PNG({ width, height })

  const counts = bands.map(([name, start], index) => {
    const end = bands[index + 1]?.[1] ?? height
    const offset = start * width * 4
    const limit = end * width * 4
    const pixels = width * (end - start)
    const changed = pixelmatch(
      oldPixels.subarray(offset, limit),
      newPixels.subarray(offset, limit),
      diff.data.subarray(offset, limit),
      width,
      end - start,
      { threshold: 0, includeAA: true }
    )
    return { name, changed, pixels, ratio: Number((changed / pixels * 100).toFixed(6)) }
  })
  return { counts, diff }
}

async function capture(browser, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const referencePage = await context.newPage()
  const builtPage = await context.newPage()
  await Promise.all([load(referencePage, '/reference/'), load(builtPage, '/')])
  const name = viewport.width + 'x' + viewport.height
  const bandsForPage = (page) => page.evaluate((selectors) => Object.entries(selectors).map(
    ([name, selector]) => [name, Math.round(document.querySelector(selector).getBoundingClientRect().top + scrollY)]
  ), sections)
  const [bands, builtBands] = await Promise.all([bandsForPage(referencePage), bandsForPage(builtPage)])
  const checks = (page) => page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]').content,
    language: document.documentElement.lang,
    links: Array.from(document.querySelectorAll('body a'), (link) => link.getAttribute('href'))
  }))
  assert.deepEqual(await checks(builtPage), await checks(referencePage))
  const referencePng = await referencePage.screenshot({ ...screenshot, fullPage: true, path: resolve(output, name + '-reference.png') })
  const builtPng = await builtPage.screenshot({ ...screenshot, fullPage: true, path: resolve(output, name + '-built.png') })
  const referenceImage = PNG.sync.read(referencePng)
  const builtImage = PNG.sync.read(builtPng)
  const { counts, diff } = compare(referenceImage, builtImage, bands)
  await writeFile(resolve(output, name + '-diff.png'), PNG.sync.write(diff))
  const modalCounts = []
  for (const modal of ['contact', 'privacy']) {
    await referencePage.locator('footer [data-open="' + modal + '"]').click()
    await builtPage.locator('footer [data-open="' + modal + '"]').click()
    const dialog = '#' + modal
    await referencePage.locator(dialog + '[open]').waitFor()
    await builtPage.locator(dialog + '[open]').waitFor()
    const a = await referencePage.screenshot({ ...screenshot, path: resolve(output, name + '-' + modal + '-reference.png') })
    const b = await builtPage.screenshot({ ...screenshot, path: resolve(output, name + '-' + modal + '-built.png') })
    modalCounts.push(...compare(PNG.sync.read(a), PNG.sync.read(b), [[modal, 0]]).counts)
    await referencePage.keyboard.press('Escape')
    await builtPage.keyboard.press('Escape')
  }
  await context.close()
  return { viewport: name, heights: [referenceImage.height, builtImage.height], bands, builtBands, counts, modalCounts }
}

async function measureFaq(page, opening) {
  await page.locator('.faq-list summary').first().scrollIntoViewIfNeeded()
  const measurement = page.evaluate(() => {
    const details = document.querySelector('.faq-list details')
    const summary = details.querySelector('summary')
    const paragraph = details.querySelector('p')
    return new Promise((done) => {
      summary.addEventListener('click', () => {
        const animation = paragraph.getAnimations()[0]
        if (!animation) return done(null)
        const timing = animation.effect.getTiming()
        const heights = []
        const sample = () => {
          if (animation.playState === 'finished') return done({ heights, duration: timing.duration, easing: timing.easing, open: details.open })
          heights.push({ height: paragraph.getBoundingClientRect().height, open: details.open })
          requestAnimationFrame(sample)
        }
        requestAnimationFrame(sample)
      }, { once: true })
    })
  })
  await page.locator('.faq-list summary').first().click()
  const result = await measurement
  assert.ok(result, 'FAQ가 실제 Web Animation을 실행해야 한다.')
  assert.equal(result.duration, 280)
  assert.equal(result.easing, 'cubic-bezier(0.2, 0.7, 0.2, 1)')
  assert.equal(result.open, opening)
  assert.ok(result.heights.every((sample) => sample.open), '애니메이션이 끝날 때까지 답이 열려 있어야 한다.')
  const values = result.heights.map((sample) => sample.height)
  const maximum = Math.max(...values)
  const minimum = Math.min(...values)
  const middle = values.find((value) => value > minimum + 5 && value < maximum - 5)
  assert.ok(middle, 'FAQ 높이에 중간값이 있어야 한다.')
  assert.ok(opening ? values[0] < values.at(-1) : values[0] > values.at(-1))
  return { first: +values[0].toFixed(2), mid: +middle.toFixed(2), last: +values.at(-1).toFixed(2), duration: result.duration, openAfter: result.open }
}

async function verifyInteractions(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 860 } })
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(String(error)))
  await load(page, '/')

  const outline = () => page.locator('.nav .brand').evaluate((link) => ({
    keyboard: link.matches(':focus-visible'),
    style: getComputedStyle(link).outlineStyle,
    width: getComputedStyle(link).outlineWidth,
    color: getComputedStyle(link).outlineColor
  }))
  await page.locator('.nav .brand').click()
  assert.equal((await outline()).keyboard, false)
  assert.equal((await outline()).style, 'none')
  await load(page, '/')
  await page.keyboard.press('Tab')
  assert.deepEqual(await outline(), { keyboard: true, style: 'solid', width: '2px', color: 'rgb(25, 179, 94)' })

  await page.evaluate(() => window.scrollTo({ top: 8, behavior: 'instant' }))
  await page.waitForFunction(() => scrollY === 8 && !document.querySelector('.nav').classList.contains('scrolled'))
  await page.evaluate(() => window.scrollTo({ top: 9, behavior: 'instant' }))
  await page.waitForFunction(() => {
    const nav = document.querySelector('.nav')
    return nav.classList.contains('scrolled') && getComputedStyle(nav).borderBottomColor === 'rgb(236, 238, 240)'
  })
  for (const hash of ['#features', '#how', '#faq']) {
    await page.locator('.nav ul [href="' + hash + '"]').click()
    await page.waitForFunction((target) => {
      const active = Array.from(document.querySelectorAll('.nav ul a.on'))
      return active.length === 1 && active[0].hash === target
    }, hash)
  }

  const opening = await measureFaq(page, true)
  const closing = await measureFaq(page, false)

  for (const modal of ['contact', 'privacy']) {
    const trigger = page.locator('footer [data-open="' + modal + '"]')
    const dialog = page.locator('#' + modal)
    for (const close of [
      () => dialog.locator('[data-close]').click(),
      () => page.keyboard.press('Escape'),
      () => page.mouse.click(2, 2)
    ]) {
      await trigger.click()
      await page.locator('#' + modal + '[open]').waitFor()
      await close()
      assert.equal(await dialog.evaluate((element) => element.open), false)
    }
  }

  await page.locator('footer [data-open="contact"]').click()
  await page.locator('#contact [data-copy]').click()
  await page.getByRole('button', { name: '복사됨' }).waitFor()
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'ja2x0n09@gmail.com')
  await page.getByRole('button', { name: '복사', exact: true }).waitFor()
  await page.evaluate(() => {
    navigator.clipboard.writeText = () => Promise.reject(new Error('복사 실패 경로 확인'))
  })
  await page.locator('#contact [data-copy]').click()
  await page.getByRole('button', { name: '직접 복사해 주세요' }).waitFor()
  await page.getByRole('button', { name: '복사', exact: true }).waitFor()

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await load(page, '/')
  const summary = page.locator('.faq-list summary').first()
  await summary.click()
  assert.deepEqual(await summary.evaluate((element) => ({
    open: element.parentElement.open,
    animations: element.nextElementSibling.getAnimations().length
  })), { open: true, animations: 0 })
  await summary.click()
  assert.equal(await summary.evaluate((element) => element.parentElement.open), false)
  assert.deepEqual(errors, [])
  await context.close()
  return { opening, closing, focus: 'Tab만 초록색 외곽선', header: '8px 이하 투명, 9px 경계선', sections: '기능·사용 방법·FAQ', dialogs: '두 모달 닫기 버튼·Esc·바깥 클릭', clipboard: '성공·실패 안내와 초기화', reducedMotion: '애니메이션 없이 열기·닫기' }
}

let browser
try {
  browser = await chromium.launch({ channel: 'chrome' })
  const visuals = []
  for (const viewport of [{ width: 1280, height: 860 }, { width: 375, height: 812 }]) {
    const result = await capture(browser, viewport)
    visuals.push(result)
    console.log(result.viewport, result.heights)
    console.table([...result.counts, ...result.modalCounts])
  }

  const interactions = await verifyInteractions(browser)
  const sitemapResponse = await fetch(base + '/sitemap.xml')
  const robotsResponse = await fetch(base + '/robots.txt')
  assert.equal(sitemapResponse.status, 200)
  assert.equal(robotsResponse.status, 200)
  const sitemap = await sitemapResponse.text()
  const robots = await robotsResponse.text()
  assert.deepEqual(Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]), [new URL('/', site).href])
  assert.match(robots, /User-Agent: \*/)
  assert.match(robots, /Allow: \//)
  assert.ok(robots.includes('Sitemap: ' + new URL('/sitemap.xml', site).href))

  const report = { visuals, interactions, sitemap, robots }
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify({ interactions, sitemap, robots }, null, 2))
  for (const visual of visuals) {
    assert.equal(visual.heights[0], visual.heights[1], visual.viewport)
    assert.deepEqual(visual.bands, visual.builtBands, visual.viewport)
    assert.equal([...visual.counts, ...visual.modalCounts].reduce((sum, band) => sum + band.changed, 0), 0, visual.viewport)
  }
} finally {
  await browser?.close()
  server.close()
}
