"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";

type Task = {
  text: string;
  completed: boolean;
};

const defaultTasks: Task[] = [
  {
    text: "🚶 Total Steps - 10,000",
    completed: false,
  },
  {
    text: "📚 Study Time - 4 Hours",
    completed: false,
  },
  {
    text: "🏋️ Go to Gym",
    completed: false,
  },
  {
    text: "🌅 Wake Up Early (6:00 AM)",
    completed: false,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

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
      <Navbar />

      <main className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1">
          <HeroSection />

          <section className="px-10 pb-10">
            <h2 className="text-3xl font-bold mb-8">
              Today's Overview
            </h2>

            <div className="flex flex-wrap gap-6">
              {dashboardData.map((card) => (
                <DashboardCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </div>

            <TaskList
            tasks={tasks}
            setTasks={setTasks}
            completedTasks={completedTasks}
            remainingTasks={remainingTasks}
            />
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}