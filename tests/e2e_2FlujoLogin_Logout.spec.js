const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPages');
const usuarios = require('../fixtures/usuarios');

test.describe('Flujo E2E 2 - Login y restricciones de usuario', () => {
  let loginPage, productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
  });

  test('1. Intentar login sin completar campos', async () => {
    await loginPage.loginConCamposVacios();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('2. Login con usuario bloqueado y validar mensaje de error', async () => {
    await loginPage.login(usuarios.locked.username, usuarios.locked.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('3. Login con usuario válido y redirección a productos', async ({ page }) => {
    await loginPage.login(usuarios.standard.username, usuarios.standard.password);
    await expect(page).toHaveURL(/.*\/inventory.html/);
  });

  test('4. Hacer logout y validar redirección al login', async ({ page }) => {
    await loginPage.login(usuarios.standard.username, usuarios.standard.password);
    await productsPage.abrirMenu();
    await productsPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeVisible();
  });
});
