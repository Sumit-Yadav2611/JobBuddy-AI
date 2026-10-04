import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  jobs,
  applications,
} from "@/lib/db/schema";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id: jobId } = await params;

    // Find database user
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
        { status: 404 }
      );
    }

    // Check that job exists
    const [job] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (!job) {
      return Response.json(
        {
          success: false,
          error: "Job not found",
        },
        { status: 404 }
      );
    }

    // Check whether already applied
    const [existingApplication] = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.userId, dbUser.id),
          eq(applications.jobId, jobId)
        )
      )
      .limit(1);

    if (existingApplication) {
      return Response.json({
        success: true,
        alreadyApplied: true,
        application: existingApplication,
      });
    }

    // Create application
    const [application] = await db
      .insert(applications)
      .values({
        userId: dbUser.id,
        jobId: jobId,
        status: "Applied",
      })
      .returning();

    return Response.json({
      success: true,
      alreadyApplied: false,
      application,
    });
  } catch (error) {
    console.error(
      "Apply to job error:",
      error
    );

    return Response.json(
      {
        success: false,
        error: "Failed to apply to job",
      },
      { status: 500 }
    );
  }
}