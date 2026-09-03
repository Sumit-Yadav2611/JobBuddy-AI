import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import BillingActions from "./BillingActions";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";

export default async function BillingPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return null;
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (!user) {
    return null;
  }

  const [subscription] = await db
    .select({
      plan: subscriptions.plan,
      status: subscriptions.status,
      currentPeriodStart: subscriptions.currentPeriodStart,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
    })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "active";
  const isPremium = plan === "premium";

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-120px] top-[180px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute bottom-[-160px] left-[30%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Billing & Subscription
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Choose the plan that powers your job search.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Unlock advanced AI-powered job matching and application
                assistance with JobBuddy Premium.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Crown className="h-8 w-8 text-cyan-300" />
            </div>
          </div>
        </section>

        {/* Current subscription */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Current Plan
              </p>

              <div className="mt-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold capitalize">
                  {isPremium ? "Premium" : "Free"}
                </h2>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium capitalize text-emerald-300">
                  {status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400">{user.email}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-500">Billing period</p>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {isPremium
                      ? `${formatDate(subscription?.currentPeriodStart)} – ${formatDate(subscription?.currentPeriodEnd)}`
                      : "No active paid subscription"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {subscription?.cancelAtPeriodEnd && (
            <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-300">
              Your subscription is scheduled to cancel at the end of the
              current billing period.
            </div>
          )}
        </section>

        {/* Plans */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Free */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Starter</p>
                <h3 className="mt-1 text-2xl font-bold">Free</h3>
              </div>

              {!isPremium && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Current
                </span>
              )}
            </div>

            <div className="mt-6">
              <span className="text-4xl font-bold">₹0</span>
              <span className="ml-2 text-sm text-slate-500">forever</span>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <ul className="space-y-4">
              {[
                "Build your professional profile",
                "Upload and manage resumes",
                "Track job applications",
                "Save interesting jobs",
                "Basic job matching",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.035] to-violet-500/[0.08] p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                    <Zap className="h-4 w-4" />
                    For serious job seekers
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">Premium</h3>
                </div>

                {isPremium && (
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    Current
                  </span>
                )}
              </div>

              <div className="mt-6">
                <span className="text-4xl font-bold">₹499</span>
                <span className="ml-2 text-sm text-slate-500">/ month</span>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <ul className="space-y-4">
                {[
                  "Everything in Free",
                  "Advanced AI job matching",
                  "AI-powered resume analysis",
                  "Personalized job recommendations",
                  "AI application assistance",
                  "Priority access to new features",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
                      <Check className="h-3.5 w-3.5 text-cyan-300" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <BillingActions isPremium={isPremium} />

              <p className="mt-3 text-center text-xs text-slate-500">
                Secure payments powered by Stripe
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Secure billing
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your payment details will be handled securely by Stripe.
                JobBuddy does not store your card information.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}