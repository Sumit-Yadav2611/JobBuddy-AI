import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

const freeFeatures = [
  "Create your professional profile",
  "Upload and analyze your resume",
  "Discover relevant job opportunities",
  "AI-powered job matching",
  "Save jobs",
  "Track applications",
];

const premiumFeatures = [
  "Everything in Free",
  "Advanced AI job matching",
  "Smarter resume intelligence",
  "Priority career insights",
  "Advanced application workflow",
  "Premium career workspace",
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-15%] top-[5%] h-[520px] w-[520px] rounded-full bg-red-600/[0.08] blur-[150px]" />

        <div className="absolute right-[-12%] top-[20%] h-[650px] w-[650px] rounded-full bg-red-950/[0.18] blur-[170px]" />

        <div className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-red-900/[0.08] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,40,40,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,40,40,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Horizontal light lines */}
        <div className="absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute left-0 right-0 top-[65%] h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
      </div>

      {/* Navigation */}
      <header className="relative z-20 px-5 pt-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-red-500/15 bg-black/60 px-5 py-4 backdrop-blur-xl sm:px-7">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/[0.06] transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/10 group-hover:shadow-[0_0_25px_rgba(255,40,40,0.15)]">
              <Sparkles className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              JobBuddy <span className="text-red-500">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-400 transition-all duration-300 hover:text-white sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,40,40,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,40,40,0.3)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/[0.04] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
              Simple pricing
            </span>
          </div>

          <h1 className="mx-auto mt-8 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Choose the workspace
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-500 bg-clip-text text-transparent">
              that fits your journey.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Start for free and build your career profile. Upgrade when you
            want more powerful AI tools to help you search, match, apply, and
            track opportunities.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 px-6 pb-28">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {/* Free */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/20 hover:bg-white/[0.03] hover:shadow-[0_25px_80px_rgba(255,30,30,0.06)] sm:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-500/[0.04] blur-3xl transition-all duration-500 group-hover:bg-red-500/[0.08]" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Free
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    Start your search
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                    Everything you need to organize your career search and
                    start discovering opportunities.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Zap className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  ₹0
                </span>

                <span className="mb-2 text-sm text-slate-600">
                  / forever
                </span>
              </div>

              <Link
                href="/signup"
                className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-white transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/[0.06] hover:shadow-[0_0_30px_rgba(255,40,40,0.08)]"
              >
                Start for Free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="mt-9 border-t border-white/[0.06] pt-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-600">
                  Included
                </p>

                <div className="mt-5 space-y-4">
                  {freeFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-400"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.05]">
                        <Check className="h-3 w-3 text-red-400" />
                      </span>

                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div className="group relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-500/[0.08] to-white/[0.02] p-8 shadow-[0_0_80px_rgba(255,30,30,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_25px_100px_rgba(255,30,30,0.15)] sm:p-10">
            {/* Premium glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/[0.12] blur-[90px] transition-all duration-500 group-hover:bg-red-500/[0.18]" />

            <div className="absolute right-6 top-6 rounded-full border border-red-500/25 bg-red-500/[0.08] px-3 py-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-red-400">
                Recommended
              </span>
            </div>

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400">
                    Premium
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    Accelerate your search
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                    Unlock a more powerful AI career workspace designed for
                    serious job searching.
                  </p>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/[0.08] sm:flex">
                  <Sparkles className="h-5 w-5 text-red-400" />
                </div>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  ₹499
                </span>

                <span className="mb-2 text-sm text-slate-500">
                  / month
                </span>
              </div>

              <Link
                href="/signup"
                className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,40,40,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(255,40,40,0.3)]"
              >
                Get Premium
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="mt-9 border-t border-red-500/10 pt-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400/70">
                  Everything you need
                </p>

                <div className="mt-5 space-y-4">
                  {premiumFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-red-500/30 bg-red-500/[0.08]">
                        <Check className="h-3 w-3 text-red-400" />
                      </span>

                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 border-y border-red-500/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:flex-row">
          <ShieldCheck className="h-5 w-5 text-red-400" />

          <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
            Simple plans · Secure payments · Cancel anytime
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
            Your next opportunity
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Ready to make your
            <br />
            <span className="text-red-400">job search smarter?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-500">
            Start building your professional profile today and let JobBuddy AI
            help you move toward better opportunities.
          </p>

          <Link
            href="/signup"
            className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-[0_0_40px_rgba(255,40,40,0.25)]"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer line */}
      <div className="relative z-10 border-t border-red-500/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-8">
          <div className="h-px w-10 bg-red-500/30" />

          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-700">
            Discover · Match · Apply · Track
          </span>

          <div className="h-px w-10 bg-red-500/30" />
        </div>
      </div>
    </main>
  );
}