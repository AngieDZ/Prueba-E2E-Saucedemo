class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: /first name/i });
    this.lastNameInput = page.getByRole('textbox', { name: /last name/i });
    this.postalCodeInput = page.getByRole('textbox', { name: /zip\/postal code/i });
    this.continueButton = page.getByRole('button', { name: /continue/i });
  
  }

  async llenarFormulario(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async enviarFormulario() {
    await this.continueButton.click();
  }
}

module.exports = CheckoutPage;