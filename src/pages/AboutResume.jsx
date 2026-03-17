import { useState, useEffect, useRef } from 'react'
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
  const [activeSegment, setActiveSegment] = useState('Profile')

  const contentRef = useRef(null)
  const sectionRefs = useRef({})

  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  // On mount or query param change, scroll to section
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && sectionRefs.current[tabParam]) {
      // Use setTimeout to ensure DOM has settled, then snap instantly
      setTimeout(() => {
        sectionRefs.current[tabParam].scrollIntoView({ behavior: 'instant', block: 'start' })
      }, 50)
    }
  }, [searchParams])

  // Scroll spy to update active sidebar tab
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      
      const scrollPos = contentRef.current.scrollTop + 100 // offset for early trigger
      let currentActive = 'Profile'

      for (const section of TABS) {
        const el = sectionRefs.current[section]
        if (el && el.offsetTop <= scrollPos) {
          currentActive = section
        }
      }
      setActiveSegment(currentActive)
    }

    const container = contentRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      // trigger once on mount
      handleScroll()
    }
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToSection(section) {
    if (sectionRefs.current[section]) {
      sectionRefs.current[section].scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            <div className="about-avatar">
              <img src="/avatar.png" alt="Ayush Agrawal" />
            </div>
            <h3 className="about-name">Ayush Agrawal</h3>
            <p className="about-role-text">Full-Stack Dev</p>
            <p className="about-uni">VIT Chennai · CSE</p>
          </div>

          <nav className="about-nav">
            {TABS.map(t => (
              <button
                key={t}
                className={`about-nav-btn ${activeSegment === t ? 'about-nav-active' : ''}`}
                onClick={() => scrollToSection(t)}
              >
                {t}
              </button>
            ))}
          </nav>

          <div className="about-contact-links">
            <a href="mailto:ayushagrawal2334@gmail.com" className="about-contact-link">✉ Email</a>
            <a href="https://github.com/SeeThearc" target="_blank" rel="noreferrer" className="about-contact-link">⌥ GitHub</a>
            <a href="https://www.linkedin.com/in/ayush-agrawal23/" target="_blank" rel="noreferrer" className="about-contact-link">↗ LinkedIn</a>
          </div>
        </aside>

        {/* Scrolling Content Area */}
        <main className="about-content" ref={contentRef}>
          <div className="about-scroll-container">
            
            {/* ── Profile Section ── */}
            <div className="content-pane" ref={el => sectionRefs.current['Profile'] = el} id="Profile">
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

            <div className="pane-divider" />

            {/* ── Experience Section ── */}
            <div className="content-pane" ref={el => sectionRefs.current['Experience'] = el} id="Experience">
              <h2 className="content-title">Experience</h2>
              {[
                { role:'Operations Lead', org:'AI Club — VIT Chennai', period:'Mar 2024–Present', color:'var(--accent)', points:['Leading operations and managing project workflows','Coordinated a 24-hour offline hackathon as OC member'] },
                { role:'Technical Team Member', org:'Game Dev Club — VIT Chennai', period:'Jul 2024–Jun 2025', color:'var(--accent-2)', points:['Improved reusable frontend components, reducing dev time by 40%','Organized and managed offline gaming events'] },
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

            <div className="pane-divider" />

            {/* ── Education Section ── */}
            <div className="content-pane" ref={el => sectionRefs.current['Education'] = el} id="Education">
              <h2 className="content-title">Education</h2>
              {[
                { degree:'B.Tech – Computer Science Engineering', school:'Vellore Institute of Technology, Chennai', year:'Expected July 2027', badge:'CGPA: 9.25/10', icon:'🎓' },
                { degree:'Higher Secondary (12th)', school:'Sacred Heart Public Sr. Sec. School, Kota', year:'March 2023', badge:'84%', icon:'🏫' },
              ].map((e,i) => (
                <div key={i} className="edu-card">
                  <div className="edu-card-left">
                    <div className="edu-icon">{e.icon}</div>
                    <div className="edu-details">
                      <h3 className="edu-degree">{e.degree}</h3>
                      <p className="edu-school">{e.school}</p>
                      <p className="edu-year">{e.year}</p>
                    </div>
                  </div>
                  <span className="edu-badge">{e.badge}</span>
                </div>
              ))}
            </div>

            <div className="pane-divider" />

            {/* ── Skills Section ── */}
            <div className="content-pane" ref={el => sectionRefs.current['Skills'] = el} id="Skills">
              <h2 className="content-title">Skills</h2>
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat} className="skill-group">
                  <p className="skill-cat">{cat}</p>
                  <div className="skill-chips">{items.map(s => <span key={s} className="skill-chip">{s}</span>)}</div>
                </div>
              ))}
            </div>

            <div className="pane-divider" />

            {/* ── Certifications Section ── */}
            <div className="content-pane" ref={el => sectionRefs.current['Certifications'] = el} id="Certifications">
              <h2 className="content-title">Certifications</h2>
              {[
                { title:'Blockchain Developer', issuer:'IBM', date:'June 17, 2025', icon:'🔗', color:'var(--accent)', link: 'https://courses.vit.skillsnetwork.site/certificates/fd35bd85aa0f4e45bb2ce49543b69ef9' },
                { title:'Mastering DSA using C and C++', issuer:'Udemy', date:'March 9, 2025', icon:'⚡', color:'var(--accent-2)', link: 'https://www.udemy.com/certificate/UC-6d956b8e-7042-4c91-8381-c089758d1111/' },
              ].map((c,i) => (
                <a key={i} className="cert-card" href={c.link} target="_blank" rel="noreferrer">
                  <div className="cert-icon" style={{background:`${c.color}20`,border:`1px solid ${c.color}35`}}>{c.icon}</div>
                  <div className="cert-info"><h3 className="cert-title">{c.title}</h3><p className="cert-issuer">{c.issuer}</p></div>
                  <span className="cert-date">{c.date}</span>
                </a>
              ))}
            </div>
            
            {/* Bottom spacer so the last section can be scrolled to the top */}
            <div style={{ height: '40vh' }} />
          </div>
        </main>
      </div>
    </div>
  )
}
