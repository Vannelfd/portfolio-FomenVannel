import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjets, supprimerProjet } from '../api/index'
import PopupProjet from '../components/PopupProjet'

function Admin() {
  const navigate = useNavigate()
  const [projets, setProjets] = useState([])
  const [loading, setLoading] = useState(true)
  const [popupOuvert, setPopupOuvert] = useState(false)
  const [projetAModifier, setProjetAModifier] = useState(null)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )

  const token = localStorage.getItem('token')

  useEffect(function() {
    if (!token) {
      navigate('/login')
      return
    }
    chargerProjets()
  }, [])

  useEffect(function() {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  const chargerProjets = async function() {
    try {
      const res = await getProjets()
      setProjets(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSupprimer = async function(id) {
    if (!window.confirm('Confirmer la suppression de ce projet ?')) return
    try {
      await supprimerProjet(id)
      setProjets(projets.filter(function(p) { return p.id !== id }))
    } catch (err) {
      alert('Erreur lors de la suppression')
    }
  }

  const handleModifier = function(projet) {
    setProjetAModifier(projet)
    setPopupOuvert(true)
  }

  const handleAjouter = function() {
    setProjetAModifier(null)
    setPopupOuvert(true)
  }

  const handlePopupFermer = function() {
    setPopupOuvert(false)
    setProjetAModifier(null)
  }

  const handleProjetSauvegarde = function() {
    handlePopupFermer()
    chargerProjets()
  }

  const handleDeconnexion = function() {
    localStorage.removeItem('token')
    navigate('/')
  }

  const bg = darkMode ? '#0F1729' : '#F8FAFF'
  const card = darkMode ? '#162032' : '#FFFFFF'
  const border = darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.2)'
  const textPrimary = darkMode ? '#E2E8F0' : '#1E293B'
  const textSecondary = darkMode ? '#94a3b8' : '#64748B'
  const rowHover = darkMode ? '#1a2d4a' : '#F8FAFF'

  const compteParCategorie = function(cat) {
    return projets.filter(function(p) { return p.categorie === cat }).length
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, transition: 'background 0.3s ease' }}>

      <div style={{
        background: card,
        borderBottom: '1.5px solid ' + border,
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#378ADD', letterSpacing: '-0.5px' }}>
          FV. Admin
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '9px 20px', fontSize: '12px', fontWeight: 500,
              background: 'none', color: textSecondary,
              border: '2px solid ' + border, borderRadius: '50px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Portfolio
          </button>
          <button
            onClick={handleDeconnexion}
            style={{
              padding: '9px 20px', fontSize: '12px', fontWeight: 500,
              background: 'none', color: '#e11d48',
              border: '2px solid #fda4af', borderRadius: '50px', cursor: 'pointer',
            }}
          >
            Deconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: textPrimary, marginBottom: '4px' }}>
              Dashboard Admin
            </h1>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Bienvenue Vannel — gerez vos projets ici
            </p>
          </div>
          <button
            onClick={handleAjouter}
            style={{
              padding: '11px 24px', fontSize: '13px', fontWeight: 600,
              background: '#378ADD', color: 'white',
              border: 'none', borderRadius: '50px', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(55,138,221,0.35)',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Ajouter un projet
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Total', count: projets.length },
            { label: 'Web', count: compteParCategorie('Web') },
            { label: 'CMS', count: compteParCategorie('CMS') },
            { label: 'Full Stack', count: compteParCategorie('Full Stack') },
          ].map(function(stat) {
            return (
              <div key={stat.label} style={{
                background: card,
                border: '1.5px solid ' + border,
                borderRadius: '14px', padding: '16px',
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#378ADD' }}>
                  {stat.count}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          background: card,
          border: '1.5px solid ' + border,
          borderRadius: '16px', overflow: 'hidden',
        }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.4fr',
            padding: '12px 20px',
            background: darkMode ? '#0F1729' : '#F8FAFF',
            borderBottom: '1px solid ' + border,
          }}>
            {['Projet', 'Categorie', 'Statut', 'Actions'].map(function(th) {
              return (
                <div key={th} style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {th}
                </div>
              )
            })}
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
              Chargement...
            </div>
          ) : projets.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: textSecondary, marginBottom: '16px' }}>
                Aucun projet pour l'instant
              </p>
              <button
                onClick={handleAjouter}
                style={{
                  padding: '11px 24px', fontSize: '13px', fontWeight: 600,
                  background: '#378ADD', color: 'white',
                  border: 'none', borderRadius: '50px', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(55,138,221,0.35)',
                }}
              >
                Ajouter votre premier projet
              </button>
            </div>
          ) : (
            projets.map(function(projet, index) {
              return (
                <div
                  key={projet.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1.4fr',
                    padding: '14px 20px',
                    borderBottom: index < projets.length - 1 ? '1px solid ' + border : 'none',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = rowHover }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '8px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                      overflow: 'hidden',
                    }}>
                      {projet.imageUrl && (
                        <img src={projet.imageUrl} alt={projet.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                        {projet.titre}
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>
                        {new Date(projet.createdAt).getFullYear()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '10px',
                      background: darkMode ? '#1e3a5f' : '#EFF6FF',
                      color: darkMode ? '#93C5FD' : '#378ADD',
                      border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
                    }}>
                      {projet.categorie}
                    </span>
                  </div>

                  <div>
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '10px',
                      background: '#F0FDF4', color: '#16a34a',
                      border: '1px solid #bbf7d0',
                    }}>
                      Publie
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleModifier(projet)}
                      style={{
                        padding: '7px 16px', fontSize: '11px', fontWeight: 500,
                        background: 'none', color: '#378ADD',
                        border: '2px solid #DBEAFE', borderRadius: '50px', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleSupprimer(projet.id)}
                      style={{
                        padding: '7px 16px', fontSize: '11px', fontWeight: 500,
                        background: 'none', color: '#e11d48',
                        border: '2px solid #fda4af', borderRadius: '50px', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {popupOuvert && (
        <PopupProjet
          projet={projetAModifier}
          onFermer={handlePopupFermer}
          onSauvegarde={handleProjetSauvegarde}
          darkMode={darkMode}
        />
      )}

    </div>
  )
}

export default Admin