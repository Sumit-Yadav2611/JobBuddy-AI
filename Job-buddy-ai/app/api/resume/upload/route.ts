export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, resumes } from "@/lib/db/schema";
import { extractResumeText } from "@/lib/resume/extractText";



const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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
        }
      );
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        {
          error: "User email not found.",
        },
        {
          status: 400,
        }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No resume file provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Only PDF and DOCX files are supported.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Resume must be smaller than 5 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const text = await extractResumeText(file);

    if (!text) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this resume. Please upload a text-based PDF or DOCX.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, user.id))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        {
          error:
            "User account has not been synchronized with the database yet.",
        },
        {
          status: 400,
        }
      );
    }

    const databaseUser = existingUser[0];

    const [resume] = await db
      .insert(resumes)
      .values({
        userId: databaseUser.id,
        fileName: file.name,
        fileType: file.type,
        extractedText: text,
        isPrimary: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      resume: {
        id: resume.id,
        fileName: resume.fileName,
        fileType: resume.fileType,
        textLength: text.length,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return NextResponse.json(
      {
        error: "Failed to process resume.",
      },
      {
        status: 500,
      }
    );
  }
}