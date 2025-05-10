class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    
    this.cartItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.getByRole('button', { name: /finish/i });
  }

  
  async getSubtotal() {
    return await this.subtotalLabel.textContent();
  }

  async getTax() {
    return await this.taxLabel.textContent();
  }

  async getTotal() {
    return await this.totalLabel.textContent();
  }

  async finalizarLaCompra() {
    await this.finishButton.click();
  }
}
module.exports = CheckoutOverviewPage;
