import React from 'react';

export function EditorialContent() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <header className="p-6 border-b-4 border-[var(--primary)] shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] uppercase font-bold text-[var(--foreground)] opacity-60 tracking-widest">
              Contenu Pédagogique
            </span>
            <span className="w-8 border-b border-[var(--primary)]"></span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
        </div>
        <h1 className="font-serif text-3xl font-black text-[var(--primary)] mb-1">Analyse Éditoriale</h1>
        <p className="font-sans text-xs font-bold text-[var(--foreground)] opacity-60">Ressources certifiées par l'Institut Lumière</p>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white scrollbar-thin">
        {/* Note de l'Enseignant */}
        <section className="mb-8 pb-8 border-b border-[var(--border)] border-opacity-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--primary)] text-[var(--background)] flex items-center justify-center font-sans font-bold text-lg">
              PL
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm">Prof. Laurent</h3>
              <p className="font-sans text-xs font-bold text-[var(--foreground)] opacity-60">Agrégé de Lettres Modernes</p>
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 border-l-4 border-[var(--primary)]">
            <h4 className="font-sans text-[10px] font-bold mb-2 uppercase tracking-widest text-[var(--foreground)]">Note de l'Enseignant</h4>
            <p className="font-serif italic text-sm leading-relaxed text-[var(--foreground)] opacity-80">
              "Cette analyse se concentre sur la dualité entre l'absurde camusien et la réalité sociopolitique de l'Algérie coloniale. Portez une attention particulière au silence des personnages secondaires."
            </p>
          </div>
        </section>

        {/* Analyse Thématique */}
        <section className="mb-8">
          <h3 className="font-serif font-bold text-xl mb-4 text-[var(--primary)]">Analyse Thématique : Le Subtexte</h3>
          <p className="font-serif italic text-sm mb-4 leading-relaxed text-[var(--foreground)] opacity-80">
            L'anonymat de 'l'Arabe' dans le texte n'est pas une simple économie de mots. C'est une représentation structurelle de l'effacement de l'autre dans le système colonial. Meursault ne tue pas un homme, il tue une ombre sous un soleil accablant.
          </p>
        </section>

        {/* Points de Grammaire */}
        <section className="mb-8 p-4 border border-[var(--border)] border-opacity-20 bg-white">
          <h3 className="font-sans font-bold text-sm mb-3 flex items-center gap-2 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            Points de Grammaire
          </h3>
          <ul className="space-y-3 font-sans text-xs font-bold text-[var(--foreground)] opacity-80">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--primary)] mt-1 shrink-0"></span>
              <span>
                <strong className="font-bold text-[var(--primary)]">Le Passé Composé :</strong> L'usage systématique du passé composé au lieu du passé simple crée une rupture temporelle, accentuant l'aliénation émotionnelle du narrateur.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--primary)] mt-1 shrink-0"></span>
              <span>
                <strong className="font-bold text-[var(--primary)]">L'Adjectif Neutre :</strong> Observez la rareté des adjectifs qualificatifs subjectifs lors de la scène de la plage.
              </span>
            </li>
          </ul>
        </section>

        {/* Pistes de Réflexion */}
        <section>
          <h3 className="font-sans font-bold text-xs mb-4 uppercase tracking-widest text-[var(--foreground)]">Pistes de Réflexion</h3>
          <div className="space-y-4">
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--background)] transition-colors cursor-pointer">
              <p className="font-serif italic text-sm text-[var(--primary)]">Dans quelle mesure le soleil peut-il être considéré comme le véritable antagoniste du roman ?</p>
            </div>
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--background)] transition-colors cursor-pointer">
              <p className="font-serif italic text-sm text-[var(--primary)]">Comment le procès de Meursault reflète-t-il le jugement de la société sur l'absence de conformisme émotionnel ?</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function EditorialDraft() {
  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      <header className="px-6 py-4 border-b border-[var(--border)] border-opacity-20 shrink-0 bg-white">
        <h2 className="font-serif font-bold text-lg text-[var(--primary)] uppercase tracking-wider">Rédaction</h2>
      </header>

      <div className="flex-1 p-6 overflow-hidden flex flex-col relative">
        <textarea 
          className="w-full h-full resize-none bg-transparent border-none focus:outline-none font-serif text-lg leading-relaxed placeholder-[var(--foreground)] placeholder-opacity-30 p-2"
          placeholder="Rédigez votre réponse ou analyse ici..."
        ></textarea>
      </div>

      <footer className="p-6 border-t border-[var(--border)] border-opacity-20 bg-white flex justify-between items-center shrink-0">
        <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-[var(--foreground)] opacity-60">
          MIN. 150 MOTS REQUIS
        </span>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--background)] transition-colors font-sans font-bold text-xs uppercase tracking-wider cursor-pointer">
            Sauvegarder
          </button>
          <button className="px-6 py-2 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--foreground)] transition-colors font-sans font-bold text-xs uppercase tracking-wider cursor-pointer">
            Publier
          </button>
        </div>
      </footer>
    </div>
  );
}
