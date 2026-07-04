"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
  createdAt: number;
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
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Study");

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
  "newest" | "oldest" | "completed"
>("newest");

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
  dueDate,
  category,
  createdAt: Date.now(),
};

    setTasks((prevTasks) => [task, ...prevTasks]);
    setNewTask("");
    setDueDate("");
    setCategory("Study");
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

  const filteredTasks = [...tasks]
  .sort((a, b) => {
    if (sortBy === "newest") {
      return b.createdAt - a.createdAt;
    }

    if (sortBy === "oldest") {
      return a.createdAt - b.createdAt;
    }

    if (sortBy === "completed") {
      return Number(b.completed) - Number(a.completed);
    }

    return 0;
  })
  .filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed;

    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });
  const getDueDateLabel = (date: string) => {
  if (!date) return null;

  const today = new Date();
  const due = new Date(date);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const difference =
    (due.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  if (difference === 0) {
    return {
      text: "Today",
      color: "bg-green-600",
    };
  }

  if (difference === 1) {
    return {
      text: "Tomorrow",
      color: "bg-yellow-600",
    };
  }

  if (difference < 0) {
    return {
      text: "Overdue",
      color: "bg-red-600",
    };
  }

  return {
    text: due.toLocaleDateString(),
    color: "bg-slate-700",
  };
};
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
      <div className="flex flex-col gap-4 mb-6">

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
    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
  />

  <div className="flex gap-3">

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
    >
      <option>Study</option>
      <option>Gym</option>
      <option>Work</option>
      <option>Personal</option>
    </select>

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
    />

    <button
      onClick={addTask}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl transition"
    >
      Add
    </button>

  </div>

</div>
      {/* Search */}
<div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
  />
</div>
      {/* Filters */}
<div className="flex flex-wrap items-center justify-between gap-4 mb-6">

  {/* Filter Buttons */}
  <div className="flex gap-3">
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

  {/* Sort Dropdown */}
  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(
        e.target.value as "newest" | "oldest" | "completed"
      )
    }
    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
  >
    <option value="newest">🆕 Newest</option>
    <option value="oldest">📜 Oldest</option>
    <option value="completed">✅ Completed First</option>
  </select>

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
                  <div className="flex flex-col flex-1">
  <span
    className={`text-lg font-medium ${
      task.completed
        ? "line-through text-gray-400"
        : "text-white"
    }`}
  >
    {task.text}
  </span>

  <div className="flex items-center gap-3 mt-2">
    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
      📂 {task.category}
    </span>

    {task.dueDate && (() => {
  const due = getDueDateLabel(task.dueDate);

  return (
    <span
      className={`${due?.color} text-white text-xs px-3 py-1 rounded-full`}
    >
      📅 {due?.text}
    </span>
  );
})()}
  </div>
</div>
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