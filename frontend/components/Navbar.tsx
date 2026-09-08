"use client";

import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-[70px] items-center justify-between rounded-2xl border border-red-500/20 bg-[#050505]/85 px-5 shadow-[0_0_40px_rgba(255,30,30,0.04)] backdrop-blur-xl sm:px-7">
          {/* Subtle top glow */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobile}
            className="group relative z-10 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/[0.06] transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/[0.1] group-hover:shadow-[0_0_25px_rgba(255,40,40,0.18)]">
              <Sparkles className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              JobBuddy{" "}
              <span className="text-red-500">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            <Link
              href="/#features"
              className="group relative text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Features
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/#how-it-works"
              className="group relative text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              How it works
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* FIXED: About now goes to /about */}
            <Link
              href="/about"
              className="group relative text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              About
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* ADDED: Pricing */}
            <Link
              href="/pricing"
              className="group relative text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Pricing
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button
                variant="ghost"
                className="rounded-xl border border-red-500/20 bg-transparent px-5 text-slate-300 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/[0.05] hover:text-white"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="group rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 font-semibold text-white shadow-[0_0_25px_rgba(255,40,40,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,40,40,0.3)]">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.04] text-slate-300 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/[0.08] hover:text-white md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-red-500/20 bg-[#050505]/95 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col p-5">
              <Link
                href="/#features"
                onClick={closeMobile}
                className="group flex items-center justify-between border-b border-white/[0.06] py-4 text-sm text-slate-400 transition-colors hover:text-white"
              >
                Features
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/#how-it-works"
                onClick={closeMobile}
                className="group flex items-center justify-between border-b border-white/[0.06] py-4 text-sm text-slate-400 transition-colors hover:text-white"
              >
                How it works
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              {/* FIXED */}
              <Link
                href="/about"
                onClick={closeMobile}
                className="group flex items-center justify-between border-b border-white/[0.06] py-4 text-sm text-slate-400 transition-colors hover:text-white"
              >
                About
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              {/* ADDED */}
              <Link
                href="/pricing"
                onClick={closeMobile}
                className="group flex items-center justify-between border-b border-white/[0.06] py-4 text-sm text-slate-400 transition-colors hover:text-white"
              >
                Pricing
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-red-500/20 bg-transparent text-slate-300 hover:border-red-500/40 hover:bg-red-500/[0.05] hover:text-white"
                  >
                    Login
                  </Button>
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMobile}
                  className="flex-1"
                >
                  <Button className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}