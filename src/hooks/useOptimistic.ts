import { useState, useCallback, useRef } from 'react'

interface OptimisticState<T> {
  data: T
  isOptimistic: boolean
  error: Error | null
}

interface UseOptimisticOptions<T> {
  onError?: (error: Error, rollbackData: T) => void
  onSuccess?: (data: T) => void
}

export function useOptimistic<T>(
  initialData: T,
  options: UseOptimisticOptions<T> = {}
): {
  data: T
  isOptimistic: boolean
  error: Error | null
  update: (optimisticData: T, asyncFn: () => Promise<T>) => Promise<void>
  reset: () => void
} {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isOptimistic: false,
    error: null,
  })
  
  const rollbackRef = useRef<T>(initialData)

  const update = useCallback(async (
    optimisticData: T,
    asyncFn: () => Promise<T>
  ) => {
    // Store current data for rollback
    rollbackRef.current = state.data
    
    // Apply optimistic update immediately
    setState({
      data: optimisticData,
      isOptimistic: true,
      error: null,
    })

    try {
      // Execute the actual async operation
      const result = await asyncFn()
      
      // Update with real data
      setState({
        data: result,
        isOptimistic: false,
        error: null,
      })
      
      options.onSuccess?.(result)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      
      // Rollback to previous data
      setState({
        data: rollbackRef.current,
        isOptimistic: false,
        error: err,
      })
      
      options.onError?.(err, rollbackRef.current)
    }
  }, [state.data, options])

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isOptimistic: false,
      error: null,
    })
  }, [initialData])

  return {
    data: state.data,
    isOptimistic: state.isOptimistic,
    error: state.error,
    update,
    reset,
  }
}

// Hook for optimistic list operations
export function useOptimisticList<T extends { id: string }>(
  initialItems: T[],
  options: UseOptimisticOptions<T[]> = {}
) {
  const { data, isOptimistic, error, update, reset } = useOptimistic(initialItems, options)

  const addItem = useCallback(async (
    item: T,
    asyncFn: () => Promise<T>
  ) => {
    const optimisticList = [...data, item]
    await update(optimisticList, async () => {
      const result = await asyncFn()
      return [...data, result]
    })
  }, [data, update])

  const updateItem = useCallback(async (
    id: string,
    updates: Partial<T>,
    asyncFn: () => Promise<T>
  ) => {
    const optimisticList = data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
    await update(optimisticList, async () => {
      const result = await asyncFn()
      return data.map(item => item.id === id ? result : item)
    })
  }, [data, update])

  const removeItem = useCallback(async (
    id: string,
    asyncFn: () => Promise<void>
  ) => {
    const optimisticList = data.filter(item => item.id !== id)
    await update(optimisticList, async () => {
      await asyncFn()
      return data.filter(item => item.id !== id)
    })
  }, [data, update])

  return {
    items: data,
    isOptimistic,
    error,
    addItem,
    updateItem,
    removeItem,
    reset,
  }
}
