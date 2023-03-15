import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 720,
    width: 1500
  }
});

test('Unit Edit, top section fields, @chromium', async ({ page })=>{
  await page.goto('https://ims-f-e-duno.vercel.app/unit/7391-7954');
  await page.getByText('Edit').nth(1).click();
  await page.locator('.flex > .py-2').first().click();
  await page.getByText('manufacturer #1').click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').first().click();
  await page.getByText('Red Trailer').click();
  await page.locator('.ml-1 > .pos-rel > .flex > .py-2').first().click();
  await page.locator('div:nth-child(2) > .pa-3').click();
  await page.getByText('Switch to Feet & Inches').nth(1).click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .pos-rel > .flex > .py-2').first().click();
  await page.locator('div:nth-child(4) > .pa-3').first().click();
  await page.getByText('Height').click();
  await page.locator('div:nth-child(4) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('New').click();
  await page.locator('div:nth-child(5) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Sold').click();
  await page.locator('div:nth-child(6) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Dealer #1').click();
  await page.locator('div:nth-child(7) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Distributor #1').click();
  await page.locator('div:nth-child(8) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('manufacturer #1').click();
  await page.locator('div:nth-child(9) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Hub1').click();
  await page.getByText('Save').nth(1).click();
});