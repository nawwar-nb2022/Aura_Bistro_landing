"use client"

import { useId, type ReactNode } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

type ContentTableColumn<T> = {
  key: string
  header: ReactNode
  cell: (record: T) => ReactNode
  className?: string
}

type ContentTableProps<T> = {
  columns: readonly ContentTableColumn<T>[]
  records: readonly T[]
  getRowKey: (record: T) => string
  search: string
  onSearchChange: (value: string) => void
  searchLabel?: string
  searchPlaceholder?: string
  filters?: ReactNode
  actions?: ReactNode
  hasActiveQuery: boolean
  onClearSearch: () => void
  noResultsMessage: string
  isLoading?: boolean
  pagination: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
}

function ContentTable<T>({
  columns,
  records,
  getRowKey,
  search,
  onSearchChange,
  searchLabel = "Search records",
  searchPlaceholder = "Search...",
  filters,
  actions,
  hasActiveQuery,
  onClearSearch,
  noResultsMessage,
  isLoading = false,
  pagination,
}: ContentTableProps<T>) {
  const searchInputId = useId()
  const showNoResults = !isLoading && hasActiveQuery && records.length === 0

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <label htmlFor={searchInputId} className="sr-only">
              {searchLabel}
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={searchInputId}
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
          {filters}
        </div>
        {actions && <div className="sm:ml-auto">{actions}</div>}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Table aria-busy={isLoading}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }, (_, rowIndex) => (
                  <TableRow key={`loading-${rowIndex}`} aria-hidden="true">
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        <Skeleton className="h-4 w-3/4" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : records.map((record) => (
                  <TableRow key={getRowKey(record)}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(column.className)}
                      >
                        {column.cell(record)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            {showNoResults && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <p>{noResultsMessage}</p>
                  <Button
                    type="button"
                    variant="link"
                    className="mt-1 h-auto p-0"
                    onClick={onClearSearch}
                  >
                    Clear Search
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <nav
        aria-label="Content table pagination"
        className="flex items-center justify-between gap-4"
      >
        <p className="text-sm text-muted-foreground">
          Page {pagination.currentPage} of {pagination.totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pagination.currentPage <= 1 || isLoading}
            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={
              pagination.currentPage >= pagination.totalPages || isLoading
            }
            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
    </section>
  )
}

export { ContentTable }
export type { ContentTableColumn, ContentTableProps }
