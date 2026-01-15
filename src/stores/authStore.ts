import { create } from 'zustand'
import { User } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      name: 'Jean Dupont',
      email,
      company: 'Ma PME',
      role: 'owner',
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },
}))
