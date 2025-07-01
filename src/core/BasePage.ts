import { Locator, Page } from 'playwright';

export default abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected abstract initSelectors(): void;

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async waitForElement(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async click(locator: Locator, timeout = 5000): Promise<void> {
    await this.waitForElement(locator, timeout);
    await locator.click();
  }

  async type(locator: Locator, text: string, timeout = 5000): Promise<void> {
    await this.waitForElement(locator, timeout);
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() ?? '';
  }
}
