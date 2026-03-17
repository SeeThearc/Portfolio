import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { label: 'Home', path: '/home' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')}>
        <span className="nav-logo-icon">⬡</span>
        <span>Thearc</span>
      </div>
      <ul className="nav-links">
        {LINKS.map(l => (
          <li key={l.path}>
            <button
              className={`nav-link ${pathname === l.path ? 'nav-link-active' : ''}`}
              onClick={() => navigate(l.path)}
            >
              {l.label}
              {pathname === l.path && <span className="nav-indicator" />}
            </button>
          </li>
        ))}
      </ul>
      <a
        href="mailto:ayushagrawal2334@gmail.com"
        className="nav-cta glass"
      >
        Hire Me ✦
      </a>
    </nav>
  )
}
