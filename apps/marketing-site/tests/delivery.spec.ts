import { test, expect } from '@playwright/test';

const canonical = [
  '/',
  '/precos',
  '/canais',
  '/canais/x',
  '/canais/instagram',
  '/canais/facebook',
  '/canais/tiktok',
  '/canais/youtube',
  '/canais/linkedin',
  '/canais/threads',
  '/agentes',
  '/agentes/claude-code',
  '/agentes/codex',
  '/agentes/cursor',
  '/agentes/chatgpt',
  '/agentes/claude',
  '/agentes/claude-cowork',
  '/docs/mcp/introducao',
  '/docs/mcp/configuracao',
  '/docs/mcp/ferramentas',
  '/docs/mcp/exemplos',
];

test('all public routes deliver Portuguese content, unique metadata and working internal links without JavaScript', async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    locale: 'en-US',
  });
  const page = await context.newPage();
  const links = new Set<string>();
  const titles = new Set<string>();
  for (const path of canonical) {
    const response = await page.goto(`http://127.0.0.1:4300${path}`);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://postora.com.br${path === '/' ? '' : path}`
    );
    await expect(page.locator('meta[name=description]')).toHaveAttribute(
      'content',
      /\S.{15,}/
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `https://postora.com.br${path === '/' ? '' : path}`
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://postora.com.br/images/social-preview.png'
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
    titles.add(await page.title());
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute('href')!)
      )) {
      if (href.startsWith('/') && !href.startsWith('//'))
        links.add(href.split('#')[0]);
    }
    for (const anchor of await page
      .getByRole('link', { name: 'Começar por R$0', exact: true })
      .all()) {
      await expect(anchor).toHaveAttribute(
        'href',
        'https://app.postora.com.br/auth'
      );
    }
    await expect(
      page.getByRole('link', { name: 'Entrar', exact: true })
    ).toHaveAttribute('href', 'https://app.postora.com.br/auth/login');
    for (const image of await page.getByRole('img').all()) {
      await expect(image).toHaveAttribute('alt', /\S.{15,}/);
    }
  }
  expect(titles.size).toBe(canonical.length);
  for (const path of links)
    expect((await request.get(path)).status(), path).toBe(200);
  const sitemap = await request.get('/sitemap.xml');
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(canonical.length);
  for (const path of canonical)
    expect(xml).toContain(`<loc>https://postora.com.br${path}</loc>`);
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain(
    'Sitemap: https://postora.com.br/sitemap.xml'
  );
  for (const alias of ['/docs', '/docs/mcp']) {
    const response = await request.get(alias, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe('/docs/mcp/introducao');
  }
  for (const path of [
    '/nao-existe',
    '/canais/nao-existe',
    '/agentes/nao-existe',
    '/docs/mcp/nao-existe',
  ]) {
    const response = await page.goto(`http://127.0.0.1:4300${path}`);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole('link', { name: 'Voltar ao início' })
    ).toBeVisible();
  }
  await context.close();
});

for (const width of [320, 390, 768, 1440]) {
  test(`public content fits at ${width}px and the hero preserves reading order`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const path of [
      '/',
      '/precos',
      '/canais/instagram',
      '/agentes/codex',
      '/docs/mcp/configuracao',
      '/docs/mcp/ferramentas',
    ]) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth
        ),
        path
      ).toBe(true);
      if (path === '/') {
        const heading = await page
          .getByRole('heading', { level: 1 })
          .boundingBox();
        const shot = await page
          .getByRole('img', { name: /Calendário real/ })
          .boundingBox();
        expect(heading).not.toBeNull();
        expect(shot).not.toBeNull();
        if (width >= 1200)
          expect(shot!.x).toBeGreaterThan(heading!.x + heading!.width);
        else expect(shot!.y).toBeGreaterThan(heading!.y + heading!.height);
        await page.screenshot({
          path: testInfo.outputPath(`home-${width}.png`),
          fullPage: true,
        });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('mobile navigation and billing work by keyboard and pointer with visible focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Pular para o conteúdo' })
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const menu = page.getByRole('button', { name: /^(Abrir|Fechar) menu$/ });
  await expect(menu).toBeFocused();
  expect(
    await menu.evaluate((element) => getComputedStyle(element).outlineStyle)
  ).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(
    page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Canais', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Preços' })
    .click();
  await expect(page).toHaveURL('/precos');
  await expect(
    page.getByRole('button', { name: 'Abrir menu' })
  ).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Mensal', exact: true }).focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(
    page.getByRole('button', { name: 'Anual, até 25% de desconto' })
  ).toHaveAttribute('aria-pressed', 'true');
});
