import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { 
  Wallet, 
  Send, 
  BarChart3, 
  Bell, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const steps = [
  {
    icon: Sparkles,
    title: 'Bienvenue sur KaaroPay',
    description: 'Votre orchestrateur de paiements interopérables PI-SPI',
    content: 'Gérez tous vos comptes mobile money et bancaires depuis une seule plateforme. Effectuez des paiements instantanés vers n\'importe quel opérateur.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Wallet,
    title: 'Connectez vos comptes',
    description: 'Wave, Orange Money, banques et plus',
    content: 'Ajoutez tous vos comptes de paiement pour avoir une vue unifiée de votre trésorerie. Passez facilement d\'un compte à l\'autre lors de vos transactions.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Send,
    title: 'Paiements instantanés',
    description: 'Interopérabilité totale avec PI-SPI',
    content: 'Envoyez de l\'argent par téléphone, alias ou IBAN. Les transferts sont instantanés et fonctionnent entre tous les opérateurs compatibles PI-SPI.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Prévisions et insights intelligents',
    content: 'Visualisez vos flux financiers, obtenez des prévisions de trésorerie et des recommandations personnalisées basées sur l\'IA.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Bell,
    title: 'Alertes intelligentes',
    description: 'Restez informé en temps réel',
    content: 'Recevez des notifications pour les transactions importantes, les anomalies détectées et les opportunités d\'optimisation.',
    color: 'from-pink-500 to-rose-600',
  },
]

export function OnboardingModal() {
  const { completed, currentStep, nextStep, prevStep, skip, setCompleted } = useOnboardingStore()
  const [isOpen, setIsOpen] = useState(!completed)

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const Icon = step.icon

  const handleNext = () => {
    if (isLastStep) {
      setCompleted(true)
      setIsOpen(false)
    } else {
      nextStep()
    }
  }

  const handleSkip = () => {
    skip()
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      title=""
      description=""
      className="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Progress */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= currentStep ? 'bg-gradient-to-r ' + step.color : 'bg-accent'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-6 py-8">
          <div className={`inline-flex h-20 w-20 rounded-2xl bg-gradient-to-r ${step.color} items-center justify-center shadow-lg`}>
            <Icon className="h-10 w-10 text-white" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
            <p className="text-sm text-primary font-medium">{step.description}</p>
          </div>

          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            {step.content}
          </p>

          {/* Visual hint */}
          {currentStep === 1 && (
            <div className="flex justify-center gap-3 pt-4">
              {['🌊', '🟠', '🏦'].map((emoji, i) => (
                <div
                  key={i}
                  className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-2xl animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-lg">📱</span>
              </div>
              <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
              <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground"
          >
            Passer
          </Button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </Button>
            )}
            <Button onClick={handleNext} className={`bg-gradient-to-r ${step.color}`}>
              {isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Commencer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Step indicator */}
        <p className="text-center text-xs text-muted-foreground">
          Étape {currentStep + 1} sur {steps.length}
        </p>
      </div>
    </Modal>
  )
}
