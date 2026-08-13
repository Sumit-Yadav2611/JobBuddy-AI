import {
  UserRound,
  Search,
  Target,
  FileText,
  Rocket,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "AI Profile",
    description:
      "Build a complete professional profile from your resume, skills, education, experience, and projects.",
  },
  {
    icon: Search,
    title: "Smart Job Search",
    description:
      "Discover relevant opportunities from supported job platforms based on your career goals and profile.",
  },
  {
    icon: Target,
    title: "AI Job Matching",
    description:
      "Get an intelligent match score that shows how closely your skills and experience fit each job.",
  },
  {
    icon: FileText,
    title: "Resume Intelligence",
    description:
      "Extract important information from your resume and identify missing details that can strengthen your profile.",
  },
  {
    icon: Rocket,
    title: "Smart Apply",
    description:
      "Review matched opportunities and choose between applying manually or using supported application automation.",
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description:
      "Track every application from Applied and In Review to Interview, Rejected, and Follow-up.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Powerful features
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need
            <br />
            <span className="text-muted-foreground">
              to find your next role.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From understanding your resume to tracking every application,
            JobBuddy AI helps you manage the entire job search in one place.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted/40 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-0 bg-primary transition-all duration-300 group-hover:w-12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}