import {
  UserRound,
  Search,
  Target,
  FileText,
  Rocket,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "AI Profile",
    description:
      "Build a complete professional profile from your resume, skills, education, experience, and projects.",
  },
  {
    icon: Search,
    title: "Smart Job Search",
    description:
      "Discover relevant opportunities from supported job platforms based on your career goals and profile.",
  },
  {
    icon: Target,
    title: "AI Job Matching",
    description:
      "Get an intelligent match score that shows how closely your skills and experience fit each job.",
  },
  {
    icon: FileText,
    title: "Resume Intelligence",
    description:
      "Extract important information from your resume and identify missing details that can strengthen your profile.",
  },
  {
    icon: Rocket,
    title: "Smart Apply",
    description:
      "Review matched opportunities and choose between applying manually or using supported application automation.",
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description:
      "Track every application from Applied and In Review to Interview, Rejected, and Follow-up.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-red-500/10 bg-[#020202] px-6 py-28 sm:py-32"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Central red ambient glow */}
        <div className="absolute left-1/2 top-[42%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-600/[0.055] blur-[140px]" />

        {/* Left glow */}
        <div className="absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-red-600/[0.04] blur-[110px]" />

        {/* Right glow */}
        <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-rose-600/[0.035] blur-[110px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Decorative orbit */}
        <div className="absolute left-1/2 top-[42%] h-[760px] w-[760px] -translate-x-1/2 rounded-full border border-red-500/[0.045]" />

        <div className="absolute left-1/2 top-[42%] h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-red-500/[0.035]" />

        {/* Floating particles */}
        <span className="absolute left-[9%] top-[22%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.8)]" />

        <span className="absolute right-[11%] top-[32%] h-1 w-1 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

        <span className="absolute left-[16%] bottom-[20%] h-1 w-1 rounded-full bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.7)]" />

        <span className="absolute right-[18%] bottom-[13%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.8)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =======================================================
            HEADING
        ======================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-red-400/80">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
            Powerful features
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Everything you need
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
              to find your next role.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            From understanding your resume to tracking every application,
            JobBuddy AI helps you manage the entire job search in one place.
          </p>

          {/* Small divider */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-500/50" />
          </div>
        </div>

        {/* =======================================================
            FEATURE GRID
        ======================================================== */}

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-red-500/[0.14]
                  bg-[#080405]/90
                  p-7
                  shadow-[0_15px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-red-500/35
                  hover:bg-[#0c0506]
                  hover:shadow-[0_25px_70px_rgba(239,68,68,0.13)]
                "
              >
                {/* =================================================
                    CARD AMBIENT GLOW
                ================================================== */}

                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/[0.06] blur-3xl transition-all duration-500 group-hover:bg-red-500/[0.13]" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-rose-600/[0.04] blur-3xl transition-all duration-500 group-hover:bg-rose-500/[0.08]" />

                {/* Top red light */}
                <div className="absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-400 to-transparent transition-all duration-500 group-hover:w-2/3" />

                {/* =================================================
                    CARD HEADER
                ================================================== */}

                <div className="relative flex items-start justify-between">
                  {/* Icon */}
                  <div
                    className="
                      relative flex h-14 w-14 items-center justify-center
                      rounded-2xl
                      border border-red-500/20
                      bg-red-500/[0.06]
                      text-red-400
                      shadow-[0_0_25px_rgba(239,68,68,0.06)]
                      transition-all duration-500
                      group-hover:scale-105
                      group-hover:border-red-400/40
                      group-hover:bg-red-500/[0.12]
                      group-hover:text-red-300
                      group-hover:shadow-[0_0_35px_rgba(239,68,68,0.18)]
                    "
                  >
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />

                    {/* Icon glow */}
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-red-500/[0.04] blur-md" />
                  </div>

                  {/* Number */}
                  <span className="text-[11px] font-medium tracking-[0.2em] text-red-500/45 transition-colors duration-300 group-hover:text-red-400/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* =================================================
                    CARD CONTENT
                ================================================== */}

                <div className="relative">
                  <h3 className="mt-8 text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-red-50">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {feature.description}
                  </p>

                  {/* Bottom indicator */}
                  <div className="mt-7 flex items-center gap-3">
                    <div className="h-px w-8 bg-red-500/25 transition-all duration-500 group-hover:w-14 group-hover:bg-red-400/70" />

                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 transition-colors duration-300 group-hover:text-red-400/60">
                      JobBuddy AI
                    </span>
                  </div>
                </div>

                {/* =================================================
                    HOVER CORNER
                ================================================== */}

                <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full border border-red-500/10 transition-all duration-500 group-hover:border-red-500/30" />
                </div>
              </div>
            );
          })}
        </div>

        {/* =======================================================
            BOTTOM FEATURE STRIP
        ======================================================== */}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="group flex items-center justify-center gap-2 rounded-2xl border border-red-500/[0.10] bg-red-500/[0.025] px-4 py-3 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/[0.05]">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_9px_rgba(248,113,113,0.8)]" />
            <span className="text-xs text-slate-500 transition-colors group-hover:text-slate-300">
              Intelligent career profile
            </span>
          </div>

          <div className="group flex items-center justify-center gap-2 rounded-2xl border border-red-500/[0.10] bg-red-500/[0.025] px-4 py-3 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/[0.05]">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_9px_rgba(248,113,113,0.8)]" />
            <span className="text-xs text-slate-500 transition-colors group-hover:text-slate-300">
              AI-powered job matching
            </span>
          </div>

          <div className="group flex items-center justify-center gap-2 rounded-2xl border border-red-500/[0.10] bg-red-500/[0.025] px-4 py-3 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/[0.05]">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_9px_rgba(248,113,113,0.8)]" />
            <span className="text-xs text-slate-500 transition-colors group-hover:text-slate-300">
              Complete application workflow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}