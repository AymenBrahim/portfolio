import type { ReactNode } from "react";

export type Experience = {
  id: string;
  companyName?: string;
  companyHref?: string;
  companyLogo?: ReactNode;
  location?: string;
  description?: ReactNode;
  role?: string;
  startDate: Date;
  endDate: Date;
};

export const experiences = [
  {
    id: "cpt",
    companyName: "Callpay Tunisia",
    location: "Argentine Street, Tunis",
    startDate: new Date(2020, 6),
    endDate: new Date(2020, 8),
    description: (
      <>
        I contributed to the design and development of an adaptive multiplatform
        web application using jQuery and Bootstrap for responsiveness.
        Additionally, I designed and implemented a mobile prototype application
        offering payment and money transfer services, leveraging Angular, Ionic,
        and Spring Boot with Spring Security and MySQL for secure and efficient
        transactions. My work focused on scalability, security, and
        cross-platform usability to enhance the digital payment experience.
      </>
    ),
    role: "Software Engineer Intern",
  },
  {
    id: "SQOIN",
    companyName: "SQOIN",
    companyHref: "https://sqoin.us/",
    companyLogo: <img src="/icons/sqoin.png" />,
    location: "Ghazela City , Ariana",
    startDate: new Date(2021, 0),
    endDate: new Date(2021, 3),
    description: (
      <>
        I contributed to the development of Simarl, a web application built with
        Angular, Node.js, Express, and TypeORM. My work involved building and
        optimizing frontend components, implementing backend services. I focused
        on scalability, performance, and maintainability, delivering a robust
        and efficient solution.
      </>
    ),
    role: "Software Engineer Intern",
  },
  {
    id: "oga",
    companyName: "One Gate Africa",
    companyHref: "https://onegateafrica.com/?lang=en",
    companyLogo: <img src="/icons/oga.png" />,
    location: "Montplaisir, Tunis",
    description: (
      <>
        Developed a real-time mobile application connecting clients with car
        towing services. I developed tracking and communication systems,
        enabling seamless coordination between users and service providers. I
        also built a rating and reporting system to enhance user experience and
        service quality. My work focused on real-time features, performance
        optimization, and reliable service architecture to ensure smooth and
        efficient operations.
      </>
    ),
    role: "Software Engineer Intern",
    startDate: new Date(2021, 4),
    endDate: new Date(2022, 2),
  },
  {
    id: "freelance",
    companyName: "Freelance",
    description: (
      <>
        Worked on various small-scale projects, delivering custom web
        applications, integrations, and performance optimizations. Collaborated
        with clients to build tailored solutions, including e-commerce features,
        dashboards, and API integrations.
      </>
    ),
    startDate: new Date(2020, 6),
    endDate: new Date(),
  },
  {
    id: "konekto",
    companyName: "Konekto",
    companyHref: "https://konek.to/en",
    location: "Corinthstr. 63, Berlin",
    companyLogo: <img src="/icons/konekto.png" className="bg-white p-1" />,
    description: (
      <>
        During my time at Konekto, I worked across multiple projects in diverse
        domains, gaining hands-on experience in building scalable,
        production-ready applications. I contributed to projects ranging from
        healthcare platforms to e-commerce integrations, where I developed
        reusable UI components, optimized performance through caching and
        dynamic rendering strategies, and engineered flexible solutions powered
        by headless CMSs. On the backend, I implemented secure APIs, feature
        flag systems, and integrations with third-party services such as Amazon
        S3. Through these experiences, I strengthened my programming skills and
        deepened my understanding of software architecture, clean code
        practices, and automated testing. I also became more proficient in Agile
        methodologies (Scrum and Kanban), collaborating within cross-functional
        teams, and delivering features iteratively with a focus on
        maintainability, performance, and user experience.
      </>
    ),
    role: "Software Engineer",
    startDate: new Date(2022, 7),
    endDate: new Date(),
  },
] as const satisfies Experience[];
