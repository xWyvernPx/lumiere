import React, { useState } from "react";
import { Filter, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";

interface Submission {
  id: string;
  level: string;
  date: string;
  title: string;
  subtitle: string;
  score: number;
  originalText: string;
  correction?: string;
  feedback?: string;
  isCorrect?: boolean;
}

const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    level: "NIVEAU C1",
    date: "12 OCT 2023",
    title: "Dissertation Philosophique",
    subtitle: "\"L'absurde chez Camus\"",
    score: 85,
    originalText: "La notion d'absurde chez Albert Camus ne se définit pas par un désespoir inactif, mais plutôt par une confrontation lucide avec le non-sens du monde.\n\nDans Le Mythe de Sisyphe, il dit que nous devons imaginer Sisyphe heureux.",
    correction: "Dans Le Mythe de Sisyphe, Camus conclut de manière frappante : « Il faut imaginer Sisyphe heureux ».",
    feedback: "Citation exacte requise au niveau C1. Vous avez paraphrasé la citation la plus célèbre de l'œuvre. En philosophie, la précision des termes est cruciale.",
    isCorrect: false
  },
  {
    id: "sub-2",
    level: "NIVEAU B2",
    date: "28 SEP 2023",
    title: "Analyse Littéraire",
    subtitle: "Les Misérables, Chapitre 4",
    score: 92,
    originalText: "Jean Valjean représente la rédemption par la souffrance, une allégorie christique évidente dans le texte de Hugo. Sa transformation commence par un acte de pardon de l'évêque Myriel.",
    feedback: "Excellente analyse. La terminologie 'allégorie christique' est parfaitement utilisée dans ce contexte.",
    isCorrect: true
  },
  {
    id: "sub-3",
    level: "NIVEAU C1",
    date: "15 SEP 2023",
    title: "Compréhension Orale",
    subtitle: "Débat Politique Contemporain",
    score: 78,
    originalText: "Le locuteur argumente que l'inflation est temporaire et dûe à des chocs d'offre externes.",
    correction: "Le locuteur argumente que l'inflation est temporaire et due à des chocs d'offre externes.",
    feedback: "Erreur d'orthographe sur 'due' (participe passé de devoir employé comme adjectif, s'accorde avec l'inflation, féminin singulier).",
    isCorrect: false
  }
];

