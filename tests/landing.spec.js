import { test, expect } from '@playwright/test';
test('landing page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Build resilient systems that.*scale across agents/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start Learning' })).toBeVisible();
});
test('navigation links work', async ({ page }) => {
    await page.goto('/');
    // Test docs link
    await page.getByRole('link', { name: 'docs' }).click();
    await expect(page).toHaveURL(/\/docs\/00-start-here\/?$/);
    await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();
});
test('search button is accessible', async ({ page }) => {
    await page.goto('/');
    // Search button has role="button" and aria-label="Search"
    await expect(page.getByRole('button', { name: 'Search' }).first()).toBeVisible();
});
