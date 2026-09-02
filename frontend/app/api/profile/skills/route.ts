import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, skills } from "@/lib/db/schema";

type SkillInput = {
  id?: string;
  name: string;
  category?: string | null;
  proficiency?: string | null;
};

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

    if (!Array.isArray(body.skills)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid skills data.",
        },
        { status: 400 },
      );
    }

    const inputSkills: SkillInput[] = body.skills;

    if (inputSkills.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "You can have a maximum of 100 skills.",
        },
        { status: 400 },
      );
    }

    const normalizedSkills = inputSkills
      .map((skill) => ({
        id:
          typeof skill.id === "string"
            ? skill.id
            : undefined,

        name:
          typeof skill.name === "string"
            ? skill.name.trim()
            : "",

        category:
          typeof skill.category === "string"
            ? skill.category.trim()
            : "",

        proficiency:
          typeof skill.proficiency === "string"
            ? skill.proficiency.trim()
            : "",
      }))
      .filter((skill) => skill.name.length > 0);

    for (const skill of normalizedSkills) {
      if (skill.name.length > 100) {
        return NextResponse.json(
          {
            success: false,
            error: "Skill names must be 100 characters or less.",
          },
          { status: 400 },
        );
      }

      if (skill.category.length > 100) {
        return NextResponse.json(
          {
            success: false,
            error: "Skill categories must be 100 characters or less.",
          },
          { status: 400 },
        );
      }

      if (skill.proficiency.length > 50) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Skill proficiency must be 50 characters or less.",
          },
          { status: 400 },
        );
      }
    }

    // Prevent duplicate skill names.
    const seenNames = new Set<string>();

    for (const skill of normalizedSkills) {
      const normalizedName = skill.name.toLowerCase();

      if (seenNames.has(normalizedName)) {
        return NextResponse.json(
          {
            success: false,
            error: `Duplicate skill: ${skill.name}`,
          },
          { status: 400 },
        );
      }

      seenNames.add(normalizedName);
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

    const existingSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, dbUser.id));

    const submittedIds = new Set(
      normalizedSkills
        .map((skill) => skill.id)
        .filter(
          (id): id is string =>
            typeof id === "string",
        ),
    );

    // Delete skills removed by the user.
    for (const existingSkill of existingSkills) {
      if (!submittedIds.has(existingSkill.id)) {
        await db
          .delete(skills)
          .where(
            and(
              eq(skills.id, existingSkill.id),
              eq(skills.userId, dbUser.id),
            ),
          );
      }
    }

    // Update existing skills or insert new ones.
    for (const skill of normalizedSkills) {
      if (skill.id) {
        const existingSkill = existingSkills.find(
          (item) => item.id === skill.id,
        );

        if (existingSkill) {
          await db
            .update(skills)
            .set({
              name: skill.name,
              category: skill.category || null,
              proficiency: skill.proficiency || null,
            })
            .where(
              and(
                eq(skills.id, skill.id),
                eq(skills.userId, dbUser.id),
              ),
            );
        } else {
          await db.insert(skills).values({
            userId: dbUser.id,
            name: skill.name,
            category: skill.category || null,
            proficiency: skill.proficiency || null,
          });
        }
      } else {
        await db.insert(skills).values({
          userId: dbUser.id,
          name: skill.name,
          category: skill.category || null,
          proficiency: skill.proficiency || null,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Skills updated successfully.",
    });
  } catch (error) {
    console.error("Skills update error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while updating your skills.",
      },
      { status: 500 },
    );
  }
}