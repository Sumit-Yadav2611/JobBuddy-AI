import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            JobBuddy<span className="text-primary"> AI</span>
          </a>

          <p className="mt-3 text-sm text-muted-foreground">
            Welcome back. Sign in to continue your job search.
          </p>
        </div>

        <div className="flex justify-center">
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/signup"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </main>
  );
}