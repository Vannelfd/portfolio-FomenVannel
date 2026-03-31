import { useEffect, useRef } from 'react'
import VanPhoto from '../assets/Van.png'

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246,' + this.opacity + ')'
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle())
      }
    }

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = 'rgba(59, 130, 246,' + (0.1 * (1 - dist / 100)) + ')'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(function(p) { p.update(); p.draw() })
      connect()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', function() { resize(); init() })

    return function() {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-900">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-24">

        <div className="flex-1 text-center md:text-left">

          <div className="inline-block text-xs font-medium px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            Disponible pour des missions
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white leading-tight mb-3">
            Bonjour, je suis
            <span className="block text-blue-500 dark:text-blue-400 mt-1">
              FOMEN Vannel
            </span>
          </h1>

          <p className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-4">
            Developpeur Full Stack
          </p>

          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
            Je concois et developpe des applications web modernes, performantes et elegantes. Base a Douala, Cameroun.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">

            <a href="/#projets" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200 no-underline">
              Voir mes projets
            </a>

            <a href="/cv-fomen-vannel.pdf" target="_blank" className="px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium rounded-xl transition-all duration-200 no-underline">
              Telecharger CV
            </a>

            <a href="/#contact" className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium rounded-xl transition-all duration-200 no-underline">
              Me contacter
            </a>

          </div>

        </div>

        <div className="flex-shrink-0">
  <div className="relative">
    <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl border-4 border-blue-200 dark:border-blue-800 overflow-hidden">
      <img src={VanPhoto} alt="FOMEN Vannel" className="w-full h-full object-cover" />
    </div>

    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-100 dark:border-slate-700 rounded-full text-xs font-medium text-blue-500 dark:text-blue-400" style={{animation: 'float1 3s ease-in-out infinite'}}>
      #React.js
    </div>

    <div className="absolute bottom-8 left-6 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-100 dark:border-slate-700 rounded-full text-xs font-medium text-blue-500 dark:text-blue-400" style={{animation: 'float2 3.5s ease-in-out infinite'}}>
      #Node.js
    </div>

    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-100 dark:border-slate-700 rounded-full text-xs font-medium text-blue-500 dark:text-blue-400" style={{animation: 'float3 4s ease-in-out infinite'}}>
      #PostgreSQL
    </div>

    <style>{`
      @keyframes float1 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes float2 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes float3 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
    `}</style>

  </div>
</div>

      </div>

    </section>
  )
}

export default Hero