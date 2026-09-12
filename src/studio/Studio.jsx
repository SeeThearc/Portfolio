import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import Sculpture from './Sculpture'
import './studio.css'

const EMAIL = 'ayushagrawal2334@gmail.com'
const categories = ['All work', 'AI & Data', 'Full stack', 'Web3', 'Developer tools']
const category = p => /^(AI|DATA)/.test(p.type) ? 'AI & Data' : p.type === 'BLOCKCHAIN' ? 'Web3' : p.type === 'Go' ? 'Developer tools' : 'Full stack'
const external = { target: '_blank', rel: 'noreferrer' }
function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span> }
function Dialog({ children, onClose, title }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const dialog = ref.current
    dialog.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  return <dialog ref={ref} className="modal" aria-label={title} onCancel={onClose} onClick={e => { if(e.target === ref.current) onClose() }}><button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>{children}</dialog>
}
export default function Studio() {
  const [filter, setFilter] = useState('All work')
  const [query, setQuery] = useState('')
  const [all, setAll] = useState(window.location.pathname === '/projects')
  const [project, setProject] = useState(null)
  const [command, setCommand] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [paused, setPaused] = useState(false)
  const [variant, setVariant] = useState(0)
  const [copied, setCopied] = useState('')
  const [time, setTime] = useState(new Date())
  const [active, setActive] = useState('home')
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    const key = e => { if((e.metaKey || e.ctrlKey) && e.key === 'k') {e.preventDefault(); setCommand(v=>!v)} }
    window.addEventListener('keydown', key)
    const observer = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) setActive(entry.target.id) }, {rootMargin: '-15% 0px -55% 0px'})
    document.querySelectorAll('main > section[id]').forEach(el=>observer.observe(el))
    const target = window.location.pathname === '/projects' ? 'work' : window.location.pathname === '/about' ? new URLSearchParams(window.location.search).get('tab')?.toLowerCase() || 'about' : null
    if(target) document.getElementById(target)?.scrollIntoView({behavior:'instant'})
    return () => {clearInterval(timer); window.removeEventListener('keydown',key); observer.disconnect()}
  }, [])
  const filtered = projects.filter(p=>(filter==='All work'||category(p)===filter) && `${p.title} ${p.desc} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const shown = all || filter !== 'All work' || query ? filtered : filtered.slice(0,4)
  const commands = [{label:'Home', href:'#home'},{label:'Selected work',href:'#work'},{label:'About me',href:'#about'},{label:'Experience',href:'#experience'},{label:'Get in touch',href:'#contact'},{label:'Download résumé',href:'/Resume.pdf'}, ...projects.map(p=>({label:p.title, project:p}))].filter(c=>c.label.toLowerCase().includes(commandQuery.toLowerCase()))
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied('Email copied!') } catch { setCopied('Please copy the email address above.') }
    setTimeout(()=>setCopied(''),3000)
  }
  return <>
    <a className="skip-link" href="#work">Skip to projects</a>
    <header className="header"><a className="wordmark" href="#home" aria-label="Ayush home">a<span>↗</span><span className="wordmark-name">ayush<span className="wordmark-dot">.</span></span></a><nav className={menu?'nav open':'nav'} aria-label="Main navigation">{[['home','Home'],['work','Work'],['about','About'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} className={active===id?'active':''} onClick={()=>setMenu(false)}>{label}</a>)}</nav><div className="header-actions"><button className="command-trigger" onClick={()=>setCommand(true)} aria-label="Open command palette">⌘ <kbd>K</kbd></button><a href="/Resume.pdf" className="resume-link" download>Résumé <span>↓</span></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>☰</button></div></header>
    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> OPEN TO OPPORTUNITIES</div><h1>A little logic.<br/>A lot of <span className="spark-word">possibility<svg viewBox="0 0 410 18" aria-hidden="true"><path d="M3 13Q185 -4 404 8M60 16Q230 4 380 13"/></svg></span><span className="orange">.</span></h1><p className="intro">Hey, I’m Ayush <span className="wave">✳</span></p><p className="hero-description">A software engineer connecting thoughtful design<br className="desktop-br"/> with full-stack, AI, and a healthy dose of curiosity.</p><div className="hero-buttons"><a className="button primary" href="#work">Explore my work <span>↓</span></a><a className="text-link" href="#contact">Let’s talk <Arrow/></a></div><div className="hero-note"><span className="tiny-cross">+</span> BASED IN INDIA <span className="note-line"/> BUILDING FOR EVERYWHERE</div></div>
        <div className="hero-art"><div className="art-top"><span>EXPERIMENT 001 / INFINITE CURIOSITY</span><span className="art-plus">+</span></div><div className="art-grid"/><Sculpture paused={paused} variant={variant}/><span className="art-coordinate">X 12.08° &nbsp; Y 80.27°</span><div className="art-bottom"><span><i className="small-dot"/> LIVE GENERATIVE OBJECT</span><div><button onClick={()=>setVariant(v=>1-v)} aria-label="Change sculpture shape">↻</button><button onClick={()=>setPaused(!paused)} aria-label={paused?'Play sculpture animation':'Pause sculpture animation'} aria-pressed={paused}>{paused?'▷':'Ⅱ'}</button></div></div><div className="orbit-note">a work in progress.<br/>just like me. <span>↖</span></div></div>
      </section>
      <div className="skills-ticker"><span>THINK. BUILD. ITERATE.</span><div>Full-stack development <i>✳</i> Artificial intelligence <i>✳</i> Blockchain <i>✳</i> Creative problem solving <i>✳</i></div></div>
      <section id="work" className="work section-shell"><div className="section-heading"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Ideas, made <span className="serif">real.</span></h2></div><p>A few things I’ve built.<br/>Each one, a new rabbit hole.</p></div><div className="work-toolbar"><div className="filters" aria-label="Filter projects">{categories.map(c=><button key={c} aria-pressed={filter===c} className={filter===c?'selected':''} onClick={()=>setFilter(c)}>{c}{c==='All work'&&<sup>{projects.length}</sup>}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input placeholder="Find a project…" aria-label="Search projects" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</label></div><div className="project-grid">{shown.map((p,i)=><button className={`project-card card-${p.id}`} key={p.id} onClick={()=>setProject(p)}><div className="project-image"><img src={p.image} alt={`${p.title} interface`} loading="lazy"/><span className="project-index">{String(projects.indexOf(p)+1).padStart(2,'0')} / {category(p).toUpperCase()}</span><span className="project-open" aria-hidden="true">↗</span></div><div className="project-info"><div><h3>{p.title}</h3><p>{p.desc}</p></div><span className="project-number">0{i+1}</span></div><div className="tags">{p.tags.slice(0,4).map(t=><span key={t}>{t}</span>)}</div></button>)}</div>{shown.length===0&&<div className="empty-state"><h3>No projects found.</h3><p>Try a different technology or project name.</p><button className="button" onClick={()=>{setQuery('');setFilter('All work')}}>Reset filters</button></div>}{filter==='All work'&&!query&&<button className="view-all" onClick={()=>setAll(!all)}>{all?'Show selected work':`Explore all ${projects.length} projects`} <span>{all?'↑':'↗'}</span></button>}</section>
      <section id="about" className="about section-shell"><div className="about-portrait"><div className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</div><div className="portrait-frame"><img src="/animated_ayush.png" alt="Illustrated portrait of Ayush Agrawal" loading="lazy"/><span className="portrait-star">✳</span><span className="portrait-caption">AYUSH AGRAWAL<br/><small>DEVELOPER. EXPLORER. ALWAYS LEARNING.</small></span></div></div><div className="about-copy"><h2>Curiosity is<br/>my <span className="serif">default setting.</span></h2><p>I’m a Computer Science student at VIT Chennai who loves turning “what if” into something you can actually use.</p><p>From intelligent tutors to decentralized platforms, I build across the stack. I care about the details: how a product works, how it feels, and whether it makes someone’s day a little easier.</p><div className="stats"><div><strong>9.20<span>/10</span></strong><small>CGPA AT VIT CHENNAI</small></div><div><strong>300<span>+</span></strong><small>LEETCODE PROBLEMS</small></div><div><strong>{projects.length}<span>+</span></strong><small>PROJECTS & EXPERIMENTS</small></div></div><a className="text-link" href="/Resume.pdf" download>The longer story? My résumé <span>↓</span></a></div></section>
      <section id="experience" className="experience section-shell"><div><div className="eyebrow">03 / ALWAYS IN MOTION</div><h2>Learning by<br/><span className="serif">doing.</span></h2></div><div className="timeline"><article><span className="timeline-year">MAR 2024 — PRESENT</span><h3>Operations Lead <span>↗</span></h3><p>AI Club · VIT Chennai</p><small>Leading project workflows and helping bring a 24-hour offline hackathon to life.</small></article><article><span className="timeline-year">JUL 2024 — JUN 2025</span><h3>Technical Team Member</h3><p>Game Dev Club · VIT Chennai</p><small>Building reusable frontend components and organizing offline gaming experiences.</small></article><article id="education"><span className="timeline-year">EXPECTED JUL 2027</span><h3>B.Tech, Computer Science</h3><p>Vellore Institute of Technology · Chennai</p><small>Data structures, algorithms, software engineering, and a lot of building in between.</small></article></div></section>
      <section id="skills" className="toolbox section-shell"><div className="eyebrow">THE TOOLBOX / ALWAYS EXPANDING</div><div className="tool-list">{['React','JavaScript','Python','Node.js','C / C++','Solidity','MongoDB','SQL','Git','Ethers.js'].map(t=><span key={t}>{t}</span>)}</div><div className="certifications" id="certifications"><span>ALSO ON THE SHELF</span><a href="https://courses.vit.skillsnetwork.site/certificates/fd35bd85aa0f4e45bb2ce49543b69ef9" {...external}>IBM Blockchain Developer ↗</a><a href="https://www.coursera.org/account/accomplishments/specialization/A5G7HKFAATOI" {...external}>Stanford Machine Learning ↗</a><a href="https://www.udemy.com/certificate/UC-6d956b8e-7042-4c91-8381-c089758d1111/" {...external}>DSA in C & C++ ↗</a></div></section>
      <section id="contact" className="contact"><div className="section-shell"><div className="eyebrow"><span className="status-dot"/> GOOD THINGS START WITH A CONVERSATION</div><div className="contact-heading"><h2>Got a wild idea?<br/>Let’s <span className="serif">build it.</span></h2><a className="contact-arrow" href={`mailto:${EMAIL}`} aria-label="Email Ayush">↗</a></div><div className="contact-bottom"><div><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL}</a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address">⧉</button><div className="copy-status" role="status">{copied}</div></div><div className="socials"><a href="https://github.com/SeeThearc" {...external}>GitHub ↗</a><a href="https://www.linkedin.com/in/ayush-agrawal23/" {...external}>LinkedIn ↗</a><a href="https://leetcode.com/u/Thearc" {...external}>LeetCode ↗</a></div></div></div></section>
    </main><footer className="footer section-shell"><span>© {new Date().getFullYear()} Ayush Agrawal</span><span>Made with intent. And a little obsession.</span><a href="#home">BACK TO TOP ↑</a></footer><div className="local-time"><span className="small-dot"/>{time.toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false})} IST <span> / </span> INDIA</div>
    {project&&<Dialog title={project.title} onClose={()=>setProject(null)}><img className="modal-image" src={project.image} alt={`${project.title} screenshot`}/><div className="modal-body"><div className="eyebrow">{category(project)} / PROJECT {String(project.id).padStart(2,'0')}</div><h2>{project.title}</h2><p>{project.desc}</p><h4>Built with</h4><div className="tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div><div className="modal-links">{project.live!=='#'&&<a className="button primary" href={project.live} {...external}>Visit live project ↗</a>}{project.github!=='#'&&<a className="button" href={project.github} {...external}>View source ↗</a>}{project.live==='#'&&project.github==='#'&&<p>Curious about this project? <a className="text-link" href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`}>Ask me about it ↗</a></p>}</div></div></Dialog>}
    {command&&<Dialog title="Quick navigation" onClose={()=>setCommand(false)}><div className="command-body"><div className="eyebrow">GO SOMEWHERE GOOD</div><input className="command-input" aria-label="Search pages and projects" placeholder="Search pages & projects…" value={commandQuery} onChange={e=>setCommandQuery(e.target.value)}/><div className="command-results">{commands.map(c=>c.project?<button key={c.label} onClick={()=>{setCommand(false);setProject(c.project)}}>{c.label}<span>PROJECT ↗</span></button>:<a key={c.label} href={c.href} onClick={()=>setCommand(false)}>{c.label}<span>↗</span></a>)}{!commands.length&&<p>No matches. Try “work” or a project name.</p>}</div><small>ESC to close · TAB to navigate · ENTER to select</small></div></Dialog>}
  </>
}

