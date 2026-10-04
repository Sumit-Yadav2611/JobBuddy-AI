import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  FileText,
  BarChart3,
  Sparkles,
  Play,
  Zap,
  Target,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white selection:bg-red-500/30">
      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Left red glow */}
        <div className="absolute -left-[18%] top-[8%] h-[760px] w-[760px] rounded-full bg-red-700/[0.10] blur-[170px]" />

        {/* Right red glow */}
        <div className="absolute -right-[16%] top-[12%] h-[700px] w-[700px] rounded-full bg-red-600/[0.08] blur-[170px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-30%] left-[30%] h-[700px] w-[700px] rounded-full bg-red-900/[0.15] blur-[180px]" />

        {/* Center atmosphere */}
        <div className="absolute left-1/2 top-[40%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/[0.035] blur-[140px]" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse at center, black 15%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 15%, transparent 82%)",
          }}
        />

        {/* Ambient particles */}
        <span className="absolute left-[8%] top-[27%] h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,1)]" />

        <span className="absolute left-[19%] top-[62%] h-1 w-1 rounded-full bg-red-300 shadow-[0_0_14px_rgba(248,113,113,1)]" />

        <span className="absolute right-[14%] top-[22%] h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,1)]" />

        <span className="absolute right-[24%] top-[68%] h-1 w-1 rounded-full bg-red-300 shadow-[0_0_14px_rgba(248,113,113,1)]" />

        <span className="absolute left-[48%] top-[15%] h-1 w-1 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />

        <span className="absolute right-[36%] top-[78%] h-1.5 w-1.5 rounded-full bg-red-300 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <header className="relative z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className="
            mx-auto
            flex
            h-[68px]
            max-w-[1400px]
            items-center
            justify-between
            rounded-[22px]
            border
            border-red-500/20
            bg-[#080808]/85
            px-5
            shadow-[0_0_60px_rgba(0,0,0,0.5)]
            backdrop-blur-2xl
            sm:px-7
          "
        >
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-red-400/30
                bg-red-500/[0.07]
                shadow-[0_0_25px_rgba(239,68,68,0.12)]
                transition-all
                duration-300
                group-hover:border-red-400/60
                group-hover:bg-red-500/[0.13]
                group-hover:shadow-[0_0_35px_rgba(239,68,68,0.28)]
              "
            >
              <Sparkles
                className="
                  relative
                  z-10
                  h-5
                  w-5
                  text-red-400
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />

              <div className="absolute inset-0 rounded-xl bg-red-500/10 blur-xl" />
            </div>

            <div className="text-xl font-bold tracking-tight sm:text-[22px]">
              JobBuddy{" "}
              <span className="text-red-500">AI</span>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden items-center gap-9 md:flex">
            <Link
              href="#features"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              How it works
            </Link>

            <Link
              href="/about"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              About
            </Link>

            <Link
              href="/pricing"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              Pricing
            </Link>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="
                rounded-xl
                border
                border-red-500/25
                bg-black/30
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-200
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-red-400/50
                hover:bg-red-500/[0.07]
                hover:text-white
                hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]
              "
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                via-red-500
                to-rose-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_0_30px_rgba(239,68,68,0.30)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_45px_rgba(239,68,68,0.48)]
              "
            >
              Get Started

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </header>

      {/* =========================================================
          HERO VIEWPORT
      ========================================================== */}

      <section
        className="
          relative
          z-10
          h-[calc(100svh-84px)]
          min-h-[760px]
          overflow-hidden
        "
      >
        {/* =======================================================
            HERO BACKGROUND DETAILS
        ======================================================== */}

        {/* Horizontal technical lines */}

        <div className="pointer-events-none absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        <div className="pointer-events-none absolute left-0 top-[20%] h-px w-[36%] bg-gradient-to-r from-transparent via-red-500/65 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.55)]" />

        <div className="pointer-events-none absolute right-0 top-[24%] h-px w-[32%] bg-gradient-to-l from-transparent via-red-500/65 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.55)]" />

        {/* =======================================================
            HERO CONTENT FRAME
        ======================================================== */}

        <div
          className="
            relative
            mx-auto
            h-full
            w-full
            max-w-[1600px]
          "
        >
          {/* =====================================================
              LEFT STATUE VISUAL
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-30px]
              left-[-105px]
              z-10
              hidden
              h-[760px]
              w-[760px]
              lg:block
              xl:left-[-75px]
              xl:h-[820px]
              xl:w-[820px]
              2xl:left-[-35px]
              2xl:h-[870px]
              2xl:w-[870px]
            "
          >
            {/* Large halo */}

            <div
              className="
                absolute
                left-[17%]
                top-[7%]
                h-[510px]
                w-[510px]
                rounded-full
                border
                border-red-500/20
                shadow-[0_0_100px_rgba(239,68,68,0.10)]
              "
            />

            <div
              className="
                absolute
                left-[23%]
                top-[13%]
                h-[450px]
                w-[450px]
                rounded-full
                border
                border-red-500/10
              "
            />

            {/* Vertical technical beam */}

            <div
              className="
                absolute
                left-[43%]
                top-0
                h-full
                w-px
                bg-gradient-to-b
                from-transparent
                via-red-500/25
                to-transparent
              "
            />

            {/* Image atmosphere */}

            <div
              className="
                absolute
                bottom-[7%]
                left-[8%]
                h-[330px]
                w-[560px]
                rounded-full
                bg-red-600/[0.13]
                blur-[110px]
              "
            />

            {/* ACTUAL STATUE IMAGE */}

            <div
              className="
                absolute
                inset-0
                transition-transform
                duration-700
                ease-out
              "
            >
              <Image
                src="/images/hero-statue.png"
                alt="AI-powered career assistant"
                fill
                priority
                sizes="(min-width: 1536px) 870px, (min-width: 1280px) 820px, (min-width: 1024px) 760px, 0px"
                className="
                  object-contain
                  object-bottom
                  drop-shadow-[0_0_50px_rgba(239,68,68,0.18)]
                "
              />
            </div>

            {/* Soft right-side fade */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-[12%]
                h-[70%]
                w-[34%]
                bg-gradient-to-l
                from-[#030303]
                via-[#030303]/30
                to-transparent
              "
            />

            {/* Side typography */}

            <div
              className="
                absolute
                left-[7%]
                top-[30%]
                z-20
                hidden
                text-[10px]
                font-medium
                uppercase
                tracking-[0.45em]
                text-slate-500
                xl:block
              "
            >
              <div>BETTER</div>

              <div className="mt-2">JOBS</div>

              <div className="mt-2">BRIGHTER</div>

              <div className="mt-2 text-red-400">FUTURE</div>

              <div className="mt-4 h-px w-12 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
            </div>
          </div>

          {/* =====================================================
              CENTER HERO
          ====================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-0
              z-30
              flex
              h-full
              w-full
              -translate-x-1/2
              items-center
              justify-center
              px-5
              pb-[125px]
              pt-6
              sm:px-8
              lg:w-[58%]
              lg:px-0
              lg:pb-[130px]
              xl:w-[56%]
            "
          >
            <div
              className="
                flex
                w-full
                max-w-[850px]
                flex-col
                items-center
                text-center
              "
            >
              {/* Badge */}

              <div
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-red-500/30
                  bg-red-500/[0.055]
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-red-300
                  shadow-[0_0_25px_rgba(239,68,68,0.08)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-red-400/50
                  hover:bg-red-500/[0.10]
                  hover:shadow-[0_0_35px_rgba(239,68,68,0.16)]
                "
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                </span>

                AI-Powered Job Applications
              </div>

              {/* Main heading */}

              <h1
                className="
                  mt-6
                  text-[48px]
                  font-bold
                  leading-[0.94]
                  tracking-[-0.05em]
                  sm:text-[58px]
                  md:text-[68px]
                  lg:text-[74px]
                  xl:text-[82px]
                  2xl:text-[88px]
                "
              >
                <span
                  className="
                    block
                    whitespace-nowrap
                    text-white
                    drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]
                  "
                >
                  Land your next role
                </span>

                <span
                  className="
                    mt-3
                    block
                    bg-gradient-to-r
                    from-white
                    via-red-200
                    to-red-500
                    bg-clip-text
                    text-transparent
                    drop-shadow-[0_0_35px_rgba(239,68,68,0.20)]
                  "
                >
                  with AI
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-[650px]
                  text-sm
                  leading-7
                  text-slate-400
                  sm:text-base
                  sm:leading-8
                "
              >
                JobBuddy AI helps you discover relevant jobs, match your
                skills, personalize your applications, and track every
                opportunity from one place.
              </p>

              {/* CTA */}

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="
                    group
                    inline-flex
                    h-13
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-red-500
                    via-red-500
                    to-rose-500
                    px-7
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_0_35px_rgba(239,68,68,0.35)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_0_55px_rgba(239,68,68,0.52)]
                  "
                >
                  <Sparkles className="h-4 w-4" />

                  Start Applying Free

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="
                    group
                    inline-flex
                    h-13
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-500/30
                    bg-white/[0.025]
                    px-7
                    text-sm
                    font-semibold
                    text-slate-200
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-red-400/50
                    hover:bg-red-500/[0.06]
                    hover:text-white
                    hover:shadow-[0_0_30px_rgba(239,68,68,0.12)]
                  "
                >
                  <Play className="h-4 w-4 text-red-400 transition-transform duration-300 group-hover:scale-110" />

                  See How It Works
                </Link>
              </div>

              {/* Trust points */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-7
                  gap-y-3
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <TrustPoint label="AI Job Matching" />

                <TrustPoint label="Resume Intelligence" />

                <TrustPoint label="Application Tracking" />
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT FLOATING CARDS
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-70px]
              top-[5%]
              z-20
              hidden
              h-[650px]
              w-[470px]
              xl:block
              2xl:right-[-35px]
            "
          >
            {/* Orbital rings */}

            <div
              className="
                absolute
                right-[5%]
                top-[6%]
                h-[500px]
                w-[315px]
                rotate-[17deg]
                rounded-[50%]
                border
                border-red-500/25
                shadow-[0_0_50px_rgba(239,68,68,0.08)]
              "
            />

            <div
              className="
                absolute
                right-[9%]
                top-[10%]
                h-[470px]
                w-[285px]
                rotate-[17deg]
                rounded-[50%]
                border
                border-red-500/10
              "
            />

            {/* Orbital glow */}

            <div
              className="
                absolute
                right-[7%]
                top-[19%]
                h-[300px]
                w-[300px]
                rounded-full
                bg-red-500/[0.05]
                blur-[90px]
              "
            />

            {/* Orbital dots */}

            <div
              className="
                absolute
                right-[13%]
                top-[13%]
                h-3
                w-3
                rounded-full
                bg-red-400
                shadow-[0_0_25px_rgba(248,113,113,1)]
              "
            />

            <div
              className="
                absolute
                bottom-[30%]
                left-[5%]
                h-2
                w-2
                rounded-full
                bg-red-300
                shadow-[0_0_20px_rgba(248,113,113,1)]
              "
            />

            {/* Card 01 */}

            <FloatingCard
              number="01"
              icon={<Search className="h-6 w-6" />}
              title="Find Jobs"
              description={
                <>
                  Discover personalized
                  <br />
                  opportunities
                </>
              }
              className="right-[5%] top-[4%] rotate-[4deg]"
            />

            {/* Card 02 */}

            <FloatingCard
              number="02"
              icon={<FileText className="h-6 w-6" />}
              title="Apply with AI"
              description={
                <>
                  Generate tailored
                  <br />
                  applications
                </>
              }
              className="right-[-1%] top-[34%] rotate-[2deg]"
            />

            {/* Card 03 */}

            <FloatingCard
              number="03"
              icon={<BarChart3 className="h-6 w-6" />}
              title="Track Progress"
              description={
                <>
                  Monitor your journey
                  <br />
                  to success
                </>
              }
              className="right-[3%] top-[64%] rotate-[-2deg]"
            />

            {/* Bottom handwritten note */}

            <div
              className="
                absolute
                bottom-[-1%]
                right-[9%]
                rotate-[-7deg]
                text-right
                font-mono
                text-xs
                italic
                text-slate-400
              "
            >
              <div>Your next opportunity</div>

              <div>is closer than you think.</div>

              <div className="ml-auto mt-2 h-px w-28 rotate-[-4deg] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </div>
          </div>

          {/* =====================================================
              BOTTOM TRUST BAR
          ====================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              z-40
              w-full
              -translate-x-1/2
              px-5
              sm:px-8
              lg:bottom-6
            "
          >
            <div className="mx-auto max-w-[1100px]">
              <div
                className="
                  mb-4
                  text-center
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.4em]
                  text-slate-600
                "
              >
                Trusted by job seekers worldwide
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <TrustMetric
                  icon={<Target className="h-4 w-4" />}
                  title="AI Matching"
                />

                <TrustMetric
                  icon={<Zap className="h-4 w-4" />}
                  title="Smart Applications"
                />

                <TrustMetric
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Private Profile"
                />

                <TrustMetric
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  title="Career Tracking"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXISTING WEBSITE SECTIONS
      ========================================================== */}

      <div className="relative z-30 bg-[#030303]">
        <HowItWorks />
        <Features />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

/* =============================================================
   TRUST POINT
============================================================= */

function TrustPoint({ label }: { label: string }) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-2
        transition-colors
        duration-300
        hover:text-slate-300
      "
    >
      <CheckCircle2
        className="
          h-4
          w-4
          text-red-500
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />

      <span>{label}</span>
    </div>
  );
}

