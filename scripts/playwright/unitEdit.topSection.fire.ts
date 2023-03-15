import { test, expect, firefox } from '@playwright/test';

test.use({
  viewport: {
    height: 720,
    width: 1500
  }
});

test('Unit Edit, top section fields, @firefox', async ()=>{
    const firefoxBrowser = await firefox.launch();
    const firefoxPage = await firefoxBrowser.newPage();

    await firefoxPage.goto('http://localhost:3000/');
    await firefoxPage.getByRole('link', { name: 'Inventory → Unit List' }).click();
    await firefoxPage.getByRole('link', { name: '#0402-8061 00000000000000000 Not Available - None' }).click();
    await firefoxPage.getByText('Edit').first().click();
    await firefoxPage.locator('div:nth-child(7) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
    await firefoxPage.getByText('Distributor #2').click();
    await firefoxPage.getByText('Save').first().click();
});