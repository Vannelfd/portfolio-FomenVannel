// ============================================
// CONTACT — Section formulaire de contact
// Fichier : client/src/components/Contact.jsx
// ============================================

import { useState, useEffect } from 'react'
import { envoyerMessage } from '../api/index'
import useWindowWidth from '../hooks/useWindowWidth'

function Contact() {
  // ---- ETATS DU FORMULAIRE ----
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [sujet, setSujet] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [erreur, setErreur] = useState('')

  // ---- DETECTION DU DARK MODE ----
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )
  const width = useWindowWidth()
  const isMobile = width < 768

  useEffect(function() {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  // ---- ENVOI DU FORMULAIRE ----
  // Appelle l'API backend POST /api/contact
  // Stocke le message dans la table "messages" de PostgreSQL

  const handleSubmit = async function(e) {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    setSucces(false)
    try {
      await envoyerMessage({ nom, email, sujet, message })
      setSucces(true)
      setNom('')
      setEmail('')
      setSujet('')
      setMessage('')
    } catch (err) {
      setErreur('Erreur lors de l\'envoi. Verifie ta connexion.')
    } finally {
      setLoading(false)
    }
  }

  // ---- COULEURS SELON LE MODE ----
  const bg = darkMode ? '#0B1120' : '#F8FAFF'
  const card = darkMode ? '#162032' : '#FFFFFF'
  const border = darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.25)'
  const inputBg = darkMode ? '#0F1729' : '#F8FAFF'
  const inputBorder = darkMode ? 'rgba(59,130,246,0.2)' : '#E2E8F0'
  const textPrimary = darkMode ? '#E2E8F0' : '#1E293B'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const textMuted = darkMode ? '#64748B' : '#94a3b8'

  // ---- STYLE REUTILISABLE POUR LES INPUTS ----
  const inputStyle = {
    width: '100%', padding: '10px 13px', fontSize: '12px',
    borderRadius: '10px', border: '1.5px solid ' + inputBorder,
    background: inputBg, color: textPrimary, outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: '11px', fontWeight: 500,
    color: textSecondary, display: 'block', marginBottom: '5px',
  }

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? '40px 16px' : '56px 32px',
        background: bg,
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ---- EN-TETE DE SECTION ---- */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '11px', fontWeight: 500,
            color: darkMode ? '#93C5FD' : '#378ADD',
            background: darkMode ? '#1e3a5f' : '#EFF6FF',
            border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
            padding: '4px 14px', borderRadius: '20px', marginBottom: '10px',
          }}>
            Me contacter
          </div>
          <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, color: textPrimary, marginBottom: '4px' }}>
            Contact
          </h2>
          <p style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>
            Une question, une opportunite ? Ecrivez-moi !
          </p>
          <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #378ADD, #93C5FD)', borderRadius: '2px' }} />
        </div>

        {/* ---- GRILLE PRINCIPALE : 2 COLONNES ---- */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: '24px' }}>

          {/* ---- COLONNE GAUCHE : INFOS DE CONTACT ---- */}
          <div style={{
            background: card,
            border: '1.5px solid ' + border,
            borderRadius: '20px', padding: isMobile ? '18px' : '28px',
          }}>

            <h3 style={{ fontSize: '14px', fontWeight: 700, color: textPrimary, marginBottom: '6px' }}>
              Parlons de votre projet
            </h3>
            <p style={{ fontSize: '11px', color: textSecondary, lineHeight: '1.7', marginBottom: '24px' }}>
              Disponible pour des missions freelance, des opportunites full-time ou des collaborations.
            </p>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: darkMode ? '#1e3a5f' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: textMuted, marginBottom: '2px' }}>Email</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>fomensmith@gmail.com</div>
              </div>
            </div>

            {/* Telephone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: darkMode ? '#1e3a5f' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: textMuted, marginBottom: '2px' }}>Telephone</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>+237 6 91 97 12 53</div>
              </div>
            </div>

            {/* Localisation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: darkMode ? '#1e3a5f' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: textMuted, marginBottom: '2px' }}>Localisation</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>Douala, Cameroun</div>
              </div>
            </div>

            {/* Badge disponibilite */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 14px',
              background: darkMode ? '#052e16' : '#F0FDF4',
              border: '1px solid ' + (darkMode ? '#166534' : '#bbf7d0'),
              borderRadius: '10px',
            }}>
              <style>{`
                @keyframes ping {
                  0% { transform: scale(1); opacity: 0.8; }
                  100% { transform: scale(2.8); opacity: 0; }
                }
              `}</style>
              <div style={{ position: 'relative', width: '7px', height: '7px', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  background: '#16a34a',
                  animation: 'ping 1.5s ease-out infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  background: '#16a34a',
                }} />
              </div>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 500 }}>
                Disponible pour de nouvelles missions
              </span>
            </div>

          </div>

          {/* ---- COLONNE DROITE : FORMULAIRE ---- */}
          <div style={{
            background: card,
            border: '1.5px solid ' + border,
            borderRadius: '20px', padding: isMobile ? '18px' : '28px',
          }}>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Nom + Email sur la meme ligne */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input
                    style={inputStyle}
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              {/* Sujet */}
              <div>
                <label style={labelStyle}>Sujet</label>
                <input
                  style={inputStyle}
                  value={sujet}
                  onChange={e => setSujet(e.target.value)}
                  placeholder="Objet de votre message"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  style={{ ...inputStyle, resize: 'none', height: '120px' }}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Decrivez votre projet ou votre demande..."
                  required
                />
              </div>

              {/* Message de succes apres envoi */}
              {succes && (
                <div style={{
                  fontSize: '12px', color: '#16a34a',
                  background: darkMode ? '#052e16' : '#F0FDF4',
                  border: '1px solid ' + (darkMode ? '#166534' : '#bbf7d0'),
                  borderRadius: '10px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Message envoye avec succes ! Je vous repondrai rapidement.
                </div>
              )}

              {/* Message d'erreur */}
              {erreur && (
                <div style={{
                  fontSize: '12px', color: '#e11d48',
                  background: '#FFF1F2', border: '1px solid #fda4af',
                  borderRadius: '10px', padding: '12px 14px',
                }}>
                  {erreur}
                </div>
              )}

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '13px',
                  fontSize: '13px', fontWeight: 600,
                  background: loading ? '#93C5FD' : '#378ADD',
                  color: 'white', border: 'none',
                  borderRadius: '50px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(55,138,221,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact