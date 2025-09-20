import { useLayoutEffect, useRef } from "react";
import type { RequiredFields } from "../utils";
import usePointerType from "./use-pointer-type";

export type UseDragOptions<T> = {
  resetScrollOnLoad?: boolean;
  scrollMultiplier?: number;
  dragStartThreshold?: number;
  friction?: number;
  onDrag?: () => void;
  onDragEnd?: (velocity: number, acceleration: number) => Promise<void>;
  onLoad?: (element: T) => void;
};

export default function useHorizontalMouseDrag<
  T extends HTMLElement = HTMLDivElement
>(ref: React.RefObject<T | null>, options?: UseDragOptions<T>) {
  const defaultDragOptions = {
    scrollMultiplier: 1,
    dragStartThreshold: 5,
    friction: 0.95,
    resetScrollOnLoad: true,
  } as const satisfies RequiredFields<
    UseDragOptions<T>,
    "dragStartThreshold" | "friction" | "scrollMultiplier"
  >;

  const {
    dragStartThreshold,
    scrollMultiplier,
    friction,
    resetScrollOnLoad,
    onLoad,
  } = {
    ...defaultDragOptions,
    ...options,
  };

  const isDraggingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const lastVelocityRef = useRef(0);
  const accelerationRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const targetRef = useRef<EventTarget | null>(null);
  const pointerType = usePointerType();
  useLayoutEffect(() => {
    const PcAbortController = new AbortController();

    (() => {
      const container = ref.current;
      if (!container) return;

      if (onLoad) {
        onLoad(container);
      }

      if (pointerType === "coarse") {
        PcAbortController.abort();
      } else {
        const onDragEnd = async () => {
          const container = ref.current;

          if (options?.onDragEnd) {
            await options?.onDragEnd(
              velocityRef.current,
              accelerationRef.current
            );
          } else {
            await applyMomentumScroll<T>(
              container,
              velocityRef.current,
              friction
            );
          }
        };

        function onPointerDown(this: HTMLElement, e: globalThis.PointerEvent) {
          if (isDraggingRef.current) {
            return;
          }
          const container = ref.current;
          if (!container) return;
          /* if (snap) {
          container.classList.remove("snap-x");
        } */
          targetRef.current = e.target;

          startXRef.current = e.pageX - container.offsetLeft;
          scrollLeftRef.current = container.scrollLeft;

          container.setPointerCapture(e.pointerId);
          pointerIdRef.current = e.pointerId;

          lastXRef.current = e.clientX;
          lastTimeRef.current = Date.now();
          isMouseDownRef.current = true;
        }

        function onPointerMove(this: HTMLElement, e: globalThis.PointerEvent) {
          if (!isMouseDownRef.current) return;

          if (!isDraggingRef.current) {
            isDraggingRef.current =
              Math.abs(startXRef.current - e.clientX) > dragStartThreshold;
          }
          const container = ref.current;
          if (!container) return;

          container.classList.add("isDragging");

          const x = e.pageX - container.offsetLeft;
          const scroll = x - startXRef.current;

          const now = Date.now();
          const deltaTime = now - lastTimeRef.current;

          const newVelocity = (e.clientX - lastXRef.current) / deltaTime;

          const deltaVelocity = newVelocity - velocityRef.current;
          const acceleration = deltaVelocity / deltaTime;

          lastVelocityRef.current = velocityRef.current;
          velocityRef.current = newVelocity;
          accelerationRef.current = acceleration;

          lastXRef.current = e.clientX;
          lastTimeRef.current = now;

          requestAnimationFrame(() => {
            container.scroll({
              left: scrollLeftRef.current - scroll * scrollMultiplier,
              behavior: "instant" as ScrollBehavior,
            });
          });
        }

        const onMouseUp = async (e: MouseEvent) => {
          const container = ref.current;

          if (!container) return;

          if (!isDraggingRef.current) {
            (targetRef.current as HTMLElement)?.dispatchEvent(
              new PointerEvent("click", e)
            );
            reset();
            return;
          }

          container.classList.remove("isDragging");
          reset();
          await onDragEnd();
        };

        const reset = () => {
          const container = ref.current;
          if (container && pointerIdRef.current !== null) {
            container.releasePointerCapture(pointerIdRef.current);
          }
          isMouseDownRef.current = false;
          //isDraggingRef.current = false;
          pointerIdRef.current = null;
          targetRef.current = null;
        };

        function onClick(this: HTMLElement, e: globalThis.MouseEvent) {
          if (isDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
          }
          isDraggingRef.current = false;
        }

        container.addEventListener("pointerdown", onPointerDown, {
          signal: PcAbortController.signal,
        });
        container.addEventListener("pointermove", onPointerMove, {
          signal: PcAbortController.signal,
        });
        container.addEventListener("click", onClick, {
          signal: PcAbortController.signal,
        });
        document.addEventListener("pointerup", onMouseUp, {
          signal: PcAbortController.signal,
        });
      }
    })();

    /* } */

    return () => {
      PcAbortController.abort();
    };
  }, [
    ref,
    resetScrollOnLoad,
    dragStartThreshold,
    friction,
    scrollMultiplier,
    pointerType,
  ]);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (resetScrollOnLoad) {
      container.scrollLeft = 0;
    }
  }, [resetScrollOnLoad]);

  return {
    velocity: velocityRef.current,
    acceleration: accelerationRef.current,
  };
}

async function applyMomentumScroll<T extends HTMLElement = HTMLDivElement>(
  container: T | null,
  initialVelocity: number,
  friction: number
) {
  if (!container) {
    return;
  }
  let velocity = initialVelocity * 20;
  const minVelocity = 2;

  const step = async (cont: T) => {
    if (Math.abs(velocity) > minVelocity) {
      requestAnimationFrame(() => {
        step(cont);
        cont.scrollTo({
          left: cont.scrollLeft - velocity,
          behavior: "instant" as ScrollBehavior,
        });
        velocity *= friction;
      });
    }
    return Promise.resolve();
  };
  requestAnimationFrame(async () => await step(container));
}
