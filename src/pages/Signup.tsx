import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Mail, Lock, User, Phone, Building2, ArrowRight, Check } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Animated3DScene } from '@/components/ui/Animated3DScene'

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

      {/* Right Panel - 3D Motion Design */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 items-center justify-center relative overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-400/20 via-transparent to-fuchsia-400/20 animate-gradient-shift" />
          <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />
          <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-purple-300/10 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-fuchsia-300/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* 3D Scene */}
        <div className="relative z-10 w-full h-full">
          <Animated3DScene />
        </div>

        {/* Benefits overlay */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <h2 className="text-2xl font-bold text-white mb-4">
            Rejoignez des centaines d'entreprises
          </h2>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                <Check className="h-4 w-4 text-white" />
                <span className="text-white/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes gradient-shift {
            0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.8; transform: scale(1.1) rotate(5deg); }
          }
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-gradient-shift { animation: gradient-shift 15s ease-in-out infinite; }
          .animate-blob { animation: blob 10s ease-in-out infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    </div>
  )
}
