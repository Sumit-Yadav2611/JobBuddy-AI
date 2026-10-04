import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const termsSections = [
  {
    number: "01",
    icon: CheckCircle2,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using JobBuddy AI, you agree to these Terms of Service and our Privacy Policy.",
      "If you do not agree with these terms, please do not use the platform.",
      "You must use JobBuddy AI only for lawful purposes and in accordance with these terms.",
    ],
  },
  {
    number: "02",
    icon: FileText,
    title: "Using JobBuddy AI",
    content: [
      "JobBuddy AI provides tools for resume management, job discovery, job matching, application tracking, and related career workflows.",
      "You are responsible for the information you provide to the platform and for reviewing information generated or recommended by our AI features.",
      "You agree not to misuse the service, interfere with its operation, or attempt to access areas of the platform that you are not authorized to use.",
    ],
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Your Account",
    content: [
      "Some features require you to create or authenticate an account.",
      "You are responsible for maintaining the security of your account and for activity performed through your account.",
      "Please notify us if you believe your account has been accessed or used without authorization.",
    ],
  },
  {
    number: "04",
    icon: Scale,
    title: "AI & Job Information",
    content: [
      "JobBuddy AI may use automated systems to analyze resumes, profiles, job descriptions, and application-related information.",
      "AI-generated recommendations are intended to assist your decision-making and should not be treated as a guarantee of employment, interviews, or application success.",
      "Job availability, descriptions, requirements, compensation, and application processes may change and may be controlled by third-party employers or job platforms.",
    ],
  },
  {
    number: "05",
    icon: FileText,
    title: "Your Content",
    content: [
      "You retain ownership of the content and information you submit to JobBuddy AI, including your resume and professional profile information.",
      "You grant JobBuddy AI the limited permission necessary to process that information to provide the features and services you request.",
      "You should only upload or submit information that you have the right to use and share.",
    ],
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Third-Party Services",
    content: [
      "JobBuddy AI may connect with or provide links to third-party websites, job platforms, authentication providers, payment providers, or other services.",
      "Third-party services operate under their own terms and privacy policies.",
      "JobBuddy AI is not responsible for the content, availability, security, or practices of third-party services.",
    ],
  },
  {
    number: "07",
    icon: Scale,
    title: "Subscriptions & Payments",
    content: [
      "Certain JobBuddy AI features may require a paid subscription.",
      "Subscription pricing, billing periods, and available features will be presented before you complete a purchase.",
      "Subscriptions may be subject to cancellation and billing rules displayed during checkout or within your account.",
    ],
  },
  {
    number: "08",
    icon: ShieldCheck,
    title: "Service Availability",
    content: [
      "We aim to keep JobBuddy AI reliable and available, but we do not guarantee uninterrupted or error-free operation.",
      "Features may occasionally be changed, updated, temporarily unavailable, or discontinued.",
      "We may perform maintenance or improvements that temporarily affect availability.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-15%] top-[8%] h-[500px] w-[500px] rounded-full bg-red-600/[0.07] blur-[140px]" />

        <div className="absolute right-[-12%] top-[25%] h-[600px] w-[600px] rounded-full bg-red-950/[0.15] blur-[160px]" />

        <div className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-red-900/[0.08] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,40,40,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,40,40,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-20 px-5 pt-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-red-500/15 bg-black/60 px-5 py-4 backdrop-blur-xl sm:px-7">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/[0.06] transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/10 group-hover:shadow-[0_0_25px_rgba(255,40,40,0.15)]">
              <Sparkles className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              JobBuddy{" "}
              <span className="text-red-500">AI</span>
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
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/[0.04] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400">
              Legal
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Terms of
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-500 bg-clip-text text-transparent">
              Service.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            The rules and guidelines that help keep JobBuddy AI useful,
            reliable, and fair for everyone using the platform.
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-700">
            Last updated · September 2026
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="relative z-10 border-y border-white/[0.06] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-red-500/15 bg-white/[0.025] p-8 shadow-[0_0_80px_rgba(255,30,30,0.04)] sm:p-10">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-red-500/[0.07] blur-[90px]" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                <Scale className="h-5 w-5 text-red-400" />
              </div>

              <h2 className="mt-7 text-2xl font-semibold text-white sm:text-3xl">
                Welcome to JobBuddy AI
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-400">
                These Terms of Service explain the rules for accessing and
                using JobBuddy AI. Our goal is to provide an intelligent
                workspace that helps you discover opportunities, understand
                your professional profile, manage applications, and organize
                your job search.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-500">
                By using JobBuddy AI, you acknowledge that you have read,
                understood, and agreed to these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              The agreement
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Understanding
              <br />
              <span className="text-slate-600">the rules.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
              Please review the following sections to understand how
              JobBuddy AI works and what is expected when using the platform.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {termsSections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/[0.025] hover:shadow-[0_20px_70px_rgba(255,30,30,0.08)] sm:p-8"
                >
                  {/* Glow */}
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

                  <div className="relative mt-4 space-y-4">
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

      {/* Responsible Use */}
      <section className="relative z-10 border-y border-white/[0.06] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Responsible use
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Use the platform
              <br />
              <span className="text-slate-600">with intention.</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-red-500/15 bg-white/[0.025] p-8 shadow-[0_0_80px_rgba(255,30,30,0.04)] sm:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-red-500/[0.08] blur-[80px]" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                <ShieldCheck className="h-5 w-5 text-red-400" />
              </div>

              <p className="mt-7 text-lg leading-8 text-slate-400">
                JobBuddy AI is designed to support your career decisions, not
                replace them. Always review job information, application
                details, AI-generated content, and recommendations before
                taking action.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-500">
                By using the platform responsibly, you help maintain a better
                experience for yourself and the wider JobBuddy AI community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-red-500/20 bg-white/[0.02]">
          <div className="relative px-6 py-20 text-center sm:px-12">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.08] blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.06]">
                <Sparkles className="h-6 w-6 text-red-400" />
              </div>

              <h2 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Ready to build
                <br />
                <span className="text-red-400">your next opportunity?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500">
                Create your profile, discover relevant jobs, and manage your
                career search with JobBuddy AI.
              </p>

              <Link
                href="/signup"
                className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-[0_0_40px_rgba(255,40,40,0.25)]"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
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