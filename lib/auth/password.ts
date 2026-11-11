import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const deriveKey = promisify(pbkdf2);
const PASSWORD_ITERATIONS = 210_000;
const PASSWORD_KEY_LENGTH = 32;
const PASSWORD_DIGEST = "sha256";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await deriveKey(
    password,
    salt,
    PASSWORD_ITERATIONS,
    PASSWORD_KEY_LENGTH,
    PASSWORD_DIGEST,
  )) as Buffer;

  return `${PASSWORD_ITERATIONS}$${salt}$${hash.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const [iterationsText, salt, hashText, ...extra] = passwordHash.split("$");
  const iterations = Number(iterationsText);

  if (
    extra.length > 0 ||
    !Number.isInteger(iterations) ||
    iterations < 100_000 ||
    !/^[a-f0-9]{32}$/i.test(salt ?? "") ||
    !/^[a-f0-9]{64}$/i.test(hashText ?? "")
  ) {
    return false;
  }

  const expectedHash = Buffer.from(hashText, "hex");
  const actualHash = (await deriveKey(
    password,
    salt,
    iterations,
    PASSWORD_KEY_LENGTH,
    PASSWORD_DIGEST,
  )) as Buffer;

  return (
    actualHash.length === expectedHash.length &&
    timingSafeEqual(actualHash, expectedHash)
  );
}
