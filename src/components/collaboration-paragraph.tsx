import type { HTMLAttributes } from "react";
import CTA from "./cta";
import { twMerge } from "tailwind-merge";

export default function CollaborationParagraph(
  props: HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div {...props} className={twMerge("mini-card", props.className)}>
      <p className="mb-5 md:mb-7 lg:mb-9">
        I am enthusiastic about exploring new opportunities, bringing experience
        across modern technologies and a strong background in building scalable,
        user-focused applications. I know how to transform ideas into impactful
        digital solutions while valuing clear communication, adaptability, and
        teamwork. I'm eager to contribute to meaningful projects that make a
        positive impact and to continue growing alongside them.
      </p>
      <CTA />
    </div>
  );
}
