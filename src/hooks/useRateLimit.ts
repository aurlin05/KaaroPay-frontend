import { useState, useCallback, useRef, useEffect } from 'react'

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  onLimitReached?: () => void
}

interface RateLimitState {
  remaining: number
  resetTime: number | null
  isLimited: boolean
}

export function useRateLimit(config: RateLimitConfig) {
  const { maxRequests, windowMs, onLimitReached } = config
  
  const [state, setState] = useState<RateLimitState>({
    remaining: maxRequests,
    resetTime: null,
    isLimited: false,
  })
  
  const requestTimestamps = useRef<number[]>([])
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up old timestamps
  const cleanupTimestamps = useCallback(() => {
    const now = Date.now()
    requestTimestamps.current = requestTimestamps.current.filter(
      ts => now - ts < windowMs
    )
  }, [windowMs])

  // Check if we can make a request
  const canRequest = useCallback((): boolean => {
    cleanupTimestamps()
    return requestTimestamps.current.length < maxRequests
  }, [cleanupTimestamps, maxRequests])

  // Record a request
  const recordRequest = useCallback(() => {
    const now = Date.now()
    cleanupTimestamps()
    
    if (requestTimestamps.current.length >= maxRequests) {
      const oldestTimestamp = requestTimestamps.current[0]
      const resetTime = oldestTimestamp + windowMs
      
      setState({
        remaining: 0,
        resetTime,
        isLimited: true,
      })
      
      onLimitReached?.()
      
      // Set timeout to reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
      resetTimeoutRef.current = setTimeout(() => {
        cleanupTimestamps()
        setState({
          remaining: maxRequests - requestTimestamps.current.length,
          resetTime: null,
          isLimited: false,
        })
      }, resetTime - now)
      
      return false
    }
    
    requestTimestamps.current.push(now)
    setState({
      remaining: maxRequests - requestTimestamps.current.length,
      resetTime: null,
      isLimited: false,
    })
    
    return true
  }, [cleanupTimestamps, maxRequests, windowMs, onLimitReached])

  // Wrap an async function with rate limiting
  const withRateLimit = useCallback(<T, Args extends unknown[]>(
    fn: (...args: Args) => Promise<T>
  ) => {
    return async (...args: Args): Promise<T> => {
      if (!canRequest()) {
        throw new Error('Rate limit exceeded. Please wait before trying again.')
      }
      recordRequest()
      return fn(...args)
    }
  }, [canRequest, recordRequest])

  // Execute with rate limit check
  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    if (!canRequest()) {
      throw new Error('Rate limit exceeded. Please wait before trying again.')
    }
    recordRequest()
    return fn()
  }, [canRequest, recordRequest])

  // Reset rate limit
  const reset = useCallback(() => {
    requestTimestamps.current = []
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }
    setState({
      remaining: maxRequests,
      resetTime: null,
      isLimited: false,
    })
  }, [maxRequests])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  return {
    ...state,
    canRequest,
    recordRequest,
    withRateLimit,
    execute,
    reset,
  }
}

// Pre-configured rate limiters for common use cases
export function useApiRateLimit() {
  return useRateLimit({
    maxRequests: 30,
    windowMs: 60000, // 30 requests per minute
    onLimitReached: () => {
      console.warn('API rate limit reached')
    },
  })
}

export function usePaymentRateLimit() {
  return useRateLimit({
    maxRequests: 5,
    windowMs: 60000, // 5 payments per minute
    onLimitReached: () => {
      console.warn('Payment rate limit reached')
    },
  })
}

export function useSearchRateLimit() {
  return useRateLimit({
    maxRequests: 10,
    windowMs: 10000, // 10 searches per 10 seconds
  })
}
