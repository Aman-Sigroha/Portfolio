export function LogoMark({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00DEFF" />
          <stop offset="1" stopColor="#0099BB" />
        </linearGradient>
        <filter id="logoGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#050505" stroke="url(#logoGradient)" strokeWidth="1.5" />
      <g filter="url(#logoGlow)">
        <path
          d="M11 29L20 9L29 29"
          stroke="url(#logoGradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 22.5H25.5"
          stroke="url(#logoGradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
    </svg>
  )
}

const sizeMap = {
  sm: { mark: 32, word: 'text-sm', gap: 'gap-2' },
  md: { mark: 36, word: 'text-base', gap: 'gap-2.5' },
  lg: { mark: 44, word: 'text-lg', gap: 'gap-3' },
}

export default function Logo({ size = 'md', showWordmark = true, hideWordmarkOnMobile = false, className = '' }) {
  const { mark, word, gap } = sizeMap[size] || sizeMap.md

  return (
    <span className={`inline-flex items-center ${gap} ${className}`}>
      <LogoMark size={mark} className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
      {showWordmark && (
        <span
          className={`font-grotesk font-bold tracking-[0.14em] uppercase leading-none ${word} ${
            hideWordmarkOnMobile ? 'hidden sm:inline' : ''
          }`}
        >
          <span className="text-white/90 group-hover:text-white transition-colors">Aman </span>
          <span className="text-[#00DEFF] group-hover:text-[#33E8FF] transition-colors">Sigroha</span>
        </span>
      )}
    </span>
  )
}
