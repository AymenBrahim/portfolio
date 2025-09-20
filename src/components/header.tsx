import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import "./header.css";
import { getCSSVariableValue, remToPx, scrollAsync } from "../utils";
import {
  navigationData,
  professionalProjectsData,
  type NavigationItem,
} from "../data";

export default function Header() {
  const ref = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    const controller = new AbortController();
    (() => {
      const container = ref.current;
      if (!container) {
        return;
      }

      const uls = container.querySelectorAll(".dropdown > ul")!;
      [...uls].map((ul) => {
        const parentElement = ul.parentElement!;

        const height =
          ul.getBoundingClientRect().y -
          parentElement.getBoundingClientRect().y;
        (ul as HTMLElement).style.setProperty("--before-height", height + "px");
      });
    })();

    return () => controller.abort();
  }, []);

  useVariableBackgroundColor();
  return (
    <header>
      <nav>
        <ul ref={ref} onClick={onClick}>
          {navigationData.map((item) => (
            <NavigationItem {...item} key={item.label} />
          ))}
        </ul>
      </nav>
      <Hamburger ref={ref} />
    </header>
  );
}

type HamburgerProps = {
  ref: RefObject<HTMLUListElement | null>;
};

function Hamburger({ ref }: HamburgerProps) {
  return (
    <div
      className="hamburger block"
      onClick={() =>
        ref.current &&
        (ref.current.classList.contains("expanded")
          ? ref.current.classList.remove("expanded")
          : ref.current.classList.add("expanded"))
      }
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

async function onClick(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
  const target = e.target as HTMLAnchorElement;
  if (!target.href) {
    return;
  }

  const url = new URL(target.href);
  const id = url.hash?.slice(1);

  if (target.tagName !== "A" || !id) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  //const id = target.href.slice(1);
  const index = professionalProjectsData.reduce(
    (acc, curr, i) => (acc !== -1 ? acc : curr.id === id ? i : -1),
    -1
  );

  const headerOffsetInRem = parseFloat(getCSSVariableValue("--header-height"));
  console.log(headerOffsetInRem);
  const headerOffset = remToPx(headerOffsetInRem);
  if (index === -1) {
    const section = document.getElementById(id)!;
    await scrollAsync(
      window.scrollY + section.getBoundingClientRect().top - headerOffset,
      400,
      window.scrollY,
      (scroll: number) =>
        window.scrollTo({
          top: scroll,
          behavior: "instant",
        })
    );

    /* window.location.hash = "#" + id; */
    return;
  }

  const professionalProjectsSection = document.getElementById(
    "professional-projects"
  )!;

  await scrollAsync(
    window.scrollY +
      professionalProjectsSection.getBoundingClientRect().top -
      headerOffset,
    250,
    window.scrollY,
    (scroll: number) =>
      window.scrollTo({
        top: scroll,
        behavior: "instant",
      })
  );

  const carouselContainer = document.getElementById(
    professionalProjectsData[index].id
  )!.parentElement!.parentElement!;

  const carouselWidth = carouselContainer.getBoundingClientRect().width;
  /* await scrollAsync(
    index * carouselWidth,
    200,
    container.scrollLeft,
    (value) => (container.scrollLeft = value)
  ); */
  /* await scrollAsync(
    window.scrollY +
      professionalProjectsSection.getBoundingClientRect().top -
      headerOffset,
    200,
    window.scrollY,
    (scroll: number) =>
      window.scrollTo({
        top: scroll,
        behavior: "instant",
      })
  ); */
  await scrollAsync(
    index * carouselWidth,
    250,
    carouselContainer.scrollLeft,
    (value) =>
      (carouselContainer.scrollLeft =
        value) /*  professionalProjectsSection.scrollTo(
        {
          left: 2000,
          behavior: "instant",
        }
      ) */
  );

  /* window.location.hash = "#" + id; */
}

function NavigationItem(props: NavigationItem) {
  if (props.targetId) {
    const { label, targetId, ...rest } = props;

    return (
      <li {...rest}>
        <a href={"#" + targetId}>{label}</a>
      </li>
    );
  }

  if (props.children) {
    const { children, label, ...rest } = props;

    return (
      <li className="dropdown" {...rest}>
        <span
          className="dropdown-label"
          onClick={(e) =>
            window.matchMedia("(pointer: coarse) or (max-width: 640px)")
              .matches &&
            (e.currentTarget.parentElement!.classList.contains("expanded")
              ? e.currentTarget.parentElement!.classList.remove("expanded")
              : e.currentTarget.parentElement!.classList.add("expanded"))
          }
        >
          {label}
        </span>
        <ul>
          {children.map((item) => (
            <NavigationItem {...item} key={item.label} />
          ))}
        </ul>
      </li>
    );
  }
  return <></>;
}

function useVariableBackgroundColor() {
  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener(
      "scroll",
      () => {
        const elements = [...document.querySelectorAll("main section")];
        const headerHeightInRem = parseFloat(
          getCSSVariableValue("--header-height")
        );
        const headerHeightInPx = remToPx(headerHeightInRem);
        elements.map((element) => {
          if (
            element.getBoundingClientRect().top <= headerHeightInPx &&
            element.getBoundingClientRect().bottom >= headerHeightInPx
          ) {
            /* if (i % 2 === 0) {
              header.classList.remove("bg-blue-600");
              header.classList.add("bg-light-beige");
            } else {
              header.classList.remove("bg-light-beige");
              header.classList.add("bg-blue-600");
            } */
            return;
          }
        });
      },
      {
        signal: controller.signal,
        passive: true,
      }
    );

    return () => controller.abort();
  });
}

// Recursive NavList component
/* const NavList: React.FC<{ items: NavItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (item: NavItem, index: number) => {
    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (item.children) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={item.label} className="relative">
          <button
            onClick={() => handleClick(item, index)}
            className="px-3 py-2 w-full text-left bg-gray-100 hover:bg-gray-200 rounded"
          >
            {item.label}
          </button>

          {item.children && openIndex === index && (
            <div className="ml-4 mt-2 border-l-2 border-gray-300 pl-2">
              <NavList items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
 */
