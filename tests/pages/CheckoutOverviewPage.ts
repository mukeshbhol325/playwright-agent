import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly cancel: Locator;
  readonly finish: Locator;
  constructor(private readonly page: Page) { this.cancel = page.getByRole('button', { name: 'Cancel' }); this.finish = page.getByRole('button', { name: 'Finish' }); }
  text(value: string) { return this.page.getByText(value, { exact: true }); }
  async cancelOrder() { await this.cancel.click(); }
  async finishOrder() { await this.finish.click(); }
}