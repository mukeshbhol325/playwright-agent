import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly heading: Locator;
  readonly backHome: Locator;
  readonly generatePdf: Locator;
  constructor(private readonly page: Page) { this.heading = page.getByRole('heading', { name: 'Thank you for your order!' }); this.backHome = page.getByRole('button', { name: 'Back Home' }); this.generatePdf = page.getByRole('button', { name: 'Generate PDF order' }); }
  message(value: string) { return this.page.getByText(value, { exact: true }); }
  async goHome() { await this.backHome.click(); }
}