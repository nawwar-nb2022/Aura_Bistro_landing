import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type {
  SessionStore,
  StoredSession,
} from "@/lib/auth/session";
import { isSessionExpired } from "@/lib/auth/session-policy";

type StoredSessionJson = Omit<
  StoredSession,
  "createdAt" | "lastActivityAt" | "expiresAt"
> & {
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
};

const sessionFilePath = join(
  process.cwd(),
  "data",
  "auth-sessions.local.json",
);

let writeQueue: Promise<void> = Promise.resolve();

function isMissingFileError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

function deserializeSessions(data: string): StoredSession[] {
  const parsed: unknown = JSON.parse(data);

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("sessions" in parsed) ||
    !Array.isArray(parsed.sessions)
  ) {
    throw new Error("The local authentication session file is malformed.");
  }

  return parsed.sessions.map((session: StoredSessionJson) => {
    if (
      typeof session.tokenHash !== "string" ||
      !/^[a-f0-9]{64}$/i.test(session.tokenHash) ||
      typeof session.userId !== "string" ||
      (session.role !== "admin" && session.role !== "super_admin")
    ) {
      throw new Error("The local authentication session file is malformed.");
    }

    return {
      ...session,
      createdAt: new Date(session.createdAt),
      lastActivityAt: new Date(session.lastActivityAt),
      expiresAt: new Date(session.expiresAt),
    };
  });
}

async function readSessions(): Promise<StoredSession[]> {
  try {
    return deserializeSessions(await readFile(sessionFilePath, "utf8"));
  } catch (error) {
    if (isMissingFileError(error)) {
      return [];
    }

    throw error;
  }
}

async function writeSessions(sessions: StoredSession[]): Promise<void> {
  await mkdir(dirname(sessionFilePath), { recursive: true });

  const temporaryPath = `${sessionFilePath}.${randomUUID()}.tmp`;
  const serializedSessions: StoredSessionJson[] = sessions.map((session) => ({
    ...session,
    createdAt: session.createdAt.toISOString(),
    lastActivityAt: session.lastActivityAt.toISOString(),
    expiresAt: session.expiresAt.toISOString(),
  }));

  await writeFile(
    temporaryPath,
    JSON.stringify({ sessions: serializedSessions }, null, 2),
    { encoding: "utf8", mode: 0o600 },
  );
  await rename(temporaryPath, sessionFilePath);
}

async function withWriteLock<T>(operation: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(operation);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

export class JsonSessionStore implements SessionStore {
  async create(session: StoredSession): Promise<void> {
    await withWriteLock(async () => {
      const sessions = await readSessions();
      sessions.push(session);
      await writeSessions(sessions);
    });
  }

  async findByTokenHash(tokenHash: string): Promise<StoredSession | null> {
    const sessions = await readSessions();
    return sessions.find((session) => session.tokenHash === tokenHash) ?? null;
  }

  async refresh(
    tokenHash: string,
    activityAt: Date,
    idleTimeoutMs: number,
  ): Promise<StoredSession | null> {
    return withWriteLock(async () => {
      const sessions = await readSessions();
      const session = sessions.find(
        (candidate) => candidate.tokenHash === tokenHash,
      );

      if (!session || isSessionExpired(session, activityAt)) {
        return null;
      }

      const lastActivityAt = new Date(
        Math.max(session.lastActivityAt.getTime(), activityAt.getTime()),
      );
      const refreshedSession = {
        ...session,
        lastActivityAt,
        expiresAt: new Date(lastActivityAt.getTime() + idleTimeoutMs),
      };

      await writeSessions(
        sessions.map((candidate) =>
          candidate.tokenHash === tokenHash ? refreshedSession : candidate,
        ),
      );

      return refreshedSession;
    });
  }

  async deleteByTokenHash(tokenHash: string): Promise<void> {
    await withWriteLock(async () => {
      const sessions = await readSessions();
      await writeSessions(
        sessions.filter((session) => session.tokenHash !== tokenHash),
      );
    });
  }
}

let sessionStore: JsonSessionStore | undefined;

export function getSessionStore(): JsonSessionStore {
  sessionStore ??= new JsonSessionStore();
  return sessionStore;
}
