import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={twMerge(props.className, "text-foreground bg-clip-text")}
    >
      <span className="rainbow-text">Brahim Aymen Brahim</span>
    </h1>
  );
}
