import { useEffect } from 'react'

// A delegated listener animates only an overlay, never the control's geometry.
export default function ClickFeedback() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const active = new Map()
    function clear(target) {
      const effect = active.get(target)
      if (!effect) return
      active.delete(target)
      effect.animation.cancel()
      effect.overlay.remove()
      if (effect.positioned) target.style.position = effect.originalPosition
    }
    function handleClick(event) {
      if (reducedMotion.matches || !(event.target instanceof Element)) return
      const target = event.target.closest('button, a[href], [role="button"]')
      if (!target?.closest('.device-screen') || target.matches(':disabled, [aria-disabled="true"]')) return
      clear(target)
      // Bound work when someone clicks rapidly across different controls.
      if (active.size >= 6) clear(active.keys().next().value)
      const rect = target.getBoundingClientRect()
      const positioned = getComputedStyle(target).position === 'static'
      const originalPosition = target.style.position
      if (positioned) target.style.position = 'relative'
      const overlay = document.createElement('span')
      overlay.className = 'click-feedback-overlay'
      overlay.setAttribute('aria-hidden', 'true')
      const pulse = document.createElement('span')
      pulse.className = 'click-feedback-pulse'
      const size = Math.min(100, Math.max(40, Math.min(rect.width, rect.height) * 2))
      const x = event.detail === 0 ? rect.width / 2 : event.clientX - rect.left
      const y = event.detail === 0 ? rect.height / 2 : event.clientY - rect.top
      Object.assign(pulse.style, { width: `${size}px`, height: `${size}px`, left: `${x - size / 2}px`, top: `${y - size / 2}px` })
      overlay.append(pulse)
      target.append(overlay)
      const animation = pulse.animate([
        { transform: 'scale(.35)', opacity: .3 },
        { transform: 'scale(1)', opacity: 0 },
      ], { duration: 240, easing: 'cubic-bezier(.2,.7,.3,1)' })
      active.set(target, { animation, overlay, positioned, originalPosition })
      animation.finished.then(() => {
        if (active.get(target)?.animation === animation) clear(target)
      }).catch(() => {})
    }
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      for (const target of active.keys()) clear(target)
    }
  }, [])
  return null
}
