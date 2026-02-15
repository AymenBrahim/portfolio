import { useRef } from "react";
import Carousel from "../components/carousel";
import ProjectsMap from "../components/projects-map";
import { twMerge } from "tailwind-merge";
import { professionalProjectsData } from "../data";
import useCarousel from "../hooks/use-carousel";
import CollaborationParagraph from "../components/collaboration-paragraph";
import ProfessionalProject from "../components/professional-project";
import Section from "../components/section";
export default function ProfessionalProjects({
  className,
  ...htmlAttributes
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const carouselControls = useCarousel(carouselRef, {
    scrollTime: 500,
  });

  return (
    <Section
      className={twMerge(
        className,
        "[--projects-map-width:30%] lg:[--projects-map-width:328px]  max-lg:[&:has(.carousel>ul:is(.is-dragging,.is-scrolling))_.projects-map]:opacity-100  max-lg:[&>.carousel>ul:is(.is-dragging,.is-scrolling)>li]:opacity-10 text-balance",
      )}
      headline="Professional Projects"
      deck="Key professional projects"
      {...htmlAttributes}
    >
      <Carousel
        pages={[
          ...professionalProjectsData.map((project) => (
            <ProfessionalProject
              className="lg:pr-[var(--projects-map-width)] z-2"
              project={project}
              carouselRef={carouselRef}
            />
          )),
          <CollaborationParagraph
            className={twMerge(
              "lg:mr-[var(--projects-map-width)] my-auto ml-1",
            )}
          />,
        ]}
        className="card"
        carouselRef={carouselRef}
        carouselControls={carouselControls}
        // rerenderSection={() => rerender((prev) => !prev)}
      >
        <ProjectsMap
          className={
            "projects-map pointer-events-none h-[calc(100%-4rem)] w-full mb-5 inset-0 0 opacity-5 absolute lg:w-[var(--projects-map-width)] lg:top-0 lg:bottom-0 lg:right-0 lg:h-full lg:left-auto lg:opacity-100 m-auto text-tertiary fill-teal select-none map rounded-2xl z-1"
          }
          pageProgress={carouselControls.pageProgress}
        />
      </Carousel>
    </Section>
  );
}
