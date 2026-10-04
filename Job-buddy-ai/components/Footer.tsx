import Link from "next/link";
import {
  Code2,
  BriefcaseBusiness,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const productLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "Get Started",
    href: "/signup",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-red-500/10 bg-[#020202] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-950/20 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,50,50,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,50,50,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Main footer content */}
        <div className="grid gap-14 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/[0.06] shadow-[0_0_35px_rgba(255,40,40,0.08)] transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/10 group-hover:shadow-[0_0_45px_rgba(255,40,40,0.18)]">
                <Sparkles className="h-6 w-6 text-red-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>

              <span className="text-2xl font-semibold tracking-tight">
                JobBuddy{" "}
                <span className="text-red-500 transition-colors duration-300 group-hover:text-red-400">
                  AI
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500">
              Your AI-powered job search companion. Discover relevant jobs,
              match your skills, apply smarter, and track every opportunity
              from one intelligent workspace.
            </p>

            {/* Product badge */}
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/[0.04]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                AI-Powered Career Workspace
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Product
            </p>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Explore JobBuddy
            </h3>

            <ul className="mt-7 space-y-4">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}

                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-red-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Company
            </p>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Information
            </h3>

            <ul className="mt-7 space-y-4">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}

                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-red-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mt-16">
          <div className="h-px bg-gradient-to-r from-red-500/40 via-white/[0.08] to-transparent" />

          <div className="absolute left-0 top-0 h-px w-20 bg-red-500 shadow-[0_0_12px_rgba(255,40,40,0.8)]" />
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <div>
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} JobBuddy AI. All rights reserved.
            </p>

            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-slate-700">
              Built for smarter job searching
            </p>
          </div>

          {/* Social / external links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/[0.06] hover:text-red-400 hover:shadow-[0_8px_30px_rgba(255,40,40,0.12)]"
            >
              <Code2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/[0.06] hover:text-red-400 hover:shadow-[0_8px_30px_rgba(255,40,40,0.12)]"
            >
              <BriefcaseBusiness className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/[0.06] hover:text-red-400 hover:shadow-[0_8px_30px_rgba(255,40,40,0.12)]"
            >
              <Globe className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-red-500/30" />

          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-700">
            Discover · Match · Apply · Track
          </span>

          <div className="h-px w-10 bg-red-500/30" />
        </div>
      </div>
    </footer>
  );
}