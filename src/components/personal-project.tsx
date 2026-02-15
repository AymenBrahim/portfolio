import type { HTMLAttributes } from "react";
import type { PersonalProject } from "../data";
import "./personal-project.css";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { twMerge } from "tailwind-merge";
import Button from "./button";
import { FaGithub, FaGlobe } from "react-icons/fa6";

type ProjectViewProps = {
  project: PersonalProject;
} & HTMLAttributes<HTMLDivElement>;

export function PersonalProject({ project, ...atts }: ProjectViewProps) {
  const techList = project.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div
      {...atts}
      className={twMerge("project-view", atts.className)}
      id={project.id}
    >
      <div className="hero">
        <div className="meta">
          <h5>Project</h5>
          <h3>{project.name}</h3>
        </div>
        <div>
          <h5>Technologies</h5>
          <div className="pill-container">
            {techList.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div>
          <h5>Overview</h5>
          <p>{project.description}</p>
        </div>
      </div>
      <div className="links-block">
        <h5>Links</h5>
        <div className="link-container">
          {project.links.map((link, i) => (
            <Button
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
              key={i}
              type="anchor"
              variant="tertiary"
            >
              {link.title === "Repository" && (
                <FaGithub className="link-icon" />
              )}

              {link.title === "Live version" && (
                <FaGlobe className="link-icon" />
              )}

              <span>{link.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
