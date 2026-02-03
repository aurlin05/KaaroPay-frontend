import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TutorialStore {
  activeTutorial: string | null
  currentStep: number
  completedTutorials: string[]
  startTutorial: (tutorialId: string) => void
  nextStep: () => void
  skipTutorial: () => void
  completeTutorial: (tutorialId: string) => void
  isTutorialCompleted: (tutorialId: string) => boolean
}

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      activeTutorial: null,
      currentStep: 0,
      completedTutorials: [],

      startTutorial: (tutorialId) => {
        const { completedTutorials } = get()
        if (!completedTutorials.includes(tutorialId)) {
          set({ activeTutorial: tutorialId, currentStep: 0 })
        }
      },

      nextStep: () => {
        set((state) => ({ currentStep: state.currentStep + 1 }))
      },

      skipTutorial: () => {
        const { activeTutorial } = get()
        if (activeTutorial) {
          get().completeTutorial(activeTutorial)
        }
        set({ activeTutorial: null, currentStep: 0 })
      },

      completeTutorial: (tutorialId) => {
        set((state) => ({
          completedTutorials: [...state.completedTutorials, tutorialId],
          activeTutorial: null,
          currentStep: 0,
        }))
      },

      isTutorialCompleted: (tutorialId) => {
        return get().completedTutorials.includes(tutorialId)
      },
    }),
    {
      name: 'kaaropay-tutorials',
    }
  )
)
