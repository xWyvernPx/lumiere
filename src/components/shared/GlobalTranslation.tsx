import React, { useState, useEffect, useRef } from 'react';
import { X, Bookmark, Volume2, Info, BookOpen, Sparkles } from 'lucide-react';
import { AssistantDrawer } from './AssistantDrawer';
import { NotebooksDrawer } from './NotebooksDrawer';

export function GlobalTranslation() {
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showNotebooks, setShowNotebooks] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenAssistant = () => setShowAssistant(true);
    const handleOpenNotebooks = () => setShowNotebooks(true);
    
    window.addEventListener('open-assistant', handleOpenAssistant);
    window.addEventListener('open-notebooks', handleOpenNotebooks);
    
    return () => {
      window.removeEventListener('open-assistant', handleOpenAssistant);
      window.removeEventListener('open-notebooks', handleOpenNotebooks);
    };
  }, []);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Don't trigger if we're clicking inside the modal or popup
      if ((e.target as HTMLElement).closest('.translation-ignore') || (e.target as HTMLElement).closest('.assistant-ignore')) {
        return;
      }

      // We'll let context menu handle right clicks
      if (e.button === 2) return;

      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        
        if (text && text.length > 0 && text.length < 150) {
          if (autoTranslate) {
            setSelectedText(text);
            setShowModal(true);
            setPopupPosition(null);
          } else {
            const range = selection?.getRangeAt(0);
            const rect = range?.getBoundingClientRect();
            if (rect) {
              setPopupPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 10
              });
              setSelectedText(text);
            }
          }
        } else {
          // If clicked outside and no text selected, hide floating button
          if (!showModal) {
            setPopupPosition(null);
          }
        }
      }, 10);
    };

    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.translation-ignore') || (e.target as HTMLElement).closest('.assistant-ignore')) {
        return;
      }
      
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (text && text.length > 0 && text.length < 150) {
        e.preventDefault(); // Prevent default context menu
        
        // Show our button exactly at mouse cursor
        setPopupPosition({
          x: e.clientX,
          y: e.clientY
        });
        setSelectedText(text);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [autoTranslate, showModal]);

  // Dragging logic for the popup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && modalRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        modalRef.current.style.left = `${newX}px`;
        modalRef.current.style.top = `${newY}px`;
        modalRef.current.style.transform = 'none';
      }
    };

    const handleMouseUpDrag = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUpDrag);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpDrag);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDownOnHeader = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      // Optional: Prevent text selection while dragging
      e.preventDefault();
    }
  };

  const openAssistant = () => {
    setShowAssistant(true);
    // Don't close the modal immediately, or close it if desired? The requirement says drawer.
  };

  return (
    <>
      {/* Floating Action Button for Selection */}
      {selectedText && popupPosition && !showModal && (
        <div 
          className="fixed z-[100] translation-ignore animate-fade-in-up"
          style={{ 
            left: popupPosition.x, 
            top: popupPosition.y, 
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <button 
            onClick={() => {
              setShowModal(true);
              setPopupPosition(null);
            }}
            className="flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded shadow-lg hover:opacity-90 font-sans font-bold text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Translate
          </button>
        </div>
      )}

      {/* Translation Popup (Draggable, non-blocking) */}
      {selectedText && showModal && (
        <div 
          ref={modalRef}
          className="fixed z-[200] translation-ignore"
          style={{
            top: '20%', // Default position
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="relative bg-white border-t-4 border-[var(--primary)] shadow-2xl w-full max-w-lg flex flex-col animate-fade-in-up">
            {/* Header (Draggable Handle) */}
            <div 
              className="p-5 border-b border-[var(--border)] border-opacity-20 bg-[var(--background)] flex justify-between items-start cursor-move"
              onMouseDown={handleMouseDownOnHeader}
            >
              <div>
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-60 uppercase tracking-widest block mb-2">
                  Selected Phrase (Drag to move)
                </span>
                <h2 className="font-serif font-black text-2xl text-[var(--primary)] mb-1 pointer-events-auto cursor-text">
                  {selectedText}
                </h2>
                <div className="flex items-center gap-2 text-[var(--foreground)] opacity-80 pointer-events-auto cursor-text">
                  <Volume2 className="w-4 h-4" />
                  <span className="font-sans text-sm font-bold opacity-60">/my.ta.sjɔ̃ i.ʁe.vɛʁ.sibl/</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                  setSelectedText('');
                }}
                className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors cursor-pointer pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col gap-6 cursor-auto">
              {/* Direct Translation */}
              <div>
                <span className="font-sans text-[10px] text-blue-700 uppercase tracking-widest block mb-1">
                  Direct Translation
                </span>
                <p className="font-sans font-bold text-[var(--primary)] text-lg">
                  {/* Mock translation for demo purposes */}
                  irreversible mutation
                </p>
              </div>

              {/* Contextual Nuance */}
              <div className="border-l-4 border-[var(--border)] border-opacity-20 pl-4 py-1">
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-60 uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Contextual Nuance
                </span>
                <p className="font-sans text-sm text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
                  In scientific and academic French, this phrasing emphasizes the permanence of a change. While "mutation permanente" is also correct, "irréversible" carries a stronger connotation of a process that cannot be undone.
                </p>
              </div>

              {/* Grammar Insight */}
              <div className="bg-[var(--background)] p-4 flex gap-3">
                <BookOpen className="w-5 h-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-sans text-[10px] text-blue-700 uppercase tracking-widest block mb-1">
                    Grammar Insight
                  </span>
                  <p className="font-sans text-sm text-[var(--primary)] font-medium leading-relaxed">
                    Adjective Agreement: <em className="font-serif italic text-base">irréversible</em> ends in 'e', so its form remains the same for both masculine and feminine singular nouns. Here, it agrees with the feminine noun.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 border-t border-[var(--border)] border-opacity-20 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--background)] cursor-auto">
              <label className="flex items-center gap-2 cursor-pointer order-2 sm:order-1">
                <input 
                  type="checkbox" 
                  checked={autoTranslate}
                  onChange={(e) => setAutoTranslate(e.target.checked)}
                  className="w-4 h-4 accent-[var(--primary)] cursor-pointer"
                />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-70">Auto-Translate</span>
              </label>

              <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 text-[var(--primary)] font-sans font-bold text-xs uppercase tracking-wider border border-[var(--border)] border-opacity-30 px-4 py-2 hover:bg-white transition-colors cursor-pointer">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button 
                  onClick={openAssistant}
                  className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-[var(--primary)] text-[var(--background)] font-sans font-bold text-xs uppercase tracking-wider px-6 py-2 hover:bg-gray-800 transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  Ask AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assistant Drawer */}
      <div className="assistant-ignore">
        <AssistantDrawer 
          isOpen={showAssistant}
          onClose={() => setShowAssistant(false)}
          contextText={selectedText}
        />
        <NotebooksDrawer
          isOpen={showNotebooks}
          onClose={() => setShowNotebooks(false)}
        />
      </div>
    </>
  );
}
