import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Wallet,
  ArrowLeftRight,
  CheckCircle2,
  Star,
  ChevronRight,
  Play,
  Sparkles
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Logo } from '@/components/Logo'

const features = [
  {
    icon: ArrowLeftRight,
    title: 'Multi-canaux',
    description: 'Connectez Wave, Orange Money, MoMo et vos comptes bancaires en un seul endroit.'
  },
  {
    icon: Zap,
    title: 'Paiements instantanés',
    description: 'Transactions en temps réel via le réseau PI-SPI de la BCEAO.'
  },
  {
    icon: Shield,
    title: '100% Sécurisé',
    description: 'Conforme aux normes bancaires et réglementations BCEAO.'
  },
  {
    icon: BarChart3,
    title: 'Réconciliation automatique',
    description: 'Tous vos flux réconciliés automatiquement dans un tableau de bord unifié.'
  },
  {
    icon: Wallet,
    title: 'Gestion multi-comptes',
    description: 'Visualisez et gérez tous vos comptes depuis une interface unique.'
  },
  {
    icon: Globe,
    title: 'Interopérabilité régionale',
    description: 'Payez et encaissez dans toute la zone UEMOA sans friction.'
  }
]

const testimonials = [
  {
    name: 'Fatou Diallo',
    role: 'DG, TechCorp Sénégal',
    content: 'KaaroPay nous a permis de réduire notre temps de réconciliation de 80%. Un outil indispensable.',
    avatar: 'FD'
  },
  {
    name: 'Moussa Koné',
    role: 'Fondateur, E-Shop Dakar',
    content: 'Enfin une solution qui comprend les réalités des PME africaines. Simple, efficace, abordable.',
    avatar: 'MK'
  },
  {
    name: 'Aminata Sy',
    role: 'DAF, Groupe Ndoye',
    content: 'La visibilité sur nos flux financiers a transformé notre gestion de trésorerie.',
    avatar: 'AS'
  }
]

const pricing = [
  {
    name: 'Starter',
    price: '5 000',
    description: 'Pour les petites entreprises',
    features: ['100 transactions/mois', '2 comptes connectés', 'Support email', 'Dashboard basique'],
    popular: false
  },
  {
    name: 'Business',
    price: '25 000',
    description: 'Pour les entreprises en croissance',
    features: ['1000 transactions/mois', '10 comptes connectés', 'Support prioritaire', 'Rapports avancés', 'API access', '5 utilisateurs'],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    description: 'Pour les grandes organisations',
    features: ['Transactions illimitées', 'Comptes illimités', 'Support dédié 24/7', 'API + Webhooks', 'Utilisateurs illimités', 'SLA garanti'],
    popular: false
  }
]

const stats = [
  { value: '500+', label: 'Entreprises' },
  { value: '2M+', label: 'Transactions' },
  { value: '50Mds', label: 'XOF traités' },
  { value: '99.9%', label: 'Disponibilité' }
]

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: `rgba(${Math.random() > 0.5 ? '16, 185, 129' : '20, 184, 166'}, ${Math.random() * 0.5 + 0.1})`,
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
          }}
        />
      ))}
    </div>
  )
}

// Animated gradient orbs
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-cyan-500/25 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  )
}

// Mouse follower glow effect
function useMouseGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return mousePos
}

// Scroll reveal hook
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return { ref, isVisible }
}

// Animated counter
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0')
  const { ref, isVisible } = useScrollReveal()
  
  useEffect(() => {
    if (!isVisible) return
    
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }
    
    let start = 0
    const duration = 2000
    const increment = numericValue / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start).toString() + (value.includes('+') ? '+' : '') + (value.includes('M') ? 'M' : '') + (value.includes('Mds') ? 'Mds' : ''))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [isVisible, value])
  
  return <span ref={ref}>{displayValue}{suffix}</span>
}

// Magnetic button effect
function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTransform({ x: x * 0.3, y: y * 0.3 })
  }
  
  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }
  
  return (
    <div
      ref={buttonRef}
      className={`transition-transform duration-200 ${className}`}
      style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Tilt card effect
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    setTransform({ rotateX, rotateY })
  }
  
  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }
  
  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Typing effect
function TypingText({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, texts])
  
  return (
    <span className="text-gradient">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  )
}

