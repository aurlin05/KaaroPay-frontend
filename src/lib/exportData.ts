import { Transaction } from '@/types'
import { formatCurrency, formatDate } from './utils'

// CSV Export
export function exportToCSV<T>(
  data: T[],
  columns: { key: keyof T; label: string; format?: (value: unknown) => string }[],
  filename: string
): void {
  const headers = columns.map(col => col.label).join(',')
  
  const rows = data.map(item => 
    columns.map(col => {
      const value = item[col.key]
      const formatted = col.format ? col.format(value) : String(value ?? '')
      // Escape quotes and wrap in quotes if contains comma
      const escaped = formatted.replace(/"/g, '""')
      return escaped.includes(',') || escaped.includes('\n') ? `"${escaped}"` : escaped
    }).join(',')
  ).join('\n')

  const csv = `${headers}\n${rows}`
  downloadFile(csv, `${filename}.csv`, 'text/csv;charset=utf-8;')
}

// Transaction-specific CSV export
export function exportTransactionsCSV(transactions: Transaction[], filename = 'transactions'): void {
  exportToCSV(transactions, [
    { key: 'reference', label: 'Référence' },
    { key: 'type', label: 'Type', format: (v) => v === 'encaissement' ? 'Encaissement' : 'Paiement' },
    { key: 'amount', label: 'Montant', format: (v) => formatCurrency(v as number) },
    { key: 'currency', label: 'Devise' },
    { key: 'status', label: 'Statut', format: (v) => {
      const labels: Record<string, string> = { pending: 'En attente', completed: 'Complété', failed: 'Échoué', cancelled: 'Annulé' }
      return labels[v as string] || String(v)
    }},
    { key: 'method', label: 'Méthode', format: (v) => {
      const labels: Record<string, string> = { wave: 'Wave', orange_money: 'Orange Money', momo: 'MoMo', bank: 'Banque' }
      return labels[v as string] || String(v)
    }},
    { key: 'description', label: 'Description' },
    { key: 'sender', label: 'Expéditeur', format: (v) => v ? String(v) : '' },
    { key: 'recipient', label: 'Destinataire', format: (v) => v ? String(v) : '' },
    { key: 'createdAt', label: 'Date', format: (v) => formatDate(v as Date) },
  ], filename)
}

// PDF Export using browser print
export function exportToPDF(
  title: string,
  content: string,
  _filename: string
): void {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour exporter en PDF')
    return
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
        h1 { color: #1a1a1a; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #6366f1; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .date { color: #666; font-size: 14px; }
        .positive { color: #10b981; }
        .negative { color: #333; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .status-completed { background: #d1fae5; color: #065f46; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-failed { background: #fee2e2; color: #991b1b; }
        @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <span class="date">Généré le ${new Date().toLocaleDateString('fr-FR')}</span>
      </div>
      ${content}
    </body>
    </html>
  `)
  
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}

// Transaction-specific PDF export
export function exportTransactionsPDF(transactions: Transaction[], title = 'Historique des transactions'): void {
  const statusLabels: Record<string, { label: string; class: string }> = {
    pending: { label: 'En attente', class: 'status-pending' },
    completed: { label: 'Complété', class: 'status-completed' },
    failed: { label: 'Échoué', class: 'status-failed' },
    cancelled: { label: 'Annulé', class: 'status-failed' },
  }

  const methodLabels: Record<string, string> = {
    wave: 'Wave', orange_money: 'Orange Money', momo: 'MoMo', bank: 'Banque'
  }

  const rows = transactions.map(tx => {
    const status = statusLabels[tx.status]
    const amountClass = tx.type === 'encaissement' ? 'positive' : 'negative'
    const amountPrefix = tx.type === 'encaissement' ? '+' : '-'
    
    return `
      <tr>
        <td>${tx.reference}</td>
        <td>${tx.sender || tx.recipient || '-'}</td>
        <td>${methodLabels[tx.method] || tx.method}</td>
        <td class="${amountClass}">${amountPrefix}${formatCurrency(tx.amount)}</td>
        <td><span class="status ${status.class}">${status.label}</span></td>
        <td>${formatDate(tx.createdAt)}</td>
      </tr>
    `
  }).join('')

  const content = `
    <table>
      <thead>
        <tr>
          <th>Référence</th>
          <th>Client/Fournisseur</th>
          <th>Méthode</th>
          <th>Montant</th>
          <th>Statut</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p style="margin-top: 20px; color: #666;">
      Total: ${transactions.length} transaction(s)
    </p>
  `

  exportToPDF(title, content, 'transactions')
}

// Helper to download file
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
