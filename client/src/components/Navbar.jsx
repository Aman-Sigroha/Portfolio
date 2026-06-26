import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'
import { apiUrl } from '../lib/api.js'

const navLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      {/* ── Left social sidebar ── */}
      <aside className="fixed left-0 top-0 h-screen z-[98] flex flex-col justify-center gap-12 pl-12 lg:pl-14 pointer-events-none hidden lg:flex">
        {[
          { icon: <FiGithub size={22} />, href: 'https://github.com/Aman-Sigroha', label: 'GitHub' },
          { icon: <FiLinkedin size={22} />, href: 'https://linkedin.com/in/aman-sigroha', label: 'LinkedIn' },
          { icon: <SiUpwork size={20} />, href: 'https://www.upwork.com/freelancers/amansigroha', label: 'Upwork' },
          { icon: <FiMail size={22} />, href: 'mailto:amansigrohawork@gmail.com', label: 'Email' },
        ].map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black text-white/70 origin-center transition-all duration-500 ease-out hover:scale-110 hover:bg-white hover:text-black hover:border-white"
          >
            {icon}
          </a>
        ))}
      </aside>

      {/* ── Top navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[99] flex items-center justify-between px-6 lg:px-[100px] transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6 26L16 6L26 26"
              stroke="#00DEFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 20H22.5"
              stroke="#00DEFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wider text-white/80 group-hover:text-white transition-colors">AS</span>
        </Link>

        {/* Center pill nav — desktop */}
        <div className="hidden lg:flex items-center glass pill px-4 py-1.5 gap-2">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={`inline-block px-7 py-2 rounded-full text-base font-semibold origin-center transition-all duration-500 ease-out hover:scale-110 ${
                  active
                    ? 'text-[#00DEFF] scale-105'
                    : 'text-white/80 hover:text-[#00DEFF]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right CTA — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={apiUrl('/api/resume/download')}
            className="btn-primary text-base px-6 py-3"
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
        >
          ✕
        </button>
        {navLinks.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="text-3xl font-bold text-white/80 hover:text-[#00DEFF] transition-colors"
          >
            {label}
          </Link>
        ))}
        <a href={apiUrl('/api/resume/download')} className="btn-primary mt-4">
          Download CV
        </a>
        <div className="flex gap-6 mt-4">
          <a href="https://github.com/Aman-Sigroha" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00DEFF]"><FiGithub size={22}/></a>
          <a href="https://linkedin.com/in/aman-sigroha" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00DEFF]"><FiLinkedin size={22}/></a>
          <a href="https://www.upwork.com/freelancers/amansigroha" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00DEFF]"><SiUpwork size={20}/></a>
          <a href="mailto:amansigrohawork@gmail.com" className="text-white/50 hover:text-[#00DEFF]"><FiMail size={22}/></a>
        </div>
      </div>
    </>
  )
}
