import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Send, 
  Settings, 
  Wallet,
  FileText,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'

const mainNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Paiements', href: '/paiements', icon: Send },
  { name: 'Comptes', href: '/comptes', icon: Wallet },
]

const secondaryNav = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Rapports', href: '/rapports', icon: FileText },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const logout = useAuthStore((state) => state.logout)
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col overflow-y-auto bg-card border-r border-border/40 px-6 py-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <Logo size="lg" />
          <div>
            <h1 className="text-xl font-bold text-foreground">KaaroPay</h1>
            <p className="text-xs text-muted-foreground">Orchestrateur PI-SPI</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Principal
            </p>
            {mainNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-soft'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground')} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Autres
            </p>
            {secondaryNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-soft'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground')} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          </button>

          {/* Help Card */}
          <div className="mt-auto">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-4 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-soft">
                  <HelpCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Besoin d'aide ?</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Notre équipe est disponible 24/7 pour vous accompagner.
              </p>
              <button className="w-full text-xs font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                Contacter le support →
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
