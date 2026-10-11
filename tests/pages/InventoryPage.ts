import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly menuButton: Locator;
  readonly cartButton: Locator;
  readonly sortProducts: Locator;
  constructor(private readonly page: Page) {
    this.title = page.getByText('Products', { exact: true });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.cartButton = page.getByRole('button', { name: /Cart/ });
    this.sortProducts = page.getByRole('combobox', { name: 'Sort products' });
  }
  product(name: string) {
    return this.page.locator('[data-test$="-title-link"]').filter({ hasText: name });
  }
  addButton(name: string) { return this.page.locator(`[data-test="add-to-cart-${name.toLowerCase().replaceAll(' ', '-').replaceAll('sauce-labs-', '')}"]`); }
  async sortBy(label: string) { await this.sortProducts.selectOption({ label }); }
  async openProduct(name: string) { await this.product(name).click(); }
  async openCart() { await this.cartButton.click(); }
}