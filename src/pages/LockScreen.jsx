import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LockScreen.css'

export default function LockScreen() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date())
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  function handleEnter() {
    setUnlocking(true)
    setTimeout(() => navigate('/home'), 600)
  }

  return (
    <div className={`ipad-frame lock-root ${unlocking ? 'lock-exit' : ''}`} onClick={handleEnter}>
      <div className="ipad-wallpaper" />

      {/* Top-left lock icon */}
      <div className="lock-top-left">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <rect x="2" y="8" width="10" height="9" rx="2" stroke="white" strokeWidth="1.5"/>
          <path d="M4 8V5.5a3 3 0 016 0V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Top-right status icons */}
      <div className="lock-top-right">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <rect x="0" y="6" width="2.5" height="6" rx="0.5"/>
          <rect x="3.5" y="4" width="2.5" height="8" rx="0.5"/>
          <rect x="7" y="2" width="2.5" height="10" rx="0.5"/>
          <rect x="10.5" y="0" width="2.5" height="12" rx="0.5"/>
        </svg>
        <svg width="18" height="13" viewBox="0 0 18 13" fill="white">
          <path d="M9 3.5C11.7 3.5 14.1 4.6 15.8 6.4L17 5.1C14.9 2.9 12.1 1.5 9 1.5C5.9 1.5 3.1 2.9 1 5.1L2.2 6.4C3.9 4.6 6.3 3.5 9 3.5Z"/>
          <path d="M9 6.5C10.8 6.5 12.4 7.2 13.6 8.4L14.8 7.1C13.2 5.6 11.2 4.5 9 4.5C6.8 4.5 4.8 5.6 3.2 7.1L4.4 8.4C5.6 7.2 7.2 6.5 9 6.5Z"/>
          <circle cx="9" cy="11" r="1.5"/>
        </svg>
        <div className="lock-battery">
          <div className="battery-fill" />
        </div>
      </div>

      {/* Center content */}
      <div className="lock-center">
        {/* Workspace badge */}
        <div className="lock-badge anim-fadeup">PORTFOLIO WORKSPACE</div>

        {/* Clock */}
        <div className="lock-time anim-fadeup delay-1">{hh}:{mm}</div>
        <div className="lock-date anim-fadeup delay-2">{dateStr}</div>

        {/* Notifications */}
        <div className="lock-notifs anim-fadeup delay-3">
          <div className="lock-notif">
            <div className="notif-app-icon notif-icon-blue">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div className="notif-body">
              <div className="notif-header">
                <span className="notif-title">New Connection</span>
                <span className="notif-time">Now</span>
              </div>
              <div className="notif-text">Someone wants to collaborate on a new project.</div>
            </div>
          </div>
          <div className="lock-notif">
            <div className="notif-app-icon notif-icon-teal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div className="notif-body">
              <div className="notif-header">
                <span className="notif-title">Design Update</span>
                <span className="notif-time">5s ago</span>
              </div>
              <div className="notif-text">Latest portfolio case studies are now live.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom swipe area */}
      <div className="lock-bottom">
        <div className="lock-chevron anim-fadeup delay-5">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M2 10L10 2L18 10" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="lock-enter-label anim-fadeup delay-5">CLICK TO ENTER</div>

      </div>
    </div>
  )
}
