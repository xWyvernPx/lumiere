with open("src/components/AccountTabs.tsx", "r") as f:
    c = f.read()

c = c.replace("""      <Link 
        to="/app/account/privacy" 
        activeOptions={{ exact: true }}
        className={`px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/app/account/privacy' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--primary)] hover:bg-[var(--code-bg)]'}`}
      >
        Account & Privacy
      </Link>
    </div>""", """      <Link 
        to="/app/account/privacy" 
        activeOptions={{ exact: true }}
        className={`px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/app/account/privacy' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--primary)] hover:bg-[var(--code-bg)]'}`}
      >
        Account & Privacy
      </Link>
      <Link 
        to="/app/account/notifications" 
        activeOptions={{ exact: true }}
        className={`px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/app/account/notifications' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--primary)] hover:bg-[var(--code-bg)]'}`}
      >
        Notifications & Gamification
      </Link>
    </div>""")

with open("src/components/AccountTabs.tsx", "w") as f:
    f.write(c)

