"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import Analytics from "@/components/Analytics";
import CalendarView from "@/components/CalendarView";
import Settings from "@/components/Settings";

type Task = {
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
  createdAt: number;
};

const defaultTasks: Task[] = [
  {
    text: "🚶 Total Steps - 10,000",
    completed: false,
    dueDate: "",
    category: "Personal",
    createdAt: Date.now(),
  },
  {
    text: "📚 Study Time - 4 Hours",
    completed: false,
    dueDate: "",
    category: "Study",
    createdAt: Date.now() + 1,
  },
  {
    text: "🏋️ Go to Gym",
    completed: false,
    dueDate: "",
    category: "Gym",
    createdAt: Date.now() + 2,
  },
  {
    text: "🌅 Wake Up Early (6:00 AM)",
    completed: false,
    dueDate: "",
    category: "Personal",
    createdAt: Date.now() + 3,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const remainingTasks = tasks.length - completedTasks;
  const focusMinutes = completedTasks * 30;

const focusTime =
  focusMinutes >= 60
    ? `${Math.floor(focusMinutes / 60)} Hour${
        Math.floor(focusMinutes / 60) > 1 ? "s" : ""
      } ${focusMinutes % 60 !== 0 ? `${focusMinutes % 60} Min` : ""}`.trim()
    : `${focusMinutes} Min`;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const dashboardData = [
    {
      icon: "📋",
      title: "Tasks",
      value: tasks.length.toString(),
    },
    {
    icon: "⏰",
    title: "Focus Time",
    value: focusTime,
    },
    {
      icon: "✅",
      title: "Completed",
      value: completedTasks.toString(),
    },
    {
      icon: "📊",
      title: "Progress",
      value: `${progress}%`,
    },
  ];

  if (!isLoaded) {
    return null;
  }

  return (
  <>
      <Navbar/>

      <main
  className={`flex min-h-screen transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-950 text-white"
      : "bg-gray-100 text-gray-900"
  }`}
>
        <Sidebar
  totalTasks={tasks.length}
  completedTasks={completedTasks}
  remainingTasks={remainingTasks}
  progress={progress}
    />

        <div
  className={`flex-1 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-950"
      : "bg-gray-100"
  }`}
>
          <HeroSection />

          <section className="px-10 pb-10">
            

            <>
  <div className="mt-10 mb-10">
    <div
  className={`flex justify-between mb-2 ${
    theme === "dark"
      ? "text-white"
      : "text-gray-900"
  }`}
>
      <span className="font-semibold">
        Progress
      </span>

      <span className="font-semibold">
        {progress}%
      </span>
    </div>
<div
  className={`w-full h-4 rounded-full overflow-hidden ${
    theme === "dark"
      ? "bg-slate-700"
      : "bg-gray-300"
  }`}
>
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  </div>

  <TaskList
    tasks={tasks}
    setTasks={setTasks}
    completedTasks={completedTasks}
    remainingTasks={remainingTasks}
  />
</>
<Analytics
  tasks={tasks}
  completedTasks={completedTasks}
  remainingTasks={remainingTasks}
  progress={progress}
  focusTime={focusTime}
/>
<CalendarView tasks={tasks} />
<Settings
  tasks={tasks}
  setTasks={setTasks}
  defaultTasks={defaultTasks}
/>
          </section>

          <Footer />
        </div>
            </main>
    </>
  );
}