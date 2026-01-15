import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Transactions } from '@/pages/Transactions'
import { Paiements } from '@/pages/Paiements'
import { Comptes } from '@/pages/Comptes'
import { Rapports } from '@/pages/Rapports'
import { Settings } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { useAuthStore } from '@/stores/authStore'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="paiements" element={<Paiements />} />
          <Route path="comptes" element={<Comptes />} />
          <Route path="rapports" element={<Rapports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <PWAInstallPrompt />
    </BrowserRouter>
  )
}
