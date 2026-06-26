import PageHero from '../components/PageHero'
import ExperienceTimeline from '../components/ExperienceTimeline'
import Testimonials from '../components/Testimonials'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { experience } from '../data/experience'

export default function Experience() {
  const statsRef = useScrollAnimation(0.08)

  return (
    <main className="relative min-h-screen">
      <PageHero
        pageName="Experience"
        label="Career"
        title={<>WORK <span className="text-[#00DEFF]">EXPERIENCE</span></>}
        subtitle="Freelance contracts, internships, and production work across full-stack development, AI integration, and backend systems."
      />

      <div className="relative z-10 px-6 lg:px-[12vw]">
        <div
          ref={statsRef}
          className="animate-on-scroll grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: `${experience.length}+`, label: 'Roles Completed' },
            { value: 'Remote', label: 'Primary Work Mode' },
            { value: '99%+', label: 'Uptime Delivered' },
            { value: '40%', label: 'Avg Performance Gain' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl bg-[#0D0D0D] border border-white/[0.06] px-5 py-6 text-center"
            >
              <p className="text-2xl lg:text-3xl font-bold text-[#00DEFF] mb-1">{value}</p>
              <p className="text-[11px] text-white/35 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        <Testimonials />

        <div className="rounded-3xl bg-[#0D0D0D] border border-white/[0.06] p-8 lg:p-10">
          <div className="mb-10">
            <p className="section-label mb-3">Timeline</p>
            <h2 className="text-2xl font-bold text-white">
              Where I&apos;ve <span className="text-[#00DEFF]">built & shipped</span>
            </h2>
          </div>
          <ExperienceTimeline />
        </div>
      </div>
    </main>
  )
}
