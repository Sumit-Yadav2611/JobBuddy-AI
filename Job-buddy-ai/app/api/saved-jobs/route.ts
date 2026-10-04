import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";

import {
  users,
  jobs,
  savedJobs,
} from "@/lib/db/schema";

/*
========================================
GET SAVED JOBS
GET /api/saved-jobs
========================================
*/

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    /*
    Find database user
    */

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
    Get saved jobs
    */

    const saved = await db
      .select({
        jobId: savedJobs.jobId,
      })
      .from(savedJobs)
      .where(eq(savedJobs.userId, dbUser.id));

    const jobIds = saved.map((item) => item.jobId);

    return NextResponse.json({
      success: true,
      jobIds,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get saved jobs",
      },
      {
        status: 500,
      },
    );
  }
}

/*
========================================
SAVE JOB
POST /api/saved-jobs
========================================
*/

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const jobId = body.jobId;

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          error: "jobId is required",
        },
        {
          status: 400,
        },
      );
    }

    /*
    Find database user
    */

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
    Check that job exists
    */

    const [job] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          error: "Job not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
    Check if already saved
    */

    const [existingSavedJob] = await db
      .select()
      .from(savedJobs)
      .where(
        and(
          eq(savedJobs.userId, dbUser.id),
          eq(savedJobs.jobId, jobId),
        ),
      )
      .limit(1);

    if (existingSavedJob) {
      return NextResponse.json({
        success: true,
        saved: true,
        message: "Job already saved",
      });
    }

    /*
    Save job
    */

    await db.insert(savedJobs).values({
      userId: dbUser.id,
      jobId,
    });

    return NextResponse.json({
      success: true,
      saved: true,
      message: "Job saved successfully",
    });
  } catch (error) {
    console.error("Save job error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save job",
      },
      {
        status: 500,
      },
    );
  }
}

/*
========================================
REMOVE SAVED JOB
DELETE /api/saved-jobs
========================================
*/

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const jobId = body.jobId;

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          error: "jobId is required",
        },
        {
          status: 400,
        },
      );
    }

    /*
    Find database user
    */

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
    Remove saved job
    */

    await db
      .delete(savedJobs)
      .where(
        and(
          eq(savedJobs.userId, dbUser.id),
          eq(savedJobs.jobId, jobId),
        ),
      );

    return NextResponse.json({
      success: true,
      saved: false,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Delete saved job error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove saved job",
      },
      {
        status: 500,
      },
    );
  }
}