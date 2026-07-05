"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-8 py-5 shadow-md transition-all duration-300 ${
        theme === "dark"
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-900 border-b border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold">
        🤖 AI Productivity Dashboard
      </h2>

      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-xl font-semibold transition ${
          theme === "dark"
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {theme === "dark"
          ? "☀️ Light Mode"
          : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}