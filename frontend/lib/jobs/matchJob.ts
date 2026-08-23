const skillAliases: Record<string, string[]> = {
  javascript: ["javascript", "js", "ecmascript"],

  typescript: ["typescript", "ts"],

  react: ["react", "reactjs", "react.js"],

  node: ["node", "nodejs", "node.js"],

  mongodb: ["mongodb", "mongo"],

  python: ["python", "py"],

  cplusplus: ["c++", "cpp", "cplusplus"],
};

function normalizeSkill(skill: string) {
  return skill
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/#/g, "sharp")
    .replace(/\+\+/g, "plusplus")
    .replace(/[^a-z0-9]/g, "");
}

function getCanonicalSkill(skill: string) {
  const normalized = normalizeSkill(skill);

  for (const key in skillAliases) {
    const aliases = skillAliases[key];

    if (aliases.some((alias) => normalizeSkill(alias) === normalized)) {
      return key;
    }
  }

  return normalized;
}

function extractRequirements(requirements: string | null) {
  if (!requirements) return [];

  return requirements
    .split(/[,|\n;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function calculateJobMatch(
  userSkills: string[],

  requirements: string | null,
) {
  const jobRequirements = extractRequirements(requirements);

  if (jobRequirements.length === 0) {
    return {
      score: null,

      matchedSkills: [],

      missingSkills: [],
    };
  }

  const normalizedUserSkills = userSkills.map(getCanonicalSkill);

  const matchedSkills: string[] = [];

  const missingSkills: string[] = [];

  for (const requirement of jobRequirements) {
    const canonicalRequirement = getCanonicalSkill(requirement);

    const matched = normalizedUserSkills.includes(canonicalRequirement);

    if (matched) {
      matchedSkills.push(requirement);
    } else {
      missingSkills.push(requirement);
    }
  }

  const score = Math.round(
    (matchedSkills.length / jobRequirements.length) * 100,
  );

  return {
    score,

    matchedSkills,

    missingSkills,
  };
}
