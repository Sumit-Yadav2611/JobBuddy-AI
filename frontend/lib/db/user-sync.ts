import { eq } from "drizzle-orm";
import { db } from "./index";
import { users, profiles } from "./schema";

type ClerkUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export async function syncUser(clerkUser: ClerkUser) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUser.id))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  const [newUser] = await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      email: clerkUser.email,
    })
    .returning();

  await db.insert(profiles).values({
    userId: newUser.id,
    firstName: clerkUser.firstName ?? null,
    lastName: clerkUser.lastName ?? null,
  });

  return newUser;
}