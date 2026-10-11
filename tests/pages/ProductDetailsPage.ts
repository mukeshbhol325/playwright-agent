import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly addToCart: Locator;
  readonly remove: Locator;
  readonly backToProducts: Locator;
  constructor(private readonly page: Page) {
    this.addToCart = page.locator('[data-test="add-to-cart"]');
    this.remove = page.locator('[data-test="remove"]');
    this.backToProducts = page.getByRole('button', { name: 'Back to products' });
  }
  productName(name: string) { return this.page.getByText(name, { exact: true }); }
  price(value: string) { return this.page.getByText(value, { exact: true }); }
  async addItem() { await this.addToCart.click(); }
  async back() { await this.backToProducts.click(); }
}