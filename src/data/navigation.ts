import { personalProjectsData } from "./personal-projects";
import { professionalProjectsData } from "./professional-projects";

export type NavigationItem = {
  label: string;
  targetId?: string;
  children?: NavigationItem[];
};

export const navigationData: NavigationItem[] = [
  {
    label: "Home",
    targetId: "home",
  },
  {
    label: "About me",
    targetId: "about-me",
  },
  {
    label: "Skills",
    targetId: "skills",
  },
  {
    label: "Projects",
    targetId: "projects",
    children: [
      {
        label: "Professional Projects",
        children: professionalProjectsData.map((project) => ({
            label: project.title,
            targetId: project.id,
          })),
      },
      {
        label: "Personal Projects",
        children: personalProjectsData.map((project) => ({
          label: project.name,
          targetId: project.id,
        })),
      },
    ],
  },
  {
    label: "Experience",
    targetId: "experience",
  },
  {
    label: "Contact",
    targetId: "contact",
  },
];
