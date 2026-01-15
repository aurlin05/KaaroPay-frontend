import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Mail, Lock, ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import { Logo } from '@/components/Logo'

const features = [
  { icon: Zap, title: 'Paiements instantanés', desc: 'Via le réseau PI-SPI de la BCEAO' },
  { icon: Shield, title: '100% Sécurisé', desc: 'Conforme aux normes bancaires' },
  { icon: Globe, title: 'Multi-canaux', desc: 'Wave, Orange Money, MoMo, Banques' },
]

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await login(email, password)
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
            <h1 className="text-3xl font-bold text-foreground">Bon retour !</h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous pour gérer vos paiements
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="vous@entreprise.com"
                icon={<Mail className="h-4 w-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Mot de passe</label>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Créer un compte gratuitement
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            L'orchestrateur de paiements pour l'Afrique de l'Ouest
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Encaissez, payez et suivez tous vos flux financiers depuis une seule interface, 
            quel que soit le canal utilisé.
          </p>

          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-white/70">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
