import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ─── Animated menu mockup shown in hero right column ── */
const MENU_ITEMS = [
  {
    name: 'Pasta al Tartufo',
    desc: 'Trufa negra, parmesano, mantequilla tostada',
    price: '18,50 €',
    badge: '🔥 Más rentable',
    badgeClass: 'bg-nc-red text-white',
    scoreWidth: 0.92,
    gradient: 'from-amber-900/40 to-nc-surface',
  },
  {
    name: 'Croquetas de jamón',
    desc: 'Masa casera, jamón ibérico D.O.',
    price: '11,90 €',
    badge: '⭐ Top ventas',
    badgeClass: 'bg-nc-gold text-nc-bg',
    scoreWidth: 0.78,
    gradient: 'from-orange-900/30 to-nc-surface',
  },
  {
    name: 'Tarta de Santiago',
    desc: 'Almendra, limón, azúcar glas',
    price: '6,50 €',
    badge: '📈 Impulsar',
    badgeClass: 'bg-nc-orange text-white',
    scoreWidth: 0.62,
    gradient: 'from-yellow-900/20 to-nc-surface',
  },
]

function MenuDemo() {
  const demoRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Start hidden
      gsap.set(['.demo-badge', '.demo-ticket', '.demo-ai-label'], { autoAlpha: 0 })
      gsap.set('.demo-score-fill', { scaleX: 0, autoAlpha: 0 })
      gsap.set('.demo-scan', { scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

      // Scan line sweeps down
      tl.to('.demo-scan', { autoAlpha: 1, scaleY: 1, duration: 0.2 })
      tl.to('.demo-scan', { y: '320px', duration: 0.9, ease: 'none' })
      tl.to('.demo-scan', { autoAlpha: 0, duration: 0.2 })
      tl.to('.demo-ai-label', { autoAlpha: 1, duration: 0.3 }, '<-0.1')

      // Badges appear one by one with a pop
      tl.to('.demo-badge', {
        autoAlpha: 1,
        x: 0,
        stagger: 0.18,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, '-=0.2')

      // Score bars fill
      MENU_ITEMS.forEach((item, i) => {
        tl.to(`.demo-score-${i}`, {
          autoAlpha: 1,
          scaleX: item.scoreWidth,
          duration: 0.7,
          ease: 'power2.out',
        }, i === 0 ? '-=0.35' : `<0.12`)
      })

      // Ticket stat pops in
      tl.to('.demo-ticket', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }, '<0.15')

      // Hold
      tl.to({}, { duration: 4 })

      // Reset — fade everything out
      tl.to(['.demo-badge', '.demo-ticket', '.demo-ai-label'], { autoAlpha: 0, duration: 0.35 })
      tl.to('.demo-score-fill', { scaleX: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '<')
    })

    // Reduced motion: show optimized state statically, no loop
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(['.demo-badge', '.demo-ticket', '.demo-ai-label'], { autoAlpha: 1 })
      MENU_ITEMS.forEach((item, i) => {
        gsap.set(`.demo-score-${i}`, { autoAlpha: 1, scaleX: item.scoreWidth })
      })
    })
  }, { scope: demoRef })

  return (
    <div
      ref={demoRef}
      className="relative w-full max-w-sm mx-auto rounded-2xl border border-nc-border bg-nc-surface overflow-hidden shadow-2xl shadow-black/60"
    >
      {/* Scan line — GSAP moves this down */}
      <div
        className="demo-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A84B 30%, #F0C97A 50%, #D4A84B 70%, transparent)' }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-nc-border px-4 py-3">
        <span className="text-xs font-bold text-nc-text">
          NeuroCarta<span className="text-nc-gold">.ai</span>
        </span>
        <span className="demo-ai-label flex items-center gap-1.5 rounded-full bg-nc-gold/15 px-2 py-0.5 text-[10px] font-bold text-nc-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-nc-gold animate-pulse-slow" />
          IA activa
        </span>
      </div>

      {/* Menu items */}
      <div className="divide-y divide-nc-border">
        {MENU_ITEMS.map((item, i) => (
          <div key={item.name} className="flex gap-3 p-3">
            {/* Image placeholder */}
            <div className={`h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${item.gradient}`} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-nc-text leading-tight">{item.name}</span>
                {/* Badge — hidden, animated in by GSAP */}
                <span
                  className={`demo-badge flex-shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap translate-x-2 ${item.badgeClass}`}
                >
                  {item.badge}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-nc-muted leading-snug line-clamp-1">{item.desc}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-nc-gold">{item.price}</span>
                {/* Score bar */}
                <div className="score-bar-track flex-1">
                  <div className={`score-bar-fill demo-score-fill demo-score-${i}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket stat */}
      <div className="demo-ticket translate-y-2 border-t border-nc-border/60 bg-nc-elevated px-4 py-3 text-center">
        <span className="text-[10px] text-nc-muted">Ticket medio estimado</span>
        <span className="ml-2 text-sm font-black text-nc-gold">+27 %</span>
      </div>
    </div>
  )
}

/* ─── Hero ───────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef(null)

  // Hero reveal timeline — runs on mount
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // Badge → headline lines → subtitle → CTAs → demo card
      tl.from('.hero-badge',    { opacity: 0, y: -10, duration: 0.5 })
        .from('.hero-line-1',   { opacity: 0, y: 28,  duration: 0.65 }, '-=0.15')
        .from('.hero-line-2',   { opacity: 0, y: 28,  duration: 0.65 }, '-=0.4')
        .from('.hero-subtitle', { opacity: 0, y: 20,  duration: 0.6  }, '-=0.35')
        .from('.hero-ctas',     { opacity: 0, y: 16,  duration: 0.55 }, '-=0.3')
        .from('.hero-demo',     { opacity: 0, y: 32, scale: 0.97, duration: 0.8 }, '-=0.5')
        .from('.hero-micro',    { opacity: 0, duration: 0.5 }, '-=0.3')
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Snap everything into visible state immediately
      gsap.set(['.hero-badge','.hero-line-1','.hero-line-2','.hero-subtitle','.hero-ctas','.hero-demo','.hero-micro'], { opacity: 1 })
    })
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-nc-gold/[0.04] blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-nc-red/[0.04] blur-3xl" />
      </div>

      <div className="container-wide w-full">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Left: copy */}
          <div>
            {/* Badge */}
            <p className="hero-badge inline-flex items-center gap-2 rounded-full border border-nc-gold/30 bg-nc-gold/8 px-3.5 py-1.5 text-xs font-semibold text-nc-gold mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-nc-gold" />
              IA para restaurantes que quieren vender más
            </p>

            {/* Headline */}
            <h1 className="text-4xl font-black leading-[1.07] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="hero-line-1 block text-nc-text">
                Tu carta digital
              </span>
              <span className="hero-line-2 block">
                tiene que{' '}
                <span className="gold-text">vender.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mt-6 max-w-xl text-base text-nc-muted leading-relaxed sm:text-lg">
              NeuroCarta.ai® convierte tu menú en una herramienta de ventas inteligente.
              Guía decisiones, potencia platos rentables y reduce mermas —
              <strong className="text-nc-text font-semibold"> desde el primer día.</strong>
            </p>

            {/* CTAs */}
            <div className="hero-ctas mt-9 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-md bg-nc-red hover:bg-nc-red-hover px-6 py-3.5 text-sm font-bold text-white transition-colors btn-cta-glow"
              >
                Solicitar demo gratis
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-md border border-nc-border bg-nc-elevated hover:border-nc-subtle px-6 py-3.5 text-sm font-semibold text-nc-text transition-colors"
              >
                Ver cómo funciona
              </a>
            </div>

            {/* Micro copy */}
            <p className="hero-micro mt-4 text-xs text-nc-subtle">
              Sin tarjeta de crédito · Setup en 5 minutos · Resultados desde el día 1
            </p>
          </div>

          {/* Right: animated demo */}
          <div className="hero-demo">
            <MenuDemo />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-nc-border">
          {[
            { value: '+180', label: 'restaurantes activos' },
            { value: '+27 %', label: 'ticket medio de media' },
            { value: '5 min', label: 'para tener la carta lista' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-nc-surface px-4 py-5 text-center sm:px-6">
              <div className="text-2xl font-black text-nc-gold sm:text-3xl">{value}</div>
              <div className="mt-1 text-xs text-nc-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
