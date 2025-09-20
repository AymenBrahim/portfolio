import { useRef } from "react";
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export function getCSSVariableValue(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}

export function remToPx(rem: number): number {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * rootFontSize;
}

export function useDialogue() {
  //const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  //const button = <Button type="button" ref={buttonRef} />;

  return {
    Dialog: () => (
      <dialog ref={dialogRef} className="backdrop:bg-dark-shade/90 ">
        <button autoFocus onClick={() => dialogRef.current?.close()}>
          Close
        </button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
    ),
    OpenButton: () => (
      <button onClick={() => dialogRef.current?.showModal()}>
        Show the dialog
      </button>
    ),
  };
}

export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}

export function mapValue(
  x: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number
) {
  return y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
}

export function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;

  const angleRadians = Math.atan2(dy, dx);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return angleDegrees;
}

export async function scrollAsync(
  targetValue: number,
  duration: number,
  startValue: number,
  updateValue: (newVlaue: number) => void,
  easingFn: (x: number) => number = (x) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
): Promise<void> {
  return new Promise((resolve) => {
    const distance = targetValue - startValue;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease in-out cubic
      const easedProgress = easingFn(progress);

      updateValue(startValue + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export function formatMonthYear(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}
