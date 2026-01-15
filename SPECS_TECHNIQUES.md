# 📊 KaaroPay PWA - Spécifications Techniques Complètes

## 📋 Informations du Projet

| Propriété | Valeur |
|-----------|--------|
| **Nom** | KaaroPay PWA |
| **Version** | 1.0.0 |
| **Type** | Progressive Web Application |
| **Plateforme** | Web (Desktop + Mobile) |
| **Taille du projet** | ~260 KB (source) |
| **Nombre de fichiers** | 30+ fichiers |
| **Lignes de code** | ~2000+ lignes |
| **License** | Propriétaire |

---

## 🏗️ Architecture Technique

### Stack Complet

#### Frontend Core
```json
{
  "react": "^18.3.1",           // UI Framework
  "react-dom": "^18.3.1",       // React DOM
  "typescript": "^5.7.2"        // Type Safety
}
```

#### Build & Dev Tools
```json
{
  "vite": "^6.0.7",                    // Build tool ultra-rapide
  "@vitejs/plugin-react": "^4.3.4",   // Plugin React pour Vite
  "vite-plugin-pwa": "^0.21.2"        // Plugin PWA
}
```

#### Routing & State
```json
{
  "react-router-dom": "^7.1.3",       // SPA Routing
  "zustand": "^5.0.3"                 // State Management
}
```

#### Data Fetching
```json
{
  "@tanstack/react-query": "^5.68.3"  // API State Management
}
```

#### UI & Styling
```json
{
  "tailwindcss": "^3.4.18",           // CSS Framework
  "autoprefixer": "^10.4.20",         // CSS Autoprefixer
  "postcss": "^8.4.49",               // CSS Processor
  "clsx": "^2.1.1",                   // Conditional classes
  "tailwind-merge": "^2.7.0",         // Merge Tailwind classes
  "class-variance-authority": "^0.7.1" // Variant utilities
}
```

#### Icons & Charts
```json
{
  "lucide-react": "^0.468.0",         // Icons
  "recharts": "^2.15.0"               // Charts & Graphs
}
```

#### PWA
```json
{
  "workbox-window": "^7.3.0"          // Service Worker
}
```

---

## 🎨 Design System

### Palette de Couleurs (HSL)

#### Light Mode
```css
--background: 0 0% 100%;          /* Blanc */
--foreground: 222.2 84% 4.9%;     /* Noir/Gris très foncé */
--primary: 158 64% 52%;           /* Vert KaaroPay #059669 */
--secondary: 210 40% 96.1%;       /* Gris clair */
--destructive: 0 84.2% 60.2%;     /* Rouge */
--border: 214.3 31.8% 91.4%;      /* Bordure gris clair */
```

#### Dark Mode
```css
--background: 222.2 84% 4.9%;     /* Noir */
--foreground: 210 40% 98%;        /* Blanc cassé */
--primary: 158 64% 52%;           /* Vert (identique) */
--secondary: 217.2 32.6% 17.5%;   /* Gris foncé */
```

### Typographie
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Font Sizes**: 12px, 14px, 16px, 20px, 24px, 30px, 36px
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale (Tailwind)
```
0.5 → 2px
1 → 4px
2 → 8px
3 → 12px
4 → 16px
6 → 24px
8 → 32px
```

### Border Radius
```
--radius: 0.5rem;  /* 8px */
sm: 0.25rem;       /* 4px */
md: 0.375rem;      /* 6px */
lg: 0.5rem;        /* 8px */
```

---

## 📱 Composants UI

### Composants de Base

#### Button
```tsx
Variants: default | destructive | outline | secondary | ghost | link
Sizes: default | sm | lg | icon
Props: className, variant, size, ...HTMLButtonAttributes
```

#### Card
```tsx
Components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
Props: className, ...HTMLDivAttributes
```

#### Input
```tsx
Props: className, type, ...HTMLInputAttributes
Styles: focus-visible ring, border, rounded
```

### Composants Layout

#### Sidebar
- Navigation verticale fixe (desktop)
- 4 liens : Dashboard, Transactions, Paiements, Paramètres
- Active state avec highlight vert
- Icônes Lucide React

#### Header
- Sticky top bar
- Menu burger (mobile)
- Notifications badge
- User profile dropdown

#### MainLayout
- Sidebar + Header + Content
- Responsive (sidebar collapse sur mobile)
- Outlet pour les routes enfants

### Composants PWA

