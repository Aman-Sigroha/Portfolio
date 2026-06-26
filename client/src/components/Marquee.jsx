const items = [
  { text: 'CONTACT ME!',                                        accent: true  },
  { text: 'EVERY GREAT PROJECT BEGINS WITH A CONVERSATION.',   accent: false },
  { text: 'CONTACT ME!',                                        accent: true  },
  { text: "READY TO MAKE SOMETHING GREAT?",                    accent: false },
  { text: 'CONTACT ME!',                                        accent: true  },
  { text: "LET'S BUILD TOGETHER.",                             accent: false },
]

export default function Marquee({ reverse = false }) {
  return (
    <div className="relative z-10 overflow-hidden py-5 mx-3 lg:mx-[7vw]">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000, transparent)' }}
      />

      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex-shrink-0 flex items-center" aria-hidden={copy > 0}>
            {items.map((item, i) => (
              <span
                key={i}
                className={`text-[15px] font-medium tracking-[0.15em] uppercase mx-16 ${
                  item.accent ? 'text-[#00DEFF]' : 'text-white/45'
                }`}
              >
                {item.text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
