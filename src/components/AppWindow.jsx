import { Link } from 'react-router-dom'
import NavigationIcon from './NavigationIcon'
import './PortfolioApps.css'

export default function AppWindow({ name, icon, subtitle, children, actions, className = '' }) {
  return <div className={`ipad-frame portfolio-app-root ${className}`}>
    <div className="ipad-wallpaper" />
    <main className="portfolio-window anim-slidein">
      <header className="portfolio-toolbar">
        <Link className="portfolio-back" to="/home" aria-label="Back to Home Screen"><NavigationIcon /></Link>
        <span className="portfolio-app-icon" aria-hidden="true">{icon}</span>
        <div><h1>{name}</h1><p>{subtitle}</p></div>
        <div className="portfolio-toolbar-actions">{actions}</div>
      </header>
      {children}
    </main>
  </div>
}

