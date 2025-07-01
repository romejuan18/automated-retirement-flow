import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '@support/world';

Given('I navigate to the homepage and accept cookies', async function (this: CustomWorld) {
  const baseUrl = process.env.BASE_URL as string;
  await this.homePage.goto(baseUrl);
  await this.homePage.acceptCookies();
});

When('I go to the Retirement and Wealth page', async function (this: CustomWorld) {
  await this.homePage.hoverOverIndustries();
  await this.homePage.clickRetirementAndWealth();
});

When('I scroll to the innovation section', async function (this: CustomWorld) {
  await this.retirementPage.scrollToInnovationSection();
});

When('I hover over the AI & Machine Learning card', async function (this: CustomWorld) {
  await this.retirementPage.hoverOverAICard();
});

Then('I should see the AI card back text', async function (this: CustomWorld) {
  const text = await this.retirementPage.getAICardBackText();
  console.log('AI card back text:', text?.trim());
});

When("I click Let's Get Started", async function (this: CustomWorld) {
  await this.retirementPage.clickLetsGetStarted();
});

Then('I should be on the contact page', async function (this: CustomWorld) {
  await this.contactPage.assertIsOnContactPage();
});

Then('the title should contain {string}', async function (this: CustomWorld, expected: string) {
  const title = await this.contactPage.getTitleText();
  const currentUrl = this.page.url();

  await this.attach(`Current page URL: ${currentUrl}`, 'text/plain');
  await this.attach(`Contact page title: ${title}`, 'text/plain');

  assert(title?.trim().includes(expected));
});

export {};