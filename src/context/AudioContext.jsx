import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createReadingMusic } from './readingMusic'
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
        await ctx.resume()
        engine.current = ctx
        gain.current = ctx.createGain()
        gain.current.gain.value = 0
        gain.current.connect(ctx.destination)
        const buffer = await createReadingMusic(ctx)
        if (ctx.state === 'closed') return
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.loop = true
        source.connect(gain.current)
        source.start()
      }
      const ctx = engine.current
      if (isMuted) {
        await ctx.resume()
        gain.current.gain.setTargetAtTime(.22, ctx.currentTime, .3)
        setIsMuted(false)
      } else {
        gain.current.gain.setTargetAtTime(0, ctx.currentTime, .045)
        setIsMuted(true)
        await new Promise(resolve => setTimeout(resolve, 180))
        if (ctx.state !== 'closed') await ctx.suspend()
      }
    } catch {
      engine.current?.close().catch(() => {})
      engine.current = null
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
