import { setWorldConstructor, IWorldOptions, IWorld } from '@cucumber/cucumber';
import { Page, Browser } from 'playwright';

import HomePage from '../pages/HomePage';
import RetirementPage from '../pages/RetirementPage';
import ContactPage from '../pages/ContactPage';
import { launchBrowser } from '../config/browserConfig';

export class CustomWorld implements IWorld {
  browser!: Browser;
  page!: Page;
  homePage!: HomePage;
  retirementPage!: RetirementPage;
  contactPage!: ContactPage;
  parameters: any;

  attach: IWorld['attach'];
  log: IWorld['log'];
  link: IWorld['link'];

  constructor(options: IWorldOptions) {
    this.parameters = options.parameters;
    this.attach = options.attach;
    this.log = options.log;
    this.link = (url: string) => {
      this.log(`Linked: ${url}`);
    };
  }

  async initPages(): Promise<void> {
    this.browser = await launchBrowser();
    this.page = await this.browser.newPage();

    const timeout = parseInt(process.env.TIMEOUT || '15000', 10);
    this.page.setDefaultTimeout(timeout);

    this.homePage = new HomePage(this.page);
    this.retirementPage = new RetirementPage(this.page);
    this.contactPage = new ContactPage(this.page);
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
