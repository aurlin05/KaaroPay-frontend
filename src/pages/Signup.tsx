import { SignupForm } from '@/components/auth/SignupForm'
import { Link } from 'react-router-dom'

export function Signup() {
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
            <h2 className="mt-8 text-3xl font-bold tracking-tight">Créer votre compte</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          <SignupForm />
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        <div className="relative flex h-full flex-col justify-center p-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Commencez à accepter des paiements en quelques minutes</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Essai gratuit de 14 jours, aucune carte de crédit requise</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Connectez un nombre illimité de canaux de paiement</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Bénéficiez du support de notre équipe d'experts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
