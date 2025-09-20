import type { HTMLAttributes } from "react";
import Timeline from "../components/timeline";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { experiences, type Experience } from "../data";
import { formatMonthYear } from "../utils";
import Link from "../components/link";

export default function Experience(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <section {...props} className={twMerge("bg-dark-shade", props.className)}>
      <h2>Professional Timeline</h2>
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
    </section>
  );
}

function FirstColumn({
  startDate,
  endDate,
  location,
  companyHref,
  companyName,
}: Experience) {
  return (
    <div>
      <Link href={companyHref} className="mb-4">
        <h3 className="m-0">{companyName}</h3>
      </Link>
      <h4 className="text-xl font-tertiary">
        <FaRegCalendar className="inline mr-1 align-baseline" />
        {formatMonthYear(startDate)} - {formatMonthYear(endDate)}
      </h4>
      {location && (
        <h4 className="text-xl font-tertiary mt-2">
          <FaLocationDot className="inline mr-1 align-baseline" />
          {location}
        </h4>
      )}
    </div>
  );
}

function SecondColumn({ role, description }: Experience) {
  return (
    <div>
      {role && <h3 className="mt-0 mb-4">{role}</h3>}
      <p>{description}</p>
    </div>
  );
}
