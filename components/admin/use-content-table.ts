"use client"

import { useEffect, useMemo, useState } from "react"

const SEARCH_DEBOUNCE_MS = 5_000
const DEFAULT_PAGE_SIZE = 10

type ContentFilters = Readonly<Record<string, string>>

type UseContentTableOptions<T> = {
  records: readonly T[]
  getSearchText: (record: T) => string
  matchesFilters?: (record: T, filters: ContentFilters) => boolean
}

function useContentTable<T>({
  records,
  getSearchText,
  matchesFilters,
}: UseContentTableOptions<T>) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [requestedPage, setRequestedPage] = useState(1)

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setDebouncedSearch(search),
      SEARCH_DEBOUNCE_MS,
    )

    return () => window.clearTimeout(timeoutId)
  }, [search])

  const activeSearch = debouncedSearch.trim().toLowerCase()
  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesSearch =
          activeSearch.length === 0 ||
          getSearchText(record).toLowerCase().includes(activeSearch)
        const matchesActiveFilters = matchesFilters
          ? matchesFilters(record, filters)
          : true

        return matchesSearch && matchesActiveFilters
      }),
    [activeSearch, filters, getSearchText, matchesFilters, records],
  )

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / DEFAULT_PAGE_SIZE),
  )
  const currentPage = Math.min(requestedPage, totalPages)
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * DEFAULT_PAGE_SIZE
    return filteredRecords.slice(start, start + DEFAULT_PAGE_SIZE)
  }, [currentPage, filteredRecords])
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")
  const hasActiveQuery = activeSearch.length > 0 || hasActiveFilters

  function updateSearch(value: string) {
    setSearch(value)
    setRequestedPage(1)
  }

  function setFilter(name: string, value: string) {
    setFilters((currentFilters) => {
      if (value === "") {
        const remainingFilters = { ...currentFilters }
        delete remainingFilters[name]
        return remainingFilters
      }

      return { ...currentFilters, [name]: value }
    })
    setRequestedPage(1)
  }

  function clearSearch() {
    setSearch("")
    setDebouncedSearch("")
    setFilters({})
    setRequestedPage(1)
  }

  function setCurrentPage(page: number) {
    setRequestedPage(Math.min(Math.max(1, page), totalPages))
  }

  return {
    search,
    debouncedSearch,
    filters,
    hasActiveFilters,
    hasActiveQuery,
    records: filteredRecords,
    pageRecords,
    currentPage,
    totalPages,
    setSearch: updateSearch,
    setFilter,
    clearSearch,
    setCurrentPage,
  }
}

export { useContentTable }
export type { ContentFilters, UseContentTableOptions }
