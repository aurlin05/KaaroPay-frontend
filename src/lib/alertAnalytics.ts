import type { 
  TrendAnalysis, 
  CashFlowProjection, 
  TransactionPattern,
  FinancialInsight,
  OptimizationSuggestion,
  AnomalyDetection
} from '@/types/alerts'

// Données simulées pour les transactions historiques
const historicalData = {
  dailyInflows: [2400000, 1800000, 2800000, 2200000, 3100000, 1500000, 900000],
  dailyOutflows: [1400000, 980000, 1600000, 1900000, 2100000, 800000, 450000],
  currentBalance: 4220000,
}

// Calcul de la moyenne mobile
function movingAverage(data: number[], window: number): number {
  const slice = data.slice(-window)
  return slice.reduce((a, b) => a + b, 0) / slice.length
}

// Génération des projections de trésorerie
export function generateCashFlowProjections(
  days: number,
  criticalThreshold: number
): CashFlowProjection[] {
  const projections: CashFlowProjection[] = []
  let balance = historicalData.currentBalance
  
  const avgInflow = movingAverage(historicalData.dailyInflows, 7)
  const avgOutflow = movingAverage(historicalData.dailyOutflows, 7)
  
  // Ajouter de la variance pour plus de réalisme
  const variance = 0.15

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    // Variation basée sur le jour de la semaine (weekend = moins d'activité)
    const dayOfWeek = date.getDay()
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.4 : 1
    
    const randomVariance = 1 + (Math.random() - 0.5) * variance
    const inflows = Math.round(avgInflow * weekendFactor * randomVariance)
    const outflows = Math.round(avgOutflow * weekendFactor * randomVariance)
    
    balance = balance + inflows - outflows
    
    // Confidence diminue avec le temps
    const confidence = Math.max(50, 95 - i * 2)
    
    projections.push({
      date,
      projectedBalance: Math.max(0, balance),
      inflows,
      outflows,
      isRiskZone: balance < criticalThreshold,
      confidence,
    })
  }
  
  return projections
}

// Détection des patterns de transactions récurrentes
export function detectTransactionPatterns(): TransactionPattern[] {
  return [
    {
      id: 'pattern-1',
      name: 'Loyer bureau',
      type: 'recurring',
      category: 'expense',
      averageAmount: 350000,
      frequency: 'monthly',
      nextExpectedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      method: 'Banque',
      confidence: 95,
    },
    {
      id: 'pattern-2',
      name: 'Salaires employés',
      type: 'recurring',
      category: 'expense',
      averageAmount: 1200000,
      frequency: 'monthly',
      nextExpectedDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      method: 'Banque',
      confidence: 98,
    },
    {
      id: 'pattern-3',
      name: 'Fournisseur ABC',
      type: 'recurring',
      category: 'expense',
      averageAmount: 450000,
      frequency: 'weekly',
      nextExpectedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      method: 'Wave',
      confidence: 85,
    },
    {
      id: 'pattern-4',
      name: 'Client régulier - Boutique Awa',
      type: 'recurring',
      category: 'income',
      averageAmount: 180000,
      frequency: 'weekly',
      nextExpectedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      method: 'Wave',
      confidence: 78,
    },
  ]
}

// Génération des insights financiers
export function generateFinancialInsights(): FinancialInsight[] {
  return [
    {
      id: 'insight-1',
      type: 'growth',
      title: 'Encaissements Orange Money en hausse',
      description: 'Vos encaissements via Orange Money ont augmenté de 23% ce mois par rapport au mois dernier.',
      metric: 'Orange Money',
      value: 3250000,
      previousValue: 2642000,
      changePercent: 23,
      period: 'ce mois',
      icon: 'TrendingUp',
    },
    {
      id: 'insight-2',
      type: 'warning',
      title: 'Dépenses inhabituellement élevées',
      description: 'Attention : vos dépenses cette semaine sont 45% plus élevées que la moyenne.',
      metric: 'Dépenses hebdo',
      value: 4850000,
      previousValue: 3345000,
      changePercent: 45,
      period: 'cette semaine',
      icon: 'AlertTriangle',
    },
    {
      id: 'insight-3',
      type: 'opportunity',
      title: 'Pic d\'activité détecté',
      description: 'Vos vendredis génèrent 35% de revenus en plus. Optimisez votre stock pour ces jours.',
      metric: 'Revenus vendredi',
      value: 3100000,
      previousValue: 2300000,
      changePercent: 35,
      period: 'vendredis',
      icon: 'Zap',
    },
    {
      id: 'insight-4',
      type: 'achievement',
      title: 'Objectif mensuel atteint',
      description: 'Félicitations ! Vous avez dépassé votre objectif d\'encaissements de 12%.',
      metric: 'Encaissements',
      value: 12450000,
      previousValue: 11100000,
      changePercent: 12,
      period: 'ce mois',
      icon: 'Trophy',
    },
  ]
}

