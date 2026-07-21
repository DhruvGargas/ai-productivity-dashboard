"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Toast from "@/components/Toast";
import { ToastMessage } from "@/types/auth";
import { FirebaseError } from "firebase/app";

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
  const { user, logout, resetPassword, updateUserDisplayName, getUserInitials } = useAuth();

  const [newName, setNewName] = useState(user?.displayName || "");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL;
  const initials = getUserInitials(user?.displayName, user?.email);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setToast({
        type: "error",
        title: "Invalid Name",
        description: "Display name cannot be empty.",
        id: Date.now().toString(),
      });
      return;
    }

    setIsUpdatingName(true);
    try {
      await updateUserDisplayName(newName.trim());
      setToast({
        type: "success",
        title: "Name Updated",
        description: "Your profile display name has been updated successfully.",
        id: Date.now().toString(),
      });
    } catch (err) {
      const msg = err instanceof FirebaseError ? err.message : "Failed to update profile name.";
      setToast({
        type: "error",
        title: "Update Failed",
        description: msg,
        id: Date.now().toString(),
      });
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    setIsResettingPassword(true);
    try {
      await resetPassword(user.email);
      setToast({
        type: "success",
        title: "Reset Email Sent",
        description: `Password reset link sent to ${user.email}. Please check your inbox.`,
        id: Date.now().toString(),
      });
    } catch (err) {
      const msg = err instanceof FirebaseError ? err.message : "Failed to send reset email.";
      setToast({
        type: "error",
        title: "Reset Failed",
        description: msg,
        id: Date.now().toString(),
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const clearAllTasks = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
      setToast({
        type: "info",
        title: "Tasks Cleared",
        description: "All tasks have been removed.",
        id: Date.now().toString(),
      });
    }
  };

  const resetDashboard = () => {
    if (confirm("Reset dashboard to default tasks?")) {
      setTasks(defaultTasks);
      setToast({
        type: "success",
        title: "Dashboard Reset",
        description: "Restored initial default task set.",
        id: Date.now().toString(),
      });
    }
  };

  const exportTasks = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
    setToast({
      type: "success",
      title: "Tasks Exported",
      description: "Downloaded tasks.json file.",
      id: Date.now().toString(),
    });
  };

  const importTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setTasks(imported);
          setToast({
            type: "success",
            title: "Tasks Imported",
            description: `Successfully imported ${imported.length} tasks.`,
            id: Date.now().toString(),
          });
        } else {
          throw new Error("Invalid task format");
        }
      } catch {
        setToast({
          type: "error",
          title: "Import Error",
          description: "Invalid JSON file structure.",
          id: Date.now().toString(),
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <section
      id="settings"
      className={`mt-16 space-y-8 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
        <span>⚙️</span>
        <span>Settings & Profile</span>
      </h2>

      {/* PROFILE SETTINGS CARD */}
      <div
        className={`rounded-2xl p-6 lg:p-8 border shadow-lg transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>👤</span> Profile Account
        </h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200 dark:border-slate-800">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
              {initials}
            </div>
          )}

          <div className="flex-1 w-full text-center sm:text-left space-y-1">
            <h4 className="text-lg font-bold">{displayName}</h4>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {user?.email}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold rounded-full">
                Active Account
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-semibold rounded-full">
                Firebase Verified
              </span>
            </div>
          </div>
        </div>

        {/* Change Display Name Form */}
        <form onSubmit={handleUpdateName} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              Display Name
            </label>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new display name"
                className={`flex-1 px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              />
              <button
                type="submit"
                disabled={isUpdatingName}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow transition disabled:opacity-50"
              >
                {isUpdatingName ? "Saving..." : "Change Display Name"}
              </button>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleResetPassword}
            disabled={isResettingPassword}
            className={`py-3 px-4 rounded-xl border font-semibold text-sm transition flex items-center justify-center gap-2 ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900"
            }`}
          >
            <span>🔑</span>
            <span>{isResettingPassword ? "Sending..." : "Reset Password"}</span>
          </button>

          <button
            onClick={() => logout()}
            className="py-3 px-4 rounded-xl font-semibold text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 transition flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Log Out</span>
          </button>

          <button
            disabled
            className="py-3 px-4 rounded-xl font-semibold text-sm text-gray-400 border border-gray-300 dark:border-slate-800 bg-gray-100 dark:bg-slate-800/40 cursor-not-allowed flex items-center justify-center gap-2"
            title="Account deletion disabled in preview"
          >
            <span>❌</span>
            <span>Delete Account (Soon)</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD PREFERENCES & DATA MANAGEMENT CARD */}
      <div
        className={`rounded-2xl p-6 lg:p-8 border shadow-lg transition-all duration-300 space-y-6 ${
          theme === "dark"
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>🛠️</span> Preferences & Data Management
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={toggleTheme}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow transition"
          >
            {theme === "dark"
              ? "☀️ Switch to Light Mode"
              : "🌙 Switch to Dark Mode"}
          </button>

          <button
            onClick={resetDashboard}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow transition"
          >
            🔄 Reset Dashboard Tasks
          </button>

          <button
            onClick={exportTasks}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow transition"
          >
            📤 Export Tasks (JSON)
          </button>

          <button
            onClick={clearAllTasks}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow transition"
          >
            🗑 Clear All Tasks
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
          <label className="block">
            <span className="font-semibold text-sm block mb-2">
              📥 Import Tasks (JSON)
            </span>
            <input
              type="file"
              accept=".json"
              onChange={importTasks}
              className={`block w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold ${
                theme === "dark"
                  ? "text-gray-300 file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                  : "text-gray-700 file:bg-gray-100 file:text-gray-900 hover:file:bg-gray-200"
              }`}
            />
          </label>
        </div>
      </div>
    </section>
  );
}