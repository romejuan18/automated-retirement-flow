import { Page, Locator } from 'playwright';
import BasePage from '../core/BasePage';

export default class HomePage extends BasePage {
  private acceptCookiesButton!: Locator;
  private industriesMenu!: Locator;
  private retirementAndWealthLink!: Locator;

  constructor(page: Page) {
    super(page);
    this.initSelectors();
  }

  protected initSelectors(): void {
    this.acceptCookiesButton = this.page.locator('button.cky-btn-accept');
    this.industriesMenu = this.page.locator('li#menu-item-4871');
    this.retirementAndWealthLink = this.page.getByRole('link', { name: 'Retirement and wealth' });
  }

  async goto(url: string) {
  try {
    await this.page.goto(url, { waitUntil: 'load', timeout: 10000 });
  } catch (error) {
    console.warn(`⚠️ First attempt failed, retrying...`);
    await this.page.waitForTimeout(2000);
    await this.page.goto(url, { waitUntil: 'load', timeout: 10000 });
  }
}


  async acceptCookies(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  async hoverOverIndustries(): Promise<void> {
    await this.industriesMenu.hover();
  }

  async clickRetirementAndWealth(): Promise<void> {
    await this.retirementAndWealthLink.click();
  }
}
