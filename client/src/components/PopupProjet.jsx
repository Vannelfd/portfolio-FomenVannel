import { useState, useEffect } from 'react'
import { creerProjet, modifierProjet } from '../api/index'

function PopupProjet({ projet, onFermer, onSauvegarde, darkMode }) {
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('Web')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [lienDemo, setLienDemo] = useState('')
  const [lienGithub, setLienGithub] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  useEffect(function() {
    if (projet) {
      setTitre(projet.titre || '')
      setCategorie(projet.categorie || 'Web')
      setDescription(projet.description || '')
      setTechnologies(projet.technologies ? projet.technologies.join(', ') : '')
      setLienDemo(projet.lienDemo || '')
      setLienGithub(projet.lienGithub || '')
      setImagePreview(projet.imageUrl || '')
    }
  }, [projet])

  const handleImage = function(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setErreur('Image trop lourde — maximum 2Mo')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErreur('Format invalide — JPG, PNG ou WebP uniquement')
      return
    }
    setErreur('')
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = function(ev) { setImagePreview(ev.target.result) }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async function(e) {
    e.preventDefault()
    setLoading(true)
    setErreur('')

    try {
      let imageUrl = imagePreview

      if (imageFile) {
        const reader = new FileReader()
        imageUrl = await new Promise(function(resolve) {
          reader.onload = function(ev) { resolve(ev.target.result) }
          reader.readAsDataURL(imageFile)
        })
      }

      const data = {
        titre,
        categorie,
        description,
        technologies: technologies.split(',').map(function(t) { return t.trim() }).filter(Boolean),
        lienDemo: lienDemo || null,
        lienGithub: lienGithub || null,
        imageUrl: imageUrl || null,
      }

      if (projet) {
        await modifierProjet(projet.id, data)
      } else {
        await creerProjet(data)
      }

      onSauvegarde()
    } catch (err) {
      setErreur('Erreur lors de la sauvegarde. Verifie ta connexion.')
    } finally {
      setLoading(false)
    }
  }

  const card = darkMode ? '#162032' : '#FFFFFF'
  const inputBg = darkMode ? '#0F1729' : '#F8FAFF'
  const inputBorder = darkMode ? 'rgba(59,130,246,0.2)' : '#E2E8F0'
  const textPrimary = darkMode ? '#E2E8F0' : '#1E293B'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const divider = darkMode ? 'rgba(59,130,246,0.15)' : '#F1F5F9'

  const inputStyle = {
    width: '100%', padding: '10px 13px', fontSize: '12px',
    borderRadius: '10px', border: '1.5px solid ' + inputBorder,
    background: inputBg, color: textPrimary, outline: 'none',
  }

  const labelStyle = {
    fontSize: '11px', fontWeight: 500,
    color: textSecondary, display: 'block', marginBottom: '5px',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,60,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '520px',
        background: card,
        borderRadius: '20px',
        overflow: 'hidden',
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid ' + divider,
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>
            {projet ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <button
            onClick={onFermer}
            style={{
              width: '30px', height: '30px', borderRadius: '50px',
              background: darkMode ? '#1e293b' : '#F1F5F9',
              border: '2px solid ' + (darkMode ? '#334155' : '#E2E8F0'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: textSecondary, fontSize: '16px',
            }}
          >
            x
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Titre du projet</label>
              <input
                style={inputStyle}
                value={titre}
                onChange={e => setTitre(e.target.value)}
                placeholder="Mon super projet"
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Categorie</label>
              <select
                style={inputStyle}
                value={categorie}
                onChange={e => setCategorie(e.target.value)}
              >
                <option value="Web">Web</option>
                <option value="CMS">CMS</option>
                <option value="Full Stack">Full Stack</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, resize: 'none', height: '80px' }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Decrivez votre projet..."
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Technologies (separees par des virgules)</label>
            <input
              style={inputStyle}
              value={technologies}
              onChange={e => setTechnologies(e.target.value)}
              placeholder="React.js, Node.js, PostgreSQL..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Lien Demo</label>
              <input
                style={inputStyle}
                value={lienDemo}
                onChange={e => setLienDemo(e.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>
            <div>
              <label style={labelStyle}>Lien GitHub</label>
              <input
                style={inputStyle}
                value={lienGithub}
                onChange={e => setLienGithub(e.target.value)}
                placeholder="https://github.com/..."
                type="url"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Image du projet</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              style={{
                display: 'block',
                border: '2px dashed ' + (darkMode ? 'rgba(59,130,246,0.3)' : '#DBEAFE'),
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: darkMode ? '#0F1729' : '#F8FAFF',
                transition: 'border-color 0.2s',
              }}
            >
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                  />
                  <span style={{ fontSize: '11px', color: '#378ADD' }}>
                    Cliquer pour changer l'image
                  </span>
                </div>
              ) : (
                <div>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '12px', color: textSecondary, marginBottom: '3px' }}>
                    Clique pour choisir une image
                  </div>
                  <div style={{ fontSize: '10px', color: '#93C5FD' }}>
                    Maximum 2Mo — JPG, PNG, WebP
                  </div>
                </div>
              )}
            </label>
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

        </div>

        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'flex-end',
          padding: '16px 24px',
          borderTop: '1px solid ' + divider,
        }}>
          <button
            onClick={onFermer}
            style={{
              padding: '10px 24px', fontSize: '12px', fontWeight: 500,
              background: 'none',
              color: textSecondary,
              border: '2px solid ' + (darkMode ? '#334155' : '#E2E8F0'),
              borderRadius: '50px', cursor: 'pointer',
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '10px 24px', fontSize: '12px', fontWeight: 600,
              background: loading ? '#93C5FD' : '#378ADD',
              color: 'white', border: 'none',
              borderRadius: '50px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(55,138,221,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Sauvegarde...' : (projet ? 'Modifier le projet' : 'Publier le projet')}
          </button>
        </div>

      </div>
    </div>
  )
}

export default PopupProjet