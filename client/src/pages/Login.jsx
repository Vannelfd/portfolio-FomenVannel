import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/index'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [darkMode] = useState(
    document.documentElement.classList.contains('dark')
  )

  const handleSubmit = async function(e) {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin')
    } catch (err) {
      setErreur('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  const bg = darkMode ? '#0F1729' : '#F8FAFF'
  const card = darkMode ? '#162032' : '#FFFFFF'
  const border = darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.25)'
  const inputBg = darkMode ? '#0F1729' : '#F8FAFF'
  const inputBorder = darkMode ? 'rgba(59,130,246,0.2)' : '#E2E8F0'
  const textPrimary = darkMode ? '#E2E8F0' : '#1E293B'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: card,
        border: '1.5px solid ' + border,
        borderRadius: '20px',
        padding: '40px 32px',
      }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px',
            borderRadius: '14px',
            background: '#EFF6FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: textPrimary, marginBottom: '4px' }}>
            Connexion Admin
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            Acces reserve a l'administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, color: textSecondary, display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="fomensmith@gmail.com"
              required
              style={{
                width: '100%', padding: '11px 14px', fontSize: '13px',
                borderRadius: '10px', border: '1.5px solid ' + inputBorder,
                background: inputBg, color: textPrimary, outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, color: textSecondary, display: 'block', marginBottom: '6px' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '11px 14px', fontSize: '13px',
                borderRadius: '10px', border: '1.5px solid ' + inputBorder,
                background: inputBg, color: textPrimary, outline: 'none',
              }}
            />
          </div>

          {erreur && (
            <div style={{
              fontSize: '12px', color: '#e11d48',
              background: '#FFF1F2', border: '1px solid #fda4af',
              borderRadius: '8px', padding: '10px 14px',
            }}>
              {erreur}
            </div>
          )}

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
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            margin: '20px auto 0',
            fontSize: '12px', color: '#94a3b8',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Retour au portfolio
        </button>

      </div>
    </div>
  )
}

export default Login