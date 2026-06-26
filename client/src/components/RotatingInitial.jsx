export default function RotatingInitial() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center" aria-hidden="true">
      {/* Outer spinning ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 60%, #00DEFF 75%, #7B61FF 85%, transparent 100%)',
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
          background: 'conic-gradient(from 180deg, transparent 55%, #00DEFF55 72%, #7B61FF44 83%, transparent 100%)',
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
          background: 'radial-gradient(circle at 35% 35%, rgba(0,222,255,0.18) 0%, rgba(123,97,255,0.10) 50%, rgba(0,0,0,0.5) 100%)',
          border: '1px solid rgba(0,222,255,0.20)',
          boxShadow: '0 0 12px rgba(0,222,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
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
            background: 'linear-gradient(135deg, #ffffff 20%, #00DEFF 60%, #7B61FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 6px rgba(0,222,255,0.5))',
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
