import React from 'react';
import { Plus, ToggleRight, ToggleLeft } from 'lucide-react';
import { useStore } from '@tanstack/react-store';
import { authStore, selectUser } from '../../stores/auth-store';
import { AccountTabs } from '../../components/AccountTabs';

export default function AccountPage() {
  const user = useStore(authStore, selectUser);

  return (
    <div className="max-w-7xl mx-auto w-full flex-1">
      <AccountTabs />
      {/* Header Section */}
      <section className="mb-16 md:mb-24">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-6 uppercase tracking-tight">
          Linguistic Identity
        </h2>
        <div className="w-24 h-px bg-[var(--primary)] mb-6"></div>
        <p className="font-sans text-lg text-[var(--foreground)] opacity-80 max-w-3xl leading-relaxed">
          The foundation of the Scholar's personalized curriculum. This immutable ledger governs the stylistic, cultural, and pedagogical parameters of your engagements within the archive.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-12">
        {/* Left Column: Linguistic Matrix & Mastery */}
        <div className="md:col-span-8 flex flex-col gap-12">
          {/* Linguistic Matrix */}
          <section className="border border-[var(--primary)] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[var(--background)] px-2">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                The Matrix
              </h3>
            </div>
            {/* Mother Tongue */}
            <div className="mb-8">
              <h4 className="font-serif text-2xl font-semibold text-[var(--primary)] mb-4 border-b border-[var(--primary)] pb-2">
                The Mother Tongue
              </h4>
              <div className="flex items-center justify-between py-3">
                <span className="font-sans text-base font-bold text-[var(--foreground)]">
                  English (US)
                </span>
                <span className="font-sans text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]">
                  NATIVE
                </span>
              </div>
            </div>

            {/* Acquired Dialects */}
            <div>
              <div className="flex items-center justify-between border-b border-[var(--primary)] pb-2 mb-4">
                <h4 className="font-serif text-2xl font-semibold text-[var(--primary)]">
                  Acquired Dialects
                </h4>
                <button className="font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[var(--accent)] transition-colors text-[var(--foreground)]">
                  <Plus className="w-4 h-4" />
                  New Pursuit
                </button>
              </div>
              <ul className="flex flex-col text-[var(--foreground)]">
                <li className="flex items-center justify-between py-4 border-b border-[var(--border)] border-opacity-20 last:border-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-base font-bold">French (Metropolitan)</span>
                    <span className="font-sans text-xs opacity-80">Primary Focus</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[var(--primary)]">
                      B2
                    </span>
                    <ToggleRight className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 border-b border-[var(--border)] border-opacity-20 last:border-0 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-base font-bold">Spanish (Castilian)</span>
                    <span className="font-sans text-xs opacity-80">Dormant</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[var(--primary)] border-opacity-40">
                      A2
                    </span>
                    <ToggleLeft className="w-6 h-6 opacity-60" />
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* CEFR Mastery Track */}
          <section className="border border-[var(--primary)] p-8 relative">
            <div className="absolute -top-3 left-6 bg-[var(--background)] px-2">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                Mastery Progression
              </h3>
            </div>
            <div className="flex justify-between items-end mb-8 text-[var(--foreground)]">
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                  Current Standing
                </p>
                <p className="font-serif text-3xl font-bold">
                  B2 <span className="text-2xl font-normal opacity-80">- Vantage</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                  Target Goal
                </p>
                <p className="font-serif text-3xl font-bold">
                  C1 <span className="text-2xl font-normal opacity-80">- Mastery</span>
                </p>
              </div>
            </div>
            <div className="w-full flex items-center mb-4">
              <div className="w-3/5 h-1 bg-[var(--accent)] relative">
                <div className="absolute right-0 -top-1 w-3 h-3 rounded-full bg-[var(--accent)]"></div>
              </div>
              <div className="w-2/5 h-px bg-[var(--border)] bg-opacity-20"></div>
            </div>
            <div className="flex justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">
              <span>A1</span>
              <span>A2</span>
              <span>B1</span>
              <span className="text-[var(--primary)] font-black opacity-100">B2</span>
              <span>C1</span>
              <span>C2</span>
            </div>
          </section>
        </div>

        {/* Right Column: The Scholar's Context */}
        <div className="md:col-span-4 flex flex-col h-full">
          <section className="border border-[var(--primary)] p-8 flex-1 relative flex flex-col bg-[var(--code-bg)]">
            <div className="absolute -top-3 left-6 bg-[var(--code-bg)] px-2">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                Contextual Primer
              </h3>
            </div>
            <p className="font-sans text-base text-[var(--foreground)] opacity-80 mb-8 italic">
              These epistemological anchors dictate the thematic resonance of generated materials, ensuring semantic alignment with your professional and personal trajectory.
            </p>
            <div className="flex flex-col gap-6 flex-1 text-[var(--foreground)]">
              {/* Profession */}
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--primary)] border-b border-[var(--border)] border-opacity-20 pb-2 mb-3">
                  Vocation
                </h4>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-sans text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                    Software Engineering
                  </span>
                  <span className="w-px h-4 bg-[var(--border)] opacity-20 my-auto"></span>
                  <span className="font-sans text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                    Systems Architecture
                  </span>
                </div>
              </div>

              {/* Intent */}
              <div>
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--primary)] border-b border-[var(--border)] border-opacity-20 pb-2 mb-3">
                  Primary Objective
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="font-sans text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                    Relocation to Paris (Q3 2024)
                  </span>
                </div>
              </div>

              {/* Interests */}
              <div className="flex-1">
                <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--primary)] border-b border-[var(--border)] border-opacity-20 pb-2 mb-3">
                  Domains of Inquiry
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['19th Century Literature', 'Culinary History', 'Urban Typography', 'Post-Structuralism'].map((topic) => (
                    <span
                      key={topic}
                      className="font-sans text-xs font-medium px-3 py-1 border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                  <button className="font-sans text-xs font-medium px-3 py-1 border border-[var(--primary)] border-dashed opacity-60 hover:opacity-100 hover:border-solid transition-all flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Append
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
