type Link = {
  title: "Repository" | "Live version";
  href: string;
};

export type PersonalProject = {
  name: string;
  thumbnail: string;
  description: string;
  technologies: string;
  links: Link[];
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
    links: [
      { title: "Repository", href: "https://github.com/AymenBrahim/LeetCode" },
    ],
    id: "leet-code",
  },
  {
    name: "EventStream",
    thumbnail: "/icons/eventstream2.png",
    description:
      "EventStream is a real-time events platform featuring WebSocket communication, Repositorysitory-based architecture," +
      " and reusable frontend components. It's containerized with Docker for easy deployment and designed with" +
      " scalability and maintainability in mind.",
    technologies:
      "React, Zustand, date-fns, axios, Tailwind, React Query, React Router, Shadcn UI, Radix UI, FAST API, SQL Alchemy, Alembic",
    links: [
      {
        title: "Repository",
        href: "https://github.com/AymenBrahim/EventStream",
      },
    ],
    id: "event-stream",
  },
  {
    name: "Portfolio",
    thumbnail: "/screenshots/portfolio.png",
    description:
      "A modern, responsive web application built with React to showcase my work and skills in a clean," +
      " user-focused way. It highlights reusability with well-structured components and follows best practices" +
      " in performance and accessibility, ensuring a seamless experience across all devices.",
    technologies: "React, Tailwind, React Spring",
    links: [
      { title: "Repository", href: "https://github.com/AymenBrahim/portfolio" },
    ],
    id: "portfolio",
  },
  {
    id: "drawer",
    name: "Drawer",
    thumbnail: "https://aymenbrahim.github.io/vue-form/preview.png",
    description:
      "A Vue 3 form interface displayed inside a sliding drawer, built to explore the limits of native HTML and CSS capabilities while minimizing JavaScript usage. The project leverages intrinsic HTML validation, CSS transitions for smooth animations, and a production-level component architecture with reusable components and CSS variable-based theming. Features include a responsive sliding drawer, native form validation, and motion design using pure CSS transforms, demonstrating that elegant UI behavior can be achieved without heavy JavaScript dependencies.",
    technologies: "Vue 3, TypeScript, CSS Variables, Vite, HTML5 Validation",
    links: [
      { title: "Repository", href: "https://github.com/AymenBrahim/vue-form" },
      {
        title: "Live version",
        href: "https://aymenbrahim.github.io/vue-form/",
      },
    ],
  },
] as const satisfies PersonalProject[];
