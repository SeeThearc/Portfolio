import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import NavigationIcon from '../components/NavigationIcon'
import './HomeScreen.css'

const apps = [
  { id:'projects', label:'Projects', color:'#2563eb', path:'/projects' },
  { id:'about', label:'About Me', color:'#374151', path:'/about' },
  { id:'experience', label:'Experience', color:'#059669', path:'/experience' },
  { id:'skills', label:'Skills', color:'#d97706', path:'/skills' },
  { id:'contact', label:'Contact', color:'#7c3aed', path:'/contact' },
  { id:'resume', label:'Resume', color:'#be185d', path:'/Resume.pdf' },
  { id:'themes', label:'Themes', color:'#6366f1' },
]
function AppIcon({ name }) {
  const shapes = {
    projects: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/></>,
    about: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    experience: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M9 14h6m-3-3v6"/></>,
    skills: <path d="m13 2-10 12h9l-1 8 10-12h-9 1-8Z"/>,
    contact: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7L22 7"/></>,
    resume: <><path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 13h8M8 17h8"/></>,
    themes: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></>,
    home: <path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>,
  }
  return <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>
}
function Appearance({ onClose }) {
  const { theme, setTheme, themes } = useTheme()
  const ref = useRef(null)
  useEffect(() => { const previous = document.activeElement; ref.current.showModal(); return () => previous?.focus() }, [])
  return <dialog ref={ref} className="theme-panel appearance-dialog" aria-label="Appearance" onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose() }}>
    <div className="theme-panel-header"><h2 className="theme-panel-title">Appearance</h2><button className="theme-close" onClick={onClose} aria-label="Close Appearance"><NavigationIcon close /></button></div>
    <p className="theme-panel-sub">Choose your interface colour scheme</p>
    <div className="theme-options">{Object.values(themes).map(t => <button key={t.id} className={`theme-option ${theme === t.id ? 'theme-option-active' : ''}`} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}><span className="theme-swatch"><span className="swatch-bg" style={{ background:t.preview[0] }}><span className="swatch-accent" style={{ background:t.preview[1] }}/><span className="swatch-accent2" style={{ background:t.preview[2] }}/></span></span><span className="theme-option-info"><span className="theme-option-name">{t.name}</span>{t.id === 'blue' && <span className="theme-option-default">Default</span>}</span>{theme === t.id && <span className="theme-checkmark">✓</span>}</button>)}</div>
    <p className="theme-panel-hint">Changes apply instantly across all screens</p>
  </dialog>
}
export default function HomeScreen() {
  const [themePicker, setThemePicker] = useState(false)
  const now = new Date()
  return <div className="ipad-frame home-root"><div className="ipad-wallpaper"/>
    <div className="app-grid-wrapper">
      <div className="home-heading"><div><p>YOUR DAILY DOSE OF CURIOSITY</p><h1>A little more than a portfolio.</h1></div><span>Welcome to my workspace.</span></div>
      <div className="home-widgets">
        <Link className="home-widget profile-widget" to="/about"><div><span className="widget-kicker">THE PERSON BEHIND THE CODE</span><h2>Hey, I’m Ayush<span>.</span></h2><p>I turn interesting problems<br/>into thoughtful software.</p><span className="widget-chip"><i/> Open to opportunities</span></div><img src="/animated_ayush.png" alt="Ayush Agrawal"/><span className="widget-arrow">↗</span></Link>
        <Link className="home-widget calendar-widget" to="/experience"><span>{now.toLocaleDateString('en-US',{weekday:'long'})}</span><strong>{now.getDate()}</strong><p>{now.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</p><div className="calendar-event"><b>Always in progress</b><small>Learning. Building. Repeating.</small></div></Link>
        <Link className="home-widget projects-widget" to="/projects"><span className="widget-kicker">FROM IDEA TO REALITY</span><div className="widget-project-images"><img src="/leetcoach.png" alt=""/><img src="/pintura.png" alt=""/></div><div className="widget-project-footer"><div><b>Things I’ve built</b><small>11 projects · endless possibilities</small></div><span>↗</span></div></Link>
      </div>
      <p className="home-app-section-label">A FEW APPS. A WHOLE LOT OF ME.</p>
      <div className="app-grid">{apps.map(app => {
        const content = <><span className="app-icon-wrap" style={{background:app.color}}><AppIcon name={app.id}/></span><span className="app-label">{app.label}</span></>
        if(app.id === 'themes') return <button key={app.id} className="app-item" onClick={() => setThemePicker(true)}>{content}</button>
        if(app.id === 'resume') return <a key={app.id} className="app-item" href={app.path} target="_blank" rel="noreferrer">{content}</a>
        return <Link key={app.id} className="app-item" to={app.path}>{content}</Link>
      })}</div>
    </div>
    <div className="dock-wrapper"><div className="dock">
      <Link className="dock-item" to="/home" aria-label="home"><span className="dock-icon-wrap" style={{background:'#1c1c1e'}}><AppIcon name="home"/></span></Link>
      <a className="dock-item" href="https://github.com/SeeThearc" target="_blank" rel="noreferrer" aria-label="github"><span className="dock-icon-wrap" style={{background:'#1c1c1e'}}><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg></span></a>
      <a className="dock-item" href="https://www.linkedin.com/in/ayush-agrawal23/" target="_blank" rel="noreferrer" aria-label="linkedin"><span className="dock-icon-wrap" style={{background:'#0077b5',fontSize:28,fontWeight:700}}>in</span></a>
      <a className="dock-item" href="https://leetcode.com/u/Thearc" target="_blank" rel="noreferrer" aria-label="LeetCode"><span className="dock-icon-wrap" style={{background:'#d49c39'}}><svg width="27" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15.5 2-10 10a4.2 4.2 0 0 0 0 6l3 3a4.2 4.2 0 0 0 6 0l2-2"/><path d="m8.5 9 2-2a4.2 4.2 0 0 1 6 0l2 2M11 15h10"/></svg></span></a>
    </div></div>
    {themePicker && <Appearance onClose={() => setThemePicker(false)}/>}
  </div>
}
