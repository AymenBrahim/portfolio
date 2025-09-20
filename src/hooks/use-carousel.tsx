import { useRef, useState } from "react";
import useHorizontalMouseDrag, {
  type UseDragOptions as UseDragOptions,
} from "./use-mouse-drag";
import { scrollAsync } from "../utils";
import { useSyncExternalStore } from "react";
import useScroll from "./use-scroll";

/**
 * Returns carousel control utilities.
 *
 * @returns {[number, (setPage: ((currentPage: number) => number) | number) => void, number]}
 *  - **page** (`number`):
 *    Current page
 *
 *  - **setPage** (`(setPage: ((currentPage: number) => number) | number) => void`):
 *    set Page
 *
 *  - **totalPages** (`number`):
 *    The total number of pages in the carousel, calculated based on the container's width and total scrollable width.
 *
 */

type Options = {
  scrollTime?: number;
};

export type UseCarouselReturnType = [
  number,
  (getPage: ((currentPage: number) => number) | number) => Promise<void>,
  number
];

export default function useCarousel<T extends HTMLElement = HTMLDivElement>(
  ref: React.RefObject<T | null>,
  options?: UseDragOptions<T> & Options
) {
  const scrollTime = options?.scrollTime ?? 250;
  const initialPage = ref.current
    ? Math.round(
        ref.current.scrollLeft / ref.current.getBoundingClientRect().width
      )
    : 0;

  const [page, setPage] = useState(initialPage);
  const [isSliding, setIsSliding] = useState(false);
  const pageRef = useRef(initialPage);

  useScroll(ref, () => {
    if (!ref.current) {
      return;
    }
    if (!window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const container = ref.current;

    const carouselWidth = container.getBoundingClientRect().width;
    const page = container.scrollLeft / carouselWidth;

    if (Math.abs(page - Math.round(page)) < 0.05) {
      container.classList.remove("isDragging");
      return;
    }

    container.classList.add("isDragging");
    console.log("scrolling");
  });

  const scrollToCarouselPage = async (
    getPage: ((currentPage: number) => number) | number,
    pageScrollTime = scrollTime
  ) => {
    if (isSliding) {
      return;
    }
    const container = ref.current;

    if (!container) return;

    const carouselWidth = container.getBoundingClientRect().width;
    const currentPage = Math.round(container.scrollLeft / carouselWidth);
    const pageCount = Math.round(container.scrollWidth / carouselWidth);
    const nextPage =
      typeof getPage === "function" ? getPage(currentPage) : getPage;

    if (nextPage < 0 || nextPage >= pageCount) return;
    setIsSliding(true);
    container.classList.add("isDragging");
    container.parentElement!.classList.add("[&>*]:cursor-wait");
    /* const controls = document.querySelectorAll(".carousel .control");
    controls.forEach((control) => control.classList.add("cursor-wait")); */

    container.classList.remove("snap-x");
    await scrollAsync(
      nextPage * carouselWidth,
      pageScrollTime,
      container.scrollLeft,
      (value) => (container.scrollLeft = value)
    );

    container.classList.remove("isDragging");
    container.parentElement!.classList.remove("[&>*]:cursor-wait");

    container.classList.add("snap-x");
    setIsSliding(false);
    pageRef.current = nextPage;
    setPage(nextPage);
  };

  const onDragEnd: (
    velocity: number,
    acceleration: number
  ) => Promise<void> = async (velocity: number, acceleration: number) =>
    new Promise((res) => {
      const container = ref.current;

      if (!container) {
        return;
      }

      const carouselWidth = container.getBoundingClientRect().width;
      const page = Math.round(container.scrollLeft / carouselWidth);

      const reachedXThreshhold = page !== pageRef.current;
      const reachedVThreshhold = Math.abs(velocity) > 0.12;

      const SCROLL_TIME = 200;

      if (reachedXThreshhold) {
        scrollToCarouselPage(() => page, SCROLL_TIME).then(res);
      } else if (reachedVThreshhold) {
        const delta = velocity < 0 ? 1 : -1;
        scrollToCarouselPage(() => page + delta, SCROLL_TIME).then(res);
      } else {
        scrollToCarouselPage(() => pageRef.current, SCROLL_TIME).then(res);
      }
    });

  const onLoad = (container: T) => {
    const isPointerCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isPointerCoarse) {
      container.classList.add(
        "snap-x",
        "snap-mandatory",
        "no-scrollbar",
        "[&>li]:snap-always",
        "[&>li]:snap-center"
      );
      container.classList.remove(
        "cursor-grab",
        "[.isDragging]:cursor-grabbing"
      );
    } else {
      container.classList.remove(
        "snap-x",
        "snap-mandatory",
        "[&>li]:snap-always",
        "[&>li]:snap-center"
      );
      container.classList.add(
        "cursor-grab",
        "no-scrollbar",
        "[.isDragging]:cursor-grabbing"
      );
    }
  };

  useHorizontalMouseDrag<T>(ref, {
    ...options,
    onLoad,
    onDragEnd,
  });

  if (!ref.current) {
    return [0, scrollToCarouselPage, 0] as const;
  }
  const carouselWidth = ref.current.getBoundingClientRect().width;
  const pageCount = Math.round(ref.current!.scrollWidth / carouselWidth);

  return [page, scrollToCarouselPage, pageCount] as const;
}

// subscribe to scroll events
function createSubscription(ref: React.RefObject<HTMLElement | null>) {
  if (!ref.current) {
    return function subscribe(callback: () => void) {
      return callback;
    };
  }
  return function subscribe(callback: () => void) {
    const controller = new AbortController();
    ref.current!.addEventListener("scroll", callback, {
      passive: true,
      signal: controller.signal,
    });

    return () => controller.abort();
  };
}

function createSnapshotGetter(ref: React.RefObject<HTMLElement | null>) {
  if (!ref.current) {
    return function getSnapshot() {
      return 0;
    };
  }
  return function getSnapshot() {
    const container = ref.current!;

    const carouselWidth = container.getBoundingClientRect().width;
    const currentPage = container.scrollLeft / carouselWidth;
    return currentPage;
  };
}

export function useCarouselScrollProgress(
  ref: React.RefObject<HTMLElement | null>
) {
  return useSyncExternalStore(
    createSubscription(ref),
    createSnapshotGetter(ref),
    () => 0
  );
}
