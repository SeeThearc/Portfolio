import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppWindow from '../components/AppWindow'

const roles = [
  { id: 'ai', icon: '✦', title: 'Operations Lead', organization: 'AI Club', location: 'VIT Chennai', period: 'Mar 2024 — Present', status: 'Current', summary: 'Bringing people, projects, and ideas together.', description: 'Leading operations and managing project workflows at the AI Club, with a focus on coordination and making technical events happen.', contributions: ['Leading operations and managing project workflows.', 'Coordinated a 24-hour offline hackathon as an organizing committee member.'], tags: ['Leadership', 'Project workflows', 'Event operations'] },
  { id: 'game', icon: '⊞', title: 'Technical Team Member', organization: 'Game Dev Club', location: 'VIT Chennai', period: 'Jul 2024 — Jun 2025', status: 'Previous', summary: 'Building reusable interfaces and shared experiences.', description: 'Contributed to frontend development and helped organize gaming events as part of the Game Dev Club technical team.', contributions: ['Improved reusable frontend components, reducing development time by 40%.', 'Organized and managed offline gaming events.'], tags: ['Frontend development', 'Reusable components', 'Teamwork'] },
]
export default function Experience() {
  const [selected, setSelected] = useState('ai')
  const role = roles.find(r => r.id === selected)
  return <AppWindow name="Experience" icon="▣" subtitle="Learning by doing" className="experience-app" actions={<a href="/Resume.pdf" download>Download résumé ↓</a>}>
    <div className="portfolio-scroll">
      <div className="app-intro experience-intro"><div><span className="app-eyebrow">PEOPLE. PROJECTS. PROGRESS.</span><h2>More than code.<br /><em>Making things happen.</em></h2><p>A look at the teams I’ve been part of, the responsibilities I’ve taken on, and what I’ve built along the way.</p></div><div className="experience-note"><span>↗</span><p>Growing through<br /><strong>real responsibility.</strong></p><small>Community & technical experience</small></div></div>
      <div className="experience-layout"><nav className="role-list" aria-label="Experience roles"><p className="app-eyebrow">MY JOURNEY</p>{roles.map(r => <button key={r.id} aria-pressed={selected === r.id} onClick={() => setSelected(r.id)}><span className={`role-list-icon role-${r.id}`}>{r.icon}</span><span><small>{r.period}</small><strong>{r.title}</strong><span>{r.organization} · {r.location}</span></span><i>›</i></button>)}</nav>
        <article className="role-detail" key={role.id}><div className="role-detail-top"><span className={`role-emblem role-${role.id}`}>{role.icon}</span><span className={`role-status ${role.status === 'Current' ? 'current' : ''}`}>{role.status === 'Current' ? '● Current role' : 'Completed role'}</span></div><p className="role-organization">{role.organization} / {role.location}</p><h2>{role.title}</h2><p className="role-period">{role.period}</p><h3>{role.summary}</h3><p className="role-description">{role.description}</p><h4>What I contributed</h4><ul>{role.contributions.map(p => <li key={p}><span>↗</span>{p}</li>)}</ul><div className="skill-token-list">{role.tags.map(t => <span key={t}>{t}</span>)}</div></article>
      </div><div className="experience-bottom"><div><span>🎓</span><div><strong>B.Tech · Computer Science Engineering</strong><p>VIT Chennai · Expected July 2027 · CGPA 9.20/10</p></div></div><Link to="/about?tab=Education">View education ↗</Link></div>
    </div>
  </AppWindow>
}
