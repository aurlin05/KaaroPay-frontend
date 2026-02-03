import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Transactions } from '@/pages/Transactions'
import { Paiements } from '@/pages/Paiements'
import { Comptes } from '@/pages/Comptes'
import { Rapports } from '@/pages/Rapports'
import { Analytics } from '@/pages/Analytics'
import { Settings } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { Landing } from '@/pages/Landing'
import { useAuthStore } from '@/stores/authStore'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Transactions />} />
        </Route>
        <Route
          path="/paiements"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Paiements />} />
        </Route>
        <Route
          path="/comptes"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Comptes />} />
        </Route>
        <Route
          path="/rapports"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Rapports />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Analytics />} />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Settings />} />
        </Route>
      </Routes>
      <PWAInstallPrompt />
      <ToastContainer />
      <OnboardingModal />
    </BrowserRouter>
  )
}
