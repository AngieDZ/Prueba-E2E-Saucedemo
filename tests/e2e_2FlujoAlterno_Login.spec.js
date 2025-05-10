const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const usuarios = require('../fixtures/usuarios');

test.describe('E2E 2 - Escenarios alternos de login y autenticación', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Validar error al usar credenciales incorrectas', async () => {
    await loginPage.login('usuario_inexistente', 'password_incorrecto');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('Validar que no se puede acceder a rutas internas sin autenticación', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
