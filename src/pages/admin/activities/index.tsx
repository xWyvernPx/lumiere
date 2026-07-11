import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const ACTIVITY_TYPES = [
  {
    id: '1',
    name: 'Le Texte Lacunaire',
    type: 'Gap-Fill / Cloze',
    version: 'v2.1.0',
    dataSchema: `{
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "description": "Full text with placeholders denoted by {{n}}"
    },
    "blanks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "correct_answer": { "type": "string" },
          "distractors": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["id", "correct_answer"]
      }
    }
  },
  "required": ["text", "blanks"]
}`,
    responseSchema: `{
  "type": "object",
  "properties": {
    "user_answers": {
      "type": "object",
      "additionalProperties": {
        "type": "string",
        "description": "Key is blank id, value is user input"
      }
    },
    "time_spent_ms": {
      "type": "integer"
    }
  },
  "required": ["user_answers"]
}`
  },
  {
    id: '2',
    name: 'Visual Matcher',
    type: 'Image-Text Association',
    version: 'v1.0.5',
    dataSchema: `{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "image_url": { "type": "string", "format": "uri" },
          "target_text": { "type": "string" }
        },
        "required": ["id", "image_url", "target_text"]
      }
    }
  },
  "required": ["items"]
}`,
    responseSchema: `{
  "type": "object",
  "properties": {
    "matches": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
           "item_id": {"type": "string"},
           "selected_text": {"type": "string"}
        }
      }
    }
  }
}`
  }
];

export default function AdminActivitiesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col">
      {/* Header Section */}
      <div className="border-b border-[var(--primary)] pb-4 mb-10 flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[var(--primary)] mb-2">Activity Type Registry</h2>
          <p className="font-sans text-sm italic text-[var(--foreground)] opacity-70">
            Technical definitions and schema specifications for platform learning activities.
          </p>
        </div>
        <Link 
          to="/admin/activities/edit"
          className="bg-[var(--primary)] text-[var(--background)] font-sans text-sm font-bold px-4 py-2 hover:bg-[var(--accent)] transition-colors border border-[var(--primary)] flex items-center"
        >
          <Plus className="mr-2 w-5 h-5" />
          New Activity Type
        </Link>
      </div>

      {/* Registry List */}
      <div className="space-y-6">
        {ACTIVITY_TYPES.map((activity) => {
          const isExpanded = expandedId === activity.id;
          return (
            <article key={activity.id} className="bg-[var(--background)] border border-[var(--primary)] overflow-hidden">
              <header 
                className={`border-t-4 ${isExpanded ? 'border-[var(--primary)]' : 'border-[var(--border)] border-opacity-20 hover:border-[var(--primary)]'} p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--code-bg)] transition-colors`}
                onClick={() => setExpandedId(isExpanded ? null : activity.id)}
              >
                <div>
                  <h3 className="font-sans text-lg font-bold text-[var(--primary)]">{activity.name}</h3>
                  <span className="font-sans text-[10px] font-bold text-[var(--foreground)] opacity-70 uppercase mt-1 inline-block tracking-widest">
                    Type: {activity.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-sans text-xs font-bold text-[var(--foreground)] opacity-70 bg-[var(--code-bg)] px-2 py-1 border border-[var(--primary)] border-opacity-20">
                    {activity.version}
                  </span>
                  {isExpanded ? <ChevronUp className="w-6 h-6 text-[var(--primary)]" /> : <ChevronDown className="w-6 h-6 text-[var(--primary)]" />}
                </div>
              </header>
              
              {isExpanded && (
                <div className="border-t border-[var(--primary)] p-4 bg-[var(--code-bg)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Data Format Schema */}
                    <div>
                      <h4 className="font-sans text-[10px] font-bold text-[var(--primary)] uppercase mb-2 border-b border-[var(--primary)] border-opacity-20 pb-1 tracking-widest">
                        dataFormat Schema
                      </h4>
                      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs overflow-x-auto border border-[var(--primary)] h-64 overflow-y-auto">
                        <pre className="m-0"><code>{activity.dataSchema}</code></pre>
                      </div>
                      <div className="mt-2 text-right">
                        <Link to="/admin/activities/edit" className="text-[var(--primary)] font-sans text-[10px] font-bold uppercase tracking-widest hover:underline">
                          Edit Schema
                        </Link>
                      </div>
                    </div>
                    {/* Response Format Schema */}
                    <div>
                      <h4 className="font-sans text-[10px] font-bold text-[var(--primary)] uppercase mb-2 border-b border-[var(--primary)] border-opacity-20 pb-1 tracking-widest">
                        responseFormat Schema
                      </h4>
                      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs overflow-x-auto border border-[var(--primary)] h-64 overflow-y-auto">
                        <pre className="m-0"><code>{activity.responseSchema}</code></pre>
                      </div>
                      <div className="mt-2 text-right">
                        <Link to="/admin/activities/edit" className="text-[var(--primary)] font-sans text-[10px] font-bold uppercase tracking-widest hover:underline">
                          Edit Schema
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
