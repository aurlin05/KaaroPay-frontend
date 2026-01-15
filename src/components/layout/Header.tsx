import { Menu, Bell, Search, ChevronDown, Plus, User, Settings, LogOut, CreditCard, HelpCircle, Moon, Sun } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { Button } from '@/components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown'

interface HeaderProps {
  onMenuClick: () => void
}

const notifications = [
  { id: '1', title: 'Paiement reçu', desc: '125 000 XOF de Boutique Awa', time: '2 min', read: false },
  { id: '2', title: 'Paiement envoyé', desc: '75 000 XOF vers Fournisseur ABC', time: '15 min', read: false },
  { id: '3', title: 'Nouveau compte connecté', desc: 'Orange Money ajouté avec succès', time: '1h', read: true },
  { id: '4', title: 'Rapport disponible', desc: 'Rapport mensuel Juin 2026', time: '2h', read: true },
]

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-card/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="flex-1 flex items-center">
        <div className="hidden md:flex max-w-md w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher transactions, clients..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/40 bg-accent/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <Link to="/paiements">
          <Button size="sm" className="hidden sm:flex">
            <Plus className="h-4 w-4" />
            Nouveau paiement
          </Button>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all"
          title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Notifications Dropdown */}
        <Dropdown
          trigger={
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
              )}
            </button>
          }
          className="w-80"
        >
          <div className="px-4 py-2 border-b border-border/40">
            <p className="font-semibold text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">{unreadCount} non lues</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full mt-2 ${!notif.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{notif.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a {notif.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-border/40">
            <button className="w-full text-sm text-primary font-medium hover:underline">
              Voir toutes les notifications
            </button>
          </div>
        </Dropdown>

        {/* Profile Dropdown */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-accent transition-all">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.company}</p>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-muted-foreground" />
            </button>
          }
        >
          <div className="px-4 py-3 border-b border-border/40">
            <p className="font-semibold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => navigate('/settings')}>
            Mon profil
          </DropdownItem>
          <DropdownItem icon={<CreditCard className="h-4 w-4" />} onClick={() => navigate('/comptes')}>
            Mes comptes
          </DropdownItem>
          <DropdownItem icon={<Settings className="h-4 w-4" />} onClick={() => navigate('/settings')}>
            Paramètres
          </DropdownItem>
          <DropdownItem icon={<HelpCircle className="h-4 w-4" />}>
            Aide & Support
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={<LogOut className="h-4 w-4" />} danger onClick={handleLogout}>
            Déconnexion
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
