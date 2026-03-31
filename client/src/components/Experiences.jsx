import { useEffect, useRef, useState } from 'react'
import useWindowWidth from '../hooks/useWindowWidth'

const experiences = [
  {
    poste: 'Stagiaire — Ingénierie Logicielle',
    entreprise: 'OPIPS CAPITAL',
    lieu: 'Makepe, Douala',
    debut: 'Février 2025',
    fin: 'Juillet 2025',
    actuel: true,
    description: "Conception, implémentation et optimisation de l'automatisation de l'exécution d'une stratégie en trading quantitatif — cas de l'US500. Travail sur les systèmes experts appliqués à la finance.",
    tags: ['Python', 'Trading quantitatif', 'Systèmes experts', 'MT5'],
    badges: ['#Algorithmique', '#IA Financière'],
  },
  {
    poste: 'Stagiaire — Développement & Finance',
    entreprise: 'OPIPS CAPITAL',
    lieu: 'Makepe, Douala',
    debut: 'Juin 2024',
    fin: 'Août 2024',
    actuel: false,
    description: "Mise en place d'un indicateur de tendance des prix dans un broker. Collecte des prix sur le marché en temps réel sur MT5. Réalisation de tests d'achat en temps réel.",
    tags: ['MT5', 'Indicateurs', 'Temps réel', 'Finance'],
    badges: ['#Temps réel', '#Marché'],
  },
  {
    poste: 'Stagiaire — Développement Web',
    entreprise: 'FKIPROD',
    lieu: 'Deido, Douala',
    debut: 'Juin 2023',
    fin: 'Août 2023',
    actuel: false,
    description: "Création d'un site web pour une entreprise de langue avec intégration d'un espace personnel. Initiation aux CMS et création de sites sécurisés. Correction des erreurs de base de données.",
    tags: ['WordPress', 'CMS', 'HTML/CSS', 'PHP'],
    badges: ['#WordPress', '#Web'],
  },
  {
    poste: 'Stagiaire — Administration & SI',
    entreprise: 'Tsafoel Solar Energie',
    lieu: 'Yaoundé, Cameroun',
    debut: 'Juin 2022',
    fin: 'Août 2022',
    actuel: false,
    description: "Gestion et organisation de bases de données et de documents administratifs. Assistance à la planification et coordination de réunions. Accueil des visiteurs et organisation de voyages d'affaires.",
    tags: ['Excel', 'Access', 'Power BI', 'Administration'],
    badges: ['#Reporting', '#Gestion'],
  },
]

