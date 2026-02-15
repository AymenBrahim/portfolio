import {
  SiAngular,
  SiAxios,
  SiClockify,
  SiDatefns,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiGit,
  SiHtml5,
  SiI18next,
  SiJavascript,
  SiJest,
  SiKnexdotjs,
  SiKoa,
  SiLodash,
  SiMapbox,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostcss,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiShadcnui,
  SiShopify,
  SiSpringboot,
  SiStoryblok,
  SiStorybook,
  SiStyledcomponents,
  SiTailwindcss,
  SiTrpc,
  SiTypeorm,
  SiTypescript,
  SiVuetify,
  SiWebcomponentsdotorg,
  SiWordpress,
  SiZod,
} from "@icons-pack/react-simple-icons";
import {
  AlembicIcon,
  GSAPIcon,
  IconJava,
  MotionIcon,
  ReactSpringIcon,
  ZustandIcon,
} from "../components/icons";
import type { ReactNode } from "react";
import { SiAmazons3 } from "react-icons/si";

export type Icon = { icon?: ReactNode; name: string; tooltip?: string };
export type SkillRow = { title: string; skills: Icon[] };

const languagesRow = {
  title: "Languages",
  skills: [
    {
      name: "Javascript",
      tooltip:
        "8 years of building dynamic, high-performance web apps. Strong understanding of the JS runtime, event loop, and asynchronous patterns, with deep knowledge of application and component lifecycle in both vanilla JS and modern frameworks.",
      icon: <SiJavascript />,
    },
    {
      name: "Typescript",
      tooltip:
        "My go-to language for building scalable frontend applications. I build bulletproof frontend systems in TypeScript.With four years of shipping production-grade apps, I treat the type system as a design tool, not just a linter. Generics, decorators,discriminated unions: I use them to make large codebases actually maintainable.",
      icon: <SiTypescript />,
    },
    {
      name: "Python",
      tooltip:
        "Familiar with the language and ecosystem, with hands-on experience through a personal project using" +
        " FastAPI, SQLAlchemy, and WebSockets. Comfortable writing clean, readable scripts and backend logic.",
      icon: <SiPython />,
    },
    {
      name: "Java",
      tooltip:
        "Learned through academic coursework and applied in a comprehensive project using the Spring Framework," +
        " gaining solid understanding of object-oriented principles, dependency injection, and building scalable backend applications.",
      icon: <IconJava />,
    },
  ],
} as const satisfies SkillRow;

const markupAndTemplatingLanguages = {
  title: "Markup & Templating Languages",
  skills: [
    {
      name: "Liquid",
      tooltip:
        " Proficient in using Liquid templating language to build and customize Shopify themes. Experienced with creating dynamic, reusable components and integrating Shopify Metaobjects for flexible content management.",
      icon: <SiShopify />,
    },
    {
      name: "PHP",
      tooltip:
        "Experienced in developing and customizing WordPress themes and plugins, including working with the Avada theme. Skilled in writing clean, maintainable PHP code for dynamic web applications.",
      icon: <SiPhp />,
    },
    {
      name: "HTML5",
      tooltip:
        "Extensive experience leveraging modern browser APIs such as DOM, Fetch, LocalStorage, Intersection Observer, and Web Workers. Strong understanding of HTML semantics, with the ability to create custom elements using the Web Components API. Skilled in building reusable UI elements for scalable and maintainable frontend architectures.",
      icon: <SiHtml5 />,
    },
  ],
} as const satisfies SkillRow;

const frontEndLibraries = {
  title: "Frontend Libraries and frameworks",
  skills: [
    {
      name: "React",
      tooltip:
        "With over 5 years of experience, I am proficient in writing clean, optimized React code. I have a deep understanding of React's core philosophy, component lifecycle, and re-rendering behavior. I have built reusable, maintainable components with proper side-effect management and a strong focus on performance optimization.",
      icon: <SiReact />,
    },
    {
      name: "AngularJS",
      tooltip:
        "Completed an internship working with AngularJS, gaining hands-on experience in building dynamic, single-page applications using the framework's MVC architecture, two-way data binding, and dependency injection. Familiar with creating reusable components and enhancing frontend interactivity.",
      icon: <SiAngular />,
    },
    {
      name: "VueJS",
      tooltip:
        "Experienced in building dynamic, single-page applications using Vue.js, with a focus on creating reusable components and enhancing user experience through interactive features. Skilled in using Vue's reactivity system, lifecycle hooks, and directives to build responsive and maintainable UIs.",
      icon: <SiVuetify />,
    },
  ],
} as const satisfies SkillRow;

