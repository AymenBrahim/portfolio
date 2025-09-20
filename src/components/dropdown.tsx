import { useEffect, useId, type ReactNode } from "react";
import "./index.css";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
  className?: string;
  header: ReactNode;
  children: ReactNode;
  resetActive?: (e: HTMLElement) => void;
  id?: string;
};

export default function Dropddown(props: DropdownProps) {
  const { className, header, children, id } = props;
  return (
    <div className={twMerge("dropdown", className)} id={id}>
      <div
        className={
          "flex flex-row py-4 px-5 pr-16 justify-between rounded-lg cursor-pointer relative toggle"
        }
        onClick={(e) => {
          toggleActive(e);
        }}
      >
        <div className="w-full">{header}</div>
        <div className="icon" />
      </div>
      <div className="overflow-hidden max-h-0">
        <div>{children}</div>
      </div>
    </div>
  );
}

function toggleActive(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (!e.currentTarget.parentElement) {
    return;
  }
  if (location.hash == `#${e.currentTarget.parentElement.id}`) {
    location.hash = `#${e.currentTarget.parentElement.parentElement?.id}`;
    return;
  }
  location.hash = `#${e.currentTarget.parentElement.id}`;

  /* e.currentTarget.parentElement.classList.toggle("active"); */
}

type DropdownGroupProps = {
  className?: string;
  children: ReactNode;
};
export function DropdownGroup(props: DropdownGroupProps) {
  const { children, className } = props;
  const id = useId();

  useEffect(() => {
    const { hash } = window.location;
    const element = document.getElementById(hash.substring(1));
    if (element?.parentElement?.id === id) {
      element.classList.add("active");
      element.parentElement.scrollIntoView();
    }

    const callback = (e: HashChangeEvent) => {
      const { hash } = window.location;
      const element = document.getElementById(hash.substring(1));

      if (!element) {
        return;
      }
      if (element.id === id) {
        element
          .querySelectorAll(".active")
          .forEach((item) => item.classList.remove("active"));
        return;
      }

      if (element.parentElement?.id !== id) {
        return;
      }

      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        element.parentElement
          .querySelectorAll(".active")
          .forEach((item) => item.classList.remove("active"));
        element.classList.add("active");
      }

      const rect = element.parentElement.getBoundingClientRect();
      const isInview = rect.top < window.innerHeight && rect.bottom > 0;

      window.scrollTo({
        top: rect.top + window.scrollY,
        behavior: isInview ? "instant" : "smooth",
      });
      e.preventDefault();
    };

    window.addEventListener("hashchange", callback);

    return () => window.removeEventListener("hashchange", callback);
  });

  return (
    <div className={twMerge("", className)} id={id}>
      {children}
    </div>
  );
}
