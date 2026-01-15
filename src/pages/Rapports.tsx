import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { 
  Download, 
  FileText, 
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  PieChart,
  BarChart3,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  File
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts'

const monthlyData = [
  { name: 'Jan', encaissements: 8500000, paiements: 5200000 },
  { name: 'Fév', encaissements: 9200000, paiements: 6100000 },
  { name: 'Mar', encaissements: 7800000, paiements: 4800000 },
  { name: 'Avr', encaissements: 10500000, paiements: 7200000 },
  { name: 'Mai', encaissements: 11200000, paiements: 8100000 },
  { name: 'Juin', encaissements: 12450000, paiements: 8230000 },
]

const methodDistribution = [
  { name: 'Wave', value: 45, color: '#0EA5E9' },
  { name: 'Orange Money', value: 30, color: '#F97316' },
  { name: 'Banque', value: 15, color: '#10B981' },
  { name: 'MoMo', value: 10, color: '#EAB308' },
]

const topClients = [
  { name: 'Boutique Awa', total: 2450000, transactions: 45 },
  { name: 'Restaurant Le Bon', total: 1890000, transactions: 32 },
  { name: 'Pharmacie Centrale', total: 1560000, transactions: 28 },
  { name: 'Supermarché Ndoye', total: 1230000, transactions: 24 },
  { name: 'Garage Auto Plus', total: 980000, transactions: 18 },
]

const initialReports = [
  { id: '1', name: 'Rapport mensuel - Juin 2026', date: '01/07/2026', type: 'Mensuel', format: 'PDF' },
  { id: '2', name: 'Rapport mensuel - Mai 2026', date: '01/06/2026', type: 'Mensuel', format: 'PDF' },
  { id: '3', name: 'Rapport trimestriel - T2 2026', date: '01/07/2026', type: 'Trimestriel', format: 'PDF' },
  { id: '4', name: 'Export comptable - Juin 2026', date: '01/07/2026', type: 'Comptable', format: 'Excel' },
]

const reportTypes = [
  { id: 'monthly', name: 'Rapport mensuel', desc: 'Résumé de toutes les transactions du mois', icon: Calendar },
  { id: 'quarterly', name: 'Rapport trimestriel', desc: 'Analyse détaillée sur 3 mois', icon: BarChart3 },
  { id: 'accounting', name: 'Export comptable', desc: 'Format compatible avec votre logiciel comptable', icon: FileSpreadsheet },
  { id: 'custom', name: 'Rapport personnalisé', desc: 'Choisissez vos propres critères', icon: FileText },
]

export function Rapports() {
  const [period, setPeriod] = useState('month')
  const [reports, setReports] = useState(initialReports)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showNewReportModal, setShowNewReportModal] = useState(false)
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [newReportType, setNewReportType] = useState('')

  const totalEncaissements = monthlyData.reduce((sum, m) => sum + m.encaissements, 0)
  const totalPaiements = monthlyData.reduce((sum, m) => sum + m.paiements, 0)
  const soldeNet = totalEncaissements - totalPaiements

  const handleExport = () => {
    // Simulate export
    setShowExportModal(false)
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  const handleCreateReport = () => {
    if (!newReportType) return
    
    const reportType = reportTypes.find(t => t.id === newReportType)
    const newReport = {
      id: Date.now().toString(),
      name: `${reportType?.name} - ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`,
      date: new Date().toLocaleDateString('fr-FR'),
      type: reportType?.name || 'Personnalisé',
      format: 'PDF'
    }
    
    setReports([newReport, ...reports])
    setShowNewReportModal(false)
    setNewReportType('')
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  const handleDownloadReport = () => {
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {showDownloadSuccess && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg animate-fade-up">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Téléchargement démarré !</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports</h1>
          <p className="text-muted-foreground">Analysez vos performances financières</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-xl border border-border/60 p-1">
            {(['week', 'month', 'quarter', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  period === p
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : p === 'quarter' ? 'Trimestre' : 'Année'}
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={() => setShowExportModal(true)}>
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Encaissements</p>
                <p className="text-xl font-bold">{formatCurrency(totalEncaissements)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +18.2% vs période précédente
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paiements</p>
                <p className="text-xl font-bold">{formatCurrency(totalPaiements)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <TrendingUp className="h-3 w-3" />
              +12.5% vs période précédente
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solde Net</p>
                <p className="text-xl font-bold text-emerald-600">+{formatCurrency(soldeNet)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +24.8% vs période précédente
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Évolution des flux</CardTitle>
            </div>
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
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
                <Bar dataKey="encaissements" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paiements" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <PieChart className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Par méthode</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPie>
                <Pie
                  data={methodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {methodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {methodDistribution.map((method) => (
                <div key={method.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: method.color }} />
                  <span className="text-xs text-muted-foreground">{method.name}</span>
                  <span className="text-xs font-medium ml-auto">{method.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top clients</CardTitle>
            <CardDescription>Vos meilleurs clients ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClients.map((client, index) => (
                <div key={client.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.transactions} transactions</p>
                  </div>
                  <p className="text-sm font-semibold">{formatCurrency(client.total)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generated Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Rapports générés</CardTitle>
              <CardDescription>Téléchargez vos rapports</CardDescription>
            </div>
            <Button size="sm" onClick={() => setShowNewReportModal(true)}>
              <FileText className="h-4 w-4" />
              Nouveau rapport
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                      {report.format === 'Excel' ? (
                        <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <File className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date} · {report.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDownloadReport()}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Modal */}
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exporter les données"
        description="Choisissez le format d'export"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'pdf', name: 'PDF', icon: File, color: 'text-red-500' },
                { id: 'excel', name: 'Excel', icon: FileSpreadsheet, color: 'text-emerald-600' },
                { id: 'csv', name: 'CSV', icon: FileText, color: 'text-blue-600' },
              ].map((format) => (
                <button
                  key={format.id}
                  onClick={() => setExportFormat(format.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    exportFormat === format.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <format.icon className={`h-8 w-8 ${format.color}`} />
                  <span className="text-sm font-medium">{format.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Période</label>
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" placeholder="Date début" />
              <Input type="date" placeholder="Date fin" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowExportModal(false)}>
              Annuler
            </Button>
            <Button className="flex-1" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>
      </Modal>

      {/* New Report Modal */}
      <Modal
        open={showNewReportModal}
        onClose={() => setShowNewReportModal(false)}
        title="Nouveau rapport"
        description="Générez un rapport personnalisé"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de rapport</label>
            <div className="space-y-2">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setNewReportType(type.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    newReportType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                    <type.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{type.name}</p>
                    <p className="text-xs text-muted-foreground">{type.desc}</p>
                  </div>
                  {newReportType === type.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowNewReportModal(false)}>
              Annuler
            </Button>
            <Button className="flex-1" onClick={handleCreateReport} disabled={!newReportType}>
              <FileText className="h-4 w-4" />
              Générer le rapport
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
