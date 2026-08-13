import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, jobs, applications } from "@/lib/db/schema";

export async function GET() {
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

    // Find the current user in our database
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return Response.json({
        success: true,
        applications: [],
      });
    }

    // Get user's applications with job information
    const userApplications = await db
      .select({
        id: applications.id,
        status: applications.status,
        appliedAt: applications.appliedAt,
        createdAt: applications.createdAt,
        updatedAt: applications.updatedAt,

        jobId: jobs.id,
        title: jobs.title,
        company: jobs.company,
        location: jobs.location,
        jobType: jobs.jobType,
        url: jobs.url,
      })
      .from(applications)
      .innerJoin(jobs, eq(applications.jobId, jobs.id))
      .where(eq(applications.userId, dbUser.id))
      .orderBy(desc(applications.createdAt));

    return Response.json({
      success: true,
      applications: userApplications,
    });
  } catch (error) {
    console.error("Failed to fetch applications:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch applications",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return Response.json(
        { success: false, error: "Job ID is required" },
        { status: 400 },
      );
    }

    // Find current user
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      return Response.json(
        {
          success: false,
          error: "User not found. Please upload your resume first.",
        },
        { status: 404 },
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
        { success: false, error: "Job not found" },
        { status: 404 },
      );
    }

    // Prevent duplicate applications
    const [existingApplication] = await db
      .select()
      .from(applications)
      .where(
        and(eq(applications.userId, dbUser.id), eq(applications.jobId, jobId)),
      )
      .limit(1);

    if (existingApplication) {
      return Response.json(
        {
          success: false,
          error: "You have already applied to this job.",
          application: existingApplication,
        },
        { status: 409 },
      );
    }

    // Create application
    const [application] = await db
      .insert(applications)
      .values({
        userId: dbUser.id,
        jobId: job.id,
        status: "Applied",
      })
      .returning();

    return Response.json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to apply for job",
      },
      { status: 500 },
    );
  }
}
