import { useState, useRef } from "react";
import type { NavigationItem } from "../data";
import Portal from "./portal";
import ExpandIcon from "./expand-icon";
import { handleHashNavigation } from "../utils/navigation-handler";
import { ThemeToggle } from "./theme-toggle";

export default function DesktopMenu({ items }: { items: NavigationItem[] }) {
  return (
    <div id="desktop-nav-container">
      <nav>
        <ul>
          {items.map((item, index) => (
            <DesktopMenuItem key={index} item={item} />
          ))}
        </ul>
      </nav>
      <ThemeToggle />
      <div className="active-bubble"></div>
    </div>
  );
}

function DesktopMenuItem({
  item,
  depth = 0,
}: {
  item: NavigationItem;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const ref = useRef<HTMLLIElement>(null);

  const hasChildren = item.children && item.children.length > 0;
  const handleMouseEnter = () => {
    if (isOpen) {
      return;
    }

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: depth > 0 ? rect.top : rect.bottom,
        left: depth > 0 ? rect.right : rect.left,
      });
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <li
      onMouseLeave={hasChildren ? handleMouseLeave : undefined}
      onMouseMove={hasChildren ? handleMouseEnter : undefined}
      ref={ref}
    >
      <a
        href={item.targetId ? `#${item.targetId}` : "#"}
        onClick={(e) => handleHashNavigation(e)}
        className={isOpen ? "expanded" : undefined}
      >
        {item.label}
        {hasChildren && (
          <ExpandIcon
            className={
              (isOpen ? "expanded" : undefined) +
              (depth === 0 ? "" : " -rotate-90")
            }
          />
        )}
      </a>

      {hasChildren && isOpen && coords && (
        <Portal>
          <div
            className={
              "submenu-container" + (depth === 0 ? " first-dropdown" : "")
            }
            style={{
              top: coords.top,
              left: coords.left,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="submenu">
              {item.children!.map((child, idx) => (
                <DesktopMenuItem key={idx} item={child} depth={depth + 1} />
              ))}
              <div className="active-bubble"></div>
            </ul>
          </div>
        </Portal>
      )}
    </li>
  );
}
