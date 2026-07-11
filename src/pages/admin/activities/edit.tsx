import React, { useState } from 'react';
import { CheckCircle, Save, Filter, Eye, Code, Layout } from 'lucide-react';

const DATA_SCHEMA_JSON = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TexteLacunaireData",
  "type": "object",
  "properties": {
    "baseText": {
      "type": "string",
      "description": "The full text with {{gap_id}} markers."
    },
    "gaps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "correctAnswer": { "type": "string" },
          "distractors": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["id", "correctAnswer"]
      }
    }
  },
  "required": ["baseText", "gaps"]
}`;

const SUBMISSION_SCHEMA_JSON = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TexteLacunaireSubmission",
  "type": "object",
  "properties": {
    "answers": {
      "type": "object",
      "patternProperties": {
        "^.*$": {
          "type": "string",
          "description": "Key is gap ID, value is user's string answer."
        }
      },
      "additionalProperties": false
    },
    "timeTakenMs": {
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["answers"]
}`;

export default function AdminActivitiesEditPage() {
  const [dataView, setDataView] = useState<'code' | 'design'>('code');
  const [subView, setSubView] = useState<'code' | 'design'>('code');

  return (
    <div className="absolute inset-0 flex flex-col bg-[var(--background)]">
      {/* Minimal Top Bar Context */}
      <header className="h-16 bg-[var(--background)] border-b border-[var(--primary)] flex items-center justify-between px-6 shrink-0 z-40">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-xl font-bold text-[var(--primary)] hidden sm:block">Activity Type Architect</h2>
          <span className="px-2 py-1 bg-[var(--code-bg)] text-[var(--foreground)] font-sans text-[10px] font-bold border border-[var(--primary)] border-opacity-20 uppercase tracking-widest">
            Le Texte Lacunaire
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-transparent border border-[var(--primary)] text-[var(--primary)] font-sans text-sm font-bold py-1.5 px-4 hover:bg-[var(--code-bg)] transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Validate</span>
          </button>
          <button className="bg-[var(--primary)] border border-[var(--primary)] text-[var(--background)] font-sans text-sm font-bold py-1.5 px-4 hover:bg-[var(--accent)] transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Schema</span>
          </button>
        </div>
      </header>

      {/* Three Pane Layout */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 bg-[var(--code-bg)]">
        
        {/* Left Pane: List */}
        <section className="w-1/4 min-w-[250px] bg-[var(--background)] border-t-4 border-[var(--primary)] border border-[var(--border)] border-opacity-20 flex flex-col shadow-sm hidden md:flex">
          <div className="p-4 border-b border-[var(--border)] border-opacity-20 flex justify-between items-center bg-[var(--code-bg)]">
            <h3 className="font-sans text-sm font-bold text-[var(--primary)] uppercase tracking-wide">Activity Types</h3>
            <Filter className="text-[var(--foreground)] opacity-70 w-5 h-5" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Item 1 (Active) */}
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] cursor-pointer border-l-4 border-l-[var(--primary)]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-sans text-sm font-bold text-[var(--primary)]">Le Texte Lacunaire</h4>
                <Eye className="text-[var(--primary)] w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] block"></span> Prod v2.4
                </span>
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-50">Mod: 2 hours ago by System</span>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] transition-colors cursor-pointer border-l-4 border-l-transparent">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-sans text-sm font-medium text-[var(--primary)]">Le Défi Phonétique</h4>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)] opacity-50 block"></span> Draft v1.0
                </span>
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-50">Mod: 1 day ago by Admin</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] transition-colors cursor-pointer border-l-4 border-l-transparent">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-sans text-sm font-medium text-[var(--primary)]">Vrai/Faux</h4>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] block"></span> Prod v3.1
                </span>
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-50">Mod: 1 week ago by System</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="p-4 border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] transition-colors cursor-pointer border-l-4 border-l-transparent opacity-75">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-sans text-sm font-medium text-[var(--primary)]">QCM Standard</h4>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span> Deprecated
                </span>
                <span className="font-sans text-[10px] text-[var(--foreground)] opacity-50">Mod: 1 year ago by Admin</span>
              </div>
            </div>
          </div>
        </section>

        {/* Center Pane: Data Schema */}
        <section className="flex-1 bg-[var(--background)] border border-[var(--border)] border-opacity-20 flex flex-col shadow-sm min-w-[300px]">
          <div className="p-3 border-b border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[var(--foreground)] opacity-70" />
              <h3 className="font-sans text-sm font-bold text-[var(--primary)]">Data Schema Definition</h3>
            </div>
            <div className="flex items-center gap-4 hidden lg:flex">
              <div className="flex bg-[var(--code-bg)] border border-[var(--primary)] border-opacity-20 p-0.5">
                <button 
                  onClick={() => setDataView('code')}
                  className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest ${dataView === 'code' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--foreground)] opacity-70 hover:bg-[var(--border)] hover:bg-opacity-20'}`}
                >
                  Code
                </button>
                <button 
                  onClick={() => setDataView('design')}
                  className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest ${dataView === 'design' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--foreground)] opacity-70 hover:bg-[var(--border)] hover:bg-opacity-20'}`}
                >
                  Design
                </button>
              </div>
              <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 bg-[var(--code-bg)] px-2 py-0.5 border border-[var(--primary)] border-opacity-20">
                JSON Schema Draft 7
              </span>
            </div>
            <div className="lg:hidden">
              <button 
                onClick={() => setDataView(dataView === 'code' ? 'design' : 'code')}
                className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest bg-[var(--primary)] text-[var(--background)]`}
              >
                {dataView === 'code' ? 'Show Design' : 'Show Code'}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {dataView === 'code' ? (
              <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
                <pre className="m-0"><code>{DATA_SCHEMA_JSON}</code></pre>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto bg-[var(--background)] space-y-4">
                <div className="border-b border-[var(--border)] border-opacity-20 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">baseText</span>
                    <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest">string</span>
                  </div>
                  <p className="font-sans text-xs text-[var(--foreground)] opacity-70">The full text with {"{{gap_id}}"} markers.</p>
                </div>
                <div className="border-b border-[var(--border)] border-opacity-20 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">gaps</span>
                    <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest">array&lt;object&gt;</span>
                  </div>
                  <div className="pl-4 mt-2 border-l-2 border-[var(--border)] border-opacity-20 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-sans text-xs font-medium">id</span>
                      <span className="text-[10px] text-[var(--foreground)] opacity-60">string</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs font-medium">correctAnswer</span>
                      <span className="text-[10px] text-[var(--foreground)] opacity-60">string</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs font-medium">distractors</span>
                      <span className="text-[10px] text-[var(--foreground)] opacity-60">array&lt;string&gt;</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Submission Schema */}
        <section className="flex-1 bg-[var(--background)] border border-[var(--border)] border-opacity-20 flex flex-col shadow-sm min-w-[300px]">
          <div className="p-3 border-b border-[var(--border)] border-opacity-20 bg-[var(--code-bg)] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-[var(--foreground)] opacity-70" />
              <h3 className="font-sans text-sm font-bold text-[var(--primary)]">Submission Schema Definition</h3>
            </div>
            <div className="flex items-center gap-4 hidden lg:flex">
              <div className="flex bg-[var(--code-bg)] border border-[var(--primary)] border-opacity-20 p-0.5">
                <button 
                  onClick={() => setSubView('code')}
                  className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest ${subView === 'code' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--foreground)] opacity-70 hover:bg-[var(--border)] hover:bg-opacity-20'}`}
                >
                  Code
                </button>
                <button 
                  onClick={() => setSubView('design')}
                  className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest ${subView === 'design' ? 'bg-[var(--primary)] text-[var(--background)]' : 'text-[var(--foreground)] opacity-70 hover:bg-[var(--border)] hover:bg-opacity-20'}`}
                >
                  Design
                </button>
              </div>
              <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 bg-[var(--code-bg)] px-2 py-0.5 border border-[var(--primary)] border-opacity-20">
                JSON Schema Draft 7
              </span>
            </div>
            <div className="lg:hidden">
              <button 
                onClick={() => setSubView(subView === 'code' ? 'design' : 'code')}
                className={`px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest bg-[var(--primary)] text-[var(--background)]`}
              >
                {subView === 'code' ? 'Show Design' : 'Show Code'}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {subView === 'code' ? (
              <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
                <pre className="m-0"><code>{SUBMISSION_SCHEMA_JSON}</code></pre>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto bg-[var(--background)] space-y-4">
                <div className="border-b border-[var(--border)] border-opacity-20 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">answers</span>
                    <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest">object</span>
                  </div>
                  <p className="font-sans text-xs text-[var(--foreground)] opacity-70">Key is gap ID, value is user's string answer.</p>
                </div>
                <div className="border-b border-[var(--border)] border-opacity-20 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm font-bold text-[var(--primary)]">timeTakenMs</span>
                    <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest">integer</span>
                  </div>
                  <p className="font-sans text-xs text-[var(--foreground)] opacity-70">Minimum: 0</p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
