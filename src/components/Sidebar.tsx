"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type SidebarProps = {
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;
  progress: number;
};

export default function Sidebar({
  totalTasks,
  completedTasks,
  remainingTasks,
  progress,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const scrollToSection = (id: string) => {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const quotes = [
    "Small progress is still progress.",
    "Success is built one task at a time.",
    "Stay focused and never give up.",
    "Discipline beats motivation.",
    "Dream big. Start small. Act now.",
    "Your future is created by what you do today.",
  ];

  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <aside
  className={`${
    collapsed ? "w-24" : "w-72"
  } min-h-screen transition-all duration-300 flex flex-col px-5 py-6 ${
    theme === "dark"
      ? "bg-slate-900 border-r border-slate-800 text-white"
      : "bg-white border-r border-gray-200 text-gray-900"
  }`}
>
      {/* Collapse Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-2xl hover:text-blue-400 transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-400">
          {collapsed ? "🚀" : "🚀 Productivity"}
        </h1>

        {!collapsed && (
          <p className="text-gray-400 text-sm mt-2">
            Stay focused. Stay productive.
          </p>
        )}
      </div>

      {/* Navigation */}
<nav className="flex flex-col gap-3">

  <button
  onClick={() => scrollToSection("dashboard")}
  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-700 transition"
>
  <span className="text-xl">🏠</span>
  {!collapsed && <span>Dashboard</span>}
</button>

  <button
  onClick={() => scrollToSection("tasks")}
  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-gray-100"
  }`}
>
  <span className="text-xl">📋</span>
  {!collapsed && <span>Tasks</span>}
</button>

  <button
  onClick={() => scrollToSection("calendar")}
  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-gray-100"
  }`}
>
  <span className="text-xl">📅</span>
  {!collapsed && <span>Calendar</span>}
</button>

  <button
  onClick={() => scrollToSection("analytics")}
  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-gray-100"
  }`}
>
  <span className="text-xl">📊</span>
  {!collapsed && <span>Analytics</span>}
</button>

  <button
  onClick={() => scrollToSection("settings")}
  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    theme === "dark"
      ? "hover:bg-slate-800"
      : "hover:bg-gray-100"
  }`}
>
  <span className="text-xl">⚙️</span>
  {!collapsed && <span>Settings</span>}
</button>

</nav>

      {!collapsed && (
        <>
          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* Progress Card */}
<div
  className={`border rounded-xl p-5 mb-6 ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700"
      : "bg-gray-50 border-gray-300"
  }`}
>

  <h3 className="text-lg font-semibold mb-4">
    📈 Today's Progress
  </h3>

  <div
    className={`w-full h-3 rounded-full overflow-hidden mb-4 ${
      theme === "dark"
        ? "bg-slate-700"
        : "bg-gray-300"
    }`}
  >
    <div
      className="h-full bg-blue-500 transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <p className="text-center text-blue-500 font-bold mb-4">
    {progress}% Completed
  </p>

  <div className="space-y-2 text-sm">

    <div className="flex justify-between">
      <span>📋 Total</span>
      <span>{totalTasks}</span>
    </div>

    <div className="flex justify-between">
      <span>✅ Completed</span>
      <span>{completedTasks}</span>
    </div>

    <div className="flex justify-between">
      <span>⏳ Remaining</span>
      <span>{remainingTasks}</span>
    </div>

  </div>

</div>

          {/* Date Card */}
<div
  className={`border rounded-xl p-5 mb-6 ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700"
      : "bg-gray-50 border-gray-300"
  }`}
>

  <h3 className="text-lg font-semibold mb-3">
    📅 Today
  </h3>

  <p className="text-blue-500 font-semibold">
    {formattedDate}
  </p>

</div>

          {/* Motivation Card */}
<div
  className={`rounded-xl p-5 mb-6 ${
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      : "bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-900 border border-blue-200"
  }`}
>
  <h3 className="text-lg font-semibold mb-3">
    🔥 Daily Motivation
  </h3>

  <p
    className={`text-sm leading-6 italic ${
      theme === "dark"
        ? "text-gray-100"
        : "text-gray-700"
    }`}
  >
    "{randomQuote}"
  </p>
</div>
        </>
      )}

      {/* Help Card */}
{!collapsed && (
  <div className="mt-auto">
    <div
      className={`rounded-xl p-5 border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-300 shadow-md"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-2 ${
          theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        ❓ Need Help?
      </h3>

      <p
        className={`text-sm mb-4 ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        Learn how to use your productivity dashboard.
      </p>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
        Help Center
      </button>
    </div>
  </div>
)}
    </aside>
  );
}