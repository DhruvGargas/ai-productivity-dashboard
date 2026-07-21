"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Toast from "@/components/Toast";
import { ToastMessage } from "@/types/auth";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const { user, loading: authLoading, login, loginWithGoogle, resetPassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Forgot password modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleFirebaseError = (error: unknown) => {
    let title = "Authentication Failed";
    let description = "An unexpected error occurred. Please try again.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-email":
          title = "Invalid Email";
          description = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          title = "Invalid Credentials";
          description = "The email or password you entered is incorrect.";
          break;

        case "auth/too-many-requests":
          title = "Account Temporarily Blocked";
          description = "Too many failed attempts. Please reset your password or try again later.";
          break;
        case "auth/popup-closed-by-user":
          title = "Sign-in Cancelled";
          description = "Google sign-in popup was closed before completing.";
          break;
        case "auth/network-request-failed":
          title = "Network Error";
          description = "Please check your internet connection and try again.";
          break;
        default:
          description = error.message;
      }
    }
    setToast({ type: "error", title, description, id: Date.now().toString() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({
        type: "error",
        title: "Missing Fields",
        description: "Please enter both email and password.",
        id: Date.now().toString(),
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setToast({
        type: "success",
        title: "Welcome back!",
        description: "Successfully logged in.",
        id: Date.now().toString(),
      });
      router.push("/");
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      setToast({
        type: "success",
        title: "Google Sign-In Successful",
        description: "Redirecting to your dashboard...",
        id: Date.now().toString(),
      });
      router.push("/");
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSendResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setToast({
        type: "error",
        title: "Email Required",
        description: "Please enter your email address to receive a password reset link.",
        id: Date.now().toString(),
      });
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setToast({
        type: "success",
        title: "Reset Email Sent",
        description: `Password reset link sent to ${resetEmail}. Check your inbox.`,
        id: Date.now().toString(),
      });
      setShowResetModal(false);
      setResetEmail("");
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Theme Switcher Button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200"
          }`}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* LEFT SIDE: Hero Brand Banner */}
      <div className="relative lg:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-4xl">🤖</span>
            <span className="text-2xl font-bold tracking-tight">AI Productivity Dashboard</span>
          </div>

          <div className="mt-12 space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-blue-200 border border-white/20">
              SaaS Productivity Suite
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Organize your tasks and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-purple-300">boost your productivity.</span>
            </h1>
            <p className="text-lg text-blue-100/90 max-w-lg leading-relaxed">
              Supercharge your daily workflow with real-time task analytics, calendar schedule tracking, and AI-driven focus stats.
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 font-bold">✓</div>
              <p className="text-sm text-blue-100">Smart Task Categorization & Due Dates</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 font-bold">✓</div>
              <p className="text-sm text-blue-100">Live Analytics with Recharts & Focus Metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 font-bold">✓</div>
              <p className="text-sm text-blue-100">Firebase Cloud Authentication & Sync</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 pt-6 border-t border-white/10 text-xs text-blue-200 flex justify-between">
          <span>© 2026 AI Productivity Dashboard</span>
          <span>Secured by Firebase</span>
        </div>
      </div>

      {/* RIGHT SIDE: Login Card Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
        <div
          className={`w-full max-w-md p-8 lg:p-10 rounded-2xl shadow-2xl transition-all duration-300 border ${
            theme === "dark"
              ? "bg-slate-900/90 border-slate-800 backdrop-blur-xl"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 text-3xl mb-3">
              🤖
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Enter your account credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowResetModal(true);
                  }}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className={`ml-2 text-xs font-medium cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Remember me on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}></div>
            <span className={`text-xs font-medium uppercase tracking-wider ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
              or continue with
            </span>
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}></div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className={`w-full py-3 px-4 rounded-xl border font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                : "bg-white hover:bg-gray-50 border-gray-300 text-gray-800 shadow-sm"
            }`}
          >
            {googleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Sign Up Redirect Link */}
          <div className="mt-8 text-center text-xs">
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Don't have an account?{" "}
            </span>
            <Link
              href="/signup"
              className="font-bold text-blue-500 hover:text-blue-600 transition ml-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md p-6 rounded-2xl shadow-2xl border ${
              theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reset Password</h3>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className={`text-xs mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Enter your email address and we'll send you a password reset link.
            </p>

            <form onSubmit={handleSendResetPassword} className="space-y-4">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-xs border ${
                    theme === "dark" ? "border-slate-700 hover:bg-slate-800" : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
