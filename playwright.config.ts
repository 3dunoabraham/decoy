import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: [
    // "scripts/playwright/inventoryBrowse.enterUnit.ts",
    // "scripts/playwright/unitEdit.topSection.chro.ts",
    // "scripts/playwright/unitEdit.topSection.fire.ts",
    "scripts/playwright/imsLanding.unitAdd.ts",
  ],
  use: {
    headless: false,
    screenshot: "on",
    video: "on",
    viewport: { width: 1700, height: 720 }, // override what's coming in through the spread from above
  },
  reporter: [["dot"], ["json", {
    outputFile: "scripts/playwright/jsonReports/jsonReport.json"
  }], ["html", {
    open: "never",
  }]]
};

export default config;
