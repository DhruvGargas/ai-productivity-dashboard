"use client";

import { useTheme } from "@/context/ThemeContext";

type DashboardCardProps = {
  icon: string;
  title: string;
  value: string;
};

export default function DashboardCard({
  icon,
  title,
  value,
}: DashboardCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`w-64 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="text-5xl text-center">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-center mt-4">
        {title}
      </h3>

      <p className="text-4xl font-bold text-center mt-4 text-blue-500">
        {value}
      </p>
    </div>
  );
}