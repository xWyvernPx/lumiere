import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  GripVertical,
  RefreshCw,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  TextReconstructionData,
  TextReconstructionItem,
} from "../../types/activity";
import { Button } from "../ui/Button";

interface Props {
  data: TextReconstructionData;
  level: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function TextReconstruction({ data, level }: Props) {
  const [items, setItems] = useState<TextReconstructionItem[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Initialize with shuffled items on mount
    setItems(shuffleArray(data.items));
  }, [data.items]);

  const totalItems = data.items.length;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isVerified) return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (isVerified) return;
    if (draggedIdx === null || draggedIdx === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIdx];

    newItems.splice(draggedIdx, 1);
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggedIdx(index);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleVerify = () => {
    let correctCount = 0;
    items.forEach((item, index) => {
      if (item.correctOrder === index) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsVerified(true);
    setSessionCompleted(true);
  };

  const handleRestart = () => {
    setItems(shuffleArray(data.items));
    setIsVerified(false);
    setSessionCompleted(false);
    setScore(0);
  };

  if (sessionCompleted) {
    const finalPercentage = Math.round((score / totalItems) * 100);
    return (
      <div className="max-w-2xl mx-auto py-12 px-5 block fade-in-view">
        <div className="bg-white border-t-4 border-black border-l border-r border-b border-[#c4c7c7] p-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 bg-[var(--accent-bg)] border-2 border-[var(--accent)] text-[var(--accent)] rounded-full">
              <Award className="w-16 h-16" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#747878]">
              Session Completed
            </span>
            <h1 className="text-4xl font-serif font-black text-[#1a1c1c]">
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
                {score} / {totalItems}
              </span>
            </div>
          </div>

          <div className="text-left max-w-sm mx-auto">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[#747878] mb-3 border-b border-[#e2e2e2] pb-2">
              Review
            </h3>
            <div className="flex flex-col gap-3">
              {items.map((item, index) => {
                const isCorrect = item.correctOrder === index;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 border ${isCorrect ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-red-600 bg-red-50 text-red-900"}`}
                  >
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="font-sans text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
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
    );
  }

  return (
    <div className="w-full mx-auto pb-32 max-w-4xl px-5 fade-in-view">
      <header className="flex flex-col mb-10 pb-4 border-b-4 border-black gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] leading-none tracking-[0.08em] uppercase font-bold text-[#747878]">
            {level} EXERCISE
          </span>
          <div className="w-16"></div>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-black text-black">
            Drag the sentences to build the story.
          </h2>
          <p className="text-[#444748] mt-2 font-serif">{data.title}</p>
        </div>
      </header>

      <div className="bg-white border border-[#c4c7c7] p-[20px] rounded-sm max-w-2xl mx-auto">
        <motion.div layout className="flex flex-col gap-4">
          {items.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              draggable={!isVerified}
              onDragStart={(e: any) => handleDragStart(e as React.DragEvent, index)}
              onDragOver={(e: any) => handleDragOver(e as React.DragEvent, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center border border-[#c4c7c7] transition-all
                ${!isVerified ? "cursor-grab active:cursor-grabbing group hover:bg-[#f3f3f3]" : ""}
                ${draggedIdx === index ? "bg-[#f4f4f4] border-black shadow-md opacity-90 scale-[1.02]" : "bg-[#f9f9f9]"}
              `}
            >
              <div className="p-4 border-r border-[#c4c7c7] text-[#444748] group-hover:text-black transition-colors flex items-center justify-center">
                <GripVertical size={24} />
              </div>
              <div className="p-4 flex-1 pointer-events-none">
                <p className="font-sans text-[14px] leading-[1.4] font-medium text-[#1a1c1c]">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center">
        {!isVerified && (
          <Button
            onClick={handleVerify}
            className="bg-black text-white px-8 py-3 tracking-widest uppercase text-xs flex items-center gap-2"
          >
            Check Answer <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
