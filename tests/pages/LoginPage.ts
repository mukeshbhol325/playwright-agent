import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  constructor(private readonly page: Page) {
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('alert');
  }
  async goto() { await this.page.goto('https://www.saucedemo.com'); }
  async login(username: string, password: string) { await this.username.fill(username); await this.password.fill(password); await this.loginButton.click(); }
}