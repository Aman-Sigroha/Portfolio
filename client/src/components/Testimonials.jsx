import { FiStar } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'
import { testimonials } from '../data/testimonials'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={14}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'}
        />
      ))}
      <span className="ml-2 text-sm font-semibold text-white">{rating.toFixed(1)}</span>
    </div>
  )
}

function TestimonialCard({ item, index }) {
  const ref = useScrollAnimation(0.08)

  return (
    <article
      ref={ref}
      className="animate-on-scroll rounded-2xl bg-[#0D0D0D] border border-white/[0.08] p-6 flex flex-col gap-4 h-full hover:border-white/[0.14] transition-colors duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">{item.client}</p>
          <p className="text-[11px] text-white/35 mt-0.5">{item.location}</p>
        </div>
        <div className="flex items-center gap-1.5 text-white/40 flex-shrink-0">
          <SiUpwork size={14} className="text-[#14A800]" />
          <span className="text-[10px] uppercase tracking-wider">{item.platform}</span>
        </div>
      </div>

      <p className="text-[11px] text-[#00DEFF]/80 font-medium leading-snug">{item.project}</p>

      <Stars rating={item.rating} />

      {item.quote ? (
        <blockquote className="text-sm text-white/60 leading-relaxed flex-1">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      ) : (
        <p className="text-sm text-white/45 leading-relaxed flex-1 italic">
          Client endorsed work quality and accountability on this project.
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {item.endorsements.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-white/45 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <p className="section-label mb-3">Client Feedback</p>
        <h2 className="text-2xl font-bold text-white">
          What clients <span className="text-[#00DEFF]">say on Upwork</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
