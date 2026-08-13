"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          JobBuddy<span className="text-primary"> AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>

          <Link
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
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
        <div className="border-t bg-background px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
            >
              How it works
            </Link>

            <Link
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
            >
              About
            </Link>

            <div className="flex gap-3 border-t pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex-1"
              >
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
