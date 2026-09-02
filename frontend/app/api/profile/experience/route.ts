import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { experiences, users } from "@/lib/db/schema";

type ExperienceInput = {
  id?: string;
  company?: string;
  role?: string;
  location?: string;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string;
};

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseDate(
  value: string | null | undefined,
): Date | null | undefined {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function validateExperience(input: ExperienceInput) {
  const company = cleanString(input.company);
  const role = cleanString(input.role);
  const location = cleanString(input.location);
  const description = cleanString(input.description);

  if (!company) {
    return { error: "Company name is required." };
  }

  if (!role) {
    return { error: "Role is required." };
  }

  if (company.length > 200) {
    return { error: "Company name must be 200 characters or less." };
  }

  if (role.length > 200) {
    return { error: "Role must be 200 characters or less." };
  }

  if (location.length > 200) {
    return { error: "Location must be 200 characters or less." };
  }

  if (description.length > 5000) {
    return { error: "Description must be 5000 characters or less." };
  }

  const startDate = parseDate(input.startDate);
  const endDate = parseDate(input.endDate);

  if (startDate === undefined) {
    return { error: "Invalid start date." };
  }

  if (endDate === undefined) {
    return { error: "Invalid end date." };
  }

  const isCurrent = input.isCurrent === true;

  if (isCurrent && endDate) {
    return {
      error: "A current position cannot have an end date.",
    };
  }

  if (startDate && endDate && endDate < startDate) {
    return {
      error: "End date cannot be before the start date.",
    };
  }

  return {
    data: {
      company,
      role,
      location: location || null,
      startDate: startDate ?? null,
      endDate: isCurrent ? null : endDate ?? null,
      isCurrent,
      description: description || null,
    },
  };
}

/* =========================
   POST — ADD EXPERIENCE
========================= */

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as ExperienceInput;

    const validation = validateExperience(body);

    if ("error" in validation) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 },
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 },
      );
    }

    const [experience] = await db
      .insert(experiences)
      .values({
        userId: user.id,
        ...validation.data,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        experience,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/profile/experience error:", error);

    return NextResponse.json(
      { error: "Failed to add experience." },
      { status: 500 },
    );
  }
}

/* =========================
   PUT — UPDATE EXPERIENCE
========================= */

export async function PUT(request: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as ExperienceInput;

    const experienceId = cleanString(body.id);

    if (!experienceId) {
      return NextResponse.json(
        { error: "Experience ID is required." },
        { status: 400 },
      );
    }

    const validation = validateExperience(body);

    if ("error" in validation) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 },
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 },
      );
    }

    const [existingExperience] = await db
      .select()
      .from(experiences)
      .where(
        and(
          eq(experiences.id, experienceId),
          eq(experiences.userId, user.id),
        ),
      )
      .limit(1);

    if (!existingExperience) {
      return NextResponse.json(
        { error: "Experience not found." },
        { status: 404 },
      );
    }

    const [updatedExperience] = await db
      .update(experiences)
      .set(validation.data)
      .where(
        and(
          eq(experiences.id, experienceId),
          eq(experiences.userId, user.id),
        ),
      )
      .returning();

    return NextResponse.json({
      success: true,
      experience: updatedExperience,
    });
  } catch (error) {
    console.error("PUT /api/profile/experience error:", error);

    return NextResponse.json(
      { error: "Failed to update experience." },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE — REMOVE EXPERIENCE
========================= */

export async function DELETE(request: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as { id?: string };

    const experienceId = cleanString(body.id);

    if (!experienceId) {
      return NextResponse.json(
        { error: "Experience ID is required." },
        { status: 400 },
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 },
      );
    }

    const [existingExperience] = await db
      .select()
      .from(experiences)
      .where(
        and(
          eq(experiences.id, experienceId),
          eq(experiences.userId, user.id),
        ),
      )
      .limit(1);

    if (!existingExperience) {
      return NextResponse.json(
        { error: "Experience not found." },
        { status: 404 },
      );
    }

    await db
      .delete(experiences)
      .where(
        and(
          eq(experiences.id, experienceId),
          eq(experiences.userId, user.id),
        ),
      );

    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/profile/experience error:", error);

    return NextResponse.json(
      { error: "Failed to delete experience." },
      { status: 500 },
    );
  }
}