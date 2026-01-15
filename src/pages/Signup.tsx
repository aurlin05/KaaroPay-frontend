import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Mail, Lock, User, Phone, Building2, ArrowRight, Check } from 'lucide-react'
import { Logo } from '@/components/Logo'

const benefits = [
  'Essai gratuit de 14 jours',
  'Aucune carte de crédit requise',
  'Configuration en 5 minutes',
  'Support dédié inclus',
]

export function Signup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    setIsLoading(true)
    await login(formData.email, formData.password)
    setIsLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Logo size="lg" />
            <span className="text-2xl font-bold text-foreground">KaaroPay</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Créer votre compte</h1>
            <p className="text-muted-foreground mt-2">
              Commencez à accepter des paiements en quelques minutes
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-accent'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-accent'}`} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom complet</label>
                  <Input
                    name="name"
                    placeholder="Moussa Diagne"
                    icon={<User className="h-4 w-4" />}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email professionnel</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="vous@entreprise.com"
                    icon={<Mail className="h-4 w-4" />}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Téléphone</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+221 77 123 45 67"
                    icon={<Phone className="h-4 w-4" />}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Nom de l'entreprise</label>
                  <Input
                    name="company"
                    placeholder="Ma PME"
                    icon={<Building2 className="h-4 w-4" />}
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mot de passe</label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="h-4 w-4" />}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 8 caractères avec lettres et chiffres
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Confirmer le mot de passe</label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="h-4 w-4" />}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    J'accepte les{' '}
                    <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>
                    {' '}et la{' '}
                    <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                  </span>
                </label>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Retour
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {step === 1 ? 'Continuer' : isLoading ? 'Création...' : 'Créer mon compte'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez des centaines d'entreprises
          </h2>
          <p className="text-lg text-white/80 mb-10">
            KaaroPay simplifie la gestion financière des PME en Afrique de l'Ouest 
            grâce à l'interopérabilité PI-SPI.
          </p>

          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
            <p className="text-white/90 italic mb-4">
              "KaaroPay nous a permis de réduire notre temps de réconciliation de 80%. 
              Un outil indispensable pour notre croissance."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                FD
              </div>
              <div>
                <p className="font-semibold">Fatou Diallo</p>
                <p className="text-sm text-white/70">DG, TechCorp Sénégal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
