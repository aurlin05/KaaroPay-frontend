import { useState } from 'react'
import { X, Filter, ChevronDown, Calendar } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { FilterConfig, FilterValue } from '@/hooks/useAdvancedFilter'

interface AdvancedFiltersProps<T> {
  configs: FilterConfig<T>[]
  filters: FilterValue
  onFilterChange: (key: string, value: FilterValue[string]) => void
  onClearFilter: (key: string) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  activeFilterCount: number
}

export function AdvancedFilters<T>({
  configs,
  filters,
  onFilterChange,
  onClearFilter,
  onClearAll,
  hasActiveFilters,
  activeFilterCount
}: AdvancedFiltersProps<T>) {
  const [showFilters, setShowFilters] = useState(false)

  const renderFilter = (config: FilterConfig<T>) => {
    const value = filters[config.key as string]

    switch (config.type) {
      case 'select':
        return (
          <div key={config.key as string} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">{config.label}</label>
            <div className="relative">
              <select
                value={(value as string) || 'all'}
                onChange={(e) => onFilterChange(config.key as string, e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded-xl border border-border/60 bg-background text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              >
                <option value="all">Tous</option>
                {config.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )

      case 'multiselect':
        return (
          <div key={config.key as string} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">{config.label}</label>
            <div className="flex flex-wrap gap-1.5">
              {config.options?.map(opt => {
                const selected = (value as string[] || []).includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      const current = (value as string[]) || []
                      const newValue = selected
                        ? current.filter(v => v !== opt.value)
                        : [...current, opt.value]
                      onFilterChange(config.key as string, newValue)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? 'bg-primary text-white'
                        : 'bg-accent hover:bg-accent/80 text-muted-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 'dateRange':
        const dateValue = (value as [Date | null, Date | null]) || [null, null]
        return (
          <div key={config.key as string} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">{config.label}</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="date"
                  value={dateValue[0] ? dateValue[0].toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newStart = e.target.value ? new Date(e.target.value) : null
                    onFilterChange(config.key as string, [newStart, dateValue[1]])
                  }}
                  className="pl-9"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <span className="flex items-center text-muted-foreground">à</span>
              <div className="relative flex-1">
                <Input
                  type="date"
                  value={dateValue[1] ? dateValue[1].toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newEnd = e.target.value ? new Date(e.target.value) : null
                    onFilterChange(config.key as string, [dateValue[0], newEnd])
                  }}
                  className="pl-9"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )

      case 'numberRange':
        const numValue = (value as [number | null, number | null]) || [null, null]
        return (
          <div key={config.key as string} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">{config.label}</label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={numValue[0] ?? ''}
                onChange={(e) => {
                  const newMin = e.target.value ? Number(e.target.value) : null
                  onFilterChange(config.key as string, [newMin, numValue[1]])
                }}
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={numValue[1] ?? ''}
                onChange={(e) => {
                  const newMax = e.target.value ? Number(e.target.value) : null
                  onFilterChange(config.key as string, [numValue[0], newMax])
                }}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Separate search from other filters
  const searchConfig = configs.find(c => c.key === 'search')
  const otherConfigs = configs.filter(c => c.key !== 'search')

  return (
    <div className="space-y-4">
      {/* Search + Toggle */}
      <div className="flex gap-3">
        {searchConfig && (
          <div className="flex-1">
            <Input
              placeholder={searchConfig.placeholder || 'Rechercher...'}
              value={(filters.search as string) || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              icon={<Filter className="h-4 w-4" />}
            />
          </div>
        )}
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={hasActiveFilters ? 'border-primary text-primary' : ''}
        >
          <Filter className="h-4 w-4" />
          Filtres
          {activeFilterCount > 0 && (
            <span className="ml-1.5 h-5 min-w-5 px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearAll} className="text-muted-foreground">
            <X className="h-4 w-4" />
            Effacer
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && otherConfigs.length > 0 && (
        <div className="p-4 rounded-xl border border-border/60 bg-accent/30 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherConfigs.map(config => renderFilter(config))}
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || value === 'all' || (Array.isArray(value) && value.length === 0)) return null
            
            const config = configs.find(c => c.key === key)
            if (!config || key === 'search') return null

            let displayValue = ''
            if (config.type === 'select') {
              displayValue = config.options?.find(o => o.value === value)?.label || String(value)
            } else if (config.type === 'multiselect') {
              displayValue = (value as string[]).map(v => 
                config.options?.find(o => o.value === v)?.label || v
              ).join(', ')
            } else if (config.type === 'dateRange') {
              const [start, end] = value as [Date | null, Date | null]
              displayValue = `${start?.toLocaleDateString('fr-FR') || '...'} - ${end?.toLocaleDateString('fr-FR') || '...'}`
            } else if (config.type === 'numberRange') {
              const [min, max] = value as [number | null, number | null]
              displayValue = `${min ?? '...'} - ${max ?? '...'}`
            }

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                <span className="font-medium">{config.label}:</span>
                <span>{displayValue}</span>
                <button
                  onClick={() => onClearFilter(key)}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
