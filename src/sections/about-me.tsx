import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Skills from "../components/skills";
import Section from "../components/section";

export default function AboutMe(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Section
      {...props}
      className={twMerge("", props.className)}
      headline="About me"
      deck="Building digital experiences that bridge design and engineering"
    >
      <p className="mini-card">
        My journey into software development began with a curiosity about how
        the web works and quickly grew into a passion for creating meaningful
        digital experiences. Over the years, I've had the opportunity to work on
        diverse projects collaborating with with multiple coworkers and friends
        gaining invaluable lessons and different perspectives. I thrive in
        collaborative environments where ideas turn into real solutions, and I'm
        always eager to learn, adapt, and take on new challenges. When I'm not
        coding, I enjoy experimenting with home-brewed espresso, staying active
        at the gym, and constantly looking for ways to grow both personally and
        professionally.
      </p>
    </Section>
  );
}
