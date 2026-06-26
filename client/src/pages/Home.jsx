import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ProjectsSection from '../components/ProjectsSection'
import AboutTeaser from '../components/AboutTeaser'
import SkillsSection from '../components/SkillsSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <AboutTeaser />
      <SkillsSection />
      <Marquee />
    </main>
  )
}
