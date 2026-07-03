import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  MessageCircleQuestion,
  X,
  ArrowRight,
  Check,
  RefreshCw,
  Award,
} from "lucide-react";
import { InteractiveContextClueData } from "../../types/activity";
import { Button } from "../ui/Button";

import ActivityLayout from "../layout/ActivityLayout";

interface Props {
  data: InteractiveContextClueData;
  level: string;
}

export default function InteractiveContextClue({ data, level }: Props) {
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const totalClues = Object.keys(data.clues).length;
  const answeredClues = Object.keys(answers).length;

  // Calculate score based on answers when session is completed
  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach((clueId) => {
      const clueData = data.clues[clueId];
      const selectedOptionId = answers[clueId];
      const selectedOption = clueData.options.find(
        (opt) => opt.id === selectedOptionId,
      );
      if (selectedOption?.isCorrect) {
        correct++;
      }
    });
    return correct;
  };

  const handleClose = () => {
    setActiveClue(null);
  };

  const handleSelectOption = (clueId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [clueId]: optionId,
    }));
    setActiveClue(null);
  };

  const handleVerify = () => {
    if (answeredClues === totalClues) {
      setSessionCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setSessionCompleted(false);
    setActiveClue(null);
  };

  if (sessionCompleted) {
    const score = calculateScore();
    const finalPercentage = Math.round((score / totalClues) * 100);
    return (
      <ActivityLayout title={data.title} level={level} hideAnswerSection={true}>
        <div className="max-w-2xl mx-auto py-12 px-5 block fade-in-view">
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8 text-center space-y-8 shadow-sm">
            <div className="flex justify-center">
              <div className="p-4 bg-[var(--primary)] text-[var(--background)] rounded-full">
                <Award className="w-16 h-16" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">
                Session Completed
              </span>
              <h1 className="text-4xl font-serif font-black text-[var(--foreground)]">
                Scholarly Achievements
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto border border-[var(--border)] border-opacity-20 p-4 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 block">
                  Accuracy
                </span>
                <span className="text-2xl font-serif font-bold text-[var(--foreground)]">
                  {finalPercentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60 block">
                  Score
                </span>
                <span className="text-2xl font-serif font-bold text-[var(--foreground)]">
                  {score} / {totalClues}
                </span>
              </div>
            </div>

            <div className="text-left max-w-sm mx-auto">
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--foreground)] opacity-60 mb-3 border-b border-[var(--border)] border-opacity-20 pb-2">
                Review
              </h3>
              <ul className="space-y-2">
                {Object.keys(data.clues).map((clueId) => {
                  const clue = data.clues[clueId];
                  const selectedOptionId = answers[clueId];
                  const selectedOption = clue.options.find(
                    (opt) => opt.id === selectedOptionId,
                  );
                  const isCorrect = selectedOption?.isCorrect;
                  return (
                    <li
                      key={clueId}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-serif italic text-[var(--foreground)]">
                        "{clue.word}"
                      </span>
                      <span
                        className={`font-bold flex items-center gap-1 ${isCorrect ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {isCorrect ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        {selectedOption?.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="px-6 py-3 tracking-widest uppercase text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Restart Session
              </Button>
            </div>
          </div>
        </div>
      </ActivityLayout>
    );
  }

  return (
    <ActivityLayout title={data.title} level={level} hideAnswerSection={true}>
      <div className="w-full mx-auto pb-32">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border)] border-opacity-20">
          <div className="w-16"></div>
          <span className="text-[10px] leading-none tracking-[0.08em] uppercase font-bold text-[var(--foreground)] opacity-70">
            {level} READING EXERCISE
          </span>
          <div className="w-16 flex items-center justify-end">
            <span className="text-xs font-bold text-[var(--foreground)] opacity-70">
              {answeredClues}/{totalClues}
            </span>
          </div>
        </header>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Context Clue Canvas */}
        <div className="w-full bg-white border-t-4 border-black border-x border-b border-[#c4c7c7] p-6 sm:p-10 relative mb-8 fade-in-view">
          <div className="absolute top-0 right-0 bg-black text-white text-[10px] leading-none tracking-[0.08em] font-bold uppercase px-3 py-1">
            EXERCISE
          </div>

          <h2 className="text-[20px] leading-[1.4] font-bold font-serif mb-6 text-[#1a1c1c]">
            {data.title}
          </h2>

          <p className="text-[16px] sm:text-xl leading-[2.2] sm:leading-[2.2] font-serif font-normal text-[#444748]">
            {data.parts.map((part, index) => {
              if (part.type === "text") {
                return <span key={index}>{part.content}</span>;
              } else if (part.type === "clue") {
                const isActive = activeClue === part.clueId;
                const isAnswered = !!answers[part.clueId];

                let clueClasses = `
                  border-b-2 cursor-pointer pb-[2px] transition-all
                  font-bold font-sans
                `;

                if (isActive) {
                  clueClasses +=
                    " bg-[var(--accent-bg)] border-[var(--accent)] text-[var(--accent)]";
                } else if (isAnswered) {
                  clueClasses +=
                    " text-black border-black border-solid bg-[#f0f1f1]";
                } else {
                  clueClasses +=
                    " border-dashed border-[var(--accent)] text-[var(--accent)] hover:bg-[#f0f1f1]";
                }

                return (
                  <span
                    key={index}
                    onClick={() => setActiveClue(isActive ? null : part.clueId)}
                    aria-expanded={isActive}
                    className={clueClasses}
                  >
                    {part.content}
                  </span>
                );
              }
              return null;
            })}
          </p>
        </div>

        {answeredClues === totalClues && (
          <Button
            onClick={handleVerify}
            className="bg-black text-white px-8 py-3 tracking-widest uppercase text-xs flex items-center gap-2 fade-in-view"
          >
            Verify Answers <ArrowRight size={16} />
          </Button>
        )}
      </div>

      {/* Bottom Sheet / Modal for Active Clue */}
      <div
        className={`
        fixed bottom-0 left-0 lg:left-[288px] right-0 bg-white border-t border-[#c4c7c7] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 
        transform transition-transform duration-300 ease-in-out
        ${activeClue ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="w-full max-w-2xl mx-auto p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] leading-[1.4] font-bold font-serif text-[#1a1c1c] flex items-center gap-2">
              <MessageCircleQuestion
                className="text-[var(--accent)]"
                size={24}
              />
              What does "{activeClue ? data.clues[activeClue].word : ""}" mean?
            </h3>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="p-2 text-[#444748] hover:text-black cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {activeClue &&
              data.clues[activeClue].options.map((option) => {
                const isSelected = answers[activeClue] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(activeClue, option.id)}
                    className={`
                    w-full text-left p-4 border transition-colors flex items-center justify-between group rounded-[4px] cursor-pointer
                    ${isSelected ? "border-black bg-[#f4f4f4]" : "border-[#c4c7c7] hover:bg-[#f4f4f4] hover:border-black"}
                  `}
                  >
                    <span
                      className={`text-[14px] leading-[1.4] font-bold font-sans ${isSelected ? "text-black" : "text-[#1a1c1c]"}`}
                    >
                      {option.text}
                    </span>
                    {isSelected ? (
                      <Check className="text-black" size={20} />
                    ) : (
                      <ArrowRight
                        className="text-[#c4c7c7] group-hover:text-black"
                        size={20}
                      />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
    </ActivityLayout>
  );
}
