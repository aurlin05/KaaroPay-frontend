import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonCard, SkeletonChart } from '@/components/ui/Skeleton'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb,
  Calendar,
  Activity,
  Target,
  ArrowRight,
  Zap
} from 'lucide-react'
import { 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { formatCurrency } from '@/lib/utils'
import { predictCashFlow, detectAnomalies, analyzeSpendingPatterns, generateRecommendations } from '@/lib/analytics'

// Mock data - à remplacer par vraies données
const mockTransactions = [
  { id: '1', type: 'encaissement', amount: 125000, method: 'wave', createdAt: new Date('2026-02-01') },
  { id: '2', type: 'paiement', amount: 75000, method: 'orange_money', createdAt: new Date('2026-02-01') },
  { id: '3', type: 'encaissement', amount: 200000, method: 'bank', createdAt: new Date('2026-02-02') },
  { id: '4', type: 'paiement', amount: 50000, method: 'momo', createdAt: new Date('2026-02-02') },
  { id: '5', type: 'encaissement', amount: 350000, method: 'wave', createdAt: new Date('2026-02-03') },
  { id: '6', type: 'paiement', amount: 180000, method: 'bank', createdAt: new Date('2026-02-03') },
  { id: '7', type: 'encaissement', amount: 95000, method: 'orange_money', createdAt: new Date('2026-02-04') },
  { id: '8', type: 'paiement', amount: 250000, method: 'bank', createdAt: new Date('2026-02-04') },
  { id: '9', type: 'encaissement', amount: 45000, method: 'momo', createdAt: new Date('2026-02-05') },
  { id: '10', type: 'paiement', amount: 320000, method: 'wave', createdAt: new Date('2026-02-05') },
  { id: '11', type: 'encaissement', amount: 1500000, method: 'bank', createdAt: new Date('2026-02-06') }, // Anomalie
] as any[]

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

export function Analytics() {
  const [loading, setLoading] = useState(true)
  const [predictions, setPredictions] = useState<any[]>([])
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [patterns, setPatterns] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const cashFlowPredictions = predictCashFlow(mockTransactions, 7)
      const detectedAnomalies = detectAnomalies(mockTransactions)
      const spendingPatterns = analyzeSpendingPatterns(mockTransactions)
      const smartRecommendations = generateRecommendations(mockTransactions)

      setPredictions(cashFlowPredictions)
      setAnomalies(detectedAnomalies)
      setPatterns(spendingPatterns)
      setRecommendations(smartRecommendations)
      setLoading(false)
    }, 1500)
  }, [])

  // Préparer les données pour les graphiques
  const methodData = patterns ? Object.entries(patterns.byMethod).map(([method, amount]) => ({
    name: method,
    value: amount as number
  })) : []

  const dayOfWeekData = patterns ? Object.entries(patterns.byDayOfWeek).map(([day, amount]) => ({
    day: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][Number(day)],
    amount: amount as number
  })) : []

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Prévisions</h1>
          <p className="text-muted-foreground">Intelligence artificielle et insights avancés</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card><CardContent className="p-6"><SkeletonChart /></CardContent></Card>
          <Card><CardContent className="p-6"><SkeletonChart /></CardContent></Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Prévisions</h1>
          <p className="text-muted-foreground">Intelligence artificielle et insights avancés</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4" />
          Derniers 30 jours
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {patterns?.trend > 0 ? '+' : ''}{patterns?.trend.toFixed(1)}%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{formatCurrency(patterns?.averageDaily || 0)}</p>
              <p className="text-sm text-muted-foreground mt-1">Dépenses moyennes/jour</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600">
                {predictions.length} jours
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{formatCurrency(predictions[0]?.predicted || 0)}</p>
              <p className="text-sm text-muted-foreground mt-1">Prévision demain</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xs font-medium text-amber-600">
                {anomalies.length} détectée(s)
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{anomalies.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Anomalies</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Target className="h-5 w-5 text-violet-600" />
              </div>
              <span className="text-xs font-medium text-violet-600">
                {recommendations.length} conseil(s)
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{recommendations.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Recommandations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Recommandations intelligentes
            </CardTitle>
            <CardDescription>Insights basés sur l'analyse de vos transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 ${
                  rec.type === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
                  rec.type === 'info' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                  'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  rec.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/40' :
                  rec.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/40' :
                  'bg-emerald-100 dark:bg-emerald-900/40'
                }`}>
                  {rec.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-amber-600" /> :
                   rec.type === 'info' ? <Activity className="h-4 w-4 text-blue-600" /> :
                   <Zap className="h-4 w-4 text-emerald-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rec.message}</p>
                </div>
                <Button variant="ghost" size="sm">
                  {rec.action}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cash Flow Prediction */}
        <Card>
          <CardHeader>
            <CardTitle>Prévision de trésorerie (7 jours)</CardTitle>
            <CardDescription>Prédiction basée sur l'historique récent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictions}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Prévision']}
                  labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fill="url(#colorPredicted)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Confiance:</span> {(predictions[0]?.confidence * 100).toFixed(0)}% - 
                Basé sur {mockTransactions.length} transactions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Spending by Method */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par méthode</CardTitle>
            <CardDescription>Distribution de vos paiements</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {methodData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending by Day of Week */}
        <Card>
          <CardHeader>
            <CardTitle>Dépenses par jour de la semaine</CardTitle>
            <CardDescription>Identifiez vos patterns hebdomadaires</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayOfWeekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(v) => `${(v/1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Montant']}
                />
                <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Anomalies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Transactions inhabituelles
            </CardTitle>
            <CardDescription>Détection automatique d'anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            {anomalies.length === 0 ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-foreground">Aucune anomalie détectée</p>
                <p className="text-xs text-muted-foreground mt-1">Toutes vos transactions semblent normales</p>
              </div>
            ) : (
              <div className="space-y-3">
                {anomalies.map((anomaly, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      anomaly.severity === 'high' ? 'bg-red-100 dark:bg-red-900/40' : 'bg-amber-100 dark:bg-amber-900/40'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        anomaly.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {formatCurrency(anomaly.transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{anomaly.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {anomaly.transaction.description} - {new Date(anomaly.transaction.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse de tendance</CardTitle>
          <CardDescription>Évolution de vos dépenses sur la période</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className={`inline-flex h-20 w-20 rounded-2xl items-center justify-center mb-4 ${
                patterns?.trend > 0 ? 'bg-red-100 dark:bg-red-900/20' : 'bg-emerald-100 dark:bg-emerald-900/20'
              }`}>
                {patterns?.trend > 0 ? (
                  <TrendingUp className="h-10 w-10 text-red-600" />
                ) : (
                  <TrendingDown className="h-10 w-10 text-emerald-600" />
                )}
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">
                {patterns?.trend > 0 ? '+' : ''}{patterns?.trend.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {patterns?.trend > 0 ? 'Augmentation' : 'Diminution'} des dépenses cette semaine
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
