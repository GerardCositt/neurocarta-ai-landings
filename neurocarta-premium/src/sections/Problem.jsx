import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROBLEMS = [
  {
    icon: '🔄',
    title: 'El cliente pide siempre lo mismo',
    desc: 'Sin guía visual, el cerebro elige lo conocido. Los platos nuevos o más rentables quedan invisibles.',
  },
  {
    icon: '💸',
    title: 'Tienes platos con más margen que nadie pide',
    desc: 'No es que no gusten. Es que no están bien posicionados. Una carta estática no tiene criterio comercial.',
  },
  {
    icon: '🗑️',
    title: 'Las mermas no paran de crecer',
    desc: 'Sin rotación inteligente de stock, acabas tirando producto que podría haberse vendido esta semana.',
  },
  {
    icon: '📉',
    title: 'El ticket medio se estanca',
    desc: 'Sin sugerencias de upselling en el momento correcto, el cliente se va sin pedir el postre ni la bebida.',
  },
  {
    icon: '📵',
    title: 'Tu imagen no está a la altura',
    desc: 'Un PDF o una carta de papel en 2025 transmite que el negocio no evoluciona. La primera impresión cuesta.',
  },
  {
    icon: '🕶️',
    title: 'Gestionas a ciegas',
    desc: 'No sabes qué platos interesan, cuáles abandonan y cuáles convierten. Sin datos, no hay mejora posible.',
  },
]

export default function Problem() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Title block
      gsap.from('.problem-header', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.problem-header',
          start: 'top 85%',
        },
      })

      // Cards stagger in
      gsap.from('.problem-card', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.problem-grid',
          start: 'top 80%',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="problema" ref={sectionRef} className="section-pad border-t border-nc-border">
      <div className="container-wide">

        {/* Header */}
        <div className="problem-header mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            El problema real
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Tu carta QR no vende.
            <br />
            <span className="text-nc-muted font-normal">Solo informa.</span>
          </h2>
          <p className="mt-4 text-nc-muted leading-relaxed">
            Una carta digital sin inteligencia comercial deja dinero encima de la mesa cada día.
            Estos son los síntomas.
          </p>
        </div>

        {/* Cards */}
        <ul className="problem-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p) => (
            <li
              key={p.title}
              className="problem-card rounded-xl border border-nc-border bg-nc-surface p-6 transition-colors hover:border-nc-subtle"
            >
              <span className="text-2xl" role="img" aria-hidden="true">{p.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-nc-text">{p.title}</h3>
              <p className="mt-2 text-sm text-nc-muted leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ul>

        {/* CTA bridge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-nc-muted">
            Todos estos problemas tienen solución con la herramienta correcta.
          </p>
          <a href="#solucion" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-nc-gold hover:text-nc-text transition-colors">
            Ver la solución
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
