import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Aman-Sigroha', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/aman-sigroha', label: 'LinkedIn' },
  { icon: SiUpwork, href: 'https://www.upwork.com/freelancers/amansigroha', label: 'Upwork' },
  { icon: FiMail, href: 'mailto:amansigrohawork@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto">
      {/* CTA */}
      <section className="relative pt-10 lg:pt-14 pb-16 lg:pb-20 px-6 text-center">
        <p className="section-label mb-6">Ready to Build?</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto leading-snug lg:leading-[1.2]">
          Ready to bring your
          <br />
          <span className="text-[#00DEFF]">project to life?</span>
        </h2>
        <p className="text-white/50 mb-10 max-w-md mx-auto text-sm lg:text-base">
          Tell me about your ideas and goals — let&apos;s discuss and build something great together.
        </p>
        <Link to="/contact" className="btn-primary px-8 py-4 text-base">
          Start a Project
        </Link>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 lg:px-[20vw] py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4">
          <p className="text-sm text-white/30 text-center md:text-left order-2 md:order-1">
            ©{new Date().getFullYear()}. Aman Sigroha.
          </p>

          <div className="flex items-center justify-center gap-5 order-1 md:order-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="text-white/30 hover:text-[#00DEFF] transition-colors"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center md:justify-end order-3">
            <Link to="/legal" className="text-sm text-white/30 hover:text-white/50 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
