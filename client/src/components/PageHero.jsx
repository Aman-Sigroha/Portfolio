import { Link } from 'react-router-dom'
import CornerOrb from './CornerOrb'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function PageHero({ pageName, label, title, subtitle, children }) {
  const headerRef = useScrollAnimation(0.05)

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32 pb-24 lg:pb-28 px-6 lg:px-[12vw] min-h-[56vh]">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <CornerOrb position="top-right" variant="projects" size={640} />
        <CornerOrb position="top-left" variant="projects" size={640} />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 lg:h-52 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 35%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 lg:h-80 z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 38%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute left-0 bottom-0 w-[52%] h-72 lg:h-96 z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)' }}
      />

      <header
        ref={headerRef}
        className="animate-on-scroll relative z-10 text-center flex flex-col items-center"
      >
        <nav className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-white/35 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-white/25">&gt;</span>
          <span className="text-white/60">{pageName}</span>
        </nav>

        {label && <p className="section-label mb-4">{label}</p>}

        <h1
          className="font-grotesk font-black text-white leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}
      </header>
    </section>
  )
}
