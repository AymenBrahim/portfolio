import type { HTMLAttributes } from "react";
import Timeline from "../components/timeline";
import { FaLocationDot } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { experiences, type Experience } from "../data";
import Link from "../components/link";
import "./experience.css";
import TimeEntry from "../components/time-entry";
import Section from "../components/section";
export default function Experience(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Section
      {...props}
      className={twMerge("experience", props.className)}
      headline="Professional Timeline"
      deck="Delivering scalable solutions across roles and teams"
    >
      <div>
        <Timeline.Container>
          {experiences.map((experience, i) => (
            <Timeline.Item
              key={i}
              firstColumn={<FirstColumn {...experience} />}
              secondColumn={<SecondColumn {...experience} />}
            />
          ))}
        </Timeline.Container>
      </div>
    </Section>
  );
}

function FirstColumn({
  startDate,
  companyLogo,
  endDate,
  location,
  role,
  companyHref,
}: Experience) {
  return (
    <div className="first-col">
      <a href={companyHref}>{companyLogo}</a>
      <div>
        {role && <h4>{role}</h4>}
        {location && (
          <address className="with-hr-prefix">
            <FaLocationDot />
            {location}
          </address>
        )}
        <TimeEntry startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}

function SecondColumn({ companyHref, description, companyName }: Experience) {
  return (
    <div className="second-col">
      {companyHref ? (
        <Link as={"h3"} href={companyHref} target={"_blank"}>
          {companyName}
        </Link>
      ) : (
        <h3>{companyName}</h3>
      )}
      <p>{description}</p>
    </div>
  );
}
