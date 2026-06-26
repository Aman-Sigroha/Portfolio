import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import CursorGlow from './components/CursorGlow'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import { useLenis } from './hooks/useLenis'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} style={{ animation: 'fadeIn 0.4s ease forwards' }}>
      {children}
    </div>
  )
}

function AppContent() {
  useLenis()
  const { pathname } = useLocation()
  const showFooter = pathname !== '/contact'

  return (
    <>
      <div className="relative">
        <Navbar />
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        {showFooter && <Footer />}
      </div>

      <CursorGlow />
    </>
  )
}

function NotFound() {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
      <p className="text-[120px] font-black text-white/[0.04] leading-none select-none">404</p>
      <h1 className="text-3xl font-bold text-white -mt-10">Page not found</h1>
      <p className="text-white/40 text-sm">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary px-6 py-3 mt-2">Go Home</a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
