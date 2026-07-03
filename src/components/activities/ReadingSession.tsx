import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ReadingSessionData } from "../../types/activity";

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

  return (
    <div className="max-w-7xl mx-auto fade-in-view">
      <header className="border-b-4 border-[var(--border)] border-opacity-20 pb-8 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="text-[var(--foreground)] border-[var(--border)] font-bold tracking-widest uppercase"
          >
            {data.topic}
          </Badge>
          <Badge
            variant="outline"
            className="text-[var(--foreground)] border-[var(--border)] border-opacity-25 font-bold opacity-80 tracking-widest uppercase"
          >
            {data.readTime}
          </Badge>
          <Badge
            variant="solid"
            className="bg-[var(--primary)] text-[var(--background)] font-bold tracking-widest uppercase"
          >
            Target: {level}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">
          {data.title}
        </h1>

        <div className="flex items-center justify-between border-t border-b border-[var(--border)] border-opacity-25 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">
            By {data.author}
          </span>
          <span className="font-serif text-sm italic text-[var(--foreground)] opacity-80">
            Extracted: {data.extractedDate}
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <article className="lg:w-3/5 font-serif text-lg leading-relaxed text-[var(--foreground)] space-y-6">
          {data.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:pr-3 first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="lg:w-2/5 lg:border-l border-[var(--border)] border-opacity-20 lg:pl-12 lg:sticky lg:top-0 h-max">
          <div className="flex items-center justify-between border-b-2 border-[var(--border)] border-opacity-20 pb-2 mb-6">
            <h3 className="text-xl font-serif font-black">
              Compréhension Écrite
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-80">
              {totalQuestions} Questions
            </span>
          </div>

          <div className="space-y-8">
            {data.questions.map((q, idx) => (
              <div
                key={q.id}
                className={
                  idx > 0
                    ? "border-t border-[var(--border)] border-opacity-20 pt-6"
                    : ""
                }
              >
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 mb-3">
                  Q{idx + 1}. {q.type}
                </p>
                <p className="font-serif font-bold text-[var(--foreground)] mb-4">
                  {q.question}
                </p>

                <div
                  className={
                    q.options.every((o) => o.text.length < 20)
                      ? "grid grid-cols-2 gap-3"
                      : "space-y-3"
                  }
                >
                  {q.options.map((option) => {
                    const isSelected = selectedAnswers[q.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(q.id, option.id)}
                        className={`w-full flex items-start text-left gap-3 p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[var(--primary)] text-[var(--background)] border-[var(--primary)] font-bold"
                            : "border-[var(--border)] border-opacity-25 hover:border-[var(--border)] text-[var(--foreground)] bg-transparent"
                        }`}
                      >
                        {q.options.every((o) => o.text.length < 20) ? null : (
                          <div
                            className={`w-4 h-4 border mt-0.5 flex items-center justify-center shrink-0 ${isSelected ? "border-[var(--background)]" : "border-[var(--border)]"}`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 bg-[var(--background)]" />
                            )}
                          </div>
                        )}
                        <span
                          className={`text-sm font-serif ${isSelected ? "font-bold" : ""}`}
                        >
                          {q.options.every((o) => o.text.length < 20)
                            ? `${option.id}. `
                            : ""}{" "}
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t-2 border-[var(--border)] border-opacity-20 flex justify-between items-center">
            <span className="text-xs font-serif italic text-[var(--foreground)] opacity-80">
              {completedCount} of {totalQuestions} completed
            </span>
            <Button
              variant="primary"
              size="md"
              className="uppercase tracking-widest text-xs flex items-center gap-2"
            >
              Verify Answers <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </aside>
      </div>

      <div className="h-12 border-t-2 border-[var(--border)] border-opacity-20 pt-4 flex justify-between items-center mt-12 mb-8">
        <span className="font-serif font-black text-xl text-[var(--foreground)]">
          Lumière.
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">
          © 2026 Éditions Lumière
        </span>
      </div>
    </div>
  );
}
