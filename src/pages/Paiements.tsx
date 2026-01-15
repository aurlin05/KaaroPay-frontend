import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Send, 
  Wallet, 
  User, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const paymentMethods = [
  { id: 'wave', name: 'Wave', color: 'bg-wave', balance: 2450000 },
  { id: 'orange', name: 'Orange Money', color: 'bg-orange', balance: 1230000 },
  { id: 'momo', name: 'MoMo', color: 'bg-momo', balance: 890000 },
  { id: 'bank', name: 'Virement Bancaire', color: 'bg-emerald-500', balance: 5670000 },
]

const recentRecipients = [
  { id: '1', name: 'Fournisseur ABC', account: '77 123 45 67', method: 'Wave' },
  { id: '2', name: 'Prestataire XYZ', account: '78 234 56 78', method: 'Orange Money' },
  { id: '3', name: 'Employé Moussa', account: 'SN12345678', method: 'Banque' },
]

export function Paiements() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [step, setStep] = useState(1)

  const selectedAccount = paymentMethods.find(m => m.id === selectedMethod)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process payment
      console.log({ selectedMethod, amount, recipient, description })
      setStep(1)
      setSelectedMethod('')
      setAmount('')
      setRecipient('')
      setDescription('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paiements</h1>
        <p className="text-muted-foreground">Effectuez des paiements instantanés via le PI-SPI</p>
      </div>

      {/* Features Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Zap, title: 'Instantané', desc: 'Paiements en temps réel' },
          { icon: Shield, title: 'Sécurisé', desc: 'Conforme BCEAO' },
          { icon: Clock, title: '24/7', desc: 'Disponible à tout moment' },
        ].map((feature) => (
          <div key={feature.title} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
            <div className="h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-emerald-600" />
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
                  <div className="grid gap-3 sm:grid-cols-2">
                    {paymentMethods.map((method) => (
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
                        <div className={`h-10 w-10 rounded-xl ${method.color} flex items-center justify-center`}>
                          <Wallet className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Solde: {formatCurrency(method.balance)}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bénéficiaire</label>
                    <Input
                      placeholder="Numéro de téléphone ou compte"
                      icon={<User className="h-4 w-4" />}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>

                  {recentRecipients.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Bénéficiaires récents</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {recentRecipients.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRecipient(r.account)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent hover:bg-accent/80 transition-colors whitespace-nowrap"
                          >
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">{r.name}</span>
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
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                    <p className="text-sm text-muted-foreground mb-1">Montant à envoyer</p>
                    <p className="text-3xl font-bold text-foreground">{formatCurrency(Number(amount))}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">De</span>
                      <span className="text-sm font-medium">{selectedAccount?.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Vers</span>
                      <span className="text-sm font-medium">{recipient}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Frais</span>
                      <span className="text-sm font-medium text-emerald-600">Gratuit</span>
                    </div>
                    {description && (
                      <div className="flex justify-between py-3">
                        <span className="text-sm text-muted-foreground">Motif</span>
                        <span className="text-sm font-medium">{description}</span>
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
              {[
                { label: 'Payer une facture', icon: FileText },
                { label: 'Paiement récurrent', icon: Clock },
                { label: 'Paiement en masse', icon: Send },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <action.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limites journalières</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Utilisé</span>
                  <span className="font-medium">2.5M / 10M XOF</span>
                </div>
                <div className="h-2 rounded-full bg-accent overflow-hidden">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Limite restante: {formatCurrency(7500000)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
