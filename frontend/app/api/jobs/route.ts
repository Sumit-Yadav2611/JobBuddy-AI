import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ilike, or, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { jobs, users, skills } from "@/lib/db/schema";
import { calculateJobMatch } from "@/lib/jobs/matchJob";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const location = searchParams.get("location")?.trim() || "";

    /*
     * ----------------------------------------
     * Get current Clerk user
     * ----------------------------------------
     */

    const { userId } = await auth();

    let userSkills: string[] = [];

    if (userId) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, userId))
        .limit(1);

      if (dbUser) {
        const userSkillRows = await db
          .select({
            name: skills.name,
          })
          .from(skills)
          .where(eq(skills.userId, dbUser.id));

        userSkills = userSkillRows.map((skill) => skill.name).filter(Boolean);
      }
    }

    /*
     * ----------------------------------------
     * Fetch jobs
     * ----------------------------------------
     */

    let query;

    if (search && location) {
      query = db
        .select()
        .from(jobs)
        .where(
          or(
            ilike(jobs.title, `%${search}%`),
            ilike(jobs.company, `%${search}%`),
            ilike(jobs.description, `%${search}%`),
            ilike(jobs.requirements, `%${search}%`),
          ),
        )
        .orderBy(desc(jobs.createdAt))
        .limit(50);
    } else if (search) {
      query = db
        .select()
        .from(jobs)
        .where(
          or(
            ilike(jobs.title, `%${search}%`),
            ilike(jobs.company, `%${search}%`),
            ilike(jobs.description, `%${search}%`),
            ilike(jobs.requirements, `%${search}%`),
          ),
        )
        .orderBy(desc(jobs.createdAt))
        .limit(50);
    } else if (location) {
      query = db
        .select()
        .from(jobs)
        .where(ilike(jobs.location, `%${location}%`))
        .orderBy(desc(jobs.createdAt))
        .limit(50);
    } else {
      query = db.select().from(jobs).orderBy(desc(jobs.createdAt)).limit(50);
    }

    const result = await query;

    /*
     * ----------------------------------------
     * Location filtering
     * ----------------------------------------
     */

    const filtered =
      search && location
        ? result.filter((job) =>
            job.location?.toLowerCase().includes(location.toLowerCase()),
          )
        : result;

    /*
     * ----------------------------------------
     * Calculate AI-style job match
     * ----------------------------------------
     */

    const jobsWithMatch = filtered.map((job) => {
      const match = calculateJobMatch(userSkills, job.requirements);

      return {
        ...job,

        matchScore: match.score,

        matchedSkills: match.matchedSkills,

        missingSkills: match.missingSkills,
      };
    });

    /*
     * ----------------------------------------
     * Return response
     * ----------------------------------------
     */

    return NextResponse.json({
      success: true,
      count: jobsWithMatch.length,

      userSkills,

      jobs: jobsWithMatch,
    });
  } catch (error) {
    console.error("Jobs API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}
