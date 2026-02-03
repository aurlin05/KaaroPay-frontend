import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Confetti } from '@/components/ui/Confetti'
import { useToastStore } from '@/stores/toastStore'
import { 
  Send, 
  User, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Plus,
  Trash2,
  Upload
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const paymentMethods = [
  { id: 'wave', name: 'Wave', color: 'bg-blue-500', balance: 2450000, logo: '🌊', piSpi: false },
  { id: 'orange', name: 'Orange Money', color: 'bg-orange-500', balance: 1230000, logo: '🟠', piSpi: true },
  { id: 'free', name: 'Free Money', color: 'bg-red-500', balance: 890000, logo: '🔴', piSpi: true },
  { id: 'emoney', name: 'e-Money', color: 'bg-purple-500', balance: 1560000, logo: '💜', piSpi: true },
  { id: 'wizall', name: 'Wizall Money', color: 'bg-green-500', balance: 780000, logo: '💚', piSpi: true },
  { id: 'yup', name: 'YUP', color: 'bg-yellow-500', balance: 340000, logo: '💛', piSpi: true },
  { id: 'cbao', name: 'CBAO', color: 'bg-teal-600', balance: 5670000, logo: '🏦', piSpi: true },
  { id: 'boa', name: 'BOA Sénégal', color: 'bg-red-600', balance: 3240000, logo: '🏦', piSpi: true },
  { id: 'sgbs', name: 'SGBS', color: 'bg-red-700', balance: 4120000, logo: '🏦', piSpi: true },
  { id: 'bicis', name: 'BICIS', color: 'bg-blue-700', balance: 2890000, logo: '🏦', piSpi: true },
  { id: 'ecobank', name: 'Ecobank', color: 'bg-blue-600', balance: 6450000, logo: '🏦', piSpi: true },
  { id: 'ubs', name: 'UBA Sénégal', color: 'bg-red-800', balance: 1980000, logo: '🏦', piSpi: true },
]

const recentRecipients: Array<{
  id: string
  name: string
  account: string
  method: string
  type: 'phone' | 'alias' | 'iban'
}> = [
  { id: '1', name: 'Fournisseur ABC', account: '77 123 45 67', method: 'Wave', type: 'phone' },
  { id: '2', name: 'Prestataire XYZ', account: 'presta@xyz.sn', method: 'Orange Money', type: 'alias' },
  { id: '3', name: 'Employé Moussa', account: 'moussa.diop@email.com', method: 'Free Money', type: 'alias' },
  { id: '4', name: 'Partenaire Diop', account: 'SN12345678901234', method: 'CBAO', type: 'iban' },
]

export function Paiements() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [recipientType, setRecipientType] = useState<'phone' | 'alias' | 'iban'>('phone')
  const [description, setDescription] = useState('')
  const [step, setStep] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const { success, error } = useToastStore()
  
  // Quick action modals
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showRecurringModal, setShowRecurringModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  
  // Invoice payment state
  const [invoiceRef, setInvoiceRef] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  
  // Recurring payment state
  const [recurringRecipient, setRecurringRecipient] = useState('')
  const [recurringAmount, setRecurringAmount] = useState('')
  const [recurringFrequency, setRecurringFrequency] = useState('monthly')
  const [recurringStartDate, setRecurringStartDate] = useState('')
  
  // Bulk payment state
  const [bulkPayments, setBulkPayments] = useState<{recipient: string; amount: string}[]>([
    { recipient: '', amount: '' }
  ])

  const selectedAccount = paymentMethods.find(m => m.id === selectedMethod)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process payment
      console.log({ selectedMethod, amount, recipient, description })
      
      // Show success feedback
      setShowConfetti(true)
      success('Paiement effectué !', `${formatCurrency(Number(amount))} envoyé avec succès`)
      
      // Reset form
      setTimeout(() => {
        setStep(1)
        setSelectedMethod('')
        setAmount('')
        setRecipient('')
        setDescription('')
      }, 2000)
    }
  }

  const handleInvoicePayment = () => {
    console.log('Invoice payment:', { invoiceRef, invoiceAmount })
    setShowInvoiceModal(false)
    success('Facture payée !', `Référence: ${invoiceRef}`)
    setInvoiceRef('')
    setInvoiceAmount('')
  }

  const handleRecurringPayment = () => {
    console.log('Recurring payment:', { recurringRecipient, recurringAmount, recurringFrequency, recurringStartDate })
    setShowRecurringModal(false)
    success('Paiement récurrent programmé !', `${formatCurrency(Number(recurringAmount))} - ${recurringFrequency}`)
    setRecurringRecipient('')
    setRecurringAmount('')
    setRecurringFrequency('monthly')
    setRecurringStartDate('')
  }

  const handleBulkPayment = () => {
    const validPayments = bulkPayments.filter(p => p.recipient && p.amount)
    console.log('Bulk payments:', validPayments)
    setShowBulkModal(false)
    success('Paiements en masse envoyés !', `${validPayments.length} paiement(s) traité(s)`)
    setBulkPayments([{ recipient: '', amount: '' }])
  }

  const addBulkPaymentRow = () => {
    setBulkPayments([...bulkPayments, { recipient: '', amount: '' }])
  }

  const removeBulkPaymentRow = (index: number) => {
    setBulkPayments(bulkPayments.filter((_, i) => i !== index))
  }

  const updateBulkPayment = (index: number, field: 'recipient' | 'amount', value: string) => {
    const updated = [...bulkPayments]
    updated[index][field] = value
    setBulkPayments(updated)
  }

  const bulkTotal = bulkPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  return (
    <div className="space-y-6">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paiements PI-SPI</h1>
        <p className="text-muted-foreground">Effectuez des paiements instantanés interopérables</p>
      </div>

      {/* Features Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Zap, title: 'Interopérable', desc: 'Tous opérateurs & banques' },
          { icon: Shield, title: 'Sécurisé', desc: 'Conforme BCEAO' },
          { icon: Clock, title: 'Instantané', desc: 'Transfert en temps réel' },
        ].map((feature) => (
          <div key={feature.title} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:from-emerald-500/20 dark:to-teal-500/20 dark:border-emerald-500/30">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 shadow-soft flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nouveau Paiement</CardTitle>
            <CardDescription>Envoyez de l'argent vers n'importe quel compte</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                      : 'bg-accent text-muted-foreground'
                  }`}>
                    {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 rounded-full transition-all ${
                      step > s ? 'bg-emerald-500' : 'bg-accent'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">Sélectionnez le compte source</label>
                  
                  {/* Mobile Money Section */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Mobile Money</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {paymentMethods.filter(m => ['wave', 'orange', 'free', 'emoney', 'wizall', 'yup'].includes(m.id)).map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            selectedMethod === method.id
                              ? 'border-primary bg-primary/5 shadow-soft'
                              : 'border-border/60 hover:border-primary/50'
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-xl ${method.color} flex items-center justify-center text-lg`}>
                            {method.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {method.name}
                              {!method.piSpi && <span className="text-[10px] ml-1 text-orange-500">(hors PI-SPI)</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(method.balance)}
                            </p>
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banks Section */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Banques</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {paymentMethods.filter(m => ['cbao', 'boa', 'sgbs', 'bicis', 'ecobank', 'ubs'].includes(m.id)).map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            selectedMethod === method.id
                              ? 'border-primary bg-primary/5 shadow-soft'
                              : 'border-border/60 hover:border-primary/50'
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-xl ${method.color} flex items-center justify-center text-lg`}>
                            {method.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {method.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(method.balance)}
                            </p>
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {/* Recipient Type Selector */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type de destinataire</label>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-accent/50 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setRecipientType('phone')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          recipientType === 'phone'
                            ? 'bg-background shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        📱 Téléphone
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientType('alias')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          recipientType === 'alias'
                            ? 'bg-background shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        ✉️ Alias
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientType('iban')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          recipientType === 'iban'
                            ? 'bg-background shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        🏦 IBAN
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {recipientType === 'phone' && 'Numéro de téléphone'}
                      {recipientType === 'alias' && 'Alias (Email ou identifiant)'}
                      {recipientType === 'iban' && 'IBAN'}
                    </label>
                    <Input
                      placeholder={
                        recipientType === 'phone' 
                          ? '77 123 45 67' 
                          : recipientType === 'alias'
                          ? 'email@example.com ou @identifiant'
                          : 'SN12 3456 7890 1234 5678 9012'
                      }
                      icon={<User className="h-4 w-4" />}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {recipientType === 'phone' && 'Numéros commençant par 77, 78, 76, 70, 75'}
                      {recipientType === 'alias' && 'Alias PI-SPI: identifiant personnalisé'}
                      {recipientType === 'iban' && 'Compte bancaire au format IBAN sénégalais'}
                    </p>
                  </div>

                  {recentRecipients.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Bénéficiaires récents</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {recentRecipients.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              setRecipient(r.account)
                              setRecipientType(r.type)
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent hover:bg-accent/80 transition-colors whitespace-nowrap"
                          >
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                              {r.type === 'phone' && '📱'}
                              {r.type === 'alias' && '✉️'}
                              {r.type === 'iban' && '🏦'}
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-medium">{r.name}</p>
                              <p className="text-[10px] text-muted-foreground">{r.method}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-2 block">Montant (XOF)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold h-14"
                    />
                    {selectedAccount && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Solde disponible: {formatCurrency(selectedAccount.balance)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description (optionnel)</label>
                    <Input
                      placeholder="Motif du paiement"
                      icon={<FileText className="h-4 w-4" />}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* PI-SPI Info Banner */}
                  {selectedAccount?.piSpi && recipientType !== 'phone' && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Transfert PI-SPI par alias</span>
                        <br />
                        Paiement interopérable instantané vers {recipientType === 'alias' ? "l'alias" : "l'IBAN"} du bénéficiaire
                      </div>
                    </div>
                  )}

                  {!selectedAccount?.piSpi && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                      <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Wave (hors PI-SPI)</span>
                        <br />
                        Transfert direct Wave uniquement vers numéros Wave
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:from-emerald-500/20 dark:to-teal-500/20 dark:border-emerald-500/30">
                    <p className="text-sm text-muted-foreground mb-1">Montant à envoyer</p>
                    <p className="text-3xl font-bold text-foreground">{formatCurrency(Number(amount))}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">De</span>
                      <span className="text-sm font-medium text-foreground">{selectedAccount?.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Vers</span>
                      <span className="text-sm font-medium text-foreground">{recipient}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Frais</span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Gratuit</span>
                    </div>
                    {description && (
                      <div className="flex justify-between py-3">
                        <span className="text-sm text-muted-foreground">Motif</span>
                        <span className="text-sm font-medium text-foreground">{description}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                    Retour
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={
                    (step === 1 && !selectedMethod) ||
                    (step === 2 && (!recipient || !amount))
                  }
                >
                  {step === 3 ? (
                    <>
                      <Send className="h-4 w-4" />
                      Confirmer le paiement
                    </>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Payer une facture</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </button>
              <button
                onClick={() => setShowRecurringModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Paiement récurrent</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </button>
              <button
                onClick={() => setShowBulkModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Send className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Paiement en masse</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limites journalières</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Utilisé aujourd'hui</span>
                  <span className="font-medium">2.5M / 10M XOF</span>
                </div>
                <div className="h-2 rounded-full bg-accent overflow-hidden">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Limite restante: {formatCurrency(7500000)}
              </p>
              <div className="pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">PI-SPI:</span> Limite de 10M XOF/jour pour les transferts interopérables
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice Payment Modal */}
      <Modal
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        title="Payer une facture"
        description="Entrez la référence de votre facture"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Référence facture</label>
            <Input
              placeholder="Ex: FAC-2026-00123"
              icon={<FileText className="h-4 w-4" />}
              value={invoiceRef}
              onChange={(e) => setInvoiceRef(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Montant (XOF)</label>
            <Input
              type="number"
              placeholder="0"
              value={invoiceAmount}
              onChange={(e) => setInvoiceAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Compte source</label>
            <select className="w-full h-10 px-3 rounded-xl border border-border/60 bg-background text-sm">
              {paymentMethods.map(m => (
                <option key={m.id} value={m.id}>{m.name} - {formatCurrency(m.balance)}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowInvoiceModal(false)}>
              Annuler
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleInvoicePayment}
              disabled={!invoiceRef || !invoiceAmount}
            >
              <Send className="h-4 w-4" />
              Payer
            </Button>
          </div>
        </div>
      </Modal>

      {/* Recurring Payment Modal */}
      <Modal
        open={showRecurringModal}
        onClose={() => setShowRecurringModal(false)}
        title="Paiement récurrent"
        description="Configurez un paiement automatique"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Bénéficiaire</label>
            <Input
              placeholder="Numéro ou compte"
              icon={<User className="h-4 w-4" />}
              value={recurringRecipient}
              onChange={(e) => setRecurringRecipient(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Montant (XOF)</label>
            <Input
              type="number"
              placeholder="0"
              value={recurringAmount}
              onChange={(e) => setRecurringAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Fréquence</label>
            <select 
              className="w-full h-10 px-3 rounded-xl border border-border/60 bg-background text-sm"
              value={recurringFrequency}
              onChange={(e) => setRecurringFrequency(e.target.value)}
            >
              <option value="weekly">Hebdomadaire</option>
              <option value="biweekly">Bi-mensuel</option>
              <option value="monthly">Mensuel</option>
              <option value="quarterly">Trimestriel</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date de début</label>
            <Input
              type="date"
              value={recurringStartDate}
              onChange={(e) => setRecurringStartDate(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowRecurringModal(false)}>
              Annuler
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleRecurringPayment}
              disabled={!recurringRecipient || !recurringAmount || !recurringStartDate}
            >
              <Clock className="h-4 w-4" />
              Programmer
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Payment Modal */}
      <Modal
        open={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        title="Paiement en masse"
        description="Envoyez plusieurs paiements en une fois"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Bénéficiaires</label>
            <Button variant="ghost" size="sm" onClick={addBulkPaymentRow}>
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {bulkPayments.map((payment, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Bénéficiaire"
                  value={payment.recipient}
                  onChange={(e) => updateBulkPayment(index, 'recipient', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Montant"
                  value={payment.amount}
                  onChange={(e) => updateBulkPayment(index, 'amount', e.target.value)}
                  className="w-32"
                />
                {bulkPayments.length > 1 && (
                  <button
                    onClick={() => removeBulkPaymentRow(index)}
                    className="p-2 text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-accent/50 border border-border/40">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total ({bulkPayments.filter(p => p.recipient && p.amount).length} paiements)</span>
              <span className="font-semibold text-foreground">{formatCurrency(bulkTotal)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-border/60 cursor-pointer hover:bg-accent/30 transition-colors">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ou importer un fichier CSV</span>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowBulkModal(false)}>
              Annuler
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleBulkPayment}
              disabled={bulkPayments.filter(p => p.recipient && p.amount).length === 0}
            >
              <Send className="h-4 w-4" />
              Envoyer tout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
