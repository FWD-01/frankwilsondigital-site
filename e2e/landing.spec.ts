import { test, expect } from "@playwright/test"

// ── Existing ────────────────────────────────────────────────────────────────

test("landing page loads and hero is visible", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Frank Wilson Digital/)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})

test("footer is present", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("contentinfo")).toBeVisible()
})

// ── Navigation ───────────────────────────────────────────────────────────────

test("header Free demo link points to #demo", async ({ page }) => {
  await page.goto("/")
  const demoLink = page.getByRole("navigation").getByRole("link", { name: /free demo/i })
  await expect(demoLink).toBeVisible()
  await expect(demoLink).toHaveAttribute("href", "#demo")
})

test("mobile nav opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/")
  const menuBtn = page.getByRole("button", { name: /open menu/i })
  await expect(menuBtn).toBeVisible()
  await menuBtn.click()
  await expect(page.getByRole("link", { name: /free demo/i }).first()).toBeVisible()
  await page.getByRole("button", { name: /close menu/i }).click()
  await expect(page.getByRole("link", { name: /free demo/i }).first()).not.toBeVisible()
})

// ── Sections present ─────────────────────────────────────────────────────────

test("all main section IDs are in the DOM", async ({ page }) => {
  await page.goto("/")
  for (const id of ["packages", "demo", "why-system", "use-cases", "how-we-work"]) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
})

// ── Packages ─────────────────────────────────────────────────────────────────

test("packages section shows three package cards", async ({ page }) => {
  await page.goto("/")
  const cards = page.locator("#packages article")
  await expect(cards).toHaveCount(3)
})

test("Starter and Growth CTAs are buttons (not links)", async ({ page }) => {
  await page.goto("/")
  const getStarted = page.locator("#packages").getByRole("button", { name: /get started/i })
  await expect(getStarted).toHaveCount(2)
})

test("Authority CTA button is present", async ({ page }) => {
  await page.goto("/")
  const bookCall = page.locator("#packages").getByRole("button", { name: /book a call/i })
  await expect(bookCall).toBeVisible()
})

test("clicking Get Started opens Paystack email modal", async ({ page }) => {
  await page.goto("/")
  await page.locator("#packages").getByRole("button", { name: /get started/i }).first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect(page.locator("#ps-email")).toBeVisible()
})

test("Paystack modal closes on Escape", async ({ page }) => {
  await page.goto("/")
  await page.locator("#packages").getByRole("button", { name: /get started/i }).first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).not.toBeVisible()
})

// ── Demo form ────────────────────────────────────────────────────────────────

test("demo form submits and shows success state", async ({ page }) => {
  await page.route("/api/demo", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' })
  )
  await page.goto("/")
  await page.locator("#demo").scrollIntoViewIfNeeded()

  await page.getByLabel(/your name/i).fill("Test User")
  await page.getByLabel(/email/i).first().fill("test@example.com")
  await page.getByLabel(/business/i).fill("Test Co")
  await page.getByRole("button", { name: /book.*demo/i }).click()

  await expect(page.getByText(/you're booked in/i)).toBeVisible({ timeout: 5000 })
})

test("demo form shows error when API fails", async ({ page }) => {
  await page.route("/api/demo", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: '{"error":"fail"}' })
  )
  await page.goto("/")
  await page.locator("#demo").scrollIntoViewIfNeeded()

  await page.getByLabel(/your name/i).fill("Test User")
  await page.getByLabel(/email/i).first().fill("test@example.com")
  await page.getByLabel(/business/i).fill("Test Co")
  await page.getByRole("button", { name: /book.*demo/i }).click()

  await expect(page.getByRole("alert")).toBeVisible({ timeout: 5000 })
})

// ── 404 ──────────────────────────────────────────────────────────────────────

test("unknown route shows custom 404 page", async ({ page }) => {
  await page.goto("/does-not-exist")
  await expect(page.getByRole("heading", { name: /404/i })).toBeVisible()
})

// ── Accessibility ─────────────────────────────────────────────────────────────

test("page has a single h1", async ({ page }) => {
  await page.goto("/")
  const h1s = page.getByRole("heading", { level: 1 })
  await expect(h1s).toHaveCount(1)
})

test("all images have alt attributes", async ({ page }) => {
  await page.goto("/")
  const imgs = page.locator("img:not([alt])")
  await expect(imgs).toHaveCount(0)
})
