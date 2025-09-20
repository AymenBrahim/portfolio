import type { HTMLAttributes } from "react";
import Portrait from "../components/portrait";
import { twMerge } from "tailwind-merge";
import CTA from "../components/cta";

export default function Hero(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      {...props}
      className={twMerge(
        "flex flex-col-reverse  with-bottom-separator lg:flex-row lg:gap-16",
        props.className
      )}
    >
      <div className="flex flex-col justify-center lg:max-w-1/2 lg:min-w-[35.5rem]">
        <h1 className="text-dark-shade">
          Hi I am <span className="rainbow-text">Aymen Brahim</span>
        </h1>
        <h2 className="text-main-brand font-tertiary font-black text-2xl uppercase tracking-wide m-0 text-shadow-none">
          A Fullstack developer
        </h2>

        <p>
          Passionate about crafting pixel-perfect UIs that result in engaging,
          interactive user experiences. I focus on building interfaces that not
          only look great but are seamlessly paired with backend systems
          meticulously engineered for performance. By balancing design precision
          with technical depth, I aim to deliver products that are both visually
          pleasing and highly scalable.
        </p>
        <CTA className="lg:justify-start" />
      </div>
      <div className="md:grow ">
        <Portrait
          className="grow max-h-96 mx-auto text-orange drop-shadow-xl w-full
       lg:max-h-full  lg:max-w-xl aspect-square 
      "
        />
      </div>
    </section>
  );
}
