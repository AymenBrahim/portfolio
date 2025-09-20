import { animated, Interpolation, SpringValue } from "@react-spring/web";
import {
  Fragment,
  useRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { twMerge } from "tailwind-merge";
import { professionalProjectsData, waypointsData } from "../data";
import { calculateAngle, clamp, mapValue } from "../utils";
import { useCarouselScrollProgress } from "../hooks";
//add class merge to all exported components
export type Waypoint = {
  animatedText: (withAnimation?: boolean) => ReactNode;
  dashoffset: number;
};
type ProjectsMapProps = {
  className?: string;
  carouselRef: RefObject<HTMLUListElement | null>;
};

export default function ProjectsMap(props: ProjectsMapProps) {
  const { carouselRef } = props;
  const pathRef = useRef<SVGPathElement>(null);
  const page = useCarouselScrollProgress(carouselRef);
  const pageProgress = new SpringValue(page);
  const cursorPosition = getCursorPosition(pathRef, pageProgress);
  const cursor = (
    <>
      <animated.image
        href="/meteor.svg"
        style={{
          rotateZ: cursorPosition.zRot,
          translateY: -3,
          translateX: -3,
          x: cursorPosition.waypointX,
          y: cursorPosition.waypointY,
          background: "red",
        }}
        width="6"
        height="6"
      />
    </>
  );

  const strokeDashOffset = (isHeighlight?: boolean) =>
    pageProgress.to((currentPage) => {
      if (currentPage <= waypointsData.length - 2 && isHeighlight) {
        return waypointsData[waypointsData.length - 2].dashoffset;
      }
      return getCurrentStrokeDashoffset(currentPage);
    });

  const waypoints = waypointsData.map(
    (
      { dashoffset, svgText, svgTextTranslateX, svgTextTranslateY },
      waypointIndex
    ) => ({
      dashoffset,
      animatedText: (withAnimation = false) => {
        return (
          <AnimatedText
            x={
              getAnimatedTextPosition(pathRef, pageProgress, waypointIndex)
                .waypointX
            }
            y={
              getAnimatedTextPosition(pathRef, pageProgress, waypointIndex)
                .waypointY
            }
            opacity={getOpacity(pageProgress, waypointIndex, withAnimation)}
            text={
              waypointIndex === waypointsData.length - 1
                ? svgText
                : professionalProjectsData[waypointIndex].title
            }
            translateX={svgTextTranslateX}
            translateY={svgTextTranslateY}

            /* fontSize={getFontsize(waypointIndex)} */
            /* onClick={() => goToPage(waypointIndex)} */
          />
        );
      },
    })
  );
  return (
    <Map
      {...props}
      waypoints={waypoints}
      cursor={cursor}
      pathRef={pathRef}
      strokeDashOffset={strokeDashOffset}
    >
      <HighlightMap waypoints={waypoints} strokeDashOffset={strokeDashOffset} />
    </Map>
  );
}

type MapProps = {
  waypoints: Waypoint[];
  cursor: ReactNode;
  strokeDashOffset: (isHeighlight?: boolean) => Interpolation<number, number>;
  pathRef: RefObject<SVGPathElement | null>;
} & HTMLAttributes<HTMLDivElement>;

function Map({
  children,
  waypoints,
  pathRef,
  strokeDashOffset,
  cursor,
  className,
}: MapProps) {
  return (
    <div
      className={twMerge(
        "relative text-popover-foreground max-h-[80vh] ease-linear duration-500",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="map h-full w-full highlight"
        viewBox={"-20.1908 -33 37.38 71"}
      >
        <animated.path
          d="M0-30C-53-19 45-10 0 0-41 9 37 13 0 21-28 27 25 31 0 36"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={154}
          strokeDashoffset={-37.5}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDashoffset: strokeDashOffset(),
          }}
          ref={pathRef}
        />

        {waypoints.map((waypoint, i) => (
          <Fragment key={`map-${i}`}>{waypoint.animatedText()}</Fragment>
        ))}
        {cursor}
      </svg>
      {children}
    </div>
  );
}

function HighlightMap({
  strokeDashOffset,
  waypoints,
}: Pick<MapProps, "waypoints" | "strokeDashOffset">) {
  return (
    <svg
      className="highlight-map  highlight absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"-20.1908 -33 37.38 71"}
    >
      <animated.path
        d="M0-30C-53-19 45-10 0 0-41 9 37 13 0 21-28 27 25 31 0 36"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray={154}
        strokeDashoffset={-154}
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDashoffset: strokeDashOffset(true),
          opacity: 0.25,
        }}
      />
      {waypoints.map((waypoint, i) => (
        <Fragment key={`map-highlight-${i}`}>
          {waypoint.animatedText(true)}
        </Fragment>
      ))}
    </svg>
  );
}

