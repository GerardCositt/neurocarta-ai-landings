import { useState, useEffect } from 'react'
import Hero from './sections/Hero.jsx'
import Problem from './sections/Problem.jsx'
import Solution from './sections/Solution.jsx'
import Benefits from './sections/Benefits.jsx'
import Demo from './sections/Demo.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import Pricing from './sections/Pricing.jsx'
import Franchises from './sections/Franchises.jsx'
import SocialProof from './sections/SocialProof.jsx'
import FAQ from './sections/FAQ.jsx'
import CTAFinal from './sections/CTAFinal.jsx'

/* ─── Header ─────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-nc-border bg-nc-bg/95 backdrop-blur-md shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-nc-gold text-nc-bg font-black text-sm select-none">
            N
          </span>
          <span className="text-base font-bold tracking-tight text-nc-text">
            NeuroCarta<span className="text-nc-gold">.ai</span>
            <span className="align-super text-[10px] text-nc-muted" aria-label="marca registrada">
              ®
            </span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-nc-muted font-medium">
          <a href="#problema" className="hover:text-nc-text transition-colors">El problema</a>
          <a href="#solucion" className="hover:text-nc-text transition-colors">La solución</a>
          <a href="#precios" className="hover:text-nc-text transition-colors">Precios</a>
          <a href="#faq" className="hover:text-nc-text transition-colors">FAQ</a>
        </nav>

        {/* CTA */}
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-md bg-nc-red hover:bg-nc-red-hover px-4 py-2 text-sm font-bold text-white transition-colors btn-cta-glow"
        >
          Solicitar demo
        </a>
      </div>
    </header>
  )
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-nc-border bg-nc-bg py-10">
      <div className="container-wide flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <span className="text-sm font-bold text-nc-text">
            NeuroCarta<span className="text-nc-gold">.ai</span>
            <span className="align-super text-[10px] text-nc-muted" aria-label="marca registrada">
              ®
            </span>
          </span>
          <p className="mt-1 text-xs text-nc-subtle">
            La carta digital que convierte visitas en ventas.
          </p>
        </div>
        <p className="text-xs text-nc-subtle">
          © {new Date().getFullYear()} NeuroCarta<span className="text-nc-gold">.ai</span>
          <span className="align-super text-[10px] text-nc-muted" aria-label="marca registrada">
            ®
          </span>{' '}
          · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Demo />
        <HowItWorks />
        <Pricing />
        <Franchises />
        <SocialProof />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
