import type { HTMLAttributes } from "react";
import { PersonalProject } from "../components/personal-project";
import { TabView } from "../components/tab-view";
import { personalProjectsData } from "../data";
import Section from "../components/section";

export default function PersonalProjects(props: HTMLAttributes<HTMLElement>) {
  const tabs = personalProjectsData.map((project) => ({
    id: project.id,
    label: project.name,
    content: <PersonalProject project={project} />,
  }));

  return (
    <Section
      {...props}
      headline="Personal Projects"
      deck="Selected works and experiments"
    >
      <TabView tabs={tabs} />
    </Section>
  );
}
