import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";

export async function GET() {
  try {
    const [job] = await db
      .insert(jobs)
      .values({
        externalId: "jobbuddy-test-001",
        title: "Software Engineer Intern",
        company: "JobBuddy Demo",
        platform: "JobBuddy",
        location: "Remote",
        jobType: "Internship",
        description:
          "Demo software engineering internship used to verify the JobBuddy job database.",
        requirements:
          "C++, JavaScript, React, Node.js",
        salary: "Not specified",
        url: "https://example.com",
      })
      .returning();

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Job test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to insert test job",
      },
      { status: 500 }
    );
  }
}