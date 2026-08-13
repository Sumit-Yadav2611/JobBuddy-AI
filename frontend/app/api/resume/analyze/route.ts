import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  resumes,
  profiles,
  skills,
  experiences,
  education,
  projects,
} from "@/lib/db/schema";

import { analyzeResume } from "@/lib/resume/analyzeResume";

export const runtime = "nodejs";

export async function POST(request: Request) {
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

    const body = await request.json();

    const resumeId = body.resumeId;

    if (!resumeId) {
      return NextResponse.json(
        {
          error: "resumeId is required.",
        },
        {
          status: 400,
        },
      );
    }

    const databaseUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, user.id))
      .limit(1);

    if (databaseUser.length === 0) {
      return NextResponse.json(
        {
          error: "User not found in database.",
        },
        {
          status: 404,
        },
      );
    }

    const dbUser = databaseUser[0];

    const resumeResult = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, resumeId))
      .limit(1);

    if (resumeResult.length === 0) {
      return NextResponse.json(
        {
          error: "Resume not found.",
        },
        {
          status: 404,
        },
      );
    }

    const resume = resumeResult[0];

    if (resume.userId !== dbUser.id) {
      return NextResponse.json(
        {
          error: "You do not have access to this resume.",
        },
        {
          status: 403,
        },
      );
    }

    if (!resume.extractedText) {
      return NextResponse.json(
        {
          error: "Resume has no extracted text.",
        },
        {
          status: 400,
        },
      );
    }

    const analysis = await analyzeResume(resume.extractedText);

    await db
      .update(profiles)
      .set({
        summary: analysis.summary || null,
        updatedAt: new Date(),
      })
      .where(eq(profiles.userId, dbUser.id));

    await db.delete(skills).where(eq(skills.userId, dbUser.id));

    await db.delete(experiences).where(eq(experiences.userId, dbUser.id));

    await db.delete(education).where(eq(education.userId, dbUser.id));

    await db.delete(projects).where(eq(projects.userId, dbUser.id));

    /* =========================
   SAVE SKILLS
========================= */

    if (analysis.skills.length > 0) {
      await db.insert(skills).values(
        analysis.skills.map((skill) => ({
          userId: dbUser.id,
          name: skill.name,
          category: skill.category,
          proficiency: skill.proficiency,
        })),
      );
    }

    /* =========================
   SAVE EXPERIENCE
========================= */

    if (analysis.experience.length > 0) {
      await db.insert(experiences).values(
        analysis.experience.map((item) => ({
          userId: dbUser.id,
          company: item.company,
          role: item.role,
          location: item.location,
          startDate: item.startDate ? new Date(item.startDate) : null,
          endDate: item.endDate ? new Date(item.endDate) : null,
          isCurrent: item.isCurrent,
          description: item.description,
        })),
      );
    }

    /* =========================
   SAVE EDUCATION
========================= */

    if (analysis.education.length > 0) {
      await db.insert(education).values(
        analysis.education.map((item) => ({
          userId: dbUser.id,
          institution: item.institution,
          degree: item.degree,
          fieldOfStudy: item.fieldOfStudy,
          startDate: item.startDate ? new Date(item.startDate) : null,
          endDate: item.endDate ? new Date(item.endDate) : null,
          grade: item.grade,
        })),
      );
    }

    /* =========================
   SAVE PROJECTS
========================= */

    if (analysis.projects.length > 0) {
      await db.insert(projects).values(
        analysis.projects.map((project) => ({
          userId: dbUser.id,
          name: project.name,
          description: project.description,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
        })),
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Resume AI analysis error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze resume with AI.",
      },
      {
        status: 500,
      },
    );
  }
}
