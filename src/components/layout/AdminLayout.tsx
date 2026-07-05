import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  Settings,
  X,
  Menu,
  Flame,
  Bookmark,
  Palette,
  ArrowLeft,
  LogOut,
  Bell,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ChevronsUpDown,
  Globe,
  Users,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  Cpu,
  HelpCircle,
  Server
} from "lucide-react";
import { observer } from "@legendapp/state/react";
import { themeStore, type ThemeStore } from "../../store/themeStore";
import { motion, AnimatePresence } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";

const UserProfileMenu = observer(({ isCollapsed }: { isCollapsed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-auto pt-6" ref={menuRef}>
      {/* Menu popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-3 w-64 bg-[var(--background)] border-2 border-[var(--border)] shadow-xl overflow-hidden z-50 text-[var(--foreground)]"
          >
             {/* Header */}
             <div className="p-4 border-b-2 border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
                  AT
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-[var(--foreground)] truncate">Admin Profile</h4>
                  <p className="text-xs text-[var(--foreground)] opacity-60 truncate">System Authority</p>
                </div>
             </div>
             {/* Action Items */}
             <div className="p-2 border-b-2 border-[var(--border)]">
               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <Sparkles className="w-4 h-4" />
                 <span>System Report</span>
               </button>
             </div>
             
             {/* Settings Items */}
             <div className="p-2 border-b-2 border-[var(--border)]">
                <div className="px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors flex items-center justify-between font-medium">
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4" />
                    <span>Theme</span>
                  </div>
                  <Select
                    defaultValue={themeStore.activeTheme.get()}
                    onValueChange={(val) => themeStore.activeTheme.set(val as ThemeStore["activeTheme"])}
                  >
                    <SelectTrigger className="h-8 w-32 bg-[var(--background)] border-[var(--border)] border-opacity-20 text-xs">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lumiere">Lumière</SelectItem>
                      <SelectItem value="aura">Aura</SelectItem>
                      <SelectItem value="midnight">Midnight</SelectItem>
                      <SelectItem value="forest">Forest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors flex items-center justify-between font-medium">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </div>
                  <Select defaultValue="fr">
                    <SelectTrigger className="h-8 w-32 bg-[var(--background)] border-[var(--border)] border-opacity-20 text-xs">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>
             
             <div className="p-2 border-b-2 border-[var(--border)]">
               <Link to="/app" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                 <span className="text-[var(--primary)] font-bold">Exit Admin</span>
               </Link>
             </div>
             
             <div className="p-2">
               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <LogOut className="w-4 h-4" />
                 <span>Log out</span>
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 hover:bg-[var(--code-bg)] transition-colors flex items-center gap-3 border border-transparent hover:border-[var(--border)] hover:border-opacity-20 ${isCollapsed ? 'justify-center w-full' : 'w-full'}`}
      >
        <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
          AT
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 text-left overflow-hidden">
              <h4 className="text-sm font-bold text-[var(--foreground)] truncate">
                Admin Profile
              </h4>
              <p className="text-xs text-[var(--foreground)] opacity-60 truncate">
                System Authority
              </p>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-[var(--foreground)] opacity-60 shrink-0" />
          </>
        )}
      </button>
    </div>
  );
});

// Header component placed within the layout context or imported
const Header = observer(function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [dateStr, setDateStr] = useState("Aujourd'hui");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const today = new Date().toLocaleDateString("en-US", options);
    setDateStr(today.charAt(0).toUpperCase() + today.slice(1));
  }, []);

  return (
    <header className="h-16 bg-[var(--background)] border-b-2 border-[var(--border)] flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-[var(--foreground)] cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 font-serif text-sm italic text-[var(--foreground)] opacity-80">
          <span>Admin Workspace</span>
          <span className="mx-2">—</span>
          <span>{dateStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5 font-bold text-sm tracking-wide">
          <button 
            className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button 
            className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center"
            title="Servers"
          >
            <Server className="w-5 h-5" />
          </button>
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
  const [sidebarWidth, setSidebarWidth] = useState(288); // 288px = w-72
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navItems = [
    { to: "/admin", label: "User Management", icon: Users },
  ];
  
  const secondaryItems = [
    { label: "Operations", icon: Settings },
    { label: "Content", icon: BookOpen },
    { label: "AI Systems", icon: Cpu },
  ]

  return (
    <aside
      style={{ width: isCollapsed ? 80 : sidebarWidth }}
      className={`bg-[var(--background)] h-full border-r border-[var(--border)] border-opacity-20 flex flex-col transition-all transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-30 duration-300 ease-in-out shrink-0`}
    >
      <div className={`p-8 border-b-4 border-[var(--border)] flex items-center shrink-0 ${isCollapsed ? 'justify-center p-4' : 'justify-between'}`}>
        {!isCollapsed && (
          <span className="font-serif font-black text-4xl tracking-tight truncate uppercase">
            Admin.
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            className="hidden lg:block text-[var(--foreground)] opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
          <button
            className="lg:hidden text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className={`flex-1 py-8 space-y-6 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-6'}`}>
        <div className="space-y-4">
          {!isCollapsed && (
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 mb-2 px-4">
              Management
            </h3>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                activeOptions={{ exact: item.to === "/admin" }}
                className={`w-full flex items-center text-sm tracking-wide group transition-colors cursor-pointer ${isCollapsed ? 'justify-center p-3 hover:bg-[var(--code-bg)]' : 'gap-4 p-2'}`}
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-[var(--foreground)]" : "text-[var(--foreground)] opacity-60 group-hover:opacity-100"}`} />
                      {isCollapsed && isActive && (
                        <div className="absolute -left-3 w-1 h-5 bg-[var(--primary)] rounded-r-full" />
                      )}
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span
                          className={
                            isActive
                              ? "text-[var(--foreground)] font-bold truncate"
                              : "text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] font-medium truncate"
                          }
                        >
                          {item.label}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 bg-[var(--primary)] rounded-full transition-opacity ml-auto shrink-0 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        ></span>
                      </>
                    )}
                  </>
                )}
              </Link>
            );
          })}
          
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                href="#"
                key={item.label}
                className={`w-full flex items-center text-sm tracking-wide group transition-colors cursor-pointer ${isCollapsed ? 'justify-center p-3 hover:bg-[var(--code-bg)]' : 'gap-4 p-2'}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 transition-colors text-[var(--foreground)] opacity-60 group-hover:opacity-100`} />
                </div>
                {!isCollapsed && (
                  <span className="text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] font-medium truncate">
                    {item.label}
                  </span>
                )}
              </a>
            );
          })}
        </div>
        
        <div className="pt-6 border-t border-[var(--border)] border-opacity-20">
            <a
                href="#"
                className={`w-full flex items-center text-sm tracking-wide group transition-colors cursor-pointer ${isCollapsed ? 'justify-center p-3 hover:bg-[var(--code-bg)]' : 'gap-4 p-2'}`}
                title={isCollapsed ? "Support" : undefined}
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <HelpCircle className={`w-5 h-5 transition-colors text-[var(--foreground)] opacity-60 group-hover:opacity-100`} />
                </div>
                {!isCollapsed && (
                  <span className="text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] font-medium truncate">
                    Support
                  </span>
                )}
              </a>
        </div>
      </nav>

      <div className={`pb-6 mt-auto shrink-0 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <UserProfileMenu isCollapsed={isCollapsed} />
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div 
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[var(--accent)] hover:opacity-50 transition-colors z-40 hidden lg:block"
          onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.pageX;
            const startWidth = sidebarWidth;
            
            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(200, Math.min(600, startWidth + moveEvent.pageX - startX));
              setSidebarWidth(newWidth);
            };
            
            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
              document.body.style.cursor = "default";
            };
            
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            document.body.style.cursor = "col-resize";
          }}
        ></div>
      )}
    </aside>
  );
};

export default function AdminLayout() {
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
