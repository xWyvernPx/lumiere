import { useState, useEffect } from "react";
import { Outlet, Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  Settings,
  X,
  Menu,
  Flame,
  Bookmark,
  ChevronDown,
  Palette,
  ArrowLeft,
} from "lucide-react";
import { observer } from "@legendapp/state/react";
import { themeStore, type ThemeStore } from "../../store/themeStore";
import { motion, AnimatePresence } from "motion/react";

// Header component placed within the layout context or imported
const Header = observer(function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [dateStr, setDateStr] = useState("Aujourd'hui");
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const today = new Date().toLocaleDateString("fr-FR", options);
    setDateStr(today.charAt(0).toUpperCase() + today.slice(1));
  }, []);

  const isRootRoute = pathname === "/" || pathname === "/classroom" || pathname === "/community" || pathname === "/archives" || pathname === "/library";

  return (
    <header className="h-16 bg-[var(--background)] border-b-2 border-[var(--border)] flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-[var(--foreground)] cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {!isRootRoute ? (
           <button 
             onClick={() => router.history.back()} 
             className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
           >
             <ArrowLeft className="w-4 h-4" /> Back
           </button>
        ) : (
          <div className="hidden sm:flex items-center gap-2 font-serif text-sm italic text-[var(--foreground)] opacity-80">
            <span>L'Édition du Matin</span>
            <span className="mx-2">—</span>
            <span>{dateStr}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative flex items-center">
          <Palette className="w-4 h-4 text-[var(--foreground)] absolute left-3 pointer-events-none" />
          <select
            className="appearance-none bg-transparent border border-[var(--border)] border-opacity-20 text-[var(--foreground)] text-sm font-serif italic py-1.5 pl-9 pr-8 cursor-pointer focus:outline-none focus:border-[var(--border)] hover:bg-[var(--code-bg)] transition-colors"
            value={themeStore.activeTheme.get()}
            onChange={(e) =>
              themeStore.activeTheme.set(
                e.target.value as ThemeStore["activeTheme"],
              )
            }
          >
            <option value="lumiere">Lumière</option>
            <option value="aura">Aura</option>
            <option value="midnight">Midnight</option>
            <option value="forest">Forest</option>
          </select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-[var(--foreground)] pointer-events-none" />
        </div>

        <button className="hidden sm:flex items-center gap-2 hover:bg-[var(--code-bg)] px-3 py-1.5 transition-colors border border-[var(--border)] border-opacity-20 text-[var(--foreground)] cursor-pointer">
          <span className="text-sm font-serif italic">Français</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4 sm:gap-5 font-bold text-sm tracking-wide">
          <div
            className="flex items-center gap-1 sm:gap-2 cursor-help"
            title="12 Day Streak"
          >
            <Flame className="w-4 h-4 text-[var(--foreground)]" />
            <span>12</span>
          </div>
          <div
            className="flex items-center gap-1 sm:gap-2 cursor-help"
            title="450 Gems"
          >
            <Bookmark className="w-4 h-4 text-[var(--accent)]" />
            <span>450</span>
          </div>
        </div>
      </div>
    </header>
  );
});

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const navItems = [
    { to: "/", label: "Practicing" },
    { to: "/classroom", label: "The Classroom" },
    { to: "/community", label: "Community Desk" },
    { to: "/archives", label: "Saved Archives" },
    { to: "/library", label: "Activities Library" },
  ];

  return (
    <aside
      className={`bg-[var(--background)] w-72 h-full border-r border-[var(--border)] border-opacity-20 flex flex-col transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-30 duration-300 ease-in-out`}
    >
      <div className="p-8 border-b-4 border-[var(--border)] flex items-center justify-between shrink-0">
        <span className="font-serif font-black text-4xl tracking-tight">
          Lumière.
        </span>
        <button
          className="lg:hidden text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 mb-2">
            Sections
          </h3>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              className="w-full flex items-center gap-4 text-sm tracking-wide group transition-colors cursor-pointer"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1.5 h-1.5 bg-[var(--primary)] rounded-full transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  ></span>
                  <span
                    className={
                      isActive
                        ? "text-[var(--foreground)] font-bold"
                        : "text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] font-medium"
                    }
                  >
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="pt-6 border-t border-[var(--border)] border-opacity-20">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">
              Daily Edition
            </span>
            <span className="text-xs font-bold text-[var(--accent)]">
              20/30 XP
            </span>
          </div>
          <div className="w-full bg-[var(--code-bg)] border border-[var(--border)] border-opacity-20 h-2">
            <div
              className="bg-[var(--primary)] h-full"
              style={{ width: "66%" }}
            ></div>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 italic mt-3">
            10 points remaining to maintain your publishing streak.
          </p>
        </div>
      </nav>

      <div className="p-6 border-t border-[var(--border)] border-opacity-20 bg-[var(--background)] mt-auto shrink-0">
        <div className="flex items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Alex+Doe&background=121212&color=fff&rounded=false"
            alt="User"
            className="w-10 h-10 grayscale border border-[var(--border)] border-opacity-20"
          />
          <div className="flex-1 text-left">
            <h4 className="text-sm font-bold text-[var(--foreground)]">
              Alex Doe
            </h4>
            <p className="text-xs font-serif text-[var(--foreground)] opacity-80 italic">
              Intermediate (B1)
            </p>
          </div>
          <Link
            to="/auth"
            className="text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="text-[var(--foreground)] antialiased h-screen overflow-hidden flex font-sans selection:bg-[var(--accent)] selection:text-[var(--background)] bg-[var(--background)]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[var(--primary)]/40 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[var(--background)]">
        <Header toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-10 sm:py-12 bg-[var(--background)] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
