import { auth,currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";


import Sidebar from "@/components/dashboard/Sidebar";
import JobsSection from "@/components/dashboard/JobsSection";
import ProfileCompleteness from "@/components/dashboard/ProfileCompleteness";

import { syncUser } from "@/lib/db/user-sync";



export default async function DashboardPage() {
  await auth.protect();
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Authenticated user does not have an email address.");
  }

  await syncUser({
    id: user.id,
    email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>

            <h1 className="text-lg font-semibold">Jobs</h1>
          </div>

          <UserButton />
        </header>

        {/* Content */}
        <main className="p-6 lg:p-8">
          {/* Welcome */}
          <section className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-medium text-primary">
              AI JOB APPLICATION AGENT
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Welcome to JobBuddy AI
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Find relevant jobs, match your skills, manage your profile, and
              track your applications from one place.
            </p>
          </section>

          {/* Job Platforms */}
          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
            {/* Left Column */}
            <section>
              <h2 className="text-xl font-semibold">Job Platforms</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Connect your preferred job platforms.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {["Greenhouse", "Lever", "Workable", "Wellfound"].map(
                  (platform) => (
                    <div
                      key={platform}
                      className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">

                          <BriefcaseBusinessIcon />
                        </div>

                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>

                      <h3 className="mt-4 font-semibold">{platform}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Job board
                      </p>
                    </div>
                  ),
                )}
              </div>
            </section>

            {/* Profile Completeness */}
            <ProfileCompleteness />
          </div>

          <JobsSection />
        </main>
      </div>
    </div>
  );
}

function BriefcaseBusinessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect width="18" height="14" x="3" y="7" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}
