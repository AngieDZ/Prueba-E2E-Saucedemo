class ProductsPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.removeButtons = page.getByRole('button', { name: 'Remove' });
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async agregarProductoAlCarrito(index) {
    const totalBotones = await this.addToCartButtons.count();
  
    if (index < totalBotones) {
      await this.addToCartButtons.nth(index).waitFor(); 
      await this.addToCartButtons.nth(index).click();
    } else {
      throw new Error(`Índice ${index} fuera de rango. Solo hay ${totalBotones} productos.`);
    }
  }

  async irAlCarrito() {
    await this.cartIcon.click();
  }

  async addAllToCart() {
    const addButtons = this.page.locator('.inventory_item button');
    const count = await addButtons.count();
    for (let i = 0; i < count; i++) {
      await addButtons.nth(i).click();
    }
  }
  
  async abrirMenu() {
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = ProductsPage;