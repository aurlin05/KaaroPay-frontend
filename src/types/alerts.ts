// Types pour le système d'alertes intelligent

export type AlertPriority = 'low' | 'medium' | 'high' | 'critical'
export type AlertCategory = 'cashflow' | 'anomaly' | 'reminder' | 'optimization' | 'insight'
export type AlertStatus = 'active' | 'dismissed' | 'resolved'

export interface Alert {
  id: string
  type: AlertCategory
  priority: AlertPriority
  title: string
  message: string
  details?: string
  actionLabel?: string
  actionUrl?: string
  createdAt: Date
  expiresAt?: Date
  status: AlertStatus
  metadata?: Record<string, unknown>
}

export interface CashFlowProjection {
  date: Date
  projectedBalance: number
  inflows: number
  outflows: number
  isRiskZone: boolean
  confidence: number // 0-100
}

export interface TrendAnalysis {
  period: '7d' | '14d' | '30d'
  projections: CashFlowProjection[]
  criticalThreshold: number
  daysUntilCritical: number | null
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
}

export interface TransactionPattern {
  id: string
  name: string
  type: 'recurring' | 'seasonal' | 'one-time'
  category: 'income' | 'expense'
  averageAmount: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  nextExpectedDate: Date
  method: string
  confidence: number
}

export interface AnomalyDetection {
  transactionId?: string
  type: 'unusual_amount' | 'unusual_frequency' | 'unusual_time' | 'unusual_recipient'
  severity: AlertPriority
  description: string
  expectedValue?: number
  actualValue?: number
  deviation: number // pourcentage d'écart
}

export interface FinancialInsight {
  id: string
  type: 'growth' | 'decline' | 'opportunity' | 'warning' | 'achievement'
  title: string
  description: string
  metric: string
  value: number
  previousValue: number
  changePercent: number
  period: string
  icon: string
}

export interface OptimizationSuggestion {
  id: string
  title: string
  description: string
  potentialSavings: number
  category: 'fees' | 'timing' | 'method' | 'consolidation'
  difficulty: 'easy' | 'medium' | 'hard'
  impact: 'low' | 'medium' | 'high'
}

export interface AlertSettings {
  lowBalanceThreshold: number
  lowBalanceWarningDays: number
  enableAnomalyDetection: boolean
  anomalySensitivity: 'low' | 'medium' | 'high'
  enableRecurringReminders: boolean
  reminderDaysBefore: number
  enableInsights: boolean
  enableOptimizations: boolean
  notificationChannels: {
    push: boolean
    email: boolean
    sms: boolean
  }
}
