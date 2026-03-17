import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './AboutResume.css'

const SKILLS = {
  'Languages': ['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'Solidity', 'SQL'],
  'Frameworks': ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Hardhat', 'Ethers.js', 'Scikit-learn'],
  'Concepts': ['DSA', 'OOP', 'Machine Learning', 'Blockchain', 'Data Visualization'],
}
const TABS = ['Profile', 'Experience', 'Education', 'Skills', 'Certifications']

export default function AboutResume() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || 'Profile'
  const [tab, setTab] = useState(TABS.includes(initialTab) ? initialTab : 'Profile')
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  return (
    <div className="ipad-frame about-root">
      <div className="ipad-wallpaper" />

      <div className="status-bar">
        <div className="status-time">{timeStr}</div>
        <div className="status-icons">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="rgba(255,255,255,0.9)"><rect x="0" y="5" width="2" height="6" rx="0.5"/><rect x="3" y="3" width="2" height="8" rx="0.5"/><rect x="6" y="1.5" width="2" height="9.5" rx="0.5"/><rect x="9" y="0" width="2" height="11" rx="0.5"/></svg>
          <div className="status-battery"><div className="status-battery-fill"/><div className="status-battery-tip"/></div>
        </div>
      </div>

      <div className="about-app anim-slidein">
        {/* Sidebar */}
        <aside className="about-sidebar">
          <div className="about-logo">
            <button className="about-back-btn" onClick={() => navigate('/home')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="about-logo-text">About Me</span>
          </div>

          <div className="about-profile-block">
            <div className="about-avatar">AA</div>
            <h3 className="about-name">Ayush Agrawal</h3>
            <p className="about-role-text">Full-Stack Dev</p>
            <p className="about-uni">VIT Chennai · CSE</p>
          </div>

          <nav className="about-nav">
            {TABS.map(t => (
              <button key={t} className={`about-nav-btn ${tab === t ? 'about-nav-active' : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </nav>

          <div className="about-contact-links">
            <a href="mailto:ayushagrawal2334@gmail.com" className="about-contact-link">✉ Email</a>
            <a href="https://github.com/SeeThearc" target="_blank" rel="noreferrer" className="about-contact-link">⌥ GitHub</a>
            <a href="https://www.linkedin.com/in/ayush-agrawal23/" target="_blank" rel="noreferrer" className="about-contact-link">↗ LinkedIn</a>
          </div>
        </aside>

        {/* Content */}
        <main className="about-content">
          {tab === 'Profile' && (
            <div className="content-pane">
              <h2 className="content-title">Professional Summary</h2>
              <p className="content-para">Enthusiastic Developer with a strong foundation in Data Structures, Algorithms, and full-stack web development. Proficient in C/C++, Python, HTML, CSS, JavaScript, and React. Skilled in building scalable and responsive applications, team collaboration, and problem-solving. Currently exploring blockchain, machine learning, and distributed systems.</p>
              <div className="stat-row">
                {[['9.25','CGPA'],['150+','LeetCode'],['3','Projects'],['2','Certs']].map(([v,l]) => (
                  <div key={l} className="stat-tile">
                    <span className="stat-val">{v}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Experience' && (
            <div className="content-pane">
              <h2 className="content-title">Experience</h2>
              {[
                { role:'Operations Lead', org:'AI Club — VIT Chennai', period:'Mar 2024–Present', color:'#3b82f6', points:['Leading operations and managing project workflows','Coordinated a 24-hour offline hackathon as OC member'] },
                { role:'Technical Team Member', org:'Game Dev Club — VIT Chennai', period:'Jul 2024–Jun 2025', color:'#8b5cf6', points:['Improved reusable frontend components, reducing dev time by 40%','Organized and managed offline gaming events'] },
              ].map((e,i) => (
                <div key={i} className="exp-card" style={{'--ec':e.color}}>
                  <div className="exp-dot"/>
                  <div className="exp-body">
                    <div className="exp-header"><span className="exp-role">{e.role}</span><span className="exp-period">{e.period}</span></div>
                    <p className="exp-org">{e.org}</p>
                    {e.points.map((p,j) => <p key={j} className="exp-point">▸ {p}</p>)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Education' && (
            <div className="content-pane">
              <h2 className="content-title">Education</h2>
              {[
                { degree:'B.Tech – Computer Science Engineering', school:'Vellore Institute of Technology, Chennai', year:'Expected July 2027', badge:'CGPA: 9.25/10', icon:'🎓' },
                { degree:'Higher Secondary (12th)', school:'Sacred Heart Public Sr. Sec. School, Kota', year:'March 2023', badge:'84%', icon:'🏫' },
              ].map((e,i) => (
                <div key={i} className="edu-card">
                  <div className="edu-icon">{e.icon}</div>
                  <div>
                    <h3 className="edu-degree">{e.degree}</h3>
                    <p className="edu-school">{e.school}</p>
                    <p className="edu-year">{e.year}</p>
                    <span className="edu-badge">{e.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Skills' && (
            <div className="content-pane">
              <h2 className="content-title">Skills</h2>
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat} className="skill-group">
                  <p className="skill-cat">{cat}</p>
                  <div className="skill-chips">{items.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Certifications' && (
            <div className="content-pane">
              <h2 className="content-title">Certifications</h2>
              {[
                { title:'Blockchain Developer', issuer:'IBM', date:'June 17, 2025', icon:'🔗', color:'#06b6d4' },
                { title:'Mastering DSA using C and C++', issuer:'Udemy', date:'March 9, 2025', icon:'⚡', color:'#6366f1' },
              ].map((c,i) => (
                <div key={i} className="cert-card">
                  <div className="cert-icon" style={{background:`${c.color}20`,border:`1px solid ${c.color}35`}}>{c.icon}</div>
                  <div className="cert-info"><h3 className="cert-title">{c.title}</h3><p className="cert-issuer">{c.issuer}</p></div>
                  <span className="cert-date">{c.date}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>


    </div>
  )
}
