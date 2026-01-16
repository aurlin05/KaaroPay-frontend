import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { useTranslation } from 'react-i18next'
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  Key,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Palette
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'

const plans = [
  { 
    name: 'Starter', 
    price: '5 000', 
    features: ['100 transactions/mois', 'Support email', '1 utilisateur'],
    current: true 
  },
  { 
    name: 'Business', 
    price: '25 000', 
    features: ['1000 transactions/mois', 'Support prioritaire', '5 utilisateurs', 'API access'],
    current: false,
    popular: true
  },
  { 
    name: 'Enterprise', 
    price: 'Sur mesure', 
    features: ['Transactions illimitées', 'Support dédié', 'Utilisateurs illimités', 'API + Webhooks'],
    current: false 
  },
]

export function Settings() {
  const { user } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>Informations personnelles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Modifier
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-border/40">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom complet</label>
                  <Input defaultValue={user?.name} icon={<User className="h-4 w-4" />} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input defaultValue={user?.email} icon={<Mail className="h-4 w-4" />} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Téléphone</label>
                  <Input defaultValue="+221 77 123 45 67" icon={<Phone className="h-4 w-4" />} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('settings.language')}</label>
                  <LanguageSelector variant="buttons" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Entreprise</CardTitle>
                  <CardDescription>Informations de votre entreprise</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom de l'entreprise</label>
                  <Input defaultValue={user?.company} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">NINEA</label>
                  <Input defaultValue="123456789" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Adresse</label>
                  <Input defaultValue="123 Rue Example, Dakar, Sénégal" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>Protégez votre compte</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Mot de passe', desc: 'Dernière modification il y a 30 jours', icon: Key },
                { label: 'Authentification 2FA', desc: 'Activée via SMS', icon: Shield, active: true },
                { label: 'Sessions actives', desc: '2 appareils connectés', icon: Globe },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.active && (
                      <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                        Actif
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-pink-500" />
                </div>
                <CardTitle>Apparence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'light' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-blue-400" />}
                  <div>
                    <p className="text-sm font-medium">Mode {theme === 'light' ? 'clair' : 'sombre'}</p>
                    <p className="text-xs text-muted-foreground">
                      {theme === 'light' ? 'Thème lumineux' : 'Thème sombre'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-primary' : 'bg-accent'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform flex items-center justify-center ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}>
                    {theme === 'dark' ? <Moon className="h-3 w-3 text-primary" /> : <Sun className="h-3 w-3 text-amber-500" />}
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-violet-500" />
                </div>
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Notifications email', checked: true },
                { label: 'Notifications push', checked: true },
                { label: 'Alertes transactions', checked: true },
                { label: 'Rapports hebdomadaires', checked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{item.label}</span>
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${
                    item.checked ? 'bg-primary' : 'bg-accent'
                  }`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      item.checked ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle>Abonnement</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    plan.current 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{plan.name}</span>
                      {plan.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs">
                          Populaire
                        </span>
                      )}
                    </div>
                    {plan.current && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <p className="text-lg font-bold">
                    {plan.price} <span className="text-sm font-normal text-muted-foreground">XOF/mois</span>
                  </p>
                  <ul className="mt-3 space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check className="h-3 w-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Button size="sm" variant={plan.popular ? 'default' : 'outline'} className="w-full mt-3">
                      Choisir
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
