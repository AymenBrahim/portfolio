import { useRef, type HTMLAttributes, type ReactNode } from "react";
import "./tab-view.css";
import { twMerge } from "tailwind-merge";
import ExpandIcon from "./expand-icon";

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabViewProps = {
  tabs: Tab[];
} & HTMLAttributes<HTMLDivElement>;

export function TabView({ tabs, ...atts }: TabViewProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const tabPanelRef = useRef<HTMLDivElement>(null);
  return (
    <div
      {...atts}
      // @ts-expect-error: custom css property
      style={{ "--items-count": tabs.length }}
      className={twMerge("tab-view", atts.className)}
    >
      <nav>
        <ul ref={ulRef} data-items-count={tabs.length}>
          {tabs.map((tab, i) => (
            <li key={tab.id} className={i === 0 ? "active" : undefined}>
              <button onClick={(e) => onClick(e, ulRef, tabPanelRef)}>
                <span>{tab.label}</span>
                <ExpandIcon />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="card tab-panel" ref={tabPanelRef}>
        {tabs.map((tab, i) => (
          <div key={i} className={i === 0 ? "active" : undefined}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

function onClick(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ulRef: React.RefObject<HTMLUListElement | null>,
  divRef: React.RefObject<HTMLDivElement | null>,
) {
  if (!ulRef.current || !divRef.current) {
    return;
  }

  const button = e.currentTarget;
  const li = button.parentElement!;
  const ul = ulRef.current;
  const container = divRef.current;

  const index = [...ul.children].indexOf(li);
  if (ul.children.item(index)?.classList.contains("active")) {
    return;
  }

  for (let i = 0; i < ul.children.length; i++) {
    ul.children.item(i)?.classList.remove("active");
    container.children.item(i)?.classList.remove("active");
  }

  ul.children.item(index)?.classList.add("active");
  container.scrollLeft = 0;
  container.children.item(index)?.classList.add("active");
}