export function HistoryContent() {
  const [selectedId, setSelectedId] = useState<string>("sub-1");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredSubmissions = activeFilter 
    ? mockSubmissions.filter(s => s.level.includes(activeFilter))
    : mockSubmissions;

  const activeSubmission = mockSubmissions.find(s => s.id === selectedId) || mockSubmissions[0];

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Ledger Header */}
      <div className="w-full bg-white border-b-4 border-[var(--primary)] px-5 py-4 flex justify-between items-end shrink-0">
        <div>
          <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--foreground)] opacity-60 mb-1">
            DOSSIER ACADÉMIQUE
          </p>
          <h2 className="font-serif font-black text-2xl text-[var(--primary)]">
            Historique des Évaluations
          </h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--primary)]">ÉDITION DU</p>
          <p className="font-serif italic text-[var(--foreground)] opacity-80 text-sm">24 Octobre 2023</p>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Left Pane: Timeline Ledger */}
        <section className="w-full md:w-2/5 bg-[var(--background)] border-b md:border-b-0 md:border-r border-[var(--border)] overflow-y-auto shrink-0 brutalist-scrollbar relative">
          <div className="p-5 border-b border-[var(--border)] bg-white sticky top-0 z-20 flex justify-between items-center">
            <span className="font-sans font-bold text-sm text-[var(--primary)] uppercase tracking-wider">
              Soumissions Précédentes
            </span>
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer p-1"
              >
                <Filter className="w-4 h-4" />
                {activeFilter && <span className="font-sans font-bold text-[10px]">{activeFilter}</span>}
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--primary)] shadow-lg z-30 flex flex-col">
                  <button 
                    onClick={() => { setActiveFilter(null); setFilterOpen(false); }}
                    className={`text-left px-4 py-2 text-sm font-sans font-bold ${!activeFilter ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background)]'}`}
                  >
                    Toutes les soumissions
                  </button>
                  <button 
                    onClick={() => { setActiveFilter('C1'); setFilterOpen(false); }}
                    className={`text-left px-4 py-2 text-sm font-sans font-bold ${activeFilter === 'C1' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background)]'}`}
                  >
                    Niveau C1 uniquement
                  </button>
                  <button 
                    onClick={() => { setActiveFilter('B2'); setFilterOpen(false); }}
                    className={`text-left px-4 py-2 text-sm font-sans font-bold ${activeFilter === 'B2' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background)]'}`}
                  >
                    Niveau B2 uniquement
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            {filteredSubmissions.map((sub) => (
              <div 
                key={sub.id}
                onClick={() => setSelectedId(sub.id)}
                className={`p-4 border-b border-[var(--border)] bg-white cursor-pointer transition-colors group ${selectedId === sub.id ? 'border-l-4 border-l-blue-600 bg-blue-50' : 'border-l-4 border-l-transparent hover:bg-[var(--background)]'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${selectedId === sub.id ? 'text-blue-800 bg-blue-100' : 'text-[var(--primary)] border border-[var(--primary)]'}`}>
                    {sub.level}
                  </span>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">
                    {sub.date}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[var(--primary)] mb-1">
                  {sub.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-serif italic text-[var(--foreground)] opacity-80 truncate w-3/4">
                    {sub.subtitle}
                  </span>
                  <span className="font-sans font-bold text-lg text-[var(--primary)]">{sub.score}%</span>
                </div>
              </div>
            ))}
            
            {filteredSubmissions.length === 0 && (
              <div className="p-8 text-center text-[var(--foreground)] opacity-60 font-sans text-sm">
                Aucune soumission trouvée pour ce filtre.
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Review Document */}
        <section className="w-full md:w-3/5 bg-white overflow-y-auto p-6 md:p-8 relative brutalist-scrollbar">
          {/* Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
            <span className="font-serif font-black text-[120px] text-[var(--primary)] select-none -rotate-45 whitespace-nowrap">
              LUMIÈRE
            </span>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            {/* Doc Header */}
            <div className="border-b-4 border-[var(--primary)] pb-4 mb-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-serif font-black text-3xl text-[var(--primary)]">Revue de la Copie</h2>
                  <p className="font-serif italic text-lg text-[var(--foreground)] opacity-80 mt-1">
                    {activeSubmission.title} - {activeSubmission.level}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`font-sans font-black text-4xl leading-none ${activeSubmission.score >= 90 ? 'text-green-600' : activeSubmission.score >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {activeSubmission.score}<span className="text-2xl">%</span>
                  </div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 mt-1 inline-block">
                    NOTE FINALE
                  </span>
                </div>
              </div>
            </div>

            {/* Document Content with Corrections */}
            <div className="prose prose-neutral max-w-none space-y-6 font-serif text-lg text-[var(--primary)] leading-relaxed whitespace-pre-wrap">
              {activeSubmission.originalText.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>
                  {activeSubmission.correction && idx === activeSubmission.originalText.split('\n\n').length - 1 ? (
                    <span className="line-through text-red-700 opacity-80" title="Contient des erreurs">
                      {paragraph}
                    </span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}

              {!activeSubmission.isCorrect && activeSubmission.correction && (
                <div className="border-l-4 border-red-600 pl-4 py-3 bg-red-50 my-6 font-sans">
                  <p className="text-[var(--primary)] font-bold mb-1 text-sm">Correction Suggérée:</p>
                  <p className="text-[var(--primary)] mb-3">
                    {activeSubmission.correction}
                  </p>
                  <div className="border-t border-red-200 pt-3 mt-3">
                    <p className="font-sans text-sm font-bold text-red-700 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" /> 
                      <span>
                        <span className="uppercase tracking-widest text-xs block mb-1">Détails de l'erreur</span>
                        <span className="font-normal">{activeSubmission.feedback}</span>
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              {activeSubmission.isCorrect && activeSubmission.feedback && (
                <div className="border-l-4 border-green-600 pl-4 py-3 bg-green-50 my-6 font-sans">
                  <p className="text-[var(--primary)] font-bold mb-1 text-sm">Appréciation du Correcteur:</p>
                  <div className="border-t border-green-200 pt-3 mt-3">
                    <p className="font-sans text-sm font-bold text-green-800 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" /> 
                      <span>
                        <span className="uppercase tracking-widest text-xs block mb-1">Commentaire</span>
                        <span className="font-normal">{activeSubmission.feedback}</span>
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
