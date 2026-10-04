import {
  UserRound,
  Search,
  Send,
  ChartNoAxesCombined,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "Create Your Profile",
    description:
      "Upload your resume and build a complete profile with your skills, education, experience, projects, and certifications.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Matching Jobs",
    description:
      "JobBuddy AI finds relevant opportunities and analyzes how well each job matches your skills and experience.",
  },
  {
    number: "03",
    icon: Send,
    title: "Apply Smarter",
    description:
      "Review matched jobs and choose whether to apply manually or use supported application automation.",
  },
  {
    number: "04",
    icon: ChartNoAxesCombined,
    title: "Track Everything",
    description:
      "Keep all your applications organized and track statuses from Applied and In Review to Interview and Rejected.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden border-t border-red-500/10 bg-[#020202] px-6 py-28 text-white sm:py-32"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      {/* Main red ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/[0.07] blur-[140px]" />

      {/* Left glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-[420px] w-[420px] rounded-full bg-red-700/[0.06] blur-[120px]" />

      {/* Right glow */}
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-red-500/[0.05] blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
        }}
      />

      {/* Large decorative circles */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[620px] w-[620px] rounded-full border border-red-500/[0.08]" />
      <div className="pointer-events-none absolute -left-24 top-36 -z-10 h-[470px] w-[470px] rounded-full border border-red-500/[0.06]" />

      <div className="pointer-events-none absolute -right-52 bottom-10 -z-10 h-[650px] w-[650px] rounded-full border border-red-500/[0.07]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute left-[9%] top-[24%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]" />
      <div className="pointer-events-none absolute right-[14%] top-[32%] h-2 w-2 rounded-full bg-red-300 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
      <div className="pointer-events-none absolute left-[42%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.8)]" />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/[0.06] px-4 py-2 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-red-300">
              How It Works
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            From profile to application
            <br />
            <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
              in four simple steps.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            JobBuddy AI brings your resume, job discovery, matching,
            applications, and tracking together in one place.
          </p>
        </div>

        {/* =========================================================
            STEP CARDS
        ========================================================== */}

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[58px] hidden h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent lg:block" />

          {/* Glowing line center */}
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-[58px] hidden h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent blur-sm lg:block" />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* =================================================
                      CARD GLOW
                  ================================================== */}
                  <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-b from-red-500/0 via-red-500/0 to-red-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-red-500/15 group-hover:via-red-500/5 group-hover:to-transparent group-hover:opacity-100" />

                  {/* =================================================
                      CARD
                  ================================================== */}
                  <div
                    className="
                      relative
                      min-h-[370px]
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-7
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      group-hover:-translate-y-2
                      group-hover:border-red-500/30
                      group-hover:bg-red-950/[0.08]
                      group-hover:shadow-[0_25px_80px_rgba(220,38,38,0.12)]
                    "
                  >
                    {/* Top red shine */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Corner glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-red-500/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* =================================================
                        TOP ROW
                    ================================================== */}
                    <div className="relative flex items-center justify-between">
                      {/* Number */}
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-medium tracking-[0.25em] text-red-400">
                          {step.number}
                        </span>

                        <div className="h-px w-7 bg-red-500/20 transition-all duration-500 group-hover:w-12 group-hover:bg-red-500/50" />
                      </div>

                      {/* Icon */}
                      <div
                        className="
                          relative
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-red-500/20
                          bg-red-500/[0.06]
                          text-red-400
                          transition-all
                          duration-500
                          group-hover:border-red-400/40
                          group-hover:bg-red-500/[0.12]
                          group-hover:text-red-300
                          group-hover:shadow-[0_0_28px_rgba(239,68,68,0.2)]
                        "
                      >
                        <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />

                        {/* Icon glow */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-red-500/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* =================================================
                        STEP CONTENT
                    ================================================== */}
                    <div className="relative mt-20">
                      <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-red-50">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                        {step.description}
                      </p>
                    </div>

                    {/* =================================================
                        BOTTOM ACTION
                    ================================================== */}
                    <div className="absolute bottom-7 left-7 right-7">
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-red-400/70">
                          JobBuddy AI
                        </span>

                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] text-zinc-600 transition-all duration-300 group-hover:border-red-500/30 group-hover:bg-red-500/10 group-hover:text-red-400">
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom red line */}
                    <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500 group-hover:w-2/3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM TRUST STRIP
        ========================================================== */}

        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <div className="h-px w-8 bg-red-500/30" />

          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600">
            One workflow
          </p>

          <span className="hidden h-1 w-1 rounded-full bg-red-500/50 sm:block" />

          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600">
            One intelligent workspace
          </p>

          <div className="h-px w-8 bg-red-500/30" />
        </div>
      </div>
    </section>
  );
}