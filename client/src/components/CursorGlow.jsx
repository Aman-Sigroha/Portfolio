import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let ripples   = []
    let raf
    let prev      = { x: -9999, y: -9999 }
    let lastSpawn = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMove = (e) => {
      const dx    = e.clientX - prev.x
      const dy    = e.clientY - prev.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      const now   = performance.now()

      if (speed < 2) return  // ignore micro-jitter

      // Fast movement → short interval → many rings
      // Slow movement → long interval → few rings
      // speed ~5  → ~180ms apart  (1 ring per slow swipe)
      // speed ~20 → ~80ms apart
      // speed ~50 → ~20ms apart  (burst during fast swipe)
      const interval = Math.max(20, 200 - speed * 3.5)

      if (now - lastSpawn > interval) {
        ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.55 })
        prev.x     = e.clientX
        prev.y     = e.clientY
        lastSpawn  = now
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ripples = ripples.filter(r => r.alpha > 0.005)
      for (const r of ripples) {
        r.r     += 2.5
        r.alpha *= 0.93
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,222,255,${r.alpha.toFixed(3)})`
        ctx.lineWidth   = 1.2
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize',   resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',   resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        5,
      }}
    />
  )
}
