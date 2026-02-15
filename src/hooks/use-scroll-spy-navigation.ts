import { useCallback, useEffect } from "react";
import { getCSSVariableValue, remToPx } from "../utils";

export function useScrollSpyNavigation() {
  const calculateVisibility = useCallback(
    (rect: DOMRect, headerHeightInPx: number): number => {
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) -
        Math.max(rect.top - headerHeightInPx, 0);

      const heightVisibilityRatio = Math.max(
        0,
        Math.min(1, visibleHeight / rect.height),
      );

      return heightVisibilityRatio;
    },
    [],
  );

  const onScroll = useCallback(() => {
    const sections = [
      ...document.querySelectorAll("main > *"),
    ] as HTMLElement[];
    const headerHeightInRem = parseFloat(
      getCSSVariableValue("--header-height"),
    );
    const headerHeightInPx = remToPx(headerHeightInRem);

    // Determine most visible section
    const [activeSection, ...inactiveSections] = sections
      .map((section) => ({
        id: section.id,
        visibility: calculateVisibility(
          section.getBoundingClientRect(),
          headerHeightInPx,
        ),
      }))
      .sort((a, b) => b.visibility - a.visibility);
    
    const activeNavItem = document.querySelector(
      `header nav ul li a[href="#${activeSection.id}"]`,
    );
    activeNavItem!.classList.add("active");

    inactiveSections.map(({ id }) => {
      const navItem = document.querySelector(
        `header nav ul li a[href="#${id}"]`,
      );
      if (!navItem) {
        return;
      }
      navItem.classList.remove("active");
    });
  }, [calculateVisibility]);

  useEffect(() => {
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
}
