import { useEffect, useState } from 'react'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import { clearSession, getCurrentUser, getToken } from './api/auth.api'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  // Kalau ada token tersimpan, tunggu verifikasi ke /auth/me dulu
  // sebelum memutuskan menampilkan login atau dashboard.
  const [checkingSession, setCheckingSession] = useState(() => Boolean(getToken()))

  useEffect(() => {
    const token = getToken()
    if (!token) return

    let cancelled = false

    getCurrentUser(token)
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch((error) => {
        // Token kedaluwarsa / tidak valid / user sudah dihapus -> buang sesi.
        // Error jaringan (backend mati) tidak menghapus token.
        if (error.status === 401 || error.status === 404) clearSession()
      })
      .finally(() => {
        if (!cancelled) setCheckingSession(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleLogout = () => {
    clearSession()
    setUser(null)
  }

  if (checkingSession) {
    return <p className="session-loading">Memuat...</p>
  }

  if (user) {
    return <DashboardPage user={user} onLogout={handleLogout} />
  }

  return <LoginPage onLoginSuccess={setUser} />
}

export default App
