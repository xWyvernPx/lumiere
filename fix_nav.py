with open("src/components/layout/AppLayout.tsx", "r") as f:
    c = f.read()

c = c.replace("""               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <ShieldCheck className="w-4 h-4" />
                 <span>Account</span>
               </button>""", """               <Link to="/app/account" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium">
                 <ShieldCheck className="w-4 h-4" />
                 <span>Account</span>
               </Link>""")

with open("src/components/layout/AppLayout.tsx", "w") as f:
    f.write(c)

