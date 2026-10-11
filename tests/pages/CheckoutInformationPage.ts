import { Locator, Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cancel: Locator;
  readonly errorMessage: Locator;
  constructor(private readonly page: Page) {
    this.firstName = page.getByLabel('First Name'); this.lastName = page.getByLabel('Last Name'); this.postalCode = page.getByLabel('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' }); this.cancel = page.getByRole('button', { name: 'Cancel' }); this.errorMessage = page.getByRole('alert');
  }
  async fill(first: string, last: string, postal: string) { await this.firstName.fill(first); await this.lastName.fill(last); await this.postalCode.fill(postal); }
  async continue() { await this.continueButton.click(); }
}