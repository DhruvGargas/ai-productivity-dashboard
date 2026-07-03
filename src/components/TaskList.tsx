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

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

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

  const clearCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !task.completed)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Today's Tasks
      </h2>

      {/* Task Summary */}
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

      {/* Add Task */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
        />

        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl transition"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const originalIndex = tasks.indexOf(task);

          return (
            <div
              key={originalIndex}
              onClick={() =>
                editingIndex === null &&
                toggleTask(originalIndex)
              }
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:bg-slate-700 hover:scale-[1.01] transition-all duration-200 flex items-center gap-4 cursor-pointer"
            >
              <span className="text-2xl">
                {task.completed ? "☑" : "☐"}
              </span>

              <div className="flex justify-between items-center w-full gap-4">
                {editingIndex === originalIndex ? (
                  <input
                    value={editedText}
                    onChange={(e) =>
                      setEditedText(e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-white outline-none"
                  />
                ) : (
                  <span
                    className={`text-lg font-medium ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  {editingIndex === originalIndex ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (editedText.trim() === "") return;

                          setTasks((prevTasks) =>
                            prevTasks.map((t, i) =>
                              i === originalIndex
                                ? {
                                    ...t,
                                    text: editedText,
                                  }
                                : t
                            )
                          );

                          setEditingIndex(null);
                          setEditedText("");
                        }}
                        className="text-green-400 hover:text-green-500 text-xl"
                      >
                        💾
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingIndex(null);
                          setEditedText("");
                        }}
                        className="text-yellow-400 hover:text-yellow-500 text-xl"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingIndex(originalIndex);
                          setEditedText(task.text);
                        }}
                        className="text-blue-400 hover:text-blue-500 text-xl"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(originalIndex);
                        }}
                        className="text-red-400 hover:text-red-500 text-xl"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clear Completed */}
      {completedTasks > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={clearCompleted}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            🗑️ Clear Completed
          </button>
        </div>
      )}
    </section>
  );
}