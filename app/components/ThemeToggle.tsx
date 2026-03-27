"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-300">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
