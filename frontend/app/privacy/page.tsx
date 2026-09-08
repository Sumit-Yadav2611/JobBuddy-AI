import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Database,
  UserRound,
  Sparkles,
  Eye,
} from "lucide-react";

const privacySections = [
  {
    icon: Database,
    number: "01",
    title: "Information We Collect",
    content: [
      "When you use JobBuddy AI, we may collect information you provide while creating your account, building your professional profile, uploading your resume, saving jobs, and tracking applications.",
      "This may include your name, email address, professional experience, education, skills, projects, resume information, saved jobs, and application activity.",
      "We also collect basic technical information required to operate, secure, and improve the platform.",
    ],
  },
  {
    icon: UserRound,
    number: "02",
    title: "How We Use Your Information",
    content: [
      "Your information is used to provide and improve the JobBuddy AI experience.",
      "This includes creating your professional profile, understanding resume information, matching you with relevant opportunities, organizing saved jobs, and helping you track applications.",
      "We may also use information to maintain platform security, troubleshoot problems, and improve our services.",
    ],
  },
  {
    icon: Sparkles,
    number: "03",
    title: "AI & Resume Processing",
    content: [
      "JobBuddy AI may process information from your resume and professional profile to provide AI-powered features such as resume understanding, profile extraction, and job matching.",
      "AI-generated results are intended to assist your job search and should be reviewed by you before making important career decisions.",
      "We aim to process only the information necessary to provide the requested functionality.",
    ],
  },
  {
    icon: LockKeyhole,
    number: "04",
    title: "Data Security",
    content: [
      "We take reasonable technical and organizational measures to protect information stored and processed through JobBuddy AI.",
      "Access to account and career information is designed to be limited to authorized systems and services.",
      "However, no online service can guarantee absolute security, so users should also take reasonable steps to protect their accounts.",
    ],
  },
  {
    icon: Eye,
    number: "05",
    title: "Your Choices",
    content: [
      "You can review and update information in your JobBuddy AI profile through the platform.",
      "You can manage saved jobs and application information through your account.",
      "If you have questions about your information or want to request changes, you can contact the JobBuddy AI team.",
    ],
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Third-Party Services",
    content: [
      "JobBuddy AI may rely on trusted third-party services for authentication, hosting, databases, AI processing, payments, and other infrastructure required to operate the platform.",
      "These services may process information only as necessary to provide their respective functionality.",
      "Third-party services have their own privacy policies and terms that may also apply to their processing of information.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white">
      {/* =========================================================
          Ambient Background
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-15%] top-[5%] h-[520px] w-[520px] rounded-full bg-red-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-12%] top-[25%] h-[620px] w-[620px] rounded-full bg-red-950/[0.16] blur-[170px]" />

        <div className="absolute bottom-[-15%] left-[30%] h-[520px] w-[520px] rounded-full bg-red-900/[0.08] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,40,40,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,40,40,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute left-1/2 top-[18%] h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* =========================================================
          Navigation
      ========================================================== */}
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
              className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-400 transition-colors hover:text-white sm:inline-flex"
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

      {/* =========================================================
          Hero
      ========================================================== */}
      <section className="relative z-10 px-6 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/[0.04] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
              Privacy
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Your information,
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-500 bg-clip-text text-transparent">
              handled responsibly.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            This Privacy Policy explains how JobBuddy AI collects, uses,
            protects, and manages information when you use our career
            workspace.
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-slate-700">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* =========================================================
          Privacy Intro
      ========================================================== */}
      <section className="relative z-10 border-y border-white/[0.06] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Our approach
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Privacy should be
              <br />
              <span className="text-slate-600">simple and transparent.</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-red-500/15 bg-white/[0.025] p-8 shadow-[0_0_80px_rgba(255,30,30,0.04)] sm:p-10">
            <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-red-500/[0.08] blur-[80px]" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                <ShieldCheck className="h-5 w-5 text-red-400" />
              </div>

              <p className="mt-7 text-lg leading-8 text-slate-400">
                JobBuddy AI is designed around helping you manage your career
                search without making your personal information unnecessarily
                complicated.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-500">
                We use information to provide the features you request,
                improve the platform, maintain security, and help you discover
                better opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Privacy Sections
      ========================================================== */}
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Privacy details
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              How your information
              <br />
              is handled.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {privacySections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/[0.025] hover:shadow-[0_20px_70px_rgba(255,30,30,0.08)] sm:p-8"
                >
                  {/* Hover glow */}
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/[0.04] blur-3xl transition-all duration-500 group-hover:bg-red-500/[0.1]" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.05] transition-all duration-300 group-hover:border-red-500/40 group-hover:bg-red-500/10">
                      <Icon className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="text-xs font-medium tracking-[0.2em] text-slate-700">
                      {section.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-xl font-semibold text-white">
                    {section.title}
                  </h3>

                  <div className="relative mt-5 space-y-4">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-500"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="relative mt-7 h-px w-0 bg-gradient-to-r from-red-500 to-transparent transition-all duration-500 group-hover:w-16" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          Contact / Questions
      ========================================================== */}
      <section className="relative z-10 px-6 pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-red-500/20 bg-white/[0.02]">
          <div className="relative px-6 py-20 text-center sm:px-12">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.08] blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.06]">
                <LockKeyhole className="h-6 w-6 text-red-400" />
              </div>

              <h2 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Questions about your
                <br />
                <span className="text-red-400">privacy?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500">
                If you have questions about how JobBuddy AI handles your
                information, please reach out to the team.
              </p>

              <Link
                href="/"
                className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-[0_0_40px_rgba(255,40,40,0.25)]"
              >
                Return to JobBuddy AI
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Footer Line
      ========================================================== */}
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