export function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const mousePos = useMouseGlow()
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Global mouse glow effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      } border-b border-border/40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Logo size="md" />
              </div>
              <span className="text-xl font-bold text-foreground">KaaroPay</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['features', 'pricing', 'testimonials'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {item === 'features' ? 'Fonctionnalités' : item === 'pricing' ? 'Tarifs' : 'Témoignages'}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-primary/10">Se connecter</Button>
              </Link>
              <MagneticButton>
                <Link to="/signup">
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Commencer gratuitement</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                <span className={`absolute block h-0.5 w-6 bg-current top-3 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="bg-card border-t border-border/40 p-4 space-y-4">
            <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Tarifs</a>
            <a href="#testimonials" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Témoignages</a>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">Se connecter</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full">Commencer gratuitement</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <GradientOrbs />
        <FloatingParticles />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in-up border border-primary/20 hover:border-primary/40 transition-colors cursor-default"
              style={{ animationDelay: '0.1s' }}
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              Propulsé par le PI-SPI de la BCEAO
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              L'orchestrateur de paiements pour{' '}
              <br className="hidden sm:block" />
              <TypingText texts={["l'Afrique de l'Ouest", "le Sénégal", "la Côte d'Ivoire", "le Mali", "le Burkina Faso"]} />
            </h1>
            
            <p 
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              Encaissez, payez et suivez tous vos flux financiers depuis une seule interface, 
              quel que soit le canal utilisé.
            </p>

            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <MagneticButton>
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Démarrer gratuitement
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" size="lg" className="w-full sm:w-auto group border-2 hover:border-primary/50">
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>Voir la démo</span>
                </Button>
              </MagneticButton>
            </div>

            <p 
              className="text-sm text-muted-foreground mt-6 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              Essai gratuit de 14 jours · Aucune carte requise
            </p>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div 
            className="mt-16 relative animate-fade-in-up"
            style={{ 
              animationDelay: '0.6s',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          >
            <TiltCard className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl animate-pulse-slow" />
              <div className="relative rounded-2xl border border-border/40 shadow-2xl overflow-hidden bg-card">
                <div className="bg-accent/50 px-4 py-3 flex items-center gap-2 border-b border-border/40">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">app.kaaropay.com</span>
                </div>
                <div className="p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {['12.4M', '8.2M', '450K', '4.2M'].map((val, i) => (
                      <div 
                        key={i} 
                        className="bg-card rounded-xl p-4 border border-border/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
                        style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                      >
                        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{val}</div>
                        <div className="text-xs text-muted-foreground">XOF</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-48 bg-card rounded-xl border border-border/40 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <BarChart3 className="h-24 w-24 text-primary/20 group-hover:text-primary/40 transition-colors duration-500" />
                    {/* Animated bars */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-around h-32">
                      {[60, 80, 45, 90, 70, 85, 55].map((height, i) => (
                        <div
                          key={i}
                          className="w-8 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-md animate-grow-up"
                          style={{ 
                            height: `${height}%`,
                            animationDelay: `${1 + i * 0.1}s`,
                            opacity: 0.7
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const { ref, isVisible } = useScrollReveal()
              return (
                <div 
                  key={stat.label} 
                  ref={ref}
                  className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-on-scroll">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour gérer tous vos flux financiers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const { ref, isVisible } = useScrollReveal()
              return (
                <TiltCard key={feature.title}>
                  <div 
                    ref={ref}
                    className={`p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/50 transition-all duration-500 group relative overflow-hidden h-full ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Commencez à utiliser KaaroPay en 3 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            
            {[
              { step: '1', title: 'Créez votre compte', desc: 'Inscription gratuite en moins de 2 minutes' },
              { step: '2', title: 'Connectez vos comptes', desc: 'Liez vos wallets et comptes bancaires' },
              { step: '3', title: 'Gérez vos flux', desc: 'Encaissez, payez et suivez tout en temps réel' }
            ].map((item, index) => {
              const { ref, isVisible } = useScrollReveal()
              return (
                <div 
                  key={item.step} 
                  ref={ref}
                  className={`text-center relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 cursor-default">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <GradientOrbs />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tarifs simples et transparents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez le plan adapté à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => {
              const { ref, isVisible } = useScrollReveal()
              return (
                <TiltCard key={plan.name}>
                  <div 
                    ref={ref}
                    className={`p-8 rounded-2xl border-2 transition-all duration-500 h-full relative overflow-hidden ${
                      plan.popular 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border/40 bg-card hover:border-primary/50'
                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      transform: plan.popular ? 'scale(1.05)' : undefined
                    }}
                  >
                    {/* Animated border for popular plan */}
                    {plan.popular && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-spin-slow opacity-20" style={{ animationDuration: '8s' }} />
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      {plan.popular && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium mb-4 animate-pulse">
                          <Star className="h-3 w-3" />
                          Populaire
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.price !== 'Sur mesure' && (
                          <span className="text-muted-foreground"> XOF/mois</span>
                        )}
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li 
                            key={feature} 
                            className="flex items-center gap-2 text-sm"
                            style={{ animationDelay: `${(index * 150) + (i * 50)}ms` }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <MagneticButton className="w-full">
                        <Link to="/signup" className="block">
                          <Button 
                            variant={plan.popular ? 'default' : 'outline'} 
                            className="w-full group"
                          >
                            <span>{plan.price === 'Sur mesure' ? 'Nous contacter' : 'Commencer'}</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de KaaroPay
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const { ref, isVisible } = useScrollReveal()
              return (
                <TiltCard key={testimonial.name}>
                  <div 
                    ref={ref}
                    className={`p-6 rounded-2xl border border-border/40 bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" 
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-emerald-500/30">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <FloatingParticles />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TiltCard>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden group">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:60px_60px] animate-slide" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Prêt à simplifier vos paiements ?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Rejoignez des centaines d'entreprises qui utilisent KaaroPay pour gérer leurs flux financiers.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>
                    <Link to="/signup">
                      <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-white/90 w-full sm:w-auto group shadow-xl">
                        <span>Commencer gratuitement</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm">
                      Parler à un expert
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Logo size="md" />
                </div>
                <span className="text-xl font-bold text-foreground">KaaroPay</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                L'orchestrateur de paiements interopérables pour l'Afrique de l'Ouest.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {['Fonctionnalités', 'Tarifs', 'API', 'Intégrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                      <span>{item}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {['À propos', 'Blog', 'Carrières', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                      <span>{item}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Conditions d'utilisation", 'Politique de confidentialité', 'Mentions légales'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                      <span>{item}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 KaaroPay. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Propulsé par le PI-SPI de la BCEAO 
              <span className="animate-wave inline-block">🇸🇳</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