function ExperienceCard({ exp, index, visible, darkMode }) {
  const isLeft = index % 2 === 0

  return (
    <div style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      position: 'relative',
      marginBottom: '40px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease ' + (index * 0.15) + 's, transform 0.6s ease ' + (index * 0.15) + 's',
    }}>

      <div style={{
        width: '45%',
        background: darkMode ? '#162032' : '#FFFFFF',
        border: '1.5px solid ' + (darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.3)'),
        borderRadius: '16px',
        padding: '20px',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
        onMouseEnter={function(e) {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.borderColor = darkMode ? 'rgba(96,165,250,0.4)' : 'rgba(59,130,246,0.4)'
          e.currentTarget.style.background = darkMode ? '#1a2d4a' : '#F0F7FF'
        }}
        onMouseLeave={function(e) {
          e.currentTarget.style.transform = 'translateY(0px)'
          e.currentTarget.style.borderColor = darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.3)'
          e.currentTarget.style.background = darkMode ? '#162032' : '#FFFFFF'
        }}
      >

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px', gap: '8px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '3px' }}>
              {exp.poste}
            </h3>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#378ADD' }}>
              {exp.entreprise}
            </div>
            <div style={{ fontSize: '13px', color: darkMode ? '#64748B' : '#94a3b8', marginTop: '2px' }}>
              {exp.lieu}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '20px',
              background: exp.actuel ? (darkMode ? '#1e3a5f' : '#EFF6FF') : (darkMode ? '#1e293b' : '#F1F5F9'),
              color: exp.actuel ? '#378ADD' : (darkMode ? '#64748B' : '#94a3b8'),
              border: '1px solid ' + (exp.actuel ? '#DBEAFE' : (darkMode ? '#334155' : '#E2E8F0')),
              whiteSpace: 'nowrap',
            }}>
              {exp.actuel ? 'En cours' : 'Terminé'}
            </div>
            <div style={{ fontSize: '12px', color: darkMode ? '#64748B' : '#94a3b8', marginTop: '4px' }}>
              {exp.debut} — {exp.fin}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#475569', lineHeight: '1.7', marginBottom: '12px' }}>
          {exp.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {exp.tags.map(function(tag) {
            return (
              <span key={tag} style={{
                fontSize: '12px',
                fontWeight: 500,
                padding: '2px 10px',
                borderRadius: '20px',
                background: darkMode ? '#1e3a5f' : '#EFF6FF',
                color: darkMode ? '#93C5FD' : '#378ADD',
                border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
              }}>
                {tag}
              </span>
            )
          })}
        </div>

        <div style={{
          position: 'absolute',
          top: '24px',
          [isLeft ? 'right' : 'left']: '-8px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#378ADD',
          border: '3px solid ' + (darkMode ? '#0F1729' : '#F8FAFF'),
          zIndex: 2,
        }} />

        {exp.badges[0] && (
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '16px',
            padding: '4px 12px',
            background: darkMode ? 'rgba(22,32,50,0.85)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid ' + (darkMode ? 'rgba(55,138,221,0.25)' : 'rgba(147,197,253,0.5)'),
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            color: darkMode ? '#93C5FD' : '#378ADD',
            animation: 'expFloat1 3s ease-in-out infinite',
            zIndex: 3,
            whiteSpace: 'nowrap',
          }}>
            {exp.badges[0]}
          </div>
        )}

        {exp.badges[1] && (
          <div style={{
            position: 'absolute',
            bottom: '-14px',
            right: '16px',
            padding: '4px 12px',
            background: darkMode ? 'rgba(22,32,50,0.85)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid ' + (darkMode ? 'rgba(55,138,221,0.25)' : 'rgba(147,197,253,0.5)'),
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            color: darkMode ? '#93C5FD' : '#378ADD',
            animation: 'expFloat2 3.8s ease-in-out infinite',
            zIndex: 3,
            whiteSpace: 'nowrap',
          }}>
            {exp.badges[1]}
          </div>
        )}

      </div>
    </div>
  )
}

function Experiences() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )

  useEffect(function() {
    const observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return function() { observer.disconnect() }
  }, [])

  useEffect(function() {
    const mo = new MutationObserver(function() {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return function() { mo.disconnect() }
  }, [])

  return (
    <section
      id="experiences"
      ref={sectionRef}
      style={{
        padding: '80px 32px',
        background: darkMode ? '#0B1120' : '#FFFFFF',
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @keyframes expFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes expFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '13px', fontWeight: 500,
            color: darkMode ? '#93C5FD' : '#378ADD',
            background: darkMode ? '#1e3a5f' : '#EFF6FF',
            border: '1px solid ' + (darkMode ? '#1e4976' : '#DBEAFE'),
            padding: '4px 14px', borderRadius: '20px', marginBottom: '10px',
          }}>
            Mon parcours
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: darkMode ? '#E2E8F0' : '#1E293B', marginBottom: '8px' }}>
            Expériences professionnelles
          </h2>
          <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #378ADD, #93C5FD)', borderRadius: '2px' }} />
        </div>

        <div style={{ position: 'relative' }}>

          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: '2px',
            background: darkMode
              ? 'linear-gradient(180deg, #1e3a5f, #378ADD, #1e3a5f)'
              : 'linear-gradient(180deg, #DBEAFE, #378ADD, #DBEAFE)',
            transform: 'translateX(-50%)',
          }} />

          {experiences.map(function(exp, index) {
            return (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                visible={visible}
                darkMode={darkMode}
              />
            )
          })}

        </div>
      </div>
    </section>
  )
}

export default Experiences