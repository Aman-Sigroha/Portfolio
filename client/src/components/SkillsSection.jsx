import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Full Stack Development',
    color: '#00DEFF',
    description:
      'End-to-end web applications using React, Node.js, and PostgreSQL. From API design to pixel-perfect UIs — fast, secure, and production-ready.',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Backend & API Engineering',
    color: '#7B61FF',
    description:
      'High-throughput REST APIs, async processing, and cloud deployments. Experienced with FastAPI, WebSockets, Docker, and Railway/Vercel.',
    skills: ['FastAPI', 'REST APIs', 'WebSockets', 'Docker', 'Railway', 'AWS'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI & ML Integration',
    color: '#FF6B9D',
    description:
      'AI-powered features including OCR, facial recognition, liveness detection, and smart data pipelines integrated into production web applications.',
    skills: ['Python', 'OpenCV', 'FastAPI', 'ML Models', 'Blockchain', 'Web3.js'],
  },
]

function ServiceCard({ service, index }) {
  const ref = useScrollAnimation(0.1)
  return (
    <div
      ref={ref}
      className="animate-on-scroll group p-8 rounded-3xl bg-dark-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col gap-5"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          color: service.color,
          background: `${service.color}12`,
          border: `1px solid ${service.color}25`,
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold transition-colors duration-300"
        style={{ color: 'white' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {service.skills.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-md"
            style={{
              background: `${service.color}10`,
              color: service.color,
              border: `1px solid ${service.color}20`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Hover line */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded"
        style={{ background: service.color }}
      />
    </div>
  )
}

export default function SkillsSection() {
  const headingRef = useScrollAnimation()

  return (
    <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-[20vw]" id="skills">
      {/* Header */}
      <div ref={headingRef} className="animate-on-scroll flex items-center justify-between mb-14">
        <div>
          <p className="section-label mb-3">What I Do</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            My <span className="text-[#00DEFF]">Services</span>
          </h2>
        </div>
        <Link to="/skills" className="hidden sm:block btn-outline text-sm">
          All Skills
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  )
}
