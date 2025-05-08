import { Page } from '@playwright/test';

export class SignInPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://omni-dashboard-inky.vercel.app/');
  }

  async fillUsername(username: string) {
    await this.page.locator('#identifier-field').fill(username);
  }

  async clickContinueAfterUsername() {
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
  }

  async fillPassword(password: string) {
    const passwordField = this.page.locator('#password-field');
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.fill(password);
  }

  async clickContinueAfterPassword() {
    await this.page.getByRole('button', { name: 'Continue' }).last().click();
  }

  async clickSignIn() {
    await this.page.locator('button:has(span.m_811560b9:has-text("Sign In"))').click();
  }
}
