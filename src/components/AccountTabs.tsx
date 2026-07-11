import { Link, useRouterState } from "@tanstack/react-router";

export const AccountTabs = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex border-b border-[var(--primary)] mb-12 flex-wrap">
      <Link 
        to="/app/account" 
        activeOptions={{ exact: true }}
        className={`px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/app/account' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--primary)] hover:bg-[var(--code-bg)]'}`}
      >
        Linguistic Identity
      </Link>
      <Link 
        to="/app/account/hardware" 
        activeOptions={{ exact: true }}
        className={`px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/app/account/hardware' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--primary)] hover:bg-[var(--code-bg)]'}`}
      >
        Hardware & Accessibility
      </Link>
      <Link 
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
    </div>
  );
};
