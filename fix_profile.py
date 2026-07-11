with open("src/components/layout/AppLayout.tsx", "r") as f:
    c = f.read()

c = c.replace("""import { Outlet, Link, useRouter, useRouterState } from "@tanstack/react-router";""", """import { Outlet, Link, useRouter, useRouterState, useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { authStore, authActions, selectUser } from "../../stores/auth-store";""")

c = c.replace("""const UserProfileMenu = observer(({ isCollapsed }: { isCollapsed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);""", """const UserProfileMenu = observer(({ isCollapsed }: { isCollapsed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useStore(authStore, selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    authActions.logout();
    navigate({ to: "/auth" });
  };

  const userInitials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "SJ";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Sarah Jenkins";
  const email = user?.email || "sarah@school.edu";""")

c = c.replace("""             <div className="p-4 border-b-2 border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
                  SJ
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-[var(--foreground)] truncate">Sarah Jenkins</h4>
                  <p className="text-xs text-[var(--foreground)] opacity-60 truncate">sarah@school.edu</p>
                </div>
             </div>""", """             <div className="p-4 border-b-2 border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
                  {userInitials}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-[var(--foreground)] truncate">{fullName}</h4>
                  <p className="text-xs text-[var(--foreground)] opacity-60 truncate">{email}</p>
                </div>
             </div>""")

c = c.replace("""             <div className="p-2">
               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <LogOut className="w-4 h-4" />
                 <span>Log out</span>
               </button>
             </div>""", """             <div className="p-2">
               <button 
                 onClick={handleLogout}
                 className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium"
               >
                 <LogOut className="w-4 h-4" />
                 <span>Log out</span>
               </button>
             </div>""")


c = c.replace("""        <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
          SJ
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 text-left overflow-hidden">
              <h4 className="text-sm font-bold text-[var(--foreground)] truncate">
                Sarah Jenkins
              </h4>
              <p className="text-xs text-[var(--foreground)] opacity-60 truncate">
                sarah@school.edu
              </p>
            </div>""", """        <div className="w-10 h-10 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--foreground)] font-serif italic text-lg flex items-center justify-center shrink-0">
          {userInitials}
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 text-left overflow-hidden">
              <h4 className="text-sm font-bold text-[var(--foreground)] truncate">
                {fullName}
              </h4>
              <p className="text-xs text-[var(--foreground)] opacity-60 truncate">
                {email}
              </p>
            </div>""")


with open("src/components/layout/AppLayout.tsx", "w") as f:
    f.write(c)

