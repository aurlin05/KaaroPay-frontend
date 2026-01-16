import { useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { changeLanguage, availableLanguages, getCurrentLanguage } from '@/lib/i18n'

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons'
  showLabel?: boolean
}

export function LanguageSelector({ variant = 'dropdown', showLabel = true }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = getCurrentLanguage()

  const handleChange = (langCode: string) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  if (variant === 'buttons') {
    return (
      <div className="flex gap-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              currentLang === lang.code
                ? 'bg-primary text-white'
                : 'bg-accent hover:bg-accent/80 text-muted-foreground'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    )
  }

  const currentLanguage = availableLanguages.find(l => l.code === currentLang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 hover:bg-accent transition-colors"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        {showLabel && (
          <>
            <span className="text-sm">{currentLanguage?.flag} {currentLanguage?.name}</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border/60 bg-background shadow-lg z-50 overflow-hidden">
            <div className="p-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentLang === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLang === lang.code && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
