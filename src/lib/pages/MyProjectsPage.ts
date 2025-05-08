import { Page } from '@playwright/test';

export class MyProjectsPage {
  constructor(private page: Page) {}

  async clickTab(tabName: 'Builds' | 'Trends' | 'Anomalies' | 'Settings') {
    await this.page.getByText(tabName, { exact: true }).click();
  }
}
