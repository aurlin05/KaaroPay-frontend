// Monitoring and Analytics utilities
// This module provides error tracking, performance monitoring, and analytics

interface ErrorContext {
  userId?: string
  page?: string
  action?: string
  extra?: Record<string, unknown>
}

interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: Date
}

interface PerformanceMetric {
  name: string
  value: number
  unit: 'ms' | 's' | 'bytes' | 'count'
}

// Error tracking (Sentry-like interface)
class ErrorTracker {
  private isInitialized = false
  private dsn: string | null = null

  init(dsn: string) {
    this.dsn = dsn
    this.isInitialized = true
    
    // Global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      this.captureException(error || new Error(String(message)), {
        extra: { source, lineno, colno }
      })
    }

    // Unhandled promise rejection handler
    window.onunhandledrejection = (event) => {
      this.captureException(event.reason, {
        extra: { type: 'unhandledrejection' }
      })
    }

    console.log('[Monitoring] Error tracking initialized')
  }

  captureException(error: Error, context?: ErrorContext) {
    if (!this.isInitialized) {
      console.error('[Monitoring] Not initialized:', error)
      return
    }

    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...context,
    }

    // In production, send to error tracking service
    if (import.meta.env.PROD && this.dsn) {
      this.sendToService('/errors', errorData)
    } else {
      console.error('[Monitoring] Error captured:', errorData)
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    const messageData = {
      message,
      level,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...context,
    }

    if (import.meta.env.PROD && this.dsn) {
      this.sendToService('/messages', messageData)
    } else {
      console.log(`[Monitoring] ${level.toUpperCase()}:`, message, context)
    }
  }

  setUser(userId: string, email?: string, username?: string) {
    console.log('[Monitoring] User set:', { userId, email, username })
  }

  private async sendToService(endpoint: string, data: unknown) {
    try {
      // Replace with actual Sentry or error tracking service
      await fetch(`${this.dsn}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (e) {
      console.error('[Monitoring] Failed to send:', e)
    }
  }
}

// Analytics tracking
class Analytics {
  private isInitialized = false
  private queue: AnalyticsEvent[] = []

  init(trackingId: string) {
    this.isInitialized = true
    console.log('[Analytics] Initialized with ID:', trackingId)
    
    // Process queued events
    this.queue.forEach(event => this.track(event.name, event.properties))
    this.queue = []

    // Track page views automatically
    this.trackPageView()
  }

  track(eventName: string, properties?: Record<string, unknown>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date(),
    }

    if (!this.isInitialized) {
      this.queue.push(event)
      return
    }

    if (import.meta.env.PROD) {
      // Send to analytics service (Google Analytics, Mixpanel, etc.)
      this.sendEvent(event)
    } else {
      console.log('[Analytics] Event:', event)
    }
  }

  trackPageView(pageName?: string) {
    this.track('page_view', {
      page: pageName || window.location.pathname,
      title: document.title,
    })
  }

  // Pre-defined events for KaaroPay
  trackPaymentInitiated(amount: number, method: string) {
    this.track('payment_initiated', { amount, method })
  }

  trackPaymentCompleted(amount: number, method: string, transactionId: string) {
    this.track('payment_completed', { amount, method, transactionId })
  }

  trackPaymentFailed(amount: number, method: string, error: string) {
    this.track('payment_failed', { amount, method, error })
  }

  trackExport(format: string, count: number) {
    this.track('data_exported', { format, count })
  }

  trackSearch(query: string, resultsCount: number) {
    this.track('search', { query, resultsCount })
  }

  trackFeatureUsed(featureName: string) {
    this.track('feature_used', { feature: featureName })
  }

  private sendEvent(event: AnalyticsEvent) {
    // Implement actual analytics service integration
    // Example: Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', event.name, event.properties)
    }
  }
}

// Performance monitoring
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []

  init() {
    // Core Web Vitals
    this.observeWebVitals()
    console.log('[Performance] Monitoring initialized')
  }

  private observeWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.recordMetric('LCP', lastEntry.startTime, 'ms')
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          entries.forEach((entry) => {
            if ('processingStart' in entry) {
              const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime
              this.recordMetric('FID', fid, 'ms')
            }
          })
        })
        fidObserver.observe({ type: 'first-input', buffered: true })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as LayoutShift).hadRecentInput) {
              clsValue += (entry as LayoutShift).value
            }
          }
          this.recordMetric('CLS', clsValue, 'count')
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {
        console.warn('[Performance] Web Vitals observation failed:', e)
      }
    }
  }

  recordMetric(name: string, value: number, unit: PerformanceMetric['unit']) {
    const metric: PerformanceMetric = { name, value, unit }
    this.metrics.push(metric)

    if (import.meta.env.PROD) {
      // Send to monitoring service
      console.log('[Performance] Metric:', metric)
    }
  }

  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    return fn().finally(() => {
      const duration = performance.now() - start
      this.recordMetric(name, duration, 'ms')
    })
  }

  getMetrics() {
    return [...this.metrics]
  }
}

// Type declarations for global analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
  
  interface LayoutShift extends PerformanceEntry {
    value: number
    hadRecentInput: boolean
  }
}

// Singleton instances
export const errorTracker = new ErrorTracker()
export const analytics = new Analytics()
export const performanceMonitor = new PerformanceMonitor()

// Initialize all monitoring
export function initMonitoring(config: {
  sentryDsn?: string
  analyticsId?: string
  enablePerformance?: boolean
}) {
  if (config.sentryDsn) {
    errorTracker.init(config.sentryDsn)
  }

  if (config.analyticsId) {
    analytics.init(config.analyticsId)
  }

  if (config.enablePerformance !== false) {
    performanceMonitor.init()
  }
}

// React Error Boundary helper
export function logErrorToService(error: Error, errorInfo: { componentStack: string }) {
  errorTracker.captureException(error, {
    extra: { componentStack: errorInfo.componentStack }
  })
}
