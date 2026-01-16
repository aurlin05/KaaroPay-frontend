import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// French translations
const fr = {
  translation: {
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      export: 'Exporter',
      download: 'Télécharger',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      all: 'Tout',
      none: 'Aucun',
      yes: 'Oui',
      no: 'Non',
    },
    
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      transactions: 'Transactions',
      payments: 'Paiements',
      accounts: 'Comptes',
      reports: 'Rapports',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    
    // Auth
    auth: {
      login: 'Connexion',
      signup: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      rememberMe: 'Se souvenir de moi',
      noAccount: "Vous n'avez pas de compte ?",
      hasAccount: 'Vous avez déjà un compte ?',
      loginButton: 'Se connecter',
      signupButton: "S'inscrire",
    },
    
    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      welcome: 'Bienvenue',
      totalBalance: 'Solde total',
      todayTransactions: "Transactions aujourd'hui",
      monthlyVolume: 'Volume mensuel',
      pendingPayments: 'Paiements en attente',
      recentTransactions: 'Transactions récentes',
      quickActions: 'Actions rapides',
      viewAll: 'Voir tout',
    },
    
    // Transactions
    transactions: {
      title: 'Transactions',
      subtitle: 'Historique de tous vos flux financiers',
      reference: 'Référence',
      type: 'Type',
      amount: 'Montant',
      status: 'Statut',
      method: 'Méthode',
      date: 'Date',
      description: 'Description',
      sender: 'Expéditeur',
      recipient: 'Destinataire',
      incoming: 'Encaissement',
      outgoing: 'Paiement',
      completed: 'Complété',
      pending: 'En attente',
      failed: 'Échoué',
      cancelled: 'Annulé',
      details: 'Détails de la transaction',
      copyRef: 'Copier référence',
      downloadReceipt: 'Télécharger reçu',
      exportTitle: 'Exporter les transactions',
      exportDesc: "Téléchargez l'historique de vos transactions",
      period: 'Période',
      format: 'Format',
      showing: 'Affichage de {{start}} à {{end}} sur {{total}} résultats',
      perPage: 'Par page',
    },
    
    // Payments
    payments: {
      title: 'Paiements',
      subtitle: 'Effectuez des paiements instantanés via le PI-SPI',
      newPayment: 'Nouveau Paiement',
      sendMoney: "Envoyez de l'argent vers n'importe quel compte",
      selectSource: 'Sélectionnez le compte source',
      beneficiary: 'Bénéficiaire',
      recentBeneficiaries: 'Bénéficiaires récents',
      amountLabel: 'Montant (XOF)',
      descriptionOptional: 'Description (optionnel)',
      paymentReason: 'Motif du paiement',
      amountToSend: 'Montant à envoyer',
      from: 'De',
      to: 'Vers',
      fees: 'Frais',
      free: 'Gratuit',
      reason: 'Motif',
      confirmPayment: 'Confirmer le paiement',
      continue: 'Continuer',
      quickActions: 'Actions rapides',
      payInvoice: 'Payer une facture',
      recurringPayment: 'Paiement récurrent',
      bulkPayment: 'Paiement en masse',
      dailyLimits: 'Limites journalières',
      used: 'Utilisé',
      remainingLimit: 'Limite restante',
      instant: 'Instantané',
      instantDesc: 'Paiements en temps réel',
      secure: 'Sécurisé',
      secureDesc: 'Conforme BCEAO',
      available247: '24/7',
      available247Desc: 'Disponible à tout moment',
    },
    
    // Accounts
    accounts: {
      title: 'Comptes',
      subtitle: 'Gérez vos comptes et moyens de paiement',
      totalBalance: 'Solde total',
      addAccount: 'Ajouter un compte',
      balance: 'Solde',
      accountNumber: 'Numéro de compte',
      linkedAccounts: 'Comptes liés',
    },
    
    // Reports
    reports: {
      title: 'Rapports',
      subtitle: 'Analysez vos performances financières',
      generateReport: 'Générer un rapport',
      dateRange: 'Période',
      reportType: 'Type de rapport',
      transactionReport: 'Rapport de transactions',
      financialSummary: 'Résumé financier',
      accountStatement: 'Relevé de compte',
    },
    
    // Settings
    settings: {
      title: 'Paramètres',
      subtitle: 'Gérez votre compte et vos préférences',
      profile: 'Profil',
      security: 'Sécurité',
      notifications: 'Notifications',
      language: 'Langue',
      theme: 'Thème',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
      systemMode: 'Système',
    },
    
    // Payment methods
    methods: {
      wave: 'Wave',
      orangeMoney: 'Orange Money',
      momo: 'MoMo',
      bank: 'Banque',
      other: 'Autre',
    },
    
    // Errors
    errors: {
      generic: 'Une erreur est survenue',
      network: 'Erreur de connexion',
      unauthorized: 'Non autorisé',
      notFound: 'Non trouvé',
      validation: 'Erreur de validation',
      rateLimit: 'Trop de requêtes. Veuillez patienter.',
    },
    
    // Alerts
    alerts: {
      title: 'Alertes',
      noAlerts: 'Aucune alerte',
      markAsRead: 'Marquer comme lu',
      markAllRead: 'Tout marquer comme lu',
      viewAll: 'Voir toutes les alertes',
    },
  },
}

