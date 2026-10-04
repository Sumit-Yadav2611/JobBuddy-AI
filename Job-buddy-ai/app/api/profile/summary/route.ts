import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, profiles } from "@/lib/db/schema";

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const summary =
      typeof body.summary === "string"
        ? body.summary.trim()
        : "";

    if (summary.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Professional summary must be 5000 characters or less.",
        },
        { status: 400 },
      );
    }

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User account not found.",
        },
        { status: 404 },
      );
    }

    const [existingProfile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, dbUser.id))
      .limit(1);

    if (!existingProfile) {
      await db.insert(profiles).values({
        userId: dbUser.id,
        summary: summary || null,
      });
    } else {
      await db
        .update(profiles)
        .set({
          summary: summary || null,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, dbUser.id));
    }

    return NextResponse.json({
      success: true,
      message: "Professional summary updated successfully.",
    });
  } catch (error) {
    console.error("Professional summary update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while updating your summary.",
      },
      { status: 500 },
    );
  }
}