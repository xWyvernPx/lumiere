import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeLang, setActiveLang] = useState("FR");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    // Simple Form Validations
    if (!formData.email) {
      showNotice("error", "Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      showNotice("error", "Please enter your password.");
      return;
    }
    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        showNotice("error", "Passwords do not match. Please try again.");
        return;
      }
      if (!formData.remember) {
        showNotice(
          "error",
          "You must agree to the Terms of Publication & Conduct.",
        );
        return;
      }
    }

    setIsLoading(true);

    // Simulate database action linked to USER & SESSION logical entity schemas
    setTimeout(() => {
      setIsLoading(false);
      showNotice(
        "success",
        mode === "signin"
          ? `Welcome back, Scholar! Successfully authenticated as ${formData.email}.`
          : "Your scholarly account was successfully created! Welcome to Lumière.",
      );
      // Wait a moment then navigate
      setTimeout(() => {
        navigate({ to: "/" });
      }, 1000);
    }, 1000);
  };

  const showNotice = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    // Automatically dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const toggleLanguage = () => {
    setActiveLang((prev) => (prev === "FR" ? "EN" : "FR"));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans relative selection:bg-black selection:text-white">
      <style>{`
        .editorial-hatching {
          background-image: radial-gradient(#000000 0.5px, transparent 0.5px);
          background-size: 8px 8px;
          opacity: 0.05;
        }
        input:focus {
          outline: none;
          box-shadow: none !important;
        }
      `}</style>

      {/* Floating Modern Notification UI (No alerts) */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-md p-4 border-4 animate-bounce transition-all ${
            notification.type === "success"
              ? "border-black bg-white text-black"
              : "border-red-600 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-start space-x-3">
            <span className="shrink-0 mt-0.5 text-xl font-bold">
              {notification.type === "success" ? "✓" : "!"}
            </span>
            <div>
              <p className="font-sans font-bold uppercase tracking-wider text-xs">
                {notification.type === "success"
                  ? "Publication Notice"
                  : "System Exception"}
              </p>
              <p className="text-sm font-sans font-medium mt-1">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <span className="text-sm">×</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh]">
        {/* Left Panel: Authentication Form Area */}
        <section className="flex flex-col items-center justify-center p-5 md:p-12 bg-white relative">
          {/* Header Logo for Mobile viewports */}
          <div className="absolute top-8 left-8 lg:hidden">
            <span className="font-serif text-2xl font-black uppercase tracking-tighter">
              Lumière
            </span>
          </div>

          <div className="w-full max-w-md space-y-10 my-16 lg:my-0">
            <header className="space-y-4">
              <h1 className="font-serif text-4xl lg:text-5xl font-black">
                {mode === "signin" ? "Sign In" : "Create Account"}
              </h1>
              <p className="font-sans font-medium text-[#444748]">
                {mode === "signin"
                  ? "Continue your scholarly journey with Lumière."
                  : "Enroll in the academic database. Start sharing lessons."}
              </p>
            </header>

            {/* Premium Tab Toggles */}
            <div className="flex border-b border-[#c4c7c7]">
              <button
                type="button"
                className={`flex-1 py-4 text-center transition-all ${
                  mode === "signin"
                    ? "border-b-4 border-black text-black font-sans font-bold"
                    : "text-[#444748] hover:text-black border-b-4 border-transparent font-sans font-medium"
                }`}
                onClick={() => {
                  setMode("signin");
                  setNotification(null);
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`flex-1 py-4 text-center transition-all ${
                  mode === "signup"
                    ? "border-b-4 border-black text-black font-sans font-bold"
                    : "text-[#444748] hover:text-black border-b-4 border-transparent font-sans font-medium"
                }`}
                onClick={() => {
                  setMode("signup");
                  setNotification(null);
                }}
              >
                Create Account
              </button>
            </div>

            {/* Interactive Sign-in & Sign-up Form */}
            <form className="space-y-6" onSubmit={handleAuthSubmit}>
              <div className="space-y-2">
                <label
                  className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border-4 border-black font-sans font-medium placeholder:text-[#c4c7c7] bg-white transition-all focus:border-black focus:ring-0"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="scholar@lumiere.edu"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {mode === "signin" && (
                    <a
                      className="font-sans font-bold text-[10px] text-[#3d627b] uppercase tracking-[0.1em] hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        showNotice(
                          "success",
                          "Password reset instructions have been forwarded to your email inbox.",
                        );
                      }}
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  className="w-full px-4 py-3 border-4 border-black font-sans font-medium placeholder:text-[#c4c7c7] bg-white transition-all focus:border-black focus:ring-0"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>

              {/* Conditional Confirm Password block */}
              {mode === "signup" && (
                <div className="space-y-2 transition-all">
                  <label
                    className="font-sans font-bold text-[10px] text-[#444748] uppercase tracking-[0.1em]"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-4 py-3 border-4 border-black font-sans font-medium placeholder:text-[#c4c7c7] bg-white transition-all focus:border-black focus:ring-0"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    type="password"
                    required={mode === "signup"}
                  />
                </div>
              )}

              {/* Scholarly Agreement terms */}
              <div className="flex items-start space-x-3 py-2">
                <div className="flex items-center h-5">
                  <input
                    className="h-4 w-4 border-2 border-black text-black focus:ring-0 rounded-none cursor-pointer"
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />
                </div>
                <label
                  className="font-sans font-medium text-[12px] text-[#444748]"
                  htmlFor="remember"
                >
                  I agree to the{" "}
                  <a
                    className="underline font-sans font-bold text-black cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Publication
                  </a>{" "}
                  and{" "}
                  <a
                    className="underline font-sans font-bold text-black cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    Scholarly Conduct
                  </a>
                  .
                </label>
              </div>

              {/* Submit Trigger with Loading State */}
              <button
                className="w-full py-4 bg-black text-white font-sans font-bold text-sm uppercase tracking-widest hover:bg-[#474646] transition-colors active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer border-none"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing Manuscripts...</span>
                  </>
                ) : (
                  <span>
                    {mode === "signin"
                      ? "Begin Session"
                      : "Establish Scholarship"}
                  </span>
                )}
              </button>

              {/* Social Login Integrations */}
              <div className="space-y-6 mt-6">
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-[#c4c7c7]"></div>
                  <span className="flex-shrink mx-4 font-sans font-bold text-[10px] uppercase tracking-widest text-[#444748]">
                    Or Continue Via
                  </span>
                  <div className="flex-grow border-t border-[#c4c7c7]"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      showNotice(
                        "success",
                        "Authenticating seamlessly via Google credentials...",
                      )
                    }
                    className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">
                      Google
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showNotice(
                        "success",
                        "Authenticating seamlessly via Apple credential networks...",
                      )
                    }
                    className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.53-.67-2.87-.67-1.36 0-1.81.65-2.87.65-1.14 0-2.28-.74-3.31-1.74C2.68 18.03 1 14.58 1 11.55c0-3.11 2.02-4.75 3.96-4.75 1.03 0 1.85.39 2.53.39.65 0 1.3-.42 2.53-.42 1.88 0 3.41 1.01 4.28 2.27-3.63 1.51-3.04 6.01.55 7.24-.71 1.61-1.61 3.21-2.8 4zm-3.13-15.4c0-2.27 1.88-4.11 4.18-4.11.28 0 .55.02.82.07-.11 2.34-2.04 4.18-4.25 4.18-.3 0-.57-.02-.75-.14z"></path>
                    </svg>
                    <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">
                      Apple
                    </span>
                  </button>
                </div>
              </div>
            </form>

            <footer className="pt-8 border-t border-[#c4c7c7] flex justify-between items-center">
              <span className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#747878]">
                Issue No. 427
              </span>
              <div className="flex space-x-6">
                <span
                  onClick={toggleLanguage}
                  className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#444748] cursor-pointer hover:text-black flex items-center space-x-1"
                >
                  <span>{activeLang}</span>
                </span>
                <span
                  onClick={() =>
                    showNotice(
                      "success",
                      "Connect with support: librarian@lumiere.edu",
                    )
                  }
                  className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#444748] cursor-pointer hover:text-black"
                >
                  HELP
                </span>
              </div>
            </footer>
          </div>
        </section>

        {/* Right Panel: Premium Editorial Section */}
        <section className="hidden lg:flex flex-col bg-[#eeeeee] relative overflow-hidden border-l border-[#c4c7c7]">
          {/* Subtle Canvas hatching element texture */}
          <div className="absolute inset-0 editorial-hatching pointer-events-none"></div>

          <div className="relative z-10 p-12 h-full flex flex-col">
            {/* Branding headers */}
            <div className="flex justify-between items-end border-b-4 border-black pb-4">
              <span className="font-serif text-3xl font-black uppercase tracking-tighter text-[#1a1c1c]">
                Lumière
              </span>
              <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-[#1a1c1c]">
                Daily Edition • Vol. IV
              </span>
            </div>

            {/* Featured Scholarly Concept Art Card */}
            <div className="mt-12 flex-grow flex flex-col justify-center">
              <div className="bg-white p-6 border border-[#747878] shadow-none relative">
                {/* Fig. Annotation floating badge */}
                <div className="absolute -top-3 left-6 bg-black text-white px-3 py-1 font-sans font-bold text-[10px] uppercase tracking-[0.1em]">
                  Fig 1. The Scholar's Sanctuary
                </div>

                <div className="aspect-[4/3] bg-[#f4f4f4] overflow-hidden border border-[#c4c7c7]">
                  <img
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale"
                    alt="A sophisticated editorial line-art illustration of a classic library."
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="mt-8 space-y-4 max-w-xl text-[#1a1c1c]">
                  <h2 className="font-serif text-3xl lg:text-4xl font-black leading-tight">
                    Your Daily Edition of{" "}
                    <span className="italic font-normal">Knowledge</span>.
                  </h2>
                  <div className="w-12 h-1 bg-black"></div>
                  <p className="font-serif italic text-lg text-[#444748]">
                    "The object of education is to prepare the young to educate
                    themselves throughout their lives."
                  </p>
                  <p className="font-sans font-bold text-[11px] uppercase tracking-[0.1em] text-[#747878]">
                    — Robert Maynard Hutchins
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Footer Location stamp */}
            <div className="mt-auto flex justify-between items-center text-[#c4c7c7] border-t border-[#c4c7c7] pt-4">
              <span className="font-sans font-bold text-[10px] tracking-[0.15em] text-[#747878]">
                PARIS • NEW YORK • BERLIN
              </span>
              <span className="font-sans font-bold text-[10px] tracking-[0.15em] uppercase text-[#747878]">
                Scholarship Refined
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
