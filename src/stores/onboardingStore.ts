import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingStore {
  completed: boolean
  currentStep: number
  skipped: boolean
  setCompleted: (completed: boolean) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  skip: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      completed: false,
      currentStep: 0,
      skipped: false,
      
      setCompleted: (completed) => set({ completed }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(0, state.currentStep - 1) 
      })),
      
      skip: () => set({ skipped: true, completed: true }),
      
      reset: () => set({ completed: false, currentStep: 0, skipped: false }),
    }),
    {
      name: 'kaaropay-onboarding',
    }
  )
)
