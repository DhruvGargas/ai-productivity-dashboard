"use client";

import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
   <section
  id="dashboard"
  className={`flex flex-col items-center justify-center text-center px-8 min-h-[85vh] transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Welcome Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Welcome 👋
      </h1>

      {/* Subtitle */}
      <p
        className={`text-xl max-w-2xl leading-8 mb-10 ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        Your AI Productivity Dashboard is ready to help you organize
        tasks, stay focused, and achieve your daily goals.
      </p>

      {/* Button */}
      <button
  onClick={() => {
    document
      .getElementById("tasks")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 mt-8"
>
  💪Start Planning
</button>
    </section>
  );
}