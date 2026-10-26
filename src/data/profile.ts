export const profile = {
  name: "Zayd Elabbous",
  firstName: "Zayd",
  lastName: "Elabbous",
  email: "elabbouszayd@gmail.com",
  timeZone: "Africa/Casablanca",
  resume: null as string | null,
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/zayd-es" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/zayd-el-abbous-9a505b289/",
    },
  ],
} as const;

export const sections = [
  "about",
  "skills",
  "projects",
  "services",
  "contact",
] as const;

export type SectionId = (typeof sections)[number];
