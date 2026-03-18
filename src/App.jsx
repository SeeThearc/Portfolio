import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AudioProvider } from './context/AudioContext'
import AppSwitcher from './components/AppSwitcher'
import LockScreen from './pages/LockScreen'
import HomeScreen from './pages/HomeScreen'
import ProjectGallery from './pages/ProjectGallery'
import AboutResume from './pages/AboutResume'
import './index.css'

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <AppSwitcher>
            <Routes>
              <Route path="/" element={<LockScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/projects" element={<ProjectGallery />} />
              <Route path="/about" element={<AboutResume />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppSwitcher>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  )
}
