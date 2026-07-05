import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Mic,
  Headphones,
  BookOpen,
  PenTool,
  ArrowRight,
  Clock,
  Lock,
  Waves,
  MessageSquare,
  Coffee,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { Badge } from "../../components/ui/Badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/Tabs";

export default function PracticingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 block fade-in-view">
      <section className="border-b border-[var(--border)] border-opacity-20 pb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 pr-0 md:pr-8 md:border-r border-[var(--border)] border-opacity-20">
            <span className="inline-block border border-[var(--border)] border-opacity-30 text-[var(--foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-4">
              Front Page
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
              Speaking: The Parisian Café
            </h2>
            <p className="font-serif text-xl text-[var(--foreground)] opacity-80 mb-6 leading-relaxed">
              Master the art of ordering coffee and croissants. Practice your
              pronunciation, master social pleasantries, and navigate a
              simulated conversation with our AI barista.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Button
                variant="primary"
                size="lg"
                className="px-6 py-3 tracking-widest uppercase text-xs flex items-center gap-2"
              >
                Resume Session <ArrowRight className="w-4 h-4 text-inherit" />
              </Button>
              <Link to="/app/library">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 py-3 tracking-widest uppercase text-xs flex items-center gap-2"
                >
                  Explore Activities Library
                </Button>
              </Link>
              <div className="flex-1 min-w-[200px] max-w-[240px]">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-[var(--foreground)]">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <Progress value={40} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col">
            <div className="aspect-[4/3] bg-[var(--code-bg)] border border-[var(--border)] border-opacity-20 flex items-center justify-center mb-3 relative overflow-hidden group">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
              >
                <defs>
                  <pattern
                    id="hatch"
                    width="6"
                    height="6"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="var(--foreground)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hatch)" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-24 h-24 relative z-10 transition-transform duration-500 group-hover:scale-105"
                fill="none"
                stroke="var(--foreground)"
                strokeWidth="1.5"
                strokeLinecap="square"
              >
                <ellipse cx="30" cy="52" rx="18" ry="4" />
                <path d="M16 52 c 0 6, 28 6, 28 0" />
                <path d="M18 28 v 12 c 0 8, 24 8, 24 0 v -12" />
                <line x1="14" y1="28" x2="46" y2="28" />
                <path d="M42 32 h 6 c 4 0, 4 8, 0 8 h -5" />
                <path d="M24 22 q -2 -3, 0 -6 t 0 -6" />
                <path d="M30 24 q -3 -4, 0 -8 t 0 -8" />
                <path d="M36 22 q -2 -3, 0 -6 t 0 -6" />
              </svg>
            </div>
            <span className="text-xs font-serif italic text-[var(--foreground)] opacity-70 text-right">
              Fig 1. Scene illustration.
            </span>
          </div>
        </div>
      </section>

      <section>
        <Tabs defaultValue="speaking" className="w-full">
          <div className="flex flex-wrap items-end gap-8 border-b border-[#e2e2e2] mb-10">
            <TabsList className="flex gap-8 flex-wrap justify-start border-b-0 w-auto bg-transparent h-auto p-0">
              <TabsTrigger
                value="speaking"
                className="pb-4 border-b-2 transition-all data-[state=active]:border-black data-[state=active]:text-black data-[state=inactive]:border-transparent data-[state=inactive]:font-medium data-[state=inactive]:text-[#444748] data-[state=inactive]:hover:text-black font-sans text-lg capitalize tracking-normal px-0"
              >
                Speaking
              </TabsTrigger>
              <TabsTrigger
                value="listening"
                className="pb-4 border-b-2 transition-all data-[state=active]:border-black data-[state=active]:text-black data-[state=inactive]:border-transparent data-[state=inactive]:font-medium data-[state=inactive]:text-[#444748] data-[state=inactive]:hover:text-black font-sans text-lg capitalize tracking-normal px-0"
              >
                Listening
              </TabsTrigger>
              <TabsTrigger
                value="reading"
                className="pb-4 border-b-2 transition-all data-[state=active]:border-black data-[state=active]:text-black data-[state=inactive]:border-transparent data-[state=inactive]:font-medium data-[state=inactive]:text-[#444748] data-[state=inactive]:hover:text-black font-sans text-lg capitalize tracking-normal px-0"
              >
                Reading
              </TabsTrigger>
              <TabsTrigger
                value="writing"
                className="pb-4 border-b-2 transition-all data-[state=active]:border-black data-[state=active]:text-black data-[state=inactive]:border-transparent data-[state=inactive]:font-medium data-[state=inactive]:text-[#444748] data-[state=inactive]:hover:text-black font-sans text-lg capitalize tracking-normal px-0"
              >
                Writing
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="speaking" className="fade-in-view mt-4">
            <SpeakingTab />
          </TabsContent>
          <TabsContent value="listening" className="fade-in-view mt-4">
            <ListeningTab />
          </TabsContent>
          <TabsContent value="reading" className="fade-in-view mt-4">
            <ReadingTab />
          </TabsContent>
          <TabsContent value="writing" className="fade-in-view mt-4">
            <WritingTab />
          </TabsContent>
        </Tabs>
      </section>

      <div className="h-12 border-t-2 border-[var(--border)] border-opacity-20 pt-4 flex justify-between items-center mt-10">
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

