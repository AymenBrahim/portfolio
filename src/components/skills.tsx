import { useEffect, useRef, useState } from "react";
import { IconInfo, IconXMark } from "./icons";
import { twMerge } from "tailwind-merge";
import "./skills.css";
import { skillsData, type SkillRow } from "../data";

export default function Skills() {
  const [state, setState] = useState({
    isOpen: false,
    close: () => {},
    interacted: 0,
  });

  const openTooltip = (close: () => void) => {
    if (state.isOpen) {
      state.close();
    }
    setState((state) => ({
      isOpen: true,
      close,
      interacted: state.interacted + 1,
    }));
  };

  const closeTooltip = () => {
    state.close();
    setState((state) => ({ ...state, isOpen: false, close: () => {} }));
  };

  const ref = useRef<HTMLDivElement>(null);
  useSameTitleHeight(ref);
  return (
    <div className="skills" ref={ref}>
      {skillsData.map((row, i) => (
        <div key={row.title}>
          <h4>{row.title}:</h4>
          <Row
            skills={row.skills}
            openTooltip={openTooltip}
            closeTooltip={closeTooltip}
            rowIndex={i}
            animateTooltip={state.interacted <= 2}
          />
        </div>
      ))}
    </div>
  );
}

function useSameTitleHeight(ref: React.RefObject<HTMLDivElement | null>) {
  function setMaxHeight() {
    if (!ref.current) {
      return;
    }

    if (window.innerWidth < 1024) {
      ref.current.style.setProperty("--min-title-height", "auto");
      return;
    }

    const elements = [...ref.current.children!].map(
      (child) => child.firstChild
    ) as HTMLElement[];

    let maxHeight = elements[0].getBoundingClientRect().height;
    elements.map(
      (element) =>
        element.getBoundingClientRect().height > maxHeight &&
        (maxHeight = element.getBoundingClientRect().height)
    );
    ref.current.style.setProperty("--min-title-height", maxHeight + "px");
  }

  useEffect(() => {
    setMaxHeight();
    const controller = new AbortController();
    window.addEventListener("resize", setMaxHeight, {
      signal: controller.signal,
    });

    return () => controller.abort();
  });
}

type TooltipLifeCycleProps = {
  openTooltip: (close: () => void) => void;
  closeTooltip: () => void;
};

type RowProps = Omit<SkillRow, "title"> &
  TooltipLifeCycleProps & { rowIndex: number; animateTooltip: boolean };
function Row({ skills, rowIndex, ...tooltipsProps }: RowProps) {
  const lastRow = rowIndex === skillsData.length - 1;
  return (
    <div
      className={twMerge(
        "flex gap-8",
        lastRow ? " last-row" : "",
        rowIndex % 2 === 1 && !lastRow && "with-offset"
      )}
    >
      <ul>
        {skills.map((skill, i) => (
          <Icon
            key={"skill" + i}
            skill={skill}
            {...tooltipsProps}
            rowIndex={rowIndex}
            columnIndex={i}
          />
        ))}
      </ul>
    </div>
  );
}
type IconProps = {
  skill: SkillRow["skills"][number];
} & TooltipLifeCycleProps & {
    rowIndex: number;
    columnIndex: number;
    animateTooltip: boolean;
  };

function Icon(props: IconProps) {
  const { skill } = props;
  if (!skill.tooltip) {
    return (
      <li key={skill.name} className={`text-dark-accent shrink-1 grow-0 w-fit`}>
        <div className="text-dark-accent w-fit mx-auto  [&>svg]:size-12 md:[&>svg]:size-16">
          {skill.icon}
        </div>
        <span className="block text-center text-light-shade/90 mx-auto mt-2">
          {skill.name}
        </span>
      </li>
    );
  }
  return <IconWithTooltip {...props} />;
}

function IconWithTooltip(props: IconProps) {
  const {
    skill,
    openTooltip,
    closeTooltip,
    rowIndex,
    columnIndex,
    animateTooltip,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (rowIndex === 0 && columnIndex === 0) {
      openTooltip(() => setIsOpen(false));
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      <li
        key={skill.name}
        className={twMerge(
          "text-dark-accent shrink-1 grow-0 flex w-fit",
          isOpen && "open",
          animateTooltip && rowIndex === 0 && columnIndex === 1 && "animate"
        )}
        ref={ref}
        onClick={() => {
          if (isOpen) {
            return;
          }
          openTooltip(() => setIsOpen(false));
          setIsOpen(true);
        }}
      >
        <div className="overflow-hidden relative">
          <div>
            <div className="icon flex w-fit mx-auto text-dark-accent  cursor-pointer  relative  [&>svg:first-child]:size-12 md:[&>svg:first-child]:size-16 ">
              {skill.icon}
              <IconInfo
                className="absolute  show-tooltip-icon cursor-pointer box-content fill-light-shade
             size-6 -top-0.5 -right-0.5
             md:size-7 
            "
              />
            </div>
            {
              <span
                className={twMerge(
                  "block text-center mx-auto mt-2",
                  isOpen ? "text-dark-shade font-bold" : " text-light-shade/80"
                )}
              >
                {skill.name}
              </span>
            }
          </div>
          <div className="tooltip  text-dark-shade">
            {skill.tooltip}
            <IconXMark
              className="close-tooltip size-7 absolute top-0 right-0 cursor-pointer p-3.5 box-content fill-light-accent hover:fill-dark-accent"
              onClick={closeTooltip}
            />
          </div>
        </div>
      </li>
    </>
  );
}
