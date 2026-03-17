import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AppSwitcher.css'

// Mini preview thumbnails for each app
const APP_CARDS = [
  {
    id: 'lock',
    label: 'Lock Screen',
    path: '/',
    preview: <LockPreview />,
  },
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    preview: <HomePreview />,
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    preview: <ProjectsPreview />,
  },
  {
    id: 'about',
    label: 'About Me',
    path: '/about',
    preview: <AboutPreview />,
  },
]

function LockPreview() {
  return (
    <div className="preview-lock">
      <div className="prev-lock-badge">PORTFOLIO WORKSPACE</div>
      <div className="prev-lock-time">14:37</div>
      <div className="prev-lock-date">Tuesday, March 17</div>
      <div className="prev-notif">
        <div className="prev-notif-icon" style={{ background: 'var(--accent)' }} />
        <div className="prev-notif-text">New Connection</div>
      </div>
      <div className="prev-notif">
        <div className="prev-notif-icon" style={{ background: 'var(--accent-2)' }} />
        <div className="prev-notif-text">Design Update</div>
      </div>
    </div>
  )
}

function HomePreview() {
  const ICON_COLORS = ['var(--accent)','#374151','var(--accent-2)','#d97706','#7c3aed','#be185d']
  return (
    <div className="preview-home">
      <div className="prev-home-icons">
        {ICON_COLORS.map((c, i) => (
          <div key={i} className="prev-home-icon" style={{ background: c }} />
        ))}
      </div>
      <div className="prev-home-dock">
        {['#1c1c1e','#1c1c1e','#0077b5','#f89f1b'].map((c, i) => (
          <div key={i} className="prev-dock-icon" style={{ background: c }} />
        ))}
      </div>
    </div>
  )
}

function ProjectsPreview() {
  return (
    <div className="preview-projects">
      <div className="prev-proj-sidebar">
        <div className="prev-sidebar-item active" />
        <div className="prev-sidebar-item" />
        <div className="prev-sidebar-item" />
      </div>
      <div className="prev-proj-main">
        <div className="prev-proj-header" />
        <div className="prev-proj-grid">
          {['#1a3a2a','#1a2a3a','#1a2a1a'].map((c, i) => (
            <div key={i} className="prev-proj-card" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutPreview() {
  return (
    <div className="preview-about">
      <div className="prev-about-sidebar">
        <div className="prev-about-avatar" />
        <div className="prev-about-line" style={{ width: '70%' }} />
        <div className="prev-about-line" style={{ width: '50%' }} />
        <div className="prev-about-tabs">
          {[true, false, false, false, false].map((a, i) => (
            <div key={i} className={`prev-about-tab ${a ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      <div className="prev-about-content">
        <div className="prev-about-title" />
        <div className="prev-about-para" />
        <div className="prev-about-para" style={{ width: '80%' }} />
        <div className="prev-about-stats">
          {[0,1,2,3].map(i => <div key={i} className="prev-about-stat" />)}
        </div>
      </div>
    </div>
  )
}

export default function AppSwitcher({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const [dragY, setDragY] = useState(0)       // how far we've dragged up
  const [animating, setAnimating] = useState(false)

  const dragStartY = useRef(null)
  const isDragging = useRef(false)
  const indicatorRef = useRef(null)

  // ──── Drag on home indicator ────────────────────────
  const onPointerDown = useCallback((e) => {
    dragStartY.current = e.clientY ?? e.touches?.[0]?.clientY
    isDragging.current = true
    setDragY(0)
    e.preventDefault()
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current || dragStartY.current === null) return
    const y = e.clientY ?? e.touches?.[0]?.clientY
    const delta = dragStartY.current - y    // positive = dragging up
    if (delta > 0) setDragY(delta)
  }, [])

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    if (dragY > 40) {
      // threshold crossed → open switcher
      setOpen(true)
    }
    setDragY(0)
    dragStartY.current = null
  }, [dragY])

  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('touchend', onPointerUp)
    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  // ──── Navigate from switcher ─────────────────────
  function switchTo(path) {
    setAnimating(true)
    setTimeout(() => {
      setOpen(false)
      setAnimating(false)
      navigate(path)
    }, 300)
  }

  function closeApp(e, id) {
    e.stopPropagation()
    // Dismiss the card with a shrink animation — in a real app we'd track closed state
    // For now just close the switcher
    setOpen(false)
  }

  // Peek amount while dragging (show bottom strip of switcher)
  const indicatorPeek = Math.min(dragY * 1.5, 160)

  return (
    <>
      {/* Main page content */}
      <div
        className="ipad-shell-content"
        style={{
          transform: open
            ? 'scale(0.92) translateY(-20px)'
            : dragY > 0
              ? `scale(${1 - dragY * 0.0003}) translateY(-${dragY * 0.12}px)`
              : undefined,
          transition: open || dragY === 0 ? 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }}
      >
        {children}
      </div>

      {/* App Switcher overlay */}
      <div
        className={`switcher-overlay ${open ? 'switcher-open' : ''}`}
        onClick={() => setOpen(false)}
      >
        <div className={`switcher-panel ${open ? 'switcher-panel-open' : ''} ${animating ? 'switcher-exit' : ''}`} onClick={e => e.stopPropagation()}>
          <p className="switcher-label">Recent Apps</p>
          <div className="switcher-cards">
            {APP_CARDS.map((card) => (
              <div
                key={card.id}
                className={`switcher-card ${location.pathname === card.path ? 'switcher-card-active' : ''}`}
                onClick={() => switchTo(card.path)}
              >
                {/* Close button */}
                <button
                  className="switcher-card-close"
                  onClick={(e) => closeApp(e, card.id)}
                >×</button>

                {/* App preview */}
                <div className="switcher-card-preview">
                  {card.preview}
                </div>

                <p className="switcher-card-label">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Home indicator — draggable */}
      <div
        className="home-indicator-wrap"
        ref={indicatorRef}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
        style={{
          bottom: open ? '-20px' : 0,
          transition: 'bottom 0.4s ease',
        }}
      >
        <div
          className="home-indicator-bar"
          style={{
            width: dragY > 0 ? `${120 + dragY * 0.5}px` : undefined,
            opacity: open ? 0 : 1,
            transition: 'width 0.1s ease, opacity 0.3s ease',
          }}
        />
      </div>
    </>
  )
}
