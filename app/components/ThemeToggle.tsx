"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
        <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-300">
          light_mode
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-xl text-slate-600 dark:text-slate-300">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
