import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode } from 'react'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={`w-full caption-bottom text-sm border-collapse rounded-none ${className || ''}`}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`border-b border-border bg-foreground/5 [&_tr]:border-b rounded-none ${className || ''}`} {...props} />
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`[&_tr:last-child]:border-0 rounded-none ${className || ''}`} {...props} />
}

export function TableFooter({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={`border-t border-border bg-foreground/5 font-medium [&>tr]:last:border-b-0 rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b border-border transition-colors hover:bg-foreground/[0.02] data-[state=selected]:bg-foreground/5 rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`h-10 px-3 text-left align-middle font-semibold text-foreground/80 [&:has([role=checkbox])]:pr-0 [&:has([role=checkbox])]:pl-3 rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`p-3 align-middle [&:has([role=checkbox])]:pr-0 [&:has([role=checkbox])]:pl-3 rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={`mt-4 text-xs text-foreground/60 ${className || ''}`}
      {...props}
    />
  )
}

export interface ColumnDef<TData> {
  header: string
  accessorKey: keyof TData | string
  cell?: (value: unknown, row: TData) => ReactNode
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  className?: string
}

export function DataTable<TData>({ columns, data, className }: DataTableProps<TData>) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = (row as Record<string, unknown>)[column.accessorKey as string]
                return (
                  <TableCell key={colIndex}>
                    {column.cell ? column.cell(value, row) : String(value ?? '')}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
