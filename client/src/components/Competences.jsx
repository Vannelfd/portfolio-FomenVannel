import { useEffect, useRef, useState } from 'react'
import useWindowWidth from '../hooks/useWindowWidth'

const categories = [
  {
    titre: 'Frontend',
    delay: 0,
    colors: {
      light: { icon: '#378ADD', iconBg: '#EFF6FF', bar: 'linear-gradient(90deg,#93C5FD,#378ADD)', dot: '#378ADD', pct: '#378ADD', barBg: '#E2E8F0', hover: '#EFF6FF', border: 'rgba(147,197,253,0.4)' },
      dark: { icon: '#60a5fa', iconBg: '#1e3a5f', bar: 'linear-gradient(90deg,#bfdbfe,#60a5fa)', dot: '#60a5fa', pct: '#60a5fa', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(96,165,250,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    competences: [
      { nom: 'React.js', niveau: 90 },
      { nom: 'Next.js', niveau: 85 },
      { nom: 'Tailwind CSS', niveau: 90 },
      { nom: 'TypeScript', niveau: 75 },
    ],
  },
  {
    titre: 'Backend',
    delay: 0.4,
    colors: {
      light: { icon: '#16a34a', iconBg: '#F0FDF4', bar: 'linear-gradient(90deg,#86efac,#16a34a)', dot: '#16a34a', pct: '#16a34a', barBg: '#E2E8F0', hover: '#F0FDF4', border: 'rgba(134,239,172,0.4)' },
      dark: { icon: '#4ade80', iconBg: '#052e16', bar: 'linear-gradient(90deg,#bbf7d0,#4ade80)', dot: '#4ade80', pct: '#4ade80', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(74,222,128,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    competences: [
      { nom: 'Node.js', niveau: 85 },
      { nom: 'Express.js', niveau: 80 },
      { nom: 'REST API', niveau: 85 },
    ],
  },
  {
    titre: 'Base de donnees',
    delay: 0.8,
    colors: {
      light: { icon: '#9333ea', iconBg: '#FDF4FF', bar: 'linear-gradient(90deg,#d8b4fe,#9333ea)', dot: '#9333ea', pct: '#9333ea', barBg: '#E2E8F0', hover: '#FDF4FF', border: 'rgba(216,180,254,0.4)' },
      dark: { icon: '#c084fc', iconBg: '#3b0764', bar: 'linear-gradient(90deg,#e9d5ff,#c084fc)', dot: '#c084fc', pct: '#c084fc', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(192,132,252,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    competences: [
      { nom: 'PostgreSQL', niveau: 80 },
      { nom: 'Prisma ORM', niveau: 75 },
    ],
  },
  {
    titre: 'CMS',
    delay: 1.2,
    colors: {
      light: { icon: '#ea580c', iconBg: '#FFF7ED', bar: 'linear-gradient(90deg,#fdba74,#ea580c)', dot: '#ea580c', pct: '#ea580c', barBg: '#E2E8F0', hover: '#FFF7ED', border: 'rgba(253,186,116,0.4)' },
      dark: { icon: '#fb923c', iconBg: '#431407', bar: 'linear-gradient(90deg,#fed7aa,#fb923c)', dot: '#fb923c', pct: '#fb923c', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(251,146,60,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    competences: [
      { nom: 'WordPress', niveau: 90 },
      { nom: 'Elementor', niveau: 85 },
    ],
  },
  {
    titre: 'Versioning',
    delay: 1.6,
    colors: {
      light: { icon: '#d97706', iconBg: '#FFFBEB', bar: 'linear-gradient(90deg,#fcd34d,#d97706)', dot: '#d97706', pct: '#d97706', barBg: '#E2E8F0', hover: '#FFFBEB', border: 'rgba(252,211,77,0.4)' },
      dark: { icon: '#fbbf24', iconBg: '#422006', bar: 'linear-gradient(90deg,#fef08a,#fbbf24)', dot: '#fbbf24', pct: '#fbbf24', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(251,191,36,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/>
      </svg>
    ),
    competences: [
      { nom: 'Git', niveau: 85 },
      { nom: 'GitHub', niveau: 85 },
    ],
  },
  {
    titre: 'Outils',
    delay: 2,
    colors: {
      light: { icon: '#e11d48', iconBg: '#FFF1F2', bar: 'linear-gradient(90deg,#fda4af,#e11d48)', dot: '#e11d48', pct: '#e11d48', barBg: '#E2E8F0', hover: '#FFF1F2', border: 'rgba(253,164,175,0.4)' },
      dark: { icon: '#f472b6', iconBg: '#4c0519', bar: 'linear-gradient(90deg,#fbcfe8,#f472b6)', dot: '#f472b6', pct: '#f472b6', barBg: '#1e3a5f', hover: '#1a2d4a', border: 'rgba(244,114,182,0.3)' },
    },
    icon: (color) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    competences: [
      { nom: 'VS Code', niveau: 95 },
      { nom: 'Figma', niveau: 70 },
      { nom: 'Postman', niveau: 80 },
    ],
  },
]

function CatCard({ cat, visible, darkMode, cardIndex }) {
  const [hovered, setHovered] = useState(false)
  const c = darkMode ? cat.colors.dark : cat.colors.light

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        padding: '16px',
        background: hovered ? c.hover : darkMode ? '#162032' : '#FFFFFF',
        border: '1.5px solid ' + (hovered ? c.border : darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.25)'),
        transform: visible
          ? (hovered ? 'translateY(-3px)' : 'translateY(0px)')
          : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease ' + (cardIndex * 0.15) + 's, transform 0.6s ease ' + (cardIndex * 0.15) + 's, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{
          width: '30px', height: '30px',
          borderRadius: '8px',
          background: c.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'iconPulse 3s ease-in-out infinite',
          animationDelay: cat.delay + 's',
          flexShrink: 0,
        }}>
          {cat.icon(c.icon)}
        </div>
        <span style={{ fontSize: '14px', fontWeight: 600, color: darkMode ? '#E2E8F0' : '#1E293B' }}>
          {cat.titre}
        </span>
      </div>

      {cat.competences.map((skill) => (
        <div key={skill.nom} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: darkMode ? '#CBD5E1' : '#334155', fontWeight: 500 }}>
                {skill.nom}
              </span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: c.pct }}>
              {skill.niveau}%
            </span>
          </div>
          <div style={{ height: '4px', background: c.barBg, borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              borderRadius: '10px',
              background: c.bar,
              width: visible ? skill.niveau + '%' : '0%',
              transition: 'width 1.5s ease-out',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Competences() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width < 1024

  useEffect(() => {
    const observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return function() { observer.disconnect() }
  }, [])

  useEffect(() => {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  return (
    <section
      id="competences"
      ref={sectionRef}
      style={{
        padding: '80px 32px',
        background: darkMode ? '#0F1729' : '#F8FAFF',
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @keyframes iconPulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '13px', fontWeight: 500,
            color: darkMode ? '#93C5FD' : '#378ADD',
            background: darkMode ? '#1e3a5f' : '#EFF6FF',
            border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
            padding: '4px 14px', borderRadius: '20px', marginBottom: '10px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.6s ease 0s, transform 0.6s ease 0s',
          }}>
            Mes competences
          </div>
          <h2 style={{
            fontSize: '36px', fontWeight: 700,
            color: darkMode ? '#E2E8F0' : '#1E293B',
            marginBottom: '8px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}>
            Stack technique
          </h2>
          <div style={{
            width: visible ? '40px' : '0px', height: '3px',
            background: 'linear-gradient(90deg, #378ADD, #93C5FD)', borderRadius: '2px',
            transition: 'width 0.6s ease 0.2s',
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
          {categories.map((cat, i) => (
            <CatCard key={cat.titre} cat={cat} visible={visible} darkMode={darkMode} cardIndex={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Competences