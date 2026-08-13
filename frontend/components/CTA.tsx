import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="border-t px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border bg-foreground px-6 py-20 text-background sm:px-12">
          
          {/* Background glow */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-background/20 bg-background/10">
              <Sparkles className="h-5 w-5" />
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to find your
              <br />
              next role?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-background/70 sm:text-lg">
              Let JobBuddy AI handle the repetitive parts of your job search
              while you focus on preparing for the opportunities that matter.
            </p>

            {/* Button */}
            <div className="mt-9">
              <Link
                href="/signup"
                className="group inline-flex h-12 items-center justify-center rounded-md bg-background px-7 text-sm font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Start Applying Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Note */}
            <p className="mt-5 text-xs text-background/50">
              No credit card required · Start for free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}