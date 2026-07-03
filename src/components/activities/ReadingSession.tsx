import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ReadingSessionData } from "../../types/activity";
import ActivityLayout from "../layout/ActivityLayout";

interface Props {
  data: ReadingSessionData;
  level: string;
}

export default function ReadingSession({ data, level }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const completedCount = Object.keys(selectedAnswers).length;
  const totalQuestions = data.questions.length;

  const answerSection = (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-6 border-b-4 border-[var(--primary)] bg-white sticky top-0 z-10 shrink-0">
        <h2 className="font-serif font-bold text-xl text-[var(--primary)] flex items-center justify-between">
          Atelier de Compréhension
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest bg-[var(--primary)] text-[var(--background)] px-2 py-1 rounded-sm">
            {totalQuestions} QUESTIONS
          </span>
        </h2>
        <div className="w-full bg-[var(--border)] bg-opacity-20 h-2 mt-4 rounded-full overflow-hidden border border-[var(--border)] border-opacity-30">
          <div 
            className="bg-[var(--primary)] h-full transition-all duration-300"
            style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin brutalist-scrollbar">
        {data.questions.map((q, idx) => (
          <div
            key={q.id}
            className="border border-[var(--border)] bg-white p-5 group hover:border-[var(--primary)] transition-colors"
          >
            <h3 className="font-sans font-bold text-sm text-[var(--primary)] mb-4 flex gap-2">
              <span className="text-[var(--foreground)] opacity-60 shrink-0">
                {String(idx + 1).padStart(2, '0')}.
              </span>
              {q.question}
            </h3>
            
            <div className="space-y-2">
              {q.options.map((option) => {
                const isSelected = selectedAnswers[q.id] === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--border)] bg-opacity-10"
                        : "border-[var(--border)] hover:bg-[var(--background)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={isSelected}
                      onChange={() => handleSelectOption(q.id, option.id)}
                      className="w-4 h-4 text-[var(--primary)] border-[var(--border)] focus:ring-[var(--primary)] focus:ring-1 bg-white cursor-pointer"
                    />
                    <span className="ml-3 font-sans font-medium text-sm text-[var(--primary)]">
                      {option.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--border)] bg-white mt-auto shrink-0">
        <button
          className="w-full bg-[var(--primary)] text-[var(--background)] font-sans font-bold text-sm py-3 hover:opacity-80 transition-colors rounded-none flex items-center justify-center gap-2 group cursor-pointer"
        >
          Soumettre les réponses
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <ActivityLayout
      title={data.title}
      level={level}
      answerSection={answerSection}
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-6 border-b border-[var(--border)] pb-4">
          <span className="font-sans font-bold text-[10px] text-[var(--foreground)] opacity-70 uppercase tracking-widest">{data.topic}</span>
          <span className="w-1 h-1 bg-[var(--primary)] rounded-full"></span>
          <span className="font-sans font-bold text-[10px] text-[var(--foreground)] opacity-70 uppercase tracking-widest">{level}</span>
          <span className="w-1 h-1 bg-[var(--primary)] rounded-full"></span>
          <span className="font-sans font-bold text-[10px] text-[var(--foreground)] opacity-70 uppercase tracking-widest flex items-center gap-1">
             {data.readTime}
          </span>
        </div>
        
        <h1 className="font-serif font-black text-4xl text-[var(--primary)] mb-4 leading-tight">
          {data.title}
        </h1>
        <p className="font-serif italic text-lg text-[var(--foreground)] opacity-80 mb-8 border-l-4 border-[var(--primary)] pl-4">
          By {data.author} — {data.extractedDate}
        </p>

        <article className="prose prose-neutral max-w-none text-[var(--primary)] font-serif leading-relaxed text-lg">
          {data.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "mb-6 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:pr-3 first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest"
                  : "mb-6"
              }
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </ActivityLayout>
  );
}
