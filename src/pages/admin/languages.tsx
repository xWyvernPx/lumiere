import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Eye } from 'lucide-react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const LANGUAGES_DATA = [
  { id: 'fr', code: 'FR', name: 'French', status: 'Active', engineering: 'Ready', modules: 142, lead: 'C. Dubois', ready: true },
  { id: 'es', code: 'ES', name: 'Spanish', status: 'Active', engineering: 'Ready', modules: 118, lead: 'M. Garcia', ready: true },
  { id: 'de', code: 'DE', name: 'German', status: 'Active', engineering: 'In-Progress', modules: 85, lead: 'K. Weber', ready: false },
  { id: 'ja', code: 'JA', name: 'Japanese', status: 'Inactive', engineering: 'Review Req.', modules: 42, lead: 'Y. Tanaka', ready: false, inactive: true },
  { id: 'it', code: 'IT', name: 'Italian', status: 'Active', engineering: 'Ready', modules: 96, lead: 'L. Rossi', ready: true },
];

export default function LanguagesPage() {
  const [languages, setLanguages] = useState(LANGUAGES_DATA);

  const toggleStatus = (id: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === id) {
        return { ...lang, status: lang.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return lang;
    }));
  };

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-10">
      {/* Daily Edition Header */}
      <div className="mb-10 border-y border-[var(--primary)] py-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="font-sans text-[12px] font-bold text-[var(--foreground)] opacity-70 uppercase tracking-widest mb-2">
            ÉDITION QUOTIDIENNE — {today}
          </p>
          <h2 className="font-serif text-3xl font-black text-[var(--primary)]">Language Master List</h2>
        </div>
        <div className="md:text-right">
          <p className="font-sans text-sm font-medium text-[var(--primary)]">Total Nodes: {languages.length}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <input 
            type="text"
            placeholder="Search languages..."
            className="w-full border-b border-[var(--primary)] bg-transparent py-2 pl-8 font-sans text-sm font-medium text-[var(--primary)] placeholder:opacity-50 focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <Search className="absolute left-0 top-2.5 text-[var(--foreground)] opacity-50 w-5 h-5" />
        </div>
        <button className="border border-[var(--primary)] text-[var(--primary)] font-sans text-sm font-bold px-6 py-2 hover:bg-[var(--code-bg)] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          Add Language Node
        </button>
      </div>

      {/* Ledger Table */}
      <Table>
        <TableHeader>
          <TableHead style={{ width: '25%' }}>Language Region</TableHead>
          <TableHead style={{ width: '16.66%' }}>Platform Status</TableHead>
          <TableHead style={{ width: '25%' }}>Prompt Engineering</TableHead>
          <TableHead style={{ width: '16.66%' }} className="text-right">Module Count</TableHead>
          <TableHead style={{ width: '16.66%' }}>Regional Lead</TableHead>
          <TableHead style={{ width: '48px' }}></TableHead>
        </TableHeader>
        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang.id} className={lang.inactive ? 'bg-[var(--background)]' : ''}>
              <TableCell>
                <div className={`flex items-center gap-3 ${lang.inactive ? 'opacity-60' : ''}`}>
                  <div className="w-8 h-8 bg-[var(--border)] bg-opacity-20 flex items-center justify-center font-serif text-sm font-bold text-[var(--primary)]">
                    {lang.code}
                  </div>
                  <span className={`font-serif text-xl font-bold text-[var(--primary)] ${lang.inactive ? 'line-through opacity-50' : ''}`}>
                    {lang.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center cursor-pointer group" onClick={() => toggleStatus(lang.id)}>
                  <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                    <div className={`block w-8 h-4 rounded-full transition-colors border border-[var(--primary)] ${lang.status === 'Active' ? 'bg-[var(--primary)]' : 'bg-[var(--code-bg)]'}`}></div>
                    <div className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full transition-transform bg-[var(--background)] border border-[var(--border)] border-opacity-20 ${lang.status === 'Active' ? 'transform translate-x-4 border-none' : ''}`}></div>
                  </div>
                  <span className={`ml-2 font-sans text-[12px] font-bold ${lang.status === 'Active' ? 'text-[var(--primary)]' : 'text-[var(--foreground)] opacity-50'}`}>
                    {lang.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 font-sans text-[12px] font-bold uppercase ${lang.ready ? 'bg-[var(--background)] border border-[var(--border)] border-opacity-20 text-[var(--primary)]' : lang.inactive ? 'bg-[var(--border)] bg-opacity-20 border border-[var(--primary)] text-[var(--primary)]' : 'bg-[var(--code-bg)] border border-[var(--border)] border-opacity-20 border-dashed text-[var(--foreground)] opacity-80'}`}>
                  {lang.inactive ? (
                    <Eye className="w-3 h-3 mr-1" />
                  ) : (
                    <span className={`w-2 h-2 rounded-full mr-2 ${lang.ready ? 'bg-[var(--primary)]' : 'border border-[var(--primary)]'}`}></span>
                  )}
                  {lang.engineering}
                </span>
              </TableCell>
              <TableCell className={`text-right font-sans font-bold ${lang.inactive ? 'opacity-50' : ''}`}>
                {lang.modules}
              </TableCell>
              <TableCell className="text-[var(--foreground)] opacity-80">
                {lang.lead}
              </TableCell>
              <TableCell className="text-right">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--foreground)] opacity-50 hover:opacity-100 hover:text-[var(--primary)]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center text-[var(--foreground)] opacity-70 font-sans text-[12px] font-bold">
        <span>Showing 1-{languages.length} of {languages.length} entries</span>
        <div className="flex gap-4">
          <button className="hover:text-[var(--primary)] hover:underline transition-all">Prev</button>
          <button className="text-[var(--primary)] border-b border-[var(--primary)]">1</button>
          <button className="hover:text-[var(--primary)] hover:underline transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}
