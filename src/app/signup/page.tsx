"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Toast from "@/components/Toast";
import { ToastMessage } from "@/types/auth";
import { FirebaseError } from "firebase/app";

export default function SignupPage() {
  const { user, loading: authLoading, signup, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleFirebaseError = (error: unknown) => {
    let title = "Registration Failed";
    let description = "An unexpected error occurred. Please try again.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          title = "Email Already Registered";
          description = "An account with this email address already exists. Please log in instead.";
          break;
        case "auth/invalid-email":
          title = "Invalid Email";
          description = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          title = "Weak Password";
          description = "Password should be at least 6 characters long.";
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

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setToast({
        type: "error",
        title: "Missing Required Fields",
        description: "Please fill out all fields in the registration form.",
        id: Date.now().toString(),
      });
      return;
    }

    if (password !== confirmPassword) {
      setToast({
        type: "error",
        title: "Passwords Do Not Match",
        description: "Please ensure your Password and Confirm Password match.",
        id: Date.now().toString(),
      });
      return;
    }

    if (password.length < 6) {
      setToast({
        type: "error",
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        id: Date.now().toString(),
      });
      return;
    }

    if (!agreeTerms) {
      setToast({
        type: "error",
        title: "Terms Agreement Required",
        description: "Please check the box to agree to Terms and Conditions.",
        id: Date.now().toString(),
      });
      return;
    }

    setLoading(true);
    try {
      await signup(fullName.trim(), email.trim(), password);
      setToast({
        type: "success",
        title: "Account Created!",
        description: "Welcome to AI Productivity Dashboard.",
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
        title: "Google Sign-Up Successful",
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
      <div className="relative lg:w-1/2 bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 text-white p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-4xl">🤖</span>
            <span className="text-2xl font-bold tracking-tight">AI Productivity Dashboard</span>
          </div>

          <div className="mt-8 space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-purple-200 border border-white/20">
              Get Started Free
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Create your account & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300">master your time.</span>
            </h1>
            <p className="text-lg text-purple-100/90 max-w-lg leading-relaxed">
              Join thousands of professionals organizing daily goals, studing schedules, and task habits seamlessly.
            </p>
          </div>

          {/* Testimonial Quote */}
          <div className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 max-w-md">
            <p className="text-sm italic text-purple-100 leading-relaxed mb-3">
              "This AI productivity dashboard completely transformed how I organize my daily study hours and workout routines!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center font-bold text-xs">
                DS
              </div>
              <div>
                <p className="text-xs font-semibold">Dhruv Gargas</p>
                <p className="text-[10px] text-purple-200">Full Stack Software Engineer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 pt-6 border-t border-white/10 text-xs text-purple-200 flex justify-between">
          <span>© 2026 AI Productivity Dashboard</span>
          <span>Firebase Cloud Auth</span>
        </div>
      </div>

      {/* RIGHT SIDE: Signup Card Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div
          className={`w-full max-w-md p-8 lg:p-10 rounded-2xl shadow-2xl transition-all duration-300 border ${
            theme === "dark"
              ? "bg-slate-900/90 border-slate-800 backdrop-blur-xl"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Start organizing your daily workflow today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-1">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="agree-terms" className={`ml-2 text-xs leading-relaxed cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                I agree to the <span className="font-semibold text-blue-500 underline">Terms of Service</span> and <span className="font-semibold text-blue-500 underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading || !agreeTerms}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}></div>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
              or sign up with
            </span>
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}></div>
          </div>

          {/* Google Sign-up Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className={`w-full py-2.5 px-4 rounded-xl border font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                : "bg-white hover:bg-gray-50 border-gray-300 text-gray-800 shadow-sm"
            }`}
          >
            {googleLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting Google...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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

          {/* Login Redirect Link */}
          <div className="mt-6 text-center text-xs">
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="font-bold text-blue-500 hover:text-blue-600 transition ml-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
