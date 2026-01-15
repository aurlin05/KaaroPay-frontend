# 📱 KaaroPay PWA - Instructions Rapides

## 🚀 DÉMARRAGE EN 3 ÉTAPES

### Étape 1️⃣ : Installation
Double-cliquez sur : **`install.bat`**
⏳ Patientez pendant l'installation des dépendances...

### Étape 2️⃣ : Lancement
Double-cliquez sur : **`start.bat`**
🌐 L'application s'ouvrira sur http://localhost:5173

### Étape 3️⃣ : Connexion
📧 Email : `test@example.com`
🔐 Mot de passe : `password`

---

## 📋 APERÇU DES PAGES

### 🏠 Dashboard
- 4 cartes de statistiques (Encaissements, Paiements, En attente, Complétés)
- Graphique d'activité hebdomadaire (barres)
- Liste des 4 dernières transactions

### 💸 Transactions
- Tableau complet avec filtrage
- Recherche par référence/description
- Colonnes : Référence, Type, Description, Méthode, Montant, Statut, Date
- Badge de couleur pour type et statut

### 💳 Paiements
- Sélection visuelle de méthode (Wave, Orange Money, MoMo, Banque)
- Formulaire : Bénéficiaire, Montant, Description
- Liste des comptes avec soldes

### ⚙️ Paramètres
- 4 sections : Profil, Sécurité, Notifications, Abonnement
- Gestion du compte utilisateur
- Configuration 2FA et mot de passe

---

## 🎨 DESIGN & COULEURS

### Palette de Couleurs
- **Primary (Vert)** : #059669 - Boutons principaux, liens
- **Success (Vert clair)** : #10b981 - Encaissements, statuts complétés
- **Info (Bleu)** : #60a5fa - Paiements
- **Warning (Jaune)** : #fbbf24 - Statuts en attente
- **Danger (Rouge)** : #ef4444 - Statuts échoués, actions destructives

### Thème
- **Light Mode** : Fond blanc, texte noir
- **Dark Mode** : Supporté (classe `.dark`)
- **Responsive** : Mobile, Tablet, Desktop

---

## 🔧 COMMANDES UTILES

### Mode Développement
```bash
npm run dev
```
→ Ouvre http://localhost:5173 avec Hot Reload

### Build de Production
```bash
npm run build
```
→ Crée le dossier `dist/` optimisé

### Prévisualiser le Build
```bash
npm run preview
```
→ Teste le build de production localement

### Linter
```bash
npm run lint
```
→ Vérifie la qualité du code

---

## 📱 INSTALLATION PWA

### Sur Chrome/Edge (Desktop)
1. Ouvrez l'application
2. Cliquez sur l'icône ⊕ dans la barre d'adresse
3. Cliquez "Installer"

### Sur Mobile (Android/iOS)
1. Ouvrez l'application dans le navigateur
2. Menu (⋮) → "Ajouter à l'écran d'accueil"
3. Confirmez l'installation

### Bannière d'Installation
Une bannière s'affichera automatiquement en bas à droite avec :
- 📥 Bouton "Installer"
- ⏰ Bouton "Plus tard"

---

## 🎯 MÉTHODES DE PAIEMENT

| Méthode | Icône | Pays | Type |
|---------|-------|------|------|
| **Wave** | 💳 | Sénégal, CI | Mobile Money |
| **Orange Money** | 🟠 | Multi-pays | Mobile Money |
| **MoMo (MTN)** | 💰 | Multi-pays | Mobile Money |
| **Banque** | 🏦 | Tous | Virement |

---

## 📊 TYPES DE TRANSACTIONS

### Encaissement (Vert)
- **+125 000 XOF** - Client paie
- Badge vert "Encaissement"
- Flèche vers le bas ⬇️

### Paiement (Bleu)
- **-75 000 XOF** - Vous payez fournisseur
- Badge bleu "Paiement"
- Flèche vers le haut ⬆️

---

## 🔐 STATUTS DE TRANSACTION

| Statut | Couleur | Badge | Description |
|--------|---------|-------|-------------|
| **Complété** | Vert | ✅ | Transaction réussie |
| **En attente** | Jaune | ⏳ | En cours de traitement |
| **Échoué** | Rouge | ❌ | Transaction échouée |
| **Annulé** | Gris | 🚫 | Annulée par l'utilisateur |

---

## 🗂️ STRUCTURE DES DOSSIERS

```
src/
├── components/       # Composants réutilisables
│   ├── ui/          # Button, Card, Input
│   └── layout/      # Sidebar, Header, Layout
├── pages/           # Pages principales
├── stores/          # State management
├── hooks/           # Custom hooks
├── lib/             # Utilitaires
└── types/           # Types TypeScript
```

---

## 💡 ASTUCES

### 🎨 Personnaliser les couleurs
→ Modifiez `src/index.css` (variables CSS)

### 🔄 Ajouter une page
1. Créez `src/pages/NouvellePage.tsx`
2. Ajoutez la route dans `src/App.tsx`
3. Ajoutez le lien dans `src/components/layout/Sidebar.tsx`

### 🌐 Connecter à une API
→ Modifiez `src/lib/constants.ts` (API_BASE_URL)

### 📦 Ajouter une dépendance
```bash
npm install nom-du-package
```

---

## ⚡ PERFORMANCES

### Optimisations Automatiques
- ✅ Code splitting par route
- ✅ Lazy loading des composants
- ✅ Tree shaking (suppression du code inutilisé)
- ✅ Minification CSS/JS
- ✅ Compression gzip

### Service Worker
- ✅ Cache des assets statiques
- ✅ Cache des réponses API (24h)
- ✅ Mise à jour automatique
- ✅ Mode hors ligne

---

## 🆘 PROBLÈMES FRÉQUENTS

### ❌ "npm n'est pas reconnu"
**Solution :** Installez Node.js depuis https://nodejs.org

### ❌ Port 5173 déjà utilisé
**Solution :** Changez le port dans `vite.config.ts` ou fermez l'autre application

### ❌ Erreur lors du build
**Solution :**
```bash
# Supprimer node_modules
Remove-Item -Recurse -Force node_modules
# Réinstaller
npm install
```

### ❌ Styles ne s'appliquent pas
**Solution :** Vérifiez que Tailwind CSS est bien configuré dans `tailwind.config.js`

---

## 📞 SUPPORT & RESSOURCES

### Documentation
- 📘 Guide complet : `GUIDE.md`
- 📗 Setup détaillé : `SETUP_COMPLET.md`
- 📕 README : `README.md`

### Technologies
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

### Communauté
- GitHub Issues
- Stack Overflow
- Discord KaaroPay (à venir)

---

## 🎉 BON DÉVELOPPEMENT !

**N'oubliez pas :**
1. ✅ Installez avec `install.bat`
2. ✅ Lancez avec `start.bat`
3. ✅ Testez l'application
4. ✅ Personnalisez selon vos besoins
5. 🚀 Déployez en production !

---

**KaaroPay** - *L'orchestrateur qui donne vie au PI-SPI*
