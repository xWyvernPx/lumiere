import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/Button";
import { useLogin, useRegister } from "./useAuth";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert";
import { authActions } from "../../stores/auth-store";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeLang, setActiveLang] = useState("FR");
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const showNotice = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLoginSubmit = async (value: any) => {
    setNotification(null);
    try {
      const response = await loginMutation.mutateAsync(value);
      
      authActions.refresh({
        token: (response as any).data?.token || (response as any).token,
        refreshToken: (response as any).data?.refreshToken || (response as any).refreshToken || "",
      });

      showNotice("success", `Welcome back! Successfully authenticated.`);
      setTimeout(() => {
        navigate({ to: "/app" });
      }, 1000);
    } catch (error: any) {
      showNotice("error", error.response?.data?.message || "Authentication failed. Please check your credentials.");
    }
  };

  const handleRegisterSubmit = async (value: any) => {
    setNotification(null);
    try {
      const payload = {
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
      };
      await registerMutation.mutateAsync(payload);
      showNotice("success", "Your scholarly account was successfully created! You can now log in.");
      setMode("signin");
    } catch (error: any) {
      showNotice("error", error.response?.data?.message || "Registration failed. Please try again.");
    }
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
        <Alert
          variant={notification.type === "success" ? "default" : "destructive"}
          className={`fixed top-6 right-6 z-50 max-w-md animate-bounce transition-all ${
            notification.type === "success"
              ? "border-4 border-black bg-white text-black"
              : "border-4 border-red-600 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-start space-x-3 w-full">
            <span className="shrink-0 mt-0.5 text-xl font-bold">
              {notification.type === "success" ? "✓" : "!"}
            </span>
            <div className="flex-1">
              <AlertTitle className="font-sans font-bold uppercase tracking-wider text-xs mb-1">
                {notification.type === "success"
                  ? "Publication Notice"
                  : "System Exception"}
              </AlertTitle>
              <AlertDescription className="text-sm font-sans font-medium">
                {notification.message}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-black transition-colors p-1 h-auto bg-transparent border-0 -mr-2 -mt-2 shrink-0"
            >
              <span className="text-sm">×</span>
            </Button>
          </div>
        </Alert>
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
            <Tabs 
              value={mode} 
              onValueChange={(val) => { 
                setMode(val as "signin" | "signup"); 
                setNotification(null);
              }}
              className="w-full"
            >
              <TabsList className="flex border-b border-[#c4c7c7] w-full">
                <TabsTrigger
                  value="signin"
                  className="flex-1 py-4 text-center transition-all data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:font-sans data-[state=active]:font-bold text-[#444748] hover:text-black border-b-4 border-transparent font-sans font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="flex-1 py-4 text-center transition-all data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:font-sans data-[state=active]:font-bold text-[#444748] hover:text-black border-b-4 border-transparent font-sans font-medium"
                >
                  Create Account
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <LoginForm onSubmit={handleLoginSubmit} showNotice={showNotice} />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <RegisterForm onSubmit={handleRegisterSubmit} />
              </TabsContent>
            </Tabs>

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
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      window.location.href = (import.meta as any).env.VITE_API_URL ? `${(import.meta as any).env.VITE_API_URL}/auth/google` : "http://localhost:3000/api/v1/auth/google";
                    }}
                    className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer h-auto"
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
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      window.location.href = (import.meta as any).env.VITE_API_URL ? `${(import.meta as any).env.VITE_API_URL}/auth/apple` : "http://localhost:3000/api/v1/auth/apple";
                    }}
                    className="flex items-center justify-center space-x-2 py-3 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer h-auto"
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
                  </Button>
                </div>
              </div>

            <footer className="pt-8 border-t border-[#c4c7c7] flex justify-between items-center">
              <span className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#747878]">
                Issue No. 427
              </span>
              <div className="flex space-x-6 items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#444748] hover:text-black flex items-center p-0 h-auto bg-transparent border-0"
                >
                  {activeLang}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    showNotice(
                      "success",
                      "Connect with support: librarian@lumiere.edu",
                    )
                  }
                  className="font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#444748] hover:text-black p-0 h-auto bg-transparent border-0"
                >
                  HELP
                </Button>
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
