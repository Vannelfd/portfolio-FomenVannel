import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProjetDetail from './components/ProjetDetail'

function App() {
  useEffect(function() {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return function() { lenis.destroy() }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projet/:id" element={<ProjetDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App