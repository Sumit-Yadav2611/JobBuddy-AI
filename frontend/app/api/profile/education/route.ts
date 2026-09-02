import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { education, users } from "@/lib/db/schema";

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

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

async function getCurrentUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return null;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  return result[0] ?? null;
}

/* =========================
   GET EDUCATION
========================= */

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userEducation = await db
      .select()
      .from(education)
      .where(eq(education.userId, user.id))
      .orderBy(desc(education.startDate));

    return NextResponse.json({
      education: userEducation,
    });
  } catch (error) {
    console.error("GET /api/profile/education error:", error);

    return NextResponse.json(
      { error: "Failed to load education." },
      { status: 500 },
    );
  }
}

/* =========================
   POST EDUCATION
========================= */

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    const institution = validateText(
      body.institution,
      "Institution",
      200,
      true,
    );

    const degree = validateText(body.degree, "Degree", 200);
    const fieldOfStudy = validateText(body.fieldOfStudy, "Field of study", 200);
    const grade = validateText(body.grade, "Grade", 100);

    const startDate = parseDate(body.startDate);
    const endDate = parseDate(body.endDate);

    if (body.startDate && !startDate) {
      return NextResponse.json(
        { error: "Please enter a valid start date." },
        { status: 400 },
      );
    }

    if (body.endDate && !endDate) {
      return NextResponse.json(
        { error: "Please enter a valid end date." },
        { status: 400 },
      );
    }

    if (startDate && endDate && endDate < startDate) {
      return NextResponse.json(
        { error: "End date cannot be before start date." },
        { status: 400 },
      );
    }

    const [newEducation] = await db
      .insert(education)
      .values({
        userId: user.id,
        institution,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Education added successfully.",
        education: newEducation,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/profile/education error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to add education." },
      { status: 500 },
    );
  }
}

/* =========================
   PUT EDUCATION
========================= */

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    if (typeof body.id !== "string" || !body.id.trim()) {
      return NextResponse.json(
        { error: "Education ID is required." },
        { status: 400 },
      );
    }

    const institution = validateText(
      body.institution,
      "Institution",
      200,
      true,
    );

    const degree = validateText(body.degree, "Degree", 200);
    const fieldOfStudy = validateText(body.fieldOfStudy, "Field of study", 200);
    const grade = validateText(body.grade, "Grade", 100);

    const startDate = parseDate(body.startDate);
    const endDate = parseDate(body.endDate);

    if (body.startDate && !startDate) {
      return NextResponse.json(
        { error: "Please enter a valid start date." },
        { status: 400 },
      );
    }

    if (body.endDate && !endDate) {
      return NextResponse.json(
        { error: "Please enter a valid end date." },
        { status: 400 },
      );
    }

    if (startDate && endDate && endDate < startDate) {
      return NextResponse.json(
        { error: "End date cannot be before start date." },
        { status: 400 },
      );
    }

    const existingEducation = await db
      .select()
      .from(education)
      .where(and(eq(education.id, body.id), eq(education.userId, user.id)))
      .limit(1);

    if (!existingEducation[0]) {
      return NextResponse.json(
        { error: "Education record not found." },
        { status: 404 },
      );
    }

    const [updatedEducation] = await db
      .update(education)
      .set({
        institution,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
      })
      .where(and(eq(education.id, body.id), eq(education.userId, user.id)))
      .returning();

    return NextResponse.json({
      success: true,
      message: "Education updated successfully.",
      education: updatedEducation,
    });
  } catch (error) {
    console.error("PUT /api/profile/education error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update education." },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE EDUCATION
========================= */

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    if (typeof body.id !== "string" || !body.id.trim()) {
      return NextResponse.json(
        { error: "Education ID is required." },
        { status: 400 },
      );
    }

    const existingEducation = await db
      .select()
      .from(education)
      .where(and(eq(education.id, body.id), eq(education.userId, user.id)))
      .limit(1);

    if (!existingEducation[0]) {
      return NextResponse.json(
        { error: "Education record not found." },
        { status: 404 },
      );
    }

    await db
      .delete(education)
      .where(and(eq(education.id, body.id), eq(education.userId, user.id)));

    return NextResponse.json({
      success: true,
      message: "Education deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/profile/education error:", error);

    return NextResponse.json(
      { error: "Failed to delete education." },
      { status: 500 },
    );
  }
}
