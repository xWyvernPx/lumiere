import React, { useState } from 'react';
import { Mic, PlayCircle, Eye, Info } from 'lucide-react';
import { AccountTabs } from '../../components/AccountTabs';

export default function HardwarePage() {
  const [suppression, setSuppression] = useState(true);
  const [isolation, setIsolation] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [contrast, setContrast] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [source, setSource] = useState("External Array (Studio Quality)");

  return (
    <div className="max-w-7xl mx-auto w-full flex-1">
      <AccountTabs />
      
      {/* Header */}
      <header className="mb-16 border-b border-[var(--primary)] pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Profile Configuration</span>
          <span className="w-px h-3 bg-[var(--primary)] block"></span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent)]">System Settings</span>
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[var(--primary)] uppercase tracking-tight">Hardware & Accessibility</h1>
        <p className="font-sans text-lg text-[var(--foreground)] opacity-80 mt-4 max-w-2xl">
          Configure your sensory inputs and scholastic accessibility preferences for optimal archival interaction.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Audio & Persona */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Microphone Calibration */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3 border-b border-[var(--primary)] pb-2">
              <Mic className="w-6 h-6" />
              Acoustic Calibration
            </h2>
            <div className="border border-[var(--primary)] p-6 bg-[var(--background)] flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[var(--primary)] mb-1">Input Sensor</h3>
                  <p className="font-sans text-base text-[var(--foreground)] opacity-80">{source}</p>
                </div>
                <select 
                  value={source} 
                  onChange={(e) => setSource(e.target.value)}
                  className="border border-[var(--primary)] bg-transparent px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[var(--code-bg)] transition-colors text-[var(--primary)] outline-none cursor-pointer appearance-none"
                >
                  <option>External Array (Studio Quality)</option>
                  <option>Internal Microphone</option>
                  <option>Bluetooth Headset</option>
                </select>
              </div>

              {/* Waveform Visualization */}
              <div className="h-24 border border-[var(--primary)] bg-[var(--background)] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px)' }}></div>
                <div className="w-full h-full flex items-center px-4 gap-1 relative z-10">
                  <div className="w-2 h-4 bg-[var(--primary)]"></div>
                  <div className="w-2 h-8 bg-[var(--primary)]"></div>
                  <div className="w-2 h-12 bg-[var(--primary)]"></div>
                  <div className="w-2 h-6 bg-[var(--primary)]"></div>
                  <div className="w-2 h-16 bg-[var(--primary)]"></div>
                  <div className="w-2 h-10 bg-[var(--primary)]"></div>
                  <div className="w-2 h-4 bg-[var(--primary)]"></div>
                  <div className="w-2 h-20 bg-[var(--accent)]"></div>
                  <div className="w-2 h-12 bg-[var(--primary)]"></div>
                  <div className="w-2 h-6 bg-[var(--primary)]"></div>
                  <div className="w-2 h-14 bg-[var(--primary)]"></div>
                  <div className="w-2 h-8 bg-[var(--primary)]"></div>
                  <div className="flex-1"></div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">-12dB</span>
                </div>
              </div>

              {/* Audio Toggles */}
              <div className="flex flex-col gap-4 pt-4 border-t border-[var(--primary)] text-[var(--foreground)]">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">Environmental Suppression</span>
                    <span className="font-sans text-xs opacity-80">Filter ambient architectural noise</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={suppression} onChange={(e) => setSuppression(e.target.checked)} />
                    <div className="block w-10 h-6 border border-[var(--primary)] bg-[var(--background)] peer-checked:bg-[var(--primary)] transition-colors"></div>
                    <div className="absolute left-[1px] top-[1px] w-[22px] h-[22px] border border-[var(--primary)] bg-[var(--background)] peer-checked:border-[var(--primary)] transition-transform peer-checked:translate-x-[14px]"></div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">Vocal Isolation (Beta)</span>
                    <span className="font-sans text-xs opacity-80">Enhance linguistic clarity for pronunciation analysis</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={isolation} onChange={(e) => setIsolation(e.target.checked)} />
                    <div className="block w-10 h-6 border border-[var(--primary)] bg-[var(--background)] peer-checked:bg-[var(--primary)] transition-colors"></div>
                    <div className="absolute left-[1px] top-[1px] w-[22px] h-[22px] border border-[var(--primary)] bg-[var(--background)] peer-checked:border-[var(--primary)] transition-transform peer-checked:translate-x-[14px]"></div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* AI Scholarly Persona */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3 border-b border-[var(--primary)] pb-2">
              <PlayCircle className="w-6 h-6" />
              Interlocutor Persona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Persona Card 1 */}
              <div className="border border-[var(--primary)] p-6 bg-[var(--background)] cursor-pointer hover:bg-[var(--code-bg)] transition-colors relative">
                <div className="absolute top-4 right-4 w-4 h-4 border border-[var(--primary)] bg-[var(--primary)]"></div>
                <h3 className="font-serif text-2xl font-bold text-[var(--primary)] mb-2">Parisian</h3>
                <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4">Formal / Academic</div>
                <p className="font-sans text-sm text-[var(--foreground)] opacity-80 mb-6">
                  Standard metropolitan articulation with elevated scholarly register. Ideal for literary analysis and formal discourse.
                </p>
                <button className="font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  Audition Sample
                </button>
              </div>

              {/* Persona Card 2 */}
              <div className="border border-[var(--primary)] p-6 bg-[var(--background)] cursor-pointer hover:bg-[var(--code-bg)] transition-colors">
                <h3 className="font-serif text-2xl font-bold text-[var(--primary)] mb-2">Québécois</h3>
                <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4">Casual / Regional</div>
                <p className="font-sans text-sm text-[var(--foreground)] opacity-80 mb-6">
                  Authentic North American francophone cadence. Optimized for colloquial comprehension and regional phonetic studies.
                </p>
                <button className="font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  Audition Sample
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Accessibility Settings */}
        <div className="lg:col-span-4">
          <section className="sticky top-8">
            <h2 className="font-serif text-2xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3 border-b border-[var(--primary)] pb-2">
              <Eye className="w-6 h-6" />
              Accessibility
            </h2>
            <div className="flex flex-col gap-0 border border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)]">
              {/* Setting 1 */}
              <label className="flex items-center justify-between p-4 cursor-pointer border-b border-[var(--primary)] hover:bg-[var(--code-bg)] transition-colors">
                <span className="font-sans text-sm font-bold text-[var(--primary)]">Dyslexia-Optimized Typography</span>
                <div className="relative ml-4 shrink-0">
                  <input type="checkbox" className="sr-only peer" checked={dyslexia} onChange={(e) => setDyslexia(e.target.checked)} />
                  <div className="block w-10 h-6 border border-[var(--primary)] bg-[var(--background)] peer-checked:bg-[var(--primary)] transition-colors"></div>
                  <div className="absolute left-[1px] top-[1px] w-[22px] h-[22px] border border-[var(--primary)] bg-[var(--background)] peer-checked:border-[var(--primary)] transition-transform peer-checked:translate-x-[14px]"></div>
                </div>
              </label>

              {/* Setting 2 */}
              <label className="flex items-center justify-between p-4 cursor-pointer border-b border-[var(--primary)] hover:bg-[var(--code-bg)] transition-colors">
                <span className="font-sans text-sm font-bold text-[var(--primary)]">High-Contrast Transcripts</span>
                <div className="relative ml-4 shrink-0">
                  <input type="checkbox" className="sr-only peer" checked={contrast} onChange={(e) => setContrast(e.target.checked)} />
                  <div className="block w-10 h-6 border border-[var(--primary)] bg-[var(--background)] peer-checked:bg-[var(--primary)] transition-colors"></div>
                  <div className="absolute left-[1px] top-[1px] w-[22px] h-[22px] border border-[var(--primary)] bg-[var(--background)] peer-checked:border-[var(--primary)] transition-transform peer-checked:translate-x-[14px]"></div>
                </div>
              </label>

              {/* Setting 3 */}
              <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--code-bg)] transition-colors">
                <span className="font-sans text-sm font-bold text-[var(--primary)]">Forced Subtitles (Modules)</span>
                <div className="relative ml-4 shrink-0">
                  <input type="checkbox" className="sr-only peer" checked={subtitles} onChange={(e) => setSubtitles(e.target.checked)} />
                  <div className="block w-10 h-6 border border-[var(--primary)] bg-[var(--background)] peer-checked:bg-[var(--primary)] transition-colors"></div>
                  <div className="absolute left-[1px] top-[1px] w-[22px] h-[22px] border border-[var(--primary)] bg-[var(--background)] peer-checked:border-[var(--primary)] transition-transform peer-checked:translate-x-[14px]"></div>
                </div>
              </label>
            </div>

            <div className="mt-8 border border-[var(--primary)] p-4 bg-[var(--code-bg)] flex items-start gap-3">
              <Info className="w-5 h-5 text-[var(--foreground)] opacity-60 shrink-0" />
              <p className="font-sans text-sm text-[var(--foreground)] opacity-80">
                Changes to transcription legibility require a module restart to take effect across active sessions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
