import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastProps extends Toast {
  onClose: (id: string) => void
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-100',
  error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100',
  info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
  warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100',
}

const iconStyles = {
  success: 'text-emerald-600 dark:text-emerald-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
  warning: 'text-amber-600 dark:text-amber-400',
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm',
        'animate-in slide-in-from-right-full duration-300',
        styles[type]
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconStyles[type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {message && <p className="text-xs mt-1 opacity-90">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
