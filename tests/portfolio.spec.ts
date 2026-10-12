import { expect, test } from "@playwright/test";

test("homepage, navigation, and image viewer work without horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The art ofpaying attention.",
  );
  const feature = page.getByRole("button", {
    name: "View Where the water meets the sky",
  });
  await feature.click();
  const viewer = page.getByRole("dialog", { name: "Photograph viewer" });
  await expect(viewer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(feature).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Photographs" })
    .click();
  await expect(page).toHaveURL("/photography");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A closer look.",
  );
  expect(errors).toEqual([]);
});

test("gallery filtering, lightbox navigation, and layout controls work", async ({
  page,
}, testInfo) => {
  await page.goto("/photography");
  await expect(page.locator(".photo-card")).toHaveCount(16);
  await page.getByRole("button", { name: "Landscapes", exact: true }).click();
  await expect(page.locator(".photo-card")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveText(
    "Showing 2 photographs in Landscapes",
  );
  await page.getByRole("button", { name: "View Above the clouds" }).click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Above the clouds",
  );
  await page.getByRole("button", { name: "Next photograph" }).click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Where the water meets the sky",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Above the clouds",
  );
  await page.getByRole("button", { name: "Close photograph" }).click();
  await expect(
    page.getByRole("button", { name: "View Above the clouds" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "All photographs" }).click();
  await expect(page.locator(".photo-card")).toHaveCount(16);
  if (testInfo.project.name === "desktop") {
    await page.getByRole("button", { name: "Compact grid" }).click();
    await expect(page.locator(".photo-grid")).toHaveClass(/photo-grid-compact/);
  }
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
});

test("private album rejects invalid access and supports signing in and out", async ({
  page,
  context,
}) => {
  await page.goto("/natal-2022");
  await expect(page.getByLabel("Album password")).toBeVisible();
  await expect(page.locator(".photo-card")).toHaveCount(0);
  await page.getByLabel("Album password").fill("incorrect");
  await page.getByRole("button", { name: "Open the album" }).click();
  await expect(page.locator("#password-error")).toContainText(
    "doesn’t look right",
  );
  await page.getByLabel("Album password").fill("local-test-album-password");
  await page.getByRole("button", { name: "Open the album" }).click();
  await expect(page.getByRole("button", { name: "Lock album" })).toBeVisible();
  const cookie = (await context.cookies()).find(
    (item) => item.name === "lucastls-album",
  );
  expect(cookie?.httpOnly).toBe(true);
  expect(cookie?.value).not.toContain("local-test-album-password");
  await page.reload();
  await expect(page.getByRole("button", { name: "Lock album" })).toBeVisible();
  await page.getByRole("button", { name: "Lock album" }).click();
  await expect(page.getByLabel("Album password")).toBeVisible();
  await context.addCookies([
    {
      name: "lucastls-album",
      value: `${Math.floor(Date.now() / 1000) + 3000}.${"a".repeat(32)}.${"b".repeat(64)}`,
      domain: "localhost",
      path: "/natal-2022",
    },
  ]);
  await page.reload();
  await expect(page.getByLabel("Album password")).toBeVisible();
});

test("about, redirects, metadata, and missing pages are present", async ({
  page,
  request,
}) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Always looking.",
  );
  await expect(page).toHaveTitle("About — Lucas Teodoro");
  const legacy = await request.get("/old_photography", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/photography");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/photography");
  expect(await sitemap.text()).not.toContain("natal-2022");
  const response = await page.goto("/missing-photograph");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little off the path.",
  );
});
