import type { HTMLAttributes } from "react";
import Skills from "../components/skills";
import { twMerge } from "tailwind-merge";

export default function AboutMe(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      {...props}
      className={twMerge("bg-dark-shade text-light-shade", props.className)}
    >
      <h2>About me</h2>
      <p>
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
      <h2 className="mt-2.5 md:mt-3 lg:mt-4">My skill set</h2>
      <Skills />
    </section>
  );
}
