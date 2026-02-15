import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import { IconInfo, IconXMark } from "./icons";
import "./skills.css";
import { skillsData, type SkillRow } from "../data";
import ReactDOM from "react-dom/client";
import { twMerge } from "tailwind-merge";

export default function Skills(props: HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props;
  const [activeHash, setActiveHash] = useState<string>("");
  const [root, setRoot] = useState<ReactDOM.Root | null>(null);

  async function toggleDetails(
    element: ReactNode | null,
    row: number,
    column: number,
  ) {
    if (!ref.current || !element) {
      return;
    }
    const hash = `${row}-${column}`;
    if (hash === activeHash) {
      return;
    }
    if (activeHash) {
      await closeDetails();
    }
    setActiveHash(hash);

    const div = document.createElement("div");
    div.id = "tooltip-details";
    const isSmall = window.matchMedia("(max-width: 1024px)").matches;
    const insertIndex =
      isSmall || row === skillsData.length - 2
        ? row + 1
        : row + 1 + (row % 2 == 0 ? 1 : 0);

    ref.current.insertBefore(div, ref.current.children[insertIndex]);
    const root = ReactDOM.createRoot(div);
    root.render(element);
    setRoot(root);
  }

  async function closeDetails() {
    const div = document.getElementById("tooltip-details")!;
    div.classList.add("is-dismounting");
    return new Promise((res) => {
      setTimeout(() => {
        root?.unmount();
        div.remove();
        setActiveHash("");
        res("true");
      }, 25);
    });
  }

  const ref = useRef<HTMLDivElement>(null);
  return (
    <div {...rest} className={twMerge("skills card", className)} ref={ref}>
      {skillsData.map((row, i) => (
        <div key={row.title}>
          <h4>{row.title}:</h4>
          <Row
            skills={row.skills}
            rowIndex={i}
            openDetails={toggleDetails}
            closeDetails={closeDetails}
            activeHash={activeHash}
          />
        </div>
      ))}
    </div>
  );
}

type TooltipLifeCycleProps = {
  openDetails: (
    node: ReactNode,
    row: number,
    column: number,
  ) => Promise<unknown>;
  closeDetails: () => void;
  rowIndex: number;
  activeHash: string;
};

type RowProps = Omit<SkillRow, "title"> & TooltipLifeCycleProps;
function Row({ skills, ...rest }: RowProps) {
  return (
    <ul>
      {skills.map((skill, i) => (
        <Skill key={"skill-" + i} skill={skill} {...rest} columnIndex={i} />
      ))}
    </ul>
  );
}

type Skill = SkillRow["skills"][number];
type SkillProps = {
  skill: Skill;
  columnIndex: number;
} & TooltipLifeCycleProps;

function Skill(props: SkillProps) {
  const { skill } = props;
  if (!skill.tooltip) {
    return <SkillHeader skill={skill} />;
  }
  return <SkillWithDetails {...props} />;
}

type SkillHeaderProps = {
  skill: Skill;
  liProps?: LiHTMLAttributes<HTMLElement>;
};

function SkillHeader(props: SkillHeaderProps) {
  const { skill, liProps } = props;

  return (
    <li {...liProps}>
      <div className="icon">
        {skill.icon}
        <IconInfo className="info-icon" />
      </div>
      <span className="name">{skill.name}</span>
    </li>
  );
}

function SkillWithDetails(props: SkillProps) {
  const { openDetails, rowIndex, columnIndex, activeHash } = props;
  const hash = `${rowIndex}-${columnIndex}`;
  const isActive = hash === activeHash;

  return (
    <SkillHeader
      {...props}
      liProps={{
        className: "toggle" + (isActive ? " is-active" : ""),
        onClick: async () =>
          await openDetails(<Details {...props} />, rowIndex, columnIndex),
      }}
    />
  );
}

function Details(props: Omit<SkillProps, "openDetails">) {
  const { skill, closeDetails } = props;

  return (
    <>
      <SkillHeader skill={skill} />
      <p className="tooltip">{skill.tooltip}</p>
      <IconXMark onClick={closeDetails} className="close-icon" />
    </>
  );
}