// Suggestions d'optimisation
export function generateOptimizationSuggestions(): OptimizationSuggestion[] {
  return [
    {
      id: 'opt-1',
      title: 'Consolidez vos transferts Wave',
      description: 'Regrouper vos 12 petits transferts quotidiens en 2 transferts réduirait vos frais de 40%.',
      potentialSavings: 15000,
      category: 'consolidation',
      difficulty: 'easy',
      impact: 'medium',
    },
    {
      id: 'opt-2',
      title: 'Changez de méthode pour les gros montants',
      description: 'Pour les paiements > 500,000 XOF, le virement bancaire coûte 60% moins cher que Wave.',
      potentialSavings: 45000,
      category: 'method',
      difficulty: 'medium',
      impact: 'high',
    },
    {
      id: 'opt-3',
      title: 'Optimisez le timing des paiements',
      description: 'Payer vos fournisseurs le lundi plutôt que le vendredi évite les frais de weekend.',
      potentialSavings: 8500,
      category: 'timing',
      difficulty: 'easy',
      impact: 'low',
    },
  ]
}

// Détection d'anomalies
export function detectAnomalies(): AnomalyDetection[] {
  return [
    {
      type: 'unusual_amount',
      severity: 'medium',
      description: 'Transaction de 750,000 XOF vers un nouveau bénéficiaire - 3x la moyenne habituelle',
      expectedValue: 250000,
      actualValue: 750000,
      deviation: 200,
    },
  ]
}

// Fonction principale pour générer toute l'analyse
export function generateMockAnalysis() {
  const criticalThreshold = 500000
  const projections = generateCashFlowProjections(30, criticalThreshold)
  
  // Trouver le jour où le solde devient critique
  const criticalDay = projections.findIndex(p => p.isRiskZone)
  
  // Calculer la tendance
  const firstWeekAvg = projections.slice(0, 7).reduce((a, b) => a + b.projectedBalance, 0) / 7
  const lastWeekAvg = projections.slice(-7).reduce((a, b) => a + b.projectedBalance, 0) / 7
  const trendPercentage = ((lastWeekAvg - firstWeekAvg) / firstWeekAvg) * 100

  const trendAnalysis: TrendAnalysis = {
    period: '30d',
    projections,
    criticalThreshold,
    daysUntilCritical: criticalDay === -1 ? null : criticalDay,
    trend: trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'stable',
    trendPercentage: Math.round(trendPercentage * 10) / 10,
  }

  return {
    trendAnalysis,
    patterns: detectTransactionPatterns(),
    insights: generateFinancialInsights(),
    optimizations: generateOptimizationSuggestions(),
    anomalies: detectAnomalies(),
  }
}

// Formater les dates relatives
export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Demain'
  if (diffDays < 7) return `Dans ${diffDays} jours`
  if (diffDays < 14) return 'La semaine prochaine'
  return `Dans ${Math.ceil(diffDays / 7)} semaines`
}

// Calculer le score de santé financière
export function calculateHealthScore(analysis: TrendAnalysis): number {
  let score = 100
  
  // Pénalité si tendance négative
  if (analysis.trend === 'down') {
    score -= Math.min(30, Math.abs(analysis.trendPercentage))
  }
  
  // Pénalité si proche du seuil critique
  if (analysis.daysUntilCritical !== null) {
    if (analysis.daysUntilCritical <= 3) score -= 40
    else if (analysis.daysUntilCritical <= 7) score -= 25
    else if (analysis.daysUntilCritical <= 14) score -= 15
  }
  
  return Math.max(0, Math.min(100, score))
}
