import "server-only";

import { z } from "zod";
import demoUsersJson from "@/data/demo-users.json";

const DemoUserSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  role: z.enum(["admin", "super_admin"]),
  passwordHash: z.string().regex(/^\d+\$[a-f0-9]{32}\$[a-f0-9]{64}$/i),
});

const demoUsers = z.array(DemoUserSchema).parse(demoUsersJson);

export type DemoUser = z.infer<typeof DemoUserSchema>;

export function findDemoUserByUsername(username: string): DemoUser | null {
  return (
    demoUsers.find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    ) ?? null
  );
}

export function findDemoUserById(id: string): DemoUser | null {
  return demoUsers.find((user) => user.id === id) ?? null;
}
