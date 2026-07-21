"use client";

import React, { useEffect } from "react";
import { ToastMessage } from "@/types/auth";
import { useTheme } from "@/context/ThemeContext";

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const { theme } = useTheme();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === "error";
  const isSuccess = toast.type === "success";

  return (
    <div className="fixed top-5 right-5 z-50 animate-bounce-in max-w-md w-full px-4">
      <div
        className={`flex items-start p-4 rounded-xl shadow-2xl border transition-all duration-300 ${
          isError
            ? theme === "dark"
              ? "bg-rose-950/90 border-rose-700 text-rose-100"
              : "bg-rose-50 border-rose-300 text-rose-900"
            : isSuccess
            ? theme === "dark"
              ? "bg-emerald-950/90 border-emerald-700 text-emerald-100"
              : "bg-emerald-50 border-emerald-300 text-emerald-900"
            : theme === "dark"
            ? "bg-slate-800 border-slate-700 text-slate-100"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <div className="text-2xl mr-3 flex-shrink-0">
          {isError ? "⚠️" : isSuccess ? "✅" : "ℹ️"}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.description && (
            <p className="text-xs mt-1 opacity-90 leading-relaxed">
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-3 text-lg opacity-70 hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
