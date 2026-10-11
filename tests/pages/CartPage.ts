import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly continueShopping: Locator;
  readonly checkout: Locator;
  constructor(private readonly page: Page) { this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' }); this.checkout = page.getByRole('button', { name: 'Checkout' }); }
  item(name: string) { return this.page.getByText(name, { exact: true }); }
  async continueShoppingAction() { await this.continueShopping.click(); }
  async checkoutAction() { await this.checkout.click(); }
  async removeItem(name: string) { const slug = name.toLowerCase().replaceAll(' ', '-'); await this.page.locator(`[data-test="remove-${slug}"]`).click(); }
}
