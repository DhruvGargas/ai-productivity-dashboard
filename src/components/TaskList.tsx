"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: number;
  remainingTasks: number;
};

export default function TaskList({
  tasks,
  setTasks,
  completedTasks,
  remainingTasks,
}: TaskListProps) {
  const [newTask, setNewTask] = useState("");

  const toggleTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task: Task = {
      text: newTask,
      completed: false,
    };

    setTasks((prevTasks) => [task, ...prevTasks]);

    setNewTask("");
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Today's Tasks
      </h2>
      <div className="flex flex-wrap gap-6 mb-6 text-sm">
  <span className="text-blue-400 font-semibold">
    📋 Total: {tasks.length}
  </span>

  <span className="text-green-400 font-semibold">
    ✅ Completed: {completedTasks}
  </span>

  <span className="text-yellow-400 font-semibold">
    ⏳ Remaining: {remainingTasks}
  </span>
</div>

      {/* Input + Button */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
        />

        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
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

            <div className="flex justify-between items-center w-full">
              <span
                className={`text-lg font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-white"
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
                className="text-red-400 hover:text-red-500 text-xl transition"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}