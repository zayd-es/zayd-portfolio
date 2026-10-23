/**
 * Skill groups. Tech names are shown as-is in every language; entries with a
 * `key` are translated from `skills.items.<key>` in messages/*.json.
 */
export type Skill = { name: string } | { key: string };

export const skillGroups = [
  {
    id: "frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Zustand" },
      { name: "shadcn/ui" },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Next.js API Routes" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
    ],
  },
  {
    id: "ai",
    skills: [
      { name: "Claude Code" },
      { key: "prompting" },
      { key: "debugging" },
      { key: "review" },
    ],
  },
  {
    id: "tools",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "VS Code" }, { name: "Vercel" }],
  },
] as const satisfies readonly { id: string; skills: readonly Skill[] }[];

export type SkillGroupId = (typeof skillGroups)[number]["id"];
