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

  // Capture screenshot before interaction (initial state)
  await expect(page).toHaveScreenshot('01-signin-page.png');

  await signInPage.fillUsername(process.env.USERNAME!);
  await signInPage.clickContinueAfterUsername();
  await signInPage.fillPassword(process.env.PASSWORD!);
  await signInPage.clickContinueAfterPassword();

  // Wait for navigation to Projects page
  await expect(page).toHaveURL(/projects/);
  // Screenshot after login success
  await expect(page).toHaveScreenshot('02-projects-page.png');

  // Click into specific project
  await projectsPage.clickProjectByName('WDIO tests');
  await myProjectsPage.clickTab('Builds');

  // Screenshot on MyProjects - Builds tab
  await expect(page).toHaveScreenshot('03-builds-tab.png');

  await topNav.toggleTheme();

  // Screenshot after theme toggle
  await expect(page).toHaveScreenshot('04-after-theme-toggle.png');
});
