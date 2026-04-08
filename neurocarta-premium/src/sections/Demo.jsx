import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ─── Before card: plain, unoptimized menu ─────────── */
function BeforeCard() {
  return (
    <div className="rounded-xl border border-nc-border bg-nc-surface p-5 h-full">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-nc-subtle">Antes</span>
        <span className="rounded bg-nc-border px-2 py-0.5 text-[9px] font-bold text-nc-subtle">CARTA QR</span>
      </div>
      <div className="space-y-4 text-sm">
        {[
          { name: 'Ensalada César', desc: 'Lechuga, pollo, parmesano, croutons', price: '9,50 €' },
          { name: 'Pasta carbonara', desc: 'Pasta, nata, bacon, huevo', price: '11,00 €' },
          { name: 'Brownie de chocolate', desc: 'Postre de chocolate con nueces', price: '4,50 €' },
        ].map((item) => (
          <div key={item.name} className="border-b border-nc-border pb-3 last:border-0 last:pb-0">
            <div className="font-medium text-nc-text/70">{item.name}</div>
            <div className="mt-0.5 text-[11px] text-nc-subtle">{item.desc}</div>
            <div className="mt-1.5 text-xs text-nc-muted">{item.price}</div>
          </div>
        ))}
      </div>
      {/* Pain indicators */}
      <div className="mt-5 space-y-1.5">
        {['Sin guía visual', 'Sin platos destacados', 'Sin criterio comercial'].map((t) => (
          <div key={t} className="flex items-center gap-2 text-[11px] text-nc-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-nc-red/50 flex-shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── After card: NeuroCarta optimized ─────────────── */
function AfterCard() {
  return (
    <div className="relative rounded-xl border-2 border-nc-gold/40 bg-nc-elevated p-5 h-full shadow-[0_0_50px_-10px_rgba(212,168,75,0.2)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-nc-gold">Después</span>
        <span className="rounded bg-nc-gold px-2 py-0.5 text-[9px] font-black text-nc-bg">IA ACTIVA</span>
      </div>

      <div className="space-y-3">
        {/* Item 1 — highlighted */}
        <div className="overflow-hidden rounded-lg border border-nc-gold/20 bg-nc-surface">
          <div className="h-20 bg-gradient-to-br from-amber-800/40 to-nc-surface" />
          <div className="p-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="rounded bg-nc-red px-2 py-0.5 text-[9px] font-bold text-white">🔥 Más rentable</span>
              <span className="rounded border border-nc-gold/40 bg-nc-gold/10 px-2 py-0.5 text-[9px] font-bold text-nc-gold">⚡ Alta demanda</span>
            </div>
            <div className="font-bold text-xs text-nc-text">Pasta al Tartufo</div>
            <div className="mt-0.5 text-[10px] text-nc-muted">Trufa negra, parmesano, mantequilla tostada</div>
            <div className="mt-1.5 text-xs font-bold text-nc-gold">18,50 €</div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="overflow-hidden rounded-lg border border-nc-border bg-nc-surface">
          <div className="h-16 bg-gradient-to-br from-orange-900/30 to-nc-surface" />
          <div className="p-3">
            <div className="flex gap-1.5 mb-1.5">
              <span className="rounded bg-nc-orange px-2 py-0.5 text-[9px] font-bold text-white">⭐ Recomendado</span>
            </div>
            <div className="font-bold text-xs text-nc-text">Croquetas de jamón ibérico</div>
            <div className="mt-1 text-xs font-bold text-nc-gold">11,90 €</div>
          </div>
        </div>

        {/* Item 3 — impulsar stock */}
        <div className="overflow-hidden rounded-lg border border-nc-border bg-nc-surface">
          <div className="p-3">
            <div className="flex gap-1.5 mb-1.5">
              <span className="rounded border border-nc-gold/30 bg-nc-gold/8 px-2 py-0.5 text-[9px] font-bold text-nc-gold">📈 Impulsar hoy</span>
            </div>
            <div className="font-bold text-xs text-nc-text">Tarta de Santiago</div>
            <div className="mt-1 text-xs font-bold text-nc-gold">6,50 €</div>
          </div>
        </div>
      </div>

      {/* Win indicators */}
      <div className="mt-4 space-y-1.5">
        {['Jerarquía visual clara', 'Platos rentables destacados', 'Stock urgente impulsado'].map((t) => (
          <div key={t} className="flex items-center gap-2 text-[11px] text-nc-gold/80">
            <span className="h-1.5 w-1.5 rounded-full bg-nc-gold flex-shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Demo section ───────────────────────────────────── */
export default function Demo() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.demo-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.demo-header', start: 'top 85%' },
      })

      // Before card slides from left
      gsap.from('.demo-before', {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.demo-comparison', start: 'top 80%' },
      })

      // After card slides from right, slight delay
      gsap.from('.demo-after', {
        opacity: 0,
        x: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.demo-comparison', start: 'top 80%' },
        delay: 0.15,
      })

      // VS badge pops in
      gsap.from('.demo-vs', {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.demo-comparison', start: 'top 80%' },
        delay: 0.3,
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="demo" ref={sectionRef} className="section-pad border-t border-nc-border bg-nc-surface/30">
      <div className="container-wide">

        {/* Header */}
        <div className="demo-header mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-nc-gold">
            La diferencia en vivo
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Carta QR vs.{' '}
            <span className="gold-text">NeuroCarta.ai®</span>
          </h2>
          <p className="mt-4 text-nc-muted leading-relaxed">
            No explicamos con palabras. Lo ves directamente.
          </p>
        </div>

        {/* Comparison */}
        <div className="demo-comparison mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="demo-before">
            <BeforeCard />
          </div>

          {/* VS badge */}
          <div className="demo-vs flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-nc-border bg-nc-elevated text-xs font-black text-nc-subtle">
              VS
            </div>
          </div>

          <div className="demo-after">
            <AfterCard />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-md bg-nc-red hover:bg-nc-red-hover px-7 py-3.5 text-sm font-bold text-white transition-colors btn-cta-glow"
          >
            Quiero NeuroCarta en mi restaurante
          </a>
          <p className="mt-3 text-xs text-nc-subtle">Empieza gratis · Sin permanencia</p>
        </div>
      </div>
    </section>
  )
}
