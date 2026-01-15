export interface User {
  id: string
  name: string
  email: string
  company: string
  role: 'owner' | 'admin' | 'user'
}

export interface Transaction {
  id: string
  type: 'encaissement' | 'paiement'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  method: 'wave' | 'orange_money' | 'momo' | 'bank' | 'other'
  reference: string
  description: string
  createdAt: Date
  completedAt?: Date
  recipient?: string
  sender?: string
}

export interface Stats {
  totalEncaissements: number
  totalPaiements: number
  pendingTransactions: number
  completedToday: number
  volumeTotal: number
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'wallet' | 'bank'
  provider: string
  accountNumber: string
  isDefault: boolean
  isActive: boolean
}
