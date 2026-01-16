import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './Button'

interface PaginationProps {
  page: number
  totalPages: number
  totalItems: number
  startIndex: number
  endIndex: number
  pageSize: number
  pageSizeOptions: number[]
  canGoNext: boolean
  canGoPrev: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onNext: () => void
  onPrev: () => void
  onFirst: () => void
  onLast: () => void
  showPageSizeSelector?: boolean
  showPageNumbers?: boolean
  maxPageButtons?: number
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  pageSize,
  pageSizeOptions,
  canGoNext,
  canGoPrev,
  onPageChange,
  onPageSizeChange,
  onNext,
  onPrev,
  onFirst,
  onLast,
  showPageSizeSelector = true,
  showPageNumbers = true,
  maxPageButtons = 5
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const halfMax = Math.floor(maxPageButtons / 2)
      let startPage = Math.max(1, page - halfMax)
      let endPage = Math.min(totalPages, page + halfMax)

      if (page <= halfMax) {
        endPage = maxPageButtons - 1
      } else if (page >= totalPages - halfMax) {
        startPage = totalPages - maxPageButtons + 2
      }

      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) pages.push('ellipsis')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalItems === 0) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border/40">
      {/* Info */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Affichage de {startIndex} à {endIndex} sur {totalItems} résultats
        </p>
        
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Par page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 px-2 rounded-lg border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onFirst}
          disabled={!canGoPrev}
          className="h-8 w-8"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          disabled={!canGoPrev}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {showPageNumbers && (
          <div className="flex items-center gap-1 mx-2">
            {getPageNumbers().map((pageNum, idx) => (
              pageNum === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`h-8 min-w-8 px-2 rounded-lg text-sm font-medium transition-all ${
                    page === pageNum
                      ? 'bg-primary text-white'
                      : 'hover:bg-accent text-muted-foreground'
                  }`}
                >
                  {pageNum}
                </button>
              )
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!canGoNext}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onLast}
          disabled={!canGoNext}
          className="h-8 w-8"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
