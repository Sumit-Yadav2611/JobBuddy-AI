const skillAliases: Record<string, string[]> = {
  javascript: ["javascript", "js", "ecmascript"],

  typescript: ["typescript", "ts"],

  react: ["react", "reactjs", "react.js"],

  node: ["node", "nodejs", "node.js"],

  mongodb: ["mongodb", "mongo"],

  python: ["python", "py"],

  cplusplus: ["c++", "cpp", "cplusplus"],
};

const skillWeights: Record<string, number> = {
  react: 3,
  typescript: 3,
  javascript: 3,
  node: 3,
  mongodb: 2,
  python: 3,
  cplusplus: 2,
  sql: 2,
  git: 1,
  html: 1,
  css: 1,
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

  let totalWeight = 0;
  let matchedWeight = 0;

  for (const requirement of jobRequirements) {
    const canonical = getCanonicalSkill(requirement);

    const weight = skillWeights[canonical] || 1;

    totalWeight += weight;

    if (matchedSkills.includes(requirement)) {
      matchedWeight += weight;
    }
  }

  const score = Math.round((matchedWeight / totalWeight) * 100);

  let matchLevel = "Needs Improvement";

  if (score >= 90) {
    matchLevel = "Excellent Match";
  } else if (score >= 70) {
    matchLevel = "Good Match";
  } else if (score >= 50) {
    matchLevel = "Average Match";
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (matchedSkills.length > 0) {
    strengths.push(`You match ${matchedSkills.length} required skills`);
  }

  for (const skill of matchedSkills) {
    const canonical = getCanonicalSkill(skill);

    if (["react", "typescript", "javascript"].includes(canonical)) {
      strengths.push(`Strong ${skill} knowledge`);
    }

    if (["node", "mongodb"].includes(canonical)) {
      strengths.push(`${skill} experience matches the role`);
    }
  }

  for (const skill of missingSkills) {
    improvements.push(`Learn ${skill} to improve your chances`);
  }
  return {
    score,
    matchLevel,
    matchedSkills,
    missingSkills,

    explanation:{
    strengths,
    improvements
  }
  };
}
