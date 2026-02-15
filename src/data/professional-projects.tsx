import type { ReactNode } from "react";

export type Project = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  role: string;
  projectHref?: string;
  projectLogo?: ReactNode;
  employerName?: string;
  employerLogo?: ReactNode;
  employerHref?: string;
  technologies: string;
  projectDescription: ReactNode;
  projectScreen: ReactNode;
  tasks?: ReactNode;
};

export type Waypoint = {
  dashoffset: number;
  waypointX: number;
  waypointY: number;
  svgText?: string;
  svgTextTranslateX?: number;
  svgTextTranslateY?: number;
};

const withKonekto = {
  employerName: "konekto",
  employerHref: "https://konek.to/en",
  employerLogo: <img draggable={false} src="/icons/konekto.svg" />,
} as const;

export const professionalProjectsData = [
  {
    id: "printmate",
    title: "Printmate",
    startDate: new Date(2022, 7),
    endDate: new Date(2022, 9),
    role: "Software Engineer",
    ...withKonekto,
    projectHref: "https://www.printmate.de/en",
    projectLogo: <img draggable={false} src="/icons/printmate.png" />,
    projectScreen: <img draggable={false} src="/screenshots/printmate.png" />,
    technologies:
      "React, Storybook, i18n, Cron, Styled Components, Docker, Jest",
    projectDescription:
      "Contributed to the implementation of several key UI" +
      " features, focusing on creating smooth and intuitive user experiences. I was actively" +
      " involved in debugging and resolving front-end issues, which helped improve application" +
      " stability and performance. Collaborating closely with the team, I also worked on refining" +
      " existing components to enhance both usability and overall product quality.",
  },
  {
    id: "atlas-ti",
    title: "Atlas.ti",
    startDate: new Date(2022, 9),
    endDate: new Date(2022, 11),
    role: "Software Engineer",
    projectDescription:
      "I developed an account-specific feature flag system to manage feature releases," +
      " enabling seamless deployment and testing of new functionalities. I also built a" +
      " storage service leveraging Amazon S3 for scalable and secure data storage and retrieval," +
      " and implemented a referral system that tracked registrations through middleware and awarded" +
      " reward points to referrers upon purchases. In addition, I developed and executed unit tests" +
      " for all these features, ensuring robust functionality and minimizing production bugs through" +
      " comprehensive test coverage.",
    projectHref: "https://atlasti.com/",
    projectLogo: (
      <img
        draggable={false}
        src="/icons/atlasti.png"
        className="[html.dark_&]:bg-white rounded-xs"
      />
    ),
    projectScreen: <img draggable={false} src="/screenshots/atlas.ti.png" />,

    ...withKonekto,
    technologies:
      "React, Koa, Knex, Storyblok, Storybook, i18n, Cron, styled-components, jest",
  },
  {
    id: "klenico",
    title: "Klenico",
    startDate: new Date(2023, 0),
    endDate: new Date(2024, 1),
    role: "Software Engineer",
    projectHref: "https://www.klenico.com/en",
    projectLogo: <img draggable={false} src="/icons/Klenico.png" />,
    projectScreen: <img draggable={false} src="/screenshots/klenico.png" />,
    ...withKonekto,

    technologies:
      "React, Next, Docker, Prisma, TRPC, zod, React Query, Storyblok, Recharts, styled-components, i18n, Cron",
    projectDescription:
      "I helped engineer a Storyblok(Headless CMS)-configurable UI that enabled customizable user flows across different" +
      " environments. To enhance performance, I optimized response times by implementing caching" +
      " mechanisms and dynamic rendering strategies based on content, achieving up to a 50% reduction in" +
      " reload times in certain cases. I also developed a suite of admin tools to manage clinic operations," +
      " along with visualization tools to monitor key metrics and events. Additionally, I created and maintained" +
      " unit tests to ensure code reliability and long-term maintainability, consistently adhering to best testing practices.",
  },
  {
    id: "nays",
    title: "Nays",
    startDate: new Date(2024, 2),
    endDate: new Date(2024, 7),
    role: "Software Engineer",
    projectHref: "https://www.klenico.com/en",
    projectLogo: <img draggable={false} src="/icons/nays.png" />,
    projectScreen: <img draggable={false} src="/screenshots/nays.png" />,
    ...withKonekto,

    technologies: "Shopify, liquid, JS, Mapbox, CSS",
    projectDescription:
      "I developed configurable plug-and-play components with Web Components, ensuring reusability," +
      " flexibility, and maintainability across the platform. To enhance the shopping experience," +
      " I built an interactive store locator page with advanced filtering options and map interactivity," +
      " leveraging Web Workers to deliver a smooth user experience. Additionally, I integrated Shopify's" +
      " Metaobjects to support dynamic store additions and enable referral tracking, further extending" +
      " the platform's functionality.",
  },
  {
    id: "ecosia",
    title: "Ecosia",
    startDate: new Date(2025, 0),
    endDate: new Date(2025, 1),
    role: "Software Engineer",
    projectHref: "https://ecosia.helpscoutdocs.com/",
    projectLogo: <img draggable={false} src="/icons/ecosia.png" />,
    projectScreen: <img draggable={false} src="/screenshots/ecosia.png" />,

    ...withKonekto,

    technologies: "CSS, JS",
    projectDescription:
      "Redesigned the website with a focus on modernizing its UI/UX and enhancing overall usability." +
      " Delivered a clean, responsive layout, streamlined navigation, and improved accessibility standards" +
      " to provide users with a seamless and engaging experience across all devices.",
  },
  {
    id: "swaf",
    title: "SWAF",
    projectDescription:
      "I helped to maintaining the project by identifying and resolving bugs, optimizing performance," +
      " and improving code quality. In addition, I developed some features that enhanced functionality and user experience.",
    projectHref: "https://www.start-with-a-friend.de/",
    projectLogo: <img draggable={false} src="/icons/swaf.svg" />,

    projectScreen: <img draggable={false} src="/screenshots/swaf.svg" />,
    ...withKonekto,

    role: "Software Engineer",
    startDate: new Date(2024, 12),
    endDate: new Date(2025, 7),
    technologies: "Wordpress, PHP, ACF, CSS, JS",
  },
  {
    id: "ambivation",
    title: "Ambivation",
    startDate: new Date(2025, 1),
    endDate: new Date(2025, 7),
    role: "Software Engineer",
    projectHref: "https://ambivation.com/",
    projectLogo: <img draggable={false} src="/icons/ambivation.png" />,
    projectScreen: undefined,

    ...withKonekto,

    technologies: "Wordpress, PHP, Avada, CSS, JS",
    projectDescription:
      "Developed the website focusing on enhancing the user experience and ensuring the" +
      " reusability of components across the site. My contributions included designing flexible," +
      " modular components, streamlining workflows for easier content management, and optimizing" +
      " layouts to deliver a seamless and engaging experience for users.",
  },
] as const satisfies Project[];

