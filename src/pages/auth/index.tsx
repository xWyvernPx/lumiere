import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/Button";
import { useLogin, useRegister } from "./useAuth";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
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

  React.useEffect(() => {
    if (import.meta.env.VITE_MOCKING_LOGIN === "true") {
      authActions.setUser({
        id: "mock-user-123",
        email: "mockuser@example.com",
        firstName: "Mock",
        lastName: "User",
        role: { name: "ADMIN" },
      });
      navigate({ to: "/app" });
    }
  }, [navigate]);

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

            <SocialLoginButtons showNotice={showNotice} />

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
