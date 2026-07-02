"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([
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
  ]);

  const completedTasks = tasks.filter((task) => task.completed).length;
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
      value: "3 Hours",
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
/>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}