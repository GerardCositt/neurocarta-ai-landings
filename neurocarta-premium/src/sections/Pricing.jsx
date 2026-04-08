import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const cx = (...c) => c.filter(Boolean).join(' ')

const PLANS = [
  {
    name: 'Basic',
    price: '59',
    period: '/mes',
    tagline: 'Para un local. Empieza rápido.',
    credits: '700 créditos IA',
    cta: 'Empezar gratis',
    ctaStyle: 'border border-nc-border bg-nc-elevated hover:border-nc-subtle text-nc-text',
    highlighted: false,
    items: [
      'Carta digital con QR personalizado',
      'Descripción IA por plato',
      'Imágenes IA (pack inicial)',
      'Destacados manuales (rentable / recomendado)',
      'Edición en tiempo real: precios y alérgenos',
      'Soporte por email (24–48 h)',
    ],
  },
  {
    name: 'Pro',
    price: '129',
    period: '/mes',
    tagline: 'El que más restaurantes eligen.',
    credits: '2.500 créditos IA',
    cta: 'Quiero vender más',
    ctaStyle: 'bg-nc-red hover:bg-nc-red-hover text-white btn-cta-glow',
    highlighted: true,
    items: [
      'Todo lo de Basic',
      'Destacado inteligente por margen y rotación',
      'Upselling sugerido (bebidas, extras, postres)',
      'Mejoras de copy iterativas con IA',
      'Analítica por plato (interés y conversión)',
      'Impulso de stock urgente',
      'Soporte prioritario (24 h)',
    ],
  },
  {
    name: 'Premium',
    price: '249',
    period: '/mes',
    tagline: 'Volumen, marca y control total.',
    credits: '6.500 créditos IA',
    cta: 'Hablar con ventas',
    ctaStyle: 'border border-nc-gold/40 bg-nc-gold/8 hover:bg-nc-gold/15 text-nc-gold btn-gold-glow',
    highlighted: false,
    items: [
      'Todo lo de Pro',
      'Estilo de marca avanzado (tipografía, colores)',
      'Generación masiva de imágenes IA',
      'Flujos anti-merma y rotación automática',
      'Exportables para redes y campañas',
      'Multi-local incluido (hasta 5)',
      'Onboarding guiado + soporte premium',
    ],
  },
]

function PlanCard({ plan, index }) {
  return (
    <div
      className={cx(
        'pricing-card relative flex flex-col rounded-2xl border p-7 transition',
        plan.highlighted
          ? 'border-nc-red bg-nc-elevated shadow-[0_0_60px_-15px_rgba(200,48,48,0.4)] lg:-mt-4 lg:mb-4'
          : 'border-nc-border bg-nc-surface hover:border-nc-subtle'
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-nc-red px-4 py-1 text-xs font-black uppercase tracking-wide text-white">
          Más popular
        </div>
      )}

      {/* Plan name + price */}
      <div>
        <span className={cx('text-xs font-bold uppercase tracking-widest', plan.highlighted ? 'text-nc-red' : 'text-nc-muted')}>
          {plan.name}
        </span>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-4xl font-black text-nc-text">{plan.price} €</span>
          <span className="pb-1 text-sm text-nc-muted">{plan.period}</span>
        </div>
        <p className="mt-1.5 text-sm text-nc-muted">{plan.tagline}</p>
      </div>

      {/* Credits badge */}
      <div className={cx(
        'mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm',
        plan.highlighted
          ? 'border border-nc-red/20 bg-nc-red/8 text-nc-text'
          : 'border border-nc-border bg-nc-elevated text-nc-muted'
      )}>
        <svg viewBox="0 0 16 16" fill="none" className={cx('h-4 w-4', plan.highlighted ? 'text-nc-red' : 'text-nc-gold')} aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-nc-text">{plan.credits}</span>
      </div>

      {/* CTA */}
      <a
        href="#cta"
        className={cx(
          'mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition',
          plan.ctaStyle
        )}
      >
        {plan.cta}
      </a>

      {/* Features */}
      <div className="mt-7 text-[10px] font-semibold uppercase tracking-wider text-nc-subtle mb-3">
        Incluye
      </div>
      <ul className="flex-1 space-y-2.5">
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-nc-muted">
            <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 flex-shrink-0 text-nc-gold" aria-hidden="true">
              <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.pricing-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.pricing-header', start: 'top 85%' },
      })

      // Anchor price first (left), then popular (center lifts), then right
      gsap.from('.pricing-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="precios" ref={sectionRef} className="section-pad border-t border-nc-border scroll-mt-24">
      <div className="container-wide">

        {/* Header */}
        <div className="pricing-header mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            Planes
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Elige cómo quieres{' '}
            <span className="gold-text">dominar la carta</span>
          </h2>
          <p className="mt-4 text-nc-muted leading-relaxed">
            Todos los planes incluyen prueba gratuita. Sin permanencia en el periodo de prueba.
            Facturación anual disponible con descuento.
          </p>
        </div>

        {/* Grid — Premium shown first (anchor), Pro in center, Basic last */}
        <div className="pricing-grid mt-14 grid gap-5 lg:grid-cols-3 lg:items-start">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Enterprise row */}
        <div className="mt-8 rounded-2xl border border-nc-gold/20 bg-nc-gold/5 p-7 text-center sm:p-9">
          <h3 className="text-lg font-black text-nc-gold">Franquicias y cadenas</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-nc-muted leading-relaxed">
            Gestión centralizada, carta coherente en todos los locales, datos independientes por establecimiento.
            Precio cerrado bajo propuesta personalizada.
          </p>
          <a
            href="#cta"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-nc-gold/40 bg-nc-gold/10 hover:bg-nc-gold/20 px-7 py-3 text-sm font-bold text-nc-gold transition-colors btn-gold-glow"
          >
            Pedir propuesta para mi cadena
          </a>
        </div>

        {/* Guarantee */}
        <p className="mt-8 text-center text-xs text-nc-subtle">
          ✓ Prueba gratuita sin tarjeta · ✓ Cancela cuando quieras · ✓ Soporte en español
        </p>
      </div>
    </section>
  )
}
