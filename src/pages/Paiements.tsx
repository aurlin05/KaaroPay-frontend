import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Send, Wallet } from 'lucide-react'

const paymentMethods = [
  { id: 'wave', name: 'Wave', icon: '💳' },
  { id: 'orange', name: 'Orange Money', icon: '🟠' },
  { id: 'momo', name: 'MoMo', icon: '💰' },
  { id: 'bank', name: 'Virement Bancaire', icon: '🏦' },
]

export function Paiements() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ selectedMethod, amount, recipient, description })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
        <p className="text-muted-foreground">
          Effectuez des paiements instantanés via le PI-SPI
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Nouveau Paiement</CardTitle>
            <CardDescription>
              Sélectionnez une méthode et entrez les détails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Méthode de paiement
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-2 rounded-lg border-2 p-3 transition-colors ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-sm font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="recipient" className="mb-2 block text-sm font-medium">
                  Bénéficiaire
                </label>
                <Input
                  id="recipient"
                  placeholder="Numéro ou compte"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                  Montant (XOF)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Motif du paiement"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!selectedMethod || !amount || !recipient}>
                <Send className="mr-2 h-4 w-4" />
                Effectuer le paiement
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Vos Comptes</CardTitle>
            <CardDescription>
              Gérez vos méthodes de paiement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Wave', account: '77 123 45 67', balance: 2450000 },
                { name: 'Orange Money', account: '78 234 56 78', balance: 1230000 },
                { name: 'Compte Bancaire', account: 'SN123456789', balance: 5670000 },
              ].map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.account}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'XOF',
                        minimumFractionDigits: 0,
                      }).format(account.balance)}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ajouter un compte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
