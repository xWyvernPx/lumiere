import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Lightbulb,
  ArrowRight,
  Check,
  X,
  RefreshCw,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/Button";
import { VisualMatcherData } from "../../types/activity";

interface Props {
  data: VisualMatcherData;
}

export default function VisualMatcher({ data }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const QUESTION_DATA = data.questions;
  const currentQuestion = QUESTION_DATA[currentIdx];
  const totalQuestions = QUESTION_DATA.length;

  const handleSelectOption = (id: number) => {
    if (isVerified) return; // Prevent selection once verified
    setSelectedOptId(id);
  };

  const handleVerify = () => {
    if (selectedOptId === null || isVerified) return;

    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === selectedOptId,
    );
    const isCorrect = !!selectedOption?.isCorrect;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setIsVerified(true);
  };

  const handleNext = () => {
    setShowHint(false);
    setSelectedOptId(null);
    setIsVerified(false);

    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptId(null);
    setIsVerified(false);
    setScore(0);
    setShowHint(false);
    setSessionCompleted(false);
  };

  if (sessionCompleted) {
    const finalPercentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="max-w-2xl mx-auto py-12 px-5 block fade-in-view">
        <div className="bg-white border-t-4 border-black border-l border-r border-b border-[var(--border)] border-opacity-30 p-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 bg-[var(--accent-bg)] border-2 border-[var(--accent)] text-[var(--accent)] rounded-full">
              <Award className="w-16 h-16" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#747878]">
              Session Completed
            </span>
            <h1 className="text-4xl font-serif font-black">
              Scholarly Achievements
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto border border-[#e2e2e2] p-4 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#747878] block">
                Accuracy
              </span>
              <span className="text-2xl font-serif font-bold text-black">
                {finalPercentage}%
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#747878] block">
                Score
              </span>
              <span className="text-2xl font-serif font-bold text-black">
                {score} / {totalQuestions}
              </span>
            </div>
          </div>

          <p className="font-serif italic text-[#444748] text-lg max-w-md mx-auto">
            "Ce que l'on conçoit bien s'énonce clairement, et les mots pour le
            dire arrivent aisément." <br />
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#747878] not-italic">
              — Nicolas Boileau
            </span>
          </p>

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
    );
  }

  return (
    <div className="max-w-4xl mx-auto block fade-in-view">
      {/* Header Area */}
      <header className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#747878] flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
            A1 Reading • Visual Matcher
          </div>
          <div className="w-24 hidden sm:block"></div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="w-full flex items-center gap-4 border-b border-[var(--border)] border-opacity-10 pb-4">
          <span className="text-xs font-sans font-bold text-[#747878] w-12">
            {currentIdx + 1} / {totalQuestions}
          </span>
          <div className="flex-grow h-1.5 bg-[#f4f4f4] border border-[#e2e2e2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-serif italic text-[var(--accent)]">
            Score: {score}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="space-y-8">
        {/* Large prompt card */}
        <div className="bg-white border-t-4 border-black border-l border-r border-b border-[var(--border)] border-opacity-25 p-8 text-center relative overflow-hidden">
          <div className="absolute top-2 left-2 px-1.5 py-0.5 border border-[#e2e2e2] text-[8px] font-bold uppercase tracking-wider text-[#747878]">
            Enoncé
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black leading-normal text-black my-4">
            "{currentQuestion.prompt}"
          </h1>
          {isVerified && (
            <p className="text-xs font-sans font-bold text-[#747878] uppercase tracking-wider border-t border-[#f4f4f4] pt-3 mt-3">
              Translation: "{currentQuestion.englishTranslation}"
            </p>
          )}
        </div>

        {/* Visual Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptId === option.id;
            const isCorrectAnswer = option.isCorrect;

            // Highlight color borders on verification
            let borderStyle = "border-[#e2e2e2] hover:border-[var(--accent)]";
            if (isSelected) {
              borderStyle = "border-black border-4";
            }
            if (isVerified) {
              if (isCorrectAnswer) {
                borderStyle = "border-emerald-600 border-4";
              } else if (isSelected) {
                borderStyle = "border-red-600 border-4";
              } else {
                borderStyle = "border-[#e2e2e2] opacity-40";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isVerified}
                className={`
                  group relative aspect-[4/3] bg-white transition-all overflow-hidden text-left focus:outline-none 0px-radius cursor-pointer border
                  ${borderStyle}
                `}
              >
                {/* Image panel */}
                <img
                  src={option.src}
                  alt={option.alt}
                  referrerPolicy="no-referrer"
                  className={`
                    w-full h-full object-cover transition-all duration-500
                    ${isSelected ? "grayscale-0" : "grayscale group-hover:grayscale-0"}
                  `}
                />

                {/* Floating overlay selection tag */}
                <div className="absolute bottom-3 right-3 bg-white border border-black px-2.5 py-1 z-20 transition-all text-xs font-sans font-bold uppercase tracking-wider">
                  {isVerified ? (
                    isCorrectAnswer ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : isSelected ? (
                      <span className="text-red-700 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    ) : (
                      <span className="text-gray-400">Option {idx + 1}</span>
                    )
                  ) : isSelected ? (
                    <span className="text-black">Selected</span>
                  ) : (
                    <span className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select
                    </span>
                  )}
                </div>

                {/* Blind/Overlay mask for others when verified */}
                {isVerified && !isCorrectAnswer && !isSelected && (
                  <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Hints Panel */}
        {showHint && (
          <div className="bg-[var(--accent-bg)] border-l-4 border-[var(--accent)] p-5 block fade-in-view text-sm">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-sans font-bold uppercase text-xs tracking-wider text-[var(--accent)] mb-1">
                  Scholar's Hint
                </h5>
                <p className="font-serif italic text-black/85 leading-relaxed">
                  {currentQuestion.hint}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer / Verification Drawer */}
      <footer className="mt-12 pt-6 border-t border-[var(--border)] border-opacity-20 flex justify-between items-center gap-4">
        <button
          onClick={() => setShowHint((prev) => !prev)}
          className="text-[#1a1c1c] font-sans font-bold text-xs uppercase tracking-widest hover:text-[var(--accent)] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Lightbulb className="w-4 h-4" /> {showHint ? "Hide Hint" : "Hint"}
        </button>

        {!isVerified ? (
          <Button
            onClick={handleVerify}
            disabled={selectedOptId === null}
            className="bg-black text-white px-8 py-3 tracking-widest uppercase text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify Match
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-black text-white px-8 py-3 tracking-widest uppercase text-xs flex items-center gap-2"
          >
            {currentIdx + 1 < totalQuestions ? "Next Question" : "View Results"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </footer>
    </div>
  );
}
