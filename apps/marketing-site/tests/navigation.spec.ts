import { test, expect } from '@playwright/test';

test('visitors can explore networks, agents and MCP documentation without signing in', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Seu conteúdo. Suas redes. Um só calendário.'
  );
  const nav = page.getByRole('navigation', { name: 'Principal' });
  await nav.getByRole('link', { name: 'Canais', exact: true }).click();
  await page.getByRole('link', { name: 'Instagram', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Agende suas publicações no Instagram'
  );
  await expect(page.getByRole('main')).toContainText('conta profissional');
  await nav.getByRole('link', { name: 'Agentes de IA' }).click();
  await page.getByRole('link', { name: 'Codex', exact: true }).click();
  await page.getByRole('link', { name: 'Configurar o Codex' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Configuração'
  );
  await page
    .getByRole('navigation', { name: 'Documentação MCP' })
    .getByRole('link', { name: 'Referência de ferramentas' })
    .click();
  await expect(page.getByRole('main')).toContainText('postSettingsTool');
  await expect(page.getByRole('main')).toContainText(
    'não altera o texto nem a data'
  );
});
