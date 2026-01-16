import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { 
  Alert, 
  AlertSettings, 
  TrendAnalysis, 
  TransactionPattern,
  FinancialInsight,
  OptimizationSuggestion,
  AnomalyDetection
} from '@/types/alerts'

interface AlertStore {
  // État
  alerts: Alert[]
  trendAnalysis: TrendAnalysis | null
  patterns: TransactionPattern[]
  insights: FinancialInsight[]
  optimizations: OptimizationSuggestion[]
  anomalies: AnomalyDetection[]
  settings: AlertSettings
  isLoading: boolean
  lastUpdated: Date | null

  // Actions
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt' | 'status'>) => void
  dismissAlert: (id: string) => void
  resolveAlert: (id: string) => void
  clearAllAlerts: () => void
  updateSettings: (settings: Partial<AlertSettings>) => void
  setTrendAnalysis: (analysis: TrendAnalysis) => void
  setPatterns: (patterns: TransactionPattern[]) => void
  setInsights: (insights: FinancialInsight[]) => void
  setOptimizations: (optimizations: OptimizationSuggestion[]) => void
  addAnomaly: (anomaly: AnomalyDetection) => void
  refreshAnalysis: () => Promise<void>
}

const defaultSettings: AlertSettings = {
  lowBalanceThreshold: 500000, // 500,000 XOF
  lowBalanceWarningDays: 3,
  enableAnomalyDetection: true,
  anomalySensitivity: 'medium',
  enableRecurringReminders: true,
  reminderDaysBefore: 2,
  enableInsights: true,
  enableOptimizations: true,
  notificationChannels: {
    push: true,
    email: true,
    sms: false,
  },
}

export const useAlertStore = create<AlertStore>()(
  persist(
    (set, get) => ({
      alerts: [],
      trendAnalysis: null,
      patterns: [],
      insights: [],
      optimizations: [],
      anomalies: [],
      settings: defaultSettings,
      isLoading: false,
      lastUpdated: null,

      addAlert: (alertData) => {
        const alert: Alert = {
          ...alertData,
          id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          createdAt: new Date(),
          status: 'active',
        }
        set((state) => ({ alerts: [alert, ...state.alerts] }))
      },

      dismissAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, status: 'dismissed' as const } : a
          ),
        }))
      },

      resolveAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, status: 'resolved' as const } : a
          ),
        }))
      },

      clearAllAlerts: () => {
        set({ alerts: [] })
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      setTrendAnalysis: (analysis) => {
        set({ trendAnalysis: analysis })
      },

      setPatterns: (patterns) => {
        set({ patterns })
      },

      setInsights: (insights) => {
        set({ insights })
      },

      setOptimizations: (optimizations) => {
        set({ optimizations })
      },

      addAnomaly: (anomaly) => {
        set((state) => ({ anomalies: [anomaly, ...state.anomalies] }))
      },

      refreshAnalysis: async () => {
        set({ isLoading: true })
        
        // Simulation d'analyse - en production, cela appellerait une API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        const { generateMockAnalysis } = await import('@/lib/alertAnalytics')
        const analysis = generateMockAnalysis()
        
        set({
          trendAnalysis: analysis.trendAnalysis,
          patterns: analysis.patterns,
          insights: analysis.insights,
          optimizations: analysis.optimizations,
          isLoading: false,
          lastUpdated: new Date(),
        })

        // Générer des alertes basées sur l'analyse
        const store = get()
        
        // Alerte solde faible
        if (analysis.trendAnalysis.daysUntilCritical !== null && 
            analysis.trendAnalysis.daysUntilCritical <= store.settings.lowBalanceWarningDays) {
          store.addAlert({
            type: 'cashflow',
            priority: analysis.trendAnalysis.daysUntilCritical <= 1 ? 'critical' : 'high',
            title: 'Solde critique prévu',
            message: `Votre solde atteindra le seuil critique dans ${analysis.trendAnalysis.daysUntilCritical} jour(s)`,
            details: `Solde projeté: ${analysis.trendAnalysis.projections[analysis.trendAnalysis.daysUntilCritical]?.projectedBalance.toLocaleString()} XOF`,
            actionLabel: 'Voir les détails',
            actionUrl: '/rapports',
          })
        }
      },
    }),
    {
      name: 'kaaro-alerts',
      partialize: (state) => ({ 
        settings: state.settings,
        alerts: state.alerts.filter(a => a.status === 'active')
      }),
    }
  )
)
