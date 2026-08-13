import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import ResumeUpload from "@/components/dashboard/ResumeUpload";

export default async function ResumePage() {
  await auth.protect();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>

            <h1 className="text-lg font-semibold">Resume</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl p-6 lg:p-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">Your Resume</h2>

              <p className="mt-1 text-muted-foreground">
                Upload your resume to let JobBuddy AI understand your experience
                and skills.
              </p>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="mt-8">
          <ResumeUpload />
        </div>

        {/* What happens next */}
        <div className="mt-8 rounded-2xl border bg-card p-6">
          <h3 className="font-semibold">What happens after uploading?</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Step
              number="01"
              title="Extract"
              description="JobBuddy AI reads the information from your resume."
            />

            <Step
              number="02"
              title="Build Profile"
              description="Skills, education and experience are organized automatically."
            />

            <Step
              number="03"
              title="Match Jobs"
              description="Your profile is used to find relevant job opportunities."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs font-semibold text-primary">{number}</p>

      <h4 className="mt-2 font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
