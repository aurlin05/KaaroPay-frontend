import { create } from 'zustand'
import { Transaction } from '@/types'

interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
  pendingUpdates: Map<string, Transaction>
  
  // Actions
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => Promise<void>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  
  // Optimistic helpers
  applyOptimisticUpdate: (id: string, transaction: Transaction) => void
  rollbackOptimisticUpdate: (id: string) => void
  clearError: () => void
}

// Simulate API delay
const simulateApi = <T>(data: T, shouldFail = false): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Erreur de connexion au serveur'))
      } else {
        resolve(data)
      }
    }, 800)
  })
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  pendingUpdates: new Map(),

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: async (transaction) => {
    const { transactions, applyOptimisticUpdate, rollbackOptimisticUpdate } = get()
    
    // Optimistic update - add immediately
    applyOptimisticUpdate(transaction.id, transaction)
    set({ transactions: [...transactions, transaction], isLoading: true, error: null })

    try {
      // Simulate API call
      await simulateApi(transaction)
      
      // Success - remove from pending
      const newPending = new Map(get().pendingUpdates)
      newPending.delete(transaction.id)
      set({ pendingUpdates: newPending, isLoading: false })
    } catch (error) {
      // Rollback on failure
      rollbackOptimisticUpdate(transaction.id)
      set({ 
        transactions: transactions, // Restore original
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  },

  updateTransaction: async (id, updates) => {
    const { transactions, applyOptimisticUpdate, rollbackOptimisticUpdate } = get()
    const original = transactions.find(t => t.id === id)
    
    if (!original) return

    const updated = { ...original, ...updates }
    
    // Optimistic update
    applyOptimisticUpdate(id, original) // Store original for rollback
    set({ 
      transactions: transactions.map(t => t.id === id ? updated : t),
      isLoading: true,
      error: null
    })

    try {
      await simulateApi(updated)
      
      const newPending = new Map(get().pendingUpdates)
      newPending.delete(id)
      set({ pendingUpdates: newPending, isLoading: false })
    } catch (error) {
      // Rollback
      rollbackOptimisticUpdate(id)
      set({ 
        transactions: transactions,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  },

  deleteTransaction: async (id) => {
    const { transactions, applyOptimisticUpdate, rollbackOptimisticUpdate } = get()
    const original = transactions.find(t => t.id === id)
    
    if (!original) return

    // Optimistic delete
    applyOptimisticUpdate(id, original)
    set({ 
      transactions: transactions.filter(t => t.id !== id),
      isLoading: true,
      error: null
    })

    try {
      await simulateApi(null)
      
      const newPending = new Map(get().pendingUpdates)
      newPending.delete(id)
      set({ pendingUpdates: newPending, isLoading: false })
    } catch (error) {
      // Rollback - restore deleted item
      rollbackOptimisticUpdate(id)
      set({ 
        transactions: transactions,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    }
  },

  applyOptimisticUpdate: (id, transaction) => {
    const newPending = new Map(get().pendingUpdates)
    newPending.set(id, transaction)
    set({ pendingUpdates: newPending })
  },

  rollbackOptimisticUpdate: (id) => {
    const { pendingUpdates, transactions } = get()
    const original = pendingUpdates.get(id)
    
    if (original) {
      // Check if it was an add (not in original list) or update
      const wasAdd = !transactions.some(t => t.id === id && t !== original)
      
      const newPending = new Map(pendingUpdates)
      newPending.delete(id)
      
      if (wasAdd) {
        // Remove the optimistically added item
        set({ 
          transactions: transactions.filter(t => t.id !== id),
          pendingUpdates: newPending
        })
      } else {
        // Restore original values
        set({ 
          transactions: transactions.map(t => t.id === id ? original : t),
          pendingUpdates: newPending
        })
      }
    }
  },

  clearError: () => set({ error: null }),
}))
