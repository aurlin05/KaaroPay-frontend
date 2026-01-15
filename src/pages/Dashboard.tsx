import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const stats = [
  {
    name: 'Total Encaissements',
    value: 12450000,
    icon: ArrowDownRight,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Total Paiements',
    value: 8230000,
    icon: ArrowUpRight,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'En attente',
    value: 450000,
    icon: Clock,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: "Complétés aujourd'hui",
    value: 1850000,
    icon: CheckCircle2,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

const chartData = [
  { name: 'Lun', encaissements: 400000, paiements: 240000 },
  { name: 'Mar', encaissements: 300000, paiements: 139000 },
  { name: 'Mer', encaissements: 200000, paiements: 980000 },
  { name: 'Jeu', encaissements: 278000, paiements: 390000 },
  { name: 'Ven', encaissements: 189000, paiements: 480000 },
  { name: 'Sam', encaissements: 239000, paiements: 380000 },
  { name: 'Dim', encaissements: 349000, paiements: 430000 },
]

const recentTransactions = [
  {
    id: '1',
    type: 'encaissement' as const,
    amount: 125000,
    method: 'Wave',
    status: 'completed' as const,
    time: '2 min',
  },
  {
    id: '2',
    type: 'paiement' as const,
    amount: 75000,
    method: 'Orange Money',
    status: 'completed' as const,
    time: '15 min',
  },
  {
    id: '3',
    type: 'encaissement' as const,
    amount: 200000,
    method: 'Banque',
    status: 'pending' as const,
    time: '1h',
  },
  {
    id: '4',
    type: 'paiement' as const,
    amount: 50000,
    method: 'MoMo',
    status: 'completed' as const,
    time: '2h',
  },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de vos transactions et paiements
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stat.value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité de la semaine</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Bar dataKey="encaissements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paiements" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        transaction.type === 'encaissement'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {transaction.type === 'encaissement' ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.method}</p>
                      <p className="text-xs text-muted-foreground">Il y a {transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {transaction.type === 'encaissement' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p
                      className={`text-xs ${
                        transaction.status === 'completed'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
