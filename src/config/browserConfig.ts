import { chromium, firefox, webkit, Browser } from 'playwright';
import dotenv from 'dotenv';
dotenv.config();

export async function launchBrowser(): Promise<Browser> {
  const isCI = process.env.CI === 'true';
  const displayAvailable = !!process.env.DISPLAY;
  const headless = isCI || !displayAvailable || String(process.env.HEADLESS).toLowerCase() !== 'false';
  const slowMo = isCI ? 0 : parseInt(process.env.SLOWMO || '0', 10);
  const browserType = (process.env.BROWSER || 'chromium').toLowerCase();

  if (!['chromium', 'firefox', 'webkit'].includes(browserType)) {
    throw new Error(`❌ Invalid BROWSER value: ${browserType}. Use chromium, firefox or webkit.`);
  }

  if (!isCI) {
    console.log(`🚀 Launching ${browserType} with headless=${headless}, slowMo=${slowMo}`);
  }

  switch (browserType) {
    case 'firefox':
      return await firefox.launch({ headless, slowMo });
    case 'webkit':
      return await webkit.launch({ headless, slowMo });
    case 'chromium':
    default:
      return await chromium.launch({ headless, slowMo });
  }
}
