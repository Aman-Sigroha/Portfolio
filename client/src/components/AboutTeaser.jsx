import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { RESUME_DOWNLOAD } from '../lib/api.js'

export default function AboutTeaser() {
  const ref = useScrollAnimation(0.1)

  return (
    <section className="relative z-10 py-20 lg:py-28 px-6 lg:px-[20vw]" id="about-teaser">
      <div ref={ref} className="animate-on-scroll max-w-4xl">
        <p className="section-label mb-6">About Me</p>

        <p className="text-2xl lg:text-3xl font-medium leading-relaxed text-white/80">
          Forged in{' '}
          <span className="text-[#00DEFF]">full-stack development</span>{' '}
          and{' '}
          <span className="text-[#00DEFF]">AI-powered systems</span>
          {' '}— I help startups and businesses build{' '}
          <span className="text-[#00DEFF]">scalable digital products</span>{' '}
          that are fast, secure, and maintainable.
          My goal is to deliver{' '}
          <span className="text-white font-semibold">clean, performant code</span>{' '}
          that solves real problems.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/about" className="btn-primary px-6 py-3">
            More About Me
          </Link>
          <a
            href={RESUME_DOWNLOAD.href}
            download={RESUME_DOWNLOAD.filename}
            className="btn-outline px-6 py-3 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
