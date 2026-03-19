import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme, THEMES } from '../context/ThemeContext'
import AudioToggle from '../components/AudioToggle'
import './HomeScreen.css'

const APP_ICONS = [
  {
    id: 'projects', label: 'Projects', badge: null, color: '#2563eb', path: '/projects',
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.35"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.35"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.35"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.35"/></svg>,
  },
  {
    id: 'about', label: 'About Me', badge: null, color: '#374151', path: '/about',
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>,
  },
  {
    id: 'experience', label: 'Experience', badge: null, color: '#059669', path: '/about?tab=Experience',
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="white" strokeWidth="1.8"/><path d="M12 12v4M10 14h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    id: 'skills', label: 'Skills', badge: null, color: '#d97706', path: '/about?tab=Skills',
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="white" fillOpacity="0.25"/></svg>,
  },
  {
    id: 'contact', label: 'Contact', badge: '1', color: '#7c3aed', path: 'mailto:ayushagrawal2334@gmail.com', external: true,
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.8"/><path d="M2 8l10 6 10-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    id: 'resume', label: 'Resume', badge: null, color: '#be185d', path: 'https://drive.google.com/file/d/1CkiBY8i4N9UNUsYwvx8dPemNU8YRmELN/view?usp=sharing', external: true,
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    id: 'themes', label: 'Themes', badge: null, color: null, /* dynamic */ path: '__themes__',
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="white"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
]

const DOCK_ITEMS = [
  { id:'home', path:'/home', bg:'#1c1c1e', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id:'github', path:'https://github.com/SeeThearc', external:true, bg:'#1c1c1e', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg> },
  { id:'linkedin', path:'https://www.linkedin.com/in/ayush-agrawal23/', external:true, bg:'#0077b5', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { id:'leetcode', path:'https://leetcode.com/u/Thearc', external:true, bg:'#f89f1b', icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M13.5 0a1.37 1.37 0 00-.96.44L7.1 6.22l-3.85 4.13a5.27 5.27 0 00-1.21 2.1 5.35 5.35 0 00-.12 2.24c.14.73.4 1.41.73 2.02.34.6.77 1.14 1.47 1.61l1.59 1.16.53.38c.39.24.83.43 1.32.59.48.14.98.17 1.47.17.49 0 .98-.06 1.45-.19.49-.14.93-.34 1.32-.59l.53-.38 1.59-1.16c.59-.43 1.08-.97 1.47-1.61.34-.6.6-1.29.73-2.02.14-.73.1-1.49-.12-2.24a5.27 5.27 0 00-1.21-2.1l-3.85-4.13L14.44.44A1.37 1.37 0 0013.5 0z"/></svg> },
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const { theme, setTheme, themes } = useTheme()
  const [pressed, setPressed] = useState(null)
  const [themePicker, setThemePicker] = useState(false)
  const [contactMode, setContactMode] = useState(null)
  const [emailSubj, setEmailSubj] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [copied, setCopied] = useState(false)

  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  // Dynamic theme icon color
  const themeIconColor = theme === 'green' ? '#00c860' : '#6366f1'

  function handleAppTap(app) {
    if (app.path === '__themes__') {
      setThemePicker(true)
      return
    }
    if (app.id === 'contact') {
      setPressed(app.id)
      setTimeout(() => {
        setPressed(null)
        setContactMode('options')
      }, 150)
      return
    }
    setPressed(app.id)
    setTimeout(() => {
      setPressed(null)
      if (app.external) window.open(app.path, '_blank')
      else navigate(app.path)
    }, 150)
  }

  return (
    <div className="ipad-frame home-root">
      <div className="ipad-wallpaper" />

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-time">{timeStr} ●</div>
        <div className="status-icons">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="rgba(255,255,255,0.9)"><rect x="0" y="6" width="2.5" height="6" rx="0.5"/><rect x="3.5" y="4" width="2.5" height="8" rx="0.5"/><rect x="7" y="2" width="2.5" height="10" rx="0.5"/><rect x="10.5" y="0" width="2.5" height="12" rx="0.5"/></svg>
          <svg width="18" height="13" viewBox="0 0 18 13" fill="rgba(255,255,255,0.9)"><path d="M9 3.5C11.7 3.5 14.1 4.6 15.8 6.4L17 5.1C14.9 2.9 12.1 1.5 9 1.5C5.9 1.5 3.1 2.9 1 5.1L2.2 6.4C3.9 4.6 6.3 3.5 9 3.5Z"/><path d="M9 6.5C10.8 6.5 12.4 7.2 13.6 8.4L14.8 7.1C13.2 5.6 11.2 4.5 9 4.5C6.8 4.5 4.8 5.6 3.2 7.1L4.4 8.4C5.6 7.2 7.2 6.5 9 6.5Z"/><circle cx="9" cy="11" r="1.5"/></svg>
          <div className="status-battery"><div className="status-battery-fill"/><div className="status-battery-tip"/></div>
        </div>
      </div>

      <AudioToggle className="floating-audio-home" />

      {/* App Grid */}
      <div className="app-grid-wrapper">
        <div className="app-grid anim-fadeup">
          {APP_ICONS.map((app, i) => (
            <div
              key={app.id}
              className={`app-item ${pressed === app.id ? 'app-pressed' : ''}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => handleAppTap(app)}
            >
              <div
                className="app-icon-wrap"
                style={{ background: app.id === 'themes' ? `linear-gradient(135deg, ${themeIconColor}, ${themeIconColor}99)` : app.color }}
              >
                {app.icon}
              </div>
              {app.badge && <div className="app-badge">{app.badge}</div>}
              <span className="app-label">{app.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="dock-wrapper anim-fadeup delay-6">
        <div className="dock">
          {DOCK_ITEMS.map((item) => (
            <div key={item.id} className="dock-item" onClick={() => handleAppTap(item)}>
              <div className="dock-icon-wrap" style={{ background: item.bg }}>{item.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Theme Picker Panel ─────────────────────── */}
      {themePicker && (
        <div className="theme-overlay" onClick={() => setThemePicker(false)}>
          <div className="theme-panel" onClick={e => e.stopPropagation()}>
            <div className="theme-panel-header">
              <h2 className="theme-panel-title">Appearance</h2>
              <button className="theme-close" onClick={() => setThemePicker(false)}>✕</button>
            </div>
            <p className="theme-panel-sub">Choose your interface colour scheme</p>

            <div className="theme-options">
              {Object.values(themes).map(t => (
                <div
                  key={t.id}
                  className={`theme-option ${theme === t.id ? 'theme-option-active' : ''}`}
                  onClick={() => { setTheme(t.id); setTimeout(() => setThemePicker(false), 300) }}
                >
                  {/* Colour preview swatch */}
                  <div className="theme-swatch">
                    <div className="swatch-bg" style={{ background: t.preview[0] }}>
                      <div className="swatch-accent" style={{ background: t.preview[1] }} />
                      <div className="swatch-accent2" style={{ background: t.preview[2] }} />
                    </div>
                  </div>

                  <div className="theme-option-info">
                    <span className="theme-option-name">{t.name}</span>
                    {t.id === 'green' && <span className="theme-option-default">Default</span>}
                  </div>

                  {theme === t.id && (
                    <div className="theme-checkmark">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="theme-panel-hint">Changes apply instantly across all screens</p>
          </div>
        </div>
      )}

      {/* ── Contact Widget Panel ─────────────────────── */}
      {contactMode && (
        <div className="theme-overlay" onClick={() => setContactMode(null)}>
          <div className="theme-panel contact-panel-custom" onClick={e => e.stopPropagation()}>
            <div className="theme-panel-header">
              <h2 className="theme-panel-title">{contactMode === 'compose' ? 'New Message' : 'Contact'}</h2>
              <button className="theme-close" onClick={() => setContactMode(null)}>✕</button>
            </div>
            
            {contactMode === 'options' ? (
              <div className="contact-options-view">
                <div className="contact-avatar-lg">
                  <img src="/avatar.png" alt="Ayush" />
                </div>
                <h3 className="contact-name-lg">Ayush Agrawal</h3>
                <p className="contact-role-lg">Available for opportunities</p>
                
                <div className="contact-btn-group">
                  <button className="contact-action-btn" onClick={() => setContactMode('compose')}>
                    <span className="cab-icon">✉️</span> Draft Email
                  </button>
                  <button className="contact-action-btn" onClick={() => {
                    navigator.clipboard.writeText('ayushagrawal2334@gmail.com')
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}>
                    <span className="cab-icon">📋</span> {copied ? 'Copied!' : 'Copy Email Address'}
                  </button>
                  <button className="contact-action-btn" onClick={() => window.open('https://www.linkedin.com/in/ayush-agrawal23/', '_blank')}>
                    <span className="cab-icon">💼</span> Connect on LinkedIn
                  </button>
                </div>
              </div>
            ) : (
              <div className="contact-compose-view">
                <div className="compose-field">
                  <label>To:</label>
                  <input type="text" value="ayushagrawal2334@gmail.com" disabled />
                </div>
                <div className="compose-field">
                  <label>Subject:</label>
                  <input type="text" placeholder="Hello from your portfolio!" value={emailSubj} onChange={e => setEmailSubj(e.target.value)} autoFocus />
                </div>
                <div className="compose-field compose-body-field">
                  <textarea placeholder="Write your message here..." value={emailBody} onChange={e => setEmailBody(e.target.value)} />
                </div>
                <div className="compose-footer">
                  <button className="compose-back" onClick={() => setContactMode('options')}>Back</button>
                  <button className="compose-send" onClick={() => {
                    const mailtoUrl = `mailto:ayushagrawal2334@gmail.com?subject=${encodeURIComponent(emailSubj)}&body=${encodeURIComponent(emailBody)}`
                    window.location.href = mailtoUrl
                    setContactMode(null)
                    setEmailSubj('')
                    setEmailBody('')
                  }}>Send via Mail App ↗</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
