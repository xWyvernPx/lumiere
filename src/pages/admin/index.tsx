import React from 'react';
import { Filter, Download } from 'lucide-react';

export default function AdminUserManagement() {
  return (
    <div className="max-w-[1024px] mx-auto">
      {/* Page Header */}
      <div className="mb-10 flex justify-between items-end border-b-4 border-[var(--primary)] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-[var(--primary)]">Global Directory</h1>
          <p className="font-serif italic text-sm text-[var(--foreground)] opacity-80 mt-2">
            Comprehensive overview of institutional and individual accounts.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="border border-[var(--primary)] bg-[var(--background)] px-4 py-2 font-sans font-bold text-sm text-[var(--primary)] hover:bg-[var(--code-bg)] transition-colors flex items-center gap-2 cursor-pointer">
            <Filter className="w-[18px] h-[18px]" />
            Filter View
          </button>
          <button className="bg-[var(--primary)] text-[var(--background)] px-4 py-2 font-sans font-bold text-sm hover:bg-opacity-90 transition-colors flex items-center gap-2 cursor-pointer">
            <Download className="w-[18px] h-[18px]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* High-Density Data Table */}
      <div className="bg-[var(--background)] border border-[var(--border)] border-opacity-20 shadow-sm">
        {/* Table Toolbar */}
        <div className="px-5 py-4 border-b border-[var(--border)] border-opacity-20 flex justify-between items-center bg-[var(--background)]">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="font-bold">12,408</span>{" "}
            <span className="text-[var(--foreground)] opacity-60">Total Records</span>
          </div>
          <div className="flex gap-4">
            <select className="border border-[var(--border)] border-opacity-20 bg-[var(--background)] text-sm font-medium py-1 pl-3 pr-8 focus:ring-0 focus:border-[var(--primary)] outline-none cursor-pointer">
              <option>All Roles</option>
              <option>Student</option>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
            <select className="border border-[var(--border)] border-opacity-20 bg-[var(--background)] text-sm font-medium py-1 pl-3 pr-8 focus:ring-0 focus:border-[var(--primary)] outline-none cursor-pointer">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] border-opacity-20 bg-[var(--code-bg)]">
                <th className="py-3 px-5 font-sans text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider w-1/4">
                  Name / Contact
                </th>
                <th className="py-3 px-5 font-sans text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="py-3 px-5 font-sans text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider w-1/6">
                  Status
                </th>
                <th className="py-3 px-5 font-sans text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider w-1/4">
                  Organization
                </th>
                <th className="py-3 px-5 font-sans text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider text-right w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm font-medium divide-y divide-[var(--border)] divide-opacity-20">
              {/* Row 1 */}
              <tr className="hover:bg-[var(--code-bg)] transition-colors group">
                <td className="py-3 px-5">
                  <div className="font-bold text-[var(--primary)]">Eleanor Vance</div>
                  <div className="text-xs font-bold text-[var(--foreground)] opacity-60 mt-1">
                    e.vance@sorbonne.fr
                  </div>
                </td>
                <td className="py-3 px-5">
                  <span className="inline-block px-2 py-0.5 border border-[var(--border)] border-opacity-20 text-xs font-bold bg-[var(--code-bg)]">
                    Teacher
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Active
                  </span>
                </td>
                <td className="py-3 px-5 text-[var(--foreground)] opacity-80">
                  Université Paris-Sorbonne
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="text-[var(--primary)] hover:underline font-sans text-xs font-bold uppercase tracking-widest mr-3 cursor-pointer">
                    View
                  </button>
                  <button className="text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 font-sans text-xs font-bold uppercase tracking-widest cursor-pointer">
                    Impersonate
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-[var(--code-bg)] transition-colors group">
                <td className="py-3 px-5">
                  <div className="font-bold text-[var(--primary)]">Julian Sorel</div>
                  <div className="text-xs font-bold text-[var(--foreground)] opacity-60 mt-1">
                    j.sorel@etu.univ-lyon.fr
                  </div>
                </td>
                <td className="py-3 px-5">
                  <span className="inline-block px-2 py-0.5 border border-[var(--border)] border-opacity-20 text-xs font-bold bg-[var(--code-bg)]">
                    Student
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="flex items-center gap-1.5 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Suspended
                  </span>
                </td>
                <td className="py-3 px-5 text-[var(--foreground)] opacity-80">
                  Université de Lyon
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="text-[var(--primary)] hover:underline font-sans text-xs font-bold uppercase tracking-widest mr-3 cursor-pointer">
                    View
                  </button>
                  <button className="text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 font-sans text-xs font-bold uppercase tracking-widest cursor-pointer">
                    Impersonate
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-[var(--code-bg)] transition-colors group">
                <td className="py-3 px-5">
                  <div className="font-bold text-[var(--primary)]">Dr. Aris Thorne</div>
                  <div className="text-xs font-bold text-[var(--foreground)] opacity-60 mt-1">
                    admin@lumiere.edu
                  </div>
                </td>
                <td className="py-3 px-5">
                  <span className="inline-block px-2 py-0.5 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] text-xs font-bold">
                    Admin
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Active
                  </span>
                </td>
                <td className="py-3 px-5 text-[var(--foreground)] opacity-80">
                  Lumière Institute (Global)
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="text-[var(--primary)] hover:underline font-sans text-xs font-bold uppercase tracking-widest mr-3 cursor-pointer">
                    View
                  </button>
                  <span className="text-[var(--foreground)] opacity-30 font-sans text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                    Impersonate
                  </span>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-[var(--code-bg)] transition-colors group">
                <td className="py-3 px-5">
                  <div className="font-bold text-[var(--primary)]">Camille Desmoulins</div>
                  <div className="text-xs font-bold text-[var(--foreground)] opacity-60 mt-1">
                    camille.d@gmail.com
                  </div>
                </td>
                <td className="py-3 px-5">
                  <span className="inline-block px-2 py-0.5 border border-[var(--border)] border-opacity-20 text-xs font-bold bg-[var(--code-bg)]">
                    Independent
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="flex items-center gap-1.5 text-[var(--foreground)] opacity-60">
                    <span className="w-2 h-2 rounded-full border border-[var(--foreground)] opacity-60"></span>
                    Pending
                  </span>
                </td>
                <td className="py-3 px-5 text-[var(--foreground)] opacity-80">
                  Unaffiliated
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="text-[var(--primary)] hover:underline font-sans text-xs font-bold uppercase tracking-widest mr-3 cursor-pointer">
                    View
                  </button>
                  <button className="text-[var(--foreground)] opacity-60 hover:text-[var(--primary)] hover:opacity-100 font-sans text-xs font-bold uppercase tracking-widest cursor-pointer">
                    Impersonate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-[var(--border)] border-opacity-20 flex justify-between items-center bg-[var(--background)]">
          <span className="font-sans text-xs font-bold text-[var(--foreground)] opacity-60">
            Showing 1 to 4 of 12,408 entries
          </span>
          <div className="flex gap-1 text-sm font-medium">
            <button className="px-3 py-1 border border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] disabled:opacity-50 cursor-pointer" disabled>
              ← Prev
            </button>
            <button className="px-3 py-1 border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] cursor-pointer">
              1
            </button>
            <button className="px-3 py-1 border border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] cursor-pointer">
              2
            </button>
            <button className="px-3 py-1 border border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] cursor-pointer">
              3
            </button>
            <span className="px-2 py-1 text-[var(--foreground)] opacity-60">...</span>
            <button className="px-3 py-1 border border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] cursor-pointer">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
