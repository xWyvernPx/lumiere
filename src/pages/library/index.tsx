import React, { useState } from 'react';
import {
  User,
  Settings,
  Folder,
  Search,
  BookOpen,
  PenTool,
  Mic,
  Brain,
  Pencil,
  Headphones,
  Award,
  Hash,
  Library
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';

export default function DeepArchive() {
  const [activeTab, setActiveTab] = useState('Comparative Linguistics');

  const tabs = ['Comparative Linguistics', 'Certs', 'Topics', 'Classical Literature'];

  // Data for Comparative Linguistics tab
  const linguisticsCards = [
    {
      id: "activity-1",
      code: 'LING_402',
      level: 'C1 Advanced',
      levelType: 'high',
      title: 'Anatolian Branch Discrepancies',
      desc: 'A deep dive into the phonetic shifts of Hittite compared to contemporary Luwian dialects.',
      tags: [
        { icon: BookOpen, text: 'Reading' },
        { icon: PenTool, text: 'Writing' }
      ]
    },
    {
      id: "activity-2",
      code: 'LING_512',
      level: 'B2 Intermediate',
      levelType: 'medium',
      title: 'The Great Vowel Shift',
      desc: 'Tracing the transformation of Middle English phonology into Early Modern standardizations.',
      tags: [
        { icon: Mic, text: 'Speaking' }
      ]
    },
    {
      id: "activity-3",
      code: 'LING_109',
      level: 'A2 Beginner',
      levelType: 'medium',
      title: 'Romance Cognates',
      desc: 'Identifying shared lexical roots across Spanish, Italian, and French for early learners.',
      tags: [
        { icon: BookOpen, text: 'Reading' }
      ]
    },
    {
      id: "activity-4",
      code: 'LING_667',
      level: 'C2 Mastery',
      levelType: 'high',
      title: 'Agglutination Patterns',
      desc: 'A comparative analysis of morphological synthesis in Uralic and Turkic language families.',
      tags: [
        { icon: Brain, text: 'Analysis' }
      ]
    },
    {
      id: "activity-5",
      code: 'LING_440',
      level: 'C1 Advanced',
      levelType: 'high',
      title: 'Syntactic Ergativity',
      desc: 'Examining the alignment of grammatical relations in Dyirbal and Mayan languages.',
      tags: [
        { icon: Pencil, text: 'Diagramming' }
      ]
    },
    {
      id: "activity-6",
      code: 'LING_222',
      level: 'B1 Intermediate',
      levelType: 'medium',
      title: "Grimm's Law Revisited",
      desc: 'Understanding the first Germanic sound shift through comparative examples of Latin roots.',
      tags: [
        { icon: Headphones, text: 'Listening' }
      ]
    }
  ];

  // Mock Data for Certs tab
  const certCards = [
    {
      id: "activity-1",
      code: 'DELF_B1',
      level: 'B1 Intermediate',
      levelType: 'medium',
      title: 'DELF B1 Mock Exam 1',
      desc: 'Full practice exam including reading, writing, listening, and speaking sections auto-graded.',
      tags: [
        { icon: BookOpen, text: 'Reading' },
        { icon: Headphones, text: 'Listening' }
      ]
    },
    {
      id: "activity-2",
      code: 'DALF_C1',
      level: 'C1 Advanced',
      levelType: 'high',
      title: 'DALF C1 Synthèse Focus',
      desc: 'Intensive practice for the document synthesis and argumentative essay portion.',
      tags: [
        { icon: PenTool, text: 'Writing' }
      ]
    },
    {
      id: "activity-3",
      code: 'TCF_CAN',
      level: 'All Levels',
      levelType: 'medium',
      title: 'TCF Canada Practice Suite',
      desc: 'Simulated adaptive testing for the TCF Canada immigration requirement.',
      tags: [
        { icon: Headphones, text: 'Listening' },
        { icon: BookOpen, text: 'Reading' }
      ]
    },
    {
      id: "activity-4",
      code: 'DELF_B2',
      level: 'B2 Intermediate',
      levelType: 'medium',
      title: 'DELF B2 Oral Defense',
      desc: 'Mock debate prompts and monologue prep for the production orale.',
      tags: [
        { icon: Mic, text: 'Speaking' }
      ]
    }
  ];

  // Mock Data for Topics tab
  const topicCards = [
    {
      id: "activity-1",
      code: 'TOP_ENV',
      level: 'B2 Intermediate',
      levelType: 'medium',
      title: "L'écologie et l'environnement",
      desc: 'Debate preparation and vocabulary for discussing climate change and sustainability.',
      tags: [
        { icon: Mic, text: 'Speaking' },
        { icon: BookOpen, text: 'Reading' }
      ]
    },
    {
      id: "activity-2",
      code: 'TOP_TECH',
      level: 'C1 Advanced',
      levelType: 'high',
      title: "L'intelligence artificielle",
      desc: 'Complex articles and ethical discussions surrounding AI in the modern workplace.',
      tags: [
        { icon: BookOpen, text: 'Reading' },
        { icon: PenTool, text: 'Writing' }
      ]
    },
    {
      id: "activity-3",
      code: 'TOP_CULT',
      level: 'A2 Beginner',
      levelType: 'medium',
      title: "La gastronomie française",
      desc: 'Essential vocabulary for ordering food, understanding menus, and regional specialties.',
      tags: [
        { icon: Headphones, text: 'Listening' }
      ]
    },
    {
      id: "activity-4",
      code: 'TOP_POL',
      level: 'B1 Intermediate',
      levelType: 'medium',
      title: "Le système politique",
      desc: 'An overview of the Fifth Republic, voting processes, and political institutions.',
      tags: [
        { icon: BookOpen, text: 'Reading' }
      ]
    }
  ];

  const renderGrid = (cards: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#c4c7c7] border border-[#c4c7c7] overflow-hidden rounded-xl">
      {cards.map((card) => (
        <Link 
          to="/activity/$activityId"
          params={{ activityId: card.id }}
          key={card.id}
          className="bg-white p-6 flex flex-col justify-between group hover:bg-[#f4f4f4] transition-all cursor-pointer active:scale-[0.98]"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[12px] font-bold text-[#444748] font-mono uppercase tracking-tighter">
                {card.code}
              </span>
              {card.levelType === 'high' ? (
                <span className="bg-[#000000] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {card.level}
                </span>
              ) : (
                <span className="bg-[#eeeeee] text-[#000000] text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-[#c4c7c7]">
                  {card.level}
                </span>
              )}
            </div>
            <h3 className="font-serif text-[20px] font-bold mb-2 group-hover:underline text-[#000000]">
              {card.title}
            </h3>
            <p className="text-sm text-[#444748] leading-relaxed mb-6">
              {card.desc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-[#c4c7c7] pt-4">
            {card.tags.map((tag: any, idx: number) => (
              <div key={idx} className="flex items-center gap-1 text-xs font-bold uppercase text-[#1a1c1c]">
                <tag.icon size={16} />
                {tag.text}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );

  const renderPagination = (total: number) => (
    <div className="flex justify-between items-center py-4 border-t border-[#c4c7c7]">
      <p className="text-xs text-[#444748] font-medium">Showing {total} modules</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="primary" size="sm">
          Next Page
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Comparative Linguistics':
        return (
          <>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-[#c4c7c7] rounded-xl shadow-sm items-center">
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] z-10" />
                <Input 
                  placeholder="Search 500+ modules..." 
                  className="pl-10 h-10 w-full" 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                <div className="w-48">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Level: A1-C2</SelectItem>
                      <SelectItem value="elem">Elementary (A1-A2)</SelectItem>
                      <SelectItem value="inter">Intermediate (B1-B2)</SelectItem>
                      <SelectItem value="adv">Advanced (C1-C2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1 flex-wrap sm:flex-nowrap">
                  <Button variant="outline" size="sm" className="h-10">Reading</Button>
                  <Button variant="outline" size="sm" className="h-10">Writing</Button>
                  <Button variant="outline" size="sm" className="h-10">Speaking</Button>
                  <Button variant="outline" size="sm" className="h-10">Listening</Button>
                </div>
              </div>
            </div>
            
            {renderGrid(linguisticsCards)}
            {renderPagination(512)}
          </>
        );

      case 'Certs':
        return (
          <>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-[#c4c7c7] rounded-xl shadow-sm items-center">
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] z-10" />
                <Input 
                  placeholder="Search mock exams..." 
                  className="pl-10 h-10 w-full" 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                <div className="w-48">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Certifications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Certifications</SelectItem>
                      <SelectItem value="delf">DELF (A1-B2)</SelectItem>
                      <SelectItem value="dalf">DALF (C1-C2)</SelectItem>
                      <SelectItem value="tcf">TCF / TEF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {renderGrid(certCards)}
            {renderPagination(45)}
          </>
        );

      case 'Topics':
        return (
          <>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-[#c4c7c7] rounded-xl shadow-sm items-center">
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] z-10" />
                <Input 
                  placeholder="Search thematic modules..." 
                  className="pl-10 h-10 w-full" 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                <div className="w-40">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Level: All</SelectItem>
                      <SelectItem value="a1a2">A1-A2</SelectItem>
                      <SelectItem value="b1b2">B1-B2</SelectItem>
                      <SelectItem value="c1c2">C1-C2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1 flex-wrap sm:flex-nowrap">
                  <Button variant="outline" size="sm" className="h-10">Reading</Button>
                  <Button variant="outline" size="sm" className="h-10">Speaking</Button>
                </div>
              </div>
            </div>
            
            {renderGrid(topicCards)}
            {renderPagination(128)}
          </>
        );

      case 'Classical Literature':
        return (
          <div className="flex flex-col gap-6 items-center justify-center py-20 text-center border-2 border-dashed border-[#c4c7c7] rounded-xl">
            <Library size={48} className="text-[#747878] mb-4" />
            <h2 className="font-serif text-2xl font-bold text-[#000000]">
              Classical Literature Library
            </h2>
            <p className="text-[#444748] max-w-md">
              Access complete texts, interlinear translations, and critical commentary for ancient Greek, Latin, and Sanskrit works.
            </p>
            <Button variant="primary" className="mt-4">
              Explore the Library
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fade-in-view text-[#1a1c1c] font-sans bg-transparent min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Header removed to use AppLayout header */}

      {/* Secondary Navigation */}
      <nav className="border-b-4 border-black pb-2 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center pb-3 pt-4 whitespace-nowrap transition-all border-b-2 -mb-2.5 ${
                activeTab === tab 
                  ? 'border-black text-black' 
                  : 'border-transparent text-[#747878] hover:text-black'
              }`}
            >
              <span className="text-sm font-bold tracking-widest uppercase">{tab}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row py-2 gap-8">
        
        {/* Quick Jump Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          {activeTab === 'Topics' ? (
            <div className="p-6 bg-white border border-[#c4c7c7] rounded-xl shadow-sm">
              <h3 className="font-serif text-[20px] font-bold mb-4 text-[#000000]">Thematic Focus</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e8e8e8] text-[#000000] font-bold">
                    <Hash size={18} className="text-[#747878]" />
                    <span className="text-sm">Environment</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Hash size={18} className="text-[#747878]" />
                    <span className="text-sm">Technology & AI</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Hash size={18} className="text-[#747878]" />
                    <span className="text-sm">Culture & Arts</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Hash size={18} className="text-[#747878]" />
                    <span className="text-sm">Politics & Society</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="p-6 bg-white border border-[#c4c7c7] rounded-xl shadow-sm">
              <h3 className="font-serif text-[20px] font-bold mb-4 text-[#000000]">Quick Jump</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e8e8e8] text-[#000000] font-bold">
                    <Folder size={18} className="fill-current" />
                    <span className="text-sm">Morphology</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Folder size={18} />
                    <span className="text-sm">Syntax</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Folder size={18} />
                    <span className="text-sm">Etymology</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Folder size={18} />
                    <span className="text-sm">Phonology</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#444748] hover:bg-[#eeeeee] transition-colors">
                    <Folder size={18} />
                    <span className="text-sm">Dialectology</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
          
          {/* Active Research Widget */}
          <div className="hidden lg:block relative h-64 overflow-hidden rounded-xl border border-[#c4c7c7] bg-gradient-to-br from-[#f4f4f4] to-[#dadada]">
            <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-[#444748]">Active Research</p>
              <h4 className="text-lg font-black leading-tight font-serif text-[#000000]">Statistical Trends in Proto-Indo-European</h4>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
