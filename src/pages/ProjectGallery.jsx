import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectGallery.css'

const PROJECTS = [
  {
    id: 2,
    title: 'Pintura',
    type: 'BLOCKCHAIN',
    typeColor: '#8b5cf6',
    desc: 'Decentralized file sharing with IPFS & Solidity. 100+ demo transfers on testnet.',
    tags: ['Solidity', 'Ethers.js', 'IPFS'],
    github: 'https://github.com/SeeThearc/PINTURA',
    live: 'https://pintura-chi.vercel.app/',
    image: '/projects/pintura.png',
    placeholderSeed: 'pintura42',
    featured: true,
  },
  {
    id: 3,
    title: 'ParkIT',
    type: 'MERN',
    typeColor: '#10b981',
    desc: 'Full-stack mall parking system. Real-time slot booking. 30% fewer conflicts.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    github: 'https://github.com/SeeThearc/ParkIT---Mall-parking-system',
    live: 'https://park-it-mall-parking-system-tfwi.vercel.app/',
    image: '/projects/parkit.png',
    placeholderSeed: 'parkit88',
    featured: false,
  },
  {
    id: 1,
    title: 'StreamSphere',
    type: 'MERN',
    typeColor: '#3b82f6',
    desc: 'React.js OTT platform frontend with reusable components and 25% faster feature integration.',
    tags: ['React', 'CSS', 'JS'],
    github: 'https://github.com/SeeThearc/StreamReact',
    live: '#',
    image: '/projects/streamsphere.png',
    placeholderSeed: 'stream12',
    featured: false,
  },
  {
    id: 5,
    title: 'HotReload',
    type: 'Go',
    typeColor: '#06b6d4',
    desc: 'HotReload is a fast dev tool that enables real-time updates in Go apps without restarting.',
    tags: ['Go'],
    github: 'https://github.com/SeeThearc/hotreload',
    live: '#',
    image: '/projects/hotreload.png',
    placeholderSeed: 'golang77',
    featured: true,
  },
  {
    id: 4,
    title: 'UniStay',
    type: 'MERN',
    typeColor: '#f59e0b',
    desc: 'Smart hostel management platform that simplifies room allocation, payments, and student accommodation.',
    tags: ['React', 'CSS', 'JS', 'Node', 'Express', 'MongoDB'],
    github: 'https://github.com/SeeThearc/UniStay',
    live: 'https://uni-stay-s7sm.vercel.app',
    image: '/projects/unistay.png',
    placeholderSeed: 'unistay55',
    featured: true,
  },
  {
    id: 6,
    title: 'Nuvora — EHR',
    type: 'BLOCKCHAIN',
    typeColor: '#8b5cf6',
    desc: 'Web3-based EHR system enabling secure, decentralized, tamper-proof patient data management.',
    tags: ['Solidity', 'Ethers.js', 'IPFS', 'React', 'Metamask'],
    github: 'https://github.com/SeeThearc/Nuvora---Electronic-Health-Records',
    live: 'https://nuvora-electronic-health-records.vercel.app/',
    image: '/projects/nuvora.png',
    placeholderSeed: 'nuvora33',
    featured: true,
  },
  {
    id: 7,
    title: 'Delcopa Faucet',
    type: 'BLOCKCHAIN',
    typeColor: '#f59e0b',
    desc: 'Web3 app that distributes free Delcopa ERC-20 tokens for testing and development purposes.',
    tags: ['Solidity', 'Ethers.js', 'React', 'Metamask'],
    github: 'https://github.com/SeeThearc/DelCopa-Faucet-ERC20-Token-',
    live: 'https://del-copa-faucet-erc-20-token.vercel.app/',
    image: '/projects/delcopa.png',
    placeholderSeed: 'delcopa21',
    featured: false,
  },
]

const SIDEBAR_WORKSPACE = [
  { label: 'All Projects', icon: '⊞', id: 'all' },
  { label: 'MERN', icon: '⚛️', id: 'MERN' },
  { label: 'Blockchain (WEB3)', icon: '🔗', id: 'BLOCKCHAIN' },
  { label: 'Machine Learning', icon: '🧠', id: 'MACHINE_LEARNING' },
]
const SIDEBAR_ACCOUNT = [
  { label: 'Featured', icon: '⭐', id: 'featured' },
]

