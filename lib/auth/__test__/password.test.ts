import assert from "node:assert/strict";
import test from "node:test";
import { verifyPassword } from "../password.ts";

test("demo passwords verify against their salted PBKDF2 hashes", async () => {
  // Arrange
  const password = "AuraBistroOwner!2026";
  const passwordHash =
    "210000$5f20c3bb7077af36a79d259b0bd9e509$aacac1e115d2f2e2244550b441b3e46b3f6ef96d33ce4803fb1db3417b5a54df";

  // Act
  const valid = await verifyPassword(password, passwordHash);
  const invalid = await verifyPassword("wrong-password", passwordHash);

  // Assert
  assert.equal(valid, true);
  assert.equal(invalid, false);
});

test("malformed password hashes fail closed", async () => {
  // Arrange
  const malformedHash = "not-a-password-hash";

  // Act
  const valid = await verifyPassword("password", malformedHash);

  // Assert
  assert.equal(valid, false);
});
