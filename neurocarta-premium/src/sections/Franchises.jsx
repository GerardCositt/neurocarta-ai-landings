import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PILLARS = [
  {
    icon: '🏢',
    title: 'Control centralizado',
    desc: 'Un solo panel para gestionar la carta de todos tus locales. Actualiza precios, platos y destacados en toda la red en segundos.',
  },
  {
    icon: '🎨',
    title: 'Coherencia de marca',
    desc: 'Mismos colores, tipografía y estilo visual en todos los establecimientos. La identidad de tu cadena, siempre consistente.',
  },
  {
    icon: '📍',
    title: 'Adaptación por local',
    desc: 'Cada restaurante puede tener platos, precios o destacados propios sin romper la estructura de marca global.',
  },
  {
    icon: '📊',
    title: 'Datos por establecimiento',
    desc: 'Analítica independiente por local: qué platos funcionan, cuáles no y qué mejorar en cada punto de venta.',
  },
  {
    icon: '⚡',
    title: 'Actualizaciones instantáneas',
    desc: 'El proveedor sube el precio del aceite. En dos clics lo actualizas en los 30 locales de tu red.',
  },
  {
    icon: '🤝',
    title: 'Onboarding guiado',
    desc: 'Te acompañamos en la implementación. Formamos a tu equipo y configuramos el sistema según tu operativa.',
  },
]

export default function Franchises() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.franchise-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.franchise-header', start: 'top 85%' },
      })

      gsap.from('.franchise-pillar', {
        opacity: 0, y: 36, stagger: 0.09, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.franchise-pillars', start: 'top 78%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-pad border-t border-nc-border bg-nc-surface/40">
      <div className="container-wide">

        {/* Header */}
        <div className="franchise-header grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
              Grupos y franquicias
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Escala sin perder{' '}
              <span className="gold-text">el control.</span>
            </h2>
            <p className="mt-4 text-nc-muted leading-relaxed max-w-lg">
              NeuroCarta.ai® está diseñado para crecer contigo. Desde un solo local hasta una cadena
              de 200 establecimientos, la plataforma mantiene la coherencia sin sacrificar la flexibilidad.
            </p>
            <a
              href="#cta"
              className="mt-7 inline-flex items-center gap-2 rounded-md border border-nc-gold/40 bg-nc-gold/8 hover:bg-nc-gold/18 px-6 py-3 text-sm font-bold text-nc-gold transition-colors btn-gold-glow"
            >
              Solicitar propuesta para mi grupo
            </a>
          </div>

          {/* Visual stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '200+', label: 'locales gestionables desde un panel' },
              { n: '< 2 min', label: 'para actualizar toda la red' },
              { n: '100 %', label: 'coherencia de marca garantizada' },
              { n: '1 panel', label: 'para toda la operativa' },
            ].map(({ n, label }) => (
              <div key={label} className="rounded-xl border border-nc-border bg-nc-surface p-5">
                <div className="text-2xl font-black text-nc-gold">{n}</div>
                <p className="mt-1.5 text-xs text-nc-muted leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <ul className="franchise-pillars mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <li
              key={p.title}
              className="franchise-pillar rounded-xl border border-nc-border bg-nc-surface p-5 hover:border-nc-gold/20 transition-colors"
            >
              <span className="text-2xl" role="img" aria-hidden="true">{p.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-nc-text">{p.title}</h3>
              <p className="mt-1.5 text-sm text-nc-muted leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
