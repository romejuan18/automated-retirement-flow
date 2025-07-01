import { Locator, Page } from 'playwright';
import assert from 'assert';
import BasePage from '../core/BasePage';

export default class ContactPage extends BasePage {
  private title!: Locator;

  constructor(page: Page) {
    super(page);
    this.initSelectors();
  }


  protected initSelectors(): void {
    this.title = this.page.locator('h1.section-title:has-text("Let’s talk")');
  }

  async assertIsOnContactPage(): Promise<void> {
    assert(/.*\/contact\/$/.test(this.page.url()), 'URL does not match expected pattern');
  }

  async getTitleText(): Promise<string | null> {
    return await this.title.textContent();
  }
}
