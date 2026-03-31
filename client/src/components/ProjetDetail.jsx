import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProjet } from '../api/index'
import Navbar from '../components/Navbar'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

function ProjetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [projet, setProjet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )

  useEffect(function() {
    getProjet(id).then(function(res) {
      setProjet(res.data)
      setLoading(false)
    }).catch(function() {
      setLoading(false)
    })
  }, [id])

  useEffect(function() {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0F1729' : '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <p style={{ color: '#378ADD', fontSize: '14px' }}>Chargement...</p>
    </div>
  )

  if (!projet) return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0F1729' : '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <Navbar />
      <p style={{ color: darkMode ? '#E2E8F0' : '#1E293B', fontSize: '16px', fontWeight: 600 }}>Projet non trouve</p>
      <button onClick={() => navigate('/')} style={{ fontSize: '13px', padding: '10px 24px', background: '#378ADD', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
        Retour accueil
      </button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0F1729' : '#F8FAFF', transition: 'background 0.3s ease' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 32px 60px' }}>

        <button
          onClick={() => navigate('/#projets')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748B',
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: '32px', padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Retour aux projets
        </button>

        <div style={{
          background: darkMode ? '#162032' : '#FFFFFF',
          border: '1.5px solid ' + (darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.25)'),
          borderRadius: '20px',
          overflow: 'hidden',
        }}>

          {projet.imageUrl && (
            <div style={{ width: '100%', height: '320px', overflow: 'hidden' }}>
              <img src={projet.imageUrl} alt={projet.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ padding: '32px' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 600,
                color: darkMode ? '#93C5FD' : '#378ADD',
                background: darkMode ? '#1e3a5f' : '#EFF6FF',
                border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
                padding: '4px 12px', borderRadius: '20px',
              }}>
                {projet.categorie}
              </span>
              <span style={{ fontSize: '12px', color: darkMode ? '#64748B' : '#94a3b8' }}>
                {new Date(projet.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
              </span>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 700, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '12px' }}>
              {projet.titre}
            </h1>

            <p style={{ fontSize: '14px', color: darkMode ? '#94a3b8' : '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
              {projet.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '10px' }}>
                Technologies utilisees
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {projet.technologies && projet.technologies.map(function(tech) {
                  return (
                    <span key={tech} style={{
                      fontSize: '12px', fontWeight: 500,
                      padding: '5px 14px', borderRadius: '20px',
                      background: darkMode ? '#1e3a5f' : '#EFF6FF',
                      color: darkMode ? '#93C5FD' : '#378ADD',
                      border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
                    }}>
                      {tech}
                    </span>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {projet.lienDemo && (
                <a
                  href={projet.lienDemo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '13px', fontWeight: 500,
                    padding: '11px 28px', borderRadius: '50px',
                    background: '#378ADD', color: 'white',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(55,138,221,0.35)',
                  }}
                >
                  Voir la demo
                </a>
              )}
              {projet.lienGithub && (
                <a
                  href={projet.lienGithub}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '13px', fontWeight: 500,
                    padding: '11px 28px', borderRadius: '50px',
                    background: 'none',
                    color: darkMode ? '#E2E8F0' : '#1E293B',
                    border: '2px solid ' + (darkMode ? 'rgba(59,130,246,0.3)' : '#E2E8F0'),
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <GitHubIcon /> Voir sur GitHub
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjetDetail