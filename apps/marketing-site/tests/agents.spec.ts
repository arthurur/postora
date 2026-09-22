import { expect, test } from '@playwright/test';

const clients = [
  ['claude-code', 'Claude Code'],
  ['codex', 'Codex'],
  ['cursor', 'Cursor'],
  ['chatgpt', 'ChatGPT'],
  ['claude', 'Claude'],
  ['claude-cowork', 'Claude Cowork'],
] as const;

for (const width of [320, 1440]) {
  test(`all six agents have complete guides and working setup links at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const [slug, name] of clients) {
      await page.goto('/agentes');
      await page.getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(`/agentes/${slug}`);
      for (const heading of [
        'Configure uma vez. Depois, é só pedir.',
        'Feito para automatizar sua rotina.',
        'Como funciona',
        'Um pedido. Várias redes.',
        `O que é ${name}?`,
      ]) {
        await expect(
          page.getByRole('heading', { name: heading, exact: true })
        ).toBeVisible();
      }
      await page
        .getByText('O agente publica sem minha revisão?', { exact: true })
        .click();
      await expect(
        page.getByText(
          'A conexão MCP, por si só, não impõe uma etapa de revisão humana.',
          { exact: false }
        )
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true);
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element: HTMLImageElement) =>
                element.complete && element.naturalWidth > 0
            )
          )
          .toBe(true);
      }
      await page
        .getByRole('link', { name: `Configurar o ${name}`, exact: true })
        .click();
      await expect(page).toHaveURL(`/docs/mcp/configuracao#${slug}`);
      await expect(page.locator(`h2[id="${slug}"]`)).toHaveText(name);
    }
    expect(errors).toEqual([]);
  });
}
