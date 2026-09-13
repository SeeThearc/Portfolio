import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppWindow from '../components/AppWindow'

const groups = [
  { name: 'Languages', icon: '</>', description: 'The building blocks.', items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'Solidity', 'SQL'] },
  { name: 'Web development', icon: '⌘', description: 'From interface to infrastructure.', items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
  { name: 'AI & machine learning', icon: '✦', description: 'Software with a little intelligence.', items: ['Python', 'Scikit-learn', 'Machine Learning', 'Data Visualization'] },
  { name: 'Blockchain', icon: '⬡', description: 'Exploring decentralized systems.', items: ['Solidity', 'Hardhat', 'Ethers.js', 'IPFS'] },
  { name: 'Foundations', icon: 'ϟ', description: 'The thinking behind the code.', items: ['Data Structures', 'Algorithms', 'OOP', 'SDLC', 'Agile'] },
]
const practice = [
  { title: 'Full-stack development', project: 'UniStay', text: 'Room allocation, payments, and student accommodation.', tech: 'React · Node · Express · MongoDB', image: '/unistay.png' },
  { title: 'AI-powered applications', project: 'LeetCoach', text: 'Progressive hints, code reviews, and personalized learning.', tech: 'React · FastAPI · LangGraph · Gemini', image: '/leetcoach.png' },
  { title: 'Decentralized applications', project: 'Pintura', text: 'File sharing powered by decentralized storage.', tech: 'Solidity · Ethers.js · IPFS', image: '/pintura.png' },
]
export default function Skills() {
  const [filter, setFilter] = useState('All skills')
  const [query, setQuery] = useState('')
  const visible = groups.filter(g => filter === 'All skills' || filter === g.name).map(g => ({ ...g, items: g.items.filter(s => s.toLowerCase().includes(query.trim().toLowerCase())) })).filter(g => g.items.length)
  return <AppWindow name="Skills" icon="ϟ" subtitle="My developer toolbox" className="skills-app" actions={<Link to="/projects">See my work ↗</Link>}>
    <div className="portfolio-scroll">
      <div className="app-intro"><div><span className="app-eyebrow">A TOOLBOX THAT KEEPS GROWING</span><h2>Different tools.<br /><em>One curious mind.</em></h2><p>The languages, frameworks, and fundamentals I use to turn ideas into working software.</p></div><div className="skills-summary"><span>⌘</span><strong>Built through practice.</strong><p>Full-stack · AI · Web3</p><Link to="/projects">Explore the projects behind the skills ↗</Link></div></div>
      <div className="skills-filter-row"><div className="app-segments" aria-label="Skill categories">{['All skills', ...groups.map(g => g.name)].map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><input type="search" aria-label="Search skills" placeholder="Find a skill…" value={query} onChange={e => setQuery(e.target.value)} /></div>
      <div className="skill-category-grid">{visible.map(g => <section className="skill-category" key={g.name}><div className="skill-category-heading"><span>{g.icon}</span><div><h3>{g.name}</h3><p>{g.description}</p></div><small>{g.items.length}</small></div><div className="skill-token-list">{g.items.map(skill => <span key={skill}>{skill}</span>)}</div></section>)}</div>
      {!visible.length && <div className="app-empty"><h3>No skills match that search.</h3><button onClick={() => { setQuery(''); setFilter('All skills') }}>Reset filters</button></div>}
      <div className="app-section-title"><h2>Put into practice</h2><span>Explore the work, not just the keywords.</span></div><div className="skill-evidence-grid">{practice.map(p => <Link to={`/projects?q=${encodeURIComponent(p.project)}`} className="skill-evidence" key={p.project}><img src={p.image} alt="" /><div><small>{p.title}</small><h3>{p.project} <span>↗</span></h3><p>{p.text}</p><span>{p.tech}</span></div></Link>)}</div>
    </div>
  </AppWindow>
}
