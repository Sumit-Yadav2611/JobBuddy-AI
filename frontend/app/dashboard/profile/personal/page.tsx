import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  BriefcaseBusiness,
} from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, profiles } from "@/lib/db/schema";

export default async function PersonalInformationPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find current application user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-background p-10">
        <h1 className="text-2xl font-bold">User profile not found</h1>

        <p className="mt-2 text-muted-foreground">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  // Get profile information
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  const fullName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Name not specified";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Profile</p>

            <h1 className="text-lg font-semibold">Personal Information</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-4xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Personal Information
              </h2>

              <p className="mt-1 text-muted-foreground">
                Your basic professional information.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}

        <section className="mt-8 rounded-2xl border bg-card p-6 lg:p-8">
          {/* Name */}

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-lg font-semibold">
              {fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-xl font-semibold">{fullName}</h3>

              {profile?.headline && (
                <p className="mt-1 text-muted-foreground">{profile.headline}</p>
              )}
            </div>
          </div>

          {/* Information Grid */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* Location */}

            <div className="rounded-xl border p-5">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    {profile?.location || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}

            <div className="rounded-xl border p-5">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 font-medium">
                    {profile?.phone || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}

            <div className="rounded-xl border p-5">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Experience
                  </p>

                  <p className="mt-1 font-medium">
                    {profile?.yearsOfExperience !== null &&
                    profile?.yearsOfExperience !== undefined
                      ? `${profile.yearsOfExperience} years`
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}

            <div className="rounded-xl border p-5">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 truncate font-medium">{dbUser.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}

          {profile?.headline && (
            <div className="mt-5 rounded-xl border p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Professional Headline
              </p>

              <p className="mt-2 font-medium">{profile.headline}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
