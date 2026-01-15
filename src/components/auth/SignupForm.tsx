import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    if (!acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation')
      return
    }

    await login(formData.email, formData.password)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nom complet
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Moussa Diagne"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Téléphone
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+221 77 123 45 67"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Mot de passe
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
          Confirmer le mot de passe
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div className="flex items-start gap-2 text-sm">
        <input 
          type="checkbox" 
          id="terms"
          className="mt-1 h-4 w-4 rounded border-gray-300"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          required
        />
        <label htmlFor="terms" className="cursor-pointer text-muted-foreground">
          J'accepte les{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            conditions d'utilisation
          </a>{' '}
          et la{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            politique de confidentialité
          </a>
        </label>
      </div>

      <Button type="submit" className="w-full">
        Créer mon compte
      </Button>
    </form>
  )
}