#### PWAInstallPrompt
- Banner en bas à droite
- Boutons : Installer / Plus tard
- Dismiss avec localStorage
- Auto-hide après installation

---

## 🗂️ Structure des Données

### Types TypeScript

#### User
```typescript
interface User {
  id: string
  name: string
  email: string
  company: string
  role: 'owner' | 'admin' | 'user'
}
```

#### Transaction
```typescript
interface Transaction {
  id: string
  type: 'encaissement' | 'paiement'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  method: 'wave' | 'orange_money' | 'momo' | 'bank' | 'other'
  reference: string
  description: string
  createdAt: Date
  completedAt?: Date
  recipient?: string
  sender?: string
}
```

#### Stats
```typescript
interface Stats {
  totalEncaissements: number
  totalPaiements: number
  pendingTransactions: number
  completedToday: number
  volumeTotal: number
}
```

#### PaymentMethod
```typescript
interface PaymentMethod {
  id: string
  name: string
  type: 'wallet' | 'bank'
  provider: string
  accountNumber: string
  isDefault: boolean
  isActive: boolean
}
```

---

## 🔄 State Management (Zustand)

### AuthStore
```typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}
```

**Utilisation:**
```tsx
const { user, login, logout } = useAuthStore()
```

---

## 🛣️ Routes (React Router)

### Structure des Routes

```
/
├── /login                    # Page de connexion (public)
└── / (protected)             # Layout principal
    ├── / (index)             # Dashboard
    ├── /transactions         # Liste des transactions
    ├── /paiements            # Effectuer un paiement
    └── /settings             # Paramètres
```

### Protection des Routes
```tsx
<ProtectedRoute>
  {/* Vérifie isAuthenticated */}
  {/* Redirige vers /login si non authentifié */}
</ProtectedRoute>
```

---

## 📊 Pages & Fonctionnalités

### Dashboard (`/`)
**Composants:**
- 4 StatCards (Encaissements, Paiements, En attente, Complétés)
- BarChart (Recharts) - Activité de la semaine
- Liste des 4 dernières transactions

