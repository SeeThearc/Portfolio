import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AudioProvider } from './context/AudioContext'
import AppSwitcher from './components/AppSwitcher'
import LockScreen from './pages/LockScreen'
import HomeScreen from './pages/HomeScreen'
import ProjectGallery from './pages/ProjectGallery'
import AboutResume from './pages/AboutResume'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import './ipad.css'

function AboutRoute() {
  const [params] = useSearchParams()
  const tab = params.get('tab')?.toLowerCase()
  if (tab === 'skills' || tab === 'experience') return <Navigate to={`/${tab}`} replace />
  return <AboutResume />
}
export default function App() {
  return <ThemeProvider><AudioProvider><BrowserRouter><AppSwitcher><Routes>
    <Route path="/" element={<LockScreen />} />
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/projects" element={<ProjectGallery />} />
    <Route path="/about" element={<AboutRoute />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AppSwitcher></BrowserRouter></AudioProvider></ThemeProvider>
}
