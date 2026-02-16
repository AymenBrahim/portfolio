import { useEffect, useRef, useState } from "react";
import { animateValue, type RequiredFields } from "../utils";
import { SpringValue, useSpringValue } from "@react-spring/web";
import usePointerType from "./use-pointer-type";

export type UseDragOptions = {
  scrollMultiplier?: number;
  scrollTime?: number;
  dragStartThreshold?: number;
};

export type CarouselControls = {
  page: number;
  setPage: (page: number) => Promise<void>;
  pageProgress: SpringValue<number>;
};

export default function useCarouselControls(
  ref: React.RefObject<HTMLUListElement | null>,
  options?: UseDragOptions,
): CarouselControls {
  const defaultDragOptions = {
    scrollMultiplier: 1,
    dragStartThreshold: 5,
    scrollTime: 200,
  } as const satisfies RequiredFields<
    UseDragOptions,
    "dragStartThreshold" | "scrollMultiplier" | "scrollTime"
  >;

  const { dragStartThreshold, scrollMultiplier, scrollTime } = {
    ...defaultDragOptions,
    ...options,
  };

  const pointerType = usePointerType();

  const frameRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const containerCache = useRef<{
    offsetLeft: number;
    width: number;
    childCount: number;
  } | null>(null);

  const pointerIdRef = useRef<number | null>(null);
  const targetRef = useRef<EventTarget | null>(null);
  const pageRef = useRef(0);
  const [page, setPage] = useState(0);
  const pageProgress = useSpringValue(0);

  useEffect(() => {
    const controller = new AbortController();
    function onPointerDown(this: HTMLUListElement, e: PointerEvent) {
      this.classList.add("pointer-down");
      containerCache.current = {
        width: this.getBoundingClientRect().width,
        offsetLeft: this.offsetLeft,
        childCount: this.children.length,
      };

      targetRef.current = e.target;

      startXRef.current = e.clientX;
      scrollLeftRef.current = this.scrollLeft;

      this.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;

      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
    }

    function onPointerMove(this: HTMLUListElement, e: PointerEvent) {
      if (frameRef.current) return;

      if (!this.classList.contains("pointer-down")) {
        return;
      }

      if (!this.classList.contains("is-dragging")) {
        const distanceMoved = Math.abs(startXRef.current - e.clientX);
        if (distanceMoved > dragStartThreshold) {
          this.classList.add("is-dragging");
        }
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const scroll = e.clientX - startXRef.current;

        const now = performance.now();
        const deltaTime = now - lastTimeRef.current;

        if (deltaTime > 0) {
          const newVelocity = (e.clientX - lastXRef.current) / deltaTime;
          if (isFinite(newVelocity)) {
            velocityRef.current = newVelocity;
          }
        }

        lastXRef.current = e.clientX;
        lastTimeRef.current = now;

        const pageProgressFloat =
          (scrollLeftRef.current - scroll * scrollMultiplier) /
          containerCache.current!.width;
        if (this.classList.contains("is-dragging")) {
          this.scrollLeft = scrollLeftRef.current - scroll * scrollMultiplier;
          pageProgress.set(pageProgressFloat);
          if (pageProgressFloat < 0 && pageProgressFloat > -1) {
            (this.children.item(0)! as HTMLElement).style.translate =
              -pageProgressFloat * 20 + "%";
          }

          const childCount = containerCache.current!.childCount;
          const extraScroll = childCount - pageProgressFloat;

          if (extraScroll > 0 && extraScroll < 1) {
            (
              this.children.item(childCount - 1)! as HTMLElement
            ).style.translate = extraScroll * 20 - 20 + "%";
          }
        }
      });
    }

    const onPointerUp = async (e: PointerEvent) => {
      const container = ref.current;

      if (!container) return;

      if (!container.classList.contains("is-dragging")) {
        (targetRef.current as HTMLElement)?.dispatchEvent(
          new PointerEvent("click", e),
        );
        reset();
        return;
      }

      const carouselWidth = containerCache.current!.width;
      const currentPageProgress = container.scrollLeft / carouselWidth;

      let nextPage = 0;

      const reachedXThreshold =
        Math.round(currentPageProgress) !== pageRef.current;

      const currentVelocity = velocityRef.current;
      const reachedVThreshold = Math.abs(currentVelocity) > 0.05;

      if (reachedXThreshold) {
        nextPage = Math.round(currentPageProgress);
      } else if (reachedVThreshold) {
        const currentPage = Math.round(currentPageProgress);
        nextPage = currentPage + (currentVelocity < 0 ? 1 : -1);
      } else {
        nextPage = Math.round(currentPageProgress);
      }

      const maxPage = containerCache.current!.childCount - 1;
      nextPage = Math.max(0, Math.min(nextPage, maxPage));
      container.classList.add("is-scrolling");
      reset();

      await animateValue(
        nextPage * carouselWidth,
        scrollTime * Math.abs(currentPageProgress - nextPage),
        container.scrollLeft,
        (value) => {
          container.scrollLeft = value;
          pageProgress.set(value / containerCache.current!.width);
        },
      );
      container.classList.remove("is-scrolling");

      pageRef.current = nextPage;
      setPage(nextPage);
    };

    const reset = () => {
      const container = ref.current;
      if (!container) {
        return;
      }
      if (pointerIdRef.current !== null) {
        container.releasePointerCapture(pointerIdRef.current);
      }
      container.classList.remove("pointer-down");
      container.classList.remove("is-dragging");
      (container.children.item(0)! as HTMLElement).style.translate = "0";
      (
        container.children.item(container.children.length - 1)! as HTMLElement
      ).style.translate = "0";

      pointerIdRef.current = null;
      targetRef.current = null;
    };

    function onClick(this: HTMLUListElement, e: globalThis.MouseEvent) {
      if (this.classList.contains("is-dragging")) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function onScroll(this: HTMLUListElement) {
      if (
        (pointerType === "fine" && this.classList.contains("is-dragging")) ||
        this.classList.contains("is-scrolling")
      ) {
        return;
      }
      requestAnimationFrame(() => {
        if (pointerType === "coarse") {
          this.classList.add("is-dragging");
        }
        const width = this.getBoundingClientRect().width;
        const scrollLeft = this.scrollLeft;

        const progress = scrollLeft / width;
        pageProgress.set(progress);

        if (Math.abs(progress - Math.round(progress)) < 0.05) {
          setPage(progress);
          if (pointerType === "coarse") {
            this.classList.remove("is-dragging");
          }
        }
      });
    }

    function onPointerDownCoarse(this: HTMLElement, e: PointerEvent) {
      containerCache.current = {
        width: this.getBoundingClientRect().width,
        offsetLeft: this.offsetLeft,
        childCount: this.children.length,
      };
    }

    const container = ref.current;
    if (container) {
      if (pointerType === "fine") {
        container.addEventListener("pointerdown", onPointerDown, {
          signal: controller.signal,
        });
        container.addEventListener("pointermove", onPointerMove, {
          signal: controller.signal,
          passive: false,
          capture: true,
        });
        container.addEventListener("click", onClick, {
          signal: controller.signal,
        });
        document.addEventListener("pointerup", onPointerUp, {
          signal: controller.signal,
        });
      }
      if (pointerType === "coarse") {
        container.addEventListener("pointerdown", onPointerDownCoarse, {
          signal: controller.signal,
        });
      }
      container.addEventListener("scroll", onScroll, {
        signal: controller.signal,
      });
    }

    return () => {
      controller.abort();
    };
  }, [
    dragStartThreshold,
    pageProgress,
    pointerType,
    ref,
    scrollMultiplier,
    scrollTime,
  ]);

  async function setPageFunction(page: number) {
    const container = ref.current;
    if (!container) return;

    const maxPage = container.children.length - 1;
    if (page > maxPage || page < 0) {
      return;
    }

    if (pointerType === "coarse") {
      container.classList.remove("pointer-coarse:snap-x");
    }
    container.classList.add("is-scrolling");

    const carouselWidth = container.getBoundingClientRect().width;
    await animateValue(
      page * carouselWidth,
      scrollTime,
      container.scrollLeft,
      (value) => {
        container.scrollLeft = value;
        pageProgress.set(container.scrollLeft / carouselWidth);
      },
    );

    if (pointerType === "coarse") {
      container.classList.add("pointer-coarse:snap-x");
    }
    container.classList.remove("is-scrolling");

    setPage(page);
  }
  return {
    page,
    setPage: setPageFunction,
    pageProgress,
  };
}
