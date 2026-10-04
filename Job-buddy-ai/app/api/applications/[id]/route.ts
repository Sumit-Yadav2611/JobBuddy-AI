import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, applications } from "@/lib/db/schema";

const VALID_STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const;

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id: applicationId } = await params;

    const body = await request.json();
    const status = body.status;

    if (!VALID_STATUSES.includes(status)) {
      return Response.json(
        {
          success: false,
          error: "Invalid application status",
        },
        { status: 400 },
      );
    }

    // Find current database user
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return Response.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    // Update only the current user's application
    const [updatedApplication] = await db
      .update(applications)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(applications.id, applicationId),
          eq(applications.userId, dbUser.id),
        ),
      )
      .returning();

    if (!updatedApplication) {
      return Response.json(
        {
          success: false,
          error: "Application not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to update application status",
      },
      { status: 500 },
    );
  }
}
