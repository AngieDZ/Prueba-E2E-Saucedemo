class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: /username/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('heading', { level: 3 });
  }
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/', { timeout: 30000 });   
  }
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.waitFor();
    await this.loginButton.click();
  }
  async loginConCamposVacios() {
    await this.loginButton.click();
  }
  
  async mensajeDeErrorVisible() {
    return await this.errorMessage.isVisible();
  }
 
}
module.exports = LoginPage;
 
  
   
  