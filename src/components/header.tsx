import "./header.css";
import { navigationData } from "../data";
import { useScrollSpyNavigation } from "../hooks/use-scroll-spy-navigation";
import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";

export default function Header() {
  useScrollSpyNavigation();

  return (
    <header id="header">
      <DesktopMenu items={navigationData} />
      <MobileMenu items={navigationData} />
    </header>
  );
}
