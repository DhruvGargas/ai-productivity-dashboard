"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList({
  tasks,
  setTasks,
}: TaskListProps) {
  const [newTask, setNewTask] = useState("");

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

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      text: newTask,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Today's Tasks
      </h2>

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