import { twMerge } from "tailwind-merge";
import { personalProjectsData, type PersonalProject } from "../data";
import { ArrowUpRightFromSquare } from "../components/icons";
import type { HTMLAttributes } from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
export default function PersonalProjects(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <section
      {...props}
      className={twMerge("mt-[var(--header-height)]", props.className)}
    >
      <h2>Personal Projects</h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 w-full sm:max-w-3/4  mx-auto lg:max-w-full">
        {personalProjectsData.map((project, i) => (
          <Project {...project} key={i} index={i} />
        ))}
      </div>
    </section>
  );
}

function Project({
  name,
  description,
  technologies,
  thumbnail,
  index,
  link,
  id,
}: PersonalProject & { index: number }) {
  return (
    <div id={id}>
      <a
        href={link}
        target="_blank"
        className="[&:hover>:nth-child(2)]:underline [&:hover>:first-child>.arrow-upright>:first-child]:translate-x-8 [&:hover>:first-child>.arrow-upright>:first-child]:-translate-y-8"
      >
        <Thumbnail
          thumbnailHref={thumbnail}
          index={index}
          className="max-h-[50vh] lg:mb-3 md:mb-2.5 mb-2"
        />
        <span className="lg:mb-6 md:mb-5 mb-4 pointer-coarse:underline">
          <h3 className="font-tertiary m-0">
            {name}
            <SiGithub className="inline pl-1 align-baseline  size-6 lg:size-10 sm:size-8" />
          </h3>
        </span>
      </a>
      <p>{description}</p>
      <ul className="technologies">
        {technologies.split(",").map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </div>
  );
}

const Thumbnail = (
  props: {
    thumbnailHref: string;
    index: number;
  } & HTMLAttributes<HTMLOrSVGElement>
) => (
  <svg
    /* width="417"
    height="433" */
    width="100%"
    viewBox="0 0 417 433"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ aspectRatio: 0.96, ...props.style }}
    className={props.className}
  >
    <mask
      id="mask0_3268_618"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="-1"
      width="417"
      height="434"
    >
      <path
        d="M0.5 36.581C0.5 16.1465 17.0655 -0.418945 37.5 -0.418945H379.5C399.935 -0.418945 416.5 16.1465 416.5 36.5811V262.581C416.5 283.016 399.935 299.581 379.5 299.581H356.549C318.034 299.581 286.976 331.112 287.557 369.622L287.933 394.523C288.245 415.173 271.59 432.081 250.937 432.081H37.5C17.0655 432.081 0.5 415.516 0.5 395.081L0.5 36.581Z"
        fill="#3C3C3C"
      />
    </mask>
    <g mask="url(#mask0_3268_618)">
      <path
        d="M0.5 37.081C0.5 16.6465 17.0655 0.0810547 37.5 0.0810547H379.5C399.935 0.0810547 416.5 16.6465 416.5 37.0811V282.404C416.5 302.838 399.935 319.404 379.5 319.404H356.736C318.149 319.404 287.062 351.048 287.746 389.628L287.832 394.424C288.199 415.113 271.529 432.081 250.837 432.081H37.5C17.0655 432.081 0.5 415.516 0.5 395.081V37.081Z"
        fill={"url(#pattern-" + props.index + ")"}
      />
    </g>
    <rect
      x="303"
      y="315"
      width="114"
      height="114"
      rx="57"
      /* transform="rotate(-90 357.5 483.081)" */
      fill="var(--color-dark-shade)"
    />
    <ArrowUpRightFromSquare className="arrow-upright size-16 fill-light-shade" />

    <defs>
      <pattern
        id={"pattern-" + props.index}
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref={"#thumbnail-image-" + props.index}
          transform="matrix(0.00245499 0 0 0.00236407 -0.192308 0)"
        />
      </pattern>
      <image
        id={"thumbnail-image-" + props.index}
        width="564"
        height="423"
        preserveAspectRatio="xMidYMid slice"
        href={props.thumbnailHref}
      />
    </defs>
  </svg>
);
