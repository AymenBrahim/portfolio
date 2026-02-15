import { personalProjectsData, professionalProjectsData } from "../data";
import { getCSSVariableValue, remToPx, animateValue } from "../utils";

export async function handleHashNavigation(
  e: React.MouseEvent<HTMLAnchorElement | HTMLUListElement, MouseEvent>,
  closeMenu?: () => Promise<boolean>,
) {
  e.preventDefault();
  const target = (e.target as HTMLElement).closest("a") as HTMLAnchorElement;
  if (!target || !target.href) {
    return;
  }
  const url = new URL(target.href);
  const id = url.hash?.slice(1);

  if (!id) {
    return;
  }
  const section = document.getElementById(id);
  if (!section) return; // Guard

  


  if (closeMenu) {
    await closeMenu();
  }

  if (await isProfessionalProject(id, e)) {
    return;
  }
  if (await isPersonalProject(id, e)) {
    return;
  }

  const headerOffset = getHeaderOffset();
  const targetScroll =
    window.scrollY + section.getBoundingClientRect().top - headerOffset;

  await animateValue(
    targetScroll,
    400,
    window.scrollY,
    (scroll: number) =>{
      window.scrollTo({
        top: scroll,
        behavior: "instant",
      })
    }
  );
}

async function isProfessionalProject(
  id: string,
  e: React.MouseEvent<HTMLAnchorElement | HTMLUListElement, MouseEvent>,
) {
  const index = professionalProjectsData.reduce(
    (acc, curr, i) => (acc !== -1 ? acc : curr.id === id ? i : -1),
    -1,
  );

  if (index === -1) {
    return false;
  }


  e.preventDefault();
  const professionalProjectsSection = document.getElementById(
    "professional-projects",
  )!;

  const headerOffset = getHeaderOffset();
  await animateValue(
    window.scrollY +
      professionalProjectsSection.getBoundingClientRect().top -
      headerOffset,
    250,
    window.scrollY,
    (scroll: number) =>
      window.scrollTo({
        top: scroll,
        behavior: "instant",
      }),
  );

  const carouselContainer = document.getElementById(
    professionalProjectsData[index].id,
  )?.parentElement?.parentElement;

  if (carouselContainer) {
    const carouselWidth = carouselContainer.getBoundingClientRect().width;

    await animateValue(
      index * carouselWidth,
      250,
      carouselContainer.scrollLeft,
      (value) => (carouselContainer.scrollLeft = value),
    );
  }

  return true;
}

async function isPersonalProject(
  id: string,
  e: React.MouseEvent<HTMLAnchorElement | HTMLUListElement, MouseEvent>,
) {
  const index = personalProjectsData.reduce(
    (acc, curr, i) => (acc !== -1 ? acc : curr.id === id ? i : -1),
    -1,
  );

  if (index === -1) {
    return false;
  }
  e.preventDefault();
  const personalProjectsSection = document.getElementById("personal-projects")!;

  const navigationItems =
    personalProjectsSection.children.item(1)!.firstElementChild!
      .firstElementChild!.firstElementChild!.children;
  const tabsContainer = personalProjectsSection.children
    .item(1)!
    .firstElementChild!.children.item(1)!;
  const tabs = tabsContainer.children;

  const headerOffset = getHeaderOffset();
  // if(closeMenu) await closeMenu()

  await animateValue(
    window.scrollY +
      personalProjectsSection.getBoundingClientRect().top -
      headerOffset,
    250,
    window.scrollY,
    (scroll: number) =>
      window.scrollTo({
        top: scroll,
        behavior: "instant",
      }),
  );
  if (tabs.item(index)?.classList.contains("active")) {
    return true;
  }

  for (let i = 0; i < tabs.length; i++) {
    tabs.item(i)?.classList.remove("active");
    navigationItems.item(i)?.classList.remove("active");
  }
  tabs.item(index)?.classList.add("active");
  navigationItems.item(index)?.classList.add("active");
  tabsContainer.scrollLeft = 0;

  return true;
}

function getHeaderOffset() {
  const headerOffsetInRem = parseFloat(
    getCSSVariableValue("--header-height") || "5",
  );
  return remToPx(headerOffsetInRem);
}
