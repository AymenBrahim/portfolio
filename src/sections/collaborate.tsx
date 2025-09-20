import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CollaborationParagraph from "../components/collaboration-paragraph";

export default function Collaborate(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      {...props}
      className={twMerge("bg-light-shade text-dark-shade", props.className)}
    >
      <h2>Let's Work Together</h2>
      <CollaborationParagraph />
    </section>
  );
}
