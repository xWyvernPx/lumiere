import React, { useState } from "react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Link } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  History,
  MoreVertical
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

import { ForumContent, ForumDraft, ForumProvider } from "../shared/Forum";
import { HistoryContent } from "../shared/History";

interface ActivityLayoutProps {
  title: string;
  level?: string;
  children: React.ReactNode; // The content for the Description tab
  editorialContent?: React.ReactNode;
  solutionsContent?: React.ReactNode;
  solutionsDraftContent?: React.ReactNode;
  historyContent?: React.ReactNode;
  answerSection?: React.ReactNode; // Optional right pane
  hideAnswerSection?: boolean;
}

export default function ActivityLayout({
  title,
  level,
  children,
  editorialContent,
  solutionsContent,
  solutionsDraftContent,
  historyContent,
  answerSection,
  hideAnswerSection = false,
}: ActivityLayoutProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <ForumProvider>
      <div className="h-screen w-full flex flex-col bg-[var(--background)] overflow-hidden">
        {/* Activity Header */}
        <header className="bg-white border-b-4 border-[var(--primary)] shrink-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-5 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[var(--primary)] opacity-70 hover:opacity-100 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-black text-xl tracking-tighter text-[var(--primary)] uppercase">{title}</h1>
              {level && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[var(--primary)] text-[var(--background)] px-2 py-0.5 rounded-sm">
                  {level}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 font-bold text-sm tracking-wide pr-4 sm:pr-5">
            <button 
              className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center"
              title="AI Assistant"
              onClick={() => window.dispatchEvent(new CustomEvent('open-assistant'))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>
            <button 
              className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center"
              title="Notebooks"
              onClick={() => window.dispatchEvent(new CustomEvent('open-notebooks'))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup orientation="horizontal" className="h-full w-full">
          {/* Question / Context Pane */}
          <Panel defaultSize={hideAnswerSection ? 100 : 50} minSize={30} className="h-full flex flex-col bg-white border-r border-[var(--border)]">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              <div className="flex border-b border-[var(--border)] bg-[var(--code-bg)] pt-2 px-4 gap-2 shrink-0">
                <TabsList className="bg-transparent h-auto p-0 flex gap-2 border-b-0 w-full justify-start">
                  <TabsTrigger 
                    value="description"
                    className="flex items-center gap-2 px-4 py-2 font-sans font-medium text-sm transition-colors data-[state=active]:font-bold data-[state=active]:text-[var(--primary)] data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-x data-[state=active]:border-[var(--primary)] data-[state=active]:translate-y-[1px] data-[state=inactive]:text-[var(--foreground)] data-[state=inactive]:opacity-70 data-[state=inactive]:border-t data-[state=inactive]:border-x data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[var(--primary)] data-[state=inactive]:hover:border-[var(--border)]"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="editorial"
                    className="flex items-center gap-2 px-4 py-2 font-sans font-medium text-sm transition-colors data-[state=active]:font-bold data-[state=active]:text-[var(--primary)] data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-x data-[state=active]:border-[var(--primary)] data-[state=active]:translate-y-[1px] data-[state=inactive]:text-[var(--foreground)] data-[state=inactive]:opacity-70 data-[state=inactive]:border-t data-[state=inactive]:border-x data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[var(--primary)] data-[state=inactive]:hover:border-[var(--border)]"
                  >
                    Éditorial
                  </TabsTrigger>
                  <TabsTrigger 
                    value="solutions"
                    className="flex items-center gap-2 px-4 py-2 font-sans font-medium text-sm transition-colors data-[state=active]:font-bold data-[state=active]:text-[var(--primary)] data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-x data-[state=active]:border-[var(--primary)] data-[state=active]:translate-y-[1px] data-[state=inactive]:text-[var(--foreground)] data-[state=inactive]:opacity-70 data-[state=inactive]:border-t data-[state=inactive]:border-x data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[var(--primary)] data-[state=inactive]:hover:border-[var(--border)]"
                  >
                    Forum
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history"
                    className="flex items-center gap-2 px-4 py-2 font-sans font-medium text-sm transition-colors data-[state=active]:font-bold data-[state=active]:text-[var(--primary)] data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-x data-[state=active]:border-[var(--primary)] data-[state=active]:translate-y-[1px] data-[state=inactive]:text-[var(--foreground)] data-[state=inactive]:opacity-70 data-[state=inactive]:border-t data-[state=inactive]:border-x data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[var(--primary)] data-[state=inactive]:hover:border-[var(--border)]"
                  >
                    Historique
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                <TabsContent value="description" className="m-0 h-full fade-in-view">
                  {children}
                </TabsContent>
                <TabsContent value="editorial" className="m-0 h-full fade-in-view">
                  {editorialContent || (
                    <div className="flex flex-col items-center justify-center h-full opacity-50">
                      <BookOpen className="w-12 h-12 mb-4" />
                      <p>No editorial available for this activity.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="solutions" className="m-0 h-full fade-in-view">
                  {solutionsContent || <ForumContent title={title} />}
                </TabsContent>
                <TabsContent value="history" className="m-0 h-full fade-in-view">
                  {historyContent || <HistoryContent />}
                </TabsContent>
              </div>
            </Tabs>
          </Panel>

          {/* Draggable Divider */}
          {(!hideAnswerSection || activeTab === 'solutions') && (
            <PanelResizeHandle className="w-2 bg-[var(--border)] bg-opacity-10 hover:bg-[var(--primary)] hover:bg-opacity-50 transition-colors flex items-center justify-center cursor-col-resize z-10 group">
              <div className="w-1 h-8 rounded-full bg-[var(--foreground)] opacity-20 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <MoreVertical className="w-3 h-3 text-[var(--background)]" />
              </div>
            </PanelResizeHandle>
          )}

          {/* Answer / Submission Pane */}
          {(!hideAnswerSection || activeTab === 'solutions') && (
            <Panel defaultSize={50} minSize={30} className="h-full flex flex-col bg-white">
              {activeTab === 'solutions' ? (
                solutionsDraftContent || <ForumDraft />
              ) : answerSection || (
                <div className="flex-1 flex items-center justify-center opacity-50">
                  <p>Answer workspace</p>
                </div>
              )}
            </Panel>
          )}
        </PanelGroup>
      </div>
    </div>
    </ForumProvider>
  );
}
