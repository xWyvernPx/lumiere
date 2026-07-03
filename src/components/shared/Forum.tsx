import React from "react";
import { ThumbsUp, Reply, Mail, Type, Italic, Quote } from "lucide-react";

export function ForumContent({ title = "L'Étranger : Subtexte Algérien" }: { title?: string }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <header className="p-6 border-b-4 border-[var(--primary)] bg-white flex-none">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[var(--foreground)] opacity-60">Le Discours</span>
          <span className="w-8 border-b border-[var(--primary)]"></span>
        </div>
        <h1 className="font-serif font-black text-3xl text-[var(--primary)] mb-1">{title}</h1>
        <p className="font-sans font-bold text-xs text-[var(--foreground)] opacity-70">Modéré par Prof. Laurent | 42 Contributions</p>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white brutalist-scrollbar">
        {/* Thread Entry 1 */}
        <article className="flex space-x-4">
          <div className="flex flex-col items-center flex-none">
            <div className="w-10 h-10 bg-[var(--background)] border border-[var(--primary)] flex items-center justify-center font-sans font-bold text-sm text-[var(--primary)]">EL</div>
            <div className="w-px h-full bg-[var(--border)] opacity-30 mt-2"></div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="font-sans font-bold text-sm text-[var(--primary)]">Élise Dubois</span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">Il y a 2 heures</span>
            </div>
            <p className="font-serif italic text-[var(--foreground)] opacity-90 mb-3 leading-relaxed">
              L'absence de nom pour l'Arabe n'est pas simplement une omission stylistique, c'est une décision politique de Camus. Cela reflète l'effacement colonial. Comment peut-on lire cela autrement que comme un acte de dépossession ?
            </p>
            <div className="flex space-x-4 mt-2">
              <button className="flex items-center space-x-1 text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-sans font-bold text-xs">12</span>
              </button>
              <button className="flex items-center space-x-1 text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 transition-colors">
                <Reply className="w-4 h-4" />
                <span className="font-sans font-bold text-xs">Répondre</span>
              </button>
            </div>
          </div>
        </article>
        
        {/* Thread Entry 2 (Nested) */}
        <article className="flex space-x-4 pl-14">
          <div className="flex flex-col items-center flex-none">
            <div className="w-10 h-10 bg-[var(--primary)] text-[var(--background)] border border-[var(--primary)] flex items-center justify-center font-sans font-bold text-sm">MR</div>
            <div className="w-px h-full bg-transparent mt-2"></div>
          </div>
          <div className="flex-1 pb-4 border-b border-[var(--border)] border-opacity-20">
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="font-sans font-bold text-sm text-[var(--primary)]">Marc Rousseau</span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">Il y a 45 min</span>
            </div>
            <p className="font-serif italic text-[var(--foreground)] opacity-90 mb-3 leading-relaxed">
              Je ne suis pas tout à fait d'accord, Élise. Bien que le contexte colonial soit indéniable, réduire l'œuvre à cela ignore l'absurdisme central. Le soleil lui-même est plus antagoniste que toute figure humaine dans cette scène.
            </p>
            <div className="flex space-x-4 mt-2">
              <button className="flex items-center space-x-1 text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-sans font-bold text-xs">5</span>
              </button>
              <button className="flex items-center space-x-1 text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 transition-colors">
                <Reply className="w-4 h-4" />
                <span className="font-sans font-bold text-xs">Répondre</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function ForumDraft() {
  return (
    <div className="flex flex-col h-full bg-[var(--background)] relative">
      <header className="p-6 border-b border-[var(--border)] border-opacity-20 bg-white flex-none flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-serif font-bold text-xl text-[var(--primary)]">Votre Contribution</h2>
          <p className="font-sans font-bold text-xs text-[var(--foreground)] opacity-60 mt-1">Réponse à Marc Rousseau</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-[var(--border)] border-opacity-30 bg-white hover:bg-[var(--background)] transition-colors cursor-pointer" title="Brouillons">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      <div className="flex-1 p-6 flex flex-col">
        {/* Editor Toolbar (Minimalist) */}
        <div className="flex space-x-1 mb-2 pb-2 border-b border-[var(--border)] border-opacity-20 flex-none">
          <button className="p-1.5 hover:bg-white border border-transparent hover:border-[var(--border)] hover:border-opacity-30 transition-colors cursor-pointer" title="Gras">
            <Type className="w-4 h-4 font-bold" />
          </button>
          <button className="p-1.5 hover:bg-white border border-transparent hover:border-[var(--border)] hover:border-opacity-30 transition-colors cursor-pointer" title="Italique">
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px bg-[var(--border)] opacity-20 mx-2 my-1"></div>
          <button className="p-1.5 hover:bg-white border border-transparent hover:border-[var(--border)] hover:border-opacity-30 transition-colors cursor-pointer" title="Citation">
            <Quote className="w-4 h-4" />
          </button>
        </div>
        
        {/* Text Area */}
        <textarea 
          className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 p-0 font-serif italic text-lg text-[var(--primary)] placeholder:text-[var(--foreground)] placeholder:opacity-40 leading-loose outline-none" 
          placeholder="Formulez votre argument académique ici..."
        ></textarea>
      </div>
      
      {/* Footer / Actions */}
      <footer className="p-6 border-t border-[var(--border)] border-opacity-20 bg-white flex justify-between items-center flex-none">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">MIN. 150 MOTS REQUIS</span>
        <div className="flex space-x-4">
          <button className="px-6 py-2 border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--background)] transition-colors font-sans font-bold uppercase tracking-wider text-xs cursor-pointer">
            Sauvegarder
          </button>
          <button className="px-6 py-2 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] hover:opacity-90 transition-colors font-sans font-bold uppercase tracking-wider text-xs cursor-pointer">
            Publier
          </button>
        </div>
      </footer>
    </div>
  );
}
