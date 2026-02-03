import { Transaction } from '@/types'

// Prédiction de trésorerie avec régression linéaire simple
export function predictCashFlow(transactions: Transaction[], daysAhead: number = 7) {
  const dailyBalances = calculateDailyBalances(transactions)
  
  if (dailyBalances.length < 2) {
    return []
  }

  // Régression linéaire simple
  const n = dailyBalances.length
  const sumX = dailyBalances.reduce((sum, _, i) => sum + i, 0)
  const sumY = dailyBalances.reduce((sum, b) => sum + b.balance, 0)
  const sumXY = dailyBalances.reduce((sum, b, i) => sum + i * b.balance, 0)
  const sumX2 = dailyBalances.reduce((sum, _, i) => sum + i * i, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Générer prédictions
  const predictions = []
  for (let i = 0; i < daysAhead; i++) {
    const dayIndex = n + i
    const predictedBalance = slope * dayIndex + intercept
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.max(0, predictedBalance),
      confidence: Math.max(0, 1 - (i / daysAhead) * 0.5), // Confiance décroissante
    })
  }

  return predictions
}

function calculateDailyBalances(transactions: Transaction[]) {
  const balanceMap = new Map<string, number>()
  
  transactions.forEach((tx) => {
    const date = new Date(tx.createdAt).toISOString().split('T')[0]
    const current = balanceMap.get(date) || 0
    const amount = tx.type === 'encaissement' ? tx.amount : -tx.amount
    balanceMap.set(date, current + amount)
  })

  // Convertir en array et trier par date
  return Array.from(balanceMap.entries())
    .map(([date, balance]) => ({ date, balance }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Détection d'anomalies (transactions inhabituelles)
export function detectAnomalies(transactions: Transaction[]) {
  if (transactions.length < 10) return []

  const amounts = transactions.map(t => t.amount)
  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length
  const stdDev = Math.sqrt(variance)

  // Transactions > 2 écarts-types = anomalies
  const threshold = mean + 2 * stdDev

  return transactions.filter(t => t.amount > threshold).map(t => ({
    transaction: t,
    severity: t.amount > mean + 3 * stdDev ? 'high' : 'medium',
    reason: `Montant inhabituel: ${t.amount.toLocaleString()} XOF (moyenne: ${mean.toFixed(0)} XOF)`,
  }))
}

// Analyse des patterns de dépenses
export function analyzeSpendingPatterns(transactions: Transaction[]) {
  const paiements = transactions.filter(t => t.type === 'paiement')
  
  // Par méthode
  const byMethod = paiements.reduce((acc, t) => {
    acc[t.method] = (acc[t.method] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  // Par jour de la semaine
  const byDayOfWeek = paiements.reduce((acc, t) => {
    const day = new Date(t.createdAt).getDay()
    acc[day] = (acc[day] || 0) + t.amount
    return acc
  }, {} as Record<number, number>)

  // Tendance (croissante/décroissante)
  const recentPaiements = paiements.slice(-7)
  const olderPaiements = paiements.slice(-14, -7)
  const recentTotal = recentPaiements.reduce((sum, t) => sum + t.amount, 0)
  const olderTotal = olderPaiements.reduce((sum, t) => sum + t.amount, 0)
  const trend = olderTotal > 0 ? ((recentTotal - olderTotal) / olderTotal) * 100 : 0

  return {
    byMethod,
    byDayOfWeek,
    trend,
    averageDaily: recentTotal / 7,
  }
}

// Recommandations intelligentes
export function generateRecommendations(transactions: Transaction[]) {
  const recommendations = []
  const patterns = analyzeSpendingPatterns(transactions)
  const anomalies = detectAnomalies(transactions)

  // Recommandation sur les anomalies
  if (anomalies.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Transactions inhabituelles détectées',
      message: `${anomalies.length} transaction(s) avec des montants anormalement élevés`,
      action: 'Vérifier les transactions',
    })
  }

  // Recommandation sur la tendance
  if (patterns.trend > 20) {
    recommendations.push({
      type: 'info',
      title: 'Augmentation des dépenses',
      message: `Vos paiements ont augmenté de ${patterns.trend.toFixed(1)}% cette semaine`,
      action: 'Voir les détails',
    })
  }

  // Recommandation sur l'optimisation
  const methodCounts = Object.keys(patterns.byMethod).length
  if (methodCounts > 3) {
    recommendations.push({
      type: 'tip',
      title: 'Optimisez vos frais',
      message: 'Vous utilisez plusieurs méthodes de paiement. Consolidez pour réduire les frais.',
      action: 'Voir les suggestions',
    })
  }

  return recommendations
}
