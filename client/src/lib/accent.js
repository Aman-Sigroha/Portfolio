export const pinkMode = import.meta.env.VITE_PINK_THEME === 'true'

/** Fun-mode gradient stops (hot pink family when enabled) */
export const ACCENT_CYAN = pinkMode ? '#FF10F0' : '#00DEFF'
export const ACCENT_NEON = pinkMode ? '#FF69B4' : '#39FF14'

export const ACCENT = pinkMode ? '#FF1493' : ACCENT_CYAN
export const ACCENT_RGB = pinkMode ? '255, 20, 147' : '0, 222, 255'
export const ACCENT_SOFT = pinkMode ? '#FFC8EC' : '#C5F8FF'
export const ACCENT_DARK = pinkMode ? '#C71585' : '#0099BB'
export const ACCENT_HOVER = pinkMode ? '#FF69B4' : '#33E8FF'

export function accentAlpha(alpha) {
  return `rgba(${ACCENT_RGB}, ${alpha})`
}

export function accentCyanAlpha(alpha) {
  return pinkMode ? `rgba(255, 16, 240, ${alpha})` : `rgba(0, 222, 255, ${alpha})`
}

export function accentNeonAlpha(alpha) {
  return pinkMode ? `rgba(255, 105, 180, ${alpha})` : `rgba(57, 255, 20, ${alpha})`
}
