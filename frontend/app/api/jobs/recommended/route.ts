import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { users, skills, jobs } from "@/lib/db/schema";

import { calculateJobMatch } from "@/lib/jobs/matchJob";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // find database user

    const databaseUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, user.id))
      .limit(1);

    if (databaseUser.length === 0) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const dbUser = databaseUser[0];

    // get user skills

    const userSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, dbUser.id));

    const skillNames = userSkills.map((skill) => skill.name);

    // get jobs

    const allJobs = await db.select().from(jobs);

    const recommendedJobs = allJobs
      .map((job) => {
        const match = calculateJobMatch(skillNames, job.requirements);

        return {
          ...job,

          matchScore: match.score,

          matchedSkills: match.matchedSkills,

          missingSkills: match.missingSkills,
        };
      })
      .filter((job) => job.matchScore !== null)
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
      .slice(0, 6);

    return NextResponse.json({
      success: true,

      jobs: recommendedJobs,
    });
  } catch (error) {
    console.error("Recommended jobs error:", error);

    return NextResponse.json(
      {
        error: "Failed to get recommendations",
      },
      {
        status: 500,
      },
    );
  }
}
