import { chromium } from '@playwright/test';
import sharp from 'sharp';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 820 },
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
  for (const view of ['calendar', 'list']) {
    await page.setViewportSize(
      view === 'calendar'
        ? { width: 1200, height: 820 }
        : { width: 600, height: 650 }
    );
    await page.goto(`http://127.0.0.1:4301/?view=${view}`);
    await page
      .getByText('Bastidores do meu próximo vídeo', { exact: true })
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator('img')
      .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
    const png = await page.screenshot();
    if (errors.length) throw new Error(errors.join('\n'));
    await sharp(png)
      .webp({ quality: 90 })
      .toFile(path.join(directory, `../public/images/postora-${view}.webp`));
  }
  const font = await readFile(
    path.join(directory, '../src/fonts/plus-jakarta-sans-latin.woff2')
  );
  const calendar = await readFile(
    path.join(directory, '../public/images/postora-calendar.webp')
  );
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<style>
    @font-face { font-family: Jakarta; src: url(data:font/woff2;base64,${font.toString(
      'base64'
    )}); }
    * { box-sizing: border-box; } body { margin: 0; background: #f0f2f4; font-family: Jakarta; color: #0e0e0e; }
    main { padding: 60px; display: flex; gap: 38px; align-items: center; height: 630px; }
    .copy { width: 510px; flex-shrink: 0; } .brand { color: #612bd3; font-size: 32px; font-weight: 800; }
    h1 { font-size: 52px; letter-spacing: -2px; line-height: 1.1; margin: 36px 0 24px; } h1 span { color: #612bd3; }
    p { font-size: 22px; color: #555b63; } img { width: 530px; border: 1px solid #e7e9eb; border-radius: 14px; }
  </style><main><div class="copy"><div class="brand">postora</div><h1>Seu conteúdo.<br>Suas redes.<br><span>Um só calendário.</span></h1><p>Planeje sua presença nas redes.</p></div><img alt="Calendário Postora" src="data:image/webp;base64,${calendar.toString(
    'base64'
  )}"></main>`);
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator('img')
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  await page.screenshot({
    path: path.join(directory, '../public/images/social-preview.png'),
  });
} finally {
  await browser.close();
}
