import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-white border-4 border-b-0 border-[var(--primary)] ${className}`}>
      <table className="w-full text-left border-collapse">
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <thead>
      <tr className={`border-b border-[var(--primary)] bg-[var(--code-bg)] ${className}`}>
        {children}
      </tr>
    </thead>
  );
};

export const TableHead = ({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  return (
    <th style={style} className={`py-4 px-6 font-sans text-[10px] font-bold tracking-[0.08em] text-[var(--foreground)] opacity-70 uppercase ${className}`}>
      {children}
    </th>
  );
};

export const TableBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <tbody className={`font-sans text-sm font-medium ${className}`}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <tr 
      onClick={onClick}
      className={`border-b border-[var(--border)] border-opacity-20 hover:bg-[var(--code-bg)] transition-colors group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <td className={`py-4 px-6 ${className}`}>
      {children}
    </td>
  );
};
