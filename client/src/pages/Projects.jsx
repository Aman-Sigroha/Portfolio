import { useState, useEffect } from 'react'
import axios from 'axios'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PageHero from '../components/PageHero'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'

const CATEGORIES = ['All', 'AI / ML', 'Full Stack', 'Backend']

const FALLBACK = [
  {
    id: 1,
    title: 'Care4Crisis',
    subtitle: 'Blockchain Donation Platform',
    category: 'Full Stack',
    tags: ['React.js', 'Node.js', 'Ethereum', 'Solana', 'Web3.js'],
    description: 'Built a blockchain donation platform enabling secure and transparent on-chain transactions. Automated smart contract fund distribution workflows reducing manual operational effort by 85%.',
    github: 'https://github.com/Aman-Sigroha/Care4Crisis',
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: 'AI-Powered KYC System',
    subtitle: 'Identity Verification Platform',
    category: 'AI / ML',
    tags: ['Python', 'FastAPI', 'OpenCV', 'InsightFace', 'PaddleOCR', 'MediaPipe', 'ONNX', 'Node.js', 'Express.js'],
    description: 'Created AI-based KYC verification workflows using OCR, facial recognition, and liveness detection. Implemented async pipelines enabling scalable concurrent identity verification at 99%+ uptime.',
    github: 'https://github.com/Aman-Sigroha/kyc',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Yacht Charter API',
    subtitle: 'Scalable Backend Platform',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Nausys'],
    description: 'Engineered scalable REST APIs integrating 38+ advanced yacht search filters and external Nausys API services. Improved backend throughput by 40% using aggregation pipelines and async I/O.',
    github: null,
    live: null,
    featured: true,
  },
]

function inferCategory(project) {
  if (project.category) return project.category
  const tags = (project.tags || []).join(' ').toLowerCase()
  if (/ethereum|solana|web3|blockchain/.test(tags)) return 'Full Stack'
  if (/python|opencv|fastapi|ai|ml|onnx|insightface/.test(tags)) return 'AI / ML'
  if (/next\.js|react/.test(tags) && /node|express|postgres/.test(tags)) return 'Full Stack'
  if (/node|express|mongodb|api|backend/.test(tags)) return 'Backend'
  return 'Full Stack'
}

function ProjectCard({ project, index }) {
  const ref = useScrollAnimation(0.08)
  const category = inferCategory(project)

  return (
    <article
      ref={ref}
      className="animate-on-scroll group relative rounded-[28px] overflow-hidden bg-[#0A0A0A] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-500"
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
          style={{
            background: `linear-gradient(145deg,
              hsl(${project.id * 55 % 360}, 28%, 6%) 0%,
              hsl(${(project.id * 55 + 140) % 360}, 22%, 12%) 55%,
              hsl(${(project.id * 55 + 220) % 360}, 18%, 8%) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-black text-[120px] leading-none opacity-[0.05] select-none">
            {project.title[0]}
          </span>
        </div>

        <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="View on GitHub"
            >
              <FiGithub size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Live demo"
            >
              <FiExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/45 mb-2">
            {category}
          </p>
          <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-[#00DEFF] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-5 flex items-start justify-between gap-4 border-t border-white/[0.05]">
        <div>
          <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] mb-2">
            {project.subtitle}
          </p>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        <FiArrowUpRight
          size={18}
          className="flex-shrink-0 mt-1 text-white/25 group-hover:text-[#00DEFF] transition-colors duration-300"
        />
      </div>
    </article>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK)
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/projects')
      .then((r) => { if (r.data?.length) setProjects(r.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => inferCategory(p) === activeFilter)

  return (
    <main className="relative min-h-screen">
      <PageHero pageName="Projects" title="MY PROJECTS">
        <div className="flex flex-wrap justify-center gap-2 mt-10 lg:mt-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`pill px-5 py-2.5 text-sm font-medium transition-all duration-200 border ${
                activeFilter === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/55 border-white/15 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHero>

      <div className="relative z-10 px-6 lg:px-[12vw]">
      {/* Section row */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-base lg:text-lg font-semibold text-white">
          All projects
          <span className="ml-2 text-sm font-normal text-white/35">
            ({filtered.length})
          </span>
        </h2>
        <a
          href="https://github.com/Aman-Sigroha"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex btn-outline text-xs items-center gap-2 py-2.5 px-4"
        >
          View on GitHub
          <FiArrowUpRight size={14} />
        </a>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-[28px] bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-white/30">No projects in this category.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      </div>
    </main>
  )
}
