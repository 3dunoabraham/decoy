import { test, expect } from '@playwright/test';

test('Inventory Browse, enter unit, update unit field (manufacturer)', async ({ page })=>{
  await page.goto('https://ims-f-e-duno.vercel.app/inventory');
  await page.getByRole('link', { name: '#7391-7954 3323336849849 Available retailer #3 Dealer #3 Loading' }).click();
  await page.getByText('Edit').nth(1).click();
  await page.locator('div:nth-child(2) > .w-max-120px > .flex-col > .py-2').click();
  await page.locator('div:nth-child(2) > .w-max-120px > .flex-col > .py-2').fill('3229.10');
  await page.locator('.flex > .py-2').first().click();
  await page.getByText('manufacturer #2').click();
  await page.getByText('Save').nth(1).click();
});
