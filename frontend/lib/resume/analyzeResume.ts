import { GoogleGenAI } from "@google/genai";

export type ExtractedSkill = {
  name: string;
  category: string;
  proficiency: string;
};

export type ResumeAnalysis = {
  summary: string;

  skills: ExtractedSkill[];

  experience: {
    company: string;
    role: string;
    location: string;
    startDate: string | null;
    endDate: string | null;
    isCurrent: boolean;
    description: string;
  }[];

  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string | null;
    endDate: string | null;
    grade: string;
  }[];

  projects: {
    name: string;
    description: string;
    technologies: string;
    githubUrl: string | null;
    liveUrl: string | null;
  }[];
};

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Check .env.local and restart the Next.js server."
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
}

export async function analyzeResume(
  resumeText: string
): Promise<ResumeAnalysis> {
  const ai = getGeminiClient();

  const prompt = `
You are JobBuddy AI's resume analysis engine.

Analyze the resume below carefully.

Extract ONLY information that is actually present
in the resume.

Do NOT invent:
- companies
- job titles
- dates
- degrees
- skills
- projects
- URLs

If information is missing:
- use an empty string
- use null where appropriate
- use an empty array for missing lists

For skills:
- extract technical and professional skills
- include programming languages
- include frameworks
- include databases
- include cloud tools
- include development tools
- classify each skill into a useful category
- estimate proficiency only when supported
- otherwise use "Not specified"
- use standard skill names suitable for job matching

For experience:
- preserve the information from the resume
- use null for unknown dates

For education:
- preserve institution, degree and field of study

For projects:
- extract project names
- descriptions
- technologies
- GitHub URLs
- live URLs

Create a concise professional summary based only
on the resume.

RESUME:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          summary: {
            type: "string",
          },

          skills: {
            type: "array",
            items: {
              type: "object",

              properties: {
                name: {
                  type: "string",
                },

                category: {
                  type: "string",
                },

                proficiency: {
                  type: "string",
                },
              },

              required: [
                "name",
                "category",
                "proficiency",
              ],
            },
          },

          experience: {
            type: "array",
            items: {
              type: "object",

              properties: {
                company: {
                  type: "string",
                },

                role: {
                  type: "string",
                },

                location: {
                  type: "string",
                },

                startDate: {
                  type: "string",
                  nullable: true,
                },

                endDate: {
                  type: "string",
                  nullable: true,
                },

                isCurrent: {
                  type: "boolean",
                },

                description: {
                  type: "string",
                },
              },

              required: [
                "company",
                "role",
                "location",
                "startDate",
                "endDate",
                "isCurrent",
                "description",
              ],
            },
          },

          education: {
            type: "array",
            items: {
              type: "object",

              properties: {
                institution: {
                  type: "string",
                },

                degree: {
                  type: "string",
                },

                fieldOfStudy: {
                  type: "string",
                },

                startDate: {
                  type: "string",
                  nullable: true,
                },

                endDate: {
                  type: "string",
                  nullable: true,
                },

                grade: {
                  type: "string",
                },
              },

              required: [
                "institution",
                "degree",
                "fieldOfStudy",
                "startDate",
                "endDate",
                "grade",
              ],
            },
          },

          projects: {
            type: "array",
            items: {
              type: "object",

              properties: {
                name: {
                  type: "string",
                },

                description: {
                  type: "string",
                },

                technologies: {
                  type: "string",
                },

                githubUrl: {
                  type: "string",
                  nullable: true,
                },

                liveUrl: {
                  type: "string",
                  nullable: true,
                },
              },

              required: [
                "name",
                "description",
                "technologies",
                "githubUrl",
                "liveUrl",
              ],
            },
          },
        },

        required: [
          "summary",
          "skills",
          "experience",
          "education",
          "projects",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error(
      "Gemini returned an empty response."
    );
  }

  try {
    return JSON.parse(response.text) as ResumeAnalysis;
  } catch {
    console.error(
      "Invalid Gemini JSON:",
      response.text
    );

    throw new Error(
      "Gemini returned invalid JSON."
    );
  }
}

export function normalizeSkills(
  skills: ResumeAnalysis["skills"]
) {
  return skills.map((skill) => ({
    name: skill.name.trim(),
    category: skill.category || "Other",
    proficiency:
      skill.proficiency || "Not specified",
  }));
}