import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Care4Crisis',
    subtitle: 'Blockchain Donation Platform',
    tags: ['React.js', 'Node.js', 'Ethereum', 'Solana', 'Web3.js'],
    description:
      'Built a blockchain donation platform enabling secure and transparent on-chain transactions. Automated smart contract fund distribution workflows reducing manual operational effort by 85%.',
    github: 'https://github.com/Aman-Sigroha/Care4Crisis',
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: 'AI-Powered KYC System',
    subtitle: 'Identity Verification Platform',
    tags: ['Python', 'FastAPI', 'OpenCV', 'InsightFace', 'PaddleOCR', 'MediaPipe', 'ONNX', 'Node.js', 'Express.js'],
    description:
      'Created AI-based KYC verification workflows using OCR, facial recognition, and liveness detection. Implemented async pipelines enabling scalable concurrent identity verification at 99%+ uptime.',
    github: 'https://github.com/Aman-Sigroha/kyc',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Yacht Charter API',
    subtitle: 'Scalable Backend Platform',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    description:
      'Engineered scalable REST APIs integrating 38+ advanced yacht search filters and external Nausys API services. Improved backend throughput by 40% using aggregation pipelines.',
    github: null,
    live: null,
    featured: true,
  },
]

function ProjectCard({ project, index }) {
  const ref = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className="animate-on-scroll group relative rounded-3xl overflow-hidden bg-dark-card border border-white/[0.06] hover:border-[#00DEFF20] transition-all duration-500 cursor-pointer"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Hover teal glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, rgba(0,222,255,0.07) 0%, transparent 70%)' }} />

      {/* Image placeholder / gradient thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg,
              hsl(${(project.id * 67) % 360}, 40%, 8%) 0%,
              hsl(${(project.id * 67 + 180) % 360}, 30%, 12%) 100%)`,
          }}
        />
        {/* Tech icon pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-10 font-black">
            {project.title.charAt(0)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />

        {/* Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#00DEFF40] transition-all"
            >
              <FiGithub size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#00DEFF] transition-colors duration-300 mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{project.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-white/50 line-clamp-3 leading-relaxed">{project.description}</p>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const headingRef = useScrollAnimation()

  useEffect(() => {
    axios.get('/api/projects?featured=true')
      .then((res) => { if (res.data?.length) setProjects(res.data) })
      .catch(() => {})
  }, [])

  const featured = projects.filter((p) => p.featured)

  return (
    <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-[20vw]" id="projects">
      {/* Section header */}
      <div ref={headingRef} className="animate-on-scroll flex items-center justify-between mb-12">
        <div>
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Featured <span className="text-[#00DEFF]">Projects</span>
          </h2>
        </div>
        <Link
          to="/projects"
          className="hidden sm:flex btn-outline text-sm items-center gap-2"
        >
          All Projects
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="mt-8 flex sm:hidden justify-center">
        <Link to="/projects" className="btn-outline text-sm">View All Projects</Link>
      </div>
    </section>
  )
}
