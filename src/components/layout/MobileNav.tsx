import { NavLink } from 'react-router-dom'
import { X, LayoutDashboard, ArrowLeftRight, Send, Settings, Wallet, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Paiements', href: '/paiements', icon: Send },
  { name: 'Comptes', href: '/comptes', icon: Wallet },
  { name: 'Rapports', href: '/rapports', icon: FileText },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

export function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <span className="text-lg font-bold text-white">K</span>
            </div>
            <span className="text-lg font-bold">KaaroPay</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
