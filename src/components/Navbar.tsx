"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, getUserInitials } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL;
  const initials = getUserInitials(user?.displayName, user?.email);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSettings = () => {
    setDropdownOpen(false);
    document.getElementById("settings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-6 lg:px-8 py-4 shadow-md transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-white border-b border-slate-800"
          : "bg-white text-gray-900 border-b border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight flex items-center gap-2">
          <span>🤖</span>
          <span className="hidden sm:inline">AI Productivity Dashboard</span>
          <span className="sm:hidden">AI Dashboard</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* User Profile Dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
              }`}
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow">
                  {initials}
                </div>
              )}
              <span className="text-sm font-semibold hidden md:inline max-w-[120px] truncate">
                {displayName}
              </span>
              <span className="text-xs opacity-70">▼</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl py-2 border z-50 transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-800 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                {/* User Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                  <p className="text-sm font-bold truncate">{displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>

                {/* Dropdown Links */}
                <div className="py-1">
                  <button
                    onClick={scrollToSettings}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition ${
                      theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <span>⚙️</span>
                    <span>Profile & Settings</span>
                  </button>
                </div>

                {/* Logout Action */}
                <div className="border-t border-gray-200 dark:border-slate-800 pt-1">
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 font-semibold flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}