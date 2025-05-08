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
    await this.page.locator('#password-field').fill(password);
  }

  async clickContinueAfterPassword() {
    await this.page.getByRole('button', { name: 'Continue' }).last().click();
  }
}
