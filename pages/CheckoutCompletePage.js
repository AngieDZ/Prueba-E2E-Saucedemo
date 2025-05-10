class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: /checkout: complete/i });
    this.confirmationMessage = page.getByRole('heading', { name: /thank you for your order/i });
    this.backHomeButton = page.getByRole('button', { name: /back home/i });
  }

  async muestraConfirmacion() {
    return await this.confirmationMessage.isVisible();
  }

  async irAlInicio() {
    await this.backHomeButton.click();
  }
}

module.exports = CheckoutCompletePage;