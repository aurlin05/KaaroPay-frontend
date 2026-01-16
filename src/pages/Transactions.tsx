import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Pagination } from '@/components/ui/Pagination'
import { AdvancedFilters } from '@/components/ui/AdvancedFilters'
import { usePagination } from '@/hooks/usePagination'
import { useAdvancedFilter, FilterConfig } from '@/hooks/useAdvancedFilter'
import { 
  Download, 
  ArrowDownLeft, 
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  ExternalLink,
  FileText
} from 'lucide-react'
import { exportTransactionsCSV, exportTransactionsPDF } from '@/lib/exportData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Transaction } from '@/types'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'

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
  {
    id: '7',
    type: 'encaissement',
    amount: 95000,
    currency: 'XOF',
    status: 'completed',
    method: 'orange_money',
    reference: 'KP-2026-00007',
    description: 'Vente produits',
    createdAt: new Date('2026-01-13T15:30:00'),
    completedAt: new Date('2026-01-13T15:30:05'),
    sender: 'Magasin Central',
  },
  {
    id: '8',
    type: 'paiement',
    amount: 250000,
    currency: 'XOF',
    status: 'completed',
    method: 'bank',
    reference: 'KP-2026-00008',
    description: 'Achat matériel',
    createdAt: new Date('2026-01-13T10:00:00'),
    completedAt: new Date('2026-01-13T10:05:00'),
    recipient: 'Fournisseur Tech',
  },
  {
    id: '9',
    type: 'encaissement',
    amount: 45000,
    currency: 'XOF',
    status: 'pending',
    method: 'momo',
    reference: 'KP-2026-00009',
    description: 'Abonnement mensuel',
    createdAt: new Date('2026-01-12T18:00:00'),
    sender: 'Client Premium',
  },
  {
    id: '10',
    type: 'paiement',
    amount: 320000,
    currency: 'XOF',
    status: 'completed',
    method: 'wave',
    reference: 'KP-2026-00010',
    description: 'Loyer bureau',
    createdAt: new Date('2026-01-12T09:00:00'),
    completedAt: new Date('2026-01-12T09:00:20'),
    recipient: 'Propriétaire Immo',
  },
  {
    id: '11',
    type: 'encaissement',
    amount: 175000,
    currency: 'XOF',
    status: 'completed',
    method: 'wave',
    reference: 'KP-2026-00011',
    description: 'Service consulting',
    createdAt: new Date('2026-01-11T14:30:00'),
    completedAt: new Date('2026-01-11T14:30:10'),
    sender: 'Entreprise XYZ',
  },
  {
    id: '12',
    type: 'paiement',
    amount: 85000,
    currency: 'XOF',
    status: 'cancelled',
    method: 'orange_money',
    reference: 'KP-2026-00012',
    description: 'Commande annulée',
    createdAt: new Date('2026-01-11T11:00:00'),
    recipient: 'Fournisseur B',
  },
  {
    id: '13',
    type: 'encaissement',
    amount: 500000,
    currency: 'XOF',
    status: 'completed',
    method: 'bank',
    reference: 'KP-2026-00013',
    description: 'Contrat annuel',
    createdAt: new Date('2026-01-10T16:00:00'),
    completedAt: new Date('2026-01-10T16:30:00'),
    sender: 'Grand Client SA',
  },
  {
    id: '14',
    type: 'paiement',
    amount: 65000,
    currency: 'XOF',
    status: 'completed',
    method: 'momo',
    reference: 'KP-2026-00014',
    description: 'Frais marketing',
    createdAt: new Date('2026-01-10T10:00:00'),
    completedAt: new Date('2026-01-10T10:00:08'),
    recipient: 'Agence Pub',
  },
  {
    id: '15',
    type: 'encaissement',
    amount: 28000,
    currency: 'XOF',
    status: 'failed',
    method: 'wave',
    reference: 'KP-2026-00015',
    description: 'Paiement échoué',
    createdAt: new Date('2026-01-09T17:00:00'),
    sender: 'Client Test',
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

// Filter configurations
const filterConfigs: FilterConfig<Transaction>[] = [
  {
    key: 'search',
    type: 'text',
    label: 'Recherche',
    placeholder: 'Rechercher par référence, description, client...'
  },
  {
    key: 'type',
    type: 'select',
    label: 'Type',
    options: [
      { value: 'encaissement', label: 'Encaissement' },
      { value: 'paiement', label: 'Paiement' }
    ]
  },
  {
    key: 'status',
    type: 'multiselect',
    label: 'Statut',
    options: [
      { value: 'pending', label: 'En attente' },
      { value: 'completed', label: 'Complété' },
      { value: 'failed', label: 'Échoué' },
      { value: 'cancelled', label: 'Annulé' }
    ]
  },
  {
    key: 'method',
    type: 'multiselect',
    label: 'Méthode',
    options: [
      { value: 'wave', label: 'Wave' },
      { value: 'orange_money', label: 'Orange Money' },
      { value: 'momo', label: 'MoMo' },
      { value: 'bank', label: 'Banque' }
    ]
  },
  {
    key: 'createdAt',
    type: 'dateRange',
    label: 'Période'
  },
  {
    key: 'amount',
    type: 'numberRange',
    label: 'Montant (XOF)'
  }
]

const searchKeys: (keyof Transaction)[] = ['reference', 'description', 'sender', 'recipient']

export function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'PDF' | 'CSV'>('PDF')
  const [exportDateStart, setExportDateStart] = useState('')
  const [exportDateEnd, setExportDateEnd] = useState('')
  const [copied, setCopied] = useState(false)

  // Advanced filtering
  const {
    filteredData: filteredTransactions,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount
  } = useAdvancedFilter(mockTransactions, filterConfigs, searchKeys)

  // Pagination
  const {
    paginatedData,
    page,
    pageSize,
    totalItems,
    totalPages,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
    pageSizeOptions
  } = usePagination(filteredTransactions, { initialPageSize: 10 })

  const openTransactionDetail = (tx: Transaction) => {
    setSelectedTransaction(tx)
    setShowDetailModal(true)
  }

  const copyReference = (ref: string) => {
    navigator.clipboard.writeText(ref)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    // Filter by date range if specified
    let dataToExport = filteredTransactions
    if (exportDateStart || exportDateEnd) {
      dataToExport = filteredTransactions.filter(tx => {
        const txDate = new Date(tx.createdAt)
        if (exportDateStart && txDate < new Date(exportDateStart)) return false
        if (exportDateEnd && txDate > new Date(exportDateEnd + 'T23:59:59')) return false
        return true
      })
    }

    if (exportFormat === 'CSV') {
      exportTransactionsCSV(dataToExport, `transactions_${new Date().toISOString().split('T')[0]}`)
    } else {
      exportTransactionsPDF(dataToExport, 'Historique des transactions - KaaroPay')
    }
    
    setShowExportModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Historique de tous vos flux financiers</p>
        </div>
        <Button variant="outline" onClick={() => setShowExportModal(true)}>
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <AdvancedFilters
            configs={filterConfigs}
            filters={filters}
            onFilterChange={setFilter}
            onClearFilter={clearFilter}
            onClearAll={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
          />
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
                {paginatedData.map((tx) => {
                  const method = methodLabels[tx.method]
                  const status = statusConfig[tx.status]
                  const StatusIcon = status.icon
                  
                  return (
                    <tr 
                      key={tx.id} 
                      className="hover:bg-accent/30 transition-colors cursor-pointer"
                      onClick={() => openTransactionDetail(tx)}
                    >
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
                        <Dropdown
                          trigger={
                            <button 
                              className="p-2 hover:bg-accent rounded-lg transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </button>
                          }
                        >
                          <DropdownItem icon={<ExternalLink className="h-4 w-4" />} onClick={() => openTransactionDetail(tx)}>
                            Voir détails
                          </DropdownItem>
                          <DropdownItem icon={<Copy className="h-4 w-4" />} onClick={() => copyReference(tx.reference)}>
                            Copier référence
                          </DropdownItem>
                          <DropdownItem icon={<FileText className="h-4 w-4" />}>
                            Télécharger reçu
                          </DropdownItem>
                        </Dropdown>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onNext={nextPage}
            onPrev={prevPage}
            onFirst={goToFirst}
            onLast={goToLast}
          />
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      <Modal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Détails de la transaction"
        description={selectedTransaction?.reference}
      >
        {selectedTransaction && (
          <div className="space-y-6">
            {/* Amount */}
            <div className={`p-6 rounded-2xl ${
              selectedTransaction.type === 'encaissement' 
                ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
              <p className="text-sm text-muted-foreground mb-1">
                {selectedTransaction.type === 'encaissement' ? 'Montant reçu' : 'Montant envoyé'}
              </p>
              <p className={`text-3xl font-bold ${
                selectedTransaction.type === 'encaissement' ? 'text-emerald-600' : 'text-blue-600'
              }`}>
                {selectedTransaction.type === 'encaissement' ? '+' : '-'}
                {formatCurrency(selectedTransaction.amount)}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-border/40">
                <span className="text-sm text-muted-foreground">Référence</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{selectedTransaction.reference}</span>
                  <button 
                    onClick={() => copyReference(selectedTransaction.reference)}
                    className="p-1 hover:bg-accent rounded transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-3 border-b border-border/40">
                <span className="text-sm text-muted-foreground">
                  {selectedTransaction.type === 'encaissement' ? 'De' : 'Vers'}
                </span>
                <span className="text-sm font-medium">
                  {selectedTransaction.sender || selectedTransaction.recipient}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/40">
                <span className="text-sm text-muted-foreground">Méthode</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${methodLabels[selectedTransaction.method].color}`}>
                  {methodLabels[selectedTransaction.method].label}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/40">
                <span className="text-sm text-muted-foreground">Statut</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig[selectedTransaction.status].color}`}>
                  {React.createElement(statusConfig[selectedTransaction.status].icon, { className: "h-3.5 w-3.5" })}
                  {statusConfig[selectedTransaction.status].label}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/40">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm font-medium">{formatDate(selectedTransaction.createdAt)}</span>
              </div>
              {selectedTransaction.completedAt && (
                <div className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Complété le</span>
                  <span className="text-sm font-medium">{formatDate(selectedTransaction.completedAt)}</span>
                </div>
              )}
              <div className="flex justify-between py-3">
                <span className="text-sm text-muted-foreground">Description</span>
                <span className="text-sm font-medium">{selectedTransaction.description}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <FileText className="h-4 w-4" />
                Télécharger reçu
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => copyReference(selectedTransaction.reference)}>
                <Copy className="h-4 w-4" />
                {copied ? 'Copié !' : 'Copier réf.'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Export Modal */}
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exporter les transactions"
        description="Téléchargez l'historique de vos transactions"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <div className="grid grid-cols-2 gap-3">
              {(['PDF', 'CSV'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    exportFormat === format 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Période (optionnel)</label>
            <div className="grid grid-cols-2 gap-3">
              <Input 
                type="date" 
                value={exportDateStart}
                onChange={(e) => setExportDateStart(e.target.value)}
                placeholder="Date début"
              />
              <Input 
                type="date" 
                value={exportDateEnd}
                onChange={(e) => setExportDateEnd(e.target.value)}
                placeholder="Date fin"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.length} transaction(s) à exporter
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowExportModal(false)}>
              Annuler
            </Button>
            <Button className="flex-1" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exporter en {exportFormat}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
