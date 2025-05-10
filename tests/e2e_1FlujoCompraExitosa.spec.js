const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPages');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');
const usuarios = require('../fixtures/usuarios');
const datosPagos = require('../fixtures/datosPagos');


test.describe('Flujo E2E - Realizar compra de todos los productos disponibles como usuario estándar', () => {
  let loginPage, productsPage, cartPage, checkoutPage, overviewPage, completePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);
    await loginPage.navigate();
  });

  test('Compra exitosa de productos', async () => {
    await test.step('Iniciar sesión', async () => {
      await loginPage.login(usuarios.standard.username, usuarios.standard.password);
    });

    await test.step('Agregar productos al carrito', async () => {
      await productsPage.addAllToCart();
      await productsPage.irAlCarrito();
    });

    await test.step('Completar proceso de checkout', async () => {
      await cartPage.pasarACheckout();
      await checkoutPage.llenarFormulario(datosPagos.nombre, datosPagos.apellido, datosPagos.codigoPostal);
      await checkoutPage.enviarFormulario();
      await overviewPage.finalizarLaCompra();
    });

    await test.step('Validar compra completa', async () => {
      await expect(completePage.confirmationMessage).toBeVisible();
      await expect(completePage.confirmationMessage).toHaveText('Thank you for your order!');
    });
  });
});