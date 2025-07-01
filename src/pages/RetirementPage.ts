import { Locator, Page } from 'playwright';
import BasePage from '../core/BasePage';

export default class RetirementPage extends BasePage {
  private aiCardFront!: Locator;
  private aiCardBackText!: Locator;
  private letsGetStartedBtn!: Locator;
  private innovationSectionTitle!: Locator;

  constructor(page: Page) {
    super(page);
    this.initSelectors();
  }

  protected initSelectors(): void {
    this.innovationSectionTitle = this.page.locator('h2.section-title:has-text("Powering innovation")');
    this.aiCardFront = this.page.locator('.card-text', { hasText: 'AI & Machine learning' });
    this.aiCardBackText = this.page.locator('.flip-card-back .card-text.small', {
      hasText: 'Automate your operations'
    });
    this.letsGetStartedBtn = this.page.locator('a.btn[title*="Let\'s get started"]');
  }

  async scrollToInnovationSection(): Promise<void> {
    await this.innovationSectionTitle.scrollIntoViewIfNeeded();
    await this.innovationSectionTitle.waitFor({ state: 'visible' });
  }

  async hoverOverAICard(): Promise<void> {
    await this.aiCardFront.hover();
    await this.page.waitForTimeout(500);
  }

  async getAICardBackText(): Promise<string | null> {
    return await this.aiCardBackText.textContent();
  }

  async clickLetsGetStarted(): Promise<void> {
    await this.letsGetStartedBtn.scrollIntoViewIfNeeded();
    await this.letsGetStartedBtn.click();
  }
}