**Data:**
- Mock data (7 jours d'historique)
- Formatage des montants en XOF
- Icônes colorées par type

### Transactions (`/transactions`)
**Composants:**
- SearchBar avec icône
- Filter button
- Table responsive

**Colonnes:**
- Référence
- Type (badge coloré)
- Description
- Méthode
- Montant (+/-)
- Statut (badge)
- Date (formatée)

**Features:**
- Recherche en temps réel
- Filtrage par référence/description
- Mock de 4 transactions

### Paiements (`/paiements`)
**Sections:**
1. **Nouveau Paiement**
   - Sélection de méthode (4 options)
   - Formulaire : Bénéficiaire, Montant, Description
   - Bouton "Effectuer le paiement"

2. **Vos Comptes**
   - Liste de 3 comptes
   - Affichage des soldes
   - Bouton "Ajouter un compte"

### Settings (`/settings`)
**Sections (4 Cards):**
1. **Profil** - Nom, Email, Entreprise
2. **Sécurité** - 2FA, Mot de passe
3. **Notifications** - Checkboxes (Email, Push, Alertes)
4. **Abonnement** - Plan, Prix, Prochain paiement

### Login (`/login`)
**Features:**
- Formulaire email/password
- Checkbox "Se souvenir"
- Lien "Mot de passe oublié"
- Lien "S'inscrire"
- Gradient background
- Auth mock (accepte n'importe quels identifiants)

---

## 🎯 PWA Configuration

### Manifest (vite.config.ts)
```typescript
{
  name: 'KaaroPay - Orchestrateur de Paiements',
  short_name: 'KaaroPay',
  description: '...',
  theme_color: '#059669',
  background_color: '#ffffff',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
  icons: [
    { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
  ]
}
```

### Service Worker (Workbox)
```typescript
{
  cleanupOutdatedCaches: true,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.kaaropay\.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24  // 24h
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
}
```

---

## 🔧 Utilitaires

### lib/utils.ts
```typescript
// Merge classes Tailwind
cn(...inputs: ClassValue[]): string

// Format montant en XOF
formatCurrency(amount: number, currency: string = 'XOF'): string

// Format date en français
formatDate(date: Date | string): string
```

### lib/constants.ts
```typescript
API_BASE_URL: string
PI_SPI_ENDPOINT: string
PAYMENT_METHODS: Record<string, string>
TRANSACTION_STATUSES: Record<string, string>
TRANSACTION_TYPES: Record<string, string>
CURRENCY: 'XOF'
APP_NAME: 'KaaroPay'
```

---

## 🪝 Custom Hooks

### useMediaQuery
```typescript
useMediaQuery(query: string): boolean
useIsMobile(): boolean
useIsTablet(): boolean
useIsDesktop(): boolean
```

### usePWA
```typescript
interface PWAHook {
  isInstallable: boolean
  isInstalled: boolean
  installPWA: () => Promise<void>
}
```

---

## 🚀 Performance

### Build Optimization
- **Code Splitting**: Par route (React.lazy)
- **Tree Shaking**: Suppression du code mort
- **Minification**: CSS + JS
- **Compression**: Gzip + Brotli
- **Asset Optimization**: Images, fonts

### Lighthouse Scores (Cibles)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+
- **PWA**: 100

### Bundle Size (estimé après build)
- **JS**: ~150-200 KB (gzipped)
- **CSS**: ~10-15 KB (gzipped)
- **Total**: ~160-215 KB

---

## 🔒 Sécurité

### Authentification
- ⚠️ Mode démo (mock) - À remplacer par vraie API
- Token-based auth (à implémenter)
- Protected routes
- Logout sécurisé

### Meilleures Pratiques
- HTTPS only en production
- CSP headers
- XSS protection
- CSRF tokens (à implémenter)

---

## 🌍 Internationalisation (i18n)

### Langues Supportées
- 🇫🇷 Français (par défaut)

### À implémenter
- Système i18n (react-i18next)
- Traductions EN, PT, AR
- Format de date localisé
- Format de devise localisé

---

## 📦 Scripts npm

```json
{
  "dev": "vite",                    // Dev server avec HMR
  "build": "tsc && vite build",     // Build de production
  "preview": "vite preview",        // Preview du build
  "lint": "eslint . --ext ts,tsx"   // Linter
}
```

---

## 🔄 Workflow de Développement

### 1. Installation
```bash
npm install
```

### 2. Développement
```bash
npm run dev
# → http://localhost:5173
# → Hot Module Replacement activé
```

### 3. Build
```bash
npm run build
# → Génère dist/
# → TypeScript compile
# → Vite optimise
# → PWA manifest & SW générés
```

### 4. Preview
```bash
npm run preview
# → Teste le build localement
```

### 5. Deploy
```bash
# Vercel
vercel

# Netlify
netlify deploy --prod --dir=dist

# Autre
# Upload dist/ vers votre hébergeur
```

---

## 🐛 Debugging

### React DevTools
- Installer l'extension Chrome/Firefox
- Inspecter les composants
- Voir les props/state

### Vite DevTools
- Network tab : voir les modules
- Console : logs et erreurs
- Sources : breakpoints

### PWA DevTools
- Application tab → Manifest
- Application tab → Service Workers
- Network tab → Offline mode

---

## 📚 Documentation

### Fichiers de Doc
- **README.md** - Vue d'ensemble
- **GUIDE.md** - Guide de démarrage
- **SETUP_COMPLET.md** - Installation détaillée
- **DEMARRAGE.md** - Instructions rapides
- **SPECS_TECHNIQUES.md** - Ce fichier

### Commentaires dans le Code
- Types TypeScript documentent les interfaces
- Noms de variables explicites
- Structure de dossiers claire

---

## 🎯 Prochaines Étapes (Roadmap)

### Phase 1 - MVP ✅ COMPLÉTÉ
- [x] Setup projet
- [x] Configuration PWA
- [x] Pages principales
- [x] Navigation
- [x] Design system
- [x] Responsive design

### Phase 2 - Backend Integration
- [ ] Connexion API réelle
- [ ] Authentification JWT
- [ ] CRUD transactions
- [ ] CRUD paiements
- [ ] Gestion utilisateurs

### Phase 3 - Features Avancées
- [ ] Notifications push
- [ ] Export PDF/Excel
- [ ] Rapports avancés
- [ ] Multi-devises
- [ ] QR Code paiements
- [ ] Webhooks

### Phase 4 - Production
- [ ] Tests unitaires (Jest)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoring (Sentry)
- [ ] Analytics (Plausible/GA4)

---

## 📞 Contact & Support

**Projet**: KaaroPay PWA
**Version**: 1.0.0
**Créé**: Janvier 2026
**Auteur**: KaaroPay Team

---

**© 2026 KaaroPay - Tous droits réservés**
