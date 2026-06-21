import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Competences from '../components/Competences'
import Experiences from '../components/Experiences'
import Contact from '../components/Contact'
import Projets from '../components/Projets'
import Footer from '../components/Footer'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(function() {
    function onScroll() { setVisible(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll)
    return function() { window.removeEventListener('scroll', onScroll) }
  }, [])

  function scrollTop() {
    document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollTop}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#378ADD',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(55,138,221,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 100,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Competences />
      <Experiences />
      <Projets />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Home