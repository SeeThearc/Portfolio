import { createContext, useContext, useEffect, useRef, useState } from 'react'
const SoundContext = createContext(null)
export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioBusy, setIsAudioBusy] = useState(false)
  const engine = useRef(null), gain = useRef(null), busy = useRef(false)
  useEffect(() => () => { engine.current?.close(); engine.current = null }, [])
  async function toggleMute(e) {
    e?.stopPropagation(); e?.preventDefault()
    if (busy.current) return
    busy.current = true
    setIsAudioBusy(true)
    try {
      if (!engine.current) {
        const AudioEngine = window.AudioContext || window.webkitAudioContext
        if (!AudioEngine) return
        const ctx = new AudioEngine()
        engine.current = ctx
        gain.current = ctx.createGain()
        gain.current.gain.value = 0
        gain.current.connect(ctx.destination)
        ;[130.81, 196, 261.63, 329.63].forEach((frequency, i) => {
          const oscillator = ctx.createOscillator()
          oscillator.type = 'sine'
          oscillator.frequency.value = frequency
          oscillator.detune.value = i % 2 ? 3 : -3
          oscillator.connect(gain.current)
          oscillator.start()
        })
      }
      const ctx = engine.current
      if (isMuted) {
        await ctx.resume()
        gain.current.gain.setTargetAtTime(.025, ctx.currentTime, .06)
        setIsMuted(false)
      } else {
        gain.current.gain.setTargetAtTime(0, ctx.currentTime, .045)
        setIsMuted(true)
        await new Promise(resolve => setTimeout(resolve, 180))
        if (ctx.state !== 'closed') await ctx.suspend()
      }
    } catch {
      setIsMuted(true)
    } finally {
      busy.current = false
      setIsAudioBusy(false)
    }
  }
  return <SoundContext.Provider value={{ isMuted, isAudioBusy, toggleMute }}>{children}</SoundContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAudio() { return useContext(SoundContext) }
