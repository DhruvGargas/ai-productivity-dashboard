  "use client";

  import { useState } from "react";
  import { useTheme } from "@/context/ThemeContext";

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
    const { theme } = useTheme();
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
      <section
  id="tasks"
  className={`mt-12 transition-all duration-300 ${
    theme === "dark"
      ? "text-white"
      : "text-gray-900"
  }`}
>
        <h2
  className={`text-3xl font-bold mb-6 ${
    theme === "dark" ? "text-white" : "text-gray-900"
  }`}
>
          Today's Tasks
        </h2>

        {/* Task Summary */}
        <div className="flex flex-wrap gap-6 mb-6 text-sm">
          <span className="text-blue-500 font-semibold">
            📋 Total: {tasks.length}
          </span>

          <span className="text-green-500 font-semibold">
            ✅ Completed: {completedTasks}
          </span>

          <span className="text-yellow-500 font-semibold">
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
      className={`rounded-xl border px-4 py-3 outline-none transition
  ${
  theme==="dark"
  ?"bg-slate-800 border-slate-700 text-white placeholder-gray-400 focus:border-blue-500"
  :"bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
  }`}
    />

    <div className="flex gap-3">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      className={`rounded-xl border px-4 py-3 transition
  ${
  theme==="dark"
  ?"bg-slate-800 border-slate-700 text-white"
  :"bg-white border-gray-300 text-gray-900"
  }`}
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
      className={`rounded-xl border px-4 py-3 transition
  ${
  theme==="dark"
  ?"bg-slate-800 border-slate-700 text-white"
  :"bg-white border-gray-300 text-gray-900"
  }`}
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
      className={`w-full rounded-xl border px-4 py-3 outline-none transition
${
  theme === "dark"
    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400 focus:border-blue-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
}`}
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
      : theme === "dark"
      ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg transition ${
    filter === "active"
      ? "bg-blue-600 text-white"
      : theme === "dark"
      ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
      >
        Active
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-lg transition ${
    filter === "completed"
      ? "bg-blue-600 text-white"
      : theme === "dark"
      ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
      className={`rounded-lg border px-4 py-2 transition
${
  theme === "dark"
    ? "bg-slate-800 border-slate-700 text-white"
    : "bg-white border-gray-300 text-gray-900"
}`}
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
                className={`border rounded-xl p-5 shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer hover:scale-[1.01]
  ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
      : "bg-white border-gray-300 hover:bg-gray-100"
  }`}
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
                      className={`flex-1 rounded-lg px-3 py-2 outline-none border
  ${
    theme === "dark"
      ? "bg-slate-700 border-slate-600 text-white"
      : "bg-gray-100 border-gray-300 text-gray-900"
  }`}
                    />
                  ) : (
                    <div className="flex flex-col flex-1">
    <span
      className={`text-lg font-medium ${
    task.completed
      ? "line-through text-gray-400"
      : theme === "dark"
      ? "text-white"
      : "text-gray-900"
  }`}
    >
      {task.text}
    </span>

    <div className="flex items-center gap-3 mt-2">
      <span className={`text-xs px-3 py-1 rounded-full font-medium
  ${
    theme === "dark"
      ? "bg-blue-600 text-white"
      : "bg-blue-100 text-blue-700"
  }`}>
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
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              🗑️ Clear Completed
            </button>
          </div>
        )}
      </section>
    );
  }