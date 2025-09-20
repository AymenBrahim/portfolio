export type PersonalProject = {
  name: string;
  thumbnail: string;
  description: string;
  technologies: string;
  link: string;
  id: string;
};

export const personalProjectsData = [
  {
    name: "LeetCode CLI",
    thumbnail: "/icons/leetcode.png",
    description:
      "developped CLI tools to generate and work on leetcode problems" +
      "locally. this helped me have autocomplete, linting and formatting" +
      "without having to resort to buy a subscription for these perks",
    technologies: "Typescript, Bun Runtime",
    link: "https://github.com/AymenBrahim/LeetCode",
    id: "leetCode",
  },
  {
    name: "EventStream",
    thumbnail: "/icons/eventstream2.png",
    description:
      "EventStream is a real-time events platform featuring WebSocket communication, repository-based architecture," +
      " and reusable frontend components. It's containerized with Docker for easy deployment and designed with" +
      " scalability and maintainability in mind.",
    technologies:
      "React, Zustand, date-fns, axios, Tailwind, React Query, React Router, Shadcn UI, Radix UI, FAST API, SQL Alchemy, Alembic",
    link: "https://github.com/AymenBrahim/EventStream",
    id: "eventStream",
  },
  {
    name: "Portfolio",
    thumbnail: "/screenshots/portfolio.png",
    description:
      "A modern, responsive web application built with React to showcase my work and skills in a clean," +
      " user-focused way. It highlights reusability with well-structured components and follows best practices" +
      " in performance and accessibility, ensuring a seamless experience across all devices.",
    technologies: "React, Tailwind, React Spring",
    link: "https://github.com/AymenBrahim/portfolio",
    id: "portfolio",
  },
] as const satisfies PersonalProject[];
