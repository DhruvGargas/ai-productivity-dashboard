"use client";

import { useState } from "react";

export default function TaskList() {
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

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Today's Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            onClick={() => toggleTask(index)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:bg-slate-700 hover:scale-[1.01] transition-all duration-200 flex items-center gap-4 cursor-pointer"
          >
            <span className="text-2xl">
              {task.completed ? "☑" : "☐"}
            </span>

            <span
              className={`text-lg font-medium ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-white"
              }`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}