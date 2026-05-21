import { test, expect, type Page } from "@playwright/test"


async function mockTurnstile(page: Page) {
  await page.addInitScript(() => {
    window.turnstile = {
      render: (_el: HTMLElement, opts: Record<string, unknown>) => {
        ;(opts.callback as (t: string) => void)("mock-turnstile-token")
        return "mock-widget-id"
      },
      remove: () => {},
      reset: () => {},
    }
  })
}

async function mockDemoApi(page: Page) {
  await page.route("/api/demo", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"success":true}',
    })
  )
}

async function setRegionCookie(page: Page, region: "za" | "international") {
  await page.context().addCookies([
    {
      name: "region",
      value: region,
      domain: "localhost",
      path: "/",
    },
  ])
}


async function fillDemoForm(page: Page) {
  await page.getByLabel("Full Name").fill("Jane Doe")
  await page.getByLabel("Business Name").fill("Acme Corp")
  await page.getByLabel("Industry").selectOption("Technology / SaaS")
  await page.getByLabel("Who manages your content now?").selectOption("Nobody")
  await page.getByLabel("How often do you post?").selectOption("Never")
  await page.getByLabel("Main goal for social media?").selectOption("Get more leads")
  await page.getByLabel("Email").fill("jane@example.com")
  await page.getByLabel("WhatsApp Number").fill("+27820000000")
  await page.getByLabel("Biggest Challenge").fill("No time to post consistently")
  await page.getByLabel(/I agree to the/i).check()
}

// ── Demo modal — ZA region ────────────────────────────────────────────────────

test.describe("Demo modal — ZA region", () => {
  test.beforeEach(async ({ page }) => {
    await mockTurnstile(page)
    await mockDemoApi(page)
    await page.goto("/")
    await setRegionCookie(page, "za")
    await page.reload()
  })

  test("opens to step 1 with qualification form", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(/let's prepare your content strategy/i)).toBeVisible()
    await expect(dialog.getByText(/step 1 of 2/i)).toBeVisible()
  })

  test("happy path — form submits and shows step 2 booking screen", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()

    await fillDemoForm(page)
    await dialog.getByRole("button", { name: /submit details/i }).click()

    await expect(dialog.getByText(/you're in/i)).toBeVisible({ timeout: 5000 })
    await expect(dialog.getByText(/step 2 of 2/i)).toBeVisible()
    await expect(dialog.getByRole("link", { name: /pick your time slot/i })).toBeVisible()
  })

  test("step 2 personalises greeting with first name", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    await fillDemoForm(page)
    await page.getByRole("dialog").getByRole("button", { name: /submit details/i }).click()

    await expect(page.getByRole("dialog").getByText(/you're in, jane/i)).toBeVisible({ timeout: 5000 })
  })

  test("modal closes and resets to step 1 on close", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    const dialog = page.getByRole("dialog")
    await fillDemoForm(page)
    await dialog.getByRole("button", { name: /submit details/i }).click()
    await expect(dialog.getByText(/you're in/i)).toBeVisible({ timeout: 5000 })

    await dialog.getByRole("button", { name: /close/i }).click()
    await expect(dialog).not.toBeVisible()

    // Re-open — should be back at step 1
    await page.getByRole("button", { name: /free demo/i }).first().click()
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(/step 1 of 2/i)).toBeVisible()
    await expect(dialog.getByText(/let's prepare your content strategy/i)).toBeVisible()
  })

  test("Escape key closes modal", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog")).not.toBeVisible()
  })

  test("backdrop click closes modal", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.mouse.click(10, 10)
    await expect(page.getByRole("dialog")).not.toBeVisible()
  })
})

// ── Demo modal — International region ────────────────────────────────────────

test.describe("Demo modal — international region", () => {
  test.beforeEach(async ({ page }) => {
    await mockTurnstile(page)
    await mockDemoApi(page)
    await page.goto("/")
    await setRegionCookie(page, "international")
    await page.reload()
  })

  test("happy path — step 2 shows booking link", async ({ page }) => {
    await page.getByRole("button", { name: /free demo/i }).first().click()
    const dialog = page.getByRole("dialog")
    await fillDemoForm(page)
    await dialog.getByRole("button", { name: /submit details/i }).click()

    await expect(dialog.getByText(/you're in/i)).toBeVisible({ timeout: 5000 })
    await expect(dialog.getByRole("link", { name: /pick your time slot/i })).toBeVisible()
  })
})

// ── Geo-region cookie ─────────────────────────────────────────────────────────

test.describe("Geo-detection cookie", () => {
  test("sets region cookie to za on first load (no header = fallback)", async ({ page }) => {
    await page.goto("/")
    const cookies = await page.context().cookies()
    const region = cookies.find((c) => c.name === "region")
    expect(region).toBeDefined()
    expect(region?.value).toBe("za")
  })

  test("does not overwrite existing region cookie", async ({ page }) => {
    await page.goto("/")
    await setRegionCookie(page, "international")
    await page.reload()
    const cookies = await page.context().cookies()
    const region = cookies.find((c) => c.name === "region")
    expect(region?.value).toBe("international")
  })
})

// ── Packages geo-pricing ──────────────────────────────────────────────────────

test.describe("Packages — geo-aware pricing", () => {
  test("ZA region shows ZAR prices", async ({ page }) => {
    await page.goto("/")
    await setRegionCookie(page, "za")
    await page.reload()
    const packages = page.locator("#packages")
    await expect(packages).toContainText("R3")
    await expect(packages).not.toContainText("$195")
  })

  test("international region shows USD prices", async ({ page }) => {
    await page.goto("/")
    await setRegionCookie(page, "international")
    await page.reload()
    const packages = page.locator("#packages")
    await expect(packages).toContainText("$")
    await expect(packages).not.toContainText("R3 500")
  })
})

// ── Form validation ───────────────────────────────────────────────────────────

test.describe("Demo qualify form validation", () => {
  test.beforeEach(async ({ page }) => {
    await mockTurnstile(page)
    await page.goto("/")
    await setRegionCookie(page, "za")
    await page.reload()
    await page.getByRole("button", { name: /free demo/i }).first().click()
  })

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("dialog").getByRole("button", { name: /submit details/i }).click()
    await expect(page.getByRole("alert").first()).toBeVisible()
  })

  test("shows captcha error when Turnstile not completed", async ({ page }) => {
    // Override init script — don't mock Turnstile so token stays null
    await page.addInitScript(() => {
      window.turnstile = {
        render: () => "widget-id",
        remove: () => {},
        reset: () => {},
      }
    })
    await page.reload()
    await page.getByRole("button", { name: /free demo/i }).first().click()
    await fillDemoForm(page)
    await page.getByRole("dialog").getByRole("button", { name: /submit details/i }).click()
    await expect(page.getByText(/security check/i)).toBeVisible()
  })
})
