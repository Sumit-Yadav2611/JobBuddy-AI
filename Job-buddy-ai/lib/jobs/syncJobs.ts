import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { fetchArbeitnowJobs } from "@/lib/jobs/providers/arbeitnow";

export async function syncJobsFromArbeitnow() {
  const externalJobs = await fetchArbeitnowJobs();

  let created = 0;
  let updated = 0;

  for (const job of externalJobs) {
    const existing = await db
      .select({
        id: jobs.id,
      })
      .from(jobs)
      .where(
        and(
          eq(jobs.platform, job.platform),
          eq(jobs.externalId, job.externalId),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(jobs)
        .set({
          title: job.title,
          company: job.company,
          location: job.location,
          jobType: job.jobType,
          description: job.description,
          requirements: job.requirements,
          salary: job.salary,
          url: job.url,
          updatedAt: new Date(),
        })
        .where(eq(jobs.id, existing[0].id));

      updated++;
    } else {
      await db.insert(jobs).values({
        externalId: job.externalId,
        title: job.title,
        company: job.company,
        platform: job.platform,
        location: job.location,
        jobType: job.jobType,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        url: job.url,
      });

      created++;
    }
  }

  return {
    total: externalJobs.length,
    created,
    updated,
  };
}