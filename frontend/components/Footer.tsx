import Link from "next/link";
import {
  Code2,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              JobBuddy<span className="text-primary"> AI</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Your AI-powered job search companion. Discover relevant jobs,
              match your skills, apply smarter, and track every opportunity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#how-it-works"
                  className="transition-colors hover:text-foreground"
                >
                  How it works
                </Link>
              </li>

              <li>
                <Link
                  href="/signup"
                  className="transition-colors hover:text-foreground"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t pt-8 sm:flex-row">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobBuddy AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Code2 className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
             <BriefcaseBusiness className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-5 w-5" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}