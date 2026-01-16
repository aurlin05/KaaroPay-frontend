import { useState, useMemo, useCallback } from 'react'

export interface FilterConfig<T> {
  key: keyof T | 'search'
  type: 'text' | 'select' | 'multiselect' | 'date' | 'dateRange' | 'number' | 'numberRange'
  label: string
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface FilterValue {
  [key: string]: string | string[] | number | [Date | null, Date | null] | [number | null, number | null] | null
}

export interface UseAdvancedFilterReturn<T> {
  filteredData: T[]
  filters: FilterValue
  setFilter: (key: string, value: FilterValue[string]) => void
  clearFilter: (key: string) => void
  clearAllFilters: () => void
  hasActiveFilters: boolean
  activeFilterCount: number
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj as unknown)
}

export function useAdvancedFilter<T>(
  data: T[],
  configs: FilterConfig<T>[],
  searchKeys?: (keyof T)[]
): UseAdvancedFilterReturn<T> {
  const [filters, setFilters] = useState<FilterValue>({})

  const setFilter = useCallback((key: string, value: FilterValue[string]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  const clearFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({})
  }, [])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Check each filter
      for (const config of configs) {
        const filterValue = filters[config.key as string]
        if (filterValue === undefined || filterValue === null || filterValue === '') continue

        const itemValue = getNestedValue(item, config.key as string)

        switch (config.type) {
          case 'text': {
            // Global search across multiple keys
            if (config.key === 'search' && searchKeys) {
              const searchTerm = (filterValue as string).toLowerCase()
              const matches = searchKeys.some(key => {
                const val = getNestedValue(item, key as string)
                return val && String(val).toLowerCase().includes(searchTerm)
              })
              if (!matches) return false
            } else {
              // Single field text search
              if (!itemValue || !String(itemValue).toLowerCase().includes((filterValue as string).toLowerCase())) {
                return false
              }
            }
            break
          }

          case 'select': {
            if (filterValue !== 'all' && itemValue !== filterValue) {
              return false
            }
            break
          }

          case 'multiselect': {
            const selectedValues = filterValue as string[]
            if (selectedValues.length > 0 && !selectedValues.includes(String(itemValue))) {
              return false
            }
            break
          }

          case 'date': {
            const filterDate = new Date(filterValue as string)
            const itemDate = itemValue instanceof Date ? itemValue : new Date(itemValue as string)
            if (filterDate.toDateString() !== itemDate.toDateString()) {
              return false
            }
            break
          }

          case 'dateRange': {
            const [startDate, endDate] = filterValue as [Date | null, Date | null]
            const itemDate = itemValue instanceof Date ? itemValue : new Date(itemValue as string)
            if (startDate && itemDate < startDate) return false
            if (endDate && itemDate > endDate) return false
            break
          }

          case 'number': {
            if (Number(itemValue) !== Number(filterValue)) {
              return false
            }
            break
          }

          case 'numberRange': {
            const [min, max] = filterValue as [number | null, number | null]
            const numValue = Number(itemValue)
            if (min !== null && numValue < min) return false
            if (max !== null && numValue > max) return false
            break
          }
        }
      }

      return true
    })
  }, [data, filters, configs, searchKeys])

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(v => {
      if (v === null || v === undefined || v === '' || v === 'all') return false
      if (Array.isArray(v) && v.length === 0) return false
      if (Array.isArray(v) && v.every(item => item === null)) return false
      return true
    }).length
  }, [filters])

  return {
    filteredData,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters: activeFilterCount > 0,
    activeFilterCount
  }
}