export const waypointsData = [
  {
    dashoffset: -153,
    waypointX: 0.286,
    waypointY: 35.942,
    svgTextTranslateX: -15.5,
  },
  {
    dashoffset: -137.4,
    waypointX: 0,
    waypointY: 29.3,
    svgTextTranslateX: 1.5,
    svgTextTranslateY: 0,
  },
  {
    dashoffset: -118,
    waypointX: 0,
    waypointY: 21,
    svgTextTranslateX: -10,
    svgTextTranslateY: -0.5,
  },
  {
    dashoffset: -94.5,
    waypointX: 0,
    waypointY: 11.3,
    svgTextTranslateX: 1,
    svgTextTranslateY: -0.5,
  },
  {
    dashoffset: -74,
    waypointX: 0,
    waypointY: 0,
    svgTextTranslateX: -20,
    svgTextTranslateY: 0,
  },
  {
    dashoffset: -45.5,
    waypointX: 0,
    waypointY: 0,
    svgTextTranslateX: 4,
    svgTextTranslateY: -12.45,
  },
  {
    dashoffset: -24.115,
    waypointX: -19,
    waypointY: -22.5,
    svgTextTranslateX: 4,
    svgTextTranslateY: 0.8,
  },
  {
    dashoffset: 0,
    waypointX: 0,
    waypointY: -30,
    svgText: "You ?",
    svgTextTranslateX: 4,
    svgTextTranslateY: 0.8,
  },
] as const satisfies Waypoint[];
