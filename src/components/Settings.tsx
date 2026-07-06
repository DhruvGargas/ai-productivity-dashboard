"use client";

import { useTheme } from "@/context/ThemeContext";

type Task = {
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
  createdAt: number;
};

type SettingsProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  defaultTasks: Task[];
};

export default function Settings({
  tasks,
  setTasks,
  defaultTasks,
}: SettingsProps) {
  const { theme, toggleTheme } = useTheme();

  const clearAllTasks = () => {
    if (confirm("Delete all tasks?")) {
      setTasks([]);
    }
  };

  const resetDashboard = () => {
    if (confirm("Reset dashboard to default tasks?")) {
      setTasks(defaultTasks);
    }
  };

  const exportTasks = () => {
    const blob = new Blob(
      [JSON.stringify(tasks, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "tasks.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const importTasks = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const imported = JSON.parse(
          event.target?.result as string
        );

        setTasks(imported);
      } catch {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <section
      id="settings"
      className={`mt-20 ${
        theme === "dark"
          ? "text-white"
          : "text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">
        ⚙️ Settings
      </h2>

      <div
        className={`rounded-xl p-8 space-y-6 ${
          theme === "dark"
            ? "bg-slate-800"
            : "bg-white shadow-md border border-gray-200"
        }`}
      >
        <button
          onClick={toggleTheme}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {theme === "dark"
            ? "☀️ Switch to Light Mode"
            : "🌙 Switch to Dark Mode"}
        </button>

        <button
          onClick={clearAllTasks}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          🗑 Clear All Tasks
        </button>

        <button
          onClick={resetDashboard}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg"
        >
          🔄 Reset Dashboard
        </button>

        <button
          onClick={exportTasks}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          📤 Export Tasks
        </button>

        <label className="block">
          <span className="font-semibold">
            📥 Import Tasks
          </span>

          <input
            type="file"
            accept=".json"
            onChange={importTasks}
            className="mt-3 block w-full"
          />
        </label>
      </div>
    </section>
  );
}