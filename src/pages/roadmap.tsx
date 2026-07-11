import React from 'react';
import { Check, ArrowRight, Headphones, Edit, Lock, BookOpen, MessageSquare, FileText, Route } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function RoadmapPage() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col pb-16">
      {/* Header Section */}
      <div className="border-b-4 border-[var(--primary)] pb-4 mb-10">
        <span className="font-sans text-[10px] font-bold uppercase text-[var(--foreground)] opacity-70 mb-1 tracking-widest block">Curriculum Ledger</span>
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-3xl font-bold text-[var(--primary)]">The Flow</h2>
          <div className="h-4 w-px bg-[var(--border)] border-opacity-20"></div>
          <div className="flex items-center text-[var(--accent)] font-sans text-sm font-bold gap-1 cursor-pointer">
            <span>Français</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-16 border-t-4 border-[var(--primary)] pt-8">
        <span className="font-sans text-[10px] font-bold uppercase text-[var(--background)] bg-[var(--accent)] px-2 py-1 inline-block mb-4 tracking-widest">Architecture of Study</span>
        <h3 className="font-serif text-5xl lg:text-6xl font-black mb-6 text-[var(--primary)] tracking-tight">Niveau B2: Mastery</h3>
        <p className="text-[var(--foreground)] opacity-80 text-lg font-serif italic leading-relaxed max-w-2xl">
          Navigate your path to fluency. Follow the core theoretical trunk, then branch out into applied skills. Complete all branches to master the thematic node.
        </p>
      </div>

      {/* Flowchart Container */}
      <div className="relative py-8 flex flex-col items-center">
        
        {/* Node 1: Completed */}
        <div className="w-full max-w-2xl mb-8 relative z-10">
          <div className="absolute left-1/2 top-full bottom-[-32px] w-[2px] bg-[var(--primary)] transform -translate-x-1/2 z-0"></div>
          
          <div className="border-2 border-[var(--primary)] bg-[var(--background)] p-6 shadow-sm relative z-10">
            <div className="absolute -left-4 -top-4 w-8 h-8 bg-[var(--primary)] text-[var(--background)] rounded-full flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            
            <div className="flex justify-between items-start mb-4 border-b border-[var(--border)] border-opacity-20 pb-4">
              <div>
                <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest block mb-1">Theme I</span>
                <h4 className="font-serif text-2xl font-bold text-[var(--primary)]">Societal Structures & Politics</h4>
              </div>
              <div className="text-right">
                <span className="font-sans text-[10px] font-bold text-[var(--background)] bg-[var(--accent)] px-2 py-1 uppercase tracking-widest">100% COMPLETED</span>
                <div className="text-[var(--foreground)] opacity-70 font-sans text-[10px] font-bold mt-2 uppercase tracking-widest">1,200 XP GAINED</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--code-bg)] p-3 border border-[var(--border)] border-opacity-20 opacity-70">
                <div className="flex items-center gap-2 mb-1 text-[var(--primary)]">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Theory</span>
                </div>
                <span className="font-sans text-sm font-medium">The Subjunctive in Debate</span>
              </div>
              <div className="bg-[var(--code-bg)] p-3 border border-[var(--border)] border-opacity-20 opacity-70">
                <div className="flex items-center gap-2 mb-1 text-[var(--primary)]">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Speaking</span>
                </div>
                <span className="font-sans text-sm font-medium">Defending a Thesis</span>
              </div>
              <div className="bg-[var(--code-bg)] p-3 border border-[var(--border)] border-opacity-20 opacity-70">
                <div className="flex items-center gap-2 mb-1 text-[var(--primary)]">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Writing</span>
                </div>
                <span className="font-sans text-sm font-medium">The Formal Essay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Node 2: Active */}
        <div className="w-full max-w-3xl mb-8 relative z-10">
          <div className="absolute left-1/2 top-full bottom-[-32px] w-[2px] bg-[var(--primary)] transform -translate-x-1/2 z-0 opacity-20"></div>
          
          <div className="border-2 border-[var(--accent)] bg-[var(--background)] shadow-md relative z-10">
            {/* Progress indicator */}
            <div className="absolute top-0 left-0 h-1 bg-[var(--accent)] w-[40%]"></div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-sans text-[10px] font-bold text-[var(--background)] bg-[var(--accent)] px-2 py-1 uppercase tracking-widest">Theme II • Active</span>
                  </div>
                  <h4 className="font-serif text-4xl font-bold text-[var(--primary)] mb-2">Cultural Artifacts & Media</h4>
                  <p className="text-[var(--foreground)] opacity-80 text-sm font-sans font-medium max-w-lg">Deconstruct French literature, cinema, and modern media critique.</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-[var(--primary)] block">40%</span>
                  <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest">Progress</span>
                </div>
              </div>

              {/* Core Theory Trunk */}
              <div className="border border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-[var(--primary)] transition-colors cursor-pointer gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[var(--foreground)] opacity-80">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Core Theory Document</span>
                  </div>
                  <h5 className="font-sans text-lg font-bold text-[var(--primary)]">Literary Analysis & The Passé Simple</h5>
                </div>
                <button className="flex items-center gap-2 text-[var(--accent)] font-sans text-sm font-bold hover:bg-[var(--background)] p-2 transition-colors border border-transparent hover:border-[var(--accent)]">
                  <span>Read</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Branching Skills */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)] border-opacity-20 -z-10 hidden md:block"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  
                  {/* Branch 1 */}
                  <div className="border-2 border-[var(--primary)] bg-[var(--background)] p-5 shadow-sm transform md:-translate-y-2">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-[var(--accent)]">
                        <Headphones className="w-4 h-4" />
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Listening</span>
                      </div>
                      <span className="font-sans text-[10px] font-bold text-[var(--background)] bg-[var(--accent)] px-2 py-0.5 uppercase tracking-widest">IN PROGRESS</span>
                    </div>
                    <h6 className="font-sans text-sm font-bold text-[var(--primary)] mb-2">The Cannes Film Review</h6>
                    <p className="text-xs text-[var(--foreground)] opacity-70 mb-4 font-medium">Comprehend rapid, opinionated speech in a cinematic context.</p>
                    <div className="h-1.5 w-full bg-[var(--border)] bg-opacity-20 mb-4 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)]" style={{ width: '75%' }}></div>
                    </div>
                    <button className="w-full py-2 bg-[var(--primary)] text-[var(--background)] font-sans text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] transition-colors">Resume</button>
                  </div>

                  {/* Branch 2 */}
                  <div className="border border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] p-5 opacity-80 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-[var(--foreground)] opacity-70">
                        <Edit className="w-4 h-4" />
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Writing</span>
                      </div>
                      <Lock className="text-[var(--foreground)] opacity-50 w-4 h-4" />
                    </div>
                    <h6 className="font-sans text-sm font-bold text-[var(--foreground)] mb-2 opacity-80">La Critique Constructive</h6>
                    <p className="text-xs text-[var(--foreground)] opacity-70 mb-4 font-medium">Draft a formal review utilizing nuanced adjectives and the conditional.</p>
                    <div className="text-[10px] font-sans font-bold text-[var(--foreground)] opacity-60 uppercase tracking-widest mt-auto pt-6 border-t border-[var(--border)] border-opacity-20">Requires Listening Completion</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node 3: Locked */}
        <div className="w-full max-w-2xl relative z-10 opacity-60 mt-8">
          <div className="border border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] bg-opacity-50 backdrop-blur-[2px] z-10">
              <Lock className="text-[var(--foreground)] opacity-50 w-10 h-10" />
            </div>
            <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest block mb-2">Theme III</span>
            <h4 className="font-serif text-2xl font-bold text-[var(--foreground)] opacity-80 mb-2">The Parisian Idiom & Slang</h4>
            <p className="text-sm text-[var(--foreground)] opacity-70 max-w-md mx-auto font-medium">Master informal registers, verlan, and the nuances of daily urban interaction.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
