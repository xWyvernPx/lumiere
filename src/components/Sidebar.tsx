import { Settings, X } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const navItems = [
    { id: 'frontpage', label: 'Practicing' },
    { id: 'classroom', label: 'The Classroom' },
    { id: 'community', label: 'Community Desk' },
    { id: 'archives', label: 'Saved Archives' },
  ];

  const handleNav = (id: string) => {
    setCurrentView(id);
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`bg-[var(--background)] w-72 h-full border-r border-[var(--border)] border-opacity-20 flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 duration-300 ease-in-out`}>
      <div className="p-8 border-b-4 border-[var(--border)] flex items-center justify-between shrink-0">
        <span className="font-serif font-black text-4xl tracking-tight">Lumière.</span>
        <button className="lg:hidden text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80/60 mb-2">Sections</h3>
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-4 text-sm tracking-wide group transition-colors cursor-pointer ${currentView === item.id ? 'text-[var(--foreground)] font-bold' : 'text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] font-medium'}`}
            >
              <span className={`w-1.5 h-1.5 bg-[var(--primary)] rounded-full transition-opacity ${currentView === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="pt-6 border-t border-[var(--border)] border-opacity-20">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">Daily Edition</span>
            <span className="text-xs font-bold text-[var(--accent)]">20/30 XP</span>
          </div>
          <div className="w-full bg-[var(--code-bg)] border border-[var(--border)] border-opacity-20 h-2">
            <div className="bg-[var(--primary)] h-full" style={{ width: '66%' }}></div>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 italic mt-3">10 points remaining to maintain your publishing streak.</p>
        </div>
      </nav>

      <div className="p-6 border-t border-[var(--border)] border-opacity-20 bg-[var(--background)] mt-auto shrink-0">
        <div className="flex items-center gap-4">
          <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=121212&color=fff&rounded=false" alt="User" className="w-10 h-10 grayscale border border-[var(--border)] border-opacity-20" />
          <div className="flex-1 text-left">
            <h4 className="text-sm font-bold text-[var(--foreground)]">Alex Doe</h4>
            <p className="text-xs font-serif text-[var(--foreground)] opacity-80 italic">Intermediate (B1)</p>
          </div>
          <button className="text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
