import { useState, useMemo, useCallback } from 'react'

export interface PaginationOptions {
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: number[]
}

export interface PaginationState {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface UsePaginationReturn<T> {
  // Data
  paginatedData: T[]
  // State
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  // Actions
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  nextPage: () => void
  prevPage: () => void
  goToFirst: () => void
  goToLast: () => void
  // Helpers
  canGoNext: boolean
  canGoPrev: boolean
  startIndex: number
  endIndex: number
  pageSizeOptions: number[]
}

export function usePagination<T>(
  data: T[],
  options: PaginationOptions = {}
): UsePaginationReturn<T> {
  const {
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100]
  } = options

  const [page, setPageState] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Ensure page is within bounds
  const validPage = useMemo(() => {
    if (page < 1) return 1
    if (page > totalPages && totalPages > 0) return totalPages
    return page
  }, [page, totalPages])

  // Calculate indices
  const startIndex = (validPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  // Get paginated data
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex)
  }, [data, startIndex, endIndex])

  // Actions
  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(1, Math.min(newPage, totalPages || 1)))
  }, [totalPages])

  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize)
    setPageState(1) // Reset to first page when changing page size
  }, [])

  const nextPage = useCallback(() => {
    setPage(validPage + 1)
  }, [validPage, setPage])

  const prevPage = useCallback(() => {
    setPage(validPage - 1)
  }, [validPage, setPage])

  const goToFirst = useCallback(() => {
    setPage(1)
  }, [setPage])

  const goToLast = useCallback(() => {
    setPage(totalPages)
  }, [totalPages, setPage])

  return {
    paginatedData,
    page: validPage,
    pageSize,
    totalItems,
    totalPages,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    canGoNext: validPage < totalPages,
    canGoPrev: validPage > 1,
    startIndex: startIndex + 1, // 1-indexed for display
    endIndex,
    pageSizeOptions
  }
}
