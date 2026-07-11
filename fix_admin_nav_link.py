with open("src/components/layout/AdminLayout.tsx", "r") as f:
    c = f.read()

c = c.replace("""          {secondaryItems.map((item) => {
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
          })}""", """          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                to={item.to as any}
                key={item.label}
                activeOptions={{ exact: false }}
                onClick={() => setIsSidebarOpen(false)}
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
          })}""")

c = c.replace("""  const secondaryItems = [
    { label: "Operations", icon: Settings },
    { label: "AI Systems", icon: Cpu },
  ]""", """  const secondaryItems = [
    { to: "/admin/activities", label: "Activity Types", icon: BookOpen },
    { to: "/admin/operations", label: "Operations", icon: Settings },
    { to: "/admin/ai-systems", label: "AI Systems", icon: Cpu },
  ]""")

with open("src/components/layout/AdminLayout.tsx", "w") as f:
    f.write(c)

