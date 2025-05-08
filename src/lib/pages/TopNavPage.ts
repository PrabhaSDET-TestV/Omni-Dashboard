import { Page } from '@playwright/test';

export class TopNavPage {
  constructor(private page: Page) {}

  async toggleTheme() {
    await this.page.getByRole('button', { name: 'Toggle color scheme' }).click();
  }

  async signOut() {
    await this.page.getByRole('button', { name: 'Sign out' }).click();
  }
}
