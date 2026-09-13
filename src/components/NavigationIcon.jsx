export default function NavigationIcon({ close = false }) {
  return <svg className="navigation-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={close ? 'M6 6l12 12M18 6 6 18' : 'm15 5-7 7 7 7'} />
  </svg>
}
