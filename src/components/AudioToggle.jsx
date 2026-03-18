import { useAudio } from '../context/AudioContext';
import './AudioToggle.css';

export default function AudioToggle({ className = '' }) {
  const { isMuted, toggleMute } = useAudio();
  
  return (
    <button 
      className={`audio-toggle-btn ${isMuted ? 'muted' : 'playing'} ${className}`} 
      onClick={toggleMute}
      title={isMuted ? "Unmute Ambient Background" : "Mute Ambient Background"}
    >
      {isMuted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      )}
    </button>
  );
}
