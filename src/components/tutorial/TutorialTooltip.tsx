import { ReactNode, useEffect, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface TutorialTooltipProps {
  children: ReactNode
  content: string
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  show: boolean
  onNext?: () => void
  onSkip?: () => void
  step?: number
  totalSteps?: number
}

export function TutorialTooltip({
  children,
  content,
  title,
  position = 'bottom',
  show,
  onNext,
  onSkip,
  step,
  totalSteps,
}: TutorialTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setTimeout(() => setIsVisible(true), 100)
    } else {
      setIsVisible(false)
    }
  }, [show])

  if (!show) return <>{children}</>

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  }

  return (
    <div className="relative inline-block">
      {/* Highlight overlay */}
      {isVisible && (
        <div className="absolute inset-0 rounded-xl ring-4 ring-primary ring-offset-2 ring-offset-background animate-pulse pointer-events-none z-40" />
      )}
      
      {children}

      {/* Tooltip */}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 w-80 p-4 rounded-xl bg-gradient-to-br from-primary to-primary/90 text-white shadow-2xl',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            positionClasses[position]
          )}
        >
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-8 border-primary',
              arrowClasses[position]
            )}
          />

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
                <p className="text-xs leading-relaxed opacity-95">{content}</p>
              </div>
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              {step && totalSteps && (
                <span className="text-xs opacity-75">
                  {step}/{totalSteps}
                </span>
              )}
              {onNext && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onNext}
                  className="ml-auto bg-white text-primary hover:bg-white/90"
                >
                  Suivant
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
