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

    const firstName =
      typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";

    const lastName =
      typeof body.lastName === "string"
        ? body.lastName.trim()
        : "";

    const headline =
      typeof body.headline === "string"
        ? body.headline.trim()
        : "";

    const location =
      typeof body.location === "string"
        ? body.location.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const yearsOfExperience =
      body.yearsOfExperience === "" ||
      body.yearsOfExperience === null ||
      body.yearsOfExperience === undefined
        ? null
        : Number(body.yearsOfExperience);

    if (
      firstName.length > 100 ||
      lastName.length > 100 ||
      headline.length > 200 ||
      location.length > 150 ||
      phone.length > 30
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "One or more fields are too long.",
        },
        { status: 400 },
      );
    }

    if (
      yearsOfExperience !== null &&
      (!Number.isInteger(yearsOfExperience) ||
        yearsOfExperience < 0 ||
        yearsOfExperience > 60)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Years of experience must be between 0 and 60.",
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
        firstName: firstName || null,
        lastName: lastName || null,
        headline: headline || null,
        location: location || null,
        phone: phone || null,
        yearsOfExperience,
      });
    } else {
      await db
        .update(profiles)
        .set({
          firstName: firstName || null,
          lastName: lastName || null,
          headline: headline || null,
          location: location || null,
          phone: phone || null,
          yearsOfExperience,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, dbUser.id));
    }

    return NextResponse.json({
      success: true,
      message: "Personal information updated successfully.",
    });
  } catch (error) {
    console.error("Personal information update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while updating your profile.",
      },
      { status: 500 },
    );
  }
}