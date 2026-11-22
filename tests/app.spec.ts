import { test, expect } from '@playwright/test';

test.describe('Farag AI Hub E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays updated Farag branding in title, header, why-us section, and footer', async ({ page }) => {
    await expect(page).toHaveTitle(/فرج Farag/);

    const header = page.locator('header');
    await expect(header.getByText('فرج', { exact: true })).toBeVisible();
    await expect(header.getByText('Farag', { exact: true })).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'لماذا يختار المحترفون خدمات فرج؟' })
    ).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer.getByText(/منصة فرج Farag/)).toBeVisible();
  });

  test('filters subscription plans accurately by category tabs', async ({ page }) => {
    const storeSection = page.locator('#store');

    // Default "الكل" shows all 6 subscription plans
    await expect(storeSection.getByRole('heading', { level: 3 })).toHaveCount(6);

    // Filter by LLMs
    await storeSection.getByRole('button', { name: 'نماذج لغوية (ChatGPT / Claude)' }).click();
    await expect(storeSection.getByRole('heading', { level: 3 })).toHaveCount(3);
    await expect(storeSection.getByRole('heading', { name: 'ChatGPT Plus', exact: true })).toBeVisible();
    await expect(storeSection.getByRole('heading', { name: 'Claude Pro' })).toBeVisible();

    // Filter by Image generation
    await storeSection.getByRole('button', { name: 'توليد الصور' }).click();
    await expect(storeSection.getByRole('heading', { level: 3 })).toHaveCount(1);
    await expect(storeSection.getByRole('heading', { name: 'Midjourney Standard' })).toBeVisible();

    // Filter by Coding (Cursor)
    await storeSection.getByRole('button', { name: 'البرمجة (Cursor)' }).click();
    await expect(storeSection.getByRole('heading', { level: 3 })).toHaveCount(1);
    await expect(storeSection.getByRole('heading', { name: 'Cursor AI Pro' })).toBeVisible();

    // Reset back to All
    await storeSection.getByRole('button', { name: 'الكل' }).click();
    await expect(storeSection.getByRole('heading', { level: 3 })).toHaveCount(6);
  });

  test('generates valid WhatsApp order links addressed to Farag', async ({ page }) => {
    const orderLinks = page.locator('#store').getByRole('link', { name: 'طلب الاشتراك وتأكيد الدفع' });
    await expect(orderLinks).toHaveCount(6);

    const firstHref = await orderLinks.first().getAttribute('href');
    expect(firstHref).toContain('https://wa.me/201000000000?text=');
    expect(decodeURIComponent(firstHref ?? '')).toContain('مرحباً فرج، أرغب في الاشتراك في باقة: ChatGPT Plus');
  });

  test('opens search modal, filters results dynamically, and handles no-match queries', async ({ page }) => {
    await page.getByRole('button', { name: /بحث سريع/ }).click();

    const searchInput = page.getByPlaceholder(/اكتب اسم الاشتراك/);
    await expect(searchInput).toBeVisible();

    // Search for Claude
    await searchInput.fill('Claude');
    await expect(page.getByRole('link', { name: /Claude Pro/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Claude 3.5 Sonnet/ })).toBeVisible();

    // Search for non-existent item
    await searchInput.fill('NonExistentToolXYZ');
    await expect(page.getByText('لا توجد نتائج مطابقة')).toBeVisible();
  });

  test('toggles FAQ accordion items on click', async ({ page }) => {
    const faqSection = page.locator('#faq');
    const firstAnswer = faqSection.getByText(/بمجرد إرسال إشعار التحويل عبر واتساب/);
    const secondQuestion = faqSection.getByRole('heading', { name: 'ما هي وسائل الدفع المحلية المعتمدة؟' });
    const secondAnswer = faqSection.getByText(/نقبل الدفع عبر شبكة المدفوعات اللحظية InstaPay/);

    // First FAQ is open by default
    await expect(firstAnswer).toBeVisible();
    await expect(secondAnswer).toBeHidden();

    // Click second FAQ question -> opens second, closes first
    await secondQuestion.click();
    await expect(secondAnswer).toBeVisible();
    await expect(firstAnswer).toBeHidden();

    // Click second FAQ question again -> collapses it
    await secondQuestion.click();
    await expect(secondAnswer).toBeHidden();
  });
});
