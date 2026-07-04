import React, { useState, useEffect } from 'react';
import { X, BookOpen, Trash2, ChevronRight, FileText } from 'lucide-react';

interface NotebooksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotebooksDrawer({ isOpen, onClose }: NotebooksDrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  
  const [openNotebooks, setOpenNotebooks] = useState([
    { id: '1', title: 'Phonetics Lab', notesCount: 12, lastUpdated: '10m ago' },
    { id: '2', title: 'Camus Studies', notesCount: 4, lastUpdated: '1h ago' }
  ]);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  const removeNotebook = (id: string) => {
    setOpenNotebooks(prev => prev.filter(nb => nb.id !== id));
  };

  const closeAll = () => {
    setOpenNotebooks([]);
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
        <header className="h-16 px-5 border-b border-[var(--border)] border-opacity-20 flex items-center justify-between bg-[var(--background)] shrink-0">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
            <h2 className="font-sans font-bold text-sm tracking-widest text-[var(--primary)] uppercase">Active Notebooks</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-[var(--foreground)] opacity-50 hover:opacity-100 transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-[var(--background)]">
          {openNotebooks.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-xs font-bold text-[var(--foreground)] opacity-60 uppercase tracking-widest">
                  Open Stack ({openNotebooks.length})
                </span>
                <button 
                  onClick={closeAll}
                  className="font-sans text-[10px] font-bold text-red-600 uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Close All
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {openNotebooks.map(notebook => (
                  <div key={notebook.id} className="bg-white border border-[var(--border)] border-opacity-20 flex flex-col group shadow-sm">
                    <div className="flex justify-between items-center p-4 border-b border-[var(--border)] border-opacity-10">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-[var(--primary)] opacity-70" />
                        <h3 className="font-serif font-bold text-lg text-[var(--primary)]">{notebook.title}</h3>
                      </div>
                      <button 
                        onClick={() => removeNotebook(notebook.id)}
                        className="text-[var(--foreground)] opacity-30 hover:opacity-100 hover:text-red-500 transition-colors cursor-pointer p-1"
                        title="Remove from stack"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button className="flex items-center justify-between p-3 bg-[var(--background)] hover:bg-gray-100 transition-colors cursor-pointer text-left w-full group/btn">
                      <div className="flex items-center gap-2 text-[var(--foreground)] opacity-70">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="font-sans text-xs font-medium">{notebook.notesCount} notes • updated {notebook.lastUpdated}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--primary)] opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-[var(--foreground)] opacity-40"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
              <h3 className="font-serif text-xl font-bold text-[var(--primary)] mb-2">Stack is Empty</h3>
              <p className="font-sans text-sm text-[var(--foreground)]">You have no open notebooks in your stack. Add notes to minimize them here.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
