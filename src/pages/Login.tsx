import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Animated3DScene } from '@/components/ui/Animated3DScene'

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

      {/* Right Panel - 3D Motion Design */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 items-center justify-center relative overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/20 via-transparent to-cyan-400/20 animate-gradient-shift" />
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-300/10 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-300/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* 3D Scene */}
        <div className="relative z-10 w-full h-full">
          <Animated3DScene />
        </div>

        {/* Bottom text overlay */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <h2 className="text-3xl font-bold text-white mb-3">
            L'orchestrateur de paiements
          </h2>
          <p className="text-white/80 text-lg">
            Encaissez, payez et suivez tous vos flux financiers depuis une seule interface.
          </p>
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
