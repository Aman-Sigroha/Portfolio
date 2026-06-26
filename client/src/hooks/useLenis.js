import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.6,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    document.documentElement.classList.add('lenis')

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [])
}
