import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAlertStore } from '@/stores/alertStore'
import { formatCurrency } from '@/lib/utils'
import { formatRelativeDate, calculateHealthScore } from '@/lib/alertAnalytics'
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Bell,
  ChevronRight,
  Zap,
  Calendar,
  Shield,
  RefreshCw,
  X,
  Lightbulb,
  ArrowRight,
  Activity,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

// Composant pour le graphique de projection de trésorerie
function CashFlowChart() {
  const { trendAnalysis } = useAlertStore()

  if (!trendAnalysis) return null

  const data = trendAnalysis.projections.slice(0, 14).map((p) => ({
    date: p.date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    balance: p.projectedBalance,
    isRisk: p.isRiskZone,
  }))

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [formatCurrency(value), 'Solde projeté']}
          />
          <ReferenceLine
            y={trendAnalysis.criticalThreshold}
            stroke="rgb(239, 68, 68)"
            strokeDasharray="5 5"
            label={{ value: 'Seuil critique', fontSize: 10, fill: 'rgb(239, 68, 68)' }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="rgb(16, 185, 129)"
            fill="url(#balanceGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}


// Composant pour afficher le score de santé financière
function HealthScoreIndicator() {
  const { trendAnalysis } = useAlertStore()

  if (!trendAnalysis) return null

  const score = calculateHealthScore(trendAnalysis)
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500'
    if (s >= 60) return 'text-yellow-500'
    if (s >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Excellent'
    if (s >= 60) return 'Bon'
    if (s >= 40) return 'Attention'
    return 'Critique'
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/50">
      <div className="relative h-16 w-16">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted/30"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            className={getScoreColor(score)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Santé financière</p>
        <p className={`text-lg font-semibold ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
      </div>
    </div>
  )
}

// Composant pour les alertes actives
function ActiveAlerts() {
  const { alerts, dismissAlert } = useAlertStore()
  const activeAlerts = alerts.filter((a) => a.status === 'active').slice(0, 3)

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10'
      case 'high':
        return 'border-orange-500/50 bg-orange-500/10'
      case 'medium':
        return 'border-yellow-500/50 bg-yellow-500/10'
      default:
        return 'border-blue-500/50 bg-blue-500/10'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Bell className="h-4 w-4 text-yellow-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-blue-500" />
    }
  }

  if (activeAlerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>Aucune alerte active</p>
        <p className="text-sm">Tout va bien !</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-3 rounded-lg border ${getPriorityStyles(alert.priority)} transition-all hover:shadow-md`}
        >
          <div className="flex items-start gap-3">
            {getPriorityIcon(alert.priority)}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground">{alert.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
              {alert.actionLabel && alert.actionUrl && (
                <Link
                  to={alert.actionUrl}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                >
                  {alert.actionLabel}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="p-1 hover:bg-accent rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}


// Composant pour les patterns de transactions
function TransactionPatterns() {
  const { patterns } = useAlertStore()
  const upcomingPatterns = patterns.slice(0, 3)

  if (upcomingPatterns.length === 0) return null

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Calendar className="h-4 w-4 text-primary" />
        Paiements à venir
      </h4>
      {upcomingPatterns.map((pattern) => (
        <div
          key={pattern.id}
          className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                pattern.category === 'expense' ? 'bg-red-500/10' : 'bg-emerald-500/10'
              }`}
            >
              {pattern.category === 'expense' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{pattern.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeDate(pattern.nextExpectedDate)} · {pattern.method}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-semibold ${
                pattern.category === 'expense' ? 'text-red-500' : 'text-emerald-500'
              }`}
            >
              {pattern.category === 'expense' ? '-' : '+'}
              {formatCurrency(pattern.averageAmount)}
            </p>
            <p className="text-xs text-muted-foreground">{pattern.confidence}% confiance</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Composant pour les insights financiers
function FinancialInsights() {
  const { insights } = useAlertStore()
  const topInsights = insights.slice(0, 2)

  if (topInsights.length === 0) return null

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'growth':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'decline':
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'opportunity':
        return <Zap className="h-4 w-4 text-blue-500" />
      case 'achievement':
        return <Activity className="h-4 w-4 text-purple-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-primary" />
        Insights
      </h4>
      {topInsights.map((insight) => (
        <div
          key={insight.id}
          className="p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
        >
          <div className="flex items-start gap-3">
            {getInsightIcon(insight.type)}
            <div>
              <p className="text-sm font-medium text-foreground">{insight.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs font-medium ${
                    insight.changePercent >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}
                >
                  {insight.changePercent >= 0 ? '+' : ''}
                  {insight.changePercent}%
                </span>
                <span className="text-xs text-muted-foreground">{insight.period}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


// Composant principal du widget d'alertes
export function AlertsWidget() {
  const { isLoading, lastUpdated, refreshAnalysis, trendAnalysis } = useAlertStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'insights'>('overview')

  useEffect(() => {
    // Charger l'analyse au montage si pas de données
    if (!trendAnalysis) {
      refreshAnalysis()
    }
  }, [trendAnalysis, refreshAnalysis])

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Alertes intelligentes
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refreshAnalysis()}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground">
            Mis à jour {lastUpdated.toLocaleTimeString('fr-FR')}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-accent/50 rounded-lg">
          {[
            { id: 'overview', label: 'Aperçu' },
            { id: 'alerts', label: 'Alertes' },
            { id: 'insights', label: 'Insights' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <HealthScoreIndicator />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Projection de trésorerie (14 jours)
                  </h4>
                  <CashFlowChart />
                </div>
                {trendAnalysis && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Tendance</p>
                      <p className="text-lg font-semibold flex items-center gap-1">
                        {trendAnalysis.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        ) : trendAnalysis.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <Activity className="h-4 w-4 text-yellow-500" />
                        )}
                        <span
                          className={
                            trendAnalysis.trend === 'up'
                              ? 'text-emerald-500'
                              : trendAnalysis.trend === 'down'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                          }
                        >
                          {trendAnalysis.trendPercentage > 0 ? '+' : ''}
                          {trendAnalysis.trendPercentage}%
                        </span>
                      </p>
                    </div>
                    {trendAnalysis.daysUntilCritical !== null && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Seuil critique dans</p>
                        <p className="text-lg font-semibold text-red-500">
                          {trendAnalysis.daysUntilCritical} jour(s)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-4">
                <ActiveAlerts />
                <TransactionPatterns />
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-4">
                <FinancialInsights />
                <Link
                  to="/rapports"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border hover:border-primary hover:bg-accent/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  Voir tous les rapports
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