// English translations
const en = {
  translation: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      download: 'Download',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      all: 'All',
      none: 'None',
      yes: 'Yes',
      no: 'No',
    },
    
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      payments: 'Payments',
      accounts: 'Accounts',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Logout',
    },
    
    // Auth
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot password?',
      rememberMe: 'Remember me',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      loginButton: 'Sign In',
      signupButton: 'Sign Up',
    },
    
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      totalBalance: 'Total Balance',
      todayTransactions: "Today's Transactions",
      monthlyVolume: 'Monthly Volume',
      pendingPayments: 'Pending Payments',
      recentTransactions: 'Recent Transactions',
      quickActions: 'Quick Actions',
      viewAll: 'View All',
    },
    
    // Transactions
    transactions: {
      title: 'Transactions',
      subtitle: 'History of all your financial flows',
      reference: 'Reference',
      type: 'Type',
      amount: 'Amount',
      status: 'Status',
      method: 'Method',
      date: 'Date',
      description: 'Description',
      sender: 'Sender',
      recipient: 'Recipient',
      incoming: 'Incoming',
      outgoing: 'Outgoing',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      cancelled: 'Cancelled',
      details: 'Transaction Details',
      copyRef: 'Copy reference',
      downloadReceipt: 'Download receipt',
      exportTitle: 'Export Transactions',
      exportDesc: 'Download your transaction history',
      period: 'Period',
      format: 'Format',
      showing: 'Showing {{start}} to {{end}} of {{total}} results',
      perPage: 'Per page',
    },
    
    // Payments
    payments: {
      title: 'Payments',
      subtitle: 'Make instant payments via PI-SPI',
      newPayment: 'New Payment',
      sendMoney: 'Send money to any account',
      selectSource: 'Select source account',
      beneficiary: 'Beneficiary',
      recentBeneficiaries: 'Recent beneficiaries',
      amountLabel: 'Amount (XOF)',
      descriptionOptional: 'Description (optional)',
      paymentReason: 'Payment reason',
      amountToSend: 'Amount to send',
      from: 'From',
      to: 'To',
      fees: 'Fees',
      free: 'Free',
      reason: 'Reason',
      confirmPayment: 'Confirm payment',
      continue: 'Continue',
      quickActions: 'Quick Actions',
      payInvoice: 'Pay an invoice',
      recurringPayment: 'Recurring payment',
      bulkPayment: 'Bulk payment',
      dailyLimits: 'Daily Limits',
      used: 'Used',
      remainingLimit: 'Remaining limit',
      instant: 'Instant',
      instantDesc: 'Real-time payments',
      secure: 'Secure',
      secureDesc: 'BCEAO compliant',
      available247: '24/7',
      available247Desc: 'Available anytime',
    },
    
    // Accounts
    accounts: {
      title: 'Accounts',
      subtitle: 'Manage your accounts and payment methods',
      totalBalance: 'Total Balance',
      addAccount: 'Add Account',
      balance: 'Balance',
      accountNumber: 'Account Number',
      linkedAccounts: 'Linked Accounts',
    },
    
    // Reports
    reports: {
      title: 'Reports',
      subtitle: 'Analyze your financial performance',
      generateReport: 'Generate Report',
      dateRange: 'Date Range',
      reportType: 'Report Type',
      transactionReport: 'Transaction Report',
      financialSummary: 'Financial Summary',
      accountStatement: 'Account Statement',
    },
    
    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account and preferences',
      profile: 'Profile',
      security: 'Security',
      notifications: 'Notifications',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      systemMode: 'System',
    },
    
    // Payment methods
    methods: {
      wave: 'Wave',
      orangeMoney: 'Orange Money',
      momo: 'MoMo',
      bank: 'Bank',
      other: 'Other',
    },
    
    // Errors
    errors: {
      generic: 'An error occurred',
      network: 'Connection error',
      unauthorized: 'Unauthorized',
      notFound: 'Not found',
      validation: 'Validation error',
      rateLimit: 'Too many requests. Please wait.',
    },
    
    // Alerts
    alerts: {
      title: 'Alerts',
      noAlerts: 'No alerts',
      markAsRead: 'Mark as read',
      markAllRead: 'Mark all as read',
      viewAll: 'View all alerts',
    },
  },
}

// Get saved language or detect from browser
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem('kaaropay-language')
  if (saved) return saved
  
  const browserLang = navigator.language.split('-')[0]
  return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr,
      en,
    },
    lng: getSavedLanguage(),
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

// Save language preference
export const changeLanguage = (lang: string) => {
  localStorage.setItem('kaaropay-language', lang)
  i18n.changeLanguage(lang)
}

export const getCurrentLanguage = () => i18n.language

export const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

export default i18n
