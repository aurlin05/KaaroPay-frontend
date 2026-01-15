import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { 
  Wallet, 
  Plus, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown'

const initialAccounts = [
  { 
    id: '1', 
    name: 'Wave Business', 
    type: 'Mobile Money',
    number: '77 123 45 67', 
    balance: 2450000, 
    color: 'bg-wave',
    status: 'active',
    lastSync: '2 min',
    trend: '+15.3%'
  },
  { 
    id: '2', 
    name: 'Orange Money Pro', 
    type: 'Mobile Money',
    number: '78 234 56 78', 
    balance: 1230000, 
    color: 'bg-orange',
    status: 'active',
    lastSync: '5 min',
    trend: '+8.7%'
  },
  { 
    id: '3', 
    name: 'MTN MoMo', 
    type: 'Mobile Money',
    number: '76 345 67 89', 
    balance: 890000, 
    color: 'bg-momo',
    status: 'active',
    lastSync: '10 min',
    trend: '+22.1%'
  },
  { 
    id: '4', 
    name: 'CBAO Entreprise', 
    type: 'Compte Bancaire',
    number: 'SN12 3456 7890 1234', 
    balance: 5670000, 
    color: 'bg-emerald-500',
    status: 'active',
    lastSync: '1h',
    trend: '+5.2%'
  },
]

const accountTypes = [
  { id: 'wave', name: 'Wave', color: 'bg-wave', icon: '💳' },
  { id: 'orange', name: 'Orange Money', color: 'bg-orange', icon: '🟠' },
  { id: 'momo', name: 'MTN MoMo', color: 'bg-momo', icon: '💛' },
  { id: 'bank', name: 'Compte Bancaire', color: 'bg-emerald-500', icon: '🏦' },
]

const recentActivity = [
  { id: '1', type: 'in', amount: 125000, account: 'Wave Business', time: '2 min' },
  { id: '2', type: 'out', amount: 75000, account: 'Orange Money Pro', time: '15 min' },
  { id: '3', type: 'in', amount: 350000, account: 'CBAO Entreprise', time: '1h' },
  { id: '4', type: 'out', amount: 50000, account: 'Wave Business', time: '2h' },
]

export function Comptes() {
  const [showBalances, setShowBalances] = useState(true)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<typeof accounts[0] | null>(null)
  const [newAccount, setNewAccount] = useState({ type: '', number: '', name: '' })
  
  const totalBalance = accounts
    .filter(a => a.status === 'active')
    .reduce((sum, a) => sum + a.balance, 0)

  const handleAddAccount = () => {
    if (!newAccount.type || !newAccount.number) return
    
    const accountType = accountTypes.find(t => t.id === newAccount.type)
    const newAcc = {
      id: Date.now().toString(),
      name: newAccount.name || accountType?.name || 'Nouveau compte',
      type: accountType?.id === 'bank' ? 'Compte Bancaire' : 'Mobile Money',
      number: newAccount.number,
      balance: 0,
      color: accountType?.color || 'bg-gray-500',
      status: 'active' as const,
      lastSync: 'À l\'instant',
      trend: '0%'
    }
    
    setAccounts([...accounts, newAcc])
    setShowAddModal(false)
    setNewAccount({ type: '', number: '', name: '' })
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id))
    setShowDetailModal(false)
  }

  const openAccountDetail = (account: typeof accounts[0]) => {
    setSelectedAccount(account)
    setShowDetailModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comptes connectés</h1>
          <p className="text-muted-foreground">Gérez tous vos comptes de paiement</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          Ajouter un compte
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/80">Solde total</p>
            <button 
              onClick={() => setShowBalances(!showBalances)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {showBalances ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-4xl font-bold mb-2">
            {showBalances ? formatCurrency(totalBalance) : '••••••••'}
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+12.5% ce mois</span>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <ArrowDownLeft className="h-4 w-4" />
              Encaisser
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <ArrowUpRight className="h-4 w-4" />
              Payer
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <RefreshCw className="h-4 w-4" />
              Transférer
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Accounts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Vos comptes ({accounts.length})</h2>
            <button className="text-sm text-primary font-medium hover:underline">
              Synchroniser tout
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {accounts.map((account) => (
              <Card 
                key={account.id} 
                className={`cursor-pointer ${account.status === 'pending' ? 'opacity-70' : ''}`}
                onClick={() => openAccountDetail(account)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl ${account.color} flex items-center justify-center`}>
                        <Wallet className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.type}</p>
                      </div>
                    </div>
                    <Dropdown
                      trigger={
                        <button 
                          className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      }
                    >
                      <DropdownItem icon={<Eye className="h-4 w-4" />} onClick={() => openAccountDetail(account)}>
                        Voir détails
                      </DropdownItem>
                      <DropdownItem icon={<Edit className="h-4 w-4" />}>
                        Modifier
                      </DropdownItem>
                      <DropdownItem icon={<RefreshCw className="h-4 w-4" />}>
                        Synchroniser
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem icon={<Trash2 className="h-4 w-4" />} danger onClick={() => handleDeleteAccount(account.id)}>
                        Supprimer
                      </DropdownItem>
                    </Dropdown>
                  </div>

                  <p className="text-2xl font-bold text-foreground mb-1">
                    {showBalances ? formatCurrency(account.balance) : '••••••'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">{account.number}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-1.5">
                      {account.status === 'active' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs text-muted-foreground">Sync {account.lastSync}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span className="text-xs text-amber-600">En attente</span>
                        </>
                      )}
                    </div>
                    {account.trend !== '-' && (
                      <span className="text-xs font-medium text-emerald-600">{account.trend}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Account Card */}
            <Card 
              className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">Ajouter un compte</p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Connectez Wave, Orange Money, MoMo ou votre banque
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Derniers mouvements sur vos comptes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                      activity.type === 'in' ? 'bg-emerald-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'in' 
                        ? <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                        : <ArrowUpRight className="h-4 w-4 text-blue-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.account}</p>
                      <p className="text-xs text-muted-foreground">Il y a {activity.time}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${
                    activity.type === 'in' ? 'text-emerald-600' : 'text-foreground'
                  }`}>
                    {activity.type === 'in' ? '+' : '-'}{formatCurrency(activity.amount)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.filter(a => a.status === 'active').map((account) => {
                const percentage = totalBalance > 0 ? (account.balance / totalBalance) * 100 : 0
                return (
                  <div key={account.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{account.name}</span>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-accent overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${account.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Account Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un compte"
        description="Connectez un nouveau compte de paiement"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de compte</label>
            <div className="grid grid-cols-2 gap-3">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setNewAccount({ ...newAccount, type: type.id })}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    newAccount.type === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Numéro de compte / Téléphone</label>
            <Input
              placeholder="Ex: 77 123 45 67"
              value={newAccount.number}
              onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Nom personnalisé (optionnel)</label>
            <Input
              placeholder="Ex: Mon compte principal"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
            <Button className="flex-1" onClick={handleAddAccount} disabled={!newAccount.type || !newAccount.number}>
              Ajouter le compte
            </Button>
          </div>
        </div>
      </Modal>

      {/* Account Detail Modal */}
      <Modal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={selectedAccount?.name}
        description={selectedAccount?.type}
      >
        {selectedAccount && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`h-16 w-16 rounded-2xl ${selectedAccount.color} flex items-center justify-center`}>
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">{formatCurrency(selectedAccount.balance)}</p>
                <p className="text-sm text-muted-foreground">{selectedAccount.number}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-accent/50">
                <p className="text-xs text-muted-foreground">Statut</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">Actif</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent/50">
                <p className="text-xs text-muted-foreground">Dernière sync</p>
                <p className="text-sm font-medium mt-1">{selectedAccount.lastSync}</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/50">
                <p className="text-xs text-muted-foreground">Tendance</p>
                <p className="text-sm font-medium text-emerald-600 mt-1">{selectedAccount.trend}</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/50">
                <p className="text-xs text-muted-foreground">Transactions</p>
                <p className="text-sm font-medium mt-1">24 ce mois</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4" />
                Synchroniser
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4" />
                Voir transactions
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => handleDeleteAccount(selectedAccount.id)}
            >
              <Trash2 className="h-4 w-4" />
              Supprimer ce compte
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
