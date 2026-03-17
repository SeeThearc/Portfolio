import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectGallery.css'

const PROJECTS = [
  {
    id: 1,
    title: 'StreamSphere',
    type: 'WEB',
    typeColor: '#3b82f6',
    bgColor: '#1a3a2a',
    desc: 'React.js OTT platform frontend with reusable components and 25% faster feature integration.',
    tags: ['React', 'CSS', 'JS'],
    link: 'https://github.com/SeeThearc/StreamReact',
    thumbnail: '🎬',
  },
  {
    id: 2,
    title: 'Pintura',
    type: 'BLOCKCHAIN',
    typeColor: '#8b5cf6',
    bgColor: '#1a2a3a',
    desc: 'Decentralized file sharing with IPFS & Solidity. 100+ demo transfers on testnet.',
    tags: ['Solidity', 'Ethers.js', 'IPFS'],
    link: 'https://github.com/SeeThearc/PINTURA',
    thumbnail: '🔗',
  },
  {
    id: 3,
    title: 'ParkIT',
    type: 'MERN',
    typeColor: '#10b981',
    bgColor: '#1a2a1a',
    desc: 'Full-stack mall parking system. Real-time slot booking. 30% fewer conflicts.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    link: 'https://github.com/SeeThearc/ParkIT---Mall-parking-system',
    thumbnail: '🅿️',
  },
  {
    id: 4,
    title: 'New Case Study',
    isPlaceholder: true,
    bgColor: '#111827',
    desc: 'Add your latest achievement to the gallery.',
    tags: [],
    thumbnail: '+',
  },
]

const SIDEBAR_WORKSPACE = [
  { label: 'All Projects', icon: '⊞', id: 'all' },
  { label: 'Web Apps', icon: '🌐', id: 'web' },
  { label: 'Blockchain', icon: '🔗', id: 'blockchain' },
  { label: 'Brand Design', icon: '🎨', id: 'brand' },
]
const SIDEBAR_ACCOUNT = [
  { label: 'Featured', icon: '⭐', id: 'featured' },
  { label: 'Archived', icon: '📦', id: 'archived' },
]

export default function ProjectGallery() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  return (
    <div className="ipad-frame gallery-root">
      <div className="ipad-wallpaper" />

      {/* Status bar */}
      <div className="status-bar">
        <div className="status-time">{timeStr}</div>
        <div className="status-icons">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="rgba(255,255,255,0.9)">
            <rect x="0" y="5" width="2" height="6" rx="0.5"/>
            <rect x="3" y="3" width="2" height="8" rx="0.5"/>
            <rect x="6" y="1.5" width="2" height="9.5" rx="0.5"/>
            <rect x="9" y="0" width="2" height="11" rx="0.5"/>
          </svg>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="rgba(255,255,255,0.85)">
            <path d="M8 3C10.2 3 12.2 3.9 13.6 5.4L14.5 4.4C12.8 2.7 10.5 1.5 8 1.5C5.5 1.5 3.2 2.7 1.5 4.4L2.4 5.4C3.8 3.9 5.8 3 8 3Z"/>
            <path d="M8 5.5C9.6 5.5 11 6.2 12 7.3L12.9 6.3C11.6 4.8 9.9 4 8 4C6.1 4 4.4 4.8 3.1 6.3L4 7.3C5 6.2 6.4 5.5 8 5.5Z"/>
            <circle cx="8" cy="9.5" r="1.5"/>
          </svg>
          <div className="status-battery"><div className="status-battery-fill"/><div className="status-battery-tip"/></div>
        </div>
      </div>

      {/* App window */}
      <div className="gallery-app anim-slidein">
        {/* Sidebar */}
        <aside className="gallery-sidebar">
          {/* App logo */}
          <div className="gallery-logo">
            <div className="gallery-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </div>
            <span className="gallery-logo-text">Studio.</span>
          </div>

          {/* Workspace section */}
          <div className="sidebar-section">
            <p className="sidebar-section-label">WORKSPACE</p>
            {SIDEBAR_WORKSPACE.map(item => (
              <button
                key={item.id}
                className={`sidebar-item ${activeFilter === item.id ? 'sidebar-item-active' : ''}`}
                onClick={() => setActiveFilter(item.id)}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Account section */}
          <div className="sidebar-section">
            <p className="sidebar-section-label">ACCOUNT</p>
            {SIDEBAR_ACCOUNT.map(item => (
              <button
                key={item.id}
                className={`sidebar-item ${activeFilter === item.id ? 'sidebar-item-active' : ''}`}
                onClick={() => setActiveFilter(item.id)}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User profile at bottom */}
          <div className="sidebar-user">
            <div className="sidebar-avatar">AA</div>
            <div>
              <p className="sidebar-username">Ayush Agrawal</p>
              <p className="sidebar-userrole">Pro Account</p>
            </div>
            <button className="sidebar-settings">⚙</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="gallery-main">
          {/* Toolbar */}
          <div className="gallery-toolbar">
            <div className="gallery-toolbar-left">
              <button className="toolbar-back" onClick={() => navigate('/home')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="gallery-title">Gallery</h1>
              <div className="live-badge">
                <span className="live-dot" />
                LIVE UPDATES
              </div>
            </div>
            <div className="gallery-toolbar-right">
              <div className="search-bar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Search projects...</span>
              </div>
              <button className="toolbar-icon-btn">🔔</button>
              <button className="gallery-new-btn">+ New Project</button>
            </div>
          </div>

          {/* Filter chips */}
          <div className="gallery-filters">
            {['All Stack', 'React', 'Tailwind', 'Node.js', 'Solidity'].map((f, i) => (
              <button key={f} className={`filter-chip ${i === 0 ? 'filter-chip-active' : ''}`}>{f}</button>
            ))}
            <div className="gallery-sort">Sort by: <strong>Recent ▾</strong></div>
          </div>

          {/* Project grid */}
          <div className="gallery-grid">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.id}
                className={`gallery-card ${proj.isPlaceholder ? 'gallery-card-placeholder' : ''}`}
                style={{ '--card-bg': proj.bgColor, animationDelay: `${i * 0.07 + 0.1}s` }}
                onClick={() => !proj.isPlaceholder && window.open(proj.link, '_blank')}
              >
                {proj.isPlaceholder ? (
                  <div className="placeholder-inner">
                    <div className="placeholder-plus">+</div>
                    <p className="placeholder-label">New Case Study</p>
                    <p className="placeholder-sub">Add your latest achievement to the gallery</p>
                  </div>
                ) : (
                  <>
                    <div className="card-thumb" style={{ background: proj.bgColor }}>
                      <span className="card-emoji">{proj.thumbnail}</span>
                    </div>
                    <div className="card-info">
                      <div className="card-title-row">
                        <h3 className="card-title">{proj.title}</h3>
                        <span className="card-type" style={{ background: `${proj.typeColor}25`, color: proj.typeColor }}>{proj.type}</span>
                      </div>
                      <p className="card-desc">{proj.desc}</p>
                      <div className="card-tags">
                        {proj.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>


    </div>
  )
}
