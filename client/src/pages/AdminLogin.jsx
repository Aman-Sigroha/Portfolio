import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { adminLogin } from '../lib/adminApi.js'
import Logo from '../components/Logo'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await adminLogin(password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/" className="group">
            <Logo size="md" />
          </Link>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#0A0A0A] p-8 lg:p-10">
          <p className="section-label mb-3">Private</p>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-sm text-white/40 mb-8">
            Enter your admin password to view contact messages.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-password" className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-black border border-white/[0.10] px-4 py-3 text-sm text-white outline-none focus:border-[#00DEFF]/50 transition-colors"
                placeholder="••••••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          <Link to="/" className="hover:text-white/50 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  )
}

export function AdminLoginRedirectIfAuthed({ children }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    import('../lib/adminApi.js').then(({ checkAdminSession }) =>
      checkAdminSession()
        .then((ok) => setStatus(ok ? 'authed' : 'guest'))
        .catch(() => setStatus('guest'))
    )
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00DEFF]/30 border-t-[#00DEFF] animate-spin" />
      </div>
    )
  }

  if (status === 'authed') {
    return <Navigate to="/admin" replace />
  }

  return children
}
