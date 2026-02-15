import type { HTMLAttributes } from "react";
import CollaborationParagraph from "../components/collaboration-paragraph";
import Section from "../components/section";

export default function Collaborate(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Section
      {...props}
      headline="Let's Work Together"
      deck="Available for full-time roles, freelance projects, or technical partnerships"
    >
      <CollaborationParagraph className="max-sm:max-w-full min-sm:max-w-3/4 min-sm:mx-auto mt-8" />
    </Section>
  );
}
