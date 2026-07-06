"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
type Task = {
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
  createdAt: number;
};

type AnalyticsProps = {
  tasks: Task[];
  completedTasks: number;
  remainingTasks: number;
  progress: number;
  focusTime: string;
};

export default function Analytics({
  tasks,
  completedTasks,
  remainingTasks,
  progress,
  focusTime,
}: AnalyticsProps) {
  const { theme } = useTheme();
  const productivityScore = Math.min(
  100,
  Math.round(progress * 0.8 + completedTasks * 5)
);
const categoryData = Object.entries(
  tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([category, count]) => ({
  category,
  count,
}));
const pieData = [
  {
    name: "Completed",
    value: completedTasks,
  },
  {
    name: "Remaining",
    value: remainingTasks,
  },
];
const COLORS = ["#22c55e", "#f59e0b"];
  return (
    <section
  id="analytics"
  className={`mt-20 transition-all duration-300 ${
    theme === "dark"
      ? "text-white"
      : "text-gray-900"
  }`}
>

      <h2 className="text-3xl font-bold mb-8">
        📊 Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div
  className={`rounded-xl p-6 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
          <h3
  className={
    theme === "dark"
      ? "text-gray-400"
      : "text-gray-600"
  }
>
            Total Tasks
          </h3>

          <p className="text-4xl font-bold mt-3">
            {tasks.length}
          </p>
        </div>

        <div
  className={`rounded-xl p-6 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
          <h3
  className={
    theme === "dark"
      ? "text-gray-400"
      : "text-gray-600"
  }
>
            Completed
          </h3>

          <p className="text-4xl font-bold mt-3 text-green-400">
            {completedTasks}
          </p>
        </div>

        <div
  className={`rounded-xl p-6 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
          <h3
  className={
    theme === "dark"
      ? "text-gray-400"
      : "text-gray-600"
  }
>
            Remaining
          </h3>

          <p className="text-4xl font-bold mt-3 text-yellow-400">
            {remainingTasks}
          </p>
        </div>

        <div
  className={`rounded-xl p-6 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
          <h3
  className={
    theme === "dark"
      ? "text-gray-400"
      : "text-gray-600"
  }
>
            Completion Rate
          </h3>

          <p className="text-4xl font-bold mt-3 text-blue-400">
            {progress}%
          </p>
        </div>

      </div>

      <div
  className={`rounded-xl p-6 mt-8 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>

        <h3
  className={`text-xl font-semibold mb-4 ${
    theme === "dark"
      ? "text-white"
      : "text-gray-900"
  }`}
>
  ⏰ Focus Time
</h3>

        <p
  className={`text-5xl font-bold ${
    theme === "dark"
      ? "text-blue-400"
      : "text-blue-600"
  }`}
>
          {focusTime}
        </p>

      </div>
      <div
  className={`rounded-xl p-6 mt-8 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
  <h3
    className={`text-xl font-semibold mb-4 ${
      theme === "dark"
        ? "text-white"
        : "text-gray-900"
    }`}
  >
    🏆 Productivity Score
  </h3>

  <div className="flex items-center justify-between">

    <div>
      <p
        className={`text-6xl font-bold ${
          productivityScore >= 80
            ? "text-green-500"
            : productivityScore >= 50
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {productivityScore}
      </p>

      <p
        className={`mt-2 ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        out of 100
      </p>
    </div>

    <div className="text-6xl">
      {productivityScore >= 80
        ? "🏆"
        : productivityScore >= 50
        ? "🔥"
        : "💪"}
    </div>

  </div>

  <div className="mt-5">
  <div className="w-full h-3 rounded-full bg-gray-300 overflow-hidden">
    <div
      className={`h-full transition-all duration-700 ${
        productivityScore >= 80
          ? "bg-green-500"
          : productivityScore >= 50
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{
        width: `${productivityScore}%`,
      }}
    />
  </div>
</div>

</div> {/* ← Closes the Productivity Score card */}

<div
  className={`rounded-xl p-6 mt-8 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800"
      : "bg-white shadow-md border border-gray-200"
  }`}
>
  <h3
    className={`text-2xl font-bold mb-6 ${
      theme === "dark"
        ? "text-white"
        : "text-gray-900"
    }`}
  >
    📊 Task Completion
  </h3>

  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label
        >
          {pieData.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

</section>
  );
}