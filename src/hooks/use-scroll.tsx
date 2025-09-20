import { useLayoutEffect } from "react";

export default function useScroll<T extends HTMLElement = HTMLDivElement>(
  ref: React.RefObject<T | null>,
  onScroll: (e: Event) => void,
  options?: Omit<AddEventListenerOptions, "signal">
) {
  useLayoutEffect(() => {
    const controller = new AbortController();
    (() => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("scroll", onScroll, {
        ...options,
        signal: controller.signal,
      });
    })();

    return () => controller.abort();
  }, []);
}
