import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkAdminSession } from '../lib/adminApi.js'

export default function AdminRoute() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    checkAdminSession()
      .then((ok) => setStatus(ok ? 'authed' : 'guest'))
      .catch(() => setStatus('guest'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00DEFF]/30 border-t-[#00DEFF] animate-spin" />
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
