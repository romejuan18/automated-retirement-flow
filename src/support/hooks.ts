import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import dotenv from 'dotenv';

dotenv.config();

const timeout = parseInt(process.env.TIMEOUT || '15000', 10);
setDefaultTimeout(timeout);

Before(async function (this: CustomWorld) {
  await this.initPages();
  if (process.env.CI !== 'true') {
    console.log('CustomWorld initialized');
  }
});

After(async function (this: CustomWorld, scenario) {
  const isCI = process.env.CI === 'true';
  const shouldScreenshot = process.env.SCREENSHOT_ON_FAILURE !== 'false';

  if (scenario?.result?.status === 'FAILED' && shouldScreenshot) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
    if (!isCI) console.log('Screenshot attached to report');
  }

  await this.closeBrowser();
});
