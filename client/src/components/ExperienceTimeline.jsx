import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { experience } from '../data/experience'

function TimelineItem({ item, index, total }) {
  const ref = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className="animate-on-scroll relative flex gap-6 pb-12 last:pb-0"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ring-4 ring-black"
          style={{ background: item.color }}
        />
        {index < total - 1 && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(${item.color}40, transparent)` }}
          />
        )}
      </div>

      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-bold text-white">{item.role}</h3>
            <p className="text-sm font-medium" style={{ color: item.color }}>{item.company}</p>
            <p className="text-xs text-white/30 mt-0.5">{item.type}</p>
          </div>
          <span className="text-xs text-white/30 glass pill px-3 py-1 flex-shrink-0">{item.period}</span>
        </div>
        <ul className="flex flex-col gap-1.5 mt-3">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/55 leading-relaxed">
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ExperienceTimeline() {
  return (
    <div>
      {experience.map((item, i) => (
        <TimelineItem key={item.company} item={item} index={i} total={experience.length} />
      ))}
    </div>
  )
}
