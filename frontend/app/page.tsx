import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 sm:px-6 sm:pt-20">
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
            AI-Powered Job Applications
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Land your next role
            <br />
            with{" "}
            <span className="text-primary">
              AI
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            JobBuddy AI helps you discover relevant jobs, match your skills,
            personalize your applications, and track every opportunity from
            one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Start Applying Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-md border bg-background px-7 text-sm font-semibold transition-colors hover:bg-muted"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              AI Job Matching
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Resume Intelligence
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Application Tracking
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}