import { Menu, Bell, Search, ChevronDown, Plus } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-white/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher transactions, clients..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/40 bg-accent/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-1 md:hidden" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="hidden sm:flex">
          <Plus className="h-4 w-4" />
          Nouveau paiement
        </Button>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
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
      </div>
    </header>
  )
}
