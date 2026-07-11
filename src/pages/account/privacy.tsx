import React from 'react';
import { Shield, Key, FileText, Database } from 'lucide-react';
import { useStore } from '@tanstack/react-store';
import { AccountTabs } from '../../components/AccountTabs';
import { authStore, selectUser } from '../../stores/auth-store';

import { useState } from 'react';

export default function PrivacyPage() {
  const [timezone, setTimezone] = useState("CET (Central European Time)");
  const user = useStore(authStore, selectUser);

  return (
    <div className="max-w-7xl mx-auto w-full flex-1">
      <AccountTabs />
      
      {/* Header */}
      <header className="mb-16 border-b border-[var(--primary)] pb-8">
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[var(--primary)] uppercase tracking-tight">Account & Privacy</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Main Ledger) */}
        <div className="lg:col-span-7 flex flex-col gap-16">
          
          {/* Section 1: Identity Ledger */}
          <section>
            <header className="border-b border-[var(--primary)] pb-2 mb-8 flex justify-between items-end">
              <h2 className="font-sans text-[13px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">I. Identity Ledger</h2>
            </header>
            
            <div className="flex gap-8 items-start flex-wrap sm:flex-nowrap">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 border border-[var(--primary)] bg-[var(--background)] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[var(--code-bg)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--primary)]">Modify</span>
                  </div>
                  <span className="font-serif text-4xl text-[var(--primary)]">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <button className="font-sans text-xs font-bold text-[var(--primary)] hover:text-[var(--accent)] underline underline-offset-4 transition-colors">
                  Modify
                </button>
              </div>

              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
                <div className="col-span-1">
                  <label className="font-sans text-xs font-medium text-[var(--foreground)] opacity-70 block mb-1">Given Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name?.split(' ')[0] || ''} 
                    className="font-sans text-base w-full bg-transparent border-b border-[var(--primary)] py-2 outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all" 
                  />
                </div>
                <div className="col-span-1">
                  <label className="font-sans text-xs font-medium text-[var(--foreground)] opacity-70 block mb-1">Surname</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name?.split(' ')[1] || ''} 
                    className="font-sans text-base w-full bg-transparent border-b border-[var(--primary)] py-2 outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all" 
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 mt-2">
                  <label className="font-sans text-xs font-medium text-[var(--foreground)] opacity-70 block mb-1">Temporal Meridian (Timezone)</label>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="font-sans text-base w-full bg-transparent border-b border-[var(--primary)] py-2 outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all appearance-none cursor-pointer">
                    <option>GMT (Greenwich Mean Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>CET (Central European Time)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Authentication Protocols */}
          <section>
            <header className="border-b border-[var(--primary)] pb-2 mb-8 flex justify-between items-end">
              <h2 className="font-sans text-[13px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">II. Authentication Protocols</h2>
            </header>
            
            <div className="space-y-4">
              {/* Provider Row */}
              <div className="flex justify-between items-center py-4 border-b border-[var(--code-bg)]">
                <div className="flex items-center gap-4">
                  <span className="font-sans text-sm font-bold w-24 text-[var(--primary)]">Google</span>
                  <span className="font-sans text-base text-[var(--foreground)] opacity-80">{user?.email || 'user@example.com'}</span>
                </div>
                <button className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 border border-[var(--primary)] text-[var(--primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
                  Unlink
                </button>
              </div>

              {/* Provider Row */}
              <div className="flex justify-between items-center py-4 border-b border-[var(--code-bg)]">
                <div className="flex items-center gap-4">
                  <span className="font-sans text-sm font-bold w-24 text-[var(--primary)]">Apple</span>
                  <span className="font-sans text-base text-[var(--foreground)] opacity-50 italic">Not Connected</span>
                </div>
                <button className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--accent)] transition-colors">
                  Link
                </button>
              </div>

              <div className="pt-6">
                <button className="font-sans text-sm font-bold text-red-600 hover:text-red-700 underline underline-offset-4 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Reset Credentials
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Affiliations) */}
        <div className="lg:col-span-5">
          <section className="p-8 border border-[var(--primary)] bg-[var(--background)]">
            <header className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-2">Scholastic Affiliations</h2>
              <p className="font-sans text-base text-[var(--foreground)] opacity-70">
                Current active classrooms and institutional ties.
              </p>
            </header>
            
            <ul className="space-y-0">
              {/* List Item */}
              <li className="py-4 border-b border-[var(--code-bg)] flex justify-between items-center group">
                <div>
                  <div className="font-sans text-sm font-bold flex items-center gap-2 text-[var(--primary)]">
                    Mme. Laurent
                    <span className="border-l border-[var(--primary)] pl-2 text-[var(--accent)] font-sans text-xs">B2</span>
                  </div>
                  <div className="font-sans text-sm text-[var(--foreground)] opacity-70 mt-1">Advanced Syntax</div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-xs font-bold text-red-600 underline underline-offset-2">
                  Leave
                </button>
              </li>

              {/* List Item */}
              <li className="py-4 border-b border-[var(--code-bg)] flex justify-between items-center group">
                <div>
                  <div className="font-sans text-sm font-bold flex items-center gap-2 text-[var(--primary)]">
                    Prof. Higgins
                    <span className="border-l border-[var(--primary)] pl-2 text-[var(--accent)] font-sans text-xs">C1</span>
                  </div>
                  <div className="font-sans text-sm text-[var(--foreground)] opacity-70 mt-1">Phonetics Seminar</div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-xs font-bold text-red-600 underline underline-offset-2">
                  Leave
                </button>
              </li>

              {/* Pending Invitation */}
              <li className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-sans text-sm font-bold flex items-center gap-2 italic text-[var(--foreground)] opacity-60">
                    Dr. Aris
                    <span className="border-l border-[var(--primary)] pl-2 text-[var(--accent)] font-sans text-xs not-italic">A1</span>
                  </div>
                  <div className="font-sans text-sm text-[var(--foreground)] opacity-70 mt-1">Introductory Greek</div>
                </div>
                <button className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--accent)] transition-colors">
                  Accept
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
