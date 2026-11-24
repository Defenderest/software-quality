import { test, expect } from '@playwright/test';

test('TC-01: Успішна авторизація', async ({ page }) => {
    // Відкриваємо сторінку
    await page.goto('/');

    // Вводимо логін і пароль
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    // Натискаємо Login
    await page.getByTestId('login-button').click();

    // Перевіряємо результат
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('TC-02: Авторизація з неправильним паролем', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong_password');

    await page.getByTestId('login-button').click();

    // Перевіряємо повідомлення про помилку
    const errorMessage = page.getByTestId('error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
});

test('TC-03: Додавання товару до кошика', async ({ page }) => {
    // Відкриваємо SauceDemo і авторизуємося
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    // Додаємо товар до кошика
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

    // Перевіряємо індикатор кошика
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Відкриваємо кошик
    await page.locator('.shopping_cart_link').click();

    // Перевіряємо назву товару в кошику
    await expect(page.getByText('Sauce Labs Bolt T-Shirt', { exact: true })).toBeVisible();
});
