import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const TESTIMONIALS = [
  {
    quote: 'Llevábamos años con la misma carta en PDF. Con NeuroCarta.ai® la cambiamos en un fin de semana y en el primer mes ya notamos la diferencia en el ticket.',
    name: 'Carlos M.',
    role: 'Propietario, Restaurante El Roble',
    location: 'Madrid',
    metric: '+24 % ticket',
  },
  {
    quote: 'Lo que más me sorprendió fue lo fácil que fue destacar los platos que nos interesaban. Antes dependíamos del camarero. Ahora la carta hace ese trabajo sola.',
    name: 'Ana R.',
    role: 'Directora de Operaciones, Grupo Taberna',
    location: 'Barcelona',
    metric: '–30 % mermas',
  },
  {
    quote: 'Gestiono 8 locales. Antes era un caos mantener las cartas actualizadas. Ahora lo hago desde un panel en 10 minutos. Es una herramienta de negocio real.',
    name: 'Jordi P.',
    role: 'CEO, Cadena Brasería Norte',
    location: 'Cataluña',
    metric: '8 locales, 1 panel',
  },
]

const METRICS = [
  { value: '+180', label: 'restaurantes activos' },
  { value: '+27 %', label: 'ticket medio de media' },
  { value: '–35 %', label: 'reducción de mermas' },
  { value: '4.8 / 5', label: 'valoración media' },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-4 w-4 text-nc-gold fill-current" aria-hidden="true">
          <path d="M8 1l1.854 3.754 4.146.603-3 2.923.708 4.127L8 10.25l-3.708 2.157.708-4.127-3-2.923 4.146-.603z" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Metrics counter-style entrance
      gsap.from('.sp-metric', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.55,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.sp-metrics', start: 'top 82%' },
      })

      gsap.from('.sp-header', {
        opacity: 0, y: 28, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.sp-header', start: 'top 85%' },
      })

      gsap.from('.sp-card', {
        opacity: 0,
        y: 36,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.sp-cards', start: 'top 80%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-pad border-t border-nc-border">
      <div className="container-wide">

        {/* Metrics strip */}
        <div className="sp-metrics grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
          {METRICS.map(({ value, label }) => (
            <div
              key={label}
              className="sp-metric rounded-xl border border-nc-border bg-nc-surface px-4 py-5 text-center"
            >
              <div className="text-3xl font-black text-nc-gold">{value}</div>
              <div className="mt-1 text-xs text-nc-muted">{label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="sp-header mx-auto max-w-xl text-center mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            Testimonios
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Lo que dicen los que{' '}
            <span className="gold-text">ya venden más</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="sp-cards grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="sp-card flex flex-col rounded-xl border border-nc-border bg-nc-surface p-6 hover:border-nc-subtle transition-colors"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm text-nc-muted leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-sm font-bold text-nc-text">{t.name}</div>
                  <div className="text-xs text-nc-subtle">{t.role}</div>
                  <div className="text-xs text-nc-subtle">{t.location}</div>
                </div>
                <span className="rounded-lg bg-nc-gold/10 border border-nc-gold/20 px-2.5 py-1 text-xs font-bold text-nc-gold">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-nc-subtle">
          {[
            '🔒 Datos protegidos RGPD',
            '🇪🇸 Empresa española',
            '⚡ Uptime 99.9 %',
            '🏆 Usado en 8 comunidades autónomas',
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
