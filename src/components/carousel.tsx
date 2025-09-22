import {
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { twMerge } from "tailwind-merge";
import "./carousel.css";
import {
  useCarouselScrollProgress,
  type UseCarouselReturnType,
} from "../hooks/use-carousel";
import { animated, SpringValue } from "@react-spring/web";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type CarouselProps = HTMLAttributes<HTMLUListElement> & {
  pages: ReactNode[];
  carouselRef: RefObject<HTMLUListElement | null>;
  page: number;
  setPage: (
    getPage: number | ((currentPage: number) => number)
  ) => Promise<void>;
  pageCount: number;
  rerenderSection: () => void;
  children?: ReactNode;
};
export default function Carousel(props: CarouselProps) {
  const {
    children,
    pages,
    className,
    carouselRef,
    rerenderSection,
    page,
    pageCount,
    setPage,
    ...atts
  } = props;
  const initRef = useCallback((node: HTMLUListElement | null) => {
    carouselRef.current = node;
    rerenderSection();
  }, []);
  return (
    <div className={twMerge("carousel relative mx-3 md:mx-0", className)}>
      <ul {...atts} ref={initRef}>
        {pages.map((page, i) => (
          <li key={i} className="page">
            {page}
          </li>
        ))}
      </ul>
      <NavigationIndicators
        pageCount={pageCount}
        carouselRef={carouselRef}
        setPage={setPage}
      />

      <NextPrevPage
        direction="previous"
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        className="lg:-left-16 md:-left-12 -left-8 "
      />
      <NextPrevPage
        direction="next"
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        className="lg:-right-16 md:-right-12 -right-8 "
      />
      {children}
    </div>
  );
}

type NavigationIndicatorProps = {} & Pick<
  CarouselProps,
  "pageCount" | "setPage" | "carouselRef"
>;
export function NavigationIndicators({
  pageCount,
  carouselRef,
  setPage,
}: NavigationIndicatorProps) {
  const pageProgress = useCarouselScrollProgress(carouselRef);
  const page = new SpringValue(pageProgress);

  return (
    <div className={"indicators-container"}>
      {Array.from({ length: pageCount }).map((_, i) => (
        <Indicator
          currentPage={page}
          page={i}
          key={`indicator${i}`}
          onClick={() => setPage(i)}
        />
      ))}
    </div>
  );
}

type IndicatorProps = {
  currentPage: SpringValue<number>;
  page: number;
  onClick: () => void;
};
function Indicator(props: IndicatorProps) {
  const { currentPage, page, onClick } = props;
  return (
    <animated.div
      onClick={onClick}
      className={currentPage.to((currentPage) => {
        return currentPage === page ? "active" : "";
      })}
      style={{
        borderColor: currentPage.to({
          range: [page - 1, page, page + 1],
          output: ["#f8f9ff", "#0000", "#f8f9ff"],
          extrapolate: "clamp",
        }),
        borderWidth: currentPage.to({
          range: [page - 1, page, page + 1],
          output: ["0rem", "0.1875rem", "0rem"],
          extrapolate: "clamp",
        }),
        width: currentPage.to({
          range: [page - 1, page, page + 1],
          output: ["0.75rem", "3rem", "0.75rem"],
          extrapolate: "clamp",
        }),
        opacity: currentPage.to({
          range: [page - 1, page, page + 1],
          output: [0.4, 1, 0.4],
          extrapolate: "clamp",
        }),
      }}
    />
  );
}

type NextPrevPageProps = {
  direction: "next" | "previous";
  page: UseCarouselReturnType["0"];
  setPage: UseCarouselReturnType["1"];
  pageCount: UseCarouselReturnType["2"];
} & HTMLAttributes<HTMLElement>;

function NextPrevPage({
  direction,
  page,
  pageCount,
  setPage,
  ...attrs
}: NextPrevPageProps) {
  const className =
    "cursor-pointer absolute top-0 bottom-0 text-main-brand my-auto size-8 md:size-12 ";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  if (direction === "next") {
    const isDisabled = page + 1 >= pageCount;
    return (
      <div
        {...attrs}
        className={twMerge(
          "control next",
          className,
          isDisabled && disabledStyles,
          attrs.className
        )}
        onClick={() => setPage((page) => page + 1)}
      >
        <FaChevronRight className="size-full" />
      </div>
    );
  }
  const isDisabled = page - 1 < 0;

  return (
    <div
      {...attrs}
      className={twMerge(
        "control prev",
        className,
        isDisabled && disabledStyles,
        attrs.className
      )}
      onClick={() => setPage((page) => page - 1)}
    >
      <FaChevronLeft className="size-full" />
    </div>
  );
}
