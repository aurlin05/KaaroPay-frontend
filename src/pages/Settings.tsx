import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Bell, Shield, User, CreditCard } from 'lucide-react'

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez vos préférences et votre compte
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profil</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nom</label>
              <p className="text-muted-foreground">Jean Dupont</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <p className="text-muted-foreground">jean.dupont@mapme.sn</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Entreprise</label>
              <p className="text-muted-foreground">Ma PME</p>
            </div>
            <Button variant="outline" className="w-full">
              Modifier le profil
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Sécurité</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Authentification à deux facteurs</p>
                <p className="text-sm text-muted-foreground">Activée</p>
              </div>
              <Button variant="outline" size="sm">
                Gérer
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mot de passe</p>
                <p className="text-sm text-muted-foreground">Dernière modification il y a 30j</p>
              </div>
              <Button variant="outline" size="sm">
                Changer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm">Notifications par email</p>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Notifications push</p>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Alertes de transactions</p>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Abonnement</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Plan Starter</p>
              <p className="text-sm text-muted-foreground">
                5 000 XOF / mois
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">
                Prochain paiement le 15 février 2026
              </p>
            </div>
            <Button className="w-full">Mettre à niveau</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
