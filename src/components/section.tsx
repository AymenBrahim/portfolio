import type { HTMLAttributes } from "react";
import "./section.css";
type SectionProps = {
  headline?: string;
  deck?: string;
} & HTMLAttributes<HTMLElement>;

export default function Section(props: SectionProps) {
  const { headline, deck, children, className, ...rest } = props;
  return (
    <section {...rest}>
      <header>
        {headline && <h2>{headline}</h2>}
        {deck && <h5>{deck}</h5>}
      </header>
      <div className={className}>{children}</div>
    </section>
  );
}
