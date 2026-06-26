import { useState, useEffect } from 'react'
import axios from 'axios'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const CATEGORY_COLORS = {
  Frontend:  '#00DEFF',
  Backend:   '#7B61FF',
  Database:  '#FF6B9D',
  DevOps:    '#FFB547',
  Languages: '#4ADE80',
}

const FALLBACK_SKILLS = {
  Frontend:  ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'HTML5 / CSS3'],
  Backend:   ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets'],
  Database:  ['PostgreSQL', 'MongoDB', 'MySQL', 'SQL'],
  DevOps:    ['Docker', 'Git / GitHub', 'Railway', 'Vercel', 'AWS'],
  Languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
}

function normalizeSkillsMap(data) {
  const result = {}
  for (const [category, items] of Object.entries(data)) {
    result[category] = items.map((item) => (typeof item === 'string' ? item : item.name))
  }
  return result
}

function SkillItem({ name, color, index }) {
  const ref = useScrollAnimation(0.05)
  return (
    <div ref={ref} className="animate-on-scroll" style={{ transitionDelay: `${index * 40}ms` }}>
      <span
        className="inline-block text-sm text-white/70 font-medium px-3 py-1.5 rounded-lg border border-white/[0.06]"
        style={{ background: `${color}08`, borderColor: `${color}20` }}
      >
        {name}
      </span>
    </div>
  )
}

function CategoryCard({ category, skills, index }) {
  const color = CATEGORY_COLORS[category] || '#00DEFF'
  const ref = useScrollAnimation(0.08)
  return (
    <div
      ref={ref}
      className="animate-on-scroll rounded-3xl bg-[#0D0D0D] border border-white/[0.06] p-7 hover:border-white/[0.12] transition-all duration-500"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}80` }}
        />
        <h3 className="text-sm font-bold text-white tracking-wide">{category}</h3>
        <span className="ml-auto text-xs text-white/25">{skills.length} skills</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((name, i) => (
          <SkillItem key={name} name={name} color={color} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [skillsMap, setSkillsMap] = useState(FALLBACK_SKILLS)
  const headingRef = useScrollAnimation()

  useEffect(() => {
    axios.get('/api/skills')
      .then((r) => { if (Object.keys(r.data).length) setSkillsMap(normalizeSkillsMap(r.data)) })
      .catch(() => {})
  }, [])

  const categories = Object.keys(skillsMap)

  const allTech = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React.js', 'Next.js',
    'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker',
    'Git', 'AWS', 'Vercel', 'Railway', 'Web3.js', 'Solana',
    'OpenCV', 'REST APIs', 'WebSockets', 'Tailwind CSS',
  ]

  return (
    <main className="relative min-h-screen">
      <PageHero
        pageName="Skills"
        label="Expertise"
        title={<>MY <span className="text-[#00DEFF]">SKILLS</span></>}
        subtitle="Tools, languages, and frameworks I use to build production-ready systems."
      />

      <div className="relative z-10 px-6 lg:px-[12vw]">
        <div ref={headingRef} className="animate-on-scroll flex flex-wrap gap-2 mb-16 justify-center">
          {allTech.map((tech, i) => {
            const color = Object.values(CATEGORY_COLORS)[i % 5]
            return (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
                style={{ color, background: `${color}0A`, borderColor: `${color}25` }}
              >
                {tech}
              </span>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat} category={cat} skills={skillsMap[cat]} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
