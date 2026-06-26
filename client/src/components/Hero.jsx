import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CornerOrb from './CornerOrb'

const roles = [
  'Full Stack Developer',
  'React & Node.js',
  'AI Systems Builder',
  'Backend Architect',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 lg:px-[10%]"
      aria-label="Hero"
    >
      {/* Corner A's — scroll with the page */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <CornerOrb position="top-right" variant="home" size={820} />
        <CornerOrb position="bottom-left" variant="home" size={820} />
      </div>

      {/* Edge fades so the 3D A blends into the page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 z-10"
        style={{ background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
        style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }} />
      {/* Side fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 z-10"
        style={{ background: 'linear-gradient(to right, #000000 0%, transparent 100%)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 z-10"
        style={{ background: 'linear-gradient(to left, #000000 0%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Animated sub-label */}
        <div className="flex items-center justify-center gap-3 mb-6 overflow-hidden h-8">
          <span className="section-label">FULL STACK</span>
          <span className="w-1 h-1 rounded-full bg-[#00DEFF] animate-pulse" />
          <span
            className="text-xs font-medium tracking-[0.15em] uppercase text-[#C5F8FF] transition-all duration-400"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {roles[roleIndex]}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#00DEFF] animate-pulse" />
          <span className="section-label">DEVELOPER</span>
        </div>

        {/* Main name heading */}
        <h1
          className="font-grotesk font-bold leading-none tracking-tight text-white mb-6"
          style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
        >
          <span className="block">AMAN</span>
          <span
            className="block teal-text-glow"
            style={{ color: '#00DEFF' }}
          >
            SIGROHA
          </span>
        </h1>

        {/* Tagline */}
        <p className="max-w-xl mx-auto text-white/60 text-base lg:text-lg font-normal leading-relaxed mb-10">
          I build clear, scalable, and high-performance digital experiences —
          from identity verification APIs to blockchain platforms.
          Let's create something that{' '}
          <span className="text-[#00DEFF]">actually works.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/projects" className="btn-primary px-7 py-3.5 text-base">
            View Projects
          </Link>
          <Link to="/contact" className="btn-outline px-7 py-3.5 text-base">
            Let's Talk
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {[
            { value: '8+', label: 'Freelance Projects' },
            { value: '5★', label: 'Upwork Rating' },
            { value: '100%', label: 'Job Success Score' },
            { value: '40%', label: 'Avg. Performance Gain' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#00DEFF]">{value}</div>
              <div className="text-xs text-white/40 mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="scroll-mouse" />
        <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  )
}
