/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import ReadingSession from './components/ReadingSession';
import Classroom from './components/Classroom';

export default function App() {
  const [currentView, setCurrentView] = useState('frontpage');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="text-[var(--foreground)] antialiased h-screen overflow-hidden flex font-sans selection:bg-[var(--accent)] selection:text-[var(--background)] bg-[var(--background)]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[var(--primary)]/40 z-20 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[var(--background)]">
        <Header toggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-10 sm:py-12 bg-[var(--background)]">
          {currentView === 'frontpage' && <FrontPage setCurrentView={setCurrentView} />}
          {currentView === 'reading-session' && <ReadingSession setCurrentView={setCurrentView} />}
          {currentView === 'classroom' && <Classroom />}
          {currentView === 'community' && (
             <div className="flex items-center justify-center h-full text-[var(--foreground)] opacity-80 font-serif italic fade-in-view">
               Community Desk pending assignment...
             </div>
          )}
          {currentView === 'archives' && (
             <div className="flex items-center justify-center h-full text-[var(--foreground)] opacity-80 font-serif italic fade-in-view">
               Saved Archives pending assignment...
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