/* =============================================================
   FLOATING GLASS CARD
============================================================= */

function FloatingCard({
  number,
  icon,
  title,
  description,
  className,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        group
        absolute
        w-[270px]
        overflow-hidden
        rounded-2xl
        border
        border-red-400/25
        bg-gradient-to-br
        from-red-500/[0.12]
        via-[#111]/85
        to-black/90
        p-5
        shadow-[0_25px_70px_rgba(0,0,0,0.55),0_0_35px_rgba(239,68,68,0.12)]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-x-2
        hover:border-red-400/50
        hover:bg-gradient-to-br
        hover:from-red-500/[0.16]
        hover:via-[#151515]/90
        hover:to-black
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_50px_rgba(239,68,68,0.22)]
        ${className ?? ""}
      `}
    >
      {/* Top neon line */}

      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-red-400
          to-transparent
          shadow-[0_0_15px_rgba(239,68,68,0.8)]
        "
      />

      {/* Ambient glow */}

      <div
        className="
          absolute
          -right-12
          -top-12
          h-28
          w-28
          rounded-full
          bg-red-500/15
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-red-500/25
        "
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-red-400/30
            bg-red-500/[0.08]
            text-red-400
            shadow-[0_0_20px_rgba(239,68,68,0.12)]
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:border-red-400/55
            group-hover:bg-red-500/[0.14]
            group-hover:shadow-[0_0_28px_rgba(239,68,68,0.18)]
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-white">
              {title}
            </h3>

            <span className="text-xs font-medium text-red-400/70">
              {number}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   TRUST METRIC
============================================================= */

function TrustMetric({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div
      className="
        group
        flex
        h-[48px]
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        px-4
        text-xs
        text-slate-500
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-red-500/25
        hover:bg-red-500/[0.035]
        hover:text-slate-300
        hover:shadow-[0_10px_30px_rgba(239,68,68,0.08)]
      "
    >
      <span
        className="
          text-red-500
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {icon}
      </span>

      {title}
    </div>
  );
}