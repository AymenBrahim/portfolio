import type { HTMLAttributes } from "react";
import CTA from "./cta";

export default function CollaborationParagraph(
  props: HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <p>
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
