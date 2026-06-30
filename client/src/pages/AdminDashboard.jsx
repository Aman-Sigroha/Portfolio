import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogout, fetchContactMessages, markMessageRead } from '../lib/adminApi.js'
import Logo from '../components/Logo'

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadMessages = async () => {
    setError('')
    try {
      const data = await fetchContactMessages()
      setMessages(data)
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.response?.data?.error || 'Failed to load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleLogout = async () => {
    await adminLogout()
    navigate('/admin/login', { replace: true })
  }

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id)
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
      )
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update message.')
    }
  }

  const unreadCount = messages.filter((msg) => !msg.read).length

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/[0.06] px-6 lg:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="group">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/35 hidden sm:inline">
            {unreadCount} unread
          </span>
          <button onClick={loadMessages} className="btn-outline text-xs px-4 py-2">
            Refresh
          </button>
          <button onClick={handleLogout} className="btn-primary text-xs px-4 py-2">
            Logout
          </button>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="section-label mb-2">Inbox</p>
          <h1 className="text-3xl font-bold">
            Contact <span className="text-[#00DEFF]">Messages</span>
          </h1>
          <p className="text-sm text-white/40 mt-2">
            Messages submitted through your portfolio contact form.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#00DEFF]/30 border-t-[#00DEFF] animate-spin" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 mb-6">
            {error}
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-12 text-center text-white/35">
            No messages yet.
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`rounded-3xl border p-6 lg:p-7 transition-colors ${
                msg.read
                  ? 'border-white/[0.06] bg-[#0A0A0A]'
                  : 'border-[#00DEFF]/25 bg-[#00DEFF]/[0.03]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold text-white">{msg.name}</h2>
                    {!msg.read && (
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#00DEFF] bg-[#00DEFF]/10 px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-[#00DEFF] hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>
                <time className="text-xs text-white/30">{formatDate(msg.created_at)}</time>
              </div>

              <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/45">
                {msg.company && (
                  <span className="rounded-full border border-white/[0.08] px-3 py-1">
                    {msg.company}
                  </span>
                )}
                {msg.service && (
                  <span className="rounded-full border border-[#00DEFF]/20 text-[#00DEFF]/80 px-3 py-1">
                    {msg.service}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              {!msg.read && (
                <button
                  onClick={() => handleMarkRead(msg.id)}
                  className="mt-5 text-xs text-white/45 hover:text-[#00DEFF] transition-colors"
                >
                  Mark as read
                </button>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
