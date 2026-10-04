import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Target,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";

const principles = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "AI With Purpose",
    description:
      "JobBuddy AI uses intelligent matching and resume understanding to help you focus on opportunities that actually fit your profile.",
  },
  {
    icon: Target,
    number: "02",
    title: "Better Opportunities",
    description:
      "Instead of searching endlessly, discover relevant jobs based on your skills, experience, goals, and professional profile.",
  },
  {
    icon: Users,
    number: "03",
    title: "Built Around You",
    description:
      "Your profile, applications, saved jobs, and career progress come together in one focused workspace.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Your Career, Your Control",
    description:
      "You decide which opportunities to pursue, how you apply, and how you manage your application journey.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030102] text-white">
      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Main red atmospheric glow */}
        <div className="absolute left-[-18%] top-[8%] h-[760px] w-[760px] rounded-full bg-red-600/[0.075] blur-[180px]" />

        <div className="absolute right-[-18%] top-[18%] h-[800px] w-[800px] rounded-full bg-red-700/[0.06] blur-[190px]" />

        <div className="absolute bottom-[-20%] left-[25%] h-[700px] w-[700px] rounded-full bg-red-900/[0.08] blur-[190px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.075]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,45,45,0.28) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,45,45,0.28) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Large radar circles */}
        <div className="absolute left-[-170px] top-[110px] h-[680px] w-[680px] rounded-full border border-red-500/[0.10]" />
        <div className="absolute left-[-105px] top-[175px] h-[550px] w-[550px] rounded-full border border-red-500/[0.075]" />
        <div className="absolute left-[-40px] top-[240px] h-[420px] w-[420px] rounded-full border border-red-500/[0.055]" />

        <div className="absolute right-[-250px] top-[430px] h-[760px] w-[760px] rounded-full border border-red-500/[0.09]" />
        <div className="absolute right-[-175px] top-[505px] h-[610px] w-[610px] rounded-full border border-red-500/[0.055]" />

        {/* Horizontal cinematic lines */}
        <div className="absolute left-0 right-0 top-[16%] h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute left-0 right-0 top-[48%] h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
        <div className="absolute left-0 right-0 top-[78%] h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />

        {/* Vertical accent line */}
        <div className="absolute left-[17%] top-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/10 to-transparent" />

        {/* Floating particles */}
        <span className="absolute left-[9%] top-[20%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,60,60,0.8)]" />
        <span className="absolute right-[16%] top-[25%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,60,60,0.8)]" />
        <span className="absolute left-[30%] top-[62%] h-1 w-1 rounded-full bg-red-300 shadow-[0_0_10px_rgba(248,60,60,0.8)]" />
        <span className="absolute right-[28%] top-[71%] h-2 w-2 rounded-full bg-red-400/80 shadow-[0_0_18px_rgba(248,60,60,0.7)]" />
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <header className="relative z-30 px-5 pt-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-red-500/20 bg-black/65 px-5 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/35 bg-red-500/[0.055] shadow-[0_0_25px_rgba(255,40,40,0.05)] transition-all duration-300 group-hover:border-red-400/70 group-hover:bg-red-500/10 group-hover:shadow-[0_0_30px_rgba(255,40,40,0.2)]">
              <Sparkles className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

              <div className="absolute inset-0 rounded-xl bg-red-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <span className="text-lg font-semibold tracking-tight text-white">
              JobBuddy{" "}
              <span className="text-red-500">AI</span>
            </span>
          </Link>

          {/* Navigation actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group hidden items-center gap-2 rounded-xl border border-transparent px-4 py-2.5 text-sm text-slate-400 transition-all duration-300 hover:border-red-500/15 hover:bg-red-500/[0.04] hover:text-white sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Home
            </Link>

            <Link
              href="/signup"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 via-red-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,35,45,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,35,45,0.35)]"
            >
              <span className="relative z-10">Get Started</span>

              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative z-10 px-6 pb-32 pt-28 sm:pt-36">
        {/* Decorative horizontal line */}
        <div className="absolute left-0 right-0 top-[25%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        <div className="mx-auto max-w-6xl text-center">
          {/* Eyebrow */}
          <div className="relative inline-flex items-center gap-3 rounded-full border border-red-500/25 bg-red-500/[0.045] px-5 py-2.5 shadow-[0_0_30px_rgba(255,40,40,0.04)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(255,50,50,0.8)]" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-red-400">
              About JobBuddy AI
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-9 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
            Your job search,
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
              made intelligent.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-9 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            JobBuddy AI is an intelligent career workspace designed to help
            job seekers discover relevant opportunities, understand their
            profile, apply smarter, and track their progress.
          </p>

          {/* Actions */}
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-7 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,40,40,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(255,40,40,0.35)]"
            >
              Start Applying Free
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-white/[0.025] px-7 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/35 hover:bg-red-500/[0.055] hover:text-white"
            >
              Explore JobBuddy
              <ArrowRight className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </div>

          {/* Mini feature line */}
          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.18em] text-slate-600">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              AI Matching
            </span>

            <span className="hidden h-3 w-px bg-red-500/20 sm:block" />

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Resume Intelligence
            </span>

            <span className="hidden h-3 w-px bg-red-500/20 sm:block" />

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Career Tracking
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION
      ========================================================== */}
      <section className="relative z-10 border-y border-red-500/[0.10] px-6 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-red-500" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-red-400">
                Our mission
              </p>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Spend less time
              <br />
              searching.
              <br />
              <span className="text-slate-700">
                Spend more time
                <br />
                progressing.
              </span>
            </h2>
          </div>

          {/* Right glass panel */}
          <div className="group relative overflow-hidden rounded-[28px] border border-red-500/15 bg-[#080305]/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_30px_100px_rgba(255,30,30,0.08)] sm:p-10">
            {/* Glow */}
            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-red-500/[0.08] blur-[90px] transition-all duration-500 group-hover:bg-red-500/[0.13]" />

            {/* Corner line */}
            <div className="absolute right-0 top-0 h-px w-40 bg-gradient-to-l from-red-500/60 to-transparent" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/[0.06] shadow-[0_0_25px_rgba(255,40,40,0.05)] transition-all duration-300 group-hover:border-red-500/45 group-hover:bg-red-500/10">
                <Zap className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <p className="mt-7 text-lg leading-8 text-slate-400 sm:text-xl">
                The modern job search can become overwhelming. Opportunities
                are scattered across platforms, resumes need constant
                attention, and keeping track of applications becomes a job in
                itself.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-500 sm:text-xl">
                JobBuddy AI brings those pieces together into one intelligent
                workspace so you can make better decisions and move toward the
                opportunities that matter.
              </p>

              <div className="mt-8 h-px w-16 bg-gradient-to-r from-red-500 to-transparent transition-all duration-500 group-hover:w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================== */}
      <section className="relative z-10 px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-red-500" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-red-400">
                What we believe
              </p>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built around a
              <br />
              <span className="text-red-400">smarter job search.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Every part of JobBuddy AI is designed around making your career
              search clearer, more focused, and easier to manage.
            </p>
          </div>

          {/* Principle cards */}
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.number}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.075] bg-white/[0.018] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-500/35 hover:bg-red-500/[0.025] hover:shadow-[0_25px_90px_rgba(255,30,30,0.09)] sm:p-8"
                >
                  {/* Red radial glow */}
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-red-500/[0.045] blur-[70px] transition-all duration-500 group-hover:bg-red-500/[0.12]" />

                  {/* Red corner accent */}
                  <div className="absolute right-0 top-0 h-px w-28 bg-gradient-to-l from-red-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.045] transition-all duration-300 group-hover:border-red-500/45 group-hover:bg-red-500/10 group-hover:shadow-[0_0_25px_rgba(255,40,40,0.1)]">
                      <Icon className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="text-xs font-medium tracking-[0.25em] text-slate-700 transition-colors duration-300 group-hover:text-red-500/50">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-red-50">
                    {principle.title}
                  </h3>

                  <p className="relative mt-3 max-w-lg text-sm leading-7 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                    {principle.description}
                  </p>

                  {/* Animated underline */}
                  <div className="relative mt-7 h-px w-0 bg-gradient-to-r from-red-500 via-red-400 to-transparent transition-all duration-500 group-hover:w-20" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="relative z-10 px-6 pb-28 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="group relative overflow-hidden rounded-[32px] border border-red-500/20 bg-[#080305]/85 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {/* Large center glow */}
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.065] blur-[120px] transition-all duration-700 group-hover:bg-red-600/[0.10]" />

            {/* Decorative circles */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.05]" />

            {/* Top accent */}
            <div className="absolute left-1/2 top-0 h-px w-56 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

            <div className="relative px-6 py-20 text-center sm:px-12 sm:py-24">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.06] shadow-[0_0_30px_rgba(255,40,40,0.08)] transition-all duration-300 group-hover:border-red-500/45 group-hover:bg-red-500/10 group-hover:shadow-[0_0_35px_rgba(255,40,40,0.15)]">
                <Sparkles className="h-6 w-6 text-red-400" />
              </div>

              <h2 className="mt-8 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ready to find your
                <br />
                <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
                  next opportunity?
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Build your profile, discover matching jobs, and start managing
                your career search with JobBuddy AI.
              </p>

              <Link
                href="/signup"
                className="group/button mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-[0_0_45px_rgba(255,40,40,0.28)]"
              >
                Get Started Free

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-700">
                Start free · No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER DECORATIVE LINE
      ========================================================== */}
      <div className="relative z-10 border-t border-red-500/[0.10]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-9">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/40" />

          <span className="text-[9px] uppercase tracking-[0.45em] text-slate-700">
            Discover · Match · Apply · Track
          </span>

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/40" />
        </div>
      </div>
    </main>
  );
}