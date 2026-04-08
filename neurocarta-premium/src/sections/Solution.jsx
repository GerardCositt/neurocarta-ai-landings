import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const FEATURES = [
  {
    title: 'Guía al cliente hacia donde te interesa',
    desc: 'La IA prioriza platos estratégicos visualmente: destacados, badges y posicionamiento en carta hacen el trabajo que antes hacía el camarero.',
  },
  {
    title: 'Optimiza copy e imágenes automáticamente',
    desc: 'Textos que activan el deseo, fotos que abren el apetito. NeuroCarta.ai® genera y mejora el contenido visual de cada plato con IA.',
  },
  {
    title: 'Rota stock y reduce mermas',
    desc: 'Cada día la plataforma te sugiere qué platos impulsar según disponibilidad. Menos producto desperdiciado, más margen real.',
  },
  {
    title: 'Upselling integrado en la experiencia',
    desc: 'Complementos, bebidas, postres. En el momento justo, sin presión. El sistema sugiere con criterio, no al azar.',
  },
  {
    title: 'Analítica de carta en tiempo real',
    desc: 'Sabes qué platos generan interés, cuáles convierten y cuáles hay que cambiar. Decisiones con datos, no con intuición.',
  },
  {
    title: 'Escalable para grupos y franquicias',
    desc: 'Control centralizado, coherencia de marca y adaptación por local. Gestiona todos tus establecimientos desde un solo panel.',
  },
]

export default function Solution() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.solution-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.solution-header', start: 'top 85%' },
      })

      // Left/right alternating reveal for feature rows
      gsap.from('.solution-feature', {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -24 : 24),
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.solution-features', start: 'top 78%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="solucion" ref={sectionRef} className="section-pad border-t border-nc-border bg-nc-surface/40">
      <div className="container-wide">

        {/* Header */}
        <div className="solution-header mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            La solución
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            NeuroCarta no informa.{' '}
            <span className="gold-text">Vende.</span>
          </h2>
          <p className="mt-4 text-nc-muted leading-relaxed">
            Cada elemento de la carta está diseñado para guiar decisiones, maximizar el ticket
            y reducir mermas — aplicando neuromarketing de forma práctica y automática.
          </p>
        </div>

        {/* Features grid */}
        <ul className="solution-features mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="solution-feature rounded-xl border border-nc-border bg-nc-surface p-6 hover:border-nc-gold/30 transition-colors group"
            >
              {/* Accent bar */}
              <div className="h-0.5 w-8 rounded-full bg-nc-gold mb-4 group-hover:w-14 transition-all duration-300" />
              <h3 className="text-sm font-bold text-nc-text leading-snug">{f.title}</h3>
              <p className="mt-2 text-sm text-nc-muted leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>

        {/* Central claim */}
        <div className="mt-14 mx-auto max-w-3xl rounded-2xl border border-nc-gold/20 bg-nc-gold/5 px-8 py-8 text-center">
          <p className="text-lg font-bold text-nc-text leading-snug">
            "No es una carta bonita.<br className="hidden sm:block" />
            Es una herramienta comercial con IA."
          </p>
          <p className="mt-3 text-sm text-nc-muted">
            La diferencia entre una carta QR y NeuroCarta.ai® es la misma que entre un folleto y un vendedor experto.
          </p>
          <a
            href="#cta"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-nc-red hover:bg-nc-red-hover px-6 py-3 text-sm font-bold text-white transition-colors btn-cta-glow"
          >
            Quiero verlo en mi restaurante
          </a>
        </div>
      </div>
    </section>
  )
}
