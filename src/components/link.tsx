import type { AnchorHTMLAttributes } from "react";
import { ArrowUpRightFromSquare } from "./icons";
import { twMerge } from "tailwind-merge";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  iconClassName?: string;
};
export default function Link({ children, iconClassName, ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={twMerge(
        props.className,
        "flex items-center flex-nowrap lg:gap-4 md:gap-3 gap-2",
        props.href &&
          " hover:[&[href]>:first-child]:underline hover:[&>:nth-child(2)>:first-child]:translate-x-[7%]" +
            " hover:[&>:nth-child(2)>:first-child]:-translate-y-[7%]" +
            " [&:hover>:nth-child(2)]:underline [&:hover>:first-child>.arrow-upright>:first-child]:translate-x-8" +
            " [&:hover>:first-child>.arrow-upright>:first-child]:-translate-y-8" +
            " pointer-coarse:[&>:first-child]:underline underline-offset-[15%] pointer-coarse:[&>:nth-child(2)]:hidden"
      )}
    >
      {children}
      {props.href && (
        <ArrowUpRightFromSquare
          className={twMerge(
            "inline fill-light-shade size-6 lg:size-10 sm:size-8",
            iconClassName
          )}
        />
      )}
    </a>
  );
}
