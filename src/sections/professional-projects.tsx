import { useRef, useState, type HTMLAttributes, type RefObject } from "react";
import Carousel from "../components/carousel";
import ProjectsMap from "../components/projects-map";
import { twMerge } from "tailwind-merge";
import { professionalProjectsData, type Project } from "../data";
import useCarousel from "../hooks/use-carousel";
import { formatMonthYear } from "../utils";
import useOnWindowResize from "../hooks/use-on-resize";
import Link from "../components/link";
import CollaborationParagraph from "../components/collaboration-paragraph";

export default function ProfessionalProjects({
  className,
  ...htmlAttributes
}: React.HTMLAttributes<HTMLDivElement>) {
  const [_, rerender] = useState(false);

  const carouselRef = useRef<HTMLUListElement>(null);
  const [page, setPage, pageCount] = useCarousel(carouselRef, {
    scrollTime: 750,
  });

  useOnWindowResize(() => setMaxHeight(carouselRef), {
    onInit: () => setMaxHeight(carouselRef),
  });

  return (
    <section
      className={twMerge(
        "[--projects-map-width:30%] md:[--projects-map-width:328px] ",
        "[&:has(.carousel_.isDragging)_.projects-map]:opacity-100 [&>.carousel>ul.isDragging>.page]:opacity-10",
        "text-balance",
        className
      )}
      {...htmlAttributes}
    >
      <h2>Professional Projects</h2>
      <Carousel
        pages={[
          ...professionalProjectsData.map((project) => (
            <Project
              className="md:pr-[var(--projects-map-width)] z-2 duration-200"
              {...project}
            />
          )),
          <CollaborationParagraph
            className={twMerge(
              carouselContentPadding,
              "md:pr-[var(--projects-map-width)] text-light-shade flex flex-col h-full justify-center"
            )}
          />,
        ]}
        className="drop-shadow-2xl drop-shadow-blue/25 pointer-coarse:min-h-[calc(100vh*0.75)]  min-h-[calc((100vh-var(--header-height))*0.75)] [&>ul]:z-2 [&>ul]:relative"
        carouselRef={carouselRef}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        rerenderSection={() => rerender((prev) => !prev)}
      >
        <ProjectsMap
          className={
            "projects-map pointer-events-none h-[calc(100%-4rem)] w-full mb-5 inset-0 0 opacity-5 absolute" +
            " md:w-[var(--projects-map-width)] md:top-0 md:bottom-0 md:right-0 md:h-full md:left-auto md:opacity-100 " +
            " m-auto text-main-brand  fill-main-brand select-none map rounded-2xl z-1"
          }
          carouselRef={carouselRef}
        />
      </Carousel>
    </section>
  );
}

const carouselContentPadding = "lg:py-20 lg:pl-16 md:py-16 md:px-12 py-8 px-5";

const Project = (props: Project & HTMLAttributes<HTMLDivElement>) => {
  const { projectDescription, technologies, id } = props;
  return (
    <div
      id={id}
      className={twMerge(
        "h-full w-full text-light-shade scroll-mt-[calc(5rem+6rem)]",
        carouselContentPadding,
        props.className
      )}
    >
      <div>
        <ProjectPill {...props} />
        <p className="mt-8 text-white/80">{projectDescription}</p>
      </div>
      <ul className="technologies">
        {technologies.split(",").map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </div>
  );
};

const ProjectPill = ({
  title,
  role,
  projectLogo,
  projectHref,
  startDate,
  endDate,
  employerLogo,
  employerHref,
}: Project) => (
  <div className="flex flex-wrap  justify-between gap-5 items-center  w-full">
    <div className="flex gap-3 items-center">
      <div className="flex size-20 items-center content-center bg-light-shade rounded-xs  shrink-0 ">
        {projectLogo}
      </div>
      <div className="flex flex-col gap-2 lg:gap-0 justify-around h-full">
        <Link draggable={false} href={projectHref} target="_blank">
          <h3 className="flex  m-0  hover:cursor-pointer hover:underline">
            {title}
          </h3>
        </Link>

        <h4 className="font-tertiary mb-0">{role}</h4>
      </div>
    </div>
    <div className="h-full items-start flex flex-col gap-2 justify-around">
      <a
        className="block [&_:first-child]:w-30"
        href={employerHref}
        target="_blank"
        draggable={false}
      >
        {employerLogo}
      </a>

      <h4 className="font-tertiary mb-0">
        {formatMonthYear(startDate)} - {formatMonthYear(endDate)}
      </h4>
    </div>
  </div>
);

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
      (max = child.getBoundingClientRect().height)
  );

  carouselRef.current.parentElement!.style.setProperty(
    "--projects-map-height",
    `calc(100% - ${max}px)`
  );
}
