import React, { useState } from 'react';
import { Flame, Mail, Clock, Bell, BookOpen } from 'lucide-react';
import { AccountTabs } from '../../components/AccountTabs';

export default function NotificationsPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [graded, setGraded] = useState(true);
  const [lesson, setLesson] = useState(true);
  const [time, setTime] = useState("08:00");

  return (
    <div className="max-w-7xl mx-auto w-full flex-1">
      <AccountTabs />
      
      {/* Header */}
      <header className="mb-16 border-b border-[var(--primary)] pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Profile Configuration</span>
          <span className="w-px h-3 bg-[var(--primary)] block"></span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Rituals & Gamification</span>
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[var(--primary)] uppercase tracking-tight">Notifications & Rituals</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Column 1: Settings */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Section 1: Scholarly Streaks & Reminders */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
              <Flame className="w-6 h-6" />
              Scholarly Streaks & Reminders
            </h2>
            <div className="border border-[var(--primary)] p-8 bg-[var(--background)]">
              
              <div className="flex items-center justify-between py-4 border-b border-[var(--primary)] mb-4">
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest mb-1 text-[var(--primary)]">Push Notifications</h3>
                  <p className="font-sans text-sm text-[var(--foreground)] opacity-70">Real-time alerts for critical academic milestones.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer" onClick={() => setPush(!push)}>
                  <input type="checkbox" className="sr-only" checked={push} readOnly />
                  <div className={`block h-6 rounded-none transition-colors border border-[var(--primary)] ${push ? 'bg-[var(--primary)]' : 'bg-[var(--code-bg)]'}`}></div>
                  <div className={`absolute top-[1px] w-5 h-5 rounded-none transition-transform bg-[var(--background)] border border-[var(--primary)] ${push ? 'transform translate-x-[22px]' : 'left-[1px]'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[var(--primary)] mb-8">
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest mb-1 text-[var(--primary)]">Email Digests</h3>
                  <p className="font-sans text-sm text-[var(--foreground)] opacity-70">Weekly summaries of your scholarly progress.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer" onClick={() => setEmail(!email)}>
                  <input type="checkbox" className="sr-only" checked={email} readOnly />
                  <div className={`block h-6 rounded-none transition-colors border border-[var(--primary)] ${email ? 'bg-[var(--primary)]' : 'bg-[var(--code-bg)]'}`}></div>
                  <div className={`absolute top-[1px] w-5 h-5 rounded-none transition-transform bg-[var(--background)] border border-[var(--primary)] ${email ? 'transform translate-x-[22px]' : 'left-[1px]'}`}></div>
                </div>
              </div>

              <div className="bg-[var(--code-bg)] p-6 border border-[var(--primary)]">
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-[var(--primary)]">
                  <Clock className="w-4 h-4" />
                  Daily Shadowing Drill Reminder
                </h3>
                <p className="font-sans text-sm text-[var(--foreground)] opacity-70 mb-6">Schedule your dedicated time for phonetic mimicry exercises.</p>
                
                <div className="flex items-end gap-4">
                  <div className="flex flex-col w-32">
                    <label className="font-sans text-[10px] font-bold tracking-widest mb-2 uppercase text-[var(--foreground)] opacity-60">Time</label>
                    <input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-transparent border-0 border-b border-[var(--primary)] focus:ring-0 p-2 font-sans text-base font-bold text-center rounded-none shadow-none text-[var(--primary)] outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all" 
                    />
                  </div>
                  <button className="px-6 py-2 bg-[var(--primary)] text-[var(--background)] font-sans text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] transition-colors duration-200">
                    Set Ritual
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* Section 2: Academic Alerts */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6" />
              Academic Alerts
            </h2>
            <div className="border border-[var(--primary)] p-8 bg-[var(--background)]">
              
              <div className="flex items-center justify-between py-4 border-b border-[var(--primary)] mb-4">
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest mb-1 text-[var(--primary)]">Submission Graded</h3>
                  <p className="font-sans text-sm text-[var(--foreground)] opacity-70">Receive an alert when a mentor reviews your essay.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer" onClick={() => setGraded(!graded)}>
                  <input type="checkbox" className="sr-only" checked={graded} readOnly />
                  <div className={`block h-6 rounded-none transition-colors border border-[var(--primary)] ${graded ? 'bg-[var(--primary)]' : 'bg-[var(--code-bg)]'}`}></div>
                  <div className={`absolute top-[1px] w-5 h-5 rounded-none transition-transform bg-[var(--background)] border border-[var(--primary)] ${graded ? 'transform translate-x-[22px]' : 'left-[1px]'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest mb-1 text-[var(--primary)]">New Lesson Assigned</h3>
                  <p className="font-sans text-sm text-[var(--foreground)] opacity-70">Notification upon unlocking advanced curriculum modules.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer" onClick={() => setLesson(!lesson)}>
                  <input type="checkbox" className="sr-only" checked={lesson} readOnly />
                  <div className={`block h-6 rounded-none transition-colors border border-[var(--primary)] ${lesson ? 'bg-[var(--primary)]' : 'bg-[var(--code-bg)]'}`}></div>
                  <div className={`absolute top-[1px] w-5 h-5 rounded-none transition-transform bg-[var(--background)] border border-[var(--primary)] ${lesson ? 'transform translate-x-[22px]' : 'left-[1px]'}`}></div>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Column 2: Gamification Ledger */}
        <div className="lg:col-span-4">
          <section className="sticky top-8">
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6">Metrics Ledger</h2>
            
            <div className="border border-[var(--primary)] bg-[var(--background)] flex flex-col">
              
              <div className="p-6 border-b border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]">
                <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">Current Streak</h3>
                <div className="font-serif text-5xl font-bold flex items-baseline">
                  42 <span className="font-sans text-sm font-bold ml-2 opacity-80 uppercase tracking-widest">Days</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 mb-2">Total Wealth</h3>
                <div className="font-serif text-3xl font-bold flex items-center mb-6 text-[var(--primary)]">
                  <Flame className="w-8 h-8 mr-2" />
                  1,850 Florins
                </div>

                <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 mb-4 border-b border-[var(--primary)] border-opacity-20 pb-2">
                  Recent Acquisitions
                </h4>
                
                <ul className="space-y-4">
                  <li className="flex justify-between items-center font-sans text-sm font-bold">
                    <span className="text-[var(--primary)]">Weekly Shadowing Completion</span>
                    <span className="font-sans text-xs tracking-widest text-[var(--accent)]">+50 F</span>
                  </li>
                  <li className="flex justify-between items-center font-sans text-sm font-bold">
                    <span className="text-[var(--primary)]">Consecutive Login Bonus</span>
                    <span className="font-sans text-xs tracking-widest text-[var(--accent)]">+15 F</span>
                  </li>
                  <li className="flex justify-between items-center font-sans text-sm font-medium">
                    <span className="text-[var(--foreground)] opacity-70">Grammar Module B2.1</span>
                    <span className="font-sans text-xs font-bold tracking-widest text-[var(--primary)] opacity-60">+100 F</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
