import type { HTMLAttributes } from "react";
import Portrait from "../components/portrait";
import { twMerge } from "tailwind-merge";
import CTA from "../components/cta";
import H1 from "../components/h1";
import Section from "../components/section";
import "./hero.css";
export default function Hero(props: HTMLAttributes<HTMLElement>) {
  return (
    <Section
      {...props}
      className={twMerge("hero-section with-bottom-separator", props.className)}
    >
      <div className="card">
        <H1 />
        <h2>A Fullstack Developer</h2>

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
      <div className="portrait-container">
        <Portrait />
      </div>
    </Section>
  );
}
