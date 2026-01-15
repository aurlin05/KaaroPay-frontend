import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowUpRight, Search, Filter } from 'lucide-react'
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
    reference: 'REF-2026-001',
    description: 'Paiement facture #1234',
    createdAt: new Date('2026-01-15T10:30:00'),
    completedAt: new Date('2026-01-15T10:30:15'),
    sender: 'Client ABC',
  },
  {
    id: '2',
    type: 'paiement',
    amount: 75000,
    currency: 'XOF',
    status: 'completed',
    method: 'orange_money',
    reference: 'REF-2026-002',
    description: 'Paiement fournisseur XYZ',
    createdAt: new Date('2026-01-15T09:15:00'),
    completedAt: new Date('2026-01-15T09:15:10'),
    recipient: 'Fournisseur XYZ',
  },
  {
    id: '3',
    type: 'encaissement',
    amount: 200000,
    currency: 'XOF',
    status: 'pending',
    method: 'bank',
    reference: 'REF-2026-003',
    description: 'Virement bancaire',
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
    reference: 'REF-2026-004',
    description: 'Paiement prestataire',
    createdAt: new Date('2026-01-14T16:45:00'),
    completedAt: new Date('2026-01-14T16:45:08'),
    recipient: 'Prestataire ABC',
  },
]

const methodLabels: Record<string, string> = {
  wave: 'Wave',
  orange_money: 'Orange Money',
  momo: 'MoMo',
  bank: 'Banque',
  other: 'Autre',
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  completed: 'Complété',
  failed: 'Échoué',
  cancelled: 'Annulé',
}

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = mockTransactions.filter(
    (t) =>
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Gérez et suivez toutes vos transactions
          </p>
        </div>
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Nouvelle transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par référence ou description..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Référence
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Méthode
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Montant
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Statut
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b last:border-0">
                    <td className="py-4 text-sm font-medium">{transaction.reference}</td>
                    <td className="py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          transaction.type === 'encaissement'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {transaction.type === 'encaissement' ? 'Encaissement' : 'Paiement'}
                      </span>
                    </td>
                    <td className="py-4 text-sm">{transaction.description}</td>
                    <td className="py-4 text-sm">{methodLabels[transaction.method]}</td>
                    <td className="py-4 text-sm font-semibold">
                      {transaction.type === 'encaissement' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {statusLabels[transaction.status]}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
