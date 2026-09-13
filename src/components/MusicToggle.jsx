import { useAudio } from '../context/AudioContext'

export default function MusicToggle() {
  const { isMuted, isAudioBusy, toggleMute } = useAudio()
  return <button className={`os-music-toggle ${isMuted ? '' : 'music-playing'}`}
    aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    aria-pressed={!isMuted} disabled={isAudioBusy}
    title={isMuted ? 'Music off — click to play' : 'Music on — click to mute'} onClick={toggleMute}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {isMuted ? <path d="m16 9 5 6m0-6-5 6" /> : <><path d="M15 8a6 6 0 0 1 0 8"/><path d="M18 5a10 10 0 0 1 0 14"/></>}
    </svg><span>{isMuted ? 'Music off' : 'Music on'}</span>
  </button>
}
