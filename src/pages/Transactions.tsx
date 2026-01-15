import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Search, 
  Filter, 
  Download, 
  ArrowDownLeft, 
  ArrowUpRight,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Transaction } from '@/types'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'encaissement',
    amount: 125000,
    currency: 'XOF',
    status: 'completed',
    method: 'wave',
    reference: 'KP-2026-00001',
    description: 'Paiement facture #1234',
    createdAt: new Date('2026-01-15T10:30:00'),
    completedAt: new Date('2026-01-15T10:30:15'),
    sender: 'Boutique Awa',
  },
  {
    id: '2',
    type: 'paiement',
    amount: 75000,
    currency: 'XOF',
    status: 'completed',
    method: 'orange_money',
    reference: 'KP-2026-00002',
    description: 'Paiement fournisseur',
    createdAt: new Date('2026-01-15T09:15:00'),
    completedAt: new Date('2026-01-15T09:15:10'),
    recipient: 'Fournisseur ABC',
  },
  {
    id: '3',
    type: 'encaissement',
    amount: 200000,
    currency: 'XOF',
    status: 'pending',
    method: 'bank',
    reference: 'KP-2026-00003',
    description: 'Virement bancaire client',
    createdAt: new Date('2026-01-15T08:00:00'),
    sender: 'Client DEF',
  },
  {
    id: '4',
    type: 'paiement',
    amount: 50000,
    currency: 'XOF',
    status: 'completed',
    method: 'momo',
    reference: 'KP-2026-00004',
    description: 'Paiement prestataire',
    createdAt: new Date('2026-01-14T16:45:00'),
    completedAt: new Date('2026-01-14T16:45:08'),
    recipient: 'Prestataire XYZ',
  },
  {
    id: '5',
    type: 'encaissement',
    amount: 350000,
    currency: 'XOF',
    status: 'completed',
    method: 'wave',
    reference: 'KP-2026-00005',
    description: 'Commande #5678',
    createdAt: new Date('2026-01-14T14:20:00'),
    completedAt: new Date('2026-01-14T14:20:12'),
    sender: 'Restaurant Le Bon',
  },
  {
    id: '6',
    type: 'paiement',
    amount: 180000,
    currency: 'XOF',
    status: 'failed',
    method: 'bank',
    reference: 'KP-2026-00006',
    description: 'Virement salaire',
    createdAt: new Date('2026-01-14T11:00:00'),
    recipient: 'Employé ABC',
  },
]

const methodLabels: Record<string, { label: string; color: string }> = {
  wave: { label: 'Wave', color: 'bg-wave/10 text-wave' },
  orange_money: { label: 'Orange Money', color: 'bg-orange/10 text-orange' },
  momo: { label: 'MoMo', color: 'bg-momo/10 text-amber-700' },
  bank: { label: 'Banque', color: 'bg-emerald-100 text-emerald-700' },
  other: { label: 'Autre', color: 'bg-gray-100 text-gray-700' },
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: 'En attente', icon: Clock, color: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Complété', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700' },
  failed: { label: 'Échoué', icon: XCircle, color: 'bg-red-100 text-red-700' },
  cancelled: { label: 'Annulé', icon: XCircle, color: 'bg-gray-100 text-gray-700' },
}

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'encaissement' | 'paiement'>('all')

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesSearch = 
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.sender?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.recipient?.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filterType === 'all' || t.type === filterType
    
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Historique de tous vos flux financiers</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par référence, description, client..."
                icon={<Search className="h-4 w-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex rounded-xl border border-border/60 p-1">
                {(['all', 'encaissement', 'paiement'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      filterType === type
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {type === 'all' ? 'Tout' : type === 'encaissement' ? 'Encaissements' : 'Paiements'}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Transaction
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Méthode
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Montant
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Statut
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredTransactions.map((tx) => {
                  const method = methodLabels[tx.method]
                  const status = statusConfig[tx.status]
                  const StatusIcon = status.icon
                  
                  return (
                    <tr key={tx.id} className="hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            tx.type === 'encaissement' ? 'bg-emerald-100' : 'bg-blue-100'
                          }`}>
                            {tx.type === 'encaissement' 
                              ? <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                              : <ArrowUpRight className="h-5 w-5 text-blue-600" />
                            }
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {tx.sender || tx.recipient}
                            </p>
                            <p className="text-xs text-muted-foreground">{tx.reference}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${method.color}`}>
                          {method.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${
                          tx.type === 'encaissement' ? 'text-emerald-600' : 'text-foreground'
                        }`}>
                          {tx.type === 'encaissement' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.color}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">{formatDate(tx.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/40">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredTransactions.length} transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
