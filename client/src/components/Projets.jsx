import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjets } from '../api/index'
import useWindowWidth from '../hooks/useWindowWidth'

const GitHubIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const filtres = ['Tous', 'Web', 'CMS', 'Full Stack']

function ProjetCard({ projet, darkMode, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: darkMode ? '#162032' : '#FFFFFF',
        border: '1.5px solid ' + (hovered
          ? 'rgba(59,130,246,0.35)'
          : darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.2)'),
        borderRadius: '16px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(59,130,246,0.1)' : 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden' }}>
        {projet.imageUrl ? (
          <img
            src={projet.imageUrl}
            alt={projet.titre}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: darkMode
              ? 'linear-gradient(135deg, #1e3a5f, #162032)'
              : 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', color: '#93C5FD' }}>Apercu du projet</span>
          </div>
        )}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15,23,60,0.85)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '8px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <button
            onClick={() => onClick(projet.id)}
            style={{
              fontSize: '11px', color: 'white', fontWeight: 600,
              background: '#378ADD', border: 'none',
              padding: '7px 18px', borderRadius: '20px', cursor: 'pointer',
            }}
          >
            Voir le detail
          </button>
          {projet.lienDemo && (
            <a
              href={projet.lienDemo}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: '11px', color: 'white', fontWeight: 500,
                border: '1.5px solid rgba(255,255,255,0.5)',
                padding: '6px 16px', borderRadius: '20px',
                textDecoration: 'none',
              }}
            >
              Demo live
            </a>
          )}
        </div>
      </div>

      <div style={{ padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{
            fontSize: '12px', fontWeight: 600,
            color: darkMode ? '#93C5FD' : '#378ADD',
            background: darkMode ? '#1e3a5f' : '#EFF6FF',
            border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
            padding: '2px 8px', borderRadius: '10px',
          }}>
            {projet.categorie}
          </span>
          <span style={{ fontSize: '12px', color: darkMode ? '#64748B' : '#94a3b8' }}>
            {new Date(projet.createdAt).getFullYear()}
          </span>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 700, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '5px' }}>
          {projet.titre}
        </h3>

        <p style={{
          fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748B',
          lineHeight: '1.6', marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {projet.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
          {projet.technologies && projet.technologies.slice(0, 4).map(function(tech) {
            return (
              <span key={tech} style={{
                fontSize: '12px', padding: '2px 8px',
                borderRadius: '10px',
                background: darkMode ? '#1e293b' : '#F1F5F9',
                color: darkMode ? '#94a3b8' : '#475569',
              }}>
                {tech}
              </span>
            )
          })}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px',
          borderTop: '1px solid ' + (darkMode ? '#1e293b' : '#F1F5F9'),
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {projet.lienDemo && (
              <a
                href={projet.lienDemo}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: '10px', padding: '5px 12px',
                  background: '#378ADD', color: 'white',
                  border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Demo
              </a>
            )}
            {projet.lienGithub && (
              <a
                href={projet.lienGithub}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: '10px', padding: '5px 10px',
                  background: 'none',
                  color: darkMode ? '#94a3b8' : '#64748B',
                  border: '1px solid ' + (darkMode ? '#334155' : '#E2E8F0'),
                  borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  textDecoration: 'none',
                }}
              >
                <GitHubIcon /> GitHub
              </a>
            )}
          </div>
          <div
            onClick={() => onClick(projet.id)}
            style={{
              fontSize: '10px',
              color: hovered ? '#378ADD' : (darkMode ? '#64748B' : '#94a3b8'),
              display: 'flex', alignItems: 'center', gap: '3px',
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            Detail <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  )
}

function Projets() {
  const navigate = useNavigate()
  const [projets, setProjets] = useState([])
  const [filtreActif, setFiltreActif] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width < 1024

  useEffect(function() {
    getProjets().then(function(res) {
      setProjets(res.data)
      setLoading(false)
    }).catch(function() {
      setLoading(false)
    })
  }, [])

  useEffect(function() {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  const projetsFiltres = filtreActif === 'Tous'
    ? projets
    : projets.filter(function(p) { return p.categorie === filtreActif })

  const compteParFiltre = function(filtre) {
    if (filtre === 'Tous') return projets.length
    return projets.filter(function(p) { return p.categorie === filtre }).length
  }

  return (
    <section
      id="projets"
      style={{
        padding: isMobile ? '40px 16px' : '56px 32px',
        background: darkMode ? '#0F1729' : '#FFFFFF',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '13px', fontWeight: 500,
            color: darkMode ? '#93C5FD' : '#378ADD',
            background: darkMode ? '#1e3a5f' : '#EFF6FF',
            border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
            padding: '4px 14px', borderRadius: '20px', marginBottom: '10px',
          }}>
            Mes realisations
          </div>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '4px' }}>
            Projets
          </h2>
          <p style={{ fontSize: '14px', color: darkMode ? '#64748B' : '#94a3b8', marginBottom: '8px' }}>
            Une selection de mes realisations en developpement web
          </p>
          <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #378ADD, #93C5FD)', borderRadius: '2px' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {filtres.map(function(filtre) {
            const actif = filtreActif === filtre
            return (
              <button
                key={filtre}
                onClick={() => setFiltreActif(filtre)}
                style={{
                  fontSize: isMobile ? '12px' : '13px', fontWeight: 500,
                  padding: isMobile ? '8px 16px' : '11px 28px',
                  borderRadius: '50px',
                  border: '2px solid ' + (actif ? '#378ADD' : (darkMode ? 'rgba(59,130,246,0.2)' : '#E2E8F0')),
                  background: actif ? '#378ADD' : (darkMode ? '#162032' : '#FFFFFF'),
                  color: actif ? 'white' : (darkMode ? '#94a3b8' : '#475569'),
                  cursor: 'pointer',
                  boxShadow: actif ? '0 4px 14px rgba(55,138,221,0.35)' : 'none',
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: '7px',
                  whiteSpace: 'nowrap',
                }}
              >
                {filtre}
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  padding: '1px 7px', borderRadius: '10px',
                  background: actif ? 'rgba(255,255,255,0.2)' : (darkMode ? '#1e293b' : '#F1F5F9'),
                  color: actif ? 'white' : (darkMode ? '#64748B' : '#94a3b8'),
                }}>
                  {compteParFiltre(filtre)}
                </span>
              </button>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: darkMode ? '#64748B' : '#94a3b8', marginBottom: '28px' }}>
          <span style={{ color: '#378ADD', fontWeight: 600 }}>{projetsFiltres.length}</span> projets affiches
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#64748B' : '#94a3b8', fontSize: '13px' }}>
            Chargement des projets...
          </div>
        ) : projetsFiltres.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#64748B' : '#94a3b8', fontSize: '13px' }}>
            Aucun projet dans cette categorie pour l'instant.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
            {projetsFiltres.map(function(projet) {
              return (
                <ProjetCard
                  key={projet.id}
                  projet={projet}
                  darkMode={darkMode}
                  onClick={function(id) { navigate('/projet/' + id) }}
                />
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}

export default Projets