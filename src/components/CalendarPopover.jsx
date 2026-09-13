import { useEffect, useRef, useState } from 'react'
import NavigationIcon from './NavigationIcon'
import './CalendarPopover.css'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export default function CalendarPopover({ onClose }) {
  const dialog = useRef(null)
  const [today, setToday] = useState(() => new Date())
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  useEffect(() => {
    const previous = document.activeElement
    const element = dialog.current
    element.showModal()
    let timer
    function refreshAtMidnight() {
      const now = new Date()
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timer = setTimeout(() => { setToday(new Date()); refreshAtMidnight() }, next - now + 50)
    }
    refreshAtMidnight()
    return () => { clearTimeout(timer); element.close(); previous?.focus() }
  }, [])
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const currentKey = dateKey(today)
  const dates = Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - month.getDay() + 1))
  function changeMonth(delta) { setMonth(m => new Date(m.getFullYear(), m.getMonth() + delta, 1)) }
  return <dialog ref={dialog} className="mini-calendar" aria-label="Calendar" onCancel={onClose} onClick={e => { if (e.target === dialog.current) onClose() }}>
    <header className="mini-calendar-header"><div><span>MAKE TODAY COUNT</span><h2>One day at a time.</h2></div><button aria-label="Close Calendar" onClick={onClose}><NavigationIcon close /></button></header>
    <div className="mini-calendar-month"><h3 aria-live="polite">{monthLabel}</h3><div><button aria-label="Previous month" onClick={() => changeMonth(-1)}><NavigationIcon /></button><button className="calendar-today-button" onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</button><button className="calendar-next-button" aria-label="Next month" onClick={() => changeMonth(1)}><NavigationIcon /></button></div></div>
    <table className="mini-calendar-grid" aria-label={monthLabel}><thead><tr>{weekdays.map(day => <th key={day} scope="col"><abbr title={['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][weekdays.indexOf(day)]}>{day[0]}</abbr></th>)}</tr></thead><tbody>{Array.from({ length: 6 }, (_, row) => <tr key={row}>{dates.slice(row * 7, row * 7 + 7).map(date => {
      const key = dateKey(date), isToday = key === currentKey
      return <td key={key} className={date.getMonth() === month.getMonth() ? '' : 'calendar-outside-month'}><time dateTime={key} aria-current={isToday ? 'date' : undefined} aria-label={`${date.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}${isToday ? ', today' : ''}`}>{date.getDate()}</time></td>
    })}</tr>)}</tbody></table>
    <p className="mini-calendar-today"><i />Today · {today.toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' })}</p>
    <blockquote className="calendar-quote"><span className="calendar-quote-label">A LITTLE REMINDER</span><p><span>Be in the present</span><span>and prepare for the future.</span></p><span className="calendar-quote-line" aria-hidden="true" /></blockquote>
  </dialog>
}
