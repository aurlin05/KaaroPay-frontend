import { LoginForm } from '@/components/auth/LoginForm'
import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">K</span>
              </div>
              <span className="text-2xl font-semibold">KaaroPay</span>
            </Link>
            <h2 className="mt-8 text-3xl font-bold tracking-tight">Bienvenue</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Créer un compte gratuitement
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        <div className="relative flex h-full flex-col justify-center p-12">
          <blockquote className="space-y-4">
            <p className="text-2xl font-medium text-foreground">
              "KaaroPay a simplifié nos opérations de paiement. Nous gérons maintenant toutes nos transactions en un seul endroit, ce qui nous fait gagner des heures chaque semaine."
            </p>
            <footer className="text-sm text-muted-foreground">
              <strong>Fatou Diallo</strong> - Directrice Financière, TechCorp Sénégal
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
