import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  jobs,
  savedJobs,
} from "@/lib/db/schema";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
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

    const { id: jobId } = await context.params;

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

    // Check if already saved
    const [existingSavedJob] = await db
      .select()
      .from(savedJobs)
      .where(
        and(
          eq(savedJobs.userId, dbUser.id),
          eq(savedJobs.jobId, jobId)
        )
      )
      .limit(1);

    if (existingSavedJob) {
      return Response.json({
        success: true,
        saved: true,
        message: "Job already saved",
      });
    }

    // Save job
    await db.insert(savedJobs).values({
      userId: dbUser.id,
      jobId,
    });

    return Response.json({
      success: true,
      saved: true,
      message: "Job saved successfully",
    });
  } catch (error) {
    console.error("Save job error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to save job",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
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

    const { id: jobId } = await context.params;

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
        { status: 404 }
      );
    }

    // Delete saved job
    await db
      .delete(savedJobs)
      .where(
        and(
          eq(savedJobs.userId, dbUser.id),
          eq(savedJobs.jobId, jobId)
        )
      );

    return Response.json({
      success: true,
      saved: false,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Remove saved job error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to remove saved job",
      },
      { status: 500 }
    );
  }
}