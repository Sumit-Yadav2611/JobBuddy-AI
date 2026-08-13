import {
  UserRound,
  Search,
  Send,
  ChartNoAxesCombined,
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
      className="border-t px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            From profile to application
            <br />
            <span className="text-muted-foreground">
              in four simple steps.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            JobBuddy AI brings your resume, job discovery, matching,
            applications, and tracking together in one place.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted/40 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-8 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}