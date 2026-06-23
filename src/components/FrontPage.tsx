import { useState } from 'react';
import { Mic, Headphones, BookOpen, PenTool, ArrowRight, Clock, Lock } from 'lucide-react';

export default function FrontPage({ setCurrentView }: { setCurrentView: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState('speaking');

  const tabs = [
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'listening', label: 'Listening', icon: Headphones },
    { id: 'reading', label: 'Reading', icon: BookOpen },
    { id: 'writing', label: 'Writing', icon: PenTool },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 block fade-in-view">
      <section className="border-b border-[var(--border)] pb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 pr-0 md:pr-8 md:border-r border-[var(--border)] border-opacity-20">
            <span className="inline-block border border-[var(--border)] text-[var(--foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-4">Front Page</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">Speaking: The Parisian Café</h2>
            <p className="font-serif text-xl text-[var(--foreground)] opacity-80 mb-6 leading-relaxed">Master the art of ordering coffee and croissants. Practice your pronunciation, master social pleasantries, and navigate a simulated conversation with our AI barista.</p>
            
            <div className="flex items-center gap-6">
              <button className="px-6 py-3 bg-[var(--primary)] text-[var(--background)] text-xs font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center gap-2">
                Resume Session <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex-1 max-w-[200px]">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-[var(--foreground)]">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-[var(--code-bg)] border border-[var(--border)] border-opacity-20 h-1.5">
                  <div className="bg-[var(--primary)] h-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="aspect-[4/3] bg-[var(--code-bg)] border border-[var(--border)] flex items-center justify-center mb-3 relative overflow-hidden group">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10">
                <defs>
                  <pattern id="hatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#121212" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hatch)" />
              </svg>
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-24 h-24 relative z-10 transition-transform duration-500 group-hover:scale-105" fill="none" stroke="#121212" strokeWidth="1.5" strokeLinecap="square">
                <ellipse cx="30" cy="52" rx="18" ry="4" />
                <path d="M16 52 c 0 6, 28 6, 28 0" />
                <path d="M18 28 v 12 c 0 8, 24 8, 24 0 v -12" />
                <line x1="14" y1="28" x2="46" y2="28" />
                <path d="M42 32 h 6 c 4 0, 4 8, 0 8 h -5" />
                <path d="M24 22 q -2 -3, 0 -6 t 0 -6" />
                <path d="M30 24 q -3 -4, 0 -8 t 0 -8" />
                <path d="M36 22 q -2 -3, 0 -6 t 0 -6" />
              </svg>
            </div>
            <span className="text-xs font-serif italic text-[var(--foreground)] opacity-80 text-right">Fig 1. Scene illustration.</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-2 border-b-2 border-[var(--border)] gap-4">
          <h3 className="text-3xl font-serif font-black">Curriculum</h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-[-2px]">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'text-[var(--foreground)] border-[var(--border)]' : 'text-[var(--foreground)] opacity-80 border-transparent hover:text-[var(--foreground)]'}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            )})}
          </div>
        </div>

        <div className="relative fade-in-view" key={activeTab}>
          {activeTab === 'speaking' && <SpeakingTab />}
          {activeTab === 'listening' && <ListeningTab />}
          {activeTab === 'reading' && <ReadingTab onReadSession={() => setCurrentView('reading-session')} />}
          {activeTab === 'writing' && <WritingTab />}
        </div>
      </section>
      
      <div className="h-12 border-t-2 border-[var(--border)] pt-4 flex justify-between items-center mt-10">
        <span className="font-serif font-black text-xl">Lumière.</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">© 2026 Éditions Lumière</span>
      </div>
    </div>
  );
}

function SpeakingTab() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-6">I. Phonetics & Mechanics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <div className="group cursor-pointer">
            <div className="border-t-4 border-[var(--border)] pt-3 mb-3">
              <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">The Art of Shadowing</h4>
              <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Mimic native speakers meticulously to improve your intonation, flow, and overall conversational rhythm.</p>
            </div>
            <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">Status</span>
              <span className="text-xs font-serif italic text-[var(--foreground)]">8/10 Completed</span>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="border-t-[1px] border-[var(--border)] pt-3 mb-3">
              <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">Pronunciation Lab</h4>
              <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Targeted phonetic practice. Focus on tricky sounds such as the guttural French 'R' and complex nasal vowels.</p>
            </div>
            <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">Series</span>
              <span className="text-xs font-serif italic text-[var(--foreground)]">12 Lessons</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-6">II. Simulated Scenarios</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <div className="group cursor-pointer">
            <div className="border-t-[1px] border-[var(--border)] pt-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-serif font-bold text-xl group-hover:text-[var(--accent)] transition-colors">The Parisian Café</h4>
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
              </div>
              <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Engage in interactive AI conversations modeled after real-world scenarios. Practice ordering and pleasantries.</p>
            </div>
            <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">In Progress</span>
              <span className="text-xs font-serif italic text-[var(--foreground)] opacity-80 flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min</span>
            </div>
          </div>
          <div className="group cursor-pointer opacity-60">
            <div className="border-t-[1px] border-[var(--border)] pt-3 mb-3">
              <h4 className="font-serif font-bold text-xl mb-2 flex items-center gap-2">Discuss & Debate <Lock className="w-4 h-4" /></h4>
              <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Learn to express complex opinions and construct persuasive arguments. Restricted to Level B2+ learners.</p>
            </div>
            <div className="border-t border-[var(--border)] border-opacity-20 pt-3">
              <div className="w-full bg-[var(--code-bg)] h-1">
                <div className="bg-[#333333] h-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListeningTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      <div className="group cursor-pointer">
        <div className="border-t-4 border-[var(--border)] pt-3 mb-3">
          <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">Daily Podcasts</h4>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Slowed-down news and stories with interactive transcripts to follow along word-by-word.</p>
        </div>
        <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">New Episode</span>
          <span className="text-xs font-serif italic text-[var(--foreground)]">Vol. 42</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="border-t-[1px] border-[var(--border)] pt-3 mb-3">
          <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">Dictée Classique</h4>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">The classic French dictation exercise. Listen to a passage and type exactly what you hear to master spelling and grammar nuances.</p>
        </div>
      </div>
    </div>
  );
}

function ReadingTab({ onReadSession }: { onReadSession: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      <div className="group cursor-pointer" onClick={onReadSession}>
        <div className="border-t-4 border-[var(--border)] pt-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-serif font-bold text-xl group-hover:text-[var(--accent)] transition-colors">Headline Analysis</h4>
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Real headlines graded for your reading level. Understand the news as it breaks in the Francophone world.</p>
        </div>
        <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">Source: Le Monde</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] border border-[var(--border)] px-1">DELF B2</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="border-t-[1px] border-[var(--border)] pt-3 mb-3">
          <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">Literary Snippets</h4>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Immerse yourself in excerpts from classic French literature. Featuring Hugo, Camus, and Proust.</p>
        </div>
      </div>
    </div>
  );
}

function WritingTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      <div className="group cursor-pointer">
        <div className="border-t-4 border-[var(--border)] pt-3 mb-3">
          <h4 className="font-serif font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">The Editor's Desk</h4>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-4 line-clamp-3">Write a short paragraph daily on a given prompt. Our AI 'editor' will review and correct your grammar.</p>
        </div>
        <div className="flex justify-between items-center border-t border-[var(--border)] border-opacity-20 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Due Today</span>
        </div>
      </div>
    </div>
  );
}
