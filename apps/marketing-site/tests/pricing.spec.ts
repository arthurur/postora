import { test, expect } from '@playwright/test';

for (const path of ['/', '/precos']) {
  test(`compares the four plans in both billing periods on ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    const monthly = page.getByRole('button', { name: 'Mensal', exact: true });
    const annual = page.getByRole('button', {
      name: 'Anual, até 25% de desconto',
      exact: true,
    });
    await expect(monthly).toHaveAttribute('aria-pressed', 'true');
    const prices = [
      ['Standard', '80', '60', '720', '5'],
      ['Team', '120', '90', '1.080', '10'],
      ['Pro', '150', '115', '1.380', '30'],
      ['Ultimate', '250', '190', '2.280', '100'],
    ];
    for (const [name, month, , , channels] of prices) {
      const plan = page.getByRole('article', { name, exact: true });
      await expect(plan).toContainText(`R$ ${month}/mês`);
      await expect(plan).toContainText(`${channels} canais conectados`);
      await expect(plan).toContainText('Cobrança mensal');
      await expect(
        plan.getByRole('link', { name: 'Começar por R$0' })
      ).toHaveAttribute('href', 'https://app.postora.com.br/auth');
    }
    await annual.click();
    await expect(annual).toHaveAttribute('aria-pressed', 'true');
    await expect(monthly).toHaveAttribute('aria-pressed', 'false');
    for (const [name, , equivalent, total] of prices) {
      const plan = page.getByRole('article', { name, exact: true });
      await expect(plan).toContainText(`R$ ${equivalent}/mês`);
      await expect(plan).toContainText(`R$ ${total} cobrados por ano`);
    }
    await monthly.click();
    for (const [name, month] of prices) {
      await expect(
        page.getByRole('article', { name, exact: true })
      ).toContainText(`R$ ${month}/mês`);
      await expect(
        page.getByRole('article', { name, exact: true })
      ).toContainText('Cobrança mensal');
    }
  });
}