const backendEndLibraries = {
  title: "Backend Libraries and frameworks",
  skills: [
    {
      name: "NextJS",
      tooltip:
        "With over 3 years of experience building production-ready Next.js web applications, I am skilled in leveraging Next.js features—including middlewares, caching, routing and rendering strategies—to deliver fast, SEO-friendly web apps",
      icon: <SiNextdotjs />,
    },
    {
      name: "KoaJS",
      tooltip:
        "Experienced in building lightweight, modular backend services with Koa.js. Skilled in designing custom middleware for request parsing, logging, error handling, and authentication. Proficient in implementing JWT-based authorization and role-based access control to secure API endpoints, following best practices for input validation and error handling to ensure robust, secure application architecture.",
      icon: <SiKoa />,
    },
    {
      name: "ExpressJS",
      tooltip:
        "Gained practical experience during an internship building RESTful APIs with Express.js. Developed middleware for request handling, authentication, and error management. Collaborated on routing design and implemented secure, maintainable backend endpoints, following best practices for scalability and performance.",
      icon: <SiExpress />,
    },
    {
      name: "FastAPI",
      tooltip:
        "Developed a personal project using FastAPI to build a high-performance, asynchronous REST API with WebSocket support. Leveraged FastAPI's automatic data validation and interactive API docs to streamline development. Integrated SQLAlchemy for database management emphasizing clean, modular code and scalability.",
      icon: <SiFastapi />,
    },
    {
      name: "Wordpress",
      tooltip:
        "I have hands-on experience in customizing WordPress themes by leveraging hooks and templates to deliver scalable and maintainable solutions. I worked extensively with the Avada theme and its Fusion Builder, creating reusable components that allowed for flexible layouts while maintaining consistency across the site. This approach not only streamlined content management for non-technical users but also optimized site performance, ensuring a smooth and user-friendly experience.",
      icon: <SiWordpress />,
    },
    {
      name: "Spring Boot",
      tooltip:
        "I have hands-on experience in customizing WordPress themes by leveraging hooks and templates to deliver scalable and maintainable solutions. I worked extensively with the Avada theme and its Fusion Builder, creating reusable components that allowed for flexible layouts while maintaining consistency across the site. This approach not only streamlined content management for non-technical users but also optimized site performance, ensuring a smooth and user-friendly experience.",
      icon: <SiSpringboot />,
    },
  ],
} as const satisfies SkillRow;

const databases = {
  title: "Databases",
  skills: [
    {
      name: "PostgreSQL",
      tooltip:
        "Weapon of choice for my professional years, Skilled in designing efficient schemas," +
        " writing complex queries, and optimizing performance for scalable applications. " +
        "Leveraged PostgreSQL's advanced features like JSON support, indexing, and transactions" +
        " to build reliable and maintainable data storage solutions.",
      icon: <SiPostgresql />,
    },
    {
      name: "MYSQL",
      icon: <SiMysql />,
    },
  ],
} as const satisfies SkillRow;

const tools = {
  title: "Tools",
  skills: [
    {
      name: "React Query",
      icon: <SiReactquery />,
    },
    {
      name: "TRPC",
      icon: <SiTrpc />,
    },
    {
      name: "Zustand",
      icon: <ZustandIcon />,
    },
    {
      name: "React Router",
      icon: <SiReactrouter />,
    },

    {
      name: "Prisma",
      icon: <SiPrisma />,
    },
    {
      name: "Zod",
      icon: <SiZod />,
    },
    {
      name: "Knex.js",
      icon: <SiKnexdotjs />,
    },
    {
      name: "TypeORM",
      icon: <SiTypeorm />,
    },
    {
      name: "Alembic",
      icon: <AlembicIcon />,
    },
    {
      name: "Amazon S3",
      icon: <SiAmazons3 />,
    },
    {
      name: "Lodash",
      icon: <SiLodash />,
    },
    {
      name: "Cron",
      icon: <SiClockify />,
    },
    {
      name: "date_fns",
      icon: <SiDatefns />,
    },
    {
      name: "Jest",
      icon: <SiJest />,
    },
    {
      name: "Docker",
      icon: <SiDocker />,
    },
    {
      name: "StoryBlok",
      icon: <SiStoryblok />,
    },
    {
      name: "Axios",
      icon: <SiAxios />,
    },
    {
      name: "i18n",
      icon: <SiI18next />,
    },
    {
      name: "Web Components",
      icon: <SiWebcomponentsdotorg />,
    },
    {
      name: "Mapbox",
      icon: <SiMapbox />,
    },
    {
      name: "Storybook",
      icon: <SiStorybook />,
    },
    {
      name: "Figma",
      icon: <SiFigma />,
    },
    {
      name: "Styled Components",
      icon: <SiStyledcomponents />,
    },
    {
      name: "PostCSS",
      icon: <SiPostcss />,
    },
    {
      name: "Tailwindcss",
      icon: <SiTailwindcss />,
    },
    {
      name: "Shadcn UI",
      icon: <SiShadcnui />,
    },
    {
      name: "Radix UI",
      icon: <SiRadixui />,
    },
    {
      name: "GSAP",
      icon: <GSAPIcon />,
    },
    {
      name: "Motion",
      icon: <MotionIcon />,
    },
    {
      name: "React Spring",
      icon: <ReactSpringIcon />,
    },
    {
      name: "Git",
      icon: <SiGit />,
    },
  ],
} as const satisfies SkillRow;

export const skillsData = [
  languagesRow,
  frontEndLibraries,
  markupAndTemplatingLanguages,
  backendEndLibraries,
  databases,
  tools,
] as const;
