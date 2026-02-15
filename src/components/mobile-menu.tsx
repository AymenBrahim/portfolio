import { useRef, useState } from "react";
import type { NavigationItem } from "../data";
import ExpandIcon from "./expand-icon";
import Portal from "./portal";
import { ThemeToggle } from "./theme-toggle";
import { handleHashNavigation } from "../utils/navigation-handler";

interface MobileMenuProps {
  items: NavigationItem[];
}

type State = "is-open" | "is-opening" | "is-close" | "is-closing";

export default function MobileMenu({ items }: MobileMenuProps) {
  const [state, setState] = useState<State>("is-close");
  const ref = useRef<HTMLDivElement>(null);
  const toggle = async () => {
    if (state === "is-open") {
      await onClose();
      return;
    }
    if (state === "is-close") {
      setState("is-open");
      await onOpen();
      return;
    }
  };

  const isOpen = state !== "is-close";
  async function onClose(): Promise<boolean> {
    const duration = Number.parseInt(
      window
        .getComputedStyle(ref.current!)
        .getPropertyValue("--animation-time")
        .replace("ms", ""),
    );

    setState("is-closing");
    return new Promise((res) => {
      setTimeout(() => {
        setState("is-close");
        res(true);
      }, duration);
    });
  }

  const onOpen = async () => {
    setState("is-opening");
    return new Promise((res) => {
      setTimeout(() => {
        setState("is-open");
        res(true);
      }, 300);
    });
  };

  return (
    <>
      <button
        id="mobile-menu-toggle"
        className={state}
        onClick={toggle}
        aria-label="Toggle menu"
        onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
      >
        <span />
        <span />
        <span />
      </button>
      {isOpen && (
        <Portal>
          <div id="mobile-nav-container" ref={ref} className={state}>
            <div className="backdrop" onClick={onClose} />

            <div className={"menu"}>
              <nav>
                <ul>
                  {items.map((item, index) => (
                    <MobileMenuItem key={index} item={item} onClose={onClose} />
                  ))}
                </ul>
                <div className="active-bubble"></div>
              </nav>

              <div className="footer">
                <span>Theme</span>
                <ThemeToggle onToggle={async () => await onClose()} />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

function MobileMenuItem({
  item,
  onClose,
}: {
  item: NavigationItem;
  onClose: () => Promise<boolean>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = async (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      await handleHashNavigation(
        e as React.MouseEvent<HTMLAnchorElement>,
        onClose,
      );
    }
  };

  return (
    <li className={isExpanded ? "active" : undefined}>
      <a href={item.targetId ? `#${item.targetId}` : "#"} onClick={handleClick}>
        {item.label}
        {hasChildren && (
          <ExpandIcon className={isExpanded ? "expanded" : "retracted"} />
        )}
      </a>

      {hasChildren && (
        <div className={`submenu`}>
          <ul>
            {item.children!.map((child, idx) => (
              <MobileMenuItem key={idx} item={child} onClose={onClose} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
