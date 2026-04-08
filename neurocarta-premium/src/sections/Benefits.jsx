import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const BENEFITS = [
  {
    metric: '+27 %',
    title: 'Ticket medio',
    desc: 'Upselling inteligente, platos estratégicos destacados y sugerencias en el momento correcto.',
    color: 'text-nc-gold',
    border: 'border-nc-gold/20',
    bg: 'bg-nc-gold/5',
  },
  {
    metric: '–35 %',
    title: 'Mermas',
    desc: 'Rotación diaria sugerida por IA según disponibilidad y caducidad. Menos basura, más margen.',
    color: 'text-emerald-400',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/5',
  },
  {
    metric: '5 min',
    title: 'Setup inicial',
    desc: 'Digitaliza tu carta, sube los platos y la IA empieza a trabajar. Sin TPV. Sin integración compleja.',
    color: 'text-sky-400',
    border: 'border-sky-400/20',
    bg: 'bg-sky-400/5',
  },
  {
    metric: '×3',
    title: 'Velocidad de decisión',
    desc: 'Clientes que deciden más rápido: menos espera, más rotación de mesas y mejor experiencia.',
    color: 'text-nc-orange',
    border: 'border-nc-orange/20',
    bg: 'bg-nc-orange/5',
  },
  {
    metric: '100 %',
    title: 'Control de marca',
    desc: 'Actualiza precios, alérgenos y platos al instante desde el móvil. La carta siempre actualizada.',
    color: 'text-violet-400',
    border: 'border-violet-400/20',
    bg: 'bg-violet-400/5',
  },
  {
    metric: '∞',
    title: 'Locales en paralelo',
    desc: 'Gestiona una carta o veinte. Misma plataforma, coherencia de marca, datos independientes por local.',
    color: 'text-rose-400',
    border: 'border-rose-400/20',
    bg: 'bg-rose-400/5',
  },
]

export default function Benefits() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.benefits-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.benefits-header', start: 'top 85%' },
      })

      // Cards pop in with stagger + slight scale
      gsap.from('.benefit-card', {
        opacity: 0,
        y: 36,
        scale: 0.97,
        stagger: 0.09,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.benefits-grid', start: 'top 78%' },
      })

      // Animate metric numbers separately for emphasis
      gsap.from('.benefit-metric', {
        opacity: 0,
        scale: 0.7,
        stagger: 0.09,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.benefits-grid', start: 'top 78%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-pad border-t border-nc-border">
      <div className="container-wide">

        {/* Header */}
        <div className="benefits-header mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            Por qué funciona
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Resultados medibles.{' '}
            <span className="gold-text">No promesas vacías.</span>
          </h2>
          <p className="mt-4 text-nc-muted leading-relaxed">
            Estos son los impactos reales que nuestros clientes registran en los primeros 30 días.
          </p>
        </div>

        {/* Grid */}
        <ul className="benefits-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <li
              key={b.title}
              className={`benefit-card rounded-xl border ${b.border} ${b.bg} p-6`}
            >
              <div className={`benefit-metric text-4xl font-black ${b.color} leading-none`}>
                {b.metric}
              </div>
              <h3 className="mt-3 text-sm font-bold text-nc-text">{b.title}</h3>
              <p className="mt-2 text-sm text-nc-muted leading-relaxed">{b.desc}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-nc-subtle">
          * Métricas basadas en datos internos de restaurantes activos en la plataforma. Los resultados pueden variar según el tipo de local.
        </p>
      </div>
    </section>
  )
}