/* ── Tilt + Glare Card ────────────────────────────── */
function ProjectCard({ proj, onOpen, index }) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)   // -1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2)  // -1 to 1

      // 3D tilt — max 12deg
      const rotX = -dy * 12
      const rotY = dx * 12

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`

      // Glare position — follows cursor
      if (glareRef.current) {
        const gx = (dx + 1) / 2 * 100   // 0–100%
        const gy = (dy + 1) / 2 * 100
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 65%)`
        glareRef.current.style.opacity = '1'
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      className="gallery-card"
      style={{ animationDelay: `${index * 0.07 + 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(proj)}
    >
      {/* Full-bleed image */}
      <img
        className="card-image"
        src={proj.image}
        alt={proj.title}
        onError={e => {
          e.currentTarget.onerror = null
          e.currentTarget.src = `https://picsum.photos/seed/${proj.placeholderSeed}/600/340`
        }}
      />

      {/* Dark gradient overlay */}
      <div className="card-overlay" />

      {/* Glare layer */}
      <div ref={glareRef} className="card-glare" />

      {/* Frosted glass info panel */}
      <div className="card-glass">
        <div className="card-title-row">
          <h3 className="card-title">{proj.title}</h3>
          <span
            className="card-type"
            style={{ background: `${proj.typeColor}28`, color: proj.typeColor, borderColor: `${proj.typeColor}50` }}
          >
            {proj.type}
          </span>
        </div>

        <p className="card-desc">{proj.desc}</p>

        <div className="card-tags">
          {proj.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
        </div>

        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button
            className="card-action-btn btn-github"
            onClick={() => window.open(proj.github, '_blank')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </button>
          {proj.live && proj.live !== '#' && (
            <button
              className="card-action-btn btn-live"
              onClick={() => window.open(proj.live, '_blank')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Expand Modal ─────────────────────────────────── */
function ProjectModal({ proj, onClose }) {
  if (!proj) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {/* Modal image header */}
        <div className="modal-image-wrap">
          <img
            className="modal-image"
            src={proj.image}
            alt={proj.title}
            onError={e => {
              e.currentTarget.onerror = null
              e.currentTarget.src = `https://picsum.photos/seed/${proj.placeholderSeed}/800/400`
            }}
          />
          <div className="modal-image-overlay" />
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="modal-header-info">
            <span
              className="card-type"
              style={{ background: `${proj.typeColor}28`, color: proj.typeColor, borderColor: `${proj.typeColor}50` }}
            >
              {proj.type}
            </span>
            <h2 className="modal-title">{proj.title}</h2>
          </div>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          <p className="modal-desc">{proj.desc}</p>

          <div className="modal-section">
            <p className="modal-section-label">TECH STACK</p>
            <div className="card-tags">
              {proj.tags.map(t => <span key={t} className="card-tag modal-tag">{t}</span>)}
            </div>
          </div>

          <div className="modal-actions">
            <a
              className="modal-action-btn btn-github"
              href={proj.github}
              target="_blank"
              rel="noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
            {proj.live && proj.live !== '#' && (
              <a
                className="modal-action-btn btn-live"
                href={proj.live}
                target="_blank"
                rel="noreferrer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Open Live Site ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ────────────────────────────────────── */
export default function ProjectGallery() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [openProject, setOpenProject] = useState(null)

  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  const displayedProjects = PROJECTS.filter(proj => {
    if (activeFilter === 'featured') return proj.featured
    if (activeFilter === 'all') return true
    return proj.type === activeFilter
  })

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

          <div className="sidebar-user">
            <div className="sidebar-avatar">
              <img src="/animated_ayush.png" alt="Ayush Agrawal" />
            </div>
            <div>
              <p className="sidebar-username">Ayush Agrawal</p>
              <p className="sidebar-userrole">@SeeThearc</p>
            </div>
            <button className="sidebar-settings">⚙</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="gallery-main">
          <div className="gallery-toolbar">
            <div className="gallery-toolbar-left">
              <button className="toolbar-back" onClick={() => navigate('/home')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="gallery-title">Gallery</h1>
            </div>
            <div className="gallery-toolbar-quote">
              "Code. Debug. Improve. Repeat."
            </div>
          </div>

          {/* Project grid */}
          <div className="gallery-grid" key={activeFilter}>
            {displayedProjects.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                proj={proj}
                index={i}
                onOpen={setOpenProject}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Expand Modal */}
      {openProject && (
        <ProjectModal proj={openProject} onClose={() => setOpenProject(null)} />
      )}
    </div>
  )
}
