import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Skills from "../components/skills";
import Section from "../components/section";

export default function SkillsSection(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Section
      {...props}
      className={twMerge("", props.className)}
      headline="My skills"
      deck="What I bring to the table"
    >
      <Skills />
    </Section>
  );
}
