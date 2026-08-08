import { ACCENT_CYAN, ACCENT_NEON, accentAlpha, accentCyanAlpha, accentNeonAlpha, pinkMode } from '../lib/accent.js'

export default function RotatingInitial() {
  const accentRing = pinkMode ? ACCENT_NEON : '#7B61FF'
  const ringPrimary = pinkMode ? ACCENT_CYAN : ACCENT_CYAN
  return (
    <div className="relative w-14 h-14 flex items-center justify-center" aria-hidden="true">
      {/* Outer spinning ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${ringPrimary} 72%, ${accentRing} 85%, transparent 100%)`,
          animation: 'spinSlow 3s linear infinite',
          padding: '1.5px',
        }}
      >
        <div className="w-full h-full rounded-full bg-[#09090f]" />
      </div>

      {/* Second inner shimmer ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '3px',
          background: `conic-gradient(from 180deg, transparent 55%, ${ringPrimary}55 70%, ${accentRing}44 83%, transparent 100%)`,
          animation: 'spinSlow 4s linear infinite reverse',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: '#09090f' }}
        />
      </div>

      {/* Glassy inner disc */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: '6px',
          background: pinkMode
            ? `radial-gradient(circle at 35% 35%, ${accentCyanAlpha(0.16)} 0%, ${accentNeonAlpha(0.12)} 45%, rgba(0,0,0,0.5) 100%)`
            : `radial-gradient(circle at 35% 35%, ${accentAlpha(0.18)} 0%, rgba(123,97,255,0.10) 50%, rgba(0,0,0,0.5) 100%)`,
          border: pinkMode
            ? `1px solid ${accentCyanAlpha(0.22)}`
            : `1px solid ${accentAlpha(0.2)}`,
          boxShadow: pinkMode
            ? `0 0 12px ${accentCyanAlpha(0.12)}, 0 0 18px ${accentNeonAlpha(0.1)}, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 0 12px ${accentAlpha(0.15)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* The letter */}
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            background: pinkMode
              ? `linear-gradient(135deg, #ffffff 15%, ${ACCENT_CYAN} 45%, ${ACCENT_NEON} 75%)`
              : `linear-gradient(135deg, #ffffff 20%, ${ACCENT_CYAN} 60%, ${accentRing} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: pinkMode
              ? `drop-shadow(0 0 5px ${accentCyanAlpha(0.45)}) drop-shadow(0 0 8px ${accentNeonAlpha(0.35)})`
              : `drop-shadow(0 0 6px ${accentAlpha(0.5)})`,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          A
        </span>
      </div>
    </div>
  )
}
