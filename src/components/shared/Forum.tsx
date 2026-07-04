import React, { createContext, useContext, useState } from "react";
import { ThumbsUp, Reply, Mail, Type, Italic, Quote, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  initials: string;
  timeAgo: string;
  content: string;
  likes: number;
  isPrimary: boolean;
  replies?: Comment[];
}

const defaultComments: Comment[] = [
  {
    id: "c1",
    author: "Élise Dubois",
    initials: "EL",
    timeAgo: "Il y a 2 heures",
    content: "L'absence de nom pour l'Arabe n'est pas simplement une omission stylistique, c'est une décision politique de Camus. Cela reflète l'effacement colonial. Comment peut-on lire cela autrement que comme un acte de dépossession ?",
    likes: 12,
    isPrimary: true,
    replies: [
      {
        id: "c2",
        author: "Marc Rousseau",
        initials: "MR",
        timeAgo: "Il y a 45 min",
        content: "Je ne suis pas tout à fait d'accord, Élise. Bien que le contexte colonial soit indéniable, réduire l'œuvre à cela ignore l'absurdisme central. Le soleil lui-même est plus antagoniste que toute figure humaine dans cette scène.",
        likes: 5,
        isPrimary: false
      }
    ]
  }
];

interface ForumContextType {
  comments: Comment[];
  replyTarget: Comment | null;
  setReplyTarget: (comment: Comment | null) => void;
  draftText: string;
  setDraftText: (text: string) => void;
  publishComment: () => void;
}

export const ForumContext = createContext<ForumContextType>({} as ForumContextType);

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>(defaultComments);
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null);
  const [draftText, setDraftText] = useState("");

  const publishComment = () => {
    if (!draftText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      author: "Vous",
      initials: "VO",
      timeAgo: "À l'instant",
      content: draftText,
      likes: 0,
      isPrimary: !replyTarget,
      replies: []
    };

    if (replyTarget) {
      setComments(comments.map(c => {
        if (c.id === replyTarget.id || (c.replies && c.replies.some(r => r.id === replyTarget.id))) {
          return {
            ...c,
            replies: [...(c.replies || []), newComment]
          };
        }
        return c;
      }));
    } else {
      setComments([newComment, ...comments]);
    }
    
    setDraftText("");
    setReplyTarget(null);
  };

  return (
    <ForumContext.Provider value={{ comments, replyTarget, setReplyTarget, draftText, setDraftText, publishComment }}>
      {children}
    </ForumContext.Provider>
  );
}

function CommentItem({ comment, isNested = false }: { comment: Comment, isNested?: boolean }) {
  const { setReplyTarget, replyTarget } = useContext(ForumContext);
  const isTarget = replyTarget?.id === comment.id;

  return (
    <div className="w-full">
      <article className={`flex space-x-4 ${isNested ? 'pl-14' : ''} ${isTarget ? 'bg-[var(--primary)] bg-opacity-5 p-2 -mx-2 rounded-md transition-colors' : 'p-2 -mx-2'}`}>
        <div className="flex flex-col items-center flex-none">
          <div className={`w-10 h-10 border border-[var(--primary)] flex items-center justify-center font-sans font-bold text-sm ${comment.author === 'Vous' ? 'bg-blue-600 text-white' : isNested ? 'bg-[var(--primary)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--primary)]'}`}>
            {comment.initials}
          </div>
          {!isNested && comment.replies && comment.replies.length > 0 && (
            <div className="w-px h-full bg-[var(--border)] opacity-30 mt-2"></div>
          )}
        </div>
        <div className={`flex-1 pb-4 ${isNested ? 'border-b border-[var(--border)] border-opacity-20' : ''}`}>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="font-sans font-bold text-sm text-[var(--primary)]">{comment.author}</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">{comment.timeAgo}</span>
          </div>
          <p className="font-serif italic text-[var(--foreground)] opacity-90 mb-3 leading-relaxed">
            {comment.content}
          </p>
          <div className="flex space-x-4 mt-2">
            <button className="flex items-center space-x-1 text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 transition-colors cursor-pointer">
              <ThumbsUp className="w-4 h-4" />
              <span className="font-sans font-bold text-xs">{comment.likes}</span>
            </button>
            <button 
              onClick={() => setReplyTarget(comment)}
              className={`flex items-center space-x-1 transition-colors cursor-pointer ${isTarget ? 'text-[var(--primary)] opacity-100' : 'text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100'}`}
            >
              <Reply className="w-4 h-4" />
              <span className="font-sans font-bold text-xs">Répondre</span>
            </button>
          </div>
        </div>
      </article>
      {!isNested && comment.replies?.map(reply => (
        <CommentItem key={reply.id} comment={reply} isNested={true} />
      ))}
    </div>
  );
}

export function ForumContent({ title = "L'Étranger : Subtexte Algérien" }: { title?: string }) {
  const { comments, setReplyTarget } = useContext(ForumContext);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="p-6 border-b-4 border-[var(--primary)] bg-white flex-none sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[var(--foreground)] opacity-60">Le Discours</span>
            <span className="w-8 border-b border-[var(--primary)]"></span>
          </div>
          <button 
            onClick={() => setReplyTarget(null)}
            className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)] hover:bg-opacity-10 px-3 py-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Nouveau Sujet
          </button>
        </div>
        <h1 className="font-serif font-black text-3xl text-[var(--primary)] mb-1">{title}</h1>
        <p className="font-sans font-bold text-xs text-[var(--foreground)] opacity-70">Modéré par Prof. Laurent | {comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)} Contributions</p>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white brutalist-scrollbar">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export function ForumDraft() {
  const { replyTarget, draftText, setDraftText, publishComment } = useContext(ForumContext);

  return (
    <div className="flex flex-col h-full bg-[var(--background)] relative">
      <header className="p-6 border-b border-[var(--border)] border-opacity-20 bg-white flex-none flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-serif font-bold text-xl text-[var(--primary)]">Votre Contribution</h2>
          <p className="font-sans font-bold text-xs text-[var(--foreground)] opacity-60 mt-1">
            {replyTarget ? `Réponse à ${replyTarget.author}` : 'Nouveau sujet'}
          </p>
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
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
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
          <button 
            onClick={publishComment}
            disabled={!draftText.trim()}
            className="px-6 py-2 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-sans font-bold uppercase tracking-wider text-xs cursor-pointer"
          >
            Publier
          </button>
        </div>
      </footer>
    </div>
  );
}
