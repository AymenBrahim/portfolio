import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Resolve system preference

  useEffect(() => {
    (() => {
      const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
        setThemeClass(storedTheme);
        return;
      }

      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
        setThemeClass("light");
        return;
      }

      setTheme("dark");
      setThemeClass("dark");
    })();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setThemeClass(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  return [theme, toggleTheme] as const;
}

function setThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark" && root.classList.contains("light")) {
    root.classList.remove("light");
  } else if (theme === "light" && root.classList.contains("dark")) {
    root.classList.remove("dark");
  }
  root.classList.add(theme);
  root.classList.add(theme);
}
