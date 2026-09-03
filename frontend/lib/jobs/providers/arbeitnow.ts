export type ArbeitnowJob = {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
};

type ArbeitnowResponse = {
  data: ArbeitnowJob[];
};

export type NormalizedJob = {
  externalId: string;
  title: string;
  company: string;
  platform: string;
  location: string | null;
  jobType: string | null;
  description: string | null;
  requirements: string | null;
  salary: string | null;
  url: string;
};

/**
 * Decode HTML entities.
 *
 * Some providers return descriptions that are encoded more than once,
 * for example:
 *
 * &lt;p&gt;Hello&lt;/p&gt;
 *
 * or even:
 *
 * &amp;lt;p&amp;gt;Hello&amp;lt;/p&amp;gt;
 */
function decodeHtmlEntities(value: string) {
  let text = value;

  for (let i = 0; i < 4; i++) {
    const decoded = text
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");

    if (decoded === text) {
      break;
    }

    text = decoded;
  }

  return text;
}

/**
 * Convert provider HTML into clean readable text.
 */
function stripHtml(html: string) {
  let text = decodeHtmlEntities(html);

  // Preserve useful line breaks before removing HTML tags.
  text = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n");

  // Remove remaining HTML tags.
  text = text.replace(/<[^>]*>/g, " ");

  // Decode again in case removing tags exposed encoded entities.
  text = decodeHtmlEntities(text);

  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

/**
 * Make sure only valid HTTP/HTTPS URLs are stored.
 */
function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.protocol !== "http:" &&
      parsed.protocol !== "https:"
    ) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Extract useful technical skills from the job description
 * and combine them with clean provider tags.
 */
function extractRequirements(
  tags: string[] | undefined,
  description: string,
) {
  const technicalSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "SQL",
    "REST API",
    "GraphQL",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "AI",
  ];

  const normalizedDescription = description.toLowerCase();

  const foundSkills = technicalSkills.filter((skill) =>
    normalizedDescription.includes(skill.toLowerCase()),
  );

  const cleanTags = (tags || [])
    .map((tag) => decodeHtmlEntities(tag).trim())
    .filter((tag) => {
      if (!tag) return false;

      // Ignore extremely long pieces of text accidentally returned as tags.
      if (tag.length > 40) return false;

      // Ignore HTML.
      if (/<[^>]*>/.test(tag)) return false;

      return true;
    });

  const requirements = Array.from(
    new Set([...foundSkills, ...cleanTags]),
  );

  return requirements.length > 0
    ? requirements.join(", ")
    : null;
}

/**
 * Fetch and normalize jobs from Arbeitnow.
 */
export async function fetchArbeitnowJobs(): Promise<NormalizedJob[]> {
  const response = await fetch(
    "https://www.arbeitnow.com/api/job-board-api",
    {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 900,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Arbeitnow API request failed: ${response.status}`,
    );
  }

  const data = (await response.json()) as ArbeitnowResponse;

  if (!Array.isArray(data.data)) {
    throw new Error(
      "Invalid response received from Arbeitnow API",
    );
  }

  const normalizedJobs: Array<NormalizedJob | null> =
    data.data.map((job): NormalizedJob | null => {
      const url = normalizeUrl(job.url);

      // Do not store jobs without a valid external job URL.
      if (!url) {
        return null;
      }

      const description = stripHtml(
        job.description || "",
      );

      const requirements = extractRequirements(
        job.tags,
        description,
      );

      return {
        externalId: job.slug,
        title: job.title,
        company: job.company_name,
        platform: "Arbeitnow",
        location: job.location || null,

        jobType:
          job.job_types &&
          job.job_types.length > 0
            ? job.job_types.join(", ")
            : null,

        description: description || null,

        requirements: requirements || null,

        salary: null,

        url,
      };
    });

  return normalizedJobs.filter(
    (job): job is NormalizedJob => job !== null,
  );
}