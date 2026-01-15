# Guide de Démarrage Rapide - KaaroPay PWA

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm (inclus avec Node.js)

## 🚀 Installation et Démarrage

### Option 1 : Via les fichiers batch (Windows)

1. **Installation des dépendances**
   - Double-cliquez sur `install.bat`
   - Attendez la fin de l'installation

2. **Démarrer le serveur de développement**
   - Double-cliquez sur `start.bat`
   - L'application s'ouvrira sur http://localhost:5173

3. **Build de production**
   - Double-cliquez sur `build.bat`

### Option 2 : Via la ligne de commande

```bash
# 1. Installation
npm install

# 2. Démarrage en mode développement
npm run dev

# 3. Build de production
npm run build

# 4. Preview du build de production
npm run preview
```

## 🎯 Fonctionnalités Principales

### Dashboard
- Vue d'ensemble financière
- Graphiques d'activité hebdomadaire
- Transactions récentes
- Statistiques en temps réel

### Transactions
- Liste complète des transactions
- Filtrage et recherche
- Statuts : En attente, Complété, Échoué
- Types : Encaissement, Paiement

### Paiements
- Paiement instantané via PI-SPI
- Support des méthodes :
  - Wave
  - Orange Money
  - MoMo (MTN)
  - Virement Bancaire
- Gestion des comptes bénéficiaires

### Paramètres
- Profil utilisateur
- Sécurité (2FA, mot de passe)
- Notifications
- Gestion de l'abonnement

## 📱 Installation PWA

### Sur Mobile
1. Ouvrez l'application dans votre navigateur
2. Menu navigateur → "Ajouter à l'écran d'accueil"
3. L'application s'installera comme une app native

### Sur Desktop
1. Ouvrez l'application dans Chrome/Edge
2. Icône d'installation dans la barre d'adresse
3. Cliquez sur "Installer"

## 🎨 Stack Technique

- **React 18** - Interface utilisateur
- **TypeScript** - Typage fort
- **Vite** - Build ultra-rapide
- **Tailwind CSS** - Styles modernes
- **React Router** - Navigation
- **Zustand** - State management
- **React Query** - Gestion des données
- **Recharts** - Graphiques
- **Vite PWA** - Support Progressive Web App

## 🔐 Connexion (Mode Démo)

Pour tester l'application :
- Email : n'importe quel email valide
- Mot de passe : n'importe quel mot de passe

## 📂 Structure du Projet

```
src/
├── components/
│   ├── layout/          # Layout et navigation
│   └── ui/              # Composants UI réutilisables
├── pages/               # Pages de l'application
├── stores/              # State management (Zustand)
├── types/               # Types TypeScript
├── lib/                 # Utilitaires
└── hooks/               # Custom React hooks
```

## 🌐 Déploiement

L'application peut être déployée sur :

- **Vercel** (recommandé)
  ```bash
  npm install -g vercel
  vercel
  ```

- **Netlify**
  ```bash
  npm run build
  # Glisser-déposer le dossier dist/ sur netlify.com
  ```

- **GitHub Pages**
  ```bash
  npm run build
  # Configurer GitHub Pages pour servir le dossier dist/
  ```

## 🔧 Configuration Avancée

### Variables d'environnement

Créez un fichier `.env` :

```env
VITE_API_URL=https://api.kaaropay.com
VITE_PI_SPI_ENDPOINT=https://pi-spi.bceao.int
```

### Personnalisation PWA

Modifiez `vite.config.ts` pour personnaliser :
- Nom de l'application
- Couleurs du thème
- Icônes
- Stratégies de cache

## 📞 Support

Pour toute question ou problème :
- Email : support@kaaropay.com
- Documentation : https://docs.kaaropay.com

## 📄 Licence

© 2026 KaaroPay. Tous droits réservés.
