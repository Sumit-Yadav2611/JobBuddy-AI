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

    // Find database user

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

    // Get user skills

    const userSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, dbUser.id));

    const skillNames = userSkills.map((skill) => skill.name);

    // Get jobs

    const allJobs = await db.select().from(jobs);

    const recommendedJobs = allJobs
      .map((job) => {
        const match = calculateJobMatch(skillNames, job.requirements);

        return {
          id: job.id,

          title: job.title,

          company: job.company,

          location: job.location,

          jobType: job.jobType,

          platform: job.platform,

          description: job.description,

          // Matching data

          matchScore: match.score,

          matchLevel: match.matchLevel,
          matchedSkillCount: match.matchedSkills.length,

          matchedSkills: match.matchedSkills,

          missingSkills: match.missingSkills,

          // AI explanation

          explanation: match.explanation,

          url: job.url,
        };
      })

      // remove jobs where matching is not possible

      .filter((job) => job.matchScore !== null)

      // highest match first

      .sort((a, b) => {
        if ((b.matchScore ?? 0) !== (a.matchScore ?? 0)) {
          return (b.matchScore ?? 0) - (a.matchScore ?? 0);
        }

        return b.matchedSkillCount - a.matchedSkillCount;
      })

      // only top 6 jobs

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
