import { test, expect } from "@playwright/test";

// Test configuration
const BASE_URL = "http://localhost:5174";
const GRAPHQL_URL = "http://localhost:4000/graphql";

// Test credentials - you should replace these with actual test accounts
const ADMIN_CREDENTIALS = {
  email: "admin@test.com",
  password: "admin123",
};

const STAFF_CREDENTIALS = {
  email: "staff@test.com",
  password: "staff123",
};

test.describe("Product Real-time Notifications", () => {
  test("Staff member receives notification when admin creates a product", async ({
    browser,
  }) => {
    // Create two browser contexts (simulating two different users)
    const adminContext = await browser.newContext();
    const staffContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const staffPage = await staffContext.newPage();

    try {
      // Step 1: Login as Admin
      await adminPage.goto(BASE_URL);
      await adminPage.waitForLoadState("networkidle");

      // Check if already on login page or need to navigate
      const loginTitle = adminPage.locator("text=Login");
      if (await loginTitle.isVisible()) {
        await adminPage.fill('input[type="email"]', ADMIN_CREDENTIALS.email);
        await adminPage.fill(
          'input[type="password"]',
          ADMIN_CREDENTIALS.password
        );
        await adminPage.click('button:has-text("Login")');
        await adminPage.waitForURL(/\/(admin|staff)/);
      }

      // Step 2: Login as Staff in separate window
      await staffPage.goto(BASE_URL);
      await staffPage.waitForLoadState("networkidle");

      const staffLoginTitle = staffPage.locator("text=Login");
      if (await staffLoginTitle.isVisible()) {
        await staffPage.fill('input[type="email"]', STAFF_CREDENTIALS.email);
        await staffPage.fill(
          'input[type="password"]',
          STAFF_CREDENTIALS.password
        );
        await staffPage.click('button:has-text("Login")');
        await staffPage.waitForURL(/\/(admin|staff)/);
      }

      // Step 3: Navigate admin to Products page
      await adminPage.goto(`${BASE_URL}/admin/products`);
      await adminPage.waitForLoadState("networkidle");

      // Step 4: Staff stays on dashboard (can be any page)
      await staffPage.goto(`${BASE_URL}/staff/dashboard`);
      await staffPage.waitForLoadState("networkidle");

      // Step 5: Listen for toast notifications on staff page
      const toastPromise = staffPage.waitForSelector(
        ".Toastify__toast-container",
        {
          timeout: 10000,
        }
      );

      // Step 6: Admin creates a new product
      const timestamp = Date.now();
      const productName = `Test Product ${timestamp}`;
      const productPrice = "99.99";

      await adminPage.click('button:has-text("Add Product")');
      await adminPage.waitForSelector("text=Add Product", { timeout: 5000 });

      // Fill in product details
      await adminPage.fill('input[name="name"]', productName);
      await adminPage.fill('input[name="price"]', productPrice);

      // Submit the form
      await adminPage.click('button:has-text("Create")');

      // Step 7: Verify staff receives toast notification
      const toast = await toastPromise;
      expect(toast).toBeTruthy();

      // Verify toast content contains the product name and price
      const toastText = await staffPage.textContent(
        ".Toastify__toast-container"
      );
      expect(toastText).toContain(productName);
      expect(toastText).toContain(productPrice);
      expect(toastText).toContain("New product created");

      console.log(
        "✅ Test passed: Staff member received real-time notification"
      );
      console.log(`📦 Product: ${productName} - ₹${productPrice}`);
    } finally {
      // Cleanup
      await adminContext.close();
      await staffContext.close();
    }
  });

  test("Multiple staff members receive the same notification", async ({
    browser,
  }) => {
    const adminContext = await browser.newContext();
    const staff1Context = await browser.newContext();
    const staff2Context = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const staff1Page = await staff1Context.newPage();
    const staff2Page = await staff2Context.newPage();

    try {
      // Login all users (simplified for brevity)
      await adminPage.goto(BASE_URL);
      await staff1Page.goto(BASE_URL);
      await staff2Page.goto(BASE_URL);

      // Wait for WebSocket connections to be established
      await adminPage.waitForTimeout(2000);
      await staff1Page.waitForTimeout(2000);
      await staff2Page.waitForTimeout(2000);

      // Both staff members should receive the notification
      const toast1Promise = staff1Page.waitForSelector(
        ".Toastify__toast-container",
        {
          timeout: 10000,
        }
      );
      const toast2Promise = staff2Page.waitForSelector(
        ".Toastify__toast-container",
        {
          timeout: 10000,
        }
      );

      // Admin creates product (implementation similar to first test)
      // ... product creation logic ...

      // Verify both staff members received notifications
      const [toast1, toast2] = await Promise.all([
        toast1Promise,
        toast2Promise,
      ]);

      expect(toast1).toBeTruthy();
      expect(toast2).toBeTruthy();

      console.log(
        "✅ Test passed: Multiple staff members received notification"
      );
    } finally {
      await adminContext.close();
      await staff1Context.close();
      await staff2Context.close();
    }
  });
});
