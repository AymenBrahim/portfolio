import type { HTMLAttributes } from "react";
import Button from "./button";
import { twMerge } from "tailwind-merge";

export default function CTA(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex justify-center flex-wrap-reverse gap-y-3.5 gap-x-7 my-7 md:gap-x-8 md:my-8 md:gap-y-4 lg:gap-x-9 lg:mt-9 lg:gap-y-4",
        props.className
      )}
    >
      <Button href="mailto:brahimaymenbrahim@gmail.com" variant="primary">
        Contact me
      </Button>
      <Button href="/CV.pdf" download variant="secondary">
        Download My Resume
      </Button>
    </div>
  );
}
