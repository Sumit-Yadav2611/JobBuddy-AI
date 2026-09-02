import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";

/* =========================
   TYPES
========================= */

type ProjectPayload = {
  name?: unknown;
  description?: unknown;
  technologies?: unknown;
  githubUrl?: unknown;
  liveUrl?: unknown;
};

/* =========================
   VALIDATION
========================= */

function validateText(
  value: unknown,
  fieldName: string,
  maxLength: number,
  required: true
): string;

function validateText(
  value: unknown,
  fieldName: string,
  maxLength: number,
  required?: false
): string | null;

function validateText(
  value: unknown,
  fieldName: string,
  maxLength: number,
  required = false
): string | null {
  if (typeof value !== "string") {
    if (required) {
      throw new Error(`${fieldName} is required.`);
    }

    return null;
  }

  const trimmed = value.trim();

  if (required && !trimmed) {
    throw new Error(`${fieldName} is required.`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(
      `${fieldName} must be ${maxLength} characters or less.`
    );
  }

  return trimmed || null;
}

/* =========================
   CURRENT USER
========================= */

async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

/* =========================
   GET
========================= */

export async function GET() {
  try {
    const user = await getCurrentUser();

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, user.id))
      .orderBy(desc(projects.createdAt));

    return NextResponse.json({
      success: true,
      projects: userProjects,
    });
  } catch (error) {
    console.error("GET /api/profile/projects error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    const status =
      message === "Unauthorized" ? 401 : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}

/* =========================
   POST
========================= */

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const body = (await request.json()) as ProjectPayload;

    const name = validateText(
      body.name,
      "Project name",
      200,
      true
    );

    const description = validateText(
      body.description,
      "Description",
      5000
    );

    const technologies = validateText(
      body.technologies,
      "Technologies",
      1000
    );

    const githubUrl = validateText(
      body.githubUrl,
      "GitHub URL",
      500
    );

    const liveUrl = validateText(
      body.liveUrl,
      "Live URL",
      500
    );

    const [project] = await db
      .insert(projects)
      .values({
        userId: user.id,
        name,
        description,
        technologies,
        githubUrl,
        liveUrl,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Project added successfully.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/profile/projects error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    const status =
      message === "Unauthorized"
        ? 401
        : message.includes("required") ||
            message.includes("must be")
          ? 400
          : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}

/* =========================
   PUT
========================= */

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();

    const body = (await request.json()) as ProjectPayload & {
      id?: unknown;
    };

    /* -------------------------
       Validate Project ID
    ------------------------- */

    if (
      typeof body.id !== "string" ||
      !body.id.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Project ID is required.",
        },
        { status: 400 }
      );
    }

    const projectId = body.id.trim();

    /* -------------------------
       Validate Fields
    ------------------------- */

    const name = validateText(
      body.name,
      "Project name",
      200,
      true
    );

    const description = validateText(
      body.description,
      "Description",
      5000
    );

    const technologies = validateText(
      body.technologies,
      "Technologies",
      1000
    );

    const githubUrl = validateText(
      body.githubUrl,
      "GitHub URL",
      500
    );

    const liveUrl = validateText(
      body.liveUrl,
      "Live URL",
      500
    );

    /* -------------------------
       Find Owned Project
    ------------------------- */

    const [existingProject] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, user.id)
        )
      )
      .limit(1);

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found.",
        },
        { status: 404 }
      );
    }

    /* -------------------------
       Update Project
    ------------------------- */

    const [updatedProject] = await db
      .update(projects)
      .set({
        name,
        description,
        technologies,
        githubUrl,
        liveUrl,
      })
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, user.id)
        )
      )
      .returning();

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("PUT /api/profile/projects error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    const status =
      message === "Unauthorized"
        ? 401
        : message.includes("required") ||
            message.includes("must be")
          ? 400
          : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}

/* =========================
   DELETE
========================= */

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();

    const body = (await request.json()) as {
      id?: unknown;
    };

    /* -------------------------
       Validate Project ID
    ------------------------- */

    if (
      typeof body.id !== "string" ||
      !body.id.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Project ID is required.",
        },
        { status: 400 }
      );
    }

    const projectId = body.id.trim();

    /* -------------------------
       Find Owned Project
    ------------------------- */

    const [existingProject] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, user.id)
        )
      )
      .limit(1);

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found.",
        },
        { status: 404 }
      );
    }

    /* -------------------------
       Delete Project
    ------------------------- */

    await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, user.id)
        )
      );

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/profile/projects error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    const status =
      message === "Unauthorized"
        ? 401
        : message.includes("required")
          ? 400
          : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}