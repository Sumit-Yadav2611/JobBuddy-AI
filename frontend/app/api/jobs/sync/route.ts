import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { syncJobsFromArbeitnow } from "@/lib/jobs/syncJobs";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const result = await syncJobsFromArbeitnow();

    return NextResponse.json({
      success: true,
      message: "Jobs synchronized successfully",
      ...result,
    });
  } catch (error) {
    console.error("Job sync error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to synchronize jobs",
      },
      {
        status: 500,
      },
    );
  }
}