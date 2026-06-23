import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ReadingSession({ setCurrentView }: { setCurrentView: (view: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto fade-in-view">
      <button 
        onClick={() => setCurrentView('frontpage')} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Desk
      </button>

      <header className="border-b-4 border-[var(--border)] pb-8 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="border border-[var(--border)] text-[var(--foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Politics</span>
          <span className="border border-[var(--border)] border-opacity-20 text-[var(--foreground)] opacity-80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">5 Min Read</span>
          <span className="bg-[var(--primary)] text-[var(--background)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Target: DELF B2</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">Le gouvernement annonce une nouvelle réforme écologique majeure.</h1>
        
        <div className="flex items-center justify-between border-t border-b border-[var(--border)] border-opacity-20 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">By L'Équipe Rédactionnelle</span>
          <span className="font-serif text-sm italic text-[var(--foreground)] opacity-80">Extracted: Oct 24, 2026</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <article className="lg:w-3/5 font-serif text-lg leading-relaxed text-[var(--foreground)] space-y-6">
          <p className="first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:pr-3 first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest">
              Face à l'urgence climatique, le Premier ministre a dévoilé mardi un plan ambitieux visant à réduire les émissions de gaz à effet de serre de 50% d'ici 2030. Cette annonce, très attendue par les associations environnementales, marque un tournant décisif.
          </p>
          <p>
              Le projet de loi, qui sera débattu à l'Assemblée nationale dès le mois prochain, prévoit des investissements massifs dans les énergies renouvelables et une taxe carbone renforcée pour les entreprises les plus polluantes. Selon les experts, cette transition <span className="border-b border-[var(--border)] hover:bg-[var(--code-bg)] cursor-pointer transition-colors" title="Click for definition">bouleversera</span> inévitablement le tissu économique industriel.
          </p>
          <p>
              Cependant, des voix s'élèvent déjà dans l'opposition pour dénoncer une mesure <span className="border-b border-[var(--border)] hover:bg-[var(--code-bg)] cursor-pointer transition-colors" title="Click for definition">hâtive</span> et potentiellement destructrice pour l'emploi ouvrier dans les régions manufacturières. Le défi pour le gouvernement sera de concilier impératif écologique et paix sociale.
          </p>
          <p>
              Les syndicats ont d'ores et déjà annoncé une journée de mobilisation nationale. "Nous ne paierons pas pour la transition," a déclaré le porte-parole du principal syndicat. La situation reste donc particulièrement tendue.
          </p>
        </article>

        <aside className="lg:w-2/5 lg:border-l border-[var(--border)] lg:pl-12 lg:sticky lg:top-0 h-max">
          <div className="flex items-center justify-between border-b-2 border-[var(--border)] pb-2 mb-6">
              <h3 className="text-xl font-serif font-black">Compréhension Écrite</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">7 Questions</span>
          </div>

          <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80 mb-3">Q1. Main Idea</p>
              <p className="font-serif font-bold text-[var(--foreground)] mb-4">Quel est l'objectif principal du plan annoncé par le gouvernement ?</p>
              
              <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-[var(--border)] border-opacity-20 hover:border-[var(--border)] cursor-pointer transition-colors group">
                      <div className="w-4 h-4 border border-[var(--border)] mt-0.5 group-hover:bg-[var(--code-bg)] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[var(--primary)] hidden"></div>
                      </div>
                      <span className="text-sm font-serif text-[var(--foreground)] opacity-80 group-hover:text-[var(--foreground)]">Créer de nouveaux emplois dans l'industrie.</span>
                  </label>
                  
                  <label className="flex items-start gap-3 p-3 border border-[var(--border)] bg-[var(--background)] cursor-pointer transition-colors group">
                      <div className="w-4 h-4 border border-[var(--border)] mt-0.5 flex items-center justify-center">
                          <div className="w-2 h-2 bg-[var(--primary)]"></div>
                      </div>
                      <span className="text-sm font-serif font-bold text-[var(--foreground)]">Réduire drastiquement les émissions polluantes d'ici 2030.</span>
                  </label>

                  <label className="flex items-start gap-3 p-3 border border-[var(--border)] border-opacity-20 hover:border-[var(--border)] cursor-pointer transition-colors group">
                      <div className="w-4 h-4 border border-[var(--border)] mt-0.5 group-hover:bg-[var(--code-bg)] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[var(--primary)] hidden"></div>
                      </div>
                      <span className="text-sm font-serif text-[var(--foreground)] opacity-80 group-hover:text-[var(--foreground)]">Augmenter les impôts des citoyens.</span>
                  </label>
              </div>
          </div>

          <div className="mb-8 border-t border-[var(--border)] border-opacity-20 pt-6">
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80 mb-3">Q2. Vocabulaire en Contexte</p>
              <p className="font-serif font-bold text-[var(--foreground)] mb-4">Dans le deuxième paragraphe, que signifie le mot souligné "bouleversera" ?</p>
              
              <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border border-[var(--border)] border-opacity-20 text-sm font-serif text-[var(--foreground)] opacity-80 hover:border-[var(--border)] hover:text-[var(--foreground)] transition-colors text-left cursor-pointer">A. Améliorera</button>
                  <button className="p-3 border border-[var(--border)] border-opacity-20 text-sm font-serif text-[var(--foreground)] opacity-80 hover:border-[var(--border)] hover:text-[var(--foreground)] transition-colors text-left cursor-pointer">B. Maintiendra</button>
                  <button className="p-3 border border-[var(--border)] bg-[var(--background)] text-sm font-serif font-bold text-[var(--foreground)] transition-colors text-left cursor-pointer">C. Perturbera</button>
                  <button className="p-3 border border-[var(--border)] border-opacity-20 text-sm font-serif text-[var(--foreground)] opacity-80 hover:border-[var(--border)] hover:text-[var(--foreground)] transition-colors text-left cursor-pointer">D. Finira</button>
              </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-[var(--border)] flex justify-between items-center">
              <span className="text-xs font-serif italic text-[var(--foreground)] opacity-80">2 of 7 completed</span>
              <button className="px-6 py-3 bg-[var(--primary)] text-[var(--background)] text-xs font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer">
                  Next Section <ArrowRight className="w-4 h-4" />
              </button>
          </div>
        </aside>
      </div>

      <div className="h-12 border-t-2 border-[var(--border)] pt-4 flex justify-between items-center mt-12 mb-8">
          <span className="font-serif font-black text-xl">Lumière.</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">© 2026 Éditions Lumière</span>
      </div>
    </div>
  );
}
