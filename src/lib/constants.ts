export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export const PI_SPI_ENDPOINT = import.meta.env.VITE_PI_SPI_ENDPOINT || 'https://api-sandbox.pi-spi.bceao.int'

export const PAYMENT_METHODS = {
  WAVE: 'wave',
  ORANGE_MONEY: 'orange_money',
  MOMO: 'momo',
  BANK: 'bank',
  OTHER: 'other',
} as const

export const TRANSACTION_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const

export const TRANSACTION_TYPES = {
  ENCAISSEMENT: 'encaissement',
  PAIEMENT: 'paiement',
} as const

export const CURRENCY = 'XOF'

export const APP_NAME = 'KaaroPay'
export const APP_DESCRIPTION = 'Orchestrateur de paiements interopérables PI-SPI'
export const APP_VERSION = '1.0.0'
