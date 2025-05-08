import { Page } from '@playwright/test';

export class ProjectsPage {
  constructor(private page: Page) {}

  async clickProjectByName(name: string) {
    await this.page.locator(`//h4[text()="${name}"]`).click();
  }
}
