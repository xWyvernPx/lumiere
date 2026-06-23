import { useEffect, useState } from 'react';
import { Flame, Bookmark, ChevronDown, Menu, Palette } from 'lucide-react';
import { observer } from '@legendapp/state/react';
import { themeStore, type ThemeStore } from '../store/themeStore';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = observer(function Header({ toggleSidebar }: HeaderProps) {
  const [dateStr, setDateStr] = useState("Aujourd'hui");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const today = new Date().toLocaleDateString('fr-FR', options);
    setDateStr(today.charAt(0).toUpperCase() + today.slice(1));
  }, []);

  return (
    <header className="h-16 bg-[var(--background)] border-b-2 border-[var(--border)] flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-[var(--foreground)] cursor-pointer" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden sm:flex items-center gap-2 font-serif text-sm italic text-[var(--foreground)] opacity-80">
          <span>L'Édition du Matin</span>
          <span className="mx-2">—</span>
          <span>{dateStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative flex items-center">
          <Palette className="w-4 h-4 text-[var(--foreground)] absolute left-3 pointer-events-none" />
          <select 
            className="appearance-none bg-transparent border border-[var(--border)] border-opacity-20 text-[var(--foreground)] text-sm font-serif italic py-1.5 pl-9 pr-8 cursor-pointer focus:outline-none focus:border-[var(--border)] hover:bg-[var(--code-bg)] transition-colors"
            value={themeStore.activeTheme.get()}
            onChange={(e) => themeStore.activeTheme.set(e.target.value as ThemeStore['activeTheme'])}
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
          <div className="flex items-center gap-1 sm:gap-2 cursor-help" title="12 Day Streak">
            <Flame className="w-4 h-4 text-[var(--foreground)]" />
            <span>12</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 cursor-help" title="450 Gems">
            <Bookmark className="w-4 h-4 text-[var(--accent)]" />
            <span>450</span>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
