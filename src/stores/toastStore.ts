import { create } from 'zustand'
import { Toast, ToastType } from '@/components/ui/Toast'

interface ToastStore {
  toasts: Toast[]
  addToast: (type: ToastType, title: string, message?: string, duration?: number) => void
  removeToast: (id: string) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (type, title, message, duration = 5000) => {
    const id = Math.random().toString(36).substring(7)
    const toast: Toast = { id, type, title, message, duration }
    
    set((state) => ({
      toasts: [...state.toasts, toast]
    }))
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
  },
  
  success: (title, message) => {
    useToastStore.getState().addToast('success', title, message)
  },
  
  error: (title, message) => {
    useToastStore.getState().addToast('error', title, message)
  },
  
  info: (title, message) => {
    useToastStore.getState().addToast('info', title, message)
  },
  
  warning: (title, message) => {
    useToastStore.getState().addToast('warning', title, message)
  },
}))
