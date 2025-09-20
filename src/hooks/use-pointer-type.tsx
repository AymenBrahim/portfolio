import { useEffect, useState } from "react";
type Pointer = "fine" | "coarse";
export default function usePointerType() {
  const [pointerType, setPointerType] = useState<Pointer>(
    window.matchMedia("(pointer: fine)").matches ? "fine" : "coarse"
  );

  useEffect(() => {
    const pointerTypeAbortController = new AbortController();
    const isFinePointer = window.matchMedia("(pointer: fine)");
    isFinePointer.addEventListener(
      "change",
      () => {
        if (isFinePointer.matches) {
          setPointerType("fine");
          return;
        }

        setPointerType("coarse");
      },
      {
        signal: pointerTypeAbortController.signal,
      }
    );

    return () => pointerTypeAbortController.abort();
  });

  return pointerType;
}
