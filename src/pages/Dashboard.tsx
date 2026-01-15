import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  TrendingUp,
  TrendingDown,
  Wallet,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const stats = [
  {
    name: 'Encaissements',
    value: 12450000,
    icon: ArrowDownLeft,
    color: 'emerald',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    name: 'Paiements',
    value: 8230000,
    icon: ArrowUpRight,
    color: 'blue',
    trend: '+8.2%',
    trendUp: true,
  },
  {
    name: 'En attente',
    value: 450000,
    icon: Clock,
    color: 'amber',
    trend: '-3.1%',
    trendUp: false,
  },
  {
    name: 'Solde total',
    value: 4220000,
    icon: Wallet,
    color: 'violet',
    trend: '+24.3%',
    trendUp: true,
  },
]

const chartData = [
  { name: 'Lun', encaissements: 2400000, paiements: 1400000 },
  { name: 'Mar', encaissements: 1800000, paiements: 980000 },
  { name: 'Mer', encaissements: 2800000, paiements: 1600000 },
  { name: 'Jeu', encaissements: 2200000, paiements: 1900000 },
  { name: 'Ven', encaissements: 3100000, paiements: 2100000 },
  { name: 'Sam', encaissements: 1500000, paiements: 800000 },
  { name: 'Dim', encaissements: 900000, paiements: 450000 },
]

const recentTransactions = [
  { id: '1', type: 'encaissement', amount: 125000, method: 'Wave', client: 'Boutique Awa', time: '2 min' },
  { id: '2', type: 'paiement', amount: 75000, method: 'Orange Money', client: 'Fournisseur ABC', time: '15 min' },
  { id: '3', type: 'encaissement', amount: 200000, method: 'Banque', client: 'Client DEF', time: '1h' },
  { id: '4', type: 'paiement', amount: 50000, method: 'MoMo', client: 'Prestataire XYZ', time: '2h' },
  { id: '5', type: 'encaissement', amount: 350000, method: 'Wave', client: 'Restaurant Le Bon', time: '3h' },
]

const connectedAccounts = [
  { name: 'Wave Business', balance: 2450000, color: 'bg-wave' },
  { name: 'Orange Money', balance: 1230000, color: 'bg-orange' },
  { name: 'Compte Bancaire', balance: 540000, color: 'bg-emerald-500' },
]

const colorClasses = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600' },
}

export function Dashboard() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => ({ ...s, displayValue: 0 })))

  useEffect(() => {
    const duration = 1000
    const steps = 60
    
    stats.forEach((stat, index) => {
      const increment = stat.value / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setAnimatedStats(prev => {
            const newStats = [...prev]
            newStats[index] = { ...stat, displayValue: Math.round(increment * currentStep) }
            return newStats
          })
        } else {
          clearInterval(timer)
        }
      }, duration / steps)
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité financière</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {animatedStats.map((stat) => {
          const colors = colorClasses[stat.color as keyof typeof colorClasses]
          return (
            <Card key={stat.name} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                    <stat.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(stat.displayValue)}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts & Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Activité de la semaine</CardTitle>
            <Link to="/rapports" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">Encaissements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Paiements</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEnc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="encaissements" stroke="#10B981" strokeWidth={2} fill="url(#colorEnc)" />
                <Area type="monotone" dataKey="paiements" stroke="#3B82F6" strokeWidth={2} fill="url(#colorPay)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Comptes connectés</CardTitle>
            <Link to="/comptes" className="text-sm text-primary font-medium hover:underline">
              Gérer
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedAccounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${account.color} flex items-center justify-center`}>
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">Actif</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(account.balance)}</p>
              </div>
            ))}
            <Link 
              to="/comptes" 
              className="block w-full py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-colors text-center"
            >
              + Ajouter un compte
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Transactions récentes</CardTitle>
          <Link to="/transactions" className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <Link 
                key={tx.id} 
                to="/transactions"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'encaissement' ? 'bg-emerald-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'encaissement' 
                      ? <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                      : <ArrowUpRight className="h-5 w-5 text-blue-600" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.client}</p>
                    <p className="text-xs text-muted-foreground">{tx.method} · Il y a {tx.time}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'encaissement' ? 'text-emerald-600' : 'text-foreground'}`}>
                  {tx.type === 'encaissement' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
