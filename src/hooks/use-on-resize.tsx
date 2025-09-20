import { useEffect } from "react";

type Options = { onInit?: () => void };

export default function useOnWindowResize(
  callback: (e: UIEvent) => void,
  options?: Options
) {
  useEffect(() => {
    if (options && options.onInit) {
      options.onInit();
    }

    const controller = new AbortController();
    window.addEventListener("resize", callback, {
      signal: controller.signal,
    });

    return () => controller.abort();
  });
}
