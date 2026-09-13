import { useRef, useState } from 'react'
import AppWindow from '../components/AppWindow'

const EMAIL = 'ayushagrawal2334@gmail.com'
function readDraft() {
  try { const draft = JSON.parse(sessionStorage.getItem('ipad-contact-draft') || '{}'); return { subject: typeof draft.subject === 'string' ? draft.subject : '', body: typeof draft.body === 'string' ? draft.body : '' } } catch { return { subject: '', body: '' } }
}
export default function Contact() {
  const [draft, setDraft] = useState(readDraft)
  const [status, setStatus] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(true)
  const form = useRef(null), email = useRef(null), body = useRef(null)
  function updateDraft(update) {
    const next = update(draft)
    setDraft(next)
    try { sessionStorage.setItem('ipad-contact-draft', JSON.stringify(next)); setStorageAvailable(true) }
    catch { setStorageAvailable(false) }
  }
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
  const gmail = `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to: EMAIL, su: draft.subject, body: draft.body })}`
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setStatus('Email address copied.') }
    catch { email.current.focus(); email.current.select(); setStatus('Copy is unavailable here. The address is selected — press Ctrl/Cmd+C or long-press to copy.') }
  }
  async function copyMessage() {
    try { await navigator.clipboard.writeText(`To: ${EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`); setStatus('Draft copied. Paste it into your preferred email service.') }
    catch { body.current.focus(); body.current.select(); setStatus('Copy is unavailable here. Select and copy your subject and message manually.') }
  }
  function prepareHandoff(event, provider) {
    if (!form.current.reportValidity()) { event.preventDefault(); return }
    setStatus(provider === 'gmail' ? 'Continue in Gmail to review and send. Your draft stays here.' : 'Continue in your mail app to review and send. If nothing opens, use Gmail or copy the draft.')
  }
  return <AppWindow name="Contact" icon="✉" subtitle="A conversation starts here" className="contact-app" actions={<span className="contact-availability"><i /> Open to opportunities</span>}>
    <div className="portfolio-scroll contact-layout">
      <aside className="contact-person"><img src="/animated_ayush.png" alt="Ayush Agrawal" /><span className="app-eyebrow">LET’S CONNECT</span><h2>Ayush Agrawal<span>.</span></h2><p>Have an opportunity, a project idea, or just something interesting to share? I’d love to hear it.</p><label className="contact-email-label" htmlFor="contact-email">EMAIL ADDRESS</label><div className="contact-email-row"><input id="contact-email" ref={email} value={EMAIL} readOnly /><button aria-label="Copy email address" onClick={copyEmail}>⧉</button></div><div className="contact-social-links"><a href="https://www.linkedin.com/in/ayush-agrawal23/" target="_blank" rel="noreferrer"><span>in</span>Connect on LinkedIn <b>↗</b></a><a href="https://github.com/SeeThearc" target="_blank" rel="noreferrer"><span>⌘</span>Explore my GitHub <b>↗</b></a></div><div className="contact-person-note">Good conversations lead to good things.</div></aside>
      <section className="contact-compose"><div className="contact-compose-heading"><div><span className="app-eyebrow">NEW MESSAGE</span><h2>Say hello.</h2></div><span className="draft-indicator">Draft</span></div><div className="contact-topics" aria-label="Message starters">{[['An opportunity', 'An opportunity for you'], ['Let’s collaborate', 'Let’s build something together'], ['Just saying hi', 'Hello, Ayush!']].map(([label, subject]) => <button key={label} onClick={() => updateDraft(d => ({ ...d, subject }))}>{label} ↗</button>)}</div>
        <form ref={form} onSubmit={e => e.preventDefault()}><div className="contact-recipient"><span>To</span><strong>{EMAIL}</strong></div><label className="contact-field" htmlFor="contact-subject">Subject<input id="contact-subject" required maxLength={180} placeholder="What’s on your mind?" value={draft.subject} onChange={e => updateDraft(d => ({ ...d, subject: e.target.value }))} /></label><label className="contact-field contact-message-field" htmlFor="contact-message">Message<textarea id="contact-message" ref={body} required placeholder="Hi Ayush, I came across your portfolio…" value={draft.body} onChange={e => updateDraft(d => ({ ...d, body: e.target.value }))} /></label><div className="contact-compose-actions"><a className="contact-primary-action" href={mailto} onClick={e => prepareHandoff(e, 'mail')}>Open mail app ↗</a><a className="contact-secondary-action" href={gmail} target="_blank" rel="noreferrer" onClick={e => prepareHandoff(e, 'gmail')}>Use Gmail ↗</a><button type="button" onClick={copyMessage}>Copy draft</button></div><p className="contact-handoff-note">Review and send in your email service. {storageAvailable ? 'Your draft is kept in this browser tab, even when you switch apps.' : 'Browser storage is unavailable; copy your draft before leaving this app.'}</p></form>
        <div className="contact-feedback" role="status" aria-live="polite">{status}</div>
      </section>
    </div>
  </AppWindow>
}

