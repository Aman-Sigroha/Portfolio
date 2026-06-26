import { useState } from 'react'
import axios from 'axios'
import PageHero from '../components/PageHero'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'

const services = [
  'Full Stack Web Application',
  'Backend / API Development',
  'AI / ML Integration',
  'Frontend Development',
  'Database Architecture',
  'Code Review / Consulting',
  'Other',
]

const INITIAL = { name: '', email: '', company: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useScrollAnimation(0.05)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="relative min-h-screen pb-16 lg:pb-24">
      <PageHero
        pageName="Contact"
        label="Get In Touch"
        title="CONTACT"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="tel:+919911864871"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-[#00DEFF] transition-colors glass pill px-4 py-2">
            <FiPhone size={13} /> +91 9911864871
          </a>
          <a href="mailto:amansigrohawork@gmail.com"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-[#00DEFF] transition-colors glass pill px-4 py-2">
            <FiMail size={13} /> amansigrohawork@gmail.com
          </a>
        </div>
      </PageHero>

      <div className="relative z-10 px-6 lg:px-[12vw]">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ── Left: Info ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <p className="section-label mb-3">A Need?</p>
            <h2 className="text-2xl font-bold text-white mb-4">
              Let's build something <span className="text-[#00DEFF]">great together</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              If you have a project in mind, want to discuss ideas, or are looking for a full-stack
              developer — don't hesitate to reach out. I'll respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: <FiMail size={15} />, label: 'Email', value: 'amansigrohawork@gmail.com', href: 'mailto:amansigrohawork@gmail.com' },
              { icon: <FiPhone size={15} />, label: 'Phone', value: '+91 9911864871', href: 'tel:+919911864871' },
              { icon: <FiMapPin size={15} />, label: 'Location', value: 'New Delhi, India', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D0D0D] border border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#00DEFF] bg-[#00DEFF10] border border-[#00DEFF20] flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{label}</p>
                  {href
                    ? <a href={href} className="text-sm text-white/70 hover:text-[#00DEFF] transition-colors">{value}</a>
                    : <p className="text-sm text-white/70">{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {[
              { icon: <FiGithub size={16} />, href: 'https://github.com/Aman-Sigroha', label: 'GitHub' },
              { icon: <FiLinkedin size={16} />, href: 'https://linkedin.com/in/aman-sigroha', label: 'LinkedIn' },
              { icon: <SiUpwork size={15} />, href: 'https://www.upwork.com/freelancers/amansigroha', label: 'Upwork' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-[#00DEFF] hover:border-[#00DEFF30] transition-all">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div ref={formRef} className="animate-on-scroll lg:col-span-3">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-3xl bg-[#0D0D0D] border border-[#00DEFF20]">
              <div className="w-16 h-16 rounded-full bg-[#00DEFF15] border border-[#00DEFF30] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00DEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/50 text-sm max-w-xs">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <button onClick={() => setStatus('idle')} className="mt-8 btn-outline text-sm px-6 py-2.5">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl bg-[#0D0D0D] border border-white/[0.06] p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="First Name *" name="name" value={form.name} onChange={handleChange}
                  placeholder="Aman" required />
                <FormField label="Email *" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required />
              </div>
              <FormField label="Company / Project" name="company" value={form.company} onChange={handleChange}
                placeholder="Startup Inc." />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium tracking-wide">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="bg-[#111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#00DEFF40] transition-colors appearance-none"
                >
                  <option value="">Choose a service...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 font-medium tracking-wide">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell me about your project..."
                  className="bg-[#111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#00DEFF40] transition-colors resize-none"
                />
                <p className="text-[10px] text-white/20 text-right">{form.message.length}/2000</p>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>

              <p className="text-[10px] text-white/20 text-center">
                Your data is only used to respond to your inquiry and stored securely.
              </p>
            </form>
          )}
        </div>
      </div>
      </div>
    </main>
  )
}

function FormField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/40 font-medium tracking-wide">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-[#111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#00DEFF40] transition-colors"
      />
    </div>
  )
}
