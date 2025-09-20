import {
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
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
    <div className="item">
      <div className="md:min-w-[var(--width)]">{firstColumn}</div>

      <div>
        <div>
          <div></div>
        </div>
      </div>
      <div>{secondColumn}</div>
    </div>
  );
}

function Container(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    setWidth(ref.current, getWidestChild(ref.current.children) + "px");
    const controller = new AbortController();

    window.addEventListener(
      "resize",
      () => {
        setWidth(ref.current!, "auto");
        setWidth(ref.current!, getWidestChild(ref.current!.children) + "px");
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  });
  return (
    <div
      {...props}
      className={twMerge("timeline", props.className)}
      ref={ref}
    ></div>
  );
}

function getWidestChild(collection: HTMLCollection) {
  let maxWidth = 0;
  for (const item of collection) {
    const firstColumn = item.children![0]!;
    const { width } = firstColumn.getBoundingClientRect();

    if (width > maxWidth) {
      maxWidth = width;
    }
  }
  return maxWidth;
}

function setWidth(container: HTMLDivElement, width: string) {
  container.style.setProperty("--width", width);
}
