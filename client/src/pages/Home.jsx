import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Competences from '../components/Competences'
import Experiences from '../components/Experiences'
import Contact from '../components/Contact'
import Projets from '../components/Projets'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Competences />
      <Experiences />
      <Projets />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home