import type { HTMLAttributes, RefObject } from "react";
import type { Project } from "../data";
import { twMerge } from "tailwind-merge";
import Link from "./link";
import TimeEntry from "./time-entry";
import useOnWindowResize from "../hooks/use-on-resize";
import "./professional-project.css";
type ProjectProps = HTMLAttributes<HTMLDivElement> & {
  project: Project;
  carouselRef: RefObject<HTMLUListElement | null>;
};

export default function ProfessionalProject(props: ProjectProps) {
  useOnWindowResize(() => setMaxHeight(carouselRef), {
    onInit: () => setMaxHeight(carouselRef),
  });
  const { project, className, carouselRef, ...rest } = props;
  const { projectDescription, technologies, id } = project;

  // Clean tech parsing (handles spaces after commas)

  return (
    <div
      id={id}
      className={twMerge("professional-project", className)}
      {...rest}
    >
      <ProjectHeader {...project} />

      <div className="mini-card">
        <h5>About</h5>
        <p>{projectDescription}</p>
      </div>
    </div>
  );
}

const ProjectHeader = ({
  title,
  role,
  projectLogo,
  projectHref,
  startDate,
  endDate,
  employerLogo,
  employerHref,
  technologies,
}: Project) => {
  const techList = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <header>
      <div className="details">
        <div className="logo">{projectLogo}</div>

        <div className="info">
          <Link as="h3" draggable={false} href={projectHref} target="_blank">
            {title}
          </Link>

          <TimeEntry startDate={startDate} endDate={endDate} />
        </div>
      </div>

      <a
        className="employer"
        href={employerHref}
        target="_blank"
        draggable={false}
      >
        <h5 className="">Client / Employer</h5>
        <div className="logo">{employerLogo}</div>
      </a>

      <div className="role">
        <h5 className="">Role</h5>
        <h4>{role}</h4>
      </div>

      <div className="technologies">
        <h5>Tech Stack</h5>
        <div className="pill-container">
          {techList.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </header>
  );
};
function setMaxHeight(carouselRef: RefObject<HTMLUListElement | null>) {
  if (!carouselRef.current) {
    return;
  }

  if (!carouselRef.current.children) {
    return;
  }
  const children = [...carouselRef.current.children];
  let max = children[0].getBoundingClientRect().height;
  children.forEach(
    (child) =>
      child.getBoundingClientRect().height > max &&
      (max = child.getBoundingClientRect().height),
  );

  carouselRef.current.parentElement!.style.setProperty(
    "--projects-map-height",
    `calc(100% - ${max}px)`,
  );
}
