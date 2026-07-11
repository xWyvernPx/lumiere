with open("src/components/layout/AppLayout.tsx", "r") as f:
    c = f.read()

import re

old_chunk = """               <Link 
                 to="/admin" 
                 onClick={() => {
                   if (user) {
                     authActions.setUser({ ...user, role: { name: 'ADMIN', permissions: [] } });
                   }
                 }}
                 className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium"
               >
                 <ShieldCheck className="w-4 h-4 text-blue-600" />
                 <span className="text-blue-600 font-bold">Admin Dashboard</span>
               </Link>"""

new_chunk = """               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   if (user) {
                     authActions.setUser({ ...user, role: { name: 'ADMIN', permissions: [] } });
                     setTimeout(() => {
                        navigate({ to: '/admin' });
                     }, 0);
                   }
                 }}
                 className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--code-bg)] hover:text-[var(--accent)] transition-colors text-left font-medium"
               >
                 <ShieldCheck className="w-4 h-4 text-blue-600" />
                 <span className="text-blue-600 font-bold">Admin Dashboard</span>
               </button>"""

if old_chunk in c:
    c = c.replace(old_chunk, new_chunk)
else:
    print("Chunk not found!")

with open("src/components/layout/AppLayout.tsx", "w") as f:
    f.write(c)

