import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ExperienceTimeline from '../components/ExperienceTimeline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'
import { apiUrl } from '../lib/api.js'

const certifications = [
  'Complete Web Developer — Udemy',
  'Web Development + DevOps + Blockchain — 100xDevs Cohort 3',
  'Data Structures and Algorithms — LearnYard',
]

export default function About() {
  const heroRef = useScrollAnimation(0.05)
  const certRef = useScrollAnimation(0.1)

  return (
    <main className="relative min-h-screen">
      <PageHero
        pageName="About"
        label="About Me"
        title={<>ABOUT <span className="text-[#00DEFF]">ME</span></>}
        subtitle="Full Stack Developer and AI systems builder based in New Delhi, India — delivering production-ready systems since early 2025."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={apiUrl('/api/resume/download')} className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <FiDownload size={14} /> Download CV
          </a>
          <a href="https://github.com/Aman-Sigroha" target="_blank" rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 text-sm px-5 py-2.5">
            <FiGithub size={14} /> GitHub
          </a>
          <a href="https://linkedin.com/in/aman-sigroha" target="_blank" rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 text-sm px-5 py-2.5">
            <FiLinkedin size={14} /> LinkedIn
          </a>
          <a href="https://www.upwork.com/freelancers/amansigroha" target="_blank" rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 text-sm px-5 py-2.5">
            <SiUpwork size={13} /> Upwork
          </a>
        </div>
      </PageHero>

      <div className="relative z-10 px-6 lg:px-[12vw]">
      {/* Stats */}
      <div ref={heroRef} className="animate-on-scroll grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '8+', label: 'Projects Delivered' },
          { value: '5★', label: 'Upwork Rating' },
          { value: '100%', label: 'Job Success Score' },
          { value: '7.8', label: 'CGPA (B.Tech AI/DS)' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-2xl bg-[#0D0D0D] border border-white/[0.06] p-6 text-center">
            <div className="text-3xl font-black text-[#00DEFF]">{value}</div>
            <div className="text-xs text-white/35 mt-2 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-2">
          <p className="section-label mb-5">My Story</p>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              I've been passionate about technology from a young age. What started as curiosity about how
              websites work turned into a deep interest in building full-stack systems — from the database
              layer all the way to polished user interfaces.
            </p>
            <p>
              In early 2025, I officially launched as a freelancer. Since then, I've delivered
              <span className="text-white"> 8+ projects</span> across platforms like Upwork and direct
              contracts, maintaining a <span className="text-white">5-star rating</span> and
              <span className="text-white"> 100% job success score</span>.
            </p>
            <p>
              My work spans AI-powered identity verification systems, blockchain donation platforms,
              yacht charter search APIs, and startup MVPs — always focused on writing clean,
              performant, and maintainable code.
            </p>
            <p>
              I'm currently pursuing a <span className="text-white">B.Tech in AI and Data Science</span> at
              Vivekananda Institute of Professional Studies, New Delhi (Expected June 2027, CGPA 7.8/10).
            </p>
          </div>
        </div>

        {/* Quick facts */}
        <div className="flex flex-col gap-4">
          <p className="section-label">Quick Facts</p>
          {[
            { label: 'Location', value: 'New Delhi, India' },
            { label: 'Availability', value: 'Open to Work' },
            { label: 'Focus', value: 'Full Stack + AI' },
            { label: 'Education', value: 'B.Tech AI/DS — VIPS-TC' },
            { label: 'Platforms', value: 'Upwork · GitHub · LinkedIn' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-3 border-b border-white/[0.05]">
              <span className="text-xs text-white/30 uppercase tracking-wide">{label}</span>
              <span className="text-sm text-white/70 font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mb-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-3">Career</p>
            <h2 className="text-2xl font-bold text-white">
              Work <span className="text-[#00DEFF]">Experience</span>
            </h2>
          </div>
          <Link to="/experience" className="text-sm text-white/40 hover:text-[#00DEFF] transition-colors">
            View full timeline →
          </Link>
        </div>
        <ExperienceTimeline />
      </div>

      {/* Education & Certs */}
      <div ref={certRef} className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/[0.06] p-8">
          <p className="section-label mb-5">Education</p>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00DEFF10] border border-[#00DEFF20] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#00DEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Vivekananda Institute of Professional Studies – TC</h3>
              <p className="text-xs text-[#00DEFF] mt-1">B.Tech — Artificial Intelligence & Data Science</p>
              <p className="text-xs text-white/30 mt-1">CGPA: 7.8/10 · Expected June 2027 · New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/[0.06] p-8">
          <p className="section-label mb-5">Certifications</p>
          <ul className="flex flex-col gap-4">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00DEFF] flex-shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </main>
  )
}
