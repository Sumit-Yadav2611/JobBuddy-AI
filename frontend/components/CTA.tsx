import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-red-500/10 bg-[#020202] px-6 py-24 sm:py-28 lg:py-32"
    >
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Central red glow */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[120px]" />

        {/* Top glow */}
        <div className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-red-500/[0.05] blur-[100px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-rose-600/[0.04] blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Large orbital ring */}
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.08]" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.06]" />

        {/* Floating particles */}
        <span className="absolute left-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.8)]" />

        <span className="absolute right-[15%] top-[20%] h-1 w-1 rounded-full bg-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.8)]" />

        <span className="absolute bottom-[24%] left-[20%] h-1 w-1 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

        <span className="absolute bottom-[18%] right-[22%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.8)]" />
      </div>

      {/* =========================================================
          CTA CONTAINER
      ========================================================== */}

      <div className="relative mx-auto max-w-6xl">
        <div
          className="
            group relative overflow-hidden rounded-[2rem]
            border border-red-500/20
            bg-[#080405]/90
            px-6 py-20
            shadow-[0_0_80px_rgba(239,68,68,0.05)]
            backdrop-blur-xl
            transition-all duration-700
            hover:border-red-500/35
            hover:shadow-[0_0_100px_rgba(239,68,68,0.10)]
            sm:px-12 sm:py-24
            lg:px-20 lg:py-28
          "
        >
          {/* =====================================================
              INNER RED LIGHT
          ====================================================== */}

          <div className="pointer-events-none absolute inset-0">
            {/* Top border glow */}
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/70 to-transparent opacity-70" />

            {/* Bottom border glow */}
            <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            {/* Central glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.08] blur-[100px] transition-all duration-700 group-hover:bg-red-500/[0.12]" />

            {/* Decorative corner glow */}
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-600/[0.08] blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-rose-600/[0.06] blur-3xl" />

            {/* Orbit */}
            <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/[0.045]" />
          </div>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* AI Icon */}
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.07] shadow-[0_0_35px_rgba(239,68,68,0.15)] transition-all duration-500 group-hover:scale-105 group-hover:border-red-400/45 group-hover:bg-red-500/[0.12] group-hover:shadow-[0_0_45px_rgba(239,68,68,0.25)]">
              <Sparkles className="h-6 w-6 text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
            </div>

            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.35em] text-red-400/80">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
              Your next opportunity
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Ready to find your
              <br />
              <span className="bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent">
                next role?
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Let JobBuddy AI handle the repetitive parts of your job search
              while you focus on preparing for the opportunities that matter.
            </p>

            {/* ===================================================
                CTA BUTTON
            ==================================================== */}

            <div className="mt-10">
              <Link
                href="/signup"
                className="
                  group/btn relative inline-flex h-13
                  items-center justify-center gap-2.5
                  overflow-hidden rounded-xl
                  border border-red-400/30
                  bg-gradient-to-r from-red-500 via-red-500 to-rose-500
                  px-8
                  text-sm font-semibold text-white
                  shadow-[0_0_30px_rgba(239,68,68,0.28)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-red-300/50
                  hover:shadow-[0_0_50px_rgba(239,68,68,0.45)]
                  active:translate-y-0
                  sm:h-14 sm:px-9
                "
              >
                {/* Button shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                <span className="relative z-10">
                  Start Applying Free
                </span>

                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>

            {/* Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="h-1 w-1 rounded-full bg-red-500/70" />
              No credit card required
              <span className="text-slate-700">·</span>
              Start for free
            </div>

            {/* ===================================================
                TRUST POINTS
            ==================================================== */}

            <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-red-500/10 pt-7">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
                AI Job Matching
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
                Resume Intelligence
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
                Application Tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}