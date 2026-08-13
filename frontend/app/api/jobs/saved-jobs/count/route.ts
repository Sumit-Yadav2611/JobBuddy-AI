import { auth } from "@clerk/nextjs/server";
import { eq, count } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  savedJobs,
} from "@/lib/db/schema";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          success: false,
          count: 0,
        },
        { status: 401 }
      );
    }

    // Find current database user
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return Response.json({
        success: true,
        count: 0,
      });
    }

    // Count saved jobs
    const [result] = await db
      .select({
        count: count(),
      })
      .from(savedJobs)
      .where(eq(savedJobs.userId, dbUser.id));

    return Response.json({
      success: true,
      count: Number(result?.count ?? 0),
    });
  } catch (error) {
    console.error(
      "Saved jobs count error:",
      error
    );

    return Response.json(
      {
        success: false,
        count: 0,
      },
      { status: 500 }
    );
  }
}