type AnimatedTextProps = {
  x: number | Interpolation<number, number>;
  y: number | Interpolation<number, number>;
  text: string;
  opacity: number | Interpolation<number, number>;
  translateX?: number;
  translateY?: number;
  fontSize?: Interpolation<number, number>;
  onClick?: MouseEventHandler<SVGTextElement>;
};
function AnimatedText(props: AnimatedTextProps) {
  const { text, x, y, opacity, translateX, translateY, fontSize, onClick } =
    props;
  return (
    <>
      <animated.text
        x={x}
        y={y}
        className={`text-[2.5px] font-bold text-dark-accent shadow-popover font-secondary lg:cursor-pointer`}
        style={{
          opacity,
          translateX,
          translateY,
          fontSize,
        }}
        color="currentColor"
        onClick={onClick}
      >
        {text}
      </animated.text>
    </>
  );
}
function getCurrentStrokeDashoffset(currentPage: number) {
  if (!currentPage || currentPage <= 0) {
    return -153;
  }

  if (currentPage >= waypointsData.length - 1) {
    return 0;
  }
  const floor = Math.floor(currentPage);
  const ceil = Math.ceil(currentPage);

  if (ceil === floor) {
    return waypointsData[ceil].dashoffset;
  }

  return mapValue(
    currentPage,
    floor,
    ceil,
    waypointsData[floor].dashoffset,
    waypointsData[ceil].dashoffset
  );
}

function getAnimatedTextPosition(
  pathRef: React.RefObject<SVGPathElement | null>,
  currentPage: SpringValue<number>,
  waypointIndex: number
) {
  if (waypointIndex < waypointsData.length - 1) {
    return waypointsData[waypointIndex];
  }

  return getCursorPosition(pathRef, currentPage);
}

function getCursorPosition(
  pathRef: React.RefObject<SVGPathElement | null>,
  currentPage: SpringValue<number>
) {
  const y = currentPage.to((currentPage) => {
    return (
      pathRef.current?.getPointAtLength(
        -getCurrentStrokeDashoffset(currentPage)
      ).y || waypointsData[0].waypointY
    );
  });

  const xPos = currentPage.to((currentPage) => {
    return (
      pathRef.current?.getPointAtLength(
        -getCurrentStrokeDashoffset(currentPage)
      ).x || waypointsData[0].waypointX
    );
  });

  const zRot = currentPage.to((currentPage) => {
    if (!pathRef.current) {
      return 213.49915815760707;
    }
    const delta = -0.1;
    const cursorPosition = pathRef.current?.getPointAtLength(
      -getCurrentStrokeDashoffset(currentPage)
    );
    const nextPosition = pathRef.current.getPointAtLength(
      -(getCurrentStrokeDashoffset(currentPage) + delta)
    );
    const angle = calculateAngle(
      nextPosition.x,
      nextPosition.y,
      cursorPosition.x,
      cursorPosition.y
    );
    return angle + 45;
  });

  return { waypointX: xPos, waypointY: y, zRot };
}

function getOpacity(
  currentPage: SpringValue<number>,
  waypointIndex: number,
  withAnimation: boolean
) {
  if (waypointIndex === waypointsData.length - 1) {
    return currentPage.to((page) => {
      if (page <= waypointIndex - 1) {
        return 0;
      }

      return mapValue(page, waypointIndex - 1, waypointIndex, 0, 1);
    });
  }

  if (!withAnimation) {
    return 0.4;
  }

  return currentPage.to((page) => {
    if (page >= waypointIndex + 1) {
      return 0;
    }

    if (page >= waypointIndex && page <= waypointIndex + 1) {
      const fadeClampedX = clamp(page, waypointIndex, waypointIndex + 1);
      return mapValue(fadeClampedX, waypointIndex, waypointIndex + 1, 1, 0);
    }

    const clampedX = clamp(page, waypointIndex - 1, waypointIndex);
    return mapValue(clampedX, waypointIndex - 1, waypointIndex, 0, 1);
  });
}
