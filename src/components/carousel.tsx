import { type HTMLAttributes, type ReactNode, type RefObject } from "react";
import "./carousel.css";
import { twMerge } from "tailwind-merge";
import { animated } from "@react-spring/web";
import { FaChevronRight } from "react-icons/fa6";
import type { CarouselControls } from "../hooks/use-carousel";

type CarouselProps = {
  pages: ReactNode[];
  carouselRef: RefObject<HTMLUListElement | null>;
  carouselControls: CarouselControls;
} & HTMLAttributes<HTMLDivElement>;

export default function Carousel(props: CarouselProps) {
  const {
    className,
    children,
    carouselRef,
    carouselControls,
    pages,
    ...divProps
  } = props;
  return (
    <div {...divProps} className={twMerge("carousel", className)}>
      <ul ref={carouselRef}>
        {pages.map((page, i) => (
          <li key={i}>{page}</li>
        ))}
      </ul>
      <NavigationIndicators
        {...carouselControls}
        pageCount={pages.length}
        // indicatorWidth={indicatorWidth}
      />

      <ControlButton
        direction="previous"
        pageCount={pages.length}
        {...carouselControls}
      />
      <ControlButton
        direction="next"
        pageCount={pages.length}
        {...carouselControls}
      />
      {children}
    </div>
  );
}

type IndicatorProps = CarouselControls & {
  pageCount: number;
};

function NavigationIndicators(props: IndicatorProps) {
  return (
    <div className={"indicators-container"}>
      {Array.from({ length: props.pageCount }).map((_, i) => (
        <Indicator {...props} key={`indicator${i}`} index={i} />
      ))}
    </div>
  );
}

function Indicator(props: IndicatorProps & { index: number }) {
  const { pageProgress, setPage, index } = props;
  return (
    <animated.div
      onClick={() => setPage(index)}
      className={pageProgress.to((pageProgress) =>
        pageProgress === index ? "active" : "",
      )}
      style={{
        width: pageProgress.to({
          range: [index - 1, index, index + 1],
          output: ["0.75rem", "3rem", "0.75rem"],
          extrapolate: "clamp",
        }),
        opacity: pageProgress.to({
          range: [index - 1, index, index + 1],
          output: [0.4, 1, 0.4],
          extrapolate: "clamp",
        }),
      }}
    />
  );
}

type ControlButtonProps = {
  direction: "next" | "previous";
  pageCount: number;
} & CarouselControls;

function ControlButton({
  direction,
  page,
  pageCount,
  setPage,
}: ControlButtonProps) {
  const isDisabled =
    direction === "next" ? page + 1 >= pageCount : page - 1 < 0;
  return (
    <button
      className={twMerge("control", direction, isDisabled && "disabled")}
      onClick={() =>
        direction === "next" ? setPage(page + 1) : setPage(page - 1)
      }
    >
      <FaChevronRight />
    </button>
  );
}
