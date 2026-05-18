"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const handleToggle = () => {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  return (
    <Button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="w-full sm:w-auto"
      variant="secondary"
      onClick={handleToggle}
    >
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
