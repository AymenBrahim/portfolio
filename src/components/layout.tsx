import type { HTMLAttributes } from "react";
import Header from "./header";

type Section = React.ReactElement<HTMLAttributes<HTMLDivElement>, "section">;

export default function Layout({ children }: { children: Section[] }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer></footer>
      <div className="global-bubble"></div>
    </>
  );
}
