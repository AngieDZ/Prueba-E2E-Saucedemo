class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.removeButtons = page.getByRole('button', { name: 'Remove' });
  }

  async eliminarProducto() {
    const count = await this.removeButtons.count();
    if (count > 0) {
      await this.removeButtons.nth(0).click();
    } else {
      throw new Error('No hay productos en el carrito para eliminar.');
    }
  }

  async pasarACheckout() {
    await this.checkoutButton.click();
  }

  async obtenerTotalEnCarrito() {
    const prices = this.page.locator('.inventory_item_price');
    const count = await prices.count();
  
    if (count === 0) {
      return 0; 
    }
  
    const totalText = await prices.first().innerText();
    return parseFloat(totalText.replace('$', ''));
  }
  
}
module.exports = CartPage;
