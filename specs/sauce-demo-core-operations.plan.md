# Sauce Demo Core User Operations Test Plan

## Application Overview

Functional test plan for the Sauce Demo (Swag Labs) e-commerce application at https://www.saucedemo.com. The plan covers five core end-user operations: signing in, browsing/selecting products, managing the cart, entering checkout information, and reviewing/completing an order. Each test is independent and assumes a fresh browser context and no pre-existing cart state. Use standard_user / secret_sauce for valid authentication. The application exposes six products, product sorting, product detail views, cart controls, checkout validation, order totals, and completion confirmation.

## Test Scenarios

### 1. Core End-User Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with valid and invalid credentials

**File:** `tests/core-operations/sign-in.spec.ts`

**Steps:**
  1. Start from a fresh browser context at https://www.saucedemo.com with no stored session. Enter an invalid username and password, then click Login.
    - expect: The user remains on the login page.
    - expect: A clear authentication error is shown.
    - expect: No product catalog is displayed.
  2. Replace the credentials with username standard_user and password secret_sauce, then click Login.
    - expect: The user is routed to /inventory.html.
    - expect: The Swag Labs Products catalog is displayed.
    - expect: The cart is initially empty and the menu and sort controls are available.
  3. Reload the inventory page.
    - expect: The authenticated catalog remains usable without an unexpected login failure in the same session.

#### 1.2. Browse the catalog, sort products, and inspect a product

**File:** `tests/core-operations/browse-and-select-product.spec.ts`

**Steps:**
  1. Start from a fresh browser context, sign in as standard_user with secret_sauce, and remain on the Products page.
    - expect: Six products are visible: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, and Test.allTheThings() T-Shirt (Red).
  2. Open the Sort products control and select a different available sort order, such as Name (Z to A) or price order.
    - expect: The product list reorders according to the selected sort order.
    - expect: No product disappears or is duplicated.
  3. Open the Sauce Labs Backpack product details.
    - expect: The detail page identifies Sauce Labs Backpack.
    - expect: Its description and price of $29.99 are shown.
    - expect: An Add to cart action and Back to products action are available.
  4. Use Back to products and open another product detail, then return to the catalog.
    - expect: Navigation returns to the catalog without losing the authenticated session.
    - expect: The selected product detail and return navigation work consistently.

#### 1.3. Add, review, and remove an item from the cart

**File:** `tests/core-operations/manage-cart.spec.ts`

**Steps:**
  1. Start from a fresh browser context, sign in, open the Sauce Labs Backpack detail, and click Add to cart.
    - expect: The action changes to Remove.
    - expect: The cart indicator changes from empty to 1 item.
  2. Open the cart.
    - expect: The cart page shows one backpack with quantity 1 and the expected item description and $29.99 price.
    - expect: Continue Shopping and Checkout actions are available.
  3. Choose Continue Shopping, add a second distinct product, and reopen the cart.
    - expect: The cart indicator shows 2 items.
    - expect: Both selected products are present and each has quantity 1.
  4. Remove one item from the cart.
    - expect: The removed product is no longer listed.
    - expect: The cart count decreases to 1 and the remaining product is preserved.
  5. Remove the final item.
    - expect: The cart is empty and its count is cleared or shown as empty.
    - expect: Checkout cannot proceed with an item that is no longer in the cart.

#### 1.4. Enter and validate checkout information

**File:** `tests/core-operations/checkout-information.spec.ts`

**Steps:**
  1. Start from a fresh browser context, sign in, add the Sauce Labs Backpack, open the cart, and click Checkout.
    - expect: The Checkout: Your Information page is displayed.
    - expect: First Name, Last Name, and Zip/Postal Code fields are present, along with Cancel and Continue.
  2. Leave all fields blank and click Continue.
    - expect: The user remains on the information page.
    - expect: An error alert states First Name is required.
  3. Enter a valid first name and click Continue while leaving the other fields blank.
    - expect: The user remains on the information page.
    - expect: Validation identifies the next missing required checkout field rather than advancing to the overview.
  4. Enter Test, Customer, and 12345 into the three fields, then click Continue.
    - expect: The user advances to Checkout: Overview.
    - expect: The selected product is present in the order review.
    - expect: Payment, shipping, item total, tax, total, Cancel, and Finish are displayed.

#### 1.5. Review totals and complete an order

**File:** `tests/core-operations/complete-order.spec.ts`

**Steps:**
  1. Start from a fresh browser context, sign in, add only the Sauce Labs Backpack, enter Test / Customer / 12345 during checkout, and reach Checkout: Overview.
    - expect: The overview lists quantity 1 for Sauce Labs Backpack.
    - expect: The item total is $29.99, tax is $2.40, and total is $32.39.
    - expect: Payment shows SauceCard #31337 and shipping shows Free Pony Express Delivery.
  2. Click Cancel from the overview.
    - expect: Checkout is exited without placing the order.
    - expect: The user returns to the catalog or cart flow as implemented, and no completion confirmation is shown.
  3. Repeat the independent setup to reach Checkout: Overview and click Finish.
    - expect: The user reaches /checkout-complete.html.
    - expect: The page shows Checkout: Complete! and Thank you for your order!.
    - expect: The dispatch message is shown and the cart is empty.
    - expect: Back Home and Generate PDF order actions are available.
  4. Click Back Home.
    - expect: The user returns to the Products catalog in the authenticated session.
    - expect: No stale checkout confirmation blocks normal shopping.
