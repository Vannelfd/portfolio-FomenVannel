// ============================================
// FOOTER — Pied de page du portfolio
// Fichier : client/src/components/Footer.jsx
// ============================================

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ---- ICONES DES RESEAUX SOCIAUX ----
// Chaque icone est un composant SVG independant
// Pour modifier une icone, remplace le contenu SVG ici

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const UpworkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6.5c0 4.4-2 7.5-5 8.5-.6-2.3-.9-4.2-.9-5.7 0-1.7.5-3 1.5-3.8.3-.3.7-.5 1.1-.5.8 0 1.5.7 1.5 1.5z"/>
    <path d="M9 11.3c0 1.5.3 3.4.9 5.7C6 16 4 12.9 4 8.5c0-.8.7-1.5 1.5-1.5.4 0 .8.2 1.1.5C7.6 8.3 9 9.6 9 11.3z"/>
    <path d="M15 19c-1 .6-2 1-3 1s-2-.4-3-1c.6-2.1.9-4.1.9-5.7 0-.5 0-1-.1-1.3h4.4c-.1.3-.1.8-.1 1.3 0 1.6.3 3.6.9 5.7z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
)

// ---- LIENS DE NAVIGATION ----
// Pour ajouter un lien, ajoute un objet { label, to, icon }
// "to" doit correspondre aux id des sections dans Home.jsx

const navLinks = [
  { label: 'Accueil', to: '/#accueil', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
  { label: 'Competences', to: '/#competences', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>) },
  { label: 'Experiences', to: '/#experiences', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>) },
  { label: 'Projets', to: '/#projets', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
  { label: 'Contact', to: '/#contact', icon: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>) },
]

// ---- LIENS DES RESEAUX SOCIAUX ----
// Pour modifier un lien, change le "href" par ton vrai profil
// Pour ajouter un reseau, ajoute un objet { icon, href, label }

const socialLinks = [
  { icon: <GitHubIcon />, href: 'https://github.com/vanneldf', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/vannel-fomen', label: 'LinkedIn' },
  { icon: <UpworkIcon />, href: 'https://upwork.com/freelancers/vanneldf', label: 'Upwork' },
  { icon: <TwitterIcon />, href: 'https://twitter.com/vanneldf', label: 'Twitter' },
]

// ---- STYLE REUTILISABLE POUR LES LIENS ----
// Utilise partout dans le footer pour les liens de navigation et contact

const linkStyle = {
  display: 'flex', alignItems: 'center', gap: '8px',
  fontSize: '13px', color: '#64748B',
  marginBottom: '12px', textDecoration: 'none',
  transition: 'color 0.2s',
}

// ---- COMPOSANT PRINCIPAL FOOTER ----

function Footer() {
  return (
    <footer style={{ background: '#0F1729', padding: '48px 32px 24px' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ---- GRILLE PRINCIPALE : 3 COLONNES ---- */}
        {/* Colonne 1 : Logo + description + reseaux sociaux */}
        {/* Colonne 2 : Liens de navigation */}
        {/* Colonne 3 : Infos de contact + bouton CV */}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>

          {/* ---- COLONNE 1 : LOGO + DESCRIPTION + RESEAUX ---- */}
          <div>

            {/* Remplace logo.png par ton fichier dans client/public/ */}
            <img src="/logo.png" alt="FOMEN Vannel" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginBottom: '14px' }} />

            {/* Description courte — modifie ce texte selon ton profil */}
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.7', maxWidth: '280px', marginBottom: '20px' }}>
              Developpeur Full Stack passionne, base a Douala, Cameroun. Je concois des applications web modernes et performantes.
            </p>

            {/* Icones des reseaux sociaux — generees depuis le tableau socialLinks ci-dessus */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(function(social) {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                    style={{
                      width: '36px', height: '36px',
                      borderRadius: '50px',
                      border: '1.5px solid rgba(59,130,246,0.2)',
                      background: 'rgba(59,130,246,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#64748B', textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={function(e) {
                      e.currentTarget.style.borderColor = '#378ADD'
                      e.currentTarget.style.color = '#378ADD'
                      e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                    }}
                    onMouseLeave={function(e) {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)'
                      e.currentTarget.style.color = '#64748B'
                      e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                    }}
                  >
                    {social.icon}
                  </a>
                )
              })}
            </div>

          </div>

          {/* ---- COLONNE 2 : LIENS DE NAVIGATION ---- */}
          {/* Generes automatiquement depuis le tableau navLinks ci-dessus */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Navigation
            </div>
            {navLinks.map(function(link) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={linkStyle}
                  onMouseEnter={function(e) { e.currentTarget.style.color = '#378ADD' }}
                  onMouseLeave={function(e) { e.currentTarget.style.color = '#64748B' }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* ---- COLONNE 3 : CONTACT + BOUTON CV ---- */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Contact
            </div>

            {/* Email cliquable — ouvre le client mail de l'utilisateur */}
            <a
              href="mailto:fomensmith@gmail.com"
              style={linkStyle}
              onMouseEnter={function(e) { e.currentTarget.style.color = '#378ADD' }}
              onMouseLeave={function(e) { e.currentTarget.style.color = '#64748B' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              fomensmith@gmail.com
            </a>

            {/* Telephone cliquable — lance un appel sur mobile */}
            <a
              href="tel:+237691971253"
              style={linkStyle}
              onMouseEnter={function(e) { e.currentTarget.style.color = '#378ADD' }}
              onMouseLeave={function(e) { e.currentTarget.style.color = '#64748B' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +237 6 91 97 12 53
            </a>

            {/* Localisation — pas cliquable, juste informatif */}
            <div style={{ ...linkStyle, cursor: 'default', marginBottom: '12px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Douala, Cameroun
            </div>

            {/* Bouton telechargement CV */}
            {/* Assure-toi que le fichier CV est dans client/public/cv-fomen-vannel.pdf */}
            <a
              href="/cv-fomen-vannel.pdf"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px', borderRadius: '50px',
                border: '2px solid rgba(59,130,246,0.3)',
                background: 'none', color: '#378ADD',
                fontSize: '11px', fontWeight: 600,
                textDecoration: 'none', marginTop: '4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={function(e) {
                e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                e.currentTarget.style.borderColor = '#378ADD'
              }}
              onMouseLeave={function(e) {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Telecharger CV
            </a>

          </div>

        </div>

        {/* ---- BARRE DE SEPARATION ---- */}
        <div style={{ borderTop: '1px solid rgba(59,130,246,0.1)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>

          {/* Copyright — met a jour l'annee si besoin */}
          <div style={{ fontSize: '12px', color: '#475569' }}>
            2026 <span style={{ color: '#378ADD' }}>FOMEN Vannel</span> — Tous droits reserves
          </div>

          {/* Localisation en bas a droite */}
          <div style={{ fontSize: '12px', color: '#475569' }}>
            Douala, Cameroun
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer