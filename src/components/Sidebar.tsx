"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

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
  const [activeSection, setActiveSection] = useState("dashboard");
  const { theme } = useTheme();
  const { user, logout, getUserInitials } = useAuth();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL;
  const initials = getUserInitials(user?.displayName, user?.email);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
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

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

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
      {/* Collapse Toggle Header */}
      <div className={`flex items-center mb-6 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
            Navigation
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-xl transition"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? "⏩" : "⏪"}
        </button>
      </div>

      {/* TOP USER PROFILE SECTION */}
      {user && (
        <div
          className={`mb-6 p-3.5 rounded-2xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800/80 border-slate-700/80"
              : "bg-gray-50 border-gray-200 shadow-sm"
          }`}
        >
          {collapsed ? (
            <div className="flex flex-col items-center justify-center">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow">
                  {initials}
                </div>
              )}
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" title="Online"></div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow">
                    {initials}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" title="Online Status"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{displayName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Active Now
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => scrollToSection("dashboard")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeSection === "dashboard"
              ? "bg-blue-600 text-white shadow-md"
              : theme === "dark"
              ? "hover:bg-slate-800 text-gray-300 hover:text-white"
              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          }`}
        >
          <span className="text-xl">🏠</span>
          {!collapsed && <span>Dashboard</span>}
        </button>

        <button
          onClick={() => scrollToSection("tasks")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeSection === "tasks"
              ? "bg-blue-600 text-white shadow-md"
              : theme === "dark"
              ? "hover:bg-slate-800 text-gray-300 hover:text-white"
              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          }`}
        >
          <span className="text-xl">📋</span>
          {!collapsed && <span>Tasks</span>}
        </button>

        <button
          onClick={() =>
            document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
          }
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
            theme === "dark" ? "hover:bg-slate-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <span className="text-xl">📅</span>
          {!collapsed && <span>Calendar</span>}
        </button>

        <button
          onClick={() => scrollToSection("analytics")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeSection === "analytics"
              ? "bg-blue-600 text-white shadow-md"
              : theme === "dark"
              ? "hover:bg-slate-800 text-gray-300 hover:text-white"
              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          }`}
        >
          <span className="text-xl">📊</span>
          {!collapsed && <span>Analytics</span>}
        </button>

        <button
          onClick={() =>
            document.getElementById("settings")?.scrollIntoView({ behavior: "smooth" })
          }
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
            theme === "dark" ? "hover:bg-slate-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <span className="text-xl">⚙️</span>
          {!collapsed && <span>Settings</span>}
        </button>
      </nav>

      {!collapsed && (
        <>
          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-slate-800 my-6"></div>

          {/* Progress Card */}
          <div
            className={`border rounded-xl p-4 mb-5 ${
              theme === "dark"
                ? "bg-slate-800/60 border-slate-700/80"
                : "bg-gray-50 border-gray-200 shadow-sm"
            }`}
          >
            <h3 className="text-sm font-semibold mb-3">📈 Today's Progress</h3>
            <div
              className={`w-full h-2.5 rounded-full overflow-hidden mb-3 ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            >
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-blue-500 font-bold text-xs mb-3">
              {progress}% Completed
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>📋 Total</span>
                <span className="font-semibold">{totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span>✅ Completed</span>
                <span className="font-semibold">{completedTasks}</span>
              </div>
              <div className="flex justify-between">
                <span>⏳ Remaining</span>
                <span className="font-semibold">{remainingTasks}</span>
              </div>
            </div>
          </div>

          {/* Date Card */}
          <div
            className={`border rounded-xl p-4 mb-5 ${
              theme === "dark"
                ? "bg-slate-800/60 border-slate-700/80"
                : "bg-gray-50 border-gray-200 shadow-sm"
            }`}
          >
            <h3 className="text-xs font-semibold mb-1 uppercase text-gray-400">📅 Today</h3>
            <p className="text-blue-500 font-semibold text-sm">{formattedDate}</p>
          </div>

          {/* Motivation Card */}
          <div
            className={`rounded-xl p-4 mb-5 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-800/50 text-white"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 border border-blue-200"
            }`}
          >
            <h3 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
              <span>🔥</span> Daily Motivation
            </h3>
            <p className="text-xs leading-relaxed italic opacity-90">
              "{randomQuote}"
            </p>
          </div>
        </>
      )}

      {/* BOTTOM LOGOUT BUTTON SECTION */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={() => logout()}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 transition-all duration-200 hover:bg-rose-50 dark:hover:bg-rose-950/50 ${
            collapsed ? "px-2" : ""
          }`}
          title="Sign Out"
        >
          <span className="text-base">🚪</span>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}