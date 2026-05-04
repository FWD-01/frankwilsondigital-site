import { test, expect, type Page } from "@playwright/test"

const PAYSTACK_SCRIPT_URL = "https://js.paystack.co/v1/inline.js"

const PAYSTACK_SUCCESS_MOCK = `
  window.PaystackPop = {
    setup: function(config) {
      return { openIframe: function() { config.onSuccess({ reference: 'TEST_REF_123' }); } };
    }
  };
`

async function mockPaystackSuccess(page: Page) {
  await page.route(PAYSTACK_SCRIPT_URL, (route) =>
    route.fulfill({ contentType: "text/javascript", body: PAYSTACK_SUCCESS_MOCK })
  )
}

async function mockPaystackUnavailable(page: Page) {
  await page.route(PAYSTACK_SCRIPT_URL, (route) =>
    route.fulfill({ contentType: "text/javascript", body: "// PaystackPop not available" })
  )
}

const PACKAGES = [
  { name: "Essential", price: "R3 500" },
  { name: "Momentum", price: "R6 000" },
]

test.describe("Payment flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockPaystackSuccess(page)
    await page.goto("/")
  })

  for (const pkg of PACKAGES) {
    test(`${pkg.name} — Get started opens payment modal`, async ({ page }) => {
      const card = page.locator("article").filter({ hasText: pkg.name })
      await card.getByRole("button", { name: "Get started" }).click()
      const dialog = page.getByRole("dialog")
      await expect(dialog).toBeVisible()
      await expect(dialog).toContainText(pkg.name)
    })
  }

  test("modal requires email before submitting", async ({ page }) => {
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await page.getByRole("button", { name: "Proceed to payment" }).click()
    // HTML5 required validation blocks submit — modal stays open, no error state shown
    await expect(dialog).toBeVisible()
    await expect(dialog.locator("[role=alert]")).not.toBeVisible()
  })

  test("shows error when PaystackPop is not loaded", async ({ page }) => {
    await mockPaystackUnavailable(page)
    await page.goto("/")
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    await page.getByLabel("Your email").fill("test@example.com")
    await page.getByRole("button", { name: "Proceed to payment" }).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog.locator("[role=alert]")).toContainText("Payment system not loaded")
  })

  test("shows success state after payment", async ({ page }) => {
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    await page.getByLabel("Your email").fill("test@example.com")
    await page.getByRole("button", { name: "Proceed to payment" }).click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toContainText("You're in.")
    await expect(dialog).toContainText("Essential")
  })

  test("Escape key closes modal", async ({ page }) => {
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog")).not.toBeVisible()
  })

  test("clicking backdrop closes modal", async ({ page }) => {
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.mouse.click(10, 10)
    await expect(page.getByRole("dialog")).not.toBeVisible()
  })

  test("Done button closes modal after successful payment", async ({ page }) => {
    const card = page.locator("article").filter({ hasText: "Essential" })
    await card.getByRole("button", { name: "Get started" }).click()
    await page.getByLabel("Your email").fill("test@example.com")
    await page.getByRole("button", { name: "Proceed to payment" }).click()
    await expect(page.getByRole("dialog")).toContainText("You're in.")
    await page.getByRole("button", { name: "Done" }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()
  })
})
