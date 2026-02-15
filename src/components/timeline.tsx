import { type HTMLAttributes, type ReactNode } from "react";
import "./timeline.css";
import { twMerge } from "tailwind-merge";

const Timeline = { Item, Container };
export default Timeline;

type TimelineItemProps = {
  firstColumn: ReactNode;
  secondColumn: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export function Item({ firstColumn, secondColumn }: TimelineItemProps) {
  return (
    <>
      {firstColumn}
      <div></div>
      {secondColumn}
    </>
  );
}

function Container(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge("timeline", props.className)}></div>
  );
}
