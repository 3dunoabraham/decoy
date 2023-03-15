import { test, expect } from '@playwright/test';
// import { getFixedLengthRandomInt, getRandomInt } from '@/scripts/helpers/mathHelper';

const getRandomInt = (max=6) =>{
	return Math.floor(Math.random() * max); 
}
const getFixedLengthRandomInt = (len) =>{
	return Math.random().toString().slice(2,len+2);
}


test('IMS Landing, enter add unit page, save new unit (with manufacturer)', async ({ page })=>{
  await page.goto('https://ims-f-e-duno.vercel.app');
  await page.getByRole('link', { name: '+ New Unit Add Unit to Inventory' }).click();
  await page.locator('input').first().click();
  await page.locator('input').first().fill(getFixedLengthRandomInt(9));
  await page.locator('div:nth-child(4) > .flex-col > .py-2').click({
    clickCount: 3
  });
  await page.locator('div:nth-child(4) > .flex-col > .py-2').fill(`${1950+getRandomInt(99)}`);
  await page.locator('.flex > .py-2').first().click();
  await page.getByText('Manufacturer #'+(1+getRandomInt(3))).click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').first().click();
  await page.getByText('Red Trailer').click();
  await page.locator('.ml-1 > .pos-rel > .flex > .py-2').first().click();
  await page.locator('div:nth-child(4) > .pa-3').click();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .pos-rel > .flex > .py-2').first().click();
  await page.locator('div:nth-child(14) > .pa-3').click();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .pos-rel > .flex > .py-2').first().click();
  await page.locator('div:nth-child(34) > .pa-3').click();
  // await page.locator('div:nth-child(4) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  // await page.getByText('New').nth(1).click();
  // await page.locator('div:nth-child(5) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  // await page.getByText('Available').nth(1).click();
  await page.locator('div:nth-child(6) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Dealer #'+(1+getRandomInt(3))).click();
  await page.locator('div:nth-child(7) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Distributor #3').click();
  await page.locator('div:nth-child(8) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Manufacturer #3').click();
  await page.locator('div:nth-child(9) > div:nth-child(2) > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('retailer #3').click();
  await page.locator('.w-max-120px > .flex-col > .py-2').first().click();
  await page.locator('.w-max-120px > .flex-col > .py-2').first().fill('33');
  await page.locator('.w-max-120px > .flex-col > .py-2').first().press('Tab');
  await page.locator('div:nth-child(2) > .w-max-120px > .flex-col > .py-2').fill('333');
  await page.locator('div:nth-child(2) > .w-max-120px > .flex-col > .py-2').press('Tab');
  await page.locator('div:nth-child(3) > .w-max-120px > .flex-col > .py-2').fill('33.3');
  await page.locator('div:nth-child(3) > .w-max-120px > .flex-col > .py-2').press('Tab');
  await page.locator('div:nth-child(4) > .w-max-120px > .flex-col > .py-2').first().fill('1333.33');
  await page.locator('.flex-col > div > .pos-rel > .flex > .py-2').click();
  await page.getByText('Orange').click();
  await page.getByText('+').click();
  await page.locator('.flex-col > .pos-rel > .flex > .py-2').click();
  await page.getByText('Orange').click();
  await page.locator('.w-max-100px > .pos-rel > .flex > .px-2').click();
  await page.getByText('3').click();
  await page.locator('.w-max-200px > .pos-rel > .flex > .py-2').click();
  await page.getByText('Pintle').click();
  await page.locator('div:nth-child(2) > div > div > .flex-3 > div:nth-child(4) > .w-max-120px > .flex-col > .py-2').click();
  await page.locator('div:nth-child(2) > div > div > .flex-3 > div:nth-child(4) > .w-max-120px > .flex-col > .py-2').fill('1330');
  await page.locator('div:nth-child(5) > .w-max-120px > .flex-col > .py-2').click();
  await page.locator('div:nth-child(5) > .w-max-120px > .flex-col > .py-2').fill('33000');
  await page.locator('div:nth-child(3) > div > div > .flex-3 > div:nth-child(2) > div:nth-child(2) > .flex-col > .py-2').click();
  await page.locator('div:nth-child(3) > div > div > .flex-3 > div:nth-child(2) > div:nth-child(2) > .flex-col > .py-2').fill('333333');
  await page.locator('.w-max-250px > .pos-rel > .flex > .py-2').first().click();
  await page.getByText('Pending State').click();
  await page.locator('.w-max-150px > .pos-rel > .flex > .py-2').click();
  await page.getByText('AZ').click();
  await page.locator('.w-max-200px > .flex-col > .py-2').first().click();
  await page.locator('.w-max-200px > .flex-col > .py-2').first().fill('3330333');
  await page.locator('[id="\\31 "]').check();
  await page.getByPlaceholder('Select Company').click();
  await page.getByText('Hub #'+(1+getRandomInt(5))).click();
  await page.getByRole('button', { name: 'Set Today' }).click();
  await page.locator('div:nth-child(5) > div > div > .flex-3 > div > .w-max-200px > .flex-col > .py-2').click();
  await page.locator('div:nth-child(5) > div > div > .flex-3 > div > .w-max-200px > .flex-col > .py-2').fill('333aa333a3a33');
  await page.locator('.w-max-240px > .flex-col > .py-2').click();
  await page.locator('.w-max-240px > .flex-col > .py-2').fill('333');
  await page.locator('div:nth-child(6) > div > div > .flex-3 > div > .w-max-250px > .pos-rel > .flex > .py-2').first().click();
  await page.getByText('Dawn3 Parent').click();
  await page.locator('div:nth-child(2) > .w-max-250px > .pos-rel > .flex > .py-2').click();
  await page.getByText('ramy hormz').click();
  await page.getByText('Save').nth(1).click();
  await new Promise((resolve) => setTimeout(resolve, 4000));
});
