const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPages');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const usuarios = require('../fixtures/usuarios');
const datosPagos = require('../fixtures/datosPagos');

test.describe('Flujo E2E - Escenarios alternos relacionados al carrito y checkout', () => {
  let loginPage, productsPage, cartPage, checkoutPage, overviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);

    await loginPage.navigate();
    await loginPage.login(usuarios.standard.username, usuarios.standard.password);
  });

  test('Eliminar producto del carrito antes del checkout actualiza el total', async () => {
    await productsPage.agregarProductoAlCarrito(4);
    await productsPage.irAlCarrito();
  
    const totalInicial = await cartPage.obtenerTotalEnCarrito();
    await cartPage.eliminarProducto();
  
    await expect(cartPage.cartItems).toHaveCount(0);
  
    const totalFinal = await cartPage.obtenerTotalEnCarrito();
    expect(totalFinal).not.toBe(totalInicial);
  });
  

  test('No se puede acceder al checkout sin productos', async ({ page }) => {
  
    await expect(cartPage.checkoutButton).not.toBeVisible();
    await expect(page).not.toHaveURL(/.*\/checkout-step-one\.html/);
  });
  

  test('Validar formato y visibilidad de precios e impuestos en el resumen', async () => {
    await productsPage.agregarProductoAlCarrito(2);
    await productsPage.irAlCarrito();
    await cartPage.pasarACheckout();
    await checkoutPage.llenarFormulario(datosPagos.nombre, datosPagos.apellido, datosPagos.codigoPostal);
    await checkoutPage.enviarFormulario();

    const itemTotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();
    

    expect(itemTotal).toMatch(/\$\d+\.\d{2}/);
    expect(tax).toMatch(/\$\d+\.\d{2}/);
    expect(total).toMatch(/\$\d+\.\d{2}/);

    await expect(overviewPage.finishButton).toBeVisible();
  });
});
