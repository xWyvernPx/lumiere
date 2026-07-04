import React, { useState, useEffect, useRef } from 'react';
import { X, GraduationCap, Sparkles, BookmarkPlus, ArrowUp, BookOpen, PlusCircle } from 'lucide-react';

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextText: string;
}

export function AssistantDrawer({ isOpen, onClose, contextText }: AssistantDrawerProps) {
  const [inputValue, setInputValue] = useState("");
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [showNotebooks, setShowNotebooks] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowNotebooks(false);
      }
    };
    
    if (showNotebooks) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotebooks]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`fixed inset-0 bg-[var(--background)] bg-opacity-40 backdrop-blur-sm z-[250] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white border-l border-[var(--border)] border-opacity-20 shadow-[-4px_0_15px_rgba(0,0,0,0.03)] flex flex-col z-[300] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Header */}
        <header className="h-16 px-5 border-b border-[var(--border)] border-opacity-20 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-sans font-bold text-[var(--primary)]">Scholar's Assistant</h3>
          </div>
          <button onClick={onClose} className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-colors cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Chat History / Content Area */}
        <div className="flex-1 overflow-y-auto p-5 bg-[var(--background)] flex flex-col gap-6 brutalist-scrollbar">
          {/* User Prompt Context */}
          {contextText && (
            <div className="flex justify-end">
              <div className="bg-white border border-[var(--border)] border-opacity-20 p-3 max-w-[85%] relative">
                <div className="absolute -top-2 -right-2 bg-white border border-[var(--border)] border-opacity-20 px-2 py-0.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">CONTEXT</span>
                </div>
                <p className="font-sans text-[10px] font-bold tracking-widest text-[var(--foreground)] opacity-60 mb-1">Selected text:</p>
                <p className="font-serif text-[var(--primary)] border-l-2 border-[var(--primary)] pl-2 mb-2 italic text-sm">
                  "...{contextText}..."
                </p>
                <p className="font-sans font-bold text-sm text-[var(--primary)]">Explain this word in depth.</p>
              </div>
            </div>
          )}

          {/* AI Response (Mock) */}
          <div className="flex justify-start">
            <div className="bg-white border border-[var(--border)] border-opacity-20 p-4 max-w-[95%] shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] border-opacity-20 pb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-blue-600">AI SCHOLAR</span>
              </div>
              
              {/* Word Header */}
              <div className="mb-4">
                <h4 className="font-serif font-black text-2xl text-[var(--primary)] mb-1">
                  {contextText || "Mutation"} <span className="font-sans text-xs font-normal text-[var(--foreground)] opacity-60 ml-2">/my.ta.sjɔ̃/</span>
                </h4>
                <span className="inline-block px-2 py-1 bg-[var(--background)] border border-[var(--border)] border-opacity-20 font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">
                  NOUN, FEMININE
                </span>
              </div>

              <div className="space-y-4">
                {/* Etymology */}
                <div>
                  <h5 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 mb-1">Etymology</h5>
                  <p className="font-serif text-sm text-[var(--primary)]">
                    Derived from the Latin <span className="italic">mutatio</span> (change, alteration), from the verb <span className="italic">mutare</span> (to move, to change). It shares roots with English "mutation" and "mutable".
                  </p>
                </div>
                
                {/* Usage & Registers */}
                <div>
                  <h5 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 mb-1">Registers & Synonyms</h5>
                  <div className="border-l-2 border-[var(--border)] border-opacity-20 pl-3 space-y-3 mt-2">
                    <div>
                      <p className="font-sans font-bold text-[var(--primary)] text-sm flex justify-between">
                        <span>Soutenu (Formal/Literary)</span>
                        <span className="font-normal text-[var(--foreground)] opacity-60 italic text-xs mt-0.5">Changement, Altération</span>
                      </p>
                      <p className="font-serif text-sm text-[var(--primary)] mt-1 opacity-90">
                        In the text, <span className="italic">{contextText || "mutation"}</span> is used in a formal sense to describe profound, structural change over time, elevating the tone compared to a simple <span className="italic">changement</span>.
                      </p>
                    </div>
                    <div>
                      <p className="font-sans font-bold text-[var(--primary)] text-sm flex justify-between">
                        <span>Courant (Everyday)</span>
                        <span className="font-normal text-[var(--foreground)] opacity-60 italic text-xs mt-0.5">Modification, Transformation</span>
                      </p>
                      <p className="font-serif text-sm text-[var(--primary)] mt-1 opacity-90">
                        In casual conversation, one might refer to a <span className="italic">transformation</span> or simply say things have <span className="italic">évolué</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-[var(--border)] border-opacity-20">
                <div className="relative inline-block text-left w-full" ref={popoverRef}>
                  <button 
                    onClick={() => setShowNotebooks(!showNotebooks)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-[var(--primary)] text-[var(--primary)] font-sans font-bold text-xs uppercase tracking-widest hover:bg-[var(--background)] transition-colors cursor-pointer"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    Add to Notes
                  </button>

                  {showNotebooks && (
                    <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-[var(--border)] border-opacity-20 flex flex-col z-50 origin-bottom shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                      <div className="px-4 py-3 border-b border-[var(--border)] border-opacity-20 bg-[var(--background)] flex items-center justify-between">
                        <h3 className="font-serif font-black text-sm text-[var(--primary)] m-0">Save to Notebook</h3>
                        <button onClick={() => setShowNotebooks(false)} className="text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] transition-colors cursor-pointer p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <ul className="flex flex-col m-0 p-0 list-none max-h-48 overflow-y-auto">
                        {['Phonetics Lab', 'Camus Studies', 'Business French'].map((notebook) => (
                          <li key={notebook} className="group">
                            <button 
                              onClick={() => setShowNotebooks(false)}
                              className="w-full flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] border-opacity-20 bg-white hover:bg-[var(--background)] transition-colors text-left focus:outline-none cursor-pointer"
                            >
                              <BookOpen className="w-4 h-4 text-[var(--foreground)] opacity-60 group-hover:text-[var(--primary)] transition-colors" />
                              <span className="font-sans font-medium text-sm text-[var(--primary)] flex-1">{notebook}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={() => setShowNotebooks(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-[var(--background)] transition-colors text-left focus:outline-none cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4 text-blue-600" />
                        <span className="font-sans font-bold text-sm text-blue-600">Create New Notebook</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-4 border-[var(--primary)] bg-white shrink-0">
          <div className="relative flex items-end border border-[var(--border)] border-opacity-30 bg-[var(--background)] focus-within:border-[var(--primary)] transition-colors">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent border-none p-3 font-serif text-sm text-[var(--primary)] placeholder:text-[var(--foreground)] placeholder:opacity-50 focus:ring-0 resize-none outline-none" 
              placeholder="Ask a follow-up question..." 
              rows={2}
            ></textarea>
            <div className="p-2 shrink-0">
              <button 
                disabled={!inputValue.trim()}
                className="w-8 h-8 flex items-center justify-center bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center px-1">
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50">PRESS ENTER TO SEND</p>
            <button className="font-sans text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:underline cursor-pointer">Clear context</button>
          </div>
        </div>
      </aside>
    </>
  );
}
