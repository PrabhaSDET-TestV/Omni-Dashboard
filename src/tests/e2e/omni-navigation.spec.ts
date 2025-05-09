import { test, expect } from '@playwright/test';
import { SignInPage } from '../../lib/pages/SignInPage';
import { ProjectsPage } from '../../lib/pages/ProjectsPage';
import { MyProjectsPage } from '../../lib/pages/MyProjectsPage';
import { TopNavPage } from '../../lib/pages/TopNavPage';

test('Sign In - Omni Dashboard', { tag: '@sanity' }, async ({ page }) => {
  const signInPage = new SignInPage(page);
  const projectsPage = new ProjectsPage(page);
  const myProjectsPage = new MyProjectsPage(page);
  const topNav = new TopNavPage(page);

  // Navigate to Sign In page
  await signInPage.goto();

  await page.waitForLoadState('networkidle');
  // Capture full page screenshot before interaction (initial state)
  await expect(page).toHaveScreenshot({ fullPage: true });
  
  await signInPage.clickSignIn();
  await signInPage.fillUsername(`${process.env.USERNAME}`);
  await signInPage.clickContinueAfterUsername();
  await signInPage.fillPassword('Test@100@#$');
  await signInPage.clickContinueAfterPassword();

  // Wait for navigation to Projects page
  await expect(page).toHaveURL(/projects/);

  await page.waitForLoadState('networkidle');
  await page.waitForSelector('div[data-with-border="true"]', { state: 'visible' });

  // Screenshot after login success
  await expect(page).toHaveScreenshot('projects-page.png');

  // Click into specific project
  await projectsPage.clickProjectByName('WDIO tests');
  await page.waitForSelector(`h2.m_8a5d1357.mantine-Title-root`, { state: 'visible' });
  await expect(page).toHaveScreenshot('overview-tab.png');

  await myProjectsPage.clickTab('Builds');
  await page.waitForTimeout(3000);
  await page.waitForSelector(`div[data-with-border='true']`, { state: 'visible' });
  await expect(page).toHaveScreenshot('builds-tab.png');
    
  await myProjectsPage.clickTab('Trends');
  await page.waitForTimeout(3000);
  await page.waitForSelector(`div[data-with-border='true']`, { state: 'visible' });
  await expect(page).toHaveScreenshot('trends-tab.png');

  await myProjectsPage.clickTab('Anomalies');
  await page.waitForTimeout(6000);
  await page.waitForSelector(`div[data-with-border='true']`, { state: 'visible' });
  await expect(page).toHaveScreenshot('anomalies-tab.png');

  await myProjectsPage.clickTab('Settings');
  await page.waitForTimeout(20000);
  await page.waitForSelector(`div[data-with-border='true']`, { state: 'visible' });
  await expect(page).toHaveScreenshot('settings-tab.png');

  await topNav.toggleTheme();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('after-theme-toggle.png');

  await topNav.toggleTheme();

});
