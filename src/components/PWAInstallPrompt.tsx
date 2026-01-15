import { useState } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePWA } from '@/hooks/usePWA'

export function PWAInstallPrompt() {
  const { isInstallable, installPWA } = usePWA()
  const [dismissed, setDismissed] = useState(false)

  if (!isInstallable || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="rounded-lg border border-primary bg-card p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Installer KaaroPay</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Installez l'application pour un accès rapide et hors ligne
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={installPWA}>
                  Installer
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDismissed(true)}
                >
                  Plus tard
                </Button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-full p-1 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
