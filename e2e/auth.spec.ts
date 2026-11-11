import { expect, test } from "@playwright/test";

test("login displays a generic error for invalid credentials", async ({
  page,
}) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("Username").fill("demo-owner");
  await page.getByLabel("Password").fill("incorrect-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Assert
  await expect(page.getByRole("alert")).toHaveText(
    "Username or password is incorrect.",
  );
  await expect(page).toHaveURL(/\/login$/);
});

test("Admin can sign in, sees no Admin Management, and is logged out securely", async ({
  page,
  context,
}) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("Username").fill("demo-staff");
  await page.getByLabel("Password").fill("AuraBistroStaff!2026");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Assert
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("link", { name: "demo-staff" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Admin Management", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Admin Management" }),
  ).toHaveCount(0);

  const sessionCookie = (await context.cookies()).find(
    (cookie) => cookie.name === "aura-bistro-session",
  );
  expect(sessionCookie?.httpOnly).toBe(true);

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("Super Admin sees Admin Management navigation and overview card", async ({
  page,
}) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("Username").fill("demo-owner");
  await page.getByLabel("Password").fill("AuraBistroOwner!2026");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Assert
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("link", { name: "Admin Management", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Admin Management" }),
  ).toBeVisible();
});

test("unauthenticated activity requests return HTTP 401", async ({
  request,
}) => {
  // Arrange
  const response = await request.post("/api/auth/activity");

  // Act
  const body: unknown = await response.json();

  // Assert
  expect(response.status()).toBe(401);
  expect(body).toEqual({ error: "unauthenticated" });
});
