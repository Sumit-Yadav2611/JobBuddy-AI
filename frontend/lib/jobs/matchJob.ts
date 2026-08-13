function normalizeSkill(skill: string) {
  return skill
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/#/g, "sharp")
    .replace(/\+\+/g, "plusplus")
    .replace(/[^a-z0-9]/g, "");
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
  requirements: string | null
) {
  const jobRequirements = extractRequirements(requirements);

  if (jobRequirements.length === 0) {
    return {
      score: null,
      matchedSkills: [],
      missingSkills: [],
    };
  }

  const normalizedUserSkills = userSkills.map(normalizeSkill);

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const requirement of jobRequirements) {
    const normalizedRequirement =
      normalizeSkill(requirement);

    const matched = normalizedUserSkills.some(
      (userSkill) =>
        userSkill === normalizedRequirement ||
        userSkill.includes(normalizedRequirement) ||
        normalizedRequirement.includes(userSkill)
    );

    if (matched) {
      matchedSkills.push(requirement);
    } else {
      missingSkills.push(requirement);
    }
  }

  const score = Math.round(
    (matchedSkills.length / jobRequirements.length) * 100
  );

  return {
    score,
    matchedSkills,
    missingSkills,
  };
}