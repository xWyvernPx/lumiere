import React from 'react';
import { Filter, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';

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
          <Button variant="outline" className="gap-2">
            <Filter className="w-[18px] h-[18px]" />
            Filter View
          </Button>
          <Button variant="primary" className="gap-2">
            <Download className="w-[18px] h-[18px]" />
            Export CSV
          </Button>
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
            <div className="w-32">
              <Select defaultValue="all-roles">
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-36">
              <Select defaultValue="all-statuses">
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  <Badge variant="outline">Teacher</Badge>
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
                <td className="py-3 px-5 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 text-[var(--primary)]">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 opacity-60 hover:opacity-100">
                    Impersonate
                  </Button>
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
                  <Badge variant="outline">Student</Badge>
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
                <td className="py-3 px-5 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 text-[var(--primary)]">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 opacity-60 hover:opacity-100">
                    Impersonate
                  </Button>
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
                  <Badge variant="solid">Admin</Badge>
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
                <td className="py-3 px-5 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 text-[var(--primary)]">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 opacity-30 cursor-not-allowed" disabled>
                    Impersonate
                  </Button>
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
                  <Badge variant="outline">Independent</Badge>
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
                <td className="py-3 px-5 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 text-[var(--primary)]">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs uppercase tracking-widest px-2 opacity-60 hover:opacity-100">
                    Impersonate
                  </Button>
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
            <Button variant="outline" size="sm" disabled>
              ← Prev
            </Button>
            <Button variant="primary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2 py-1 text-[var(--foreground)] opacity-60">...</span>
            <Button variant="outline" size="sm">
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
