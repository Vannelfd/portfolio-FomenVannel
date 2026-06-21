import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

function scrollToSection(id, navigate, location) {
  if (location.pathname !== '/') {
    navigate('/')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

const navLinks = [
  { label: 'Accueil',      id: 'accueil'     },
  { label: 'Competences',  id: 'competences' },
  { label: 'Experiences',  id: 'experiences' },
  { label: 'Projets',      id: 'projets'     },
  { label: 'Contact',      id: 'contact'     },
]

const LINK_BASE = 'text-sm px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap no-underline'
const LINK_ACTIVE = 'bg-blue-500 text-white border-blue-500 font-medium'
const LINK_INACTIVE = 'border-transparent text-slate-600 dark:text-slate-300 hover:border-blue-400/40 hover:text-blue-500 hover:bg-blue-500/5'
const ICON_BTN = 'w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-500 transition-all duration-200 cursor-pointer no-underline'
const MOBILE_LINK = 'block text-base px-4 py-3 rounded-xl border border-transparent text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-500 transition-all duration-200 no-underline'
const MOBILE_LINK_ACTIVE = 'block text-base px-4 py-3 rounded-xl bg-blue-500 text-white font-medium no-underline'

function Navbar() {
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  useEffect(function() {
    const ids = navLinks.map(function(l) { return l.id })
    const observers = []

    ids.forEach(function(id) {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        function(entries) {
          if (entries[0].isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return function() { observers.forEach(function(o) { o.disconnect() }) }
  }, [])

  const isActive = (id) => activeSection === id

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setActiveSection(id)
    scrollToSection(id, navigate, location)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60">

        <div className="grid items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4" style={{gridTemplateColumns: '1fr auto 1fr'}}>

          <div className="justify-self-start min-w-0">
            <Link to="/" className="no-underline">
              {/* Remplace logo.png par ton fichier dans client/public/ */}
              <img src="/logo.png" alt="FOMEN Vannel" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-blue-500/[0.07] dark:bg-blue-400/[0.08] border border-blue-500/[0.15] dark:border-blue-400/20 rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={'#' + link.id}
                onClick={(e) => handleNavClick(e, link.id)}
                className={LINK_BASE + ' ' + (isActive(link.id) ? LINK_ACTIVE : LINK_INACTIVE)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="justify-self-end flex items-center gap-3">

            <div className="relative group">
              <button onClick={toggleTheme} className={ICON_BTN}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {darkMode ? 'Mode clair' : 'Mode sombre'}
              </span>
            </div>

            <div className="relative group hidden md:flex">
              <Link to="/login" className={ICON_BTN}>
                <UserIcon />
              </Link>
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Admin
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={ICON_BTN + ' md:hidden'}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 flex flex-col gap-1 border-t border-slate-200 dark:border-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={'#' + link.id}
                onClick={(e) => { handleNavClick(e, link.id); setMenuOpen(false) }}
                className={isActive(link.id) ? MOBILE_LINK_ACTIVE : MOBILE_LINK}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={MOBILE_LINK}
            >
              Connexion Admin
            </Link>
          </div>
        )}

      </nav>
    </>
  )
}

export default Navbar