function SpeakingTab() {
  const speakingActivities = ACTIVITIES.filter(a => a.type === 'PHONEME_MATCHER');
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-serif text-[20px] font-bold uppercase tracking-tight whitespace-nowrap">
            I. Phonetics & Mechanics
          </h4>
          <div className="border-b border-black h-px w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {speakingActivities.map((activity) => (
            <Link
              key={activity.id}
              to="/activity/$activityId"
              params={{ activityId: activity.id }}
              className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <Waves className="w-5 h-5 text-[#3d627b]" />
                <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">15 MIN</span>
              </div>
              <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
                {activity.title}
              </h5>
              <p className="text-[#444748] text-sm mb-6 flex-1">
                {activity.description}
              </p>
              <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
                <span>COMMENCER</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
          <div className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Mic className="w-5 h-5 text-[#3d627b]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">10 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
              The Art of Shadowing
            </h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">
              Mimic native speakers meticulously to improve your intonation, flow, and overall conversational rhythm.
            </p>
            <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
              <span>COMMENCER</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="pb-16">
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-serif text-[20px] font-bold uppercase tracking-tight whitespace-nowrap">
            II. Simulated Scenarios
          </h4>
          <div className="border-b border-black h-px w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-[#3d627b] border-t border-r border-b border-[#e2e2e2] p-6 bg-[#f4f4f4] cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Coffee className="w-5 h-5 text-[#3d627b]" />
                <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#3d627b] uppercase bg-[#bce2ff] bg-opacity-30 px-2 py-0.5">EN COURS</span>
              </div>
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">30 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2">The Parisian Café</h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">Engage in interactive AI conversations modeled after real-world scenarios. Practice ordering and pleasantries.</p>
            <div className="h-1 w-full bg-[#e2e2e2] mb-4">
              <div className="h-full bg-[#3d627b]" style={{ width: '40%' }}></div>
            </div>
            <button className="text-[#3d627b] font-bold text-xs uppercase flex items-center hover:gap-2 transition-all mt-auto w-max">
              CONTINUER L'EXERCICE <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="border border-[#e2e2e2] p-6 bg-white opacity-50 relative overflow-hidden group flex flex-col">
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
              <Lock className="w-10 h-10 text-black" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <MessageSquare className="w-5 h-5 text-[#444748]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">45 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2">Discuss & Debate</h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">Learn to express complex opinions and construct persuasive arguments. Restricted to Level B2+ learners.</p>
            <div className="flex items-center text-xs font-bold text-[#444748] mt-auto">
              <span>DÉBLOQUER AU NIVEAU 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListeningTab() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-serif text-[20px] font-bold uppercase tracking-tight whitespace-nowrap">
            I. Comprehension
          </h4>
          <div className="border-b border-black h-px w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Headphones className="w-5 h-5 text-[#3d627b]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">20 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
              Daily Podcasts
            </h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">
              Slowed-down news and stories with interactive transcripts to follow along word-by-word.
            </p>
            <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
              <span>COMMENCER</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Mic className="w-5 h-5 text-[#3d627b]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">15 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
              Dictée Classique
            </h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">
              The classic French dictation exercise. Listen to a passage and type exactly what you hear to master spelling and grammar nuances.
            </p>
            <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
              <span>COMMENCER</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ACTIVITIES } from "../../data/activities";

function ReadingTab() {
  const readingActivities = ACTIVITIES.filter(a => a.type !== 'PHONEME_MATCHER');
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-serif text-[20px] font-bold uppercase tracking-tight whitespace-nowrap">
            I. Text Analysis
          </h4>
          <div className="border-b border-black h-px w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {readingActivities.map((activity) => (
            <Link
              key={activity.id}
              to="/activity/$activityId"
              params={{ activityId: activity.id }}
              className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <BookOpen className="w-5 h-5 text-[#3d627b]" />
                <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">20 MIN</span>
              </div>
              <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
                {activity.title}
              </h5>
              <p className="text-[#444748] text-sm mb-6 flex-1">
                {activity.description}
              </p>
              <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
                <span>COMMENCER</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
          <div className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <BookOpen className="w-5 h-5 text-[#3d627b]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">30 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
              Literary Snippets
            </h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">
              Immerse yourself in excerpts from classic French literature. Featuring Hugo, Camus, and Proust.
            </p>
            <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
              <span>COMMENCER</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WritingTab() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-serif text-[20px] font-bold uppercase tracking-tight whitespace-nowrap">
            I. Composition
          </h4>
          <div className="border-b border-black h-px w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#e2e2e2] p-6 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <PenTool className="w-5 h-5 text-[#3d627b]" />
              <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">25 MIN</span>
            </div>
            <h5 className="font-serif text-[20px] leading-[1.4] font-bold mb-2 group-hover:underline">
              The Editor's Desk
            </h5>
            <p className="text-[#444748] text-sm mb-6 flex-1">
              Write a short paragraph daily on a given prompt. Our AI 'editor' will review and correct your grammar.
            </p>
            <div className="flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform mt-auto">
              <span>COMMENCER</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
