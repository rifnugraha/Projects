"use client";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({
  theme,
  toggle,
}: {
  theme: string;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border bg-white/10 dark:bg-black/20 border-white/20 text-black dark:text-white shadow-lg transition-all active:scale-95"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
